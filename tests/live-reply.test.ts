import { describe, expect, spyOn, test } from "bun:test";
import { DiscordClient } from "../src/discord/api";
import { LiveReply } from "../src/discord/live-reply";
import type { Env } from "../src/shared/constants";

const env = {
  DISCORD_APPLICATION_ID: "app",
  DISCORD_API_BASE: "https://discord.mock/v10",
  DISCORD_BOT_TOKEN: "bot",
} as Env;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Answers every webhook call, reporting the given bucket state in the rate-limit headers. */
function discordWith(remaining: number, resetAfter: number) {
  const writes: string[] = [];
  spyOn(globalThis, "fetch").mockImplementation((async (_url: string, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body));
    writes.push(body.content);
    return new Response(JSON.stringify({ id: "1", content: body.content }), {
      headers: {
        "x-ratelimit-limit": "5",
        "x-ratelimit-remaining": String(remaining),
        "x-ratelimit-reset-after": String(resetAfter),
        "x-ratelimit-bucket": "b",
      },
    });
  }) as any);
  return writes;
}

describe("live reply pacing", () => {
  test("reads Discord's bucket from the response headers", async () => {
    discordWith(3, 1.5);
    const discord = new DiscordClient(env);
    await discord.patchOriginal("tok", "x");
    expect(discord.rateLimit("tok")).toEqual({
      limit: 5,
      remaining: 3,
      resetAfterMs: 1500,
      bucket: "b",
    });
    expect(discord.rateLimit("other")).toBeUndefined();
  });

  test("edits as often as the bucket allows, but holds back when it is nearly spent", async () => {
    const plenty = discordWith(40, 1);
    const fast = new LiveReply(new DiscordClient(env), "tok", false, "");
    await fast.setText("a");
    await sleep(350);
    await fast.setText("ab");
    await fast.stop();
    // 1s over 39 usable requests leaves about 26ms between frames.
    expect(plenty).toEqual(["a ▌", "ab ▌"]);

    const scarce = discordWith(1, 2);
    const slow = new LiveReply(new DiscordClient(env), "tok", false, "");
    await slow.setText("a");
    await sleep(350);
    await slow.setText("ab");
    await slow.stop();
    // The last request is kept for the final edit, so nothing more until the bucket resets.
    expect(scarce).toEqual(["a ▌"]);
  });
});
