'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { groupCompanies, GroupCompany } from '@/lib/group-data';

const ease = [0.22, 1, 0.36, 1];

const PANEL_COUNT = groupCompanies.length;
const ACTIVE_PERCENT = 55;
const INACTIVE_PERCENT = (100 - ACTIVE_PERCENT) / (PANEL_COUNT - 1);
const DEFAULT_PERCENT = 100 / PANEL_COUNT;
const TRACK_HEIGHT = 440;

export default function AtharvaGroupSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const headerInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });
  const trackInView = useInView(trackRef, { once: true, margin: '-80px 0px' });

  // Mark as mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ FIX: Initialize panels — set width and make them VISIBLE by default
  useEffect(() => {
    if (!isMounted) return;

    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      
      // Set initial width
      panel.style.width = `${DEFAULT_PERCENT}%`;
      
      // Make panel visible immediately (no hidden state)
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
      
      // Set will-change for performance
      panel.style.willChange = 'width';
    });
  }, [isMounted]);

  // ✅ FIX: Entrance animation — only animate if not yet visible
  useEffect(() => {
    if (!isMounted || !trackInView || !panelRefs.current.length) return;

    // If reduced motion, just ensure panels are visible
    if (prefersReducedMotion) {
      panelRefs.current.forEach((panel) => {
        if (panel) {
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        }
      });
      setPanelsVisible(true);
      return;
    }

    // Set initial hidden state ONLY if not already visible
    if (!panelsVisible) {
      panelRefs.current.forEach((panel) => {
        if (panel) {
          gsap.set(panel, { opacity: 0, y: 30 });
        }
      });

      // Animate in with a small delay
      gsap.to(panelRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: true,
        delay: 0.05,
        onComplete: () => setPanelsVisible(true),
      });
    }
  }, [trackInView, prefersReducedMotion, isMounted, panelsVisible]);

  // ✅ FALLBACK: If for any reason panels aren't visible after 2s, force show them
  useEffect(() => {
    if (!isMounted) return;

    const fallbackTimer = setTimeout(() => {
      if (!panelsVisible && panelRefs.current.length) {
        panelRefs.current.forEach((panel) => {
          if (panel) {
            gsap.set(panel, { opacity: 1, y: 0 });
          }
        });
        setPanelsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, [isMounted, panelsVisible]);

  const expandPanel = useCallback(
    (index: number) => {
      if (!panelRefs.current.length || !isMounted) return;

      if (prefersReducedMotion) {
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          panel.style.width = i === index ? `${ACTIVE_PERCENT}%` : `${INACTIVE_PERCENT}%`;
        });
        setActiveIndex(index);
        return;
      }

      if (activeIndex === index) return;
      setActiveIndex(index);

      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;

        gsap.to(panel, {
          width: i === index ? `${ACTIVE_PERCENT}%` : `${INACTIVE_PERCENT}%`,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: true,
        });

        panel.setAttribute('aria-expanded', i === index ? 'true' : 'false');
      });
    },
    [activeIndex, prefersReducedMotion, isMounted]
  );

  const collapseAll = useCallback(() => {
    if (activeIndex === null || !isMounted) return;
    setActiveIndex(null);

    if (prefersReducedMotion) {
      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        panel.style.width = `${DEFAULT_PERCENT}%`;
        panel.setAttribute('aria-expanded', 'false');
      });
      return;
    }

    panelRefs.current.forEach((panel) => {
      if (!panel) return;

      gsap.to(panel, {
        width: `${DEFAULT_PERCENT}%`,
        duration: 0.4,
        ease: 'power3.inOut',
        overwrite: true,
      });

      panel.setAttribute('aria-expanded', 'false');
    });
  }, [activeIndex, prefersReducedMotion, isMounted]);

  const handleTrackMouseEnter = () => {
    panelRefs.current.forEach((panel) => {
      if (panel) panel.style.willChange = 'width';
    });
  };

  const handleTrackMouseLeave = () => {
    setTimeout(() => {
      panelRefs.current.forEach((panel) => {
        if (panel) panel.style.willChange = 'auto';
      });
    }, 500);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="The Atharva Group — manufacturing entities"
      className="relative bg-slate-900 overflow-hidden pb-24"
    >
      <NoiseOverlay />

      {/* Header area */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-16 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={isMounted && headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          <Image
            src="/assets/logos/logo1.png"
            alt="Atharva Group Logo"
            width={120}
            height={36}
            className="h-[36px] w-auto mb-6"
            priority={false}
          />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={isMounted && headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <SectionHeader
            eyebrow="THE ATHARVA GROUP"
            headline="Five Industries. One Group."
            theme="dark"
          />
        </motion.div>

        <motion.p
          className="text-[16px] text-slate-400 leading-7 max-w-[700px] mt-5"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          animate={isMounted && headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease }}
        >
          Atharva Polymers is one of five manufacturing businesses within the Atharva Group —
          a diversified industrial family built on precision, discipline, and long‑term
          supply relationships across sectors.
        </motion.p>
      </div>

      {/* Desktop horizontal panel track */}
      <div
        ref={trackRef}
        className="hidden lg:flex w-full overflow-hidden"
        style={{ height: `${TRACK_HEIGHT}px` }}
        onMouseEnter={handleTrackMouseEnter}
        onMouseLeave={() => {
          handleTrackMouseLeave();
          collapseAll();
        }}
        role="list"
        aria-label="Manufacturing entities"
      >
        {groupCompanies.map((company, index) => (
          <PanelButton
            key={company.id}
            company={company}
            index={index}
            isActive={activeIndex === index}
            onHover={() => expandPanel(index)}
            onFocus={() => expandPanel(index)}
            onBlur={() => setTimeout(collapseAll, 100)}
            panelRef={(el) => {
              panelRefs.current[index] = el;
            }}
          />
        ))}
      </div>

      {/* Mobile accordion */}
      <MobileAccordion companies={groupCompanies} />
    </section>
  );
}

function PanelButton({
  company,
  index,
  isActive,
  onHover,
  onFocus,
  onBlur,
  panelRef,
}: {
  company: GroupCompany;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onFocus: () => void;
  onBlur: () => void;
  panelRef: (el: HTMLButtonElement | null) => void;
}) {
  const isPrimary = company.isPrimary;

  return (
    <button
      ref={panelRef}
      className={`
        relative h-full flex-shrink-0 overflow-hidden cursor-pointer
        bg-slate-900 text-white text-left outline-none
        focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset
        ${index < groupCompanies.length - 1 ? 'border-r border-white/[0.06]' : ''}
        ${isPrimary ? 'border-t-2 border-blue-600' : ''}
      `}
      style={{ width: `${DEFAULT_PERCENT}%` }}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-expanded={isActive}
      aria-label={`${company.fullName} — ${company.sectorDescriptor}`}
      role="listitem"
    >
      {/* Image layer */}
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url('${company.image}')`,
          backgroundSize: 'auto 100%',
          backgroundPosition: 'left top',
        }}
        aria-hidden="true"
      />

      {/* Logo overlay */}
      <div
        className="absolute top-4 left-4 z-[5] flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider"
        aria-hidden="true"
      >
        {company.shortName.substring(0, 2)}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent pointer-events-none" />

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key={company.id}
            className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, delay: 0.18, ease }}
          >
            <div className="relative z-10">
              <h3 className="text-[28px] lg:text-[34px] font-semibold text-white leading-[1.1] max-w-[460px]">
                {company.fullName}
              </h3>
              <p className="text-[14px] font-medium text-slate-400 mt-2">
                {company.sectorDescriptor}
              </p>

              {isPrimary ? (
                <span className="mt-6 inline-flex items-center bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-[0.08em]">
                  This website
                </span>
              ) : company.websiteUrl ? (
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label={`Visit ${company.shortName} website — opens in a new tab`}
                >
                  Visit {company.shortName} <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function MobileAccordion({ companies }: { companies: GroupCompany[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="lg:hidden max-w-[1280px] mx-auto px-6 relative z-10" role="list">
      {companies.map((company, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={company.id} className="border-b border-white/[0.08]" role="listitem">
            <button
              className="w-full flex items-center justify-between py-5 bg-transparent text-slate-300 cursor-pointer text-left hover:bg-white/[0.02] transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-semibold">{company.shortName}</span>

              <svg
                className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="overflow-hidden"
                >
                  <div className="px-[52px] pb-6">
                    <div
                      className="w-full h-[140px] bg-cover bg-center rounded mb-4"
                      style={{ backgroundImage: `url('${company.image}')` }}
                    />
                    <div className="font-semibold text-white mb-1">{company.fullName}</div>
                    <div className="text-slate-400 mb-4">{company.sectorDescriptor}</div>
                    {company.isPrimary ? (
                      <span className="inline-flex items-center bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-[0.08em]">
                        This website
                      </span>
                    ) : company.websiteUrl ? (
                      <a
                        href={company.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-400 hover:text-blue-300"
                        aria-label={`Visit ${company.shortName} website — opens in a new tab`}
                      >
                        Visit {company.shortName} <span aria-hidden="true">→</span>
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}


// 'use client';

// import { useRef, useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
// import Image from 'next/image';
// import { gsap } from 'gsap';
// import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
// import { SectionHeader } from '@/components/ui/SectionHeader';
// import { groupCompanies, GroupCompany } from '@/lib/group-data';

// // Easing array for Framer Motion
// const ease = [0.22, 1, 0.36, 1];

// // Panel sizing constants
// const PANEL_COUNT = groupCompanies.length;
// const ACTIVE_PERCENT = 55;
// const INACTIVE_PERCENT = (100 - ACTIVE_PERCENT) / (PANEL_COUNT - 1);
// const DEFAULT_PERCENT = 100 / PANEL_COUNT;
// const TRACK_HEIGHT = 440; // px

// export default function AtharvaGroupSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const prefersReducedMotion = useReducedMotion();
//   const headerInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });
//   const trackInView = useInView(trackRef, { once: true, margin: '-80px 0px' });

//   // Expand a panel to active state
//   const expandPanel = useCallback(
//     (index: number) => {
//       if (!panelRefs.current.length) return;

//       if (prefersReducedMotion) {
//         panelRefs.current.forEach((panel, i) => {
//           if (!panel) return;
//           panel.style.width = i === index ? `${ACTIVE_PERCENT}%` : `${INACTIVE_PERCENT}%`;
//         });
//         setActiveIndex(index);
//         return;
//       }

//       if (activeIndex === index) return;
//       setActiveIndex(index);

//       panelRefs.current.forEach((panel, i) => {
//         if (!panel) return;

//         // Panel width
//         gsap.to(panel, {
//           width: i === index ? `${ACTIVE_PERCENT}%` : `${INACTIVE_PERCENT}%`,
//           duration: 0.5,
//           ease: 'power3.out',
//           overwrite: true,
//         });

//         // Update aria-expanded
//         panel.setAttribute('aria-expanded', i === index ? 'true' : 'false');
//       });
//     },
//     [activeIndex, prefersReducedMotion]
//   );

//   // Collapse all panels to default state
//   const collapseAll = useCallback(() => {
//     if (activeIndex === null) return;
//     setActiveIndex(null);

//     if (prefersReducedMotion) {
//       panelRefs.current.forEach((panel) => {
//         if (!panel) return;
//         panel.style.width = `${DEFAULT_PERCENT}%`;
//         panel.setAttribute('aria-expanded', 'false');
//       });
//       return;
//     }

//     panelRefs.current.forEach((panel) => {
//       if (!panel) return;

//       gsap.to(panel, {
//         width: `${DEFAULT_PERCENT}%`,
//         duration: 0.4,
//         ease: 'power3.inOut',
//         overwrite: true,
//       });

//       panel.setAttribute('aria-expanded', 'false');
//     });
//   }, [activeIndex, prefersReducedMotion]);

//   // Entrance animation for panel track
//   useEffect(() => {
//     if (!trackInView || !panelRefs.current.length) return;

//     if (prefersReducedMotion) {
//       panelRefs.current.forEach((panel) => {
//         if (panel) {
//           panel.style.opacity = '1';
//           panel.style.transform = 'translateY(0)';
//         }
//       });
//       return;
//     }

//     gsap.fromTo(
//       panelRefs.current,
//       { opacity: 0, y: 30 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.6,
//         stagger: 0.08,
//         ease: 'power3.out',
//         overwrite: true,
//       }
//     );
//   }, [trackInView, prefersReducedMotion]);

//   // Will-change management for performance
//   const handleTrackMouseEnter = () => {
//     panelRefs.current.forEach((panel) => {
//       if (panel) panel.style.willChange = 'width';
//     });
//   };

//   const handleTrackMouseLeave = () => {
//     setTimeout(() => {
//       panelRefs.current.forEach((panel) => {
//         if (panel) panel.style.willChange = 'auto';
//       });
//     }, 500);
//   };

//   return (
//     <section
//       ref={sectionRef}
//       aria-label="The Atharva Group — manufacturing entities"
//       className="relative bg-slate-900 overflow-hidden pb-24"
//     >
//       <NoiseOverlay />

//       {/* Header area */}
//       <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-16 relative z-10">
//         <motion.div
//           initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
//           animate={headerInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.1, ease }}
//         >
//           <Image
//             src="/assets/logos/logo1.png"
//             alt="Atharva Group Logo"
//             width={120}
//             height={36}
//             className="h-[36px] w-auto mb-6"
//             priority={false}
//           />
//         </motion.div>

//         <motion.div
//           initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
//           animate={headerInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.2, ease }}
//         >
//           <SectionHeader
//             eyebrow="THE ATHARVA GROUP"
//             headline="Five Industries. One Group."
//             theme="dark"
//           />
//         </motion.div>

//         <motion.p
//           className="text-[16px] text-slate-400 leading-7 max-w-[700px] mt-5"
//           initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
//           animate={headerInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.3, ease }}
//         >
//           Atharva Polymers is one of five manufacturing businesses within the Atharva Group —
//           a diversified industrial family built on precision, discipline, and long‑term
//           supply relationships across sectors.
//         </motion.p>
//       </div>

//       {/* Desktop horizontal panel track */}
//       <div
//         ref={trackRef}
//         className="hidden lg:flex w-full overflow-hidden"
//         style={{ height: `${TRACK_HEIGHT}px` }}
//         onMouseEnter={handleTrackMouseEnter}
//         onMouseLeave={() => {
//           handleTrackMouseLeave();
//           collapseAll();
//         }}
//         role="list"
//         aria-label="Manufacturing entities"
//       >
//         {groupCompanies.map((company, index) => (
//           <PanelButton
//             key={company.id}
//             company={company}
//             index={index}
//             isActive={activeIndex === index}
//             onHover={() => expandPanel(index)}
//             onFocus={() => expandPanel(index)}
//             onBlur={() => setTimeout(collapseAll, 100)}
//             panelRef={(el) => {
//               panelRefs.current[index] = el;
//             }}
//           />
//         ))}
//       </div>

//       {/* Mobile accordion */}
//       <MobileAccordion companies={groupCompanies} />
//     </section>
//   );
// }

// // ----------------------------------------------------------------------
// // Desktop Panel Button (no numbering, softer overlay)
// // ----------------------------------------------------------------------
// function PanelButton({
//   company,
//   index,
//   isActive,
//   onHover,
//   onFocus,
//   onBlur,
//   panelRef,
// }: {
//   company: GroupCompany;
//   index: number;
//   isActive: boolean;
//   onHover: () => void;
//   onFocus: () => void;
//   onBlur: () => void;
//   panelRef: (el: HTMLButtonElement | null) => void;
// }) {
//   const isPrimary = company.isPrimary;

//   return (
//     <button
//       ref={panelRef}
//       className={`
//         relative h-full flex-shrink-0 overflow-hidden cursor-pointer
//         bg-slate-900 text-white text-left outline-none
//         focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset
//         ${index < groupCompanies.length - 1 ? 'border-r border-white/[0.06]' : ''}
//         ${isPrimary ? 'border-t-2 border-blue-600' : ''}
//       `}
//       style={{ width: `${DEFAULT_PERCENT}%` }}
//       onMouseEnter={onHover}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       aria-expanded={isActive}
//       aria-label={`${company.fullName} — ${company.sectorDescriptor}`}
//       role="listitem"
//     >
//       {/* Image layer */}
//       <div
//         className="absolute inset-0 bg-no-repeat"
//         style={{
//           backgroundImage: `url('${company.image}')`,
//           backgroundSize: 'auto 100%',
//           backgroundPosition: 'left top',
//         }}
//         aria-hidden="true"
//       />

//       {/* Logo overlay – top-left */}
//       <div
//         className="absolute top-4 left-4 z-[5] flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider"
//         aria-hidden="true"
//       >
//         {company.shortName.substring(0, 2)}
//       </div>

//       {/* Softer gradient overlay – much lighter than before */}
//       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent pointer-events-none" />

//       {/* Active content (no number) */}
//       <AnimatePresence>
//         {isActive && (
//           <motion.div
//             key={company.id}
//             className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14"
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 8 }}
//             transition={{ duration: 0.28, delay: 0.18, ease }}
//           >
//             <div className="relative z-10">
//               <h3 className="text-[28px] lg:text-[34px] font-semibold text-white leading-[1.1] max-w-[460px]">
//                 {company.fullName}
//               </h3>
//               <p className="text-[14px] font-medium text-slate-400 mt-2">
//                 {company.sectorDescriptor}
//               </p>

//               {isPrimary ? (
//                 <span className="mt-6 inline-flex items-center bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-[0.08em]">
//                   This website
//                 </span>
//               ) : company.websiteUrl ? (
//                 <a
//                   href={company.websiteUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-400 hover:text-blue-300 transition-colors"
//                   aria-label={`Visit ${company.shortName} website — opens in a new tab`}
//                 >
//                   Visit {company.shortName} <span aria-hidden="true">→</span>
//                 </a>
//               ) : null}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </button>
//   );
// }

// // ----------------------------------------------------------------------
// // Mobile Accordion (no numbers)
// // ----------------------------------------------------------------------
// function MobileAccordion({ companies }: { companies: GroupCompany[] }) {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   return (
//     <div className="lg:hidden max-w-[1280px] mx-auto px-6 relative z-10" role="list">
//       {companies.map((company, index) => {
//         const isOpen = openIndex === index;
//         return (
//           <div key={company.id} className="border-b border-white/[0.08]" role="listitem">
//             <button
//               className="w-full flex items-center justify-between py-5 bg-transparent text-slate-300 cursor-pointer text-left hover:bg-white/[0.02] transition-colors"
//               onClick={() => setOpenIndex(isOpen ? null : index)}
//               aria-expanded={isOpen}
//             >
//               {/* Only the short name – no number */}
//               <span className="text-[15px] font-semibold">{company.shortName}</span>

//               <svg
//                 className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>

//             <AnimatePresence initial={false}>
//               {isOpen && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3, ease }}
//                   className="overflow-hidden"
//                 >
//                   <div className="px-[52px] pb-6">
//                     <div
//                       className="w-full h-[140px] bg-cover bg-center rounded mb-4"
//                       style={{ backgroundImage: `url('${company.image}')` }}
//                     />
//                     <div className="font-semibold text-white mb-1">{company.fullName}</div>
//                     <div className="text-slate-400 mb-4">{company.sectorDescriptor}</div>
//                     {company.isPrimary ? (
//                       <span className="inline-flex items-center bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-[0.08em]">
//                         This website
//                       </span>
//                     ) : company.websiteUrl ? (
//                       <a
//                         href={company.websiteUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-400 hover:text-blue-300"
//                         aria-label={`Visit ${company.shortName} website — opens in a new tab`}
//                       >
//                         Visit {company.shortName} <span aria-hidden="true">→</span>
//                       </a>
//                     ) : null}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// 'use client';

// import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
// import Image from 'next/image';
// import { gsap } from 'gsap';
// import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
// import { SectionHeader } from '@/components/ui/SectionHeader';
// import { groupCompanies, GroupCompany } from '@/lib/group-data';

// // Constants
// const ease = [0.22, 1, 0.36, 1];
// const PANEL_COUNT = groupCompanies.length;
// const ACTIVE_PERCENT = 55;
// const INACTIVE_PERCENT = (100 - ACTIVE_PERCENT) / (PANEL_COUNT - 1);
// const DEFAULT_PERCENT = 100 / PANEL_COUNT;
// const TRACK_HEIGHT = 440;
// const ANIMATION_DURATION = 0.5;
// const COLLAPSE_DELAY = 300;

// export default function AtharvaGroupSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const prefersReducedMotion = useReducedMotion();
//   const headerInView = useInView(sectionRef, { once: true, margin: '-80px 0px' });
//   const trackInView = useInView(trackRef, { once: true, margin: '-80px 0px' });
//   const [isHovering, setIsHovering] = useState(false);

//   const expandPanel = useCallback(
//     (index: number) => {
//       if (!panelRefs.current.length || activeIndex === index) return;

//       if (prefersReducedMotion) {
//         panelRefs.current.forEach((panel, i) => {
//           if (!panel) return;
//           panel.style.width = i === index ? `${ACTIVE_PERCENT}%` : `${INACTIVE_PERCENT}%`;
//         });
//         setActiveIndex(index);
//         return;
//       }

//       setActiveIndex(index);

//       panelRefs.current.forEach((panel, i) => {
//         if (!panel) return;

//         gsap.to(panel, {
//           width: i === index ? `${ACTIVE_PERCENT}%` : `${INACTIVE_PERCENT}%`,
//           duration: ANIMATION_DURATION,
//           ease: 'power3.out',
//           overwrite: true,
//         });

//         panel.setAttribute('aria-expanded', i === index ? 'true' : 'false');
//       });
//     },
//     [activeIndex, prefersReducedMotion]
//   );

//   const collapseAll = useCallback(() => {
//     if (activeIndex === null) return;
//     setActiveIndex(null);

//     if (prefersReducedMotion) {
//       panelRefs.current.forEach((panel) => {
//         if (!panel) return;
//         panel.style.width = `${DEFAULT_PERCENT}%`;
//         panel.setAttribute('aria-expanded', 'false');
//       });
//       return;
//     }

//     panelRefs.current.forEach((panel) => {
//       if (!panel) return;
//       gsap.to(panel, {
//         width: `${DEFAULT_PERCENT}%`,
//         duration: 0.4,
//         ease: 'power3.inOut',
//         overwrite: true,
//       });
//       panel.setAttribute('aria-expanded', 'false');
//     });
//   }, [activeIndex, prefersReducedMotion]);

//   // Entrance animation
//   useEffect(() => {
//     if (!trackInView || !panelRefs.current.length) return;

//     if (prefersReducedMotion) {
//       panelRefs.current.forEach((panel) => {
//         if (panel) {
//           panel.style.opacity = '1';
//           panel.style.transform = 'translateY(0)';
//         }
//       });
//       return;
//     }

//     gsap.fromTo(
//       panelRefs.current,
//       { opacity: 0, y: 30 },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.6,
//         stagger: 0.08,
//         ease: 'power3.out',
//         overwrite: true,
//       }
//     );
//   }, [trackInView, prefersReducedMotion]);

//   const handleTrackMouseEnter = useCallback(() => {
//     setIsHovering(true);
//     panelRefs.current.forEach((panel) => {
//       if (panel) panel.style.willChange = 'width';
//     });
//   }, []);

//   const handleTrackMouseLeave = useCallback(() => {
//     setIsHovering(false);
//     setTimeout(() => {
//       panelRefs.current.forEach((panel) => {
//         if (panel) panel.style.willChange = 'auto';
//       });
//     }, COLLAPSE_DELAY);
//     collapseAll();
//   }, [collapseAll]);

//   return (
//     <section
//       ref={sectionRef}
//       aria-label="The Atharva Group — manufacturing entities"
//       className="relative bg-slate-900 overflow-hidden pb-24"
//     >
//       <NoiseOverlay opacity={0.03} />

//       {/* Header */}
//       <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-16 relative z-10">
//         <motion.div
//           initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
//           animate={headerInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.1, ease }}
//         >
//           <Image
//             src="/assets/logos/logo1.png"
//             alt="Atharva Group Logo"
//             width={120}
//             height={36}
//             className="h-[36px] w-auto mb-6"
//             priority={false}
//           />
//         </motion.div>

//         <motion.div
//           initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
//           animate={headerInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.2, ease }}
//         >
//           <SectionHeader
//             eyebrow="THE ATHARVA GROUP"
//             headline="Five Industries. One Group."
//             theme="dark"
//           />
//         </motion.div>

//         <motion.p
//           className="text-[16px] text-slate-400 leading-relaxed max-w-[700px] mt-5"
//           initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
//           animate={headerInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.3, ease }}
//         >
//           Atharva Polymers is one of five manufacturing businesses within the Atharva Group —
//           a diversified industrial family built on precision, discipline, and long‑term
//           supply relationships across sectors.
//         </motion.p>
//       </div>

//       {/* Desktop Panel Track */}
//       <div
//         ref={trackRef}
//         className="hidden lg:flex w-full overflow-hidden relative"
//         style={{ height: `${TRACK_HEIGHT}px` }}
//         onMouseEnter={handleTrackMouseEnter}
//         onMouseLeave={handleTrackMouseLeave}
//         role="list"
//         aria-label="Manufacturing entities"
//       >
//         {groupCompanies.map((company, index) => (
//           <PanelButton
//             key={company.id}
//             company={company}
//             index={index}
//             isActive={activeIndex === index}
//             isHovering={isHovering}
//             onHover={() => expandPanel(index)}
//             onFocus={() => expandPanel(index)}
//             onBlur={() => setTimeout(collapseAll, 100)}
//             panelRef={(el) => {
//               panelRefs.current[index] = el;
//             }}
//           />
//         ))}
//       </div>

//       {/* Mobile Accordion */}
//       <MobileAccordion companies={groupCompanies} />
//     </section>
//   );
// }

// // ----------------------------------------------------------------------
// // Desktop Panel Button
// // ----------------------------------------------------------------------
// function PanelButton({
//   company,
//   index,
//   isActive,
//   isHovering,
//   onHover,
//   onFocus,
//   onBlur,
//   panelRef,
// }: {
//   company: GroupCompany;
//   index: number;
//   isActive: boolean;
//   isHovering: boolean;
//   onHover: () => void;
//   onFocus: () => void;
//   onBlur: () => void;
//   panelRef: (el: HTMLButtonElement | null) => void;
// }) {
//   const isPrimary = company.isPrimary;
//   const initials = useMemo(() => company.shortName.substring(0, 2).toUpperCase(), [company.shortName]);

//   return (
//     <button
//       ref={panelRef}
//       className={`
//         relative h-full flex-shrink-0 overflow-hidden cursor-pointer
//         bg-slate-900 text-white text-left outline-none
//         focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
//         transition-colors duration-300
//         ${index < groupCompanies.length - 1 ? 'border-r border-white/[0.06]' : ''}
//         ${isPrimary ? 'border-t-2 border-blue-500' : ''}
//         ${isActive ? 'z-10' : 'z-0'}
//       `}
//       style={{ width: `${DEFAULT_PERCENT}%` }}
//       onMouseEnter={onHover}
//       onFocus={onFocus}
//       onBlur={onBlur}
//       aria-expanded={isActive}
//       aria-label={`${company.fullName} — ${company.sectorDescriptor}`}
//       role="listitem"
//     >
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
//         style={{
//           backgroundImage: `url('${company.image}')`,
//           transform: isActive ? 'scale(1.05)' : 'scale(1)',
//         }}
//         aria-hidden="true"
//       />

//       {/* Gradient Overlay - softer and more refined */}
//       <div 
//         className={`
//           absolute inset-0 pointer-events-none transition-opacity duration-500
//           ${isActive 
//             ? 'bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent' 
//             : 'bg-gradient-to-t from-slate-900/60 via-slate-900/30 to-transparent'
//           }
//         `} 
//       />

//       {/* Logo Initials Badge */}
//       <div
//         className="absolute top-5 left-5 z-[5] flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 hover:bg-white/20 hover:scale-105"
//         aria-hidden="true"
//       >
//         {initials}
//       </div>

//       {/* Primary Indicator */}
//       {isPrimary && (
//         <div className="absolute top-5 right-5 z-[5] flex items-center gap-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-400 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-[0.08em]">
//           <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
//           Primary
//         </div>
//       )}

//       {/* Active Content */}
//       <AnimatePresence>
//         {isActive && (
//           <motion.div
//             key={company.id}
//             className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ 
//               duration: 0.35, 
//               delay: 0.15, 
//               ease: [0.22, 1, 0.36, 1] 
//             }}
//           >
//             <div className="relative z-10 max-w-[480px]">
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.25 }}
//                 className="space-y-3"
//               >
//                 <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
//                   {company.fullName}
//                 </h3>
//                 <p className="text-base font-medium text-slate-300">
//                   {company.sectorDescriptor}
//                 </p>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.35 }}
//                 className="mt-6"
//               >
//                 {isPrimary ? (
//                   <span className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-[0.08em]">
//                     <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
//                     Current website
//                   </span>
//                 ) : company.websiteUrl ? (
//                   <a
//                     href={company.websiteUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
//                     aria-label={`Visit ${company.shortName} website — opens in a new tab`}
//                   >
//                     Visit {company.shortName}
//                     <span 
//                       className="transition-transform duration-300 group-hover:translate-x-1" 
//                       aria-hidden="true"
//                     >
//                       →
//                     </span>
//                   </a>
//                 ) : null}
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Hover indicator for inactive panels */}
//       {!isActive && isHovering && (
//         <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500/30 transition-all duration-300" />
//       )}
//     </button>
//   );
// }

