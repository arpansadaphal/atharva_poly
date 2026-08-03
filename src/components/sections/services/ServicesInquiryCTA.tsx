'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
import { buildWhatsAppURL } from '@/lib/whatsapp'

export default function ServicesInquiryCTA() {
  return (
    <section className="bg-slate-900 py-[60px] md:py-[120px] relative" aria-label="Work with us">
      <NoiseOverlay />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-400">WORK WITH US</span>
          </div>
          <h2 className="font-[300] text-[28px] md:text-[32px] lg:text-[44px] text-white">
            Tell us about your project.
          </h2>
          <p className="text-[15px] md:text-[17px] text-slate-400 max-w-[520px] mx-auto text-center mt-4">
            Whether you need material selection support, a custom formulation, or a reliable long‑term supply partner — the conversation starts here.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href="/contact?inquiry=services"
            className="inline-flex items-center justify-center h-14 px-8 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-[15px]"
          >
            Start a Project
          </Link>
          <a
            href={buildWhatsAppURL()}
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