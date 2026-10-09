import { describe, expect, test } from "bun:test";
import expandedReviewSnapshot from "../docs/model-review-2026-10-08.json";
import { analyzeTask, rankModels } from "../src/ai/routing";
import {
  BENCHMARK_REVIEW_TTL,
  BENCHMARK_REVIEWED_AT,
  BENCHMARK_REVIEWS,
  benchmarkReview,
} from "../src/models/benchmark-reviews";
import {
  DAY_MS,
  evaluationCandidates,
  isApproved,
  parseCatalog,
  type Registry,
  revision,
} from "../src/models/registry";
import { approved, model, prefs } from "./helpers/gateway-fixtures";

describe("public benchmark reviews", () => {
  const now = BENCHMARK_REVIEWED_AT + 60_000;
  function reviewedModels() {
    // Base-tier catalog prices on the review date.
    const prices = [
      [0.1e-6, 0.5e-6],
      [0.75e-6, 3.75e-6],
      [2e-6, 10e-6],
      [2e-6, 10e-6],
      [4e-6, 20e-6],
    ];
    return BENCHMARK_REVIEWS.slice(0, 5).map((review, i) =>
      model({
        id: review.id,
        released: review.released,
        maxOutput: 64_000,
        input: prices[i][0],
        output: prices[i][1],
        tags: ["vision", "file-input", "tool-use"],
        reasoning: [
          {
            type: "effort",
            values: Object.keys(review.scores).filter(
              (value) => review.id !== "google/gemini-3.8-flash" || value !== "medium",
            ),
          },
        ],
      }),
    );
  }
  test("full review covers every catalog ID and exported approvals have exact source conditions", () => {
    const rows = expandedReviewSnapshot.models;
    expect(rows.length).toBe(expandedReviewSnapshot.coverage.catalogModels);
    expect(rows.length).toBe(413);
    expect(new Set(rows.map((row) => row.id)).size).toBe(rows.length);
    expect(rows.filter((row) => row.adopted).length).toBe(BENCHMARK_REVIEWS.length);
    const parsed = parseCatalog({ data: rows.map((row) => row.catalog) });
    for (const review of BENCHMARK_REVIEWS) {
      const row = rows.find((entry) => entry.id === review.id);
      const m = parsed.find((entry) => entry.id === review.id);
      if (!row || !m) throw new Error(`Missing or unusable review: ${review.id}`);
      expect(row.adopted).toBe(true);
      expect(row.match).toBe("direct");
      const registry: Registry = { refreshedAt: now, models: [m], evaluations: {} };
      expect(isApproved(registry, m, now)).toBe(true);
      expect(benchmarkReview({ ...m, released: m.released + 1 }, now)).toBeUndefined();
      expect(isApproved(registry, { ...m, id: `${m.id}-fast` }, now)).toBe(false);
      expect(isApproved(registry, m, now + BENCHMARK_REVIEW_TTL + 1)).toBe(false);
      for (const [effort, score] of Object.entries(review.scores)) {
        expect(effort === "none" || (row.supportedEfforts as string[]).includes(effort)).toBe(true);
        const source = row.measurements.find(
          (entry) =>
            entry.effort === effort &&
            entry.estimated === false &&
            entry.releaseDate === row.releaseDate &&
            Math.round(entry.score) === score,
        );
        expect(source).toBeDefined();
        if (effort === "none") expect(source?.reasoning).toBe(false);
        else expect(source?.reasoning).toBe(true);
      }
    }
    for (const row of rows.filter(
      (entry) => entry.match !== "direct" || entry.type !== "language",
    )) {
      expect(row.adopted).toBe(false);
      expect(BENCHMARK_REVIEWS.some((review) => review.id === row.id)).toBe(false);
    }
  });
  test("Haiku 5.5 wins normal cost-balanced requests but high does not qualify for difficult requests", () => {
    const row = expandedReviewSnapshot.models.find(
      (entry) => entry.id === "anthropic/claude-haiku-5.5",
    );
    if (!row) throw new Error("Missing Haiku review");
    const haiku = model({
      id: row.id,
      released: row.released,
      input: Number(row.inputPerMillion) / 1e6,
      output: Number(row.outputPerMillion) / 1e6,
      maxOutput: 128_000,
      tags: row.tags,
      reasoning: [{ type: "effort", values: row.supportedEfforts }],
    });
    const registry: Registry = {
      refreshedAt: now,
      models: [...reviewedModels(), haiku],
      evaluations: {},
    };
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    needs.tier = "balanced";
    expect(rankModels(registry, needs, 4096, 0.25, "auto", now, "medium")[0].id).toBe(haiku.id);
    needs.tier = "strong";
    expect(
      rankModels(registry, needs, 4096, 0.25, "auto", now, "medium").some((m) => m.id === haiku.id),
    ).toBe(false);
  });
  test("public approval is explicit and expires; fast aliases, previews and replacement releases inherit no score", () => {
    for (const m of reviewedModels()) {
      const registry: Registry = { refreshedAt: now, models: [m], evaluations: {} };
      expect(isApproved(registry, m, now)).toBe(true);
      expect(registry.evaluations).toEqual({});
      expect(evaluationCandidates(registry, now)).toEqual([]);
      expect(benchmarkReview({ ...m, id: `${m.id}-fast` }, now)).toBeUndefined();
      expect(benchmarkReview({ ...m, preview: true }, now)).toBeUndefined();
      expect(benchmarkReview({ ...m, released: m.released + 1 }, now)).toBeUndefined();
      expect(isApproved(registry, m, BENCHMARK_REVIEWED_AT + BENCHMARK_REVIEW_TTL + 1)).toBe(false);
    }
  });
  test("routing uses actual supported effort and public scores with common budget/media constraints", () => {
    const models = reviewedModels();
    const registry: Registry = { refreshedAt: now, models, evaluations: {} };
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    const rank = (priority: "low" | "medium" | "high", budget = 1, manual = "auto") =>
      rankModels(registry, needs, 4096, budget, manual, now, priority);
    expect(rank("medium")[0].id).toBe("openai/gpt-6-luna");
    needs.tier = "balanced";
    expect(rank("medium")[0].id).toBe("google/gemini-3.8-flash");
    needs.tier = "strong";
    expect(rank("medium")[0].id).toBe("openai/gpt-6.1-sol");
    expect(rank("low")[0].id).toBe("openai/gpt-6.1-sol");
    expect(rank("high")[0].id).toBe("anthropic/claude-opus-5.5");
    expect(rank("medium").some((m) => m.id === "openai/gpt-6-luna")).toBe(false);
    expect(rank("high", 0.15)[0].id).toBe("openai/gpt-6.1-sol");
    expect(rank("high", 0.00001)).toEqual([]);
    expect(rank("high", 1, models[0].id)[0].id).toBe(models[0].id);
    needs.pdf = true;
    models[2].tags = ["vision", "tool-use"];
    expect(rank("medium").some((m) => m.id === models[2].id)).toBe(false);
  });
  test("private failures and circuit breakers override published admission without fabricating test passes", () => {
    const m = reviewedModels()[2];
    const registry = approved([m]);
    registry.evaluations[m.id].basic = false;
    expect(isApproved(registry, m, now)).toBe(false);
    delete registry.evaluations[m.id];
    registry.outcomes = {
      [m.id]: {
        revision: revision(m),
        testedAt: now,
        successes: 1,
        failures: 3,
        disabledUntil: now + DAY_MS,
      },
    };
    expect(isApproved(registry, m, now)).toBe(false);
    expect(isApproved(registry, m, now + DAY_MS + 1)).toBe(true);
  });
});
