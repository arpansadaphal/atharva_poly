import type { Variants, Transition } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// PRIMARY EASING CURVE
// Smooth acceleration with natural deceleration — premium feel.
// Used for all structural animations (section reveals, hero sequence, dividers).
// ─────────────────────────────────────────────────────────────────────────────
export const ease = [0.22, 1, 0.36, 1] as const

// ─────────────────────────────────────────────────────────────────────────────
// SECTION REVEALS
// ─────────────────────────────────────────────────────────────────────────────

/** Standard section content reveal — fade up 20px */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

/** Slightly shorter lift — for descriptions, supporting text */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

/** Pure fade — no movement. For elements that shouldn't translate. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGGER SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

/** Stagger parent — wraps card grids, feature lists, etc. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35,
    },
  },
}

/** Stagger child — individual cards and items */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

/** Faster stagger for larger groups (8+ items, 40ms between) */
export const staggerItemFast: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// SPECIFICATION MARK (Signature Device 1)
// Draws from top → bottom on viewport entry.
// MUST complete before eyebrow text fades in.
// ─────────────────────────────────────────────────────────────────────────────

/** The Specification Mark draw — scaleY 0→1 from origin-top in 250ms */
export const specMark: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.25, ease },
  },
}

/** Eyebrow text reveal — follows spec mark with 50ms delay */
export const eyebrowReveal: Variants = {
  hidden: { opacity: 0, x: -4 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, delay: 0.3, ease },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// PHOTOGRAPHY REVEALS (Signature Device — scale from 1.03)
// ─────────────────────────────────────────────────────────────────────────────

/** Standard photography entrance — scale resolves 1.03 → 1.0, opacity 0 → 1 */
export const photoReveal: Variants = {
  hidden: { opacity: 0, scale: 1.03 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease },
  },
}

/** Hero photography entrance — starts at 1.04, resolves over 1.2s with hero sequence */
export const heroPhotoReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease, delay: 0 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECTURAL DIVIDER (Manufacturing Section)
// The 1px blue vertical line that draws top → bottom.
// Completes before photography fully resolves.
// ─────────────────────────────────────────────────────────────────────────────

export const dividerDraw: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.4, ease, delay: 0.2 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SEQUENCE
// Complete timed sequence for the hero section.
// Total duration: ~1.4 seconds. See IMPLEMENTATION_MASTER_PLAN.md §5 Section 2.
// ─────────────────────────────────────────────────────────────────────────────

export const heroTransitions: Record<string, { initial: object; animate: object; transition: Transition }> = {
  specMark: {
    initial: { scaleY: 0 },
    animate: { scaleY: 1 },
    transition: { duration: 0.25, ease: ease as unknown as string, delay: 0 },
  },
  eyebrow: {
    initial: { opacity: 0, x: -4 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.2, ease: ease as unknown as string, delay: 0.3 },
  },
  headline1: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: ease as unknown as string, delay: 0.25 },
  },
  headline2: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: ease as unknown as string, delay: 0.38 },
  },
  headline3: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: ease as unknown as string, delay: 0.49 },
  },
  description: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: ease as unknown as string, delay: 0.6 },
  },
  ctaPrimary: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.25, ease: ease as unknown as string, delay: 0.76 },
  },
  ctaSecondary: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: ease as unknown as string, delay: 0.84 },
  },
  trust1: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: ease as unknown as string, delay: 0.95 },
  },
  trust2: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: ease as unknown as string, delay: 1.03 },
  },
  trust3: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: ease as unknown as string, delay: 1.11 },
  },
  trust4: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2, ease: ease as unknown as string, delay: 1.19 },
  },
  photography: {
    initial: { opacity: 0, scale: 1.04 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.2, ease: ease as unknown as string, delay: 0 },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

export const navbarReveal: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1, ease },
  },
}

export const mobileMenuReveal: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease },
  },
}

export const mobileNavItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.2, ease },
  }),
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE TRANSITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease },
  },
}