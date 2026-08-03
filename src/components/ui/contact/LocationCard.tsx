import { Factory, Building2, MapPin } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LocationCardProps {
  type: 'manufacturing' | 'office'
  name: string
  addressLines: string[]
  mapsUrl?: string
  className?: string
}

export default function LocationCard({
  type,
  name,
  addressLines,
  mapsUrl,
  className,
}: LocationCardProps) {
  const Icon = type === 'manufacturing' ? Factory : Building2

  return (
    <div
      className={cn(
        // Same card shell as ServiceCard
        'service-card-hover bg-white border border-slate-200 rounded-xl p-7 relative',
        // Left accent border — matching the ServiceCard pattern
        'border-l-[3px] border-l-blue-600',
        className
      )}
    >
      <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400 mt-3">
        {type === 'manufacturing' ? 'MANUFACTURING FACILITY' : 'COMMERCIAL OFFICE'}
      </p>
      <h3 className="text-[18px] font-semibold text-slate-900 mt-1">{name}</h3>
      <address className="text-[15px] text-slate-600 leading-6 mt-2 not-italic">
        {addressLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < addressLines.length - 1 && <br />}
          </span>
        ))}
      </address>
      {mapsUrl && (
        <Link
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-blue-600 mt-4 hover:text-blue-700"
          aria-label={`Get directions to ${name} — opens in Google Maps`}
        >
          <MapPin className="w-4 h-4" /> Get Directions →
        </Link>
      )}
    </div>
  )
}