'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { Industry } from '@/types/industries'

function CompactProductCard({ name, shortDesc }: { name: string; shortDesc: string }) {
  return (
    <div className="service-card-hover bg-white border border-slate-200 rounded-xl overflow-hidden relative group cursor-pointer">
      {/* Photo placeholder */}
      <div className="aspect-[16/10] bg-slate-100 flex items-center justify-center">
        <span className="text-slate-400 text-sm">Product Image</span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate-900">{name}</h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{shortDesc}</p>
        <span className="text-[13px] font-medium text-blue-600 mt-3 inline-block">
          View specifications →
        </span>
      </div>
    </div>
  )
}

export default function IndustryProducts({ industry }: { industry: Industry }) {
  if (!industry.products || industry.products.length === 0) return null

  return (
    <section className="bg-slate-50 section-padding" aria-label="Featured components">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="FEATURED COMPONENTS"
          headline={`Parts We Produce for ${industry.name}`}
          theme="light"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
        >
          {industry.products.map((prod, i) => (
            <motion.div key={i} variants={staggerItem}>
              <CompactProductCard name={prod.name} shortDesc={prod.shortDesc} />
            </motion.div>
          ))}
        </motion.div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-10"
        >
          View all products →
        </Link>
      </div>
    </section>
  )
}