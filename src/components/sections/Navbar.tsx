// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X, MessageCircle } from 'lucide-react'
// import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
// import { cn } from '@/lib/utils'
// import { navigation, company } from '@/lib/data'
// import { buildWhatsAppURL } from '@/lib/whatsapp'
// import { navbarReveal, mobileMenuReveal, mobileNavItem, ease } from '@/lib/animations'

// const FOCUS =
//   'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'

// /**
//  * Navbar — primary navigation shell.
//  *
//  * Behaviour (from IMPLEMENTATION_MASTER_PLAN.md §5 Section 1):
//  * - Fixed, full-width, z-50
//  * - Transparent over dark hero → solid white + shadow after 80px scroll (300ms)
//  * - Desktop: logo | nav links (centered) | WhatsApp icon + Request Quote button
//  * - Mobile (<1024px): logo | hamburger → full-screen dark overlay
//  * - Body scroll locked while mobile menu is open
//  * - Menu closes automatically on route change
//  *
//  * Initial load animation: opacity 0, y -12 → opacity 1, y 0 (500ms, 100ms delay)
//  */
// export function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const pathname = usePathname()

//   // ── Scroll detection ──────────────────────────────────────────────────────
//   useEffect(() => {
//   const handler = () => setScrolled(window.scrollY > 80)

//   // Initialize on mount
//   handler()

//   window.addEventListener('scroll', handler, { passive: true })

//   return () => {
//     window.removeEventListener('scroll', handler)
//   }
// }, [])

//   // ── Body scroll lock ──────────────────────────────────────────────────────
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? 'hidden' : ''
//     return () => { document.body.style.overflow = '' }
//   }, [menuOpen])

//   // ── Close menu on route change ────────────────────────────────────────────
//   // useEffect(() => { setMenuOpen(false) }, [pathname])

//   const isActive = (href: string) =>
//     href === '/' ? pathname === '/' : pathname.startsWith(href)

//   return (
//     <>
//       {/* ── Fixed Header ─────────────────────────────────────────────────── */}
//       <motion.header
//         className="fixed top-0 left-0 right-0 z-50 h-[72px]"
//         style={{
//           backgroundColor: scrolled || menuOpen ? '#ffffff' : 'transparent',
//           boxShadow: scrolled && !menuOpen ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
//           transition: 'background-color 300ms ease-out, box-shadow 300ms ease-out',
//         }}
//         initial="hidden"
//         animate="visible"
//         variants={navbarReveal}
//       >
//         <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">

//           {/* ── Logo ───────────────────────────────────────────────────────── */}
//           <Link
//             href="/"
//             className={cn(
//               'text-[17px] font-semibold tracking-tight transition-colors duration-300 flex-shrink-0',
//               FOCUS,
//               scrolled || menuOpen ? 'text-slate-900' : 'text-white'
//             )}
//           >
//             {company.name}
//           </Link>

//           {/* ── Desktop Navigation ─────────────────────────────────────────── */}
//           <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
//             {navigation.primary.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   'relative text-[15px] font-medium transition-colors duration-200 group py-1',
//                   FOCUS,
//                   scrolled
//                     ? isActive(item.href)
//                       ? 'text-blue-600'
//                       : 'text-slate-600 hover:text-blue-600'
//                     : isActive(item.href)
//                       ? 'text-blue-400'
//                       : 'text-white/80 hover:text-white'
//                 )}
//               >
//                 {item.label}
//                 {/* Underline — present when active, animates in on hover */}
//                 <span
//                   className={cn(
//                     'absolute -bottom-0.5 left-0 h-0.5 bg-blue-600 transition-all duration-200',
//                     isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
//                   )}
//                 />
//               </Link>
//             ))}
//           </nav>

//           {/* ── Desktop CTAs ───────────────────────────────────────────────── */}
//           <div className="hidden lg:flex items-center gap-3">
//             {/* WhatsApp icon */}
//             <a
//               href={buildWhatsAppURL()}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={cn(
//                 'flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200',
//                 FOCUS,
//                 scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
//               )}
//               aria-label="Contact us on WhatsApp"
//             >
//               <MessageCircle size={22} aria-hidden="true" />
//             </a>

