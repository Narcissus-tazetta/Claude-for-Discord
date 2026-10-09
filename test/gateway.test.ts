import { Database } from "bun:sqlite";
import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { inflateSync } from "node:zlib";
import expandedReviewSnapshot from "../docs/model-review-2026-10-08.json";
import {
  askAI,
  ConfigurationError,
  freeUnavailableMessage,
  normalizeModelPreference,
  PaidCalls,
} from "../src/ai";
import {
  BENCHMARK_REVIEW_TTL,
  BENCHMARK_REVIEWED_AT,
  BENCHMARK_REVIEWS,
  benchmarkReview,
} from "../src/benchmark-reviews";
import { BudgetError, BudgetLedger, monthInJapan } from "../src/budget";
import type { Env } from "../src/constants";
import { MAX_ATTACHMENT_BYTES, MAX_TOTAL_ATTACHMENT_BYTES } from "../src/constants";
import { money, usdJpyRate, yen } from "../src/currency";
import {
  type ChatMessage,
  GatewayClient,
  GatewayError,
  reasoningOptions,
  toChatMessages,
} from "../src/gateway";
import { attachmentBlocks, buildHistoryFromMessage, newBudget } from "../src/history";
import { evaluateModel } from "../src/model-evaluation";
import {
  DAY_MS,
  DISCOVERY_VERSION,
  evaluationCandidates,
  isApproved,
  isFreeModel,
  type ModelInfo,
  mergeCatalog,
  parseCatalog,
  type Registry,
  ratesFor,
  revision,
} from "../src/model-registry";
import {
  analyzeTask,
  answerPriority,
  answerReasoning,
  parseClassification,
  planCall,
  rankModels,
  reservationCost,
  serverTools,
} from "../src/routing";
import {
  CID_PAGE,
  MODEL_FILTERS,
  modelBrowser,
  referenceCost,
  settingsComponents,
  settingsSummary,
} from "../src/settings-ui";
import type { Prefs } from "../src/types";

const prefs: Prefs = {
  model: "auto",
  thinking: true,
  effort: "medium",
  ephemeral: true,
  web_fetch: true,
  web_search: true,
  currency: "usd",
};
const env = {
  AI_GATEWAY_API_KEY: "test-key",
  AI_GATEWAY_BASE_URL: "https://mock.invalid/v1",
  CLAUDE_MAX_TOKENS: "4096",
  AI_MONTHLY_BUDGET_USD: "10",
} as Env;

function model(over: Partial<ModelInfo> = {}): ModelInfo {
  return {
    discoveryVersion: DISCOVERY_VERSION,
    id: "openai/gpt-test-mini",
    name: "Test",
    released: 100,
    context: 100_000,
    maxOutput: 4096,
    tags: ["tool-use"],
    input: 0.3e-6,
    output: 2e-6,
    preview: false,
    reasoning: [],
    ...over,
  };
}
function approved(models: ModelInfo[]): Registry {
  return {
    refreshedAt: Date.now(),
    models,
    evaluations: Object.fromEntries(
      models.map((m) => [
        m.id,
        {
          revision: revision(m),
          testedAt: Date.now(),
          basic: true,
          balanced: true,
          complex: true,
          vision: true,
          pdf: true,
          latencyMs: 1,
          failures: 0,
          disabledUntil: 0,
        },
      ]),
    ),
  };
}
function raw(over: Record<string, unknown> = {}) {
  return {
    id: "google/gemini-test",
    name: "Test",
    released: 20,
    created: 10,
    type: "language",
    context_window: 100000,
    max_tokens: 4096,
    tags: ["vision", "file-input"],
    pricing: { input: "0.0000003", output: "0.000002" },
    ...over,
  };
}
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
afterEach(() => mock.restore());

describe("model catalog and adoption", () => {
  test("includes priced chat models across creators and excludes unsupported catalog entries", () => {
    const result = parseCatalog({
      data: [
        raw(),
        raw({ id: "other/model" }),
        raw({ id: "openai/gpt-image", type: "image" }),
        raw({ id: "anthropic/claude-bad", pricing: {} }),
        raw({ id: "openai/gpt-negative", pricing: { input: -1, output: 1 } }),
        raw({ id: "openai/gpt-denied", model_eligibility: { status: "ineligible" } }),
      ],
    });
    expect(result.map((m) => m.id)).toEqual(["google/gemini-test", "other/model"]);
    expect(result[0].released).toBe(20);
    expect(result[0].input).toBe(0.3e-6);
  });
  test("prices requests at the tier their prompt size falls in, ignoring unused cache writes", () => {
    const [m] = parseCatalog({
      data: [
        raw({
          pricing: {
            input: "0.000001",
            output: "0.000005",
            input_tiers: [
              { cost: "0.000001", min: 0, max: 272001 },
              { cost: "0.000002", min: 272001 },
            ],
            input_cache_write: "0.000004",
            output_tiers: [
              { cost: "0.000005", min: 0, max: 272001 },
              { cost: "0.000010", min: 272001 },
            ],
          },
        }),
      ],
    });
    expect(ratesFor(m, 1000)).toEqual({ input: 1e-6, output: 5e-6 });
    expect(ratesFor(m, 300_000)).toEqual({ input: 2e-6, output: 10e-6 });
    expect(parseCatalog({ data: [raw({ pricing: { input: "", output: "0" } })] })).toEqual([]);
    expect(
      parseCatalog({ data: [raw({ pricing: { input: "1", output: "1", input_tiers: [{}] } })] }),
    ).toEqual([]);
  });
  test("Auto skips -fast price duplicates and image generators but keeps base models", () => {
    const base = model({ tags: ["tool-use", "fast"] });
    const fast = model({ id: "openai/gpt-test-mini-fast" });
    const image = model({ id: "google/gemini-image", tags: ["image-generation"] });
    const registry = approved([base, fast, image]);
    expect(isApproved(registry, base)).toBe(true);
    expect(isApproved(registry, fast)).toBe(false);
    expect(isApproved(registry, image)).toBe(false);
  });
  test("safety classifiers stay manual even if they pass the small acceptance suite", () => {
    const safeguard = model({ id: "openai/gpt-oss-safeguard-120b" });
    const registry = approved([safeguard]);
    expect(isApproved(registry, safeguard)).toBe(false);
    expect(evaluationCandidates(registry)).toEqual([]);
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    expect(rankModels(registry, needs, 768, 1)).toEqual([]);
    expect(rankModels(registry, needs, 768, 1, safeguard.id)).toEqual([safeguard]);
  });
  test("other creators can be selected manually without entering Auto or evaluation spend", () => {
    const m = model({ id: "deepseek/deepseek-test" });
    const registry = approved([m]);
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    expect(rankModels(registry, needs, 100, 1, m.id)).toEqual([m]);
    expect(rankModels(registry, needs, 100, 1)).toEqual([]);
    expect(evaluationCandidates(registry)).toEqual([]);
  });
  test("price/capability changes invalidate approvals; removed models disappear", () => {
    const m = model();
    const registry = approved([m]);
    const updated = mergeCatalog(registry, [{ ...m, output: 3e-6 }]);
    expect(isApproved(updated, updated.models[0])).toBe(false);
    expect(mergeCatalog(registry, [model({ id: "google/gemini-new" })]).evaluations).toEqual({});
    expect(() => mergeCatalog(registry, [])).toThrow();
  });
  test("preview/new/failed models are available manually but never auto-approved", () => {
    const m = model({ preview: true });
    const registry = approved([m]);
    expect(isApproved(registry, m)).toBe(false);
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    expect(rankModels(registry, needs, 100, 1)).toEqual([]);
    expect(rankModels(registry, needs, 100, 1, m.id)).toHaveLength(1);
    expect(evaluationCandidates(registry)).toEqual([]);
  });
});

