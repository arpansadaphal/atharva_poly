'use client'

import { motion } from 'framer-motion'
import ServiceCard from '@/components/ui//service/ServiceCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { qualitySystems } from '@/lib/manufacturing-data'

export default function QualitySystems() {
  const toServiceCardProp = (q: typeof qualitySystems[0]) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    iconName: q.iconName,
    pillar: 'quality' as const,
  })

  return (
    <section className="bg-slate-50 section-padding" aria-label="Quality Systems">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="QUALITY SYSTEMS"
          headline="Quality Built into the Process, Not Added at the End"
          description="Our QMS is certified to IATF 16949 and ISO 9001. Every stage — from incoming material to dispatch — is governed by documented procedures, defined inspection criteria, and recorded results."
          theme="light"
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
        >
          {qualitySystems.map((q) => (
            <motion.div key={q.id} variants={staggerItem}>
              <ServiceCard service={toServiceCardProp(q)} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 pt-10 border-t border-slate-200">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">
            OPERATING UNDER
          </p>
          <p className="text-[16px] font-medium text-slate-700 mt-2">
            IATF 16949 · ISO 9001 · ISO 14001 · OHSAS 18001
          </p>
          <a
            href="#certifications"
            className="text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-2 inline-block"
          >
            View all certifications ↓
          </a>
        </div>
      </div>
    </section>
  )
}