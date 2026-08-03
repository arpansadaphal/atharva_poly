'use client'

import { motion } from 'framer-motion'
import { FileDown } from 'lucide-react'
import SpecificationTable from '@/components/ui/SpecificationTable'
import CertificationsTrust from '@/components/sections/CertificationsTrust'
import Link from 'next/link'
import type { ProductDetail } from '@/types/products'

interface ProductSpecificationsProps {
  product: ProductDetail
}

export default function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const hasDatasheet = product.downloads?.some((d) => d.type === 'datasheet')
  const datasheetDownload = hasDatasheet ? product.downloads.find((d) => d.type === 'datasheet') : null

  return (
    <section className="bg-slate-50 section-padding" id="technical-specs">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
            TECHNICAL SPECIFICATIONS
          </span>
        </div>
        <h2 className="font-normal text-4xl text-slate-900 mb-10">Detailed Technical Data</h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpecificationTable sections={product.technicalSpecs} />
        </motion.div>

        {hasDatasheet && datasheetDownload && (
          <a
            href={datasheetDownload.href}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-6"
          >
            <FileDown className="w-4 h-4" /> Download the full technical data sheet — {datasheetDownload.fileSizeLabel}
          </a>
        )}

        {/* Manufacturing note */}
        <p className="text-[15px] text-slate-600 max-w-[640px] mt-8 pt-8 border-t border-slate-200">
          This product is manufactured at our MIDC Ranjangaon facility under{' '}
          {product.certifications.join(' and ')} quality systems.
          <br />
          <Link
            href="/manufacturing"
            className="text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-2 inline-block"
          >
            Learn more about our manufacturing process →
          </Link>
        </p>

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div className="mt-16">
            <CertificationsTrust certifications={product.certifications} compact />
          </div>
        )}
      </div>
    </section>
  )
}
