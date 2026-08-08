import base64
import logging
import os
import types
import discord
from discord import app_commands
from aiohttp import web
import anthropic
from dotenv import load_dotenv

load_dotenv()  # no-op on Render, where env vars are set in the dashboard instead

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("claude-for-discord")

DISCORD_TOKEN = os.environ["DISCORD_TOKEN"]
ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]
ALLOWED_USER_IDS = {
    int(uid.strip())
    for uid in os.environ.get("ALLOWED_USER_IDS", "").split(",")
    if uid.strip()
}
CLAUDE_MODEL = os.environ.get("CLAUDE_MODEL", "claude-sonnet-5")
CLAUDE_MAX_TOKENS = int(os.environ.get("CLAUDE_MAX_TOKENS", "4096"))
HISTORY_DEPTH = 6
DISCORD_CHUNK_LIMIT = 1900

# Haiku 4.5 predates adaptive thinking / effort — sending either param to it returns a 400.
# (Verified against the Models API: its `thinking.types.adaptive` and every `effort` level
# report supported=false, while `enabled` — the old fixed-budget mode — reports true.)
MODELS_WITHOUT_THINKING_SUPPORT = {"claude-haiku-4-5"}
# The dynamic-filtering web_fetch versions run on the code execution sandbox, so a model
# without code execution rejects them outright:
#   claude-haiku-4-5 + web_fetch_20260318 -> 400 "does not support programmatic tool calling"
# Haiku 4.5 still fetches fine on the basic 20250910 version.
MODELS_WITHOUT_CODE_EXECUTION = {"claude-haiku-4-5"}
WEB_FETCH_TOOL_MODERN = "web_fetch_20260318"
WEB_FETCH_TOOL_BASIC = "web_fetch_20250910"
WEB_SEARCH_TOOL_MODERN = "web_search_20260318"
WEB_SEARCH_TOOL_BASIC = "web_search_20250305"
WEB_FETCH_MAX_USES = 3
WEB_FETCH_MAX_CONTENT_TOKENS = 30_000
WEB_SEARCH_MAX_USES = 3
# A single search can surface a dozen results; listing them all buries the answer.
MAX_SOURCES_SHOWN = 5
# Server tools can end a turn with stop_reason "pause_turn"; resend to let them finish.
SERVER_TOOL_MAX_ROUNDS = 4

AVAILABLE_MODELS = [
    ("Claude Opus 5", "claude-opus-5", "最も高性能・高コスト"),
    ("Claude Sonnet 5", "claude-sonnet-5", "バランス型"),
    ("Claude Haiku 4.5", "claude-haiku-4-5", "高速・低コスト（思考/エフォート非対応）"),
]
EFFORT_LEVELS = ["low", "medium", "high", "xhigh", "max"]

# Vision/document input. The API caps a single image at 10MB *base64-encoded*, and base64
# inflates by 4/3, so the raw-byte ceiling below stays well clear of it.
SUPPORTED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}
PDF_TYPE = "application/pdf"
MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024
MAX_ATTACHMENTS = 8
MAX_TOTAL_ATTACHMENT_BYTES = 16 * 1024 * 1024

if not ALLOWED_USER_IDS:
    raise RuntimeError("ALLOWED_USER_IDS is empty — set it before starting the bot.")

claude_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
user_preferences: dict[int, bool] = {}  # user_id -> default ephemeral
user_model_prefs: dict[int, dict] = {}  # user_id -> {"model": str, "thinking": bool, "effort": str}


def get_model_prefs(user_id: int) -> dict:
    return user_model_prefs.setdefault(
        user_id,
        {
            "model": CLAUDE_MODEL,
            "thinking": True,
            "effort": "high",
            "web_fetch": True,
            "web_search": True,
        },
    )


async def health(request):
    return web.Response(text="ok")


