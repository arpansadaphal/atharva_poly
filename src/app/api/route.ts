import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// ─────────────────────────────────────────────────────────────────────────────
// Validation schema — mirrors ContactForm fields
// ─────────────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().min(2, 'Please enter your company name'),
  email: z.string().email('Please enter a valid email address'),
  // Accepts +91XXXXXXXXXX or 10-digit Indian mobile
  phone: z
    .string()
    .regex(/^(\+91)?[6-9]\d{9}$/, 'Please enter a valid phone number'),
  industry: z.string().optional(),
  productInterest: z.string().optional(),
  message: z.string().min(20, 'Please provide more detail about your requirement'),
  // Honeypot — must be empty to pass
  honeypot: z.string().max(0, 'Bot detected'),
})

type ContactData = z.infer<typeof contactSchema>

// ─────────────────────────────────────────────────────────────────────────────
// Email builder
// ─────────────────────────────────────────────────────────────────────────────

function buildEmailHtml(data: ContactData): string {
  return `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 12px;">
        New Inquiry — Atharva Polymers
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Name</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${data.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Company</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${data.company}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b;">Phone</td>
            <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></td></tr>
        ${data.industry ? `<tr><td style="padding: 8px 0; color: #64748b;">Industry</td>
            <td style="padding: 8px 0; color: #0f172a;">${data.industry}</td></tr>` : ''}
        ${data.productInterest ? `<tr><td style="padding: 8px 0; color: #64748b;">Product Interest</td>
            <td style="padding: 8px 0; color: #0f172a;">${data.productInterest}</td></tr>` : ''}
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px;">
        <p style="color: #64748b; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
        <p style="color: #0f172a; margin: 0; line-height: 1.6;">${data.message}</p>
      </div>
      <p style="margin-top: 20px; color: #94a3b8; font-size: 12px;">
        Sent via atharvapolymers.com contact form
      </p>
    </div>
  `
}

// ─────────────────────────────────────────────────────────────────────────────
// POST handler
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Silent reject for honeypot — return success so bots don't retry
    if (data.honeypot) {
      return NextResponse.json({ success: true })
    }

    // ── Email sending via Resend ──────────────────────────────────────────
    // ⚠ Uncomment and configure when RESEND_API_KEY is available.
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // await resend.emails.send({
    //   from: 'Atharva Polymers Website <noreply@atharvapolymers.com>',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `New Inquiry from ${data.company} — Atharva Polymers`,
    //   html: buildEmailHtml(data),
    // })

    // Temporary: log to console during development
    console.log('[Contact Form Submission]', {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      industry: data.industry,
      productInterest: data.productInterest,
      message: data.message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact API Error]', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}