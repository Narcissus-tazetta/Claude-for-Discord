// Ed25519 request verification. Workers implements this natively in WebCrypto, so no
// polyfill and no compatibility flag is needed.

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length === 0 || hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(byte)) return null;
    out[i] = byte;
  }
  return out;
}

const keyCache = new Map<string, Promise<CryptoKey>>();

function publicKey(publicKeyHex: string): Promise<CryptoKey> {
  let cached = keyCache.get(publicKeyHex);
  if (!cached) {
    const raw = hexToBytes(publicKeyHex);
    if (!raw) return Promise.reject(new Error("DISCORD_PUBLIC_KEY is not valid hex"));
    cached = crypto.subtle.importKey("raw", raw, { name: "Ed25519" }, false, ["verify"]);
    keyCache.set(publicKeyHex, cached);
  }
  return cached;
}

/**
 * Verify a Discord interaction request.
 *
 * `rawBody` must be the exact bytes Discord sent. Parsing the JSON and re-serializing it
 * produces a different byte string and the signature will never match.
 */
export async function verifyRequest(
  request: Request,
  rawBody: string,
  publicKeyHex: string,
): Promise<boolean> {
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");
  if (!signature || !timestamp) return false;

  const sigBytes = hexToBytes(signature);
  if (!sigBytes) return false;

  try {
    const key = await publicKey(publicKeyHex);
    return await crypto.subtle.verify(
      "Ed25519",
      key,
      sigBytes,
      new TextEncoder().encode(timestamp + rawBody),
    );
  } catch {
    return false;
  }
}
