import { z } from 'zod'

const coreSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().min(2, 'Please enter your company name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^(\+?[1-9]\d{0,3}[\s\-]?)?((\(\d{1,4}\))|\d{1,4})[\s\-]?\d{1,4}[\s\-]?\d{1,9}$/,
      'Please enter a valid phone number'
    ),
  honeypot: z.string().max(0, 'Bot detected'),
})

export const contactSchema = z.discriminatedUnion('inquiryType', [
  coreSchema.extend({
    inquiryType: z.literal('quote'),
    industry: z.string().min(1, 'Please select your industry'),
    productInterest: z.string().min(2, 'Please describe the product or material'),
    quantity: z.string().optional(),
    application: z.string().optional(),
    requirements: z.string().optional(),
  }),
  coreSchema.extend({
    inquiryType: z.literal('technical'),
    product: z.string().min(2, 'Please specify the product or material'),
    currentMaterial: z.string().optional(),
    problemStatement: z.string().min(30, 'Please provide more detail — minimum 30 characters'),
  }),
  coreSchema.extend({
    inquiryType: z.literal('general'),
    subject: z.string().min(2, 'Please enter a subject'),
    message: z.string().min(20, 'Please provide more detail — minimum 20 characters'),
  }),
  coreSchema.extend({
    inquiryType: z.literal('career'),
    positionInterest: z.string().min(2, 'Please describe the role or area'),
    experience: z.string().min(1, 'Please select your experience level'),
    coverMessage: z.string().min(50, 'Please write a brief cover message — minimum 50 characters'),
  }),
])