'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Factory, MapPin, Users, Maximize } from 'lucide-react'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'

export default function FactoryInfrastructure() {
  return (
    <section className="relative bg-slate-900" aria-label="The Facility">
      {/* Full‑bleed photography */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[65vh] bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Replace with real client image: /assets/manufacturing/factory-exterior.webp */}
          <Image
            src="/assets/manufacturing/factory-exterior.jpg"
            alt="Atharva Polymers factory exterior — blue building with glass facade"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-slate-900/20" /> {/* subtle overlay for text contrast if needed */}
      </div>

      {/* Dark content panel */}
      <NoiseOverlay />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-400">
              THE FACILITY
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mt-1">
            Ranjangaon, Pune — Atharva Polymers Pvt. Ltd.
          </p>
          <p className="text-[17px] font-[300] text-slate-300 max-w-[600px] mt-6 leading-7">
            A modern, 80,000 sq ft manufacturing facility (70,000 sq ft constructed)
            designed for precision injection moulding. The plant houses 60+ machines
            ranging from 50T to 1,300T, a dedicated tool room, quality laboratory, and
            automated inspection cells. Part of the Atharva Group’s 300,000 sq ft
            integrated manufacturing campus.
          </p>

          {/* Inline facts */}
          <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-slate-700">
            <div className="flex items-center gap-3">
              <Factory className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-[13px] text-slate-400">Year Established</p>
                <p className="text-[15px] font-medium text-white">2010</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-[13px] text-slate-400">Location</p>
                <p className="text-[15px] font-medium text-white">
                  Ranjangaon MIDC, Pune
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-[13px] text-slate-400">Workforce</p>
                <p className="text-[15px] font-medium text-white">
                  200 skilled employees
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Maximize className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-[13px] text-slate-400">Plant Area</p>
                <p className="text-[15px] font-medium text-white">80,000 sq ft</p>
              </div>
            </div>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-8"
          >
            View factory gallery → <ImageIcon className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// Inline image icon as simple placeholder (avoids importing Lucide just for one icon)
function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
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