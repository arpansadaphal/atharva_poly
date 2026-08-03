'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { getRelatedProducts } from '@/lib/products-data'
import type { ProductDetail } from '@/types/products'

interface RelatedProductsProps {
  product: ProductDetail
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  if (!product.relatedProductSlugs || product.relatedProductSlugs.length === 0) return null

  const related = getRelatedProducts(product.relatedProductSlugs)

  if (related.length === 0) return null

  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
            RELATED PRODUCTS
          </span>
        </div>
        <h2 className="font-normal text-4xl text-slate-900 mb-10">You May Also Consider</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} variant="compact" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}