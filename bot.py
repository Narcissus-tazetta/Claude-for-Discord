import logging
import os
import discord
from discord import app_commands
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
HISTORY_DEPTH = 6
DISCORD_CHUNK_LIMIT = 1900

if not ALLOWED_USER_IDS:
    raise RuntimeError("ALLOWED_USER_IDS is empty — set it before starting the bot.")

claude_client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
user_preferences: dict[int, bool] = {}  # user_id -> default ephemeral


class MyClient(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()


client = MyClient()


def is_allowed(interaction: discord.Interaction) -> bool:
    return interaction.user.id in ALLOWED_USER_IDS


async def deny(interaction: discord.Interaction):
    await interaction.response.send_message("このBotを使用する権限がありません。", ephemeral=True)


def normalize_turns(turns: list[dict]) -> list[dict]:
    """Merge consecutive same-role turns so the sequence stays strictly alternating (Anthropic API requirement)."""
    merged: list[dict] = []
    for turn in turns:
        if merged and merged[-1]["role"] == turn["role"]:
            merged[-1]["content"] += "\n\n" + turn["content"]
        else:
            merged.append(dict(turn))
    return merged


async def build_history_from_message(channel, start_message: discord.Message, limit: int = HISTORY_DEPTH) -> list[dict]:
    turns = []
    curr = start_message
    for _ in range(limit):
        if curr is None:
            break
        role = "assistant" if curr.author.id == client.user.id else "user"
        content = curr.content.replace(f"<@{client.user.id}>", "").strip()
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
        turns.insert(0, {"role": "user", "content": "(以下は以前のやり取りの続きです)"})
    return turns


async def ask_claude(messages: list[dict]) -> str:
    response = claude_client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=1500,
        messages=messages,
    )
    # content[0] isn't reliably the text block: extended-thinking models can prepend a
    # ThinkingBlock, which has no .text attribute.
    text_blocks = [block.text for block in response.content if block.type == "text"]
    return "\n".join(text_blocks) if text_blocks else "(応答にテキストが含まれていませんでした)"


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


class SettingsView(discord.ui.View):
    def __init__(self, user_id: int):
        super().__init__(timeout=180)
        self.user_id = user_id

    @discord.ui.button(label="回答の表示モード切替（自分のみ / 全員）", style=discord.ButtonStyle.primary)
    async def toggle_ephemeral(self, interaction: discord.Interaction, button: discord.ui.Button):
        current = user_preferences.get(self.user_id, True)
        new_setting = not current
        user_preferences[self.user_id] = new_setting
        mode_str = "自分だけに表示 (Ephemeral)" if new_setting else "全員に表示 (Public)"
        await interaction.response.send_message(
            f"デフォルトの出力モードを **【{mode_str}】** に変更しました。\n"
            "※ 再デプロイ/再起動でリセットされます。",
            ephemeral=True,
        )


@client.tree.command(name="settings", description="Botの個人設定を変更します")
@app_commands.allowed_installs(guilds=True, users=True)
@app_commands.allowed_contexts(guilds=True, dms=True, private_channels=True)
async def settings(interaction: discord.Interaction):
    if not is_allowed(interaction):
        return await deny(interaction)

    current = user_preferences.get(interaction.user.id, True)
    mode_str = "自分だけに表示 (Ephemeral)" if current else "全員に表示 (Public)"
    view = SettingsView(interaction.user.id)
    await interaction.response.send_message(f"**現在の設定**\n・表示モード: `{mode_str}`", view=view, ephemeral=True)


@client.tree.command(name="claude", description="Claudeに新しい質問を送ります（新規会話）")
@app_commands.allowed_installs(guilds=True, users=True)
@app_commands.allowed_contexts(guilds=True, dms=True, private_channels=True)
@app_commands.describe(prompt="質問内容", public="Trueで強制的に全員に見えるよう出力します")
async def ask_claude_command(interaction: discord.Interaction, prompt: str, public: bool = False):
    if not is_allowed(interaction):
        return await deny(interaction)

    is_ephemeral = False if public else user_preferences.get(interaction.user.id, True)
    await interaction.response.defer(thinking=True, ephemeral=is_ephemeral)

    try:
        answer = await ask_claude([{"role": "user", "content": prompt}])
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
            history = normalize_turns(history + [{"role": "user", "content": str(self.prompt)}])
            answer = await ask_claude(history)
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
