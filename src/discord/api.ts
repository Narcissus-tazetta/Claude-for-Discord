import { type Env, EPHEMERAL } from "../shared/constants";
import type { DiscordMessage } from "../shared/types";

const DEFAULT_API = "https://discord.com/api/v10";

export class DiscordError extends Error {
  constructor(
    readonly status: number,
    readonly body: string,
  ) {
    super(`Discord API ${status}: ${body.slice(0, 300)}`);
    this.name = "DiscordError";
  }

  /** For a 429: how long Discord asked us to wait. */
  get retryAfterMs(): number | null {
    if (this.status !== 429) return null;
    try {
      const seconds = Number(JSON.parse(this.body).retry_after);
      return Number.isFinite(seconds) && seconds >= 0 ? Math.ceil(seconds * 1000) : null;
    } catch {
      return null;
    }
  }
}

/**
 * The subset of Discord's REST API this bot needs, bound to one application.
 *
 * `DISCORD_API_BASE` exists so the delivery and regenerate paths can be exercised against a
 * stand-in server; unset, it is the real API.
 */
export class DiscordClient {
  private readonly base: string;
  readonly appId: string;
  private readonly botToken: string;

  constructor(env: Env) {
    this.base = env.DISCORD_API_BASE || DEFAULT_API;
    this.appId = env.DISCORD_APPLICATION_ID;
    this.botToken = env.DISCORD_BOT_TOKEN;
  }

  private async request(url: string, init: RequestInit): Promise<any> {
    const res = await fetch(url, init);
    if (!res.ok) throw new DiscordError(res.status, await res.text().catch(() => ""));
    if (res.status === 204) return null;
    return await res.json();
  }

  /**
   * Replace the "thinking…" placeholder left behind by a deferred response. Returns the
   * message object, so the caller gets an id for the regenerate cache.
   *
   * No `flags` here: ephemerality was fixed at defer time and an edit cannot change it.
   */
  patchOriginal(token: string, content: string, components?: unknown[]): Promise<DiscordMessage> {
    return this.request(`${this.base}/webhooks/${this.appId}/${token}/messages/@original`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        content,
        ...(components ? { components } : {}),
        allowed_mentions: NO_MENTIONS,
      }),
    });
  }

  /** Post an extra message on an interaction token. `wait=true` so the id comes back. */
  sendFollowup(
    token: string,
    content: string,
    ephemeral: boolean,
    components?: unknown[],
  ): Promise<DiscordMessage> {
    return this.request(`${this.base}/webhooks/${this.appId}/${token}?wait=true`, {
      method: "POST",
      headers: JSON_HEADERS,
      // followup messages do NOT inherit the ephemeral flag from the defer; every chunk has
      // to carry it or the tail of a long answer leaks into the channel.
      body: JSON.stringify({
        content,
        flags: ephemeral ? EPHEMERAL : 0,
        ...(components ? { components } : {}),
        allowed_mentions: NO_MENTIONS,
      }),
    });
  }

  /** Edit a message previously sent on this interaction token (original or followup). */
  editMessage(
    token: string,
    messageId: string,
    content: string,
    components?: unknown[],
  ): Promise<DiscordMessage> {
    return this.request(`${this.base}/webhooks/${this.appId}/${token}/messages/${messageId}`, {
      method: "PATCH",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        content,
        ...(components ? { components } : {}),
        allowed_mentions: NO_MENTIONS,
      }),
    });
  }

  /** Read back a message sent on this interaction token; works for ephemeral ones too. */
  getMessage(token: string, messageId: string): Promise<DiscordMessage> {
    return this.request(`${this.base}/webhooks/${this.appId}/${token}/messages/${messageId}`, {
      method: "GET",
    });
  }

  /**
   * Read a message so a reply chain can be walked. Needs the bot token — interaction
   * tokens only reach messages the interaction itself produced.
   */
  fetchMessage(channelId: string, messageId: string): Promise<DiscordMessage> {
    return this.request(`${this.base}/channels/${channelId}/messages/${messageId}`, {
      headers: { authorization: `Bot ${this.botToken}` },
    });
  }
}

const JSON_HEADERS = { "content-type": "application/json" };
const NO_MENTIONS = { parse: [] as string[] };
