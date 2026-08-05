'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Image from 'next/image'

// ---------- Accordion ----------
interface AccordionItem {
  title: string
  content: string
}

function CapabilityAccordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="border-b border-slate-200">
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`cap-answer-${i}`}
              className="w-full text-left py-5 flex justify-between items-center cursor-pointer text-[15px] sm:text-[16px] font-semibold text-slate-900 hover:text-blue-600 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-sm"
            >
              {item.title}
              {isOpen ? (
                <Minus className="w-5 h-5 shrink-0 text-blue-600" />
              ) : (
                <Plus className="w-5 h-5 shrink-0 text-slate-400" />
              )}
            </button>
            <div
              id={`cap-answer-${i}`}
              role="region"
              aria-labelledby={`cap-btn-${i}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-[14px] sm:text-[15px] text-slate-600 leading-7 pb-5">
                {item.content}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------- Image Slider ----------
interface SliderImage {
  src: string
  alt: string
}

function ImageSlider({ images }: { images: SliderImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 4000)
  }, [images.length])

  useEffect(() => {
    startAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startAutoPlay])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    startAutoPlay()
  }

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden border border-slate-200 bg-slate-100">
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          className="object-cover transition-opacity duration-400 ease-out"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={activeIndex === 0}
          quality={85}
        />
      </div>
      <div className="flex gap-2 mt-3 flex-wrap">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`relative w-14 h-14 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
              i === activeIndex
                ? 'border-blue-600 scale-105'
                : 'border-transparent hover:border-slate-400'
            }`}
          >
            <Image
              src={img.src}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="56px"
              quality={60}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

// ---------- Main Section Component ----------
interface CapabilityPillarSectionProps {
  id: string
  align: 'text-left' | 'image-left'
  title: string
  description: string
  extraDescription?: string
  accordionItems: AccordionItem[]
  images: SliderImage[]
  background?: 'white' | 'slate-50'
  children?: React.ReactNode
}

export default function CapabilityPillarSection({
  id,
  align,
  title,
  description,
  extraDescription,
  accordionItems,
  images,
  background = 'white',
  children,
}: CapabilityPillarSectionProps) {
  const bgClass = background === 'slate-50' ? 'bg-slate-50' : 'bg-white'
  const isTextLeft = align === 'text-left'

  return (
    <section id={id} className={`${bgClass} py-[60px] md:py-[120px]`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Text Column */}
          <div className={isTextLeft ? '' : 'lg:order-2'}>
            <h2 className="font-normal text-3xl sm:text-4xl text-slate-900 mb-4">
              {title}
            </h2>
            <p className="text-[16px] text-slate-600 leading-7 mb-4">
              {description}
            </p>
            {extraDescription && (
              <p className="text-[16px] text-slate-600 leading-7 mb-8">
                {extraDescription}
              </p>
            )}
            <CapabilityAccordion items={accordionItems} />
            {children}
          </div>

          {/* Image Column */}
          <div className={isTextLeft ? '' : 'lg:order-1'}>
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImageSlider images={images} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}