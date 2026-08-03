'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder'
import { staggerContainer, staggerItem, ease } from '@/lib/animations'
import { products as allSolutions } from '@/lib/solutions-data' // ← actual export is 'products'
import type { ProductDetail as Solution } from '@/types/solutions'   // ← actual type
import Link from 'next/link'

// Card image entrance scale — Specification Mark entrance at photography scale
const cardImageReveal = {
  hidden: { scale: 1.02 },
  visible: { scale: 1, transition: { duration: 0.8, ease } },
}

// Take featured solutions (or first 3 if none)
const featuredSolutions = allSolutions.filter((s) => s.featured)
const displaySolutions =
  featuredSolutions.length >= 3 ? featuredSolutions.slice(0, 3) : allSolutions.slice(0, 3)

function SolutionCard({ solution }: { solution: Solution }) {
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
        {solution.images?.card ? (
          <img
            src={solution.images.card}
            alt={`${solution.name} solution photograph`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <PhotoPlaceholder
            label="Solution photography — dark background, polymer application"
            className="absolute inset-0 w-full h-full"
          />
        )}
      </motion.div>

      {/* Card body */}
      <div className="p-5 md:p-6">
        <p className="text-[13px] font-semibold text-blue-600 uppercase tracking-[0.08em] mb-2">
          {solution.category.replace(/-/g, ' ')}
        </p>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{solution.name}</h3>
        <p className="text-[15px] leading-6 text-slate-500 mb-4 line-clamp-2">
          {solution.shortDescription}
        </p>

        {/* Per-card CTA */}
        <Link
          href={`/solutions/${solution.slug}`}
          className="flex items-center gap-1 text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
          aria-label={`View details for ${solution.name}`}
        >
          View Details <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default function SolutionsCategories() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      aria-label="Solutions Portfolio"
      className="bg-white section-padding"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="flex-1">
            <SectionHeader
              eyebrow="Polymer Solutions"
              headline="Tailored Polymer Solutions for Your Industry"
              theme="light"
            />
          </div>
          <Button
            variant="secondary"
            size="md"
            href="/solutions"
            aria-label="View all solutions"
            className="w-full sm:w-auto !text-gray-700 hover:!text-blue-800"
          >
            View All Solutions
          </Button>
        </div>

        {/* Solution grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {displaySolutions.map((solution) => (
            <motion.div key={solution.slug} variants={staggerItem}>
              <SolutionCard solution={solution} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}