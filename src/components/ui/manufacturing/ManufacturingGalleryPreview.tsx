'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/animations'
import type { GalleryImage } from '@/types/manufacturing'

interface ManufacturingGalleryPreviewProps {
  images: GalleryImage[]
  maxImages?: number
  showLink?: boolean
  galleryHref?: string
}

export default function ManufacturingGalleryPreview({
  images,
  maxImages = 6,
  showLink = true,
  galleryHref = '/gallery',
}: ManufacturingGalleryPreviewProps) {
  const displayedImages = images.slice(0, maxImages)

  if (displayedImages.length === 0) {
    return (
      <div className="border border-slate-200 rounded-xl p-16 text-center bg-slate-50">
        <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-4" />
        <p className="text-[14px] text-slate-400">
          Factory photography coming soon.
        </p>
      </div>
    )
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px 0px' }}
      >
        {displayedImages.map((image, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="gallery-img aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 relative group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {image.category && (
              <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
      {showLink && (
        <div className="text-right mt-6">
          <Link
            href={galleryHref}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700"
          >
            View full gallery →
          </Link>
        </div>
      )}
    </>
  )
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  // Inline placeholder icon; replace with Lucide if preferred
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
      />
    </svg>
  )
}