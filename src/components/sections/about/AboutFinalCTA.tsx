'use client'

import { MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FadeOnScroll } from '@/components/ui/FadeOnScroll'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import { company } from '@/lib/data'

/**
 * AboutFinalCTA — editorial closer.
 *
 * Differs from homepage ContactCTA (which is centred, dark, primary + WhatsApp
 * pair). AboutFinalCTA is editorial-split, light, with three CTAs and an
 * address strip — a magazine-spread closer.
 */
export function AboutFinalCTA() {
  const phone = company.contact.phone as string
  const email = company.contact.email as string
  const hasPhone = phone !== '⚠ AWAITING CLIENT DATA'
  const hasEmail = email !== '⚠ AWAITING CLIENT DATA'

  return (
    <section
      aria-label="Begin a Conversation"
      className="bg-white py-[140px]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* ── Left column — typographic closer ──────────────────────── */}
          <FadeOnScroll className="lg:col-span-7">
            <div className="flex gap-5">
              {/* Spec mark at column scale */}
              <div
                aria-hidden="true"
                className="w-0.5 bg-blue-600 flex-shrink-0"
              />

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Begin a Conversation
 </p>

                <h2
                  className="text-slate-900 mt-3"
                  style={{
                    fontSize: 'clamp(36px, 4.5vw, 64px)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                  }}
                >
                  If precision matters, we should talk.
 </h2>

                <p className="text-base text-slate-600 leading-[1.85] max-w-[480px] mt-6">
                  Our team responds within one business day. Tell us the application,
                  the volume, the tolerance — we will tell you whether we are the
                  right facility for it.
 </p>
</div>
</div>
</FadeOnScroll>

          {/* ── Right column — CTAs and address ──────────────────────── */}
          <FadeOnScroll delay={0.1} className="lg:col-span-5 lg:pl-12">
            {/* CTAs */}
            <div className="flex flex-col gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Request a Quote
  </Button>

              <Button
                variant="whatsapp"
                size="lg"
                href={buildWhatsAppURL()}
                external
              >
                Chat on WhatsApp
  </Button>

              <Button
                variant="secondary"
                href="/manufacturing"
              >
                View Manufacturing Capabilities
  </Button>
</div>

            {/* Address strip */}
            <address className="not-italic mt-12 pt-6 border-t border-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 mb-4">
                Contact
 </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={14}
                    className="text-slate-400 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] text-slate-600 leading-5">
                    {company.address.street}, {company.address.city},{' '}
                    {company.address.state}, {company.address.country}
  </span>
</div>

                {hasPhone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-[13px] text-slate-600 hover:text-slate-900 transition-colors duration-150"
                  >
                    <Phone
                      size={14}
                      className="text-slate-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {phone}
  </a>
                )}

                {hasEmail && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-[13px] text-slate-600 hover:text-slate-900 transition-colors duration-150"
                  >
                    <Mail
                      size={14}
                      className="text-slate-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {email}
  </a>
                )}
</div>
</address>
</FadeOnScroll>
</div>
</div>
</section>
  )
}

export default AboutFinalCTA