//             {/* Request Quote — primary CTA */}
//             <Link
//               href="/contact"
//               className={cn(
//                 'h-[38px] px-5 bg-blue-600 text-white text-[15px] font-semibold rounded-lg',
//                 'hover:bg-blue-700 transition-colors duration-150',
//                 'inline-flex items-center justify-center flex-shrink-0',
//                 FOCUS
//               )}
//             >
//               Request Quote
//             </Link>
//           </div>

//           {/* ── Hamburger (mobile) ─────────────────────────────────────────── */}
//           <button
//             className={cn(
//               'lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
//               FOCUS,
//               scrolled || menuOpen ? 'text-slate-700' : 'text-white'
//             )}
//             onClick={() => setMenuOpen((v) => !v)}
//             aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
//             aria-expanded={menuOpen}
//             aria-controls="mobile-menu"
//           >
//             <AnimatePresence mode="wait" initial={false}>
//               {menuOpen ? (
//                 <motion.span
//                   key="close"
//                   initial={{ rotate: -90, opacity: 0 }}
//                   animate={{ rotate: 0,   opacity: 1 }}
//                   exit={{   rotate: 90,   opacity: 0 }}
//                   transition={{ duration: 0.15 }}
//                 >
//                   <X size={24} strokeWidth={2} aria-hidden="true" />
//                 </motion.span>
//               ) : (
//                 <motion.span
//                   key="open"
//                   initial={{ rotate: 90,  opacity: 0 }}
//                   animate={{ rotate: 0,   opacity: 1 }}
//                   exit={{   rotate: -90,  opacity: 0 }}
//                   transition={{ duration: 0.15 }}
//                 >
//                   <Menu size={24} strokeWidth={2} aria-hidden="true" />
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </button>
//         </div>
//       </motion.header>

//       {/* ── Mobile Overlay ───────────────────────────────────────────────── */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             id="mobile-menu"
//             className="fixed inset-0 z-40 lg:hidden bg-slate-900 overflow-y-auto"
//             style={{ top: 72 }}
//             variants={mobileMenuReveal}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <NoiseOverlay />

//             <div className="relative flex flex-col min-h-full px-6 py-8">
//               {/* Nav Links */}
//               <nav className="flex flex-col flex-1" aria-label="Mobile navigation">
//                 {navigation.primary.map((item, i) => (
//                   <motion.div
//                     key={item.href}
//                     custom={i}
//                     variants={mobileNavItem}
//                     initial="hidden"
//                     animate="visible"
//                   >
//                   <Link
//   href={item.href}
//   onClick={() => setMenuOpen(false)}
//   className={cn(
//     'text-2xl font-medium py-4 border-b border-slate-800 flex items-center',
//     'transition-colors duration-150',
//     FOCUS,
//     isActive(item.href)
//       ? 'text-blue-400'
//       : 'text-white hover:text-slate-300'
//   )}
// >
//                       {/* Spec Mark accent on active item */}
//                       {isActive(item.href) && (
//                         <span
//                           className="w-0.5 h-6 bg-blue-600 mr-4 flex-shrink-0"
//                           aria-hidden="true"
//                         />
//                       )}
//                       {item.label}
//                     </Link>
//                   </motion.div>
//                 ))}
//               </nav>

//               {/* Bottom CTAs */}
//               <motion.div
//                 className="flex flex-col gap-3 pt-8"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 0.2, ease }}
//               >
//                 <Link
//                   href="/contact"
//                   className={cn(
//                     'w-full h-14 bg-blue-600 text-white text-[15px] font-semibold rounded-lg',
//                     'hover:bg-blue-700 transition-colors flex items-center justify-center',
//                     FOCUS
//                   )}
//                 >
//                   Request Quote
//                 </Link>
//                 <a
//                   href={buildWhatsAppURL()}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={cn(
//                     'w-full h-14 border-2 border-slate-700 text-white text-[15px] font-semibold rounded-lg',
//                     'hover:border-slate-500 transition-colors flex items-center justify-center gap-2',
//                     FOCUS
//                   )}
//                 >
//                   <MessageCircle size={20} aria-hidden="true" />
//                   Chat on WhatsApp
//                 </a>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }


