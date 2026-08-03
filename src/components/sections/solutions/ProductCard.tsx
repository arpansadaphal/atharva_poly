'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Hexagon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductDetail } from '@/types/solutions'

interface ProductCardProps {
  product: ProductDetail
  variant?: 'default' | 'compact'
  showCategory?: boolean
  className?: string
}

export default function ProductCard({
  product,
  variant = 'default',
  showCategory = true,
  className,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const isCompact = variant === 'compact'

  return (
    <div
      className={cn(
        'product-card bg-white border border-slate-200 rounded-xl overflow-hidden relative group',
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top border animation */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-blue-600 z-10"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : 0 }}
        transition={{ duration: 0.2, ease: 'linear' }}
        aria-hidden="true"
      />

      {/* Image area */}
      <div className="aspect-[16/10] bg-slate-900 flex items-center justify-center relative overflow-hidden">
        {product.images?.card ? (
          <img
            src={product.images.card}
            alt={`${product.name} — ${product.shortDescription}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-600">
            <Hexagon className="w-8 h-8" />
            <span className="text-[12px] mt-2">{product.name}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {showCategory && (
          <span className="text-[12px] font-semibold text-blue-600 uppercase tracking-[0.08em] bg-blue-50 px-3 py-1 rounded-full inline-block">
            {product.category.replace(/-/g, ' ')}
          </span>
        )}

        <h3 className="text-[18px] font-semibold text-slate-900 mt-3">{product.name}</h3>

        <p className="text-[14px] text-slate-500 leading-6 mt-2 line-clamp-2">
          {product.shortDescription}
        </p>

        {!isCompact && product.keyProperties && product.keyProperties.length > 0 && (
          <>
            <hr className="border-t border-slate-100 my-4" />
            <div className="flex flex-wrap gap-2 mb-3">
              {product.keyProperties.slice(0, 3).map((prop, i) => (
                <span
                  key={i}
                  className="bg-slate-50 text-[12px] font-medium rounded px-2.5 py-1 text-slate-600"
                  title={prop.label}
                >
                  {prop.value}
                  {prop.unit ? ` ${prop.unit}` : ''}
                </span>
              ))}
            </div>

            {product.industries && product.industries.length > 0 && (
              <div className="flex flex-wrap gap-3 text-[11px] text-slate-500 mb-2">
                {product.industries.slice(0, 3).map((ind) => (
                  <span key={ind} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    {ind.charAt(0).toUpperCase() + ind.slice(1).replace(/-/g, ' ')}
                  </span>
                ))}
                {product.industries.length > 3 && (
                  <span className="text-slate-400">+{product.industries.length - 3} more</span>
                )}
              </div>
            )}

            <hr className="border-t border-slate-100 my-4" />
          </>
        )}

        {/* CTA row */}
        <div className="flex items-center justify-between mt-3">
          <Link
            href={`/solutions/${product.slug}`}
            className="text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
            aria-label={`View specifications for ${product.name}`}
          >
            View Specifications →
          </Link>
          {!isCompact && (
            <Link
              href={`/contact?product=${product.slug}&inquiry=quote`}
              className="text-[13px] text-slate-400 hover:text-blue-600 transition-colors font-medium"
              aria-label={`Request a quote for ${product.name}`}
            >
              Request Quote
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}