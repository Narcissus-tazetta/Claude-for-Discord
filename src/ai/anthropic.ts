import Anthropic from "@anthropic-ai/sdk";
import type { ModelInfo } from "../models/registry";
import type { Env } from "../shared/constants";
import { type ChatMessage, GatewayError, type GatewayResult } from "./gateway";
import { estimateCost } from "./routing";

const WEB_SEARCH_USD = 0.01;
const PAUSE_TURN_MAX_ROUNDS = 3;

/** Gateway ids are `anthropic/claude-sonnet-5.5`; the Messages API wants `claude-sonnet-5-5`. */
export function anthropicModelId(model: ModelInfo): string | null {
  const match = /^anthropic\/(claude-(?:fable|opus|sonnet|haiku)-\d+(?:\.\d+)?)$/.exec(model.id);
  return match ? match[1].replace(".", "-") : null;
}

// Dynamic-filtering web tools exist only from the 4.6 generation; Haiku never got them.
function dynamicWebTools(id: string): boolean {
  return /^claude-(?:opus-(?:4-[6-9]|[5-9])|sonnet-(?:4-[6-9]|[5-9])|fable)/.test(id);
}

/** Translate the catalog-shaped plan (`reasoningOptions`) into Messages API fields. */
function thinkingParams(id: string, options: Record<string, unknown>): Record<string, unknown> {
  const reasoning = options.reasoning as
    | { enabled?: boolean; effort?: string; max_tokens?: number }
    | undefined;
  if (!reasoning) return {};
  if (reasoning.enabled === false || reasoning.effort === "none") {
    // Fable rejects `disabled`; the closest it gets to off is the lowest effort.
    if (id.startsWith("claude-fable")) return { output_config: { effort: "low" } };
    return { thinking: { type: "disabled" } };
  }
  if (reasoning.effort) {
    return { thinking: { type: "adaptive" }, output_config: { effort: reasoning.effort } };
  }
  if (reasoning.max_tokens) {
    return { thinking: { type: "enabled", budget_tokens: reasoning.max_tokens } };
  }
  return { thinking: { type: "adaptive" } };
}

function webTools(id: string, needs: { search: boolean; urls: string[] }): Anthropic.ToolUnion[] {
  const dynamic = dynamicWebTools(id);
  const tools: Anthropic.ToolUnion[] = [];
  if (needs.search)
    tools.push({
      type: dynamic ? "web_search_20260209" : "web_search_20250305",
      name: "web_search",
      max_uses: 1,
    });
  if (needs.urls.length)
    tools.push({
      type: dynamic ? "web_fetch_20260209" : "web_fetch_20250910",
      name: "web_fetch",
      max_uses: needs.urls.length,
      max_content_tokens: 16_384,
    });
  return tools;
}

function toAnthropic(messages: ChatMessage[]): {
  system: string | undefined;
  messages: Anthropic.MessageParam[];
} {
  const system = messages
    .filter((message) => message.role === "system")
    .map((message) => String(message.content))
    .join("\n\n");
  return {
    system: system || undefined,
    messages: messages
      .filter((message) => message.role !== "system")
      .map((message) => ({
        role: message.role as "user" | "assistant",
        content:
          typeof message.content === "string"
            ? message.content
            : message.content.map((part): Anthropic.ContentBlockParam => {
                if (part.type === "image_url") {
                  const url = (part.image_url as { url: string }).url;
                  return { type: "image", source: { type: "url", url } };
                }
                if (part.type === "file") {
                  const url = (part.file as { data: string }).data;
                  return { type: "document", source: { type: "url", url } };
                }
                return { type: "text", text: String(part.text ?? "") };
              }),
      })),
  };
}

/**
 * Calls the Messages API directly with the owner's own Anthropic key. Errors are surfaced as
 * GatewayError so the caller's billing/fallback rules apply unchanged.
 */
export class AnthropicClient {
  private readonly client: Anthropic;
  constructor(
    env: Env,
    fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
  ) {
    this.client = new Anthropic({
      apiKey: env.ANTHROPIC_API_KEY,
      // A retry could bill twice; the caller decides whether to fall back instead.
      maxRetries: 0,
      ...(fetcher ? { fetch: fetcher } : {}),
    });
  }

  async complete(
    model: ModelInfo,
    messages: ChatMessage[],
    maxOutput: number,
    options: Record<string, unknown>,
    needs: { search: boolean; urls: string[] },
    onText?: (text: string) => Promise<void>,
  ): Promise<GatewayResult> {
    const id = anthropicModelId(model);
    if (!id) throw new Error(`not a direct Anthropic model: ${model.id}`);
    const started = Date.now();
    const converted = toAnthropic(messages);
    const tools = webTools(id, needs);
    const base = {
      model: id,
      max_tokens: maxOutput,
      ...(converted.system ? { system: converted.system } : {}),
      ...(tools.length ? { tools } : {}),
      ...thinkingParams(id, options),
    } as Omit<Anthropic.MessageStreamParams, "messages">;
    const signal = AbortSignal.timeout(Math.min(300_000, 60_000 + maxOutput * 12));
    let convo = converted.messages;
    let text = "";
    let input = 0;
    let output = 0;
    let searches = 0;
    let stop: string | null = null;
    for (let round = 0; round < PAUSE_TURN_MAX_ROUNDS; round++) {
      let message: Anthropic.Message;
      try {
        const stream = this.client.messages.stream({ ...base, messages: convo }, { signal });
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            text += event.delta.text;
            await onText?.(text);
          }
        }
        message = await stream.finalMessage();
      } catch (error) {
        if (error instanceof Anthropic.APIError && typeof error.status === "number") {
          // Body text can echo prompts; log only the API's error type.
          console.log(
            JSON.stringify({
              event: "anthropic_error",
              status: error.status,
              type: (error.error as { error?: { type?: string } } | undefined)?.error?.type,
            }),
          );
          throw new GatewayError(error.status);
        }
        if (error instanceof Anthropic.APIUserAbortError) throw new GatewayError(504);
        if (error instanceof Anthropic.APIConnectionError) throw new GatewayError(502);
        throw error;
      }
      input += message.usage.input_tokens;
      output += message.usage.output_tokens;
      searches += message.usage.server_tool_use?.web_search_requests ?? 0;
      stop = message.stop_reason;
      if (stop !== "pause_turn") break;
      convo = [...convo, { role: "assistant", content: message.content }];
    }
    const cost = estimateCost(model, input, output) + searches * WEB_SEARCH_USD;
    return {
      text,
      model: model.id,
      generationId: null,
      provider: "anthropic",
      inputTokens: input,
      outputTokens: output,
      reasoningTokens: 0,
      finishReason: stop === "max_tokens" ? "length" : stop === "end_turn" ? "stop" : String(stop),
      latencyMs: Date.now() - started,
      cost,
      toolCalls: searches ? { web_search: searches } : null,
      usageReported: true,
    };
  }
}
