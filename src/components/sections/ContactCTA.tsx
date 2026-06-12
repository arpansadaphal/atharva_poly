'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
import {Button} from '@/components/ui/Button'
import { MessageCircle } from 'lucide-react'
import { specMark, eyebrowReveal, fadeUp } from '@/lib/animations'

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      ref={sectionRef}
      aria-label="Contact Call to Action"
      className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden"
    >
      <NoiseOverlay />

      <div className="relative max-w-[640px] mx-auto px-6 text-center z-10">
        {/* Centered Spec Mark + Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            className="w-0.5 bg-blue-600 flex-shrink-0"
            style={{ height: 16, transformOrigin: 'top' }}
            variants={specMark}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />
          <motion.p
            className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]"
            variants={eyebrowReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            Start a Conversation
          </motion.p>
        </div>

        <motion.h2
          className="text-4xl lg:text-5xl font-[300] text-white mt-2"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Ready to Discuss Your Polymer Requirements?
        </motion.h2>

        <motion.p
          className="mt-4 text-lg text-slate-400 max-w-md mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Our team responds within one business day. For urgent inquiries, use WhatsApp.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <Button variant="primary" size="lg" href="/contact">
              Request Quote
            </Button>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}?text=${encodeURIComponent(
                'Hello, I would like to inquire about your polymer products.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-lg font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}