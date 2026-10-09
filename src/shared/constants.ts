// The Japanese user-facing strings are part of the contract: changing them changes what
// people see in Discord.

export const HISTORY_DEPTH = 6;
export const DISCORD_CHUNK_LIMIT = 1900;
export const DISCORD_MESSAGE_LIMIT = 2000;
// Regenerate cache: how many past answers we keep enough state on to redo. Bounded so the
// StateDO doesn't accumulate unbounded rows; oldest entries drop first.
export const MAX_REGEN_RECORDS = 200;

export const EFFORT_LEVELS = ["low", "medium", "high", "xhigh", "max"];

// Vision/document input. Sizes are checked against the interaction payload's attachment
// metadata; PDF bytes are checked again when downloaded by the background job.
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
export const MSG_NOT_A_CLAUDE_MESSAGE = "この操作はAIの回答メッセージにのみ使用できます。";
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
// Attachments are stored as signed Discord CDN URLs, which expire. A
// regenerate of an old answer can therefore fail where the original succeeded.
export const MSG_ATTACHMENT_EXPIRED = "添付ファイルの有効期限が切れているため再生成できません。";
export const MSG_ANSWER_INTERRUPTED = "⚠️ 回答の途中で止まりました：";
export const MSG_NO_TEXT = "(応答にテキストが含まれていませんでした)";
export const MSG_CONTINUATION_ANCHOR = "(以下は以前のやり取りの続きです)";

export interface Env {
  JOB_DO: DurableObjectNamespace<import("../durable-objects/job-do").JobDO>;
  STATE_DO: DurableObjectNamespace<import("../durable-objects/state-do").StateDO>;
  DISCORD_APPLICATION_ID: string;
  DISCORD_PUBLIC_KEY: string;
  ALLOWED_USER_IDS: string;
  CLAUDE_MAX_TOKENS: string;
  /** Overrides the Discord REST base URL. Only set when testing against a stand-in server. */
  DISCORD_API_BASE?: string;
  // secrets
  DISCORD_BOT_TOKEN: string;
  AI_GATEWAY_API_KEY?: string;
  /** Usually omitted; useful for local mock servers. Includes the /v1 prefix. */
  AI_GATEWAY_BASE_URL?: string;
  /** When set, manually selected Claude models are called on this key instead of Gateway. */
  ANTHROPIC_API_KEY?: string;
  AI_DEFAULT_MODEL?: string;
  AI_MONTHLY_BUDGET_USD?: string;
  AI_MAX_ANSWER_USD?: string;
  AI_EVALUATION_BUDGET_USD?: string;
  /** Fixed reference conversion shown in settings; actual billing is USD. */
  AI_USD_JPY_RATE?: string;
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