describe("routing", () => {
  test("short follow-ups inherit difficult context", () => {
    const needs = analyzeTask(
      [
        { role: "user", content: "設計を検討して" },
        { role: "assistant", content: "案です" },
        { role: "user", content: "要約して" },
      ],
      prefs,
    );
    expect(needs.tier).toBe("strong");
    expect(needs.uncertain).toBe(false);
  });
  test("selects by quality/cost across providers, not fixed provider roles", () => {
    const cheap = model({ id: "google/gemini-cheap" });
    const strong = model({ id: "anthropic/claude-strong", input: 2e-6, output: 10e-6 });
    const registry = approved([cheap, strong]);
    registry.evaluations[cheap.id].complex = false;
    expect(
      rankModels(
        registry,
        analyzeTask([{ role: "user", content: "複雑な設計" }], prefs),
        1000,
        1,
      )[0].id,
    ).toBe(strong.id);
    expect(
      rankModels(
        registry,
        analyzeTask([{ role: "user", content: "こんにちは" }], prefs),
        1000,
        1,
      )[0].id,
    ).toBe(cheap.id);
  });
  test("requires validated attachment capabilities and checks context/cost", () => {
    const m = model({ tags: ["vision", "file-input", "tool-use"] });
    const registry = approved([m]);
    const needs = analyzeTask(
      [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: "https://cdn.example/a" } },
            { type: "file", file: { data: "https://cdn.example/a.pdf" } },
          ],
        },
      ],
      prefs,
    );
    registry.evaluations[m.id].pdf = false;
    expect(rankModels(registry, needs, 1000, 1)).toEqual([]);
    registry.evaluations[m.id].pdf = true;
    expect(rankModels(registry, needs, 1000, 1)).toHaveLength(1);
    expect(rankModels(registry, needs, 1000, 0.0001)).toEqual([]);
    expect(rankModels(approved([{ ...m, context: 100 }]), needs, 1000, 1)).toEqual([]);
  });
  test("web tools are offered for the model to choose, and toggles always win", () => {
    const m = model();
    const chat: ChatMessage[] = [
      { role: "user", content: "これを読んで https://example.com/page" },
    ];
    const needs = analyzeTask(chat, prefs);
    expect(serverTools(m, needs).map((t) => t.type)).toEqual([
      "vercel:perplexity_search",
      "vercel:browserbase_fetch",
    ]);
    expect(needs.fetchRequired).toBe(true);
    expect(serverTools(m, analyzeTask(chat, { web_search: false, web_fetch: false }))).toEqual([]);
    expect(serverTools(model({ tags: [] }), needs)).toEqual([]);
    // A URL from earlier in the thread stays optional instead of being re-fetched every turn.
    const followUp = analyzeTask(
      [...chat, { role: "assistant", content: "要約です" }, { role: "user", content: "詳しく" }],
      prefs,
    );
    expect(followUp.urls).toEqual(["https://example.com/page"]);
    expect(followUp.fetchRequired).toBe(false);
    expect(parseClassification('{"tier":"strong"}')).toEqual({ tier: "strong" });
    expect(parseClassification('{"tier":"free"}')).toBeNull();
  });
  test("output cap leaves thinking room above the answer budget, trimmed to the allowance", () => {
    const m = model({
      maxOutput: 128_000,
      output: 10e-6,
      reasoning: [{ type: "effort", values: ["low", "medium", "high"] }],
    });
    const needs = analyzeTask([{ role: "user", content: "設計して" }], {
      web_search: false,
      web_fetch: false,
    });
    const high = planCall(m, { thinking: true, effort: "high" }, 4096, needs, 1);
    expect(high?.maxTokens).toBe(4096 + 16_384);
    expect(high?.options).toEqual({ reasoning: { effort: "high", exclude: true } });
    const low = planCall(m, { thinking: true, effort: "low" }, 4096, needs, 1);
    expect(low?.maxTokens).toBe(4096 + 4096);
    const tight = planCall(m, { thinking: true, effort: "high" }, 4096, needs, 0.1);
    // Too little room to think at "high": step down to the effort the allowance can carry.
    expect(tight?.level).toBe("medium");
    expect(tight?.options).toEqual({ reasoning: { effort: "medium", exclude: true } });
    expect(tight?.maxTokens).toBeGreaterThanOrEqual(4096 + 8192 / 2);
    expect(reservationCost(m, needs.inputTokens, tight?.maxTokens ?? 0, needs)).toBeLessThanOrEqual(
      0.1,
    );
    expect(planCall(m, { thinking: true, effort: "high" }, 4096, needs, 0.01)).toBeNull();
  });
  test("settings pages respect Discord limits and contain every discovered model", () => {
    const models = Array.from({ length: 50 }, (_, i) => model({ id: `openai/gpt-test-${i}` }));
    const registry = approved(models);
    const seen = new Set<string>();
    for (let page = 0; page < 3; page++) {
      const rows = modelBrowser("123", prefs, registry, { panel: "models", filter: "all", page })
        .components as any[];
      expect(rows.length).toBeLessThanOrEqual(5);
      const options = rows[1].components[0].options;
      expect(options.length).toBeLessThanOrEqual(25);
      options.forEach((option: any) => {
        seen.add(option.value);
      });
      expect(rows.at(-1).components[0].custom_id.startsWith(CID_PAGE)).toBe(true);
    }
    expect(seen.size).toBe(51);
  });
  test("every provider and page, including empty and single-page catalogs, has unique component IDs", () => {
    for (const count of [0, 1, 23, 24, 46, 47]) {
      const models = MODEL_FILTERS.slice(1).flatMap((provider) =>
        Array.from({ length: count }, (_, i) => model({ id: `${provider}/test-${i}` })),
      );
      for (const filter of MODEL_FILTERS) {
        for (const page of [0, 1, 2, 999]) {
          const rows = modelBrowser("123", prefs, approved(models), {
            panel: "models",
            filter,
            page,
          }).components as any[];
          const ids = rows.flatMap((row) => row.components.map((c: any) => c.custom_id));
          expect(new Set(ids).size).toBe(ids.length);
          for (const row of rows)
            for (const component of row.components) {
              if (component.options) expect(component.options.length).toBeLessThanOrEqual(25);
            }
          if (count <= 23 && filter !== "all") {
            expect(rows[2].components.map((c: any) => c.label)).toEqual([
              "基本設定に戻る",
              "モデル一覧を更新",
            ]);
          }
        }
      }
    }
  });
  test("priority changes Auto selection without bypassing budget, task checks or manual choice", () => {
    const cheap = model();
    const standard = model({ id: "anthropic/claude-sonnet-test", input: 2e-6, output: 10e-6 });
    const registry = approved([cheap, standard]);
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    const rank = (priority: "low" | "medium" | "high", cost = 1, manual = "auto") =>
      rankModels(registry, needs, 4096, cost, manual, Date.now(), priority);
    expect(rank("low")[0].id).toBe(cheap.id);
    expect(rank("medium")[0].id).toBe(cheap.id);
    expect(rank("high")[0].id).toBe(standard.id);
    expect(rank("high", 0.03)[0].id).toBe(cheap.id);
    expect(rank("high", 1, cheap.id)[0].id).toBe(cheap.id);
    registry.evaluations[standard.id].complex = false;
    expect(rank("high")[0].id).toBe(cheap.id);
    registry.evaluations[cheap.id].complex = false;
    expect(rank("high")).toEqual([]);
    needs.tier = "strong";
    expect(rank("low")).toEqual([]);
  });
  test("balanced thinking adapts to difficulty and preserves legacy preferences", () => {
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    expect(answerReasoning(prefs, needs).effort).toBe("low");
    needs.tier = "balanced";
    expect(answerReasoning(prefs, needs).effort).toBe("medium");
    needs.tier = "strong";
    expect(answerReasoning(prefs, needs).effort).toBe("high");
    expect(answerReasoning({ ...prefs, effort: "low" }, needs).effort).toBe("low");
    expect(answerPriority({ ...prefs, thinking: false })).toBe("low");
    expect(answerPriority({ ...prefs, effort: "max" })).toBe("high");
  });
  test("basic controls show saved selections and distinct ON/OFF states", () => {
    const rows = settingsComponents("123", {
      ...prefs,
      thinking: false,
      ephemeral: false,
      web_search: false,
    }) as any[];
    expect(rows[0].components[0].options.find((o: any) => o.default).value).toBe("auto");
    expect(rows[1].components[0].options.find((o: any) => o.default).value).toBe("low");
    expect(rows[2].components.map((b: any) => [b.label, b.style])).toEqual([
      ["Web検索: OFF", 2],
      ["リンク読み込み: ON", 1],
    ]);
    expect(rows[3].components[0].options.find((o: any) => o.default).value).toBe("public");
  });
  test("model browser opens the selected model page and filters by creator", () => {
    const models = Array.from({ length: 30 }, (_, i) => model({ id: `openai/gpt-test-${i}` }));
    models.push(model({ id: "google/gemini-test" }));
    const registry = approved(models);
    const browser = modelBrowser("123", { ...prefs, model: models[29].id }, registry, {
      panel: "models",
      filter: "openai",
    });
    const rows = browser.components as any[];
    expect(rows[1].components[0].options.find((o: any) => o.default).value).toBe(models[29].id);
    expect(
      rows[1].components[0].options.every(
        (o: any) => o.value === "auto" || o.value.startsWith("openai/"),
      ),
    ).toBe(true);
    expect(rows[2].components[1].disabled).toBe(true);
  });
  test("costs show only the chosen currency; yen states its fixed reference rate", () => {
    const m = model({ input: 1e-6, output: 3e-6 });
    const jpy = settingsSummary({ ...prefs, model: m.id, currency: "jpy" }, approved([m]), 160);
    expect(jpy).toContain("約¥0.40/回 ／ 約¥40.00/100回");
    expect(jpy).toContain("入力 約¥160.00・出力 約¥480.00 / 100万token");
    expect(jpy).toContain("1 USD＝¥160.00で固定換算");
    expect(jpy).toContain("**費用の表示**　円");
    expect(jpy).not.toContain("$0.0025");
    const usd = settingsSummary({ ...prefs, model: m.id, currency: "usd" }, approved([m]), 160);
    expect(usd).toContain("$0.0025/回 ／ $0.2500/100回");
    expect(usd).toContain("入力 $1.00・出力 $3.00 / 100万token");
    expect(usd).not.toContain("¥");
    expect(money(0.00001, "usd", 160)).toBe("<$0.0001");
    // The button offers the other currency, so a click always flips the setting.
    const buttons = (settingsComponents("123", { ...prefs, currency: "jpy" }) as any[]).at(
      -1,
    ).components;
    expect(buttons.at(-1)).toMatchObject({
      label: "費用の表示: 円",
      custom_id: "settings:currency:usd:123",
    });
    expect(yen(0.0000001, 160)).toBe("¥0.01未満");
    expect(yen(0, 160)).toBe("¥0.00");
    for (const bad of [undefined, "", "0", "-1", "Infinity", "no"])
      expect(usdJpyRate(bad)).toBe(158.1);
    expect(usdJpyRate("160")).toBe(160);
  });
  test("settings distinguish manual-only models from Auto evaluation waiting and show failures", () => {
    const m = model();
    const other = model({ id: "deepseek/test" });
    const registry: Registry = {
      refreshedAt: Date.now(),
      models: [m, other],
      evaluations: {},
      progress: {
        attemptsToday: 2,
        dailyLimit: 2,
        budgetUsd: 0.5,
        nextRunAt: null,
        lastFailure: { model: m.id, reason: "Gateway残高不足", at: Date.now() },
      },
    };
    const screen = modelBrowser("123", prefs, registry, { panel: "models", filter: "all" });
    const options = (screen.components as any[])[1].components[0].options;
    expect(options.find((o: any) => o.value === m.id).description).toContain("評価待ち");
    expect(options.find((o: any) => o.value === other.id).description).toContain("Auto評価対象外");
    expect(screen.content).toContain("動作テスト完了 0/1候補");
    expect(screen.content).toContain("今日の評価試行 2/2");
    expect(screen.content).toContain("Gateway残高不足");
  });
  test("other AI filter and reference prices use the catalog's actual token rates", () => {
    const m = model({ id: "deepseek/deepseek-test", input: 1e-6, output: 3e-6 });
    const registry = approved([model(), m]);
    const selected = { ...prefs, model: m.id };
    expect(referenceCost(m)).toBe(0.0025);
    const summary = settingsSummary(selected, registry);
    expect(summary).toContain("$0.0025/回");
    expect(summary).toContain("$0.2500/100回");
    expect(summary).toContain("入力1,000＋出力500");
    const browser = modelBrowser("123", selected, registry, { panel: "models", filter: "other" });
    const options = (browser.components as any[])[1].components[0].options;
    expect(options.map((o: any) => o.value)).toEqual(["auto", m.id]);
    expect(options[1].description).toContain("$0.0025/回");
    expect(options[1].description).toContain("Auto評価対象外");
    expect(options[1].label).toContain("deepseek");
  });
});

