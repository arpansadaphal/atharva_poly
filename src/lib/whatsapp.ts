/**
 * WhatsApp URL builder.
 *
 * Generates pre-filled wa.me deep-links.
 * The NEXT_PUBLIC_WHATSAPP_NUMBER env var must be set in format: 919XXXXXXXXX
 * (country code + 10-digit number, no + prefix, no spaces).
 *
 * Usage:
 *   buildWhatsAppURL()                              → generic inquiry
 *   buildWhatsAppURL({ product: 'PP Compounds' })   → product-specific
 *   buildWhatsAppURL({ product: 'X', industry: 'Automotive' })
 */

interface WhatsAppParams {
  product?: string
  industry?: string
  customMessage?: string
}

export function buildWhatsAppURL(params?: WhatsAppParams): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

  let message: string

  if (params?.customMessage) {
    message = params.customMessage
  } else if (params?.product && params?.industry) {
    message = `Hello, I would like to inquire about ${params.product} for ${params.industry} applications.`
  } else if (params?.product) {
    message = `Hello, I would like to inquire about ${params.product}.`
  } else {
    message = 'Hello, I would like to inquire about your polymer products and manufacturing capabilities.'
  }

  if (!number) {
    // During development, return a placeholder that won't break the UI
    return `https://wa.me/?text=${encodeURIComponent(message)}`
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}