'use client'

import Globe from 'react-globe.gl'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { fadeUp, ease } from '@/lib/animations'

const E = ease

// Cast Globe to any to bypass prop type checks (props are valid but not typed correctly in this version)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyGlobe = Globe as any

export function InternationalReach() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px 0px' })

  // Define marker data: [longitude, latitude, name, color, size?]
  const markerData = [
    [73.8567, 18.5204, 'Pune, India', '#3b82f6', 0.08], // Pune
    [-95.7129, 37.0902, 'USA', '#3b82f6', 0.06], // USA center
    [-102.5528, 23.6345, 'Mexico', '#3b82f6', 0.06] // Mexico center
  ]

  return (
    <section aria-label="International Reach" className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none" />
      </div>
      <div className="relative max-w-[1280px] mx-auto py-[120px] px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div aria-hidden="true" className="w-0.5 bg-blue-600 flex-shrink-0" style={{ height: 16 }} />
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.1em]">
            Global Presence
          </span>
        </div>

        <motion.h2
          className="font-normal text-slate-900 leading-[1.15] mb-8"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.4, ease: E }}
        >
          Worldwide Operations
        </motion.h2>

        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <AnyGlobe
            ref={globeRef}
            globeImageUrl='//unpkg.com/three-globe/example/img/earth-dark.jpg'
            bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
            showAtmosphere
            atmosphereColor='#3b82f6'
            atmosphereAltitude={0.25}
            markersData={markerData}
            markerLabel={{ 
              name: 'name', 
              color: () => '#fff', 
              textAnchor: 'middle', 
              alignmentBaseline: 'center',
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: () => '#3b82f6',
              backgroundPadding: 3,
              borderRadius: 3,
              pixelOffset: [0, -20]
            }}
            markerColor={() => '#3b82f6'}
            markerRadius={0.06}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onMarkerClick={({object: { markerData: [, , name] }}: any) => {
              alert(`Selected: ${name}`)
            }}
            rotationSpeed={0.2}
            pointerEvents={true}
          />
        </div>

        <p className="mt-6 text-slate-500 text-sm max-w-[480px]">
          Atharva Polymers serves key markets in the United States and Mexico, with our 
          headquarters and manufacturing facility located in Pune, India. Our global reach 
          enables us to deliver high-quality polymer solutions to international clients 
          while maintaining competitive pricing and reliable lead times.
        </p>

        <p className="mt-4 text-slate-500 text-sm max-w-[480px]">
          Additional international markets are currently under NDA and will be disclosed 
          upon mutual agreement.
        </p>
      </div>
    </section>
  )
}