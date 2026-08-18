// import { NextRequest, NextResponse } from 'next/server'
// import { Resend } from 'resend'
// import { contactSchema } from '@/lib/validation/contact-schema'
// import type { ContactSubmission } from '@/types/contact'

// // ❌ Remove this top-level instantiation:
// // const resend = new Resend(process.env.RESEND_API_KEY)

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()

//     // Validate
//     const data = contactSchema.parse(body) as ContactSubmission

//     // Honeypot check — silent reject
//     if (data.honeypot) {
//       return NextResponse.json({ success: true })
//     }

//     // ✅ Get API key and create Resend client inside the handler
//     const apiKey = process.env.RESEND_API_KEY
//     if (!apiKey) {
//       console.error('RESEND_API_KEY is not set')
//       return NextResponse.json(
//         { error: 'Email service is not configured' },
//         { status: 500 }
//       )
//     }

//     const resend = new Resend(apiKey)

//     // Also check CONTACT_EMAIL
//     const toEmail = process.env.CONTACT_EMAIL
//     if (!toEmail) {
//       console.error('CONTACT_EMAIL is not set')
//       return NextResponse.json(
//         { error: 'Email recipient is not configured' },
//         { status: 500 }
//       )
//     }

//     // Send email
//     await resend.emails.send({
//       from: 'Atharva Polymers Website <noreply@atharvapolymers.com>',
//       to: toEmail,
//       subject: subjectLine(data),
//       html: buildEmailHTML(data),
//       reply_to: data.email,
//     })

//     return NextResponse.json({ success: true })
//   } catch (error: any) {
//     if (error?.name === 'ZodError') {
//       return NextResponse.json(
//         { error: 'Validation failed', details: error.errors },
//         { status: 400 }
//       )
//     }
//     console.error('Contact form error:', error)
//     return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
//   }
// }

// // Helper functions (unchanged)
// function subjectLine(data: ContactSubmission) {
//   const map = {
//     quote: `New Quote Request — ${data.company}`,
//     technical: `Technical Enquiry — ${data.company}`,
//     general: `General Enquiry — ${data.name}`,
//     career: `Career Application — ${data.name}`,
//   }
//   return map[data.inquiryType]
// }

// function buildEmailHTML(data: ContactSubmission): string {
//   const fields = Object.entries(data)
//     .filter(([key]) => key !== 'honeypot')
//     .map(([key, value]) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;font-weight:600">${key}</td><td style="padding:6px 12px;border-bottom:1px solid #e2e8f0">${value || '—'}</td></tr>`)
//     .join('')

//   return `
//     <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
//       <h2 style="color:#1e293b">New Enquiry — ${data.inquiryType.toUpperCase()}</h2>
//       <table style="width:100%;border-collapse:collapse;margin-top:16px">
//         ${fields}
//       </table>
//       <p style="color:#94a3b8;font-size:12px;margin-top:24px">Submitted via atharvapolymers.com/contact</p>
//     </div>
//   `
// }

/////////////////////////////////


// import { NextRequest, NextResponse } from 'next/server'
// import { contactSchema } from '@/lib/validation/contact-schema'
// import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit'
// import {
//   isHoneypotTripped,
//   isSubmittedTooFast,
//   checkAndRecordDuplicate,
//   extractMessageLikeField,
// } from '@/lib/security/spam-guard'
// import { buildEnquiry, generateReferenceId } from '@/lib/enquiry/build'
// import { sendInternalNotification, sendConfirmationEmail } from '@/lib/enquiry/notify'
// import { forwardToCrm } from '@/lib/enquiry/crm-forward'
// import { env } from '@/lib/env'
// import type { ContactApiErrorResponse, ContactApiSuccessResponse } from '@/types/contact'

// export const runtime = 'nodejs' // Resend's SDK and Node's `crypto` need the Node runtime, not Edge.

// function errorResponse(status: number, error: string, message: string, extra?: Partial<ContactApiErrorResponse>) {
//   const payload: ContactApiErrorResponse = { success: false, error, message, ...extra }
//   return NextResponse.json(payload, { status })
// }

