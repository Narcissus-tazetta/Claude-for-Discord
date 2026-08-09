import { DurableObject } from "cloudflare:workers";
import { chunkText } from "./chunk";
import { type AnthropicConfig, AnthropicError, askClaude } from "./claude";
import {
  type Env,
  MSG_ATTACHMENT_EXPIRED,
  MSG_GENERIC_ERROR,
  MSG_NO_REGEN_RECORD,
  MSG_REGEN_SUPERSEDED,
  MSG_REGENERATED,
  MSG_REGENERATED_PARTIAL,
  maxTokens,
} from "./constants";
import { DiscordClient, DiscordError } from "./discord-api";
import {
  attachmentBlocks,
  buildHistoryFromMessage,
  newBudget,
  normalizeTurns,
  textBlock,
} from "./history";
import type { StateDO } from "./state-do";
import type {
  AnthropicMessage,
  ContentBlock,
  DiscordAttachment,
  DiscordMessage,
  Prefs,
} from "./types";

interface JobBase {
  token: string;
  userId: string;
}

export type Job =
  | (JobBase & {
      kind: "slash";
      ephemeral: boolean;
      prompt: string;
      attachment: DiscordAttachment | null;
    })
  | (JobBase & {
      kind: "continue";
      ephemeral: boolean;
      prompt: string;
      channelId: string | null;
      messageId: string;
    })
  | (JobBase & { kind: "regen"; messageId: string });

/** How long a stashed context-menu target survives an unfinished modal. */
const STASH_TTL_MS = 15 * 60 * 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * One instance per job (idFromName(interaction.token)), because a Durable Object has a
 * single alarm and concurrent requests would otherwise trample each other's.
 *
 * All the slow work lives in alarm(): the fetch handler has 10ms of CPU and
 * ctx.waitUntil() is cut off at 30 seconds, but an alarm gets 15 minutes of wall clock.
 */
export class JobDO extends DurableObject<Env> {
  /** Called from the interaction handler. Must return fast — it only queues. */
  async start(job: Job): Promise<void> {
    await this.ctx.storage.put("job", job);
    await this.ctx.storage.setAlarm(Date.now());
  }

  /**
   * Park the context-menu target so the modal submit — which carries only custom_id, no
   * resolved message — can still see it. The alarm doubles as the expiry sweeper.
   */
  async stashMessage(message: DiscordMessage): Promise<void> {
    await this.ctx.storage.put("stash", message);
    await this.ctx.storage.setAlarm(Date.now() + STASH_TTL_MS);
  }

  async alarm(): Promise<void> {
    const job = await this.ctx.storage.get<Job>("job");
    if (!job) {
      // Nothing queued: this is the stash-expiry sweep.
      await this.ctx.storage.deleteAll();
      return;
    }
    // Alarms are retried automatically on failure. Claim the job before doing anything
    // billable or visible, or a retry double-charges Anthropic and double-posts the answer.
    if (await this.ctx.storage.get<boolean>("done")) {
      // A retry of an alarm that already claimed this job. Never run it again — but the
      // first attempt may have been killed outright (a dropped connection mid-request skips
      // the catch below), so finish what it could not: tell the user if it never managed to
      // say anything, and drop the storage it would otherwise keep — including the "done"
      // flag, which would silently swallow every later job on this object.
      if (!(await this.ctx.storage.get<boolean>("answered"))) {
        await this.reportError(job.token, new Error("alarm was interrupted before it answered"));
      }
      await this.ctx.storage.deleteAll();
      return;
    }
    await this.ctx.storage.put("done", true);

    try {
      if (job.kind === "regen") {
        await this.runRegen(job);
      } else {
        await this.runAsk(job);
      }
    } catch (err) {
      console.error("job failed", job.kind, err);
      await this.reportError(job.token, err);
    } finally {
      await this.ctx.storage.deleteAll();
    }
  }

  /**
   * Record that the user has seen something. A retried alarm reads this to decide whether it
   * still owes them an answer, or whether speaking again would overwrite one.
   */
  private markAnswered(): Promise<void> {
    return this.ctx.storage.put("answered", true);
  }

  private discord(): DiscordClient {
    return new DiscordClient(this.env);
  }

  private anthropic(): AnthropicConfig {
    return {
      apiKey: this.env.ANTHROPIC_API_KEY,
      baseUrl: this.env.ANTHROPIC_API_BASE || "https://api.anthropic.com",
      maxTokens: maxTokens(this.env),
    };
  }

  private state(): DurableObjectStub<StateDO> {
    return this.env.STATE_DO.get(this.env.STATE_DO.idFromName("global"));
  }

  private async prefs(userId: string): Promise<Prefs> {
    return await this.state().getPrefs(userId);
  }

