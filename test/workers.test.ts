import { Database } from "bun:sqlite";
import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import { BENCHMARK_REVIEWS } from "../src/benchmark-reviews";
import type { Env } from "../src/constants";
import { handleInteraction } from "../src/interactions";
import {
  DAY_MS,
  DISCOVERY_VERSION,
  isApproved,
  type ModelInfo,
  type Registry,
  revision,
} from "../src/model-registry";
import { deferSettings, isSettingsInteraction } from "../src/settings-dispatch";
import {
  CID_CURRENCY,
  CID_FILTER,
  CID_MODE,
  CID_MODEL,
  CID_PAGE,
  CID_QUALITY,
  CID_REFRESH,
  CID_VIEW,
  CID_VISIBILITY,
} from "../src/settings-ui";

mock.module("cloudflare:workers", () => ({
  DurableObject: class {
    constructor(
      public ctx: any,
      public env: any,
    ) {}
  },
}));
const { StateDO } = await import("../src/state-do");
const { JobDO } = await import("../src/job-do");
afterEach(() => mock.restore());

function context() {
  const db = new Database(":memory:");
  const kv = new Map<string, any>();
  let alarm: number | null = null;
  let gate = Promise.resolve();
  const ctx = {
    storage: {
      sql: {
        exec: (sql: string, ...params: any[]) => {
          const rows = db.query(sql).all(...params);
          return { toArray: () => rows };
        },
      },
      get: async (key: string) => structuredClone(kv.get(key)),
      put: async (key: string, value: any) => {
        kv.set(key, structuredClone(value));
      },
      deleteAll: async () => {
        kv.clear();
        alarm = null;
      },
      getAlarm: async () => alarm,
      setAlarm: async (value: number) => {
        alarm = value;
      },
      transactionSync: (fn: () => any) => db.transaction(fn)(),
    },
    blockConcurrencyWhile: (fn: () => Promise<any>) => {
      const result = gate.then(fn);
      gate = result.then(() => {});
      return result;
    },
  };
  return { ctx, kv, db, ready: () => gate };
}
function setup(extra: Partial<Env> = {}) {
  const storage = context();
  const env = {
    AI_GATEWAY_API_KEY: "test-key",
    AI_GATEWAY_BASE_URL: "https://mock.invalid/v1",
    DISCORD_APPLICATION_ID: "app",
    DISCORD_API_BASE: "https://discord.mock/v10",
    DISCORD_BOT_TOKEN: "bot-test",
    ALLOWED_USER_IDS: "123",
    CLAUDE_MAX_TOKENS: "4096",
    ...extra,
  } as Env;
  const state = new StateDO(storage.ctx as any, env);
  env.STATE_DO = { idFromName: (name: string) => name, get: () => state } as any;
  return { ...storage, env, state };
}
function model(id = "google/gemini-test"): ModelInfo {
  return {
    id,
    name: id,
    released: 100,
    context: 100_000,
    maxOutput: 4096,
    tags: [],
    input: 0.1e-6,
    output: 0.4e-6,
    preview: false,
    reasoning: [],
  };
}
function registry(): Registry {
  const m = model();
  return {
    discoveryVersion: DISCOVERY_VERSION,
    refreshedAt: Date.now(),
    models: [m],
    evaluations: {
      [m.id]: {
        revision: revision(m),
        testedAt: Date.now(),
        basic: true,
        balanced: true,
        complex: true,
        vision: false,
        pdf: false,
        latencyMs: 1,
        failures: 0,
        disabledUntil: 0,
      },
    },
  };
}
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
const answers = [
  '{"name":"さかな","count":3}',
  "391",
  "会議は木曜日に東京で開催される。",
  '{"intervals":[["09:30","10:00"],["11:00","11:30"]]}',
  '{"method":"Array.from"}',
  '{"duration":14,"critical_path":["A","C","E","F"]}',
];

