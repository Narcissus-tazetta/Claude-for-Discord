import { benchmarkReview } from "./benchmark-reviews";

/** Catalog prices are USD per token, not per million tokens. */
export interface PriceTier {
  min: number;
  input: number;
  output: number;
}

export interface ModelInfo {
  id: string;
  name: string;
  released: number;
  context: number;
  maxOutput: number;
  tags: string[];
  /** Base-tier rates. Long-context rates live in `tiers`, keyed by prompt size. */
  input: number;
  output: number;
  tiers?: PriceTier[];
  preview: boolean;
  reasoning: { type: string; values?: string[]; min?: number; max?: number }[];
}

export interface ModelEvaluation {
  revision: string;
  testedAt: number;
  basic: boolean;
  balanced: boolean;
  complex: boolean;
  vision: boolean;
  pdf: boolean;
  latencyMs: number;
  failures: number;
  disabledUntil: number;
}

export interface Registry {
  discoveryVersion?: number;
  refreshedAt: number;
  models: ModelInfo[];
  evaluations: Record<string, ModelEvaluation>;
  outcomes?: Record<
    string,
    {
      revision: string;
      testedAt: number;
      successes: number;
      failures: number;
      disabledUntil: number;
    }
  >;
  progress?: {
    attemptsToday: number;
    dailyLimit: number;
    budgetUsd: number;
    nextRunAt: number | null;
    lastFailure?: { model: string; reason: string; at: number };
  };
}

export type Tier = "economy" | "balanced" | "strong";
export const EMPTY_REGISTRY: Registry = { refreshedAt: 0, models: [], evaluations: {} };
export const DAY_MS = 86_400_000;
export const SUITE_VERSION = "1";
export const DISCOVERY_VERSION = 3;
export function autoFamily(id: string): boolean {
  return (
    /^(openai\/gpt-|anthropic\/claude-|google\/gemini-)/.test(id) &&
    !/(?:^|[-/])(safeguard|moderation)(?:[-/]|$)/i.test(id)
  );
}

