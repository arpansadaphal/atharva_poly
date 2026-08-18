// // 'use client'

// // import { useState } from 'react'
// // import { useForm } from 'react-hook-form'
// // import { zodResolver } from '@hookform/resolvers/zod'
// // import { motion } from 'framer-motion'
// // import { useSearchParams } from 'next/navigation'
// // import { CheckCircle2 } from 'lucide-react'
// // import InquiryTypeSelector from '@/components/ui/contact/InquiryTypeSelector'
// // import { Button } from '@/components/ui/Button'
// // import { contactSchema } from '@/lib/validation/contact-schema'
// // import { industryOptions, experienceOptions } from '@/lib/contact-data'
// // import { buildWhatsAppURL } from '@/lib/whatsapp'
// // import type { InquiryType, ContactSubmission, FormState } from '@/types/contact'

// // // Map inquiry types to dynamic field sets and submit labels
// // const typeConfig = {
// //   quote: { submitLabel: 'Send Enquiry' },
// //   technical: { submitLabel: 'Submit Technical Request' },
// //   general: { submitLabel: 'Send Message' },
// //   career: { submitLabel: 'Submit Application' },
// //   services: { submitLabel: 'Get Service Info'},
// // }

// // export default function ContactForm() {
// //   const searchParams = useSearchParams()
// //   const initialInquiry = (searchParams.get('inquiry') as InquiryType) || 'quote'
// //   const prefillIndustry = searchParams.get('industry') || ''
// //   const prefillProduct = searchParams.get('product') || ''

// //   const [inquiryType, setInquiryType] = useState<InquiryType>(initialInquiry)
// //   const [formState, setFormState] = useState<FormState>('idle')
// //   const [submitError, setSubmitError] = useState('')

// //   const {
// //     register,
// //     handleSubmit,
// //     reset,
// //     formState: { errors },
// //   } = useForm<ContactSubmission>({
// //     resolver: zodResolver(contactSchema),
// //     defaultValues: {
// //       inquiryType: initialInquiry,
// //       industry: prefillIndustry,
// //       productInterest: prefillProduct,
// //     },
// //   })

// //   const onSubmit = async (data: ContactSubmission) => {
// //     setFormState('submitting')
// //     setSubmitError('')

// //     try {
// //       const res = await fetch('/api/contact', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ ...data, inquiryType }),
// //       })

// //       if (!res.ok) throw new Error('Submission failed')

// //       setFormState('success')
// //       reset()
// //     } catch (err) {
// //       setFormState('error')
// //       setSubmitError('Unable to submit. Please try again or contact us via WhatsApp.')
// //     }
// //   }

// //   if (formState === 'success') {
// //     return (
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.96 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         className="flex flex-col items-center gap-4 py-16 text-center"
// //       >
// //         <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
// //           <CheckCircle2 className="w-7 h-7 text-blue-600" />
// //         </div>
// //         <h3 className="text-xl font-semibold text-slate-900">Enquiry Received</h3>
// //         <p className="text-slate-500 max-w-sm text-[15px] leading-6">
// //           We will review your requirement and respond within one business day.
// //         </p>
// //         <p className="text-[13px] text-slate-400">
// //           For urgent requirements, WhatsApp us directly.
// //         </p>
// //         <a
// //           href={buildWhatsAppURL()}
// //           className="text-[14px] font-medium text-blue-600"
// //         >
// //           Open WhatsApp →
// //         </a>
// //       </motion.div>
// //     )
// //   }

// //   return (
// //     <div id="contact-form">
// //       <InquiryTypeSelector value={inquiryType} onChange={setInquiryType} />

// //       <form onSubmit={handleSubmit(onSubmit)} className="mt-10" noValidate>
// //         {/* Core fields (always visible) */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
// //           <div>
// //             <label htmlFor="name" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Name *</label>
// //             <input {...register('name')} id="name" className="input-field" placeholder="Your full name" />
// //             {errors.name && <p className="text-[12px] text-red-600 mt-1" role="alert">{errors.name.message}</p>}
// //           </div>
// //           <div>
// //             <label htmlFor="company" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Company *</label>
// //             <input {...register('company')} id="company" className="input-field" placeholder="Your company name" />
// //             {errors.company && <p className="text-[12px] text-red-600 mt-1" role="alert">{errors.company.message}</p>}
// //           </div>
// //           <div>
// //             <label htmlFor="email" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Email *</label>
// //             <input {...register('email')} id="email" type="email" className="input-field" placeholder="you@company.com" />
// //             {errors.email && <p className="text-[12px] text-red-600 mt-1" role="alert">{errors.email.message}</p>}
// //           </div>
// //           <div>
// //             <label htmlFor="phone" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Phone *</label>
// //             <input {...register('phone')} id="phone" type="tel" className="input-field" placeholder="+91 98765 43210" />
// //             {errors.phone && <p className="text-[12px] text-red-600 mt-1" role="alert">{errors.phone.message}</p>}
// //           </div>
// //         </div>

