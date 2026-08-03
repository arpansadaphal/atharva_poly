'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '@/components/sections/products/PageHero'
import FilterTabs from '@/components/ui/FilterTabs'
import ProductCard from '@/components/sections/products/ProductCard'
import InquiryBanner from '@/components/ui/InquiryBanner'
import { Button } from '@/components/ui/Button'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
import { products, getProductsByIndustry } from '@/lib/products-data'
import { Refrigerator, Car, Armchair, Factory, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

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

const ITEMS_PER_PAGE = 6

export default function ProductsPage() {
  const [activeIndustry, setActiveIndustry] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFullCatalog, setMobileFullCatalog] = useState(false)

  const filtered = getProductsByIndustry(activeIndustry)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const page = Math.min(currentPage, totalPages || 1)
  const paginatedProducts = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleIndustryChange = (industry: string) => {
    setActiveIndustry(industry)
    setCurrentPage(1)
  }

  // One unique product per category for the mobile preview (avoid duplicates by using a set)
  const pickedSlugs = new Set<string>()
  const mobileCategoryProducts = industryQuickLinks
    .map(({ key }) => {
      const product = products.find((p) => p.industries.includes(key) && !pickedSlugs.has(p.slug))
      if (product) pickedSlugs.add(product.slug)
      return product ? { ...product, categoryKey: key } : null
    })
    .filter(Boolean) as (typeof products[0] & { categoryKey: string })[]

  const renderProductGrid = (items: typeof filtered, showPagination = true) => (
    <>
      {items.length === 0 ? (
        <div className="bg-slate-50 rounded-xl p-16 text-center">
          <p className="text-slate-600 font-semibold">No products in this category yet.</p>
          <Button variant="primary" href="/contact" className="mt-4">Contact Technical Team</Button>
        </div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            key={`${activeIndustry}-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((product, i) => (
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

          {showPagination && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg text-[14px] font-medium transition ${
                    pageNum === page
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  )

  return (
    <>
      <PageHero
        eyebrow="PRODUCT CATALOGUE"
        headline="Precision‑Moulded Components for Global Brands"
        description="Caps, enclosures, and structural parts manufactured at our MIDC Ranjangaon facility for appliance, automotive, furniture, and industrial sectors."
      />

      {/* ========== MOBILE VIEW ========== */}
      <section className="bg-white section-padding block md:hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          {!mobileFullCatalog ? (
            <>
              {/* Category preview */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
                <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
                  PRODUCTS BY CATEGORY
                </span>
              </div>
              <h2 className="font-normal text-4xl text-slate-900 mb-10">Explore Our Core Components</h2>

              <div className="grid grid-cols-1 gap-6">
                {mobileCategoryProducts.map((product) => (
                  <ProductCard key={`${product.slug}-${product.categoryKey}`} product={product} />
                ))}
              </div>

              <div className="text-center mt-10">
                <Button
                  variant="outline"
                  onClick={() => setMobileFullCatalog(true)}
                >
                  View Full Catalogue
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Full catalog on mobile */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setMobileFullCatalog(false)}
                  className="flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to categories
                </button>
              </div>

              <FilterTabs
                tabs={filterTabs}
                activeTab={activeIndustry}
                onChange={handleIndustryChange}
              />

              <p className="text-[13px] text-slate-400 mb-6">
                Showing{' '}
                <span className="font-medium text-slate-600">
                  {filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
                </span>{' '}
                of <span className="font-medium text-slate-600">{filtered.length}</span> products
                {activeIndustry !== 'all' && ` in ${activeIndustry.replace('-', ' ')}`}
              </p>

              {renderProductGrid(paginatedProducts, true)}
            </>
          )}
        </div>
      </section>

      {/* ========== DESKTOP VIEW ========== */}
      <section className="bg-white section-padding hidden md:block">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <FilterTabs
            tabs={filterTabs}
            activeTab={activeIndustry}
            onChange={handleIndustryChange}
          />

          <p className="text-[13px] text-slate-400 mb-8">
            Showing{' '}
            <span className="font-medium text-slate-600">
              {filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)}
            </span>{' '}
            of <span className="font-medium text-slate-600">{filtered.length}</span> products
            {activeIndustry !== 'all' && ` in ${activeIndustry.replace('-', ' ')}`}
          </p>

          {renderProductGrid(paginatedProducts, true)}
        </div>
      </section>

      {/* Industry Quick Links */}
      <section className="bg-slate-50 section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
              FIND PRODUCTS BY INDUSTRY
            </span>
          </div>
          <h2 className="font-normal text-4xl text-slate-900 mb-12">See What We Make for Your Sector</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryQuickLinks.map(({ key, label, icon: Icon }) => {
              const count = products.filter((p) => p.industries.includes(key)).length
              return (
                <button
                  key={key}
                  onClick={() => {
                    handleIndustryChange(key)
                    // If on mobile and in full catalog, keep the view; otherwise auto-switch to full catalog
                    if (!mobileFullCatalog) setMobileFullCatalog(true)
                  }}
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

      <section className="bg-slate-900 section-padding relative">
        <NoiseOverlay />
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <h2 className="font-[300] text-[36px] lg:text-[48px] text-white">Start Your Next Production Run</h2>
          <p className="text-slate-400 text-[17px] mt-4 max-w-[520px] mx-auto">
            Get a quote for the quantities you need. We respond within 2 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="primary" size="lg" href="/contact">
              Request a Quotation
            </Button>
            <a
              href="#"
              className="inline-flex items-center justify-center h-14 px-8 text-white font-medium rounded-lg border border-slate-600 hover:border-slate-400 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}