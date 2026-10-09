import { answerPriority } from "../ai/routing";
import {
  BENCHMARK_REVIEW_DATE,
  benchmarkReview,
  benchmarkWarnings,
} from "../models/benchmark-reviews";
import {
  autoEvaluationPool,
  EMPTY_REGISTRY,
  freshEvaluation,
  freshOutcome,
  isApproved,
  isFreeModel,
  type ModelInfo,
  type Registry,
} from "../models/registry";
import { type Currency, DEFAULT_USD_JPY_RATE, money, rateNote } from "../shared/currency";
import type { Prefs } from "../shared/types";

export const CID_MODEL = "set:model:";
export const CID_EFFORT = "set:effort:"; // Older settings messages remain usable.
export const CID_TOGGLE = "tog:";
export const CID_PAGE = "models:page:";
export const CID_MODE = "settings:mode:";
export const CID_QUALITY = "settings:quality:";
export const CID_VISIBILITY = "settings:visibility:";
export const CID_FILTER = "settings:filter:";
export const CID_VIEW = "settings:view:";
export const CID_REFRESH = "settings:refresh:";
export const CID_CURRENCY = "settings:currency:";

export const MODEL_FILTERS = ["all", "openai", "anthropic", "google", "other"] as const;
export type ModelFilter = (typeof MODEL_FILTERS)[number];
export interface SettingsView {
  panel: "main" | "models";
  filter: ModelFilter;
  page?: number;
}
export const MAIN_VIEW: SettingsView = { panel: "main", filter: "all" };
const QUALITY_OPTIONS = [
  {
    value: "low",
    label: "コスト優先",
    description: "必要な品質チェックを満たす安いモデル＋控えめな思考",
  },
  {
    value: "medium",
    label: "バランス（おすすめ）",
    description: "日常の質問は節約、難しい質問はモデルと考え方を強化",
  },
  {
    value: "high",
    label: "品質優先",
    description: "公開スコアの高い候補＋深い思考。費用は増えやすい",
  },
];

function displayModelId(id: string): string {
  return id.startsWith("claude-")
    ? `anthropic/${id.replace(/claude-haiku-4-5$/, "claude-haiku-4.5")}`
    : id;
}

function modelName(prefs: Prefs, registry: Registry): string {
  if (prefs.model === "auto-free") return "Auto（無料モデルのみ）";
  if (prefs.model === "auto") return "Auto（質問に合わせて自動選択）";
  return registry.models.find((m) => m.id === displayModelId(prefs.model))?.name ?? prefs.model;
}

/** A comparable reference request, not a prediction of the user's actual bill. */
export function referenceCost(model: ModelInfo): number {
  return model.input * 1000 + model.output * 500;
}
function evaluationSummary(registry: Registry, currency: Currency, rate: number): string {
  const approved = registry.models.filter((m) => isApproved(registry, m)).length;
  const pool = autoEvaluationPool(registry);
  const checked = pool.filter((m) => freshEvaluation(registry, m)).length;
  const progress = registry.progress;
  const reviewed = registry.models.filter((m) => benchmarkReview(m)).length;
  return (
    `**Autoの準備**　採用済み ${approved}モデル ／ 公開指標確認 ${reviewed} ／ 動作テスト完了 ${checked}/${pool.length}候補\n` +
    `-# 公開指標の確認に日次制限はありません。API動作テストは有料1日${progress?.dailyLimit ?? 2}モデル・月${money(progress?.budgetUsd ?? 0.5, currency, rate, 2)}の評価枠。未評価も手動利用可。` +
    (progress ? `今日の評価試行 ${progress.attemptsToday}/${progress.dailyLimit}。` : "") +
    (progress
      ? `無料モデルは別枠で ${progress.freeAttemptsToday ?? 0}/${progress.freeDailyLimit ?? 24}。`
      : "") +
    (progress?.lastFailure
      ? `直近の未完了理由：${progress.lastFailure.reason}（${progress.lastFailure.model}）。`
      : "") +
    `\n-# 公開指標の確認日：${BENCHMARK_REVIEW_DATE}。公開スコアは参考で、このBotで同じ成績を保証するものではありません。\n` +
    benchmarkWarnings(registry.models)
      .map((warning) => `⚠️ ${warning}\n`)
      .join("") +
    "\n"
  );
}
function costSummary(prefs: Prefs, registry: Registry, rate: number): string {
  if (prefs.model === "auto-free") {
    const count = registry.models.filter((m) => isFreeModel(m) && isApproved(registry, m)).length;
    return `**無料の候補**　採用済み ${count}モデル ／ 入出力料金0\n-# 無料モードでは検索・リンク読み込みを使いません。有料モデルへの自動切り替えも行いません。\n`;
  }
  const fmt = (cost: number) => money(cost, prefs.currency, rate);
  if (prefs.model === "auto") {
    const costs = registry.models.filter((m) => isApproved(registry, m)).map(referenceCost);
    return costs.length
      ? `**費用の参考**　Auto候補 ${fmt(Math.min(...costs))}〜${fmt(Math.max(...costs))}/回\n`
      : "**費用の参考**　Auto候補の評価完了後に表示\n";
  }
  const model = registry.models.find((m) => m.id === displayModelId(prefs.model));
  const perMillion = (price: number) => money(price * 1e6, prefs.currency, rate, 2);
  return model
    ? `**費用の参考**　${fmt(referenceCost(model))}/回 ／ ${fmt(referenceCost(model) * 100)}/100回\n` +
        `-# 入力 ${perMillion(model.input)}・出力 ${perMillion(model.output)} / 100万token\n`
    : "**費用の参考**　モデル一覧の更新後に確認してください\n";
}

