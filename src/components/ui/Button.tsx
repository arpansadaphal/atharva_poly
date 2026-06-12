'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ButtonProps, ButtonVariant, ButtonSize } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// SIZE MAP  (height × horizontal-padding × font-size)
// sm = 38px  |  md = 48px  |  lg = 52px
// ─────────────────────────────────────────────────────────────────────────────
const sizeMap: Record<ButtonSize, string> = {
  sm: 'h-[38px] px-5  text-[14px]',
  md: 'h-12    px-6  text-[15px]',
  lg: 'h-[52px] px-8  text-[15px]',
}

// ─────────────────────────────────────────────────────────────────────────────
// FOCUS RING — applied to all variants
// ─────────────────────────────────────────────────────────────────────────────
const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT CLASSES
// ─────────────────────────────────────────────────────────────────────────────
const variantMap: Record<ButtonVariant, string> = {
  /** Solid blue — primary action on any surface */
  primary:
    'bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-150 inline-flex items-center justify-center',

  /** Text-link with animated arrow — secondary / ghost action */
  secondary:
    'text-slate-400 hover:text-white font-medium transition-colors duration-150 inline-flex items-center gap-1.5 group',

  /** Outlined — for light backgrounds, e.g. Careers teaser */
  outline:
    'border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-900 hover:text-white transition-colors duration-150 inline-flex items-center justify-center',

  /** WhatsApp green — appears ONLY in CTA section and floating button */
  whatsapp:
    'text-white font-semibold rounded-lg transition-opacity duration-150 hover:opacity-90 inline-flex items-center justify-center gap-2',
}

/**
 * Button — the CTA system for the Atharva Polymers website.
 *
 * Renders as a Next.js `<Link>` when `href` is provided,
 * otherwise as a `<button>` element.
 *
 * @example
 * <Button variant="primary" size="lg" href="/contact">Request Quote</Button>
 * <Button variant="secondary" href="/products">View Products</Button>
 * <Button variant="whatsapp" href={buildWhatsAppURL()}>Chat on WhatsApp</Button>
 * <Button variant="outline" type="submit">Submit</Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
  external = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseClasses = cn(
    variantMap[variant],
    // Only apply size classes to block-style variants
    variant !== 'secondary' && sizeMap[size],
    FOCUS,
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  const content = (
    <>
      {variant === 'whatsapp' && <MessageCircle size={20} aria-hidden="true" />}
      {children}
      {variant === 'secondary' && (
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        style={variant === 'whatsapp' ? { backgroundColor: '#25D366' } : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={baseClasses}
      style={variant === 'whatsapp' ? { backgroundColor: '#25D366' } : undefined}
    >
      {content}
    </button>
  )
}