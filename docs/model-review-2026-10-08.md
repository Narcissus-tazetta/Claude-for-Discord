# Discord Bot 全モデル調査（2026-10-08）

Gatewayの全413モデル・44社を確認。公開能力測定あり198件（参考対応63件を含む）、Auto公開指標採用22件。

全件調査は全モデルの推論実測ではありません。仕様・全料金体系・用途・公開測定・採用/保留理由を全IDについて記録しました。公開評価がない場合は未確認と明記し、他版の点数や推測を補っていません。

取得UTC: 2026-10-07T22:58:03.232884+00:00。仕様は[Gateway公式API](https://ai-gateway.vercel.sh/v1/models)、測定は[Artificial Analysis](https://artificialanalysis.ai/models)のリリース別ページ（Index v4.3.2）。

## 採用基準

ID直接対応・リリース日・思考量・非推定・安定版・価格帯・会話用途・文脈/出力枠が一致した測定のみ採用。別名/Fast対応は参考情報です。思考量未特定、Preview、異なる日付は採用点へ流用しません。思考OFFの点を思考ONへ転用しません。最大思考の点をhighへ転用しません。

最低公開指標18/28/40（会話/通常/難問）、バランス目標18/32/48、予算、対応添付、90日有効期限は従来どおりです。公開測定とBotはツール・思考/出力予算が異なり、統計的有意差は確認していません。

機能はカタログ申告です。アカウント利用資格・実接続・実測速度は未確認。料金はUSD/token等の元キーを保存し、会話の比較表のみUSD/100万tokenに換算します。画像/動画/音声の秒・枚・文字料金をtoken料金に換算しません。長文料金帯/キャッシュ料金も詳細に記録します。カタログの説明文を能力点の根拠にしません。

## 内訳

| 種類 | 件数 |
|---|---:|
| embedding | 28 |
| evaluation | 5 |
| image | 36 |
| language | 268 |
| realtime | 9 |
| reranking | 7 |
| speech | 12 |
| transcription | 10 |
| video | 38 |

## 会社別の確認範囲

| 会社ID | 全件 | 言語 | 公開測定あり（参考対応含む） | Auto採用 |
|---|---:|---:|---:|---:|
| alibaba | 45 | 32 | 25 | 1 |
| amazon | 5 | 4 | 4 | 0 |
| anthropic | 20 | 20 | 20 | 4 |
| arcee-ai | 1 | 1 | 1 | 0 |
| bfl | 12 | 0 | 0 | 0 |
| bytedance | 14 | 3 | 0 | 0 |
| cohere | 7 | 1 | 1 | 0 |
| convaiinnovations | 2 | 0 | 0 | 0 |
| deepseek | 11 | 11 | 10 | 0 |
| fireworks | 1 | 1 | 0 | 0 |
| fish-audio | 4 | 0 | 0 | 0 |
| google | 35 | 20 | 13 | 5 |
| inception | 3 | 3 | 2 | 0 |
| inclusionai | 6 | 6 | 4 | 0 |
| inference-net | 2 | 2 | 0 | 0 |
| interfaze | 1 | 1 | 0 | 0 |
| klingai | 8 | 0 | 0 | 0 |
| liquid | 1 | 0 | 0 | 0 |
| meituan | 1 | 1 | 0 | 0 |
| meta | 12 | 11 | 8 | 0 |
| microsoft | 6 | 0 | 0 | 0 |
| minimax | 10 | 8 | 5 | 0 |
| mistral | 11 | 9 | 4 | 0 |
| mixedbread | 1 | 1 | 0 | 0 |
| moonshotai | 7 | 7 | 6 | 1 |
| morph | 2 | 2 | 0 | 0 |
| nvidia | 6 | 6 | 6 | 0 |
| openai | 85 | 64 | 57 | 6 |
| perplexity | 3 | 1 | 1 | 0 |
| poolside | 2 | 2 | 0 | 0 |
| prodia | 1 | 0 | 0 | 0 |
| quiverai | 3 | 2 | 0 | 0 |
| recraft | 9 | 0 | 0 | 0 |
| sakana | 4 | 4 | 0 | 0 |
| spacexai | 22 | 13 | 8 | 4 |
| stealth | 1 | 1 | 0 | 0 |
| stepfun | 2 | 2 | 2 | 0 |
| tencent | 5 | 5 | 1 | 0 |
| thinkingmachines | 2 | 2 | 2 | 0 |
| topaz | 3 | 0 | 0 | 0 |
| typesafe-ai | 1 | 0 | 0 | 0 |
| voyage | 14 | 0 | 0 | 0 |
| xiaomi | 5 | 5 | 3 | 0 |
| zai | 17 | 17 | 15 | 1 |

## Auto採用一覧

| モデル | 採用思考量別指標 | 基本料金 入力/出力 USD/100万token | highで難問40以上 |
|---|---|---:|---|
| [alibaba/qwen3.8-27b](https://artificialanalysis.ai/models/releases/qwen3-8-27b) | xhigh 34, low 26, medium 28, none 20 | 0.5 / 3 | 未確認 |
| [anthropic/claude-haiku-5.5](https://artificialanalysis.ai/models/releases/claude-haiku-5-5) | max 43, high 38, low 29, medium 34, xhigh 41 | 0.1 / 0.5 | 未確認 |
| [anthropic/claude-opus-5](https://artificialanalysis.ai/models/releases/claude-opus-5) | max 51, high 48, low 39, medium 45, xhigh 50 | 5 / 25 | 確認 |
| [anthropic/claude-opus-5.5](https://artificialanalysis.ai/models/releases/claude-opus-5-5) | max 58, high 54, low 42, medium 51, xhigh 56 | 4 / 20 | 確認 |
| [anthropic/claude-sonnet-5.5](https://artificialanalysis.ai/models/releases/claude-sonnet-5-5) | max 56, high 47, low 36, medium 41, xhigh 52 | 2 / 10 | 確認 |
| [google/gemini-3.5-flash](https://artificialanalysis.ai/models/releases/gemini-3-5-flash) | high 33 | 1.5 / 9 | 未確認 |
| [google/gemini-3.5-flash-lite](https://artificialanalysis.ai/models/releases/gemini-3-5-flash-lite) | high 22 | 0.3 / 2.5 | 未確認 |
| [google/gemini-3.6-flash](https://artificialanalysis.ai/models/releases/gemini-3-6-flash) | high 34 | 0.75 / 3.75 | 未確認 |
| [google/gemini-3.7-flash](https://artificialanalysis.ai/models/releases/gemini-3-7-flash) | high 39 | 0.75 / 3.75 | 未確認 |
| [google/gemini-3.8-flash](https://artificialanalysis.ai/models/releases/gemini-3-8-flash) | high 41, low 33 | 0.75 / 3.75 | 確認 |
| [moonshotai/kimi-k3](https://artificialanalysis.ai/models/releases/kimi-k3) | max 44, low 30 | 3 / 15 | 未確認 |
| [openai/gpt-5.6-luna](https://artificialanalysis.ai/models/releases/gpt-5-6-luna) | max 37, high 32, low 21, medium 25, none 16, xhigh 35 | 0.2 / 1.2 | 未確認 |
| [openai/gpt-5.6-sol](https://artificialanalysis.ai/models/releases/gpt-5-6-sol) | max 47, high 42, low 33, medium 39, xhigh 44 | 4 / 20 | 確認 |
| [openai/gpt-5.6-terra](https://artificialanalysis.ai/models/releases/gpt-5-6-terra) | max 42, high 34, low 27, medium 30, none 21, xhigh 38 | 2 / 12 | 未確認 |
| [openai/gpt-6-luna](https://artificialanalysis.ai/models/releases/gpt-6-luna) | max 38, high 33, low 22, medium 30, none 18, xhigh 35 | 0.1 / 0.5 | 未確認 |
| [openai/gpt-6-sol](https://artificialanalysis.ai/models/releases/gpt-6-sol) | max 48, high 42, low 34, medium 40, none 29, xhigh 44 | 2 / 10 | 確認 |
| [openai/gpt-6.1-sol](https://artificialanalysis.ai/models/releases/gpt-6-1-sol) | max 52, high 50, low 42, medium 48, xhigh 51 | 2 / 10 | 確認 |
| [spacexai/grok-4.3](https://artificialanalysis.ai/models/releases/grok-4-3) | high 25 | 1.25 / 2.5 | 未確認 |
| [spacexai/grok-4.5](https://artificialanalysis.ai/models/releases/grok-4-5) | high 39 | 2 / 6 | 未確認 |
| [spacexai/grok-4.6](https://artificialanalysis.ai/models/releases/grok-4-6) | high 44, low 35, medium 43, xhigh 44 | 2 / 6 | 確認 |
| [spacexai/grok-4.7](https://artificialanalysis.ai/models/releases/grok-4-7) | xhigh 46, high 46, low 42 | 2 / 6 | 確認 |
| [zai/glm-5.3](https://artificialanalysis.ai/models/releases/glm-5-3) | max 45, low 34 | 1.4 / 4.4 | 未確認 |

Haiku 5.5は通常用途の安価な候補。high 38は難問の最低40に届かず、最大思考43をhighへ転用しません。Gatewayの長文料金は入力100,001tokenから基本料金の5倍なので、長い履歴では最安料金だけで判断しません。

## 全モデルの詳細

### alibaba/qwen-3-14b

- 名称/種類: Qwen3-14B / language
- リリース日/Unix秒: 2025-04-28 / 1745798400
- 文脈/最大出力: 40960 / 16384
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000012","output":"0.00000024"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-14b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 14B (Non-reasoning) | 6.703036 | none | True | 2025-04-28 |
| Qwen3 14B (Reasoning) | 8.154335 | 未特定 | True | 2025-04-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen-3-235b

- 名称/種類: Qwen3 235B A22B / language
- リリース日/Unix秒: 2025-04-28 / 1745798400
- 文脈/最大出力: 262144 / 16384
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output, reasoning
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000022","output":"0.00000088","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-235b-a22b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 235B A22B (Non-reasoning) | 8.294692 | none | True | 2025-04-28 |
| Qwen3 235B A22B (Reasoning) | 9.499709 | 未特定 | True | 2025-04-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen-3-30b

- 名称/種類: Qwen3-30B-A3B / language
- リリース日/Unix秒: 2025-04-28 / 1745798400
- 文脈/最大出力: 40960 / 16384
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000012","output":"0.0000005"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-30b-a3b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 30B A3B (Non-reasoning) | 6.622595 | none | True | 2025-04-28 |
| Qwen3 30B A3B (Reasoning) | 7.626143 | 未特定 | True | 2025-04-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen-3-32b

- 名称/種類: Qwen 3 32B / language
- リリース日/Unix秒: 2025-04-28 / 1745798400
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "budget_tokens", "min": 1, "max": 38912}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000016","output":"0.00000064","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-32b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 32B (Non-reasoning) | 7.344278 | none | True | 2025-04-28 |
| Qwen3 32B (Reasoning) | 8.586941 | 未特定 | True | 2025-04-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen-3.6-max-preview

- 名称/種類: Qwen 3.6 Max Preview / language
- リリース日/Unix秒: 2026-04-20 / 1776643200
- 文脈/最大出力: 240000 / 64000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, explicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "budget_tokens", "min": 1, "max": 131072}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000013","input_tiers":[{"cost":"0.0000013","min":0,"max":128000},{"cost":"0.000002","min":128000}],"output":"0.0000078","output_tiers":[{"cost":"0.0000078","min":0,"max":128000},{"cost":"0.000012","min":128000}],"input_cache_read":"0.00000013","input_cache_read_tiers":[{"cost":"0.00000013","min":0,"max":128000},{"cost":"0.0000002","min":128000}],"input_cache_write":"0.000001625","input_cache_write_tiers":[{"cost":"0.000001625","min":0,"max":128000},{"cost":"0.0000025","min":128000}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：Preview・実験版 / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-6-max)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.6 Max Preview | 28.374869 | 未特定 | True | 2026-04-20 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-235b-a22b-thinking

- 名称/種類: Qwen3 VL 235B A22B Thinking / language
- リリース日/Unix秒: 2025-09-23 / 1758585600
- 文脈/最大出力: 131072 / 32768
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: vision, reasoning, tool-use, file-input
- 思考制御: [{"type": "budget_tokens", "min": 1, "max": 81920}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000004","output":"0.000004","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-vl-235b-a22b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 VL 235B A22B (Reasoning) | 13.437568 | 未特定 | True | 2025-09-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-coder

- 名称/種類: Qwen3 Coder 480B A35B Instruct / language
- リリース日/Unix秒: 2025-07-22 / 1753142400
- 文脈/最大出力: 262144 / 65536
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output, implicit-caching
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000015","input_tiers":[{"cost":"0.0000015","min":0,"max":32001},{"cost":"0.0000027","min":32001,"max":128001},{"cost":"0.0000045","min":128001}],"output":"0.0000075","output_tiers":[{"cost":"0.0000075","min":0,"max":32001},{"cost":"0.0000135","min":32001,"max":128001},{"cost":"0.0000225","min":128001}],"input_cache_read":"0.0000003","input_cache_read_tiers":[{"cost":"0.0000003","min":0,"max":32001},{"cost":"0.00000054","min":32001,"max":128001},{"cost":"0.0000009","min":128001}],"varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-coder-480b-a35b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 Coder 480B A35B Instruct | 11.899026 | none | True | 2025-07-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-coder-30b-a3b

- 名称/種類: Qwen 3 Coder 30B A3B Instruct / language
- リリース日/Unix秒: 2025-07-31 / 1753920000
- 文脈/最大出力: 262144 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.0000006","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-coder-30b-a3b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 Coder 30B A3B Instruct | 9.585376 | none | True | 2025-07-31 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-coder-next

- 名称/種類: Qwen3 Coder Next / language
- リリース日/Unix秒: 2025-07-22 / 1753142400
- 文脈/最大出力: 256000 / 256000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.0000012"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-coder-next)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 Coder Next | 9.236822 | none | False | 2026-02-03 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-coder-plus

- 名称/種類: Qwen3 Coder Plus / language
- リリース日/Unix秒: 2025-07-23 / 1753228800
- 文脈/最大出力: 1000000 / 65536
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, tool-use
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice
- 全料金（元の単位）: `{"input":"0.000001","input_tiers":[{"cost":"0.000001","min":0,"max":32001},{"cost":"0.0000018","min":32001,"max":128001},{"cost":"0.000003","min":128001,"max":256001},{"cost":"0.000006","min":256001}],"output":"0.000005","output_tiers":[{"cost":"0.000005","min":0,"max":32001},{"cost":"0.000009","min":32001,"max":128001},{"cost":"0.000015","min":128001,"max":256001},{"cost":"0.00006","min":256001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":32001},{"cost":"0.00000036","min":32001,"max":128001},{"cost":"0.0000006","min":128001,"max":256001},{"cost":"0.0000012","min":256001}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-embedding-0.6b

- 名称/種類: Qwen3 Embedding 0.6B / embedding
- リリース日/Unix秒: 2025-11-14 / 1763078400
- 文脈/最大出力: 32768 / 32768
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000001"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-embedding-4b

- 名称/種類: Qwen3 Embedding 4B / embedding
- リリース日/Unix秒: 2025-06-05 / 1749081600
- 文脈/最大出力: 32768 / 32768
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000002"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-embedding-8b

- 名称/種類: Qwen3 Embedding 8B / embedding
- リリース日/Unix秒: 2025-06-05 / 1749081600
- 文脈/最大出力: 32768 / 32768
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000001"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-max

- 名称/種類: Qwen3 Max / language
- リリース日/Unix秒: 2025-09-23 / 1758585600
- 文脈/最大出力: 262144 / 32768
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000012","input_tiers":[{"cost":"0.0000012","min":0,"max":32001},{"cost":"0.0000024","min":32001,"max":128001},{"cost":"0.000003","min":128001}],"output":"0.000006","output_tiers":[{"cost":"0.000006","min":0,"max":32001},{"cost":"0.000012","min":32001,"max":128001},{"cost":"0.000015","min":128001}],"input_cache_read":"0.00000024","input_cache_read_tiers":[{"cost":"0.00000024","min":0,"max":32001},{"cost":"0.00000048","min":32001,"max":128001},{"cost":"0.0000006","min":128001}],"varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-max)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 Max | 15.609845 | none | True | 2025-09-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-max-preview

- 名称/種類: Qwen3 Max Preview / language
- リリース日/Unix秒: 2025-09-05 / 1757030400
- 文脈/最大出力: 262144 / 32768
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, implicit-caching, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000012","input_tiers":[{"cost":"0.0000012","min":0,"max":32001},{"cost":"0.0000024","min":32001,"max":128001},{"cost":"0.000003","min":128001}],"output":"0.000006","output_tiers":[{"cost":"0.000006","min":0,"max":32001},{"cost":"0.000012","min":32001,"max":128001},{"cost":"0.000015","min":128001}],"input_cache_read":"0.00000024","input_cache_read_tiers":[{"cost":"0.00000024","min":0,"max":32001},{"cost":"0.00000048","min":32001,"max":128001},{"cost":"0.0000006","min":128001}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：Preview・実験版 / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-max-preview)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 Max (Preview) | 12.588396 | none | True | 2025-09-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-max-thinking

- 名称/種類: Qwen 3 Max Thinking / language
- リリース日/Unix秒: 2026-01-23 / 1769126400
- 文脈/最大出力: 256000 / 65536
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "budget_tokens", "min": 1, "max": 81920}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000012","input_tiers":[{"cost":"0.0000012","min":0,"max":32001},{"cost":"0.0000024","min":32001,"max":128001},{"cost":"0.000003","min":128001}],"output":"0.000006","output_tiers":[{"cost":"0.000006","min":0,"max":32001},{"cost":"0.000012","min":32001,"max":128001},{"cost":"0.000015","min":128001}],"input_cache_read":"0.00000024","input_cache_read_tiers":[{"cost":"0.00000024","min":0,"max":32001},{"cost":"0.00000048","min":32001,"max":128001},{"cost":"0.0000006","min":128001}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-max-thinking)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 Max Thinking | 21.255111 | 未特定 | True | 2026-01-26 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-next-80b-a3b-instruct

- 名称/種類: Qwen3 Next 80B A3B Instruct / language
- リリース日/Unix秒: 2025-09-11 / 1757548800
- 文脈/最大出力: 262114 / 262114
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.0000012","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-next-80b-a3b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 Next 80B A3B Instruct | 9.643350 | none | True | 2025-09-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-next-80b-a3b-thinking

- 名称/種類: Qwen3 Next 80B A3B Thinking / language
- リリース日/Unix秒: 2025-09-11 / 1757548800
- 文脈/最大出力: 262144 / 262144
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "budget_tokens", "min": 1}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.0000012"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-next-80b-a3b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 Next 80B A3B (Reasoning) | 11.197368 | 未特定 | True | 2025-09-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-vl-235b-a22b-instruct

- 名称/種類: Qwen3 VL 235B A22B Instruct / language
- リリース日/Unix秒: 2025-09-23 / 1758585600
- 文脈/最大出力: 131072 / 129024
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision, implicit-caching
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice
- 全料金（元の単位）: `{"input":"0.0000004","output":"0.0000016","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-vl-235b-a22b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 VL 235B A22B Instruct | 9.936994 | none | True | 2025-09-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-vl-instruct

- 名称/種類: Qwen3 VL 235B A22B Instruct / language
- リリース日/Unix秒: 2025-09-23 / 1758585600
- 文脈/最大出力: 131072 / 129024
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision, implicit-caching, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000004","output":"0.0000016","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-vl-235b-a22b-instruct)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 VL 235B A22B Instruct | 9.936994 | none | True | 2025-09-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3-vl-thinking

- 名称/種類: Qwen3 VL 235B A22B Thinking / language
- リリース日/Unix秒: 2025-09-23 / 1758585600
- 文脈/最大出力: 131072 / 32768
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: vision, reasoning, tool-use, file-input
- 思考制御: [{"type": "budget_tokens", "min": 1, "max": 81920}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000004","output":"0.000004","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-vl-235b-a22b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3 VL 235B A22B (Reasoning) | 13.437568 | 未特定 | True | 2025-09-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.5-flash

- 名称/種類: Qwen 3.5 Flash / language
- リリース日/Unix秒: 2026-02-24 / 1771891200
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: vision, file-input, reasoning, tool-use, explicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens", "min": 1, "max": 81920}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000001","output":"0.0000004","input_cache_read":"0.00000001","input_cache_write":"0.000000125"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.5-plus

- 名称/種類: Qwen 3.5 Plus / language
- リリース日/Unix秒: 2026-02-16 / 1771200000
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: vision, file-input, reasoning, tool-use, explicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens", "min": 1, "max": 81920}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000004","input_tiers":[{"cost":"0.0000004","min":0,"max":256001},{"cost":"0.0000005","min":256001}],"output":"0.0000024","output_tiers":[{"cost":"0.0000024","min":0,"max":256001},{"cost":"0.000003","min":256001}],"input_cache_read":"0.00000004","input_cache_read_tiers":[{"cost":"0.00000004","min":0,"max":256001},{"cost":"0.00000005","min":256001}],"input_cache_write":"0.0000005","input_cache_write_tiers":[{"cost":"0.0000005","min":0,"max":256001},{"cost":"0.000000625","min":256001}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.6-27b

- 名称/種類: Qwen 3.6 27B / language
- リリース日/Unix秒: 2026-04-22 / 1776816000
- 文脈/最大出力: 256000 / 256000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, file-input, vision
- 思考制御: [{"type": "toggle"}, {"type": "budget_tokens", "min": 1, "max": 131072}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000036"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-6-27b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.6 27B (Reasoning) | 21.427990 | 未特定 | False | 2026-04-22 |
| Qwen3.6 27B (Non-reasoning) | 19.828820 | none | True | 2026-04-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.6-plus

- 名称/種類: Qwen 3.6 Plus / language
- リリース日/Unix秒: 2026-04-02 / 1775088000
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, file-input, explicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens", "min": 1, "max": 131072}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000005","input_tiers":[{"cost":"0.0000005","min":0,"max":256000},{"cost":"0.000002","min":256000}],"output":"0.000003","output_tiers":[{"cost":"0.000003","min":0,"max":256000},{"cost":"0.000006","min":256000}],"input_cache_read":"0.00000005","input_cache_read_tiers":[{"cost":"0.00000005","min":0,"max":256000},{"cost":"0.0000002","min":256000}],"input_cache_write":"0.000000625","input_cache_write_tiers":[{"cost":"0.000000625","min":0,"max":256000},{"cost":"0.0000025","min":256000}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-6-plus)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.6 Plus | 27.009923 | 未特定 | True | 2026-04-02 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.7-flash

- 名称/種類: Qwen 3.7 Flash / language
- リリース日/Unix秒: 2026-07-28 / 1785196800
- 文脈/最大出力: 991000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, explicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000003","input_tiers":[{"cost":"0.00000003","min":0,"max":32000},{"cost":"0.0000001","min":32000,"max":256000},{"cost":"0.0000002","min":256000}],"output":"0.00000013","output_tiers":[{"cost":"0.00000013","min":0,"max":32000},{"cost":"0.0000004","min":32000,"max":256000},{"cost":"0.0000008","min":256000}],"input_cache_read":"0.000000006","input_cache_read_tiers":[{"cost":"0.000000006","min":0,"max":32000},{"cost":"0.00000002","min":32000,"max":256000},{"cost":"0.00000004","min":256000}],"input_cache_write":"0.000000038","input_cache_write_tiers":[{"cost":"0.000000038","min":0,"max":32000},{"cost":"0.000000125","min":32000,"max":256000},{"cost":"0.00000025","min":256000}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.7-max

- 名称/種類: Qwen 3.7 Max / language
- リリース日/Unix秒: 2026-05-21 / 1779321600
- 文脈/最大出力: 991000 / 64000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, explicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens", "min": 1, "max": 262144}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000025","output":"0.0000075","input_cache_read":"0.0000005","input_cache_write":"0.000003125"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-7-max)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.7 Max | 29.457163 | 未特定 | False | 2026-05-19 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.7-plus

- 名称/種類: Qwen 3.7 Plus / language
- リリース日/Unix秒: 2026-06-02 / 1780358400
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, explicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens", "min": 1, "max": 262144}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000004","input_tiers":[{"cost":"0.0000004","min":0,"max":256000},{"cost":"0.0000012","min":256000}],"output":"0.0000016","output_tiers":[{"cost":"0.0000016","min":0,"max":256000},{"cost":"0.0000048","min":256000}],"input_cache_read":"0.00000008","input_cache_read_tiers":[{"cost":"0.00000008","min":0,"max":256000},{"cost":"0.00000024","min":256000}],"input_cache_write":"0.0000005","input_cache_write_tiers":[{"cost":"0.0000005","min":0,"max":256000},{"cost":"0.0000015","min":256000}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-7-plus)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.7 Plus | 25.162222 | 未特定 | False | 2026-06-01 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.8-2.4t-a95b

- 名称/種類: Qwen3.8 2.4T A95B / language
- リリース日/Unix秒: 2026-08-02 / 1785628800
- 文脈/最大出力: 262144 / 128000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output, vision
- 思考制御: [{"type": "effort", "values": ["low", "medium", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000006","input_cache_read":"0.00000025","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-8-2-4t-a95b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.8 2.4T A95B | 39.886172 | 未特定 | False | 2026-08-12 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.8-27b

- 名称/種類: Qwen3.8 27B / language
- リリース日/Unix秒: 2026-08-14 / 1786665600
- 文脈/最大出力: 1000000 / 131072
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, implicit-caching, video-input, file-input, explicit-caching, structured-output
- 思考制御: [{"type": "effort", "values": ["none", "low", "medium", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.000003","input_cache_read":"0.0000001","input_cache_write":"0.000000625","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-8-27b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.8 27B (Xhigh) | 33.696286 | xhigh | False | 2026-08-14 |
| Qwen3.8 27B (Low) | 26.204798 | low | False | 2026-08-14 |
| Qwen3.8 27B (Medium) | 27.550823 | medium | False | 2026-08-14 |
| Qwen3.8 27B (Non-reasoning) | 20.150243 | none | False | 2026-08-14 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.8-flash

- 名称/種類: Qwen 3.8 Flash / language
- リリース日/Unix秒: 2026-08-26 / 1787702400
- 文脈/最大出力: 991000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, explicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["low", "medium", "xhigh"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.00000047","input_cache_read":"0.000000016","input_cache_write":"0.0000002"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.8-max

- 名称/種類: Qwen 3.8 Max / language
- リリース日/Unix秒: 2026-08-02 / 1785628800
- 文脈/最大出力: 262144 / 128000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, explicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["low", "medium", "xhigh"]}, {"type": "budget_tokens", "min": 0, "max": 262144}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000006","input_cache_read":"0.00000025"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-8-max)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.8 Max | 40.152862 | 未特定 | False | 2026-08-03 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.8-max-0902

- 名称/種類: Qwen3.8 Max 0902 / language
- リリース日/Unix秒: 2026-09-01 / 1788220800
- 文脈/最大出力: 991000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, file-input, implicit-caching, explicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["low", "medium", "xhigh"]}, {"type": "budget_tokens", "min": 0, "max": 262144}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000006","input_cache_read":"0.00000025","input_cache_write":"0.0000025"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/qwen3-8-max-0902)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Qwen3.8 Max (0902) | 45.415208 | 未特定 | False | 2026-09-02 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.8-max-prime

- 名称/種類: Qwen 3.8 Max Prime / language
- リリース日/Unix秒: 2026-09-23 / 1790121600
- 文脈/最大出力: 1000000 / 131072
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, structured-output, tool-use, vision, explicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["low", "medium", "xhigh"]}, {"type": "budget_tokens", "min": 0, "max": 262144}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000004","output":"0.000012","input_cache_read":"0.0000005","input_cache_write":"0.000005"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/qwen3.8-omni-flash

- 名称/種類: Qwen 3.8 Omni Flash / language
- リリース日/Unix秒: 2026-09-17 / 1789603200
- 文脈/最大出力: 1000000 / 131072
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, structured-output, tool-use, vision
- 思考制御: [{"type": "effort", "values": ["none", "low", "medium", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.00000047","input_cache_read":"0.000000016"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v2.5-t2v-preview

- 名称/種類: Wan v2.5 Text-to-Video Preview / video
- リリース日/Unix秒: 2025-09-24 / 1758672000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","cost_per_second":"0.05"},{"resolution":"720p","cost_per_second":"0.1"},{"resolution":"1080p","cost_per_second":"0.15"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / Preview・実験版 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v2.6-i2v

- 名称/種類: Wan v2.6 Image-to-Video / video
- リリース日/Unix秒: 2025-12-16 / 1765843200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","cost_per_second":"0.1"},{"resolution":"1080p","cost_per_second":"0.15"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v2.6-i2v-flash

- 名称/種類: Wan v2.6 Image-to-Video Flash / video
- リリース日/Unix秒: 2025-12-16 / 1765843200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","cost_per_second":"0.05"},{"resolution":"1080p","cost_per_second":"0.075"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v2.6-r2v

- 名称/種類: Wan v2.6 Reference-to-Video / video
- リリース日/Unix秒: 2025-12-16 / 1765843200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","cost_per_second":"0.1"},{"resolution":"1080p","cost_per_second":"0.15"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v2.6-r2v-flash

- 名称/種類: Wan v2.6 Reference-to-Video Flash / video
- リリース日/Unix秒: 2025-12-16 / 1765843200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","cost_per_second":"0.05"},{"resolution":"1080p","cost_per_second":"0.075"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v2.6-t2v

- 名称/種類: Wan v2.6 Text-to-Video / video
- リリース日/Unix秒: 2025-12-16 / 1765843200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","cost_per_second":"0.1"},{"resolution":"1080p","cost_per_second":"0.15"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v2.7-r2v

- 名称/種類: Wan v2.7 Reference-to-Video / video
- リリース日/Unix秒: 2026-04-07 / 1775520000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","cost_per_second":"0.1"},{"resolution":"1080p","cost_per_second":"0.15"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v2.7-t2v

- 名称/種類: Wan v2.7 Text-to-Video / video
- リリース日/Unix秒: 2026-04-07 / 1775520000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","cost_per_second":"0.1"},{"resolution":"1080p","cost_per_second":"0.15"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v3.0-video

- 名称/種類: Wan v3.0 Video / video
- リリース日/Unix秒: 2026-08-23 / 1787443200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio", "image", "video"], "output": ["video"]}
- 全機能タグ: vision, video-input, audio-input
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","cost_per_second":"0.05"},{"resolution":"720p","cost_per_second":"0.1"},{"resolution":"1080p","cost_per_second":"0.2"},{"cost_per_second":"0.2"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### alibaba/wan-v3.0-video-prime

- 名称/種類: Wan v3.0 Video Prime / video
- リリース日/Unix秒: 2026-08-28 / 1787875200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio", "image", "video"], "output": ["video"]}
- 全機能タグ: vision, video-input, audio-input
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"1080p","cost_per_second":"0.28"},{"resolution":"720p","cost_per_second":"0.14"},{"resolution":"480p","cost_per_second":"0.068"},{"cost_per_second":"0.28"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### amazon/nova-2-lite

- 名称/種類: Nova 2 Lite / language
- リリース日/Unix秒: 2025-12-02 / 1764633600
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.000000075","regional":{"eu":{"input":"0.00000039","output":"0.00000327","input_cache_read":"0.000000075"},"us":{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.000000075"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nova-2-0-lite)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Nova 2.0 Lite (Non-reasoning) | 8.736614 | none | True | 2025-10-29 |
| Nova 2.0 Lite (High) | 13.374079 | high | True | 2025-10-29 |
| Nova 2.0 Lite (Low) | 11.804128 | low | True | 2025-10-29 |
| Nova 2.0 Lite (Medium) | 12.482379 | medium | True | 2025-10-29 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### amazon/nova-lite

- 名称/種類: Nova Lite / language
- リリース日/Unix秒: 2024-12-03 / 1733184000
- 文脈/最大出力: 300000 / 8192
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, tool-use, vision, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000006","output":"0.00000024","regional":{"eu":{"input":"0.000000078","output":"0.000000312"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nova-lite)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Nova Lite | 6.665715 | none | True | 2024-12-03 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### amazon/nova-micro

- 名称/種類: Nova Micro / language
- リリース日/Unix秒: 2024-12-03 / 1733184000
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000000035","output":"0.00000014","regional":{"eu":{"input":"0.000000046","output":"0.000000184"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nova-micro)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Nova Micro | 5.876523 | none | True | 2024-12-03 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### amazon/nova-pro

- 名称/種類: Nova Pro / language
- リリース日/Unix秒: 2024-12-03 / 1733184000
- 文脈/最大出力: 300000 / 8192
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, tool-use, vision, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000008","output":"0.0000032","regional":{"eu":{"input":"0.00000105","output":"0.0000042"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nova-pro)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Nova Pro | 6.958323 | none | True | 2024-12-03 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### amazon/titan-embed-text-v2

- 名称/種類: Titan Text Embeddings V2 / embedding
- リリース日/Unix秒: 2024-04-30 / 1714435200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000002"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-3-haiku

- 名称/種類: Claude 3 Haiku / language
- リリース日/Unix秒: 2024-03-13 / 1710288000
- 文脈/最大出力: 200000 / 4096
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision, explicit-caching, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.00000125","input_cache_read":"0.00000003","input_cache_write":"0.0000003"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-3-haiku)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude 3 Haiku | 5.578424 | none | True | 2024-03-04 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-fable-5

- 名称/種類: Claude Fable 5 / language
- リリース日/Unix秒: 2026-07-01 / 1782864000
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, explicit-caching, file-input, vision, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00001","output":"0.00005","input_cache_read":"0.000001","input_cache_write":"0.0000125","web_search":"10","regional":{"us":{"input":"0.000011","output":"0.000055","input_cache_read":"0.0000011","input_cache_write":"0.00001375"}}}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-fable-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Fable 5 (Max, Opus 4.8 Fallback) | 49.625820 | max | False | 2026-06-09 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-fable-5.1

- 名称/種類: Claude Fable 5.1 / language
- リリース日/Unix秒: 2026-08-31 / 1788134400
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, explicit-caching, file-input, vision, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00001","output":"0.00005","input_cache_read":"0.00000025","input_cache_write":"0.0000125","web_search":"10","regional":{"us":{"input":"0.000011","output":"0.000055","input_cache_read":"0.000000275","input_cache_write":"0.00001375"}}}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-fable-5-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Fable 5.1 (Max, Default Fallback) | 53.354926 | max | False | 2026-09-01 |
| Claude Fable 5.1 (High, Default Fallback) | 51.151571 | high | False | 2026-09-01 |
| Claude Fable 5.1 (Low, Default Fallback) | 46.816342 | low | False | 2026-09-01 |
| Claude Fable 5.1 (Medium, Default Fallback) | 48.920616 | medium | False | 2026-09-01 |
| Claude Fable 5.1 (Xhigh, Default Fallback) | 53.203259 | xhigh | False | 2026-09-01 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-haiku-4.5

- 名称/種類: Claude Haiku 4.5 / language
- リリース日/Unix秒: 2025-10-15 / 1760486400
- 文脈/最大出力: 200000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "budget_tokens", "min": 1024}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000001","output":"0.000005","input_cache_read":"0.0000001","input_cache_write":"0.00000125","web_search":"10","regional":{"eu":{"input":"0.0000011","output":"0.0000055","input_cache_read":"0.00000011","input_cache_write":"0.000001375"},"us":{"input":"0.0000011","output":"0.0000055","input_cache_read":"0.00000011","input_cache_write":"0.000001375"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-4-5-haiku)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude 4.5 Haiku (Non-reasoning) | 15.410950 | none | True | 2025-10-15 |
| Claude 4.5 Haiku (Reasoning) | 16.882235 | 未特定 | False | 2025-10-15 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-haiku-5.5

- 名称/種類: Claude Haiku 5.5 / language
- リリース日/Unix秒: 2026-10-07 / 1791331200
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000001","input_tiers":[{"cost":"0.0000001","min":0,"max":100001},{"cost":"0.0000005","min":100001}],"output":"0.0000005","output_tiers":[{"cost":"0.0000005","min":0,"max":100001},{"cost":"0.0000025","min":100001}],"input_cache_read":"0.00000001","input_cache_read_tiers":[{"cost":"0.00000001","min":0,"max":100001},{"cost":"0.00000005","min":100001}],"input_cache_write":"0.000000125","input_cache_write_tiers":[{"cost":"0.000000125","min":0,"max":100001},{"cost":"0.000000625","min":100001}],"web_search":"10","regional":{"eu":{"input":"0.00000011","input_tiers":[{"cost":"0.00000011","min":0,"max":100001},{"cost":"0.00000055","min":100001}],"output":"0.00000055","output_tiers":[{"cost":"0.00000055","min":0,"max":100001},{"cost":"0.00000275","min":100001}],"input_cache_read":"0.000000011","input_cache_read_tiers":[{"cost":"0.000000011","min":0,"max":100001},{"cost":"0.000000055","min":100001}],"input_cache_write":"0.0000001375","input_cache_write_tiers":[{"cost":"0.0000001375","min":0,"max":100001},{"cost":"0.0000006875","min":100001}]},"us":{"input":"0.00000011","input_tiers":[{"cost":"0.00000011","min":0,"max":100001},{"cost":"0.00000055","min":100001}],"output":"0.00000055","output_tiers":[{"cost":"0.00000055","min":0,"max":100001},{"cost":"0.00000275","min":100001}],"input_cache_read":"0.000000011","input_cache_read_tiers":[{"cost":"0.000000011","min":0,"max":100001},{"cost":"0.000000055","min":100001}],"input_cache_write":"0.0000001375","input_cache_write_tiers":[{"cost":"0.0000001375","min":0,"max":100001},{"cost":"0.0000006875","min":100001}]}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-haiku-5-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Haiku 5.5 (Max, Default Fallback) | 43.395020 | max | False | 2026-10-07 |
| Claude Haiku 5.5 (High, Default Fallback) | 37.824021 | high | False | 2026-10-07 |
| Claude Haiku 5.5 (Low, Default Fallback) | 29.449498 | low | False | 2026-10-07 |
| Claude Haiku 5.5 (Medium, Default Fallback) | 34.464652 | medium | False | 2026-10-07 |
| Claude Haiku 5.5 (Xhigh, Default Fallback) | 41.248930 | xhigh | False | 2026-10-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-4

- 名称/種類: Claude Opus 4 / language
- リリース日/Unix秒: 2025-05-22 / 1747872000
- 文脈/最大出力: 200000 / 32000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, explicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "budget_tokens", "min": 1024}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000015","output":"0.000075","input_cache_read":"0.0000015","input_cache_write":"0.00001875","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-4-opus)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude 4 Opus (Non-reasoning) | 16.614223 | none | True | 2025-05-22 |
| Claude 4 Opus (Reasoning) | 20.644636 | 未特定 | True | 2025-05-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-4.5

- 名称/種類: Claude Opus 4.5 / language
- リリース日/Unix秒: 2025-11-24 / 1763942400
- 文脈/最大出力: 200000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","output":"0.000025","input_cache_read":"0.0000005","input_cache_write":"0.00000625","web_search":"10","regional":{"eu":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875"},"us":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-4-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 4.5 (Non-reasoning) | 23.678898 | none | True | 2025-11-24 |
| Claude Opus 4.5 (Reasoning) | 29.095514 | 未特定 | True | 2025-11-24 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-4.6

- 名称/種類: Claude Opus 4.6 / language
- リリース日/Unix秒: 2026-02-05 / 1770249600
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, reasoning, vision, file-input, explicit-caching, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","output":"0.000025","input_cache_read":"0.0000005","input_cache_write":"0.00000625","web_search":"10","regional":{"eu":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875"},"us":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875","fast":{"input":"0.000033","output":"0.000165","input_cache_read":"0.0000033","input_cache_write":"0.00004125"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-4-6)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 4.6 (Non-reasoning, High) | 26.353409 | none | True | 2026-02-05 |
| Claude Opus 4.6 (Max) | 31.945740 | max | True | 2026-02-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-4.7

- 名称/種類: Claude Opus 4.7 / language
- リリース日/Unix秒: 2026-04-16 / 1776297600
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, reasoning, vision, file-input, explicit-caching, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","output":"0.000025","input_cache_read":"0.0000005","input_cache_write":"0.00000625","web_search":"10","regional":{"eu":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875"},"us":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875","fast":{"input":"0.000033","output":"0.000165","input_cache_read":"0.0000033","input_cache_write":"0.00004125"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-4-7)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 4.7 (Max) | 40.689793 | max | True | 2026-04-16 |
| Claude Opus 4.7 (Non-reasoning, High) | 30.931678 | none | True | 2026-04-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-4.8

- 名称/種類: Claude Opus 4.8 / language
- リリース日/Unix秒: 2026-05-28 / 1779926400
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, reasoning, vision, file-input, explicit-caching, web-search, fast, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","output":"0.000025","input_cache_read":"0.0000005","input_cache_write":"0.00000625","web_search":"10","fast":{"input":"0.00001","output":"0.00005","input_cache_read":"0.000001","input_cache_write":"0.0000125"},"regional":{"eu":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875"},"us":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875","fast":{"input":"0.000011","output":"0.000055","input_cache_read":"0.0000011","input_cache_write":"0.00001375"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-4-8)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 4.8 (Max) | 41.789910 | max | False | 2026-05-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-4.8-fast

- 名称/種類: Claude Opus 4.8 (Fast) / language
- リリース日/Unix秒: 2026-05-28 / 1779926400
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, reasoning, vision, file-input, explicit-caching, web-search, fast, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00001","output":"0.00005","input_cache_read":"0.000001","input_cache_write":"0.0000125","web_search":"10","regional":{"us":{"input":"0.000011","output":"0.000055","input_cache_read":"0.0000011","input_cache_write":"0.00001375"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-4-8)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 4.8 (Max) | 41.789910 | max | False | 2026-05-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-5

- 名称/種類: Claude Opus 5 / language
- リリース日/Unix秒: 2026-07-24 / 1784851200
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, reasoning, vision, file-input, explicit-caching, web-search, fast, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","output":"0.000025","input_cache_read":"0.0000005","input_cache_write":"0.00000625","web_search":"10","fast":{"input":"0.00001","output":"0.00005","input_cache_read":"0.000001","input_cache_write":"0.0000125"},"regional":{"eu":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875"},"us":{"input":"0.0000055","output":"0.0000275","input_cache_read":"0.00000055","input_cache_write":"0.000006875","fast":{"input":"0.000011","output":"0.000055","input_cache_read":"0.0000011","input_cache_write":"0.00001375"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 5 (Max) | 50.777112 | max | False | 2026-07-24 |
| Claude Opus 5 (High) | 48.121918 | high | False | 2026-07-24 |
| Claude Opus 5 (Low) | 39.354336 | low | False | 2026-07-24 |
| Claude Opus 5 (Medium) | 44.825327 | medium | False | 2026-07-24 |
| Claude Opus 5 (Xhigh) | 49.677355 | xhigh | False | 2026-07-24 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-5-fast

- 名称/種類: Claude Opus 5 (Fast) / language
- リリース日/Unix秒: 2026-07-24 / 1784851200
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, reasoning, vision, file-input, explicit-caching, web-search, fast, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00001","output":"0.00005","input_cache_read":"0.000001","input_cache_write":"0.0000125","web_search":"10","regional":{"us":{"input":"0.000011","output":"0.000055","input_cache_read":"0.0000011","input_cache_write":"0.00001375"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / Auto価格帯上限超過
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 5 (Max) | 50.777112 | max | False | 2026-07-24 |
| Claude Opus 5 (High) | 48.121918 | high | False | 2026-07-24 |
| Claude Opus 5 (Low) | 39.354336 | low | False | 2026-07-24 |
| Claude Opus 5 (Medium) | 44.825327 | medium | False | 2026-07-24 |
| Claude Opus 5 (Xhigh) | 49.677355 | xhigh | False | 2026-07-24 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-5.5

- 名称/種類: Claude Opus 5.5 / language
- リリース日/Unix秒: 2026-09-22 / 1790035200
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, fast, file-input, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000004","output":"0.00002","input_cache_read":"0.0000002","input_cache_write":"0.000005","web_search":"10","fast":{"input":"0.000008","output":"0.00004","input_cache_read":"0.0000004","input_cache_write":"0.00001"},"regional":{"eu":{"input":"0.0000044","output":"0.000022","input_cache_read":"0.00000022","input_cache_write":"0.0000055"},"us":{"input":"0.0000044","output":"0.000022","input_cache_read":"0.00000022","input_cache_write":"0.0000055","fast":{"input":"0.0000088","output":"0.000044","input_cache_read":"0.00000044","input_cache_write":"0.000011"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-5-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 5.5 (Max, Default Fallback) | 57.622370 | max | False | 2026-09-22 |
| Claude Opus 5.5 (High, Default Fallback) | 53.583196 | high | False | 2026-09-22 |
| Claude Opus 5.5 (Low, Default Fallback) | 42.307778 | low | False | 2026-09-22 |
| Claude Opus 5.5 (Medium, Default Fallback) | 51.243493 | medium | False | 2026-09-22 |
| Claude Opus 5.5 (Xhigh, Default Fallback) | 55.987351 | xhigh | False | 2026-09-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-opus-5.5-fast

- 名称/種類: Claude Opus 5.5 (Fast) / language
- リリース日/Unix秒: 2026-09-22 / 1790035200
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, fast, file-input, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000008","output":"0.00004","input_cache_read":"0.0000004","input_cache_write":"0.00001","web_search":"10","regional":{"us":{"input":"0.0000088","output":"0.000044","input_cache_read":"0.00000044","input_cache_write":"0.000011"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / Auto価格帯上限超過
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-opus-5-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Opus 5.5 (Max, Default Fallback) | 57.622370 | max | False | 2026-09-22 |
| Claude Opus 5.5 (High, Default Fallback) | 53.583196 | high | False | 2026-09-22 |
| Claude Opus 5.5 (Low, Default Fallback) | 42.307778 | low | False | 2026-09-22 |
| Claude Opus 5.5 (Medium, Default Fallback) | 51.243493 | medium | False | 2026-09-22 |
| Claude Opus 5.5 (Xhigh, Default Fallback) | 55.987351 | xhigh | False | 2026-09-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-sonnet-4

- 名称/種類: Claude Sonnet 4 / language
- リリース日/Unix秒: 2025-05-22 / 1747872000
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, explicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "budget_tokens", "min": 1024}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000003","input_tiers":[{"cost":"0.000003","min":0,"max":200001},{"cost":"0.000006","min":200001}],"output":"0.000015","output_tiers":[{"cost":"0.000015","min":0,"max":200001},{"cost":"0.0000225","min":200001}],"input_cache_read":"0.0000003","input_cache_read_tiers":[{"cost":"0.0000003","min":0,"max":200001},{"cost":"0.0000006","min":200001}],"input_cache_write":"0.00000375","input_cache_write_tiers":[{"cost":"0.00000375","min":0,"max":200001},{"cost":"0.0000075","min":200001}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-4-sonnet)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude 4 Sonnet (Non-reasoning) | 16.612441 | none | True | 2025-05-22 |
| Claude 4 Sonnet (Reasoning) | 18.918325 | 未特定 | True | 2025-05-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-sonnet-4.5

- 名称/種類: Claude Sonnet 4.5 / language
- リリース日/Unix秒: 2025-09-29 / 1759104000
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "budget_tokens", "min": 1024}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000003","input_tiers":[{"cost":"0.000003","min":0,"max":200001},{"cost":"0.000006","min":200001}],"output":"0.000015","output_tiers":[{"cost":"0.000015","min":0,"max":200001},{"cost":"0.0000225","min":200001}],"input_cache_read":"0.0000003","input_cache_read_tiers":[{"cost":"0.0000003","min":0,"max":200001},{"cost":"0.0000006","min":200001}],"input_cache_write":"0.00000375","input_cache_write_tiers":[{"cost":"0.00000375","min":0,"max":200001},{"cost":"0.0000075","min":200001}],"web_search":"10","regional":{"eu":{"input":"0.0000033","input_tiers":[{"cost":"0.0000033","min":0,"max":200001},{"cost":"0.0000066","min":200001}],"output":"0.0000165","output_tiers":[{"cost":"0.0000165","min":0,"max":200001},{"cost":"0.00002475","min":200001}],"input_cache_read":"0.00000033","input_cache_read_tiers":[{"cost":"0.00000033","min":0,"max":200001},{"cost":"0.00000066","min":200001}],"input_cache_write":"0.000004125","input_cache_write_tiers":[{"cost":"0.000004125","min":0,"max":200001},{"cost":"0.00000825","min":200001}]},"us":{"input":"0.0000033","input_tiers":[{"cost":"0.0000033","min":0,"max":200001},{"cost":"0.0000066","min":200001}],"output":"0.0000165","output_tiers":[{"cost":"0.0000165","min":0,"max":200001},{"cost":"0.00002475","min":200001}],"input_cache_read":"0.00000033","input_cache_read_tiers":[{"cost":"0.00000033","min":0,"max":200001},{"cost":"0.00000066","min":200001}],"input_cache_write":"0.000004125","input_cache_write_tiers":[{"cost":"0.000004125","min":0,"max":200001},{"cost":"0.00000825","min":200001}]}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-4-5-sonnet)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude 4.5 Sonnet (Non-reasoning) | 19.343653 | none | True | 2025-09-29 |
| Claude 4.5 Sonnet (Reasoning) | 20.666194 | 未特定 | False | 2025-09-29 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-sonnet-4.6

- 名称/種類: Claude Sonnet 4.6 / language
- リリース日/Unix秒: 2026-02-17 / 1771286400
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, explicit-caching, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000003","output":"0.000015","input_cache_read":"0.0000003","input_cache_write":"0.00000375","web_search":"10","regional":{"eu":{"input":"0.0000033","output":"0.0000165","input_cache_read":"0.00000033","input_cache_write":"0.000004125"},"us":{"input":"0.0000033","output":"0.0000165","input_cache_read":"0.00000033","input_cache_write":"0.000004125"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-sonnet-4-6)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Sonnet 4.6 (Non-reasoning, High) | 24.686930 | none | True | 2026-02-17 |
| Claude Sonnet 4.6 (Max) | 30.057561 | max | False | 2026-02-17 |
| Claude Sonnet 4.6 (Non-reasoning, Low) | 23.303501 | none | True | 2026-02-17 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-sonnet-5

- 名称/種類: Claude Sonnet 5 / language
- リリース日/Unix秒: 2026-06-29 / 1782691200
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, explicit-caching, file-input, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.00001","input_cache_read":"0.0000002","input_cache_write":"0.0000025","web_search":"10","regional":{"eu":{"input":"0.0000022","output":"0.000011","input_cache_read":"0.00000022","input_cache_write":"0.00000275"},"us":{"input":"0.0000022","output":"0.000011","input_cache_read":"0.00000022","input_cache_write":"0.00000275"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-sonnet-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Sonnet 5 (Max) | 38.163871 | max | False | 2026-06-30 |
| Claude Sonnet 5 (High) | 31.662325 | high | False | 2026-06-30 |
| Claude Sonnet 5 (Low) | 24.263839 | low | False | 2026-06-30 |
| Claude Sonnet 5 (Medium) | 28.053147 | medium | False | 2026-06-30 |
| Claude Sonnet 5 (Non-reasoning, High) | 23.200000 | none | True | 2026-06-30 |
| Claude Sonnet 5 (Xhigh) | 34.384212 | xhigh | False | 2026-06-30 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### anthropic/claude-sonnet-5.5

- 名称/種類: Claude Sonnet 5.5 / language
- リリース日/Unix秒: 2026-09-28 / 1790553600
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.00001","input_cache_read":"0.0000001","input_cache_write":"0.0000025","web_search":"10","regional":{"eu":{"input":"0.0000022","output":"0.000011","input_cache_read":"0.00000011","input_cache_write":"0.00000275"},"us":{"input":"0.0000022","output":"0.000011","input_cache_read":"0.00000011","input_cache_write":"0.00000275"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/claude-sonnet-5-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Claude Sonnet 5.5 (Max, Default Fallback) | 56.000129 | max | False | 2026-09-28 |
| Claude Sonnet 5.5 (High, Default Fallback) | 46.753353 | high | False | 2026-09-28 |
| Claude Sonnet 5.5 (Low, Default Fallback) | 35.868159 | low | False | 2026-09-28 |
| Claude Sonnet 5.5 (Medium, Default Fallback) | 40.838652 | medium | False | 2026-09-28 |
| Claude Sonnet 5.5 (Xhigh, Default Fallback) | 51.895554 | xhigh | False | 2026-09-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### arcee-ai/trinity-large-thinking

- 名称/種類: Trinity Large Thinking / language
- リリース日/Unix秒: 2026-04-01 / 1775001600
- 文脈/最大出力: 262100 / 80000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.0000008"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/trinity-large-thinking)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Trinity Large Thinking | 10.824243 | 未特定 | False | 2026-04-01 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-2-flex

- 名称/種類: FLUX.2 [flex] / image
- リリース日/Unix秒: 2025-11-25 / 1764028800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-2-klein-4b

- 名称/種類: FLUX.2 [klein] 4B / image
- リリース日/Unix秒: 2026-01-15 / 1768435200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-2-klein-9b

- 名称/種類: FLUX.2 [klein] 9B / image
- リリース日/Unix秒: 2026-01-15 / 1768435200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-2-max

- 名称/種類: FLUX.2 [max] / image
- リリース日/Unix秒: 2025-12-16 / 1765843200
- 文脈/最大出力: 67300 / 67300
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-2-pro

- 名称/種類: FLUX.2 [pro] / image
- リリース日/Unix秒: 2025-11-25 / 1764028800
- 文脈/最大出力: 67300 / 67300
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-3-image

- 名称/種類: FLUX 3 Image / image
- リリース日/Unix秒: 2026-10-05 / 1791158400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.024","image_dimension_quality_pricing":[{"size":"768x768","cost":"0.0205"},{"size":"1024x1024","cost":"0.024"},{"size":"1536x1536","cost":"0.035"},{"size":"2048x2048","cost":"0.05"},{"size":"4096x4096","cost":"0.3035"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-3-video

- 名称/種類: Flux 3 / video
- リリース日/Unix秒: 2026-08-04 / 1785801600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: video-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-kontext-max

- 名称/種類: FLUX.1 Kontext Max / image
- リリース日/Unix秒: 2025-05-29 / 1748476800
- 文脈/最大出力: 512 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.08"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-kontext-pro

- 名称/種類: FLUX.1 Kontext Pro / image
- リリース日/Unix秒: 2025-05-29 / 1748476800
- 文脈/最大出力: 512 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.04"}`
- データ保持/学習利用申告: zdr=none, no_training=some
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-pro-1.0-fill

- 名称/種類: FLUX.1 Fill [pro] / image
- リリース日/Unix秒: 2024-10-01 / 1727740800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.05"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-pro-1.1

- 名称/種類: FLUX1.1 [pro] / image
- リリース日/Unix秒: 2024-10-02 / 1727827200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.04"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bfl/flux-pro-1.1-ultra

- 名称/種類: FLUX1.1 [pro] Ultra / image
- リリース日/Unix秒: 2024-11-01 / 1730419200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.06"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seed-1.6

- 名称/種類: Seed 1.6 / language
- リリース日/Unix秒: 2025-09-01 / 1756684800
- 文脈/最大出力: 256000 / 32000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000025","input_tiers":[{"cost":"0.00000025","min":0,"max":128001},{"cost":"0.0000005","min":128001}],"output":"0.000002","output_tiers":[{"cost":"0.000002","min":0,"max":128001},{"cost":"0.000004","min":128001}],"input_cache_read":"0.00000005"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seed-1.8

- 名称/種類: Bytedance Seed 1.8 / language
- リリース日/Unix秒: 2025-09-01 / 1756684800
- 文脈/最大出力: 256000 / 64000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000025","input_tiers":[{"cost":"0.00000025","min":0,"max":128001},{"cost":"0.0000005","min":128001}],"output":"0.000002","output_tiers":[{"cost":"0.000002","min":0,"max":128001},{"cost":"0.000004","min":128001}],"input_cache_read":"0.00000005"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seed-2.1-turbo

- 名称/種類: Seed 2.1 Turbo / language
- リリース日/Unix秒: 2026-06-23 / 1782172800
- 文脈/最大出力: 262144 / 262144
- モダリティ: {"input": ["text", "image", "video"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, video-input, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.0000025","input_cache_read":"0.0000001"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedance-2.0

- 名称/種類: Seedance 2.0 / video
- リリース日/Unix秒: 2026-04-14 / 1776124800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "image"], "output": ["video"]}
- 全機能タグ: video-generation, vision
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_token_pricing":{"tiers":[{"resolution":"480p","no_video_input":{"cost_per_million_tokens":"7"},"with_video_input":{"cost_per_million_tokens":"4.3"}},{"resolution":"720p","no_video_input":{"cost_per_million_tokens":"7"},"with_video_input":{"cost_per_million_tokens":"4.3"}},{"resolution":"1080p","no_video_input":{"cost_per_million_tokens":"7.7"},"with_video_input":{"cost_per_million_tokens":"4.7"}},{"resolution":"4k","no_video_input":{"cost_per_million_tokens":"4"},"with_video_input":{"cost_per_million_tokens":"2.4"}}],"notes":"Pricing varies based on whether the input contains video. When video is included in the input, all tokens are billed at the reduced rate. Token count includes both input and output video and is subject to minimum token floors based on output duration."}}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedance-2.0-fast

- 名称/種類: Seedance 2.0 Fast / video
- リリース日/Unix秒: 2026-04-14 / 1776124800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "image"], "output": ["video"]}
- 全機能タグ: vision, video-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_token_pricing":{"tiers":[{"resolution":"480p","no_video_input":{"cost_per_million_tokens":"5.6"},"with_video_input":{"cost_per_million_tokens":"3.3"}},{"resolution":"720p","no_video_input":{"cost_per_million_tokens":"5.6"},"with_video_input":{"cost_per_million_tokens":"3.3"}}],"notes":"Pricing varies based on whether the input contains video. When video is included in the input, all tokens are billed at the reduced rate. Token count includes both input and output video and is subject to minimum token floors based on output duration."}}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / Fast別ID：基本版の点を継承しない / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedance-2.0-mini

- 名称/種類: Seedance 2.0 Mini / video
- リリース日/Unix秒: 2026-06-22 / 1782086400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "image"], "output": ["video"]}
- 全機能タグ: vision, video-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_token_pricing":{"tiers":[{"resolution":"480p","no_video_input":{"cost_per_million_tokens":"3.5"},"with_video_input":{"cost_per_million_tokens":"2.1"}},{"resolution":"720p","no_video_input":{"cost_per_million_tokens":"3.5"},"with_video_input":{"cost_per_million_tokens":"2.1"}}],"notes":"Pricing varies based on whether the input contains video. When video is included in the input, all tokens are billed at the reduced rate. Token count includes both input and output video and is subject to minimum token floors based on output duration."}}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedance-2.5

- 名称/種類: Seedance 2.5 / video
- リリース日/Unix秒: 2026-08-07 / 1786060800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_token_pricing":{"tiers":[{"resolution":"480p","no_video_input":{"cost_per_million_tokens":"10.7"},"with_video_input":{"cost_per_million_tokens":"6.4"}},{"resolution":"720p","no_video_input":{"cost_per_million_tokens":"10.7"},"with_video_input":{"cost_per_million_tokens":"6.4"}},{"resolution":"1080p","no_video_input":{"cost_per_million_tokens":"11.7"},"with_video_input":{"cost_per_million_tokens":"7"}}],"notes":"Pricing varies based on whether the input contains video. When video is included in the input, all tokens are billed at the reduced rate. Token count includes both input and output video and is subject to minimum token floors based on output duration."}}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedance-v1.0-pro

- 名称/種類: Seedance v1.0 Pro / video
- リリース日/Unix秒: 2025-06-11 / 1749600000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: video-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","cost_per_second":"0.0243"},{"resolution":"720p","cost_per_second":"0.0515"},{"resolution":"1080p","cost_per_second":"0.1224"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedance-v1.0-pro-fast

- 名称/種類: Seedance v1.0 Pro Fast / video
- リリース日/Unix秒: 2025-10-24 / 1761264000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: video-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","cost_per_second":"0.0097"},{"resolution":"720p","cost_per_second":"0.0206"},{"resolution":"1080p","cost_per_second":"0.049"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / Fast別ID：基本版の点を継承しない / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedance-v1.5-pro

- 名称/種類: Seedance v1.5 Pro / video
- リリース日/Unix秒: 2025-12-16 / 1765843200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: video-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","audio":false,"cost_per_second":"0.0121"},{"resolution":"480p","audio":true,"cost_per_second":"0.0241"},{"resolution":"720p","audio":false,"cost_per_second":"0.0259"},{"resolution":"720p","audio":true,"cost_per_second":"0.0518"},{"resolution":"1080p","audio":false,"cost_per_second":"0.0583"},{"resolution":"1080p","audio":true,"cost_per_second":"0.1166"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedream-4.0

- 名称/種類: Seedream 4.0 / image
- リリース日/Unix秒: 2025-09-09 / 1757376000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.03"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedream-4.5

- 名称/種類: Seedream 4.5 / image
- リリース日/Unix秒: 2025-12-03 / 1764720000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.04"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedream-5.0-lite

- 名称/種類: Seedream 5.0 Lite / image
- リリース日/Unix秒: 2026-02-13 / 1770940800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.035"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### bytedance/seedream-5.0-pro

- 名称/種類: Seedream 5.0 Pro / image
- リリース日/Unix秒: 2026-07-11 / 1783728000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000000003","image":"0.035"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### cohere/command-a

- 名称/種類: Command A / language
- リリース日/Unix秒: 2025-03-13 / 1741824000
- 文脈/最大出力: 256000 / 8000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000025","output":"0.00001"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/command-a)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Command A | 6.958199 | none | True | 2025-03-13 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### cohere/embed-v4.0

- 名称/種類: Embed v4.0 / embedding
- リリース日/Unix秒: 2025-04-15 / 1744675200
- 文脈/最大出力: 128000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000012","regional":{"us":{"input":"0.00000012"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### cohere/embed-v5.0-fast

- 名称/種類: Embed 5 Fast / embedding
- リリース日/Unix秒: 2026-09-30 / 1790726400
- 文脈/最大出力: 128000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000008"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / Fast別ID：基本版の点を継承しない / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### cohere/embed-v5.0-pro

- 名称/種類: Embed 5 Pro / embedding
- リリース日/Unix秒: 2026-09-30 / 1790726400
- 文脈/最大出力: 128000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000012"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### cohere/rerank-v3.5

- 名称/種類: Cohere Rerank 3.5 / reranking
- リリース日/Unix秒: 2024-12-02 / 1733097600
- 文脈/最大出力: 4096 / 4096
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：reranking / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### cohere/rerank-v4-fast

- 名称/種類: Cohere Rerank 4 Fast / reranking
- リリース日/Unix秒: 2025-12-11 / 1765411200
- 文脈/最大出力: 32000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：reranking / Fast別ID：基本版の点を継承しない / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### cohere/rerank-v4-pro

- 名称/種類: Cohere Rerank 4 Pro / reranking
- リリース日/Unix秒: 2025-12-11 / 1765411200
- 文脈/最大出力: 32000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：reranking / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### convaiinnovations/laya

- 名称/種類: Laya / evaluation
- リリース日/Unix秒: 2026-10-01 / 1790812800
- 文脈/最大出力: 8192 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: free
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0","output":"0"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：evaluation / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### convaiinnovations/laya-free

- 名称/種類: Laya (Free) / evaluation
- リリース日/Unix秒: 2026-10-01 / 1790812800
- 文脈/最大出力: 8192 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: free
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0","output":"0"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：evaluation / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-r1

- 名称/種類: DeepSeek-R1 / language
- リリース日/Unix秒: 2025-01-20 / 1737331200
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000135","output":"0.0000054","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-r1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek R1 0528 (May '25) | 13.122057 | 未特定 | True | 2025-05-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v3.1

- 名称/種類: DeepSeek V3.1 / language
- リリース日/Unix秒: 2025-08-21 / 1755734400
- 文脈/最大出力: 163840 / 128000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.00000095","input_cache_read":"0.00000013","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v3-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V3.1 (Non-reasoning) | 13.707851 | none | True | 2025-08-21 |
| DeepSeek V3.1 (Reasoning) | 13.475812 | 未特定 | True | 2025-08-21 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v3.2

- 名称/種類: DeepSeek V3.2 / language
- リリース日/Unix秒: 2025-12-01 / 1764547200
- 文脈/最大出力: 128000 / 8000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000062","output":"0.00000185","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v3-2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V3.2 (Non-reasoning) | 16.043538 | none | True | 2025-12-01 |
| DeepSeek V3.2 (Reasoning) | 21.486790 | 未特定 | True | 2025-12-01 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v3.2-thinking

- 名称/種類: DeepSeek V3.2 Thinking / language
- リリース日/Unix秒: 2025-12-01 / 1764547200
- 文脈/最大出力: 128000 / 8000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000062","output":"0.00000185","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v3-2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V3.2 (Non-reasoning) | 16.043538 | none | True | 2025-12-01 |
| DeepSeek V3.2 (Reasoning) | 21.486790 | 未特定 | True | 2025-12-01 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v4-flash

- 名称/種類: DeepSeek V4 Flash / language
- リリース日/Unix秒: 2026-04-23 / 1776902400
- 文脈/最大出力: 1000000 / 384000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000013","output":"0.00000026","input_cache_read":"0.000000028","varies_by_provider":true,"regional":{"us":{"input":"0.00000013","output":"0.00000026","input_cache_read":"0.000000028"}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v4-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V4 Flash 0731 (Max) | 34.330513 | max | False | 2026-07-31 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v4-flash-0731

- 名称/種類: DeepSeek V4 Flash 0731 / language
- リリース日/Unix秒: 2026-04-23 / 1776902400
- 文脈/最大出力: 1000000 / 384000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000000076","output":"0.000000153","input_cache_read":"0.000000014","varies_by_provider":true,"regional":{"us":{"input":"0.00000013","output":"0.00000026","input_cache_read":"0.000000028"}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v4-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V4 Flash 0731 (Max) | 34.330513 | max | False | 2026-07-31 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v4-flash-vision-exp

- 名称/種類: DeepSeek V4 Flash Vision Exp / language
- リリース日/Unix秒: 2026-08-21 / 1787270400
- 文脈/最大出力: 1048576 / 1048576
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002156","output":"0.0000006468","input_cache_read":"0.0000000068","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v4-pro

- 名称/種類: DeepSeek V4 Pro / language
- リリース日/Unix秒: 2026-04-23 / 1776902400
- 文脈/最大出力: 1000000 / 384000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "high", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000066","output":"0.00000198","input_cache_read":"0.000000022","peak_pricing":{"multiplier":2,"windows":[{"start_minute_utc":60,"end_minute_utc":240,"days_of_week":[1,2,3,4,5]},{"start_minute_utc":360,"end_minute_utc":600,"days_of_week":[1,2,3,4,5]}],"holiday_calendar":"cn"},"varies_by_provider":true,"regional":{"us":{"input":"0.00000132","output":"0.00000396","input_cache_read":"0.000000132"}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v4-pro)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V4 Pro 0813 (Max) | 35.996779 | max | False | 2026-08-13 |
| DeepSeek V4 Pro 0813 (Non-reasoning) | 20.360510 | none | False | 2026-08-13 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v4-pro-0813

- 名称/種類: DeepSeek V4 Pro 0813 / language
- リリース日/Unix秒: 2026-08-12 / 1786492800
- 文脈/最大出力: 1000000 / 384000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "high", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000066","output":"0.00000198","input_cache_read":"0.000000066","peak_pricing":{"multiplier":2,"windows":[{"start_minute_utc":0,"end_minute_utc":840}]},"varies_by_provider":true,"regional":{"us":{"input":"0.00000132","output":"0.00000396","input_cache_read":"0.000000132"}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v4-pro)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V4 Pro 0813 (Max) | 35.996779 | max | False | 2026-08-13 |
| DeepSeek V4 Pro 0813 (Non-reasoning) | 20.360510 | none | False | 2026-08-13 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v4.1-flash

- 名称/種類: DeepSeek V4.1 Flash / language
- リリース日/Unix秒: 2026-09-08 / 1788825600
- 文脈/最大出力: 1048576 / 32768
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "high", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.000000007","varies_by_provider":true,"fast":{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.000000006"},"regional":{"us":{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.000000007"}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v4-1-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V4.1 Flash (Max) | 39.456167 | max | False | 2026-09-10 |
| DeepSeek V4.1 Flash (Non-reasoning) | 24.673359 | none | False | 2026-09-10 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### deepseek/deepseek-v4.1-flash-fast

- 名称/種類: DeepSeek V4.1 Flash Fast / language
- リリース日/Unix秒: 2026-09-29 / 1790640000
- 文脈/最大出力: 1048576 / 1000000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, structured-output, tool-use, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.000000006"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/deepseek-v4-1-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| DeepSeek V4.1 Flash (Max) | 39.456167 | max | False | 2026-09-10 |
| DeepSeek V4.1 Flash (Non-reasoning) | 24.673359 | none | False | 2026-09-10 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### fireworks/ember-1

- 名称/種類: Ember-1 / language
- リリース日/Unix秒: 2026-09-23 / 1790121600
- 文脈/最大出力: 1048576 / 1048576
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["low", "medium", "high"]}, {"type": "budget_tokens", "min": 1024}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000003","output":"0.000015","input_cache_read":"0.0000003"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### fish-audio/s1

- 名称/種類: S1 / speech
- リリース日/Unix秒: 2025-10-20 / 1760918400
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000015","speech_input_character_cost":"0.000015"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### fish-audio/s2-pro

- 名称/種類: S2 Pro / speech
- リリース日/Unix秒: 2026-03-09 / 1773014400
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000015","speech_input_character_cost":"0.000015"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### fish-audio/s2.1-pro

- 名称/種類: S2.1 Pro / speech
- リリース日/Unix秒: 2026-07-28 / 1785196800
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000015","speech_input_character_cost":"0.000015"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### fish-audio/transcribe-1

- 名称/種類: Transcribe-1 / transcription
- リリース日/Unix秒: 2026-03-01 / 1772323200
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000000001","transcription_duration_cost_per_second":"0.0001"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-2.5-flash

- 名称/種類: Gemini 2.5 Flash / language
- リリース日/Unix秒: 2025-03-20 / 1742428800
- 文脈/最大出力: 1000000 / 65535
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, web-search, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.00000003","web_search":"35","maps_search":"25","service_tiers":{"priority":{"input":"0.00000054","output":"0.0000045","input_cache_read":"0.000000054"},"flex":{"input":"0.00000015","output":"0.00000125"}},"regional":{"eu":{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.00000003"},"us":{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.00000003"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-2-5-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 2.5 Flash (Non-reasoning) | 9.851282 | none | True | 2025-05-20 |
| Gemini 2.5 Flash (Reasoning) | 13.106044 | 未特定 | True | 2025-05-20 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-2.5-flash-image

- 名称/種類: Nano Banana (Gemini 2.5 Flash Image) / language
- リリース日/Unix秒: 2025-08-26 / 1756166400
- 文脈/最大出力: 32768 / 65535
- モダリティ: {"input": ["text", "image"], "output": ["text", "image"]}
- 全機能タグ: image-generation, web-search, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.00000003","image_dimension_quality_pricing":[{"size":"default","cost":"0.039"}],"maps_search":"25","service_tiers":{"flex":{"input":"0.00000015","output":"0.00000125"}},"regional":{"eu":{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.00000003"},"us":{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.00000003"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-2.5-flash-lite

- 名称/種類: Gemini 2.5 Flash Lite / language
- リリース日/Unix秒: 2025-06-17 / 1750118400
- 文脈/最大出力: 1048576 / 65535
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, web-search, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000001","output":"0.0000004","input_cache_read":"0.00000001","web_search":"35","maps_search":"25","service_tiers":{"priority":{"input":"0.00000018","output":"0.00000072","input_cache_read":"0.000000018"},"flex":{"input":"0.00000005","output":"0.0000002"}},"regional":{"eu":{"input":"0.0000001","output":"0.0000004","input_cache_read":"0.00000001"},"us":{"input":"0.0000001","output":"0.0000004","input_cache_read":"0.00000001"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-2-5-flash-lite)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 2.5 Flash-Lite (Non-reasoning) | 6.668531 | none | True | 2025-06-17 |
| Gemini 2.5 Flash-Lite (Reasoning) | 8.545637 | 未特定 | True | 2025-06-17 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-2.5-pro

- 名称/種類: Gemini 2.5 Pro / language
- リリース日/Unix秒: 2025-03-20 / 1742428800
- 文脈/最大出力: 1048576 / 65535
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, web-search, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}, {"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.00001","output_tiers":[{"cost":"0.00001","min":0,"max":200001},{"cost":"0.000015","min":200001}],"input_cache_read":"0.000000125","input_cache_read_tiers":[{"cost":"0.000000125","min":0,"max":200001},{"cost":"0.00000025","min":200001}],"web_search":"35","maps_search":"25","service_tiers":{"priority":{"input":"0.00000225","output":"0.000018","input_cache_read":"0.000000225","long_context":{"threshold":200001,"input":"0.0000045","output":"0.000027","input_cache_read":"0.00000045"}},"flex":{"input":"0.000000625","output":"0.000005","long_context":{"threshold":200001,"input":"0.00000125","output":"0.0000075"}}},"regional":{"eu":{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.00001","output_tiers":[{"cost":"0.00001","min":0,"max":200001},{"cost":"0.000015","min":200001}],"input_cache_read":"0.000000125","input_cache_read_tiers":[{"cost":"0.000000125","min":0,"max":200001},{"cost":"0.00000025","min":200001}]},"us":{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.00001","output_tiers":[{"cost":"0.00001","min":0,"max":200001},{"cost":"0.000015","min":200001}],"input_cache_read":"0.000000125","input_cache_read_tiers":[{"cost":"0.000000125","min":0,"max":200001},{"cost":"0.00000025","min":200001}]}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-2-5-pro)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 2.5 Pro | 16.077896 | 未特定 | False | 2025-06-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3-flash

- 名称/種類: Gemini 3 Flash / language
- リリース日/Unix秒: 2025-12-17 / 1765929600
- 文脈/最大出力: 1000000 / 65000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, file-input, vision, tool-use, web-search, implicit-caching, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000005","input_tiers":[{"cost":"0.0000005","min":0,"max":200001},{"cost":"0.0000005","min":200001}],"output":"0.000003","output_tiers":[{"cost":"0.000003","min":0,"max":200001},{"cost":"0.000003","min":200001}],"input_cache_read":"0.00000005","input_cache_read_tiers":[{"cost":"0.00000005","min":0,"max":200001},{"cost":"0.00000005","min":200001}],"web_search":"14","maps_search":"14","service_tiers":{"priority":{"input":"0.0000009","output":"0.0000054","input_cache_read":"0.00000009"},"flex":{"input":"0.00000025","output":"0.0000015"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-3-flash-preview)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 3 Flash Preview (Non-reasoning) | 17.933685 | none | True | 2025-12-17 |
| Gemini 3 Flash Preview (Reasoning) | 26.327207 | 未特定 | True | 2025-12-17 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3-pro-image

- 名称/種類: Nano Banana Pro (Gemini 3 Pro Image) / language
- リリース日/Unix秒: 2025-09-01 / 1756684800
- 文脈/最大出力: 65536 / 32768
- モダリティ: {"input": ["text", "image"], "output": ["text", "image"]}
- 全機能タグ: image-generation, web-search, implicit-caching, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000012","input_cache_read":"0.0000002","image_dimension_quality_pricing":[{"size":"1K","cost":"0.1344"},{"size":"2K","cost":"0.1344"},{"size":"4K","cost":"0.24"},{"size":"default","cost":"0.1344"}],"web_search":"14","maps_search":"14","service_tiers":{"flex":{"input":"0.000001","output":"0.000006"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.1-flash-image

- 名称/種類: Gemini 3.1 Flash Image (Nano Banana 2) / language
- リリース日/Unix秒: 2026-05-28 / 1779926400
- 文脈/最大出力: 131072 / 32768
- モダリティ: {"input": ["text", "image"], "output": ["text", "image"]}
- 全機能タグ: image-generation, implicit-caching, reasoning, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.000003","input_cache_read":"0.00000005","image_dimension_quality_pricing":[{"size":"512","cost":"0.045"},{"size":"1K","cost":"0.067"},{"size":"2K","cost":"0.101"},{"size":"4K","cost":"0.151"},{"size":"default","cost":"0.067"}],"web_search":"14","maps_search":"14"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.1-flash-image-preview

- 名称/種類: Gemini 3.1 Flash Image Preview (Nano Banana 2) / language
- リリース日/Unix秒: 2026-02-26 / 1772064000
- 文脈/最大出力: 131072 / 32768
- モダリティ: {"input": ["text", "image"], "output": ["text", "image"]}
- 全機能タグ: image-generation, implicit-caching, reasoning, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.000003","input_cache_read":"0.00000005","image_dimension_quality_pricing":[{"size":"512","cost":"0.045"},{"size":"1K","cost":"0.067"},{"size":"2K","cost":"0.101"},{"size":"4K","cost":"0.151"},{"size":"default","cost":"0.067"}],"web_search":"14","service_tiers":{"flex":{"input":"0.00000025","output":"0.0000015"}}}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.1-flash-lite

- 名称/種類: Gemini 3.1 Flash Lite / language
- リリース日/Unix秒: 2026-05-07 / 1778112000
- 文脈/最大出力: 1000000 / 65000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.0000015","input_cache_read":"0.00000003","web_search":"14","maps_search":"14","service_tiers":{"priority":{"input":"0.00000045","output":"0.0000027","input_cache_read":"0.000000045"},"flex":{"input":"0.000000125","output":"0.00000075","input_cache_read":"0.0000000125"}},"regional":{"eu":{"input":"0.000000275","output":"0.00000165","input_cache_read":"0.0000000275"},"us":{"input":"0.000000275","output":"0.00000165","input_cache_read":"0.0000000275"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-3-1-flash-lite)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 3.1 Flash-Lite | 15.554289 | high | False | 2026-03-03 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.1-flash-lite-image

- 名称/種類: Gemini 3.1 Flash Lite Image (Nano Banana 2 Lite) / language
- リリース日/Unix秒: 2026-06-30 / 1782777600
- 文脈/最大出力: 65536 / 4096
- モダリティ: {"input": ["text", "image"], "output": ["text", "image"]}
- 全機能タグ: image-generation, implicit-caching, reasoning, vision, web-search
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.0000015","input_cache_read":"0.00000003","image_dimension_quality_pricing":[{"size":"default","cost":"0.034"},{"size":"1K","cost":"0.034"}],"web_search":"14","maps_search":"14"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.1-pro-preview

- 名称/種類: Gemini 3.1 Pro Preview / language
- リリース日/Unix秒: 2026-02-19 / 1771459200
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, tool-use, reasoning, vision, web-search, implicit-caching, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","input_tiers":[{"cost":"0.000002","min":0,"max":200001},{"cost":"0.000004","min":200001}],"output":"0.000012","output_tiers":[{"cost":"0.000012","min":0,"max":200001},{"cost":"0.000018","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":200001},{"cost":"0.0000004","min":200001}],"web_search":"14","maps_search":"14","service_tiers":{"priority":{"input":"0.0000036","output":"0.0000216","input_cache_read":"0.00000036","long_context":{"threshold":200001,"input":"0.0000072","output":"0.0000324","input_cache_read":"0.00000072"}},"flex":{"input":"0.000001","output":"0.000006","long_context":{"threshold":200001,"input":"0.000002","output":"0.000009"}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：Preview・実験版 / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-3-1-pro-preview)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 3.1 Pro Preview | 29.718566 | 未特定 | False | 2026-02-19 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.5-flash

- 名称/種類: Gemini 3.5 Flash / language
- リリース日/Unix秒: 2026-05-19 / 1779148800
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, file-input, vision, tool-use, web-search, implicit-caching, video-input, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000015","output":"0.000009","input_cache_read":"0.00000015","web_search":"14","maps_search":"14","service_tiers":{"priority":{"input":"0.0000027","output":"0.0000162","input_cache_read":"0.00000027"},"flex":{"input":"0.00000075","output":"0.0000045","input_cache_read":"0.00000008"}},"regional":{"eu":{"input":"0.00000165","output":"0.0000099","input_cache_read":"0.000000165"},"us":{"input":"0.00000165","output":"0.0000099","input_cache_read":"0.000000165"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-3-5-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 3.5 Flash (High) | 32.598328 | high | False | 2026-05-19 |
| Gemini 3.5 Flash (Medium) | 33.632587 | medium | True | 2026-05-19 |
| Gemini 3.5 Flash (Minimal) | 23.848791 | none | True | 2026-05-19 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.5-flash-lite

- 名称/種類: Gemini 3.5 Flash Lite / language
- リリース日/Unix秒: 2026-07-21 / 1784592000
- 文脈/最大出力: 1000000 / 65000
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, web-search, video-input, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000025","input_cache_read":"0.00000003","web_search":"14","maps_search":"14","service_tiers":{"priority":{"input":"0.00000054","output":"0.0000045","input_cache_read":"0.000000054"},"flex":{"input":"0.00000015","output":"0.00000125","input_cache_read":"0.000000015"}},"regional":{"eu":{"input":"0.00000033","output":"0.00000275","input_cache_read":"0.000000033"},"us":{"input":"0.00000033","output":"0.00000275","input_cache_read":"0.000000033"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-3-5-flash-lite)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 3.5 Flash-Lite | 22.168542 | high | False | 2026-07-21 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.5-transcribe

- 名称/種類: Gemini 3.5 Transcribe / transcription
- リリース日/Unix秒: 2026-08-26 / 1787702400
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000012","audio_input_token_cost":"0.000002"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.5-transcribe-live

- 名称/種類: Gemini 3.5 Transcribe Live / transcription
- リリース日/Unix秒: 2026-08-26 / 1787702400
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: websocket-transcription
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000000001","transcription_duration_cost_per_second":"0.00015"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.6-flash

- 名称/種類: Gemini 3.6 Flash / language
- リリース日/Unix秒: 2026-07-21 / 1784592000
- 文脈/最大出力: 1000000 / 64000
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, file-input, tool-use, vision, implicit-caching, web-search, video-input, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000075","output":"0.00000375","input_cache_read":"0.000000075","web_search":"14","maps_search":"14","service_tiers":{"priority":{"input":"0.00000135","output":"0.00000675","input_cache_read":"0.000000135"},"flex":{"input":"0.000000375","output":"0.000001875","input_cache_read":"0.00000004"}},"regional":{"eu":{"input":"0.000000825","output":"0.000004125","input_cache_read":"0.0000000825"},"us":{"input":"0.000000825","output":"0.000004125","input_cache_read":"0.0000000825"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-3-6-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 3.6 Flash (High) | 33.978593 | high | False | 2026-07-21 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.7-flash

- 名称/種類: Gemini 3.7 Flash / language
- リリース日/Unix秒: 2026-08-13 / 1786579200
- 文脈/最大出力: 1000000 / 65535
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, file-input, vision, tool-use, web-search, implicit-caching, video-input, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000075","output":"0.00000375","input_cache_read":"0.000000075","web_search":"14","maps_search":"14","service_tiers":{"flex":{"input":"0.000000375","output":"0.000001875","input_cache_read":"0.0000000375"},"priority":{"input":"0.00000135","output":"0.00000675","input_cache_read":"0.000000135"}},"regional":{"eu":{"input":"0.000000825","output":"0.000004125","input_cache_read":"0.0000000825"},"us":{"input":"0.000000825","output":"0.000004125","input_cache_read":"0.0000000825"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-3-7-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 3.7 Flash (High) | 39.059457 | high | False | 2026-08-13 |
| Gemini 3.7 Flash (Low) | 36.945911 | low | True | 2026-08-13 |
| Gemini 3.7 Flash (Medium) | 39.617752 | medium | True | 2026-08-13 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.8-flash

- 名称/種類: Gemini 3.8 Flash / language
- リリース日/Unix秒: 2026-09-02 / 1788307200
- 文脈/最大出力: 1000000 / 65535
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, file-input, vision, tool-use, web-search, implicit-caching, video-input, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000075","output":"0.00000375","input_cache_read":"0.000000075","web_search":"14","maps_search":"14","service_tiers":{"flex":{"input":"0.000000375","output":"0.000001875","input_cache_read":"0.0000000375"},"priority":{"input":"0.00000135","output":"0.00000675","input_cache_read":"0.000000135"}},"regional":{"eu":{"input":"0.000000825","output":"0.000004125","input_cache_read":"0.0000000825"},"us":{"input":"0.000000825","output":"0.000004125","input_cache_read":"0.0000000825"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemini-3-8-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemini 3.8 Flash (High) | 40.926232 | high | False | 2026-09-02 |
| Gemini 3.8 Flash (Low) | 33.454811 | low | False | 2026-09-02 |
| Gemini 3.8 Flash (Medium) | 39.774019 | medium | False | 2026-09-02 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.8-flash-lite-tts

- 名称/種類: Gemini 3.8 Flash-Lite TTS / speech
- リリース日/Unix秒: 2026-09-23 / 1790121600
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.000006","audio_output_token_cost":"0.000006"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.8-flash-tts

- 名称/種類: Gemini 3.8 Flash TTS / speech
- リリース日/Unix秒: 2026-09-23 / 1790121600
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.000009","audio_output_token_cost":"0.000009"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.8-live

- 名称/種類: Gemini 3.8 Live / realtime
- リリース日/Unix秒: 2026-09-15 / 1789430400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: websocket-realtime
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000075","output":"0.0000045","audio_input_token_cost":"0.000003","audio_output_token_cost":"0.000012"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-3.8-live-extended-thinking

- 名称/種類: Gemini 3.8 Live Extended Thinking / realtime
- リリース日/Unix秒: 2026-09-15 / 1789430400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: websocket-realtime
- 思考制御: [{"type": "effort", "values": ["low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000075","output":"0.0000045","audio_input_token_cost":"0.000003","audio_output_token_cost":"0.000012"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-embedding-001

- 名称/種類: Gemini Embedding 001 / embedding
- リリース日/Unix秒: 2025-05-20 / 1747699200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000015","regional":{"us":{"input":"0.00000015"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-embedding-2

- 名称/種類: Gemini Embedding 2 / embedding
- リリース日/Unix秒: 2026-03-10 / 1773100800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000002","audio_input_token_cost":"0.0000065"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-nano-banana-2.1

- 名称/種類: Gemini Nano Banana 2.1 / language
- リリース日/Unix秒: 2026-10-06 / 1791244800
- 文脈/最大出力: 131072 / 32768
- モダリティ: {"input": ["text", "image"], "output": ["text", "image"]}
- 全機能タグ: image-generation, implicit-caching, reasoning, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["minimal", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000015","output":"0.0000075","input_cache_read":"0.00000015","image_dimension_quality_pricing":[{"size":"1K","cost":"0.0336"},{"size":"2K","cost":"0.0504"},{"size":"4K","cost":"0.1134"},{"size":"default","cost":"0.0336"}],"web_search":"14","maps_search":"14"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemini-omni-flash-preview

- 名称/種類: Gemini Omni Flash Preview / language
- リリース日/Unix秒: 2026-06-30 / 1782777600
- 文脈/最大出力: 1000000 / 57920
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text", "video"]}
- 全機能タグ: file-input, reasoning, vision, video-generation, video-input, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000015","output":"0.000009","audio_input_token_cost":"0.0000015"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemma-4-26b-a4b-it

- 名称/種類: Google Gemma 4 26B A4B / language
- リリース日/Unix秒: 2026-04-02 / 1775088000
- 文脈/最大出力: 262144 / 131072
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, structured-output, implicit-caching
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.0000006","input_cache_read":"0.000000015","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemma-4-26b-a4b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemma 4 26B A4B (Reasoning) | 16.671930 | 未特定 | True | 2026-04-02 |
| Gemma 4 26B A4B (Non-reasoning) | 13.130377 | none | True | 2026-04-02 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/gemma-4-31b-it

- 名称/種類: Gemma 4 31B IT / language
- リリース日/Unix秒: 2026-04-02 / 1775088000
- 文脈/最大出力: 262144 / 131072
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, vision, file-input, reasoning, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000014","output":"0.0000004"}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gemma-4-31b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Gemma 4 31B (Reasoning) | 14.668950 | 未特定 | False | 2026-04-02 |
| Gemma 4 31B (Non-reasoning) | 13.919882 | none | True | 2026-04-02 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/text-embedding-005

- 名称/種類: Text Embedding 005 / embedding
- リリース日/Unix秒: 2024-08-01 / 1722470400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000000025"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/text-multilingual-embedding-002

- 名称/種類: Text Multilingual Embedding 002 / embedding
- リリース日/Unix秒: 2024-03-01 / 1709251200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000000025"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/veo-3.0-fast-generate-001

- 名称/種類: Veo 3.0 Fast Generate / video
- リリース日/Unix秒: 2025-07-31 / 1753920000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","audio":false,"cost_per_second":"0.1"},{"resolution":"720p","audio":true,"cost_per_second":"0.15"},{"resolution":"1080p","audio":false,"cost_per_second":"0.1"},{"resolution":"1080p","audio":true,"cost_per_second":"0.15"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/veo-3.0-generate-001

- 名称/種類: Veo 3.0 / video
- リリース日/Unix秒: 2025-05-20 / 1747699200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","audio":false,"cost_per_second":"0.2"},{"resolution":"720p","audio":true,"cost_per_second":"0.4"},{"resolution":"1080p","audio":false,"cost_per_second":"0.2"},{"resolution":"1080p","audio":true,"cost_per_second":"0.4"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/veo-3.1-fast-generate-001

- 名称/種類: Veo 3.1 Fast Generate / video
- リリース日/Unix秒: 2025-10-15 / 1760486400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","audio":false,"cost_per_second":"0.1"},{"resolution":"720p","audio":true,"cost_per_second":"0.15"},{"resolution":"1080p","audio":false,"cost_per_second":"0.1"},{"resolution":"1080p","audio":true,"cost_per_second":"0.15"},{"resolution":"4k","audio":false,"cost_per_second":"0.3"},{"resolution":"4k","audio":true,"cost_per_second":"0.35"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/veo-3.1-generate-001

- 名称/種類: Veo 3.1 / video
- リリース日/Unix秒: 2025-10-15 / 1760486400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","audio":false,"cost_per_second":"0.2"},{"resolution":"720p","audio":true,"cost_per_second":"0.4"},{"resolution":"1080p","audio":false,"cost_per_second":"0.2"},{"resolution":"1080p","audio":true,"cost_per_second":"0.4"},{"resolution":"4k","audio":false,"cost_per_second":"0.4"},{"resolution":"4k","audio":true,"cost_per_second":"0.6"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### google/veo-3.1-lite-generate-001

- 名称/種類: Veo 3.1 Lite Generate / video
- リリース日/Unix秒: 2026-04-02 / 1775088000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"720p","audio":false,"cost_per_second":"0.03"},{"resolution":"720p","audio":true,"cost_per_second":"0.05"},{"resolution":"1080p","audio":false,"cost_per_second":"0.05"},{"resolution":"1080p","audio":true,"cost_per_second":"0.08"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inception/mercury-2

- 名称/種類: Mercury 2 / language
- リリース日/Unix秒: 2026-02-24 / 1771891200
- 文脈/最大出力: 128000 / 128000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "effort", "values": ["instant", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.00000075","input_cache_read":"0.000000025"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mercury-2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Mercury 2 | 13.769132 | high | True | 2026-02-20 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inception/mercury-2.5

- 名称/種類: Mercury 2.5 / language
- リリース日/Unix秒: 2026-09-08 / 1788825600
- 文脈/最大出力: 260000 / 65536
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "effort", "values": ["instant", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000004","output":"0.00000015","input_cache_read":"0.000000004"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mercury-2-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Mercury 2.5 | 12.340845 | 未特定 | False | 2026-09-08 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inception/mercury-coder-small

- 名称/種類: Mercury Coder Small Beta / language
- リリース日/Unix秒: 2025-02-26 / 1740528000
- 文脈/最大出力: 32000 / 16384
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.000001"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inclusionai/ling-3.0-flash

- 名称/種類: Ling 3.0 Flash / language
- リリース日/Unix秒: 2026-08-06 / 1785974400
- 文脈/最大出力: 256000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000000021","output":"0.000000063","input_cache_read":"0.0000000042"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/ling-3-0-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Ling 3.0 Flash | 20.133252 | 未特定 | False | 2026-08-04 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inclusionai/ling-3.0-flash-fin

- 名称/種類: Ling 3.0 Flash Fin / language
- リリース日/Unix秒: 2026-08-27 / 1787788800
- 文脈/最大出力: 256000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000000075","output":"0.00000022","input_cache_read":"0.000000015","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/ling-3-0-flash-fin)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Ling-3.0-flash-Fin | 22.596583 | 未特定 | False | 2026-09-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inclusionai/ling-3.0-flash-sante

- 名称/種類: Ling 3.0 Flash Sante / language
- リリース日/Unix秒: 2026-09-04 / 1788480000
- 文脈/最大出力: 256000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000000075","output":"0.00000022","input_cache_read":"0.000000015"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inclusionai/ling-3.0-flash-vl

- 名称/種類: Ling 3.0 Flash VL / language
- リリース日/Unix秒: 2026-09-08 / 1788825600
- 文脈/最大出力: 256000 / 32000
- モダリティ: {"input": ["text", "image", "video"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, video-input, vision
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000000075","output":"0.00000022","input_cache_read":"0.000000015"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/ling-3-0-flash-vl)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Ling-3.0-flash-VL | 24.569305 | 未特定 | False | 2026-09-10 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inclusionai/ling-3.1-flash

- 名称/種類: Ling 3.1 Flash / language
- リリース日/Unix秒: 2026-09-29 / 1790640000
- 文脈/最大出力: 262144 / 32768
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: free, reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0","output":"0"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/ling-3-1-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Ling 3.1 Flash | 41.090620 | 未特定 | False | 2026-10-01 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inclusionai/ling-3.1-flash-free

- 名称/種類: Ling 3.1 Flash (Free) / language
- リリース日/Unix秒: 2026-09-29 / 1790640000
- 文脈/最大出力: 262144 / 32768
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: free, reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0","output":"0"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inference-net/schematron-v2-small

- 名称/種類: Schematron V2 Small / language
- リリース日/Unix秒: 2026-04-16 / 1776297600
- 文脈/最大出力: 128000 / 4096
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000005","output":"0.00000023","input_cache_read":"0.00000005"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### inference-net/schematron-v2-turbo

- 名称/種類: Schematron V2 Turbo / language
- リリース日/Unix秒: 2026-04-16 / 1776297600
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000003","output":"0.00000015","input_cache_read":"0.00000003"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### interfaze/interfaze-beta

- 名称/種類: Interfaze Beta / language
- リリース日/Unix秒: 2025-10-07 / 1759795200
- 文脈/最大出力: 1000000 / 32000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000015","output":"0.0000035"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### klingai/kling-v2.5-turbo-i2v

- 名称/種類: Kling v2.5 Turbo Image-to-Video / video
- リリース日/Unix秒: 2025-09-23 / 1758585600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"mode":"std","cost_per_second":"0.042"},{"mode":"pro","cost_per_second":"0.07"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### klingai/kling-v2.5-turbo-t2v

- 名称/種類: Kling v2.5 Turbo Text-to-Video / video
- リリース日/Unix秒: 2025-09-23 / 1758585600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"mode":"std","cost_per_second":"0.042"},{"mode":"pro","cost_per_second":"0.07"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### klingai/kling-v2.6-i2v

- 名称/種類: Kling v2.6 Image-to-Video / video
- リリース日/Unix秒: 2025-12-03 / 1764720000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"mode":"std","cost_per_second":"0.042"},{"audio":false,"mode":"pro","cost_per_second":"0.07"},{"audio":true,"mode":"pro","cost_per_second":"0.14"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### klingai/kling-v2.6-motion-control

- 名称/種類: Kling v2.6 Motion Control / video
- リリース日/Unix秒: 2025-12-18 / 1766016000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"mode":"std","cost_per_second":"0.07"},{"mode":"pro","cost_per_second":"0.112"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### klingai/kling-v2.6-t2v

- 名称/種類: Kling v2.6 Text-to-Video / video
- リリース日/Unix秒: 2025-12-03 / 1764720000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"mode":"std","cost_per_second":"0.042"},{"audio":false,"mode":"pro","cost_per_second":"0.07"},{"audio":true,"mode":"pro","cost_per_second":"0.14"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### klingai/kling-v3.0-i2v

- 名称/種類: Kling v3.0 Image-to-Video / video
- リリース日/Unix秒: 2026-02-05 / 1770249600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"audio":false,"mode":"std","cost_per_second":"0.168"},{"audio":true,"mode":"std","cost_per_second":"0.252"},{"audio":true,"mode":"std","voice_control":true,"cost_per_second":"0.308"},{"audio":false,"mode":"pro","cost_per_second":"0.224"},{"audio":true,"mode":"pro","cost_per_second":"0.336"},{"audio":true,"mode":"pro","voice_control":true,"cost_per_second":"0.392"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### klingai/kling-v3.0-motion-control

- 名称/種類: Kling v3.0 Motion Control / video
- リリース日/Unix秒: 2026-03-04 / 1772582400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: video-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"mode":"std","cost_per_second":"0.126"},{"mode":"pro","cost_per_second":"0.168"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### klingai/kling-v3.0-t2v

- 名称/種類: Kling v3.0 Text-to-Video / video
- リリース日/Unix秒: 2026-02-05 / 1770249600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"audio":false,"mode":"std","cost_per_second":"0.168"},{"audio":true,"mode":"std","cost_per_second":"0.252"},{"audio":true,"mode":"std","voice_control":true,"cost_per_second":"0.308"},{"audio":false,"mode":"pro","cost_per_second":"0.224"},{"audio":true,"mode":"pro","cost_per_second":"0.336"},{"audio":true,"mode":"pro","voice_control":true,"cost_per_second":"0.392"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### liquid/d1

- 名称/種類: Liquid d1 / evaluation
- リリース日/Unix秒: 2026-09-29 / 1790640000
- 文脈/最大出力: 65536 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000004","output":"0"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：evaluation / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meituan/longcat-2.5-preview

- 名称/種類: LongCat 2.5 Preview / language
- リリース日/Unix秒: 2026-09-26 / 1790380800
- 文脈/最大出力: 1048576 / 131072
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, vision, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.000000006"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/llama-3.1-70b

- 名称/種類: Llama 3.1 70B Instruct / language
- リリース日/Unix秒: 2024-07-23 / 1721692800
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000072","output":"0.00000072"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/llama-3-1-instruct-70b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Llama 3.1 Instruct 70B | 6.604050 | none | True | 2024-07-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/llama-3.1-8b

- 名称/種類: Llama 3.1 8B Instruct / language
- リリース日/Unix秒: 2024-07-23 / 1721692800
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000022","output":"0.00000022","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/llama-3-1-instruct-8b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Llama 3.1 Instruct 8B | 6.933508 | none | True | 2024-07-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/llama-3.3-70b

- 名称/種類: Llama 3.3 70B Instruct / language
- リリース日/Unix秒: 2024-12-06 / 1733443200
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000072","output":"0.00000072"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/llama-3-3-instruct-70b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Llama 3.3 Instruct 70B | 7.663809 | none | True | 2024-12-06 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/llama-4-maverick

- 名称/種類: Llama 4 Maverick 17B Instruct / language
- リリース日/Unix秒: 2025-04-05 / 1743811200
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000024","output":"0.00000097"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/llama-4-maverick)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Llama 4 Maverick | 9.990596 | none | True | 2025-04-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/llama-4-scout

- 名称/種類: Llama 4 Scout 17B Instruct / language
- リリース日/Unix秒: 2025-04-05 / 1743811200
- 文脈/最大出力: 128000 / 8192
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000017","output":"0.00000066","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/llama-4-scout)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Llama 4 Scout | 8.075034 | none | True | 2025-04-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/muse-glimmer-30b

- 名称/種類: Muse Glimmer 30B / language
- リリース日/Unix秒: 2026-08-10 / 1786320000
- 文脈/最大出力: 131072 / 131072
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: vision, implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000035","output":"0.0000015","input_cache_read":"0.00000004"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/muse-image-1.0

- 名称/種類: Muse Image 1.0 / image
- リリース日/Unix秒: 2026-08-26 / 1787702400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "image"], "output": ["image"]}
- 全機能タグ: image-generation, vision
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.01"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/muse-spark-1.1

- 名称/種類: Muse Spark 1.1 / language
- リリース日/Unix秒: 2026-07-09 / 1783555200
- 文脈/最大出力: 1048576 / 1048576
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.00000425","input_cache_read":"0.00000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/muse-spark-1-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Muse Spark 1.1 (Xhigh) | 33.729843 | xhigh | False | 2026-07-09 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/muse-spark-1.2

- 名称/種類: Muse Spark 1.2 / language
- リリース日/Unix秒: 2026-08-05 / 1785888000
- 文脈/最大出力: 1048576 / 1048576
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.00000425","input_cache_read":"0.00000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/muse-spark-1-2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Muse Spark 1.2 (Xhigh) | 39.575861 | xhigh | False | 2026-08-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/muse-spark-1.2-contributor

- 名称/種類: Muse Spark 1.2 Contributor / language
- リリース日/Unix秒: 2026-08-05 / 1785888000
- 文脈/最大出力: 1048576 / 1048576
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000001","output":"0.0000002","input_cache_read":"0.000000002"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/muse-spark-1.3

- 名称/種類: Muse Spark 1.3 / language
- リリース日/Unix秒: 2026-09-02 / 1788307200
- 文脈/最大出力: 1048576 / 1048576
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.00000425","input_cache_read":"0.00000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/muse-spark-1-3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Muse Spark 1.3 (Max) | 48.092311 | max | False | 2026-09-02 |
| Muse Spark 1.3 (Xhigh) | 45.073297 | xhigh | False | 2026-09-02 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### meta/muse-spark-1.3-contributor

- 名称/種類: Muse Spark 1.3 Contributor / language
- リリース日/Unix秒: 2026-09-02 / 1788307200
- 文脈/最大出力: 1048576 / 1048576
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000001","output":"0.0000002","input_cache_read":"0.000000002"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### microsoft/mai-transcribe-2

- 名称/種類: MAI-Transcribe 2 / transcription
- リリース日/Unix秒: 2026-09-03 / 1788393600
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0","transcription_duration_cost_per_second":"0.00002778"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### microsoft/mai-transcribe-2-streaming

- 名称/種類: MAI-Transcribe-2-Streaming / transcription
- リリース日/Unix秒: 2026-10-01 / 1790812800
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: websocket-transcription
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### microsoft/mai-voice-2

- 名称/種類: MAI-Voice-2 / speech
- リリース日/Unix秒: 2026-06-02 / 1780358400
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000022","speech_input_character_cost":"0.000022"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### microsoft/mai-voice-2-flash

- 名称/種類: MAI-Voice-2-Flash / speech
- リリース日/Unix秒: 2026-07-23 / 1784764800
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000015","speech_input_character_cost":"0.000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### microsoft/mai-voice-2.1

- 名称/種類: MAI-Voice-2.1 / speech
- リリース日/Unix秒: 2026-10-01 / 1790812800
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000022","speech_input_character_cost":"0.000022"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### microsoft/mai-voice-2.1-flash

- 名称/種類: MAI-Voice-2.1-Flash / speech
- リリース日/Unix秒: 2026-10-01 / 1790812800
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000015","speech_input_character_cost":"0.000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-h3

- 名称/種類: MiniMax H3 / video
- リリース日/Unix秒: 2026-07-30 / 1785369600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "image"], "output": ["video"]}
- 全機能タグ: video-generation, vision
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"2k","cost_per_second":"0.13"},{"resolution":"768p","cost_per_second":"0.08"},{"cost_per_second":"0.13"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-h3-max

- 名称/種類: MiniMax H3 Max / video
- リリース日/Unix秒: 2026-08-27 / 1787788800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "image"], "output": ["video"]}
- 全機能タグ: video-generation, vision
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","cost_per_second":"0.05"},{"resolution":"768p","cost_per_second":"0.08"},{"cost_per_second":"0.08"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-m2

- 名称/種類: MiniMax M2 / language
- リリース日/Unix秒: 2025-10-27 / 1761523200
- 文脈/最大出力: 205000 / 205000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, explicit-caching, structured-output
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.00000003","input_cache_write":"0.000000375"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/minimax-m2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| MiniMax-M2 | 18.625671 | 未特定 | True | 2025-10-26 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-m2.1

- 名称/種類: MiniMax M2.1 / language
- リリース日/Unix秒: 2025-12-23 / 1766448000
- 文脈/最大出力: 204800 / 131072
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching, explicit-caching
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.00000003","input_cache_write":"0.000000375","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/minimax-m2-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| MiniMax-M2.1 | 20.945285 | 未特定 | True | 2025-12-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-m2.1-lightning

- 名称/種類: MiniMax M2.1 Lightning / language
- リリース日/Unix秒: 2025-12-23 / 1766448000
- 文脈/最大出力: 204800 / 131072
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, explicit-caching, structured-output
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000024","input_cache_read":"0.00000003","input_cache_write":"0.000000375"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-m2.5

- 名称/種類: MiniMax M2.5 / language
- リリース日/Unix秒: 2026-02-12 / 1770854400
- 文脈/最大出力: 204800 / 131000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching, explicit-caching
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.00000003","input_cache_write":"0.000000375","fast":{"input":"0.0000006","output":"0.0000024","input_cache_read":"0.00000003","input_cache_write":"0.000000375"}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/minimax-m2-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| MiniMax-M2.5 | 22.796647 | 未特定 | True | 2026-02-12 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-m2.5-highspeed

- 名称/種類: MiniMax M2.5 High Speed / language
- リリース日/Unix秒: 2026-02-12 / 1770854400
- 文脈/最大出力: 204800 / 131000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, explicit-caching, structured-output
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000024","input_cache_read":"0.00000003","input_cache_write":"0.000000375"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-m2.7

- 名称/種類: MiniMax M2.7 / language
- リリース日/Unix秒: 2026-03-18 / 1773792000
- 文脈/最大出力: 204800 / 131000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, explicit-caching, structured-output
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.00000006","input_cache_write":"0.000000375","varies_by_provider":true,"fast":{"input":"0.0000006","output":"0.0000024","input_cache_read":"0.00000006","input_cache_write":"0.000000375"}}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/minimax-m2-7)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| MiniMax-M2.7 | 22.757815 | 未特定 | False | 2026-03-18 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-m2.7-highspeed

- 名称/種類: MiniMax M2.7 High Speed / language
- リリース日/Unix秒: 2026-03-18 / 1773792000
- 文脈/最大出力: 204800 / 131100
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, explicit-caching, structured-output
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000024","input_cache_read":"0.00000006","input_cache_write":"0.000000375"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### minimax/minimax-m3

- 名称/種類: MiniMax M3 / language
- リリース日/Unix秒: 2026-05-31 / 1780185600
- 文脈/最大出力: 512000 / 512000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, implicit-caching, structured-output, file-input
- 思考制御: [{"type": "budget_tokens"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000012","input_cache_read":"0.00000006","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/minimax-m3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| MiniMax-M3 | 29.220293 | 未特定 | False | 2026-06-01 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/codestral

- 名称/種類: Mistral Codestral / language
- リリース日/Unix秒: 2024-05-29 / 1716940800
- 文脈/最大出力: 128000 / 4000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.0000009","input_cache_read":"0.00000003"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/codestral-embed

- 名称/種類: Codestral Embed / embedding
- リリース日/Unix秒: 2025-05-28 / 1748390400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000015","input_cache_read":"0.000000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/ministral-14b

- 名称/種類: Ministral 14B / language
- リリース日/Unix秒: 2025-12-02 / 1764633600
- 文脈/最大出力: 262144 / 256000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, tool-use, vision, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","output":"0.0000002","input_cache_read":"0.00000002"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/ministral-3b

- 名称/種類: Ministral 3B / language
- リリース日/Unix秒: 2024-10-16 / 1729036800
- 文脈/最大出力: 131072 / 4000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice
- 全料金（元の単位）: `{"input":"0.0000001","output":"0.0000001","input_cache_read":"0.00000001"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/ministral-8b

- 名称/種類: Ministral 8B / language
- リリース日/Unix秒: 2024-10-16 / 1729036800
- 文脈/最大出力: 262144 / 4000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.00000015","input_cache_read":"0.000000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/mistral-embed

- 名称/種類: Mistral Embed / embedding
- リリース日/Unix秒: 2023-12-11 / 1702252800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000001"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/mistral-large-3

- 名称/種類: Mistral Large 3 / language
- リリース日/Unix秒: 2025-12-02 / 1764633600
- 文脈/最大出力: 262144 / 256000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.0000015","input_cache_read":"0.00000005"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mistral-large-3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Mistral Large 3 | 9.266088 | none | False | 2025-12-02 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/mistral-large-4

- 名称/種類: Mistral Large 4 / language
- リリース日/Unix秒: 2026-10-06 / 1791244800
- 文脈/最大出力: 524288 / 262144
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, structured-output, tool-use, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000068","output":"0.00000209","input_cache_read":"0.00000007"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mistral-large-4)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Mistral Large 4 Preview | 38.377041 | 未特定 | False | 2026-10-06 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/mistral-medium-3.5

- 名称/種類: Mistral Medium Latest / language
- リリース日/Unix秒: 2026-04-29 / 1777420800
- 文脈/最大出力: 262144 / 256000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["none", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000015","output":"0.0000075","input_cache_read":"0.00000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mistral-medium-3-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Mistral Medium 3.5 | 14.188923 | high | False | 2026-04-29 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/mistral-nemo

- 名称/種類: Mistral Nemo 12B / language
- リリース日/Unix秒: 2024-07-18 / 1721260800
- 文脈/最大出力: 60288 / 16000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000004","output":"0.00000017","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mistral/mistral-small

- 名称/種類: Mistral Small / language
- リリース日/Unix秒: 2024-09-17 / 1726531200
- 文脈/最大出力: 262144 / 4000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.0000006","input_cache_read":"0.000000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mistral-small)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Mistral Small (Sep '24) | 5.848429 | none | True | 2024-09-17 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### mixedbread/toast-1

- 名称/種類: Toast 1 / language
- リリース日/Unix秒: 2026-08-13 / 1786579200
- 文脈/最大出力: 131000 / 4000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, tool-use, structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000003","output":"0.00000072","input_cache_read":"0.000000036"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### moonshotai/kimi-k2

- 名称/種類: Kimi K2 Instruct / language
- リリース日/Unix秒: 2025-07-11 / 1752192000
- 文脈/最大出力: 131072 / 131072
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice
- 全料金（元の単位）: `{"input":"0.00000057","output":"0.0000023"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/kimi-k2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Kimi K2 | 12.715483 | none | True | 2025-07-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### moonshotai/kimi-k2.5

- 名称/種類: Kimi K2.5 / language
- リリース日/Unix秒: 2026-01-26 / 1769385600
- 文脈/最大出力: 256000 / 256000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, vision, tool-use, structured-output, implicit-caching
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.000003"}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/kimi-k2-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Kimi K2.5 (Reasoning) | 23.458505 | 未特定 | True | 2026-01-27 |
| Kimi K2.5 (Non-reasoning) | 19.434331 | none | True | 2026-01-27 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### moonshotai/kimi-k2.6

- 名称/種類: Kimi K2.6 / language
- リリース日/Unix秒: 2026-04-20 / 1776643200
- 文脈/最大出力: 262000 / 262000
- モダリティ: {"input": ["text", "image", "video"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, vision, video-input, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000095","output":"0.000004","input_cache_read":"0.00000016","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/kimi-k2-6)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Kimi K2.6 (Reasoning) | 26.979200 | 未特定 | False | 2026-04-20 |
| Kimi K2.6 (Non-reasoning) | 23.569590 | none | True | 2026-04-20 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### moonshotai/kimi-k2.7-code

- 名称/種類: Kimi K2.7 Code / language
- リリース日/Unix秒: 2026-06-12 / 1781222400
- 文脈/最大出力: 256000 / 32768
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, video-input, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000095","output":"0.000004","input_cache_read":"0.00000019","fast":{"input":"0.0000019","output":"0.000008","input_cache_read":"0.00000038"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/kimi-k2-7-code)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Kimi K2.7 Code | 25.812106 | 未特定 | False | 2026-06-12 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### moonshotai/kimi-k2.7-code-highspeed

- 名称/種類: Kimi K2.7 Code High Speed / language
- リリース日/Unix秒: 2026-06-15 / 1781481600
- 文脈/最大出力: 262144 / 32768
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, file-input, implicit-caching, video-input, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000019","output":"0.000008","input_cache_read":"0.00000038"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### moonshotai/kimi-k3

- 名称/種類: Kimi K3 / language
- リリース日/Unix秒: 2026-07-16 / 1784160000
- 文脈/最大出力: 1000000 / 131072
- モダリティ: {"input": ["text", "image", "pdf", "video"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, structured-output, explicit-caching, video-input
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "high", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000003","output":"0.000015","input_cache_read":"0.0000003","varies_by_provider":true,"fast":{"input":"0.0000045","output":"0.0000225","input_cache_read":"0.00000045"},"regional":{"us":{"input":"0.000003","output":"0.000015","input_cache_read":"0.0000003"}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/kimi-k3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Kimi K3 (Max) | 43.593823 | max | False | 2026-07-16 |
| Kimi K3 (Low) | 30.066699 | low | False | 2026-07-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### moonshotai/kimi-k3-fast

- 名称/種類: Kimi K3 Fast / language
- リリース日/Unix秒: 2026-07-27 / 1785110400
- 文脈/最大出力: 1000000 / 131072
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000045","output":"0.0000225","input_cache_read":"0.00000045","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/kimi-k3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Kimi K3 (Max) | 43.593823 | max | False | 2026-07-16 |
| Kimi K3 (Low) | 30.066699 | low | False | 2026-07-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### morph/morph-v3-fast

- 名称/種類: Morph V3 Fast / language
- リリース日/Unix秒: 2025-07-07 / 1751846400
- 文脈/最大出力: 81920 / 16384
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, stop, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000008","output":"0.0000012"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### morph/morph-v3-large

- 名称/種類: Morph V3 Large / language
- リリース日/Unix秒: 2025-07-07 / 1751846400
- 文脈/最大出力: 81920 / 16384
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, stop, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000009","output":"0.0000019"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### nvidia/nemotron-3-nano-30b-a3b

- 名称/種類: Nemotron 3 Nano 30B A3B / language
- リリース日/Unix秒: 2025-12-15 / 1765756800
- 文脈/最大出力: 262144 / 262144
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000005","output":"0.0000002","input_cache_read":"0.000000025"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nvidia-nemotron-3-nano-30b-a3b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| NVIDIA Nemotron 3 Nano 30B A3B (Non-reasoning) | 6.847852 | none | True | 2025-12-15 |
| NVIDIA Nemotron 3 Nano 30B A3B (Reasoning) | 8.896144 | 未特定 | False | 2025-12-15 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### nvidia/nemotron-3-super-120b-a12b

- 名称/種類: NVIDIA Nemotron 3 Super 120B A12B / language
- リリース日/Unix秒: 2026-03-11 / 1773187200
- 文脈/最大出力: 256000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.00000065"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nvidia-nemotron-3-super-120b-a12b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Nemotron 3 Super 120B A12B (Reasoning) | 12.828758 | 未特定 | False | 2026-03-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### nvidia/nemotron-3-ultra-550b-a55b

- 名称/種類: Nemotron 3 Ultra / language
- リリース日/Unix秒: 2026-06-04 / 1780531200
- 文脈/最大出力: 1000000 / 65000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000024","input_cache_read":"0.00000012","varies_by_provider":true,"regional":{"us":{"input":"0.0000006","output":"0.0000024","input_cache_read":"0.00000012"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nemotron-3-ultra-550b-a55b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Nemotron 3 Ultra 550B A55B (Reasoning) | 22.927912 | 未特定 | False | 2026-06-04 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### nvidia/nemotron-3.5-lightning

- 名称/種類: Nemotron 3.5 Lightning 30B / language
- リリース日/Unix秒: 2026-08-11 / 1786406400
- 文脈/最大出力: 262144 / 131072
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "budget_tokens", "min": 1, "max": 32768}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000005","output":"0.0000002","input_cache_read":"0.00000001","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nemotron-3-5-lightning)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Nemotron 3.5 Lightning | 12.857231 | 未特定 | False | 2026-08-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### nvidia/nemotron-nano-12b-v2-vl

- 名称/種類: Nvidia Nemotron Nano 12B V2 VL / language
- リリース日/Unix秒: 2025-10-28 / 1761609600
- 文脈/最大出力: 131072 / 131072
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: vision, reasoning, tool-use
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000002","output":"0.0000006"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nvidia-nemotron-nano-12b-v2-vl)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| NVIDIA Nemotron Nano 12B v2 VL (Non-reasoning) | 5.820458 | none | True | 2025-10-28 |
| NVIDIA Nemotron Nano 12B v2 VL (Reasoning) | 7.477969 | 未特定 | True | 2025-10-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### nvidia/nemotron-nano-9b-v2

- 名称/種類: Nvidia Nemotron Nano 9B V2 / language
- リリース日/Unix秒: 2025-08-18 / 1755475200
- 文脈/最大出力: 131072 / 131072
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000006","output":"0.00000023"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/nvidia-nemotron-nano-9b-v2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| NVIDIA Nemotron Nano 9B V2 (Non-reasoning) | 6.844125 | none | True | 2025-08-18 |
| NVIDIA Nemotron Nano 9B V2 (Reasoning) | 7.428823 | 未特定 | True | 2025-08-18 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-3.5-turbo

- 名称/種類: GPT-3.5 Turbo / language
- リリース日/Unix秒: 2023-03-01 / 1677628800
- 文脈/最大出力: 16385 / 4096
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: tool-use
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice
- 全料金（元の単位）: `{"input":"0.0000005","output":"0.0000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-3-5-turbo)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-3.5 Turbo | 5.485582 | none | True | 2022-11-30 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4-turbo

- 名称/種類: GPT-4 Turbo / language
- リリース日/Unix秒: 2024-04-09 / 1712620800
- 文脈/最大出力: 128000 / 4096
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: tool-use, vision
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice
- 全料金（元の単位）: `{"input":"0.00001","output":"0.00003"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4-turbo)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4 Turbo | 7.043515 | none | True | 2023-11-06 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4.1

- 名称/種類: GPT-4.1 / language
- リリース日/Unix秒: 2025-04-14 / 1744588800
- 文脈/最大出力: 1047576 / 32768
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000008","input_cache_read":"0.0000005","web_search":"10","service_tiers":{"priority":{"input":"0.0000035","output":"0.000014","input_cache_read":"0.000000875"}},"fast":{"input":"0.0000035","output":"0.000014","input_cache_read":"0.000000875"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4.1 | 12.691323 | none | True | 2025-04-14 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4.1-fast

- 名称/種類: GPT-4.1 (Fast) / language
- リリース日/Unix秒: 2025-04-14 / 1744588800
- 文脈/最大出力: 1047576 / 32768
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000035","output":"0.000014","input_cache_read":"0.000000875","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4.1 | 12.691323 | none | True | 2025-04-14 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4.1-mini

- 名称/種類: GPT-4.1 mini / language
- リリース日/Unix秒: 2025-05-14 / 1747180800
- 文脈/最大出力: 1047576 / 32768
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000004","output":"0.0000016","input_cache_read":"0.0000001","web_search":"10","service_tiers":{"priority":{"input":"0.0000007","output":"0.0000028","input_cache_read":"0.000000175"}},"fast":{"input":"0.0000007","output":"0.0000028","input_cache_read":"0.000000175"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4-1-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4.1 mini | 10.158874 | none | True | 2025-04-14 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4.1-mini-fast

- 名称/種類: GPT-4.1 mini (Fast) / language
- リリース日/Unix秒: 2025-05-14 / 1747180800
- 文脈/最大出力: 1047576 / 32768
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000007","output":"0.0000028","input_cache_read":"0.000000175","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4-1-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4.1 mini | 10.158874 | none | True | 2025-04-14 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4.1-nano

- 名称/種類: GPT-4.1 nano / language
- リリース日/Unix秒: 2025-04-14 / 1744588800
- 文脈/最大出力: 1047576 / 32768
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000001","output":"0.0000004","input_cache_read":"0.000000025","web_search":"10","service_tiers":{"priority":{"input":"0.0000002","output":"0.0000008","input_cache_read":"0.00000005"}},"varies_by_provider":true,"fast":{"input":"0.0000002","output":"0.0000008","input_cache_read":"0.00000005"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4-1-nano)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4.1 nano | 7.817962 | none | True | 2025-04-14 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4.1-nano-fast

- 名称/種類: GPT-4.1 nano (Fast) / language
- リリース日/Unix秒: 2025-04-14 / 1744588800
- 文脈/最大出力: 1047576 / 32768
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","output":"0.0000008","input_cache_read":"0.00000005","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4-1-nano)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4.1 nano | 7.817962 | none | True | 2025-04-14 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4o

- 名称/種類: GPT-4o / language
- リリース日/Unix秒: 2024-05-13 / 1715558400
- 文脈/最大出力: 128000 / 16384
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000025","output":"0.00001","input_cache_read":"0.00000125","web_search":"10","service_tiers":{"priority":{"input":"0.00000425","output":"0.000017","input_cache_read":"0.000002125"}},"fast":{"input":"0.00000425","output":"0.000017","input_cache_read":"0.000002125"},"regional":{"eu":{"input":"0.0000025","output":"0.00001","input_cache_read":"0.00000125"},"us":{"input":"0.0000025","output":"0.00001","input_cache_read":"0.00000125"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4o)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4o (Nov '24) | 8.441639 | none | True | 2024-11-20 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4o-fast

- 名称/種類: GPT-4o (Fast) / language
- リリース日/Unix秒: 2024-05-13 / 1715558400
- 文脈/最大出力: 128000 / 16384
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000425","output":"0.000017","input_cache_read":"0.000002125","web_search":"10","regional":{"eu":{"input":"0.00000425","output":"0.000017","input_cache_read":"0.000002125"},"us":{"input":"0.00000425","output":"0.000017","input_cache_read":"0.000002125"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4o)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4o (Nov '24) | 8.441639 | none | True | 2024-11-20 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4o-mini

- 名称/種類: GPT-4o mini / language
- リリース日/Unix秒: 2024-07-18 / 1721260800
- 文脈/最大出力: 128000 / 16384
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.0000006","input_cache_read":"0.000000075","web_search":"10","service_tiers":{"priority":{"input":"0.00000025","output":"0.000001","input_cache_read":"0.000000125"}},"fast":{"input":"0.00000025","output":"0.000001","input_cache_read":"0.000000125"},"regional":{"eu":{"input":"0.00000015","output":"0.0000006","input_cache_read":"0.000000075"},"us":{"input":"0.00000015","output":"0.0000006","input_cache_read":"0.000000075"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4o-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4o mini | 6.664326 | none | True | 2024-07-18 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4o-mini-fast

- 名称/種類: GPT-4o mini (Fast) / language
- リリース日/Unix秒: 2024-07-18 / 1721260800
- 文脈/最大出力: 128000 / 16384
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, tool-use, vision, web-search, structured-output, fast
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.000001","input_cache_read":"0.000000125","web_search":"10","regional":{"eu":{"input":"0.00000025","output":"0.000001","input_cache_read":"0.000000125"},"us":{"input":"0.00000025","output":"0.000001","input_cache_read":"0.000000125"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-4o-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-4o mini | 6.664326 | none | True | 2024-07-18 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4o-mini-transcribe

- 名称/種類: GPT-4o mini Transcribe / transcription
- リリース日/Unix秒: 2024-03-13 / 1710288000
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.000005","audio_input_token_cost":"0.00000125"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-4o-transcribe

- 名称/種類: GPT-4o Transcribe / transcription
- リリース日/Unix秒: 2024-03-13 / 1710288000
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000025","output":"0.00001","audio_input_token_cost":"0.0000025"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5

- 名称/種類: GPT-5 / language
- リリース日/Unix秒: 2025-08-07 / 1754524800
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, fast
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.00001","input_cache_read":"0.000000125","web_search":"10","service_tiers":{"priority":{"input":"0.0000025","output":"0.00002","input_cache_read":"0.00000025"},"flex":{"input":"0.000000625","output":"0.000005","input_cache_read":"0.0000000625"}},"varies_by_provider":true,"fast":{"input":"0.0000025","output":"0.00002","input_cache_read":"0.00000025"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5 (High) | 22.982800 | high | True | 2025-08-07 |
| GPT-5 (Low) | 20.785598 | low | True | 2025-08-07 |
| GPT-5 (Medium) | 22.869336 | medium | True | 2025-08-07 |
| GPT-5 (Minimal) | 11.448189 | none | True | 2025-08-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5-fast

- 名称/種類: GPT-5 (Fast) / language
- リリース日/Unix秒: 2025-08-07 / 1754524800
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, fast
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000025","output":"0.00002","input_cache_read":"0.00000025","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5 (High) | 22.982800 | high | True | 2025-08-07 |
| GPT-5 (Low) | 20.785598 | low | True | 2025-08-07 |
| GPT-5 (Medium) | 22.869336 | medium | True | 2025-08-07 |
| GPT-5 (Minimal) | 11.448189 | none | True | 2025-08-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5-codex

- 名称/種類: GPT-5-Codex / language
- リリース日/Unix秒: 2025-09-15 / 1757894400
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.00001","input_cache_read":"0.00000013","web_search":"14"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-codex)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5 Codex (High) | 24.881894 | high | True | 2025-09-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5-mini

- 名称/種類: GPT-5 mini / language
- リリース日/Unix秒: 2025-08-07 / 1754524800
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, fast
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.000002","input_cache_read":"0.000000025","web_search":"10","service_tiers":{"priority":{"input":"0.00000045","output":"0.0000036","input_cache_read":"0.000000045"},"flex":{"input":"0.000000125","output":"0.000001","input_cache_read":"0.0000000125"}},"varies_by_provider":true,"fast":{"input":"0.00000045","output":"0.0000036","input_cache_read":"0.000000045"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5 mini (High) | 16.773088 | high | False | 2025-08-07 |
| GPT-5 mini (Medium) | 20.599178 | medium | True | 2025-08-07 |
| GPT-5 mini (Minimal) | 9.906153 | none | True | 2025-08-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5-mini-fast

- 名称/種類: GPT-5 mini (Fast) / language
- リリース日/Unix秒: 2025-08-07 / 1754524800
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, fast
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000045","output":"0.0000036","input_cache_read":"0.000000045","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5 mini (High) | 16.773088 | high | False | 2025-08-07 |
| GPT-5 mini (Medium) | 20.599178 | medium | True | 2025-08-07 |
| GPT-5 mini (Minimal) | 9.906153 | none | True | 2025-08-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5-nano

- 名称/種類: GPT-5 nano / language
- リリース日/Unix秒: 2025-08-07 / 1754524800
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000005","output":"0.0000004","input_cache_read":"0.000000005","web_search":"10","service_tiers":{"flex":{"input":"0.000000025","output":"0.0000002","input_cache_read":"0.0000000025"}},"varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-nano)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5 nano (High) | 12.992236 | high | True | 2025-08-07 |
| GPT-5 nano (Medium) | 12.480256 | medium | True | 2025-08-07 |
| GPT-5 nano (Minimal) | 7.088794 | none | True | 2025-08-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5-pro

- 名称/種類: GPT-5 pro / language
- リリース日/Unix秒: 2025-10-06 / 1759708800
- 文脈/最大出力: 400000 / 272000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, web-search
- 思考制御: [{"type": "effort", "values": ["high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000015","output":"0.00012","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.1-codex

- 名称/種類: GPT-5.1-Codex / language
- リリース日/Unix秒: 2025-11-12 / 1762905600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.00001","input_cache_read":"0.00000013","web_search":"14"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-1-codex)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.1 Codex (High) | 23.697279 | high | True | 2025-11-13 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.1-codex-max

- 名称/種類: GPT 5.1 Codex Max / language
- リリース日/Unix秒: 2025-11-19 / 1763510400
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.00001","input_cache_read":"0.000000125","web_search":"14"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.1-codex-mini

- 名称/種類: GPT 5.1 Codex Mini / language
- リリース日/Unix秒: 2025-11-12 / 1762905600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.000002","input_cache_read":"0.00000003","web_search":"14"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-1-codex-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.1 Codex mini (High) | 20.378199 | high | True | 2025-11-13 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.1-thinking

- 名称/種類: GPT 5.1 Thinking / language
- リリース日/Unix秒: 2025-11-12 / 1762905600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","output":"0.00001","input_cache_read":"0.000000125","web_search":"10","service_tiers":{"priority":{"input":"0.0000025","output":"0.00002","input_cache_read":"0.00000025"},"flex":{"input":"0.000000625","output":"0.000005","input_cache_read":"0.0000000625"}},"varies_by_provider":true,"fast":{"input":"0.0000025","output":"0.00002","input_cache_read":"0.00000025"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.1 (High) | 24.735754 | high | True | 2025-11-13 |
| GPT-5.1 (Non-reasoning) | 13.313729 | none | True | 2025-11-13 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.1-thinking-fast

- 名称/種類: GPT 5.1 Thinking (Fast) / language
- リリース日/Unix秒: 2025-11-12 / 1762905600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000025","output":"0.00002","input_cache_read":"0.00000025","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.1 (High) | 24.735754 | high | True | 2025-11-13 |
| GPT-5.1 (Non-reasoning) | 13.313729 | none | True | 2025-11-13 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.2

- 名称/種類: GPT 5.2 / language
- リリース日/Unix秒: 2025-12-11 / 1765411200
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000175","output":"0.000014","input_cache_read":"0.000000175","web_search":"10","service_tiers":{"priority":{"input":"0.0000035","output":"0.000028","input_cache_read":"0.00000035"},"flex":{"input":"0.000000875","output":"0.000007","input_cache_read":"0.0000000875"}},"varies_by_provider":true,"fast":{"input":"0.0000035","output":"0.000028","input_cache_read":"0.00000035"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.2 (Xhigh) | 30.448182 | xhigh | True | 2025-12-11 |
| GPT-5.2 (Medium) | 26.500956 | medium | True | 2025-12-11 |
| GPT-5.2 (Non-reasoning) | 16.975983 | none | True | 2025-12-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.2-fast

- 名称/種類: GPT 5.2 (Fast) / language
- リリース日/Unix秒: 2025-12-11 / 1765411200
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000035","output":"0.000028","input_cache_read":"0.00000035","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.2 (Xhigh) | 30.448182 | xhigh | True | 2025-12-11 |
| GPT-5.2 (Medium) | 26.500956 | medium | True | 2025-12-11 |
| GPT-5.2 (Non-reasoning) | 16.975983 | none | True | 2025-12-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.2-codex

- 名称/種類: GPT 5.2 Codex / language
- リリース日/Unix秒: 2025-12-18 / 1766016000
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000175","output":"0.000014","input_cache_read":"0.000000175","web_search":"14"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-2-codex)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.2 Codex (Xhigh) | 28.501697 | xhigh | True | 2025-12-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.2-pro

- 名称/種類: GPT 5.2  / language
- リリース日/Unix秒: 2025-12-11 / 1765411200
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, vision, reasoning, file-input, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000021","output":"0.000168","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.3-codex

- 名称/種類: GPT 5.3 Codex / language
- リリース日/Unix秒: 2026-02-05 / 1770249600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000175","output":"0.000014","input_cache_read":"0.000000175","web_search":"10","service_tiers":{"priority":{"input":"0.0000035","output":"0.000028","input_cache_read":"0.00000035"}},"fast":{"input":"0.0000035","output":"0.000028","input_cache_read":"0.00000035"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-3-codex)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.3 Codex (Xhigh) | 32.502817 | xhigh | True | 2026-02-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.3-codex-fast

- 名称/種類: GPT 5.3 Codex (Fast) / language
- リリース日/Unix秒: 2026-02-05 / 1770249600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000035","output":"0.000028","input_cache_read":"0.00000035","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-3-codex)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.3 Codex (Xhigh) | 32.502817 | xhigh | True | 2026-02-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.4

- 名称/種類: GPT 5.4 / language
- リリース日/Unix秒: 2026-03-05 / 1772668800
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000025","input_tiers":[{"cost":"0.0000025","min":0,"max":272000},{"cost":"0.000005","min":272000}],"output":"0.000015","output_tiers":[{"cost":"0.000015","min":0,"max":272000},{"cost":"0.0000225","min":272000}],"input_cache_read":"0.00000025","input_cache_read_tiers":[{"cost":"0.00000025","min":0,"max":272000},{"cost":"0.0000005","min":272000}],"web_search":"10","service_tiers":{"priority":{"input":"0.000005","output":"0.00003","input_cache_read":"0.0000005"},"flex":{"input":"0.00000125","output":"0.0000075","input_cache_read":"0.00000013","long_context":{"threshold":272000,"input":"0.0000025","output":"0.00001125","input_cache_read":"0.00000025"}}},"fast":{"input":"0.000005","output":"0.00003","input_cache_read":"0.0000005"},"regional":{"us":{"input":"0.00000275","input_tiers":[{"cost":"0.00000275","min":0,"max":272000},{"cost":"0.0000055","min":272000}],"output":"0.0000165","output_tiers":[{"cost":"0.0000165","min":0,"max":272000},{"cost":"0.00002475","min":272000}],"input_cache_read":"0.000000275","input_cache_read_tiers":[{"cost":"0.000000275","min":0,"max":272000},{"cost":"0.00000055","min":272000}],"fast":{"input":"0.0000055","output":"0.000033","input_cache_read":"0.00000055"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-4)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.4 (Xhigh) | 38.975589 | xhigh | True | 2026-03-05 |
| GPT-5.4 (Low) | 27.577318 | low | True | 2026-03-05 |
| GPT-5.4 (Non-reasoning) | 18.159702 | none | True | 2026-03-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.4-fast

- 名称/種類: GPT 5.4 (Fast) / language
- リリース日/Unix秒: 2026-03-05 / 1772668800
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","output":"0.00003","input_cache_read":"0.0000005","web_search":"10","regional":{"us":{"input":"0.0000055","output":"0.000033","input_cache_read":"0.00000055"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-4)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.4 (Xhigh) | 38.975589 | xhigh | True | 2026-03-05 |
| GPT-5.4 (Low) | 27.577318 | low | True | 2026-03-05 |
| GPT-5.4 (Non-reasoning) | 18.159702 | none | True | 2026-03-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.4-mini

- 名称/種類: GPT 5.4 Mini / language
- リリース日/Unix秒: 2026-03-17 / 1773705600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000075","output":"0.0000045","input_cache_read":"0.000000075","web_search":"10","service_tiers":{"priority":{"input":"0.0000015","output":"0.000009","input_cache_read":"0.00000015"},"flex":{"input":"0.000000375","output":"0.00000225","input_cache_read":"0.0000000375"}},"fast":{"input":"0.0000015","output":"0.000009","input_cache_read":"0.00000015"},"regional":{"us":{"input":"0.000000825","output":"0.00000495","input_cache_read":"0.0000000825","fast":{"input":"0.00000165","output":"0.0000099","input_cache_read":"0.000000165"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-4-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.4 mini (Xhigh) | 24.068217 | xhigh | False | 2026-03-17 |
| GPT-5.4 mini (Medium) | 19.748421 | medium | True | 2026-03-17 |
| GPT-5.4 mini (Non-reasoning) | 11.144719 | none | True | 2026-03-17 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.4-mini-fast

- 名称/種類: GPT 5.4 Mini (Fast) / language
- リリース日/Unix秒: 2026-03-17 / 1773705600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000015","output":"0.000009","input_cache_read":"0.00000015","web_search":"10","regional":{"us":{"input":"0.00000165","output":"0.0000099","input_cache_read":"0.000000165"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-4-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.4 mini (Xhigh) | 24.068217 | xhigh | False | 2026-03-17 |
| GPT-5.4 mini (Medium) | 19.748421 | medium | True | 2026-03-17 |
| GPT-5.4 mini (Non-reasoning) | 11.144719 | none | True | 2026-03-17 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.4-nano

- 名称/種類: GPT 5.4 Nano / language
- リリース日/Unix秒: 2026-03-17 / 1773705600
- 文脈/最大出力: 400000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","output":"0.00000125","input_cache_read":"0.00000002","web_search":"10","service_tiers":{"flex":{"input":"0.0000001","output":"0.000000625","input_cache_read":"0.00000001"}},"regional":{"us":{"input":"0.00000022","output":"0.000001375","input_cache_read":"0.000000022"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-4-nano)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.4 nano (Xhigh) | 20.719735 | xhigh | False | 2026-03-17 |
| GPT-5.4 nano (Medium) | 20.013928 | medium | True | 2026-03-17 |
| GPT-5.4 nano (Non-reasoning) | 11.689232 | none | True | 2026-03-17 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.4-pro

- 名称/種類: GPT 5.4 Pro / language
- リリース日/Unix秒: 2026-03-05 / 1772668800
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00003","input_tiers":[{"cost":"0.00003","min":0,"max":272000},{"cost":"0.00006","min":272000}],"output":"0.00018","output_tiers":[{"cost":"0.00018","min":0,"max":272000},{"cost":"0.00027","min":272000}],"web_search":"10","service_tiers":{"flex":{"input":"0.000015","output":"0.00009","long_context":{"threshold":272000,"input":"0.00003","output":"0.000135"}}},"regional":{"us":{"input":"0.000033","input_tiers":[{"cost":"0.000033","min":0,"max":272000},{"cost":"0.000066","min":272000}],"output":"0.000198","output_tiers":[{"cost":"0.000198","min":0,"max":272000},{"cost":"0.000297","min":272000}]}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-4-pro)
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.5

- 名称/種類: GPT 5.5 / language
- リリース日/Unix秒: 2026-04-24 / 1776988800
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","input_tiers":[{"cost":"0.000005","min":0,"max":272000},{"cost":"0.00001","min":272000}],"output":"0.00003","output_tiers":[{"cost":"0.00003","min":0,"max":272000},{"cost":"0.000045","min":272000}],"input_cache_read":"0.0000005","input_cache_read_tiers":[{"cost":"0.0000005","min":0,"max":272000},{"cost":"0.000001","min":272000}],"web_search":"10","service_tiers":{"priority":{"input":"0.0000125","output":"0.000075","input_cache_read":"0.00000125"},"flex":{"input":"0.0000025","output":"0.000015","input_cache_read":"0.00000025","long_context":{"threshold":272000,"input":"0.000005","output":"0.0000225","input_cache_read":"0.0000005"}}},"varies_by_provider":true,"fast":{"input":"0.0000125","output":"0.000075","input_cache_read":"0.00000125"},"regional":{"us":{"input":"0.0000055","input_tiers":[{"cost":"0.0000055","min":0,"max":272000},{"cost":"0.000011","min":272000}],"output":"0.000033","output_tiers":[{"cost":"0.000033","min":0,"max":272000},{"cost":"0.0000495","min":272000}],"input_cache_read":"0.00000055","input_cache_read_tiers":[{"cost":"0.00000055","min":0,"max":272000},{"cost":"0.0000011","min":272000}],"fast":{"input":"0.00001375","output":"0.0000825","input_cache_read":"0.000001375"}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.5 (Xhigh) | 38.355644 | xhigh | False | 2026-04-23 |
| GPT-5.5 (High) | 36.979374 | high | False | 2026-04-23 |
| GPT-5.5 (Low) | 30.709518 | low | True | 2026-04-23 |
| GPT-5.5 (Medium) | 33.804360 | medium | False | 2026-04-23 |
| GPT-5.5 (Non-reasoning) | 23.167438 | none | True | 2026-04-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.5-fast

- 名称/種類: GPT 5.5 (Fast) / language
- リリース日/Unix秒: 2026-04-24 / 1776988800
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000125","output":"0.000075","input_cache_read":"0.00000125","web_search":"10","regional":{"us":{"input":"0.00001375","output":"0.0000825","input_cache_read":"0.000001375"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.5 (Xhigh) | 38.355644 | xhigh | False | 2026-04-23 |
| GPT-5.5 (High) | 36.979374 | high | False | 2026-04-23 |
| GPT-5.5 (Low) | 30.709518 | low | True | 2026-04-23 |
| GPT-5.5 (Medium) | 33.804360 | medium | False | 2026-04-23 |
| GPT-5.5 (Non-reasoning) | 23.167438 | none | True | 2026-04-23 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.5-pro

- 名称/種類: GPT 5.5 Pro / language
- リリース日/Unix秒: 2026-04-24 / 1776988800
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, file-input, web-search, vision, websocket-realtime, structured-output
- 思考制御: [{"type": "effort", "values": ["medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00003","input_tiers":[{"cost":"0.00003","min":0,"max":272000},{"cost":"0.00006","min":272000}],"output":"0.00018","output_tiers":[{"cost":"0.00018","min":0,"max":272000},{"cost":"0.00027","min":272000}],"web_search":"14","service_tiers":{"flex":{"input":"0.000015","output":"0.00009"}},"regional":{"us":{"input":"0.000033","input_tiers":[{"cost":"0.000033","min":0,"max":272000},{"cost":"0.000066","min":272000}],"output":"0.000198","output_tiers":[{"cost":"0.000198","min":0,"max":272000},{"cost":"0.000297","min":272000}]}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-5-pro)
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.6-luna

- 名称/種類: GPT 5.6 Luna / language
- リリース日/Unix秒: 2026-07-09 / 1783555200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, file-input, tool-use, vision, implicit-caching, web-search, explicit-caching, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","input_tiers":[{"cost":"0.0000002","min":0,"max":272000},{"cost":"0.0000004","min":272000}],"output":"0.0000012","output_tiers":[{"cost":"0.0000012","min":0,"max":272000},{"cost":"0.0000018","min":272000}],"input_cache_read":"0.00000002","input_cache_read_tiers":[{"cost":"0.00000002","max":272000},{"cost":"0.00000004","min":272000}],"input_cache_write":"0.00000025","input_cache_write_tiers":[{"cost":"0.00000025","min":0,"max":272000},{"cost":"0.0000005","min":272000}],"web_search":"10","service_tiers":{"flex":{"input":"0.0000001","output":"0.0000006","input_cache_read":"0.00000001","long_context":{"threshold":272000,"input":"0.0000002","output":"0.0000009","input_cache_read":"0.00000002"}},"priority":{"input":"0.0000004","output":"0.0000024","input_cache_read":"0.00000004","long_context":{"threshold":272000,"input":"0.0000008","output":"0.0000036","input_cache_read":"0.00000008"}}},"fast":{"input":"0.0000004","input_tiers":[{"cost":"0.0000004","min":0,"max":272000},{"cost":"0.0000008","min":272000}],"output":"0.0000024","output_tiers":[{"cost":"0.0000024","min":0,"max":272000},{"cost":"0.0000036","min":272000}],"input_cache_read":"0.00000004","input_cache_read_tiers":[{"cost":"0.00000004","min":0,"max":272000},{"cost":"0.00000008","min":272000}],"input_cache_write":"0.0000005","input_cache_write_tiers":[{"cost":"0.0000005","min":0,"max":272000},{"cost":"0.000001","min":272000}]},"regional":{"eu":{"input":"0.00000022","input_tiers":[{"cost":"0.00000022","min":0,"max":272000},{"cost":"0.00000044","min":272000}],"output":"0.00000132","output_tiers":[{"cost":"0.00000132","min":0,"max":272000},{"cost":"0.00000198","min":272000}],"input_cache_read":"0.000000022","input_cache_read_tiers":[{"cost":"0.000000022","max":272000},{"cost":"0.000000044","min":272000}],"input_cache_write":"0.000000275","input_cache_write_tiers":[{"cost":"0.000000275","min":0,"max":272000},{"cost":"0.00000055","min":272000}]},"us":{"input":"0.00000022","input_tiers":[{"cost":"0.00000022","min":0,"max":272000},{"cost":"0.00000044","min":272000}],"output":"0.00000132","output_tiers":[{"cost":"0.00000132","min":0,"max":272000},{"cost":"0.00000198","min":272000}],"input_cache_read":"0.000000022","input_cache_read_tiers":[{"cost":"0.000000022","max":272000},{"cost":"0.000000044","min":272000}],"input_cache_write":"0.000000275","input_cache_write_tiers":[{"cost":"0.000000275","min":0,"max":272000},{"cost":"0.00000055","min":272000}],"fast":{"input":"0.00000044","input_tiers":[{"cost":"0.00000044","min":0,"max":272000},{"cost":"0.00000088","min":272000}],"output":"0.00000264","output_tiers":[{"cost":"0.00000264","min":0,"max":272000},{"cost":"0.00000396","min":272000}],"input_cache_read":"0.000000044","input_cache_read_tiers":[{"cost":"0.000000044","min":0,"max":272000},{"cost":"0.000000088","min":272000}],"input_cache_write":"0.00000055","input_cache_write_tiers":[{"cost":"0.00000055","min":0,"max":272000},{"cost":"0.0000011","min":272000}]}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-6-luna)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.6 Luna (Max) | 37.324424 | max | False | 2026-07-09 |
| GPT-5.6 Luna (High) | 32.119645 | high | False | 2026-07-09 |
| GPT-5.6 Luna (Low) | 21.012478 | low | False | 2026-07-09 |
| GPT-5.6 Luna (Medium) | 25.035874 | medium | False | 2026-07-09 |
| GPT-5.6 Luna (Non-reasoning) | 15.527000 | none | False | 2026-07-09 |
| GPT-5.6 Luna (Xhigh) | 34.555349 | xhigh | False | 2026-07-09 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.6-luna-fast

- 名称/種類: GPT 5.6 Luna (Fast) / language
- リリース日/Unix秒: 2026-07-09 / 1783555200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, file-input, tool-use, vision, implicit-caching, web-search, explicit-caching, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000004","input_tiers":[{"cost":"0.0000004","min":0,"max":272000},{"cost":"0.0000008","min":272000}],"output":"0.0000024","output_tiers":[{"cost":"0.0000024","min":0,"max":272000},{"cost":"0.0000036","min":272000}],"input_cache_read":"0.00000004","input_cache_read_tiers":[{"cost":"0.00000004","min":0,"max":272000},{"cost":"0.00000008","min":272000}],"input_cache_write":"0.0000005","input_cache_write_tiers":[{"cost":"0.0000005","min":0,"max":272000},{"cost":"0.000001","min":272000}],"web_search":"10","regional":{"eu":{"input":"0.0000004","input_tiers":[{"cost":"0.0000004","min":0,"max":272000},{"cost":"0.0000008","min":272000}],"output":"0.0000024","output_tiers":[{"cost":"0.0000024","min":0,"max":272000},{"cost":"0.0000036","min":272000}],"input_cache_read":"0.00000004","input_cache_read_tiers":[{"cost":"0.00000004","min":0,"max":272000},{"cost":"0.00000008","min":272000}],"input_cache_write":"0.0000005","input_cache_write_tiers":[{"cost":"0.0000005","min":0,"max":272000},{"cost":"0.000001","min":272000}]},"us":{"input":"0.00000044","input_tiers":[{"cost":"0.00000044","min":0,"max":272000},{"cost":"0.00000088","min":272000}],"output":"0.00000264","output_tiers":[{"cost":"0.00000264","min":0,"max":272000},{"cost":"0.00000396","min":272000}],"input_cache_read":"0.000000044","input_cache_read_tiers":[{"cost":"0.000000044","min":0,"max":272000},{"cost":"0.000000088","min":272000}],"input_cache_write":"0.00000055","input_cache_write_tiers":[{"cost":"0.00000055","min":0,"max":272000},{"cost":"0.0000011","min":272000}]}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-6-luna)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.6 Luna (Max) | 37.324424 | max | False | 2026-07-09 |
| GPT-5.6 Luna (High) | 32.119645 | high | False | 2026-07-09 |
| GPT-5.6 Luna (Low) | 21.012478 | low | False | 2026-07-09 |
| GPT-5.6 Luna (Medium) | 25.035874 | medium | False | 2026-07-09 |
| GPT-5.6 Luna (Non-reasoning) | 15.527000 | none | False | 2026-07-09 |
| GPT-5.6 Luna (Xhigh) | 34.555349 | xhigh | False | 2026-07-09 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.6-sol

- 名称/種類: GPT 5.6 Sol / language
- リリース日/Unix秒: 2026-07-09 / 1783555200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, web-search, explicit-caching, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272000},{"cost":"0.000008","min":272000}],"output":"0.00002","output_tiers":[{"cost":"0.00002","min":0,"max":272000},{"cost":"0.00003","min":272000}],"input_cache_read":"0.0000004","input_cache_read_tiers":[{"cost":"0.0000004","min":0,"max":272000},{"cost":"0.0000008","min":272000}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272000},{"cost":"0.00001","min":272000}],"web_search":"10","service_tiers":{"flex":{"input":"0.000002","output":"0.00001","input_cache_read":"0.0000002","long_context":{"threshold":272000,"input":"0.000004","output":"0.000015","input_cache_read":"0.0000004"}},"priority":{"input":"0.000008","output":"0.00004","input_cache_read":"0.0000008","long_context":{"threshold":272000,"input":"0.000016","output":"0.00006","input_cache_read":"0.0000016"}}},"varies_by_provider":true,"fast":{"input":"0.000008","input_tiers":[{"cost":"0.000008","min":0,"max":272000},{"cost":"0.000016","min":272000}],"output":"0.00004","output_tiers":[{"cost":"0.00004","min":0,"max":272000},{"cost":"0.00006","min":272000}],"input_cache_read":"0.0000008","input_cache_read_tiers":[{"cost":"0.0000008","min":0,"max":272000},{"cost":"0.0000016","min":272000}],"input_cache_write":"0.00001","input_cache_write_tiers":[{"cost":"0.00001","min":0,"max":272000},{"cost":"0.00002","min":272000}]},"regional":{"eu":{"input":"0.0000044","input_tiers":[{"cost":"0.0000044","min":0,"max":272000},{"cost":"0.0000088","min":272000}],"output":"0.000022","output_tiers":[{"cost":"0.000022","min":0,"max":272000},{"cost":"0.000033","min":272000}],"input_cache_read":"0.00000044","input_cache_read_tiers":[{"cost":"0.00000044","min":0,"max":272000},{"cost":"0.00000088","min":272000}],"input_cache_write":"0.0000055","input_cache_write_tiers":[{"cost":"0.0000055","min":0,"max":272000},{"cost":"0.000011","min":272000}]},"us":{"input":"0.0000044","input_tiers":[{"cost":"0.0000044","min":0,"max":272000},{"cost":"0.0000088","min":272000}],"output":"0.000022","output_tiers":[{"cost":"0.000022","min":0,"max":272000},{"cost":"0.000033","min":272000}],"input_cache_read":"0.00000044","input_cache_read_tiers":[{"cost":"0.00000044","min":0,"max":272000},{"cost":"0.00000088","min":272000}],"input_cache_write":"0.0000055","input_cache_write_tiers":[{"cost":"0.0000055","min":0,"max":272000},{"cost":"0.000011","min":272000}],"fast":{"input":"0.0000088","input_tiers":[{"cost":"0.0000088","min":0,"max":272000},{"cost":"0.0000176","min":272000}],"output":"0.000044","output_tiers":[{"cost":"0.000044","min":0,"max":272000},{"cost":"0.000066","min":272000}],"input_cache_read":"0.00000088","input_cache_read_tiers":[{"cost":"0.00000088","min":0,"max":272000},{"cost":"0.00000176","min":272000}],"input_cache_write":"0.000011","input_cache_write_tiers":[{"cost":"0.000011","min":0,"max":272000},{"cost":"0.000022","min":272000}]}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-6-sol)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.6 Sol (Max) | 46.972707 | max | False | 2026-07-09 |
| GPT-5.6 Sol (High) | 42.346101 | high | False | 2026-07-09 |
| GPT-5.6 Sol (Low) | 33.473139 | low | False | 2026-07-09 |
| GPT-5.6 Sol (Medium) | 39.236359 | medium | False | 2026-07-09 |
| GPT-5.6 Sol (Non-reasoning) | 28.328004 | none | True | 2026-07-09 |
| GPT-5.6 Sol (Xhigh) | 44.008876 | xhigh | False | 2026-07-09 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.6-sol-fast

- 名称/種類: GPT 5.6 Sol (Fast) / language
- リリース日/Unix秒: 2026-07-09 / 1783555200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, web-search, explicit-caching, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000008","input_tiers":[{"cost":"0.000008","min":0,"max":272000},{"cost":"0.000016","min":272000}],"output":"0.00004","output_tiers":[{"cost":"0.00004","min":0,"max":272000},{"cost":"0.00006","min":272000}],"input_cache_read":"0.0000008","input_cache_read_tiers":[{"cost":"0.0000008","min":0,"max":272000},{"cost":"0.0000016","min":272000}],"input_cache_write":"0.00001","input_cache_write_tiers":[{"cost":"0.00001","min":0,"max":272000},{"cost":"0.00002","min":272000}],"web_search":"10","regional":{"eu":{"input":"0.000008","input_tiers":[{"cost":"0.000008","min":0,"max":272000},{"cost":"0.000016","min":272000}],"output":"0.00004","output_tiers":[{"cost":"0.00004","min":0,"max":272000},{"cost":"0.00006","min":272000}],"input_cache_read":"0.0000008","input_cache_read_tiers":[{"cost":"0.0000008","min":0,"max":272000},{"cost":"0.0000016","min":272000}],"input_cache_write":"0.00001","input_cache_write_tiers":[{"cost":"0.00001","min":0,"max":272000},{"cost":"0.00002","min":272000}]},"us":{"input":"0.0000088","input_tiers":[{"cost":"0.0000088","min":0,"max":272000},{"cost":"0.0000176","min":272000}],"output":"0.000044","output_tiers":[{"cost":"0.000044","min":0,"max":272000},{"cost":"0.000066","min":272000}],"input_cache_read":"0.00000088","input_cache_read_tiers":[{"cost":"0.00000088","min":0,"max":272000},{"cost":"0.00000176","min":272000}],"input_cache_write":"0.000011","input_cache_write_tiers":[{"cost":"0.000011","min":0,"max":272000},{"cost":"0.000022","min":272000}]}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / Auto価格帯上限超過
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-6-sol)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.6 Sol (Max) | 46.972707 | max | False | 2026-07-09 |
| GPT-5.6 Sol (High) | 42.346101 | high | False | 2026-07-09 |
| GPT-5.6 Sol (Low) | 33.473139 | low | False | 2026-07-09 |
| GPT-5.6 Sol (Medium) | 39.236359 | medium | False | 2026-07-09 |
| GPT-5.6 Sol (Non-reasoning) | 28.328004 | none | True | 2026-07-09 |
| GPT-5.6 Sol (Xhigh) | 44.008876 | xhigh | False | 2026-07-09 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.6-terra

- 名称/種類: GPT 5.6 Terra / language
- リリース日/Unix秒: 2026-07-09 / 1783555200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, web-search, file-input, tool-use, vision, implicit-caching, explicit-caching, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","input_tiers":[{"cost":"0.000002","min":0,"max":272000},{"cost":"0.000004","min":272000}],"output":"0.000012","output_tiers":[{"cost":"0.000012","min":0,"max":272000},{"cost":"0.000018","min":272000}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":272000},{"cost":"0.0000004","min":272000}],"input_cache_write":"0.0000025","input_cache_write_tiers":[{"cost":"0.0000025","min":0,"max":272000},{"cost":"0.000005","min":272000}],"web_search":"10","service_tiers":{"flex":{"input":"0.000001","output":"0.000006","input_cache_read":"0.0000001","long_context":{"threshold":272000,"input":"0.000002","output":"0.000009","input_cache_read":"0.0000002"}},"priority":{"input":"0.000004","output":"0.000024","input_cache_read":"0.0000004","long_context":{"threshold":272000,"input":"0.000008","output":"0.000036","input_cache_read":"0.0000008"}}},"fast":{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272000},{"cost":"0.000008","min":272000}],"output":"0.000024","output_tiers":[{"cost":"0.000024","min":0,"max":272000},{"cost":"0.000036","min":272000}],"input_cache_read":"0.0000004","input_cache_read_tiers":[{"cost":"0.0000004","min":0,"max":272000},{"cost":"0.0000008","min":272000}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272000},{"cost":"0.00001","min":272000}]},"regional":{"eu":{"input":"0.0000022","input_tiers":[{"cost":"0.0000022","min":0,"max":272000},{"cost":"0.0000044","min":272000}],"output":"0.0000132","output_tiers":[{"cost":"0.0000132","min":0,"max":272000},{"cost":"0.0000198","min":272000}],"input_cache_read":"0.00000022","input_cache_read_tiers":[{"cost":"0.00000022","min":0,"max":272000},{"cost":"0.00000044","min":272000}],"input_cache_write":"0.00000275","input_cache_write_tiers":[{"cost":"0.00000275","min":0,"max":272000},{"cost":"0.0000055","min":272000}]},"us":{"input":"0.0000022","input_tiers":[{"cost":"0.0000022","min":0,"max":272000},{"cost":"0.0000044","min":272000}],"output":"0.0000132","output_tiers":[{"cost":"0.0000132","min":0,"max":272000},{"cost":"0.0000198","min":272000}],"input_cache_read":"0.00000022","input_cache_read_tiers":[{"cost":"0.00000022","min":0,"max":272000},{"cost":"0.00000044","min":272000}],"input_cache_write":"0.00000275","input_cache_write_tiers":[{"cost":"0.00000275","min":0,"max":272000},{"cost":"0.0000055","min":272000}],"fast":{"input":"0.0000044","input_tiers":[{"cost":"0.0000044","min":0,"max":272000},{"cost":"0.0000088","min":272000}],"output":"0.0000264","output_tiers":[{"cost":"0.0000264","min":0,"max":272000},{"cost":"0.0000396","min":272000}],"input_cache_read":"0.00000044","input_cache_read_tiers":[{"cost":"0.00000044","min":0,"max":272000},{"cost":"0.00000088","min":272000}],"input_cache_write":"0.0000055","input_cache_write_tiers":[{"cost":"0.0000055","min":0,"max":272000},{"cost":"0.000011","min":272000}]}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-6-terra)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.6 Terra (Max) | 42.082925 | max | False | 2026-07-09 |
| GPT-5.6 Terra (High) | 34.237656 | high | False | 2026-07-09 |
| GPT-5.6 Terra (Low) | 27.496203 | low | False | 2026-07-09 |
| GPT-5.6 Terra (Medium) | 30.093802 | medium | False | 2026-07-09 |
| GPT-5.6 Terra (Non-reasoning) | 20.779701 | none | False | 2026-07-09 |
| GPT-5.6 Terra (Xhigh) | 37.951337 | xhigh | False | 2026-07-09 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-5.6-terra-fast

- 名称/種類: GPT 5.6 Terra (Fast) / language
- リリース日/Unix秒: 2026-07-09 / 1783555200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, web-search, file-input, tool-use, vision, implicit-caching, explicit-caching, structured-output, websocket-realtime, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272000},{"cost":"0.000008","min":272000}],"output":"0.000024","output_tiers":[{"cost":"0.000024","min":0,"max":272000},{"cost":"0.000036","min":272000}],"input_cache_read":"0.0000004","input_cache_read_tiers":[{"cost":"0.0000004","min":0,"max":272000},{"cost":"0.0000008","min":272000}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272000},{"cost":"0.00001","min":272000}],"web_search":"10","regional":{"eu":{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272000},{"cost":"0.000008","min":272000}],"output":"0.000024","output_tiers":[{"cost":"0.000024","min":0,"max":272000},{"cost":"0.000036","min":272000}],"input_cache_read":"0.0000004","input_cache_read_tiers":[{"cost":"0.0000004","min":0,"max":272000},{"cost":"0.0000008","min":272000}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272000},{"cost":"0.00001","min":272000}]},"us":{"input":"0.0000044","input_tiers":[{"cost":"0.0000044","min":0,"max":272000},{"cost":"0.0000088","min":272000}],"output":"0.0000264","output_tiers":[{"cost":"0.0000264","min":0,"max":272000},{"cost":"0.0000396","min":272000}],"input_cache_read":"0.00000044","input_cache_read_tiers":[{"cost":"0.00000044","min":0,"max":272000},{"cost":"0.00000088","min":272000}],"input_cache_write":"0.0000055","input_cache_write_tiers":[{"cost":"0.0000055","min":0,"max":272000},{"cost":"0.000011","min":272000}]}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-5-6-terra)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-5.6 Terra (Max) | 42.082925 | max | False | 2026-07-09 |
| GPT-5.6 Terra (High) | 34.237656 | high | False | 2026-07-09 |
| GPT-5.6 Terra (Low) | 27.496203 | low | False | 2026-07-09 |
| GPT-5.6 Terra (Medium) | 30.093802 | medium | False | 2026-07-09 |
| GPT-5.6 Terra (Non-reasoning) | 20.779701 | none | False | 2026-07-09 |
| GPT-5.6 Terra (Xhigh) | 37.951337 | xhigh | False | 2026-07-09 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6-astra

- 名称/種類: GPT-6 Astra / language
- リリース日/Unix秒: 2026-09-04 / 1788480000
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, websocket-realtime, explicit-caching, structured-output, fast
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00001","input_tiers":[{"cost":"0.00001","max":272001},{"cost":"0.00002","min":272001}],"output":"0.00005","output_tiers":[{"cost":"0.00005","max":272001},{"cost":"0.000075","min":272001}],"input_cache_read":"0.000001","input_cache_read_tiers":[{"cost":"0.000001","max":272001},{"cost":"0.000002","min":272001}],"input_cache_write":"0.0000125","input_cache_write_tiers":[{"cost":"0.0000125","max":272001},{"cost":"0.000025","min":272001}],"web_search":"10","service_tiers":{"flex":{"input":"0.000005","output":"0.000025","input_cache_read":"0.0000005","long_context":{"threshold":272001,"input":"0.00001","output":"0.0000375","input_cache_read":"0.000001"}},"priority":{"input":"0.00002","output":"0.0001","input_cache_read":"0.000002","long_context":{"threshold":272001,"input":"0.00004","output":"0.00015","input_cache_read":"0.000004"}},"ultrafast":{"input":"0.00006","output":"0.0003","input_cache_read":"0.000006","long_context":{"threshold":272001,"input":"0.00012","output":"0.00045","input_cache_read":"0.000012"}}},"fast":{"input":"0.00002","input_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00004","min":272001}],"output":"0.0001","output_tiers":[{"cost":"0.0001","min":0,"max":272001},{"cost":"0.00015","min":272001}],"input_cache_read":"0.000002","input_cache_read_tiers":[{"cost":"0.000002","min":0,"max":272001},{"cost":"0.000004","min":272001}],"input_cache_write":"0.000025","input_cache_write_tiers":[{"cost":"0.000025","max":272001},{"cost":"0.00005","min":272001}]},"regional":{"eu":{"input":"0.000011","input_tiers":[{"cost":"0.000011","max":272001},{"cost":"0.000022","min":272001}],"output":"0.000055","output_tiers":[{"cost":"0.000055","max":272001},{"cost":"0.0000825","min":272001}],"input_cache_read":"0.0000011","input_cache_read_tiers":[{"cost":"0.0000011","max":272001},{"cost":"0.0000022","min":272001}],"input_cache_write":"0.00001375","input_cache_write_tiers":[{"cost":"0.00001375","max":272001},{"cost":"0.0000275","min":272001}]},"us":{"input":"0.000011","input_tiers":[{"cost":"0.000011","max":272001},{"cost":"0.000022","min":272001}],"output":"0.000055","output_tiers":[{"cost":"0.000055","max":272001},{"cost":"0.0000825","min":272001}],"input_cache_read":"0.0000011","input_cache_read_tiers":[{"cost":"0.0000011","max":272001},{"cost":"0.0000022","min":272001}],"input_cache_write":"0.00001375","input_cache_write_tiers":[{"cost":"0.00001375","max":272001},{"cost":"0.0000275","min":272001}],"fast":{"input":"0.000022","input_tiers":[{"cost":"0.000022","min":0,"max":272001},{"cost":"0.000044","min":272001}],"output":"0.00011","output_tiers":[{"cost":"0.00011","min":0,"max":272001},{"cost":"0.000165","min":272001}],"input_cache_read":"0.0000022","input_cache_read_tiers":[{"cost":"0.0000022","min":0,"max":272001},{"cost":"0.0000044","min":272001}],"input_cache_write":"0.0000275","input_cache_write_tiers":[{"cost":"0.0000275","max":272001},{"cost":"0.000055","min":272001}]}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-6-astra)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-6 Astra (Max) | 52.673669 | max | False | 2026-09-03 |
| GPT-6 Astra (High) | 50.919147 | high | False | 2026-09-03 |
| GPT-6 Astra (Low) | 45.781924 | low | False | 2026-09-03 |
| GPT-6 Astra (Medium) | 49.570436 | medium | False | 2026-09-03 |
| GPT-6 Astra (Xhigh) | 52.386328 | xhigh | False | 2026-09-03 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6-astra-fast

- 名称/種類: GPT-6 Astra (Fast) / language
- リリース日/Unix秒: 2026-09-04 / 1788480000
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, websocket-realtime, explicit-caching, structured-output, fast
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00002","input_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00004","min":272001}],"output":"0.0001","output_tiers":[{"cost":"0.0001","min":0,"max":272001},{"cost":"0.00015","min":272001}],"input_cache_read":"0.000002","input_cache_read_tiers":[{"cost":"0.000002","min":0,"max":272001},{"cost":"0.000004","min":272001}],"input_cache_write":"0.000025","input_cache_write_tiers":[{"cost":"0.000025","max":272001},{"cost":"0.00005","min":272001}],"web_search":"10","regional":{"eu":{"input":"0.00002","input_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00004","min":272001}],"output":"0.0001","output_tiers":[{"cost":"0.0001","min":0,"max":272001},{"cost":"0.00015","min":272001}],"input_cache_read":"0.000002","input_cache_read_tiers":[{"cost":"0.000002","min":0,"max":272001},{"cost":"0.000004","min":272001}],"input_cache_write":"0.000025","input_cache_write_tiers":[{"cost":"0.000025","max":272001},{"cost":"0.00005","min":272001}]},"us":{"input":"0.000022","input_tiers":[{"cost":"0.000022","min":0,"max":272001},{"cost":"0.000044","min":272001}],"output":"0.00011","output_tiers":[{"cost":"0.00011","min":0,"max":272001},{"cost":"0.000165","min":272001}],"input_cache_read":"0.0000022","input_cache_read_tiers":[{"cost":"0.0000022","min":0,"max":272001},{"cost":"0.0000044","min":272001}],"input_cache_write":"0.0000275","input_cache_write_tiers":[{"cost":"0.0000275","max":272001},{"cost":"0.000055","min":272001}]}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-6-astra)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-6 Astra (Max) | 52.673669 | max | False | 2026-09-03 |
| GPT-6 Astra (High) | 50.919147 | high | False | 2026-09-03 |
| GPT-6 Astra (Low) | 45.781924 | low | False | 2026-09-03 |
| GPT-6 Astra (Medium) | 49.570436 | medium | False | 2026-09-03 |
| GPT-6 Astra (Xhigh) | 52.386328 | xhigh | False | 2026-09-03 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6-luna

- 名称/種類: GPT-6 Luna / language
- リリース日/Unix秒: 2026-09-22 / 1790035200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, implicit-caching, reasoning, structured-output, tool-use, vision, web-search, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000001","input_tiers":[{"cost":"0.0000001","min":0,"max":272001},{"cost":"0.0000002","min":272001}],"output":"0.0000005","output_tiers":[{"cost":"0.0000005","min":0,"max":272001},{"cost":"0.00000075","min":272001}],"input_cache_read":"0.00000001","input_cache_read_tiers":[{"cost":"0.00000001","min":0,"max":272001},{"cost":"0.00000002","min":272001}],"input_cache_write":"0.000000125","input_cache_write_tiers":[{"cost":"0.000000125","min":0,"max":272001},{"cost":"0.00000025","min":272001}],"web_search":"10","service_tiers":{"flex":{"input":"0.00000005","output":"0.00000025","input_cache_read":"0.000000005","long_context":{"threshold":272001,"input":"0.0000001","output":"0.000000375","input_cache_read":"0.00000001"}},"priority":{"input":"0.0000002","output":"0.000001","input_cache_read":"0.00000002","long_context":{"threshold":272001,"input":"0.0000004","output":"0.0000015","input_cache_read":"0.00000004"}}},"fast":{"input":"0.0000002","input_tiers":[{"cost":"0.0000002","min":0,"max":272001},{"cost":"0.0000004","min":272001}],"output":"0.000001","output_tiers":[{"cost":"0.000001","min":0,"max":272001},{"cost":"0.0000015","min":272001}],"input_cache_read":"0.00000002","input_cache_read_tiers":[{"cost":"0.00000002","min":0,"max":272001},{"cost":"0.00000004","min":272001}],"input_cache_write":"0.00000025","input_cache_write_tiers":[{"cost":"0.00000025","min":0,"max":272001},{"cost":"0.0000005","min":272001}]},"regional":{"eu":{"input":"0.00000011","input_tiers":[{"cost":"0.00000011","min":0,"max":272001},{"cost":"0.00000022","min":272001}],"output":"0.00000055","output_tiers":[{"cost":"0.00000055","min":0,"max":272001},{"cost":"0.000000825","min":272001}],"input_cache_read":"0.000000011","input_cache_read_tiers":[{"cost":"0.000000011","min":0,"max":272001},{"cost":"0.000000022","min":272001}],"input_cache_write":"0.0000001375","input_cache_write_tiers":[{"cost":"0.0000001375","min":0,"max":272001},{"cost":"0.000000275","min":272001}]},"us":{"input":"0.00000011","input_tiers":[{"cost":"0.00000011","min":0,"max":272001},{"cost":"0.00000022","min":272001}],"output":"0.00000055","output_tiers":[{"cost":"0.00000055","min":0,"max":272001},{"cost":"0.000000825","min":272001}],"input_cache_read":"0.000000011","input_cache_read_tiers":[{"cost":"0.000000011","min":0,"max":272001},{"cost":"0.000000022","min":272001}],"input_cache_write":"0.0000001375","input_cache_write_tiers":[{"cost":"0.0000001375","min":0,"max":272001},{"cost":"0.000000275","min":272001}],"fast":{"input":"0.00000022","input_tiers":[{"cost":"0.00000022","min":0,"max":272001},{"cost":"0.00000044","min":272001}],"output":"0.0000011","output_tiers":[{"cost":"0.0000011","min":0,"max":272001},{"cost":"0.00000165","min":272001}],"input_cache_read":"0.000000022","input_cache_read_tiers":[{"cost":"0.000000022","min":0,"max":272001},{"cost":"0.000000044","min":272001}],"input_cache_write":"0.000000275","input_cache_write_tiers":[{"cost":"0.000000275","min":0,"max":272001},{"cost":"0.00000055","min":272001}]}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-6-luna)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-6 Luna (Max) | 38.124519 | max | False | 2026-09-22 |
| GPT-6 Luna (High) | 32.928205 | high | False | 2026-09-22 |
| GPT-6 Luna (Low) | 21.526198 | low | False | 2026-09-22 |
| GPT-6 Luna (Medium) | 29.925177 | medium | False | 2026-09-22 |
| GPT-6 Luna (Non-reasoning) | 18.467847 | none | False | 2026-09-22 |
| GPT-6 Luna (Xhigh) | 34.558732 | xhigh | False | 2026-09-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6-luna-fast

- 名称/種類: GPT-6 Luna (Fast) / language
- リリース日/Unix秒: 2026-09-22 / 1790035200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, implicit-caching, reasoning, structured-output, tool-use, vision, web-search, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","input_tiers":[{"cost":"0.0000002","min":0,"max":272001},{"cost":"0.0000004","min":272001}],"output":"0.000001","output_tiers":[{"cost":"0.000001","min":0,"max":272001},{"cost":"0.0000015","min":272001}],"input_cache_read":"0.00000002","input_cache_read_tiers":[{"cost":"0.00000002","min":0,"max":272001},{"cost":"0.00000004","min":272001}],"input_cache_write":"0.00000025","input_cache_write_tiers":[{"cost":"0.00000025","min":0,"max":272001},{"cost":"0.0000005","min":272001}],"web_search":"10","regional":{"eu":{"input":"0.0000002","input_tiers":[{"cost":"0.0000002","min":0,"max":272001},{"cost":"0.0000004","min":272001}],"output":"0.000001","output_tiers":[{"cost":"0.000001","min":0,"max":272001},{"cost":"0.0000015","min":272001}],"input_cache_read":"0.00000002","input_cache_read_tiers":[{"cost":"0.00000002","min":0,"max":272001},{"cost":"0.00000004","min":272001}],"input_cache_write":"0.00000025","input_cache_write_tiers":[{"cost":"0.00000025","min":0,"max":272001},{"cost":"0.0000005","min":272001}]},"us":{"input":"0.00000022","input_tiers":[{"cost":"0.00000022","min":0,"max":272001},{"cost":"0.00000044","min":272001}],"output":"0.0000011","output_tiers":[{"cost":"0.0000011","min":0,"max":272001},{"cost":"0.00000165","min":272001}],"input_cache_read":"0.000000022","input_cache_read_tiers":[{"cost":"0.000000022","min":0,"max":272001},{"cost":"0.000000044","min":272001}],"input_cache_write":"0.000000275","input_cache_write_tiers":[{"cost":"0.000000275","min":0,"max":272001},{"cost":"0.00000055","min":272001}]}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-6-luna)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-6 Luna (Max) | 38.124519 | max | False | 2026-09-22 |
| GPT-6 Luna (High) | 32.928205 | high | False | 2026-09-22 |
| GPT-6 Luna (Low) | 21.526198 | low | False | 2026-09-22 |
| GPT-6 Luna (Medium) | 29.925177 | medium | False | 2026-09-22 |
| GPT-6 Luna (Non-reasoning) | 18.467847 | none | False | 2026-09-22 |
| GPT-6 Luna (Xhigh) | 34.558732 | xhigh | False | 2026-09-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6-luna-decisions

- 名称/種類: GPT-6 Luna Decisions / evaluation
- リリース日/Unix秒: 2026-10-06 / 1791244800
- 文脈/最大出力: 1050000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000001"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：evaluation / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6-sol

- 名称/種類: GPT-6 Sol / language
- リリース日/Unix秒: 2026-09-22 / 1790035200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, implicit-caching, reasoning, structured-output, tool-use, vision, web-search, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","input_tiers":[{"cost":"0.000002","min":0,"max":272001},{"cost":"0.000004","min":272001}],"output":"0.00001","output_tiers":[{"cost":"0.00001","min":0,"max":272001},{"cost":"0.000015","min":272001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":272001},{"cost":"0.0000004","min":272001}],"input_cache_write":"0.0000025","input_cache_write_tiers":[{"cost":"0.0000025","min":0,"max":272001},{"cost":"0.000005","min":272001}],"web_search":"10","service_tiers":{"flex":{"input":"0.000001","output":"0.000005","input_cache_read":"0.0000001","long_context":{"threshold":272001,"input":"0.000002","output":"0.0000075","input_cache_read":"0.0000002"}},"priority":{"input":"0.000004","output":"0.00002","input_cache_read":"0.0000004","long_context":{"threshold":272001,"input":"0.000008","output":"0.00003","input_cache_read":"0.0000008"}}},"fast":{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272001},{"cost":"0.000008","min":272001}],"output":"0.00002","output_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00003","min":272001}],"input_cache_read":"0.0000004","input_cache_read_tiers":[{"cost":"0.0000004","min":0,"max":272001},{"cost":"0.0000008","min":272001}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272001},{"cost":"0.00001","min":272001}]},"regional":{"eu":{"input":"0.0000022","input_tiers":[{"cost":"0.0000022","min":0,"max":272001},{"cost":"0.0000044","min":272001}],"output":"0.000011","output_tiers":[{"cost":"0.000011","min":0,"max":272001},{"cost":"0.0000165","min":272001}],"input_cache_read":"0.00000022","input_cache_read_tiers":[{"cost":"0.00000022","min":0,"max":272001},{"cost":"0.00000044","min":272001}],"input_cache_write":"0.00000275","input_cache_write_tiers":[{"cost":"0.00000275","min":0,"max":272001},{"cost":"0.0000055","min":272001}]},"us":{"input":"0.0000022","input_tiers":[{"cost":"0.0000022","min":0,"max":272001},{"cost":"0.0000044","min":272001}],"output":"0.000011","output_tiers":[{"cost":"0.000011","min":0,"max":272001},{"cost":"0.0000165","min":272001}],"input_cache_read":"0.00000022","input_cache_read_tiers":[{"cost":"0.00000022","min":0,"max":272001},{"cost":"0.00000044","min":272001}],"input_cache_write":"0.00000275","input_cache_write_tiers":[{"cost":"0.00000275","min":0,"max":272001},{"cost":"0.0000055","min":272001}],"fast":{"input":"0.0000044","input_tiers":[{"cost":"0.0000044","min":0,"max":272001},{"cost":"0.0000088","min":272001}],"output":"0.000022","output_tiers":[{"cost":"0.000022","min":0,"max":272001},{"cost":"0.000033","min":272001}],"input_cache_read":"0.00000044","input_cache_read_tiers":[{"cost":"0.00000044","min":0,"max":272001},{"cost":"0.00000088","min":272001}],"input_cache_write":"0.0000055","input_cache_write_tiers":[{"cost":"0.0000055","min":0,"max":272001},{"cost":"0.000011","min":272001}]}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-6-sol)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-6 Sol (Max) | 47.630518 | max | False | 2026-09-22 |
| GPT-6 Sol (High) | 42.400451 | high | False | 2026-09-22 |
| GPT-6 Sol (Low) | 34.154876 | low | False | 2026-09-22 |
| GPT-6 Sol (Medium) | 39.811897 | medium | False | 2026-09-22 |
| GPT-6 Sol (Non-reasoning) | 28.512141 | none | False | 2026-09-22 |
| GPT-6 Sol (Xhigh) | 44.244896 | xhigh | False | 2026-09-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6-sol-fast

- 名称/種類: GPT-6 Sol (Fast) / language
- リリース日/Unix秒: 2026-09-22 / 1790035200
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, implicit-caching, reasoning, structured-output, tool-use, vision, web-search, fast
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272001},{"cost":"0.000008","min":272001}],"output":"0.00002","output_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00003","min":272001}],"input_cache_read":"0.0000004","input_cache_read_tiers":[{"cost":"0.0000004","min":0,"max":272001},{"cost":"0.0000008","min":272001}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272001},{"cost":"0.00001","min":272001}],"web_search":"10","regional":{"eu":{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272001},{"cost":"0.000008","min":272001}],"output":"0.00002","output_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00003","min":272001}],"input_cache_read":"0.0000004","input_cache_read_tiers":[{"cost":"0.0000004","min":0,"max":272001},{"cost":"0.0000008","min":272001}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272001},{"cost":"0.00001","min":272001}]},"us":{"input":"0.0000044","input_tiers":[{"cost":"0.0000044","min":0,"max":272001},{"cost":"0.0000088","min":272001}],"output":"0.000022","output_tiers":[{"cost":"0.000022","min":0,"max":272001},{"cost":"0.000033","min":272001}],"input_cache_read":"0.00000044","input_cache_read_tiers":[{"cost":"0.00000044","min":0,"max":272001},{"cost":"0.00000088","min":272001}],"input_cache_write":"0.0000055","input_cache_write_tiers":[{"cost":"0.0000055","min":0,"max":272001},{"cost":"0.000011","min":272001}]}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-6-sol)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-6 Sol (Max) | 47.630518 | max | False | 2026-09-22 |
| GPT-6 Sol (High) | 42.400451 | high | False | 2026-09-22 |
| GPT-6 Sol (Low) | 34.154876 | low | False | 2026-09-22 |
| GPT-6 Sol (Medium) | 39.811897 | medium | False | 2026-09-22 |
| GPT-6 Sol (Non-reasoning) | 28.512141 | none | False | 2026-09-22 |
| GPT-6 Sol (Xhigh) | 44.244896 | xhigh | False | 2026-09-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6.1-sol

