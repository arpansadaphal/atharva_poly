'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FilterTabs from '@/components/ui/FilterTabs'
import ProductCard from '@/components/sections/solutions/ProductCard'
import { Package } from 'lucide-react'
import Link from 'next/link'
import type { ProductDetail } from '@/types/solutions'

interface ProductGridProps {
  products: ProductDetail[]
}

const CATEGORY_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Thermoplastics', value: 'thermoplastics' },
  { label: 'Engineering Polymers', value: 'engineering-polymers' },
  { label: 'Specialty Compounds', value: 'specialty-compounds' },
]

export default function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  const handleCategoryChange = (value: string) => {
    if (value === activeCategory) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveCategory(value)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <FilterTabs
          tabs={CATEGORY_TABS}
          activeTab={activeCategory}
          onChange={handleCategoryChange}
        />

        <p className="text-[13px] text-slate-400 mb-8">
          {activeCategory === 'all'
            ? `Showing ${filtered.length} products`
            : `${filtered.length} ${activeCategory.replace(/-/g, ' ')} products`}
        </p>

        {filtered.length === 0 ? (
          <div className="bg-slate-50 rounded-xl p-16 text-center">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-semibold text-[16px]">
              No products in this category yet.
            </p>
            <p className="text-slate-500 text-[14px] mt-2">
              Contact our technical team to discuss your specific requirements.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Technical Team
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px 0px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}