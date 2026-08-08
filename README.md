# Claude for Discord

Discordから[Claude](https://www.anthropic.com/claude)を呼び出す、個人利用向けのBotです。

Discordの **User Install（ユーザーインストール）** に対応しているため、Botをサーバーに招待しなくても、自分が参加しているサーバー・DM・グループDMのどこからでも呼び出せます。アクセスは許可リスト（ユーザーIDの明示指定）で制御され、リストにないユーザーからのリクエストは一切APIに到達しません。

> **想定用途について**
> このBotは「自分と、自分が明示的に許可した数人」が使うことを前提に設計されています。不特定多数が参加する大規模サーバーへの導入や、一般公開Botとしての運用は想定していません（会話設定がメモリ上のみで永続化されない、レート制限を実装していない等のため）。

## 機能

| 操作 | 内容 |
|---|---|
| `/claude prompt:...` | 新規会話としてClaudeに質問します。`public:true` を付けるとその回答だけ全員に見える形で出力します。 |
| メッセージを右クリック → アプリ → **「Claudeに続けて聞く」** | そのメッセージを文脈に含めた状態で追加の質問ができます。質問文はモーダルで入力します。 |
| `/settings` | 回答のデフォルト表示（自分だけに表示 / 全員に表示）を切り替えます。 |

- 回答が長い場合はDiscordの文字数上限に合わせて自動分割して送信します（表示設定は分割後の全メッセージに引き継がれます）。
- 応答が「自分だけに表示（Ephemeral）」の場合、その内容は同じチャンネルの他の参加者には見えません。

### 会話文脈の扱いについて（重要）

**確実に文脈として渡るのは、右クリックしたメッセージ1通です。** これはDiscordのインタラクションに含まれるデータとして届くため、常に本文を取得できます。

それより前の返信チェーンは「取得できたら使う」という扱いです。遡りは `channel.fetch_message()` に依存しており、以下の場合には**エラーにはならず、静かに1通だけの文脈に縮退します**。

- Botがそのチャンネルの過去メッセージにアクセスできない場合
- Message Content Intent が無効で、REST経由で取得した本文が空になる場合

サーバー内で確実に履歴を遡りたい場合は、通常のBot招待リンクで「メッセージ履歴の閲覧」権限付きでBotを追加し、必要に応じてDeveloper PortalでMessage Content Intentを有効化してください（どちらも任意）。

## 必要なもの

- Python 3.10 以降
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
> `Public Bot` の OFF は、あくまで「他人がこのアプリを自分のアカウントにインストールできるか」を制御するだけです。User Install されたコマンドは、同じサーバーやグループDMにいる別のユーザーからも見えてしまう場合があります。**実際にアクセスを遮断しているのは `bot.py` 内の許可リスト（`ALLOWED_USER_IDS`）です。** この判定を外すと、あなたのAPIキーが第三者に使われる状態になります。
>
> 誰かに使わせたい場合、その人がアプリをインストールする必要はありません。`ALLOWED_USER_IDS` にそのユーザーIDを追加するだけで、あなたが導入済みのサーバー／グループDM上で使えるようになります。

DiscordのユーザーIDは、Discordの設定で「開発者モード」を有効にしたうえで、ユーザーを右クリック →「ユーザーIDをコピー」で取得できます。

### 2. ローカルで動かす

```bash
git clone https://github.com/Narcissus-tazetta/Claude-for-Discord.git
cd Claude-for-Discord
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

`.env` を編集して各値を設定します。

| 環境変数 | 必須 | 内容 |
|---|---|---|
| `DISCORD_TOKEN` | ✅ | Discord Developer Portal で取得したBotトークン |
| `ANTHROPIC_API_KEY` | ✅ | Anthropic API キー |
| `ALLOWED_USER_IDS` | ✅ | 利用を許可するDiscordユーザーID。カンマ区切りで複数指定可 |
| `CLAUDE_MODEL` | | 使用モデル。既定は `claude-sonnet-5` |

起動します。

```bash
python bot.py
```

`ALLOWED_USER_IDS` が空の場合、Botは起動時にエラーで停止します（許可リストなしで誤って公開状態になるのを防ぐためです）。

### 3. Render にデプロイする（常時稼働）

このBotはWebサーバーではなく常駐プロセスなので、**Background Worker** として動かします。

1. リポジトリをGitHubにプッシュします（`.env` は `.gitignore` 済みなので含まれません）。
2. [Render](https://render.com/) にサインインし、**New → Background Worker** を選択してこのリポジトリを接続します。
3. 設定値:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python bot.py`
4. **Environment** タブで、`.env` と同じ環境変数（`DISCORD_TOKEN` / `ANTHROPIC_API_KEY` / `ALLOWED_USER_IDS` / 必要なら `CLAUDE_MODEL`）を登録します。
5. デプロイを実行します。

> **料金プランについて**
> Background Worker が無料枠で使えるか、また無料枠の条件（実行時間の上限、スリープの有無、クレジットカード登録の要否など）は変更されることがあります。**デプロイ前に必ずRenderの最新の料金ページを確認してください。** 常時稼働を無保証で前提にすると、Botが停止していることに気づけない可能性があります。
>
> Renderにこだわらない場合、Railway、Fly.io、あるいは自宅の常時起動マシンやRaspberry Piでも同様に動作します。

### 4. 費用の上限を設定する（推奨）

[Anthropic Console](https://console.anthropic.com/) の **Billing → Usage limits** で月間の上限額を設定しておくと、想定外の呼び出しが発生しても請求が青天井になりません。

## 設定のカスタマイズ

`bot.py` 冒頭の定数で調整できます。

- `HISTORY_DEPTH` — 返信チェーンを遡る最大メッセージ数（既定 6）
- `DISCORD_CHUNK_LIMIT` — 分割送信の1メッセージあたり文字数（既定 1900）
- `CLAUDE_MAX_TOKENS`（環境変数） — 回答の最大トークン数（既定 4096）。長い回答がここに書いてある注記付きで途中で切れる場合は増やしてください。

## 既知の制限

- **設定は永続化されません。** `/settings` の表示モードはメモリ上にのみ保持されるため、再起動・再デプロイでデフォルト（自分だけに表示）に戻ります。
- **Ephemeralな回答に対して右クリックメニューが使えるかは未検証です。** 使えない場合、デフォルト設定のままでは「Claudeの回答を右クリックして続けて聞く」が成立しません。その場合は `/settings` で「全員に表示」に切り替えるか、`/claude` に `public:true` を付けて実行してください。
- 添付ファイル・画像は読み取りません。テキストのみを扱います。
- レート制限やリトライは実装していません。

## ライセンス

[MIT](LICENSE)