- 名称/種類: GPT-6.1 Sol / language
- リリース日/Unix秒: 2026-09-29 / 1790640000
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, implicit-caching, reasoning, structured-output, tool-use, vision, web-search, fast
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","input_tiers":[{"cost":"0.000002","min":0,"max":272001},{"cost":"0.000004","min":272001}],"output":"0.00001","output_tiers":[{"cost":"0.00001","min":0,"max":272001},{"cost":"0.000015","min":272001}],"input_cache_read":"0.0000001","input_cache_read_tiers":[{"cost":"0.0000001","min":0,"max":272001},{"cost":"0.0000002","min":272001}],"input_cache_write":"0.0000025","input_cache_write_tiers":[{"cost":"0.0000025","min":0,"max":272001},{"cost":"0.000005","min":272001}],"web_search":"10","service_tiers":{"flex":{"input":"0.000001","output":"0.000005","input_cache_read":"0.00000005","long_context":{"threshold":272001,"input":"0.000002","output":"0.0000075","input_cache_read":"0.0000001"}},"priority":{"input":"0.000004","output":"0.00002","input_cache_read":"0.0000002","long_context":{"threshold":272001,"input":"0.000008","output":"0.00003","input_cache_read":"0.0000004"}}},"fast":{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272001},{"cost":"0.000008","min":272001}],"output":"0.00002","output_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00003","min":272001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":272001},{"cost":"0.0000004","min":272001}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272001},{"cost":"0.00001","min":272001}]},"regional":{"eu":{"input":"0.0000022","input_tiers":[{"cost":"0.0000022","min":0,"max":272001},{"cost":"0.0000044","min":272001}],"output":"0.000011","output_tiers":[{"cost":"0.000011","min":0,"max":272001},{"cost":"0.0000165","min":272001}],"input_cache_read":"0.00000011","input_cache_read_tiers":[{"cost":"0.00000011","min":0,"max":272001},{"cost":"0.00000022","min":272001}],"input_cache_write":"0.00000275","input_cache_write_tiers":[{"cost":"0.00000275","min":0,"max":272001},{"cost":"0.0000055","min":272001}]},"us":{"input":"0.0000022","input_tiers":[{"cost":"0.0000022","min":0,"max":272001},{"cost":"0.0000044","min":272001}],"output":"0.000011","output_tiers":[{"cost":"0.000011","min":0,"max":272001},{"cost":"0.0000165","min":272001}],"input_cache_read":"0.00000011","input_cache_read_tiers":[{"cost":"0.00000011","min":0,"max":272001},{"cost":"0.00000022","min":272001}],"input_cache_write":"0.00000275","input_cache_write_tiers":[{"cost":"0.00000275","min":0,"max":272001},{"cost":"0.0000055","min":272001}],"fast":{"input":"0.0000044","input_tiers":[{"cost":"0.0000044","min":0,"max":272001},{"cost":"0.0000088","min":272001}],"output":"0.000022","output_tiers":[{"cost":"0.000022","min":0,"max":272001},{"cost":"0.000033","min":272001}],"input_cache_read":"0.00000022","input_cache_read_tiers":[{"cost":"0.00000022","min":0,"max":272001},{"cost":"0.00000044","min":272001}],"input_cache_write":"0.0000055","input_cache_write_tiers":[{"cost":"0.0000055","min":0,"max":272001},{"cost":"0.000011","min":272001}]}}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-6-1-sol)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-6.1 Sol (Max) | 51.833260 | max | False | 2026-09-29 |
| GPT-6.1 Sol (High) | 50.237778 | high | False | 2026-09-29 |
| GPT-6.1 Sol (Low) | 42.083562 | low | False | 2026-09-29 |
| GPT-6.1 Sol (Medium) | 47.783327 | medium | False | 2026-09-29 |
| GPT-6.1 Sol (Xhigh) | 51.037768 | xhigh | False | 2026-09-29 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-6.1-sol-fast