// // ----------------------------------------------------------------------
// // Mobile Accordion (Enhanced)
// // ----------------------------------------------------------------------
// function MobileAccordion({ companies }: { companies: GroupCompany[] }) {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleAccordion = useCallback((index: number) => {
//     setOpenIndex(prev => prev === index ? null : index);
//   }, []);

//   return (
//     <div className="lg:hidden max-w-[1280px] mx-auto px-6 relative z-10">
//       <div className="space-y-0" role="list">
//         {companies.map((company, index) => {
//           const isOpen = openIndex === index;
//           const isPrimary = company.isPrimary;
//           const initials = useMemo(() => company.shortName.substring(0, 2).toUpperCase(), [company.shortName]);

//           return (
//             <div 
//               key={company.id} 
//               className="border-b border-white/[0.06] last:border-b-0" 
//               role="listitem"
//             >
//               <button
//                 className={`
//                   w-full flex items-center justify-between py-4 px-3 
//                   bg-transparent text-slate-300 cursor-pointer text-left 
//                   transition-all duration-300
//                   hover:bg-white/[0.03]
//                   ${isOpen ? 'bg-white/[0.03]' : ''}
//                 `}
//                 onClick={() => toggleAccordion(index)}
//                 aria-expanded={isOpen}
//                 aria-controls={`accordion-content-${index}`}
//               >
//                 <div className="flex items-center gap-3 min-w-0">
//                   <div className={`
//                     flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center
//                     ${isPrimary ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/5 border border-white/10'}
//                     text-xs font-bold uppercase tracking-wider
//                     ${isPrimary ? 'text-blue-400' : 'text-slate-500'}
//                   `}>
//                     {initials}
//                   </div>
//                   <span className="text-sm font-semibold truncate">{company.shortName}</span>
//                   {isPrimary && (
//                     <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
//                   )}
//                 </div>

