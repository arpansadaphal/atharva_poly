'use client'

import * as LucideIcons from 'lucide-react'

interface ServiceCardProps {
  // Original prop – if provided, use it (for backward compatibility)
  service?: {
    title: string
    description: string
    iconName: string
  }
  // Alternative flat props – used when service is not passed
  title?: string
  description?: string
  iconName?: string
  className?: string
}

export default function ServiceCard({
  service,
  title: flatTitle,
  description: flatDesc,
  iconName: flatIcon,
  className,
}: ServiceCardProps) {
  // Use the service object if present, otherwise fall back to flat props
  const title = service?.title || flatTitle || ''
  const description = service?.description || flatDesc || ''
  const iconName = service?.iconName || flatIcon || 'HelpCircle'

  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle

  return (
    <div
      className={`service-card-hover bg-white border border-slate-200 rounded-xl p-7 relative ${className || ''}`}
    >
      <div
        className="absolute top-0 left-0 bottom-0 w-[3px] bg-blue-600 rounded-l-xl"
        aria-hidden="true"
      />
      <Icon className="w-5 h-5 text-blue-600" aria-hidden="true" />
      <h3 className="text-[17px] font-semibold text-slate-900 mt-3">{title}</h3>
      <p className="text-[14px] text-slate-500 leading-6 mt-2">{description}</p>
    </div>
  )
}