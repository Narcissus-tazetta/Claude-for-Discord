import { describe, expect, test } from "bun:test";
import { inflateSync } from "node:zlib";
import { evaluateModel } from "../src/models/evaluation";
import { model } from "./helpers/gateway-fixtures";

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
          cost: null,
          toolCalls: null,
          usageReported: true,
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
      cost: null,
      toolCalls: null,
      usageReported: true,
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
        usageReported: true,
      };
    });
    expect(calls).toBe(1);
    expect(evaluation.basic).toBe(false);
    expect(evaluation.latencyMs).toBe(1);
  });
});
