'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  className?: string
  theme?: 'light' | 'dark'
}

export default function BreadcrumbNav({ items, className, theme = 'light' }: BreadcrumbNavProps) {
  const isDark = theme === 'dark'

  return (
    <nav aria-label="Breadcrumb" className={cn('mb-2', className)}>
      <ol className="flex items-center text-[13px] flex-wrap">
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            {i > 0 && (
              <ChevronRight
                className={cn(
                  'w-3.5 h-3.5 mx-2 flex-shrink-0',
                  isDark ? 'text-slate-600' : 'text-slate-300'
                )}
                aria-hidden="true"
              />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  'transition-colors',
                  isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-500 hover:text-slate-900'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(isDark ? 'text-white' : 'text-slate-900')} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}