// //         {/* Dynamic fields based on inquiry type */}
// //         <div className="mt-8" key={inquiryType}>
// //          {inquiryType === 'quote' && (
// //   <div>
// //     <label htmlFor="industry" className="text-[12px] font-medium text-gray-700">
// //       Industry <span className="text-red-500">*</span>
// //     </label>
// //     <select
// //       id="industry"
// //       {...register('industry')}
// //       className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
// //     >
// //       <option value="">Select your industry</option>
// //       {industryOptions.map((o) => (
// //         <option key={o.value} value={o.value}>
// //           {o.label}
// //         </option>
// //       ))}
// //     </select>
// //     {(errors as any).industry && (
// //       <p className="text-[12px] text-red-600 mt-1" role="alert">
// //         {(errors as any).industry.message}
// //       </p>
// //     )}
// //   </div>
// // )}

// //           {inquiryType === 'technical' && (
// //             <div className="space-y-8">
// //               <div>
// //                 <label htmlFor="product" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Product / Material *</label>
// //                 <input {...register('product')} id="product" className="input-field" placeholder="Which product or material?" />
// //                 {(errors as any).product && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).product.message}</p>}
// //               </div>
// //               <div>
// //                 <label htmlFor="currentMaterial" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Current Material (optional)</label>
// //                 <input {...register('currentMaterial')} id="currentMaterial" className="input-field" placeholder="What are you currently using?" />
// //               </div>
// //               <div>
// //                 <label htmlFor="problemStatement" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Problem / Requirement *</label>
// //                 <textarea {...register('problemStatement')} id="problemStatement" rows={5} className="input-field" placeholder="Describe your technical requirement or challenge..." />
// //                 {(errors as any).problemStatement && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).problemStatement.message}</p>}
// //               </div>
// //             </div>
// //           )}

// //           {inquiryType === 'general' && (
// //             <div className="space-y-8">
// //               <div>
// //                 <label htmlFor="subject" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Subject *</label>
// //                 <input {...register('subject')} id="subject" className="input-field" placeholder="What is this about?" />
// //                 {(errors as any).subject && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).subject.message}</p>}
// //               </div>
// //               <div>
// //                 <label htmlFor="message" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Message *</label>
// //                 <textarea {...register('message')} id="message" rows={5} className="input-field" placeholder="Your message..." />
// //                 {(errors as any).message && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).message.message}</p>}
// //               </div>
// //             </div>
// //           )}

// //           {inquiryType === 'career' && (
// //             <div className="space-y-8">
// //               <div>
// //                 <label htmlFor="positionInterest" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Position of Interest *</label>
// //                 <input {...register('positionInterest')} id="positionInterest" className="input-field" placeholder="Role or area you are interested in" />
// //                 {(errors as any).positionInterest && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).positionInterest.message}</p>}
// //               </div>
// //               <div>
// //                 <label htmlFor="experience" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Years of Experience *</label>
// //                 <select {...register('experience')} id="experience" className="input-field appearance-none bg-transparent">
// //                   <option value="">Select experience</option>
// //                   {experienceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
// //                 </select>
// //                 {(errors as any).experience && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).experience.message}</p>}
// //               </div>
// //               <div>
// //                 <label htmlFor="coverMessage" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Cover Message *</label>
// //                 <textarea {...register('coverMessage')} id="coverMessage" rows={5} className="input-field" placeholder="Tell us about your background and interests..." />
// //                 {(errors as any).coverMessage && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).coverMessage.message}</p>}
// //               </div>
// //               <div className="border border-dashed border-slate-300 bg-slate-50 rounded-lg p-6 text-center">
// //                 <span className="text-slate-400 text-sm">📎</span>
// //                 <p className="text-[13px] text-slate-400 mt-2">
// //                   Please email your CV to: ⚠ client validation required
// //                 </p>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Honeypot (hidden) */}
// //         <div style={{ display: 'none' }} aria-hidden="true">
// //           <label htmlFor="honeypot">Leave empty</label>
// //           <input {...register('honeypot')} id="honeypot" tabIndex={-1} autoComplete="off" />
// //         </div>

// //         {/* Submit error */}
// //         {submitError && (
// //           <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-[14px] text-red-700 mt-4" role="alert">
// //             {submitError}
// //           </div>
// //         )}

// //         <Button
// //           type="submit"
// //           variant="primary"
// //           size="lg"
// //           className="mt-8 w-full h-[52px] font-semibold"
// //           disabled={formState === 'submitting'}
// //         >
// //           {formState === 'submitting' ? (
// //             <span className="flex items-center gap-2">
// //               <span className="border-2 border-white border-t-transparent w-4 h-4 rounded-full animate-spin"></span>
// //               Sending...
// //             </span>
// //           ) : (
// //             typeConfig[inquiryType].submitLabel
// //           )}
// //         </Button>
// //         <p className="text-[12px] text-slate-400 text-center mt-4">
// //           Your information is used only to respond to your enquiry. We do not share it with third parties.
// //         </p>
// //       </form>
// //     </div>
// //   )
// // }


// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { motion } from 'framer-motion'
// import { useSearchParams } from 'next/navigation'
// import { CheckCircle2, ChevronDown } from 'lucide-react'
// import InquiryTypeSelector from '@/components/ui/contact/InquiryTypeSelector'
// import { Button } from '@/components/ui/Button'
// import { contactSchema } from '@/lib/validation/contact-schema'
// import { industryOptions, experienceOptions } from '@/lib/contact-data'
// import { buildWhatsAppURL } from '@/lib/whatsapp'
// import type {
//   InquiryType,
//   ContactSubmission,
//   FormState,
//   ContactApiSuccessResponse,
//   ContactApiErrorResponse,
// } from '@/types/contact'

// const typeConfig: Record<InquiryType, { submitLabel: string }> = {
//   quote: { submitLabel: 'Send Enquiry' },
//   technical: { submitLabel: 'Submit Technical Request' },
//   general: { submitLabel: 'Send Message' },
//   career: { submitLabel: 'Submit Application' },
// }

// /** crypto.randomUUID() is available in every browser this site targets, but
//  *  falls back gracefully rather than throwing in an unexpected environment. */
// function generateClientId(): string {
//   if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
//   return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`
// }

// export default function ContactForm() {
//   const searchParams = useSearchParams()
//   const initialInquiry = (searchParams.get('inquiry') as InquiryType) || 'quote'
//   const prefillIndustry = searchParams.get('industry') || ''
//   const prefillProduct = searchParams.get('product') || ''

//   const [inquiryType, setInquiryType] = useState<InquiryType>(initialInquiry)
//   const [formState, setFormState] = useState<FormState>('idle')
//   const [submitError, setSubmitError] = useState('')
//   const [referenceId, setReferenceId] = useState('')

//   // Generated once per page load. Sent with every submit attempt so the
//   // server can recognise a retry (network blip, double click) as the same
//   // attempt rather than a second enquiry. Not rendered into the DOM, so
//   // there's no server/client hydration mismatch to worry about.
//   const idempotencyKeyRef = useRef<string>(generateClientId())
//   // Captured on mount — the server uses "submitted implausibly soon after
//   // this" as one signal (alongside the honeypot field) that a submission is
//   // automated rather than human.
//   const formStartedAtRef = useRef<number>(Date.now())
//   // Belt-and-braces guard against a double-click firing two submits before
//   // the button's `disabled` state has re-rendered.
//   const isSubmittingRef = useRef(false)

//   const successHeadingRef = useRef<HTMLHeadingElement>(null)

//   useEffect(() => {
//     if (formState === 'success') successHeadingRef.current?.focus()
//   }, [formState])

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setError,
//     setValue,
//     clearErrors,
//     formState: { errors },
//   } = useForm<ContactSubmission>({
//     resolver: zodResolver(contactSchema),
//     defaultValues: {
//       inquiryType: initialInquiry,
//       industry: prefillIndustry,
//       productInterest: prefillProduct,
//     },
//   })

//   // react-hook-form only knows about `inquiryType` through `defaultValues` —
//   // nothing else ever told it the value changed, so the zod discriminated
//   // union kept validating against whichever type was in the URL on first
//   // load. Selecting a different tab and submitting silently validated the
//   // wrong schema variant and could never succeed. Keeping RHF's copy in
//   // sync with the tab selection fixes that.
//   const handleInquiryTypeChange = (type: InquiryType) => {
//     setInquiryType(type)
//     // RHF's typing for `setValue` doesn't infer cleanly across a zod
//     // discriminated union's discriminant field — same friction the
//     // `(errors as any)` casts below work around.
//     ;(setValue as any)('inquiryType', type)
//     clearErrors()
//   }

//   const onSubmit = async (data: ContactSubmission) => {
//     if (isSubmittingRef.current) return
//     isSubmittingRef.current = true
//     setFormState('submitting')
//     setSubmitError('')

//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...data,
//           inquiryType,
//           idempotencyKey: idempotencyKeyRef.current,
//           formStartedAt: formStartedAtRef.current,
//         }),
//       })

//       const body = (await res.json()) as ContactApiSuccessResponse | ContactApiErrorResponse

//       if (!res.ok || !body.success) {
//         const err = body as ContactApiErrorResponse