// function fakeSuccess() {
//   // Used for honeypot/timing-trap hits. Looks identical to a real success to
//   // the caller — the whole point is that a bot never learns it was caught.
//   const payload: ContactApiSuccessResponse = { success: true, referenceId: generateReferenceId() }
//   return NextResponse.json(payload, { status: 200 })
// }

// /** Derives which page the enquiry came from, and any product/industry the visitor arrived pre-filtered by, from the Referer header. Purely informational — never trusted for anything security-sensitive. */
// function deriveSource(request: NextRequest): { page: string; referrer?: string; prefill?: { industry?: string; product?: string } } {
//   const referer = request.headers.get('referer') ?? undefined
//   if (!referer) return { page: '/contact' }

//   try {
//     const url = new URL(referer)
//     return {
//       page: url.pathname || '/contact',
//       referrer: referer,
//       prefill: {
//         industry: url.searchParams.get('industry') ?? undefined,
//         product: url.searchParams.get('product') ?? undefined,
//       },
//     }
//   } catch {
//     return { page: '/contact', referrer: referer }
//   }
// }

// export async function POST(request: NextRequest) {
//   // ── 1. Parse the body ──────────────────────────────────────────────────
//   let body: Record<string, unknown>
//   try {
//     body = await request.json()
//   } catch {
//     return errorResponse(400, 'INVALID_JSON', 'Malformed request.')
//   }

//   // ── 2. Rate limit (cheapest, most volumetric protection first) ─────────
//   const ip = getClientIp(request.headers)
//   const rateLimit = checkRateLimit(ip)
//   if (!rateLimit.allowed) {
//     return errorResponse(
//       429,
//       'RATE_LIMITED',
//       'Too many enquiries submitted recently. Please try again shortly, or reach us directly on WhatsApp.',
//       { retryAfterSeconds: rateLimit.retryAfterSeconds },
//     )
//   }

//   // ── 3. Honeypot + timing trap ───────────────────────────────────────────
//   if (isHoneypotTripped(body.honeypot) || isSubmittedTooFast(body.formStartedAt)) {
//     console.warn('[contact] blocked likely-automated submission', { ip })
//     return fakeSuccess()
//   }

//   // ── 4. Validate the business fields ─────────────────────────────────────
//   const parsed = contactSchema.safeParse(body)
//   if (!parsed.success) {
//     const fieldErrors: Record<string, string[]> = {}
//     for (const issue of parsed.error.issues) {
//       const path = issue.path.join('.') || '_form'
//       fieldErrors[path] = [...(fieldErrors[path] ?? []), issue.message]
//     }
//     return errorResponse(400, 'VALIDATION_FAILED', 'Please check the highlighted fields.', { fieldErrors })
//   }
//   const submission = parsed.data

//   // ── 5. Build the structured enquiry (generates the reference ID) ───────
//   const source = deriveSource(request)
//   const enquiry = buildEnquiry({
//     submission,
//     page: source.page,
//     referrer: source.referrer,
//     prefill: source.prefill,
//     ip,
//     userAgent: request.headers.get('user-agent') ?? undefined,
//   })

//   // ── 6. Duplicate submission guard ───────────────────────────────────────
//   const idempotencyKey = typeof body.idempotencyKey === 'string' ? body.idempotencyKey : undefined
//   const duplicate = checkAndRecordDuplicate(
//     idempotencyKey,
//     {
//       inquiryType: submission.inquiryType,
//       name: submission.name,
//       email: submission.email,
//       message: extractMessageLikeField(submission),
//     },
//     enquiry.referenceId,
//   )
//   if (duplicate.isDuplicate) {
//     const payload: ContactApiSuccessResponse = {
//       success: true,
//       referenceId: duplicate.existingReferenceId ?? enquiry.referenceId,
//     }
//     return NextResponse.json(payload)
//   }

//   // ── 7. Deliver — this step must succeed for the request to succeed ─────
//   if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL) {
//     console.error('[contact] misconfigured: RESEND_API_KEY or CONTACT_EMAIL is not set')
//     return errorResponse(
//       500,
//       'NOT_CONFIGURED',
//       'Enquiries cannot be delivered right now. Please contact us directly via WhatsApp or phone.',
//     )
//   }

