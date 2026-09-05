'use client'

import { motion } from 'framer-motion'
import { Car, Package, ShoppingBag, Factory } from 'lucide-react'
import Link from 'next/link'
import type { ProductDetail } from '@/types/solutions'

interface IndustryApplicationMapProps {
  products: ProductDetail[]
}

const INDUSTRY_CONFIG = [
  { key: 'automotive', label: 'Automotive', icon: Car, href: '/industries/automotive' },
  { key: 'packaging', label: 'Packaging', icon: Package, href: '/industries/packaging' },
  { key: 'consumer-goods', label: 'Consumer Goods', icon: ShoppingBag, href: '/industries/consumer-goods' },
  { key: 'industrial', label: 'Industrial Manufacturing', icon: Factory, href: '/industries/industrial' },
] as const

export default function IndustryApplicationMap({ products }: IndustryApplicationMapProps) {
  const getProductsForIndustry = (industry: string) =>
    products.filter((p) => p.industries.includes(industry as any))

  return (
    <section className="bg-slate-50 section-padding" aria-label="Products by Industry">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
            PRODUCTS BY INDUSTRY
          </span>
        </div>
        <h2 className="font-normal text-4xl text-slate-900 mb-12">
          Find the Right Material for Your Application
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 border border-slate-200">
          {INDUSTRY_CONFIG.map((industry, i) => {
            const industryProducts = getProductsForIndustry(industry.key)
            const displayProducts = industryProducts.slice(0, 4)

            return (
              <motion.div
                key={industry.key}
                className={`industry-cell p-7 lg:p-10 cursor-pointer bg-slate-50 ${
                  i % 2 === 0 && i < 2 ? 'sm:border-r' : ''
                } ${i < 2 ? 'border-b' : ''} ${
                  i === 2 ? 'sm:border-r' : ''
                } border-slate-200`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px 0px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <industry.icon className="w-7 h-7 text-blue-600" />
                <h3 className="text-[20px] font-semibold text-slate-900 mt-4">
                  {industry.label}
                </h3>
                <ul className="mt-3 space-y-2">
                  {displayProducts.length === 0 ? (
                    <li className="flex items-center gap-2 text-[14px] text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                      <span>No products listed yet</span>
                    </li>
                  ) : (
                    displayProducts.map((prod) => (
                      <li key={prod.slug} className="flex items-center gap-2 text-[14px] text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        <Link
                          href={`/products/${prod.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {prod.name}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
                <Link
                  href={industry.href}
                  className="inline-block text-[14px] font-medium text-blue-600 mt-4 hover:text-blue-700"
                >
                  View all applications →
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}