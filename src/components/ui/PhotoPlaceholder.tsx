import { cn } from '@/lib/utils'

interface PhotoPlaceholderProps {
  /** Photography brief — describes exactly what the real image must show */
  label: string
  /** Tailwind classes for aspect ratio and sizing (e.g. 'aspect-[16/10]', 'w-full') */
  className?: string
}

/**
 * PhotoPlaceholder — development-only composition holder.
 *
 * ⚠ DEVELOPMENT USE ONLY.
 * Every PhotoPlaceholder MUST be replaced with <Image> from next/image
 * before production launch. See IMPLEMENTATION_MASTER_PLAN.md §13.
 *
 * Purpose: maintains correct aspect ratios during development so layout
 * testing at all breakpoints is accurate before photography is received.
 *
 * The `label` prop doubles as a photography brief — it tells anyone
 * reading the code exactly what the real image must show.
 *
 * @example
 * <PhotoPlaceholder
 *   label="Factory production floor — wide shot, elevated angle, machinery in operation"
 *   className="aspect-[16/9] w-full"
 * />
 */
export function PhotoPlaceholder({ label, className }: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        'bg-slate-800 flex items-center justify-center relative overflow-hidden',
        className
      )}
      role="img"
      aria-label={`[Photography placeholder] ${label}`}
    >
      {/* Subtle engineering grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Camera icon + label */}
      <div className="relative text-center px-6 max-w-xs">
        <svg
          className="w-8 h-8 text-slate-600 mx-auto mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        {/* Spec Mark visual hint */}
        <div className="flex items-start gap-2 text-left">
          <div className="w-0.5 bg-blue-600/50 flex-shrink-0 mt-1" style={{ height: 12 }} />
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-[0.08em] leading-5">
            {label}
          </p>
        </div>
      </div>
    </div>
  )
}