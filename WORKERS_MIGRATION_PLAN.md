# Cloudflare Workers 移行計画 — claude-for-discord

このドキュメントは**実装担当者（AI含む）への引き継ぎ仕様書**です。現行の `bot.py`（discord.py / Render常駐）を、Cloudflare Workers 上の HTTP Interactions アプリへ移植します。

---

## 0. なぜ移行するのか（背景・前提知識）

Render 無料プランはリージョン内の全サービスで**アウトバウンドIPを共有**します。その共有IP（`74.220.48.219`）が Cloudflare のレート制限でブロックされ、Discord へのログインが `HTTP 429 / Cloudflare Error 1015` で弾かれ続けました。実測ログ:

```
status=429 url=https://discord.com/api/v10/users/@me server=cloudflare
cf_ray=a285c7d5b8bb302c-PDX retry_after=51553 body='<!doctype html>...'
```

`Retry-After: 51553` = **約14時間20分**。同一トークン・同一コードを自宅IP（`60.158.148.226`）から起動したところ即座に `connected as AI-Assistant#3954` となり、**原因が Render のIPであること、Bot実装とトークンは無罪であることが確定済み**です。

Workers に移すと `static_login()` もゲートウェイ接続も無くなるため、**「起動時にログインで弾かれてBot全体が落ちる」という故障モード自体が消滅**します。Discord REST への外向きリクエスト（followup送信・履歴取得）は残りますが、発信元は Cloudflare 自身のネットワークになり、かつ**失敗しても常時オフラインにはならず、そのコマンド1回が失敗するだけ**になります。

現行 `bot.py` にはゲートウェイイベントハンドラが `on_ready` しか無く、機能はすべてスラッシュコマンドとコンテキストメニュー（= Interactions）です。**したがって常時接続は元々不要**であり、この移行は機能を落としません。

---

## 1. 絶対に守る制約（Hard Constraints）

| # | 制約 | 理由 |
|---|---|---|
| C1 | **Workers KV を一切使わない。** `wrangler.toml` に `kv_namespaces` を書かない | KVの日次上限は**アカウント単位**。同一アカウントの `discord-youtube-websub-worker` が既に日次上限の50%を消費しており、Cloudflareからアラートが来ている。状態は**すべて Durable Object の SQLite ストレージ**に置くこと（DOストレージは別枠・アカウント5GB） |
| C2 | **重い処理を `fetch` ハンドラに置かない** | Workers Free の CPU 上限は **10ms/リクエスト**。`fetch` は「署名検証 → DOへジョブ投入 → deferred 応答を返す」だけに保つ |
| C3 | **`ctx.waitUntil()` に頼らない** | 30秒で打ち切られる。これは**Freeだけでなく全プラン共通**。Claude 呼び出しは必ず Durable Object の `alarm()` 内で行う（実時間15分・I/O待ちはCPU非計上） |
| C4 | **`alarm()` は冪等にする** | DOのアラームは**失敗時に自動リトライ**する。ガードが無いと同じ回答を二重投稿する |
| C5 | 既存の3 Worker（`discord-youtube-websub-worker` / `livewallpaper-store` / `classroom-enhancer`）の設定・バインディングに触らない | 別Workerとして完全に独立させる |

---

## 2. 目標アーキテクチャ

```
Discord ──POST /interactions──▶ Worker.fetch()
                                 ├ Ed25519 署名検証（WebCrypto）
                                 ├ type 1 (PING) → {type: 1} を返して終了
                                 ├ 認可チェック（ALLOWED_USER_IDS）
                                 ├ JobDO(idFromName(interaction.token)) にジョブを渡す
                                 └ type 5 (DEFERRED) を即返す      ← ここまで数ms
                                          │
                                          ▼
                                 JobDO.alarm()   実時間15分
                                 ├ Anthropic Messages API（pause_turn 最大4ラウンド）
                                 ├ PATCH  /webhooks/{app_id}/{token}/messages/@original  ← chunk 1
                                 ├ POST   /webhooks/{app_id}/{token}?wait=true           ← chunk 2..n
                                 ├ StateDO に regen レコードを保存
                                 └ storage.deleteAll()（後始末）

                                 StateDO（シングルトン: idFromName("global")）
                                 ├ user_preferences / user_model_prefs
                                 └ regen_records（上限200件、古い順に破棄）
```

