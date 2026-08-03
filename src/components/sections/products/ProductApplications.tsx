'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import type { ProductDetail } from '@/types/products'

interface ProductApplicationsProps {
  product: ProductDetail
}

export default function ProductApplications({ product }: ProductApplicationsProps) {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
            APPLICATIONS
          </span>
        </div>
        <h2 className="font-normal text-4xl text-slate-900 mb-10">Where This Product Is Used</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.applications.map((app, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 p-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-[16px] font-medium text-slate-900">{app}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-[14px] text-slate-500 mt-8">
          Also relevant for:{' '}
          {product.industries.map((ind, i) => (
            <span key={ind}>
              <Link
                href={`/industries/${ind}`}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                {ind.charAt(0).toUpperCase() + ind.slice(1).replace(/-/g, ' ')}
              </Link>
              {i < product.industries.length - 1 && ' · '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}