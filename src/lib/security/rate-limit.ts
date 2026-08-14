import { TTLCache } from './ttl-cache'

/**
 * Rate limiting for /api/contact.
 *
 * Fixed-window counter per IP: N submissions per WINDOW. Deliberately simple —
 * a sliding-window/token-bucket algorithm would be marginally fairer but
 * isn't worth the complexity for a form that a legitimate visitor submits
 * once, maybe twice, per session.
 *
 * Defaults are generous enough that a real buyer filling the form (including
 * a genuine retry after a typo) never gets blocked, but tight enough to stop
 * a script hammering the endpoint.
 *
 * Configure via env if the defaults ever need tuning for a specific launch:
 *   CONTACT_RATE_LIMIT_MAX     — max requests per window (default 8)
 *   CONTACT_RATE_LIMIT_WINDOW_MS — window length in ms (default 600_000 = 10 min)
 */

const MAX_REQUESTS = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 8)
const WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000)

interface WindowState {
  count: number
  windowStart: number
}

const store = new TTLCache<WindowState>(10_000)

export interface RateLimitResult {
  allowed: boolean
  /** Seconds the caller should wait before trying again, only set when blocked */
  retryAfterSeconds?: number
}

/**
 * @param identifier Usually the requester's IP (see `getClientIp`). Any stable
 *   per-visitor string works — the caller decides what "one visitor" means.
 */
export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now()
  const existing = store.get(identifier)

  if (!existing || now - existing.windowStart > WINDOW_MS) {
    store.set(identifier, { count: 1, windowStart: now }, WINDOW_MS)
    return { allowed: true }
  }

  if (existing.count >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((existing.windowStart + WINDOW_MS - now) / 1000)
    return { allowed: false, retryAfterSeconds: Math.max(retryAfterSeconds, 1) }
  }

  existing.count += 1
  store.set(identifier, existing, existing.windowStart + WINDOW_MS - now)
  return { allowed: true }
}

/**
 * Extracts a best-effort client IP from standard proxy headers.
 * Works on Vercel and most reverse-proxy setups without extra config.
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}