### Durable Object クラスは2つ

- **`JobDO`** — `idFromName(interaction.token)` で**ジョブごとに別インスタンス**。1インスタンス1アラームなので、これを分けないと同時実行がぶつかる。
- **`StateDO`** — `idFromName("global")` の**シングルトン**。設定と再生成キャッシュを保持。

両方とも `new_sqlite_classes` で登録すること（Free プランは SQLite バックエンドのみ）。

---

## 3. ファイル構成

```
claude-for-discord/
├── bot.py                    # 移行完了まで残す（ロールバック用）。完了後に削除
├── wrangler.toml
├── package.json
├── tsconfig.json
├── scripts/
│   └── register-commands.ts  # コマンド定義を Discord に PUT する単発スクリプト
└── src/
    ├── index.ts              # fetch ハンドラ（ルーティング + 署名検証 + defer）
    ├── verify.ts             # Ed25519 署名検証
    ├── interactions.ts       # type 2/3/5 の振り分け、custom_id の設計
    ├── job-do.ts             # JobDO（alarm で Claude 実行 → Discord へ送信）
    ├── state-do.ts           # StateDO（prefs / regen records、SQLite スキーマ）
    ├── claude.ts             # Anthropic 呼び出し（build_request_kwargs / ask_claude 相当）
    ├── discord-api.ts        # REST ラッパ（followup, patch, fetch_message）
    ├── history.ts            # build_history_from_message 相当
    ├── settings-ui.ts        # settings_summary + コンポーネント定義
    └── constants.ts          # bot.py の定数をそのまま移植
```

### `wrangler.toml`（KVバインディング無しであること）

```toml
name = "claude-for-discord"
main = "src/index.ts"
compatibility_date = "2026-08-09"

[durable_objects]
bindings = [
  { name = "JOB_DO", class_name = "JobDO" },
  { name = "STATE_DO", class_name = "StateDO" },
]

[[migrations]]
tag = "v1"
new_sqlite_classes = ["JobDO", "StateDO"]

[vars]
DISCORD_APPLICATION_ID = "..."
DISCORD_PUBLIC_KEY = "..."
ALLOWED_USER_IDS = "..."       # カンマ区切り
CLAUDE_MODEL = "claude-sonnet-5"
CLAUDE_MAX_TOKENS = "4096"

[observability.logs]
enabled = true
```

シークレット（`wrangler secret put` で登録、`vars` に書かない）:
- `DISCORD_BOT_TOKEN` — 履歴取得（`GET /channels/.../messages/...`）に必要
- `ANTHROPIC_API_KEY`

---

## 4. 移植する機能の完全な一覧

`bot.py` の全機能。**すべて維持すること。** 挙動を変える箇所は §6 に明記してある2点のみ。

### 4.1 コマンド

| 現行 | 種別 | 移植先の扱い |
|---|---|---|
| `/claude prompt public attachment` | CHAT_INPUT | type 2 → 即 defer → JobDO |
| `/settings` | CHAT_INPUT | type 2 → **defer せず** type 4 で設定画面を即返す（Claude呼び出しが無いので10ms以内に収まる） |
| `Claudeに続けて聞く` | MESSAGE 型コンテキストメニュー | type 2 → type 9 (MODAL) を返す。モーダル送信は type 5 (MODAL_SUBMIT) で届く → defer → JobDO |
| `Claudeの回答を再生成` | MESSAGE 型コンテキストメニュー | type 2 → defer(ephemeral) → JobDO |
| 設定画面の各操作 | — | type 3 (MESSAGE_COMPONENT) → StateDO 更新 → type 7 (UPDATE_MESSAGE) |

コマンド登録 JSON では、現行の `@app_commands.allowed_installs(guilds=True, users=True)` / `allowed_contexts(guilds=True, dms=True, private_channels=True)` を以下に対応させる:

```json
{ "integration_types": [0, 1], "contexts": [0, 1, 2] }
```

### 4.2 設定項目（StateDO に永続化）

`get_model_prefs()` の既定値をそのまま維持:

```ts
{ model: env.CLAUDE_MODEL, thinking: true, effort: "high", web_fetch: true, web_search: true }
```

表示モード（ephemeral）は別テーブル、既定 `true`（= 自分だけに表示）。

`settings_summary()` の出力文字列は**現行と一字一句同じ**にすること（`bot.py:396-414`）。

