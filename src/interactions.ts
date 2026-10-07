import {
  CMD_AI,
  CMD_CLAUDE,
  CMD_CONTINUE,
  CMD_CONTINUE_AI,
  CMD_REGENERATE,
  CMD_REGENERATE_AI,
  CMD_SETTINGS,
} from "./commands";
import {
  allowedUserIds,
  EFFORT_LEVELS,
  type Env,
  EPHEMERAL,
  MSG_ATTACHMENT_UNREADABLE,
  MSG_DENIED,
  MSG_NO_REGEN_RECORD,
  MSG_NOT_A_CLAUDE_MESSAGE,
  MSG_NOT_OWNER,
} from "./constants";
import { CURRENCIES, type Currency, usdJpyRate } from "./currency";
import { isSupportedAttachment } from "./history";
import type { Job } from "./job-do";
import { DISCOVERY_VERSION, type Registry } from "./model-registry";
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
  MAIN_VIEW,
  MODEL_FILTERS,
  type ModelFilter,
  modelBrowser,
  type SettingsView,
  settingsComponents,
  settingsSummary,
} from "./settings-ui";
import type { PrefKey, StateDO } from "./state-do";
import {
  CB_CHANNEL_MESSAGE,
  CB_DEFERRED_CHANNEL_MESSAGE,
  CB_MODAL,
  CB_UPDATE_MESSAGE,
  type DiscordAttachment,
  type Interaction,
  IT_APPLICATION_COMMAND,
  IT_MESSAGE_COMPONENT,
  IT_MODAL_SUBMIT,
  type Prefs,
} from "./types";

function json(payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json" },
  });
}

function message(content: string, ephemeral = true): Response {
  return json({
    type: CB_CHANNEL_MESSAGE,
    data: { content, flags: ephemeral ? EPHEMERAL : 0, allowed_mentions: { parse: [] } },
  });
}

function defer(ephemeral: boolean): Response {
  return json({
    type: CB_DEFERRED_CHANNEL_MESSAGE,
    data: { flags: ephemeral ? EPHEMERAL : 0 },
  });
}

/** Guild interactions carry the invoker under `member`, DMs under `user`. Both must be read. */
function invokerId(interaction: Interaction): string | null {
  return interaction.member?.user?.id ?? interaction.user?.id ?? null;
}

function stateStub(env: Env): DurableObjectStub<StateDO> {
  return env.STATE_DO.get(env.STATE_DO.idFromName("global"));
}

function queue(env: Env, key: string, job: Job): Promise<void> {
  return env.JOB_DO.get(env.JOB_DO.idFromName(key)).start(job);
}

function optionValues(interaction: Interaction): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const opt of interaction.data?.options ?? []) {
    if (opt.value !== undefined) out[opt.name] = opt.value;
  }
  return out;
}

async function settingsResponse(
  type: number,
  userId: string,
  prefs: Prefs,
  env: Env,
  view: SettingsView = MAIN_VIEW,
): Promise<Response> {
  const registry = JSON.parse(await stateStub(env).getRegistryJson()) as Registry;
  if (!registry.refreshedAt) await stateStub(env).scheduleMaintenance();
  const status = !env.AI_GATEWAY_API_KEY
    ? "\n\nAPIキー未設定です。設定後にモデル一覧を取得します。"
    : !registry.models.length
      ? "\n\nモデル一覧と品質評価を準備中です。しばらくして /settings を開き直してください。"
      : registry.discoveryVersion !== DISCOVERY_VERSION
        ? "\n\nモデル一覧を更新中です。しばらくして手動モデル一覧を開き直してください。"
        : "";
  const screen =
    view.panel === "models"
      ? modelBrowser(userId, prefs, registry, view, usdJpyRate(env.AI_USD_JPY_RATE))
      : {
          content: settingsSummary(prefs, registry, usdJpyRate(env.AI_USD_JPY_RATE)),
          components: settingsComponents(userId, prefs),
        };
  return json({
    type,
    data: {
      content: screen.content + status,
      components: screen.components,
      flags: EPHEMERAL,
      allowed_mentions: { parse: [] },
    },
  });
}

export async function handleInteraction(interaction: Interaction, env: Env): Promise<Response> {
  const userId = invokerId(interaction);
  if (!userId || !allowedUserIds(env).has(userId)) {
    return message(MSG_DENIED);
  }

  switch (interaction.type) {
    case IT_APPLICATION_COMMAND:
      return await handleCommand(interaction, env, userId);
    case IT_MESSAGE_COMPONENT:
      return await handleComponent(interaction, env, userId);
    case IT_MODAL_SUBMIT:
      return await handleModalSubmit(interaction, env, userId);
    default:
      return new Response("unsupported interaction type", { status: 400 });
  }
}

