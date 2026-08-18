'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'

export default function TestingValidation() {
  return (
    <section className="bg-white section-padding" aria-label="Testing and Validation">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="TESTING & VALIDATION"
              headline="Verified to Specification, Batch by Batch"
              theme="light"
            />
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-slate-600">
              <p>
                Incoming raw materials are verified against approved supplier
                specifications. Certificate of analysis is obtained and checked for
                each incoming batch.
              </p>
              <p>
                During production, process parameters are monitored and dimensional
                checks carried out at defined intervals. First‑off samples are retained
                for traceability. Any out‑of‑tolerance condition triggers an immediate
                process review.
              </p>
              <p>
                Finished goods undergo final inspection against the approved control
                plan before dispatch clearance. Inspection records are maintained and
                available to customers on request.
              </p>
              <p>
                Every batch is supported by documentation including a certificate of
                conformance, batch number, and reference to the applicable quality
                records.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-50 border border-slate-200 rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px 0px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-4">
              TESTING DOCUMENTATION PROVIDED
            </h3>
            <ul className="space-y-3">
              {[
                'Certificate of Conformance',
                'Technical Data Sheet',
                'Batch / Lot Identification',
                'Inspection Records (on request)',
                'Material Test Report (on request)',
              ].map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-[14px] text-slate-700">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <hr className="border-t border-slate-200 my-6" />
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-2">
              REQUEST TECHNICAL DOCUMENTATION
            </h4>
            <p className="text-[13px] text-slate-500 mb-4">
              Specific test reports available for products supplied under IATF 16949
              scope.
            </p>
            <Link
              href="/contact?inquiry"
              className="inline-flex items-center justify-center h-10 px-5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors text-[14px]"
            >
              Request Documentation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}