'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Layers,
  Car,
  Wrench,
  Package,
  Cpu,
  FileText,
  ShieldCheck,
  FlaskConical,
} from 'lucide-react'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { cn } from '@/lib/utils'
import { navigation, company } from '@/lib/data'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import { navbarReveal, mobileMenuReveal, mobileNavItem, ease } from '@/lib/animations'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'

/* ── Mega menu icon type union ───────────────────────────────────────────── */
type MegaIcon =
  | 'layers'
  | 'cpu'
  | 'flask'
  | 'car'
  | 'package'
  | 'shopping-bag'
  | 'building2'
  | 'file-text'
  | 'shield'
  | 'wrench'

/* ── Mega menu data — updated with actual product categories ────────────── */
const megaMenuData = {
  categories: [
    {
      label: 'Caps & Enclosures',
      desc: 'Standard and custom caps, closures and container components',
      href: '/products?category=caps-enclosures',
      icon: 'layers' as const,
    },
    {
      label: 'Automotive Parts',
      desc: 'Precision components for Toro, Ditch Witch and off‑road vehicles',
      href: '/products?category=automotive-parts',
      icon: 'car' as const,
    },
    {
      label: 'Toro Optimus Parts',
      desc: 'Exclusive components for autonomous lawnmower systems',
      href: '/products?category=toro-optimus',
      icon: 'cpu' as const,
    },
  ],
  industries: [
    { label: 'Automotive', href: '/industries/automotive', icon: 'car' as const },
    { label: 'Appliances', href: '/industries/appliances', icon: 'package' as const },
    { label: 'Industrial & Others', href: '/industries/others', icon: 'wrench' as const },
  ],
  resources: [
    {
      label: 'Technical Data Sheets',
      desc: 'Download product specifications',
      href: '/products#downloads',
      icon: 'file-text' as const,
    },
    {
      label: 'Quality & Certifications',
      desc: 'IATF 16949, ISO 9001, ISO 14001, ISO 45001',
      href: '/manufacturing#certifications',
      icon: 'shield' as const,
    },
    {
      label: 'Manufacturing Capabilities',
      desc: 'Production scale and process overview',
      href: '/manufacturing',
      icon: 'wrench' as const,
    },
    {
      label: 'Request a Sample',
      desc: 'Material samples for evaluation',
      href: '/contact?inquiry=technical',
      icon: 'package' as const,
    },
  ],
}

/* ── Icon resolver ──────────────────────────────────────────────────────── */
const megaIcon = (icon: MegaIcon, size = 16) => {
  const map = {
    layers: <Layers size={size} />,
    cpu: <Cpu size={size} />,
    flask: <FlaskConical size={size} />,
    car: <Car size={size} />,
    package: <Package size={size} />,
    'shopping-bag': <Package size={size} />,
    building2: <Wrench size={size} />,
    'file-text': <FileText size={size} />,
    shield: <ShieldCheck size={size} />,
    wrench: <Wrench size={size} />,
  }
  return map[icon] ?? null
}

/* ── Helpers ────────────────────────────────────────────────────────────── */
const isProductsItem = (item: { label: string; href: string }) =>
  item.label.toLowerCase().includes('product') || item.href.includes('product')

const companySubtitle =
  (company as Record<string, unknown>).subtitle as string | undefined ?? 'POLYMERS PVT LTD'

