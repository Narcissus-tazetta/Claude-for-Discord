import { DurableObject } from "cloudflare:workers";
import { type Env, MAX_REGEN_RECORDS } from "./constants";
import type { Prefs, RegenRecordWire } from "./types";

// SQL row shapes. The index signature is what SqlStorage.exec<T>() asks for.
interface PrefRow extends Record<string, SqlStorageValue> {
  user_id: string;
  ephemeral: number;
  model: string;
  thinking: number;
  effort: string;
  web_fetch: number;
  web_search: number;
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

export type PrefKey = "ephemeral" | "model" | "thinking" | "effort" | "web_fetch" | "web_search";

/**
 * Singleton (idFromName("global")) holding everything that has to outlive a single
 * interaction: per-user settings and the regenerate cache.
 *
 * Deliberately not KV — the account's KV daily quota is already half-consumed by another
 * Worker, and Durable Object SQLite storage is metered separately.
 */
export class StateDO extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      const sql = ctx.storage.sql;
      sql.exec(`
        CREATE TABLE IF NOT EXISTS prefs (
          user_id     TEXT PRIMARY KEY,
          ephemeral   INTEGER NOT NULL DEFAULT 1,
          model       TEXT    NOT NULL,
          thinking    INTEGER NOT NULL DEFAULT 1,
          effort      TEXT    NOT NULL DEFAULT 'high',
          web_fetch   INTEGER NOT NULL DEFAULT 1,
          web_search  INTEGER NOT NULL DEFAULT 1
        );
      `);
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
    // Mirrors get_model_prefs() plus the separate display-mode default (ephemeral = true).
    return {
      ephemeral: true,
      model: this.env.CLAUDE_MODEL || "claude-sonnet-5",
      thinking: true,
      effort: "high",
      web_fetch: true,
      web_search: true,
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

  private write(userId: string, p: Prefs): void {
    this.ctx.storage.sql.exec(
      `INSERT INTO prefs (user_id, ephemeral, model, thinking, effort, web_fetch, web_search)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET
         ephemeral = excluded.ephemeral,
         model = excluded.model,
         thinking = excluded.thinking,
         effort = excluded.effort,
         web_fetch = excluded.web_fetch,
         web_search = excluded.web_search`,
      userId,
      p.ephemeral ? 1 : 0,
      p.model,
      p.thinking ? 1 : 0,
      p.effort,
      p.web_fetch ? 1 : 0,
      p.web_search ? 1 : 0,
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
