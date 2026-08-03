import PageHero from '@/components/sections/products/PageHero'
import IndustryCard from '@/components/ui/industries/IndustryCard'
import ServiceCard from '@/components/ui/service/ServiceCard'
import { industries } from '@/lib/industries-data'
import { Metadata } from 'next'

const crossCapabilities = [
  { title: 'IATF 16949 Traceability', description: 'Full batch traceability mandatory for automotive and increasingly requested by appliance and medical clients.', iconName: 'GitBranch' },
  { title: 'Design & Engineering', description: 'In‑house CAD, reverse engineering, and 3D scanning to accelerate development.', iconName: 'FileText' },
  { title: 'Automated Inspection', description: 'FARO arm, SPM camera, MFI testing for consistent quality across millions of parts.', iconName: 'ClipboardCheck' },
  { title: 'Direct Technical Access', description: 'Every client receives a named technical contact who understands their product.', iconName: 'MessageSquare' },
]

export const metadata: Metadata = {
  title: 'Industries Served | Atharva Polymers, Pune',
  description: 'Polymer solutions for appliances, automotive & off‑road, furniture, and medical/industrial sectors. IATF 16949 certified. 60+ machines. MIDC Ranjangaon, Pune.',
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="INDUSTRIES WE SERVE"
        headline="Precision Polymer Solutions Across Global Industries"
        description="From smart appliances to autonomous off‑road vehicles, our 60+ moulding machines and IATF 16949 certified facility deliver critical components for the world’s most demanding brands."
      />
      {/* O2 Industry Cards */}
      <section className="bg-white section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">FOUR CORE SECTORS</span>
          </div>
          <h2 className="font-normal text-4xl text-slate-900 mb-12">Where We Deliver Everyday</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {industries.map((ind) => (
              <IndustryCard key={ind.slug} industry={ind} />
            ))}
          </div>
        </div>
      </section>
      {/* O3 Approach */}
      <section className="bg-slate-50 section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">OUR APPROACH</span>
          </div>
          <h2 className="font-normal text-4xl text-slate-900 mb-12">Deep Expertise Where It Matters Most</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <p className="text-[16px] font-[300] text-slate-700 leading-7">For appliance leaders like Haier and Godrej, we deliver dimensionally stable, colour‑consistent components that meet the aesthetic and functional demands of household products.</p>
            <p className="text-[16px] font-[300] text-slate-700 leading-7">For Toro, Ditch Witch, and Spark Minda, we supply IATF 16949 certified automotive and off‑road parts that withstand vibration, heat, and real‑world abuse.</p>
            <p className="text-[16px] font-[300] text-slate-700 leading-7">For Steelcase and Herman Miller, we mould components that meet rigorous ergonomic, durability, and surface finish standards, year after year.</p>
          </div>
        </div>
      </section>
      {/* O4 Cross Capabilities */}
      <section className="bg-white section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">ACROSS ALL INDUSTRIES</span>
          </div>
          <h2 className="font-normal text-4xl text-slate-900 mb-12">What Every Client Receives</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crossCapabilities.map((cap) => (
              <ServiceCard key={cap.title} title={cap.title} description={cap.description} iconName={cap.iconName} />
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-slate-900 section-padding relative">
        <div className="noise-overlay" aria-hidden="true" />
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <h2 className="font-[300] text-[36px] lg:text-[48px] text-white">Ready to Discuss Your Industry Requirement?</h2>
          <p className="text-slate-400 text-[17px] mt-4 max-w-[520px] mx-auto">Our team can recommend materials and provide samples tailored to your sector.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="/contact" className="inline-flex items-center justify-center h-14 px-8 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">Request a Quotation</a>
            <a href="#" className="inline-flex items-center justify-center h-14 px-8 text-white font-medium rounded-lg border border-slate-600 hover:border-slate-400 transition-colors">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}