describe("public benchmark reviews", () => {
  const now = BENCHMARK_REVIEWED_AT + 60_000;
  function reviewedModels() {
    // Base-tier catalog prices on the review date.
    const prices = [
      [0.1e-6, 0.5e-6],
      [0.75e-6, 3.75e-6],
      [2e-6, 10e-6],
      [2e-6, 10e-6],
      [4e-6, 20e-6],
    ];
    return BENCHMARK_REVIEWS.slice(0, 5).map((review, i) =>
      model({
        id: review.id,
        released: review.released,
        maxOutput: 64_000,
        input: prices[i][0],
        output: prices[i][1],
        tags: ["vision", "file-input", "tool-use"],
        reasoning: [
          {
            type: "effort",
            values: Object.keys(review.scores).filter(
              (value) => review.id !== "google/gemini-3.8-flash" || value !== "medium",
            ),
          },
        ],
      }),
    );
  }
  test("full review covers every catalog ID and exported approvals have exact source conditions", () => {
    const rows = expandedReviewSnapshot.models;
    expect(rows.length).toBe(expandedReviewSnapshot.coverage.catalogModels);
    expect(rows.length).toBe(413);
    expect(new Set(rows.map((row) => row.id)).size).toBe(rows.length);
    expect(rows.filter((row) => row.adopted).length).toBe(BENCHMARK_REVIEWS.length);
    const parsed = parseCatalog({ data: rows.map((row) => row.catalog) });
    for (const review of BENCHMARK_REVIEWS) {
      const row = rows.find((entry) => entry.id === review.id);
      const m = parsed.find((entry) => entry.id === review.id);
      if (!row || !m) throw new Error(`Missing or unusable review: ${review.id}`);
      expect(row.adopted).toBe(true);
      expect(row.match).toBe("direct");
      const registry: Registry = { refreshedAt: now, models: [m], evaluations: {} };
      expect(isApproved(registry, m, now)).toBe(true);
      expect(benchmarkReview({ ...m, released: m.released + 1 }, now)).toBeUndefined();
      expect(isApproved(registry, { ...m, id: `${m.id}-fast` }, now)).toBe(false);
      expect(isApproved(registry, m, now + BENCHMARK_REVIEW_TTL + 1)).toBe(false);
      for (const [effort, score] of Object.entries(review.scores)) {
        expect(effort === "none" || row.supportedEfforts.includes(effort)).toBe(true);
        const source = row.measurements.find(
          (entry) =>
            entry.effort === effort &&
            entry.estimated === false &&
            entry.releaseDate === row.releaseDate &&
            Math.round(entry.score) === score,
        );
        expect(source).toBeDefined();
        if (effort === "none") expect(source?.reasoning).toBe(false);
        else expect(source?.reasoning).toBe(true);
      }
    }
    for (const row of rows.filter(
      (entry) => entry.match !== "direct" || entry.type !== "language",
    )) {
      expect(row.adopted).toBe(false);
      expect(BENCHMARK_REVIEWS.some((review) => review.id === row.id)).toBe(false);
    }
  });
  test("Haiku 5.5 wins normal cost-balanced requests but high does not qualify for difficult requests", () => {
    const row = expandedReviewSnapshot.models.find(
      (entry) => entry.id === "anthropic/claude-haiku-5.5",
    );
    if (!row) throw new Error("Missing Haiku review");
    const haiku = model({
      id: row.id,
      released: row.released,
      input: row.inputPerMillion / 1e6,
      output: row.outputPerMillion / 1e6,
      maxOutput: 128_000,
      tags: row.tags,
      reasoning: [{ type: "effort", values: row.supportedEfforts }],
    });
    const registry: Registry = {
      refreshedAt: now,
      models: [...reviewedModels(), haiku],
      evaluations: {},
    };
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    needs.tier = "balanced";
    expect(rankModels(registry, needs, 4096, 0.25, "auto", now, "medium")[0].id).toBe(haiku.id);
    needs.tier = "strong";
    expect(
      rankModels(registry, needs, 4096, 0.25, "auto", now, "medium").some((m) => m.id === haiku.id),
    ).toBe(false);
  });
  test("public approval is explicit and expires; fast aliases, previews and replacement releases inherit no score", () => {
    for (const m of reviewedModels()) {
      const registry: Registry = { refreshedAt: now, models: [m], evaluations: {} };
      expect(isApproved(registry, m, now)).toBe(true);
      expect(registry.evaluations).toEqual({});
      expect(evaluationCandidates(registry, now)).toEqual([]);
      expect(benchmarkReview({ ...m, id: `${m.id}-fast` }, now)).toBeUndefined();
      expect(benchmarkReview({ ...m, preview: true }, now)).toBeUndefined();
      expect(benchmarkReview({ ...m, released: m.released + 1 }, now)).toBeUndefined();
      expect(isApproved(registry, m, BENCHMARK_REVIEWED_AT + BENCHMARK_REVIEW_TTL + 1)).toBe(false);
    }
  });
  test("routing uses actual supported effort and public scores with common budget/media constraints", () => {
    const models = reviewedModels();
    const registry: Registry = { refreshedAt: now, models, evaluations: {} };
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    const rank = (priority: "low" | "medium" | "high", budget = 1, manual = "auto") =>
      rankModels(registry, needs, 4096, budget, manual, now, priority);
    expect(rank("medium")[0].id).toBe("openai/gpt-6-luna");
    needs.tier = "balanced";
    expect(rank("medium")[0].id).toBe("google/gemini-3.8-flash");
    needs.tier = "strong";
    expect(rank("medium")[0].id).toBe("openai/gpt-6.1-sol");
    expect(rank("low")[0].id).toBe("openai/gpt-6.1-sol");
    expect(rank("high")[0].id).toBe("anthropic/claude-opus-5.5");
    expect(rank("medium").some((m) => m.id === "openai/gpt-6-luna")).toBe(false);
    expect(rank("high", 0.15)[0].id).toBe("openai/gpt-6.1-sol");
    expect(rank("high", 0.00001)).toEqual([]);
    expect(rank("high", 1, models[0].id)[0].id).toBe(models[0].id);
    needs.pdf = true;
    models[2].tags = ["vision", "tool-use"];
    expect(rank("medium").some((m) => m.id === models[2].id)).toBe(false);
  });
  test("private failures and circuit breakers override published admission without fabricating test passes", () => {
    const m = reviewedModels()[2];
    const registry = approved([m]);
    registry.evaluations[m.id].basic = false;
    expect(isApproved(registry, m, now)).toBe(false);
    delete registry.evaluations[m.id];
    registry.outcomes = {
      [m.id]: {
        revision: revision(m),
        testedAt: now,
        successes: 1,
        failures: 3,
        disabledUntil: now + DAY_MS,
      },
    };
    expect(isApproved(registry, m, now)).toBe(false);
    expect(isApproved(registry, m, now + DAY_MS + 1)).toBe(true);
  });
});

