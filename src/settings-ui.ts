import { AVAILABLE_MODELS, EFFORT_LEVELS, MODELS_WITHOUT_THINKING_SUPPORT } from "./constants";
import type { Prefs } from "./types";

/** Byte-for-byte the same text bot.py rendered (bot.py:396-414). */
export function settingsSummary(prefs: Prefs): string {
  const modeStr = prefs.ephemeral ? "自分だけに表示 (Ephemeral)" : "全員に表示 (Public)";
  const unsupported = MODELS_WITHOUT_THINKING_SUPPORT.has(prefs.model);
  const thinkingStr = unsupported
    ? "— (このモデルは非対応)"
    : prefs.thinking
      ? "ON (adaptive)"
      : "OFF";
  const effortStr = unsupported ? "— (このモデルは非対応)" : prefs.effort;
  return (
    `**現在の設定**\n` +
    `・表示モード: \`${modeStr}\`\n` +
    `・モデル: \`${prefs.model}\`\n` +
    `・思考モード: \`${thinkingStr}\`\n` +
    `・エフォート: \`${effortStr}\`\n` +
    `・リンク読み込み: \`${prefs.web_fetch ? "ON" : "OFF"}\`\n` +
    `・web検索: \`${prefs.web_search ? "ON" : "OFF"}\``
  );
}

// custom_id carries both the operation and the owner's id, since HTTP interactions have no
// in-process View object to hang state off. Comfortably inside Discord's 100-char limit.
export const CID_MODEL = "set:model:";
export const CID_EFFORT = "set:effort:";
export const CID_TOGGLE = "tog:";

export function settingsComponents(userId: string): unknown[] {
  return [
    {
      type: 1,
      components: [
        {
          type: 3,
          custom_id: `${CID_MODEL}${userId}`,
          placeholder: "モデルを選択",
          min_values: 1,
          max_values: 1,
          options: AVAILABLE_MODELS.map(([label, value, description]) => ({
            label,
            value,
            description,
          })),
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 3,
          custom_id: `${CID_EFFORT}${userId}`,
          placeholder: "エフォート（思考ONの時のみ効果あり）",
          min_values: 1,
          max_values: 1,
          options: EFFORT_LEVELS.map((level) => ({ label: level, value: level })),
        },
      ],
    },
    {
      type: 1,
      components: [
        button("思考モード切替（ON/OFF）", `${CID_TOGGLE}thinking:${userId}`, 2),
        button("リンク読み込み切替（ON/OFF）", `${CID_TOGGLE}web_fetch:${userId}`, 2),
        button("web検索切替（ON/OFF）", `${CID_TOGGLE}web_search:${userId}`, 2),
      ],
    },
    {
      type: 1,
      components: [
        button("回答の表示モード切替（自分のみ / 全員）", `${CID_TOGGLE}ephemeral:${userId}`, 1),
      ],
    },
  ];
}

function button(label: string, customId: string, style: number) {
  return { type: 2, style, label, custom_id: customId };
}
