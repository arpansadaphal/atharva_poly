'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { cn } from '@/lib/utils'
import { navigation, company } from '@/lib/data'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import { navbarReveal, mobileMenuReveal, mobileNavItem, ease } from '@/lib/animations'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'

/**
 * Navbar — primary navigation shell.
 *
 * Behaviour (from IMPLEMENTATION_MASTER_PLAN.md §5 Section 1):
 * - Fixed, full-width, z-50
 * - Transparent over dark hero → solid white + shadow after 80px scroll (300ms)
 * - Desktop: logo | nav links (centered) | WhatsApp icon + Request Quote button
 * - Mobile (<1024px): logo | hamburger → full-screen dark overlay
 * - Body scroll locked while mobile menu is open
 * - Menu closes automatically on route change
 *
 * Initial load animation: opacity 0, y -12 → opacity 1, y 0 (500ms, 100ms delay)
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 80)

  // Initialize on mount
  handler()

  window.addEventListener('scroll', handler, { passive: true })

  return () => {
    window.removeEventListener('scroll', handler)
  }
}, [])

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ── Close menu on route change ────────────────────────────────────────────
  // useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* ── Fixed Header ─────────────────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-[72px]"
        style={{
          backgroundColor: scrolled || menuOpen ? '#ffffff' : 'transparent',
          boxShadow: scrolled && !menuOpen ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
          transition: 'background-color 300ms ease-out, box-shadow 300ms ease-out',
        }}
        initial="hidden"
        animate="visible"
        variants={navbarReveal}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">

          {/* ── Logo ───────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className={cn(
              'text-[17px] font-semibold tracking-tight transition-colors duration-300 flex-shrink-0',
              FOCUS,
              scrolled || menuOpen ? 'text-slate-900' : 'text-white'
            )}
          >
            {company.name}
          </Link>

          {/* ── Desktop Navigation ─────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navigation.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-[15px] font-medium transition-colors duration-200 group py-1',
                  FOCUS,
                  scrolled
                    ? isActive(item.href)
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-blue-600'
                    : isActive(item.href)
                      ? 'text-blue-400'
                      : 'text-white/80 hover:text-white'
                )}
              >
                {item.label}
                {/* Underline — present when active, animates in on hover */}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-0 h-0.5 bg-blue-600 transition-all duration-200',
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTAs ───────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* WhatsApp icon */}
            <a
              href={buildWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200',
                FOCUS,
                scrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
              )}
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle size={22} aria-hidden="true" />
            </a>

            {/* Request Quote — primary CTA */}
            <Link
              href="/contact"
              className={cn(
                'h-[38px] px-5 bg-blue-600 text-white text-[15px] font-semibold rounded-lg',
                'hover:bg-blue-700 transition-colors duration-150',
                'inline-flex items-center justify-center flex-shrink-0',
                FOCUS
              )}
            >
              Request Quote
            </Link>
          </div>

          {/* ── Hamburger (mobile) ─────────────────────────────────────────── */}
          <button
            className={cn(
              'lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
              FOCUS,
              scrolled || menuOpen ? 'text-slate-700' : 'text-white'
            )}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate: 90,   opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} strokeWidth={2} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90,  opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate: -90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} strokeWidth={2} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Overlay ───────────────────────────────────────────────── */}
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

            <div className="relative flex flex-col min-h-full px-6 py-8">
              {/* Nav Links */}
              <nav className="flex flex-col flex-1" aria-label="Mobile navigation">
                {navigation.primary.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={mobileNavItem}
                    initial="hidden"
                    animate="visible"
                  >
                  <Link
  href={item.href}
  onClick={() => setMenuOpen(false)}
  className={cn(
    'text-2xl font-medium py-4 border-b border-slate-800 flex items-center',
    'transition-colors duration-150',
    FOCUS,
    isActive(item.href)
      ? 'text-blue-400'
      : 'text-white hover:text-slate-300'
  )}
>
                      {/* Spec Mark accent on active item */}
                      {isActive(item.href) && (
                        <span
                          className="w-0.5 h-6 bg-blue-600 mr-4 flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTAs */}
              <motion.div
                className="flex flex-col gap-3 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2, ease }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    'w-full h-14 bg-blue-600 text-white text-[15px] font-semibold rounded-lg',
                    'hover:bg-blue-700 transition-colors flex items-center justify-center',
                    FOCUS
                  )}
                >
                  Request Quote
                </Link>
                <a
                  href={buildWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-full h-14 border-2 border-slate-700 text-white text-[15px] font-semibold rounded-lg',
                    'hover:border-slate-500 transition-colors flex items-center justify-center gap-2',
                    FOCUS
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