describe("spend ledger", () => {
  function ledger() {
    const db = new Database(":memory:");
    return new BudgetLedger(
      (sql, ...params) => db.query(sql).all(...params) as Record<string, any>[],
    );
  }
  test("pending concurrent calls count against the same monthly allowance", () => {
    const budget = ledger();
    budget.reserve("a", 0.6, "answer", 1, 0.5, 0);
    expect(() => budget.reserve("b", 0.6, "answer", 1, 0.5, 0)).toThrow(BudgetError);
    budget.settle("a", 0.1);
    budget.reserve("b", 0.6, "answer", 1, 0.5, 0);
    expect(budget.summary(0).total).toBeCloseTo(0.7);
    expect(() => budget.reserve("b", 0, "answer", 1, 0.5, 0)).toThrow("already reserved");
  });
  test("settlement is idempotent and unknown costs are never freed", () => {
    const budget = ledger();
    budget.reserve("a", 0.3, "answer", 1, 0.5, 0);
    budget.settle("a", null);
    budget.settle("a", 0);
    expect(budget.summary(0).total).toBe(0.3);
  });
  test("evaluation has a separate allowance and months roll over in JST", () => {
    const budget = ledger();
    const before = Date.parse("2026-10-31T14:59:59Z");
    const after = before + 1000;
    expect(monthInJapan(before)).toBe("2026-10");
    expect(monthInJapan(after)).toBe("2026-11");
    budget.reserve("a", 0.4, "evaluation", 10, 0.5, before);
    expect(() => budget.reserve("b", 0.2, "evaluation", 10, 0.5, before)).toThrow(BudgetError);
    budget.reserve("c", 0.4, "evaluation", 10, 0.5, after);
    expect(budget.summary(after).total).toBe(0.4);
    budget.settle("a", 0.1);
    expect(budget.summary(after).total).toBe(0.4);
  });
});