const CURRENCY_LABEL: Record<Currency, string> = { jpy: "円", usd: "ドル" };

export function settingsSummary(
  prefs: Prefs,
  registry: Registry = EMPTY_REGISTRY,
  rate = DEFAULT_USD_JPY_RATE,
): string {
  const quality = QUALITY_OPTIONS.find((option) => option.value === answerPriority(prefs));
  return (
    "**AIの設定**\n変更はすぐに保存され、次の質問から反映されます。\n\n" +
    `**モデル**　${modelName(prefs, registry)}\n` +
    `**回答の質 / コスト**　${quality?.label ?? prefs.effort}\n` +
    (prefs.model === "auto-free"
      ? "**情報取得**　無料モードでは検索・リンク読み込みOFF\n"
      : `**情報取得**　検索 ${prefs.web_search ? "ON（必要なとき）" : "OFF"} ／ リンク ${prefs.web_fetch ? "ON" : "OFF"}\n`) +
    `**公開範囲**　${prefs.ephemeral ? "自分だけ" : "全員に公開"}\n` +
    `**費用の表示**　${CURRENCY_LABEL[prefs.currency]}\n\n` +
    evaluationSummary(registry, prefs.currency, rate) +
    costSummary(prefs, registry, rate) +
    `-# ${rateNote(prefs.currency, rate)} 目安は入力1,000＋出力500トークンの概算。長い履歴・添付・思考・検索で増減します。Autoではモデル選択と考え方、手動では考え方を調整します。非対応モデルでは差が出ない場合があります。`
  );
}

function row(component: Record<string, unknown>) {
  return { type: 1, components: [component] };
}
function select(customId: string, placeholder: string, options: Record<string, unknown>[]) {
  return row({ type: 3, custom_id: customId, placeholder, min_values: 1, max_values: 1, options });
}
function button(label: string, customId: string, style = 2, disabled = false) {
  return { type: 2, style, label, custom_id: customId, disabled };
}

/** Basic settings fit on one screen; the full model catalog has a separate browser. */
export function settingsComponents(userId: string, prefs: Prefs): unknown[] {
  return [
    select(`${CID_MODE}${userId}`, "モデルの選び方", [
      {
        label: "Auto（おすすめ）",
        value: "auto",
        description: "質問・画像/PDF・費用に合わせて選択",
        default: prefs.model === "auto",
      },
      {
        label: "Auto（無料）",
        value: "auto-free",
        description: "無料モデルのみ。検索・リンクなし、有料への切り替えなし",
        default: prefs.model === "auto-free",
      },
      {
        label: "手動でモデルを選ぶ",
        value: "manual",
        description: "GPT・Claude・Gemini・その他のAIから指定",
        default: prefs.model !== "auto" && prefs.model !== "auto-free",
      },
    ]),
    select(
      `${CID_QUALITY}${userId}`,
      "回答の質 / コスト",
      QUALITY_OPTIONS.map((option) => ({
        ...option,
        default: option.value === answerPriority(prefs),
      })),
    ),
    {
      type: 1,
      components: [
        button(
          `Web検索: ${prefs.model === "auto-free" ? "無料モードではOFF" : prefs.web_search ? "ON" : "OFF"}`,
          `${CID_TOGGLE}web_search:${userId}`,
          prefs.web_search ? 1 : 2,
          prefs.model === "auto-free",
        ),
        button(
          `リンク読み込み: ${prefs.model === "auto-free" ? "無料モードではOFF" : prefs.web_fetch ? "ON" : "OFF"}`,
          `${CID_TOGGLE}web_fetch:${userId}`,
          prefs.web_fetch ? 1 : 2,
          prefs.model === "auto-free",
        ),
      ],
    },
    select(`${CID_VISIBILITY}${userId}`, "回答を誰に表示するか", [
      {
        label: "自分だけ",
        value: "private",
        description: "他の人には回答を表示しない",
        default: prefs.ephemeral,
      },
      {
        label: "全員に公開（おすすめ）",
        value: "public",
        description: "チャンネルを見られる全員に回答を表示",
        default: !prefs.ephemeral,
      },
    ]),
    {
      type: 1,
      components: [
        ...(prefs.model !== "auto" && prefs.model !== "auto-free"
          ? [button("手動モデルを変更", `${CID_VIEW}models:${userId}`)]
          : []),
        button("モデル一覧を更新", `${CID_REFRESH}main:${userId}:all:0`),
        button(
          `費用の表示: ${CURRENCY_LABEL[prefs.currency]}`,
          `${CID_CURRENCY}${prefs.currency === "jpy" ? "usd" : "jpy"}:${userId}`,
        ),
      ],
    },
  ];
}

