// 'use client'

// import { useRef } from 'react'
// import { motion, useInView, useReducedMotion } from 'framer-motion'
// import Link from 'next/link'
// import { ArrowRight } from 'lucide-react'
// import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
// import { SectionHeader }from '@/components/ui/SectionHeader'
// import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder'
// import { dividerDraw, photoReveal, staggerContainer, staggerItem, ease } from '@/lib/animations'

// // ⚠ Replace with data.ts entry when content pipeline is established
// const capabilityStatements = [
//   'Single precision facility in MIDC Ranjangaon, Pune',
//   'Controlled manufacturing processes from raw material to finished product',
//   'Consistent quality standards across every production batch',
// ]

// export default function ManufacturingQuality() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const inView = useInView(sectionRef, { once: true, margin: '-80px 0px' })
//   const prefersReducedMotion = useReducedMotion()

//   // Resolved photo variant — removes scale transform for reduced motion
//   const resolvedPhotoReveal = prefersReducedMotion
//     ? {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { duration: 0.3 } },
//       }
//     : photoReveal

//   // Resolved divider variant — removes scaleY for reduced motion
//   const resolvedDividerDraw = prefersReducedMotion
//     ? {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { duration: 0.3 } },
//       }
//     : dividerDraw

//   return (
//     <section
//       ref={sectionRef}
//       aria-label="Manufacturing and Quality"
//       className="flex flex-col lg:flex-row min-h-[640px]"
//     >
//       {/* ── Dark content column ─────────────────────────────────────────── */}
//       <div className="relative overflow-hidden bg-slate-900 w-full lg:w-1/2">
//         <NoiseOverlay />

//         {/*
//           Mobile:  standard padding, full-width content
//           Desktop: max-w-lg ml-auto — right-aligns content against the divider
//         */}
//         <div className="px-6 py-16 lg:max-w-lg lg:ml-auto lg:px-8 xl:px-16 lg:py-20">

//           <SectionHeader
//             eyebrow="MANUFACTURING & QUALITY"
//             headline="Precision Engineering at Every Stage of Production"
//             theme="dark"
//             align="left"
//           />

//           {/* Capability statements */}
//           <motion.div
//             className="flex flex-col gap-4 mt-8"
//             variants={staggerContainer}
//             initial="hidden"
//             animate={inView ? 'visible' : 'hidden'}
//           >
//             {capabilityStatements.map((statement, index) => (
//               <motion.div
//                 key={index}
//                 className="flex items-start gap-3"
//                 variants={staggerItem}
//               >
//                 <span
//                   aria-hidden="true"
//                   className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"
//                 />
//                 <p className="text-base text-slate-400 leading-6">{statement}</p>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Key metric — Signature Device 3 */}
//           <motion.div
//             className="mt-10"
//             initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
//             transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, ease, delay: prefersReducedMotion ? 0 : 0.6 }}
//           >
//             <div
//               className="text-white leading-none text-[52px] lg:text-[72px]"
//               style={{ fontWeight: 200 }}
//             >
//               1
//             </div>
//             <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.1em] mt-2">
//               MANUFACTURING FACILITY
//             </p>
//             <p className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.08em]">
//               MIDC Ranjangaon, Pune
//             </p>
//           </motion.div>

//           {/* CTA link */}
//           <motion.div
//             className="mt-8"
//             initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
//             transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, ease, delay: prefersReducedMotion ? 0 : 0.75 }}
//           >
//             <Link
//               href="/manufacturing"
//               className="
//                 text-[15px] font-medium text-blue-600
//                 flex items-center gap-2
//                 hover:text-blue-400 transition-colors duration-200
//                 focus-visible:outline-none focus-visible:ring-2
//                 focus-visible:ring-blue-600 focus-visible:ring-offset-2
//                 focus-visible:ring-offset-slate-900 rounded-sm
//               "
//             >
//               View Manufacturing Details
//               <ArrowRight className="w-4 h-4" aria-hidden="true" />
//             </Link>
//           </motion.div>

//         </div>
//       </div>

//       {/* ── 1px Blue Vertical Divider — Specification Mark at architectural scale ── */}
//       {/*    Draws top → bottom before photography fully resolves (0.6s vs 0.8s)     */}
//       <motion.div
//         aria-hidden="true"
//         className="w-px bg-blue-600 flex-shrink-0 hidden lg:block"
//         style={{ transformOrigin: 'top' }}
//         variants={resolvedDividerDraw}
//         initial="hidden"
//         animate={inView ? 'visible' : 'hidden'}
//       />

//       {/* ── Mobile: horizontal blue line replaces vertical divider ────────── */}
//       <div aria-hidden="true" className="lg:hidden" style={{ height: 1 }}>
//         <motion.div
//           className="h-full w-full bg-blue-600"
//           style={{ transformOrigin: 'left' }}
//           initial={{ scaleX: 0 }}
//           animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
//           transition={{
//             duration: prefersReducedMotion ? 0.1 : 0.4,
//             ease,
//           }}
//         />
//       </div>