### 4.3 モデル固有の分岐（`bot.py:38-57`, `264-307`）

これは Anthropic API の実挙動に基づく検証済みの分岐。**絶対に単純化しないこと。**

- `MODELS_WITHOUT_THINKING_SUPPORT = {"claude-haiku-4-5"}` → `thinking` / `output_config.effort` を**送らない**（送ると 400）
- `MODELS_WITHOUT_CODE_EXECUTION = {"claude-haiku-4-5"}` → `web_fetch_20250910` / `web_search_20250305`（旧版）を使う。新版はコード実行サンドボックス上で動くため 400 になる
- 上記以外 → `web_fetch_20260318` / `web_search_20260318`
- `thinking: true` → `{"type": "adaptive"}`
- `thinking: false` かつ `model == "claude-opus-5"` かつ `effort in ("xhigh","max")` → **effort を "high" に黙って下げる**（400回避）
- `max_uses`: web_search 3 / web_fetch 3、`max_content_tokens`: 30000

### 4.4 `ask_claude()` のループ（`bot.py:338-371`）

- `SERVER_TOOL_MAX_ROUNDS = 4` 回まで、`stop_reason == "pause_turn"` の間ループし、`{"role":"assistant","content": response.content}` を積んで再送
- テキストは `content` 内の `type == "text"` かつ非空のブロックを**全部**連結（`content[0]` は thinking ブロックのことがあるので添字アクセス禁止）
- `summarize_fetches()` 相当: `web_fetch_tool_result` は単一オブジェクト、`web_search_tool_result` は**配列**。この非対称性を維持すること
- 出力末尾の付加情報（現行の文言をそのまま）:
  - 取得元URL: `-# 取得元: <URL>` を最大5件、超過分は `-# ほか N 件`
  - 失敗: `*(⚠️ リンクの取得に失敗しました: ...)*`
  - `stop_reason == "max_tokens"`: `*(⚠️ 出力上限 N トークンに達したため、ここで打ち切られています)*`

### 4.5 履歴構築（`bot.py:226-261`）

- `HISTORY_DEPTH = 6` 件まで `message_reference` チェーンを遡る
- Bot自身のメッセージ判定は `author.id === DISCORD_APPLICATION_ID`（Botはユーザーidとアプリidが一致する）
- 本文から `<@{app_id}>` メンションを除去
- **assistant ロールには添付を付けない**（API が拒否する）
- `normalize_turns()`: 連続する同一ロールをマージして厳密に交互にする
- 先頭が `assistant` になったら `{"role":"user","content":[{"type":"text","text":"(以下は以前のやり取りの続きです)"}]}` を先頭に挿入
- `fetch_message` が 403/404 の場合はチェーンを打ち切って続行（user-installed アプリでは日常的に起きる）

### 4.6 チャンク分割と送信

- `DISCORD_CHUNK_LIMIT = 1900` で単純スライス
- **ephemeral フラグは followup が継承しないので、全チャンクに `flags: 64` を明示すること**（現行 `bot.py:381-383` のコメント参照）

### 4.7 再生成（`bot.py:569-620`）

- 対象は Bot 自身のメッセージのみ。それ以外は `"この操作はClaudeの回答メッセージにのみ使用できます。"`
- レコードが無ければ `"この回答は再生成できません（Botの再起動または時間経過によりキャッシュが失われています）。"`
- **再生成は「クリックした人の現在の設定」で実行する**（元の質問者の設定ではない）。プロンプト・履歴自体は元のまま
- 旧チャンク数 > 新チャンク数 の余りは `*(再生成後は不要になりました)*` で上書き
- 新チャンク数 > 旧チャンク数 の分は followup で追加
- 編集失敗があれば `"🔄 再生成しましたが、一部のメッセージは編集期限切れのため上書きできませんでした。"`、無ければ `"🔄 再生成しました。"`

### 4.8 添付ファイル

- 対応形式: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `application/pdf`
- 上限: 1ファイル 5MB、最大8ファイル、合計16MB
- 添付の直前に `[添付: {filename}]` というテキストブロックを置き、**ファイルを質問文より前に配置する**
- 読めなかった場合: `"添付ファイルを読み込めませんでした（対応形式は JPEG/PNG/GIF/WebP/PDF、サイズ上限は 5MB です）。"`

