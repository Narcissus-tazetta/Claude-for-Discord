import { type Env, MAX_ATTACHMENT_BYTES, MAX_TOTAL_ATTACHMENT_BYTES } from "./constants";
import type { ModelInfo } from "./model-registry";
import type { AnthropicMessage, Prefs } from "./types";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string | Record<string, unknown>[];
};

export interface GatewayResult {
  text: string;
  model: string;
  /** Billing lookup key. Usage is ingested asynchronously, so cost is resolved later. */
  generationId: string | null;
  inputTokens: number;
  outputTokens: number;
  reasoningTokens: number;
  finishReason: string;
  latencyMs: number;
  /** Gateway's own total for this request, server tools included, when it reports one. */
  cost: number | null;
  /** Successful server-tool calls by tool name (e.g. `perplexity_search`), when reported. */
  toolCalls: Record<string, number> | null;
}

export type GenerationCost = { found: false } | { found: true; cost: number | null };

export class GatewayError extends Error {
  constructor(
    readonly status: number,
    readonly attachmentRejected = false,
  ) {
    // Provider error bodies can contain prompts, attachment URLs, or credentials.
    super(`AI Gateway HTTP ${status}`);
    this.name = "GatewayError";
  }
  get definitelyUnbilled(): boolean {
    return [400, 401, 402, 403, 404, 422, 429].includes(this.status);
  }
  /** Transient or model-specific failures where another model may still answer. */
  get canFallback(): boolean {
    return [404, 408, 429, 500, 502, 503, 504].includes(this.status);
  }
}

export function gatewayBase(env: Env): string {
  return (env.AI_GATEWAY_BASE_URL || "https://ai-gateway.vercel.sh/v1").replace(/\/$/, "");
}

export function toChatMessages(messages: AnthropicMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content.map((block) => {
      if (block.type === "text") return { type: "text", text: String(block.text ?? "") };
      if (block.type === "image" && block.source?.type === "url") {
        return { type: "image_url", image_url: { url: block.source.url } };
      }
      if (block.type === "document" && block.source?.type === "url") {
        return { type: "file", file: { data: block.source.url, media_type: "application/pdf" } };
      }
      throw new Error("unsupported message content");
    }),
  }));
}

/** Never send an effort level that the catalog says this model cannot accept. */
export function reasoningOptions(
  model: ModelInfo,
  prefs: Pick<Prefs, "thinking" | "effort">,
  maxOutput: number,
): Record<string, unknown> {
  const effort = model.reasoning.find((option) => option.type === "effort");
  const toggle = model.reasoning.some((option) => option.type === "toggle");
  const budget = model.reasoning.find((option) => option.type === "budget_tokens");
  if (!prefs.thinking) {
    if (toggle) return { reasoning: { enabled: false } };
    const off = effort?.values?.find((value) => value === "none");
    if (off) return { reasoning: { effort: off } };
    // Mandatory thinking models cannot turn it off. Use their lowest advertised effort.
    if (effort?.values?.length) {
      const lowest = ["minimal", "low", "medium", "high", "xhigh", "max"].find((value) =>
        effort.values?.includes(value),
      );
      if (lowest) return { reasoning: { effort: lowest, exclude: true } };
    }
    return {};
  }
  const levels = ["minimal", "low", "medium", "high", "xhigh", "max"];
  const desired = Math.max(0, levels.indexOf(prefs.effort));
  const supported = levels.filter((value) => effort?.values?.includes(value));
  const selected =
    supported.filter((value) => levels.indexOf(value) <= desired).at(-1) ?? supported[0];
  if (selected) return { reasoning: { effort: selected, exclude: true } };
  if (budget) {
    const fraction = [0.125, 0.25, 0.5, 0.75, 0.8, 0.85][desired] ?? 0.5;
    const tokens = Math.min(
      budget.max ?? maxOutput - 256,
      maxOutput - 256,
      Math.max(budget.min ?? 1, Math.floor(maxOutput * fraction)),
    );
    if (tokens >= (budget.min ?? 1)) {
      return { reasoning: { max_tokens: tokens, enabled: true, exclude: true } };
    }
    // Short classification/evaluation calls cannot fit the model's minimum budget.
    // Do not enable thinking with an invalid or provider-default budget.
    return toggle ? { reasoning: { enabled: false } } : {};
  }
  return toggle ? { reasoning: { enabled: true, exclude: true } } : {};
}

function isTimeout(error: unknown): boolean {
  return (
    error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError")
  );
}