//         // Server-side validation caught something the client missed (e.g. JS
//         // validation was bypassed) — surface it on the actual fields rather
//         // than as a generic banner.
//         if (err.error === 'VALIDATION_FAILED' && err.fieldErrors) {
//           for (const [field, messages] of Object.entries(err.fieldErrors)) {
//             if (field === '_form') continue
//             setError(field as keyof ContactSubmission, { type: 'server', message: messages[0] })
//           }
//           setSubmitError('Please check the highlighted fields and try again.')
//           setFormState('error')
//           return
//         }

//         if (res.status === 429) {
//           setSubmitError(err.message)
//           setFormState('rate-limited')
//           return
//         }

//         setSubmitError(err.message || 'Unable to submit. Please try again or contact us via WhatsApp.')
//         setFormState('error')
//         return
//       }

//       setReferenceId(body.referenceId)
//       setFormState('success')
//       reset()
//       // A fresh key for any subsequent submission in the same session (e.g.
//       // the visitor submits a second, different enquiry later).
//       idempotencyKeyRef.current = generateClientId()
//       formStartedAtRef.current = Date.now()
//     } catch {
//       setSubmitError('Unable to reach the server. Please check your connection and try again, or contact us via WhatsApp.')
//       setFormState('error')
//     } finally {
//       isSubmittingRef.current = false
//     }
//   }

//   if (formState === 'success') {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.96 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="flex flex-col items-center gap-4 py-16 text-center"
//       >
//         <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
//           <CheckCircle2 className="w-7 h-7 text-blue-600" />
//         </div>
//         <h3
//           ref={successHeadingRef}
//           tabIndex={-1}
//           className="text-xl font-semibold text-slate-900 focus:outline-none"
//         >
//           Enquiry Received
//         </h3>
//         <p className="text-slate-500 max-w-sm text-[15px] leading-6">
//           We will review your requirement and respond within one business day.
//         </p>
//         {referenceId && (
//           <p className="text-[13px] text-slate-500">
//             Reference number: <span className="font-semibold text-slate-700">{referenceId}</span>
//           </p>
//         )}
//         <p className="text-[13px] text-slate-400">
//           For urgent requirements, WhatsApp us directly.
//         </p>
//         <a href={buildWhatsAppURL()} className="text-[14px] font-medium text-blue-600">
//           Open WhatsApp →
//         </a>
//       </motion.div>
//     )
//   }

//   const isSubmitting = formState === 'submitting'

//   return (
//     <div id="contact-form">
//       <InquiryTypeSelector value={inquiryType} onChange={handleInquiryTypeChange} />

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="mt-10"
//         noValidate
//         aria-busy={isSubmitting}
//       >
//         {/* Core fields (always visible) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
//           <div>
//             <label htmlFor="name" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//               Name *
//             </label>
//             <input
//               {...register('name')}
//               id="name"
//               className="input-field"
//               placeholder="Your full name"
//               aria-required="true"
//               aria-invalid={!!errors.name}
//               aria-describedby={errors.name ? 'name-error' : undefined}
//             />
//             {errors.name && (
//               <p id="name-error" className="text-[12px] text-red-600 mt-1" role="alert">
//                 {errors.name.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="company" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//               Company *
//             </label>
//             <input
//               {...register('company')}
//               id="company"
//               className="input-field"
//               placeholder="Your company name"
//               aria-required="true"
//               aria-invalid={!!errors.company}
//               aria-describedby={errors.company ? 'company-error' : undefined}
//             />
//             {errors.company && (
//               <p id="company-error" className="text-[12px] text-red-600 mt-1" role="alert">
//                 {errors.company.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="email" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//               Email *
//             </label>
//             <input
//               {...register('email')}
//               id="email"
//               type="email"
//               className="input-field"
//               placeholder="you@company.com"
//               aria-required="true"
//               aria-invalid={!!errors.email}
//               aria-describedby={errors.email ? 'email-error' : undefined}
//             />
//             {errors.email && (
//               <p id="email-error" className="text-[12px] text-red-600 mt-1" role="alert">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="phone" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//               Phone *
//             </label>
//             <input
//               {...register('phone')}
//               id="phone"
//               type="tel"
//               className="input-field"
//               placeholder="+91 98765 43210"
//               aria-required="true"
//               aria-invalid={!!errors.phone}
//               aria-describedby={errors.phone ? 'phone-error' : undefined}
//             />
//             {errors.phone && (
//               <p id="phone-error" className="text-[12px] text-red-600 mt-1" role="alert">
//                 {errors.phone.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Dynamic fields based on inquiry type */}
//         <div className="mt-8" key={inquiryType}>
//           {inquiryType === 'quote' && (
//             <div className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
//                 <div className="relative">
//                   <label htmlFor="industry" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//                     Industry *
//                   </label>
//                   <select
//                     id="industry"
//                     {...register('industry')}
//                     defaultValue={prefillIndustry}
//                     className="input-field appearance-none bg-transparent pr-6"
//                     aria-required="true"
//                     aria-invalid={!!(errors as Record<string, unknown>).industry}
//                   >
//                     <option value="">Select your industry</option>
//                     {industryOptions.map((o) => (
//                       <option key={o.value} value={o.value}>
//                         {o.label}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 bottom-3 pointer-events-none" aria-hidden="true" />
//                   {(errors as any).industry && (
//                     <p className="text-[12px] text-red-600 mt-1" role="alert">
//                       {(errors as any).industry.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="productInterest" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//                     Product Interest *
//                   </label>
//                   <input
//                     {...register('productInterest')}
//                     id="productInterest"
//                     className="input-field"
//                     placeholder="Which material or product are you enquiring about?"
//                     aria-required="true"
//                     aria-invalid={!!(errors as any).productInterest}
//                   />
//                   {(errors as any).productInterest && (
//                     <p className="text-[12px] text-red-600 mt-1" role="alert">
//                       {(errors as any).productInterest.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
//                 <div>
//                   <label htmlFor="quantity" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//                     Quantity (optional)
//                   </label>
//                   <input
//                     {...register('quantity')}
//                     id="quantity"
//                     className="input-field"
//                     placeholder="Approximate quantity (e.g. 500 kg/month)"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="application" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//                     Application (optional)
//                   </label>
//                   <input
//                     {...register('application')}
//                     id="application"
//                     className="input-field"
//                     placeholder="What will the material be used for?"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="requirements" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
//                   Technical Requirements (optional)
//                 </label>
//                 <textarea
//                   {...register('requirements')}
//                   id="requirements"
//                   rows={4}
//                   className="input-field"
//                   placeholder="Any specifications, tolerances, or certifications this material needs to meet"
//                 />
//               </div>
//             </div>
//           )}

