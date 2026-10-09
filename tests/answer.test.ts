import { Database } from "bun:sqlite";
import { describe, expect, mock, spyOn, test } from "bun:test";
import { askAI, ConfigurationError, costLabel, freeUnavailableMessage } from "../src/ai/answer";
import { BudgetLedger } from "../src/ai/budget";
import { GatewayClient, GatewayError } from "../src/ai/gateway";
import { analyzeTask, rankModels } from "../src/ai/routing";
import { DAY_MS, evaluationCandidates, isFreeModel, type Registry } from "../src/models/registry";
import { approved, env, json, model, prefs } from "./helpers/gateway-fixtures";

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
    expect(answer.text).toContain("無料の回答");
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
    expect(costLabel(answer.cost, "usd", 158.1)).toBe("概算 $0.00760");
    expect(answer.cost.generationIds).toEqual(["g1", "g2"]);
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
      const answer = await askAI(
        [{ role: "user", content: [{ type: "text", text: "最新情報を教えて" }] }],
        { ...prefs, effort: "high" },
        env,
        state(approved([model()])) as any,
      );
      return costLabel(answer.cost, "usd", 158.1);
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
    expect(answer.model).toBe(second.id);
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
  test("streamed answers report progress, split SSE lines, usage and in-band errors", async () => {
    const sse = (parts: string[]) =>
      new Response(
        new ReadableStream({
          start(controller) {
            for (const part of parts) controller.enqueue(new TextEncoder().encode(part));
            controller.close();
          },
        }),
        { headers: { "content-type": "text/event-stream" } },
      );
    const event = (data: unknown) => `data: ${JSON.stringify(data)}\n\n`;
    const whole =
      event({
        id: "gen-1",
        model: "google/gemini-test",
        choices: [{ delta: { content: "こん" } }],
      }) +
      event({ choices: [{ delta: { content: "にちは" }, finish_reason: "stop" }] }) +
      event({ choices: [], usage: { prompt_tokens: 1000, completion_tokens: 500 } }) +
      "data: [DONE]\n\n";
    const bodies: any[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (_url: string, options?: RequestInit) => {
      bodies.push(JSON.parse(String(options?.body)));
      // Split mid-line and mid-character to exercise buffering.
      return sse([whole.slice(0, 50), whole.slice(50, 51), whole.slice(51)]);
    }) as any);
    const statuses: string[] = [];
    const texts: string[] = [];
    const answer = await askAI(
      [{ role: "user", content: [{ type: "text", text: "こんにちは" }] }],
      { ...prefs, effort: "high" },
      env,
      state(approved([model()])) as any,
      {
        status: async (text) => {
          statuses.push(text);
        },
        text: async (partial) => {
          texts.push(partial);
        },
      },
    );
    expect(bodies[0].stream).toBe(true);
    expect(bodies[0].stream_options).toEqual({ include_usage: true });
    expect(statuses.length).toBeGreaterThan(0);
    expect(texts).toEqual(["こん", "こんにちは"]);
    expect(answer.text).toBe("こんにちは");
    expect(answer.cost.generationIds).toEqual(["gen-1"]);
    expect(costLabel(answer.cost, "usd", 158.1)).toBe("概算 $0.00130");

    mock.restore();
    spyOn(globalThis, "fetch").mockImplementation((async () =>
      sse([
        event({ id: "gen-2", choices: [{ delta: { content: "途中" } }] }),
        event({ error: { message: "upstream failed" } }),
      ])) as any);
    const client = new GatewayClient(env);
    await expect(
      client.complete(model(), [{ role: "user", content: "x" }], 100, {}, async () => {}),
    ).rejects.toMatchObject({ status: 502 });
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
