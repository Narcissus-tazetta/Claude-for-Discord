import { DurableObject } from "cloudflare:workers";
import {
  type Answer,
  type AnswerCost,
  answerFooter,
  askAI,
  ConfigurationError,
  confirmable,
  costLabel,
} from "../ai/answer";
import { BudgetError } from "../ai/budget";
import { GatewayClient, GatewayError } from "../ai/gateway";
import { DiscordClient } from "../discord/api";
import {
  attachmentBlocks,
  buildHistoryFromMessage,
  newBudget,
  normalizeTurns,
  textBlock,
} from "../discord/history";
import { handleInteraction } from "../discord/interactions";
import { answerButtons, type Delivered, LiveReply } from "../discord/live-reply";
import {
  type Env,
  MSG_ANSWER_INTERRUPTED,
  MSG_ATTACHMENT_EXPIRED,
  MSG_GENERIC_ERROR,
  MSG_NO_REGEN_RECORD,
  MSG_REGENERATED,
  MSG_REGENERATED_PARTIAL,
} from "../shared/constants";
import { type Currency, usdJpyRate } from "../shared/currency";
import type {
  AnthropicMessage,
  ContentBlock,
  DiscordAttachment,
  DiscordMessage,
  Interaction,
  Prefs,
} from "../shared/types";
import type { StateDO } from "./state-do";

interface JobBase {
  token: string;
  userId: string;
}

export type Job =
  | (JobBase & { kind: "settings"; interactionJson: string })
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
/** Gateway usually ingests billing within seconds; past this the estimate is shown instead. */
const COST_WAIT_MS = 5 * 60 * 1000;
/** Interaction tokens stop accepting edits after 15 minutes. */
const TOKEN_EDIT_MS = 14 * 60 * 1000;
const COST_POLL_MS = [2_000, 3_000, 5_000, 10_000];
const COST_POLL_MAX_MS = 15_000;

