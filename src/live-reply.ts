import { chunkText } from "./chunk";
import { MSG_REGEN_SUPERSEDED } from "./constants";
import { type DiscordClient, DiscordError } from "./discord-api";

export const CID_ANSWER_REGEN = "ans:regen";
export const CID_ANSWER_CONTINUE = "ans:cont";

export function answerButtons(): unknown[] {
  return [
    {
      type: 1,
      components: [
        {
          type: 2,
          style: 2,
          label: "再生成",
          emoji: { name: "🔄" },
          custom_id: CID_ANSWER_REGEN,
        },
        {
          type: 2,
          style: 2,
          label: "続けて質問",
          emoji: { name: "💬" },
          custom_id: CID_ANSWER_CONTINUE,
        },
      ],
    },
  ];
}

// Discord rate-limits edits per interaction token; one edit a second and a half stays clear of it
// while still reading as a growing answer.
const TEXT_INTERVAL_MS = 1500;
// The status line only changes its elapsed seconds, which is not worth an edit every tick.
const STATUS_INTERVAL_MS = 3000;
const CURSOR = " ▌";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface Delivered {
  ids: string[];
  /** Some chunk could not be written (e.g. the 15-minute interaction token expired). */
  failed: boolean;
  lastId: string;
  lastContent: string;
}

/**
 * One answer shown as it is produced: a status line while waiting, then the text growing in
 * place, spilling into follow-up messages past Discord's length limit. Intermediate edits are
 * best-effort; only `finish` must land.
 */
export class LiveReply {
  private readonly ids: string[];
  private readonly sent: (string | undefined)[] = [];
  /** Which message carries the answer buttons, so moving them clears the old ones. */
  private buttonsAt: number | null;
  private status = "";
  private body = "";
  private lastFlush = 0;
  private notBefore = 0;
  private lastRendered = "";
  private inflight: Promise<void> | null = null;
  private ticker: ReturnType<typeof setInterval> | null = null;
  private readonly started = Date.now();

  /**
   * `ids`: messages to overwrite (a regenerate); empty means the deferred placeholder and new
   * follow-ups. `tolerant`: report chunk failures through `failed` instead of throwing.
   */
  constructor(
    private readonly discord: DiscordClient,
    private readonly token: string,
    private readonly ephemeral: boolean,
    private readonly header: string,
    ids: string[] = [],
    private readonly tolerant = false,
  ) {
    this.ids = [...ids];
    this.buttonsAt = ids.length ? ids.length - 1 : null;
  }

  /** Whether any answer text has been received (it may already be on screen). */
  get hasText(): boolean {
    return Boolean(this.body);
  }

  get text(): string {
    return this.body;
  }

  async setStatus(text: string): Promise<void> {
    this.status = text;
    this.ticker ??= setInterval(() => void this.maybeFlush(), TEXT_INTERVAL_MS);
    await this.maybeFlush();
  }

  async setText(partial: string): Promise<void> {
    this.body = partial;
    await this.maybeFlush();
  }

  /** Stop live updates without writing anything more. */
  async stop(): Promise<void> {
    if (this.ticker) clearInterval(this.ticker);
    this.ticker = null;
    await this.inflight;
  }

  async finish(body: string, components: unknown[]): Promise<Delivered> {
    await this.stop();
    const chunks = chunkText(this.header + body);
    let failed = false;
    const last = chunks.length - 1;
    for (let i = 0; i < chunks.length; i++) {
      const buttons = i === last ? components : [];
      const moved = (i === last) !== (this.buttonsAt === i);
      if (this.sent[i] === chunks[i] && !moved) continue;
      try {
        await this.withRetry(() => this.write(i, chunks[i], buttons));
      } catch (err) {
        if (!this.tolerant) throw err;
        failed = true;
        console.log(`live reply: failed to write chunk ${i}: ${err}`);
      }
    }
    this.buttonsAt = last;
    for (let i = chunks.length; i < this.ids.length; i++) {
      try {
        await this.withRetry(() =>
          this.discord.editMessage(this.token, this.ids[i], MSG_REGEN_SUPERSEDED, []),
        );
      } catch (err) {
        if (!this.tolerant) throw err;
        failed = true;
        console.log(`live reply: failed to retire chunk ${this.ids[i]}: ${err}`);
      }
    }
    const ids = this.ids.slice(0, chunks.length);
    return { ids, failed, lastId: ids[ids.length - 1], lastContent: chunks[last] };
  }

  private live(): string | null {
    if (this.body) return this.header + this.body;
    if (!this.status) return null;
    const seconds = Math.floor((Date.now() - this.started) / 1000);
    return `${this.header}-# ${this.status}… ${seconds}秒`;
  }

  private async maybeFlush(): Promise<void> {
    if (this.inflight) return;
    const now = Date.now();
    const interval = this.body ? TEXT_INTERVAL_MS : STATUS_INTERVAL_MS;
    if (now < this.notBefore || now - this.lastFlush < interval) return;
    const content = this.live();
    if (content === null || content === this.lastRendered) return;
    this.lastFlush = now;
    this.lastRendered = content;
    this.inflight = this.flushLive(content, Boolean(this.body)).finally(() => {
      this.inflight = null;
    });
    await this.inflight;
  }

  private async flushLive(content: string, growing: boolean): Promise<void> {
    try {
      const chunks = chunkText(content);
      // Appended after chunking so the cursor never lands alone in a new message.
      if (growing) chunks[chunks.length - 1] += CURSOR;
      for (let i = 0; i < chunks.length; i++) {
        if (this.sent[i] !== chunks[i]) await this.write(i, chunks[i]);
      }
    } catch (err) {
      const wait = err instanceof DiscordError ? err.retryAfterMs : null;
      if (wait !== null) this.notBefore = Date.now() + wait;
      // A skipped frame is harmless: the next one or `finish` carries the latest text.
      else console.log(`live reply: update skipped: ${err}`);
    }
  }

  private async write(i: number, content: string, components?: unknown[]): Promise<void> {
    if (i < this.ids.length) {
      await this.discord.editMessage(this.token, this.ids[i], content, components);
    } else if (i === 0) {
      const message = await this.patchOriginalWhenReady(content, components);
      this.ids.push(message.id);
    } else {
      const message = await this.discord.sendFollowup(
        this.token,
        content,
        this.ephemeral,
        components,
      );
      this.ids.push(message.id);
    }
    this.sent[i] = content;
  }

  private async withRetry<T>(fn: () => Promise<T>): Promise<T> {
    for (let attempt = 0; ; attempt++) {
      try {
        return await fn();
      } catch (err) {
        const wait = err instanceof DiscordError ? err.retryAfterMs : null;
        if (wait === null || attempt >= 3) throw err;
        await sleep(wait);
      }
    }
  }

  /**
   * The job can, in principle, out-race Discord recording our deferred response, which shows
   * up as an unknown-token rejection on the very first edit.
   */
  private async patchOriginalWhenReady(content: string, components?: unknown[]) {
    for (let attempt = 0; ; attempt++) {
      try {
        return await this.discord.patchOriginal(this.token, content, components);
      } catch (err) {
        const unknownToken =
          err instanceof DiscordError && (err.status === 404 || err.status === 401);
        if (attempt >= 2 || !unknownToken) throw err;
        await sleep(1000);
      }
    }
  }
}
