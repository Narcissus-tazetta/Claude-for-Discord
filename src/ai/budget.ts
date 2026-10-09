export class BudgetError extends Error {
  constructor(message = "今月のAPI予算に達しました。設定した予算を確認してください。") {
    super(message);
    this.name = "BudgetError";
  }
}

export type BudgetKind = "answer" | "evaluation";
export type SqlQuery = (sql: string, ...params: (string | number)[]) => Record<string, any>[];

export function positiveSetting(value: string | undefined, fallback: number): number {
  if (value === undefined || value === "") return fallback;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) throw new Error("invalid nonnegative budget setting");
  return n;
}

export function monthInJapan(now: number): string {
  return new Date(now + 9 * 60 * 60 * 1000).toISOString().slice(0, 7);
}

/** All methods are synchronous; the StateDO wraps mutations in transactionSync. */
export class BudgetLedger {
  constructor(private readonly query: SqlQuery) {
    query(`CREATE TABLE IF NOT EXISTS ai_spend (
      id TEXT PRIMARY KEY, month TEXT NOT NULL, kind TEXT NOT NULL,
      amount REAL NOT NULL, settled INTEGER NOT NULL DEFAULT 0
    )`);
    query("CREATE INDEX IF NOT EXISTS ai_spend_month ON ai_spend(month)");
    // Successful calls whose actual cost Gateway has not ingested yet; the reservation stays
    // charged until the lookup succeeds.
    query(`CREATE TABLE IF NOT EXISTS ai_pending_cost (
      id TEXT PRIMARY KEY, generation_id TEXT NOT NULL, created_at INTEGER NOT NULL
    )`);
  }

  defer(id: string, generationId: string, now: number): void {
    if (!id || !generationId) throw new Error("invalid pending cost");
    this.query(
      "INSERT OR IGNORE INTO ai_pending_cost(id, generation_id, created_at) VALUES (?, ?, ?)",
      id,
      generationId,
      now,
    );
  }

  pending(limit: number): { id: string; generationId: string; createdAt: number }[] {
    return this.query(
      "SELECT id, generation_id, created_at FROM ai_pending_cost ORDER BY created_at LIMIT ?",
      limit,
    ).map((row) => ({
      id: String(row.id),
      generationId: String(row.generation_id),
      createdAt: Number(row.created_at),
    }));
  }

  oldestPending(): number | null {
    const row = this.query("SELECT MIN(created_at) AS at FROM ai_pending_cost")[0];
    return row?.at === null || row?.at === undefined ? null : Number(row.at);
  }

  resolve(id: string, actual: number | null): void {
    this.settle(id, actual);
    this.query("DELETE FROM ai_pending_cost WHERE id = ?", id);
  }

  reserve(
    id: string,
    amount: number,
    kind: BudgetKind,
    monthly: number,
    evaluation: number,
    now: number,
  ) {
    if (!Number.isFinite(amount) || amount < 0 || !id) throw new Error("invalid reservation");
    if (this.query("SELECT id FROM ai_spend WHERE id = ?", id).length) {
      throw new Error("request already reserved");
    }
    const month = monthInJapan(now);
    const rows = this.query(
      "SELECT kind, SUM(amount) AS amount FROM ai_spend WHERE month = ? GROUP BY kind",
      month,
    );
    const total = rows.reduce((sum, row) => sum + Number(row.amount), 0);
    const evaluations = Number(rows.find((row) => row.kind === "evaluation")?.amount ?? 0);
    if (total + amount > monthly || (kind === "evaluation" && evaluations + amount > evaluation)) {
      throw new BudgetError();
    }
    this.query(
      "INSERT INTO ai_spend(id, month, kind, amount) VALUES (?, ?, ?, ?)",
      id,
      month,
      kind,
      amount,
    );
    // Old in-flight reservations remain charged in their original month; no timed release.
    this.query("DELETE FROM ai_spend WHERE month < ?", monthInJapan(now - 400 * 86_400_000));
  }

  settle(id: string, actual: number | null): void {
    if (actual !== null && (!Number.isFinite(actual) || actual < 0)) {
      throw new Error("invalid actual cost");
    }
    if (actual === null) {
      // A timeout or missing billing record may have incurred spend: retain the reservation.
      this.query("UPDATE ai_spend SET settled = 1 WHERE id = ? AND settled = 0", id);
    } else {
      this.query(
        "UPDATE ai_spend SET amount = ?, settled = 1 WHERE id = ? AND settled = 0",
        actual,
        id,
      );
    }
  }

  summary(now: number): { month: string; total: number; evaluation: number } {
    const month = monthInJapan(now);
    const rows = this.query(
      "SELECT kind, SUM(amount) AS amount FROM ai_spend WHERE month = ? GROUP BY kind",
      month,
    );
    return {
      month,
      total: rows.reduce((sum, row) => sum + Number(row.amount), 0),
      evaluation: Number(rows.find((row) => row.kind === "evaluation")?.amount ?? 0),
    };
  }
}
