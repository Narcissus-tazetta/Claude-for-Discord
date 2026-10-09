import { Database } from "bun:sqlite";
import { StateDO } from "../../src/durable-objects/state-do";
import {
  DISCOVERY_VERSION,
  type ModelInfo,
  type Registry,
  revision,
} from "../../src/models/registry";
import type { Env } from "../../src/shared/constants";
export function context() {
  const db = new Database(":memory:");
  const kv = new Map<string, any>();
  let alarm: number | null = null;
  let gate = Promise.resolve();
  const ctx = {
    storage: {
      sql: {
        exec: (sql: string, ...params: any[]) => {
          const rows = db.query(sql).all(...params);
          return { toArray: () => rows };
        },
      },
      get: async (key: string) => structuredClone(kv.get(key)),
      put: async (key: string, value: any) => {
        kv.set(key, structuredClone(value));
      },
      deleteAll: async () => {
        kv.clear();
        alarm = null;
      },
      getAlarm: async () => alarm,
      setAlarm: async (value: number) => {
        alarm = value;
      },
      transactionSync: (fn: () => any) => db.transaction(fn)(),
    },
    blockConcurrencyWhile: (fn: () => Promise<any>) => {
      const result = gate.then(fn);
      gate = result.then(() => {});
      return result;
    },
  };
  return { ctx, kv, db, ready: () => gate };
}
export function setup(extra: Partial<Env> = {}) {
  const storage = context();
  const env = {
    AI_GATEWAY_API_KEY: "test-key",
    AI_GATEWAY_BASE_URL: "https://mock.invalid/v1",
    DISCORD_APPLICATION_ID: "app",
    DISCORD_API_BASE: "https://discord.mock/v10",
    DISCORD_BOT_TOKEN: "bot-test",
    ALLOWED_USER_IDS: "123",
    CLAUDE_MAX_TOKENS: "4096",
    ...extra,
  } as Env;
  const state = new StateDO(storage.ctx as any, env);
  env.STATE_DO = { idFromName: (name: string) => name, get: () => state } as any;
  return { ...storage, env, state };
}
export function model(id = "google/gemini-test"): ModelInfo {
  return {
    id,
    name: id,
    released: 100,
    context: 100_000,
    maxOutput: 4096,
    tags: [],
    input: 0.1e-6,
    output: 0.4e-6,
    preview: false,
    reasoning: [],
  };
}
export function registry(): Registry {
  const m = model();
  return {
    discoveryVersion: DISCOVERY_VERSION,
    refreshedAt: Date.now(),
    models: [m],
    evaluations: {
      [m.id]: {
        revision: revision(m),
        testedAt: Date.now(),
        basic: true,
        balanced: true,
        complex: true,
        vision: false,
        pdf: false,
        latencyMs: 1,
        failures: 0,
        disabledUntil: 0,
      },
    },
  };
}
export const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
export const answers = [
  '{"name":"さかな","count":3}',
  "391",
  "会議は木曜日に東京で開催される。",
  '{"intervals":[["09:30","10:00"],["11:00","11:30"]]}',
  '{"method":"Array.from"}',
  '{"duration":14,"critical_path":["A","C","E","F"]}',
];
