// The application command definitions, shared between the runtime router and the
// registration script so the two can never disagree about a name.

export const CMD_CLAUDE = "claude";
export const CMD_SETTINGS = "settings";
export const CMD_CONTINUE = "Claudeに続けて聞く";
export const CMD_REGENERATE = "Claudeの回答を再生成";

// allowed_installs(guilds=True, users=True) / allowed_contexts(guilds, dms, private_channels)
const INSTALL_ANYWHERE = {
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

export const COMMAND_DEFINITIONS = [
  {
    name: CMD_CLAUDE,
    type: 1,
    description: "Claudeに新しい質問を送ります（新規会話）",
    options: [
      { type: 3, name: "prompt", description: "質問内容", required: true },
      {
        type: 5,
        name: "public",
        description: "Trueで強制的に全員に見えるよう出力します",
        required: false,
      },
      {
        type: 11,
        name: "attachment",
        description: "画像またはPDFを添付して質問できます",
        required: false,
      },
    ],
    ...INSTALL_ANYWHERE,
  },
  {
    name: CMD_SETTINGS,
    type: 1,
    description: "Botの個人設定を変更します",
    ...INSTALL_ANYWHERE,
  },
  // Message context menus take no description.
  { name: CMD_CONTINUE, type: 3, ...INSTALL_ANYWHERE },
  { name: CMD_REGENERATE, type: 3, ...INSTALL_ANYWHERE },
];