async function handleCommand(
  interaction: Interaction,
  env: Env,
  userId: string,
): Promise<Response> {
  switch (interaction.data?.name) {
    case CMD_CLAUDE:
    case CMD_AI:
      return await handleClaude(interaction, env, userId);
    case CMD_SETTINGS: {
      const prefs = await stateStub(env).getPrefs(userId);
      return await settingsResponse(CB_CHANNEL_MESSAGE, userId, prefs, env);
    }
    case CMD_CONTINUE:
    case CMD_CONTINUE_AI:
      return await handleContinueMenu(interaction, env);
    case CMD_REGENERATE:
    case CMD_REGENERATE_AI:
      return await handleRegenerateMenu(interaction, env, userId);
    default:
      return new Response("unknown command", { status: 400 });
  }
}

async function handleClaude(interaction: Interaction, env: Env, userId: string): Promise<Response> {
  const opts = optionValues(interaction);
  const prompt = String(opts.prompt ?? "");
  const isPublic = opts.public === true;

  let attachment: DiscordAttachment | null = null;
  if (typeof opts.attachment === "string") {
    attachment = interaction.data?.resolved?.attachments?.[opts.attachment] ?? null;
    if (!attachment || !isSupportedAttachment(attachment)) {
      // Cheap to check here: size and content_type ride along in the interaction payload,
      // so nothing has to be downloaded to reject an unusable file.
      const prefs = await stateStub(env).getPrefs(userId);
      return message(MSG_ATTACHMENT_UNREADABLE, isPublic ? false : prefs.ephemeral);
    }
  }

  const prefs = await stateStub(env).getPrefs(userId);
  const ephemeral = isPublic ? false : prefs.ephemeral;
  await queue(env, interaction.token, {
    kind: "slash",
    token: interaction.token,
    userId,
    ephemeral,
    prompt,
    attachment,
  });
  return defer(ephemeral);
}

async function handleContinueMenu(interaction: Interaction, env: Env): Promise<Response> {
  const targetId = interaction.data?.target_id;
  const target = targetId ? interaction.data?.resolved?.messages?.[targetId] : undefined;
  if (!target) return new Response("missing target message", { status: 400 });

  // A modal submit arrives with nothing but its custom_id, so park the resolved message in
  // the job's own Durable Object now and pick it up again on submit.
  await env.JOB_DO.get(env.JOB_DO.idFromName(stashKey(interaction.id))).stashMessage(target);

  return json({
    type: CB_MODAL,
    data: {
      custom_id: `c:${interaction.id}:${target.id}`,
      title: CMD_CONTINUE,
      components: [
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: "prompt",
              label: "質問内容",
              style: 2,
              max_length: 1500,
              required: true,
            },
          ],
        },
      ],
    },
  });
}

async function handleRegenerateMenu(
  interaction: Interaction,
  env: Env,
  userId: string,
): Promise<Response> {
  const targetId = interaction.data?.target_id;
  const target = targetId ? interaction.data?.resolved?.messages?.[targetId] : undefined;
  if (!target) return new Response("missing target message", { status: 400 });

  if (target.author?.id !== env.DISCORD_APPLICATION_ID) {
    return message(MSG_NOT_A_CLAUDE_MESSAGE);
  }
  const record = await stateStub(env).getRegenRecord(target.id);
  if (!record) return message(MSG_NO_REGEN_RECORD);

  await queue(env, interaction.token, {
    kind: "regen",
    token: interaction.token,
    userId,
    messageId: target.id,
  });
  return defer(true);
}

async function handleModalSubmit(
  interaction: Interaction,
  env: Env,
  userId: string,
): Promise<Response> {
  const customId = interaction.data?.custom_id ?? "";
  if (!customId.startsWith("c:")) return new Response("unknown modal", { status: 400 });
  const [, originId, messageId] = customId.split(":");

  let prompt = "";
  for (const row of interaction.data?.components ?? []) {
    for (const component of row.components ?? []) {
      if (component.custom_id === "prompt") prompt = component.value ?? "";
    }
  }

  const prefs = await stateStub(env).getPrefs(userId);
  // Reuse the DO that holds the stashed target: its alarm becomes the job's alarm.
  await queue(env, stashKey(originId), {
    kind: "continue",
    token: interaction.token,
    userId,
    ephemeral: prefs.ephemeral,
    prompt,
    channelId: interaction.channel_id ?? null,
    messageId,
  });
  return defer(prefs.ephemeral);
}

function stashKey(interactionId: string): string {
  return `modal:${interactionId}`;
}

type Toggleable = Extract<PrefKey, "ephemeral" | "thinking" | "web_fetch" | "web_search">;
const TOGGLEABLE: Toggleable[] = ["ephemeral", "thinking", "web_fetch", "web_search"];

