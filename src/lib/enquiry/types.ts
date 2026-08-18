import type { ContactSubmission, InquiryType } from '@/types/contact'

/**
 * Enquiry — the canonical, storage/CRM-ready record built from a validated
 * form submission plus request metadata.
 *
 * Why this exists separately from `ContactSubmission`:
 * `ContactSubmission` is the *form's* shape (core fields + one of four
 * inquiry-type-specific field sets) — good for validation, awkward for a
 * CRM, which generally wants a flat "lead" with a distinguishable contact
 * block, a free-form details block, and source/tracking metadata.
 *
 * When the client's CRM is chosen, the integration work is: take an
 * `Enquiry`, map its fields onto the CRM's lead/contact object, POST it.
 * That mapping is the only thing that changes — nothing upstream of this
 * type needs to.
 */
export interface Enquiry {
  /** Stable internal id (UUID) — use this for de-duplication / log correlation */
  id: string
  /** Short human-friendly reference shown to the visitor, e.g. "ATH-260811-4K9QX" */
  referenceId: string
  /** ISO 8601 */
  receivedAt: string

  inquiryType: InquiryType

  contact: {
    name: string
    company: string
    email: string
    phone: string
  }

  /**
   * Everything specific to the inquiry type (industry, product interest,
   * problem statement, cover message, etc.) — kept as a flat string map so
   * new fields never require a schema migration on this type, only on the
   * form + validation schema that produced them.
   */
  details: Record<string, string>

  source: {
    /** Page the enquiry was submitted from, e.g. "/contact" */
    page: string
    /** Referring URL, if any (helps sales understand what prompted the enquiry) */
    referrer?: string
    /** Pre-fill context carried in via query params from other pages */
    prefill?: {
      industry?: string
      product?: string
    }
  }

  meta: {
    /** Best-effort, not verified — for spam triage only, never shown to the visitor */
    ip?: string
    userAgent?: string
  }

  /** CRM-style lead status. Always "new" at creation — a future CRM owns transitions from here. */
  status: 'new'
}

export interface BuildEnquiryInput {
  submission: ContactSubmission
  page: string
  referrer?: string
  prefill?: { industry?: string; product?: string }
  ip?: string
  userAgent?: string
}