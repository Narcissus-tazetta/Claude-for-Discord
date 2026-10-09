import { describe, expect, test } from "bun:test";
import type { ChatMessage } from "../src/ai/gateway";
import {
  analyzeTask,
  answerPriority,
  answerReasoning,
  parseClassification,
  planCall,
  rankModels,
  reservationCost,
  serverTools,
} from "../src/ai/routing";
import type { Registry } from "../src/models/registry";
import {
  CID_PAGE,
  MODEL_FILTERS,
  modelBrowser,
  referenceCost,
  settingsComponents,
  settingsSummary,
} from "../src/settings/ui";
import { money, usdJpyRate, yen } from "../src/shared/currency";
import { approved, model, prefs } from "./helpers/gateway-fixtures";

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
