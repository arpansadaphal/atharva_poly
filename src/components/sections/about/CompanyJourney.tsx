'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { aboutPage } from '@/lib/data'
import { fadeUp, ease } from '@/lib/animations'
import type { JourneyBeat } from '@/types'

const E = ease

export function CompanyJourney() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px 0px' })

  const beats: JourneyBeat[] = aboutPage.journeyBeats

  // Scroll progress through the section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress to a continuous beat index (0 to beats.length-1)
  const beatIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, beats.length - 1]
  )

  // Calculate opacity for each beat using a triangular function
  const beatOpacities = beats.map((_, i) => {
    const distance = Math.abs(i - beatIndex.get())
    return Math.max(0, 1 - distance) // 1 at center, 0 at distance >=1
  })

  return (
    <section aria-label="Company Journey" className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
      </div>
      <div className="relative max-w-[1280px] mx-auto py-[120px] px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div aria-hidden="true" className="w-0.5 bg-blue-600 flex-shrink-0" style={{ height: 16 }} />
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em]">
            Journey
          </span>
        </div>

        <motion.h2
          className="font-normal text-slate-900 leading-[1.15] mb-8"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.4, ease: E }}
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-blue-600" />
          
          {/* Moving dot on timeline */}
          <motion.div
            className="absolute left-0 -top-2 w-4 h-4 rounded-full bg-blue-600 -translate-x-1/2"
            style={{
              top: `calc(${scrollYProgress} * 100% - 2px)`,
            }}
          />
          
          {/* Beats */}
          <div className="relative pl-4 pt-12">
            {beats.map((beat, i) => (
              <motion.div
                key={beat.yearLabel}
                className="mb-16"
                style={{
                  opacity: beatOpacities[i],
                  transform: `translateX(${beatOpacities[i] * 10}px)`,
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: E }}
              >
                <div className="flex items-start">
                  {/* Dot */}
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 bg-blue-600 rounded-full" />
                  </div>
                  {/* Content */}
                  <div className="ml-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                      {beat.yearLabel}
                    </p>
                    <p className="mt-1 text-slate-600 leading-[1.8]">{beat.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats at the bottom */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
          {aboutPage.aboutStats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, delay: 0.2 * (aboutPage.aboutStats.indexOf(stat) + 1), ease: E }}
            >
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}