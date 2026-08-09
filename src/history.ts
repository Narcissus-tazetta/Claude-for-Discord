import {
  HISTORY_DEPTH,
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENTS,
  MAX_TOTAL_ATTACHMENT_BYTES,
  MSG_CONTINUATION_ANCHOR,
  PDF_TYPE,
  SUPPORTED_IMAGE_TYPES,
} from "./constants";
import type { DiscordClient } from "./discord-api";
import type { AnthropicMessage, ContentBlock, DiscordAttachment, DiscordMessage } from "./types";

export function textBlock(text: string): ContentBlock {
  return { type: "text", text };
}

export interface AttachmentBudget {
  count: number;
  bytes: number;
}

export function newBudget(): AttachmentBudget {
  return { count: 0, bytes: 0 };
}

function mediaType(att: DiscordAttachment): string {
  return (att.content_type ?? "").split(";")[0].trim().toLowerCase();
}

export function isSupportedAttachment(att: DiscordAttachment): boolean {
  const type = mediaType(att);
  return (SUPPORTED_IMAGE_TYPES.has(type) || type === PDF_TYPE) && att.size <= MAX_ATTACHMENT_BYTES;
}

/**
 * Turn supported attachments into image/document content blocks.
 *
 * Unlike the Python original these carry a `url` source rather than base64: downloading and
 * encoding a 5MB PDF inside a Worker would blow the CPU budget, and the size/type checks
 * work off the interaction payload's metadata anyway (WORKERS_MIGRATION_PLAN §6.1).
 *
 * `budget` is shared across the whole reply chain so one image-heavy thread can't blow past
 * the API's request ceiling.
 */
export function attachmentBlocks(
  attachments: DiscordAttachment[],
  budget: AttachmentBudget,
): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  for (const att of attachments) {
    if (budget.count >= MAX_ATTACHMENTS || budget.bytes >= MAX_TOTAL_ATTACHMENT_BYTES) break;
    const type = mediaType(att);
    if (!SUPPORTED_IMAGE_TYPES.has(type) && type !== PDF_TYPE) continue;
    if (att.size > MAX_ATTACHMENT_BYTES) {
      console.log(`skipping oversized attachment ${att.filename} (${att.size} bytes)`);
      continue;
    }

    budget.count += 1;
    budget.bytes += att.size;
    const source = { type: "url", url: att.url };
    // Label each file so the prompt can refer to it by name, and put the file before
    // the message text — Claude performs best with images ahead of the question.
    blocks.push(textBlock(`[添付: ${att.filename}]`));
    blocks.push({ type: type === PDF_TYPE ? "document" : "image", source });
  }
  return blocks;
}

/** Merge consecutive same-role turns so the sequence stays strictly alternating (Anthropic API requirement). */
export function normalizeTurns(turns: AnthropicMessage[]): AnthropicMessage[] {
  const merged: AnthropicMessage[] = [];
  for (const turn of turns) {
    const last = merged[merged.length - 1];
    if (last && last.role === turn.role) {
      last.content = [...last.content, ...turn.content];
    } else {
      merged.push({ role: turn.role, content: [...turn.content] });
    }
  }
  return merged;
}

export async function buildHistoryFromMessage(
  startMessage: DiscordMessage,
  discord: DiscordClient,
  limit: number = HISTORY_DEPTH,
): Promise<AnthropicMessage[]> {
  const appId = discord.appId;
  let turns: AnthropicMessage[] = [];
  const budget = newBudget();
  let curr: DiscordMessage | null = startMessage;

  for (let i = 0; i < limit; i++) {
    if (curr === null) break;
    // A bot's user id and its application id are the same value.
    const isBot = curr.author?.id === appId;
    const role: "user" | "assistant" = isBot ? "assistant" : "user";
    const text = (curr.content ?? "").split(`<@${appId}>`).join("").trim();

    // Only user turns carry attachments — the assistant role rejects image blocks.
    const content: ContentBlock[] = isBot ? [] : attachmentBlocks(curr.attachments ?? [], budget);
    if (text) content.push(textBlock(text));
    if (content.length) turns.unshift({ role, content });

    const refId = curr.message_reference?.message_id;
    const refChannel = curr.message_reference?.channel_id ?? curr.channel_id;
    if (refId && refChannel) {
      try {
        curr = await discord.fetchMessage(refChannel, refId);
      } catch (err) {
        // Common in guild channels where the app is user-installed only (no standing bot
        // presence, so history beyond the resolved message is unreachable).
        console.log(`history: stopping at ${refId}: ${err}`);
        break;
      }
    } else {
      break;
    }
  }

  turns = normalizeTurns(turns);
  if (turns.length && turns[0].role === "assistant") {
    // The Messages API requires the first turn to be `user`. Right-clicking one of
    // Claude's own replies (the primary flow) otherwise produces an assistant-first
    // array and a 400, so anchor it with a synthetic opener instead of dropping the
    // message the user actually pointed at.
    turns.unshift({ role: "user", content: [textBlock(MSG_CONTINUATION_ANCHOR)] });
  }
  return turns;
}
