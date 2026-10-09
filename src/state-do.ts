import { DurableObject } from "cloudflare:workers";
import { PaidCalls } from "./ai";
import { benchmarkReview } from "./benchmark-reviews";
import { BudgetError, type BudgetKind, BudgetLedger, positiveSetting } from "./budget";
import { EFFORT_LEVELS, type Env, MAX_REGEN_RECORDS } from "./constants";
import { GatewayClient, GatewayError, type GatewayResult, reasoningOptions } from "./gateway";
import { EVALUATION_MAX_OUTPUT, evaluateModel } from "./model-evaluation";
import {
  autoFamily,
  DAY_MS,
  DISCOVERY_VERSION,
  EMPTY_REGISTRY,
  evaluationCandidates,
  FREE_RETRY_MS,
  FREE_SUITE_VERSION,
  freshEvaluation,
  freshOutcome,
  isApproved,
  isFreeModel,
  mergeCatalog,
  parseCatalog,
  type Registry,
  revision,
  type Tier,
} from "./model-registry";
import type { Prefs, RegenRecordWire } from "./types";

// Gateway ingests usage asynchronously; a record still missing after this long never arrives.
const PENDING_COST_GIVE_UP_MS = DAY_MS;
const FREE_EVALUATION_DAY = `ai_free_evaluation_day_v${FREE_SUITE_VERSION}`;
const FREE_DAILY_LIMIT = 24;
const FREE_RETRIES = `ai_free_retry_v${FREE_SUITE_VERSION}`;

function evaluationIds(ids: string[], registry: Registry): string[] {
  return ids.filter(
    (id) => autoFamily(id) && !registry.models.some((m) => m.id === id && isFreeModel(m)),
  );
}

// SQL row shapes. The index signature is what SqlStorage.exec<T>() asks for.
interface PrefRow extends Record<string, SqlStorageValue> {
  user_id: string;
  ephemeral: number;
  model: string;
  thinking: number;
  effort: string;
  web_fetch: number;
  web_search: number;
  currency: string;
}

interface RecordRow extends Record<string, SqlStorageValue> {
  record_id: string;
  messages: string;
  user_id: string;
  header: string;
  ephemeral: number;
  token: string;
}

interface IndexRow extends Record<string, SqlStorageValue> {
  id: string;
  position: number;
}

export type PrefKey =
  | "ephemeral"
  | "model"
  | "thinking"
  | "effort"
  | "web_fetch"
  | "web_search"
  | "currency";

/**
 * Singleton (idFromName("global")) holding everything that has to outlive a single
 * interaction: per-user settings and the regenerate cache.
 *
 * Deliberately not KV — the account's KV daily quota is already half-consumed by another
 * Worker, and Durable Object SQLite storage is metered separately.
 */
export class StateDO extends DurableObject<Env> {
  private refreshInFlight: Promise<void> | null = null;
  private maintenanceInFlight: Promise<void> | null = null;
  private ledger(): BudgetLedger {
    return new BudgetLedger((query, ...params) =>
      this.ctx.storage.sql.exec(query, ...params).toArray(),
    );
  }

  reserveSpend(id: string, amount: number, kind: BudgetKind): void {
    if (kind !== "answer" && kind !== "evaluation") throw new Error("invalid budget kind");
    this.ctx.storage.transactionSync(() =>
      this.ledger().reserve(
        id,
        amount,
        kind,
        positiveSetting(this.env.AI_MONTHLY_BUDGET_USD, 10),
        positiveSetting(this.env.AI_EVALUATION_BUDGET_USD, 0.5),
        Date.now(),
      ),
    );
  }

  settleSpend(id: string, actual: number | null): void {
    this.ctx.storage.transactionSync(() => this.ledger().settle(id, actual));
  }

  async deferSpend(id: string, generationId: string): Promise<void> {
    this.ctx.storage.transactionSync(() => this.ledger().defer(id, generationId, Date.now()));
    await this.scheduleNextAlarm();
  }

