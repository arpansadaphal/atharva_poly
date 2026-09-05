'use client'

import FAQAccordion from '@/components/ui/FAQAccordion'
import type { ProductDetail } from '@/types/products'

interface ProductFAQProps {
  product: ProductDetail
}

export default function ProductFAQ({ product }: ProductFAQProps) {
  if (!product.faq || product.faq.length === 0) return null

  return (
    <section className="bg-slate-50 section-padding">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
            FREQUENTLY ASKED
          </span>
        </div>
        <h2 className="font-normal text-4xl text-slate-900 mb-10">
          Common Questions About This Product
        </h2>
        <FAQAccordion items={product.faq} />
      </div>
    </section>
  )
}