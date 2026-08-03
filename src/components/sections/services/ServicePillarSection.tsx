'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/service/ServiceCard'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { servicePillars, services } from '@/lib/services-data'
import type { ServicePillar } from '@/types/services'

interface ServicePillarSectionProps {
  pillarId: ServicePillar
  background?: 'white' | 'slate-50'
  showCrossLink?: boolean
  crossLinkLabel?: string
  crossLinkHref?: string
  children?: React.ReactNode
}

export default function ServicePillarSection({
  pillarId,
  background = 'white',
  showCrossLink = false,
  crossLinkLabel,
  crossLinkHref,
  children,
}: ServicePillarSectionProps) {
  const pillar = servicePillars.find((p) => p.id === pillarId)!
  const pillarServices = services.filter((s) => s.pillar === pillarId)

  return (
    <section
      id={pillar.anchorId}
      className={`${background === 'slate-50' ? 'bg-slate-50' : 'bg-white'} py-[60px] md:py-[120px]`}
      aria-label={pillar.label}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow={pillar.eyebrow}
          headline={pillar.headline}
          theme="light"
        />
        <p className="text-[14px] md:text-[16px] text-slate-600 max-w-[700px] mb-8 md:mb-12 mt-2 md:mt-6">
          {pillar.description}
        </p>

        <motion.div
         className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
        >
          {pillarServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className={
                pillarServices.length === 5 && index === 4
                  ? 'sm:col-span-2 lg:col-span-1'
                  : ''
              }
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {children}

        {showCrossLink && crossLinkLabel && crossLinkHref && (
          <a
            href={crossLinkHref}
            className="inline-flex items-center gap-2 text-[13px] md:text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-8 md:mt-12"
          >
            {crossLinkLabel} →
          </a>
        )}
      </div>
    </section>
  )
}