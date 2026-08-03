// // components/sections/CertificationsTrust.tsx
// 'use client'

// import { useRef, useState } from 'react'
// import { motion, useInView } from 'framer-motion'
// import Image from 'next/image'
// import NoiseOverlay from '@/components/ui/NoiseOverlay'
// import SectionHeader from '@/components/ui/SectionHeader'
// import LightboxModal from '@/components/ui/LightboxModal'
// import type { Certification } from '@/types'

// const certifications: Certification[] = [
//   {
//     short: 'IATF 16949',
//     full: 'Quality Management System',
//     id: 'IATF 16949',
//     certNumber: '0499792',
//     validUntil: '2027/02/05',
//     issuerUrl: 'https://www.tuvsud.com/',
//     localPdfPath: '/assets/pdfs/IATF_Certificate-Atharva_Polymers-2024.pdf',
//     optimizedWebPPath: '/images/certs/IATF_Certificate-Atharva_Polymers-2024.webp',
//   },
//   {
//     short: 'ISO 14001:2015',
//     full: 'Environmental Management',
//     id: 'iso-14001:2015',
//     certNumber: '44 100 123456',
//     validUntil: '2028/01/31',
//     issuerUrl: 'https://www.tuvsud.com/',
//     localPdfPath: '/assets/pdfs/EMS_Certificate-2025.pdf',
//     optimizedWebPPath: '/images/certs/EMS_Certificate_2025.webp',
//   },
//   {
//     short: 'ISO 9001:2015',
//     full: 'Quality Management System',
//     id: 'iso-9001:2015',
//     certNumber: '44 100 123457',
//     validUntil: '2027-02-05',
//     issuerUrl: 'https://www.tuvsud.com/',
//     localPdfPath: '/assets/pdfs/ISO_Certificate-Atharva_Polymers-2024.pdf',
//     optimizedWebPPath: '/images/certs/ISO_Certificate-Atharva Polymers-2024.webp',
//   },
//   {
//     short: 'ISO 45001:2018',
//     full: 'Occupational Health & Safety',
//     id: 'iso-45001:2018',
//     certNumber: '25EOOW09',
//     validUntil: '2028-01-31',
//     issuerUrl: 'https://www.tuvsud.com/',
//     localPdfPath: '/assets/pdfs/OHSMS_Certificate-2025.pdf',
//     optimizedWebPPath: '/images/certs/OHSMS_Certificate-2025.webp',
//   },
// ]

// export default function CertificationsTrust() {
//   const sectionRef = useRef<HTMLElement>(null)
//   const isInView = useInView(sectionRef, { once: true, margin: '-100px 0px' })
//   const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const openModal = (cert: Certification) => {
//     setSelectedCert(cert)
//     setIsModalOpen(true)
//   }

//   const closeModal = () => {
//     setIsModalOpen(false)
//     setTimeout(() => setSelectedCert(null), 200)
//   }

//   return (
//     <>
//       <section
//         ref={sectionRef}
//         aria-labelledby="certifications-heading"
//         className="relative bg-slate-800 py-16 lg:py-24 overflow-hidden"
//       >
//         <NoiseOverlay />

//         <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
//           <SectionHeader
//             eyebrow="Certifications & Quality Standards"
//             headline="Verified Quality Standards"
//             description="Our manufacturing processes are documented, tested, and certified."
//             align="center"
//             theme="dark"
//             headingLevel="h2"
//             id="certifications-heading"
//           />

//           {/* Desktop grid */}
//           <motion.div
//             className="hidden lg:flex flex-wrap justify-center gap-6 mt-14"
//             variants={{
//               animate: {
//                 transition: { staggerChildren: 0.08 },
//               },
//             }}
//             initial="initial"
//             animate={isInView ? 'animate' : 'initial'}
//           >
//             {certifications.map((cert) => (
//               <motion.div
//                 key={cert.id}
//                 variants={{
//                   initial: { opacity: 0, y: 20 },
//                   animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
//                 }}
//               >
//                 <button
//                   onClick={() => openModal(cert)}
//                   className="bg-white w-40 h-28 px-4 flex flex-col items-center justify-center gap-2
//                              transition-all duration-300 ease-out
//                              hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]
//                              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
//                   aria-label={`View ${cert.short} certificate details`}
//                 >
//                   <div className="relative w-full h-12 flex items-center justify-center">
//                     <Image
//                       src={cert.optimizedWebPPath!}
//                       alt={`Official ${cert.short} ${cert.full} verification badge`}
//                       fill
//                       className="object-contain"
//                       sizes="(max-width: 640px) 144px, 160px"
//                     />
//                   </div>
//                   <span className="text-[11px] font-semibold text-slate-500 text-center leading-tight line-clamp-2">
//                     {cert.full}
//                   </span>
//                 </button>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Mobile horizontal scroll */}
//           <div className="lg:hidden mt-12 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-6">
//             <div className="flex flex-nowrap gap-4 px-6">
//               {certifications.map((cert) => (
//                 <motion.button
//                   key={cert.id}
//                   onClick={() => openModal(cert)}
//                   className="shrink-0 bg-white w-36 h-24 px-3 flex flex-col items-center justify-center gap-1
//                              transition-all duration-300 ease-out
//                              hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]
//                              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none
//                              snap-start"
//                   aria-label={`View ${cert.short} certificate details`}
//                 >
//                   <div className="relative w-full h-10 flex items-center justify-center">
//                     <Image
//                       src={cert.optimizedWebPPath!}
//                       alt={`Official ${cert.short} ${cert.full} verification badge`}
//                       fill
//                       className="object-contain"
//                       sizes="144px"
//                     />
//                   </div>
//                   <span className="text-[11px] font-semibold text-slate-500 text-center leading-tight line-clamp-2">
//                     {cert.full}
//                   </span>
//                 </motion.button>
//               ))}
//               <div className="shrink-0 w-6" />
//             </div>
//           </div>
//         </div>
//       </section>

