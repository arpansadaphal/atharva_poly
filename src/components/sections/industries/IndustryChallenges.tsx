'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/service/ServiceCard'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { Industry } from '@/types/industries'

export default function IndustryChallenges({ industry }: { industry: Industry }) {
  return (
    <section className="bg-slate-50 section-padding" aria-label="Industry Challenges">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="INDUSTRY CHALLENGES"
          headline={`What ${industry.name} Manufacturers Demand`}
          theme="light"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
        >
          {industry.challenges.map((ch, i) => (
            <motion.div key={i} variants={staggerItem}>
              <ServiceCard title={ch.title} description={ch.description} iconName={ch.iconName} />
            </motion.div>
          ))}
        </motion.div>
        <div className="border-t border-slate-200 mt-12 pt-10">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">HOW WE ADDRESS THESE</p>
          <p className="text-[16px] text-slate-600 max-w-[640px] mt-3 leading-7">
            Our quality systems, engineering support, and traceability ensure we meet the specific demands of {industry.name.toLowerCase()} manufacturers.
          </p>
          <a href={`/contact?industry=${industry.slug}`} className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-4">
            Discuss your specific requirements →
          </a>
        </div>
      </div>
    </section>
  )
}