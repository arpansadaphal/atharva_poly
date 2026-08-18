'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { Industry } from '@/types/industries'
import type { Product } from '@/types/products'

function CompactProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="service-card-hover bg-white border border-slate-200 rounded-xl overflow-hidden relative group cursor-pointer block"
    >
      {/* Product image or placeholder */}
      <div className="aspect-[16/10] bg-slate-100 flex items-center justify-center overflow-hidden">
        {product.images?.card ? (
          <Image
            src={product.images.card}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-slate-400 text-sm">Product Image</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">
          {product.shortDescription}
        </p>
        <span className="text-[13px] font-medium text-blue-600 mt-3 inline-block">
          View specifications →
        </span>
      </div>
    </Link>
  )
}

export default function IndustryProducts({
  industry,
  products,
}: {
  industry: Industry
  products: Product[]
}) {
  // Hide the section if there are no real products for this industry
  if (!products || products.length === 0) return null

  // Show only the first 3 products
  const visibleProducts = products.slice(0, 3)
  const remainingCount = products.length - visibleProducts.length

  return (
    <section className="bg-slate-50 section-padding" aria-label="Featured components">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="FEATURED COMPONENTS"
          headline={`Parts We Produce for ${industry.name}`}
          theme="light"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px 0px' }}
        >
          {visibleProducts.map((product) => (
            <motion.div key={product.slug} variants={staggerItem}>
              <CompactProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
          <Link
            href={`/products?industry=${industry.slug}`}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700"
          >
            View all {industry.name.toLowerCase()} products →
          </Link>
          {remainingCount > 0 && (
            <span className="text-[13px] text-slate-500">
              +{remainingCount} more {remainingCount === 1 ? 'product' : 'products'} available
            </span>
          )}
        </div>
      </div>
    </section>
  )
}