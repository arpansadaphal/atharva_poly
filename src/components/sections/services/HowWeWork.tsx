'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import EngagementProcess from '@/components/ui/service/EngagementProcess'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
import { engagementSteps } from '@/lib/services-data'

export default function HowWeWork() {
  return (
    <section className="bg-slate-900 py-[60px] md:py-[120px] relative" aria-label="Our Engagement Process">
      <NoiseOverlay />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="HOW WE WORK"
            headline="From First Contact to Long‑Term Partnership"
            align="center"
            theme="dark"
          />
          <p className="text-slate-400 mt-2 text-[14px] md:text-base">A defined engagement process.</p>
        </motion.div>
        <EngagementProcess steps={engagementSteps} theme="dark" />
      </div>
    </section>
  )
}