  /** Resolve deferred costs from Gateway's billing records. */
  private async settlePending(): Promise<void> {
    const gateway = new GatewayClient(this.env);
    for (const row of this.ledger().pending(25)) {
      const expired = Date.now() - row.createdAt > PENDING_COST_GIVE_UP_MS;
      try {
        const result = await gateway.generationCost(row.generationId);
        if (result.found) {
          this.ctx.storage.transactionSync(() => this.ledger().resolve(row.id, result.cost));
          continue;
        }
      } catch (error) {
        console.error(
          "generation cost lookup failed",
          error instanceof GatewayError ? error.status : "transport",
        );
      }
      if (expired) {
        // The reservation stays charged: an unknown cost must not free budget.
        console.error("generation cost never appeared; keeping reservation", row.generationId);
        this.ctx.storage.transactionSync(() => this.ledger().resolve(row.id, null));
      }
    }
  }

  /** `fromAlarm`: the alarm that just ran must be replaced, not merely moved earlier. */
  private async scheduleNextAlarm(fromAlarm = false): Promise<void> {
    if (!this.env.AI_GATEWAY_API_KEY) return;
    const now = Date.now();
    const due = (await this.ctx.storage.get<number>("ai_maintenance_due")) ?? now + 5 * 60 * 1000;
    const oldest = this.ledger().oldestPending();
    // Back off as a record stays missing: ingestion usually takes seconds, rarely longer.
    const settleAt =
      oldest === null
        ? Number.POSITIVE_INFINITY
        : now + (now - oldest < 60_000 ? 5_000 : now - oldest < 3_600_000 ? 60_000 : 600_000);
    const next = Math.min(due, settleAt);
    const current = await this.ctx.storage.getAlarm();
    if (fromAlarm || current === null || current > next) await this.ctx.storage.setAlarm(next);
  }

  async getRegistryJson(): Promise<string> {
    const registry = await this.registry();
    if (registry.discoveryVersion !== DISCOVERY_VERSION && this.env.AI_GATEWAY_API_KEY) {
      await this.scheduleMaintenance();
    }
    const day = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const daily = await this.ctx.storage.get<{ day: string; ids: string[] }>("ai_evaluation_day");
    const freeDaily = await this.ctx.storage.get<{ day: string; ids: string[] }>(
      FREE_EVALUATION_DAY,
    );
    const lastFailure =
      await this.ctx.storage.get<NonNullable<Registry["progress"]>["lastFailure"]>(
        "ai_evaluation_error",
      );
    return JSON.stringify({
      ...registry,
      progress: {
        attemptsToday: daily?.day === day ? evaluationIds(daily.ids, registry).length : 0,
        dailyLimit: 2,
        freeAttemptsToday: freeDaily?.day === day ? freeDaily.ids.length : 0,
        freeDailyLimit: FREE_DAILY_LIMIT,
        budgetUsd: positiveSetting(this.env.AI_EVALUATION_BUDGET_USD, 0.5),
        nextRunAt: await this.ctx.storage.getAlarm(),
        ...(lastFailure ? { lastFailure } : {}),
      },
    });
  }

  private async registry(): Promise<Registry> {
    return (await this.ctx.storage.get<Registry>("ai_registry")) ?? structuredClone(EMPTY_REGISTRY);
  }

  async scheduleMaintenance(): Promise<void> {
    if (!this.env.AI_GATEWAY_API_KEY) return;
    await this.ctx.storage.put("ai_maintenance_due", Date.now());
    await this.ctx.storage.setAlarm(Date.now());
  }

  async refreshCatalog(): Promise<void> {
    await this.refreshRegistry(true);
    await this.ensureAlarm();
  }

  private async refreshRegistry(force = false): Promise<void> {
    if (this.refreshInFlight) return await this.refreshInFlight;
    this.refreshInFlight = (async () => {
      const old = await this.registry();
      if (
        !force &&
        old.discoveryVersion === DISCOVERY_VERSION &&
        Date.now() - old.refreshedAt < DAY_MS
      )
        return;
      const catalog = await new GatewayClient(this.env).catalog();
      const models = parseCatalog(catalog);
      await this.ctx.blockConcurrencyWhile(async () => {
        const current = await this.registry();
        const updated = mergeCatalog(current, models);
        if (current.refreshedAt) await this.ctx.storage.put("ai_registry_previous", current);
        await this.ctx.storage.put("ai_registry", updated);
      });
    })();
    try {
      await this.refreshInFlight;
    } finally {
      this.refreshInFlight = null;
    }
  }