function costNumber(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !value.trim()) return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export class GatewayClient {
  constructor(
    private readonly env: Env,
    // Workers' native fetch must not receive GatewayClient as its `this` binding.
    private readonly fetcher: typeof fetch = (...args) => fetch(...args),
  ) {}

  async catalog(): Promise<unknown> {
    const response = await this.fetcher(
      `${gatewayBase(this.env)}/models?include_availability=true`,
      {
        headers: this.headers(),
        signal: AbortSignal.timeout(15_000),
      },
    );
    if (!response.ok) throw new GatewayError(response.status);
    return await response.json();
  }

  private headers(): Record<string, string> {
    if (!this.env.AI_GATEWAY_API_KEY) throw new Error("AI_GATEWAY_API_KEY is not configured");
    return {
      authorization: `Bearer ${this.env.AI_GATEWAY_API_KEY}`,
      "content-type": "application/json",
    };
  }

  /** Chat Completions documents base64 PDFs; do not assume PDF URL forwarding works. */
  private async inlinePdfs(messages: ChatMessage[]): Promise<ChatMessage[]> {
    let total = 0;
    const prepared = structuredClone(messages);
    for (const message of prepared) {
      if (!Array.isArray(message.content)) continue;
      for (const part of message.content) {
        const file = part.file as { data?: unknown; media_type?: string } | undefined;
        if (part.type !== "file" || typeof file?.data !== "string" || !/^https?:/i.test(file.data))
          continue;
        try {
          const url = new URL(file.data);
          if (url.protocol !== "https:" || url.username || url.password) throw new Error();
          const response = await this.fetcher(url.toString(), {
            signal: AbortSignal.timeout(15_000),
            redirect: "error",
          });
          if (!response.ok || !response.body) throw new Error();
          if (Number(response.headers.get("content-length")) > MAX_ATTACHMENT_BYTES) {
            await response.body.cancel();
            throw new Error();
          }
          const reader = response.body.getReader();
          const chunks: Uint8Array[] = [];
          let size = 0;
          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            size += value.length;
            total += value.length;
            if (size > MAX_ATTACHMENT_BYTES || total > MAX_TOTAL_ATTACHMENT_BYTES) {
              await reader.cancel();
              throw new Error();
            }
            chunks.push(value);
          }
          const bytes = new Uint8Array(size);
          let offset = 0;
          for (const chunk of chunks) {
            bytes.set(chunk, offset);
            offset += chunk.length;
          }
          if (new TextDecoder().decode(bytes.subarray(0, 5)) !== "%PDF-") throw new Error();
          const binary: string[] = [];
          for (let i = 0; i < bytes.length; i += 32768) {
            binary.push(String.fromCharCode(...bytes.subarray(i, i + 32768)));
          }
          file.data = btoa(binary.join(""));
        } catch {
          // No inference request has been sent, so its reservation can be released.
          throw new GatewayError(400, true);
        }
      }
    }
    return prepared;
  }

  async complete(
    model: ModelInfo,
    messages: ChatMessage[],
    maxOutput: number,
    extra: Record<string, unknown> = {},
  ): Promise<GatewayResult> {
    const started = Date.now();
    const prepared = await this.inlinePdfs(messages);
    // Non-streaming: the wait grows with the output cap. Capped at 5 minutes so an answer plus
    // one fallback still fits inside Discord's 15-minute interaction token.
    const signal = AbortSignal.timeout(Math.min(300_000, 60_000 + maxOutput * 12));
    let response: Response;
    try {
      response = await this.fetcher(`${gatewayBase(this.env)}/chat/completions`, {
        method: "POST",
        headers: this.headers(),
        signal,
        body: JSON.stringify({
          model: model.id,
          messages: prepared,
          max_tokens: maxOutput,
          stream: false,
          ...extra,
        }),
      });
    } catch (error) {
      if (isTimeout(error)) throw new GatewayError(504);
      throw error;
    }
    if (!response.ok) {
      let attachmentRejected = false;
      if (response.status === 400) {
        try {
          const body = await response.text();
          attachmentRejected =
            /invalid_image_url|url_not_accessible|expired|failed to (?:fetch|download)|unable to (?:fetch|download)/i.test(
              body,
            );
        } catch {
          /* Error bodies are used only for classification, never stored or logged. */
        }
      }
      throw new GatewayError(response.status, attachmentRejected);
    }
    let data: Record<string, any>;
    try {
      data = (await response.json()) as Record<string, any>;
    } catch (error) {
      if (isTimeout(error)) throw new GatewayError(504);
      throw new GatewayError(502);
    }
    if (!data || !Array.isArray(data.choices) || !data.choices[0]?.message) {
      throw new GatewayError(502);
    }
    const message = data.choices[0].message;
    const text =
      typeof message.content === "string"
        ? message.content
        : Array.isArray(message.content)
          ? message.content
              .filter((b: any) => b.type === "text")
              .map((b: any) => b.text)
              .join("")
          : "";
    const meta = message.provider_metadata?.gateway;
    const toolCalls =
      meta?.gatewayToolCalls && typeof meta.gatewayToolCalls === "object"
        ? Object.fromEntries(
            Object.entries(meta.gatewayToolCalls as Record<string, unknown>).map(
              ([name, count]) => [name, costNumber(count) ?? 0],
            ),
          )
        : null;
    return {
      text,
      model: typeof data.model === "string" ? data.model : model.id,
      generationId: typeof data.id === "string" && data.id ? data.id : null,
      inputTokens: Number(data.usage?.prompt_tokens) || 0,
      outputTokens: Number(data.usage?.completion_tokens) || 0,
      reasoningTokens: Number(data.usage?.completion_tokens_details?.reasoning_tokens) || 0,
      finishReason: data.choices[0].finish_reason ?? "unknown",
      latencyMs: Date.now() - started,
      cost: costNumber(meta?.cost),
      toolCalls,
    };
  }

  /** The total includes inference, reasoning, server tools and gateway surcharges. */
  async generationCost(id: string): Promise<GenerationCost> {
    const response = await this.fetcher(
      `${gatewayBase(this.env)}/generation?id=${encodeURIComponent(id)}`,
      { headers: this.headers(), signal: AbortSignal.timeout(10_000) },
    );
    // Usage is ingested asynchronously; 404 right after a generation means "not yet".
    if (response.status === 404) return { found: false };
    if (!response.ok) throw new GatewayError(response.status);
    const record = ((await response.json()) as Record<string, any>).data;
    return { found: true, cost: record?.is_byok === true ? null : costNumber(record?.total_cost) };
  }
}