class MyClient(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()

        # Render's free tier is Web Service-only (Background Workers have no free
        # instance type), so we run a throwaway HTTP endpoint just to satisfy Render's
        # port-binding requirement. An external uptime pinger hitting this URL is what
        # actually keeps the free instance from sleeping after 15 minutes idle.
        app = web.Application()
        app.router.add_get("/", health)
        runner = web.AppRunner(app)
        await runner.setup()
        port = int(os.environ.get("PORT", "8080"))
        await web.TCPSite(runner, "0.0.0.0", port).start()
        log.info(f"health check endpoint listening on :{port}")


client = MyClient()


def is_allowed(interaction: discord.Interaction) -> bool:
    return interaction.user.id in ALLOWED_USER_IDS


async def deny(interaction: discord.Interaction):
    await interaction.response.send_message("このBotを使用する権限がありません。", ephemeral=True)


def text_block(text: str) -> dict:
    return {"type": "text", "text": text}


def normalize_turns(turns: list[dict]) -> list[dict]:
    """Merge consecutive same-role turns so the sequence stays strictly alternating (Anthropic API requirement)."""
    merged: list[dict] = []
    for turn in turns:
        if merged and merged[-1]["role"] == turn["role"]:
            merged[-1]["content"] = merged[-1]["content"] + turn["content"]
        else:
            merged.append({"role": turn["role"], "content": list(turn["content"])})
    return merged


async def attachment_blocks(message: discord.Message, budget: dict) -> list[dict]:
    """Download supported attachments and turn them into image/document content blocks.

    `budget` is shared across the whole reply chain so one image-heavy thread can't blow
    past the API's 32MB request ceiling.
    """
    blocks: list[dict] = []
    for att in message.attachments:
        if budget["count"] >= MAX_ATTACHMENTS or budget["bytes"] >= MAX_TOTAL_ATTACHMENT_BYTES:
            break
        media_type = (att.content_type or "").split(";")[0].strip().lower()
        if media_type not in SUPPORTED_IMAGE_TYPES and media_type != PDF_TYPE:
            continue
        if att.size > MAX_ATTACHMENT_BYTES:
            log.info("skipping oversized attachment %s (%d bytes)", att.filename, att.size)
            continue
        try:
            raw = await att.read()
        except (discord.HTTPException, discord.NotFound, discord.Forbidden) as e:
            log.warning("could not download attachment %s: %s", att.filename, e)
            continue

        budget["count"] += 1
        budget["bytes"] += len(raw)
        encoded = base64.standard_b64encode(raw).decode("ascii")
        source = {"type": "base64", "media_type": media_type, "data": encoded}
        # Label each file so the prompt can refer to it by name, and put the file before
        # the message text — Claude performs best with images ahead of the question.
        blocks.append(text_block(f"[添付: {att.filename}]"))
        if media_type == PDF_TYPE:
            blocks.append({"type": "document", "source": source})
        else:
            blocks.append({"type": "image", "source": source})
    return blocks


async def build_history_from_message(channel, start_message: discord.Message, limit: int = HISTORY_DEPTH) -> list[dict]:
    turns: list[dict] = []
    budget = {"count": 0, "bytes": 0}
    curr = start_message
    for _ in range(limit):
        if curr is None:
            break
        is_bot = curr.author.id == client.user.id
        role = "assistant" if is_bot else "user"
        text = curr.content.replace(f"<@{client.user.id}>", "").strip()

        # Only user turns carry attachments — the assistant role rejects image blocks.
        content = [] if is_bot else await attachment_blocks(curr, budget)
        if text:
            content.append(text_block(text))
        if content:
            turns.insert(0, {"role": role, "content": content})

        if channel is not None and curr.reference and curr.reference.message_id:
            try:
                curr = await channel.fetch_message(curr.reference.message_id)
            except (discord.Forbidden, discord.NotFound, discord.HTTPException):
                # Common in guild channels where the app is user-installed only
                # (no standing bot presence, so history beyond the resolved message is unreachable).
                break
        else:
            break

    turns = normalize_turns(turns)
    if turns and turns[0]["role"] == "assistant":
        # The Messages API requires the first turn to be `user`. Right-clicking one of
        # Claude's own replies (the primary flow) otherwise produces an assistant-first
        # array and a 400, so anchor it with a synthetic opener instead of dropping the
        # message the user actually pointed at.
        turns.insert(0, {"role": "user", "content": [text_block("(以下は以前のやり取りの続きです)")]})
    return turns


def build_request_kwargs(user_id: int) -> dict:
    prefs = get_model_prefs(user_id)
    model = prefs["model"]
    kwargs = {"model": model, "max_tokens": CLAUDE_MAX_TOKENS}

    # The dynamic-filtering tool versions run on the code execution sandbox, so models
    # without it need the older variants (see MODELS_WITHOUT_CODE_EXECUTION).
    basic_only = model in MODELS_WITHOUT_CODE_EXECUTION
    tools = []
    if prefs["web_search"]:
        tools.append(
            {
                "type": WEB_SEARCH_TOOL_BASIC if basic_only else WEB_SEARCH_TOOL_MODERN,
                "name": "web_search",
                "max_uses": WEB_SEARCH_MAX_USES,
            }
        )
    if prefs["web_fetch"]:
        tools.append(
            {
                "type": WEB_FETCH_TOOL_BASIC if basic_only else WEB_FETCH_TOOL_MODERN,
                "name": "web_fetch",
                "max_uses": WEB_FETCH_MAX_USES,
                "max_content_tokens": WEB_FETCH_MAX_CONTENT_TOKENS,
            }
        )
    if tools:
        kwargs["tools"] = tools

    if model in MODELS_WITHOUT_THINKING_SUPPORT:
        return kwargs

    effort = prefs["effort"]
    if prefs["thinking"]:
        kwargs["thinking"] = {"type": "adaptive"}
    else:
        # On Opus 5, disabling thinking is only accepted at effort "high" or below —
        # xhigh/max return a 400. Cap silently rather than surface an API error.
        if model == "claude-opus-5" and effort in ("xhigh", "max"):
            effort = "high"
        kwargs["thinking"] = {"type": "disabled"}

    kwargs["output_config"] = {"effort": effort}
    return kwargs


def summarize_fetches(content) -> tuple[list[str], list[str]]:
    """Pull the URLs the server tools used, plus any failures, out of a response.

    A successful web_search result is a *list* of results while an error is a single
    object, so the two tools need slightly different unwrapping.
    """
    used, failures = [], []
    for block in content:
        if block.type == "web_fetch_tool_result":
            inner = block.content
            if getattr(inner, "type", None) == "web_fetch_tool_result_error":
                failures.append(getattr(inner, "error_code", "unknown"))
            else:
                url = getattr(inner, "url", None)
                if url and url not in used:
                    used.append(url)
        elif block.type == "web_search_tool_result":
            inner = block.content
            if isinstance(inner, list):
                for result in inner:
                    url = getattr(result, "url", None)
                    if url and url not in used:
                        used.append(url)
            else:
                failures.append(getattr(inner, "error_code", "unknown"))
    return used, failures


async def ask_claude(messages: list[dict], user_id: int) -> str:
    kwargs = build_request_kwargs(user_id)
    convo = list(messages)
    texts: list[str] = []
    fetched: list[str] = []
    failures: list[str] = []
    response = None

    for _ in range(SERVER_TOOL_MAX_ROUNDS):
        response = claude_client.messages.create(messages=convo, **kwargs)
        # content[0] isn't reliably the text block: thinking models prepend a ThinkingBlock
        # and server tools add server_tool_use / *_tool_result blocks, none of which have .text.
        texts += [b.text for b in response.content if b.type == "text" and b.text.strip()]
        round_fetched, round_failures = summarize_fetches(response.content)
        fetched += [u for u in round_fetched if u not in fetched]
        failures += round_failures

        if response.stop_reason != "pause_turn":
            break
        # A server tool hit its per-turn iteration limit; resend so it can finish.
        convo = convo + [{"role": "assistant", "content": response.content}]

    text = "\n\n".join(texts) if texts else "(応答にテキストが含まれていませんでした)"

    if fetched:
        shown = fetched[:MAX_SOURCES_SHOWN]
        text += "\n\n" + "\n".join(f"-# 取得元: <{u}>" for u in shown)
        if len(fetched) > len(shown):
            text += f"\n-# ほか {len(fetched) - len(shown)} 件"
    if failures:
        text += f"\n\n*(⚠️ リンクの取得に失敗しました: {', '.join(sorted(set(failures)))})*"
    if response is not None and response.stop_reason == "max_tokens":
        text += f"\n\n*(⚠️ 出力上限 {CLAUDE_MAX_TOKENS} トークンに達したため、ここで打ち切られています)*"
    return text


async def send_chunked(interaction: discord.Interaction, header: str, text: str, ephemeral: bool):
    full = header + text
    chunks = [full[i:i + DISCORD_CHUNK_LIMIT] for i in range(0, len(full), DISCORD_CHUNK_LIMIT)] or [""]
    # followup.send() does NOT inherit the ephemeral flag from defer(); every chunk has to
    # carry it or the tail of a long answer leaks into the channel.
    for chunk in chunks:
        await interaction.followup.send(chunk, ephemeral=ephemeral)


async def report_error(interaction: discord.Interaction, exc: Exception, ephemeral: bool):
    log.exception("request failed", exc_info=exc)
    await interaction.followup.send(
        "エラーが発生しました。時間をおいて再試行してください。", ephemeral=ephemeral
    )


def settings_summary(user_id: int) -> str:
    ephemeral = user_preferences.get(user_id, True)
    mode_str = "自分だけに表示 (Ephemeral)" if ephemeral else "全員に表示 (Public)"
    prefs = get_model_prefs(user_id)
    thinking_str = "ON (adaptive)" if prefs["thinking"] else "OFF"
    if prefs["model"] in MODELS_WITHOUT_THINKING_SUPPORT:
        thinking_str = "— (このモデルは非対応)"
    effort_str = prefs["effort"]
    if prefs["model"] in MODELS_WITHOUT_THINKING_SUPPORT:
        effort_str = "— (このモデルは非対応)"
    return (
        f"**現在の設定**\n"
        f"・表示モード: `{mode_str}`\n"
        f"・モデル: `{prefs['model']}`\n"
        f"・思考モード: `{thinking_str}`\n"
        f"・エフォート: `{effort_str}`\n"
        f"・リンク読み込み: `{'ON' if prefs['web_fetch'] else 'OFF'}`\n"
        f"・web検索: `{'ON' if prefs['web_search'] else 'OFF'}`"
    )


class ModelSelect(discord.ui.Select):
    def __init__(self, user_id: int):
        self.owner_id = user_id
        options = [
            discord.SelectOption(label=label, value=value, description=desc)
            for label, value, desc in AVAILABLE_MODELS
        ]
        super().__init__(placeholder="モデルを選択", options=options, row=0)

    async def callback(self, interaction: discord.Interaction):
        if interaction.user.id != self.owner_id:
            return await interaction.response.send_message("これはあなたの設定画面ではありません。", ephemeral=True)
        get_model_prefs(self.owner_id)["model"] = self.values[0]
        await interaction.response.edit_message(content=settings_summary(self.owner_id), view=self.view)


class EffortSelect(discord.ui.Select):
    def __init__(self, user_id: int):
        self.owner_id = user_id
        options = [discord.SelectOption(label=level, value=level) for level in EFFORT_LEVELS]
        super().__init__(placeholder="エフォート（思考ONの時のみ効果あり）", options=options, row=1)

    async def callback(self, interaction: discord.Interaction):
        if interaction.user.id != self.owner_id:
            return await interaction.response.send_message("これはあなたの設定画面ではありません。", ephemeral=True)
        get_model_prefs(self.owner_id)["effort"] = self.values[0]
        await interaction.response.edit_message(content=settings_summary(self.owner_id), view=self.view)


class SettingsView(discord.ui.View):
    def __init__(self, user_id: int):
        super().__init__(timeout=180)
        self.user_id = user_id
        self.add_item(ModelSelect(user_id))
        self.add_item(EffortSelect(user_id))

    @discord.ui.button(label="思考モード切替（ON/OFF）", style=discord.ButtonStyle.secondary, row=2)
    async def toggle_thinking(self, interaction: discord.Interaction, button: discord.ui.Button):
        prefs = get_model_prefs(self.user_id)
        prefs["thinking"] = not prefs["thinking"]
        await interaction.response.edit_message(content=settings_summary(self.user_id), view=self)

    @discord.ui.button(label="リンク読み込み切替（ON/OFF）", style=discord.ButtonStyle.secondary, row=2)
    async def toggle_web_fetch(self, interaction: discord.Interaction, button: discord.ui.Button):
        prefs = get_model_prefs(self.user_id)
        prefs["web_fetch"] = not prefs["web_fetch"]
        await interaction.response.edit_message(content=settings_summary(self.user_id), view=self)

    @discord.ui.button(label="web検索切替（ON/OFF）", style=discord.ButtonStyle.secondary, row=2)
    async def toggle_web_search(self, interaction: discord.Interaction, button: discord.ui.Button):
        prefs = get_model_prefs(self.user_id)
        prefs["web_search"] = not prefs["web_search"]
        await interaction.response.edit_message(content=settings_summary(self.user_id), view=self)

    @discord.ui.button(label="回答の表示モード切替（自分のみ / 全員）", style=discord.ButtonStyle.primary, row=3)
    async def toggle_ephemeral(self, interaction: discord.Interaction, button: discord.ui.Button):
        current = user_preferences.get(self.user_id, True)
        user_preferences[self.user_id] = not current
        await interaction.response.edit_message(content=settings_summary(self.user_id), view=self)


@client.tree.command(name="settings", description="Botの個人設定を変更します")
@app_commands.allowed_installs(guilds=True, users=True)
@app_commands.allowed_contexts(guilds=True, dms=True, private_channels=True)
async def settings(interaction: discord.Interaction):
    if not is_allowed(interaction):
        return await deny(interaction)

    view = SettingsView(interaction.user.id)
    await interaction.response.send_message(settings_summary(interaction.user.id), view=view, ephemeral=True)


@client.tree.command(name="claude", description="Claudeに新しい質問を送ります（新規会話）")
@app_commands.allowed_installs(guilds=True, users=True)
@app_commands.allowed_contexts(guilds=True, dms=True, private_channels=True)
@app_commands.describe(
    prompt="質問内容",
    public="Trueで強制的に全員に見えるよう出力します",
    attachment="画像またはPDFを添付して質問できます",
)
async def ask_claude_command(
    interaction: discord.Interaction,
    prompt: str,
    public: bool = False,
    attachment: discord.Attachment | None = None,
):
    if not is_allowed(interaction):
        return await deny(interaction)

    is_ephemeral = False if public else user_preferences.get(interaction.user.id, True)
    await interaction.response.defer(thinking=True, ephemeral=is_ephemeral)

    try:
        content: list[dict] = []
        if attachment is not None:
            # attachment_blocks() takes a Message; wrap the lone attachment to reuse the
            # same validation, size budget, and base64 encoding path.
            holder = types.SimpleNamespace(attachments=[attachment])
            content += await attachment_blocks(holder, {"count": 0, "bytes": 0})
            if not content:
                await interaction.followup.send(
                    "添付ファイルを読み込めませんでした（対応形式は JPEG/PNG/GIF/WebP/PDF、"
                    f"サイズ上限は {MAX_ATTACHMENT_BYTES // (1024 * 1024)}MB です）。",
                    ephemeral=is_ephemeral,
                )
                return
        content.append(text_block(prompt))

        answer = await ask_claude([{"role": "user", "content": content}], interaction.user.id)
        await send_chunked(interaction, f"**Q:** {prompt}\n\n**A:**\n", answer, is_ephemeral)
    except Exception as e:
        await report_error(interaction, e, is_ephemeral)


class ContinuePromptModal(discord.ui.Modal, title="Claudeに続けて聞く"):
    prompt = discord.ui.TextInput(label="質問内容", style=discord.TextStyle.paragraph, max_length=1500)

    def __init__(self, target_message: discord.Message):
        super().__init__()
        self.target_message = target_message

    async def on_submit(self, interaction: discord.Interaction):
        is_ephemeral = user_preferences.get(interaction.user.id, True)
        await interaction.response.defer(thinking=True, ephemeral=is_ephemeral)

        try:
            # target_message.channel is always populated from the resolved interaction data;
            # interaction.channel can be None for user-installed apps in some contexts.
            history = await build_history_from_message(self.target_message.channel, self.target_message)
            history = normalize_turns(
                history + [{"role": "user", "content": [text_block(str(self.prompt))]}]
            )
            answer = await ask_claude(history, interaction.user.id)
            await send_chunked(interaction, f"**Q:** {self.prompt}\n\n**A:**\n", answer, is_ephemeral)
        except Exception as e:
            await report_error(interaction, e, is_ephemeral)


@client.tree.context_menu(name="Claudeに続けて聞く")
@app_commands.allowed_installs(guilds=True, users=True)
@app_commands.allowed_contexts(guilds=True, dms=True, private_channels=True)
async def continue_with_claude(interaction: discord.Interaction, message: discord.Message):
    if not is_allowed(interaction):
        return await deny(interaction)
    await interaction.response.send_modal(ContinuePromptModal(target_message=message))


client.run(DISCORD_TOKEN)