- 名称/種類: GPT-6.1 Sol (Fast) / language
- リリース日/Unix秒: 2026-09-29 / 1790640000
- 文脈/最大出力: 1050000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: explicit-caching, file-input, implicit-caching, reasoning, structured-output, tool-use, vision, web-search, fast
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272001},{"cost":"0.000008","min":272001}],"output":"0.00002","output_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00003","min":272001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":272001},{"cost":"0.0000004","min":272001}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272001},{"cost":"0.00001","min":272001}],"web_search":"10","regional":{"eu":{"input":"0.000004","input_tiers":[{"cost":"0.000004","min":0,"max":272001},{"cost":"0.000008","min":272001}],"output":"0.00002","output_tiers":[{"cost":"0.00002","min":0,"max":272001},{"cost":"0.00003","min":272001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":272001},{"cost":"0.0000004","min":272001}],"input_cache_write":"0.000005","input_cache_write_tiers":[{"cost":"0.000005","min":0,"max":272001},{"cost":"0.00001","min":272001}]},"us":{"input":"0.0000044","input_tiers":[{"cost":"0.0000044","min":0,"max":272001},{"cost":"0.0000088","min":272001}],"output":"0.000022","output_tiers":[{"cost":"0.000022","min":0,"max":272001},{"cost":"0.000033","min":272001}],"input_cache_read":"0.00000022","input_cache_read_tiers":[{"cost":"0.00000022","min":0,"max":272001},{"cost":"0.00000044","min":272001}],"input_cache_write":"0.0000055","input_cache_write_tiers":[{"cost":"0.0000055","min":0,"max":272001},{"cost":"0.000011","min":272001}]}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-6-1-sol)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GPT-6.1 Sol (Max) | 51.833260 | max | False | 2026-09-29 |
| GPT-6.1 Sol (High) | 50.237778 | high | False | 2026-09-29 |
| GPT-6.1 Sol (Low) | 42.083562 | low | False | 2026-09-29 |
| GPT-6.1 Sol (Medium) | 47.783327 | medium | False | 2026-09-29 |
| GPT-6.1 Sol (Xhigh) | 51.037768 | xhigh | False | 2026-09-29 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-image-1