//           {inquiryType === 'technical' && (
//             <div className="space-y-8">
//               <div>
//                 <label htmlFor="product" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Product / Material *</label>
//                 <input {...register('product')} id="product" className="input-field" placeholder="Which product or material?" aria-required="true" />
//                 {(errors as any).product && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).product.message}</p>}
//               </div>
//               <div>
//                 <label htmlFor="currentMaterial" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Current Material (optional)</label>
//                 <input {...register('currentMaterial')} id="currentMaterial" className="input-field" placeholder="What are you currently using?" />
//               </div>
//               <div>
//                 <label htmlFor="problemStatement" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Problem / Requirement *</label>
//                 <textarea {...register('problemStatement')} id="problemStatement" rows={5} className="input-field" placeholder="Describe your technical requirement or challenge..." aria-required="true" />
//                 {(errors as any).problemStatement && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).problemStatement.message}</p>}
//               </div>
//             </div>
//           )}

//           {inquiryType === 'general' && (
//             <div className="space-y-8">
//               <div>
//                 <label htmlFor="subject" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Subject *</label>
//                 <input {...register('subject')} id="subject" className="input-field" placeholder="What is this about?" aria-required="true" />
//                 {(errors as any).subject && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).subject.message}</p>}
//               </div>
//               <div>
//                 <label htmlFor="message" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Message *</label>
//                 <textarea {...register('message')} id="message" rows={5} className="input-field" placeholder="Your message..." aria-required="true" />
//                 {(errors as any).message && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).message.message}</p>}
//               </div>
//             </div>
//           )}

//           {inquiryType === 'career' && (
//             <div className="space-y-8">
//               <div>
//                 <label htmlFor="positionInterest" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Position of Interest *</label>
//                 <input {...register('positionInterest')} id="positionInterest" className="input-field" placeholder="Role or area you are interested in" aria-required="true" />
//                 {(errors as any).positionInterest && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).positionInterest.message}</p>}
//               </div>
//               <div className="relative">
//                 <label htmlFor="experience" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Years of Experience *</label>
//                 <select {...register('experience')} id="experience" className="input-field appearance-none bg-transparent pr-6" aria-required="true">
//                   <option value="">Select experience</option>
//                   {experienceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
//                 </select>
//                 <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 bottom-3 pointer-events-none" aria-hidden="true" />
//                 {(errors as any).experience && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).experience.message}</p>}
//               </div>
//               <div>
//                 <label htmlFor="coverMessage" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Cover Message *</label>
//                 <textarea {...register('coverMessage')} id="coverMessage" rows={5} className="input-field" placeholder="Tell us about your background and interests..." aria-required="true" />
//                 {(errors as any).coverMessage && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).coverMessage.message}</p>}
//               </div>
//               <div className="border border-dashed border-slate-300 bg-slate-50 rounded-lg p-6 text-center">
//                 <span className="text-slate-400 text-sm">📎</span>
//                 <p className="text-[13px] text-slate-400 mt-2">
//                   CV upload isn&apos;t available yet — please email your CV to our careers team once you hear back from us.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Honeypot (hidden from sighted users and screen readers, never filled by a human) */}
//         <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
//           <label htmlFor="honeypot">Leave this field empty</label>
//           <input {...register('honeypot')} id="honeypot" tabIndex={-1} autoComplete="off" />
//         </div>

