import { Resend } from 'resend'
import { env } from '@/lib/env'
import type { Enquiry } from './types'
import {
  buildInternalNotificationHtml,
  buildConfirmationEmailHtml,
  internalNotificationSubject,
  confirmationEmailSubject,
} from './email-templates'

// Resend's shared testing sender — works with zero setup before the client's
// sending domain is verified. Swap for real domain the moment EMAIL_FROM is set.
const FALLBACK_FROM = 'Atharva Polymers Website <onboarding@resend.dev>'

function getResendClient(): Resend {
  if (!env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(env.RESEND_API_KEY)
}

function fromAddress(): string {
  if (!env.EMAIL_FROM) {
    console.warn(
      '[contact] EMAIL_FROM is not set — sending from the Resend sandbox address. ' +
        'Set EMAIL_FROM to a verified address on the client\'s domain before real launch.',
    )
  }
  return env.EMAIL_FROM ?? FALLBACK_FROM
}

/**
 * The email that actually delivers the lead to a human. This is the one
 * step in the pipeline that MUST succeed for the request to be considered
 * successful — if it throws, the API route surfaces an error to the visitor
 * rather than silently losing the enquiry.
 */
export async function sendInternalNotification(enquiry: Enquiry): Promise<void> {
  const recipient = enquiry.inquiryType === 'career' ? (env.CAREERS_EMAIL ?? env.CONTACT_EMAIL) : env.CONTACT_EMAIL

  if (!recipient) {
    throw new Error('CONTACT_EMAIL is not configured — cannot deliver enquiry')
  }

  const resend = getResendClient()
  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: recipient,
    reply_to: enquiry.contact.email,
    subject: internalNotificationSubject(enquiry),
    html: buildInternalNotificationHtml(enquiry),
  })

  if (error) {
    throw new Error(`Resend rejected the internal notification: ${error.message}`)
  }
}

/**
 * Best-effort visitor auto-reply. Never throws — a failure here is logged
 * and swallowed so it can't turn a successfully-delivered enquiry into an
 * error response. Controlled by CONTACT_SEND_CONFIRMATION so it can be
 * switched off without a deploy (e.g. before the sending domain carries
 * enough reputation to land in inboxes reliably).
 */
export async function sendConfirmationEmail(enquiry: Enquiry): Promise<void> {
  if (!env.SEND_CONFIRMATION_EMAIL) return

  try {
    const resend = getResendClient()
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: enquiry.contact.email,
      subject: confirmationEmailSubject(),
      html: buildConfirmationEmailHtml(enquiry),
    })
    if (error) {
      console.error('[contact] confirmation email failed', enquiry.referenceId, error.message)
    }
  } catch (err) {
    console.error('[contact] confirmation email threw', enquiry.referenceId, err)
  }
}