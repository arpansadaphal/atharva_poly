import { Suspense } from 'react'  // ✅ Add this import
import { Metadata } from 'next'
import PageHero from '@/components/sections/products/PageHero'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import ContactForm from '@/components/sections/contact/ContactForm'
import BusinessInfoPanel from '@/components/sections/contact/BusinessInfoPanel'
import LocationSection from '@/components/sections/contact/LocationSection'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { Button } from '@/components/ui/Button'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import { contactFAQ } from '@/lib/contact-data'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata: Metadata = {
  title: 'Contact & Request Quote | Atharva Polymers, Pune',
  description:
    'Contact Atharva Polymers for polymer quotations, technical enquiries, and material selection support. MIDC Ranjangaon, Pune.',
  openGraph: {
    url: 'https://www.atharvapolymers.com/contact',
    images: [{ url: '/assets/og/contact.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.atharvapolymers.com/contact' },
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      {/* C1 Hero */}
      {/* <PageHero
        eyebrow="GET IN TOUCH"
        headline="Start a Conversation"
        description="Tell us about your requirement. Our technical team responds within one business day."
        theme="dark"
        minHeight="min-h-[280px] lg:min-h-[360px]"
      /> */}

      {/* Breadcrumb */}
     

      {/* C2 Form + Business Info */}
      <section className="bg-white section-padding" id="contact-form-section">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 lg:gap-16">
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              
              <BusinessInfoPanel />
            </div>
            <div className="order-2 lg:order-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* C3 Locations */}
      <LocationSection />

      {/* C4 FAQ */}
      <section className="bg-white section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
              FREQUENTLY ASKED
            </span>
          </div>
          <h2 className="font-normal text-4xl text-slate-900 mb-8">Common Questions</h2>
          <div className="max-w-[800px]">
            <FAQAccordion items={contactFAQ} />
          </div>
        </div>
      </section>

      {/* C5 Trust Strip + CTA */}
      <section className="bg-slate-900 py-16 relative">
        <NoiseOverlay />
    
      </section>
    </Suspense>
  )
}