  /** First Auto request bootstraps one model. Existing preferences are not overwritten. */
  async prepareRegistry(auto = true, freeOnly = false, tier: Tier = "economy"): Promise<string> {
    try {
      await this.refreshRegistry();
    } catch (error) {
      console.error(
        "catalog refresh failed",
        error instanceof GatewayError ? error.status : "transport",
      );
    }
    let registry = await this.registry();
    const ready = () =>
      registry.models.some((model) => {
        if ((freeOnly && !isFreeModel(model)) || !isApproved(registry, model)) return false;
        if (!freeOnly || tier === "economy") return true;
        const evaluation = freshEvaluation(registry, model);
        return tier === "strong" ? evaluation?.complex : evaluation?.balanced;
      });
    if (auto && !ready() && Date.now() - registry.refreshedAt < 2 * DAY_MS)
      for (
        let attempt = 0;
        attempt <
          (freeOnly ? Math.min(FREE_DAILY_LIMIT, registry.models.filter(isFreeModel).length) : 1) &&
        !ready();
        attempt++
      ) {
        await this.maintainModels(freeOnly);
        registry = await this.registry();
      }
    await this.ensureAlarm();
    return await this.getRegistryJson();
  }

  private async ensureAlarm(): Promise<void> {
    if (this.env.AI_GATEWAY_API_KEY && (await this.ctx.storage.getAlarm()) === null) {
      await this.ctx.storage.put("ai_maintenance_due", Date.now() + 5 * 60 * 1000);
      await this.ctx.storage.setAlarm(Date.now() + 5 * 60 * 1000);
    }
  }

  private async maintainModels(freeOnly = false): Promise<void> {
    if (this.maintenanceInFlight) return await this.maintenanceInFlight;
    this.maintenanceInFlight = this.evaluateNext(freeOnly);
    try {
      await this.maintenanceInFlight;
    } finally {
      this.maintenanceInFlight = null;
    }
  }

