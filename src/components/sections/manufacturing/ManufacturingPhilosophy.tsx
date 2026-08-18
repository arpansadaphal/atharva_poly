'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'

export default function ManufacturingPhilosophy() {
  return (
    <section className="bg-white section-padding" aria-label="Manufacturing Philosophy">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 items-start">
          {/* Left: Prose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="MANUFACTURING PHILOSOPHY"
              headline="Precision at Scale. Consistency in Every Batch."
              theme="light"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-slate-600">
              <p>
                Atharva Polymers operates a single, state‑of‑the‑art facility in
                Ranjangaon, Pune, employing 200 skilled personnel. This focused
                structure — a single location, one trained team, one quality system —
                ensures that every production run meets the same exacting standards,
                whether it's for a small appliance component or a critical automotive
                assembly.
              </p>
              <p>
                Our manufacturing is driven by the IATF 16949 automotive quality
                framework, which mandates process control, traceability, and continuous
                improvement. Every raw material batch is verified, every process
                parameter is monitored, and every finished part is inspected against an
                approved control plan.
              </p>
              <p>
                As part of the Atharva Group — which houses over 400 employees across
                300,000 sq ft of integrated manufacturing space — we leverage shared
                expertise in metal fabrication, corrugation, and engineering to deliver
                end‑to‑end solutions from concept to completion.
              </p>
            </div>
          </motion.div>

          {/* Right: Key Figures Panel */}
          <motion.div
            className="bg-slate-50 border border-slate-200 rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-3">
              FACILITY OVERVIEW
            </h3>
            <hr className="border-t border-slate-200 mb-4" />
            <p className="text-[15px] font-semibold text-slate-900">
              Atharva Polymers Pvt. Ltd.
            </p>
            <p className="text-[13px] text-slate-500">
              Ranjangaon, Pune — established 2007
            </p>
            <hr className="border-t border-slate-100 my-4" />
            <div className="space-y-3">
              <div>
                <p className="text-[22px] font-semibold text-slate-900">32+</p>
                <p className="text-[13px] text-slate-500">
                  Injection Moulding Machines
                </p>
              </div>
              <div>
                <p className="text-[22px] font-semibold text-slate-900">
                  50T – 1,000T
                </p>
                <p className="text-[13px] text-slate-500">Clamping Force Range</p>
              </div>
              <div>
                <p className="text-[22px] font-semibold text-slate-900">3,600 MT</p>
                <p className="text-[13px] text-slate-500">Polymer Processing / Annum</p>
              </div>
              <div>
                <p className="text-[22px] font-semibold text-slate-900">106,000</p>
                <p className="text-[13px] text-slate-500">
                  sq ft (85,000 sq ft constructed)
                </p>
              </div>
            </div>
            <hr className="border-t border-slate-200 my-4" />
            <a
              href="#capacity"
              className="text-[13px] font-medium text-blue-600 hover:text-blue-700"
            >
              View full capabilities ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}