- 名称/種類: GPT Image 1 / image
- リリース日/Unix秒: 2025-03-25 / 1742860800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation, implicit-caching
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000005","output":"0.00004","input_cache_read":"0.00000125"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / Auto価格帯上限超過 / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-image-1-mini

- 名称/種類: GPT Image 1 Mini / image
- リリース日/Unix秒: 2025-10-06 / 1759708800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation, implicit-caching
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000008","input_cache_read":"0.0000002"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-image-1.5

- 名称/種類: GPT Image 1.5 / image
- リリース日/Unix秒: 2025-12-16 / 1765843200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation, implicit-caching
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000005","output":"0.000032","input_cache_read":"0.00000125"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / Auto価格帯上限超過 / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-image-2

- 名称/種類: GPT Image 2 / image
- リリース日/Unix秒: 2026-04-21 / 1776729600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation, implicit-caching
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000005","output":"0.00003","input_cache_read":"0.00000125"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-image-2.5-flare

- 名称/種類: GPT Image 2.5 Flare / image
- リリース日/Unix秒: 2026-09-08 / 1788825600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation, implicit-caching
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000005","output":"0.00003","input_cache_read":"0.00000125"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-image-2.5-sunburst

- 名称/種類: GPT Image 2.5 Sunburst / image
- リリース日/Unix秒: 2026-09-08 / 1788825600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation, implicit-caching
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000005","output":"0.00003","input_cache_read":"0.00000125"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-live-1

