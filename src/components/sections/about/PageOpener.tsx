'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ease, specMark, eyebrowReveal, fadeUp, ruleDraw } from '@/lib/animations'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { aboutPage } from '@/lib/data'

/**
 * PageOpener — editorial chapter opener on dark surface.
 *
 * Uses the site's dark surface (bg-slate-900) with NoiseOverlay per
 * the design system's Signature Device 2 rules.
 *
 * Sequence on viewport entry:
 *   spec mark → eyebrow → chapter label → display numeral → rule →
 *   headline → subhead
 */
export function PageOpener() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const reduced = useReducedMotion()

  const E = ease
  const D = {
    specMark: 0,
    eyebrow: 0.3,
    chapter: 0.45,
    numeral: 0.55,
    rule: 0.85,
    headline: 0.95,
    subhead: 1.15,
  } as const

  const transition = (delay: number, duration: number) => ({
    duration: reduced ? 0.01 : duration,
    delay: reduced ? 0 : delay,
    ease: E,
  })

  return (
    <section
      ref={ref}
      aria-label="About — Atharva Polymers"
      className="relative bg-slate-900 overflow-hidden"
    >
      <NoiseOverlay />

      <div className="max-w-[920px] mx-auto px-6 py-[120px] lg:py-[160px]">

        {/* Eyebrow row — spec mark + label */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            aria-hidden="true"
            className="w-0.5 bg-blue-600 flex-shrink-0"
            style={{ height: 16, transformOrigin: 'top' }}
            variants={specMark}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />
          <motion.span
            className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]"
            variants={eyebrowReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {aboutPage.meta.eyebrow}
         </motion.span>
       </div>

        {/* Chapter label */}
        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-10"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={transition(D.chapter, 0.6)}
        >
          {aboutPage.meta.chapter}
       </motion.p>

        {/* Display numeral — Signature Device 3 in editorial scale */}
        <motion.h2
          className="text-white leading-[0.85] tracking-tight tabular-nums mb-10"
          style={{ fontSize: 'clamp(80px, 12vw, 168px)', fontWeight: 200 }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={transition(D.numeral, 0.8)}
        >
          {aboutPage.meta.yearRange}
       </motion.h2>

        {/* Editorial rule — 1px blue-600 hairline, draws left → right */}
        <motion.div
          aria-hidden="true"
          className="h-px bg-blue-600 mb-12 origin-left"
          style={{ width: 120 }}
          variants={ruleDraw}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        {/* H1 — Inter regular, white on dark */}
        <motion.h1
          className="font-normal text-white leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={transition(D.headline, 0.6)}
        >
          {aboutPage.meta.headline}
       </motion.h1>

        {/* Subhead */}
        <motion.p
          className="text-lg text-slate-400 leading-[1.85] max-w-[640px]"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={transition(D.subhead, 0.6)}
        >
          {aboutPage.meta.subhead}
       </motion.p>
     </div>
   </section>
  )
}

export default PageOpener