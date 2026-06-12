// components/ui/LightboxModal.tsx
'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Download, ExternalLink } from 'lucide-react'
import type { Certification } from '@/types'

interface LightboxModalProps {
  isOpen: boolean
  onClose: () => void
  certification: Certification | null
}

export default function LightboxModal({ isOpen, onClose, certification }: LightboxModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!certification) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal container */}
          <motion.div
            className="relative max-w-3xl w-[90%] max-h-[90vh] rounded-none bg-white shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${certification.short}`}
          >
            {/* Close button (top-right) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white/80 hover:bg-white text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate image */}
            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center bg-slate-100 p-4">
              <div className="relative w-full max-h-[70vh] aspect-[1/1.414] max-w-lg">
                <Image
                  src={certification.optimizedWebPPath}
                  alt={`Official ${certification.short} ${certification.full} verification badge`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 90vw, 70vw"
                />
              </div>
            </div>

            {/* Footer controls */}
            <div className="flex items-center justify-between gap-4 bg-slate-50 px-6 py-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <a
                  href={certification.localPdfPath}
                  download
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                {/* {certification.issuerUrl && (
                  <a
                    href={certification.issuerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Online
                  </a>
                )} */}
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}