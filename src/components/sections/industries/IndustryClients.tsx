'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import ClientLogo from '@/components/ui/industries/ClientLogo'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { Industry } from '@/types/industries'

export default function IndustryClients({ industry }: { industry: Industry }) {
  if (!industry.clients || industry.clients.length === 0) return null

  return (
    <section className="relative bg-slate-50 section-padding overflow-hidden" aria-label="Trusted clients">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-50/60 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="TRUSTED BY"
          headline="Leading Brands Rely on Our Parts"
          theme="light"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {industry.clients.map((client) => (
            <motion.div
              key={client.name}
              variants={staggerItem}
              className="group relative flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 px-6 py-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/60 group-hover:to-transparent transition-colors duration-300" />

              {/* Logo always in full color */}
              <div className="relative">
                <ClientLogo name={client.name} logoPath={client.logoPath} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}