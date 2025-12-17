import { randomBytes, randomUUID } from 'crypto';

/**
 * Convert a Buffer to base64url (URL-safe base64 without padding).
 */
function toBase64Url(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Generate a 22-character, URL-safe identifier backed by 128 bits (UUIDv4 entropy).
 * Implementation: create 16 random bytes, set the RFC4122/UUIDv4 version and variant
 * bits for compatibility, then base64url-encode the 16 bytes (yielding 22 chars).
 *
 * This yields a compact identifier (22 chars) that preserves the full 128-bit
 * entropy of a UUIDv4 and is URL-safe.
 */
export function generateId(): string {
  // If runtime provides a randomUUID, we can derive bytes from it, but
  // it's easiest/fastest to operate on raw random bytes and then set UUIDv4 bits.
  const buf = randomBytes(16);

  // Set version to 4 --- see RFC4122
  buf[6] = (buf[6] & 0x0f) | 0x40;
  // Set variant to RFC4122
  buf[8] = (buf[8] & 0x3f) | 0x80;

  return toBase64Url(buf); // 22 chars
}

