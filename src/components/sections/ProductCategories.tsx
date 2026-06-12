'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder'
import { staggerContainer, staggerItem, ease } from '@/lib/animations'

// Card image entrance scale — Specification Mark entrance at photography scale
const cardImageReveal = {
  hidden: { scale: 1.02 },
  visible: { scale: 1, transition: { duration: 0.8, ease } },
}

// ⚠ Placeholder data – awaiting client product catalog
const products = [
  {
    id: '1',
    category: 'Thermoplastics',
    name: 'High-Performance PP Compounds',
    description: 'Versatile polypropylene grades for automotive interior and under‑hood applications.',
    tags: ['Automotive', 'Industrial'],
    image: '/placeholder-1.jpg',
  },
  {
    id: '2',
    category: 'Engineering Polymers',
    name: 'ABS & PC Blends',
    description: 'Durable, impact‑resistant solutions for consumer goods and electronic housings.',
    tags: ['Packaging', 'Consumer'],
    image: '/placeholder-2.jpg',
  },
  {
    id: '3',
    category: 'Specialty Compounds',
    name: 'Custom‑Formulated Masterbatches',
    description: 'Tailored polymer masterbatches for unique performance requirements.',
    tags: ['Industrial', 'Custom'],
    image: '/placeholder-3.jpg',
  },
]

function ProductCard({ product }: { product: typeof products[0] }) {
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
      {/* Horizontal top-border sweep — Specification Mark reinterpreted horizontally */}
      {/* Draws left → right, 200ms linear — measurement mark, not a physical transition */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[3px] bg-blue-600 z-10"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : 0 }}
        transition={{ duration: 0.2, ease: 'linear' }}
      />

      {/* Photography — inherits parent variant state for entrance scale */}
      {/* Replace PhotoPlaceholder with next/image (fill + object-cover) when photography arrives */}
      <motion.div
        className="aspect-[16/10] w-full relative overflow-hidden"
        variants={cardImageReveal}
      >
        {/* <Image
          src={product.image}
          alt={`${product.name} — polymer product sample`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        /> */}
        <PhotoPlaceholder
          label="Product photography — dark background, polymer granules or components"
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        <p className="text-[13px] font-semibold text-blue-600 uppercase tracking-[0.08em] mb-2">
          {product.category}
        </p>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{product.name}</h3>
        <p className="text-[15px] leading-6 text-slate-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Application tags */}
        <div className="flex flex-wrap gap-2 mb-5" role="list">
          {product.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="bg-slate-50 text-slate-600 text-[12px] font-medium rounded px-2 py-1 uppercase tracking-[0.05em]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Per-card CTA */}
        <a
          href={`/products/${product.id}`}
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
      {/* px-6 mobile / px-8 tablet / px-12 desktop — per spec responsive padding table */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">

        {/* Header row — headline left, "View All" right on tablet+; stacked full-width on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="flex-1">
            <SectionHeader
              eyebrow="Product Portfolio"
              headline="Precision Polymer Solutions for Industrial Applications"
              theme="light"
            />
          </div>
          {/* Full-width on mobile, auto-width on sm+ */}
         {/* Before (from your snippet) */}
{/* <Button
  variant="secondary"
  size="md"
  href="/products"
  aria-label="View all products"
  className="w-full sm:w-auto"
>
  View All Products
</Button> */}

{/* After – force a visible colour on light background */}
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

        {/* Product grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {products.map((product) => (
            // staggerItem variant state propagates into ProductCard's nested motion.div
            // (cardImageReveal on photography area) — no explicit animate prop needed on child
            <motion.div key={product.id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}