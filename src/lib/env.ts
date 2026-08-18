/**
 * Central access point for the contact/lead system's environment variables.
 *
 * Every variable the pipeline reads is declared here, once, with a note on
 * what happens if it's missing. This is the single file to check when
 * wiring up a new environment (staging, production, or a future CRM) —
 * see .env.example for the same list with setup instructions.
 *
 * Nothing in this file throws at import time. Missing *required* values are
 * only surfaced when the code path that needs them actually runs, and they
 * produce a clear server log + a clean 500 to the client — never a raw
 * unhandled exception or a leaked stack trace.
 */

function readEnv(name: string): string | undefined {
  const value = process.env[name]
  return value && value.trim().length > 0 ? value.trim() : undefined
}

export const env = {
  // ── Required for the contact form to actually deliver an enquiry ─────────
  RESEND_API_KEY: readEnv('RESEND_API_KEY'),
  CONTACT_EMAIL: readEnv('CONTACT_EMAIL'), // sales/enquiries inbox

  // ── Optional — sensible fallbacks documented inline where used ──────────
  CAREERS_EMAIL: readEnv('CAREERS_EMAIL'), // falls back to CONTACT_EMAIL if unset
  EMAIL_FROM: readEnv('EMAIL_FROM'), // falls back to a Resend sandbox sender if unset
  SITE_URL: readEnv('NEXT_PUBLIC_SITE_URL') ?? 'https://www.atharvapolymers.com',

  // ── WhatsApp ──────────────────────────────────────────────────────────────
  WHATSAPP_NUMBER: readEnv('NEXT_PUBLIC_WHATSAPP_NUMBER'),

  // ── Confirmation auto-reply to the enquirer — on by default, can be
  //    switched off instantly (e.g. before the sending domain is verified)
  //    without a code change ─────────────────────────────────────────────
  SEND_CONFIRMATION_EMAIL: readEnv('CONTACT_SEND_CONFIRMATION') !== 'false',

  // ── CRM extension point — absent today by design. When the client
  //    provides a CRM, its inbound webhook URL goes here and enquiries
  //    start forwarding automatically. See lib/enquiry/crm-forward.ts ──────
  CRM_WEBHOOK_URL: readEnv('CRM_WEBHOOK_URL'),
  CRM_WEBHOOK_SECRET: readEnv('CRM_WEBHOOK_SECRET'),
} as const

export function isCrmForwardingConfigured(): boolean {
  return Boolean(env.CRM_WEBHOOK_URL)
}