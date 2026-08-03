'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder'
import { staggerContainer, staggerItem, ease } from '@/lib/animations'
import { products as allProducts } from '@/lib/products-data' // ← the real product data
import type { Product } from '@/types/products'

// Card image entrance scale — Specification Mark entrance at photography scale
const cardImageReveal = {
  hidden: { scale: 1.02 },
  visible: { scale: 1, transition: { duration: 0.8, ease } },
}

// Take featured products (or first 3 if none)
const featuredProducts = allProducts.filter((p) => p.featured)
const displayProducts = featuredProducts.length >= 3
  ? featuredProducts.slice(0, 3)
  : allProducts.slice(0, 3)

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="relative border border-slate-200 rounded-xl overflow-hidden bg-white transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => {
        setHovered(true)
        setTimeout(() => setHovered(false), 1000)
      }}
    >
      {/* Horizontal top-border sweep */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[3px] bg-blue-600 z-10"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : 0 }}
        transition={{ duration: 0.2, ease: 'linear' }}
      />

      {/* Photography */}
      <motion.div
        className="aspect-[16/10] w-full relative overflow-hidden"
        variants={cardImageReveal}
      >
        {product.images?.card ? (
          <img
            src={product.images.card}
            alt={`${product.name} product photograph`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <PhotoPlaceholder
            label="Product photography — dark background, polymer granules or components"
            className="absolute inset-0 w-full h-full"
          />
        )}
      </motion.div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        <p className="text-[13px] font-semibold text-blue-600 uppercase tracking-[0.08em] mb-2">
  {product.industries[0]?.replace(/-/g, ' ') || 'Product'}
</p>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{product.name}</h3>
        <p className="text-[15px] leading-6 text-slate-500 mb-4 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Industry tags */}
        <div className="flex flex-wrap gap-2 mb-5" role="list">
          {product.industries.slice(0, 3).map((ind) => (
            <span
              key={ind}
              role="listitem"
              className="bg-slate-50 text-slate-600 text-[12px] font-medium rounded px-2 py-1 uppercase tracking-[0.05em]"
            >
              {ind.replace(/-/g, ' ')}
            </span>
          ))}
          {product.industries.length > 3 && (
            <span className="bg-slate-50 text-slate-400 text-[12px] font-medium rounded px-2 py-1">
              +{product.industries.length - 3} more
            </span>
          )}
        </div>

        {/* Per-card CTA — now links to the product's dedicated page */}
        <a
          href={`/products/${product.slug}`}
          className="flex items-center gap-1 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
          aria-label={`View details for ${product.name}`}
        >
          View Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default function ProductCategories() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      aria-label="Product Portfolio"
      className="bg-white section-padding"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="flex-1">
            <SectionHeader
              eyebrow="Product Portfolio"
              headline="Precision Polymer Solutions for Industrial Applications"
              theme="light"
            />
          </div>
          <Button
            variant="secondary"
            size="md"
            href="/products"
            aria-label="View all products"
            className="w-full sm:w-auto !text-gray-700 hover:!text-blue-800"
          >
            View All Products
          </Button>
        </div>

        {/* Product grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {displayProducts.map((product) => (
            <motion.div key={product.slug} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}