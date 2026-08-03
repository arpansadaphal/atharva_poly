'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  ease,
  specMark,
  eyebrowReveal,
  fadeUp,
  editorialPhoto,
} from '@/lib/animations'
import { aboutPage } from '@/lib/data'
import type { Leader } from '@/types'

function FounderSpread({ leader }: { leader: Leader }) {
  const photoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const photoInView = useInView(photoRef, { once: true, margin: '-80px 0px' })
  const contentInView = useInView(contentRef, { once: true, margin: '-80px 0px' })
  const E = ease

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      <div ref={photoRef} className="lg:col-span-5">
        <motion.div
          className="relative w-full aspect-[3/4] overflow-hidden"
          variants={editorialPhoto}
          initial="hidden"
          animate={photoInView ? 'visible' : 'hidden'}
        >
          <Image
            src={leader.imageSrc}
            alt={leader.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </div>

      <div ref={contentRef} className="lg:col-span-7 lg:pl-12">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            aria-hidden="true"
            className="w-0.5 bg-blue-600 flex-shrink-0"
            style={{ height: 16, transformOrigin: 'top' }}
            variants={specMark}
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
          />
          <motion.span
            className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em]"
            variants={eyebrowReveal}
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
          >
            Leadership
          </motion.span>
        </div>

        <motion.h3
          className="font-normal text-slate-900 leading-[1.15] mt-6"
          style={{ fontSize: 'clamp(32px, 3.5vw, 48px)' }}
          variants={fadeUp}
          initial="hidden"
          animate={contentInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.4, ease: E }}
        >
          {leader.name}
        </motion.h3>

        <motion.p
          className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 mt-2"
          variants={fadeUp}
          initial="hidden"
          animate={contentInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.55, ease: E }}
        >
          {leader.role}
        </motion.p>

        <motion.div
          className="flex gap-4 mt-10 max-w-[540px]"
          variants={fadeUp}
          initial="hidden"
          animate={contentInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.7, ease: E }}
        >
          <div aria-hidden="true" className="w-0.5 bg-blue-600 flex-shrink-0" />
          <p className="text-base text-slate-600 leading-[1.85]">{leader.bio}</p>
        </motion.div>
      </div>
    </div>
  )
}

function TeamCard({ member }: { member: Leader }) {
  return (
    <div className="w-[240px] lg:w-[260px] shrink-0">
      <figure className="border border-slate-200 bg-white">
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={member.imageSrc}
            alt={member.imageAlt}
            fill
            sizes="260px"
            className="object-cover object-center"
          />
        </div>
        <figcaption className="px-4 py-4 border-t border-slate-200">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 mt-1">
            {member.role}
          </p>
          <p className="text-sm text-slate-600 leading-[1.7] mt-3">{member.bio}</p>
        </figcaption>
      </figure>
    </div>
  )
}

// Horizontal scroll area that responds to page scroll
function TeamScrollArea({ members }: { members: Leader[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  // Update button visibility based on scroll position
  const updateButtons = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }, [])

  // Sync team carousel scroll with page scroll
  const syncWithPageScroll = useCallback(() => {
    const sectionEl = sectionRef.current
    const scrollEl = scrollRef.current
    
    if (!sectionEl || !scrollEl) return
    
    // Calculate how far we've scrolled through this section (0 to 1)
    const sectionTop = sectionEl.getBoundingClientRect().top + window.pageYOffset
    const sectionHeight = sectionEl.offsetHeight
    const viewportHeight = window.innerHeight
    const scrollTop = window.pageYOffset
    
    // When section enters viewport (top at viewport bottom) to when it leaves (bottom at viewport top)
    const sectionVisibleStart = sectionTop - viewportHeight
    const sectionVisibleEnd = sectionTop + sectionHeight
    const pageProgress = Math.max(0, Math.min(1, (scrollTop - sectionVisibleStart) / (sectionVisibleEnd - sectionVisibleStart)))
    
    // Map page progress to carousel scroll position (0 to max scroll)
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth
    const targetScroll = Math.max(0, Math.min(maxScroll, pageProgress * maxScroll))
    
    // Only update if not already syncing to prevent infinite loop
    if (!isSyncing && Math.abs(scrollEl.scrollLeft - targetScroll) > 5) {
      setIsSyncing(true)
      scrollEl.scrollTo({ left: targetScroll, behavior: 'smooth' })
      setTimeout(() => setIsSyncing(false), 100)
    }
  }, [isSyncing])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    
    // Initial button state
    updateButtons()
    
    // Listen to scroll events on the section
    const handleScroll = () => {
      requestAnimationFrame(syncWithPageScroll)
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    window.addEventListener('orientationchange', handleScroll)
    
    // Listen to carousel scroll events to update buttons
    el.addEventListener('scroll', updateButtons, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('orientationchange', handleScroll)
      el.removeEventListener('scroll', updateButtons)
    }
  }, [updateButtons, syncWithPageScroll, isSyncing])

  return (
    <div className="relative max-w-[1280px] mx-auto">
      {canScrollLeft && (
        <button
          onClick={() => {
            const el = scrollRef.current
            if (!el) return
            const cardWidth = el.firstElementChild?.clientWidth ?? 260
            el.scrollBy({ left: -cardWidth, behavior: 'smooth' })
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-16 flex items-center justify-center bg-white/90 border border-slate-200 hover:bg-white transition-colors shadow-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => {
            const el = scrollRef.current
            if (!el) return
            const cardWidth = el.firstElementChild?.clientWidth ?? 260
            el.scrollBy({ left: cardWidth, behavior: 'smooth' })
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-16 flex items-center justify-center bg-white/90 border border-slate-200 hover:bg-white transition-colors shadow-sm"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      )}

      <div
        ref={sectionRef}
        className="pb-[120px]"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 mb-10 px-6 lg:px-12 max-w-[1280px] mx-auto">
          The Team
        </p>
        
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-6 lg:px-12"
          style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {members.map((m) => (
            <TeamCard key={m.role} member={m} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function LeadershipSection() {
  const leaders = aboutPage.leadership
  const founder = leaders.find((l) => l.span === 'founder')
  const team = leaders.filter((l) => l.span !== 'founder')

  return (
    <section aria-label="Leadership and Team" className="bg-white">
      <div className="pt-[120px] pb-10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          {founder && <FounderSpread leader={founder} />}
        </div>
      </div>
      <div className="pb-[120px]">
        <TeamScrollArea members={team} />
      </div>
    </section>
  )
}

export default LeadershipSection