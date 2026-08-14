import { createHash } from 'crypto'
import { TTLCache } from './ttl-cache'

/**
 * Lightweight, dependency-free spam and duplicate-submission defenses.
 *
 * Deliberately does NOT include a CAPTCHA/challenge (Turnstile, hCaptcha,
 * reCAPTCHA) — that would require a third-party site key the client hasn't
 * provided, and would touch the form's markup. If spam becomes a real
 * problem after launch, dropping in Cloudflare Turnstile is a small,
 * additive change (a widget + a server-side verify call) and doesn't
 * require restructuring anything below.
 */

// ── Honeypot ────────────────────────────────────────────────────────────────
// The form renders a field named `honeypot` that is hidden from sighted users
// via CSS (not `type="hidden"`, which some bots skip) and never has a value
// filled in by a human. Any non-empty value is a near-certain bot.
export function isHoneypotTripped(honeypot: unknown): boolean {
  return typeof honeypot === 'string' && honeypot.trim().length > 0
}

// ── Timing trap ─────────────────────────────────────────────────────────────
// The form records `formStartedAt` (Date.now()) on mount. A submission that
// arrives faster than a human could plausibly read the form, choose an
// enquiry type, and type into 4+ fields is treated as automated. The
// threshold is intentionally low to avoid punishing fast/autofilled humans.
const MIN_HUMAN_FILL_MS = 1200

export function isSubmittedTooFast(formStartedAt: unknown): boolean {
  const startedAt = typeof formStartedAt === 'number' ? formStartedAt : Number(formStartedAt)
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    // Missing/garbled timestamp — don't block on it, just don't trust it as
    // a "fast" signal either. Honeypot remains the primary defense.
    return false
  }
  return Date.now() - startedAt < MIN_HUMAN_FILL_MS
}

// ── Duplicate submission guard ──────────────────────────────────────────────
// Two independent signals feed the same check:
//  1. Idempotency key — a UUID the form generates once per page load and
//     resends on every retry of the *same* submit action (network blip, a
//     click landing twice before the button disables, etc).
//  2. Content hash — catches the case where the key is lost (e.g. the
//     visitor reloads the page and immediately resubmits identical
//     content). Shorter window, since two different people from the same
//     company submitting similar content minutes apart is legitimate.
//
// Either match counts as "the same attempt" and returns the reference ID
// generated the first time, so a retried request looks identical to the
// visitor instead of surfacing a confusing second reference number.
const idempotencyKeys = new TTLCache<string>(5000) // key -> referenceId
const contentHashes = new TTLCache<string>(5000) // hash -> referenceId

const IDEMPOTENCY_TTL_MS = 5 * 60 * 1000 // 5 minutes — covers realistic retries
const CONTENT_HASH_TTL_MS = 45 * 1000 // 45 seconds — narrow, avoids false positives

function hashContent(fields: { inquiryType: string; name: string; email: string; message: string }): string {
  return createHash('sha256')
    .update(
      [
        fields.inquiryType,
        fields.name.trim().toLowerCase(),
        fields.email.trim().toLowerCase(),
        fields.message.trim().toLowerCase(),
      ].join('|'),
    )
    .digest('hex')
}

export interface DuplicateCheckResult {
  isDuplicate: boolean
  /** Set when isDuplicate is true — the reference ID from the original attempt */
  existingReferenceId?: string
}

/**
 * Checks whether this submission (by idempotency key or content) has already
 * been recorded. If it's new, records it under `referenceId` so a later
 * retry resolves to the same reference. Call this exactly once per request,
 * after the reference ID for the *current* attempt has been generated.
 */
export function checkAndRecordDuplicate(
  idempotencyKey: string | undefined,
  contentFields: { inquiryType: string; name: string; email: string; message: string },
  referenceId: string,
): DuplicateCheckResult {
  const hasValidKey = typeof idempotencyKey === 'string' && idempotencyKey.length >= 8

  if (hasValidKey) {
    const existing = idempotencyKeys.get(idempotencyKey as string)
    if (existing) return { isDuplicate: true, existingReferenceId: existing }
  }

  const hash = hashContent(contentFields)
  const existingByContent = contentHashes.get(hash)
  if (existingByContent) return { isDuplicate: true, existingReferenceId: existingByContent }

  if (hasValidKey) idempotencyKeys.set(idempotencyKey as string, referenceId, IDEMPOTENCY_TTL_MS)
  contentHashes.set(hash, referenceId, CONTENT_HASH_TTL_MS)

  return { isDuplicate: false }
}

/**
 * Collapses the "details"/"message"-shaped field from whichever inquiry type
 * was submitted, so checkAndRecordDuplicate has one string to hash
 * regardless of which form variant was used.
 */
export function extractMessageLikeField(body: Record<string, unknown>): string {
  const candidates = ['message', 'problemStatement', 'coverMessage', 'requirements', 'productInterest']
  for (const key of candidates) {
    const value = body[key]
    if (typeof value === 'string' && value.trim().length > 0) return value
  }
  return ''
}