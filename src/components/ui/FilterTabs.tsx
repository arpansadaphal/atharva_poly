'use client'

import { cn } from '@/lib/utils'

interface FilterTab {
  label: string
  value: string
  count?: number
}

interface FilterTabsProps {
  tabs: FilterTab[]
  activeTab: string
  onChange: (value: string) => void
  className?: string
}

export default function FilterTabs({ tabs, activeTab, onChange, className }: FilterTabsProps) {
  return (
    <div className={cn('relative filter-tabs-container', className)} role="tablist" aria-label="Product categories">
      <div className="flex gap-0 border-b border-slate-200 mb-2 overflow-x-auto filter-tabs-scroll flex-nowrap">
        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            data-filter={tab.value}
            tabIndex={activeTab === tab.value ? 0 : -1}
            onClick={() => onChange(tab.value)}
            className={cn(
              'filter-tab h-10 px-5 text-[14px] font-medium whitespace-nowrap flex-shrink-0 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm transition-colors duration-150',
              activeTab === tab.value
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 border-b-2 border-transparent hover:text-slate-900'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 bg-blue-50 text-blue-600 text-[11px] px-1.5 py-0.5 rounded">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}