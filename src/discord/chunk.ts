import { DISCORD_CHUNK_LIMIT, DISCORD_MESSAGE_LIMIT } from "../shared/constants";

/** Room left after the footer for the confirmed cost appended to it later. */
const FOOTER_RESERVE = 40;

/**
 * Split an answer into Discord-sized messages, breaking at a newline when one falls in the
 * second half of the window. `footer` is never split: it ends the last message, or gets one
 * of its own when it would not fit — otherwise a cut through it shows a stray fragment and
 * loses its small-text formatting.
 *
 * Slices by code point rather than UTF-16 unit so a surrogate pair (emoji, rarer kanji)
 * never lands across a chunk boundary and turns into a pair of replacement characters.
 */
export function chunkText(full: string, footer?: string): string[] {
  const points = Array.from(full);
  const chunks: string[] = [];
  let start = 0;
  while (start < points.length) {
    let end = Math.min(start + DISCORD_CHUNK_LIMIT, points.length);
    if (end < points.length) {
      const newline = points.lastIndexOf("\n", end - 1);
      if (newline >= start + DISCORD_CHUNK_LIMIT / 2) end = newline + 1;
    }
    chunks.push(points.slice(start, end).join(""));
    start = end;
  }
  if (!chunks.length) chunks.push("");
  if (footer === undefined) return chunks;
  const last = chunks.length - 1;
  const joined = `${chunks[last]}\n\n${footer}`;
  if (Array.from(joined).length + FOOTER_RESERVE <= DISCORD_MESSAGE_LIMIT) chunks[last] = joined;
  else chunks.push(footer);
  return chunks;
}
