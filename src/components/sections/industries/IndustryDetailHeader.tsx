'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import { Button } from '@/components/ui/Button'
import type { Industry } from '@/types/industries'

export default function IndustryDetailHeader({ industry }: { industry: Industry }) {
  return (
    <section className="bg-white pt-28 pb-16" aria-label={`${industry.name} — Industry Overview`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <BreadcrumbNav
            items={[
              { label: 'Home', href: '/' },
              { label: 'Industries', href: '/industries' },
              { label: industry.name },
            ]}
          />
        </motion.div>
        <motion.span
          className="text-[12px] font-semibold text-blue-600 uppercase tracking-[0.08em] bg-blue-50 px-3 py-1 rounded-full inline-flex mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {industry.name.toUpperCase()}
        </motion.span>
        <motion.h1
          className="font-[300] text-[36px] lg:text-[48px] text-slate-900 mt-3 leading-[1.1]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {industry.name} Polymer Solutions
        </motion.h1>
        <motion.p
          className="text-[18px] text-slate-500 max-w-[580px] mt-4 leading-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
        >
          {industry.tagline}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <Button variant="primary" size="lg" href={`/contact?industry=${industry.slug}&inquiry=industry`}>
            Discuss Your Requirement
          </Button>
          <Button variant="outline" size="lg" href={`/products?industry=${industry.slug}`}>
            View {industry.name} Components
          </Button>
        </motion.div>
      </div>
    </section>
  )
}