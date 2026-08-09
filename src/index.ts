import type { Env } from "./constants";
import { handleInteraction } from "./interactions";
import { CB_PONG, type Interaction, IT_PING } from "./types";
import { verifyRequest } from "./verify";

export { JobDO } from "./job-do";
export { StateDO } from "./state-do";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "GET") return new Response("ok");
    if (request.method !== "POST") {
      return new Response("method not allowed", { status: 405 });
    }

    // Verify against the exact bytes Discord signed. Parsing and re-serializing the JSON
    // yields a different byte string and would never match.
    const raw = await request.text();
    if (!(await verifyRequest(request, raw, env.DISCORD_PUBLIC_KEY))) {
      // Discord probes a newly entered Interactions Endpoint URL with a deliberately bad
      // signature and refuses to save it unless this comes back 401.
      return new Response("invalid request signature", { status: 401 });
    }

    let interaction: Interaction;
    try {
      interaction = JSON.parse(raw) as Interaction;
    } catch {
      return new Response("malformed payload", { status: 400 });
    }

    if (interaction.type === IT_PING) {
      return new Response(JSON.stringify({ type: CB_PONG }), {
        headers: { "content-type": "application/json" },
      });
    }

    try {
      return await handleInteraction(interaction, env);
    } catch (err) {
      // Never leave Discord hanging on a 500: it shows the user "アプリケーションが応答しませんでした".
      console.error("interaction handling failed", err);
      return new Response(
        JSON.stringify({
          type: 4,
          data: { content: "エラーが発生しました。時間をおいて再試行してください。", flags: 64 },
        }),
        { headers: { "content-type": "application/json" } },
      );
    }
  },
} satisfies ExportedHandler<Env>;
