import { Metadata } from 'next'
import PageHero from '@/components/sections/products/PageHero'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import ContactForm from '@/components/sections/contact/ContactForm'
import BusinessInfoPanel from '@/components/sections/contact/BusinessInfoPanel'
import LocationSection from '@/components/sections/contact/LocationSection'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
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
    <>
      {/* C1 Hero */}
      <PageHero
        eyebrow="GET IN TOUCH"
        headline="Start a Conversation"
        description="Tell us about your requirement. Our technical team responds within one business day."
        theme="dark"
        minHeight="min-h-[280px] lg:min-h-[360px]"
      />

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 -mt-6 relative z-20">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact' },
          ]}
          className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 inline-block"
        />
      </div>

      {/* C2 Form + Business Info */}
      <section className="bg-white section-padding" id="contact-form-section">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 lg:gap-16">
            {/* BusinessInfoPanel placed above form on mobile (order-1) */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <BusinessInfoPanel />
            </div>

            {/* Form */}
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
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[14px] font-medium text-slate-300 mb-10">
            <span>19 Years</span>
            <span className="text-slate-600">·</span>
            <span>35 Machines</span>
            <span className="text-slate-600">·</span>
            <span>IATF 16949</span>
            <span className="text-slate-600">·</span>
            <span>4 Export Markets</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="#contact-form-section">
              Request Quote
            </Button>
            <a
              href={buildWhatsAppURL({ context: 'contact' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-8 text-white font-semibold rounded-lg bg-[#25D366] hover:bg-[#20bd5a] transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}