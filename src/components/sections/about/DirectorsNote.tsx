'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ease, specMark, eyebrowReveal, editorialPhoto } from '@/lib/animations'
import { aboutPage } from '@/lib/data'

/**
 * DirectorsNote — founder's editorial spread.
 *
 * Desktop: text left (col-span-7), image right (col-span-5).
 * Mobile: image top, text below.
 *
 * The first paragraph is set as a pull-quote with the spec mark at
 * paragraph scale (mirrors CompanyIntroduction's blockquote pattern).
 */
export function DirectorsNote() {
  const contentRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: '-80px 0px' })
  const photoInView = useInView(photoRef, { once: true, margin: '-80px 0px' })

  const E = ease
  const { eyebrow, headline, paragraphs, signature, signatureRole, imageSrc, imageAlt } =
    aboutPage.directorsNote

  return (
    <section aria-label="Director's Note" className="relative bg-white overflow-hidden">

      {/* Mobile photography — full-width, above content, no radius */}
      <div className="lg:hidden w-full aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1600}
          height={1000}
          sizes="100vw"
          className="object-cover object-center w-full h-full"
          priority={false}
        />
     </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-20 lg:items-start">

          {/* ── Content column ─────────────────────────────────────────── */}
          <div
            ref={contentRef}
            className="py-[72px] lg:py-[120px] lg:col-span-7"
          >
            {/* Eyebrow row — spec mark + label */}
            <div className="flex items-center gap-3 mb-6">
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
                {eyebrow}
            </motion.span>
          </div>

            {/* Headline */}
            <motion.h2
              className="font-normal text-slate-900 leading-[1.15] mb-8"
              style={{ fontSize: 'clamp(28px, 3vw, 36px)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: E }}
            >
              {headline}
          </motion.h2>

            {/* Pull-quote (first paragraph) — spec mark at paragraph scale */}
            <motion.div
              className="flex gap-4 mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.55, ease: E }}
            >
              <div
                aria-hidden="true"
                className="w-0.5 bg-blue-600 flex-shrink-0"
              />
              <p className="text-[22px] font-[300] text-slate-700 leading-[1.45]">
                {paragraphs[0]}
             </p>
           </motion.div>

            {/* Remaining paragraphs */}
            <div className="max-w-[540px]">
              {paragraphs.slice(1).map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-base text-slate-600 leading-[1.85] mt-5"
                  initial={{ opacity: 0, y: 16 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.75 + i * 0.08,
                    ease: E,
                  }}
                >
                  {paragraph}
               </motion.p>
              ))}
           </div>

            {/* Signature block */}
            <motion.div
              className="mt-12 pt-6 border-t border-slate-200 max-w-[540px]"
              initial={{ opacity: 0, y: 12 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.6, delay: 1.0, ease: E }}
            >
              <p className="text-base font-medium text-slate-900">{signature}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 mt-1">
                {signatureRole}
             </p>
           </motion.div>
        </div>

          {/* ── Desktop photography column ─────────────────────────────── */}
          <div
            ref={photoRef}
            className="hidden lg:block lg:col-span-5 lg:py-[120px] lg:pl-6"
          >
            <motion.div
              className="relative w-full aspect-[4/5] rounded-sm overflow-hidden"
              variants={editorialPhoto}
              initial="hidden"
              animate={photoInView ? 'visible' : 'hidden'}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center"
              />
           </motion.div>
        </div>

      </div>
    </div>
  </section>
  )
}

export default DirectorsNote