describe("Gateway protocol", () => {
  test("converts stored image and PDF URL blocks to chat parts", () => {
    const chat = toChatMessages([
      {
        role: "user",
        content: [
          { type: "text", text: "read" },
          { type: "image", source: { type: "url", url: "https://cdn.example/a.png" } },
          { type: "document", source: { type: "url", url: "https://cdn.example/a.pdf" } },
        ],
      },
    ]);
    expect(chat[0].content).toEqual([
      { type: "text", text: "read" },
      { type: "image_url", image_url: { url: "https://cdn.example/a.png" } },
      { type: "file", file: { data: "https://cdn.example/a.pdf", media_type: "application/pdf" } },
    ]);
    expect(normalizeModelPreference("claude-haiku-4-5")).toBe("anthropic/claude-haiku-4.5");
  });
  test("inlines PDF bytes for inference, preserves image URLs and stored history", async () => {
    const pdf = "%PDF-1.4\nfixture";
    let sent: any;
    const client = new GatewayClient(env, (async (url: string, init: RequestInit) => {
      if (url === "https://cdn.example/a.pdf") {
        expect(init.headers).toBeUndefined();
        expect(init.redirect).toBe("error");
        return new Response(pdf);
      }
      sent = JSON.parse(init.body as string);
      return json({ choices: [{ message: { content: "read" }, finish_reason: "stop" }] });
    }) as any);
    const chat = toChatMessages([
      {
        role: "user",
        content: [
          { type: "image", source: { type: "url", url: "https://cdn.example/a.png" } },
          { type: "document", source: { type: "url", url: "https://cdn.example/a.pdf" } },
        ],
      },
    ]);
    await client.complete(model(), chat, 100);
    expect(sent.messages[0].content[1].file.data).toBe(btoa(pdf));
    expect(sent.messages[0].content[0].image_url.url).toBe("https://cdn.example/a.png");
    expect((chat[0].content as any[])[1].file.data).toBe("https://cdn.example/a.pdf");
  });
  test("rejects oversized, expired and invalid PDFs before sending a paid request", async () => {
    for (const response of [
      new Response("%PDF-", { headers: { "content-length": String(MAX_ATTACHMENT_BYTES + 1) } }),
      new Response(new Uint8Array(MAX_ATTACHMENT_BYTES + 1)),
      new Response("expired", { status: 403 }),
      new Response("<html>not PDF</html>"),
    ]) {
      let requests = 0;
      const client = new GatewayClient(env, (async () => {
        requests++;
        return response;
      }) as any);
      const settled: (number | null)[] = [];
      const calls = new PaidCalls(
        env,
        {
          reserveSpend: () => {},
          settleSpend: (_id, cost) => {
            settled.push(cost);
          },
          deferSpend: () => {},
        },
        "answer",
        1,
        client,
      );
      const chat = toChatMessages([
        {
          role: "user",
          content: [
            { type: "document", source: { type: "url", url: "https://cdn.example/a.pdf" } },
          ],
        },
      ]);
      await expect(calls.complete(model(), chat, 100)).rejects.toMatchObject({
        status: 400,
        attachmentRejected: true,
      });
      expect(requests).toBe(1);
      expect(settled).toEqual([0]);
      expect(calls.remaining).toBe(1);
    }
  });
  test("attachment history cannot exceed the combined byte limit with its last file", () => {
    const budget = newBudget();
    budget.bytes = MAX_TOTAL_ATTACHMENT_BYTES - 100;
    expect(
      attachmentBlocks(
        [
          {
            id: "a",
            filename: "a.pdf",
            size: 101,
            content_type: "application/pdf",
            url: "https://cdn.example/a.pdf",
          },
        ],
        budget,
      ),
    ).toEqual([]);
    expect(budget.bytes).toBe(MAX_TOTAL_ATTACHMENT_BYTES - 100);
  });
  test("only the latest user turns resend their files; older ones keep the name", async () => {
    const pdf = (n: number) => ({
      id: `a${n}`,
      filename: `doc${n}.pdf`,
      size: 100,
      content_type: "application/pdf",
      url: `https://cdn.example/doc${n}.pdf`,
    });
    // Reply chain: user(doc1) <- bot <- user(doc2) <- bot <- user(doc3)
    const messages: Record<string, any> = {
      m1: { id: "m1", channel_id: "c", author: { id: "u" }, content: "1", attachments: [pdf(1)] },
      m2: {
        id: "m2",
        channel_id: "c",
        author: { id: "app" },
        content: "r1",
        message_reference: { message_id: "m1" },
      },
      m3: {
        id: "m3",
        channel_id: "c",
        author: { id: "u" },
        content: "2",
        attachments: [pdf(2)],
        message_reference: { message_id: "m2" },
      },
      m4: {
        id: "m4",
        channel_id: "c",
        author: { id: "app" },
        content: "r2",
        message_reference: { message_id: "m3" },
      },
      m5: {
        id: "m5",
        channel_id: "c",
        author: { id: "u" },
        content: "3",
        attachments: [pdf(3)],
        message_reference: { message_id: "m4" },
      },
    };
    const discord = { appId: "app", fetchMessage: async (_c: string, id: string) => messages[id] };
    const turns = await buildHistoryFromMessage(messages.m5, discord as any);
    const documents = turns.flatMap((turn) =>
      turn.content.filter((block) => block.type === "document").map((block) => block.source?.url),
    );
    expect(documents).toEqual(["https://cdn.example/doc2.pdf", "https://cdn.example/doc3.pdf"]);
    expect(JSON.stringify(turns[0])).toContain("doc1.pdf（以前のメッセージのため省略）");
  });
  test("clamps effort to catalog support and omits unadvertised controls", () => {
    const m = model({ reasoning: [{ type: "effort", values: ["low", "high"] }] });
    expect(reasoningOptions(m, { thinking: true, effort: "max" }, 1000)).toEqual({
      reasoning: { effort: "high", exclude: true },
    });
    expect(reasoningOptions(m, { thinking: false, effort: "high" }, 1000)).toEqual({
      reasoning: { effort: "low", exclude: true },
    });
    expect(
      reasoningOptions(
        model({ reasoning: [{ type: "toggle" }] }),
        { thinking: false, effort: "high" },
        1000,
      ),
    ).toEqual({ reasoning: { enabled: false } });
  });
  test("budget-only reasoning varies with quality while leaving room for the answer", () => {
    const m = model({ reasoning: [{ type: "toggle" }, { type: "budget_tokens", min: 1024 }] });
    const tokens = ["low", "medium", "high"].map(
      (effort) =>
        (reasoningOptions(m, { thinking: true, effort }, 4096).reasoning as any).max_tokens,
    );
    expect(tokens).toEqual([1024, 2048, 3072]);
    expect(reasoningOptions(m, { thinking: false, effort: "high" }, 4096)).toEqual({
      reasoning: { enabled: false },
    });
    expect(reasoningOptions(m, { thinking: true, effort: "low" }, 768)).toEqual({
      reasoning: { enabled: false },
    });
    const mandatory = model({ reasoning: [{ type: "budget_tokens", min: 1024 }] });
    expect(reasoningOptions(mandatory, { thinking: true, effort: "high" }, 1000)).toEqual({});
  });
  test("answers return without waiting for billing; usage is reported for the log", async () => {
    const urls: string[] = [];
    const client = new GatewayClient(env, (async (url: string) => {
      urls.push(url);
      return json({
        id: "gen/test",
        model: "openai/gpt-test-mini",
        choices: [{ message: { content: "answer" }, finish_reason: "stop" }],
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          completion_tokens_details: { reasoning_tokens: 7 },
        },
      });
    }) as any);
    const result = await client.complete(model(), [{ role: "user", content: "hello" }], 100);
    expect(urls).toHaveLength(1);
    expect(result).toMatchObject({ generationId: "gen/test", reasoningTokens: 7 });
  });
  test("billing lookup treats 404 as not-yet-ingested and BYOK as unknown", async () => {
    const lookup = (response: Response) =>
      new GatewayClient(env, (async () => response) as any).generationCost("gen/x");
    expect(await lookup(json({}, 404))).toEqual({ found: false });
    expect(await lookup(json({ data: { total_cost: 0.0123 } }))).toEqual({
      found: true,
      cost: 0.0123,
    });
    expect(await lookup(json({ data: { total_cost: 0, is_byok: true } }))).toEqual({
      found: true,
      cost: null,
    });
    await expect(lookup(json({}, 500))).rejects.toThrow(GatewayError);
  });
  test("timeouts and 5xx are fallback-eligible but never assumed unbilled", async () => {
    const timeout = new GatewayClient(env, (async () => {
      throw new DOMException("timed out", "TimeoutError");
    }) as any);
    await expect(timeout.complete(model(), [], 100)).rejects.toMatchObject({ status: 504 });
    for (const status of [500, 502, 503, 504]) {
      expect(new GatewayError(status).canFallback).toBe(true);
      expect(new GatewayError(status).definitelyUnbilled).toBe(false);
    }
  });
  test("ambiguous transport failures retain reservations and do not retry", async () => {
    const reserved: number[] = [];
    const settled: (number | null)[] = [];
    const client = new GatewayClient(env, (async () => {
      throw new Error("timeout");
    }) as any);
    const calls = new PaidCalls(
      env,
      {
        reserveSpend: (_id, cost) => {
          reserved.push(cost);
        },
        settleSpend: (_id, cost) => {
          settled.push(cost);
        },
        deferSpend: () => {},
      },
      "answer",
      1,
      client,
    );
    await expect(calls.complete(model(), [], 100)).rejects.toThrow("timeout");
    expect(reserved).toHaveLength(1);
    expect(settled).toEqual([null]);
    expect(calls.costLabel("usd", 158.1)).toContain("未確定");
    expect(calls.costLabel("jpy", 158.1)).toMatch(
      /^概算 ¥0\.00（失敗した呼び出しの費用は未確定）$/,
    );
  });
});

