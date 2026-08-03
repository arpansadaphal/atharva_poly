'use client'

import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeOnScroll } from '@/components/ui/FadeOnScroll'
import { aboutPage } from '@/lib/data'

/**
 * InsideTheFactory — layered photo composition with editorial captions.
 *
 * Six photos arranged in an asymmetric, off-grid layout:
 *   Row 1: large photo left  (60% width, 16:10)
 *   Row 2: small photo right (40% width, 4:3,  lg:-mt-24 lg:ml-auto)
 *   Row 3: large photo left  (55% width, 16:10, lg:-mt-12)
 *   Row 4: small photo right (35% width, 4:3,  lg:-mt-20 lg:ml-auto)
 * Mobile: all photos stack with gap-6, no offsets.
 */
export function InsideTheFactory() {
  const photos = aboutPage.factoryCaptions

  return (
    <section
      aria-label="Inside the Factory"
      className="bg-slate-50 py-[120px]"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        <SectionHeader
          eyebrow="Inside the Factory"
          headline="The work, the floor, the discipline."
          description="MIDC Ranjangaon, Pune. 95,000 sq. m. 35 machines. One operating standard."
          align="left"
          theme="light"
        />

        {/* Layered photo composition */}
        <div className="mt-16 flex flex-col gap-6 lg:gap-0">

          {/* Row 1 — large left (60%) */}
          <FadeOnScroll delay={0} duration={0.7} y={24} className="lg:w-[60%]">
            <figure>
              <div className="relative w-full aspect-[16/10] overflow-hidden border border-slate-200">
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
         </div>
              <figcaption className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {photos[0].caption}
           </p>
         </figcaption>
       </figure>
     </FadeOnScroll>

          {/* Row 2 — small right (40%), offset up */}
          <FadeOnScroll delay={0.06} duration={0.7} y={24} className="lg:w-[40%] lg:ml-auto lg:-mt-24">
            <figure>
              <div className="relative w-full aspect-[4/3] overflow-hidden border border-slate-200">
                <Image
                  src={photos[1].src}
                  alt={photos[1].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
         </div>
              <figcaption className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {photos[1].caption}
           </p>
         </figcaption>
       </figure>
     </FadeOnScroll>

          {/* Row 3 — large left (55%), offset up */}
          <FadeOnScroll delay={0.12} duration={0.7} y={24} className="lg:w-[55%] lg:-mt-12">
            <figure>
              <div className="relative w-full aspect-[16/10] overflow-hidden border border-slate-200">
                <Image
                  src={photos[2].src}
                  alt={photos[2].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center"
                />
         </div>
              <figcaption className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {photos[2].caption}
           </p>
         </figcaption>
       </figure>
     </FadeOnScroll>

          {/* Row 4 — small right (35%), offset up */}
          <FadeOnScroll delay={0.18} duration={0.7} y={24} className="lg:w-[35%] lg:ml-auto lg:-mt-20">
            <figure>
              <div className="relative w-full aspect-[4/3] overflow-hidden border border-slate-200">
                <Image
                  src={photos[3].src}
                  alt={photos[3].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover object-center"
                />
         </div>
              <figcaption className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {photos[3].caption}
           </p>
         </figcaption>
       </figure>
     </FadeOnScroll>

          {/* Row 5 — large left (60%), offset up */}
          <FadeOnScroll delay={0.24} duration={0.7} y={24} className="lg:w-[60%] lg:-mt-12">
            <figure>
              <div className="relative w-full aspect-[16/10] overflow-hidden border border-slate-200">
                <Image
                  src={photos[4].src}
                  alt={photos[4].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
         </div>
              <figcaption className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {photos[4].caption}
           </p>
         </figcaption>
       </figure>
     </FadeOnScroll>

          {/* Row 6 — small right (40%), offset up */}
          <FadeOnScroll delay={0.30} duration={0.7} y={24} className="lg:w-[40%] lg:ml-auto lg:-mt-24">
            <figure>
              <div className="relative w-full aspect-[4/3] overflow-hidden border border-slate-200">
                <Image
                  src={photos[5].src}
                  alt={photos[5].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
         </div>
              <figcaption className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {photos[5].caption}
           </p>
         </figcaption>
       </figure>
     </FadeOnScroll>

   </div>
 </div>
</section>
  )
}

export default InsideTheFactory
