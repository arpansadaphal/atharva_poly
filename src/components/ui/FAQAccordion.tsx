'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-[800px]">
      {items.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="border-b border-slate-200">
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              className="w-full text-left py-5 flex justify-between items-center cursor-pointer text-[16px] font-semibold text-slate-900 hover:text-blue-600 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm"
            >
              {faq.question}
              {isOpen ? (
                <Minus className="w-5 h-5 flex-shrink-0 text-blue-600" />
              ) : (
                <Plus className="w-5 h-5 flex-shrink-0 text-slate-400" />
              )}
            </button>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className={`faq-answer ${isOpen ? 'open' : ''}`}
            >
              <p className="text-[15px] text-slate-600 leading-7 pb-5">{faq.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}