'use client'

import { cn } from '@/lib/utils'
import type { KeyProperty } from '@/types/products'

interface KeyPropertiesPanelProps {
  properties: KeyProperty[]
  showLink?: boolean
  specSectionId?: string
  theme?: 'light' | 'dark'
}

export default function KeyPropertiesPanel({
  properties,
  showLink = true,
  specSectionId = 'technical-specs',
  theme = 'light',
}: KeyPropertiesPanelProps) {
  const isDark = theme === 'dark'

  return (
    <div
      className={cn(
        'rounded-xl p-8',
        isDark
          ? 'bg-slate-800 border border-slate-700'
          : 'bg-slate-50 border border-slate-200'
      )}
    >
      <h4
        className={cn(
          'text-[11px] font-semibold uppercase tracking-[0.08em]',
          isDark ? 'text-slate-400' : 'text-slate-400'
        )}
      >
        KEY PROPERTIES
      </h4>
      <hr
        className={cn(
          'mt-3 mb-4',
          isDark ? 'border-slate-700' : 'border-slate-200'
        )}
      />
      {properties.map((prop, i) => (
        <div
          key={i}
          className={
            i > 0
              ? cn(
                  'pt-5 mt-5',
                  isDark ? 'border-t border-slate-700' : 'border-t border-slate-200'
                )
              : ''
          }
        >
          <p className={cn('text-[13px]', isDark ? 'text-slate-400' : 'text-slate-500')}>
            {prop.label}
          </p>
          <p className={cn('text-[22px] font-semibold', isDark ? 'text-white' : 'text-slate-900')}>
            {prop.value}
            {prop.unit && (
              <span className="text-[16px] font-normal text-slate-500 ml-1">{prop.unit}</span>
            )}
          </p>
        </div>
      ))}
      {showLink && (
        <a
          href={`#${specSectionId}`}
          className="inline-block text-[13px] font-medium text-blue-500 mt-6 hover:text-blue-400"
        >
          View full specifications ↓
        </a>
      )}
    </div>
  )
}