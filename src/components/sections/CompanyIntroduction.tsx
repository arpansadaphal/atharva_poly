'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/animations'
import { companyIntro } from '@/lib/data'

/**
 * CompanyIntroduction — first light section. Humanises the brand.
 *
 * Design rules (04_COMPANY_INTRO_SECTION.md):
 * - bg-slate-50 (first warmth after dark hero)
 * - Desktop: col-span-7 content left / col-span-5 photo right, gap-16
 * - Mobile: full-width 16:9 photo ABOVE content (no border radius), outside container
 * - Pull quote: Specification Mark at paragraph scale — blue line stretches to
 *   match blockquote height via flex align-items:stretch (default)
 * - Pull quote: font-[300] text-[28px] leading-[1.4] wrapped in <blockquote>
 * - Body copy constrained to max-w-[540px], text-slate-600, leading-7
 * - Photography: aspect-[4/5] desktop, rounded-sm — NOT zero radius
 * - Inset photo: absolute bottom-right, 240×240, hidden on mobile
 * - Single contentRef for left column — ensures all content animations share
 *   the same viewport trigger for precise stagger coordination
 * - Separate photoRef for right column (may enter viewport slightly later)
 * - All animations scroll-triggered (once:true) — NOT mount-triggered
 *
 * Photography swap: replace each <PhotoPlaceholder> with:
 *   <Image src={...} alt={...} fill className="object-cover object-center" />
 *   and add sizes prop appropriate to the container.
 */
