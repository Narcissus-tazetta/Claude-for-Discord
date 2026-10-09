import { Database } from "bun:sqlite";
import { describe, expect, test } from "bun:test";
import { BudgetError, BudgetLedger, monthInJapan } from "../src/ai/budget";

describe("spend ledger", () => {
  function ledger() {
    const db = new Database(":memory:");
    return new BudgetLedger(
      (sql, ...params) => db.query(sql).all(...params) as Record<string, any>[],
    );
  }
  test("pending concurrent calls count against the same monthly allowance", () => {
    const budget = ledger();
    budget.reserve("a", 0.6, "answer", 1, 0.5, 0);
    expect(() => budget.reserve("b", 0.6, "answer", 1, 0.5, 0)).toThrow(BudgetError);
    budget.settle("a", 0.1);
    budget.reserve("b", 0.6, "answer", 1, 0.5, 0);
    expect(budget.summary(0).total).toBeCloseTo(0.7);
    expect(() => budget.reserve("b", 0, "answer", 1, 0.5, 0)).toThrow("already reserved");
  });
  test("settlement is idempotent and unknown costs are never freed", () => {
    const budget = ledger();
    budget.reserve("a", 0.3, "answer", 1, 0.5, 0);
    budget.settle("a", null);
    budget.settle("a", 0);
    expect(budget.summary(0).total).toBe(0.3);
  });
  test("evaluation has a separate allowance and months roll over in JST", () => {
    const budget = ledger();
    const before = Date.parse("2026-10-31T14:59:59Z");
    const after = before + 1000;
    expect(monthInJapan(before)).toBe("2026-10");
    expect(monthInJapan(after)).toBe("2026-11");
    budget.reserve("a", 0.4, "evaluation", 10, 0.5, before);
    expect(() => budget.reserve("b", 0.2, "evaluation", 10, 0.5, before)).toThrow(BudgetError);
    budget.reserve("c", 0.4, "evaluation", 10, 0.5, after);
    expect(budget.summary(after).total).toBe(0.4);
    budget.settle("a", 0.1);
    expect(budget.summary(after).total).toBe(0.4);
  });
});
