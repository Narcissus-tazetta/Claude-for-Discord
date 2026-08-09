// Ported verbatim from bot.py. The Japanese user-facing strings are part of the contract:
// changing them changes what people see in Discord.

export const HISTORY_DEPTH = 6;
export const DISCORD_CHUNK_LIMIT = 1900;
// Regenerate cache: how many past answers we keep enough state on to redo. Bounded so the
// StateDO doesn't accumulate unbounded rows; oldest entries drop first.
export const MAX_REGEN_RECORDS = 200;

// Haiku 4.5 predates adaptive thinking / effort — sending either param to it returns a 400.
// (Verified against the Models API: its `thinking.types.adaptive` and every `effort` level
// report supported=false, while `enabled` — the old fixed-budget mode — reports true.)
export const MODELS_WITHOUT_THINKING_SUPPORT = new Set(["claude-haiku-4-5"]);
// The dynamic-filtering web_fetch versions run on the code execution sandbox, so a model
// without code execution rejects them outright:
//   claude-haiku-4-5 + web_fetch_20260318 -> 400 "does not support programmatic tool calling"
// Haiku 4.5 still fetches fine on the basic 20250910 version.
export const MODELS_WITHOUT_CODE_EXECUTION = new Set(["claude-haiku-4-5"]);
export const WEB_FETCH_TOOL_MODERN = "web_fetch_20260318";
export const WEB_FETCH_TOOL_BASIC = "web_fetch_20250910";
export const WEB_SEARCH_TOOL_MODERN = "web_search_20260318";
export const WEB_SEARCH_TOOL_BASIC = "web_search_20250305";
export const WEB_FETCH_MAX_USES = 3;
export const WEB_FETCH_MAX_CONTENT_TOKENS = 30_000;
export const WEB_SEARCH_MAX_USES = 3;
// A single search can surface a dozen results; listing them all buries the answer.
export const MAX_SOURCES_SHOWN = 5;
// Server tools can end a turn with stop_reason "pause_turn"; resend to let them finish.
export const SERVER_TOOL_MAX_ROUNDS = 4;

export const AVAILABLE_MODELS: [string, string, string][] = [
  ["Claude Opus 5", "claude-opus-5", "最も高性能・高コスト"],
  ["Claude Sonnet 5", "claude-sonnet-5", "バランス型"],
  ["Claude Haiku 4.5", "claude-haiku-4-5", "高速・低コスト（思考/エフォート非対応）"],
];
export const EFFORT_LEVELS = ["low", "medium", "high", "xhigh", "max"];

// Vision/document input. Sizes are checked against the interaction payload's attachment
// metadata; the bytes themselves are never pulled through the Worker (see WORKERS_MIGRATION_PLAN §6.1).
export const SUPPORTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);
export const PDF_TYPE = "application/pdf";
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const MAX_ATTACHMENTS = 8;
export const MAX_TOTAL_ATTACHMENT_BYTES = 16 * 1024 * 1024;

export const EPHEMERAL = 64;

export const MSG_DENIED = "このBotを使用する権限がありません。";
export const MSG_NOT_OWNER = "これはあなたの設定画面ではありません。";
export const MSG_NOT_A_CLAUDE_MESSAGE = "この操作はClaudeの回答メッセージにのみ使用できます。";
export const MSG_NO_REGEN_RECORD =
  "この回答は再生成できません（Botの再起動または時間経過によりキャッシュが失われています）。";
export const MSG_REGENERATED = "🔄 再生成しました。";
export const MSG_REGENERATED_PARTIAL =
  "🔄 再生成しましたが、一部のメッセージは編集期限切れのため上書きできませんでした。";
export const MSG_REGEN_SUPERSEDED = "*(再生成後は不要になりました)*";
export const MSG_GENERIC_ERROR = "エラーが発生しました。時間をおいて再試行してください。";
export const MSG_ATTACHMENT_UNREADABLE =
  "添付ファイルを読み込めませんでした（対応形式は JPEG/PNG/GIF/WebP/PDF、" +
  `サイズ上限は ${Math.floor(MAX_ATTACHMENT_BYTES / (1024 * 1024))}MB です）。`;
// §6.1: attachments are handed to Anthropic as signed Discord CDN URLs, which expire. A
// regenerate of an old answer can therefore fail where the original succeeded.
export const MSG_ATTACHMENT_EXPIRED = "添付ファイルの有効期限が切れているため再生成できません。";
export const MSG_NO_TEXT = "(応答にテキストが含まれていませんでした)";
export const MSG_CONTINUATION_ANCHOR = "(以下は以前のやり取りの続きです)";

export interface Env {
  JOB_DO: DurableObjectNamespace<import("./job-do").JobDO>;
  STATE_DO: DurableObjectNamespace<import("./state-do").StateDO>;
  DISCORD_APPLICATION_ID: string;
  DISCORD_PUBLIC_KEY: string;
  ALLOWED_USER_IDS: string;
  CLAUDE_MODEL: string;
  CLAUDE_MAX_TOKENS: string;
  /** Overrides the Discord REST base URL. Only set when testing against a stand-in server. */
  DISCORD_API_BASE?: string;
  /** Overrides the Anthropic API base URL, so tests can run without spending on real calls. */
  ANTHROPIC_API_BASE?: string;
  // secrets
  DISCORD_BOT_TOKEN: string;
  ANTHROPIC_API_KEY: string;
}

export function maxTokens(env: Env): number {
  const n = parseInt(env.CLAUDE_MAX_TOKENS ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 4096;
}

export function allowedUserIds(env: Env): Set<string> {
  return new Set(
    (env.ALLOWED_USER_IDS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}