/**
 * Navbar — always-white, mega-menu-equipped navigation shell.
 *
 * Key behaviours:
 * - Fixed, full-width, z-50, **always white** with subtle shadow
 * - Desktop: logo | nav links (centered) | WhatsApp icon + Request Quote
 * - Products link navigates to /products, hover reveals mega menu
 * - Mobile (<1024px): logo | hamburger → full-screen dark overlay
 * - Products accordion inside mobile menu
 * - Body scroll locked while mobile menu is open
 * - Menu closes automatically on route change
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(false)
  const pathname = usePathname()

  /* ── refs for hover-intent timeouts ─────────────────────────────────── */
  const megaEnterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const megaLeaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHoveringMega = useRef(false)

  /* ── Body scroll lock ───────────────────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /* ── Close mobile menu on route change ──────────────────────────────── */
  useEffect(() => {
    setMenuOpen(false)
    setMobileAccordionOpen(false)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: route change should close the menu
  }, [pathname])

  /* ── Close mega on Escape ───────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && megaOpen) {
        setMegaOpen(false)
        document.getElementById('products-trigger')?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [megaOpen])

  /* ── Close mega on outside click ────────────────────────────────────── */
  useEffect(() => {
    if (!megaOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const panel = document.getElementById('mega-panel')
      const trigger = document.getElementById('products-trigger')
      if (panel && !panel.contains(target) && trigger && !trigger.contains(target)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [megaOpen])

  /* ── Cleanup timeouts on unmount ────────────────────────────────────── */
  useEffect(() => {
    return () => {
      if (megaEnterTimeout.current) clearTimeout(megaEnterTimeout.current)
      if (megaLeaveTimeout.current) clearTimeout(megaLeaveTimeout.current)
    }
  }, [])

  /* ── Mega menu handlers ─────────────────────────────────────────────── */
  const openMega = useCallback(() => {
    if (megaLeaveTimeout.current) {
      clearTimeout(megaLeaveTimeout.current)
      megaLeaveTimeout.current = null
    }
    megaEnterTimeout.current = setTimeout(() => {
      setMegaOpen(true)
      megaEnterTimeout.current = null
    }, 100)
  }, [])

  const closeMega = useCallback(
    (immediate = false) => {
      if (megaEnterTimeout.current) {
        clearTimeout(megaEnterTimeout.current)
        megaEnterTimeout.current = null
      }
      const delay = immediate ? 0 : 150
      if (megaLeaveTimeout.current) clearTimeout(megaLeaveTimeout.current)
      megaLeaveTimeout.current = setTimeout(() => {
        if (isHoveringMega.current) {
          megaLeaveTimeout.current = null
          return
        }
        setMegaOpen(false)
        megaLeaveTimeout.current = null
      }, delay)
    },
    [],
  )

  const handleTriggerEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    isHoveringMega.current = true
    openMega()
  }

  const handleTriggerLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    isHoveringMega.current = false
    closeMega(false)
  }

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    // Toggle mega menu without preventing navigation
    if (megaOpen) {
      closeMega(true)
    } else {
      openMega()
    }
  }

  const handlePanelEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    isHoveringMega.current = true
    if (megaLeaveTimeout.current) {
      clearTimeout(megaLeaveTimeout.current)
      megaLeaveTimeout.current = null
    }
    if (!megaOpen) openMega()
  }

  const handlePanelLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    isHoveringMega.current = false
    closeMega(false)
  }

  /* ── Resize guard ───────────────────────────────────────────────────── */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        setMenuOpen(false)
        setMobileAccordionOpen(false)
      }
      if (window.innerWidth < 1024 && megaOpen) {
        setMegaOpen(false)
      }
    }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [menuOpen, megaOpen])

  /* ── Route matching ─────────────────────────────────────────────────── */
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  /* ── Split navigation ───────────────────────────────────────────────── */
  const productsNavItem = navigation.primary.find(isProductsItem)
  const regularNavItems = navigation.primary.filter(
    (item) => !isProductsItem(item) && item.label !== 'Solutions'
  )

  return (
    <>
      {/* ── Fixed Header (always white) ────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white"
        style={{
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}
        initial="hidden"
        animate="visible"
        variants={navbarReveal}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          {/* ── Logo ────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className={cn(
              'inline-flex items-center gap-[10px] flex-shrink-0 mr-10 lg:mr-10 rounded-lg',
              FOCUS,
            )}
            aria-label={`${company.name} — Return to homepage`}
          >
            <Image
              src="/assets/logos/croplogo.png"
              alt={`${company.name} Symbol`}
              width={44}
              height={44}
              className="h-[44px] w-auto max-[1023px]:h-[34px] max-[640px]:h-[28px] object-contain flex-shrink-0"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <div className="flex flex-col justify-center leading-[1.1]">
              <span
                className="font-['Montserrat',sans-serif] text-[18px] font-medium uppercase tracking-[1px] max-[1023px]:text-[14px] max-[1023px]:tracking-[0.5px] max-[640px]:text-[11px] max-[640px]:tracking-[0px]"
                style={{ color: '#0D238A' }}
              >
                {company.navname}
              </span>
              <span
                className="font-['Montserrat',sans-serif] text-[11px] font-medium tracking-[2px] max-[1023px]:text-[9px] max-[1023px]:tracking-[1.5px] max-[640px]:text-[8px] max-[640px]:tracking-[1px]"
                style={{ color: '#B18437' }}
              >
                {companySubtitle}
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ──────────────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-2 flex-1 justify-center"
            aria-label="Primary navigation"
          >
            {/* Regular links */}
            {regularNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative inline-flex items-center px-3 py-2 text-[15px] font-medium rounded-md transition-colors duration-150',
                  FOCUS,
                  isActive(item.href) ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute bottom-[2px] left-3 right-3 h-[2px] bg-blue-600 rounded-[2px] transition-transform duration-200 origin-left',
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </Link>
            ))}

            {/* Products trigger (mega menu) */}
            {productsNavItem && (
              <Link
                href={productsNavItem.href}
                id="products-trigger"
                className={cn(
                  'relative inline-flex items-center gap-[6px] px-3 py-2 text-[15px] font-medium rounded-md transition-colors duration-150',
                  FOCUS,
                  megaOpen || isActive(productsNavItem.href)
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600',
                )}
                aria-haspopup="true"
                aria-expanded={megaOpen}
                aria-controls="mega-panel"
                onMouseEnter={handleTriggerEnter}
                onMouseLeave={handleTriggerLeave}
                onClick={handleTriggerClick}
              >
                {productsNavItem.label}
                <motion.span
                  animate={{ rotate: megaOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] text-slate-400"
                >
                  <ChevronDown size={11} />
                </motion.span>
                <span
                  className={cn(
                    'absolute bottom-[2px] left-3 right-3 h-[2px] bg-blue-600 rounded-[2px] transition-transform duration-200 origin-left',
                    megaOpen || isActive(productsNavItem.href) ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </Link>
            )}
          </nav>

          {/* ── Desktop CTAs ────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href={buildWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center w-7 h-7 text-slate-500 hover:text-slate-900 transition-colors duration-150 rounded',
                FOCUS,
              )}
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle size={22} aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className={cn(
                'h-[38px] px-5 bg-blue-600 text-white text-[15px] font-semibold rounded-lg',
                'hover:bg-blue-700 transition-colors duration-150',
                'inline-flex items-center justify-center flex-shrink-0',
                FOCUS,
              )}
            >
              Request Quote
            </Link>
          </div>

          {/* ── Hamburger (mobile) ──────────────────────────────────────── */}
          <button
            className={cn(
              'lg:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-[6px_4px] rounded z-[60] relative',
              FOCUS,
            )}
            onClick={() => {
              setMenuOpen((v) => !v)
              if (menuOpen) setMobileAccordionOpen(false)
            }}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="block w-[22px] h-[2px] bg-slate-800 rounded-[2px] origin-center"
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-[22px] h-[2px] bg-slate-800 rounded-[2px]"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-[22px] h-[2px] bg-slate-800 rounded-[2px] origin-center"
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.header>

      {/* ── Mega Menu Panel ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            id="mega-panel"
            className="hidden lg:block fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-slate-200"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handlePanelEnter}
            onMouseLeave={handlePanelLeave}
            role="region"
            aria-label="Products navigation"
            aria-hidden={!megaOpen}
          >
            <div className="max-w-[1280px] mx-auto px-12 py-10 grid grid-cols-[30%_25%_25%_20%] gap-0">
              {/* Column 1: Product Categories */}
              <div className="px-3">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-5">
                  Product Portfolio
                </span>
                {megaMenuData.categories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 px-2 py-[10px] -mx-2 rounded-lg hover:bg-slate-50 transition-colors duration-150"
                    onClick={() => setMegaOpen(false)}
                  >
                    <span className="flex-shrink-0 w-[18px] h-[18px] text-blue-600 mt-[2px]">
                      {megaIcon(item.icon)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-semibold text-slate-900">{item.label}</span>
                      <span className="text-[12px] text-slate-500 mt-[1px] leading-[1.4]">{item.desc}</span>
                    </div>
                  </Link>
                ))}
                <div className="border-t border-slate-100 mt-4 pt-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-[6px] text-[14px] font-medium text-blue-600 px-2 py-[6px] -mx-2 rounded-md hover:bg-slate-50 transition-colors duration-150"
                    onClick={() => setMegaOpen(false)}
                  >
                    View All Products <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Column 2: By Industry */}
              <div className="px-3 border-l border-slate-50">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-5">
                  By Industry
                </span>
                {megaMenuData.industries.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-2 py-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors duration-150 text-[14px] font-medium text-slate-700 hover:text-blue-600"
                    onClick={() => setMegaOpen(false)}
                  >
                    <span className="flex-shrink-0 w-4 h-4 text-slate-400 transition-colors duration-150">
                      {megaIcon(item.icon)}
                    </span>
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-slate-100 mt-4 pt-3">
                  <Link
                    href="/industries"
                    className="inline-flex items-center gap-[6px] text-[14px] font-medium text-blue-600 px-2 py-[6px] -mx-2 rounded-md hover:bg-slate-50 transition-colors duration-150"
                    onClick={() => setMegaOpen(false)}
                  >
                    View All Industries <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Column 3: Resources */}
              <div className="px-3 border-l border-slate-50">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em] mb-5">
                  Resources
                </span>
                {megaMenuData.resources.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 px-2 py-[10px] -mx-2 rounded-lg hover:bg-slate-50 transition-colors duration-150"
                    onClick={() => setMegaOpen(false)}
                  >
                    <span className="flex-shrink-0 w-[18px] h-[18px] text-blue-600 mt-[2px]">
                      {megaIcon(item.icon)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-semibold text-slate-900">{item.label}</span>
                      <span className="text-[12px] text-slate-500 mt-[1px] leading-[1.4]">{item.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Column 4: CTA Panel */}
              {/* <div className="pl-6 ml-2">
                <div className="bg-slate-900 rounded-xl p-8 relative overflow-hidden h-full flex flex-col justify-between">
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                      backgroundSize: '256px 256px',
                    }}
                  />
                  <div className="relative z-[1]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-[3px] h-[18px] bg-blue-600 rounded-[2px] flex-shrink-0" />
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">
                        Start a Project
                      </span>
                    </div>
                    <h4 className="text-[18px] font-light text-white leading-[1.3] mt-1">
                      Ready to discuss your polymer requirement?
                    </h4>
                    <p className="text-[13px] text-slate-400 mt-2 leading-[1.5]">
                      Our technical team responds within one business day.
                    </p>
                  </div>
                  <div className="relative z-[1] mt-4">
                    <Link
                      href="/contact?inquiry=quote"
                      className="block w-full bg-blue-600 text-white font-semibold text-[14px] h-10 rounded-lg hover:bg-blue-700 transition-colors duration-150 text-center leading-10 no-underline"
                      onClick={() => setMegaOpen(false)}
                    >
                      Request a Quotation
                    </Link>
                    <a
                      href={buildWhatsAppURL()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center text-[13px] text-slate-400 no-underline mt-3 hover:text-white transition-colors duration-150"
                    >
                      Chat on WhatsApp{' '}
                      <ArrowRight size={11} className="inline ml-1" />
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden bg-slate-900 overflow-y-auto"
            style={{ top: 72 }}
            variants={mobileMenuReveal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <NoiseOverlay />

            <div className="relative flex flex-col min-h-full px-6 py-6 max-[640px]:px-4 max-[640px]:py-4">
              <nav className="flex flex-col flex-1" aria-label="Mobile navigation">
                {regularNavItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={mobileNavItem}
                    initial="hidden"
                    animate="visible"
                    className="border-b border-slate-800 first:border-t"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'flex items-center py-[14px] text-2xl max-[640px]:text-xl font-medium transition-colors duration-150',
                        FOCUS,
                        isActive(item.href)
                          ? 'text-blue-400'
                          : 'text-white hover:text-slate-300',
                      )}
                    >
                      {isActive(item.href) && (
                        <span className="w-[3px] h-6 bg-blue-600 mr-4 flex-shrink-0 rounded-[2px]" aria-hidden="true" />
                      )}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Products accordion */}
                {productsNavItem && (
                  <motion.div
                    custom={regularNavItems.length}
                    variants={mobileNavItem}
                    initial="hidden"
                    animate="visible"
                    className="border-b border-slate-800 first:border-t"
                  >
                    <div className="flex items-center justify-between w-full py-[14px]">
                      <Link
                        href={productsNavItem.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          'text-2xl max-[640px]:text-xl font-medium transition-colors duration-150',
                          isActive(productsNavItem.href)
                            ? 'text-blue-400'
                            : 'text-white hover:text-slate-300',
                        )}
                      >
                        {isActive(productsNavItem.href) && (
                          <span className="w-[3px] h-6 bg-blue-600 mr-4 flex-shrink-0 rounded-[2px] inline-block align-middle" aria-hidden="true" />
                        )}
                        {productsNavItem.label}
                      </Link>
                      <button
                        className="text-[14px] text-slate-500 bg-transparent border-none cursor-pointer p-2"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setMobileAccordionOpen((v) => !v)
                        }}
                        aria-expanded={mobileAccordionOpen}
                      >
                        <motion.span
                          animate={{ rotate: mobileAccordionOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ display: 'inline-block' }}
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                      </button>
                    </div>
                    <motion.div
                      className="overflow-hidden border-l-2 border-blue-600 ml-1 pl-3 pr-2"
                      initial={false}
                      animate={{
                        maxHeight: mobileAccordionOpen ? 600 : 0,
                        opacity: mobileAccordionOpen ? 1 : 0,
                        paddingBottom: mobileAccordionOpen ? '0.5rem' : '0rem',
                      }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      {megaMenuData.categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setMenuOpen(false)}
                          className="block px-3 py-2 text-base font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-150"
                        >
                          {cat.label}
                        </Link>
                      ))}
                      <div className="border-t border-slate-800 my-2" />
                      {megaMenuData.industries.map((ind) => (
                        <Link
                          key={ind.href}
                          href={ind.href}
                          onClick={() => setMenuOpen(false)}
                          className="block px-3 py-2 text-base font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-150"
                        >
                          By Industry: {ind.label}
                        </Link>
                      ))}
                      <div className="border-t border-slate-800 my-2" />
                      <Link
                        href="/products"
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-150"
                      >
                        View All Products
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </nav>

              {/* Bottom CTAs */}
              <motion.div
                className="flex flex-col gap-3 pt-8 pb-8 sticky bottom-0 bg-slate-900 mt-auto flex-shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2, ease }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    'w-full h-14 bg-blue-600 text-white text-[16px] font-semibold rounded-lg',
                    'hover:bg-blue-700 transition-colors flex items-center justify-center',
                    FOCUS,
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Request Quote
                </Link>
                <a
                  href={buildWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-full h-14 border-2 border-slate-700 text-white text-[16px] font-semibold rounded-lg',
                    'hover:border-slate-500 hover:bg-white/5 transition-colors flex items-center justify-center gap-2',
                    FOCUS,
                  )}
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}