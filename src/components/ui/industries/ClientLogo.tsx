'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ClientLogoProps {
  name: string
  logoPath: string
}

export default function ClientLogo({ name, logoPath }: ClientLogoProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-lg">
        <span className="text-slate-700 font-semibold text-sm">{name}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-lg">
      <Image
        src={logoPath}
        alt={`${name} logo`}
        width={120}
        height={60}
        className="max-h-12 w-auto object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  )
}