describe("StateDO", () => {
  test("free evaluation resumes passed probes after recovery instead of staying blocked for a day", async () => {
    const { state, ready, kv, ctx } = setup();
    await ready();
    const now = Date.now();
    const day = new Date(now + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const free = { ...model("poolside/free-test"), input: 0, output: 0, maxOutput: 32768 };
    kv.set("ai_registry", { ...registry(), models: [free], evaluations: {} });
    kv.set("ai_free_evaluation_day_v2", { day, ids: [free.id, free.id, free.id] });
    kv.set("ai_evaluation_day", { day, ids: ["openai/gpt-test", "google/gemini-test"] });
    kv.set("ai_maintenance_due", now + DAY_MS);
    let recovered = false;
    let passed = 0;
    let calls = 0;
    spyOn(globalThis, "fetch").mockImplementation((async (_url: string, options?: RequestInit) => {
      const body = JSON.parse(String(options?.body));
      expect(body.model).toBe(free.id);
      calls++;
      if (!recovered && passed > 0) return json({}, 503);
      return json({
        choices: [{ message: { content: answers[passed++] }, finish_reason: "stop" }],
      });
    }) as any);
    const failed = JSON.parse(await state.prepareRegistry(true, true, "strong"));
    expect(calls).toBe(3);
    expect(failed.progress.freeAttemptsToday).toBe(4);
    expect(await ctx.storage.getAlarm()).toBeLessThan(now + 6 * 60 * 1000);
    await state.prepareRegistry(true, true, "strong");
    expect(calls).toBe(3);
    spyOn(Date, "now").mockReturnValue(now + 6 * 60 * 1000);
    recovered = true;
    const result = JSON.parse(await state.prepareRegistry(true, true, "strong"));
    expect(calls).toBe(8);
    expect(passed).toBe(6);
    expect(result.evaluations[free.id].complex).toBe(true);
    expect(result.progress.lastFailure).toBeUndefined();
    expect(result.progress.freeAttemptsToday).toBe(5);
    expect(result.progress.attemptsToday).toBe(2);
  });
  test("free bootstrap ignores exhausted paid quota and tries another model after a transient failure", async () => {
    const { state, ready, kv } = setup();
    await ready();
    const day = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const free = { ...model("meta/free-test"), input: 0, output: 0, maxOutput: 32768 };
    const broken = { ...free, id: "deepseek/free-test", released: 200 };
    kv.set("ai_registry", { ...registry(), models: [broken, free, model()] });
    kv.set("ai_evaluation_day", { day, ids: ["openai/gpt-test", "google/gemini-test"] });
    let calls = 0;
    let failed = 0;
    spyOn(globalThis, "fetch").mockImplementation((async (_url: string, options?: RequestInit) => {
      const body = JSON.parse(String(options?.body));
      if (body.model === broken.id) {
        failed++;
        return json({}, 503);
      }
      expect(body.model).toBe(free.id);
      expect(body.max_tokens).toBeGreaterThanOrEqual(4864);
      return json({ choices: [{ message: { content: answers[calls++] }, finish_reason: "stop" }] });
    }) as any);
    const result = JSON.parse(await state.prepareRegistry(true, true, "strong"));
    expect(failed).toBe(2);
    expect(calls).toBe(6);
    expect(result.evaluations[free.id].complex).toBe(true);
    expect(result.progress.attemptsToday).toBe(2);
    expect(result.progress.freeAttemptsToday).toBe(2);
    expect(kv.get("ai_evaluation_day").ids).toHaveLength(2);
  });
  test("free Auto evaluates other creators with no paid evaluation budget and counts daily attempts", async () => {
    const { state, ready, kv } = setup({ AI_EVALUATION_BUDGET_USD: "0" });
    await ready();
    const free = { ...model("meta/free-test"), input: 0, output: 0 };
    const other = { ...free, id: "deepseek/free-test" };
    kv.set("ai_registry", { ...registry(), models: [free, other, model()], evaluations: {} });
    let calls = 0;
    spyOn(globalThis, "fetch").mockImplementation((async (_url: string, options?: RequestInit) => {
      const body = JSON.parse(String(options?.body));
      expect([free.id, other.id]).toContain(body.model);
      return json({
        choices: [
          { message: { content: answers[calls++ % answers.length] }, finish_reason: "stop" },
        ],
      });
    }) as any);
    const first = JSON.parse(await state.prepareRegistry(true, true));
    expect(calls).toBe(6);
    expect(first.progress.freeAttemptsToday).toBe(1);
    expect(first.progress.attemptsToday).toBe(0);
    const adopted = first.models.find((m: ModelInfo) => isApproved(first, m));
    expect(adopted).toBeDefined();
    kv.get("ai_registry").evaluations = {};
    const second = JSON.parse(await state.prepareRegistry(true, true));
    expect(calls).toBe(12);
    expect(second.progress.freeAttemptsToday).toBe(2);
    kv.get("ai_registry").evaluations = {};
    await state.prepareRegistry(true, true);
    expect(calls).toBe(12);
  });
  test("defaults to Auto and retains existing user preferences", async () => {
    const { state, ready } = setup();
    await ready();
    expect(state.getPrefs("new")).toMatchObject({
      model: "auto",
      effort: "medium",
      ephemeral: false,
    });
    state.setPref("old", "model", "claude-haiku-4-5");
    state.setPref("old", "ephemeral", false);
    expect(state.getPrefs("old")).toMatchObject({ model: "claude-haiku-4-5", ephemeral: false });
    state.setPref("private", "ephemeral", true);
    state.setPref("private", "model", "auto-free");
    expect(state.getPrefs("private")).toMatchObject({ model: "auto-free", ephemeral: true });
  });
  test("concurrent bootstraps share one catalog fetch and one complete evaluation suite", async () => {
    const { state, ready, kv } = setup();
    await ready();
    let catalog = 0;
    let paid = 0;
    spyOn(globalThis, "fetch").mockImplementation((async (url: string) => {
      if (url.includes("/models")) {
        catalog++;
        return json({
          data: [
            {
              id: "google/gemini-test",
              name: "Test",
              type: "language",
              context_window: 100000,
              max_tokens: 4096,
              tags: [],
              created: 100,
              pricing: { input: "0.0000001", output: "0.0000004" },
            },
          ],
        });
      }
      if (url.includes("/generation")) return json({ data: { total_cost: 0.001 } });
      if (url.includes("/chat/completions")) {
        const answer = answers[paid++];
        return json({
          id: `g${paid}`,
          choices: [{ message: { content: answer }, finish_reason: "stop" }],
        });
      }
      throw new Error("unexpected request");
    }) as any);
    const responses = await Promise.all([state.prepareRegistry(), state.prepareRegistry()]);
    expect(catalog).toBe(1);
    expect(paid).toBe(6);
    expect(responses[0]).toEqual(responses[1]);
    const result = JSON.parse(responses[0]) as Registry;
    expect(isApproved(result, result.models[0])).toBe(true);
    expect(kv.get("ai_evaluation_day").ids).toHaveLength(1);
  });
  test("incomplete evaluations expose a safe reason and daily progress without revealing credentials", async () => {
    const { state, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    kv.get("ai_registry").evaluations = {};
    spyOn(globalThis, "fetch").mockImplementation(
      (async () => new Response("Insufficient credit", { status: 402 })) as any,
    );
    const result = JSON.parse(await state.prepareRegistry());
    expect(result.progress.attemptsToday).toBe(1);
    expect(result.progress.lastFailure.reason).toBe("Gateway残高不足");
    expect(result.evaluations).toEqual({});
    expect(JSON.stringify(result.progress)).not.toContain("test-key");
  });
  test("obsolete safety-model attempts cannot prevent general chat bootstrap; valid attempts still do", async () => {
    const { state, ready, kv } = setup();
    await ready();
    const day = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    kv.set("ai_registry", { ...registry(), evaluations: {} });
    kv.set("ai_evaluation_day", {
      day,
      ids: ["openai/gpt-oss-safeguard-120b", "anthropic/claude-test"],
    });
    let paid = 0;
    spyOn(globalThis, "fetch").mockImplementation((async (url: string) => {
      if (url.includes("/generation")) return json({ data: { total_cost: 0.001 } });
      return json({
        id: `g${paid}`,
        choices: [{ message: { content: answers[paid++] }, finish_reason: "stop" }],
      });
    }) as any);
    const result = JSON.parse(await state.prepareRegistry());
    expect(paid).toBe(6);
    expect(isApproved(result, result.models[0])).toBe(true);
    expect(result.progress.attemptsToday).toBe(2);
    expect(kv.get("ai_evaluation_day").ids).toEqual(["anthropic/claude-test", model().id]);
    kv.get("ai_registry").evaluations = {};
    await state.prepareRegistry();
    expect(paid).toBe(6);
  });
  test("manual catalog preparation never performs paid evaluation", async () => {
    const { state, ready } = setup();
    await ready();
    const fetcher = spyOn(globalThis, "fetch").mockImplementation((async (url: string) => {
      expect(url).toContain("/models");
      return json({
        data: [
          {
            id: "google/gemini-test",
            type: "language",
            context_window: 100000,
            max_tokens: 4096,
            tags: [],
            pricing: { input: "0.0000001", output: "0.0000004" },
          },
        ],
      });
    }) as any);
    const result = JSON.parse(await state.prepareRegistry(false));
    expect(result.models).toHaveLength(1);
    expect(result.evaluations).toEqual({});
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  test("catalog upgrades refresh existing snapshots without losing user preferences", async () => {
    const { state, ready, kv, ctx } = setup();
    await ready();
    const old = registry();
    delete old.discoveryVersion;
    kv.set("ai_registry", old);
    state.setPref("123", "model", model().id);
    await state.getRegistryJson();
    expect(await ctx.storage.getAlarm()).not.toBeNull();
    const fetcher = spyOn(globalThis, "fetch").mockImplementation(
      (async () =>
        new Response(
          JSON.stringify({
            data: [
              {
                id: "deepseek/deepseek-test",
                type: "language",
                name: "DeepSeek",
                context_window: 100000,
                max_tokens: 4096,
                pricing: { input: "0.0000003", output: "0.000001" },
                tags: [],
              },
            ],
          }),
        )) as any,
    );
    const refreshed = JSON.parse(await state.prepareRegistry(false));
    expect(refreshed.discoveryVersion).toBe(DISCOVERY_VERSION);
    expect(refreshed.models[0].id).toBe("deepseek/deepseek-test");
    expect(state.getPrefs("123").model).toBe(model().id);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  test("reservations are atomic and include background evaluation spend", async () => {
    const { state, ready } = setup({ AI_MONTHLY_BUDGET_USD: "1", AI_EVALUATION_BUDGET_USD: "0.2" });
    await ready();
    state.reserveSpend("a", 0.15, "evaluation");
    expect(() => state.reserveSpend("b", 0.15, "evaluation")).toThrow();
    state.reserveSpend("c", 0.8, "answer");
    expect(() => state.reserveSpend("d", 0.1, "answer")).toThrow();
    state.settleSpend("c", 0.1);
    state.reserveSpend("d", 0.1, "answer");
  });
  test("existing preference rows gain the currency setting, defaulting to yen", async () => {
    const storage = context();
    storage.db.run(`CREATE TABLE prefs (
      user_id TEXT PRIMARY KEY, ephemeral INTEGER NOT NULL DEFAULT 1, model TEXT NOT NULL,
      thinking INTEGER NOT NULL DEFAULT 1, effort TEXT NOT NULL DEFAULT 'high',
      web_fetch INTEGER NOT NULL DEFAULT 1, web_search INTEGER NOT NULL DEFAULT 1)`);
    storage.db.run("INSERT INTO prefs (user_id, model) VALUES ('123', 'auto')");
    const state = new StateDO(storage.ctx as any, { CLAUDE_MAX_TOKENS: "4096" } as Env);
    await storage.ready();
    expect(state.getPrefs("123")).toMatchObject({ model: "auto", currency: "jpy" });
    expect(state.setPref("123", "currency", "usd").currency).toBe("usd");
    expect(state.getPrefs("123")).toMatchObject({ model: "auto", currency: "usd" });
    expect(state.getPrefs("new").currency).toBe("jpy");
  });
  test("the currency button is routed as a settings action and flips only the owner's display", async () => {
    const { env, state, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const click = (customId: string) => ({
      id: "i",
      type: 3,
      token: "t",
      application_id: "app",
      user: { id: "123" },
      data: { custom_id: customId },
    });
    expect(isSettingsInteraction(click(`${CID_CURRENCY}usd:123`))).toBe(true);
    const response = (await (
      await handleInteraction(click(`${CID_CURRENCY}usd:123`), env)
    ).json()) as any;
    expect(response.type).toBe(7);
    expect(response.data.content).toContain("**費用の表示**　ドル");
    expect(state.getPrefs("123").currency).toBe("usd");
    const denied = (await (
      await handleInteraction(click(`${CID_CURRENCY}jpy:999`), env)
    ).json()) as any;
    expect(denied.data.content).toContain("あなたの設定画面ではありません");
    await handleInteraction(click(`${CID_CURRENCY}eur:123`), env);
    expect(state.getPrefs("123").currency).toBe("usd");
  });
  test("deferred costs settle from billing records without running maintenance early", async () => {
    const { state, ready, kv, ctx } = setup({ AI_MONTHLY_BUDGET_USD: "1" });
    await ready();
    kv.set("ai_maintenance_due", Date.now() + DAY_MS);
    state.reserveSpend("a", 0.9, "answer");
    await state.deferSpend("a", "gen_a");
    const alarm = await ctx.storage.getAlarm();
    expect(alarm).toBeLessThanOrEqual(Date.now() + 5_000);
    let lookups = 0;
    const fetcher = spyOn(globalThis, "fetch").mockImplementation((async (url: string) => {
      expect(url).toContain("/generation?id=gen_a");
      lookups++;
      return lookups === 1 ? json({}, 404) : json({ data: { total_cost: 0.01 } });
    }) as any);
    await state.alarm();
    // Not ingested yet: the reservation still blocks the budget and another try is scheduled.
    expect(() => state.reserveSpend("b", 0.2, "answer")).toThrow();
    expect(await ctx.storage.getAlarm()).toBeLessThan(Date.now() + DAY_MS);
    await state.alarm();
    state.reserveSpend("b", 0.2, "answer");
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(await ctx.storage.getAlarm()).toBeGreaterThan(Date.now() + DAY_MS - 60_000);
  });
  test("concurrent failures activate the circuit breaker without losing increments", async () => {
    const { state, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    await Promise.all([
      state.recordModelOutcome(model().id, false),
      state.recordModelOutcome(model().id, false),
      state.recordModelOutcome(model().id, false),
    ]);
    const result = JSON.parse(await state.getRegistryJson()) as Registry;
    expect(result.evaluations[model().id].failures).toBe(3);
    expect(isApproved(result, result.models[0])).toBe(false);
  });
  test("connection probes use the shared evaluation ledger, do not forge quality records, and skip confirmed models", async () => {
    const { state, ready, kv } = setup();
    await ready();
    const review = BENCHMARK_REVIEWS[2];
    const m = {
      ...model(review.id),
      released: review.released,
      reasoning: [{ type: "effort", values: ["low", "medium", "high"] }],
    };
    kv.set("ai_registry", {
      discoveryVersion: DISCOVERY_VERSION,
      refreshedAt: Date.now(),
      models: [m],
      evaluations: {},
    });
    let paid = 0;
    spyOn(globalThis, "fetch").mockImplementation((async (url: string) => {
      if (url.includes("/generation")) return json({ data: { total_cost: 0.001 } });
      paid++;
      return json({
        id: "probe",
        choices: [{ message: { content: "CONNECTION_OK" }, finish_reason: "stop" }],
      });
    }) as any);
    expect(await state.checkBenchmarkedConnections()).toEqual([
      { model: m.id, status: "confirmed" },
    ]);
    expect(paid).toBe(1);
    expect(JSON.parse(await state.getRegistryJson()).evaluations).toEqual({});
    expect(await state.checkBenchmarkedConnections()).toEqual([
      { model: m.id, status: "already-confirmed" },
    ]);
    expect(paid).toBe(1);
    const disabled = setup({ AI_EVALUATION_BUDGET_USD: "0" });
    await disabled.ready();
    disabled.kv.set("ai_registry", {
      discoveryVersion: DISCOVERY_VERSION,
      refreshedAt: Date.now(),
      models: [m],
      evaluations: {},
    });
    expect(await disabled.state.checkBenchmarkedConnections()).toEqual([
      { model: m.id, status: "budget-limit" },
    ]);
    expect(paid).toBe(1);
  });
  test("published models record connection outcomes and back off after three failures even without test records", async () => {
    const { state, ready, kv } = setup();
    await ready();
    const review = BENCHMARK_REVIEWS[2];
    const m = { ...model(review.id), released: review.released };
    kv.set("ai_registry", {
      discoveryVersion: DISCOVERY_VERSION,
      refreshedAt: Date.now(),
      models: [m],
      evaluations: {},
    });
    await state.recordModelOutcome(m.id, true);
    let result = JSON.parse(await state.getRegistryJson());
    expect(result.evaluations).toEqual({});
    expect(result.outcomes[m.id].successes).toBe(1);
    expect(isApproved(result, m)).toBe(true);
    await Promise.all([
      state.recordModelOutcome(m.id, false),
      state.recordModelOutcome(m.id, false),
      state.recordModelOutcome(m.id, false),
    ]);
    result = JSON.parse(await state.getRegistryJson());
    expect(result.outcomes[m.id].failures).toBe(3);
    expect(isApproved(result, m)).toBe(false);
  });
  test("disabled evaluation and missing API keys never generate paid calls", async () => {
    const configured = setup({ AI_EVALUATION_BUDGET_USD: "0" });
    await configured.ready();
    configured.kv.set("ai_registry", { ...registry(), evaluations: {} });
    configured.kv.set("ai_evaluation_day", {
      day: new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10),
      ids: ["openai/gpt-previous"],
    });
    const fetcher = spyOn(globalThis, "fetch").mockImplementation((async () => {
      throw new Error("must not fetch");
    }) as any);
    await configured.state.alarm();
    expect(JSON.parse(await configured.state.getRegistryJson()).evaluations).toEqual({});
    expect(await configured.ctx.storage.getAlarm()).toBeGreaterThan(Date.now() + DAY_MS - 1000);
    const unconfigured = setup({ AI_GATEWAY_API_KEY: undefined });
    await unconfigured.ready();
    await unconfigured.state.scheduleMaintenance();
    await unconfigured.state.alarm();
    expect(await unconfigured.ctx.storage.getAlarm()).toBeNull();
    expect(fetcher).not.toHaveBeenCalled();
  });
});

describe("Discord delivery and regeneration", () => {
  test("refreshing a recent catalog reveals newly eligible models without paid evaluation", async () => {
    const { state, env, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const fetcher = spyOn(globalThis, "fetch").mockImplementation((async (url: string) => {
      expect(url).toContain("/models?include_availability=true");
      return new Response(
        JSON.stringify({
          data: [
            {
              id: "openai/gpt-6.1-sol",
              name: "GPT 6.1 Sol",
              type: "language",
              context_window: 100000,
              max_tokens: 4096,
              pricing: { input: "0.000002", output: "0.00001" },
              model_eligibility: { status: "eligible" },
            },
            {
              id: "anthropic/claude-sonnet-5.5",
              name: "Sonnet 5.5",
              type: "language",
              context_window: 100000,
              max_tokens: 4096,
              pricing: { input: "0.000002", output: "0.00001" },
              model_eligibility: { status: "eligible" },
            },
            {
              id: "mistral/test",
              name: "Mistral",
              type: "language",
              context_window: 100000,
              max_tokens: 4096,
              pricing: { input: "0.000001", output: "0.000002" },
              model_eligibility: { status: "eligible" },
            },
          ],
        }),
      );
    }) as any);
    const interaction = {
      id: "i",
      type: 3,
      token: "t",
      application_id: "app",
      user: { id: "123" },
      data: { custom_id: `${CID_REFRESH}models:123:all:0` },
    };
    expect(isSettingsInteraction(interaction)).toBe(true);
    const response = (await (await handleInteraction(interaction, env)).json()) as any;
    expect(response.type).toBe(7);
    expect(response.data.components[1].components[0].options.map((o: any) => o.value)).toContain(
      "openai/gpt-6.1-sol",
    );
    expect(JSON.parse(await state.getRegistryJson()).models).toHaveLength(3);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(state.getPrefs("123").model).toBe("auto");
    await handleInteraction(
      { ...interaction, data: { custom_id: `${CID_REFRESH}models:999:all:0` } },
      env,
    );
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  test("settings ACK does not wait for a slow Durable Object and remains private", async () => {
    const { env, ready } = setup();
    await ready();
    let finish: (() => void) | undefined;
    const pending = new Promise<void>((resolve) => {
      finish = resolve;
    });
    const jobs: any[] = [];
    env.JOB_DO = {
      idFromName: (name: string) => name,
      get: () => ({
        start: async (job: any) => {
          jobs.push(job);
          await pending;
        },
      }),
    } as any;
    const tasks: Promise<any>[] = [];
    const ctx = { waitUntil: (task: Promise<any>) => tasks.push(task) } as any;
    const interaction = {
      id: "i",
      type: 3,
      token: "t",
      application_id: "app",
      user: { id: "123" },
      data: { custom_id: `${CID_MODE}123`, values: ["manual"] },
    };
    expect(isSettingsInteraction(interaction)).toBe(true);
    expect(await deferSettings(interaction, env, ctx).json()).toEqual({ type: 6 });
    expect(jobs[0].kind).toBe("settings");
    expect(
      await deferSettings({ ...interaction, type: 2, data: { name: "settings" } }, env, ctx).json(),
    ).toEqual({ type: 5, data: { flags: 64 } });
    expect(
      await deferSettings({ ...interaction, user: { id: "999" } }, env, ctx).json(),
    ).toMatchObject({ type: 4, data: { flags: 64 } });
    expect(jobs.length).toBe(2);
    finish?.();
    await Promise.all(tasks);
    expect(isSettingsInteraction({ ...interaction, type: 2, data: { name: "ai" } })).toBe(false);
  });
  test("queued settings jobs render components after acknowledgement and preserve owner errors", async () => {
    const { env, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const requests: any[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (url: string, init: RequestInit) => {
      requests.push({ url, method: init.method, body: JSON.parse(init.body as string) });
      return new Response(JSON.stringify({ id: "settings-message" }));
    }) as any);
    const interaction = {
      id: "i",
      type: 3,
      token: "t",
      application_id: "app",
      user: { id: "123" },
      data: { custom_id: `${CID_MODE}123`, values: ["manual"] },
    };
    for (const custom_id of [`${CID_MODE}123`, `${CID_MODE}999`]) {
      const storage = context();
      const job = new JobDO(storage.ctx as any, env);
      await job.start({
        kind: "settings",
        token: "t",
        userId: "123",
        interactionJson: JSON.stringify({
          ...interaction,
          data: { ...interaction.data, custom_id },
        }),
      });
      await job.alarm();
    }
    expect(requests[0].method).toBe("PATCH");
    expect(requests[0].body.components).toHaveLength(3);
    expect(requests[0].body.content).toContain("手動モデルを選択");
    expect(requests[0].body.flags).toBeUndefined();
    expect(requests[1].method).toBe("POST");
    expect(requests[1].body.flags).toBe(64);
    expect(requests[1].body.content).toContain("あなたの設定画面ではありません");
  });
  test("settings delivery failure preserves the original controls and sends a private error", async () => {
    const { env, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const requests: any[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (_url: string, init: RequestInit) => {
      requests.push({ method: init.method, body: JSON.parse(init.body as string) });
      return init.method === "PATCH"
        ? new Response(JSON.stringify({ message: "Invalid Form Body" }), { status: 400 })
        : new Response(JSON.stringify({ id: "private-error" }));
    }) as any);
    const storage = context();
    const job = new JobDO(storage.ctx as any, env);
    await job.start({
      kind: "settings",
      token: "t",
      userId: "123",
      interactionJson: JSON.stringify({
        id: "i",
        type: 3,
        token: "t",
        application_id: "app",
        user: { id: "123" },
        data: { custom_id: `${CID_FILTER}123`, values: ["google"] },
      }),
    });
    await job.alarm();
    expect(requests.map((request) => request.method)).toEqual(["PATCH", "POST"]);
    expect(requests[1].body.flags).toBe(64);
    expect(requests[1].body.content).toContain("エラーが発生");
    expect(requests[1].body.components).toBeUndefined();
  });
  test("model browsing and filtering never overwrite the selected model, and selecting returns home", async () => {
    const { state, env, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const interact = async (custom_id: string, values: string[] = []) =>
      (await (
        await handleInteraction(
          {
            id: "i",
            type: 3,
            token: "t",
            application_id: "app",
            user: { id: "123" },
            data: { custom_id, values },
          },
          env,
        )
      ).json()) as any;
    const manual = await interact(`${CID_MODE}123`, ["manual"]);
    expect(manual.data.content).toContain("手動モデルを選択");
    expect(state.getPrefs("123").model).toBe("auto");
    const filtered = await interact(`${CID_FILTER}123`, ["google"]);
    expect(
      filtered.data.components[0].components[0].options.find((o: any) => o.default).value,
    ).toBe("google");
    const page = await interact(`${CID_PAGE}1:123:google`);
    expect(
      page.data.components[1].components[0].options.some((o: any) => o.value === model().id),
    ).toBe(true);
    expect(state.getPrefs("123").model).toBe("auto");
    const picked = await interact(`${CID_MODEL}123`, [model().id]);
    expect(picked.data.content).toContain("AIの設定");
    expect(state.getPrefs("123").model).toBe(model().id);
    await interact(`${CID_MODE}123`, ["auto"]);
    expect(state.getPrefs("123").model).toBe("auto");
    const freeMode = await interact(`${CID_MODE}123`, ["auto-free"]);
    expect(state.getPrefs("123").model).toBe("auto-free");
    expect(freeMode.data.content).toContain("無料モデルのみ");
    expect(freeMode.data.content).toContain("無料モードでは検索・リンク読み込みOFF");
  });
  test("quality and visibility save the intended state and reject forged settings", async () => {
    const { state, env, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const interact = async (custom_id: string, values: string[] = []) =>
      (await (
        await handleInteraction(
          {
            id: "i",
            type: 3,
            token: "t",
            application_id: "app",
            user: { id: "123" },
            data: { custom_id, values },
          },
          env,
        )
      ).json()) as any;
    await interact(`${CID_QUALITY}123`, ["high"]);
    expect(state.getPrefs("123")).toMatchObject({ thinking: true, effort: "high" });
    await interact(`${CID_QUALITY}123`, ["off"]);
    expect(state.getPrefs("123")).toMatchObject({ thinking: false, effort: "high" });
    await interact(`${CID_QUALITY}123`, ["medium"]);
    expect(state.getPrefs("123")).toMatchObject({ thinking: true, effort: "medium" });
    await interact(`${CID_VISIBILITY}123`, ["public"]);
    expect(state.getPrefs("123").ephemeral).toBe(false);
    await interact(`${CID_VISIBILITY}123`, ["private"]);
    expect(state.getPrefs("123").ephemeral).toBe(true);
    const saved = state.getPrefs("123");
    for (const [prefix, value] of [
      [CID_QUALITY, "high"],
      [CID_VISIBILITY, "public"],
      [CID_FILTER, "google"],
      [CID_MODE, "manual"],
    ]) {
      expect((await interact(`${prefix}999`, [value])).data.content).toContain(
        "あなたの設定画面ではありません",
      );
    }
    await interact(`${CID_QUALITY}123`, ["invalid"]);
    await interact(`${CID_VISIBILITY}123`, ["invalid"]);
    await interact(`${CID_FILTER}123`, ["invalid"]);
    expect(state.getPrefs("123")).toEqual(saved);
    expect((await interact(`${CID_VIEW}main:999`)).data.content).toContain(
      "あなたの設定画面ではありません",
    );
  });
  /** Webhook messages by id; `@original` resolves per interaction token. */
  function fakeDiscord() {
    const messages = new Map<string, any>();
    const originals = new Map<string, string>();
    const log: { method: string; id: string; body: any }[] = [];
    let next = 0;
    const handle = (url: string, options?: RequestInit) => {
      const method = options?.method ?? "GET";
      const body = options?.body ? JSON.parse(String(options.body)) : null;
      const [, token, target] = url.match(/webhooks\/app\/([^/?]+)(?:\/messages\/([^?]+))?/) ?? [];
      let id: string;
      if (method === "POST") id = String(++next);
      else if (target === "@original") {
        id = originals.get(token) ?? String(++next);
        originals.set(token, id);
      } else id = target;
      log.push({ method, id, body });
      if (method !== "GET")
        messages.set(id, {
          ...messages.get(id),
          ...body,
          id,
          channel_id: "channel",
          author: { id: "app" },
          attachments: [],
        });
      return json(messages.get(id));
    };
    return { messages, log, handle };
  }

  test("answers stream in with a status, end with buttons, and gain the billed cost later", async () => {
    const { state, env, kv, ready } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const discord = fakeDiscord();
    let paid = 0;
    spyOn(globalThis, "fetch").mockImplementation((async (url: string, options?: RequestInit) => {
      if (url.includes("/generation")) return json({ data: { total_cost: 0.001 } });
      if (url.includes("/chat/completions")) {
        paid++;
        return json({
          id: `g${paid}`,
          model: model().id,
          choices: [
            {
              message: { content: paid === 1 ? "あ".repeat(3000) : "再生成した回答です。" },
              finish_reason: "stop",
            },
          ],
        });
      }
      if (url.startsWith("https://discord.mock/")) return discord.handle(url, options);
      throw new Error("unexpected request");
    }) as any);
    const jobStorage = context();
    const job = new JobDO(jobStorage.ctx as any, env);
    await job.start({
      kind: "slash",
      token: "tok",
      userId: "123",
      ephemeral: true,
      prompt: "こんにちは",
      attachment: null,
    });
    await job.alarm();
    expect(discord.log[0].body.content).toMatch(
      /^\*\*Q:\*\* こんにちは\n\n\*\*A:\*\*\n-# .+… \d+秒$/,
    );
    const [first, second] = [discord.messages.get("1"), discord.messages.get("2")];
    expect(first.content.startsWith("**Q:** こんにちは")).toBe(true);
    expect(first.components).toEqual([]);
    expect(second.flags).toBe(64);
    expect(second.content).toEndWith(`-# モデル: ${model().id}`);
    expect(second.components[0].components.map((c: any) => c.custom_id)).toEqual([
      "ans:regen",
      "ans:cont",
    ]);
    expect(discord.log.every((d) => !d.body || d.body.allowed_mentions.parse.length === 0)).toBe(
      true,
    );
    const record = state.getRegenRecord("2");
    expect(record?.chunkIds).toEqual(["1", "2"]);
    expect(JSON.parse(record?.messagesJson ?? "[]")[0].content[0].text).toBe("こんにちは");

    // The billing record exists, so the next alarm appends the confirmed cost.
    expect(jobStorage.kv.get("costWatch")).toBeDefined();
    await job.alarm();
    expect(discord.messages.get("2").content).toMatch(/｜費用 ¥0\.16$/);
    expect(discord.messages.get("2").components).toHaveLength(1);
    expect(jobStorage.kv.size).toBe(0);

    state.setPref("123", "model", model().id);
    const regenStorage = context();
    const regen = new JobDO(regenStorage.ctx as any, env);
    await regen.start({ kind: "regen", token: "regen", userId: "123", messageId: "2" });
    await regen.alarm();
    expect(paid).toBe(2);
    expect(discord.messages.get("1").content).toContain("再生成した回答です。");
    expect(discord.messages.get("1").components).toHaveLength(1);
    expect(discord.messages.get("2").content).toContain("再生成後は不要");
    expect(discord.messages.get("2").components).toEqual([]);
    const ack = discord.messages.get("3");
    expect(ack.content).toBe("🔄 再生成しました。");
    expect(state.getRegenRecord("1")?.chunkIds).toEqual(["1"]);
    expect(state.getRegenRecord("2")).toBeNull();
  });

  test("an unconfirmed cost falls back to the estimate, and a replaced answer is left alone", async () => {
    const { env, kv, ready } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const discord = fakeDiscord();
    spyOn(globalThis, "fetch").mockImplementation((async (url: string, options?: RequestInit) => {
      if (url.includes("/generation")) return json({}, 404);
      if (url.includes("/chat/completions"))
        return json({
          id: "g",
          model: model().id,
          choices: [{ message: { content: "回答" }, finish_reason: "stop" }],
          usage: { prompt_tokens: 1000, completion_tokens: 500 },
        });
      if (url.startsWith("https://discord.mock/")) return discord.handle(url, options);
      throw new Error("unexpected request");
    }) as any);
    const run = async () => {
      const storage = context();
      const job = new JobDO(storage.ctx as any, env);
      await job.start({
        kind: "slash",
        token: `tok${Math.random()}`,
        userId: "123",
        ephemeral: false,
        prompt: "q",
        attachment: null,
      });
      await job.alarm();
      await job.alarm();
      // Billing is still missing: keep polling until the deadline.
      expect(storage.kv.get("costWatch").attempt).toBe(1);
      storage.kv.get("costWatch").deadline = 0;
      return { job, storage };
    };
    const late = await run();
    const id = late.storage.kv.get("costWatch").messageId;
    await late.job.alarm();
    expect(discord.messages.get(id).content).toMatch(/｜概算 ¥0\.0\d+$/);

    const replaced = await run();
    const otherId = replaced.storage.kv.get("costWatch").messageId;
    discord.messages.get(otherId).content = "再生成された別の回答";
    await replaced.job.alarm();
    expect(discord.messages.get(otherId).content).toBe("再生成された別の回答");
    expect(replaced.storage.kv.size).toBe(0);
  });

  test("forged model selections and someone else's settings do not change prefs", async () => {
    const { state, env, ready, kv } = setup();
    await ready();
    kv.set("ai_registry", registry());
    const interaction = {
      id: "i",
      type: 3,
      token: "t",
      application_id: "app",
      user: { id: "123" },
      data: { custom_id: `${CID_MODEL}123`, values: ["evil/model"] },
    };
    expect(
      ((await (await handleInteraction(interaction, env)).json()) as any).data.content,
    ).toContain("モデル一覧");
    expect(state.getPrefs("123").model).toBe("auto");
    interaction.data.custom_id = `${CID_MODEL}999`;
    interaction.data.values = [model().id];
    expect(
      ((await (await handleInteraction(interaction, env)).json()) as any).data.content,
    ).toContain("あなたの設定画面ではありません");
    expect(state.getPrefs("123").model).toBe("auto");
  });
});
