'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/service/ServiceCard'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { Industry } from '@/types/industries'

export default function IndustryApplications({ industry }: { industry: Industry }) {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader eyebrow="KEY APPLICATIONS" headline={`Where We Deliver in ${industry.name}`} theme="light" />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
        >
          {industry.applications.map((app, i) => (
            <motion.div key={i} variants={staggerItem}>
              <ServiceCard title={app.title} description={app.description} iconName={app.iconName} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}