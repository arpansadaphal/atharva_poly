'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { servicePillars } from '@/lib/services-data'

export default function ServicesPillarsNav() {
  return (
    <motion.nav
      aria-label="Service categories"
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
    >
      {servicePillars.map((pillar) => {
        const Icon = (LucideIcons as any)[pillar.iconName] || LucideIcons.HelpCircle
        return (
          <motion.a
            key={pillar.id}
            href={`#${pillar.anchorId}`}
            variants={staggerItem}
            className="pillar-nav-card bg-white border border-slate-200 rounded-xl p-5 md:p-7 relative block focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label={`Jump to ${pillar.label} section`}
          >
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-blue-600 rounded-l-xl" aria-hidden="true" />
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-blue-600" aria-hidden="true" />
            <h3 className="text-[16px] md:text-[18px] font-semibold text-slate-900 mt-3">
              {pillar.label}
            </h3>
            <p className="text-[12px] md:text-[13px] text-slate-400">{pillar.serviceCount} services</p>
            <span className="text-[12px] md:text-[13px] font-medium text-blue-600 mt-3 inline-block">
              View services ↓
            </span>
          </motion.a>
        )
      })}
    </motion.nav>
  )
}