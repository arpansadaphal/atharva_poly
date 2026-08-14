import { randomUUID } from 'crypto'
import type { ContactSubmission } from '@/types/contact'
import type { BuildEnquiryInput, Enquiry } from './types'

/**
 * ATH-YYMMDD-XXXXX — short enough to read over the phone, dated so support
 * staff can find it in their inbox quickly, random suffix so it isn't
 * guessable/sequential (no information leak about enquiry volume).
 */
export function generateReferenceId(now = new Date()): string {
  const y = String(now.getFullYear()).slice(-2)
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `ATH-${y}${m}${d}-${suffix}`
}

// Core fields live on `contact` — everything else on `details`, keyed exactly
// as the form field is named. Order here also drives the order fields render
// in the internal notification email.
const CORE_FIELD_KEYS = new Set(['name', 'company', 'email', 'phone', 'honeypot', 'inquiryType'])

export function buildEnquiry({ submission, page, referrer, prefill, ip, userAgent }: BuildEnquiryInput): Enquiry {
  const details: Record<string, string> = {}
  for (const [key, value] of Object.entries(submission)) {
    if (CORE_FIELD_KEYS.has(key)) continue
    if (value === undefined || value === null || value === '') continue
    details[key] = String(value)
  }

  return {
    id: randomUUID(),
    referenceId: generateReferenceId(),
    receivedAt: new Date().toISOString(),
    inquiryType: submission.inquiryType,
    contact: {
      name: submission.name,
      company: submission.company,
      email: submission.email,
      phone: submission.phone,
    },
    details,
    source: {
      page,
      referrer,
      prefill,
    },
    meta: { ip, userAgent },
    status: 'new',
  }
}