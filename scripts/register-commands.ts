/**
 * One-shot: overwrite the application's global command list.
 *
 *   bun run scripts/register-commands.ts
 *
 * Reads DISCORD_TOKEN (and optionally DISCORD_APPLICATION_ID) from .env. The application id
 * is looked up from the token when it isn't set, so there's nothing extra to configure.
 */
import { readFileSync } from "node:fs";
import { COMMAND_DEFINITIONS } from "../src/commands";

function loadEnv(): Record<string, string> {
  const env: Record<string, string> = { ...process.env } as Record<string, string>;
  try {
    for (const line of readFileSync(new URL("../.env", import.meta.url), "utf8").split("\n")) {
      const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
      if (match) env[match[1]] ??= match[2].trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    // No .env: rely on the ambient environment.
  }
  return env;
}

const env = loadEnv();
const token = env.DISCORD_TOKEN ?? env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error("DISCORD_TOKEN is not set");
  process.exit(1);
}

const auth = { authorization: `Bot ${token}` };

let appId = env.DISCORD_APPLICATION_ID;
if (!appId) {
  const res = await fetch("https://discord.com/api/v10/applications/@me", { headers: auth });
  if (!res.ok) {
    console.error(`could not resolve the application id: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  appId = ((await res.json()) as { id: string }).id;
}

const res = await fetch(`https://discord.com/api/v10/applications/${appId}/commands`, {
  method: "PUT",
  headers: { ...auth, "content-type": "application/json" },
  body: JSON.stringify(COMMAND_DEFINITIONS),
});

if (!res.ok) {
  console.error(`registration failed: ${res.status}\n${await res.text()}`);
  process.exit(1);
}

const registered = (await res.json()) as { name: string; type: number }[];
console.log(`registered ${registered.length} commands on application ${appId}:`);
for (const cmd of registered) console.log(`  - ${cmd.name} (type ${cmd.type})`);
