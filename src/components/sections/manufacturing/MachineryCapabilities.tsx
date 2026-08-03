'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ServiceCard from '@/components/ui/service/ServiceCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { machineCategories } from '@/lib/manufacturing-data'

export default function MachineryCapabilities() {
  // Map machine category to a Service‑like object for ServiceCard
  const toServiceCardProp = (machine: typeof machineCategories[0]) => ({
    id: machine.id,
    title: `${machine.label} — ${machine.range}`,
    description: `${machine.applications.join(' · ')}${machine.details ? '. ' + machine.details : ''}`,
    iconName: machine.iconName,
    pillar: 'manufacturing' as const,
  })

  return (
    <section className="bg-white section-padding" aria-label="Machinery and Equipment">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="MACHINERY & EQUIPMENT"
          headline="60+ Injection Moulding Machines. One Quality Standard."
          description="Our machine park spans 50T to 1,300T clamping force, enabling everything from micro‑precision electronic parts to large structural automotive components. Advanced capabilities include 2K moulding, vertical moulding, and all‑electric servo machines."
          theme="light"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
        >
          {machineCategories.map((machine) => (
            <motion.div key={machine.id} variants={staggerItem}>
              <ServiceCard service={toServiceCardProp(machine)} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 pt-8 border-t border-slate-200">
          <p className="text-[14px] text-slate-500 max-w-[640px]">
            Additional supporting equipment includes dehumidifiers, annealing ovens,
            chillers, grinders, anti‑static air guns, and fully automated SPM camera
            inspection stations.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-4"
          >
            View products manufactured on this equipment →
          </Link>
        </div>
      </div>
    </section>
  )
}