  private async runAsk(job: Extract<Job, { kind: "slash" | "continue" }>): Promise<void> {
    const discord = this.discord();
    let messages: AnthropicMessage[];

    if (job.kind === "slash") {
      const content: ContentBlock[] = job.attachment
        ? attachmentBlocks([job.attachment], newBudget())
        : [];
      content.push(textBlock(job.prompt));
      messages = [{ role: "user", content }];
    } else {
      const target = await this.resolveTarget(job, discord);
      const history = await buildHistoryFromMessage(target, discord);
      messages = normalizeTurns([...history, { role: "user", content: [textBlock(job.prompt)] }]);
    }

    const prefs = await this.prefs(job.userId);
    const answer = await askClaude(messages, prefs, this.anthropic());
    const header = `**Q:** ${job.prompt}\n\n**A:**\n`;
    const chunkIds = await this.deliver(discord, job.token, job.ephemeral, header + answer);
    await this.state().saveRegenRecord({
      chunkIds,
      messagesJson: JSON.stringify(messages),
      userId: job.userId,
      header,
      ephemeral: job.ephemeral,
      token: job.token,
    });
  }

  /** The stashed message if the modal was answered in time, otherwise a fresh read. */
  private async resolveTarget(
    job: Extract<Job, { kind: "continue" }>,
    discord: DiscordClient,
  ): Promise<DiscordMessage> {
    const stashed = await this.ctx.storage.get<DiscordMessage>("stash");
    if (stashed) return stashed;
    if (!job.channelId) throw new Error("continue job lost its target message");
    return await discord.fetchMessage(job.channelId, job.messageId);
  }

  private async runRegen(job: Extract<Job, { kind: "regen" }>): Promise<void> {
    const discord = this.discord();
    const state = this.state();
    const record = await state.getRegenRecord(job.messageId);
    if (!record) {
      await discord.patchOriginal(job.token, MSG_NO_REGEN_RECORD);
      await this.markAnswered();
      return;
    }
    const recordMessages = JSON.parse(record.messagesJson) as AnthropicMessage[];

    // Regenerate under the clicking user's own model/effort prefs, not whoever originally
    // asked — that way switching model in /settings then hitting regenerate actually does
    // something. The prompt/history itself stays exactly as originally sent.
    const prefs = await this.prefs(job.userId);
    let answer: string;
    try {
      answer = await askClaude(recordMessages, prefs, this.anthropic());
    } catch (err) {
      // Discord's CDN URLs are signed and expire, so a replay of an old attachment-bearing
      // request can be rejected where the original went through (§6.1).
      if (err instanceof AnthropicError && err.status === 400 && hasUrlSource(recordMessages)) {
        await discord.patchOriginal(job.token, MSG_ATTACHMENT_EXPIRED);
        await this.markAnswered();
        return;
      }
      throw err;
    }

    const chunks = chunkText(record.header + answer);
    let editFailed = false;
    for (let i = 0; i < record.chunkIds.length; i++) {
      const content = i < chunks.length ? chunks[i] : MSG_REGEN_SUPERSEDED;
      try {
        await discord.editMessage(record.token, record.chunkIds[i], content);
      } catch (err) {
        editFailed = true;
        console.log(`regenerate: failed to edit chunk ${record.chunkIds[i]}: ${err}`);
      }
    }

    const newIds = record.chunkIds.slice(0, chunks.length);
    for (const extra of chunks.slice(record.chunkIds.length)) {
      try {
        const msg = await discord.sendFollowup(record.token, extra, record.ephemeral);
        newIds.push(msg.id);
      } catch (err) {
        // Same 15-minute token expiry that kills the edits above.
        editFailed = true;
        console.log(`regenerate: failed to append chunk: ${err}`);
      }
    }

    await state.saveRegenRecord({
      chunkIds: newIds,
      messagesJson: record.messagesJson,
      userId: job.userId,
      header: record.header,
      ephemeral: record.ephemeral,
      token: record.token,
    });

    await discord.patchOriginal(job.token, editFailed ? MSG_REGENERATED_PARTIAL : MSG_REGENERATED);
    await this.markAnswered();
  }

  /** Replace the defer placeholder with chunk 1, then append the rest. Returns message ids. */
  private async deliver(
    discord: DiscordClient,
    token: string,
    ephemeral: boolean,
    text: string,
  ): Promise<string[]> {
    const chunks = chunkText(text);
    const first = await this.patchOriginalWhenReady(discord, token, chunks[0]);
    await this.markAnswered();
    const ids = [first.id];
    for (const chunk of chunks.slice(1)) {
      const msg = await discord.sendFollowup(token, chunk, ephemeral);
      ids.push(msg.id);
    }
    return ids;
  }

  /**
   * The alarm can, in principle, out-race Discord recording our deferred response, which
   * shows up as an unknown-token rejection on the very first edit. Give it a couple of
   * chances before failing.
   */
  private async patchOriginalWhenReady(
    discord: DiscordClient,
    token: string,
    content: string,
  ): Promise<DiscordMessage> {
    for (let attempt = 0; ; attempt++) {
      try {
        return await discord.patchOriginal(token, content);
      } catch (err) {
        const unknownToken =
          err instanceof DiscordError && (err.status === 404 || err.status === 401);
        if (attempt >= 2 || !unknownToken) throw err;
        await sleep(1000);
      }
    }
  }

  private async reportError(token: string, err: unknown): Promise<void> {
    try {
      await this.discord().patchOriginal(token, MSG_GENERIC_ERROR);
      await this.markAnswered();
    } catch (nested) {
      console.error("could not report the failure to Discord", nested, "original:", err);
    }
  }
}

function hasUrlSource(messages: AnthropicMessage[]): boolean {
  return messages.some((m) => m.content.some((b) => b?.source?.type === "url"));
}
