// 'use client'

// import { useState, useEffect, useRef } from 'react'

// /**
//  * Animates a number from 0 to `end` using cubic ease-out.
//  *
//  * @param end      - Target value
//  * @param duration - Animation duration in milliseconds (default: 1500ms)
//  * @param active   - Start the animation when true (typically from useInView)
//  *
//  * Rules from MOTION_SYSTEM.md:
//  * - Trigger once only — do NOT re-animate on re-scroll
//  * - Duration: 1.5 seconds
//  * - Easing: ease-out (count slows as it approaches final value)
//  * - prefers-reduced-motion: show final value immediately, no animation
//  */
// export function useCountUp(
//   end: number,
//   duration: number = 1500,
//   active: boolean
// ): number {
//   const [value, setValue] = useState(0)
//   const hasPlayed = useRef(false)

//   useEffect(() => {
//     // Respect reduced-motion preference
//     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
//       if (active) setValue(end)
//       return
//     }

//     // Only play once per session
//     if (!active || hasPlayed.current) return
//     hasPlayed.current = true

//     const startTime = performance.now()

//     const tick = (now: number) => {
//       const elapsed = now - startTime
//       const t = Math.min(elapsed / duration, 1)

//       // Cubic ease-out: 1 - (1 - t)^3
//       // Simulates a measuring instrument settling on a reading
//       const eased = 1 - Math.pow(1 - t, 3)
//       setValue(Math.floor(eased * end))

//       if (t < 1) {
//         requestAnimationFrame(tick)
//       } else {
//         setValue(end)
//       }
//     }

//     requestAnimationFrame(tick)
//   }, [active, end, duration])

//   return value
// }

'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 to `end` using cubic ease-out.
 *
 * @param end      - Target value
 * @param duration - Animation duration in milliseconds (default: 1500ms)
 * @param active   - Start the animation when true (typically from useInView)
 *
 * Rules from MOTION_SYSTEM.md:
 * - Trigger once only — do NOT re-animate on re-scroll
 * - Duration: 1.5 seconds
 * - Easing: ease-out (count slows as it approaches final value)
 * - prefers-reduced-motion: show final value immediately, no animation
 */
export function useCountUp(
  end: number,
  duration: number = 1500,
  active: boolean
): number {
  const [value, setValue] = useState(0)
  const hasPlayed = useRef(false)

  useEffect(() => {
    if (!active) return

    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hasPlayed.current = true

      const frameId = requestAnimationFrame(() => {
        setValue(end)
      })

      return () => cancelAnimationFrame(frameId)
    }

    // Only play once
    if (hasPlayed.current) return
    hasPlayed.current = true

    const startTime = performance.now()
    let frameId: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / duration, 1)

      // Cubic ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - t, 3)

      setValue(Math.floor(eased * end))

      if (t < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        setValue(end)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [active, end, duration])

  return value
}