//   // Log the full structured enquiry before attempting delivery. If Resend is
//   // ever down, this line — visible in the hosting platform's function logs —
//   // is the only remaining record of the enquiry, so it's written
//   // unconditionally rather than only on the error path.
//   console.log('[contact] enquiry received', JSON.stringify(enquiry))

//   try {
//     await sendInternalNotification(enquiry)
//   } catch (err) {
//     console.error('[contact] failed to deliver enquiry', enquiry.referenceId, err)
//     return errorResponse(
//       500,
//       'DELIVERY_FAILED',
//       'We were unable to submit your enquiry. Please try again, or contact us directly via WhatsApp.',
//     )
//   }

//   // ── 8. Best-effort extras — never allowed to fail the response ─────────
//   await Promise.allSettled([sendConfirmationEmail(enquiry), forwardToCrm(enquiry)])

//   const payload: ContactApiSuccessResponse = { success: true, referenceId: enquiry.referenceId }
//   return NextResponse.json(payload)
// }



import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validation/contact-schema'
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limit'
import {
  isHoneypotTripped,
  isSubmittedTooFast,
  checkAndRecordDuplicate,
  extractMessageLikeField,
} from '@/lib/security/spam-guard'
import { buildEnquiry, generateReferenceId } from '@/lib/enquiry/build'
import { sendInternalNotification, sendConfirmationEmail } from '@/lib/enquiry/notify'
import { forwardToCrm } from '@/lib/enquiry/crm-forward'
import { env } from '@/lib/env'
import type { ContactApiErrorResponse, ContactApiSuccessResponse } from '@/types/contact'

export const runtime = 'nodejs' // Resend's SDK and Node's `crypto` need the Node runtime, not Edge.

// File upload limits (applies only to career enquiries)
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'image/jpeg',
  'image/png',
]

interface Attachment {
  filename: string
  content: Buffer
  contentType: string
}

function errorResponse(status: number, error: string, message: string, extra?: Partial<ContactApiErrorResponse>) {
  const payload: ContactApiErrorResponse = { success: false, error, message, ...extra }
  return NextResponse.json(payload, { status })
}

function fakeSuccess() {
  // Used for honeypot/timing-trap hits. Looks identical to a real success to
  // the caller — the whole point is that a bot never learns it was caught.
  const payload: ContactApiSuccessResponse = { success: true, referenceId: generateReferenceId() }
  return NextResponse.json(payload, { status: 200 })
}

/** Derives which page the enquiry came from, and any product/industry the visitor arrived pre-filtered by, from the Referer header. Purely informational — never trusted for anything security-sensitive. */
function deriveSource(request: NextRequest): { page: string; referrer?: string; prefill?: { industry?: string; product?: string } } {
  const referer = request.headers.get('referer') ?? undefined
  if (!referer) return { page: '/contact' }

  try {
    const url = new URL(referer)
    return {
      page: url.pathname || '/contact',
      referrer: referer,
      prefill: {
        industry: url.searchParams.get('industry') ?? undefined,
        product: url.searchParams.get('product') ?? undefined,
      },
    }
  } catch {
    return { page: '/contact', referrer: referer }
  }
}

