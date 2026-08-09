# Claude for Discord

Discordから[Claude](https://www.anthropic.com/claude)を呼び出す、個人利用向けのBotです。

Discordの **User Install（ユーザーインストール）** に対応しているため、Botをサーバーに招待しなくても、自分が参加しているサーバー・DM・グループDMのどこからでも呼び出せます。アクセスは許可リスト（ユーザーIDの明示指定）で制御され、リストにないユーザーからのリクエストは一切APIに到達しません。

> **想定用途について**
> このBotは「自分と、自分が明示的に許可した数人」が使うことを前提に設計されています。不特定多数が参加する大規模サーバーへの導入や、一般公開Botとしての運用は想定していません（会話設定がメモリ上のみで永続化されない、レート制限を実装していない等のため）。

## 機能

| 操作 | 内容 |
|---|---|
| `/claude prompt:...` | 新規会話としてClaudeに質問します。`attachment:` で画像やPDFを添付でき、`public:true` を付けるとその回答だけ全員に見える形で出力します。 |
| メッセージを右クリック → アプリ → **「Claudeに続けて聞く」** | そのメッセージを文脈に含めた状態で追加の質問ができます。質問文はモーダルで入力します。文中のリンクや添付された画像・PDFもそのまま読み取ります。 |
| `/settings` | 回答のデフォルト表示（自分だけに表示 / 全員に表示）、使用モデル、思考モード（ON/OFF）、エフォート（`low`〜`max`）、リンク読み込み（ON/OFF）を切り替えます。 |

- 回答が長い場合はDiscordの文字数上限に合わせて自動分割して送信します（表示設定は分割後の全メッセージに引き継がれます）。
- 応答が「自分だけに表示（Ephemeral）」の場合、その内容は同じチャンネルの他の参加者には見えません。

### web検索（Web search）

学習データにない最新の情報や、URLが手元にない話題については、Claudeが必要と判断すればweb検索を行って回答します。参照したURLは回答末尾に「取得元」として表示されます（多い場合は上位5件＋件数）。

リンク読み込みと併用すると、**「URLは分からないがページ名は分かる」ケースにも対応できます** — 検索でページを見つけ、そのURLを読み込んで回答する、という流れが自動的に行われます。不要な場合は `/settings` の「web検索切替」でOFFにできます。

### リンクの読み込み（Web fetch）

メッセージにURLが含まれている場合、Claudeが必要と判断すればそのページを取得して内容を踏まえた回答をします。取得したURLは回答の末尾に「取得元」として表示されます。

- Anthropicのサーバー側で取得が行われるため、Bot側にHTTP取得の実装はありません。**追加料金はかからず**、取得したページのトークン分だけが通常どおり課金されます。
- **取得できるのは会話に既に登場しているURLだけです。** Claudeが自分でURLを組み立てて任意の場所へアクセスすることはできません（Anthropic側の仕様による制限）。
- 1リクエストあたりの取得回数と取得量に上限を設けています（[src/constants.ts](src/constants.ts) の `WEB_FETCH_MAX_USES` / `WEB_FETCH_MAX_CONTENT_TOKENS`）。
- JavaScriptで動的に描画されるページは取得できません。取得に失敗した場合は理由（`url_not_accessible` など）を回答の末尾に表示します。
- 不要な場合は `/settings` の「リンク読み込み切替」でOFFにできます。

> **YouTubeなど一部のサイトは取得できません**
> YouTubeは動的描画かつ自動取得をブロックしているため、動画URLを渡しても `url_not_accessible` になり、**動画の内容や字幕を読むことはできません**。Claudeが `youtu.be` の短縮URLやoEmbed APIなど別のURLで回避しようとしても、「会話に登場していないURLは取得できない」という安全上の制限により `url_not_in_prior_context` で止まります（仕様どおりの挙動です）。
> 動画を要約したい場合は、YouTubeの「文字起こしを表示」からテキストをコピーして貼り付けてください。

> **セキュリティ上の注意**
> リンク読み込みを有効にすると、Claudeは第三者が書いた外部ページの内容を読み込みます。ページ内にClaude向けの指示文が仕込まれていた場合（プロンプトインジェクション）、回答が影響を受ける可能性があります。信用できないリンクを読ませる際は、返ってきた内容を鵜呑みにしないでください。機密情報を扱う会話では、`/settings` からOFFにしておくのが安全です。

### 画像・PDFの読み取り

`/claude` の `attachment:` で直接添付するか、画像やPDFが添付されたメッセージを右クリックすると、その中身を読み取って回答します。

- 対応形式: **JPEG / PNG / GIF / WebP / PDF**（GIFはアニメーションではなく1枚目のみ）
- 1ファイルあたり **5MB** まで、1リクエストあたり **8ファイル・合計16MB** まで（[src/constants.ts](src/constants.ts) の `MAX_ATTACHMENT_BYTES` などで変更可）
- 上限を超えたファイル・非対応形式のファイルは**エラーにならず静かにスキップ**され、残りだけが処理されます
- 返信チェーンを遡って複数のメッセージに画像がある場合、上限に達するまで順に読み込みます

### 会話文脈の扱いについて（重要）

**確実に文脈として渡るのは、右クリックしたメッセージ1通です。** これはDiscordのインタラクションに含まれるデータとして届くため、常に本文を取得できます。

それより前の返信チェーンは「取得できたら使う」という扱いです。遡りは `channel.fetch_message()` に依存しており、以下の場合には**エラーにはならず、静かに1通だけの文脈に縮退します**。

- Botがそのチャンネルの過去メッセージにアクセスできない場合
- Message Content Intent が無効で、REST経由で取得した本文が空になる場合

サーバー内で確実に履歴を遡りたい場合は、通常のBot招待リンクで「メッセージ履歴の閲覧」権限付きでBotを追加し、必要に応じてDeveloper PortalでMessage Content Intentを有効化してください（どちらも任意）。

## 必要なもの

- [Bun](https://bun.sh/) と Cloudflare アカウント（無料枠で動作します）
- Discord アプリケーション（Bot トークン）
- Anthropic API キー（[Anthropic Console](https://console.anthropic.com/) で発行。**Claude Pro / Max のサブスクリプションとは別に、従量課金のAPIクレジットが必要です**）

## セットアップ

### 1. Discord アプリケーションを作成する

1. [Discord Developer Portal](https://discord.com/developers/applications) を開き、**New Application** でアプリを作成します。
2. **Installation** タブ（先にこちらから設定します。順番が重要です）:
   - **Install Link** を **None** に設定します。ここを設定しておかないと、次の手順で Public Bot を OFF にしようとした際に `Cannot have install fields on a private application.` というエラーになります。
   - **Installation Contexts** で **User Install** にチェックを入れます。
   - **Default Install Settings** の **Install Contexts** で `Guilds` / `Bot's DM` / `Private Channels` の3つすべてにチェックを入れます。
   - Scopes は `applications.commands` を指定します。
3. **Bot** タブ:
   - **Public Bot** を **OFF** にします。これで他人が自分のアカウントにこのアプリをインストールできなくなります（Install Link を None にした後でないとOFFにできません）。
   - **Reset Token** を押してBotトークンを取得し、控えておきます（この画面を離れると再表示できません）。
   - Message Content Intent は**基本的に不要**です。このBotは通常のメッセージを購読せず、スラッシュコマンドと右クリックメニュー経由でのみ動作します（前述の「深い履歴の遡り」を使いたい場合のみ有効化）。
4. **OAuth2** タブ → **OAuth2 URL Generator**:
   - **Install Link を None にした時点で、Installation タブの「共有用インストールリンク」は表示されなくなります。** これは仕様どおりで、壊れているわけではありません。
   - 代わりにこのURL Generatorで `applications.commands` スコープにチェックを入れ、User Install用に生成されたURLをコピーします。
   - そのURLを**自分自身が**ブラウザで開いてDiscordアカウントに追加します。これはアプリのオーナー（またはチームメンバー）自身が認可する操作なので、Public BotがOFFのままでも成功します。他人が同じURLを開いても認可はできません。
   - このURLを公開のチャンネルなどに貼る必要はありません（貼っても第三者は使えませんが、念のため自分だけで使ってください）。

> **セキュリティ上の注意**
> `Public Bot` の OFF は、あくまで「他人がこのアプリを自分のアカウントにインストールできるか」を制御するだけです。User Install されたコマンドは、同じサーバーやグループDMにいる別のユーザーからも見えてしまう場合があります。**実際にアクセスを遮断しているのは Worker 側の許可リスト（`ALLOWED_USER_IDS` シークレット、[src/interactions.ts](src/interactions.ts) で参照）です。** この判定を外すと、あなたのAPIキーが第三者に使われる状態になります。
>
> 誰かに使わせたい場合、その人がアプリをインストールする必要はありません。`ALLOWED_USER_IDS` にそのユーザーIDを追加するだけで、あなたが導入済みのサーバー／グループDM上で使えるようになります。

DiscordのユーザーIDは、Discordの設定で「開発者モード」を有効にしたうえで、ユーザーを右クリック →「ユーザーIDをコピー」で取得できます。

### 2. ローカルにセットアップする

```bash
git clone https://github.com/Narcissus-tazetta/Claude-for-Discord.git
cd Claude-for-Discord
bun install
cp .env.example .env
```

`.env` を編集して各値を設定します。

| 環境変数 | 必須 | 内容 |
|---|---|---|
| `DISCORD_TOKEN` | ✅ | Discord Developer Portal で取得したBotトークン（コマンド登録スクリプトが使用） |
| `ANTHROPIC_API_KEY` | ✅ | Anthropic API キー |
| `ALLOWED_USER_IDS` | ✅ | 利用を許可するDiscordユーザーID。カンマ区切りで複数指定可 |
| `CLAUDE_MODEL` | | 使用モデル。既定は `claude-sonnet-5` |

スラッシュコマンドを登録します（初回のみ、以後はコマンド定義を変更したときだけ再実行）。

```bash
bun run register
```

### 3. Cloudflare Workers にデプロイする

このBotは [Cloudflare Workers](https://workers.cloudflare.com/) 上で動く HTTP Interactions アプリです。ゲートウェイへの常時接続が不要なため、スリープや外部pingサービスの類は一切必要ありません。無料プランの範囲で動作します。

1. `wrangler.toml` の `DISCORD_APPLICATION_ID` / `DISCORD_PUBLIC_KEY`（Developer Portal の General Information タブに表示）を自分のアプリの値に書き換えます。
2. まだなら `bunx wrangler login` でCloudflareアカウントにログインします。
3. シークレットを登録します（これらは `wrangler.toml` ではなく Cloudflare 側に暗号化して保存されます）。
   ```bash
   bunx wrangler secret put DISCORD_BOT_TOKEN
   bunx wrangler secret put ANTHROPIC_API_KEY
   bunx wrangler secret put ALLOWED_USER_IDS
   ```
4. デプロイします。
   ```bash
   bun run deploy
   ```
   出力される `https://<name>.<subdomain>.workers.dev` のURLを控えます。
5. Discord Developer Portal の **General Information** タブ → **Interactions Endpoint URL** に、そのURLを貼って保存します。保存が通れば署名検証まで含めて疎通しています。

`bun run dev`（`wrangler dev`）でローカル実行もできますが、Discordの署名検証があるため、実際に動かして確認するには公開URLが必要です（`wrangler dev --remote` や一時的なトンネルを使う方法もあります）。

### 4. 費用の上限を設定する（推奨）

[Anthropic Console](https://console.anthropic.com/) の **Billing → Usage limits** で月間の上限額を設定しておくと、想定外の呼び出しが発生しても請求が青天井になりません。

## 設定のカスタマイズ

[src/constants.ts](src/constants.ts) の定数で調整できます。

- `HISTORY_DEPTH` — 返信チェーンを遡る最大メッセージ数（既定 6）
- `DISCORD_CHUNK_LIMIT` — 分割送信の1メッセージあたり文字数（既定 1900）
- `CLAUDE_MAX_TOKENS`（`wrangler.toml` の環境変数） — 回答の最大トークン数（既定 4096）。長い回答がここに書いてある注記付きで途中で切れる場合は増やしてください。

## 既知の制限

- **モデルによって使える機能が異なり、Botが自動で調整します。** Claude Haiku 4.5 は思考モードとエフォートに非対応（送るとAPIエラー）なので、選択時は内部的に送信を省略します。同じ理由で、web検索とリンク読み込みも Haiku 4.5 には旧世代のツール版（`web_search_20250305` / `web_fetch_20250910`）を、それ以外には最新版（`web_search_20260318` / `web_fetch_20260318`）を自動的に使い分けます。最新版は内部でコード実行を使うため、この切り替えを外すと Haiku 4.5 で400エラーになります。
- **YouTubeの動画内容は読めません。** 詳細は「リンクの読み込み」の注記を参照してください。
- 添付ファイルは画像とPDFのみ対応です。動画・音声・テキストファイル・ZIPなどは読み取りません。
- 回答内のリンクは「取得元」として一覧表示されますが、本文中の該当箇所に紐づく引用（Citations）は有効にしていません。
- レート制限やリトライは実装していません。

## ライセンス

[MIT](LICENSE)
