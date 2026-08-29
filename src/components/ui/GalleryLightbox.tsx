'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '@/types/manufacturing'
import { categoryLabels } from '@/lib/gallery-data'

interface GalleryLightboxProps {
  images: GalleryImage[]       // filtered set currently visible in the grid
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function GalleryLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [imageOpacity, setImageOpacity] = useState(1)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const prevButtonRef = useRef<HTMLButtonElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const imageOpacityTimeout = useRef<NodeJS.Timeout | null>(null)

  const totalImages = images.length
  const currentImage = images[currentIndex]

  const navigate = useCallback(
    (direction: number) => {
      if (totalImages === 0) return

      // Fade out
      setImageOpacity(0)

      if (imageOpacityTimeout.current) clearTimeout(imageOpacityTimeout.current)

      imageOpacityTimeout.current = setTimeout(() => {
        setCurrentIndex(prev => (prev + direction + totalImages) % totalImages)
        setImageOpacity(1)
        imageOpacityTimeout.current = null
      }, 100)
    },
    [totalImages]
  )

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // Reset index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setImageOpacity(1)
    }
  }, [isOpen, initialIndex])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Keyboard events
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      else if (e.key === 'ArrowLeft') navigate(-1)
      else if (e.key === 'ArrowRight') navigate(1)
      else if (e.key === 'Tab') {
        // Focus trap
        const focusable = [closeButtonRef.current, prevButtonRef.current, nextButtonRef.current].filter(Boolean) as HTMLButtonElement[]
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose, navigate])

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
    const delta = touchEndX.current - touchStartX.current
    if (Math.abs(delta) > 50) {
      navigate(delta > 0 ? -1 : 1)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={e => {
            if (e.target === overlayRef.current) handleClose()
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="relative w-full max-w-6xl px-4">
            {/* Top control bar – outside image */}
            <div className="flex items-center justify-between mb-4 mt-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-[13px] text-slate-300 bg-black/40 px-3 py-1 rounded-full"
                  aria-live="polite"
                >
                  {currentIndex + 1} / {totalImages}
                </span>
                <span className="text-[11px] font-semibold text-white bg-blue-600 px-2.5 py-1 rounded-full uppercase">
                  {categoryLabels[currentImage.category]}
                </span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image area */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-full h-[65vh] sm:h-[70vh] overflow-hidden rounded-lg"
                style={{ opacity: imageOpacity, transition: 'opacity 150ms ease' }}
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Caption */}
              <p className="text-sm text-slate-400 text-center mt-4 px-4 max-w-2xl">
                {currentImage.caption || currentImage.alt}
              </p>
            </div>

            {/* Desktop prev/next buttons – sides of image */}
            <button
              ref={prevButtonRef}
              onClick={() => navigate(-1)}
              className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              ref={nextButtonRef}
              onClick={() => navigate(1)}
              className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Mobile controls */}
            <div className="sm:hidden flex items-center justify-center gap-4 mt-4 bg-black/40 backdrop-blur-sm py-3 px-4 rounded-lg">
              <button
                onClick={() => navigate(-1)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/20 text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-slate-300 min-w-[60px] text-center" aria-live="polite">
                {currentIndex + 1} / {totalImages}
              </span>
              <button
                onClick={() => navigate(1)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/20 text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}