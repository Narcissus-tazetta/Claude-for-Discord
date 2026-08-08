# これからやること（作業チェックリスト）

自分用の作業メモ。上から順にやれば動く状態になります。
所要時間の目安は全部で30〜45分程度です。

---

## Phase 1: Discord 側の準備（15分）

- [ ] [Discord Developer Portal](https://discord.com/developers/applications) で **New Application** を作成
- [ ] **Installation** タブ → **Install Link** を **None** に設定する
  - ⚠️ **これを先にやらないと、後で Public Bot を OFF にしようとした時に `Cannot have install fields on a private application.` というエラーで弾かれます。順番が重要**
- [ ] **Installation** タブ → **User Install** にチェック
- [ ] **Installation** タブ → **Install Contexts** で `Guilds` / `Bot's DM` / `Private Channels` を全部チェック
- [ ] Scopes に `applications.commands` を指定
- [ ] **Bot** タブ → **Public Bot** を **OFF** にする（Install Link を None にした後なら成功するはず）
  - ⚠️ これを忘れると他人がアプリをインストールできる状態になります
- [ ] **Bot** タブ → **Reset Token** でトークンを取得し、安全な場所に控える
  - ⚠️ 画面を離れると二度と表示されません。紛失したら再発行し直しになります
  - ⚠️ このトークンは**絶対にGitHubにコミットしない**（`.env` は `.gitignore` 済み）
- [ ] **OAuth2** タブ → **OAuth2 URL Generator** で `applications.commands` にチェックし、生成されたURLを**自分で**開いて自分のアカウントに追加する
  - ℹ️ Install Link を None にした時点で、Installationタブの「共有用リンク」表示は消えます（壊れたわけではなく仕様）。自分のアカウントへの追加はこのURL Generator経由で行います
  - このURLはオーナー（自分）だけが認可できるので、他人に共有しても意味はありません
- [ ] 自分のDiscordユーザーIDを取得
  - 設定 → 詳細設定 → **開発者モード** をON
  - 自分のアイコンを右クリック → **ユーザーIDをコピー**
- [ ] （任意）友達にも使わせるなら、その人のユーザーIDも聞いておく
  - 相手がアプリをインストールする必要はありません。IDを許可リストに足すだけです

## Phase 2: Anthropic API の準備（5分）

- [ ] [Anthropic Console](https://console.anthropic.com/) でAPIキーを発行
  - ⚠️ Claude Pro / Max のサブスクとは別枠です。**APIクレジットの購入（従量課金）が必要**です
- [ ] **Billing → Usage limits** で月間上限額を設定（例: $10）
  - これをやっておけば、コードにミスがあっても請求が青天井になりません
  - 最初は低めに設定して、足りなければ上げるのが安全です

## Phase 3: ローカルで動作確認（10分）

いきなりデプロイせず、手元で動かして確認するのを強く推奨します。

- [ ] リポジトリをクローンして依存関係をインストール
  ```bash
  python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
  ```
- [ ] `cp .env.example .env` して、`DISCORD_TOKEN` / `ANTHROPIC_API_KEY` / `ALLOWED_USER_IDS` を記入
- [ ] `python bot.py` で起動
- [ ] Discordでコマンドが出てくるか確認
  - ⚠️ スラッシュコマンドの反映には**最大1時間**かかることがあります。すぐ出なくても壊れているとは限りません
  - Discordクライアントの再起動（Ctrl+R / Cmd+R）で早く反映されることがあります

### 動作確認チェック

- [ ] `/claude prompt:こんにちは` → 回答が返ってくる
- [ ] `/settings` → ボタンで表示モードが切り替わる
- [ ] `/claude prompt:... public:true` → 全員に見える形で出る
- [ ] **長い回答**（例: `prompt:日本の歴史を3000文字で説明して`）を投げる
  - → 分割された2通目以降も**自分だけに表示のまま**か確認（ここが以前バグっていた箇所です）
- [ ] **Claudeの回答を右クリック → アプリ → 「Claudeに続けて聞く」**
  - → モーダルが出て、文脈を踏まえた回答が返るか確認（ここも以前バグっていた箇所です）
- [ ] 許可リストに入っていないアカウントで実行 → 拒否されるか確認（できれば）

### 🔍 最優先で確かめたい未検証事項

**Ephemeral（自分だけに表示）の回答に対して、右クリックの「アプリ」メニューが出せるかどうか。**

デフォルトがEphemeralなので、もしメニューが出せない場合、「Claudeの回答を右クリックして続けて聞く」という主要機能が成立しません。

出せなかった場合の対処:
- `/settings` でデフォルトを「全員に表示」に切り替えて運用する、または
- 回答に「続ける」ボタンを付ける方式に作り変える（要実装）

まずここを試してください。

## Phase 4: Render にデプロイ（10分）

- [ ] **先にRenderの料金ページを確認する**
  - Background Worker が無料枠対象か、実行時間の上限、カード登録の要否をチェック
  - ⚠️ 「無料で常時稼働」は保証されていません。条件は変わります
- [ ] [Render](https://render.com/) にGitHubアカウントでサインイン
- [ ] **New → Background Worker** を選択（⚠️ Web Service ではありません）
- [ ] このリポジトリを接続
- [ ] 設定
  - **Build Command**: `pip install -r requirements.txt`
  - **Start Command**: `python bot.py`
- [ ] **Environment** タブで環境変数を登録
  - `DISCORD_TOKEN`
  - `ANTHROPIC_API_KEY`
  - `ALLOWED_USER_IDS`
  - `CLAUDE_MODEL`（省略可）
- [ ] デプロイ実行 → ログでエラーが出ていないか確認
- [ ] Discordから実際に叩いて動くか確認
- [ ] ローカルで起動しっぱなしのプロセスを停止する
  - ⚠️ 同じBotトークンで2つのプロセスを同時に動かすと競合します

---

## 余裕があったらやりたい改善

優先度順。今すぐ必要なものではありません。

1. **`/settings` の永続化** — 現状は再起動でリセットされます。SQLiteかJSONファイルに保存すれば解決します
2. **回答の分割位置の改善** — 現在は1900文字で機械的に切るため、コードブロックの途中で分断されることがあります
3. **モデルの切り替えコマンド** — 用途に応じて軽量モデルと使い分けたい場合
4. **会話の継続方法の改善** — Ephemeralの検証結果次第では、ボタン方式やスレッド方式への変更を検討
5. **エラーの通知** — 現在はサーバーのログに出るだけなので、DMに飛ばすなど

## 困ったときの確認ポイント

| 症状 | 確認すること |
|---|---|
| コマンドが出てこない | 反映に最大1時間かかる。クライアント再起動（Cmd/Ctrl+R）を試す。Install Contexts の設定漏れも疑う |
| 「権限がありません」と出る | `ALLOWED_USER_IDS` に自分のIDが正しく入っているか。カンマ区切りの書式、余計な引用符に注意 |
| 起動直後に落ちる | 環境変数の設定漏れ。`ALLOWED_USER_IDS` が空だと意図的にエラーで止まります |
| 「エラーが発生しました」と出る | 詳細はコンソール／Renderのログに出力されます。APIクレジット残高切れもよくある原因です |
| Renderで動かない | Web Service ではなく **Background Worker** で作成しているか確認 |
