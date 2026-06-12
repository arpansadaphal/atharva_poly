// 'use client'

// import { useRef, type ReactNode } from 'react'
// import { motion, useInView } from 'framer-motion'
// import { cn } from '@/lib/utils'
// import { ease } from '@/lib/animations'

// interface FadeOnScrollProps {
//   children: ReactNode
//   /** Delay in seconds before the animation starts (default: 0) */
//   delay?: number
//   /** Animation duration in seconds (default: 0.6) */
//   duration?: number
//   /** translateY starting offset in px (default: 20) */
//   y?: number
//   /** Additional class names applied to the wrapper div */
//   className?: string
//   /** InView margin — how far from viewport edge to trigger (default: '-80px 0px') */
//   margin?: string
// }

// /**
//  * FadeOnScroll — wraps any content block with a scroll-triggered reveal.
//  *
//  * - Plays ONCE per session (`once: true`)
//  * - Uses the primary easing curve [0.22, 1, 0.36, 1]
//  * - Respects prefers-reduced-motion via global CSS (globals.css)
//  *
//  * @example
//  * <FadeOnScroll delay={0.1} className="mt-8">
//  *   <p>This paragraph fades up when it enters the viewport.</p>
//  * </FadeOnScroll>
//  */
// export function FadeOnScroll({
//   children,
//   delay = 0,
//   duration = 0.6,
//   y = 20,
//   className,
//   margin = '-80px 0px',
// }: FadeOnScrollProps) {
//   const ref = useRef<HTMLDivElement>(null)
//   const inView = useInView(ref, { once: true, margin: margin as Parameters<typeof useInView>[1]['margin'] })

//   return (
//     <motion.div
//       ref={ref}
//       className={cn(className)}
//       initial={{ opacity: 0, y }}
//       animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
//       transition={{ duration, delay, ease }}
//     >
//       {children}
//     </motion.div>
//   )
// }

'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/animations'

interface FadeOnScrollProps {
  children: ReactNode
  /** Delay in seconds before the animation starts (default: 0) */
  delay?: number
  /** Animation duration in seconds (default: 0.6) */
  duration?: number
  /** translateY starting offset in px (default: 20) */
  y?: number
  /** Additional class names applied to the wrapper div */
  className?: string
  /** InView margin — how far from viewport edge to trigger (default: '-80px 0px') */
  margin?: string
}

/**
 * FadeOnScroll — wraps any content block with a scroll-triggered reveal.
 *
 * - Plays ONCE per session (`once: true`)
 * - Uses the primary easing curve [0.22, 1, 0.36, 1]
 * - Respects prefers-reduced-motion via global CSS (globals.css)
 *
 * @example
 * <FadeOnScroll delay={0.1} className="mt-8">
 *   <p>This paragraph fades up when it enters the viewport.</p>
 * </FadeOnScroll>
 */
export function FadeOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  className,
  margin = '-80px 0px',
}: FadeOnScrollProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin,
      }}
      transition={{
        duration,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  )
}