/** The cost line still owed to a delivered answer, appended once billing is confirmed. */
interface CostWatch {
  token: string;
  messageId: string;
  /** The last chunk as delivered; a different current content means it was regenerated. */
  content: string;
  cost: AnswerCost;
  currency: Currency;
  rate: number;
  resolved: Record<string, number | null>;
  deadline: number;
  attempt: number;
}

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
      const watch = await this.ctx.storage.get<CostWatch>("costWatch");
      if (watch) return await this.pollCost(watch);
      // Nothing queued: this is the stash-expiry sweep.
      await this.ctx.storage.deleteAll();
      return;
    }
    // Alarms are retried automatically on failure. Claim the job before doing anything
    // billable or visible, or a retry double-charges inference and double-posts the answer.
    if (await this.ctx.storage.get<boolean>("done")) {
      // A retry of an alarm that already claimed this job. Never run it again — but the
      // first attempt may have been killed outright (a dropped connection mid-request skips
      // the catch below), so finish what it could not: tell the user if it never managed to
      // say anything, and drop the storage it would otherwise keep — including the "done"
      // flag, which would silently swallow every later job on this object.
      if (!(await this.ctx.storage.get<boolean>("answered"))) {
        await this.reportError(
          job.token,
          new Error("alarm was interrupted before it answered"),
          job.kind === "settings",
        );
      }
      await this.ctx.storage.deleteAll();
      return;
    }
    await this.ctx.storage.put("done", true);
    const begun = Date.now();

    let watch: CostWatch | null = null;
    try {
      if (job.kind === "settings") {
        await this.runSettings(job);
      } else if (job.kind === "regen") {
        watch = await this.runRegen(job);
      } else {
        watch = await this.runAsk(job, begun);
      }
    } catch (err) {
      console.error("job failed", job.kind, err);
      await this.reportError(job.token, err, job.kind === "settings");
    } finally {
      await this.ctx.storage.deleteAll();
    }
    if (watch) {
      await this.ctx.storage.put("costWatch", watch);
      await this.ctx.storage.setAlarm(Date.now() + COST_POLL_MS[0]);
    }
  }

  private costWatch(
    delivered: Delivered,
    token: string,
    answer: Answer,
    prefs: Prefs,
    deadline: number,
  ): CostWatch | null {
    if (!confirmable(answer.cost)) return null;
    return {
      token,
      messageId: delivered.lastId,
      content: delivered.lastContent,
      cost: answer.cost,
      currency: prefs.currency,
      rate: usdJpyRate(this.env.AI_USD_JPY_RATE),
      resolved: {},
      deadline,
      attempt: 0,
    };
  }

  private async pollCost(watch: CostWatch): Promise<void> {
    const gateway = new GatewayClient(this.env);
    for (const id of watch.cost.generationIds) {
      if (id in watch.resolved) continue;
      try {
        const result = await gateway.generationCost(id);
        if (result.found) watch.resolved[id] = result.cost;
      } catch (err) {
        console.log(`cost watch: lookup failed: ${err}`);
      }
    }
    const costs = watch.cost.generationIds.map((id) => watch.resolved[id]);
    const complete = costs.every((cost) => cost !== undefined);
    if (!complete && Date.now() < watch.deadline) {
      watch.attempt += 1;
      await this.ctx.storage.put("costWatch", watch);
      await this.ctx.storage.setAlarm(
        Date.now() + (COST_POLL_MS[watch.attempt] ?? COST_POLL_MAX_MS),
      );
      return;
    }
    // A BYOK record has no total, so it cannot confirm the sum either.
    const confirmed = complete && costs.every((cost) => typeof cost === "number");
    const total = confirmed ? costs.reduce<number>((sum, cost) => sum + (cost ?? 0), 0) : undefined;
    console.log(JSON.stringify({ event: "cost_watch", confirmed, attempts: watch.attempt, total }));
    const label = costLabel(watch.cost, watch.currency, watch.rate, total);
    const discord = this.discord();
    try {
      const current = await discord.getMessage(watch.token, watch.messageId);
      if (current.content.trim() !== watch.content.trim()) {
        console.log("cost watch: answer was replaced; leaving it alone");
      } else {
        await discord.editMessage(
          watch.token,
          watch.messageId,
          `${watch.content}｜${label}`,
          answerButtons(),
        );
      }
    } catch (err) {
      // Usually the interaction token expired; the answer stays readable without a cost.
      console.log(`cost watch: could not edit the answer: ${err}`);
    }
    await this.ctx.storage.deleteAll();
  }

  /**
   * Record that the user has seen something. A retried alarm reads this to decide whether it
   * still owes them an answer, or whether speaking again would overwrite one.
   */
  private markAnswered(): Promise<void> {
    return this.ctx.storage.put("answered", true);
  }

  private async runSettings(job: Extract<Job, { kind: "settings" }>): Promise<void> {
    const interaction = JSON.parse(job.interactionJson) as Interaction;
    const response = await handleInteraction(interaction, this.env);
    if (!response.ok) throw new Error(`settings response HTTP ${response.status}`);
    const payload = (await response.json()) as {
      type: number;
      data: { content: string; components?: unknown[] };
    };
    if (interaction.type === 3 && payload.type === 4) {
      // Owner/validation errors are private replies, not edits to somebody else's panel.
      await this.discord().sendFollowup(job.token, payload.data.content, true);
    } else {
      await this.discord().patchOriginal(job.token, payload.data.content, payload.data.components);
    }
    await this.markAnswered();
  }

  private discord(): DiscordClient {
    return new DiscordClient(this.env);
  }

  private state(): DurableObjectStub<StateDO> {
    return this.env.STATE_DO.get(this.env.STATE_DO.idFromName("global"));
  }

  private async prefs(userId: string): Promise<Prefs> {
    return await this.state().getPrefs(userId);
  }

  private async runAsk(
    job: Extract<Job, { kind: "slash" | "continue" }>,
    begun: number,
  ): Promise<CostWatch | null> {
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
    const header = `**Q:** ${job.prompt}\n\n**A:**\n`;
    const live = new LiveReply(discord, job.token, job.ephemeral, header);
    let answer: Answer;
    try {
      answer = await askAI(messages, prefs, this.env, this.state(), {
        status: (text) => live.setStatus(text),
        text: (partial) => live.setText(partial),
      });
    } catch (err) {
      await live.stop();
      if (!live.hasText) throw err;
      // Keep what was already streamed rather than replacing it with a bare error.
      console.error("answer failed mid-stream", err);
      await live.finish(`${live.text}\n\n${MSG_ANSWER_INTERRUPTED}${errorMessage(err)}`, []);
      await this.markAnswered();
      return null;
    }
    const delivered = await live.finish(answer.text, answerButtons(), this.footer(answer, prefs));
    await this.markAnswered();
    await this.state().saveRegenRecord({
      chunkIds: delivered.ids,
      messagesJson: JSON.stringify(messages),
      userId: job.userId,
      header,
      ephemeral: job.ephemeral,
      token: job.token,
    });
    return this.costWatch(
      delivered,
      job.token,
      answer,
      prefs,
      Math.min(Date.now() + COST_WAIT_MS, begun + TOKEN_EDIT_MS),
    );
  }

  /** The cost is left off until billing confirms it, unless it never can be. */
  private footer(answer: Answer, prefs: Prefs): string {
    const cost = confirmable(answer.cost)
      ? undefined
      : costLabel(answer.cost, prefs.currency, usdJpyRate(this.env.AI_USD_JPY_RATE));
    return answerFooter(answer, cost);
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

  private async runRegen(job: Extract<Job, { kind: "regen" }>): Promise<CostWatch | null> {
    const discord = this.discord();
    const state = this.state();
    const record = await state.getRegenRecord(job.messageId);
    if (!record) {
      await discord.patchOriginal(job.token, MSG_NO_REGEN_RECORD);
      await this.markAnswered();
      return null;
    }
    const recordMessages = JSON.parse(record.messagesJson) as AnthropicMessage[];

    // Regenerate under the clicking user's own model/effort prefs, not whoever originally
    // asked — that way switching model in /settings then hitting regenerate actually does
    // something. The prompt/history itself stays exactly as originally sent.
    const prefs = await this.prefs(job.userId);
    // Waiting is shown on the private acknowledgement; the old answer stays intact until new
    // text arrives, so a failure before that loses nothing.
    const ack = new LiveReply(discord, job.token, true, "");
    const reply = new LiveReply(
      discord,
      record.token,
      record.ephemeral,
      record.header,
      record.chunkIds,
      true,
    );
    let answer: Answer;
    try {
      answer = await askAI(recordMessages, prefs, this.env, state, {
        status: (text) => ack.setStatus(text),
        text: (partial) => reply.setText(partial),
      });
    } catch (err) {
      await ack.stop();
      await reply.stop();
      if (reply.hasText) {
        console.error("regenerate failed mid-stream", err);
        await reply.finish(
          `${reply.text}\n\n${MSG_ANSWER_INTERRUPTED}${errorMessage(err)}`,
          answerButtons(),
        );
      }
      // Discord's CDN URLs are signed and expire, so a replay of an old attachment-bearing
      // request can be rejected where the original went through (§6.1).
      if (
        err instanceof GatewayError &&
        err.attachmentRejected &&
        err.status === 400 &&
        hasUrlSource(recordMessages)
      ) {
        await discord.patchOriginal(job.token, MSG_ATTACHMENT_EXPIRED);
        await this.markAnswered();
        return null;
      }
      throw err;
    }
    await ack.stop();

    const delivered = await reply.finish(answer.text, answerButtons(), this.footer(answer, prefs));
    await state.saveRegenRecord({
      chunkIds: delivered.ids,
      messagesJson: record.messagesJson,
      userId: job.userId,
      header: record.header,
      ephemeral: record.ephemeral,
      token: record.token,
    });

    await discord.patchOriginal(
      job.token,
      delivered.failed ? MSG_REGENERATED_PARTIAL : MSG_REGENERATED,
    );
    await this.markAnswered();
    // The original token's age is unknown here; an expired one just fails the later edit.
    return delivered.failed
      ? null
      : this.costWatch(delivered, record.token, answer, prefs, Date.now() + COST_WAIT_MS);
  }

  private async reportError(token: string, err: unknown, settings = false): Promise<void> {
    try {
      const message = errorMessage(err);
      if (settings) await this.discord().sendFollowup(token, message, true);
      else await this.discord().patchOriginal(token, message);
      await this.markAnswered();
    } catch (nested) {
      console.error("could not report the failure to Discord", nested, "original:", err);
    }
  }
}

function errorMessage(err: unknown): string {
  return err instanceof ConfigurationError || err instanceof BudgetError
    ? err.message
    : err instanceof GatewayError && err.status === 402
      ? "AI Gatewayの残高が不足しています。クレジットを確認してください。"
      : err instanceof GatewayError && err.status === 401
        ? "AI GatewayのAPIキーを確認してください。"
        : MSG_GENERIC_ERROR;
}

function hasUrlSource(messages: AnthropicMessage[]): boolean {
  return messages.some((m) => m.content.some((b) => b?.source?.type === "url"));
}