//         {/* Submit error */}
//         {submitError && (
//           <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-[14px] text-red-700 mt-4" role="alert">
//             {submitError}
//             {formState === 'rate-limited' && (
//               <>
//                 {' '}
//                 <a href={buildWhatsAppURL()} className="font-medium underline">
//                   Chat on WhatsApp instead →
//                 </a>
//               </>
//             )}
//           </div>
//         )}

//         <Button
//           type="submit"
//           variant="primary"
//           size="lg"
//           className="mt-8 w-full h-[52px] font-semibold"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <span className="flex items-center gap-2">
//               <span className="border-2 border-white border-t-transparent w-4 h-4 rounded-full animate-spin" />
//               Sending...
//             </span>
//           ) : (
//             typeConfig[inquiryType].submitLabel
//           )}
//         </Button>
//         <p className="text-[12px] text-slate-400 text-center mt-4">
//           Your information is used only to respond to your enquiry. We do not share it with third parties.
//         </p>
//       </form>
//     </div>
//   )
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ChevronDown } from 'lucide-react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import InquiryTypeSelector from '@/components/ui/contact/InquiryTypeSelector'
import { Button } from '@/components/ui/Button'
import { contactSchema } from '@/lib/validation/contact-schema'
import { industryOptions, experienceOptions } from '@/lib/contact-data'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import type {
  InquiryType,
  ContactSubmission,
  FormState,
  ContactApiSuccessResponse,
  ContactApiErrorResponse,
} from '@/types/contact'

const typeConfig: Record<InquiryType, { submitLabel: string }> = {
  quote: { submitLabel: 'Send Enquiry' },
  technical: { submitLabel: 'Submit Technical Request' },
  general: { submitLabel: 'Send Message' },
  career: { submitLabel: 'Submit Application' },
}

/** crypto.randomUUID() is available in every browser this site targets, but
 *  falls back gracefully rather than throwing in an unexpected environment. */
