'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import InquiryTypeSelector from '@/components/ui/contact/InquiryTypeSelector'
import { Button } from '@/components/ui/Button'
import { contactSchema } from '@/lib/validation/contact-schema'
import { industryOptions, experienceOptions } from '@/lib/contact-data'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import type { InquiryType, ContactSubmission, FormState } from '@/types/contact'

// Map inquiry types to dynamic field sets and submit labels
const typeConfig = {
  quote: { submitLabel: 'Send Enquiry' },
  technical: { submitLabel: 'Submit Technical Request' },
  general: { submitLabel: 'Send Message' },
  career: { submitLabel: 'Submit Application' },
  services: { submitLabel: 'Get Service Info'},
}

export default function ContactForm() {
  const searchParams = useSearchParams()
  const initialInquiry = (searchParams.get('inquiry') as InquiryType) || 'quote'
  const prefillIndustry = searchParams.get('industry') || ''
  const prefillProduct = searchParams.get('product') || ''

  const [inquiryType, setInquiryType] = useState<InquiryType>(initialInquiry)
  const [formState, setFormState] = useState<FormState>('idle')
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSubmission>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: initialInquiry,
      industry: prefillIndustry,
      productInterest: prefillProduct,
    },
  })

  const onSubmit = async (data: ContactSubmission) => {
    setFormState('submitting')
    setSubmitError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, inquiryType }),
      })

      if (!res.ok) throw new Error('Submission failed')

      setFormState('success')
      reset()
    } catch (err) {
      setFormState('error')
      setSubmitError('Unable to submit. Please try again or contact us via WhatsApp.')
    }
  }

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-16 text-center"
      >
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Enquiry Received</h3>
        <p className="text-slate-500 max-w-sm text-[15px] leading-6">
          We will review your requirement and respond within one business day.
        </p>
        <p className="text-[13px] text-slate-400">
          For urgent requirements, WhatsApp us directly.
        </p>
        <a
          href={buildWhatsAppURL()}
          className="text-[14px] font-medium text-blue-600"
        >
          Open WhatsApp →
        </a>
      </motion.div>
    )
  }

  return (
    <div id="contact-form">
      <InquiryTypeSelector value={inquiryType} onChange={setInquiryType} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10" noValidate>
        {/* Core fields (always visible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div>
            <label htmlFor="name" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Name *</label>
            <input {...register('name')} id="name" className="input-field" placeholder="Your full name" />
            {errors.name && <p className="text-[12px] text-red-600 mt-1" role="alert">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="company" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Company *</label>
            <input {...register('company')} id="company" className="input-field" placeholder="Your company name" />
            {errors.company && <p className="text-[12px] text-red-600 mt-1" role="alert">{errors.company.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Email *</label>
            <input {...register('email')} id="email" type="email" className="input-field" placeholder="you@company.com" />
            {errors.email && <p className="text-[12px] text-red-600 mt-1" role="alert">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Phone *</label>
            <input {...register('phone')} id="phone" type="tel" className="input-field" placeholder="+91 98765 43210" />
            {errors.phone && <p className="text-[12px] text-red-600 mt-1" role="alert">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Dynamic fields based on inquiry type */}
        <div className="mt-8" key={inquiryType}>
         {inquiryType === 'quote' && (
  <div>
    <label htmlFor="industry" className="text-[12px] font-medium text-gray-700">
      Industry <span className="text-red-500">*</span>
    </label>
    <select
      id="industry"
      {...register('industry')}
      className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    >
      <option value="">Select your industry</option>
      {industryOptions.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {(errors as any).industry && (
      <p className="text-[12px] text-red-600 mt-1" role="alert">
        {(errors as any).industry.message}
      </p>
    )}
  </div>
)}

          {inquiryType === 'technical' && (
            <div className="space-y-8">
              <div>
                <label htmlFor="product" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Product / Material *</label>
                <input {...register('product')} id="product" className="input-field" placeholder="Which product or material?" />
                {(errors as any).product && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).product.message}</p>}
              </div>
              <div>
                <label htmlFor="currentMaterial" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Current Material (optional)</label>
                <input {...register('currentMaterial')} id="currentMaterial" className="input-field" placeholder="What are you currently using?" />
              </div>
              <div>
                <label htmlFor="problemStatement" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Problem / Requirement *</label>
                <textarea {...register('problemStatement')} id="problemStatement" rows={5} className="input-field" placeholder="Describe your technical requirement or challenge..." />
                {(errors as any).problemStatement && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).problemStatement.message}</p>}
              </div>
            </div>
          )}

          {inquiryType === 'general' && (
            <div className="space-y-8">
              <div>
                <label htmlFor="subject" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Subject *</label>
                <input {...register('subject')} id="subject" className="input-field" placeholder="What is this about?" />
                {(errors as any).subject && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).subject.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Message *</label>
                <textarea {...register('message')} id="message" rows={5} className="input-field" placeholder="Your message..." />
                {(errors as any).message && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).message.message}</p>}
              </div>
            </div>
          )}

          {inquiryType === 'career' && (
            <div className="space-y-8">
              <div>
                <label htmlFor="positionInterest" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Position of Interest *</label>
                <input {...register('positionInterest')} id="positionInterest" className="input-field" placeholder="Role or area you are interested in" />
                {(errors as any).positionInterest && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).positionInterest.message}</p>}
              </div>
              <div>
                <label htmlFor="experience" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Years of Experience *</label>
                <select {...register('experience')} id="experience" className="input-field appearance-none bg-transparent">
                  <option value="">Select experience</option>
                  {experienceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {(errors as any).experience && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).experience.message}</p>}
              </div>
              <div>
                <label htmlFor="coverMessage" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Cover Message *</label>
                <textarea {...register('coverMessage')} id="coverMessage" rows={5} className="input-field" placeholder="Tell us about your background and interests..." />
                {(errors as any).coverMessage && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).coverMessage.message}</p>}
              </div>
              <div className="border border-dashed border-slate-300 bg-slate-50 rounded-lg p-6 text-center">
                <span className="text-slate-400 text-sm">📎</span>
                <p className="text-[13px] text-slate-400 mt-2">
                  Please email your CV to: ⚠ client validation required
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Honeypot (hidden) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="honeypot">Leave empty</label>
          <input {...register('honeypot')} id="honeypot" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Submit error */}
        {submitError && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-[14px] text-red-700 mt-4" role="alert">
            {submitError}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="mt-8 w-full h-[52px] font-semibold"
          disabled={formState === 'submitting'}
        >
          {formState === 'submitting' ? (
            <span className="flex items-center gap-2">
              <span className="border-2 border-white border-t-transparent w-4 h-4 rounded-full animate-spin"></span>
              Sending...
            </span>
          ) : (
            typeConfig[inquiryType].submitLabel
          )}
        </Button>
        <p className="text-[12px] text-slate-400 text-center mt-4">
          Your information is used only to respond to your enquiry. We do not share it with third parties.
        </p>
      </form>
    </div>
  )
}