  private async evaluateNext(freeOnly = false): Promise<void> {
    const day = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const daily = await this.ctx.storage.get<{ day: string; ids: string[] }>("ai_evaluation_day");
    const registry = await this.registry();
    const ids = daily?.day === day ? evaluationIds(daily.ids, registry) : [];
    const freeDaily = await this.ctx.storage.get<{ day: string; ids: string[] }>(
      FREE_EVALUATION_DAY,
    );
    const freeIds = freeDaily?.day === day ? freeDaily.ids : [];
    const retries = (await this.ctx.storage.get<Record<string, number>>(FREE_RETRIES)) ?? {};
    const paidEvaluation = positiveSetting(this.env.AI_EVALUATION_BUDGET_USD, 0.5) > 0;
    const candidates = evaluationCandidates(registry).filter((model) =>
      isFreeModel(model)
        ? freeIds.length < FREE_DAILY_LIMIT &&
          Date.now() - (retries[model.id] ?? 0) >= FREE_RETRY_MS
        : !freeOnly && paidEvaluation && ids.length < 2 && !ids.includes(model.id),
    );
    // Bootstrap inexpensive models first and spread evaluation across all three creators.
    candidates.sort((a, b) => {
      const coverage = (id: string) =>
        registry.models.filter(
          (m) => m.id.split("/")[0] === id.split("/")[0] && isApproved(registry, m),
        ).length;
      return (
        Number(isFreeModel(b)) - Number(isFreeModel(a)) ||
        coverage(a.id) - coverage(b.id) ||
        a.input + a.output - (b.input + b.output) ||
        b.released - a.released
      );
    });
    const model = candidates[0];
    if (!model) return;
    // Claim before any paid work so alarm retries/crashes cannot repeat the same suite today.
    await this.ctx.storage.put(isFreeModel(model) ? FREE_EVALUATION_DAY : "ai_evaluation_day", {
      day,
      ids: [...(isFreeModel(model) ? freeIds : ids), model.id],
    });
    if (isFreeModel(model)) {
      retries[model.id] = Date.now();
      await this.ctx.storage.put(FREE_RETRIES, retries);
    }
    const calls = new PaidCalls(this.env, this, "evaluation", 0.15);
    const checkpointKey = `ai_free_probes:${model.id}`;
    const saved = isFreeModel(model)
      ? await this.ctx.storage.get<{
          revision: string;
          at: number;
          results: Record<string, GatewayResult>;
        }>(checkpointKey)
      : undefined;
    const checkpoint =
      saved?.revision === revision(model) && Date.now() - saved.at < DAY_MS
        ? saved
        : {
            revision: revision(model),
            at: Date.now(),
            results: {} as Record<string, GatewayResult>,
          };
    try {
      const evaluation = await evaluateModel(
        model,
        async (candidate, messages) => {
          const minimum =
            candidate.reasoning.find((option) => option.type === "budget_tokens")?.min ?? 0;
          const mandatoryBudget =
            minimum > 0 &&
            !candidate.reasoning.some(
              (option) => option.type === "toggle" || option.type === "effort",
            );
          const cap = Math.min(
            candidate.maxOutput,
            isFreeModel(candidate)
              ? Math.max(EVALUATION_MAX_OUTPUT + 4096, minimum + 256)
              : mandatoryBudget
                ? Math.max(EVALUATION_MAX_OUTPUT, minimum + 256)
                : EVALUATION_MAX_OUTPUT,
          );
          const complete = () =>
            calls.complete(
              candidate,
              messages,
              cap,
              reasoningOptions(candidate, { thinking: true, effort: "low" }, cap),
            );
          try {
            return await complete();
          } catch (error) {
            // A transient failure should not discard a free suite's completed probes.
            if (isFreeModel(candidate) && error instanceof GatewayError && error.canFallback)
              return await complete();
            throw error;
          }
        },
        Date.now(),
        isFreeModel(model)
          ? {
              get: async (name) => checkpoint.results[name],
              save: async (name, result) => {
                checkpoint.results[name] = result;
                await this.ctx.storage.put(checkpointKey, checkpoint);
              },
            }
          : undefined,
      );
      await this.ctx.blockConcurrencyWhile(async () => {
        const latest = await this.registry();
        if (latest.models.some((m) => m.id === model.id && revision(m) === evaluation.revision)) {
          latest.evaluations[model.id] = evaluation;
          await this.ctx.storage.put("ai_registry", latest);
        }
      });
      await this.ctx.storage.put("ai_evaluation_error", null);
      console.log(
        JSON.stringify({
          event: "model_evaluated",
          model: model.id,
          basic: evaluation.basic,
          balanced: evaluation.balanced,
          complex: evaluation.complex,
          vision: evaluation.vision,
          pdf: evaluation.pdf,
        }),
      );
    } catch (error) {
      await this.ctx.storage.put("ai_evaluation_error", {
        model: model.id,
        at: Date.now(),
        reason:
          error instanceof GatewayError
            ? error.status === 402
              ? "Gateway残高不足"
              : error.status === 401
                ? "APIキーの認証エラー"
                : `Gatewayエラー（${error.status}）`
            : error instanceof BudgetError
              ? "Botの評価／回答予算上限"
              : "通信または処理エラー",
      });
      // Interrupted suites never qualify a model. Do not replace prior approvals on error.
      console.error(
        "model evaluation incomplete",
        model.id,
        error instanceof GatewayError
          ? error.status
          : error instanceof BudgetError
            ? "budget"
            : "transport",
      );
    } finally {
      if (isFreeModel(model)) {
        const due = await this.ctx.storage.get<number>("ai_maintenance_due");
        await this.ctx.storage.put(
          "ai_maintenance_due",
          Math.min(due ?? Infinity, Date.now() + FREE_RETRY_MS),
        );
        await this.scheduleNextAlarm();
      }
    }
  }