//       {/* ── Photography column ───────────────────────────────────────────── */}
//       {/*    Fills right half to viewport edge — no overlay, no gradient      */}
//       <motion.div
//         className="relative overflow-hidden flex-1 h-[280px] lg:h-auto"
//         variants={resolvedPhotoReveal}
//         initial="hidden"
//         animate={inView ? 'visible' : 'hidden'}
//       >
//         {/* ⚠ Replace with next/image when client factory photography is received.
//               Required shot: wide production floor, elevated angle, active machinery
//               in operation. Full colour. No overlay or creative treatment.
//               alt="Atharva Polymers production floor, MIDC Ranjangaon — machinery in active operation" */}
//         <PhotoPlaceholder
//           label="⚠ Factory photography — wide production floor shot, elevated angle, active machinery in operation. Full colour, no overlay."
//           className="absolute inset-0 w-full h-full"
//         />
//       </motion.div>
//     </section>
//   )
// }


'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image' // ← Add this import
import { ArrowRight } from 'lucide-react'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionHeader }from '@/components/ui/SectionHeader'
// Remove: import { PhotoPlaceholder } from '@/components/ui/PhotoPlaceholder'
import { dividerDraw, photoReveal, staggerContainer, staggerItem, ease } from '@/lib/animations'

// ⚠ Replace with data.ts entry when content pipeline is established
const capabilityStatements = [
  'Single precision facility in MIDC Ranjangaon, Pune',
  'Controlled manufacturing processes from raw material to finished product',
  'Consistent quality standards across every production batch',
]

export default function ManufacturingQuality() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px 0px' })
  const prefersReducedMotion = useReducedMotion()

  // Resolved photo variant — removes scale transform for reduced motion
  const resolvedPhotoReveal = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : photoReveal

  // Resolved divider variant — removes scaleY for reduced motion
  const resolvedDividerDraw = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : dividerDraw

  return (
    <section
      ref={sectionRef}
      aria-label="Manufacturing and Quality"
      className="flex flex-col lg:flex-row min-h-[640px]"
    >
      {/* ── Dark content column ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-900 w-full lg:w-1/2">
        <NoiseOverlay />

        {/*
          Mobile:  standard padding, full-width content
          Desktop: max-w-lg ml-auto — right-aligns content against the divider
        */}
        <div className="px-6 py-16 lg:max-w-lg lg:ml-auto lg:px-8 xl:px-16 lg:py-20">

          <SectionHeader
            eyebrow="MANUFACTURING & QUALITY"
            headline="Precision Engineering at Every Stage of Production"
            theme="dark"
            align="left"
          />

          {/* Capability statements */}
          <motion.div
            className="flex flex-col gap-4 mt-8"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {capabilityStatements.map((statement, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                variants={staggerItem}
              >
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"
                />
                <p className="text-base text-slate-400 leading-6">{statement}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Key metric — Signature Device 3 */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, ease, delay: prefersReducedMotion ? 0 : 0.6 }}
          >
            <div
              className="text-white leading-none text-[52px] lg:text-[72px]"
              style={{ fontWeight: 200 }}
            >
              1
            </div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.1em] mt-2">
              MANUFACTURING FACILITY
            </p>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.08em]">
              MIDC Ranjangaon, Pune
            </p>
          </motion.div>

          {/* CTA link */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, ease, delay: prefersReducedMotion ? 0 : 0.75 }}
          >
            <Link
              href="/manufacturing"
              className="
                text-[15px] font-medium text-blue-600
                flex items-center gap-2
                hover:text-blue-400 transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-blue-600 focus-visible:ring-offset-2
                focus-visible:ring-offset-slate-900 rounded-sm
              "
            >
              View Manufacturing Details
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── 1px Blue Vertical Divider — Specification Mark at architectural scale ── */}
      {/*    Draws top → bottom before photography fully resolves (0.6s vs 0.8s)     */}
      <motion.div
        aria-hidden="true"
        className="w-px bg-blue-600 flex-shrink-0 hidden lg:block"
        style={{ transformOrigin: 'top' }}
        variants={resolvedDividerDraw}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      />

      {/* ── Mobile: horizontal blue line replaces vertical divider ────────── */}
      <div aria-hidden="true" className="lg:hidden" style={{ height: 1 }}>
        <motion.div
          className="h-full w-full bg-blue-600"
          style={{ transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.1 : 0.4,
            ease,
          }}
        />
      </div>

      {/* ── Photography column ───────────────────────────────────────────── */}
      {/*    Fills right half to viewport edge — no overlay, no gradient      */}
      <motion.div
        className="relative overflow-hidden flex-1 h-[280px] lg:h-auto"
        variants={resolvedPhotoReveal}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Replace with actual image */}
        <Image
          src="/assets/homepage/manufacturing/production-floor.jpg"
          alt="Atharva Polymers production floor, MIDC Ranjangaon — machinery in active operation"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
          priority={false} // Set to true if this is above the fold
        />
      </motion.div>
    </section>
  )
}