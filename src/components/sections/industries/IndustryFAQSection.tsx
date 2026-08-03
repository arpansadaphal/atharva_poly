import FAQAccordion from '@/components/ui/FAQAccordion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Industry } from '@/types/industries'

export default function IndustryFAQSection({ industry }: { industry: Industry }) {
  
  if (!industry.faq || industry.faq.length === 0) return null

  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="FREQUENTLY ASKED"
          headline={`Common Questions from ${industry.name} Buyers`}
          theme="light"
        />
        <FAQAccordion items={industry.faq} />
      </div>
    </section>
  )
}