'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/service/ServiceCard'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface IndustrySectionItem {
  title: string
  description: string
  iconName: string
}

interface IndustrySectionProps {
  eyebrow: string
  headline: string
  description?: string
  items: IndustrySectionItem[]
  background?: 'white' | 'slate-50'
  children?: React.ReactNode
}

export default function IndustrySection({
  eyebrow,
  headline,
  description,
  items,
  background = 'white',
  children,
}: IndustrySectionProps) {
  return (
    <section
      className={`${background === 'slate-50' ? 'bg-slate-50' : 'bg-white'} section-padding`}
      aria-label={eyebrow}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader eyebrow={eyebrow} headline={headline} theme="light" />
        {description && (
          <p className="text-[16px] text-slate-600 max-w-[700px] mb-12 mt-2">{description}</p>
        )}

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
        >
          {items.map((item, i) => (
            <motion.div key={i} variants={staggerItem}>
              <ServiceCard
                title={item.title}
                description={item.description}
                iconName={item.iconName}
              />
            </motion.div>
          ))}
        </motion.div>

        {children && (
          <div className="mt-8 md:mt-12">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}