async function handleComponent(
  interaction: Interaction,
  env: Env,
  userId: string,
): Promise<Response> {
  const customId = interaction.data?.custom_id ?? "";
  const state = stateStub(env);
  let prefs: Prefs;

  if (customId.startsWith(CID_MODEL)) {
    if (customId.slice(CID_MODEL.length) !== userId) return message(MSG_NOT_OWNER);
    const model = interaction.data?.values?.[0] ?? "";
    const registry = JSON.parse(await state.getRegistryJson()) as Registry;
    if (model !== "auto" && !registry.models.some((entry) => entry.id === model)) {
      return message("モデル一覧が更新されています。/settings を開き直してください。");
    }
    prefs = await state.setPref(userId, "model", model);
  } else if (customId.startsWith(CID_MODE)) {
    if (customId.slice(CID_MODE.length) !== userId) return message(MSG_NOT_OWNER);
    const mode = interaction.data?.values?.[0];
    if (mode === "manual")
      return await settingsResponse(CB_UPDATE_MESSAGE, userId, await state.getPrefs(userId), env, {
        panel: "models",
        filter: "all",
      });
    if (mode !== "auto") return message("無効なモデル選択です。");
    prefs = await state.setPref(userId, "model", "auto");
  } else if (customId.startsWith(CID_QUALITY)) {
    if (customId.slice(CID_QUALITY.length) !== userId) return message(MSG_NOT_OWNER);
    const quality = interaction.data?.values?.[0] ?? "";
    if (quality !== "off" && !EFFORT_LEVELS.includes(quality)) return message("無効な考え方です。");
    prefs = await state.setAnswerQuality(userId, quality);
  } else if (customId.startsWith(CID_VISIBILITY)) {
    if (customId.slice(CID_VISIBILITY.length) !== userId) return message(MSG_NOT_OWNER);
    const visibility = interaction.data?.values?.[0];
    if (visibility !== "private" && visibility !== "public") return message("無効な公開範囲です。");
    prefs = await state.setPref(userId, "ephemeral", visibility === "private");
  } else if (customId.startsWith(CID_VIEW)) {
    const [panel, owner] = customId.slice(CID_VIEW.length).split(":");
    if (owner !== userId) return message(MSG_NOT_OWNER);
    if (panel !== "main" && panel !== "models") return message("無効な設定画面です。");
    return await settingsResponse(CB_UPDATE_MESSAGE, userId, await state.getPrefs(userId), env, {
      panel,
      filter: "all",
    });
  } else if (customId.startsWith(CID_REFRESH)) {
    const [panel, owner, rawFilter, rawPage] = customId.slice(CID_REFRESH.length).split(":");
    if (owner !== userId) return message(MSG_NOT_OWNER);
    const page = Number(rawPage);
    if (
      (panel !== "main" && panel !== "models") ||
      !MODEL_FILTERS.includes(rawFilter as ModelFilter) ||
      !Number.isInteger(page) ||
      page < 0
    )
      return message("無効な設定画面です。");
    try {
      await state.refreshCatalog();
    } catch {
      return message("モデル一覧を更新できませんでした。時間をおいて再試行してください。");
    }
    return await settingsResponse(CB_UPDATE_MESSAGE, userId, await state.getPrefs(userId), env, {
      panel,
      filter: rawFilter as ModelFilter,
      page,
    });
  } else if (customId.startsWith(CID_FILTER)) {
    if (customId.slice(CID_FILTER.length) !== userId) return message(MSG_NOT_OWNER);
    const filter = interaction.data?.values?.[0] as ModelFilter;
    if (!MODEL_FILTERS.includes(filter)) return message("無効な会社です。");
    return await settingsResponse(CB_UPDATE_MESSAGE, userId, await state.getPrefs(userId), env, {
      panel: "models",
      filter,
      page: 0,
    });
  } else if (customId.startsWith(CID_EFFORT)) {
    if (customId.slice(CID_EFFORT.length) !== userId) return message(MSG_NOT_OWNER);
    const effort = interaction.data?.values?.[0] ?? "";
    if (!EFFORT_LEVELS.includes(effort)) return message("無効なエフォートです。");
    prefs = await state.setPref(userId, "effort", effort);
  } else if (customId.startsWith(CID_PAGE)) {
    const [page, owner, rawFilter = "all"] = customId.slice(CID_PAGE.length).split(":");
    if (owner !== userId) return message(MSG_NOT_OWNER);
    const n = Number(page);
    if (!Number.isInteger(n) || n < 0) return message("無効なページです。");
    if (!MODEL_FILTERS.includes(rawFilter as ModelFilter)) return message("無効な会社です。");
    return await settingsResponse(CB_UPDATE_MESSAGE, userId, await state.getPrefs(userId), env, {
      panel: "models",
      filter: rawFilter as ModelFilter,
      page: n,
    });
  } else if (customId.startsWith(CID_CURRENCY)) {
    const [currency, owner] = customId.slice(CID_CURRENCY.length).split(":");
    if (owner !== userId) return message(MSG_NOT_OWNER);
    if (!CURRENCIES.includes(currency as Currency)) return message("無効な通貨です。");
    prefs = await state.setPref(userId, "currency", currency);
  } else if (customId.startsWith(CID_TOGGLE)) {
    const [, key, owner] = customId.split(":");
    if (owner !== userId) return message(MSG_NOT_OWNER);
    if (!TOGGLEABLE.includes(key as Toggleable)) {
      return new Response("unknown component", { status: 400 });
    }
    prefs = await state.togglePref(userId, key as Toggleable);
  } else {
    return new Response("unknown component", { status: 400 });
  }

  return await settingsResponse(CB_UPDATE_MESSAGE, userId, prefs, env);
}
