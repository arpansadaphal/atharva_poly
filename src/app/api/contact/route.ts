import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validation/contact-schema'
import type { ContactSubmission } from '@/types/contact'

// ❌ Remove this top-level instantiation:
// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate
    const data = contactSchema.parse(body) as ContactSubmission

    // Honeypot check — silent reject
    if (data.honeypot) {
      return NextResponse.json({ success: true })
    }

    // ✅ Get API key and create Resend client inside the handler
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    // Also check CONTACT_EMAIL
    const toEmail = process.env.CONTACT_EMAIL
    if (!toEmail) {
      console.error('CONTACT_EMAIL is not set')
      return NextResponse.json(
        { error: 'Email recipient is not configured' },
        { status: 500 }
      )
    }

    // Send email
    await resend.emails.send({
      from: 'Atharva Polymers Website <noreply@atharvapolymers.com>',
      to: toEmail,
      subject: subjectLine(data),
      html: buildEmailHTML(data),
      reply_to: data.email,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}

// Helper functions (unchanged)
function subjectLine(data: ContactSubmission) {
  const map = {
    quote: `New Quote Request — ${data.company}`,
    technical: `Technical Enquiry — ${data.company}`,
    general: `General Enquiry — ${data.name}`,
    career: `Career Application — ${data.name}`,
  }
  return map[data.inquiryType]
}

function buildEmailHTML(data: ContactSubmission): string {
  const fields = Object.entries(data)
    .filter(([key]) => key !== 'honeypot')
    .map(([key, value]) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #e2e8f0;font-weight:600">${key}</td><td style="padding:6px 12px;border-bottom:1px solid #e2e8f0">${value || '—'}</td></tr>`)
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1e293b">New Enquiry — ${data.inquiryType.toUpperCase()}</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        ${fields}
      </table>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px">Submitted via atharvapolymers.com/contact</p>
    </div>
  `
}