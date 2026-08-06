// 'use client'

// import { motion, useReducedMotion } from 'framer-motion'
// import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
// import { Button } from '@/components/ui/Button'
// import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder'
// import { cn } from '@/lib/utils'
// import { hero, metrics } from '@/lib/data'

// // Primary easing — mirrors ease constant in animations.ts
// const E = [0.22, 1, 0.36, 1] as const

// // Delays in seconds (converted from spec ms values)
// const D = {
//   specMark:    0,
//   eyebrow:     0.3,
//   headline:    [0.25, 0.38, 0.49] as const,
//   description: 0.6,
//   ctaPrimary:  0.76,
//   ctaSecondary:0.84,
//   trust:       [0.95, 1.03, 1.11, 1.19] as const,
//   photo:       0,
// } as const

// /**
//  * Hero — the most important section on the site.
//  *
//  * Design rules (03_HERO_SECTION.md):
//  * - bg-slate-900 + NoiseOverlay (Signature Device 2)
//  * - Asymmetric 55/45 split desktop: content left, photography absolute right
//  * - Photography bleeds to right viewport edge — no container box, no border
//  * - Gradient join (160px): from-slate-900 to-transparent over photo left edge
//  * - Motion triggers on MOUNT (not scroll) — 1.4s total sequence
//  * - Headline: font-[300] (Inter Light), 64px desktop / 40px mobile
//  * - Supporting text: text-slate-400 — NOT white (3-layer tonal hierarchy)
//  * - Trust row: horizontal desktop, 2×2 grid mobile
//  * - CTA: inline desktop, stacked mobile
//  * - Reduced motion: opacity-only fade at 300ms, no stagger, no scale
//  *
//  * Photography swap: replace <PhotoPlaceholder> with:
//  *   <Image src={hero.image.src} alt={hero.image.alt} fill priority
//  *     sizes="(max-width: 1024px) 100vw, 45vw"
//  *     className="object-cover object-center" />
//  */
// export function Hero() {
//   const reduced = useReducedMotion()

//   // Unified transition factory. Reduced motion → no delay, 0.3s opacity only.
//   const t = (delay: number, duration: number) => ({
//     duration: reduced ? 0.3 : duration,
//     delay:    reduced ? 0   : delay,
//     ease:     E,
//   })

//   // Initial state factory. Reduced motion → only opacity hidden (no translate/scale).
//   const fromY  = (y: number)     => reduced ? { opacity: 0 }          : { opacity: 0, y }
//   const fromX  = (x: number)     => reduced ? { opacity: 0 }          : { opacity: 0, x }
//   const fromSY = (scaleY: number)=> reduced ? { opacity: 0 }          : { scaleY }
//   const fromS  = (scale: number) => reduced ? { opacity: 0 }          : { opacity: 0, scale }
//   const toVisible                 = reduced ? { opacity: 1 }          : { opacity: 1, y: 0, x: 0, scaleY: 1, scale: 1 }

//   return (
//     <section
//       className="relative bg-slate-900 overflow-hidden lg:min-h-screen"
//       aria-label="Hero"
//     >
//       {/* ── Signature Device 2: Material Surface Depth ─────────────────── */}
//       <NoiseOverlay />

//       {/* ────────────────────────────────────────────────────────────────────
//           Desktop Photography
//           - absolute top-0 right-0, fills 45% of viewport width
//           - bleeds past the 1280px container to the right edge
//           - NOT inside the max-width container — intentional
//           ──────────────────────────────────────────────────────────────── */}
//       <div
//         className="hidden lg:block absolute top-0 right-0 h-full"
//         style={{ width: '45%' }}
//       >
//         {/* Gradient join — photo dissolves into dark background, no hard edge */}
//         <div
//           aria-hidden="true"
//           className="absolute top-0 left-0 h-full z-10 pointer-events-none"
//           style={{
//             width: 160,
//             background: 'linear-gradient(to right, #0F172A, transparent)',
//           }}
//         />

//         {/* Photography
//             ⚠ Replace PhotoPlaceholder with:
//             <motion.div
//               className="w-full h-full"
//               initial={fromS(1.04)}
//               animate={toVisible}
//               transition={t(D.photo, 1.2)}
//             >
//               <Image
//                 src={hero.image.src}
//                 alt={hero.image.alt}
//                 fill
//                 priority
//                 sizes="(max-width: 1024px) 100vw, 45vw"
//                 className="object-cover object-center"
//               />
//             </motion.div>
//             when client photography is received.
//         */}
//         <motion.div
//           className="w-full h-full"
//           initial={fromS(reduced ? 1 : 1.04)}
//           animate={toVisible}
//           transition={t(D.photo, 1.2)}
//         >
//           <PhotoPlaceholder
//             label="Factory production floor — wide shot, elevated angle, active machinery, full colour, human presence visible"
//             className="w-full h-full"
//           />
//         </motion.div>
//       </div>