function price(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Gateway tiers switch on prompt size; `undefined` means malformed, so the model is skipped. */
function priceTiers(input: unknown, output: unknown): PriceTier[] | undefined {
  if (input === undefined && output === undefined) return [];
  if (!Array.isArray(input) || !Array.isArray(output)) return;
  const mins = [...new Set([...input, ...output].map((tier) => Number(tier?.min)))].sort(
    (a, b) => a - b,
  );
  if (mins.some((min) => !Number.isSafeInteger(min) || min < 0)) return;
  const at = (tiers: any[], min: number) =>
    price(tiers.filter((tier) => Number(tier.min) <= min).at(-1)?.cost);
  const tiers: PriceTier[] = [];
  for (const min of mins.filter((min) => min > 0)) {
    const inputRate = at(input, min);
    const outputRate = at(output, min);
    if (inputRate === null || outputRate === null) return;
    tiers.push({ min, input: inputRate, output: outputRate });
  }
  return tiers;
}

/** Rates for a request whose prompt is `promptTokens` long. */
export function ratesFor(
  model: ModelInfo,
  promptTokens: number,
): { input: number; output: number } {
  const tier = model.tiers?.filter((t) => t.min <= promptTokens).at(-1) ?? model;
  return { input: tier.input, output: tier.output };
}

/** Fail closed on missing price/capability metadata and non-chat models. */
export function parseCatalog(payload: unknown): ModelInfo[] {
  const rows = (payload as { data?: unknown[] })?.data;
  if (!Array.isArray(rows)) throw new Error("invalid gateway model catalog");
  const models: ModelInfo[] = [];
  const seen = new Set<string>();
  for (const raw of rows) {
    const row = raw as Record<string, any>;
    if (!row || typeof row.id !== "string" || row.id.length > 100 || seen.has(row.id)) continue;
    if (!/^[a-z0-9][a-z0-9_-]*\/[^\s]+$/i.test(row.id)) continue;
    if (row.type !== "language") continue;
    if (row.model_eligibility?.status === "ineligible") continue;
    if (/(?:deprecated|retired)/i.test(row.id)) continue;
    const input = price(row.pricing?.input);
    const output = price(row.pricing?.output);
    // Cache-write rates are ignored: requests never set cache_control.
    const tiers = priceTiers(row.pricing?.input_tiers, row.pricing?.output_tiers);
    if (
      input === null ||
      output === null ||
      !tiers ||
      !Number.isSafeInteger(row.context_window) ||
      !Number.isSafeInteger(row.max_tokens) ||
      row.context_window <= 0 ||
      row.max_tokens <= 0
    ) {
      continue;
    }
    seen.add(row.id);
    models.push({
      id: row.id,
      name: typeof row.name === "string" && row.name.trim() ? row.name : row.id,
      released: Number.isFinite(Number(row.released || row.created))
        ? Number(row.released || row.created)
        : 0,
      context: row.context_window,
      maxOutput: row.max_tokens,
      tags: Array.isArray(row.tags)
        ? [...new Set<string>(row.tags.filter((t: unknown) => typeof t === "string"))].sort()
        : [],
      input,
      output,
      ...(tiers.length ? { tiers } : {}),
      preview: /preview|experimental|\bexp\b|beta/i.test(`${row.id} ${row.name ?? ""}`),
      reasoning: Array.isArray(row.reasoning_options)
        ? row.reasoning_options
            .filter(
              (option: any) =>
                option && ["effort", "budget_tokens", "toggle"].includes(option.type),
            )
            .map((option: any) => ({
              type: option.type,
              ...(Array.isArray(option.values)
                ? {
                    values: option.values
                      .filter((value: unknown) => typeof value === "string")
                      .sort(),
                  }
                : {}),
              ...(Number.isFinite(option.min) ? { min: option.min } : {}),
              ...(Number.isFinite(option.max) ? { max: option.max } : {}),
            }))
            .sort((a: any, b: any) => a.type.localeCompare(b.type))
        : [],
    });
  }
  return models.sort((a, b) => b.released - a.released || a.id.localeCompare(b.id));
}

export function revision(model: ModelInfo): string {
  // A price/capability change requires re-evaluation before automatic use.
  return JSON.stringify([SUITE_VERSION, model]);
}

export function freshEvaluation(registry: Registry, model: ModelInfo): ModelEvaluation | undefined {
  const evaluation = registry.evaluations[model.id];
  return evaluation?.revision === revision(model) ? evaluation : undefined;
}

export function modelTier(model: ModelInfo): Tier | null {
  if (model.input <= 1e-6 && model.output <= 5e-6) return "economy";
  if (model.input <= 3e-6 && model.output <= 15e-6) return "balanced";
  if (model.input <= 6e-6 && model.output <= 30e-6) return "strong";
  return null;
}

export function freshOutcome(registry: Registry, model: ModelInfo) {
  const outcome = registry.outcomes?.[model.id];
  return outcome?.revision === revision(model) ? outcome : undefined;
}

/**
 * `-fast` ids are the same weights at a higher price, and image/video generators are not
 * chat answerers; neither is worth Auto evaluation budget. (Base models also carry a `fast`
 * tag meaning "has a fast variant", so the id suffix is what identifies the variant.)
 */
function autoCandidate(model: ModelInfo): boolean {
  return (
    autoFamily(model.id) &&
    !model.preview &&
    !/-fast$/.test(model.id) &&
    !model.tags.some((tag) => tag === "image-generation" || tag === "video-generation") &&
    modelTier(model) !== null
  );
}

export function isApproved(registry: Registry, model: ModelInfo, now = Date.now()): boolean {
  const evaluation = freshEvaluation(registry, model);
  const outcome = freshOutcome(registry, model);
  return Boolean(
    autoCandidate(model) &&
      (benchmarkReview(model, now) || evaluation?.basic) &&
      (!evaluation || (evaluation.basic && evaluation.disabledUntil <= now)) &&
      (!outcome || outcome.disabledUntil <= now),
  );
}

/** Evaluate the newest two stable models in each creator/cost band, not the entire catalog. */
export function autoEvaluationPool(registry: Registry): ModelInfo[] {
  const bands = new Map<string, number>();
  return [...registry.models]
    .sort((a, b) => b.released - a.released || a.id.localeCompare(b.id))
    .filter((model) => {
      const tier = modelTier(model);
      if (!autoCandidate(model) || !tier) return false;
      const key = `${model.id.split("/")[0]}:${tier}`;
      const count = bands.get(key) ?? 0;
      bands.set(key, count + 1);
      return count < 2;
    });
}

export function evaluationCandidates(registry: Registry, now = Date.now()): ModelInfo[] {
  return autoEvaluationPool(registry).filter((model) => {
    if (benchmarkReview(model, now)) return false;
    const evaluation = freshEvaluation(registry, model);
    return !evaluation || (!evaluation.basic && now - evaluation.testedAt >= 7 * DAY_MS);
  });
}

/** Keep the previous snapshot for rollback, but never silently use a stale-price catalog. */
export function mergeCatalog(registry: Registry, models: ModelInfo[], now = Date.now()): Registry {
  if (!models.length) throw new Error("gateway returned no eligible models");
  const ids = new Set(models.map((model) => model.id));
  return {
    discoveryVersion: DISCOVERY_VERSION,
    refreshedAt: now,
    models,
    evaluations: Object.fromEntries(
      Object.entries(registry.evaluations).filter(([id]) => ids.has(id)),
    ),
    ...(registry.outcomes
      ? {
          outcomes: Object.fromEntries(
            Object.entries(registry.outcomes).filter(([id]) => ids.has(id)),
          ),
        }
      : {}),
  };
}
