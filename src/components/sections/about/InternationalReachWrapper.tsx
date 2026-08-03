'use client'

import dynamic from 'next/dynamic'

const InternationalReach = dynamic(
  () => import('./InternationalReach').then((mod) => mod.InternationalReach),
  { ssr: false }
)

export default function InternationalReachWrapper() {
  return <InternationalReach />
}