  /** Admin RPC through an account-owned binding. One small connection probe per reviewed model. */
  async checkBenchmarkedConnections(): Promise<{ model: string; status: string }[]> {
    const registry = await this.registry();
    const results: { model: string; status: string }[] = [];
    for (const model of registry.models.filter(
      (m) => benchmarkReview(m) && isApproved(registry, m),
    )) {
      if (freshEvaluation(registry, model)?.basic || freshOutcome(registry, model)?.successes) {
        results.push({ model: model.id, status: "already-confirmed" });
        continue;
      }
      try {
        const calls = new PaidCalls(this.env, this, "evaluation", 0.05);
        const cap = Math.min(1024, model.maxOutput);
        const result = await calls.complete(
          model,
          [{ role: "user", content: "Reply with only CONNECTION_OK." }],
          cap,
          reasoningOptions(model, { thinking: true, effort: "low" }, cap),
        );
        const success = result.finishReason === "stop" && result.text.trim() === "CONNECTION_OK";
        await this.recordModelOutcome(model.id, success);
        results.push({ model: model.id, status: success ? "confirmed" : "unexpected-response" });
      } catch (error) {
        results.push({
          model: model.id,
          status:
            error instanceof BudgetError
              ? "budget-limit"
              : error instanceof GatewayError
                ? `gateway-${error.status}`
                : "transport-error",
        });
        // Never retry ambiguous paid failures or bypass the shared evaluation budget.
        if (!(error instanceof GatewayError) || !error.canFallback) break;
      }
    }
    return results;
  }

  async recordModelOutcome(id: string, success: boolean): Promise<void> {
    await this.ctx.blockConcurrencyWhile(async () => {
      const registry = await this.registry();
      const model = registry.models.find((m) => m.id === id);
      if (!model) return;
      const previous = freshOutcome(registry, model);
      const failures = success ? 0 : (previous?.failures ?? 0) + 1;
      registry.outcomes ??= {};
      registry.outcomes[id] = {
        revision: revision(model),
        testedAt: Date.now(),
        successes: (previous?.successes ?? 0) + Number(success),
        failures,
        disabledUntil: failures >= 3 ? Date.now() + DAY_MS : (previous?.disabledUntil ?? 0),
      };
      const evaluation = registry.evaluations[id];
      if (evaluation) {
        evaluation.failures = success ? 0 : evaluation.failures + 1;
        if (evaluation.failures >= 3) evaluation.disabledUntil = Date.now() + DAY_MS;
      }
      await this.ctx.storage.put("ai_registry", registry);
    });
  }

  /** One alarm serves two schedules: cost settlement (seconds) and model maintenance (daily). */
  async alarm(): Promise<void> {
    if (!this.env.AI_GATEWAY_API_KEY) return;
    try {
      await this.settlePending();
      const due = (await this.ctx.storage.get<number>("ai_maintenance_due")) ?? 0;
      if (Date.now() >= due) await this.runMaintenance();
    } finally {
      await this.scheduleNextAlarm(true);
    }
  }

