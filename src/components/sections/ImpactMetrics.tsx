'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { useCountUp } from '@/hooks/useCountUp'
import { metrics } from '@/lib/data'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

interface MetricItemProps {
  value: number
  suffix: string
  label: string
  active: boolean
  index: number
  isLast: boolean
}

// ─────────────────────────────────────────────────────────────────
// MetricItem — individual stat block
// ─────────────────────────────────────────────────────────────────

function MetricItem({ value, suffix, label, active, index, isLast }: MetricItemProps) {
  const prefersReducedMotion = useReducedMotion()
  // Reduced motion: skip animation entirely, display final value immediately
  const count = useCountUp(value, 1500, prefersReducedMotion ? false : active)
  const displayValue = prefersReducedMotion ? value : count

  const isMobileTopRow = index < 2
  const isMobileLeftCol = index % 2 === 0

  return (
    <div
      className={cn(
        'relative flex flex-col items-start justify-center',
        // Mobile: per-cell padding + 1px border dividers
        'py-10 px-6',
        isMobileTopRow && 'border-b border-slate-700 md:border-b-0',
        isMobileLeftCol && 'border-r border-slate-700 md:border-r-0',
        // Desktop: section py-24 handles vertical spacing; override cell padding
        'md:py-0 md:px-8 lg:px-12',
      )}
      role="group"
      aria-label={`${value}${suffix} ${label}`}
    >
      {/* Desktop-only: 1px vertical divider at 60% section height, vertically centred */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px bg-slate-700"
          style={{ height: '60%' }}
        />
      )}

      {/* Numeral — Signature Device 3: Inter ExtraLight 200 at display scale */}
      <span
        aria-hidden="true"
        className="text-white leading-none tabular-nums select-none"
        style={{ fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 200 }}
      >
        {displayValue}
        {suffix}
      </span>

      {/* Label */}
      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.1em] mt-3 leading-5">
        {label}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// ImpactMetrics — exported section component
// ─────────────────────────────────────────────────────────────────

export function ImpactMetrics() {
  const sectionRef = useRef<HTMLElement>(null)
  // Triggers when 40% of the section is visible; fires once per mount
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 })

  return (
    <section
      ref={sectionRef}
      aria-label="Company Impact Metrics"
      className="relative bg-slate-900 overflow-hidden py-24"
    >
      {/* Signature Device 2: Material Surface Depth — noise grain at ~3.5% opacity */}
      <NoiseOverlay />

      {/* Radial glow: 4% white opacity ellipse — metrics row reads as illuminated */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Metrics grid: 2×2 on mobile → 4-column row on md+ */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {metrics.map((metric, i) => (
            <MetricItem
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              active={isInView}
              index={i}
              isLast={i === metrics.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}