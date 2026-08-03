'use client'

import { motion } from 'framer-motion'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'

interface PageHeroProps {
  eyebrow: string
  headline: string
  description?: string
  theme?: 'dark' | 'light'
  minHeight?: string
}

export default function PageHero({
  eyebrow,
  headline,
  description,
  theme = 'dark',
  minHeight = 'min-h-[320px] lg:min-h-[400px]',
}: PageHeroProps) {
  const isDark = theme === 'dark'

  return (
    <section
      className={`relative ${minHeight} flex items-center pt-20 ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}
      aria-label={eyebrow}
    >
      {isDark && <NoiseOverlay />}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 w-full relative z-10 py-16">
        <div className="flex items-center gap-3 mb-5">
          <motion.span
            className="w-[2px] h-6 bg-blue-600 inline-block"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            aria-hidden="true"
          />
          <motion.span
            className={`font-semibold text-[11px] uppercase tracking-[0.1em] ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow}
          </motion.span>
        </div>

        <motion.h1
          className={`font-[300] text-[36px] md:text-[44px] lg:text-[56px] leading-[1.1] max-w-[700px] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {headline}
        </motion.h1>

        {description && (
          <motion.p
            className={`text-[18px] max-w-[580px] mt-4 leading-7 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}