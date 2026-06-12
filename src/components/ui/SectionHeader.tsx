// 'use client'

// import { useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import { cn } from '@/lib/utils'
// import { ease } from '@/lib/animations'
// import type { SectionHeaderProps } from '@/types'

// /**
//  * SectionHeader — Specification Mark (Signature Device 1) + section intro.
//  *
//  * Every section with an eyebrow label gets this component. No exceptions.
//  *
//  * Animation sequence (from DESIGN_SPECIMEN.md):
//  *   1. Specification Mark draws top → bottom  (250ms)
//  *   2. Eyebrow text fades in                  (+50ms after mark)
//  *   3. Headline fades up                      (+100ms after eyebrow)
//  *   4. Description fades up (if present)      (+50ms after headline)
//  *
//  * @example
//  * <SectionHeader
//  *   eyebrow="Manufacturing & Quality"
//  *   headline="Precision Built Into Every Step"
//  *   description="Supporting description text..."
//  *   theme="dark"
//  *   align="left"
//  * />
//  */
// export function SectionHeader({
//   eyebrow,
//   headline,
//   description,
//   align = 'left',
//   theme = 'light',
//   headingLevel: Heading = 'h2',
//   className,
// }: SectionHeaderProps) {
//   const ref = useRef<HTMLDivElement>(null)
//   const inView = useInView(ref, { once: true, margin: '-80px 0px' })

//   const isCentered = align === 'center'
//   const isDark = theme === 'dark'

//   return (
//     <div
//       ref={ref}
//       className={cn(
//         'flex flex-col',
//         isCentered ? 'items-center text-center' : 'items-start text-left',
//         className
//       )}
//     >
//       {/* ── Eyebrow Row: Specification Mark + Label ─────────────────────── */}
//       <div className={cn('flex items-center gap-3 mb-4', isCentered && 'justify-center')}>

//         {/* Specification Mark — 2px vertical blue line, draws top→bottom */}
//         <motion.div
//           className="w-0.5 bg-blue-600 flex-shrink-0"
//           style={{ height: 16, transformOrigin: 'top' }}
//           initial={{ scaleY: 0 }}
//           animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
//           transition={{ duration: 0.25, ease }}
//         />

//         {/* Eyebrow label — always uppercase, always tracked */}
//         <motion.span
//           className={cn(
//             'text-[11px] font-semibold uppercase tracking-[0.1em]',
//             isDark ? 'text-slate-400' : 'text-slate-500'
//           )}
//           initial={{ opacity: 0, x: -4 }}
//           animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
//           transition={{ duration: 0.2, delay: 0.3, ease }}
//         >
//           {eyebrow}
//         </motion.span>
//       </div>

//       {/* ── Headline ─────────────────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//         transition={{ duration: 0.6, delay: 0.4, ease }}
//       >
//         {/*
//           H2: font-normal (400) — never bold. Large + light = authority.
//           H1: used only on page heroes (headingLevel="h1").
//         */}
//         <Heading
//           className={cn(
//             'font-normal leading-tight',
//             Heading === 'h1' ? 'text-[clamp(40px,5vw,56px)]' : 'text-[clamp(32px,4vw,40px)]',
//             isDark ? 'text-white' : 'text-slate-900'
//           )}
//         >
//           {headline}
//         </Heading>
//       </motion.div>

//       {/* ── Description (optional) ────────────────────────────────────────── */}
//       {description && (
//         <motion.p
//           className={cn(
//             'mt-4 text-base leading-7',
//             // Body copy max 68 chars per line — constrained via max-width
//             isCentered ? 'max-w-[540px] mx-auto' : 'max-w-[540px]',
//             isDark ? 'text-slate-400' : 'text-slate-600'
//           )}
//           initial={{ opacity: 0, y: 16 }}
//           animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
//           transition={{ duration: 0.5, delay: 0.5, ease }}
//         >
//           {description}
//         </motion.p>
//       )}
//     </div>
//   )
// }

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { specMark, eyebrowReveal, fadeUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

// export interface SectionHeaderProps {
//   eyebrow: string
//   headline: string
//   description?: string
//   align?: 'left' | 'center'
//   theme?: 'light' | 'dark'
//   headingLevel?: 'h1' | 'h2'
//   className?: string
// }
// components/ui/SectionHeader.tsx
export interface SectionHeaderProps {
  eyebrow: string
  headline: string
  description?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  headingLevel?: 'h1' | 'h2'
  className?: string
  id?: string   // <-- add this
}

export function SectionHeader({
  eyebrow,
  headline,
  description,
  align = 'left',
  theme = 'light',
  headingLevel = 'h2',
  className,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  const HeadingTag = headingLevel

  const eyebrowColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const headlineColor = theme === 'dark' ? 'text-white' : 'text-slate-900'
  const descColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600'

  return (
    <div
      ref={ref}
      className={cn(
        align === 'center' ? 'text-center' : 'text-left',
        'flex flex-col gap-3',
        className,
      )}
    >
      {/* Row with Spec Mark + Eyebrow */}
      <div className={cn('flex items-center gap-3', align === 'center' && 'justify-center')}>
        <motion.div
          className="w-0.5 bg-blue-600 flex-shrink-0"
          style={{ height: 16, transformOrigin: 'top' }}
          variants={specMark}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />
        <motion.p
          className={cn(
            'text-[11px] font-semibold uppercase tracking-[0.1em]',
            eyebrowColor,
          )}
          variants={eyebrowReveal}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {eyebrow}
        </motion.p>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <HeadingTag
          className={cn(
            'text-4xl font-normal',
            headlineColor,
          )}
        >
          {headline}
        </HeadingTag>
        
      </motion.div>

      {description && (
        <motion.p
          className={cn('text-lg leading-7 max-w-[540px]', descColor, align === 'center' && 'mx-auto')}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}