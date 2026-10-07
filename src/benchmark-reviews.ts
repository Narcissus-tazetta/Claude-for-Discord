import type { ModelInfo } from "./model-registry";

export interface BenchmarkReview {
  id: string;
  released: number;
  scores: Record<string, number>;
  source: string;
  official: string;
}

export const BENCHMARK_REVIEW_DATE = "2026-10-07";
export const BENCHMARK_REVIEWED_AT = Date.parse(`${BENCHMARK_REVIEW_DATE}T00:00:00Z`);
export const BENCHMARK_REVIEW_TTL = 90 * 86_400_000;
export const BENCHMARK_INDEX = "Artificial Analysis Intelligence Index v4.3.2";

// Human-reviewed snapshot. These are published scores at the named effort, not Bot test results.
// Exact IDs and releases only: do not transfer a score to fast modes, previews or new versions.
export const BENCHMARK_REVIEWS: BenchmarkReview[] = [
  {
    id: "openai/gpt-6-luna",
    released: 1790035200,
    scores: { none: 18, low: 22, medium: 30, high: 33, xhigh: 35, max: 38 },
    source: "https://artificialanalysis.ai/models/releases/gpt-6-luna",
    official: "https://developers.openai.com/api/docs/models/gpt-6-luna",
  },
  {
    id: "google/gemini-3.8-flash",
    released: 1788307200,
    scores: { low: 33, medium: 40, high: 41 },
    source: "https://artificialanalysis.ai/models/releases/gemini-3-8-flash",
    official: "https://ai.google.dev/gemini-api/docs/models",
  },
  {
    id: "openai/gpt-6.1-sol",
    released: 1790640000,
    scores: { low: 42, medium: 48, high: 50, xhigh: 51, max: 52 },
    source: "https://artificialanalysis.ai/models/releases/gpt-6-1-sol",
    official: "https://developers.openai.com/api/docs/models/gpt-6.1-sol",
  },
  {
    id: "anthropic/claude-sonnet-5.5",
    released: 1790553600,
    scores: { low: 36, medium: 41, high: 47, xhigh: 52, max: 56 },
    source: "https://artificialanalysis.ai/models/releases/claude-sonnet-5-5",
    official: "https://platform.claude.com/docs/en/models/overview",
  },
  {
    id: "anthropic/claude-opus-5.5",
    released: 1790035200,
    scores: { low: 42, medium: 51, high: 54, xhigh: 56, max: 58 },
    source: "https://artificialanalysis.ai/models/releases/claude-opus-5-5",
    official: "https://platform.claude.com/docs/en/models/overview",
  },
];

export function benchmarkReview(model: ModelInfo, now = Date.now()): BenchmarkReview | undefined {
  if (
    now < BENCHMARK_REVIEWED_AT ||
    now - BENCHMARK_REVIEWED_AT > BENCHMARK_REVIEW_TTL ||
    model.preview
  )
    return;
  return BENCHMARK_REVIEWS.find(
    (review) => review.id === model.id && review.released === model.released,
  );
}

export const BENCHMARK_EXPIRES_AT = BENCHMARK_REVIEWED_AT + BENCHMARK_REVIEW_TTL;

/** Why Auto may be running without published scores, for display in /settings. */
export function benchmarkWarnings(models: ModelInfo[], now = Date.now()): string[] {
  const expiry = new Date(BENCHMARK_EXPIRES_AT).toISOString().slice(0, 10);
  if (now > BENCHMARK_EXPIRES_AT)
    return [
      `公開指標の確認期限（${expiry}）が切れています。Autoは動作テスト合格モデルだけで選んでいます。資料と採用表の再確認が必要です。`,
    ];
  const warnings: string[] = [];
  if (BENCHMARK_EXPIRES_AT - now < 14 * 86_400_000)
    warnings.push(`公開指標の確認期限が ${expiry} に切れます。資料と採用表の再確認が必要です。`);
  const unmatched = BENCHMARK_REVIEWS.filter(
    (review) => !models.some((model) => benchmarkReview(model, now)?.id === review.id),
  ).map((review) => review.id);
  if (models.length && unmatched.length)
    warnings.push(
      `公開指標を確認したモデルがカタログと一致しません（ID・リリース日時の変更または非公開）：${unmatched.join("、")}`,
    );
  return warnings;
}
