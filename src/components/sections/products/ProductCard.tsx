// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import Link from 'next/link'
// import { Box } from 'lucide-react'
// import type { Product } from '@/types/products'

// interface ProductCardProps {
//   product: Product
//   variant?: 'default' | 'compact'
// }

// export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
//   const [hovered, setHovered] = useState(false)
//   const isCompact = variant === 'compact'

//   return (
//     <div
//       className="product-card bg-white border border-slate-200 rounded-xl overflow-hidden relative group"
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
//       <div className="aspect-[16/10] bg-slate-900 flex items-center justify-center relative overflow-hidden">
//         {product.images?.card ? (
//           <img src={product.images.card} alt={product.name} className="w-full h-full object-cover" />
//         ) : (
//           <div className="flex flex-col items-center text-slate-600">
//             <Box className="w-8 h-8" />
//             <span className="text-[12px] mt-2">{product.name}</span>
//           </div>
//         )}
//       </div>
//       <div className="p-5">
//         <span className="text-[12px] font-semibold text-blue-600 uppercase tracking-[0.08em] bg-blue-50 px-3 py-1 rounded-full inline-block">
//           {product.industries[0]?.replace('-', ' ') || 'Product'}
//         </span>
//         <h3 className="text-[18px] font-semibold text-slate-900 mt-3">{product.name}</h3>
//         <p className="text-[14px] text-slate-500 leading-6 mt-2 line-clamp-2">{product.shortDescription}</p>
//         {!isCompact && (
//           <>
//             <hr className="border-t border-slate-100 my-4" />
//             <div className="flex items-center justify-between">
//               <Link
//                 href={`/products/${product.slug}`}
//                 className="text-[14px] font-medium text-blue-600 hover:text-blue-700"
//               >
//                 View Details →
//               </Link>
//               <Link
//                 href={`/contact?product=${product.slug}`}
//                 className="text-[13px] text-slate-400 hover:text-blue-600 font-medium"
//               >
//                 Request Quote
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Box } from 'lucide-react'
import type { Product } from '@/types/products'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact'
  className?: string
}

export default function ProductCard({ product, variant = 'default', className }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const isCompact = variant === 'compact'

  return (
    <div
      className={`product-card bg-white border border-slate-200 rounded-xl overflow-hidden relative group ${className || ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Horizontal top-border sweep */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-blue-600 z-10"
        initial={{ width: 0 }}
        animate={{ width: hovered ? '100%' : 0 }}
        transition={{ duration: 0.2, ease: 'linear' }}
        aria-hidden="true"
      />

      {/* Image/Placeholder */}
  {/* Image/Placeholder */}
<div className={`${isCompact ? 'aspect-[16/9]' : 'aspect-[16/10]'} bg-slate-100 flex items-center justify-center relative overflow-hidden`}>
  {product.images?.card ? (
    <img
      src={product.images.card}
      alt={product.name}
      className="w-full h-full object-contain p-4"  // ← object-contain instead of object-cover
      loading="lazy"
    />
  ) : (
    <div className="flex flex-col items-center text-slate-600">
      <Box className="w-8 h-8" />
      <span className="text-[12px] mt-2">{product.name}</span>
    </div>
  )}
</div>

      {/* Card body */}
      <div className={`${isCompact ? 'p-4' : 'p-5 md:p-6'}`}>
        {/* Category badge */}
        <span className="text-[12px] font-semibold text-blue-600 uppercase tracking-[0.08em] bg-blue-50 px-3 py-1 rounded-full inline-block">
          {product.industries?.[0]?.replace(/-/g, ' ') || 'Product'}
        </span>

        {/* Title */}
        <h3 className={`${isCompact ? 'text-[16px]' : 'text-[18px]'} font-semibold text-slate-900 mt-3`}>
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[14px] text-slate-500 leading-6 mt-2 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Extended details (only for default variant) */}
        {!isCompact && (
          <>
            <hr className="border-t border-slate-100 my-4" />
            <div className="flex items-center justify-between">
              <Link
                href={`/products/${product.slug}`}
                className="text-[14px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                View Details →
              </Link>
              <Link
                href={`/contact?product=${product.slug}`}
                className="text-[13px] text-slate-400 hover:text-blue-600 font-medium transition-colors"
              >
                Request Quote
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}