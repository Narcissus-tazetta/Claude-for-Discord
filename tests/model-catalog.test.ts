import { describe, expect, test } from "bun:test";
import { analyzeTask, rankModels } from "../src/ai/routing";
import {
  evaluationCandidates,
  isApproved,
  mergeCatalog,
  parseCatalog,
  ratesFor,
} from "../src/models/registry";
import { approved, model, prefs, raw } from "./helpers/gateway-fixtures";

describe("model catalog and adoption", () => {
  test("includes priced chat models across creators and excludes unsupported catalog entries", () => {
    const result = parseCatalog({
      data: [
        raw(),
        raw({ id: "other/model" }),
        raw({ id: "openai/gpt-image", type: "image" }),
        raw({ id: "anthropic/claude-bad", pricing: {} }),
        raw({ id: "openai/gpt-negative", pricing: { input: -1, output: 1 } }),
        raw({ id: "openai/gpt-denied", model_eligibility: { status: "ineligible" } }),
      ],
    });
    expect(result.map((m) => m.id)).toEqual(["google/gemini-test", "other/model"]);
    expect(result[0].released).toBe(20);
    expect(result[0].input).toBe(0.3e-6);
  });
  test("prices requests at the tier their prompt size falls in, ignoring unused cache writes", () => {
    const [m] = parseCatalog({
      data: [
        raw({
          pricing: {
            input: "0.000001",
            output: "0.000005",
            input_tiers: [
              { cost: "0.000001", min: 0, max: 272001 },
              { cost: "0.000002", min: 272001 },
            ],
            input_cache_write: "0.000004",
            output_tiers: [
              { cost: "0.000005", min: 0, max: 272001 },
              { cost: "0.000010", min: 272001 },
            ],
          },
        }),
      ],
    });
    expect(ratesFor(m, 1000)).toEqual({ input: 1e-6, output: 5e-6 });
    expect(ratesFor(m, 300_000)).toEqual({ input: 2e-6, output: 10e-6 });
    expect(parseCatalog({ data: [raw({ pricing: { input: "", output: "0" } })] })).toEqual([]);
    expect(
      parseCatalog({ data: [raw({ pricing: { input: "1", output: "1", input_tiers: [{}] } })] }),
    ).toEqual([]);
  });
  test("Auto skips -fast price duplicates and image generators but keeps base models", () => {
    const base = model({ tags: ["tool-use", "fast"] });
    const fast = model({ id: "openai/gpt-test-mini-fast" });
    const image = model({ id: "google/gemini-image", tags: ["image-generation"] });
    const registry = approved([base, fast, image]);
    expect(isApproved(registry, base)).toBe(true);
    expect(isApproved(registry, fast)).toBe(false);
    expect(isApproved(registry, image)).toBe(false);
  });
  test("safety classifiers stay manual even if they pass the small acceptance suite", () => {
    const safeguard = model({ id: "openai/gpt-oss-safeguard-120b" });
    const registry = approved([safeguard]);
    expect(isApproved(registry, safeguard)).toBe(false);
    expect(evaluationCandidates(registry)).toEqual([]);
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    expect(rankModels(registry, needs, 768, 1)).toEqual([]);
    expect(rankModels(registry, needs, 768, 1, safeguard.id)).toEqual([safeguard]);
  });
  test("other creators can be selected manually without entering Auto or evaluation spend", () => {
    const m = model({ id: "deepseek/deepseek-test" });
    const registry = approved([m]);
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    expect(rankModels(registry, needs, 100, 1, m.id)).toEqual([m]);
    expect(rankModels(registry, needs, 100, 1)).toEqual([]);
    expect(evaluationCandidates(registry)).toEqual([]);
  });
  test("price/capability changes invalidate approvals; removed models disappear", () => {
    const m = model();
    const registry = approved([m]);
    const updated = mergeCatalog(registry, [{ ...m, output: 3e-6 }]);
    expect(isApproved(updated, updated.models[0])).toBe(false);
    expect(mergeCatalog(registry, [model({ id: "google/gemini-new" })]).evaluations).toEqual({});
    expect(() => mergeCatalog(registry, [])).toThrow();
  });
  test("preview/new/failed models are available manually but never auto-approved", () => {
    const m = model({ preview: true });
    const registry = approved([m]);
    expect(isApproved(registry, m)).toBe(false);
    const needs = analyzeTask([{ role: "user", content: "こんにちは" }], prefs);
    expect(rankModels(registry, needs, 100, 1)).toEqual([]);
    expect(rankModels(registry, needs, 100, 1, m.id)).toHaveLength(1);
    expect(evaluationCandidates(registry)).toEqual([]);
  });
});