//       {/* ────────────────────────────────────────────────────────────────────
//           Content Column
//           - Desktop: lg:w-[58%], min-h-screen, flex, vertically centered
//           - pt-[72px] desktop clears the fixed navbar
//           - pt-32 mobile gives navbar clearance + breathing room
//           ──────────────────────────────────────────────────────────────── */}
//       <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full">
//         <div
//           className={cn(
//             'pt-32 pb-16',
//             'lg:w-[58%] lg:min-h-screen lg:flex lg:flex-col lg:justify-center',
//             'lg:pt-[72px] lg:pb-24'
//           )}
//         >

//           {/* ── Specification Mark + Eyebrow ────────────────────────────── */}
//           <div className="flex items-center gap-3 mb-6">

//             {/* Specification Mark — 2px blue line, draws top→bottom first
//             <motion.div
//               className="w-0.5 bg-blue-600 flex-shrink-0"
//               style={{ height: 16, transformOrigin: 'top' }}
//               initial={fromSY(0)}
//               animate={{ scaleY: 1, opacity: 1 }}
//               transition={t(D.specMark, 0.25)}
//             /> */}

//             {/* Eyebrow — follows mark, slides in from left */}
//             {/* <motion.span
//               className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]"
//               initial={fromX(-4)}
//               animate={toVisible}
//               transition={t(D.eyebrow, 0.2)}
//             >
//               {hero.eyebrow}
//             </motion.span> */}
//           </div>

//           {/* ── Headline — Inter Light (font-[300]), 64px desktop ───────── */}
//           {/*  NEVER bold, NEVER regular. Light at large scale = quiet authority */}
//           <h1 className="mb-6">
//             {[hero.headline.line1, hero.headline.line2, hero.headline.line3].map(
//               (line, i) => (
//                 <motion.span
//                   key={line}
//                   className={cn(
//                     'block text-white font-[300]',
//                     'text-[40px] leading-[1.15]',
//                     'lg:text-[64px] lg:leading-[1.08]'
//                   )}
//                   initial={fromY(16)}
//                   animate={toVisible}
//                   transition={t(D.headline[i], 0.4)}
//                 >
//                   {line}
//                 </motion.span>
//               )
//             )}
//           </h1>

//           {/* ── Supporting Statement — slate-400, NOT white ─────────────── */}
//           {/* Gray creates the 3-layer tonal hierarchy: white > gray > dark bg */}
//           <motion.p
//             className="text-lg text-slate-400 leading-[1.75] max-w-[480px] mb-10"
//             initial={fromY(12)}
//             animate={toVisible}
//             transition={t(D.description, 0.35)}
//           >
//             {hero.description}
//           </motion.p>

//           {/* ── CTA Row — stacked on mobile, inline on desktop ──────────── */}
//           <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-5">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={t(D.ctaPrimary, 0.25)}
//             >
//               {/* Primary — only blue element in the hero content area */}
//               <Button
//                 variant="primary"
//                 size="md"
//                 href={hero.primaryCta.href}
//                 className="focus-visible:ring-offset-slate-900"
//               >
//                 {hero.primaryCta.label}
//               </Button>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={t(D.ctaSecondary, 0.2)}
//             >
//               {/* Secondary — gray text link, arrow shifts 2px on hover via Button */}
//               <Button
//                 variant="secondary"
//                 href={hero.secondaryCta.href}
//                 className="focus-visible:ring-offset-slate-900"
//               >
//                 {hero.secondaryCta.label}
//               </Button>
//             </motion.div>
//           </div>

//           {/* ── Trust Indicators Row ─────────────────────────────────────── */}
//           {/* Desktop: horizontal single row with 1px dividers                 */}
//           {/* Mobile: 2×2 grid, no dividers                                    */}
//           <ul
//             role="list"
//             className={cn(
//               'mt-14',
//               'grid grid-cols-2 gap-y-8 gap-x-4',
//               'lg:flex lg:items-center lg:gap-0 lg:grid-cols-none'
//             )}
//           >
//             {metrics.map((metric, i) => (
//               <motion.li
//                 key={metric.label}
//                 className="flex items-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={t(D.trust[i], 0.2)}
//               >
//                 {/* Vertical divider — desktop only, between items (not before first) */}
//                 {i > 0 && (
//                   <div
//                     aria-hidden="true"
//                     className="hidden lg:block w-px h-8 bg-slate-700 mx-6 flex-shrink-0"
//                   />
//                 )}

