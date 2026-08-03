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
  source?: string;
  
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

// export function buildWhatsAppURL(params?: {
//   product?: string
//   industry?: string
//   context?: 'contact' | 'urgent' | 'quote' | 'technical' | 'services' | 'manufacturing'
// }): string {
//   const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
//   if (!number) return '#'

//   const messages: Record<string, string> = {
//     contact: 'Hello, I would like to get in touch with the Atharva Polymers team.',
//     urgent: 'Hello, I have an urgent polymer supply requirement and would like to discuss it.',
//     quote: `Hello, I would like to request a quotation${params?.product ? ` for ${params.product}` : ''}.`,
//     technical: 'Hello, I need technical assistance with a polymer material selection.',
//     services: 'Hello, I would like to discuss your manufacturing and polymer services.',
//     manufacturing: 'Hello, I have a question about your manufacturing capabilities.',
//   }

//   let message: string
//   if (params?.product && params?.industry) {
//     message = `Hello, I would like to enquire about ${params.product} for ${params.industry} applications.`
//   } else if (params?.context && messages[params.context]) {
//     message = messages[params.context]
//   } else {
//     message = messages.contact
//   }

//   return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
// }