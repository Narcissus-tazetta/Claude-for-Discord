import { REVIEWED_BENCHMARK_SNAPSHOT } from "./expanded-benchmark-reviews";
import type { ModelInfo } from "./model-registry";

export interface BenchmarkReview {
  id: string;
  released: number;
  scores: Record<string, number>;
  source: string;
  official: string;
}

export const BENCHMARK_REVIEW_DATE = "2026-10-08";
export const BENCHMARK_REVIEWED_AT = Date.parse(`${BENCHMARK_REVIEW_DATE}T00:00:00+09:00`);
export const BENCHMARK_REVIEW_TTL = 90 * 86_400_000;
export const BENCHMARK_INDEX = "Artificial Analysis Intelligence Index v4.3.2";

// Human-reviewed snapshot. These are published scores at the named effort, not Bot test results.
// Exact IDs and releases only: do not transfer a score to fast modes, previews or new versions.
export const BENCHMARK_REVIEWS: BenchmarkReview[] = REVIEWED_BENCHMARK_SNAPSHOT;

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
  const expiry = new Date(BENCHMARK_EXPIRES_AT + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
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