  private async runMaintenance(): Promise<void> {
    try {
      await this.refreshRegistry();
      await this.maintainModels();
    } catch (error) {
      console.error(
        "AI maintenance failed",
        error instanceof GatewayError ? error.status : "configuration/transport",
        error instanceof Error ? error.name : "unknown",
      );
    } finally {
      const daily = await this.ctx.storage.get<{ day: string; ids: string[] }>("ai_evaluation_day");
      const day = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const registry = await this.registry();
      const freeDaily = await this.ctx.storage.get<{ day: string; ids: string[] }>(
        FREE_EVALUATION_DAY,
      );
      const freeIds = freeDaily?.day === day ? freeDaily.ids : [];
      const paidIds = daily?.day === day ? evaluationIds(daily.ids, registry) : [];
      const more = evaluationCandidates(registry).some((model) =>
        isFreeModel(model)
          ? freeIds.length < FREE_DAILY_LIMIT
          : paidIds.length < 2 &&
            !paidIds.includes(model.id) &&
            positiveSetting(this.env.AI_EVALUATION_BUDGET_USD, 0.5) > 0,
      );
      await this.ctx.storage.put(
        "ai_maintenance_due",
        Date.now() + (more ? 5 * 60 * 1000 : DAY_MS),
      );
    }
  }
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      const sql = ctx.storage.sql;
      sql.exec(`
        CREATE TABLE IF NOT EXISTS prefs (
          user_id     TEXT PRIMARY KEY,
          ephemeral   INTEGER NOT NULL DEFAULT 0,
          model       TEXT    NOT NULL,
          thinking    INTEGER NOT NULL DEFAULT 1,
          effort      TEXT    NOT NULL DEFAULT 'high',
          web_fetch   INTEGER NOT NULL DEFAULT 1,
          web_search  INTEGER NOT NULL DEFAULT 1
        );
      `);
      // Tables created before the currency setting existed get the column added in place.
      const columns = sql.exec("PRAGMA table_info(prefs)").toArray();
      if (!columns.some((column) => column.name === "currency"))
        sql.exec("ALTER TABLE prefs ADD COLUMN currency TEXT NOT NULL DEFAULT 'jpy'");
      sql.exec(`
        CREATE TABLE IF NOT EXISTS regen_records (
          record_id   TEXT PRIMARY KEY,
          messages    TEXT NOT NULL,
          user_id     TEXT NOT NULL,
          header      TEXT NOT NULL,
          ephemeral   INTEGER NOT NULL,
          token       TEXT NOT NULL,
          created_at  INTEGER NOT NULL
        );
      `);
      sql.exec(`
        CREATE TABLE IF NOT EXISTS regen_index (
          message_id  TEXT PRIMARY KEY,
          record_id   TEXT NOT NULL,
          position    INTEGER NOT NULL
        );
      `);
      sql.exec(`CREATE INDEX IF NOT EXISTS regen_index_by_record ON regen_index (record_id);`);
      sql.exec(`CREATE INDEX IF NOT EXISTS regen_records_by_age ON regen_records (created_at);`);
    });
  }

  private defaults(): Prefs {
    // New users' answers are public; saved display preferences remain authoritative.
    return {
      ephemeral: false,
      model: this.env.AI_DEFAULT_MODEL || "auto",
      thinking: true,
      effort: "medium",
      web_fetch: true,
      web_search: true,
      currency: "jpy",
    };
  }

  private row(userId: string): PrefRow | null {
    const rows = this.ctx.storage.sql
      .exec<PrefRow>("SELECT * FROM prefs WHERE user_id = ?", userId)
      .toArray();
    return rows.length ? rows[0] : null;
  }

  getPrefs(userId: string): Prefs {
    const row = this.row(userId);
    if (!row) return this.defaults();
    return {
      ephemeral: !!row.ephemeral,
      model: row.model,
      thinking: !!row.thinking,
      effort: row.effort,
      web_fetch: !!row.web_fetch,
      web_search: !!row.web_search,
      currency: row.currency === "usd" ? "usd" : "jpy",
    };
  }

  /** Write one field, creating the row from defaults first if the user has never been seen. */
  setPref(userId: string, key: PrefKey, value: string | boolean): Prefs {
    const current = this.getPrefs(userId);
    const next: Prefs = { ...current, [key]: value } as Prefs;
    this.write(userId, next);
    return next;
  }

  togglePref(userId: string, key: "ephemeral" | "thinking" | "web_fetch" | "web_search"): Prefs {
    const current = this.getPrefs(userId);
    const next: Prefs = { ...current, [key]: !current[key] };
    this.write(userId, next);
    return next;
  }

  /** Save both fields together so a quality selection cannot leave a half-updated preference. */
  setAnswerQuality(userId: string, quality: string): Prefs {
    if (quality !== "off" && !EFFORT_LEVELS.includes(quality)) throw new Error("invalid quality");
    const current = this.getPrefs(userId);
    const next = {
      ...current,
      thinking: quality !== "off",
      effort: quality === "off" ? current.effort : quality,
    };
    this.write(userId, next);
    return next;
  }

  private write(userId: string, p: Prefs): void {
    this.ctx.storage.sql.exec(
      `INSERT INTO prefs (user_id, ephemeral, model, thinking, effort, web_fetch, web_search, currency)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET
         ephemeral = excluded.ephemeral,
         model = excluded.model,
         thinking = excluded.thinking,
         effort = excluded.effort,
         web_fetch = excluded.web_fetch,
         web_search = excluded.web_search,
         currency = excluded.currency`,
      userId,
      p.ephemeral ? 1 : 0,
      p.model,
      p.thinking ? 1 : 0,
      p.effort,
      p.web_fetch ? 1 : 0,
      p.web_search ? 1 : 0,
      p.currency,
    );
  }

  /**
   * Remember enough to replay an answer. Keyed by the first chunk's message id; every
   * chunk id is indexed to it so a right-click on any chunk of a multi-message answer
   * finds the same record.
   */
  saveRegenRecord(record: {
    chunkIds: string[];
    /** Pre-serialized: keeping the RPC surface primitive avoids a pathological type expansion. */
    messagesJson: string;
    userId: string;
    header: string;
    ephemeral: boolean;
    token: string;
  }): void {
    if (!record.chunkIds.length) return;
    const sql = this.ctx.storage.sql;
    const recordId = record.chunkIds[0];

    sql.exec(
      `INSERT INTO regen_records (record_id, messages, user_id, header, ephemeral, token, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(record_id) DO UPDATE SET
         messages = excluded.messages,
         user_id = excluded.user_id,
         header = excluded.header,
         ephemeral = excluded.ephemeral,
         token = excluded.token,
         created_at = excluded.created_at`,
      recordId,
      record.messagesJson,
      record.userId,
      record.header,
      record.ephemeral ? 1 : 0,
      record.token,
      Date.now(),
    );
    sql.exec("DELETE FROM regen_index WHERE record_id = ?", recordId);
    record.chunkIds.forEach((id, position) => {
      sql.exec(
        `INSERT INTO regen_index (message_id, record_id, position) VALUES (?, ?, ?)
         ON CONFLICT(message_id) DO UPDATE SET record_id = excluded.record_id, position = excluded.position`,
        id,
        recordId,
        position,
      );
    });

    // Bounded like the original OrderedDict: oldest records drop first, index rows with them.
    const stale = sql
      .exec<{ record_id: string }>(
        `SELECT record_id FROM regen_records ORDER BY created_at DESC, record_id DESC LIMIT -1 OFFSET ?`,
        MAX_REGEN_RECORDS,
      )
      .toArray();
    for (const { record_id } of stale) {
      sql.exec("DELETE FROM regen_index WHERE record_id = ?", record_id);
      sql.exec("DELETE FROM regen_records WHERE record_id = ?", record_id);
    }
  }

  /** Two-step lookup: any chunk's message id -> record id -> the record itself. */
  getRegenRecord(messageId: string): RegenRecordWire | null {
    const sql = this.ctx.storage.sql;
    const idx = sql
      .exec<{ record_id: string } & Record<string, SqlStorageValue>>(
        "SELECT record_id FROM regen_index WHERE message_id = ?",
        messageId,
      )
      .toArray();
    if (!idx.length) return null;
    const rows = sql
      .exec<RecordRow>("SELECT * FROM regen_records WHERE record_id = ?", idx[0].record_id)
      .toArray();
    if (!rows.length) return null;
    const row = rows[0];
    const chunkIds = sql
      .exec<IndexRow>(
        "SELECT message_id AS id, position FROM regen_index WHERE record_id = ? ORDER BY position",
        row.record_id,
      )
      .toArray()
      .map((c) => String(c.id));
    return {
      record_id: row.record_id,
      messagesJson: row.messages,
      user_id: row.user_id,
      header: row.header,
      ephemeral: !!row.ephemeral,
      token: row.token,
      chunkIds,
    };
  }
}