export function CompanyIntroduction() {
  // Single ref for the entire content column — all text animations share
  // one trigger so stagger delays produce the correct sequence relative to entry
  const contentRef = useRef<HTMLDivElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: '-80px 0px' })

  // Separate ref for the photo column — may enter viewport independently
  // on very tall mobile layouts; also structurally separate from content
  const photoRef = useRef<HTMLDivElement>(null)
  const photoInView = useInView(photoRef, { once: true, margin: '-80px 0px' })

  const E = ease

  return (
    <section aria-label="Company Introduction" className="bg-slate-50 overflow-hidden">

      {/* ────────────────────────────────────────────────────────────────────
          Mobile Photography — outside container, full-width 16:9
          No border radius (bleeds to edges). Hidden on desktop.
          Stacks ABOVE content on mobile per spec.
          ──────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden w-full aspect-[16/9]">
        {/*
          ⚠ Replace with:
          <Image
            src={companyIntro.image.src}
            alt={companyIntro.image.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          when client photography is received.
        */}
        <PhotoPlaceholder
          label="Facility interior — quality control process or machine operator, intimate shot, human presence visible"
          className="w-full h-full"
        />
      </div>

      {/* ── Main Container ─────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">

          {/* ────────────────────────────────────────────────────────────────
              Content Column
              - Mobile: py-[72px], full-width
              - Desktop: col-span-7, py-[120px]
              ──────────────────────────────────────────────────────────── */}
          <div
            ref={contentRef}
            className="py-[72px] lg:py-[120px] lg:col-span-7"
          >

            {/* ── Specification Mark + Eyebrow ──────────────────────────── */}
            {/* Inline implementation (not SectionHeader) so the entire content
                column shares one contentRef trigger for precise stagger timing */}
            <div className="flex items-center gap-3 mb-4">

              {/* Specification Mark — 2px blue line, draws top→bottom on entry */}
              <motion.div
                aria-hidden="true"
                className="w-0.5 bg-blue-600 flex-shrink-0"
                style={{ height: 16, transformOrigin: 'top' }}
                initial={{ scaleY: 0 }}
                animate={contentInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.25, ease: E }}
              />

              {/* Eyebrow — follows mark with 300ms delay */}
              <motion.span
                className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em]"
                initial={{ opacity: 0, x: -4 }}
                animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
                transition={{ duration: 0.2, delay: 0.3, ease: E }}
              >
                {companyIntro.eyebrow}
              </motion.span>
            </div>

            {/* ── Headline — font-normal (400), text-4xl ───────────────── */}
            {/* H2: font-normal per design system. Large + regular weight =
                authority without aggression. leading-[1.2] per spec. */}
            <motion.h2
              className="text-4xl font-normal text-slate-900 leading-[1.2]"
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: E }}
            >
              {companyIntro.headline}
            </motion.h2>

            {/* ── Body Paragraphs — stagger 80ms apart ─────────────────── */}
            {/* max-w-[540px] constrains line length to ~68 chars on desktop */}
            <div className="mt-6 max-w-[540px]">
              {companyIntro.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className={cn(
                    'text-base text-slate-600 leading-7',
                    i > 0 && 'mt-5'
                  )}
                  initial={{ opacity: 0, y: 16 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{
                    duration: 0.6,
                    // First paragraph starts after headline; subsequent stagger 80ms
                    delay: 0.58 + i * 0.08,
                    ease: E,
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* ── Pull Quote — Specification Mark at paragraph scale ───── */}
            {/*
              The blue vertical line is the same 2px Signature Device 1 used
              on section eyebrows, but stretched to the full height of the
              blockquote text. Achieved via flex default align-items:stretch —
              the line div has no explicit height; it fills to match blockquote.

              The entire pull quote block fades up as one unit. The blue line
              appears as part of this reveal (no separate scaleY animation —
              the draw animation is reserved for the eyebrow mark above).
            */}
            <motion.div
              className="flex gap-4 mt-10"
              /* Default align-items:stretch means the blue line fills the
                 full height of the blockquote automatically — no extra class needed */
              initial={{ opacity: 0, y: 16 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.84, ease: E }}
            >
              {/* Specification Mark at paragraph scale — no explicit height,
                  flex stretch makes it match the blockquote height */}
              <div
                aria-hidden="true"
                className="w-0.5 bg-blue-600 flex-shrink-0"
              />

              {/* Pull quote — font-[300] (Inter Light) at 28px */}
              <blockquote className="text-[28px] font-[300] text-slate-700 leading-[1.4]">
                {companyIntro.pullQuote}
              </blockquote>
            </motion.div>
          </div>

          {/* ────────────────────────────────────────────────────────────────
              Desktop Photography Column
              - Hidden on mobile (mobile photo handled above, outside container)
              - col-span-5, inset 24px from content column via pl-6
              - Main photo: aspect-[4/5] with rounded-sm (slight radius)
              - Inset photo: 240×240 overlapping at bottom-right
              ──────────────────────────────────────────────────────────── */}
          <div
            ref={photoRef}
            className="hidden lg:block lg:col-span-5 lg:py-[120px] lg:pl-6"
          >
            {/* ── Main Photo — contained frame, aspect-[4/5] ─────────── */}
            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden">

              {/* Photography with scale-in reveal */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={photoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.8, ease: E }}
              >
                {/*
                  ⚠ Replace with:
                  <Image
                    src={companyIntro.image.src}
                    alt={companyIntro.image.alt}
                    fill
                    sizes="(max-width: 1280px) 40vw, 512px"
                    className="object-cover object-center"
                  />
                  when client photography is received.
                */}
                <PhotoPlaceholder
                  label="Facility interior or quality control process — intimate, human presence"
                  className="w-full h-full"
                />
              </motion.div>

              {/* ── Inset Photo — overlaps main photo at bottom-right ─── */}
              {/* border-slate-50 creates a "frame" border matching the bg */}
              <motion.div
                className="absolute bottom-0 right-0 w-60 h-60 border-4 border-slate-50 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  photoInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: 0.8, ease: E }}
              >
                {/*
                  ⚠ Replace with:
                  <Image
                    src={companyIntro.insetImage.src}
                    alt={companyIntro.insetImage.alt}
                    fill
                    sizes="240px"
                    className="object-cover object-center"
                  />
                  when client photography is received.
                */}
                <PhotoPlaceholder
                  label="Product close-up or quality testing detail"
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}