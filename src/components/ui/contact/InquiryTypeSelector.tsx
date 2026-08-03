'use client'

import { cn } from '@/lib/utils'
import type { InquiryType } from '@/types/contact'

const types: { value: InquiryType; label: string }[] = [
  { value: 'quote', label: 'Request Quote' },
  { value: 'technical', label: 'Technical Enquiry' },
  { value: 'general', label: 'General Enquiry' },
  { value: 'career', label: 'Career Enquiry' },
]

interface InquiryTypeSelectorProps {
  value: InquiryType
  onChange: (type: InquiryType) => void
}

export default function InquiryTypeSelector({ value, onChange }: InquiryTypeSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mb-2" role="tablist" aria-label="Inquiry type">
      {types.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={value === t.value}
          data-type={t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            'rounded-lg h-10 px-5 font-medium text-[14px] transition-colors duration-150 whitespace-nowrap',
            value === t.value
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-slate-900'
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}