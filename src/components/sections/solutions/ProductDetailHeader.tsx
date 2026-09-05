'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileDown } from 'lucide-react'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import type { ProductDetail } from '@/types/solutions'

interface ProductDetailHeaderProps {
  product: ProductDetail
}

export default function ProductDetailHeader({ product }: ProductDetailHeaderProps) {
  const catLabel = product.category.replace(/-/g, ' ')
  const catCap = catLabel.charAt(0).toUpperCase() + catLabel.slice(1)
  const hasDatasheet = product.downloads?.some((d) => d.type === 'datasheet')
  const datasheetDownload = hasDatasheet ? product.downloads.find((d) => d.type === 'datasheet') : null

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: catCap, href: `/products?category=${product.category}` },
    { label: product.name },
  ]

  return (
    <section className="bg-slate-900 pt-32 pb-16 relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <BreadcrumbNav items={breadcrumbItems} theme="dark" />
        </motion.div>

        <motion.span
          className="text-[12px] font-semibold text-blue-400 uppercase tracking-[0.08em] bg-blue-900/40 px-3 py-1 rounded-full inline-flex mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {catCap}
        </motion.span>

        <motion.h1
          className="font-[300] text-[36px] lg:text-[48px] text-white mt-3 leading-[1.1]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {product.name}
        </motion.h1>

        <motion.p
          className="text-[18px] text-slate-300 max-w-[580px] mt-4 leading-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3 }}
        >
          {product.tagline}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          <Link
            href={`/contact?product=${product.slug}&inquiry=quote`}
            className="inline-flex items-center justify-center h-12 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-[15px]"
          >
            Request a Quotation
          </Link>
          {hasDatasheet && datasheetDownload && (
            <a
              href={datasheetDownload.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center h-12 px-6 border border-slate-500 text-white font-medium rounded-lg hover:border-white hover:text-white transition-colors text-[15px] gap-2"
            >
              <FileDown className="w-4 h-4" /> Download Data Sheet
            </a>
          )}
        </motion.div>

        <motion.p
          className="text-[13px] text-slate-400 mt-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block ${
              product.inStock ? 'bg-green-500' : 'bg-amber-500'
            }`}
          />
          {product.inStock
            ? 'Available for sampling and bulk order'
            : 'Available on request — contact for lead time'}
        </motion.p>
      </div>
    </section>
  )
}