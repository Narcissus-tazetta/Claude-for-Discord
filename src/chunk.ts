import { DISCORD_CHUNK_LIMIT } from "./constants";

/**
 * Split an answer into Discord-sized messages.
 *
 * Slices by code point rather than UTF-16 unit so a surrogate pair (emoji, rarer kanji)
 * never lands across a chunk boundary and turns into a pair of replacement characters.
 */
export function chunkText(full: string): string[] {
  const points = Array.from(full);
  const chunks: string[] = [];
  for (let i = 0; i < points.length; i += DISCORD_CHUNK_LIMIT) {
    chunks.push(points.slice(i, i + DISCORD_CHUNK_LIMIT).join(""));
  }
  return chunks.length ? chunks : [""];
}