### 4.9 認可

`ALLOWED_USER_IDS` に無いユーザーには `"このBotを使用する権限がありません。"` を ephemeral で返す。ギルドでは `interaction.member.user.id`、DMでは `interaction.user.id` を見ること（**両方を見る必要がある**）。

---

## 5. Durable Object のスキーマと責務

### 5.1 `StateDO`（`idFromName("global")`）

```sql
CREATE TABLE IF NOT EXISTS prefs (
  user_id     TEXT PRIMARY KEY,
  ephemeral   INTEGER NOT NULL DEFAULT 1,
  model       TEXT    NOT NULL,
  thinking    INTEGER NOT NULL DEFAULT 1,
  effort      TEXT    NOT NULL DEFAULT 'high',
  web_fetch   INTEGER NOT NULL DEFAULT 1,
  web_search  INTEGER NOT NULL DEFAULT 1
);

-- 再生成用。messages は Anthropic に送った content 配列そのもの（JSON）
CREATE TABLE IF NOT EXISTS regen_records (
  record_id   TEXT PRIMARY KEY,   -- 先頭チャンクのメッセージid
  messages    TEXT NOT NULL,
  user_id     TEXT NOT NULL,
  header      TEXT NOT NULL,
  ephemeral   INTEGER NOT NULL,
  token       TEXT NOT NULL,      -- 元の interaction token（編集に必要）
  created_at  INTEGER NOT NULL
);

-- 複数チャンクのどれを右クリックしても同じレコードに辿り着かせる
CREATE TABLE IF NOT EXISTS regen_index (
  message_id  TEXT PRIMARY KEY,
  record_id   TEXT NOT NULL,
  position    INTEGER NOT NULL    -- チャンク順（編集時の順序復元用）
);
```

`MAX_REGEN_RECORDS = 200`。挿入時に `created_at` の古い順で超過分を削除し、`regen_index` の対応行も消すこと（現行の `OrderedDict` + `popitem(last=False)` と同じ挙動）。

### 5.2 `JobDO`（`idFromName(interaction.token)`）

`fetch`（または RPC メソッド）でジョブを受け取り、`storage.put` して `storage.setAlarm(Date.now())` を呼び、**即座に戻る**。

`alarm()` の骨格:

```ts
async alarm() {
  const job = await this.ctx.storage.get<Job>("job");
  if (!job) return;
  // C4: アラームは失敗時に自動リトライされる。二重投稿を防ぐ
  if (await this.ctx.storage.get<boolean>("done")) return;
  await this.ctx.storage.put("done", true);

  try {
    const answer = await runClaude(job, this.env);
    await deliver(job, answer, this.env);   // @original を PATCH → 残りを followup
  } catch (err) {
    console.error("job failed", err);
    await sendFollowup(job, "エラーが発生しました。時間をおいて再試行してください。", true);
  } finally {
    await this.ctx.storage.deleteAll();
  }
}
```

`done` フラグは **Claude を呼ぶ前**に立てること。処理途中でアラームがリトライされると、Anthropic への課金が二重になり、かつ回答も二重投稿される。

---

## 6. 現行から意図的に変える点（2つだけ）

### 6.1 添付は base64 ではなく URL で渡す【必須】

現行 `attachment_blocks()` は Discord から実体をダウンロードして base64 エンコードしている（`bot.py:207-215`）。**Workers ではこれが最大のCPU消費源**で、5MBのPDFなら Free の 10ms CPU 制限を確実に超える。

Anthropic Messages API は URL ソースを受け付けるので、Discord の添付URLをそのまま渡す:

```json
{ "type": "document", "source": { "type": "url", "url": "https://cdn.discordapp.com/attachments/..." } }
{ "type": "image",    "source": { "type": "url", "url": "https://cdn.discordapp.com/attachments/..." } }
```

これでダウンロード・エンコード・サブリクエストがすべて不要になる。**サイズ・形式チェックは引き続き可能**で、`size` と `content_type` は interaction ペイロードの添付オブジェクトに含まれているため、実体を取得せずに現行と同じ検証ができる。

⚠️ Discord の添付URLは署名付き（`?ex=&is=&hm=`）で有効期限がある。生成直後に使う分には問題ないが、**再生成（regen）で古いレコードを再送するとURLが失効している可能性がある**。regen で 400 が返った場合は、`"添付ファイルの有効期限が切れているため再生成できません。"` を返すこと。

