// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import Link from 'next/link'
// import * as LucideIcons from 'lucide-react'
// import type { Industry } from '@/types/industries'

// interface IndustryCardProps {
//   industry: Industry
// }

// export default function IndustryCard({ industry }: IndustryCardProps) {
//   const [hovered, setHovered] = useState(false)
//   const Icon = (LucideIcons as any)[industry.iconName] || LucideIcons.HelpCircle

//   return (
//     <Link
//       href={`/industries/${industry.slug}`}
//       className="industry-card bg-white border border-slate-200 rounded-xl overflow-hidden relative block group"
//       aria-label={`Explore polymer solutions for ${industry.name}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <motion.div
//         className="absolute top-0 left-0 h-[3px] bg-blue-600 z-10"
//         initial={{ width: 0 }}
//         animate={{ width: hovered ? '100%' : 0 }}
//         transition={{ duration: 0.2, ease: 'linear' }}
//         aria-hidden="true"
//       />
//       <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2">
//         <Icon className="w-10 h-10 text-slate-400" aria-hidden="true" />
//         <span className="text-[14px] font-semibold text-slate-500">{industry.share} of business</span>
//       </div>
//       <div className="p-6">
//         <div className="flex items-center gap-2 mb-2">
//           <Icon className="w-5 h-5 text-blue-600" aria-hidden="true" />
//           <span className="bg-blue-50 text-blue-600 text-[11px] font-semibold rounded-full px-2.5 py-0.5">
//             {industry.share} SHARE
//           </span>
//         </div>
//         <h3 className="text-[20px] font-semibold text-slate-900 mt-1">{industry.name}</h3>
//         <p className="text-[14px] text-slate-500 mt-1 leading-5 line-clamp-2">{industry.tagline}</p>
//         <p className="text-[12px] text-slate-400 mt-2">
//           Clients: {industry.clients.map((c) => c.name).join(', ')}
//         </p>
//         <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-4">
//           <span className="text-[13px] text-slate-400">{industry.applications.length}+ applications</span>
//           <span className="text-[14px] font-medium text-blue-600">Explore solutions →</span>
//         </div>
//       </div>
//     </Link>
//   )
// }

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import * as LucideIcons from 'lucide-react'
import type { Industry } from '@/types/industries'

interface IndustryCardProps {
  industry: Industry
}

export default function IndustryCard({ industry }: IndustryCardProps) {
  const [hovered, setHovered] = useState(false)
  const Icon = (LucideIcons as any)[industry.iconName] || LucideIcons.HelpCircle

  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="industry-card bg-white border border-slate-200 rounded-xl overflow-hidden relative block group"
      aria-label={`Explore polymer solutions for ${industry.name}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-blue-600 z-10"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : 0 }}
        transition={{ duration: 0.2, ease: 'linear' }}
        aria-hidden="true"
      />
      
      {/* ── Image Section ───────────────────────────────────────────── */}
      <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
        {industry.image ? (
          <Image
            src={industry.image}
            alt={industry.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          // Fallback to icon if no image
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Icon className="w-10 h-10 text-slate-400" aria-hidden="true" />
            {/* <span className="text-[14px] font-semibold text-slate-500">{industry.share} of business</span> */}
          </div>
        )}
        
        {/* Optional: Overlay text on image */}
        {industry.image && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            {/* <span className="text-white text-[14px] font-semibold">{industry.share} of business</span> */}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {/* <Icon className="w-5 h-5 text-blue-600" aria-hidden="true" /> */}
          {/* <span className="bg-blue-50 text-blue-600 text-[11px] font-semibold rounded-full px-2.5 py-0.5"> */}
            {/* {industry.share} SHARE */}
          {/* </span> */}
        </div>
        <h3 className="text-[20px] font-semibold text-slate-900 mt-1">{industry.name}</h3>
        <p className="text-[14px] text-slate-500 mt-1 leading-5 line-clamp-2">{industry.tagline}</p>
        <p className="text-[12px] text-slate-400 mt-2">
          Clients: {industry.clients.map((c) => c.name).join(', ')}
        </p>
        <div className="flex justify-between items-center border-t border-slate-100 pt-4 mt-4">
          <span className="text-[13px] text-slate-400">{industry.applications.length}+ applications</span>
          <span className="text-[14px] font-medium text-blue-600">Explore solutions →</span>
        </div>
      </div>
    </Link>
  )
}