- 名称/種類: GPT-Live 1 / realtime
- リリース日/Unix秒: 2026-09-10 / 1788998400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: audio-input
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop
- 全料金（元の単位）: `{"web_search":"10","realtime_session_duration_cost_per_second":"0.0008334"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-oss-120b

- 名称/種類: GPT OSS 120B / language
- リリース日/Unix秒: 2025-08-05 / 1754352000
- 文脈/最大出力: 131072 / 131072
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000001","output":"0.0000005","input_cache_read":"0.0000001","varies_by_provider":true,"regional":{"us":{"input":"0.0000001","output":"0.0000005","input_cache_read":"0.0000001"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-oss-120b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| gpt-oss-120b (High) | 11.602843 | high | False | 2025-08-05 |
| gpt-oss-120b (Low) | 10.210565 | low | True | 2025-08-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-oss-20b

- 名称/種類: GPT OSS 20B / language
- リリース日/Unix秒: 2025-08-05 / 1754352000
- 文脈/最大出力: 131072 / 8192
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000003","output":"0.00000014","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/gpt-oss-20b)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| gpt-oss-20b (High) | 8.967517 | high | False | 2025-08-05 |
| gpt-oss-20b (Low) | 9.952953 | low | True | 2025-08-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-oss-safeguard-120b

- 名称/種類: GPT OSS Safeguard 120B / language
- リリース日/Unix秒: 2025-12-02 / 1764633600
- 文脈/最大出力: 128000 / 16000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.0000006"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：安全性分類専用 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-oss-safeguard-20b

- 名称/種類: GPT OSS Safeguard 20B / language
- リリース日/Unix秒: 2025-10-29 / 1761696000
- 文脈/最大出力: 128000 / 16000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000007","output":"0.0000002","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：安全性分類専用 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-realtime-1.5

- 名称/種類: GPT-Realtime-1.5 / realtime
- リリース日/Unix秒: 2026-02-23 / 1771804800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop
- 全料金（元の単位）: `{"input":"0.000004","output":"0.000016","input_cache_read":"0.0000004","web_search":"10","audio_input_token_cost":"0.000032","audio_output_token_cost":"0.000064"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-realtime-2

- 名称/種類: gpt-realtime-2 / realtime
- リリース日/Unix秒: 2026-05-07 / 1778112000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: websocket-realtime
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000004","output":"0.000024","input_cache_read":"0.0000004","web_search":"10","audio_input_token_cost":"0.000032","audio_output_token_cost":"0.000064"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-realtime-2.1

- 名称/種類: gpt-realtime-2.1 / realtime
- リリース日/Unix秒: 2026-07-09 / 1783555200
- 文脈/最大出力: 128000 / 32000
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "effort", "values": ["minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000004","output":"0.000024","input_cache_read":"0.0000004","web_search":"10","audio_input_token_cost":"0.000032","audio_output_token_cost":"0.000064"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-realtime-mini

- 名称/種類: GPT-Realtime mini / realtime
- リリース日/Unix秒: 2025-10-10 / 1760054400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000024","input_cache_read":"0.00000006","web_search":"10","audio_input_token_cost":"0.00001","audio_output_token_cost":"0.00002"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/gpt-realtime-whisper

- 名称/種類: gpt-realtime-whisper / transcription
- リリース日/Unix秒: 2026-05-07 / 1778112000
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: websocket-realtime, websocket-transcription
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000000002","transcription_duration_cost_per_second":"0.000284"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/o1

- 名称/種類: o1 / language
- リリース日/Unix秒: 2024-12-05 / 1733356800
- 文脈/最大出力: 200000 / 100000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, reasoning, tool-use, vision, implicit-caching, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000015","output":"0.00006","input_cache_read":"0.0000075"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/o1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| o1 | 15.230942 | 未特定 | True | 2024-12-05 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/o3

- 名称/種類: o3 / language
- リリース日/Unix秒: 2025-04-16 / 1744761600
- 文脈/最大出力: 200000 / 100000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, fast, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000008","input_cache_read":"0.0000005","web_search":"10","service_tiers":{"priority":{"input":"0.0000035","output":"0.000014","input_cache_read":"0.000000875"},"flex":{"input":"0.000001","output":"0.000004","input_cache_read":"0.00000025"}},"fast":{"input":"0.0000035","output":"0.000014","input_cache_read":"0.000000875"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/o3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| o3 | 20.200755 | 未特定 | True | 2025-04-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/o3-fast

- 名称/種類: o3 (Fast) / language
- リリース日/Unix秒: 2025-04-16 / 1744761600
- 文脈/最大出力: 200000 / 100000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, fast, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000035","output":"0.000014","input_cache_read":"0.000000875","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/o3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| o3 | 20.200755 | 未特定 | True | 2025-04-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/o3-mini

- 名称/種類: o3-mini / language
- リリース日/Unix秒: 2025-01-31 / 1738281600
- 文脈/最大出力: 200000 / 100000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000011","output":"0.0000044","input_cache_read":"0.00000055"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/o3-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| o3-mini | 12.470771 | 未特定 | True | 2025-01-31 |
| o3-mini (High) | 10.964387 | high | False | 2025-01-31 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/o3-pro

- 名称/種類: o3 Pro / language
- リリース日/Unix秒: 2025-06-10 / 1749513600
- 文脈/最大出力: 200000 / 100000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, vision, file-input, tool-use, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00002","output":"0.00008","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / Auto価格帯上限超過 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/o3-pro)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| o3-pro | 21.869976 | 未特定 | True | 2025-06-10 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/o4-mini

- 名称/種類: o4-mini / language
- リリース日/Unix秒: 2025-04-16 / 1744761600
- 文脈/最大出力: 200000 / 100000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, fast
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000011","output":"0.0000044","input_cache_read":"0.000000275","web_search":"10","service_tiers":{"priority":{"input":"0.000002","output":"0.000008","input_cache_read":"0.0000005"},"flex":{"input":"0.00000055","output":"0.0000022","input_cache_read":"0.000000138"}},"fast":{"input":"0.000002","output":"0.000008","input_cache_read":"0.0000005"}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/o4-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| o4-mini (High) | 16.653105 | high | True | 2025-04-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/o4-mini-fast

- 名称/種類: o4-mini (Fast) / language
- リリース日/Unix秒: 2025-04-16 / 1744761600
- 文脈/最大出力: 200000 / 100000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: file-input, implicit-caching, reasoning, tool-use, vision, web-search, structured-output, fast
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000008","input_cache_read":"0.0000005","web_search":"10"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/o4-mini)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| o4-mini (High) | 16.653105 | high | True | 2025-04-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/text-embedding-3-large

- 名称/種類: text-embedding-3-large / embedding
- リリース日/Unix秒: 2024-01-25 / 1706140800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000013"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/text-embedding-3-small

- 名称/種類: text-embedding-3-small / embedding
- リリース日/Unix秒: 2024-01-25 / 1706140800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000002","regional":{"eu":{"input":"0.00000002"},"us":{"input":"0.00000002"}}}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/text-embedding-ada-002

- 名称/種類: text-embedding-ada-002 / embedding
- リリース日/Unix秒: 2022-12-15 / 1671062400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000001"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/tts-1

- 名称/種類: TTS-1 / speech
- リリース日/Unix秒: 2023-11-06 / 1699228800
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000015","speech_input_character_cost":"0.000015"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/tts-1-hd

- 名称/種類: TTS-1 HD / speech
- リリース日/Unix秒: 2023-11-06 / 1699228800
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00003","speech_input_character_cost":"0.00003"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### openai/whisper-1

- 名称/種類: Whisper / transcription
- リリース日/Unix秒: 2022-09-21 / 1663718400
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.0000000001","transcription_duration_cost_per_second":"0.0001"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### perplexity/pplx-embed-v1-0.6b

- 名称/種類: Embed v1 0.6b / embedding
- リリース日/Unix秒: 2026-02-26 / 1772064000
- 文脈/最大出力: 32000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000000004"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### perplexity/pplx-embed-v1-4b

- 名称/種類: Embed v1 4b / embedding
- リリース日/Unix秒: 2026-02-26 / 1772064000
- 文脈/最大出力: 32000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000003"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### perplexity/sonar

- 名称/種類: Sonar / language
- リリース日/Unix秒: 2025-02-19 / 1739923200
- 文脈/最大出力: 127000 / 8000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: vision, web-search, structured-output, reasoning
- 思考制御: [{"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000025","output":"0.0000025","input_cache_write":"0.0000000625","web_search":"2.5"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/sonar)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Sonar | 7.709715 | none | True | 2025-01-21 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### poolside/laguna-s-2.1

- 名称/種類: Laguna S 2.1 / language
- リリース日/Unix秒: 2026-07-20 / 1784505600
- 文脈/最大出力: 1000000 / 131072
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000009","output":"0.00000018","input_cache_read":"0.000000009"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### poolside/laguna-s-2.1-free

- 名称/種類: Laguna S 2.1 Free / language
- リリース日/Unix秒: 2026-07-21 / 1784592000
- 文脈/最大出力: 256000 / 32768
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, free
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0","output":"0"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### prodia/flux-fast-schnell

- 名称/種類: Flux Schnell / image
- リリース日/Unix秒: 2024-08-02 / 1722556800
- 文脈/最大出力: 512 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### quiverai/arrow-1.1

- 名称/種類: Arrow 1.1 / image
- リリース日/Unix秒: 2026-04-16 / 1776297600
- 文脈/最大出力: 131072 / 131072
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image_dimension_quality_pricing":[{"operation":"generate","cost":"0.2"},{"operation":"vectorize","cost":"0.15"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### quiverai/arrow-2

- 名称/種類: Arrow 2 / language
- リリース日/Unix秒: 2026-09-16 / 1789516800
- 文脈/最大出力: 131072 / 131072
- モダリティ: {"input": ["text", "image"], "output": ["text", "image"]}
- 全機能タグ: tool-use, reasoning, vision, image-generation, implicit-caching
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000004","output":"0.00002","input_cache_read":"0.0000004","input_cache_write":"0.000005"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### quiverai/arrow-2-telos

- 名称/種類: Arrow 2 Telos / language
- リリース日/Unix秒: 2026-09-16 / 1789516800
- 文脈/最大出力: 131072 / 131072
- モダリティ: {"input": ["text", "image"], "output": ["text", "image"]}
- 全機能タグ: tool-use, reasoning, vision, image-generation, implicit-caching
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000006","output":"0.00003","input_cache_read":"0.0000006","input_cache_write":"0.0000075"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v2

- 名称/種類: Recraft V2 / image
- リリース日/Unix秒: 2024-03-13 / 1710288000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.022","image_dimension_quality_pricing":[{"style":"vector_illustration","cost":"0.044"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v3

- 名称/種類: Recraft V3 / image
- リリース日/Unix秒: 2024-10-30 / 1730246400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.04","image_dimension_quality_pricing":[{"style":"vector_illustration","cost":"0.08"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v4

- 名称/種類: Recraft V4 / image
- リリース日/Unix秒: 2026-02-17 / 1771286400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.04","image_dimension_quality_pricing":[{"style":"vector_illustration","cost":"0.08"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v4-pro

- 名称/種類: Recraft V4 Pro / image
- リリース日/Unix秒: 2026-02-17 / 1771286400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.25","image_dimension_quality_pricing":[{"style":"vector_illustration","cost":"0.3"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v4.1

- 名称/種類: Recraft V4.1 / image
- リリース日/Unix秒: 2026-05-14 / 1778716800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.035","image_dimension_quality_pricing":[{"style":"vector_illustration","cost":"0.08"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v4.1-flash

- 名称/種類: Recraft V4.1 Flash / image
- リリース日/Unix秒: 2026-09-23 / 1790121600
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.007"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v4.1-pro

- 名称/種類: Recraft V4.1 Pro / image
- リリース日/Unix秒: 2026-05-14 / 1778716800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.21","image_dimension_quality_pricing":[{"style":"vector_illustration","cost":"0.3"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v4.1-utility

- 名称/種類: Recraft V4.1 Utility / image
- リリース日/Unix秒: 2026-05-14 / 1778716800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.035","image_dimension_quality_pricing":[{"style":"vector_illustration","cost":"0.08"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### recraft/recraft-v4.1-utility-pro

- 名称/種類: Recraft V4.1 Utility Pro / image
- リリース日/Unix秒: 2026-05-14 / 1778716800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.21","image_dimension_quality_pricing":[{"style":"vector_illustration","cost":"0.3"}]}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### sakana/fugu-max

- 名称/種類: Fugu Max / language
- リリース日/Unix秒: 2026-09-10 / 1788998400
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, implicit-caching, structured-output
- 思考制御: [{"type": "effort", "values": ["high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","output":"0.000006","input_cache_read":"0.00000025"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### sakana/fugu-ultra

- 名称/種類: Fugu Ultra / language
- リリース日/Unix秒: 2026-06-21 / 1782000000
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: vision, tool-use, reasoning, structured-output
- 思考制御: [{"type": "effort", "values": ["high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","input_tiers":[{"cost":"0.000005","min":0,"max":272001},{"cost":"0.00001","min":272001}],"output":"0.00003","output_tiers":[{"cost":"0.00003","min":0,"max":272001},{"cost":"0.000045","min":272001}],"input_cache_read":"0.0000005","input_cache_read_tiers":[{"cost":"0.0000005","min":0,"max":272001},{"cost":"0.000001","min":272001}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### sakana/fugu-ultra-v2

- 名称/種類: Fugu Ultra v2 / language
- リリース日/Unix秒: 2026-09-10 / 1788998400
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, implicit-caching, structured-output
- 思考制御: [{"type": "effort", "values": ["high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000005","input_tiers":[{"cost":"0.000005","min":0,"max":272001},{"cost":"0.00001","min":272001}],"output":"0.00003","output_tiers":[{"cost":"0.00003","min":0,"max":272001},{"cost":"0.000045","min":272001}],"input_cache_read":"0.0000005","input_cache_read_tiers":[{"cost":"0.0000005","min":0,"max":272001},{"cost":"0.000001","min":272001}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### sakana/namazu

- 名称/種類: Sakana Namazu / language
- リリース日/Unix秒: 2026-08-03 / 1785715200
- 文脈/最大出力: 256000 / 256000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: vision, file-input, implicit-caching, reasoning, structured-output, tool-use, web-search
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000095","output":"0.000004","input_cache_read":"0.00000015"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### stealth/glyph-cluster

- 名称/種類: Glyph Cluster / language
- リリース日/Unix秒: 2026-10-07 / 1791331200
- 文脈/最大出力: 256000 / 256000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0","output":"0"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### stepfun/step-3.7-flash

- 名称/種類: Step 3.7 Flash / language
- リリース日/Unix秒: 2026-05-28 / 1779926400
- 文脈/最大出力: 256000 / 256000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","output":"0.00000115","input_cache_read":"0.00000004"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/step-3-7-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Step 3.7 Flash | 19.481257 | high | True | 2026-05-29 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### stepfun/step-5-preview

- 名称/種類: Step 5 Preview / language
- リリース日/Unix秒: 2026-09-20 / 1789862400
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: implicit-caching, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000001","output":"0.0000027","input_cache_read":"0.00000005"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：Preview・実験版 / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/step-5-preview)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Step 5 Preview | 43.734305 | 未特定 | False | 2026-09-18 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### tencent/hy-mt2-lite

- 名称/種類: Tencent Hy-MT2-Lite / language
- リリース日/Unix秒: 2026-06-12 / 1781222400
- 文脈/最大出力: 8000 / 4000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop
- 全料金（元の単位）: `{"input":"0.000000044","output":"0.000000177"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### tencent/hy-mt2-plus

- 名称/種類: Tencent Hy-MT2-Plus / language
- リリース日/Unix秒: 2026-06-12 / 1781222400
- 文脈/最大出力: 8000 / 4000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000000074","output":"0.000000295"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### tencent/hy-mt2-pro

- 名称/種類: Tencent Hy-MT2-Pro / language
- リリース日/Unix秒: 2026-05-21 / 1779321600
- 文脈/最大出力: 8000 / 4000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: structured-output
- 思考制御: []
- 対応パラメータ: max_tokens, temperature, stop, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000000074","output":"0.000000295"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### tencent/hy3

- 名称/種類: Hy3 / language
- リリース日/Unix秒: 2026-07-06 / 1783296000
- 文脈/最大出力: 262144 / 262144
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "effort", "values": ["none", "low", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000014","output":"0.00000058","input_cache_read":"0.000000035","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/hy3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Hy3 | 25.297278 | 未特定 | False | 2026-07-06 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### tencent/hy4-preview

- 名称/種類: Tencent Hy4 Preview / language
- リリース日/Unix秒: 2026-08-28 / 1787875200
- 文脈/最大出力: 1024000 / 64000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "effort", "values": ["none", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.000000834","output":"0.000002501","input_cache_read":"0.000000042"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### thinkingmachines/inkling

- 名称/種類: Inkling / language
- リリース日/Unix秒: 2026-07-15 / 1784073600
- 文脈/最大出力: 256000 / 256000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, structured-output, tool-use, vision, file-input
- 思考制御: [{"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000001","output":"0.00000405","input_cache_read":"0.00000017","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/inkling)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Inkling (Xhigh) | 24.984781 | xhigh | False | 2026-07-15 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### thinkingmachines/inkling-small

- 名称/種類: Inkling Small / language
- リリース日/Unix秒: 2026-07-30 / 1785369600
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, file-input, implicit-caching, structured-output
- 思考制御: [{"type": "effort", "values": ["none", "minimal", "low", "medium", "high", "xhigh", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000045","output":"0.0000012","input_cache_read":"0.0000001","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/inkling-small)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Inkling Small | 25.658258 | 未特定 | False | 2026-07-30 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### topaz/proteus

- 名称/種類: Proteus / video
- リリース日/Unix秒: 2026-10-06 / 1791244800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### topaz/starlight-precise-2.6

- 名称/種類: Starlight Precise 2.6 / video
- リリース日/Unix秒: 2026-10-06 / 1791244800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### topaz/wonder-3.5

- 名称/種類: Wonder 3.5 / image
- リリース日/Unix秒: 2026-10-06 / 1791244800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### typesafe-ai/jev

- 名称/種類: Jev / evaluation
- リリース日/Unix秒: 2026-09-15 / 1789430400
- 文脈/最大出力: 32000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000000042","output":"0"}`
- データ保持/学習利用申告: zdr=some, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：evaluation / 対応するAAリリースを一覧で確認できない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/rerank-2.5

- 名称/種類: Voyage Rerank 2.5 / reranking
- リリース日/Unix秒: 2025-08-11 / 1754870400
- 文脈/最大出力: 32000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000005"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：reranking / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/rerank-2.5-lite

- 名称/種類: Voyage Rerank 2.5 Lite / reranking
- リリース日/Unix秒: 2025-08-11 / 1754870400
- 文脈/最大出力: 32000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000002"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：reranking / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/rerank-3

- 名称/種類: Voyage Rerank 3 / reranking
- リリース日/Unix秒: 2026-09-30 / 1790726400
- 文脈/最大出力: 32000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000005"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：reranking / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/rerank-3-lite

- 名称/種類: Voyage Rerank 3 Lite / reranking
- リリース日/Unix秒: 2026-09-30 / 1790726400
- 文脈/最大出力: 32000 / 32000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000002"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：reranking / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-3-large

- 名称/種類: voyage-3-large / embedding
- リリース日/Unix秒: 2025-01-07 / 1736208000
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000018"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-3.5

- 名称/種類: Voyage 3.5 / embedding
- リリース日/Unix秒: 2025-05-20 / 1747699200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000006"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-3.5-lite

- 名称/種類: Voyage 3.5 Lite / embedding
- リリース日/Unix秒: 2025-05-20 / 1747699200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000002"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-4

- 名称/種類: Voyage 4 / embedding
- リリース日/Unix秒: 2026-01-15 / 1768435200
- 文脈/最大出力: 32000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000006"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-4-large

- 名称/種類: Voyage 4 Large / embedding
- リリース日/Unix秒: 2026-01-15 / 1768435200
- 文脈/最大出力: 32000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000012"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-4-lite

- 名称/種類: Voyage 4 Lite / embedding
- リリース日/Unix秒: 2026-01-15 / 1768435200
- 文脈/最大出力: 32000 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000002"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-code-2

- 名称/種類: Voyage Code 2 / embedding
- リリース日/Unix秒: 2024-01-01 / 1704067200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000012"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-code-3

- 名称/種類: Voyage Code 3 / embedding
- リリース日/Unix秒: 2024-12-04 / 1733270400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000018"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-finance-2

- 名称/種類: Voyage Finance 2 / embedding
- リリース日/Unix秒: 2024-06-03 / 1717372800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000012"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### voyage/voyage-law-2

- 名称/種類: Voyage Law 2 / embedding
- リリース日/Unix秒: 2024-04-15 / 1713139200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: 未掲載
- 思考制御: []
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.00000012"}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：embedding / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.1-fast-non-reasoning

- 名称/種類: Grok 4.1 Fast Non-Reasoning / language
- リリース日/Unix秒: 2025-11-19 / 1763510400
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, file-input, vision, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","output":"0.0000005","input_cache_read":"0.00000005"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/grok-4-1-fast)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Grok 4.1 Fast (Non-reasoning) | 11.284907 | none | True | 2025-11-19 |
| Grok 4.1 Fast (Reasoning) | 20.370185 | 未特定 | True | 2025-11-19 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.1-fast-reasoning

- 名称/種類: Grok 4.1 Fast Reasoning / language
- リリース日/Unix秒: 2025-11-19 / 1763510400
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, file-input, vision, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","output":"0.0000005","input_cache_read":"0.00000005"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/grok-4-1-fast)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Grok 4.1 Fast (Non-reasoning) | 11.284907 | none | True | 2025-11-19 |
| Grok 4.1 Fast (Reasoning) | 20.370185 | 未特定 | True | 2025-11-19 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.20-multi-agent

- 名称/種類: Grok 4.20 Multi-Agent / language
- リリース日/Unix秒: 2026-03-10 / 1773100800
- 文脈/最大出力: 2000000 / 2000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, file-input, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.0000025","output_tiers":[{"cost":"0.0000025","min":0,"max":200001},{"cost":"0.000005","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":200001},{"cost":"0.0000004","min":200001}],"web_search":"5","service_tiers":{"priority":{"input":"0.0000025","output":"0.000005","input_cache_read":"0.0000004","long_context":{"threshold":200001,"input":"0.000005","output":"0.00001","input_cache_read":"0.0000008"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.20-multi-agent-beta

- 名称/種類: Grok 4.20 Multi Agent Beta / language
- リリース日/Unix秒: 2026-03-11 / 1773187200
- 文脈/最大出力: 2000000 / 2000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, file-input, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.0000025","output_tiers":[{"cost":"0.0000025","min":0,"max":200001},{"cost":"0.000005","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":200001},{"cost":"0.0000004","min":200001}],"web_search":"5"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.20-non-reasoning

- 名称/種類: Grok 4.20 Non-Reasoning / language
- リリース日/Unix秒: 2026-03-10 / 1773100800
- 文脈/最大出力: 2000000 / 2000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, implicit-caching, file-input, vision, structured-output, web-search
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.0000025","output_tiers":[{"cost":"0.0000025","min":0,"max":200001},{"cost":"0.000005","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":200001},{"cost":"0.0000004","min":200001}],"web_search":"5","service_tiers":{"priority":{"input":"0.0000025","output":"0.000005","input_cache_read":"0.0000004","long_context":{"threshold":200001,"input":"0.000005","output":"0.00001","input_cache_read":"0.0000008"}}},"varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/grok-4-20)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Grok 4.20 0309 v2 (Reasoning) | 25.655016 | 未特定 | True | 2026-04-07 |
| Grok 4.20 0309 v2 (Non-reasoning) | 14.201004 | none | True | 2026-04-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.20-non-reasoning-beta

- 名称/種類: Grok 4.20 Beta Non-Reasoning / language
- リリース日/Unix秒: 2026-03-11 / 1773187200
- 文脈/最大出力: 2000000 / 2000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: tool-use, implicit-caching, vision, file-input, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.0000025","output_tiers":[{"cost":"0.0000025","min":0,"max":200001},{"cost":"0.000005","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000004","min":200001}],"web_search":"5"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.20-reasoning

- 名称/種類: Grok 4.20 Reasoning / language
- リリース日/Unix秒: 2026-03-10 / 1773100800
- 文脈/最大出力: 2000000 / 2000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, file-input, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.0000025","output_tiers":[{"cost":"0.0000025","min":0,"max":200001},{"cost":"0.000005","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":200001},{"cost":"0.0000004","min":200001}],"web_search":"5","service_tiers":{"priority":{"input":"0.0000025","output":"0.000005","input_cache_read":"0.0000004","long_context":{"threshold":200001,"input":"0.000005","output":"0.00001","input_cache_read":"0.0000008"}}},"varies_by_provider":true}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: research-alias
- 判断: 保留/対象外：公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/grok-4-20)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Grok 4.20 0309 v2 (Reasoning) | 25.655016 | 未特定 | True | 2026-04-07 |
| Grok 4.20 0309 v2 (Non-reasoning) | 14.201004 | none | True | 2026-04-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.20-reasoning-beta

- 名称/種類: Grok 4.20 Beta Reasoning / language
- リリース日/Unix秒: 2026-03-11 / 1773187200
- 文脈/最大出力: 2000000 / 2000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, vision, file-input, implicit-caching, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.0000025","output_tiers":[{"cost":"0.0000025","min":0,"max":200001},{"cost":"0.000005","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":200001},{"cost":"0.0000004","min":200001}],"web_search":"5"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：Preview・実験版 / 対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.3

- 名称/種類: Grok 4.3 / language
- リリース日/Unix秒: 2026-04-30 / 1777507200
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, structured-output, web-search
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000125","input_tiers":[{"cost":"0.00000125","min":0,"max":200001},{"cost":"0.0000025","min":200001}],"output":"0.0000025","output_tiers":[{"cost":"0.0000025","min":0,"max":200001},{"cost":"0.000005","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":200001},{"cost":"0.0000004","min":200001}],"web_search":"5","service_tiers":{"priority":{"input":"0.0000025","output":"0.000005","input_cache_read":"0.0000004","long_context":{"threshold":200001,"input":"0.000005","output":"0.00001","input_cache_read":"0.0000008"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/grok-4-3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Grok 4.3 (High) | 24.880119 | high | False | 2026-04-30 |
| Grok 4.3 (Low) | 24.295900 | low | True | 2026-04-30 |
| Grok 4.3 (Medium) | 24.781694 | medium | True | 2026-04-30 |
| Grok 4.3 (Non-reasoning) | 13.992681 | none | False | 2026-04-30 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.5

- 名称/種類: Grok 4.5 / language
- リリース日/Unix秒: 2026-07-08 / 1783468800
- 文脈/最大出力: 500000 / 500000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, file-input, vision, web-search, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","input_tiers":[{"cost":"0.000002","min":0,"max":200001},{"cost":"0.000004","min":200001}],"output":"0.000006","output_tiers":[{"cost":"0.000006","min":0,"max":200001},{"cost":"0.000012","min":200001}],"input_cache_read":"0.0000003","input_cache_read_tiers":[{"cost":"0.0000003","min":0,"max":200001},{"cost":"0.0000006","min":200001}],"web_search":"5","service_tiers":{"priority":{"input":"0.000004","output":"0.000012","input_cache_read":"0.0000006","long_context":{"threshold":200001,"input":"0.000008","output":"0.000024","input_cache_read":"0.0000012"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/grok-4-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Grok 4.5 (High) | 38.812115 | high | False | 2026-07-08 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.6

- 名称/種類: Grok 4.6 / language
- リリース日/Unix秒: 2026-08-12 / 1786492800
- 文脈/最大出力: 500000 / 500000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","input_tiers":[{"cost":"0.000002","min":0,"max":200001},{"cost":"0.000004","min":200001}],"output":"0.000006","output_tiers":[{"cost":"0.000006","min":0,"max":200001},{"cost":"0.000012","min":200001}],"input_cache_read":"0.0000005","input_cache_read_tiers":[{"cost":"0.0000005","min":0,"max":200001},{"cost":"0.000001","min":200001}],"web_search":"5","service_tiers":{"priority":{"input":"0.000004","output":"0.000012","input_cache_read":"0.000001","long_context":{"threshold":200001,"input":"0.000008","output":"0.000024","input_cache_read":"0.000002"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/grok-4-6)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Grok 4.6 (High) | 44.311307 | high | False | 2026-08-12 |
| Grok 4.6 (Low) | 35.124695 | low | False | 2026-08-12 |
| Grok 4.6 (Medium) | 42.836323 | medium | False | 2026-08-12 |
| Grok 4.6 (Xhigh) | 44.199810 | xhigh | False | 2026-08-12 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-4.7

- 名称/種類: Grok 4.7 / language
- リリース日/Unix秒: 2026-09-21 / 1789948800
- 文脈/最大出力: 500000 / 500000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "medium", "high", "xhigh"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000002","input_tiers":[{"cost":"0.000002","min":0,"max":200001},{"cost":"0.000004","min":200001}],"output":"0.000006","output_tiers":[{"cost":"0.000006","min":0,"max":200001},{"cost":"0.000012","min":200001}],"input_cache_read":"0.0000005","input_cache_read_tiers":[{"cost":"0.0000005","min":0,"max":200001},{"cost":"0.000001","min":200001}],"web_search":"5","service_tiers":{"priority":{"input":"0.000004","output":"0.000012","input_cache_read":"0.000001","long_context":{"threshold":200001,"input":"0.000008","output":"0.000024","input_cache_read":"0.000002"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/grok-4-7)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| Grok 4.7 (Xhigh) | 46.446551 | xhigh | False | 2026-09-21 |
| Grok 4.7 (High) | 46.332177 | high | False | 2026-09-21 |
| Grok 4.7 (Low) | 42.216656 | low | False | 2026-09-21 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-build-0.1

- 名称/種類: Grok Build 0.1 / language
- リリース日/Unix秒: 2026-05-20 / 1779235200
- 文脈/最大出力: 256000 / 256000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, implicit-caching, vision, tool-use, web-search, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000001","input_tiers":[{"cost":"0.000001","min":0,"max":200001},{"cost":"0.000002","min":200001}],"output":"0.000002","output_tiers":[{"cost":"0.000002","min":0,"max":200001},{"cost":"0.000004","min":200001}],"input_cache_read":"0.0000002","input_cache_read_tiers":[{"cost":"0.0000002","min":0,"max":200001},{"cost":"0.0000004","min":200001}],"web_search":"5","service_tiers":{"priority":{"input":"0.000002","output":"0.000004","input_cache_read":"0.0000004","long_context":{"threshold":200001,"input":"0.000004","output":"0.000008","input_cache_read":"0.0000008"}}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-imagine-image

- 名称/種類: Grok Imagine Image / image
- リリース日/Unix秒: 2026-01-28 / 1769558400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.02"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-imagine-image-2.0

- 名称/種類: Grok Imagine Image 2.0 / image
- リリース日/Unix秒: 2026-08-07 / 1786060800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["image"]}
- 全機能タグ: image-generation
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"image":"0.06","image_dimension_quality_pricing":[{"quality":"low","cost":"0.04"},{"size":"2048x2048","cost":"0.08"},{"size":"2048x2048","quality":"low","cost":"0.06"}]}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：image / 画像/動画生成用途 / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-imagine-video

- 名称/種類: Grok Imagine / video
- リリース日/Unix秒: 2026-01-28 / 1769558400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","cost_per_second":"0.05"},{"resolution":"720p","cost_per_second":"0.07"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-imagine-video-1.5

- 名称/種類: Grok Imagine Video 1.5 / video
- リリース日/Unix秒: 2026-06-22 / 1782086400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","cost_per_second":"0.08"},{"resolution":"720p","cost_per_second":"0.14"},{"resolution":"1080p","cost_per_second":"0.25"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-imagine-video-1.5-lite

- 名称/種類: Grok Imagine Video 1.5 Lite / video
- リリース日/Unix秒: 2026-10-01 / 1790812800
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text"], "output": ["video"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"video_duration_pricing":[{"resolution":"480p","cost_per_second":"0.02"},{"resolution":"720p","cost_per_second":"0.03"},{"resolution":"1080p","cost_per_second":"0.14"}]}`
- データ保持/学習利用申告: zdr=none, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：video / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-stt

- 名称/種類: Grok STT / transcription
- リリース日/Unix秒: 2026-03-16 / 1773619200
- 文脈/最大出力: None / None
- モダリティ: {"input": ["audio"], "output": ["text"]}
- 全機能タグ: websocket-transcription
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0","transcription_duration_cost_per_second":"0.000028"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：transcription / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-tts

- 名称/種類: Grok TTS / speech
- リリース日/Unix秒: 2026-03-16 / 1773619200
- 文脈/最大出力: None / None
- モダリティ: {"input": ["text"], "output": ["audio"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: 未掲載
- 全料金（元の単位）: `{"input":"0.000015","speech_input_character_cost":"0.000015"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：speech / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-voice-think-fast-1.0

- 名称/種類: Grok Voice Think Fast 1.0 / realtime
- リリース日/Unix秒: 2026-04-23 / 1776902400
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning
- 全料金（元の単位）: `{"realtime_client_message_cost":"0.004","realtime_session_duration_cost_per_second":"0.000834"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### spacexai/grok-voice-think-fast-2.0

- 名称/種類: Grok Voice Think Fast 2.0 / realtime
- リリース日/Unix秒: 2026-07-29 / 1785283200
- 文脈/最大出力: 0 / 0
- モダリティ: {"input": ["text", "audio"], "output": ["text", "audio"]}
- 全機能タグ: 未掲載
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, reasoning, include_reasoning
- 全料金（元の単位）: `{"realtime_client_message_cost":"0.004","realtime_session_duration_cost_per_second":"0.001334"}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: not-language
- 判断: 保留/対象外：会話モデルではない：realtime / 対応するAAリリースを一覧で確認できない / 会話用の入出力token料金が揃わない / 文脈/出力上限未確認 / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### xiaomi/mimo-v2.5

- 名称/種類: MiMo M2.5 / language
- リリース日/Unix秒: 2026-04-22 / 1776816000
- 文脈/最大出力: 1050000 / 131100
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000014","output":"0.00000028","input_cache_read":"0.0000000028","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### xiaomi/mimo-v2.5-pro

- 名称/種類: MiMo V2.5 Pro / language
- リリース日/Unix秒: 2026-04-22 / 1776816000
- 文脈/最大出力: 1050000 / 131000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000000435","output":"0.00000087","input_cache_read":"0.0000000036","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mimo-v2-5-pro)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| MiMo-V2.5-Pro (Reasoning) | 25.986889 | 未特定 | False | 2026-04-22 |
| MiMo-V2.5-Pro (Non-reasoning) | 18.290033 | none | True | 2026-04-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### xiaomi/mimo-v2.6-flash

- 名称/種類: MiMo V2.6 Flash / language
- リリース日/Unix秒: 2026-09-21 / 1789948800
- 文脈/最大出力: 1048576 / 131072
- モダリティ: {"input": ["text", "audio", "image", "video"], "output": ["text"]}
- 全機能タグ: audio-input, implicit-caching, reasoning, structured-output, tool-use, video-input, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000004","output":"0.00000128","input_cache_read":"0.00000004","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mimo-v2-6-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| MiMo-V2.6-Flash | 37.884359 | 未特定 | False | 2026-09-21 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### xiaomi/mimo-v2.6-pro

- 名称/種類: MiMo V2.6 Pro / language
- リリース日/Unix秒: 2026-09-21 / 1789948800
- 文脈/最大出力: 1048576 / 131072
- モダリティ: {"input": ["text", "audio", "image", "video"], "output": ["text"]}
- 全機能タグ: audio-input, implicit-caching, reasoning, structured-output, tool-use, video-input, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000000435","output":"0.00000087","input_cache_read":"0.0000000036","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/mimo-v2-6-pro)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| MiMo-V2.6-Pro | 46.324207 | 未特定 | False | 2026-09-21 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### xiaomi/mimo-v2.6-pro-ultraspeed

- 名称/種類: MiMo V2.6 Pro UltraSpeed / language
- リリース日/Unix秒: 2026-09-21 / 1789948800
- 文脈/最大出力: 1048576 / 131072
- モダリティ: {"input": ["text", "audio", "image", "video"], "output": ["text"]}
- 全機能タグ: audio-input, implicit-caching, reasoning, structured-output, tool-use, video-input, vision
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "minimal", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000435","output":"0.0000087","input_cache_read":"0.000000036"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-4.5

- 名称/種類: GLM 4.5 / language
- リリース日/Unix秒: 2025-07-28 / 1753660800
- 文脈/最大出力: 128000 / 96000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000022","input_cache_read":"0.00000011"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-4-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-4.5 (Reasoning) | 12.768027 | 未特定 | True | 2025-07-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-4.5-air

- 名称/種類: GLM 4.5 Air / language
- リリース日/Unix秒: 2025-07-28 / 1753660800
- 文脈/最大出力: 128000 / 96000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000002","output":"0.0000011","input_cache_read":"0.00000003"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-4-5-air)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-4.5-Air | 11.088914 | 未特定 | True | 2025-07-28 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-4.5v

- 名称/種類: GLM 4.5V / language
- リリース日/Unix秒: 2025-08-11 / 1754870400
- 文脈/最大出力: 66000 / 16000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, vision, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000018","input_cache_read":"0.00000011"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-4-5v)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-4.5V (Non-reasoning) | 6.696698 | none | True | 2025-08-11 |
| GLM-4.5V (Reasoning) | 7.556123 | 未特定 | True | 2025-08-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-4.6

- 名称/種類: GLM 4.6 / language
- リリース日/Unix秒: 2025-09-30 / 1759190400
- 文脈/最大出力: 200000 / 96000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000022","input_cache_read":"0.00000011","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-4-6)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-4.6 (Non-reasoning) | 14.929299 | none | True | 2025-09-30 |
| GLM-4.6 (Reasoning) | 18.529748 | 未特定 | True | 2025-09-30 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-4.7

- 名称/種類: GLM 4.7 / language
- リリース日/Unix秒: 2025-12-22 / 1766361600
- 文脈/最大出力: 200000 / 120000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000006","output":"0.0000022","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-4-7)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-4.7 (Reasoning) | 22.240266 | 未特定 | True | 2025-12-22 |
| GLM-4.7 (Non-reasoning) | 17.356430 | none | True | 2025-12-22 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-4.7-flash

- 名称/種類: GLM 4.7 Flash / language
- リリース日/Unix秒: 2026-01-19 / 1768780800
- 文脈/最大出力: 200000 / 131000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000007","output":"0.0000004"}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-4-7-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-4.7-Flash (Reasoning) | 14.871973 | 未特定 | True | 2026-01-19 |
| GLM-4.7-Flash (Non-reasoning) | 10.555699 | none | True | 2026-01-19 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-4.7-flashx

- 名称/種類: GLM 4.7 FlashX / language
- リリース日/Unix秒: 2026-01-19 / 1768780800
- 文脈/最大出力: 200000 / 128000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.00000006","output":"0.0000004","input_cache_read":"0.00000001"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5

- 名称/種類: GLM 5 / language
- リリース日/Unix秒: 2026-02-12 / 1770854400
- 文脈/最大出力: 202800 / 131100
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, structured-output, implicit-caching
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.000001","output":"0.0000032"}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-5 (Reasoning) | 27.911155 | 未特定 | True | 2026-02-11 |
| GLM-5 (Non-reasoning) | 21.782648 | none | True | 2026-02-11 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5-turbo

- 名称/種類: GLM 5 Turbo / language
- リリース日/Unix秒: 2026-03-15 / 1773532800
- 文脈/最大出力: 202800 / 131100
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning
- 全料金（元の単位）: `{"input":"0.0000012","output":"0.000004","input_cache_read":"0.00000024"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5-turbo)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-5-Turbo | 26.596580 | 未特定 | True | 2026-03-15 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5.1

- 名称/種類: GLM 5.1 / language
- リリース日/Unix秒: 2026-04-07 / 1775520000
- 文脈/最大出力: 202800 / 64000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000014","output":"0.0000044","input_cache_read":"0.00000026","varies_by_provider":true}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5-1)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-5.1 (Reasoning) | 26.058591 | 未特定 | False | 2026-04-07 |
| GLM-5.1 (Non-reasoning) | 24.241210 | none | True | 2026-04-07 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5.2

- 名称/種類: GLM 5.2 / language
- リリース日/Unix秒: 2026-06-16 / 1781568000
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "high", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000008","output":"0.00000255","input_cache_read":"0.00000016","varies_by_provider":true,"fast":{"input":"0.0000028","output":"0.0000088","input_cache_read":"0.00000056"},"regional":{"us":{"input":"0.0000014","output":"0.0000044","input_cache_read":"0.00000014","fast":{"input":"0.0000021","output":"0.0000066","input_cache_read":"0.00000021"}}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5-2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-5.2 (Max) | 33.705457 | max | False | 2026-06-16 |
| GLM-5.2 (Non-reasoning) | 22.432347 | none | True | 2026-06-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5.2-fast

- 名称/種類: GLM 5.2 Fast / language
- リリース日/Unix秒: 2026-06-23 / 1782172800
- 文脈/最大出力: 1000000 / 128000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000028","output":"0.0000088","input_cache_read":"0.00000056","varies_by_provider":true,"regional":{"us":{"input":"0.0000021","output":"0.0000066","input_cache_read":"0.00000021"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5-2)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-5.2 (Max) | 33.705457 | max | False | 2026-06-16 |
| GLM-5.2 (Non-reasoning) | 22.432347 | none | True | 2026-06-16 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5.3

- 名称/種類: GLM 5.3 / language
- リリース日/Unix秒: 2026-08-18 / 1787011200
- 文脈/最大出力: 1000000 / 1000000
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: implicit-caching, reasoning, tool-use, structured-output, explicit-caching
- 思考制御: [{"type": "effort", "values": ["low", "high", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000014","output":"0.0000044","input_cache_read":"0.00000014","varies_by_provider":true,"fast":{"input":"0.0000021","output":"0.0000066","input_cache_read":"0.00000021"},"regional":{"us":{"input":"0.0000014","output":"0.0000044","input_cache_read":"0.00000014"}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 採用：対応思考量の公開指標を使用
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5-3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-5.3 (Max) | 44.777392 | max | False | 2026-08-18 |
| GLM-5.3 (Low) | 34.299008 | low | False | 2026-08-18 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5.3-fast

- 名称/種類: GLM 5.3 Fast / language
- リリース日/Unix秒: 2026-09-02 / 1788307200
- 文脈/最大出力: 1048576 / 262144
- モダリティ: {"input": ["text"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, structured-output
- 思考制御: [{"type": "toggle"}, {"type": "effort", "values": ["none", "low", "medium", "high"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000021","output":"0.0000066","input_cache_read":"0.00000021","varies_by_provider":true,"regional":{"us":{"input":"0.0000021","output":"0.0000066","input_cache_read":"0.00000021"}}}`
- データ保持/学習利用申告: zdr=all, no_training=all
- 評価対応: related-fast-variant
- 判断: 保留/対象外：Fast別ID：基本版の点を継承しない / 公開評価は参考対応のみ / 日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5-3)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM-5.3 (Max) | 44.777392 | max | False | 2026-08-18 |
| GLM-5.3 (Low) | 34.299008 | low | False | 2026-08-18 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5.3-flash

- 名称/種類: GLM 5.3 Flash / language
- リリース日/Unix秒: 2026-08-26 / 1787702400
- 文脈/最大出力: 1000000 / 131000
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000015","output":"0.0000005","input_cache_read":"0.00000003","varies_by_provider":true,"regional":{"us":{"input":"0.00000015","output":"0.0000005","input_cache_read":"0.00000003"}}}`
- データ保持/学習利用申告: zdr=some, no_training=some
- 評価対応: direct
- 判断: 保留/対象外：通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5-3-flash)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM 5.3 Flash | 41.807466 | max | False | 2026-08-26 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5.3-flashx

- 名称/種類: GLM 5.3 FlashX / language
- リリース日/Unix秒: 2026-09-18 / 1789689600
- 文脈/最大出力: 1000000 / 131072
- モダリティ: {"input": ["text", "image"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, structured-output
- 思考制御: [{"type": "effort", "values": ["low", "high", "max"]}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.00000037","output":"0.00000125","input_cache_read":"0.000000075"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: no-confirmed-release
- 判断: 保留/対象外：対応するAAリリースを一覧で確認できない / 通常思考量で最低公開指標18を確認できない
- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

### zai/glm-5v-turbo

- 名称/種類: GLM 5V Turbo / language
- リリース日/Unix秒: 2026-04-01 / 1775001600
- 文脈/最大出力: 200000 / 128000
- モダリティ: {"input": ["text", "image", "pdf"], "output": ["text"]}
- 全機能タグ: reasoning, tool-use, implicit-caching, vision, file-input, structured-output
- 思考制御: [{"type": "toggle"}]
- 対応パラメータ: max_tokens, temperature, stop, tools, tool_choice, reasoning, include_reasoning, response_format, structured_outputs
- 全料金（元の単位）: `{"input":"0.0000012","output":"0.000004","input_cache_read":"0.00000024"}`
- データ保持/学習利用申告: zdr=none, no_training=none
- 評価対応: direct
- 判断: 保留/対象外：日付・思考量・非推定/安定版の測定条件不一致 / 通常思考量で最低公開指標18を確認できない
- 公開評価出典: [リリースページ](https://artificialanalysis.ai/models/releases/glm-5v-turbo)

| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |
|---|---:|---|---|---|
| GLM 5V Turbo (Reasoning) | 23.496711 | 未特定 | True | 2026-04-01 |

- 仕様/料金出典: [Gateway API](https://ai-gateway.vercel.sh/v1/models)（上記IDで照合）。実接続/実測性能は未確認。

## 再確認

全カタログとAA一覧・対応する全ページを再取得し、ID・仕様・料金・測定値・採用判定の一致を監査します。[再確認記録](model-review-sources/verification.json)。取得失敗や差分が残る場合は未完了です。

[全データJSON](model-review-2026-10-08.json) / [出典SHA256](model-review-sources/manifest.json) / [再現スクリプト](../scripts/review-models.py)

再確認完了: 2026-10-07T22:58:26.007783+00:00（UTC）。全カタログと全164対応ページを新規取得。ID・仕様・料金・測定値の差分なし、全件記録の抜け/重複なし、採用表と再計算の一致を確認しました。