万一 Anthropic 側が Discord CDN の署名付きURLを取得できない場合のみ、fallback として base64 経路を JobDO 内（`fetch` ハンドラではない）に実装すること。

### 6.2 最初のチャンクは followup ではなく `@original` を PATCH する【推奨】

現行は全チャンクを followup で送っている（`bot.py:384-385`）。移植版では:

- chunk 1 → `PATCH /webhooks/{app_id}/{token}/messages/@original`
- chunk 2..n → `POST /webhooks/{app_id}/{token}?wait=true`

こうすると defer のローディング表示が確実に置き換わり、かつ全チャンクのメッセージidが取れる（`@original` の PATCH はレスポンスでメッセージオブジェクトを返す）。

**なお、設定画面（`/settings`）の 180秒タイムアウトは移植先では消滅する**（`bot.py:448` の `timeout=180`）。HTTP Interactions ではコンポーネントの有効期限はメッセージ自体の寿命に従うため、これは副作用としての改善であり、対応不要。

---

## 7. 実装フェーズ

各フェーズ末に**動作確認できる状態**にすること。

### Phase 1 — 疎通（ここが最大の関門）
1. `wrangler init` でプロジェクト作成、`wrangler.toml` を §3 の通りに（**KVバインディングを書かないこと**）
2. `src/verify.ts` に Ed25519 検証を実装。`crypto.subtle.importKey("raw", publicKeyBytes, { name: "Ed25519" }, false, ["verify"])` → `crypto.subtle.verify("Ed25519", key, sigBytes, encoder.encode(timestamp + rawBody))`。**互換性フラグ不要、Workers ネイティブ対応済み**
3. **必ず raw body（文字列/ArrayBuffer）で検証してから JSON パースすること。** パース後に再シリアライズしたものでは署名が一致しない
4. 署名不正には **401 を返す**。Discord は Interactions Endpoint URL 登録時に**わざと不正な署名でリクエストを送ってくる**ので、ここで 401 を返さないと URL 登録が失敗する
5. type 1 (PING) に `{ "type": 1 }` を返す
6. `wrangler deploy` → Developer Portal の Interactions Endpoint URL に `https://claude-for-discord.<subdomain>.workers.dev/` を設定して保存が通ることを確認

**✅ 完了条件:** Discord Developer Portal で Interactions Endpoint URL の保存が成功する

### Phase 2 — コマンド登録
1. `scripts/register-commands.ts` に4つの定義（`/claude`, `/settings`, 2つの MESSAGE 型コンテキストメニュー）を書き、`PUT /applications/{app_id}/commands` で登録
2. `/claude` のオプション: `prompt`(string, required), `public`(boolean, optional), `attachment`(attachment, optional)
3. `integration_types: [0,1]`, `contexts: [0,1,2]` を全コマンドに付ける

**✅ 完了条件:** Discord のコマンド一覧に4つとも出る

### Phase 3 — StateDO と `/settings`
1. `StateDO` を §5.1 のスキーマで実装
2. `/settings` を type 4 で即応答（defer しない）
3. コンポーネントの `custom_id` 設計: `"set:model:<user_id>"` のように **操作種別と所有者idを埋め込む**（**100文字上限**に注意）。他人が押したら `"これはあなたの設定画面ではありません。"`
4. 各操作 → StateDO 更新 → type 7 (UPDATE_MESSAGE) で `settings_summary()` を再描画

**✅ 完了条件:** `/settings` で全項目が変更でき、再度 `/settings` を叩くと変更が残っている（= 永続化されている）

### Phase 4 — `/claude`（本命の経路）
1. `JobDO` + `alarm()` を §5.2 の骨格で実装
2. `claude.ts` に §4.3 / §4.4 をそのまま移植
3. 添付は §6.1 の URL 方式
4. 送信は §6.2 の方式、`flags: 64` を全チャンクに

**✅ 完了条件（重要）:**
- 短い質問が返る
- **web_search を ON にして 60秒以上かかる質問が最後まで返る**（← 30秒の壁を越えられている証明。これが通れば設計は正しい）
- 2000文字を超える回答が分割されて全部届く
- 画像/PDF添付が通る
- `public: true` で全員に見える／既定で自分だけに見える

