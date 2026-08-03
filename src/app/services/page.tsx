import PageHero from '@/components/sections/services/PageHero'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import ServicesPillarsNav from '@/components/sections/services/ServicesPillarsNav'
import ServicePillarSection from '@/components/sections/services/ServicePillarSection'
import HowWeWork from '@/components/sections/services/HowWeWork'
import ServicesInquiryCTA from '@/components/sections/services/ServicesInquiryCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services & Capabilities | Atharva Polymers, Pune',
  description: 'Custom polymer compounding, technical support, and export supply from Atharva Polymers, Pune. IATF 16949 certified. 19 years of polymer expertise.',
  openGraph: {
    title: 'Services & Capabilities | Atharva Polymers',
    description: 'Custom polymer compounding, technical support, and export supply from Atharva Polymers, Pune.',
    url: 'https://www.atharvapolymers.com/services',
  },
  alternates: { canonical: 'https://www.atharvapolymers.com/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES & CAPABILITIES"
        headline="Engineering Partnership from Design to Delivery"
        description="From material selection and custom formulation to quality assurance and export delivery — Atharva Polymers supports the full lifecycle of your polymer supply."
      />

      {/* Breadcrumb (optional, hidden on mobile) */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 -mt-6 relative z-20 hidden sm:block">
        {/* <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services' },
          ]}
          className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 inline-block"
        /> */}
      </div>

      {/* S2 – Pillars Navigation */}
      <section className="bg-white py-[60px] md:py-[120px]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-2 md:mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">WHAT WE OFFER</span>
          </div>
          <h2 className="font-normal text-3xl md:text-4xl text-slate-900 mb-8 md:mb-12">
            Four Ways We Support Your Business
          </h2>
          <ServicesPillarsNav />
        </div>
      </section>

      {/* S3 – Manufacturing */}
      <ServicePillarSection
        pillarId="manufacturing"
        background="slate-50"
        showCrossLink
        crossLinkLabel="View our complete product portfolio →"
        crossLinkHref="/products"
      />

      {/* S4 – Technical Partnership */}
      <ServicePillarSection pillarId="technical" background="white">
        <div className="flex gap-4 mt-8 md:mt-12 border-l-2 border-blue-600 pl-6">
          <blockquote className="text-[17px] md:text-[20px] font-[300] text-slate-700 max-w-[600px]">
            For most enquiries, our technical team responds with a material recommendation within 24–48 hours.
          </blockquote>
        </div>
      </ServicePillarSection>

      {/* S5 – Quality Assurance */}
      <ServicePillarSection pillarId="quality" background="slate-50">
        <div className="mt-8 md:mt-12">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">CERTIFIED UNDER</p>
          <p className="text-[14px] md:text-[15px] font-medium text-slate-700 mt-2">IATF 16949 · ISO 9001 · ISO 14001 · ISO 45001</p>
          <a href="/manufacturing" className="inline-flex items-center gap-2 text-[13px] md:text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-2">
            View our full quality standards →
          </a>
        </div>
      </ServicePillarSection>

      {/* S6 – How We Work */}
      <HowWeWork />

      {/* S7 – Supply & Export */}
      <ServicePillarSection pillarId="supply" background="white">
        <div className="mt-8 md:mt-12">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">CURRENTLY SERVING</p>
          <p className="text-[18px] md:text-[20px] font-[300] text-slate-800 mt-2">India (domestic) + 4 international export markets</p>
          <p className="text-[14px] md:text-[15px] text-slate-500 mt-2">Export capability available — contact us to discuss your requirements.</p>
          <a href="/about#who-we-are" className="inline-flex items-center gap-2 text-[13px] md:text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-2">
            Learn more about our export reach →
          </a>
        </div>
      </ServicePillarSection>

      {/* S8 – Partnership Commitments */}
      <section className="bg-slate-50 py-[60px] md:py-[120px]" aria-label="Our Commitment">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-2 md:mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">OUR COMMITMENT</span>
          </div>
          <h2 className="font-normal text-3xl md:text-4xl text-slate-900 mb-8 md:mb-12">
            What You Can Expect as a Partner
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              ['RELIABILITY.', 'Every batch produced to the same specification. We do not compromise process to meet speed.'],
              ['ACCESSIBILITY.', 'Direct access to the people who make decisions. When you need an answer, we give you one.'],
              ['LONGEVITY.', 'We build supply relationships that last. 19 years of clients is the evidence.'],
            ].map(([title, desc], i) => (
              <div key={i} className={i < 2 ? 'md:border-r md:border-slate-200 md:pr-8' : ''}>
                <p className="text-[20px] md:text-[22px] font-semibold text-slate-900">{title}</p>
                <p className="text-[14px] md:text-[15px] text-slate-500 leading-6 mt-2 max-w-[260px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S9 – Inquiry CTA */}
      <ServicesInquiryCTA />
    </>
  )
}