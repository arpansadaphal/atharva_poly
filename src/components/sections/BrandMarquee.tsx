'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { industries } from '@/lib/industries-data'

export default function BrandMarquee() {
  const clients = useMemo(() => {
    const map = new Map<string, { name: string; logoPath: string }>()
    industries.forEach((industry) => {
      industry.clients?.forEach((client) => {
        if (!map.has(client.name)) map.set(client.name, client)
      })
    })
    return Array.from(map.values())
  }, [])

  if (clients.length === 0) return null

  // Create two identical lists for seamless loop
  const track1 = clients
  const track2 = clients

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden" aria-label="Our clients">
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-r from-blue-50/40 via-transparent to-blue-50/40 blur-3xl rounded-full opacity-70" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
          <span className="font-semibold text-[11px] uppercase tracking-[0.15em] text-slate-500">
            TRUSTED BY THE WORLD'S LEADING MANUFACTURERS
          </span>
        </div>
        <h2 className="font-normal text-4xl md:text-5xl text-slate-900">
          Precision that powers global brands
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="marquee-track flex">
          {/* First set */}
          <div className="flex items-center shrink-0">
            {track1.map((client, i) => (
              <div key={`${client.name}-a-${i}`} className="flex-shrink-0 mx-4 md:mx-6 group">
                <div className="relative w-36 h-20 md:w-44 md:h-24 flex items-center justify-center rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 group-hover:bg-white/70 group-hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] group-hover:-translate-y-1">
                  <Image
                    src={client.logoPath}
                    alt={client.name}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 144px, 176px"
                    priority={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second set (duplicate) */}
          <div className="flex items-center shrink-0">
            {track2.map((client, i) => (
              <div key={`${client.name}-b-${i}`} className="flex-shrink-0 mx-4 md:mx-6 group">
                <div className="relative w-36 h-20 md:w-44 md:h-24 flex items-center justify-center rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 group-hover:bg-white/70 group-hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] group-hover:-translate-y-1">
                  <Image
                    src={client.logoPath}
                    alt={client.name}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 144px, 176px"
                    priority={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}