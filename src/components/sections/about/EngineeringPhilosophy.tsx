'use client'

import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeOnScroll } from '@/components/ui/FadeOnScroll'
import { aboutPage } from '@/lib/data'

/**
 * EngineeringPhilosophy — four numbered principles in a vertical stack.
 *
 * Distinct from WhyAtharva's card grid: no cards, no hover, no borders.
 * Pure typographic rows separated by 1px hairlines, each row a 12-col
 * grid with numeral (col-2), title (col-4), body (col-6).
 */
export function EngineeringPhilosophy() {
  const principles = aboutPage.principles

  return (
    <section
      aria-label="Engineering Philosophy"
      className="bg-white section-padding"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">

        <SectionHeader
          eyebrow="Engineering Philosophy"
          headline="Four principles that govern every batch."
          align="left"
          theme="light"
        />

        {/* Principles stack */}
        <div className="mt-16 border-t border-slate-200">
          {principles.map((principle, i) => (
            <FadeOnScroll
              key={principle.number}
              delay={i * 0.08}
              duration={0.6}
              y={16}
              className="border-b border-slate-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-10 lg:py-14">

                {/* Numeral — Signature Device 3 in muted form */}
                <div className="lg:col-span-2">
                  <span
                    aria-hidden="true"
                    className="text-slate-300 leading-none tabular-nums block"
                    style={{ fontSize: 'clamp(56px, 6vw, 96px)', fontWeight: 200 }}
                  >
                    {principle.number}
              </span>
            </div>

                {/* Title */}
                <div className="lg:col-span-4">
                  <h3 className="text-slate-900 leading-[1.3]" style={{ fontSize: '1.5rem', fontWeight: 500 }}>
                    {principle.title}
            </h3>
          </div>

                {/* Body */}
                <div className="lg:col-span-6">
                  <p className="text-base text-slate-600 leading-[1.85]">
                    {principle.body}
            </p>
          </div>

        </div>
      </FadeOnScroll>
          ))}
    </div>
  </div>
</section>
  )
}

export default EngineeringPhilosophy
