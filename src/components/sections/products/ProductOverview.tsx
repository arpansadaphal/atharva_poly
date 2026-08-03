'use client'

import { motion } from 'framer-motion'
import KeyPropertiesPanel from '@/components/ui/KeyPropertiesPanel'
import type { ProductDetail } from '@/types/products'

interface ProductOverviewProps {
  product: ProductDetail
}

export default function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <section className="bg-slate-900 pb-[120px] pt-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-white">
            PRODUCT OVERVIEW
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Description */}
          <motion.div
            className="lg:w-[55%]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[16px] text-slate-300 leading-7 max-w-[540px]">
              {product.description}
            </p>
            <h4 className="text-[13px] font-semibold text-white uppercase tracking-[0.08em] mt-8 mb-3">
              Key Applications
            </h4>
            <ul className="space-y-2">
              {product.applications.map((app, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2" />
                  {app}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Key Properties Panel */}
          <motion.div
            className="lg:w-[45%]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <KeyPropertiesPanel properties={product.keyProperties} />
          </motion.div>
        </div>

        {/* Photography strip */}
        {product.images?.hero && (
          <div className="mt-12 aspect-[21/9] overflow-hidden rounded-lg bg-slate-100">
            <img
              src={product.images.hero}
              alt={`${product.name} product photograph`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}

