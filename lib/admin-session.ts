// These helpers are used only from server actions / server components.
import { createHmac, timingSafeEqual, createHash } from "node:crypto"

// Signed admin-session tokens. The cookie is no longer a guessable constant:
// it carries an expiry plus an HMAC over that expiry, so it can't be forged
// without the server secret. Verification is constant-time.

const WEEK_MS = 1000 * 60 * 60 * 24 * 7

// Prefer a dedicated secret; fall back to ADMIN_PASSWORD so existing setups
// keep working. Returns null when nothing is configured (sessions disabled).
function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url")
}

// Constant-time string compare that never leaks length via an exception.
export function safeEqual(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a).digest()
  const bh = createHash("sha256").update(b).digest()
  return timingSafeEqual(ah, bh)
}

// Verify the submitted password against ADMIN_PASSWORD in constant time.
export function verifyPassword(password: string): boolean {
  const admin = process.env.ADMIN_PASSWORD
  if (!admin || !password) return false
  return safeEqual(password, admin)
}

export function createSessionToken(ttlMs: number = WEEK_MS): string | null {
  const secret = getSecret()
  if (!secret) return null
  const exp = String(Date.now() + ttlMs)
  return `${exp}.${sign(exp, secret)}`
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const secret = getSecret()
  if (!secret || !token) return false
  const dot = token.indexOf(".")
  if (dot <= 0) return false
  const exp = token.slice(0, dot)
  const mac = token.slice(dot + 1)
  const expected = sign(exp, secret)
  // Compare MACs constant-time; both are fixed-length base64url of sha256.
  if (mac.length !== expected.length) return false
  if (!timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return false
  const expMs = Number(exp)
  return Number.isFinite(expMs) && expMs > Date.now()
}

export const ADMIN_COOKIE = "admin_session"
