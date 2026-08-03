'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import type { ProductDetail } from '@/types/products'

interface ProductInquiryCTAProps {
  product: ProductDetail
}

export default function ProductInquiryCTA({ product }: ProductInquiryCTAProps) {
  return (
    <section className="bg-slate-900 section-padding relative">
      <NoiseOverlay />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-400">
            REQUEST A QUOTATION
          </span>
        </motion.div>

        <motion.h2
          className="font-[300] text-[32px] lg:text-[40px] text-white"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Ready to discuss {product.name}?
        </motion.h2>

        <motion.p
          className="text-[17px] text-slate-400 max-w-[520px] mx-auto text-center mt-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Tell us your quantity, delivery schedule, and application requirements. Our
          technical team will prepare a detailed quotation within 2 business days.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <Link
            href={`/contact?product=${product.slug}&inquiry=quote`}
            className="inline-flex items-center justify-center h-14 px-8 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-[15px]"
          >
            Request a Quotation
          </Link>
          <a
            href={buildWhatsAppURL(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-8 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-[15px]"
            style={{ backgroundColor: '#25D366' }}
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}