import { CMD_SETTINGS } from "./commands";
import { allowedUserIds, type Env, EPHEMERAL, MSG_DENIED, MSG_GENERIC_ERROR } from "./constants";
import { DiscordClient } from "./discord-api";
import {
  CID_CURRENCY,
  CID_EFFORT,
  CID_FILTER,
  CID_MODE,
  CID_MODEL,
  CID_PAGE,
  CID_QUALITY,
  CID_REFRESH,
  CID_TOGGLE,
  CID_VIEW,
  CID_VISIBILITY,
} from "./settings-ui";
import {
  CB_CHANNEL_MESSAGE,
  CB_DEFERRED_CHANNEL_MESSAGE,
  CB_DEFERRED_UPDATE_MESSAGE,
  type Interaction,
  IT_APPLICATION_COMMAND,
  IT_MESSAGE_COMPONENT,
} from "./types";

export function isSettingsInteraction(interaction: Interaction): boolean {
  return (
    (interaction.type === IT_APPLICATION_COMMAND && interaction.data?.name === CMD_SETTINGS) ||
    (interaction.type === IT_MESSAGE_COMPONENT &&
      [
        CID_CURRENCY,
        CID_EFFORT,
        CID_FILTER,
        CID_MODE,
        CID_MODEL,
        CID_PAGE,
        CID_QUALITY,
        CID_REFRESH,
        CID_TOGGLE,
        CID_VIEW,
        CID_VISIBILITY,
      ].some((prefix) => interaction.data?.custom_id?.startsWith(prefix)))
  );
}

/** ACK before any Durable Object RPC. Cold starts/maintenance must not consume Discord's 3s window. */
export function deferSettings(interaction: Interaction, env: Env, ctx: ExecutionContext): Response {
  const userId = interaction.member?.user?.id ?? interaction.user?.id;
  if (!userId || !allowedUserIds(env).has(userId)) {
    return Response.json({
      type: CB_CHANNEL_MESSAGE,
      data: { content: MSG_DENIED, flags: EPHEMERAL, allowed_mentions: { parse: [] } },
    });
  }
  ctx.waitUntil(
    (async () => {
      try {
        await env.JOB_DO.get(env.JOB_DO.idFromName(interaction.token)).start({
          kind: "settings",
          token: interaction.token,
          userId,
          interactionJson: JSON.stringify(interaction),
        });
      } catch {
        console.error("settings enqueue failed");
        const discord = new DiscordClient(env);
        try {
          if (interaction.type === IT_MESSAGE_COMPONENT)
            await discord.sendFollowup(interaction.token, MSG_GENERIC_ERROR, true);
          else await discord.patchOriginal(interaction.token, MSG_GENERIC_ERROR);
        } catch {
          console.error("settings enqueue error delivery failed");
        }
      }
    })(),
  );
  return Response.json(
    interaction.type === IT_MESSAGE_COMPONENT
      ? { type: CB_DEFERRED_UPDATE_MESSAGE }
      : { type: CB_DEFERRED_CHANNEL_MESSAGE, data: { flags: EPHEMERAL } },
  );
}