### Phase 5 — コンテキストメニュー2種
1. `history.ts` に §4.5 を移植。`GET /channels/{channel_id}/messages/{message_id}` を **Bot トークン**（`Authorization: Bot <token>`）で叩く
2. 「続けて聞く」: type 9 でモーダルを返す。`custom_id` に `"continue:<channel_id>:<message_id>"` を埋め込んで、モーダル送信時に対象メッセージを復元する
3. 「再生成」: §4.7 を移植。`regen_index` → `regen_records` の二段引き

**✅ 完了条件:** 返信チェーンを遡った文脈で回答が返る／再生成で元のメッセージが上書きされる

### Phase 6 — 切り替えと撤収
1. Render のサービスを停止
2. Interactions Endpoint URL を設定した時点で**ゲートウェイ経由のインタラクション配信は止まる**（両立しない）ため、切り替えは自動的にアトミックになる
3. 1週間ほど安定を確認してから `bot.py` と `requirements.txt` を削除、`README.md` を更新

---

## 8. ハマりどころチェックリスト

実装者が踏みやすい順に並べてある。

- [ ] **署名検証は raw body で行う。** JSON パース後に `JSON.stringify` し直すと絶対に一致しない
- [ ] **署名不正には 401。** 200 を返すと Discord のエンドポイント登録が通らない
- [ ] **3秒以内に応答を返す。** DOへのジョブ投入を `await` で待ちすぎないこと。DO呼び出しは速いが、Claude 呼び出しを `fetch` ハンドラ内で始めては絶対にいけない
- [ ] **`ctx.waitUntil()` を使わない。** 30秒で切られる（全プラン共通）。すべて `alarm()` 側で
- [ ] **`alarm()` の冪等性。** `done` フラグを Claude 呼び出しの**前**に立てる
- [ ] **`flags: 64` は followup に継承されない。** 全チャンクに明示
- [ ] **ephemeral メッセージは interaction token でしか編集できない**（bot トークンでは不可）。再生成のために `token` を regen レコードに保存する。トークンの寿命は15分なので、それを過ぎた再生成では編集が 404 になる → 現行同様 `edit_failed` として扱う
- [ ] **`custom_id` は100文字上限**
- [ ] **サブリクエストは 50/リクエスト。** 履歴6件 + Anthropic 最大4回 + 送信数回で十分収まるが、リトライを無邪気に足すと危ない
- [ ] **`content[0]` を text と決め打ちしない**（thinking ブロックが先頭に来る）
- [ ] **`web_search_tool_result` の中身は配列、`web_fetch_tool_result` は単一オブジェクト**
- [ ] **Haiku 4.5 に `thinking` / `effort` / 新版ツールを送らない**
- [ ] **`normalize_turns()` を省略しない。** 連続同一ロールは API が 400 を返す
- [ ] KV を使いたくなっても使わない（C1）

---

## 9. 未検証事項（実装中に確認すること）

1. **`alarm()` の CPU 上限が Free プランでも 30秒なのか、Workers 全体の 10ms が被さるのか**が公式ドキュメントから確定できていない。§6.1 の URL 方式を守っていれば CPU 消費はごく小さいので、どちらでも通るはずだが、Phase 4 の「60秒以上かかる質問」テストで実測すること。もし CPU 超過エラーが出たら、SSE ストリーミングのパース処理などを削って再測定する
2. **Anthropic の URL フェッチャが Discord CDN の署名付きURLを取得できるか。** Phase 4 で画像添付を試して確認。失敗する場合のみ §6.1 の fallback を実装
3. `max_tokens` 4096 なら問題にならないはずだが、Anthropic は**非ストリーミングで10分を超えると見込まれるリクエストを拒否**する。web_search を多用した際に該当したらストリーミングに切り替えること

---

## 10. 参考

- 現行実装: [bot.py](bot.py)（移行完了まで残すこと）
- Workers 制限: https://developers.cloudflare.com/workers/platform/limits/
- Durable Objects 制限: https://developers.cloudflare.com/durable-objects/platform/limits/
- Ed25519 in Workers: https://developers.cloudflare.com/workers/runtime-apis/web-crypto/
- Discord Interactions: https://discord.com/developers/docs/interactions/receiving-and-responding
- Anthropic PDF/URL ソース: https://platform.claude.com/docs/en/build-with-claude/pdf-support