describe("evaluation", () => {
  const answers = [
    '{"name":"さかな","count":3}',
    "391",
    "会議は木曜日に東京で開催される。",
    '{"intervals":[["09:30","10:00"],["11:00","11:30"]]}',
    '{"method":"Array.from"}',
    '{"duration":14,"critical_path":["A","C","E","F"]}',
    "RED",
    "CHECK-4821",
  ];
  test("checks text, image and PDF independently, including valid local fixtures", async () => {
    let i = 0;
    const evaluation = await evaluateModel(
      model({ tags: ["vision", "file-input"] }),
      async (m, messages) => {
        const parts = messages[0].content as any[];
        if (Array.isArray(parts) && parts[1]?.type === "image_url") {
          const png = Buffer.from(parts[1].image_url.url.split(",")[1], "base64");
          expect(png.readUInt32BE(16)).toBe(64);
          const idat = png.indexOf(Buffer.from("IDAT"));
          const pixels = inflateSync(png.subarray(idat + 4, idat + 4 + png.readUInt32BE(idat - 4)));
          expect([...pixels.subarray(0, 4)]).toEqual([0, 255, 0, 0]);
        }
        if (Array.isArray(parts) && parts[1]?.type === "file") {
          expect(atob(parts[1].file.data)).toContain("CHECK-4821");
        }
        return {
          text: answers[i++],
          model: m.id,
          generationId: null,
          reasoningTokens: 0,
          finishReason: "stop",
          inputTokens: 1,
          outputTokens: 1,
          latencyMs: 1,
        };
      },
    );
    expect(i).toBe(8);
    expect(evaluation).toMatchObject({
      basic: true,
      balanced: true,
      complex: true,
      vision: true,
      pdf: true,
    });
  });
  test("a truncated or incorrect result cannot qualify the model", async () => {
    const evaluation = await evaluateModel(model(), async (m) => ({
      text: "391",
      model: m.id,
      generationId: null,
      reasoningTokens: 0,
      finishReason: "length",
      inputTokens: 1,
      outputTokens: 1,
      latencyMs: 1,
    }));
    expect(evaluation.basic).toBe(false);
    expect(evaluation.complex).toBe(false);
  });
  test("a failed basic probe stops the suite before further paid calls", async () => {
    let calls = 0;
    const evaluation = await evaluateModel(model(), async (m) => {
      calls++;
      return {
        text: "wrong",
        model: m.id,
        generationId: null,
        reasoningTokens: 0,
        finishReason: "stop",
        inputTokens: 1,
        outputTokens: 1,
        latencyMs: 1,
        cost: null,
        toolCalls: null,
      };
    });
    expect(calls).toBe(1);
    expect(evaluation.basic).toBe(false);
    expect(evaluation.latencyMs).toBe(1);
  });
});

