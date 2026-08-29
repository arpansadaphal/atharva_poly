// 'use client';

// import { useEffect, useState } from 'react';
// import { useReducedMotion } from 'framer-motion';
// import { canUseWebGL } from '@/lib/webgl-support';
// import { exportRoutes } from '@/lib/international-reach-data';
// import GlobeStage from './international-reach/GlobeStage';
// import WorldRouteSchematic from './international-reach/WorldRouteSchematic';
// import ExportReachTextAlternative from './international-reach/ExportReachTextAlternative';

// const InternationalReach = () => {
//   const prefersReducedMotion = useReducedMotion();
//   const [mounted, setMounted] = useState(false);
//   const [showGlobe, setShowGlobe] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     // Check all conditions only on the client side
//     const isDesktop = window.innerWidth >= 1024;
//     const hasWebGL = canUseWebGL();
//     const shouldShowGlobe = isDesktop && hasWebGL && !prefersReducedMotion;
//     setShowGlobe(shouldShowGlobe);
//   }, [prefersReducedMotion]);

//   // Don't render anything until mounted to prevent hydration mismatch
//   if (!mounted) {
//     return (
//       <section aria-label="Export Markets" className="relative overflow-hidden bg-slate-900 section-padding">
//         <div className="noise-overlay" aria-hidden="true" />
//         <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
//             <div className="lg:col-span-2 space-y-6">
//               {/* Content column - render statically on server and client */}
//               <div className="flex items-center gap-3">
//                 <span className="w-8 h-0.5 bg-blue-500 inline-block" aria-hidden="true"></span>
//                 <span className="text-blue-400 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
//                   Export Markets
//                 </span>
//               </div>
//               <h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
//                 Manufacturing in India.
//                 <br />
//                 Delivering Beyond It.
//               </h2>
//               <p className="text-slate-400 text-[0.9375rem] leading-relaxed max-w-[48ch]">
//                 From MIDC Ranjangaon, Atharva Polymers currently supplies industrial clients across four international
//                 markets, including the United States and Mexico. Two additional export relationships are active under
//                 existing client confidentiality agreements.
//               </p>
//               <div className="flex items-end gap-4">
//                 <div>
//                   <span className="text-5xl font-bold text-white font-mono leading-none">{exportRoutes.length}+</span>
//                   <div className="text-[0.625rem] tracking-[0.12em] uppercase text-slate-500 mt-2 font-medium">
//                     Export Markets Served
//                   </div>
//                 </div>
//                 <span className="text-slate-500 text-xs font-mono pb-1">
//                   +2 additional markets — confidential
//                 </span>
//               </div>
//             </div>
//             <div className="lg:col-span-3 relative min-h-[400px] flex items-center justify-center">
//               {/* Placeholder - will be replaced after mount */}
//               <div className="w-full max-w-[600px] aspect-square bg-slate-800/20 rounded-lg"></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section aria-label="Export Markets" className="relative overflow-hidden bg-slate-900 section-padding">
//       <div className="noise-overlay" aria-hidden="true" />
//       <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
//           {/* Content column */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="flex items-center gap-3">
//               <span className="w-8 h-0.5 bg-blue-500 inline-block" aria-hidden="true"></span>
//               <span className="text-blue-400 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
//                 Export Markets
//               </span>
//             </div>
//             <h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
//               Manufacturing in India.
//               <br />
//               Delivering Beyond It.
//             </h2>
//             <p className="text-slate-400 text-[0.9375rem] leading-relaxed max-w-[48ch]">
//               From MIDC Ranjangaon, Atharva Polymers currently supplies industrial clients across four international
//               markets, including the United States and Mexico. Two additional export relationships are active under
//               existing client confidentiality agreements.
//             </p>
//             <div className="flex items-end gap-4">
//               <div>
//                 <span className="text-5xl font-bold text-white font-mono leading-none">{exportRoutes.length}+</span>
//                 <div className="text-[0.625rem] tracking-[0.12em] uppercase text-slate-500 mt-2 font-medium">
//                   Export Markets Served
//                 </div>
//               </div>
//               <span className="text-slate-500 text-xs font-mono pb-1">
//                 +2 additional markets — confidential
//               </span>
//             </div>
//             <div className="flex flex-wrap items-center gap-4 pt-2">
//               <a
//                 href="/contact?inquiry=quote"
//                 className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium text-sm px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
//               >
//                 Discuss Your Export Requirement
//               </a>
//               <a
//                 href={`https://wa.me/?text=${encodeURIComponent('Hello, I would like to discuss an export requirement.')}`}
//                 className="inline-flex items-center gap-2 text-slate-400 font-normal text-sm px-6 py-3 rounded-md border border-slate-700 hover:border-slate-500 hover:text-white transition-colors"
//               >
//                 Chat on WhatsApp
//               </a>
//             </div>
//             <ExportReachTextAlternative />
//           </div>

