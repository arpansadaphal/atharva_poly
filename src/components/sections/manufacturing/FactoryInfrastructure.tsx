// 'use client'

// import { motion } from 'framer-motion'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Factory, MapPin, Users, Maximize } from 'lucide-react'
// import {NoiseOverlay} from '@/components/ui/NoiseOverlay'

// export default function FactoryInfrastructure() {
//   return (
//     <section className="relative bg-slate-900" aria-label="The Facility">
//       {/* Full‑bleed photography */}
//       <div className="w-full h-[300px] md:h-[400px] lg:h-[65vh] bg-slate-800 relative overflow-hidden">
//         <div className="absolute inset-0">
//           {/* Replace with real client image: /assets/manufacturing/factory-exterior.webp */}
//           <Image
//             src="/assets/manufacturing/factory-exterior.jpg"
//             alt="Atharva Polymers factory exterior — blue building with glass facade"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>
//         <div className="absolute inset-0 bg-slate-900/20" /> {/* subtle overlay for text contrast if needed */}
//       </div>

//       {/* Dark content panel */}
//       <NoiseOverlay />
//       <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-80px 0px' }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="flex items-center gap-3 mb-2">
//             <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
//             <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-400">
//               THE FACILITY
//             </span>
//           </div>
//           <p className="text-[13px] text-slate-500 mt-1">
//             Ranjangaon, Pune — Atharva Polymers Pvt. Ltd.
//           </p>
//           <p className="text-[17px] font-[300] text-slate-300 max-w-[600px] mt-6 leading-7">
//             A modern, 80,000 sq ft manufacturing facility (70,000 sq ft constructed)
//             designed for precision injection moulding. The plant houses 60+ machines
//             ranging from 50T to 1,300T, a dedicated tool room, quality laboratory, and
//             automated inspection cells. Part of the Atharva Group’s 300,000 sq ft
//             integrated manufacturing campus.
//           </p>

//           {/* Inline facts */}
//           <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-slate-700">
//             <div className="flex items-center gap-3">
//               <Factory className="w-5 h-5 text-blue-600" aria-hidden="true" />
//               <div>
//                 <p className="text-[13px] text-slate-400">Year Established</p>
//                 <p className="text-[15px] font-medium text-white">2010</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <MapPin className="w-5 h-5 text-blue-600" aria-hidden="true" />
//               <div>
//                 <p className="text-[13px] text-slate-400">Location</p>
//                 <p className="text-[15px] font-medium text-white">
//                   Ranjangaon MIDC, Pune
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Users className="w-5 h-5 text-blue-600" aria-hidden="true" />
//               <div>
//                 <p className="text-[13px] text-slate-400">Workforce</p>
//                 <p className="text-[15px] font-medium text-white">
//                   200 skilled employees
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <Maximize className="w-5 h-5 text-blue-600" aria-hidden="true" />
//               <div>
//                 <p className="text-[13px] text-slate-400">Plant Area</p>
//                 <p className="text-[15px] font-medium text-white">80,000 sq ft</p>
//               </div>
//             </div>
//           </div>

//           <Link
//             href="/gallery"
//             className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-8"
//           >
//             View factory gallery → <ImageIcon className="w-4 h-4" />
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// // Inline image icon as simple placeholder (avoids importing Lucide just for one icon)
// function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       {...props}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
//       />
//     </svg>
//   )
// }


'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Factory, MapPin, Users, Maximize, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

export default function FactoryInfrastructure() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Gallery images - add your actual images here
  const galleryImages = [
    {
      src: '/assets/manufacturing/factory-exterior.jpg',
      alt: 'Atharva Polymers factory exterior — blue building with glass facade',
    },
    {
      src: '/assets/manufacturing/production-floor.jpg',
      alt: 'Production floor with injection moulding machines in operation',
    },
    {
      src: '/assets/manufacturing/quality-lab.jpg',
      alt: 'Quality control laboratory with testing equipment',
    },
    {
      src: '/assets/manufacturing/tool-room.jpg',
      alt: 'Tool room with precision engineering equipment',
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section className="relative bg-slate-900" aria-label="The Facility">
      {/* ── Full‑bleed photography ───────────────────────────────────────── */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[65vh] bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={galleryImages[currentImageIndex].src}
            alt={galleryImages[currentImageIndex].alt}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Subtle overlay for text contrast */}
        <div className="absolute inset-0 bg-slate-900/20" />

        {/* ── Gallery Navigation (optional) ──────────────────────────────── */}
        {galleryImages.length > 1 && (
          <>
            {/* Left arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Dark content panel ──────────────────────────────────────────── */}
      <NoiseOverlay />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-400">
              THE FACILITY
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mt-1">
            Ranjangaon, Pune — Atharva Polymers Pvt. Ltd.
          </p>
          <p className="text-[17px] font-[300] text-slate-300 max-w-[600px] mt-6 leading-7">
            A modern, 106,000 sq ft manufacturing facility (85,000 sq ft constructed)
            designed for precision injection moulding. The plant houses 60+ machines
            ranging from 50T to 1,300T, a dedicated tool room, quality laboratory, and
            automated inspection cells. Part of the Atharva Group's 300,000 sq ft
            integrated manufacturing campus.
          </p>

          {/* ── Inline facts ──────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-slate-700">
            <div className="flex items-center gap-3">
              <Factory className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-[13px] text-slate-400">Year Established</p>
                <p className="text-[15px] font-medium text-white">2008</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-[13px] text-slate-400">Location</p>
                <p className="text-[15px] font-medium text-white">
                  Ranjangaon MIDC, Pune
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-[13px] text-slate-400">Workforce</p>
                <p className="text-[15px] font-medium text-white">
                  200 skilled employees
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Maximize className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-[13px] text-slate-400">Plant Area</p>
                <p className="text-[15px] font-medium text-white">85,000 sq ft</p>
              </div>
            </div>
          </div>

          {/* ── CTA with ImageIcon ────────────────────────────────────────── */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-400 transition-colors mt-8"
          >
            View factory gallery →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}