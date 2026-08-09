// Parity checks against bot.py for the pure logic. Run with `bun test`.
import { describe, expect, test } from "bun:test";
import { chunkText } from "../src/chunk";
import { buildRequestKwargs, concatTextBlocks, summarizeFetches } from "../src/claude";
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
};

describe("settingsSummary", () => {
  test("matches bot.py's default rendering", () => {
    expect(settingsSummary(base)).toBe(
      "**現在の設定**\n" +
        "・表示モード: `自分だけに表示 (Ephemeral)`\n" +
        "・モデル: `claude-sonnet-5`\n" +
        "・思考モード: `ON (adaptive)`\n" +
        "・エフォート: `high`\n" +
        "・リンク読み込み: `ON`\n" +
        "・web検索: `ON`",
    );
  });

  test("blanks thinking and effort on a model that has neither", () => {
    const text = settingsSummary({ ...base, model: "claude-haiku-4-5" });
    expect(text).toContain("・思考モード: `— (このモデルは非対応)`");
    expect(text).toContain("・エフォート: `— (このモデルは非対応)`");
  });

  test("public display mode", () => {
    expect(settingsSummary({ ...base, ephemeral: false })).toContain(
      "・表示モード: `全員に表示 (Public)`",
    );
  });
});

describe("buildRequestKwargs", () => {
  test("adaptive thinking plus the modern server tools", () => {
    const k = buildRequestKwargs(base, 4096) as any;
    expect(k.thinking).toEqual({ type: "adaptive" });
    expect(k.output_config).toEqual({ effort: "high" });
    expect(k.tools.map((t: any) => t.type)).toEqual(["web_search_20260318", "web_fetch_20260318"]);
    expect(k.tools[1].max_content_tokens).toBe(30000);
  });

  test("Haiku 4.5 gets neither thinking nor effort, and the basic tools", () => {
    const k = buildRequestKwargs({ ...base, model: "claude-haiku-4-5" }, 4096) as any;
    expect(k.thinking).toBeUndefined();
    expect(k.output_config).toBeUndefined();
    expect(k.tools.map((t: any) => t.type)).toEqual(["web_search_20250305", "web_fetch_20250910"]);
  });

  test("Opus 5 with thinking off silently caps effort at high", () => {
    for (const effort of ["xhigh", "max"]) {
      const k = buildRequestKwargs(
        { ...base, model: "claude-opus-5", thinking: false, effort },
        4096,
      ) as any;
      expect(k.output_config).toEqual({ effort: "high" });
      expect(k.thinking).toEqual({ type: "disabled" });
    }
  });

  test("the same cap does not apply to other models, or while thinking is on", () => {
    expect(
      (
        buildRequestKwargs(
          { ...base, model: "claude-sonnet-5", thinking: false, effort: "max" },
          4096,
        ) as any
      ).output_config,
    ).toEqual({ effort: "max" });
    expect(
      (buildRequestKwargs({ ...base, model: "claude-opus-5", effort: "max" }, 4096) as any)
        .output_config,
    ).toEqual({ effort: "max" });
  });

  test("tools are omitted entirely when both are off", () => {
    const k = buildRequestKwargs({ ...base, web_fetch: false, web_search: false }, 4096) as any;
    expect(k.tools).toBeUndefined();
  });
});

describe("concatTextBlocks", () => {
  test("joins adjacent text blocks with no separator, so a citation split doesn't orphan punctuation", () => {
    // Reproduces the reported bug: citations split "...設立しました。" so the "。" arrives as
    // its own text block. Joining with "\n\n" left it stranded on a blank paragraph.
    expect(
      concatTextBlocks([
        { type: "text", text: "Anthropicを設立しました" },
        { type: "text", text: "。" },
        { type: "text", text: "\n\nAnthropicの企業形態はPBCです" },
        { type: "text", text: "。" },
      ]),
    ).toBe("Anthropicを設立しました。\n\nAnthropicの企業形態はPBCです。");
  });

  test("skips non-text blocks (thinking, tool_use, tool_result)", () => {
    expect(
      concatTextBlocks([
        { type: "thinking", thinking: "..." },
        { type: "text", text: "hello" },
        { type: "server_tool_use", name: "web_search" },
        { type: "text", text: " world" },
      ]),
    ).toBe("hello world");
  });

  test("empty content yields an empty string", () => {
    expect(concatTextBlocks([])).toBe("");
  });
});

describe("summarizeFetches", () => {
  test("web_search results arrive as an array, web_fetch as a single object", () => {
    const [used, failures] = summarizeFetches([
      { type: "text", text: "hi" },
      { type: "web_fetch_tool_result", content: { url: "https://a.example" } },
      {
        type: "web_search_tool_result",
        content: [{ url: "https://b.example" }, { url: "https://a.example" }],
      },
    ]);
    expect(used).toEqual(["https://a.example", "https://b.example"]);
    expect(failures).toEqual([]);
  });

  test("errors are collected from both shapes", () => {
    const [used, failures] = summarizeFetches([
      {
        type: "web_fetch_tool_result",
        content: { type: "web_fetch_tool_result_error", error_code: "url_not_accessible" },
      },
      { type: "web_search_tool_result", content: { error_code: "max_uses_exceeded" } },
    ]);
    expect(used).toEqual([]);
    expect(failures).toEqual(["url_not_accessible", "max_uses_exceeded"]);
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
