import { describe, expect, test } from "bun:test";
import { normalizeModelPreference, PaidCalls } from "../src/ai/answer";
import { GatewayClient, GatewayError, reasoningOptions, toChatMessages } from "../src/ai/gateway";
import { attachmentBlocks, buildHistoryFromMessage, newBudget } from "../src/discord/history";
import { MAX_ATTACHMENT_BYTES, MAX_TOTAL_ATTACHMENT_BYTES } from "../src/shared/constants";
import { env, json, model } from "./helpers/gateway-fixtures";

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
