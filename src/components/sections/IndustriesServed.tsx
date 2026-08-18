// components/sections/IndustriesServed.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Car, CookingPot, RockingChair, Factory, ArrowRight } from 'lucide-react'
import {SectionHeader }from '@/components/ui/SectionHeader'
import { staggerContainer, staggerItem } from '@/lib/animations'

const industries = [
  {
    name: 'Automotive',
    icon: Car,
    description:
      'Polymer solutions for automotive components, interior assemblies, and under‑hood applications requiring heat and chemical resistance.',
    slug: 'automotive',
  },
  {
    name: 'Appliances',
    icon: CookingPot,
    description:
      'Smart, durable parts for the worlds leading home appliance brands, from housings to functional components.',
    slug: 'appliances',
  },
  {
    name: 'Furniture',
    icon: RockingChair,
    description:
      'precision-moulded components for premium office furniture and seating.',
    slug: 'furniture',
  },
  {
    name: 'Industrial And FMCG',
    icon: Factory,
    description:
      'High-spec parts for industrial equipment and FMCG applications.',
    slug: 'others',
  },
]

export default function IndustriesServed() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      aria-label="Industries Served"
      className="bg-slate-50 section-padding"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow="Industries We Serve"
          headline="Polymer Solutions Across Industrial Sectors"
          theme="light"
        />

        {/* Precision grid – with staggered fade-in */}
        <div className="mt-12 border border-slate-200">
          <motion.div
            className="grid grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {industries.map((industry, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                className={`
                  group relative p-7 lg:p-10 bg-slate-50
                  transition-colors duration-[250ms] hover:bg-white
                  ${idx % 2 === 0 ? 'border-r border-slate-200' : ''}
                  ${idx < 2 ? 'border-b border-slate-200' : ''}
                `}
              >
                {/* Shadow overlay on hover – absolute to not affect grid lines */}
                <div
                  className="absolute inset-0 shadow-[0_4px_24px_rgba(0,0,0,0.06)] opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <industry.icon className="w-7 h-7 text-blue-600 mb-5" aria-hidden="true" />
                  <h3 className="text-xl lg:text-[22px] font-semibold text-slate-900 mb-3">
                    {industry.name}
                  </h3>
                  <p className="text-[15px] leading-6 text-slate-500 mb-5 hidden sm:block max-w-[420px]">
                    {industry.description}
                  </p>
                  <a
                    href={`/industries/${industry.slug}`}
                    className="inline-flex items-center gap-1 text-[14px] font-medium text-blue-600 group/link"
                    aria-label={`View polymer applications for ${industry.name}`}
                  >
                    View Applications
                    <ArrowRight className="w-4 h-4 transition-transform duration-[250ms] group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}