//                 <svg
//                   className={`
//                     w-4 h-4 text-slate-500 transition-all duration-300 flex-shrink-0 ml-2
//                     ${isOpen ? 'rotate-180' : ''}
//                   `}
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>

//               <AnimatePresence initial={false}>
//                 {isOpen && (
//                   <motion.div
//                     id={`accordion-content-${index}`}
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                     className="overflow-hidden"
//                   >
//                     <div className="px-4 pb-5 pt-1">
//                       <div
//                         className="w-full h-[160px] bg-cover bg-center rounded-lg mb-4 shadow-lg"
//                         style={{ backgroundImage: `url('${company.image}')` }}
//                         role="img"
//                         aria-label={`${company.shortName} background image`}
//                       />
//                       <div className="space-y-2">
//                         <div className="font-semibold text-white text-base">
//                           {company.fullName}
//                         </div>
//                         <div className="text-sm text-slate-400">
//                           {company.sectorDescriptor}
//                         </div>
//                       </div>
//                       <div className="mt-4">
//                         {isPrimary ? (
//                           <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-[0.08em]">
//                             <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
//                             Current website
//                           </span>
//                         ) : company.websiteUrl ? (
//                           <a
//                             href={company.websiteUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
//                             aria-label={`Visit ${company.shortName} website — opens in a new tab`}
//                           >
//                             Visit {company.shortName}
//                             <span 
//                               className="transition-transform duration-300 group-hover:translate-x-1" 
//                               aria-hidden="true"
//                             >
//                               →
//                             </span>
//                           </a>
//                         ) : null}
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


