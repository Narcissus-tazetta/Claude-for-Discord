# Discord Botモデル評価（2026-10-07確認）

公開ベンチマークの調査に基づく採用判断です。Artificial Analysis Intelligence Index **v4.3.2**の同じ思考量を比較しました。私たちがベンチマーク全体を実行した結果ではありません。メーカー資料で汎用用途・対応機能を照合し、実アカウントのGatewayカタログでID・利用資格・料金を確認しました。

| モデル | low | medium | high | 最大思考のスコア | 確認元 |
|---|---:|---:|---:|---:|---|
| GPT-6 Luna | 22 | 30 | 33 | 38 | [AA](https://artificialanalysis.ai/models/releases/gpt-6-luna)・[公式](https://developers.openai.com/api/docs/models/gpt-6-luna) |
| Gemini 3.8 Flash | 33 | 40 | 41 | 41 | [AA](https://artificialanalysis.ai/models/releases/gemini-3-8-flash)・[公式](https://ai.google.dev/gemini-api/docs/models) |
| GPT-6.1 Sol | 42 | 48 | 50 | 52 | [AA](https://artificialanalysis.ai/models/releases/gpt-6-1-sol)・[公式](https://developers.openai.com/api/docs/models/gpt-6.1-sol) |
| Claude Sonnet 5.5 | 36 | 41 | 47 | 56 | [AA](https://artificialanalysis.ai/models/releases/claude-sonnet-5-5)・[公式](https://platform.claude.com/docs/en/models/overview) |
| Claude Opus 5.5 | 42 | 51 | 54 | 58 | [AA](https://artificialanalysis.ai/models/releases/claude-opus-5-5)・[公式](https://platform.claude.com/docs/en/models/overview) |

Claudeの測定はDefault Fallback条件です。測定ハーネス・思考/出力予算・検索・ツールがBotと同一ではありません。Botの既定出力枠は4096tokenなので、公開スコアをこのBotの予測成績として表示しません。スコア差の統計的有意性もここでは確認していません。

Geminiの公開ページにはmedium測定がありますが、現在のGatewayカタログはlow/highだけを受け付けます。medium選択はlowへ丸めるため、振り分けには**33**を使い、40を使いません。maximumのスコアをmedium/highの能力とみなすこともありません。

## 品質と費用の判断

- Lunaは安い一方、highでも33。小さな動作テストに合格しても難問の第一候補にしません。
- 通常の説明はFlashのlowが33で、Lunaのmedium30より高い指標を持つため、バランス時の候補にします。
- 難問ではSolのhigh50、Sonnetのhigh47、Opusのhigh54を比較。品質優先は高スコア、バランスは一定の指標を満たす安いモデルを優先します。
- Sonnetはmax56ですがhigh47。maxのスコアだけで常時採用すると、思考による費用増を見落とします。AAのタスク料金は実際の思考トークン等を含み、Sonnetではlow$0.42からmax$7.67まで広がります。これらはAAのタスク当たり料金で、Discordの質問1回の料金ではありません。
- Opusは品質重視向け。予算が足りない場合はSolなどに戻り、1回答・月間の予算は維持します。
- 思考は回答と同じ出力上限を使うため、Botは回答枠4096tokenに思考の余地（highで16k）を足して要求します。1回答$0.25では、Opusのhighは余地を半分も取れないため思考量を下げた扱い（low、42）になり、品質優先・難問ではSolのhigh（50）が先頭になります。Opusのhighを使うには1回答の上限を$0.50程度にする必要があります。

## 振り分け方針

18/28/40を短い会話/通常/難問の最低公開指標、バランスの優先目標を18/32/48としています。これらはBotの運用方針として選んだしきい値であり、ベンチマーク提供元が保証する用途別合格点ではありません。目標未達でも最低条件を満たす候補しか残らない場合は、その中から選べます。品質優先では、その思考量に対応する公開指標の高い順です。

同じ優先グループでは、Gatewayの基本料金（長文脈の料金帯は入力量に応じて適用）と、今回の履歴/添付/出力上限による費用を比較します。AAのタスク料金をBotの請求見積もりへ転用しません。画像/PDF・文脈容量・安定版・予算・障害時停止を全モードで確認します。

公開指標の確認済み5モデルをAutoへ採用します。公開指標による採用と、Bot経由の接続確認、個別の動作テストは別の記録です。未接続のモデルを接続済みとして扱いません。小さな確認リクエストは既存の月$0.50評価枠に計上し、支出枠を増やしません。

評価はモデルID・リリース日時が一致するものだけに適用します。Fast/Preview/新バージョンには継承しません。確認から90日で公開指標による採用は期限切れになり、動作テストの合格モデルを使います。ベンチマークデータを自動取得する連携はまだなく、この資料と採用表の再確認が必要です。Gatewayのモデル・料金更新と小規模動作テストは従来どおり自動です。
