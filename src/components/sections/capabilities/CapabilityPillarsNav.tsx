'use client'

import {
  PencilRuler,
  Drill,
  Factory,
  Sparkles,
  Puzzle,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'

const pillars = [
  {
    id: 'engineering',
    icon: PencilRuler,
    title: 'Engineering',
    description:
      'NPD, APQP, PFMEA, PPAP, DFM, prototyping, material selection.',
  },
  {
    id: 'mold-design',
    icon: Drill,
    title: 'Mold Design & Manufacturing',
    description:
      'CAD/CAM, mold flow analysis, high-cavitation tooling up to 72 cavities.',
  },
  {
    id: 'injection-moulding',
    icon: Factory,
    title: 'Plastic Injection Moulding',
    description:
      'Up to 1000T, cleanroom moulding, metal-to-plastic conversion, GMP.',
  },
  {
    id: 'secondary-operations',
    icon: Sparkles,
    title: 'Secondary Operations',
    description:
      'Welding, machining, laser etching, hot foiling, screen & tampo printing.',
  },
  {
    id: 'assembly',
    icon: Puzzle,
    title: 'Assembly',
    description:
      'Furniture, seating, LED products, high-volume small parts assembly.',
  },
  {
    id: 'quality-systems',
    icon: ShieldCheck,
    title: 'Quality Systems & Assurance',
    description:
      'Zero-defect focus, IATF 16949, process improvement, value enhancement.',
  },
]

export default function CapabilityPillarsNav() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {pillars.map((pillar) => {
        const Icon = pillar.icon
        return (
          <a
            key={pillar.id}
            href={`#${pillar.id}`}
            className="group bg-white border border-slate-200 rounded-xl p-6 relative block transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.09)] focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-blue-600 rounded-l-xl" />
            <Icon className="w-6 h-6 text-blue-600" />
            <h3 className="text-[17px] font-semibold text-slate-900 mt-3">
              {pillar.title}
            </h3>
            <p className="text-[13px] text-slate-500 mt-1.5 leading-5">
              {pillar.description}
            </p>
            <span className="text-[13px] font-medium text-blue-600 mt-4 inline-block group-hover:underline">
              View details ↓
            </span>
          </a>
        )
      })}
    </div>
  )
}