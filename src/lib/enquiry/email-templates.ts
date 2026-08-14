import type { Enquiry } from './types'

const INQUIRY_LABELS: Record<Enquiry['inquiryType'], string> = {
  quote: 'Request Quote',
  technical: 'Technical Enquiry',
  general: 'General Enquiry',
  career: 'Career Enquiry',
}

// Human-readable labels for the raw field keys stored in `details`, so the
// sales team sees "Product Interest" rather than "productInterest".
const FIELD_LABELS: Record<string, string> = {
  industry: 'Industry',
  productInterest: 'Product Interest',
  quantity: 'Quantity',
  application: 'Application',
  requirements: 'Technical Requirements',
  product: 'Product / Material',
  currentMaterial: 'Current Material',
  problemStatement: 'Problem / Requirement',
  subject: 'Subject',
  message: 'Message',
  positionInterest: 'Position of Interest',
  experience: 'Years of Experience',
  coverMessage: 'Cover Message',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;width:160px;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;color:#0f172a;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(value)}</td>
    </tr>`
}

/**
 * Internal notification — sent to CONTACT_EMAIL (or CAREERS_EMAIL for career
 * enquiries). Reply-To is set to the enquirer's own address, so the sales
 * team can just hit "Reply" in their inbox.
 */
export function buildInternalNotificationHtml(enquiry: Enquiry): string {
  const detailRows = Object.entries(enquiry.details)
    .map(([key, value]) => fieldRow(FIELD_LABELS[key] ?? key, value))
    .join('')

  const sourceLine = [
    enquiry.source.page,
    enquiry.source.prefill?.industry ? `industry=${enquiry.source.prefill.industry}` : null,
    enquiry.source.prefill?.product ? `product=${enquiry.source.prefill.product}` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#0f172a;padding:24px 28px;">
      <span style="display:inline-block;width:2px;height:16px;background:#2563eb;vertical-align:middle;margin-right:10px;"></span>
      <span style="color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">${escapeHtml(INQUIRY_LABELS[enquiry.inquiryType])}</span>
      <h1 style="color:#ffffff;font-size:22px;font-weight:300;margin:12px 0 0;">New enquiry — ${escapeHtml(enquiry.contact.company)}</h1>
      <p style="color:#64748b;font-size:12px;margin:6px 0 0;">Reference ${escapeHtml(enquiry.referenceId)} · ${escapeHtml(new Date(enquiry.receivedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }))}</p>
    </div>

    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;border-bottom:1px solid #e2e8f0;padding-bottom:8px;">
        ${fieldRow('Name', enquiry.contact.name)}
        ${fieldRow('Company', enquiry.contact.company)}
        ${fieldRow('Email', enquiry.contact.email)}
        ${fieldRow('Phone', enquiry.contact.phone)}
      </table>

      <table style="width:100%;border-collapse:collapse;margin-top:8px;">
        ${detailRows}
      </table>

      ${
        sourceLine
          ? `<p style="color:#94a3b8;font-size:12px;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;">Submitted from ${escapeHtml(sourceLine)}</p>`
          : ''
      }
    </div>
  </div>`
}

/**
 * Visitor-facing auto-reply. Best-effort — see notify.ts, its failure never
 * blocks the main notification or the success response to the visitor.
 */
export function buildConfirmationEmailHtml(enquiry: Enquiry): string {
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;max-width:520px;margin:0 auto;color:#0f172a;">
    <div style="padding:32px 28px 8px;">
      <span style="display:inline-block;width:2px;height:16px;background:#2563eb;vertical-align:middle;margin-right:10px;"></span>
      <span style="color:#64748b;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;">Atharva Polymers</span>
      <h1 style="font-size:22px;font-weight:400;margin:16px 0 8px;">Thanks, ${escapeHtml(enquiry.contact.name.split(' ')[0] || enquiry.contact.name)} — we've received your enquiry.</h1>
      <p style="color:#475569;font-size:15px;line-height:1.7;">
        Our team will review your requirement and respond within one business day.
        Your reference number is <strong>${escapeHtml(enquiry.referenceId)}</strong> — mention it if you follow up with us.
      </p>
      <p style="color:#475569;font-size:15px;line-height:1.7;">
        For urgent requirements, you can also reach us directly on WhatsApp.
      </p>
      <p style="color:#94a3b8;font-size:12px;margin-top:32px;padding-top:16px;border-top:1px solid #e2e8f0;">
        Atharva Polymers Pvt Ltd · MIDC Ranjangaon, Pune, Maharashtra, India
      </p>
    </div>
  </div>`
}

export function internalNotificationSubject(enquiry: Enquiry): string {
  const subjectMap: Record<Enquiry['inquiryType'], string> = {
    quote: `New Quote Request — ${enquiry.contact.company}`,
    technical: `Technical Enquiry — ${enquiry.contact.company}`,
    general: `General Enquiry — ${enquiry.contact.name}`,
    career: `Career Application — ${enquiry.contact.name}`,
  }
  return `${subjectMap[enquiry.inquiryType]} [${enquiry.referenceId}]`
}

export function confirmationEmailSubject(): string {
  return 'We received your enquiry — Atharva Polymers'
}