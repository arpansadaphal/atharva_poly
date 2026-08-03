'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { EngagementStep } from '@/types/services'

interface EngagementProcessProps {
  steps: EngagementStep[]
  theme?: 'dark' | 'light'
}

export default function EngagementProcess({ steps, theme = 'dark' }: EngagementProcessProps) {
  const isDark = theme === 'dark'

  return (
    <motion.ol
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
      aria-label="Engagement steps"
    >
      {steps.map((step, i) => {
        const Icon = (LucideIcons as any)[step.iconName] || LucideIcons.HelpCircle
        return (
          <motion.li
            key={step.step}
            variants={staggerItem}
            custom={i}
            transition={{ delay: i * 0.06 }}
            className={`relative border rounded-lg p-4 md:p-6 flex flex-col items-center text-center ${
              isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <span
              className={`font-[200] text-[32px] md:text-[42px] leading-none ${
                isDark ? 'text-slate-600' : 'text-slate-300'
              }`}
              aria-hidden="true"
            >
              {step.step}
            </span>
            <Icon
              className={`w-4 h-4 md:w-5 md:h-5 mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
              aria-hidden="true"
            />
            <p className={`text-[13px] md:text-[14px] font-semibold mt-2 md:mt-3 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {step.label}
            </p>
            <p className={`text-[12px] md:text-[13px] leading-4 md:leading-5 mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {step.description}
            </p>
            {step.duration && (
              <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.08em] mt-2 ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {step.duration}
              </span>
            )}
          </motion.li>
        )
      })}
    </motion.ol>
  )
}