//       <LightboxModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         certification={selectedCert}
//       />
//     </>
//   )
// }

// components/sections/CertificationsTrust.tsx
// components/sections/CertificationsTrust.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { SectionHeader } from '@/components/ui/SectionHeader'
import LightboxModal from '@/components/ui/LightboxModal'
import { cn } from '@/lib/utils'
import type { Certification } from '@/types'

const certificates: Certification[] = [
  {
    short: 'IATF 16949',
    full: 'Quality Management System',
    id: 'IATF 16949',
    certNumber: '0499792',
    validUntil: '2027/02/05',
    issuerUrl: 'https://www.tuvsud.com/',
    localPdfPath: '/assets/pdfs/IATF_Certificate-Atharva_Polymers-2024.pdf',
    optimizedWebPPath: '/images/certs/IATF_Certificate-Atharva_Polymers-2024.webp',
  },
  {
    short: 'ISO 14001:2015',
    full: 'Environmental Management',
    id: 'iso-14001:2015',
    certNumber: '44 100 123456',
    validUntil: '2028/01/31',
    issuerUrl: 'https://www.tuvsud.com/',
    localPdfPath: '/assets/pdfs/EMS_Certificate-2025.pdf',
    optimizedWebPPath: '/images/certs/EMS_Certificate_2025.webp',
  },
  {
    short: 'ISO 9001:2015',
    full: 'Quality Management System',
    id: 'iso-9001:2015',
    certNumber: '44 100 123457',
    validUntil: '2027-02-05',
    issuerUrl: 'https://www.tuvsud.com/',
    localPdfPath: '/assets/pdfs/ISO_Certificate-Atharva_Polymers-2024.pdf',
    optimizedWebPPath: '/images/certs/ISO_Certificate-Atharva Polymers-2024.webp',
  },
  {
    short: 'ISO 45001:2018',
    full: 'Occupational Health & Safety',
    id: 'iso-45001:2018',
    certNumber: '25EOOW09',
    validUntil: '2028-01-31',
    issuerUrl: 'https://www.tuvsud.com/',
    localPdfPath: '/assets/pdfs/OHSMS_Certificate-2025.pdf',
    optimizedWebPPath: '/images/certs/OHSMS_Certificate-2025.webp',
  },
]

const trustPoints = [
  'Independently Audited',
  'International Standards',
  'Documented Processes',
  'Export Ready Manufacturing',
]

export default function CertificationsTrust({
  compact = false,
}: {
  compact?: boolean;
  certifications?: string[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  }, [])

  useEffect(() => {
    if (isHovering) return
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [isHovering, goToNext])

  const openModal = (cert: Certification) => {
    setSelectedCert(cert)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setTimeout(() => setSelectedCert(null), 200)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const deltaX = touchEndX.current - touchStartX.current
    const swipeThreshold = 50 // minimum px to count as swipe

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        goToPrev()
      } else {
        goToNext()
      }
    } else {
      // treat as tap → open modal
      openModal(certificates[currentIndex])
    }
  }

  const currentCert = certificates[currentIndex]

  return (
    <>
      <section
        aria-label="Certifications and Quality Standards"
        className={cn(
          'relative bg-slate-900 overflow-hidden',
          compact ? 'py-[72px] lg:py-[120px]' : 'section-padding'
        )}
      >
        <NoiseOverlay />

        <div className="max-w-7xl mx-auto bg-slate-900 px-6 lg:px-12 relative z-10">
          <div
            className={cn(
              compact
                ? 'flex flex-col items-center gap-10'
                : 'grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 items-center'
            )}
          >
            <div className={cn(compact && 'text-center max-w-[640px] mx-auto')}>
              <SectionHeader
                eyebrow="Certifications & Quality Standards"
                headline="Verified Quality Standards"
                description={
                  compact
                    ? undefined
                    : 'Our manufacturing processes are documented, audited, and independently certified.'
                }
                align={compact ? 'center' : 'left'}
                theme="dark"
              />
              {!compact && (
                <ul className="mt-8 space-y-4">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-base text-slate-300">{point}</span>
                   </li>
                  ))}
               </ul>
              )}
           </div>

            <div
              className={cn(
                'relative bg-white overflow-hidden rounded-none w-full mx-auto cursor-pointer',
                compact ? 'max-w-[280px]' : 'max-w-[440px]'
              )}
              style={{ aspectRatio: '0.707' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openModal(currentCert)
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentCert.optimizedWebPPath}
                    alt={`${currentCert.short} ${currentCert.full} Certificate`}
                    fill
                    className="object-contain"
                    sizes={compact ? '280px' : '(max-width: 768px) 100vw, 440px'}
                    priority
                  />
               </motion.div>
             </AnimatePresence>

              <div className="absolute bottom-3 right-3 flex gap-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrev()
                  }}
                  className="w-10 h-10 border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100 transition-colors"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
               </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  className="w-10 h-10 border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100 transition-colors"
                  aria-label="Next Certificate"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
               </button>
             </div>
           </div>
         </div>
       </div>
     </section>

      <LightboxModal
        isOpen={modalOpen}
        onClose={closeModal}
        certification={selectedCert}
      />
    </>
  )
}