//                 <div>
//                   <div className="text-xl font-semibold text-white leading-none">
//                     {metric.value}{metric.suffix}
//                   </div>
//                   <div className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.1em] mt-1 leading-none">
//                     {metric.label}
//                   </div>
//                 </div>
//               </motion.li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* ── Mobile Photography — stacked below content, no gradient join ── */}
//       {/*
//           ⚠ Replace PhotoPlaceholder with:
//           <div className="lg:hidden relative h-[280px]">
//             <Image
//               src={hero.image.src}
//               alt={hero.image.alt}
//               fill
//               priority
//               sizes="100vw"
//               className="object-cover object-center"
//             />
//           </div>
//           when client photography is received.
//       */}
//       <div className="lg:hidden h-[280px]">
//         <PhotoPlaceholder
//           label="Factory production floor — active machinery in operation"
//           className="w-full h-full"
//         />
//       </div>
//     </section>
//   )
// }

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { hero, metrics } from '@/lib/data'

// Primary easing — mirrors ease constant in animations.ts
const E = [0.22, 1, 0.36, 1] as const

// Delays in seconds (converted from spec ms values)
const D = {
  specMark:    0,
  eyebrow:     0.3,
  headline:    [0.25, 0.38, 0.49] as const,
  description: 0.6,
  ctaPrimary:  0.76,
  ctaSecondary:0.84,
  trust:       [0.95, 1.03, 1.11, 1.19] as const,
  photo:       0,
} as const

/**
 * Hero — the most important section on the site.
 *
 * Design rules (03_HERO_SECTION.md):
 * - bg-slate-900 + NoiseOverlay (Signature Device 2)
 * - Asymmetric 55/45 split desktop: content left, photography absolute right
 * - Photography bleeds to right viewport edge — no container box, no border
 * - Gradient join (160px): from-slate-900 to-transparent over photo left edge
 * - Motion triggers on MOUNT (not scroll) — 1.4s total sequence
 * - Headline: font-[300] (Inter Light), 64px desktop / 40px mobile
 * - Supporting text: text-slate-400 — NOT white (3-layer tonal hierarchy)
 * - Trust row: horizontal desktop, 2×2 grid mobile
 * - CTA: inline desktop, stacked mobile
 * - Reduced motion: opacity-only fade at 300ms, no stagger, no scale
 */
