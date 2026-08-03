import { SectionHeader } from '@/components/ui/SectionHeader'
import { Award } from 'lucide-react'
import type { Industry } from '@/types/industries'

export default function IndustryCompliance({ industry }: { industry: Industry }) {
  return (
    <section className="bg-white section-padding" aria-label="Quality & Compliance">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="QUALITY & COMPLIANCE"
          headline={`Standards That Matter for ${industry.name}`}
          theme="light"
        />
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 mt-8">
          <div>
            <p className="text-[16px] text-slate-600 max-w-[480px] leading-7">
              Our certifications ensure every component meets the rigorous quality and regulatory requirements of the {industry.name.toLowerCase()} sector.
            </p>
            <a
              href="/manufacturing#quality-systems"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-6"
            >
              View our full quality systems →
            </a>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">
              CERTIFIED UNDER
            </p>
            <div className="space-y-3 mt-3">
              {industry.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-[15px] font-medium text-slate-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}