describe("answer flow", () => {
  test("free errors distinguish provider outages from quality and attachment requirements", () => {
    const free = model({ id: "meta/free-test", input: 0, output: 0 });
    const registry = approved([free]);
    expect(freeUnavailableMessage(registry)).toContain("質問・回答品質・添付");
    registry.progress = {
      attemptsToday: 2,
      dailyLimit: 2,
      freeAttemptsToday: 1,
      freeDailyLimit: 3,
      budgetUsd: 0.5,
      nextRunAt: null,
      lastFailure: { model: free.id, reason: "Gatewayエラー（503）", at: Date.now() },
    };
    expect(freeUnavailableMessage(registry)).toContain("Gatewayエラー（503）");
    expect(freeUnavailableMessage(registry)).toContain("有料モデルへの切り替えは行いません");
  });
  function state(registry: Registry) {
    const db = new Database(":memory:");
    const ledger = new BudgetLedger((sql, ...params) => db.query(sql).all(...params) as any[]);
    return {
      ledger,
      prepareRegistry: async () => JSON.stringify(registry),
      reserveSpend: (id: string, amount: number, kind: "answer" | "evaluation") =>
        ledger.reserve(id, amount, kind, 10, 0.5, Date.now()),
      settleSpend: (id: string, cost: number | null) => ledger.settle(id, cost),
      deferSpend: (id: string, generationId: string) => ledger.defer(id, generationId, Date.now()),
      recordModelOutcome: async () => {},
    };
  }
  test("free Auto retries only free models without paid classification or web tools", async () => {
    const first = model({ id: "meta/free-test", input: 0, output: 0 });
    const second = model({ id: "deepseek/free-test", input: 0, output: 0, released: 90 });
    const store = state(approved([first, second, model()]));
    const bodies: any[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (_url: string, options?: RequestInit) => {
      const body = JSON.parse(String(options?.body));
      bodies.push(body);
      if (bodies.length === 1) return json({}, 429);
      return json({
        id: "free-generation",
        model: body.model,
        choices: [{ message: { content: "無料の回答" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1000, completion_tokens: 500 },
      });
    }) as any);
    const answer = await askAI(
      [{ role: "user", content: [{ type: "text", text: "https://example.com を説明して" }] }],
      { ...prefs, model: "auto-free" },
      env,
      store as any,
    );
    expect(bodies.map((body) => body.model)).toEqual([first.id, second.id]);
    expect(bodies.every((body) => !body.tools)).toBe(true);
    expect(answer).toContain("無料の回答");
    expect(store.ledger.summary(Date.now()).total).toBe(0);
  });
  test("free Auto fails closed when prices increase, tiers cost money or candidates are untested", async () => {
    const free = model({ id: "meta/free-test", input: 0, output: 0 });
    const tiered = model({
      input: 0,
      output: 0,
      tiers: [{ min: 10000, input: 1e-6, output: 1e-6 }],
    });
    expect(isFreeModel(tiered)).toBe(false);
    expect(evaluationCandidates({ ...approved([free]), evaluations: {} })).toContainEqual(free);
    const registry = approved([free, tiered, model()]);
    registry.models[0] = { ...free, output: 1e-6 };
    const fetcher = spyOn(globalThis, "fetch").mockImplementation((async () => {
      throw new Error("must not call a paid model");
    }) as any);
    await expect(
      askAI([], { ...prefs, model: "auto-free" }, env, state(registry) as any),
    ).rejects.toThrow("利用可能な無料モデルがありません");
    expect(fetcher).not.toHaveBeenCalled();
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    expect(
      rankModels({ ...approved([free]), evaluations: {} }, needs, 4096, 0.25, "auto-free"),
    ).toHaveLength(0);
  });
  test("classifier and answer share one ledger; billed totals replace reservations later", async () => {
    const registry = approved([model({ reasoning: [{ type: "toggle" }] })]);
    const store = state(registry);
    const bodies: any[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (_url: string, options?: RequestInit) => {
      const body = JSON.parse(String(options?.body));
      expect(new Headers(options?.headers).get("authorization")).toBe("Bearer test-key");
      bodies.push(body);
      return json({
        id: `g${bodies.length}`,
        choices: [
          {
            message: { content: bodies.length === 1 ? '{"tier":"balanced"}' : "説明です。" },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 1000, completion_tokens: 500 },
      });
    }) as any);
    const answer = await askAI(
      [{ role: "user", content: [{ type: "text", text: "仕組みを説明して" }] }],
      prefs,
      env,
      store as any,
    );
    expect(bodies).toHaveLength(2);
    expect(bodies[0].reasoning).toEqual({ enabled: false });
    expect(bodies[0].tools).toBeUndefined();
    expect(bodies[1].tool_choice).toBe("auto");
    // Gateway reported no tool counts, so the offered search is shown as having run once.
    expect(answer).toContain("概算 $0.00760");
    const pending = store.ledger.pending(10);
    expect(pending.map((row) => row.generationId)).toEqual(["g1", "g2"]);
    for (const row of pending) store.ledger.resolve(row.id, 0.001);
    expect(store.ledger.summary(Date.now()).total).toBeCloseTo(0.002);
    expect(store.ledger.oldestPending()).toBeNull();
  });
  test("cost shown includes server tools, preferring Gateway's own figures", async () => {
    const answerWith = async (gateway: Record<string, unknown>) => {
      spyOn(globalThis, "fetch").mockImplementation((async () =>
        json({
          id: "g",
          choices: [
            { message: { content: "ok", provider_metadata: { gateway } }, finish_reason: "stop" },
          ],
          usage: { prompt_tokens: 1000, completion_tokens: 500 },
        })) as any);
      return await askAI(
        [{ role: "user", content: [{ type: "text", text: "最新情報を教えて" }] }],
        { ...prefs, effort: "high" },
        env,
        state(approved([model()])) as any,
      );
    };
    expect(await answerWith({ cost: "0.0123" })).toContain("概算 $0.01230");
    expect(await answerWith({ gatewayToolCalls: { perplexity_search: 0 } })).toContain(
      "概算 $0.00130",
    );
    expect(await answerWith({ gatewayToolCalls: { perplexity_search: 2 } })).toContain(
      "概算 $0.01130",
    );
  });
  test("quality priority skips the classifier, since it could not change the choice", async () => {
    let calls = 0;
    spyOn(globalThis, "fetch").mockImplementation((async () => {
      calls++;
      return json({ id: "g", choices: [{ message: { content: "ok" }, finish_reason: "stop" }] });
    }) as any);
    await askAI(
      [{ role: "user", content: [{ type: "text", text: "仕組みを説明して" }] }],
      { ...prefs, effort: "high" },
      env,
      state(approved([model()])) as any,
    );
    expect(calls).toBe(1);
  });
  test("404 switches once to another approved model; failed request is not charged", async () => {
    const first = model();
    const second = model({ id: "google/gemini-test", output: 3e-6 });
    const store = state(approved([first, second]));
    const ids: string[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (_url: string, options?: RequestInit) => {
      const body = JSON.parse(String(options?.body));
      ids.push(body.model);
      if (ids.length === 1) return json({}, 404);
      return json({
        id: "g",
        model: body.model,
        choices: [{ message: { content: "こんにちは" }, finish_reason: "stop" }],
      });
    }) as any);
    const answer = await askAI(
      [{ role: "user", content: [{ type: "text", text: "こんにちは" }] }],
      prefs,
      env,
      store as any,
    );
    expect(ids).toEqual([first.id, second.id]);
    expect(answer).toContain(second.id);
    const [pending] = store.ledger.pending(10);
    store.ledger.resolve(pending.id, 0.001);
    expect(store.ledger.summary(Date.now()).total).toBeCloseTo(0.001);
  });
  test("missing keys and stale catalogs fail before billable calls", async () => {
    const fetcher = spyOn(globalThis, "fetch").mockImplementation((async () => {
      throw new Error("must not fetch");
    }) as any);
    await expect(
      askAI(
        [],
        prefs,
        { ...env, AI_GATEWAY_API_KEY: undefined },
        state(approved([model()])) as any,
      ),
    ).rejects.toThrow(ConfigurationError);
    const registry = approved([model()]);
    registry.refreshedAt = Date.now() - 3 * DAY_MS;
    await expect(askAI([], prefs, env, state(registry) as any)).rejects.toThrow("料金を更新");
    expect(fetcher).not.toHaveBeenCalled();
  });
  test("401 and uncertain failures never fall back to another paid request", async () => {
    const fetcher = spyOn(globalThis, "fetch").mockImplementation((async () =>
      json({}, 401)) as any);
    await expect(
      askAI(
        [{ role: "user", content: [{ type: "text", text: "こんにちは" }] }],
        prefs,
        env,
        state(approved([model(), model({ id: "google/gemini-test" })])) as any,
      ),
    ).rejects.toThrow(GatewayError);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
