'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { specMark, eyebrowReveal } from '@/lib/animations'

interface SectionHeaderProps {
  eyebrow?: string
  headline: string
  description?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  headingLevel?: 'h1' | 'h2'
  className?: string
}

export function SectionHeader({
  eyebrow,
  headline,
  description,
  align = 'left',
  theme = 'light',
  headingLevel: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  const isDark = theme === 'dark'

  return (
    <div
      className={cn(
        'mb-8 md:mb-12', // 👈 less spacing on mobile
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'flex items-center gap-3 mb-3',
            align === 'center' && 'justify-center'
          )}
        >
          <motion.span
            className="w-[2px] h-6 bg-blue-600 inline-block"
            variants={specMark}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ originY: 0 }}
            aria-hidden="true"
          />
          <motion.span
            className={cn(
              'font-semibold text-[11px] uppercase tracking-[0.1em]',
              isDark ? 'text-slate-400' : 'text-slate-500'
            )}
            variants={eyebrowReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {eyebrow}
          </motion.span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px 0px' }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Heading
          className={cn(
            'font-normal text-3xl sm:text-4xl', // 👈 slightly smaller on mobile
            isDark ? 'text-white' : 'text-slate-900'
          )}
        >
          {headline}
        </Heading>
      </motion.div>

      {description && (
        <motion.p
          className={cn(
            'text-[17px] leading-7 mt-4 max-w-[600px]',
            align === 'center' && 'mx-auto',
            isDark ? 'text-slate-400' : 'text-slate-600'
          )}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}