// Parity checks against bot.py for the pure logic. Run with `bun test`.
import { describe, expect, test } from "bun:test";
import { chunkText } from "../src/chunk";
import { DISCORD_CHUNK_LIMIT } from "../src/constants";
import { attachmentBlocks, newBudget, normalizeTurns } from "../src/history";
import { settingsSummary } from "../src/settings-ui";
import type { Prefs } from "../src/types";

const base: Prefs = {
  ephemeral: true,
  model: "claude-sonnet-5",
  thinking: true,
  effort: "high",
  web_fetch: true,
  web_search: true,
  currency: "jpy",
};

describe("settingsSummary", () => {
  test("renders shared Gateway thinking controls", () => {
    const text = settingsSummary(base);
    expect(text).toContain("次の質問から反映");
    expect(text).toContain("品質優先");
    expect(text).toContain("検索 ON（必要なとき）");
  });

  test("does not claim unsupported controls are sent to a selected model", () => {
    const text = settingsSummary({ ...base, model: "claude-haiku-4-5" });
    expect(text).toContain("非対応モデルでは差が出ない場合");
    expect(text).toContain("品質優先");
  });

  test("public display mode", () => {
    expect(settingsSummary({ ...base, ephemeral: false })).toContain("**公開範囲**　全員に公開");
  });
});

describe("normalizeTurns", () => {
  test("merges consecutive same-role turns", () => {
    expect(
      normalizeTurns([
        { role: "user", content: [{ type: "text", text: "a" }] },
        { role: "user", content: [{ type: "text", text: "b" }] },
        { role: "assistant", content: [{ type: "text", text: "c" }] },
      ]),
    ).toEqual([
      {
        role: "user",
        content: [
          { type: "text", text: "a" },
          { type: "text", text: "b" },
        ],
      },
      { role: "assistant", content: [{ type: "text", text: "c" }] },
    ]);
  });

  test("does not mutate the turns it was handed", () => {
    const original = [
      { role: "user" as const, content: [{ type: "text", text: "a" }] },
      { role: "user" as const, content: [{ type: "text", text: "b" }] },
    ];
    normalizeTurns(original);
    expect(original[0].content).toHaveLength(1);
  });
});

describe("chunkText", () => {
  test("splits at the Discord limit and never returns an empty list", () => {
    expect(chunkText("")).toEqual([""]);
    const long = "あ".repeat(DISCORD_CHUNK_LIMIT * 2 + 5);
    const chunks = chunkText(long);
    expect(chunks).toHaveLength(3);
    expect(chunks.map((c) => Array.from(c).length)).toEqual([
      DISCORD_CHUNK_LIMIT,
      DISCORD_CHUNK_LIMIT,
      5,
    ]);
    expect(chunks.join("")).toBe(long);
  });

  test("keeps surrogate pairs intact across a boundary", () => {
    const filler = "x".repeat(DISCORD_CHUNK_LIMIT - 1);
    const chunks = chunkText(`${filler}🎉y`);
    expect(chunks[0].endsWith("🎉")).toBe(true);
    expect(chunks[1]).toBe("y");
  });
});

describe("attachmentBlocks", () => {
  const att = (over: Record<string, unknown> = {}) => ({
    id: "1",
    filename: "a.png",
    size: 1000,
    url: "https://cdn.discordapp.com/attachments/1/2/a.png?ex=1&is=2&hm=3",
    content_type: "image/png",
    ...over,
  });

  test("labels the file and puts it before the prompt, using a url source", () => {
    expect(attachmentBlocks([att()], newBudget())).toEqual([
      { type: "text", text: "[添付: a.png]" },
      { type: "image", source: { type: "url", url: att().url } },
    ]);
  });

  test("PDFs become document blocks", () => {
    const blocks = attachmentBlocks(
      [att({ filename: "d.pdf", content_type: "application/pdf" })],
      newBudget(),
    );
    expect(blocks[1].type).toBe("document");
  });

  test("parameterised content types still match", () => {
    const blocks = attachmentBlocks(
      [att({ content_type: "image/png; charset=binary" })],
      newBudget(),
    );
    expect(blocks).toHaveLength(2);
  });

  test("rejects unsupported types and oversized files", () => {
    expect(attachmentBlocks([att({ content_type: "text/plain" })], newBudget())).toEqual([]);
    expect(attachmentBlocks([att({ size: 6 * 1024 * 1024 })], newBudget())).toEqual([]);
  });

  test("stops at eight files across the whole chain", () => {
    const budget = newBudget();
    const many = Array.from({ length: 12 }, () => att());
    expect(attachmentBlocks(many, budget)).toHaveLength(16);
    expect(budget.count).toBe(8);
  });
});
