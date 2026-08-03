'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import DownloadItem from '@/components/ui/DownloadItem'
import type { ProductDetail } from '@/types/solutions'

interface ProductDownloadsProps {
  product: ProductDetail
}

export default function ProductDownloads({ product }: ProductDownloadsProps) {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
            DOCUMENTATION
          </span>
        </div>
        <h2 className="font-normal text-4xl text-slate-900 mb-10">Technical Resources</h2>

        {product.downloads.length > 0 ? (
          product.downloads.map((dl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <DownloadItem download={dl} />
            </motion.div>
          ))
        ) : (
          <div>
            <p className="text-[15px] text-slate-500">
              Technical documentation for this product is available on request.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center mt-4 px-5 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors text-[14px]"
            >
              Request Documentation
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}