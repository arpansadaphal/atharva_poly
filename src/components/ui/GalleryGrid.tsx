'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryImage } from '@/types/manufacturing'
import { getImagesByCategory, categoryLabels } from '@/lib/gallery-data'
import { Maximize2, ImageIcon } from 'lucide-react'
import GalleryLightbox from '@/components/ui/GalleryLightbox'

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredImages = useMemo(
    () => getImagesByCategory(activeCategory),
    [activeCategory]
  )

  const availableCategories = ['all', ...new Set(images.map(img => img.category))]
  const tabs = availableCategories.map(id => ({
    value: id,
    label: categoryLabels[id] ?? id,
    count: id === 'all' ? images.length : images.filter(img => img.category === id).length,
  }))

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto mb-8 pb-1" role="tablist" aria-label="Filter gallery by category">
        {tabs.map(tab => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeCategory === tab.value}
            onClick={() => setActiveCategory(tab.value)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === tab.value
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-xs font-semibold rounded-full px-1.5 py-0.5 ${
              activeCategory === tab.value ? 'bg-white/15' : 'bg-black/8'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Image count */}
      <p className="text-[13px] text-slate-400 mb-8">
        Showing {filteredImages.length} images
      </p>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[260px] sm:auto-rows-[220px] lg:auto-rows-[280px]"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.03 } },
            exit: { opacity: 0, transition: { duration: 0.15 } },
          }}
        >
          {filteredImages.length === 0 ? (
            <li className="col-span-full bg-slate-50 rounded-xl p-16 text-center">
              <ImageIcon className="w-9 h-9 text-slate-300 mx-auto" />
              <p className="text-sm text-slate-400 mt-3">No images in this category yet.</p>
            </li>
          ) : (
            filteredImages.map((image, index) => {
              // Spanning rules via Tailwind classes (desktop only)
              let spanClasses = ''
              if (index === 0) spanClasses = 'lg:col-span-2 lg:row-span-2'
              else if (index === 3) spanClasses = 'lg:row-span-2'

              return (
                <motion.li
                  key={image.src}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
                    exit: { opacity: 0, transition: { duration: 0.1 } },
                  }}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group ${spanClasses}`}
                  onClick={() => openLightbox(index)}
                  role="listitem"
                >
                  <button
                    className="w-full h-full text-left"
                    aria-label={`View full-size: ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1.5 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {categoryLabels[image.category]}
                    </div>
                    <div className="absolute bottom-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </button>
                </motion.li>
              )
            })
          )}
        </motion.ul>
      </AnimatePresence>

      {/* Lightbox */}
     <GalleryLightbox
  images={filteredImages}
  initialIndex={lightboxIndex}
  isOpen={lightboxOpen}
  onClose={() => setLightboxOpen(false)}
/>
    </>
  )
}