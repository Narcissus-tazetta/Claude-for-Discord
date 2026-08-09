import {
  MAX_SOURCES_SHOWN,
  MODELS_WITHOUT_CODE_EXECUTION,
  MODELS_WITHOUT_THINKING_SUPPORT,
  MSG_NO_TEXT,
  SERVER_TOOL_MAX_ROUNDS,
  WEB_FETCH_MAX_CONTENT_TOKENS,
  WEB_FETCH_MAX_USES,
  WEB_FETCH_TOOL_BASIC,
  WEB_FETCH_TOOL_MODERN,
  WEB_SEARCH_MAX_USES,
  WEB_SEARCH_TOOL_BASIC,
  WEB_SEARCH_TOOL_MODERN,
} from "./constants";
import type { AnthropicMessage, ContentBlock, Prefs } from "./types";

export class AnthropicError extends Error {
  constructor(
    readonly status: number,
    readonly body: string,
  ) {
    super(`Anthropic API ${status}: ${body.slice(0, 400)}`);
    this.name = "AnthropicError";
  }
}

export function buildRequestKwargs(prefs: Prefs, maxTokens: number): Record<string, unknown> {
  const model = prefs.model;
  const kwargs: Record<string, unknown> = { model, max_tokens: maxTokens };

  // The dynamic-filtering tool versions run on the code execution sandbox, so models
  // without it need the older variants (see MODELS_WITHOUT_CODE_EXECUTION).
  const basicOnly = MODELS_WITHOUT_CODE_EXECUTION.has(model);
  const tools: Record<string, unknown>[] = [];
  if (prefs.web_search) {
    tools.push({
      type: basicOnly ? WEB_SEARCH_TOOL_BASIC : WEB_SEARCH_TOOL_MODERN,
      name: "web_search",
      max_uses: WEB_SEARCH_MAX_USES,
    });
  }
  if (prefs.web_fetch) {
    tools.push({
      type: basicOnly ? WEB_FETCH_TOOL_BASIC : WEB_FETCH_TOOL_MODERN,
      name: "web_fetch",
      max_uses: WEB_FETCH_MAX_USES,
      max_content_tokens: WEB_FETCH_MAX_CONTENT_TOKENS,
    });
  }
  if (tools.length) kwargs.tools = tools;

  if (MODELS_WITHOUT_THINKING_SUPPORT.has(model)) return kwargs;

  let effort = prefs.effort;
  if (prefs.thinking) {
    kwargs.thinking = { type: "adaptive" };
  } else {
    // On Opus 5, disabling thinking is only accepted at effort "high" or below —
    // xhigh/max return a 400. Cap silently rather than surface an API error.
    if (model === "claude-opus-5" && (effort === "xhigh" || effort === "max")) {
      effort = "high";
    }
    kwargs.thinking = { type: "disabled" };
  }

  kwargs.output_config = { effort };
  return kwargs;
}

/**
 * Concatenate a single response's text blocks into one continuous string.
 *
 * Citations split one continuous answer into several adjacent text blocks — a sentence can
 * end mid-block, right before its citation — so these must be joined directly, with no
 * separator, or a trailing punctuation mark ends up orphaned on its own paragraph.
 */
export function concatTextBlocks(content: ContentBlock[]): string {
  return content
    .filter((b) => b.type === "text" && typeof b.text === "string")
    .map((b) => b.text as string)
    .join("");
}

/**
 * Pull the URLs the server tools used, plus any failures, out of a response.
 *
 * A successful web_search result is a *list* of results while an error is a single
 * object, so the two tools need slightly different unwrapping.
 */
export function summarizeFetches(content: ContentBlock[]): [string[], string[]] {
  const used: string[] = [];
  const failures: string[] = [];
  for (const block of content) {
    if (block.type === "web_fetch_tool_result") {
      const inner = block.content;
      if (inner?.type === "web_fetch_tool_result_error") {
        failures.push(inner.error_code ?? "unknown");
      } else {
        const url = inner?.url;
        if (url && !used.includes(url)) used.push(url);
      }
    } else if (block.type === "web_search_tool_result") {
      const inner = block.content;
      if (Array.isArray(inner)) {
        for (const result of inner) {
          const url = result?.url;
          if (url && !used.includes(url)) used.push(url);
        }
      } else {
        failures.push(inner?.error_code ?? "unknown");
      }
    }
  }
  return [used, failures];
}

interface AnthropicResponse {
  content: ContentBlock[];
  stop_reason: string | null;
  usage?: Record<string, number>;
}

/** Where and how to reach the Messages API. `baseUrl` is only overridden by tests. */
export interface AnthropicConfig {
  apiKey: string;
  baseUrl: string;
  maxTokens: number;
}

async function createMessage(
  config: AnthropicConfig,
  payload: Record<string, unknown>,
): Promise<AnthropicResponse> {
  const res = await fetch(`${config.baseUrl}/v1/messages`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new AnthropicError(res.status, await res.text().catch(() => ""));
  }
  return (await res.json()) as AnthropicResponse;
}

export async function askClaude(
  messages: AnthropicMessage[],
  prefs: Prefs,
  config: AnthropicConfig,
): Promise<string> {
  const maxTokensValue = config.maxTokens;
  const kwargs = buildRequestKwargs(prefs, maxTokensValue);
  let convo = [...messages];
  const texts: string[] = [];
  const fetched: string[] = [];
  const failures: string[] = [];
  let response: AnthropicResponse | null = null;

  for (let round = 0; round < SERVER_TOOL_MAX_ROUNDS; round++) {
    response = await createMessage(config, { ...kwargs, messages: convo });
    // Logged so real spend is auditable in `wrangler tail` rather than guessed at afterwards.
    console.log(
      `anthropic ${prefs.model} round=${round} usage=${JSON.stringify(response.usage ?? {})}`,
    );
    // content[0] isn't reliably the text block: thinking models prepend a thinking block
    // and server tools add server_tool_use / *_tool_result blocks, none of which have .text.
    const roundText = concatTextBlocks(response.content);
    if (roundText.trim()) texts.push(roundText);
    const [roundFetched, roundFailures] = summarizeFetches(response.content);
    for (const u of roundFetched) if (!fetched.includes(u)) fetched.push(u);
    failures.push(...roundFailures);

    if (response.stop_reason !== "pause_turn") break;
    // A server tool hit its per-turn iteration limit; resend so it can finish.
    convo = [...convo, { role: "assistant", content: response.content }];
  }

  let text = texts.length ? texts.join("\n\n") : MSG_NO_TEXT;

  if (fetched.length) {
    const shown = fetched.slice(0, MAX_SOURCES_SHOWN);
    const sources = shown.map((u) => `-# 取得元: <${u}>`).join("\n");
    text += `\n\n${sources}`;
    if (fetched.length > shown.length) {
      text += `\n-# ほか ${fetched.length - shown.length} 件`;
    }
  }
  if (failures.length) {
    const unique = [...new Set(failures)].sort();
    text += `\n\n*(⚠️ リンクの取得に失敗しました: ${unique.join(", ")})*`;
  }
  if (response !== null && response.stop_reason === "max_tokens") {
    text += `\n\n*(⚠️ 出力上限 ${maxTokensValue} トークンに達したため、ここで打ち切られています)*`;
  }
  return text;
}
