// export type InquiryType = 'quote' | 'technical' | 'general' | 'career'

// // Core fields always present
// export interface ContactFormCore {
//   name: string
//   company: string
//   email: string
//   phone: string
//   honeypot: string
// }

// // Additional fields per inquiry type
// export interface QuoteFields {
//   inquiryType: 'quote'
//   industry: string
//   productInterest: string
//   quantity?: string
//   application?: string
//   requirements?: string
  
// }

// export interface TechnicalFields {
//   inquiryType: 'technical'
//   product: string
//   currentMaterial?: string
//   problemStatement: string
// }

// export interface GeneralFields {
//   inquiryType: 'general'
//   subject: string
//   message: string
// }

// export interface CareerFields {
//   inquiryType: 'career'
//   positionInterest: string
//   experience: string
//   coverMessage: string
// }

// // Union type for the API
// export type ContactSubmission = ContactFormCore &
//   (QuoteFields | TechnicalFields | GeneralFields | CareerFields)

// export type FormState = 'idle' | 'submitting' | 'success' | 'error'






//////////////////////////////////////////////////////////////////////////







// export type InquiryType = 'quote' | 'technical' | 'general' | 'career'

// // Core fields always present
// export interface ContactFormCore {
//   name: string
//   company: string
//   email: string
//   phone: string
//   honeypot: string
// }

// // Additional fields per inquiry type
// export interface QuoteFields {
//   inquiryType: 'quote'
//   industry: string
//   productInterest: string
//   quantity?: string
//   application?: string
//   requirements?: string
// }

// export interface TechnicalFields {
//   inquiryType: 'technical'
//   product: string
//   currentMaterial?: string
//   problemStatement: string
// }

// export interface GeneralFields {
//   inquiryType: 'general'
//   subject: string
//   message: string
// }

// export interface CareerFields {
//   inquiryType: 'career'
//   positionInterest: string
//   experience: string
//   coverMessage: string
// }

// // Union type for the API — this is the CRM-facing "business data" shape.
// // It intentionally carries no transport/anti-spam concerns (see below).
// export type ContactSubmission = ContactFormCore &
//   (QuoteFields | TechnicalFields | GeneralFields | CareerFields)

// export type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limited'

// /**
//  * What the client actually POSTs to /api/contact: the business submission,
//  * plus a small envelope of anti-abuse signals. Kept as a separate type
//  * (rather than folded into ContactSubmission) so `Enquiry` and any future
//  * CRM mapping never have to know these fields exist.
//  *
//  * A type alias with an intersection (not `interface ... extends`) on
//  * purpose — ContactSubmission is a union under the hood (one branch per
//  * inquiry type), and interfaces can't extend a type built from a union.
//  */
// export type ContactApiRequestBody = ContactSubmission & {
//   /** UUID generated once per form mount — lets the server dedupe retries of the same submit */
//   idempotencyKey: string
//   /** Date.now() captured on form mount — used for the bot-timing check */
//   formStartedAt: number
//   /** Query params the visitor arrived with, if any (e.g. ?industry=automotive&product=pp-compound) */
//   prefill?: {
//     industry?: string
//     product?: string
//   }
// }

// export interface ContactApiSuccessResponse {
//   success: true
//   referenceId: string
// }

// export interface ContactApiErrorResponse {
//   success: false
//   error: string
//   message: string
//   fieldErrors?: Record<string, string[]>
//   retryAfterSeconds?: number
// }







////////////////////////////////////////////////////////////////////////////////////////




export type InquiryType = 'quote' | 'technical' | 'general' | 'career'

// Core fields always present
export interface ContactFormCore {
  name: string
  company: string
  email: string
  phone: string
  hearAboutUs: string   // <-- NEW
  honeypot: string
}

// Additional fields per inquiry type
export interface QuoteFields {
  inquiryType: 'quote'
  industry: string
  productInterest: string
  quantity?: string
  application?: string
  requirements?: string
}

export interface TechnicalFields {
  inquiryType: 'technical'
  product: string
  currentMaterial?: string
  problemStatement: string
}

export interface GeneralFields {
  inquiryType: 'general'
  subject: string
  message: string
}

export interface CareerFields {
  inquiryType: 'career'
  positionInterest: string
  experience: string
  coverMessage: string
}

// Union type for the API — this is the CRM-facing "business data" shape.
// It intentionally carries no transport/anti-spam concerns (see below).
export type ContactSubmission = ContactFormCore &
  (QuoteFields | TechnicalFields | GeneralFields | CareerFields)

export type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limited'

/**
 * What the client actually POSTs to /api/contact: the business submission,
 * plus a small envelope of anti-abuse signals. Kept as a separate type
 * (rather than folded into ContactSubmission) so `Enquiry` and any future
 * CRM mapping never have to know these fields exist.
 *
 * A type alias with an intersection (not `interface ... extends`) on
 * purpose — ContactSubmission is a union under the hood (one branch per
 * inquiry type), and interfaces can't extend a type built from a union.
 */
export type ContactApiRequestBody = ContactSubmission & {
  /** UUID generated once per form mount — lets the server dedupe retries of the same submit */
  idempotencyKey: string
  /** Date.now() captured on form mount — used for the bot-timing check */
  formStartedAt: number
  /** Query params the visitor arrived with, if any (e.g. ?industry=automotive&product=pp-compound) */
  prefill?: {
    industry?: string
    product?: string
  }
}

export interface ContactApiSuccessResponse {
  success: true
  referenceId: string
}

export interface ContactApiErrorResponse {
  success: false
  error: string
  message: string
  fieldErrors?: Record<string, string[]>
  retryAfterSeconds?: number
}

export type Attachment = {
  filename: string;
  content: Buffer; // raw file buffer
  contentType?: string;
};