export function Hero() {
  const reduced = useReducedMotion()

  // Unified transition factory. Reduced motion → no delay, 0.3s opacity only.
  const t = (delay: number, duration: number) => ({
    duration: reduced ? 0.3 : duration,
    delay:    reduced ? 0   : delay,
    ease:     E,
  })

  // Initial state factory. Reduced motion → only opacity hidden (no translate/scale).
  const fromY  = (y: number)     => reduced ? { opacity: 0 }          : { opacity: 0, y }
  const fromX  = (x: number)     => reduced ? { opacity: 0 }          : { opacity: 0, x }
  const fromSY = (scaleY: number)=> reduced ? { opacity: 0 }          : { scaleY }
  const fromS  = (scale: number) => reduced ? { opacity: 0 }          : { opacity: 0, scale }
  const toVisible                 = reduced ? { opacity: 1 }          : { opacity: 1, y: 0, x: 0, scaleY: 1, scale: 1 }

  return (
    <section
      className="relative bg-slate-900 overflow-hidden lg:min-h-screen"
      aria-label="Hero"
    >
      {/* ── Signature Device 2: Material Surface Depth ─────────────────── */}
      <NoiseOverlay />

      {/* ────────────────────────────────────────────────────────────────────
          Desktop Photography
          - absolute top-0 right-0, fills 45% of viewport width
          - bleeds past the 1280px container to the right edge
          - NOT inside the max-width container — intentional
          ──────────────────────────────────────────────────────────────── */}
      <div
        className="hidden lg:block absolute top-0 right-0 h-full"
        style={{ width: '45%' }}
      >
        {/* Gradient join — photo dissolves into dark background, no hard edge */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-full z-10 pointer-events-none"
          style={{
            width: 160,
            background: 'linear-gradient(to right, #0F172A, transparent)',
          }}
        />

        {/* Photography */}
        <motion.div
          className="w-full h-full relative"
          initial={fromS(reduced ? 1 : 1.04)}
          animate={toVisible}
          transition={t(D.photo, 1.2)}
        >
          <Image
            src="/assets/homepage/hero/hero.jpg"
            alt="Factory production floor — wide shot, elevated angle, active machinery, full colour, human presence visible"
            fill
            priority
            sizes="45vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          Content Column
          - Desktop: lg:w-[58%], min-h-screen, flex, vertically centered
          - pt-[72px] desktop clears the fixed navbar
          - pt-32 mobile gives navbar clearance + breathing room
          ──────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full">
        <div
          className={cn(
            'pt-32 pb-16',
            'lg:w-[58%] lg:min-h-screen lg:flex lg:flex-col lg:justify-center',
            'lg:pt-[72px] lg:pb-24'
          )}
        >

          {/* ── Specification Mark + Eyebrow ────────────────────────────── */}
          <div className="flex items-center gap-3 mb-6">

            {/* Specification Mark — 2px blue line, draws top→bottom first
            <motion.div
              className="w-0.5 bg-blue-600 flex-shrink-0"
              style={{ height: 16, transformOrigin: 'top' }}
              initial={fromSY(0)}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={t(D.specMark, 0.25)}
            /> */}

            {/* Eyebrow — follows mark, slides in from left */}
            {/* <motion.span
              className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]"
              initial={fromX(-4)}
              animate={toVisible}
              transition={t(D.eyebrow, 0.2)}
            >
              {hero.eyebrow}
            </motion.span> */}
          </div>

          {/* ── Headline — Inter Light (font-[300]), 64px desktop ───────── */}
          {/*  NEVER bold, NEVER regular. Light at large scale = quiet authority */}
          <h1 className="mb-6">
            {[hero.headline.line1, hero.headline.line2, hero.headline.line3].map(
              (line, i) => (
                <motion.span
                  key={line}
                  className={cn(
                    'block text-white font-[300]',
                    'text-[40px] leading-[1.15]',
                    'lg:text-[64px] lg:leading-[1.08]'
                  )}
                  initial={fromY(16)}
                  animate={toVisible}
                  transition={t(D.headline[i], 0.4)}
                >
                  {line}
                </motion.span>
              )
            )}
          </h1>

          {/* ── Supporting Statement — slate-400, NOT white ─────────────── */}
          {/* Gray creates the 3-layer tonal hierarchy: white > gray > dark bg */}
          <motion.p
            className="text-lg text-slate-400 leading-[1.75] max-w-[480px] mb-10"
            initial={fromY(12)}
            animate={toVisible}
            transition={t(D.description, 0.35)}
          >
            {hero.description}
          </motion.p>

          {/* ── CTA Row — stacked on mobile, inline on desktop ──────────── */}
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={t(D.ctaPrimary, 0.25)}
            >
              {/* Primary — only blue element in the hero content area */}
              <Button
                variant="primary"
                size="md"
                href={hero.primaryCta.href}
                className="focus-visible:ring-offset-slate-900"
              >
                {hero.primaryCta.label}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={t(D.ctaSecondary, 0.2)}
            >
              {/* Secondary — gray text link, arrow shifts 2px on hover via Button */}
              <Button
                variant="secondary"
                href={hero.secondaryCta.href}
                className="focus-visible:ring-offset-slate-900"
              >
                {hero.secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          {/* ── Trust Indicators Row ─────────────────────────────────────── */}
          {/* Desktop: horizontal single row with 1px dividers                 */}
          {/* Mobile: 2×2 grid, no dividers                                    */}
          <ul
            role="list"
            className={cn(
              'mt-14',
              'grid grid-cols-2 gap-y-8 gap-x-4',
              'lg:flex lg:items-center lg:gap-0 lg:grid-cols-none'
            )}
          >
            {metrics.map((metric, i) => (
              <motion.li
                key={metric.label}
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={t(D.trust[i], 0.2)}
              >
                {/* Vertical divider — desktop only, between items (not before first) */}
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:block w-px h-8 bg-slate-700 mx-6 flex-shrink-0"
                  />
                )}

                <div>
                  <div className="text-xl font-semibold text-white leading-none">
                    {metric.value}{metric.suffix}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.1em] mt-1 leading-none">
                    {metric.label}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Mobile Photography — stacked below content, no gradient join ── */}
      <div className="lg:hidden relative w-full h-[280px]">
        <Image
          src="/assets/homepage/hero/hero.jpg"
          alt="Factory production floor — active machinery in operation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  )
}