export async function POST(request: NextRequest) {
  // ── 1. Parse the body ──────────────────────────────────────────────────
  let body: Record<string, unknown> = {}
  let attachment: Attachment | undefined

  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('multipart/form-data')) {
    // Career enquiry with resume file — the file is sent as FormData.
    try {
      const formData = await request.formData()
      for (const [key, value] of formData.entries()) {
        if (key === 'resume' && value instanceof File) {
          const buffer = Buffer.from(await value.arrayBuffer())
          attachment = {
            filename: value.name,
            content: buffer,
            contentType: value.type,
          }
        } else {
          body[key] = value
        }
      }
    } catch {
      return errorResponse(400, 'INVALID_FORM_DATA', 'Malformed request.')
    }
  } else {
    // Standard JSON submission (no file)
    try {
      body = await request.json()
    } catch {
      return errorResponse(400, 'INVALID_JSON', 'Malformed request.')
    }
  }

  // ── 2. Rate limit (cheapest, most volumetric protection first) ─────────
  const ip = getClientIp(request.headers)
  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    return errorResponse(
      429,
      'RATE_LIMITED',
      'Too many enquiries submitted recently. Please try again shortly, or reach us directly on WhatsApp.',
      { retryAfterSeconds: rateLimit.retryAfterSeconds },
    )
  }

  // ── 3. Honeypot + timing trap ───────────────────────────────────────────
  if (isHoneypotTripped(body.honeypot) || isSubmittedTooFast(body.formStartedAt)) {
    console.warn('[contact] blocked likely-automated submission', { ip })
    return fakeSuccess()
  }

  // ── 4. Validate the business fields ─────────────────────────────────────
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.') || '_form'
      fieldErrors[path] = [...(fieldErrors[path] ?? []), issue.message]
    }
    return errorResponse(400, 'VALIDATION_FAILED', 'Please check the highlighted fields.', { fieldErrors })
  }
  const submission = parsed.data

  // ── 4b. Validate uploaded file (career enquiries only) ─────────────────
  if (attachment) {
    if (submission.inquiryType !== 'career') {
      return errorResponse(400, 'INVALID_FILE', 'File upload is only allowed for career enquiries.')
    }
    if (!ALLOWED_FILE_TYPES.includes(attachment.contentType)) {
      return errorResponse(
        400,
        'INVALID_FILE_TYPE',
        'Please upload a PDF, DOC, DOCX, JPG, or PNG file.',
      )
    }
    if (attachment.content.length > MAX_FILE_SIZE) {
      return errorResponse(
        400,
        'FILE_TOO_LARGE',
        'The file size must be under 5 MB.',
      )
    }
  }

  // ── 5. Build the structured enquiry (generates the reference ID) ───────
  const source = deriveSource(request)
  const enquiry = buildEnquiry({
    submission,
    page: source.page,
    referrer: source.referrer,
    prefill: source.prefill,
    ip,
    userAgent: request.headers.get('user-agent') ?? undefined,
  })

  // ── 6. Duplicate submission guard ───────────────────────────────────────
  const idempotencyKey = typeof body.idempotencyKey === 'string' ? body.idempotencyKey : undefined
  const duplicate = checkAndRecordDuplicate(
    idempotencyKey,
    {
      inquiryType: submission.inquiryType,
      name: submission.name,
      email: submission.email,
      message: extractMessageLikeField(submission),
    },
    enquiry.referenceId,
  )
  if (duplicate.isDuplicate) {
    const payload: ContactApiSuccessResponse = {
      success: true,
      referenceId: duplicate.existingReferenceId ?? enquiry.referenceId,
    }
    return NextResponse.json(payload)
  }

  // ── 7. Deliver — this step must succeed for the request to succeed ─────
  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL) {
    console.error('[contact] misconfigured: RESEND_API_KEY or CONTACT_EMAIL is not set')
    return errorResponse(
      500,
      'NOT_CONFIGURED',
      'Enquiries cannot be delivered right now. Please contact us directly via WhatsApp or phone.',
    )
  }

  // Log the full structured enquiry before attempting delivery. If Resend is
  // ever down, this line — visible in the hosting platform's function logs —
  // is the only remaining record of the enquiry, so it's written
  // unconditionally rather than only on the error path.
  console.log('[contact] enquiry received', JSON.stringify(enquiry))

  try {
    // Pass attachment (if any) to the internal notification email only.
    await sendInternalNotification(enquiry, attachment ? [attachment] : undefined)
  } catch (err) {
    console.error('[contact] failed to deliver enquiry', enquiry.referenceId, err)
    return errorResponse(
      500,
      'DELIVERY_FAILED',
      'We were unable to submit your enquiry. Please try again, or contact us directly via WhatsApp.',
    )
  }

  // ── 8. Best-effort extras — never allowed to fail the response ─────────
  await Promise.allSettled([sendConfirmationEmail(enquiry), forwardToCrm(enquiry)])

  const payload: ContactApiSuccessResponse = { success: true, referenceId: enquiry.referenceId }
  return NextResponse.json(payload)
}