import { Database } from "bun:sqlite";
import { describe, expect, spyOn, test } from "bun:test";
import { answerFooter, askAI, costLabel } from "../src/ai/answer";
import { BudgetLedger } from "../src/ai/budget";
import type { Registry } from "../src/models/registry";
import { approved, env, json, model, prefs } from "./helpers/gateway-fixtures";

const sonnet = model({
  id: "anthropic/claude-sonnet-5.5",
  tags: ["tool-use", "vision", "file-input"],
  input: 2e-6,
  output: 10e-6,
  reasoning: [{ type: "effort", values: ["low", "medium", "high", "xhigh", "max"] }],
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

function sse(events: Record<string, unknown>[]): Response {
  const body = events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}

function anthropicStream(text: string) {
  return sse([
    {
      type: "message_start",
      message: {
        id: "msg_1",
        type: "message",
        role: "assistant",
        model: "claude-sonnet-5-5",
        content: [],
        stop_reason: null,
        usage: { input_tokens: 1000, output_tokens: 0 },
      },
    },
    { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } },
    { type: "content_block_stop", index: 0 },
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: { output_tokens: 500, server_tool_use: { web_search_requests: 1 } },
    },
    { type: "message_stop" },
  ]);
}

const question = [
  { role: "user" as const, content: [{ type: "text", text: "今日のニュースを調べて" }] },
];
const direct = { ...env, ANTHROPIC_API_KEY: "sk-ant-test" };
const manual = { ...prefs, model: sonnet.id };

describe("direct Anthropic for manually chosen Claude", () => {
  test("streams on the owner's key and books the final cost immediately", async () => {
    const store = state(approved([sonnet]));
    const calls: { url: string; body: any; key: string | null }[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (url: string, init?: RequestInit) => {
      calls.push({
        url: String(url),
        body: JSON.parse(String(init?.body)),
        key: new Headers(init?.headers).get("x-api-key"),
      });
      return anthropicStream("回答です");
    }) as any);
    const partials: string[] = [];
    const answer = await askAI(question, manual, direct, store as any, {
      status: async () => {},
      text: async (partial) => {
        partials.push(partial);
      },
    });
    expect(calls).toHaveLength(1);
    expect(calls[0].url).toContain("api.anthropic.com/v1/messages");
    expect(calls[0].key).toBe("sk-ant-test");
    expect(calls[0].body.model).toBe("claude-sonnet-5-5");
    expect(calls[0].body.thinking).toEqual({ type: "adaptive" });
    expect(calls[0].body.output_config.effort).toBeString();
    expect(calls[0].body.tools.map((t: any) => t.type)).toEqual(["web_search_20260209"]);
    expect(calls[0].body.system).toContain("Answer the user's request");
    expect(partials.at(-1)).toBe("回答です");
    expect(answer.direct).toBe(true);
    const usd = 1000 * 2e-6 + 500 * 10e-6 + 0.01;
    expect(answer.cost.settledUsd).toBeCloseTo(usd, 10);
    expect(store.ledger.summary(Date.now()).total).toBeCloseTo(usd, 10);
    expect(costLabel(answer.cost, "usd", 150)).toStartWith("費用");
    expect(answerFooter(answer)).toContain("（Anthropic API）");
  });

  test("falls back to Gateway when the key is rejected or out of credit", async () => {
    const store = state(approved([sonnet]));
    const urls: string[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (url: string) => {
      urls.push(String(url));
      if (String(url).includes("anthropic.com"))
        return json({ type: "error", error: { type: "invalid_request_error" } }, 400);
      return json({
        id: "g1",
        model: sonnet.id,
        choices: [{ message: { content: "Gateway経由" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 1000, completion_tokens: 500 },
      });
    }) as any);
    const answer = await askAI(question, manual, direct, store as any);
    expect(urls.map((u) => new URL(u).hostname)).toEqual(["api.anthropic.com", "mock.invalid"]);
    expect(answer.text).toBe("Gateway経由");
    expect(answer.direct).toBe(false);
    expect(answer.cost.generationIds).toEqual(["g1"]);
  });

  test("Auto never goes direct", async () => {
    const store = state(approved([sonnet]));
    const urls: string[] = [];
    spyOn(globalThis, "fetch").mockImplementation((async (url: string) => {
      urls.push(String(url));
      return json({
        id: "g1",
        model: sonnet.id,
        choices: [{ message: { content: "ok" }, finish_reason: "stop" }],
        usage: { prompt_tokens: 10, completion_tokens: 5 },
      });
    }) as any);
    await askAI(question, prefs, direct, store as any);
    expect(urls.every((u) => !u.includes("anthropic.com"))).toBe(true);
  });
});