function generateClientId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function ContactForm() {
  const searchParams = useSearchParams()
  const initialInquiry = (searchParams.get('inquiry') as InquiryType) || 'quote'
  const prefillIndustry = searchParams.get('industry') || ''
  const prefillProduct = searchParams.get('product') || ''

  const [inquiryType, setInquiryType] = useState<InquiryType>(initialInquiry)
  const [formState, setFormState] = useState<FormState>('idle')
  const [submitError, setSubmitError] = useState('')
  const [referenceId, setReferenceId] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  // Generated once per page load. Sent with every submit attempt so the
  // server can recognise a retry (network blip, double click) as the same
  // attempt rather than a second enquiry.
  const idempotencyKeyRef = useRef<string>(generateClientId())
  // Captured on mount — the server uses "submitted implausibly soon after
  // this" as one signal (alongside the honeypot field) that a submission is
  // automated rather than human.
  const formStartedAtRef = useRef<number>(Date.now())
  // Belt-and-braces guard against a double-click firing two submits before
  // the button's `disabled` state has re-rendered.
  const isSubmittingRef = useRef(false)

  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (formState === 'success') successHeadingRef.current?.focus()
  }, [formState])

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<ContactSubmission>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: initialInquiry,
      industry: prefillIndustry,
      productInterest: prefillProduct,
      hearAboutUs: '', // <-- NEW required core field
    },
  })

  // react-hook-form only knows about `inquiryType` through `defaultValues` —
  // nothing else ever told it the value changed, so the zod discriminated
  // union kept validating against whichever type was in the URL on first
  // load. Selecting a different tab and submitting silently validated the
  // wrong schema variant and could never succeed. Keeping RHF's copy in
  // sync with the tab selection fixes that.
  const handleInquiryTypeChange = (type: InquiryType) => {
    setInquiryType(type)
    ;(setValue as any)('inquiryType', type)
    clearErrors()
  }

  const onSubmit = async (data: ContactSubmission) => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    setFormState('submitting')
    setSubmitError('')

    try {
      let res: Response
      const basePayload = {
        ...data,
        inquiryType,
        idempotencyKey: idempotencyKeyRef.current,
        formStartedAt: formStartedAtRef.current,
      }

      if (inquiryType === 'career' && resumeFile) {
        // Send as FormData when a resume file is attached
        const formData = new FormData()
        Object.entries(basePayload).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
        formData.append('resume', resumeFile)
        res = await fetch('/api/contact', {
          method: 'POST',
          body: formData, // Do not set Content-Type manually; browser sets it with boundary
        })
      } else {
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(basePayload),
        })
      }

      const body = (await res.json()) as ContactApiSuccessResponse | ContactApiErrorResponse

      if (!res.ok || !body.success) {
        const err = body as ContactApiErrorResponse

        // Server-side validation caught something the client missed (e.g. JS
        // validation was bypassed) — surface it on the actual fields rather
        // than as a generic banner.
        if (err.error === 'VALIDATION_FAILED' && err.fieldErrors) {
          for (const [field, messages] of Object.entries(err.fieldErrors)) {
            if (field === '_form') continue
            setError(field as keyof ContactSubmission, { type: 'server', message: messages[0] })
          }
          setSubmitError('Please check the highlighted fields and try again.')
          setFormState('error')
          return
        }

        if (res.status === 429) {
          setSubmitError(err.message)
          setFormState('rate-limited')
          return
        }

        setSubmitError(err.message || 'Unable to submit. Please try again or contact us via WhatsApp.')
        setFormState('error')
        return
      }

      setReferenceId(body.referenceId)
      setFormState('success')
      reset()
      // A fresh key for any subsequent submission in the same session.
      idempotencyKeyRef.current = generateClientId()
      formStartedAtRef.current = Date.now()
    } catch {
      setSubmitError('Unable to reach the server. Please check your connection and try again, or contact us via WhatsApp.')
      setFormState('error')
    } finally {
      isSubmittingRef.current = false
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
        <h3
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-xl font-semibold text-slate-900 focus:outline-none"
        >
          Enquiry Received
        </h3>
        <p className="text-slate-500 max-w-sm text-[15px] leading-6">
          We will review your requirement and respond within one business day.
        </p>
        {referenceId && (
          <p className="text-[13px] text-slate-500">
            Reference number: <span className="font-semibold text-slate-700">{referenceId}</span>
          </p>
        )}
        <p className="text-[13px] text-slate-400">
          For urgent requirements, WhatsApp us directly.
        </p>
        <a href={buildWhatsAppURL()} className="text-[14px] font-medium text-blue-600">
          Open WhatsApp →
        </a>
      </motion.div>
    )
  }

  const isSubmitting = formState === 'submitting'

  return (
    <div id="contact-form">
      <InquiryTypeSelector value={inquiryType} onChange={handleInquiryTypeChange} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10"
        noValidate
        aria-busy={isSubmitting}
      >
        {/* Core fields (always visible) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
          <div>
            <label htmlFor="name" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
              Name *
            </label>
            <input
              {...register('name')}
              id="name"
              className="input-field"
              placeholder="Your full name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-[12px] text-red-600 mt-1" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="company" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
              Company *
            </label>
            <input
              {...register('company')}
              id="company"
              className="input-field"
              placeholder="Your company name"
              aria-required="true"
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? 'company-error' : undefined}
            />
            {errors.company && (
              <p id="company-error" className="text-[12px] text-red-600 mt-1" role="alert">
                {errors.company.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
              Email *
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className="input-field"
              placeholder="you@company.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-[12px] text-red-600 mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
              Phone *
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  international
                  withCountryCallingCode
                  defaultCountry="IN"
                  placeholder="+91 98765 43210"
                  value={field.value}
                  onChange={field.onChange}
                  className="input-field"
                />
              )}
            />
            {errors.phone && (
              <p id="phone-error" className="text-[12px] text-red-600 mt-1" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* How did you hear about us? */}
        <div className="mt-8">
          <label htmlFor="hearAboutUs" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
            How did you hear about us? *
          </label>
          <select
            {...register('hearAboutUs')}
            id="hearAboutUs"
            defaultValue=""
            className="input-field appearance-none bg-transparent pr-6"
            aria-required="true"
            aria-invalid={!!(errors as any).hearAboutUs}
          >
            <option value="" disabled>Select an option</option>
            <option value="search">Search engine</option>
            <option value="referral">Referral</option>
            <option value="social">Social media</option>
            <option value="existing">Existing customer</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 bottom-3 pointer-events-none" aria-hidden="true" />
          {(errors as any).hearAboutUs && (
            <p className="text-[12px] text-red-600 mt-1" role="alert">
              {(errors as any).hearAboutUs.message}
            </p>
          )}
        </div>

        {/* Dynamic fields based on inquiry type */}
        <div className="mt-8" key={inquiryType}>
          {inquiryType === 'quote' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <div className="relative">
                  <label htmlFor="industry" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
                    Industry *
                  </label>
                  <select
                    id="industry"
                    {...register('industry')}
                    defaultValue={prefillIndustry}
                    className="input-field appearance-none bg-transparent pr-6"
                    aria-required="true"
                    aria-invalid={!!(errors as Record<string, unknown>).industry}
                  >
                    <option value="">Select your industry</option>
                    {industryOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 bottom-3 pointer-events-none" aria-hidden="true" />
                  {(errors as any).industry && (
                    <p className="text-[12px] text-red-600 mt-1" role="alert">
                      {(errors as any).industry.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="productInterest" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
                    Product Interest *
                  </label>
                  <input
                    {...register('productInterest')}
                    id="productInterest"
                    className="input-field"
                    placeholder="Which material or product are you enquiring about?"
                    aria-required="true"
                    aria-invalid={!!(errors as any).productInterest}
                  />
                  {(errors as any).productInterest && (
                    <p className="text-[12px] text-red-600 mt-1" role="alert">
                      {(errors as any).productInterest.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <div>
                  <label htmlFor="quantity" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
                    Quantity (optional)
                  </label>
                  <input
                    {...register('quantity')}
                    id="quantity"
                    className="input-field"
                    placeholder="Approximate quantity (e.g. 500 kg/month)"
                  />
                </div>
                <div>
                  <label htmlFor="application" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
                    Application (optional)
                  </label>
                  <input
                    {...register('application')}
                    id="application"
                    className="input-field"
                    placeholder="What will the material be used for?"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="requirements" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
                  Technical Requirements (optional)
                </label>
                <textarea
                  {...register('requirements')}
                  id="requirements"
                  rows={4}
                  className="input-field"
                  placeholder="Any specifications, tolerances, or certifications this material needs to meet"
                />
              </div>
            </div>
          )}

          {inquiryType === 'technical' && (
            <div className="space-y-8">
              <div>
                <label htmlFor="product" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Product / Material *</label>
                <input {...register('product')} id="product" className="input-field" placeholder="Which product or material?" aria-required="true" />
                {(errors as any).product && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).product.message}</p>}
              </div>
              <div>
                <label htmlFor="currentMaterial" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Current Material (optional)</label>
                <input {...register('currentMaterial')} id="currentMaterial" className="input-field" placeholder="What are you currently using?" />
              </div>
              <div>
                <label htmlFor="problemStatement" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Problem / Requirement *</label>
                <textarea {...register('problemStatement')} id="problemStatement" rows={5} className="input-field" placeholder="Describe your technical requirement or challenge..." aria-required="true" />
                {(errors as any).problemStatement && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).problemStatement.message}</p>}
              </div>
            </div>
          )}

          {inquiryType === 'general' && (
            <div className="space-y-8">
              <div>
                <label htmlFor="subject" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Subject *</label>
                <input {...register('subject')} id="subject" className="input-field" placeholder="What is this about?" aria-required="true" />
                {(errors as any).subject && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).subject.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Message *</label>
                <textarea {...register('message')} id="message" rows={5} className="input-field" placeholder="Your message..." aria-required="true" />
                {(errors as any).message && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).message.message}</p>}
              </div>
            </div>
          )}

          {inquiryType === 'career' && (
            <div className="space-y-8">
              <div>
                <label htmlFor="positionInterest" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Position of Interest *</label>
                <input {...register('positionInterest')} id="positionInterest" className="input-field" placeholder="Role or area you are interested in" aria-required="true" />
                {(errors as any).positionInterest && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).positionInterest.message}</p>}
              </div>
              <div className="relative">
                <label htmlFor="experience" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Years of Experience *</label>
                <select {...register('experience')} id="experience" className="input-field appearance-none bg-transparent pr-6" aria-required="true">
                  <option value="">Select experience</option>
                  {experienceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-0 bottom-3 pointer-events-none" aria-hidden="true" />
                {(errors as any).experience && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).experience.message}</p>}
              </div>
              <div>
                <label htmlFor="coverMessage" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">Cover Message *</label>
                <textarea {...register('coverMessage')} id="coverMessage" rows={5} className="input-field" placeholder="Tell us about your background and interests..." aria-required="true" />
                {(errors as any).coverMessage && <p className="text-[12px] text-red-600 mt-1" role="alert">{(errors as any).coverMessage.message}</p>}
              </div>
              <div>
                <label htmlFor="resume" className="text-[12px] font-medium text-slate-500 uppercase tracking-[0.08em] mb-2 block">
                  Resume / CV (PDF, DOC, DOCX, max 5 MB)
                </label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx,image/jpeg,image/png"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="input-field"
                  aria-describedby={resumeFile ? 'resume-file-selected' : undefined}
                />
                {resumeFile && (
                  <p id="resume-file-selected" className="text-[12px] text-slate-500 mt-1">
                    {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Honeypot (hidden from sighted users and screen readers, never filled by a human) */}
        <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
          <label htmlFor="honeypot">Leave this field empty</label>
          <input {...register('honeypot')} id="honeypot" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Submit error */}
        {submitError && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-[14px] text-red-700 mt-4" role="alert">
            {submitError}
            {formState === 'rate-limited' && (
              <>
                {' '}
                <a href={buildWhatsAppURL()} className="font-medium underline">
                  Chat on WhatsApp instead →
                </a>
              </>
            )}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="mt-8 w-full h-[52px] font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="border-2 border-white border-t-transparent w-4 h-4 rounded-full animate-spin" />
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