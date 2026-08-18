import { createHmac } from 'crypto'
import { env, isCrmForwardingConfigured } from '@/lib/env'
import type { Enquiry } from './types'

/**
 * CRM extension point.
 *
 * No CRM has been chosen yet, so this intentionally does nothing until
 * `CRM_WEBHOOK_URL` is set. When the client picks a platform, most CRMs
 * (HubSpot, Zoho, Pipedrive, Salesforce Web-to-Lead, or a middleware layer
 * like Zapier/Make/n8n) can accept a plain JSON POST via an inbound webhook
 * — point CRM_WEBHOOK_URL at that endpoint and enquiries start forwarding
 * with no other code change.
 *
 * If the target requires request signing, set CRM_WEBHOOK_SECRET and every
 * request carries an `X-Enquiry-Signature` header: hex HMAC-SHA256 of the
 * raw JSON body, so the receiver can verify authenticity.
 *
 * This never throws and never blocks the visitor-facing response — a CRM
 * being temporarily unreachable must not turn a successfully-captured
 * enquiry (already emailed to the sales inbox) into a failed submission.
 */
export async function forwardToCrm(enquiry: Enquiry): Promise<void> {
  if (!isCrmForwardingConfigured()) return

  const payload = JSON.stringify(enquiry)
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }

  if (env.CRM_WEBHOOK_SECRET) {
    headers['X-Enquiry-Signature'] = createHmac('sha256', env.CRM_WEBHOOK_SECRET).update(payload).digest('hex')
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(env.CRM_WEBHOOK_URL!, {
      method: 'POST',
      headers,
      body: payload,
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) {
      console.error('[contact] CRM forward returned non-2xx', enquiry.referenceId, res.status)
    }
  } catch (err) {
    console.error('[contact] CRM forward failed', enquiry.referenceId, err)
  }
}