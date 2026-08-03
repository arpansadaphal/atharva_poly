'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { capacityMetrics } from '@/lib/manufacturing-data'

export default function CapacityStrip() {
  return (
    <section
      id="capacity"
      className="bg-slate-50 section-padding"
      aria-label="Capacity and Capabilities"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="CAPACITY & CAPABILITIES"
            headline="Production Capacity for Demanding OEMs"
            description="Our Ranjangaon plant serves four industry verticals with 3,600 MT annual polymer processing capacity. Flexible scheduling and 200 dedicated staff ensure consistent, repeatable output."
            theme="light"
          />
        </motion.div>

        <motion.div
          className="bg-white border border-slate-200 rounded-xl grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {capacityMetrics.map((metric, i) => (
            <div key={i} className="p-6 lg:p-8">
              <p className="text-[28px] font-semibold text-slate-900">
                {metric.value}
                {metric.unit && (
                  <span className="text-[14px] text-slate-400 ml-1">
                    {metric.unit}
                  </span>
                )}
              </p>
              <p className="text-[13px] font-medium text-slate-600 mt-1">
                {metric.label}
              </p>
              <p className="text-[12px] text-slate-400 mt-0.5">{metric.context}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">
            INDUSTRIES SERVED
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {[
              { name: 'Appliances', share: '40%', color: 'bg-blue-600' },
              { name: 'Automotive & Off‑Road', share: '40%', color: 'bg-blue-600' },
              { name: 'Furniture', share: '10%', color: 'bg-blue-600' },
              { name: 'Others', share: '10%', color: 'bg-blue-600' },
            ].map((ind) => (
              <div key={ind.name} className="flex items-center gap-2 text-[14px] text-slate-600">
                <span className={`w-2 h-2 rounded-full ${ind.color}`} />
                <span>
                  {ind.name} ({ind.share})
                </span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-slate-400 mt-3">
            Including exports to the United States (Toro, Ditch Witch) and supplies to
            global OEMs like Haier, Godrej, Steelcase, Herman Miller, and L&T.
          </p>
          <Link
            href="/products"
            className="text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-4 inline-block"
          >
            View products by industry →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}