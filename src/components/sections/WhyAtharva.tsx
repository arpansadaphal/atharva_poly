'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Clock, Globe, Users, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { differentiators } from '@/lib/data'
import type { Differentiator } from '@/types'

// Map string icon names (from data.ts) to Lucide components
const ICON_MAP: Record<string, LucideIcon> = { Award, Clock, Globe, Users }

interface CardProps {
  item: Differentiator
}

function DifferentiatorCard({ item }: CardProps) {
  const Icon = ICON_MAP[item.icon] ?? Award

  return (
    /**
     * Outer div handles hover. Uses CSS transition via Tailwind — NOT Framer
     * Motion whileHover — so the stagger entrance and hover are independent.
     *
     * Blue left border is an absolute child div so its width/radius can be
     * controlled precisely (3px, rounded-l-xl). It moves WITH the card on
     * hover — it has no animation of its own. "Static" means it doesn't
     * grow, glow, or transform independently on hover.
     */
    <div
       className={cn(
        'relative overflow-hidden',
        'bg-white border border-slate-200 rounded-xl',
        'p-5 md:p-7 lg:p-8',               // ← only this line changed
        'hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]',
        'transition-all duration-[250ms]'
      )}
    >
      {/* Specification Mark at card scale — absolute, NOT border-l-4 */}
      {/* rounded-l-xl matches the card's left border-radius exactly */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 bottom-0 w-[3px] bg-blue-600 rounded-l-xl"
      />

      {/* Icon */}
      <Icon
        size={24}
        strokeWidth={2}
        className="text-blue-600 mb-5"
        aria-hidden="true"
      />

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 mb-3">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-[15px] leading-7 text-slate-500">
        {item.description}
      </p>
    </div>
  )
}

export function WhyAtharva() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      aria-label="Why Choose Atharva Polymers"
      className="bg-white"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 py-[72px] md:py-24 lg:py-[120px]">

        {/* Section header — uses SectionHeader component (left-aligned, light theme) */}
        <SectionHeader
          eyebrow="Why Choose Us"
          headline="Why Industrial Buyers Choose Atharva Polymers"
        />

        {/* Card grid — stagger triggered by single gridRef */}
       <motion.div
          ref={gridRef}
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className={cn(
            'mt-12',
            'grid grid-cols-2 lg:grid-cols-4',   // ← mobile is now 2 cols
            'gap-4 md:gap-5 lg:gap-6'
          )}
        >
          {differentiators.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <DifferentiatorCard item={item} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}