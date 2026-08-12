'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ChevronDown, MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { company, navigation } from '@/lib/data'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import type { NavItem } from '@/types'

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'

// ─────────────────────────────────────────────────────────────────────────────
// Accordion Column — collapses on mobile, always visible on desktop
// ─────────────────────────────────────────────────────────────────────────────

interface AccordionColumnProps {
  title: string
  /** When true, the column is always expanded on mobile and cannot be toggled */
  alwaysOpen?: boolean
  children: ReactNode
}

function AccordionColumn({ title, alwaysOpen = false, children }: AccordionColumnProps) {
  const [open, setOpen] = useState(alwaysOpen)

  return (
    <div>
      {/* Mobile toggle header */}
      <div className="lg:hidden">
        <button
          className={cn(
            'w-full flex items-center justify-between py-4',
            'border-b border-slate-800',
            FOCUS
          )}
          onClick={() => !alwaysOpen && setOpen((v) => !v)}
          disabled={alwaysOpen}
          aria-expanded={open}
        >
          <span className="text-[13px] font-semibold text-white uppercase tracking-[0.08em]">
            {title}
          </span>
          {!alwaysOpen && (
            <ChevronDown
              size={16}
              className={cn(
                'text-slate-500 transition-transform duration-200 flex-shrink-0',
                open && 'rotate-180'
              )}
              aria-hidden="true"
            />
          )}
        </button>

        <AnimatePresence initial={alwaysOpen}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="py-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop — always visible */}
      <div className="hidden lg:block">
        <h3 className="text-[13px] font-semibold text-white uppercase tracking-[0.08em] mb-5">
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Link List — shared by Quick Links, Industries, Company columns
// ─────────────────────────────────────────────────────────────────────────────

function FooterLinks({ links }: { links: readonly NavItem[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={cn(
              'text-[14px] text-slate-500 hover:text-white transition-colors duration-150',
              FOCUS
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Footer — site-wide footer.
 *
 * Design rules (IMPLEMENTATION_MASTER_PLAN.md §5 Section 14):
 * - Background: bg-slate-900 — NO NoiseOverlay (functional dark, not atmospheric)
 * - 4-column desktop grid, accordion on mobile
 * - Column 1 (company info) always expanded on mobile
 * - MIDC Ranjangaon displayed in full — it is an industrial credential
 * - Links: text-slate-500, hover:text-white
 * - Bottom row: 1px border-slate-800 divider above copyright line
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900" aria-label="Site footer">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-8">

        {/* ── 4-Column Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-12 mb-12 lg:mb-16">

          {/* Column 1: Company Identity — always open on mobile */}
          <AccordionColumn title={company.name} alwaysOpen>
            <div className="flex flex-col gap-4">
              {/* Tagline */}
              <p className="text-[14px] text-slate-500 leading-6">
                {company.tagline}
              </p>

              {/* Address — MIDC Ranjangaon displayed in full */}
              <address className="not-italic flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={14}
                    className="text-slate-600 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] text-slate-500 leading-5">
                    {company.address.street},{' '}
                    {company.address.city},{' '}
                    {company.address.state},{' '}
                    {company.address.country}
                  </span>
                </div>

                {/* Phone */}
                {(company.contact.phone as string) !== '⚠ AWAITING CLIENT DATA' && (
                  <a
                    href={`tel:${company.contact.phone}`}
                    className={cn(
                      'flex items-center gap-2 text-[13px] text-slate-500',
                      'hover:text-white transition-colors duration-150',
                      FOCUS
                    )}
                  >
                    <Phone size={14} className="text-slate-600" aria-hidden="true" />
                    {company.contact.phone}
                  </a>
                )}

                {/* Email */}
                {(company.contact.email as string) !== '⚠ AWAITING CLIENT DATA' && (
                  <a
                    href={`mailto:${company.contact.email}`}
                    className={cn(
                      'flex items-center gap-2 text-[13px] text-slate-500',
                      'hover:text-white transition-colors duration-150',
                      FOCUS
                    )}
                  >
                    <Mail size={14} className="text-slate-600" aria-hidden="true" />
                    {company.contact.email}
                  </a>
                )}
              </address>

              {/* WhatsApp link */}
              <a
                href={buildWhatsAppURL()}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 text-[13px] font-medium transition-colors duration-150',
                  FOCUS
                )}
                style={{ color: '#25D366' }}
              >
                <MessageCircle size={14} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </AccordionColumn>

          {/* Column 2: Quick Links */}
          <AccordionColumn title="Quick Links">
            <FooterLinks links={navigation.footer.quickLinks} />
          </AccordionColumn>

          {/* Column 3: Industries */}
          <AccordionColumn title="Industries">
            <FooterLinks links={navigation.footer.industries} />
          </AccordionColumn>

          {/* Column 4: Company */}
          <AccordionColumn title="Company">
            <FooterLinks links={navigation.footer.company} />
          </AccordionColumn>
        </div>

        {/* ── Bottom Row ─────────────────────────────────────────────────── */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-500">
            © {currentYear} {company.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className={cn(
                'text-[13px] text-slate-500 hover:text-white transition-colors duration-150',
                FOCUS
              )}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={cn(
                'text-[13px] text-slate-500 hover:text-white transition-colors duration-150',
                FOCUS
              )}
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}