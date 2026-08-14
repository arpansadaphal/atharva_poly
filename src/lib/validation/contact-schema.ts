// import { z } from 'zod'

// const coreSchema = z.object({
//   name: z.string().min(2, 'Please enter your name'),
//   company: z.string().min(2, 'Please enter your company name'),
//   email: z.string().email('Please enter a valid email address'),
//   phone: z
//     .string()
//     .regex(
//       /^(\+?[1-9]\d{0,3}[\s\-]?)?((\(\d{1,4}\))|\d{1,4})[\s\-]?\d{1,4}[\s\-]?\d{1,9}$/,
//       'Please enter a valid phone number'
//     ),
//   honeypot: z.string().max(0, 'Bot detected'),
// })

// export const contactSchema = z.discriminatedUnion('inquiryType', [
//   coreSchema.extend({
//     inquiryType: z.literal('quote'),
//     industry: z.string().min(1, 'Please select your industry'),
//     productInterest: z.string().min(2, 'Please describe the product or material'),
//     quantity: z.string().optional(),
//     application: z.string().optional(),
//     requirements: z.string().optional(),
//   }),
//   coreSchema.extend({
//     inquiryType: z.literal('technical'),
//     product: z.string().min(2, 'Please specify the product or material'),
//     currentMaterial: z.string().optional(),
//     problemStatement: z.string().min(30, 'Please provide more detail — minimum 30 characters'),
//   }),
//   coreSchema.extend({
//     inquiryType: z.literal('general'),
//     subject: z.string().min(2, 'Please enter a subject'),
//     message: z.string().min(20, 'Please provide more detail — minimum 20 characters'),
//   }),
//   coreSchema.extend({
//     inquiryType: z.literal('career'),
//     positionInterest: z.string().min(2, 'Please describe the role or area'),
//     experience: z.string().min(1, 'Please select your experience level'),
//     coverMessage: z.string().min(50, 'Please write a brief cover message — minimum 50 characters'),
//   }),
// ])

import { z } from 'zod'

/**
 * Note on `honeypot`: it is intentionally NOT validated as "must be empty"
 * here. A bot that trips it should see a normal-looking success response,
 * not a 400 that tells it exactly which field gave it away. The actual
 * honeypot check lives in `lib/security/spam-guard.ts` and runs *before*
 * this schema, short-circuiting the request with a fake success.
 */
const coreSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  company: z.string().trim().min(2, 'Please enter your company name').max(160),
  email: z.string().trim().email('Please enter a valid email address').max(180),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+?[1-9]\d{0,3}[\s\-]?)?((\(\d{1,4}\))|\d{1,4})[\s\-]?\d{1,4}[\s\-]?\d{1,9}$/,
      'Please enter a valid phone number',
    )
    .max(20),
  honeypot: z.string().max(200).optional().default(''),
})

const quoteSchema = coreSchema.extend({
  inquiryType: z.literal('quote'),
  industry: z.string().min(1, 'Please select your industry'),
  productInterest: z.string().trim().min(2, 'Please describe the product or material').max(300),
  quantity: z.string().trim().max(120).optional(),
  application: z.string().trim().max(300).optional(),
  requirements: z.string().trim().max(4000).optional(),
})

const technicalSchema = coreSchema.extend({
  inquiryType: z.literal('technical'),
  product: z.string().trim().min(2, 'Please specify the product or material').max(300),
  currentMaterial: z.string().trim().max(300).optional(),
  problemStatement: z.string().trim().min(30, 'Please provide more detail — minimum 30 characters').max(4000),
})

const generalSchema = coreSchema.extend({
  inquiryType: z.literal('general'),
  subject: z.string().trim().min(2, 'Please enter a subject').max(200),
  message: z.string().trim().min(20, 'Please provide more detail — minimum 20 characters').max(4000),
})

const careerSchema = coreSchema.extend({
  inquiryType: z.literal('career'),
  positionInterest: z.string().trim().min(2, 'Please describe the role or area').max(200),
  experience: z.string().min(1, 'Please select your experience level'),
  coverMessage: z.string().trim().min(50, 'Please write a brief cover message — minimum 50 characters').max(4000),
})

export const contactSchema = z.discriminatedUnion('inquiryType', [
  quoteSchema,
  technicalSchema,
  generalSchema,
  careerSchema,
])

export type ValidatedContactSubmission = z.infer<typeof contactSchema>