export function modelBrowser(
  userId: string,
  prefs: Prefs,
  registry: Registry,
  view: SettingsView,
  rate = DEFAULT_USD_JPY_RATE,
): { content: string; components: unknown[] } {
  const pageSize = 23;
  const models = registry.models.filter(
    (m) =>
      view.filter === "all" ||
      (view.filter === "other"
        ? !["openai", "anthropic", "google"].includes(m.id.split("/")[0])
        : m.id.startsWith(`${view.filter}/`)),
  );
  const poolIds = new Set(autoEvaluationPool(registry).map((m) => m.id));
  const selected = displayModelId(prefs.model);
  // Opening the browser starts on the currently selected model's page.
  const selectedPage = Math.max(
    0,
    Math.floor(models.findIndex((m) => m.id === selected) / pageSize),
  );
  const lastPage = Math.max(0, Math.ceil(models.length / pageSize) - 1);
  const page = Math.min(lastPage, Math.max(0, view.page ?? selectedPage));
  const options = [
    {
      label: "Autoへ戻す（おすすめ）",
      value: "auto",
      description: "質問に合わせてモデルを自動選択",
      default: selected === "auto",
    },
    ...models.slice(page * pageSize, (page + 1) * pageSize).map((model) => {
      const evaluation = freshEvaluation(registry, model);
      const publicReview = benchmarkReview(model);
      const outcome = freshOutcome(registry, model);
      const status = model.preview
        ? "Preview・手動のみ"
        : isApproved(registry, model)
          ? publicReview
            ? `公開指標で採用・${evaluation || outcome?.successes ? "接続確認済み" : "接続未確認"}`
            : "動作テストで採用"
          : (evaluation?.disabledUntil ?? outcome?.disabledUntil ?? 0) > Date.now()
            ? "一時停止中"
            : evaluation && !evaluation.basic
              ? "品質チェック不合格"
              : poolIds.has(model.id)
                ? "評価待ち・手動利用可"
                : "手動用・Auto評価対象外";
      return {
        label: `[${model.id.split("/")[0]}] ${model.name}`.slice(0, 100),
        value: model.id,
        description:
          `${status}｜目安 ${money(referenceCost(model), prefs.currency, rate)}/回`.slice(0, 100),
        default: selected === model.id,
      };
    }),
  ];
  return {
    content:
      "**手動モデルを選択**\n選ぶとすぐに保存され、基本設定へ戻ります。\n\n" +
      `現在: **${modelName(prefs, registry)}**\n` +
      `一覧: ${models.length}モデル ／ ${page + 1}/${lastPage + 1}ページ\n\n` +
      evaluationSummary(registry, prefs.currency, rate) +
      costSummary(prefs, registry, rate) +
      `-# ${rateNote(prefs.currency, rate)} 目安は入力1,000＋出力500トークンの概算。思考・添付・検索は別途増減します。AutoはGPT・Claude・Geminiが対象です。Preview・未評価モデルの基本品質は未確認です。一時停止中のモデルは手動でも利用できません。` +
      (!models.length
        ? "\n\nこの一覧にはまだモデルがありません。別の会社を選ぶか、しばらくして開き直してください。"
        : ""),
    components: [
      select(
        `${CID_FILTER}${userId}`,
        "モデルの会社で絞り込み",
        [
          { label: "すべて", value: "all" },
          { label: "GPT（OpenAI）", value: "openai" },
          { label: "Claude（Anthropic）", value: "anthropic" },
          { label: "Gemini（Google）", value: "google" },
          { label: "その他のAI", value: "other" },
        ].map((option) => ({ ...option, default: option.value === view.filter })),
      ),
      select(`${CID_MODEL}${userId}`, "使用するモデルを選択", options),
      {
        type: 1,
        components: [
          ...(lastPage > 0
            ? [
                button(
                  "前へ",
                  `${CID_PAGE}${Math.max(0, page - 1)}:${userId}:${view.filter}`,
                  2,
                  page === 0,
                ),
                button(
                  "次へ",
                  `${CID_PAGE}${Math.min(lastPage, page + 1)}:${userId}:${view.filter}`,
                  2,
                  page === lastPage,
                ),
              ]
            : []),
          button("基本設定に戻る", `${CID_VIEW}main:${userId}`),
          button("モデル一覧を更新", `${CID_REFRESH}models:${userId}:${view.filter}:${page}`),
        ],
      },
    ],
  };
}
