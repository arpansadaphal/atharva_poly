'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '@/components/sections/products/PageHero'
import FilterTabs from '@/components/ui/FilterTabs'
import ProductCard from '@/components/sections/products/ProductCard'
import InquiryBanner from '@/components/ui/InquiryBanner' // may exist from services
import { Button } from '@/components/ui/Button'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
import { products, getProductsByIndustry } from '@/lib/products-data'
import { Refrigerator, Car, Armchair, Factory } from 'lucide-react'

const filterTabs = [
  { label: 'All', value: 'all' },
  { label: 'Appliances', value: 'appliances' },
  { label: 'Automotive & Off‑Road', value: 'automotive' },
  { label: 'Furniture', value: 'furniture' },
  { label: 'Industrial & Medical', value: 'others' },
]

const industryQuickLinks = [
  { key: 'appliances', label: 'Appliances', icon: Refrigerator },
  { key: 'automotive', label: 'Automotive & Off‑Road', icon: Car },
  { key: 'furniture', label: 'Furniture', icon: Armchair },
  { key: 'others', label: 'Industrial & Medical', icon: Factory },
]

export default function ProductsPage() {
  const [activeIndustry, setActiveIndustry] = useState('all')
  const filtered = getProductsByIndustry(activeIndustry)

  const handleIndustryClick = (industry: string) => {
    setActiveIndustry(industry)
    // Smooth scroll to grid is optional
  }

  return (
    <>
      <PageHero
        eyebrow="PRODUCT CATALOGUE"
        headline="Precision‑Moulded Components for Global Brands"
        description="Caps, enclosures, and structural parts manufactured at our MIDC Ranjangaon facility for appliance, automotive, furniture, and industrial sectors."
      />

      {/* Filter + Grid */}
      <section className="bg-white section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <FilterTabs
            tabs={filterTabs}
            activeTab={activeIndustry}
            onChange={setActiveIndustry}
          />
          <p className="text-[13px] text-slate-400 mb-8">
            Showing <span className="font-medium text-slate-600">{filtered.length}</span> products
            {activeIndustry !== 'all' && ` in ${activeIndustry.replace('-', ' ')}`}
          </p>
          {filtered.length === 0 ? (
            <div className="bg-slate-50 rounded-xl p-16 text-center">
              <p className="text-slate-600 font-semibold">No products in this category yet.</p>
              <Button variant="primary" href="/contact" className="mt-4">Contact Technical Team</Button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px 0px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Industry Quick Links */}
      <section className="bg-slate-50 section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">FIND PRODUCTS BY INDUSTRY</span>
          </div>
          <h2 className="font-normal text-4xl text-slate-900 mb-12">See What We Make for Your Sector</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryQuickLinks.map(({ key, label, icon: Icon }) => {
              const count = products.filter((p) => p.industries.includes(key)).length
              return (
                <button
                  key={key}
                  onClick={() => setActiveIndustry(key)}
                  className="bg-white border border-slate-200 rounded-xl p-6 text-left hover:shadow-md transition-shadow"
                >
                  <Icon className="w-8 h-8 text-blue-600" />
                  <h3 className="text-lg font-semibold mt-3">{label}</h3>
                  <p className="text-sm text-slate-500">{count} products</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <InquiryBanner />

      {/* CTA */}
      <section className="bg-slate-900 section-padding relative">
        <NoiseOverlay />
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <h2 className="font-[300] text-[36px] lg:text-[48px] text-white">Start Your Next Production Run</h2>
          <p className="text-slate-400 text-[17px] mt-4 max-w-[520px] mx-auto">Get a quote for the quantities you need. We respond within 2 business days.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="primary" size="lg" href="/contact">Request a Quotation</Button>
            <a href="#" className="inline-flex items-center justify-center h-14 px-8 text-white font-medium rounded-lg border border-slate-600 hover:border-slate-400 transition-colors">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}