//           {/* Visual stage */}
//           <div className="lg:col-span-3 relative min-h-[400px]">
//             {showGlobe ? (
//               <div className="w-full h-full flex items-center justify-center">
//                 <GlobeStage />
//               </div>
//             ) : (
//               <WorldRouteSchematic />
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InternationalReach;


'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { canUseWebGL } from '@/lib/webgl-support';
import { exportRoutes } from '@/lib/international-reach-data';
import GlobeStage from './international-reach/GlobeStage';
import WorldRouteSchematic from './international-reach/WorldRouteSchematic';
import ExportReachTextAlternative from './international-reach/ExportReachTextAlternative';

const InternationalReach = () => {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDesktop = window.innerWidth >= 1024;
    const hasWebGL = canUseWebGL();
    const shouldShowGlobe = isDesktop && hasWebGL && !prefersReducedMotion;
    setShowGlobe(shouldShowGlobe);
  }, [prefersReducedMotion]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section aria-label="Export Markets" className="relative overflow-hidden bg-slate-900 section-padding">
        <div className="noise-overlay" aria-hidden="true" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-blue-500 inline-block" aria-hidden="true"></span>
                <span className="text-blue-400 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
                  Export Markets
                </span>
              </div>
              <h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
                Manufacturing in India.
                <br />
                Delivering Beyond It.
              </h2>
            </div>
            <div className="lg:col-span-3 relative min-h-[400px]">
              <div className="w-full aspect-square max-w-[620px] mx-auto bg-slate-800/10 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Export Markets" className="relative overflow-hidden bg-slate-900 section-padding">
      <div className="noise-overlay" aria-hidden="true" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">
          {/* Content column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-blue-500 inline-block" aria-hidden="true"></span>
              <span className="text-blue-400 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
                Export Markets
              </span>
            </div>
            
            <h2 className="text-white text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
              Manufacturing in India.
              <br />
              Delivering Beyond It.
            </h2>
            
            <p className="text-slate-400 text-[0.9375rem] leading-relaxed max-w-[48ch]">
              From MIDC Ranjangaon, Atharva Polymers currently supplies industrial clients across four international
              markets, including the United States and Mexico. Two additional export relationships are active under
              existing client confidentiality agreements.
            </p>
            
            <div className="flex items-end gap-4">
              <div>
                <span className="text-5xl font-bold text-white font-mono leading-none">
                  {exportRoutes.length}+
                </span>
                <div className="text-[0.625rem] tracking-[0.12em] uppercase text-slate-500 mt-2 font-medium">
                  Export Markets Served
                </div>
              </div>
              <span className="text-slate-500 text-xs font-mono pb-1">
                +2 additional markets — confidential
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/contact?inquiry=quote"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium text-sm px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Discuss Your Export Requirement
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Hello, I would like to discuss an export requirement.')}`}
                className="inline-flex items-center gap-2 text-slate-400 font-normal text-sm px-6 py-3 rounded-md border border-slate-700 hover:border-slate-500 hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
            
            <ExportReachTextAlternative />
          </div>

          {/* Visual stage */}
          <div className="lg:col-span-3 relative">
            {showGlobe ? <GlobeStage /> : <WorldRouteSchematic />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalReach;