export type InquiryType = 'quote' | 'technical' | 'general' | 'career'

// Core fields always present
export interface ContactFormCore {
  name: string
  company: string
  email: string
  phone: string
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

// Union type for the API
export type ContactSubmission = ContactFormCore &
  (QuoteFields | TechnicalFields | GeneralFields | CareerFields)

export type FormState = 'idle' | 'submitting' | 'success' | 'error'