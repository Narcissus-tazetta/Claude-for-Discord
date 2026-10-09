import { type ModelInfo, type Registry, revision } from "../../src/models/registry";
import type { Env } from "../../src/shared/constants";
import type { Prefs } from "../../src/shared/types";
export const prefs: Prefs = {
  model: "auto",
  thinking: true,
  effort: "medium",
  ephemeral: true,
  web_fetch: true,
  web_search: true,
  currency: "usd",
};
export const env = {
  AI_GATEWAY_API_KEY: "test-key",
  AI_GATEWAY_BASE_URL: "https://mock.invalid/v1",
  CLAUDE_MAX_TOKENS: "4096",
  AI_MONTHLY_BUDGET_USD: "10",
} as Env;

export function model(over: Partial<ModelInfo> = {}): ModelInfo {
  return {
    id: "openai/gpt-test-mini",
    name: "Test",
    released: 100,
    context: 100_000,
    maxOutput: 4096,
    tags: ["tool-use"],
    input: 0.3e-6,
    output: 2e-6,
    preview: false,
    reasoning: [],
    ...over,
  };
}
export function approved(models: ModelInfo[]): Registry {
  return {
    refreshedAt: Date.now(),
    models,
    evaluations: Object.fromEntries(
      models.map((m) => [
        m.id,
        {
          revision: revision(m),
          testedAt: Date.now(),
          basic: true,
          balanced: true,
          complex: true,
          vision: true,
          pdf: true,
          latencyMs: 1,
          failures: 0,
          disabledUntil: 0,
        },
      ]),
    ),
  };
}
export function raw(over: Record<string, unknown> = {}) {
  return {
    id: "google/gemini-test",
    name: "Test",
    released: 20,
    created: 10,
    type: "language",
    context_window: 100000,
    max_tokens: 4096,
    tags: ["vision", "file-input"],
    pricing: { input: "0.0000003", output: "0.000002" },
    ...over,
  };
}
export const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
