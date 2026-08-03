import type { Metadata } from 'next'
import {
  PageOpener,
  DirectorsNote,
  CompanyJourney,
  EngineeringPhilosophy,
  InsideTheFactory,
  LeadershipSection,
  InternationalReachWrapper as InternationalReach,
  AboutFinalCTA,
} from '@/components/sections/about'
import CertificationsTrust from '@/components/sections/CertificationsTrust'

export const metadata: Metadata = {
  title: 'About Atharva Polymers | 19 Years of Precision Polymer Manufacturing',
  description:
    'Founded 2007 in MIDC Ranjangaon, Pune. 35 injection moulding machines. IATF 16949 and ISO certified. 20+ industrial customers across four countries. The story behind Atharva Polymers.',
  openGraph: {
    title: 'About Atharva Polymers',
    description:
      'Two decades of polymer manufacturing. One discipline. The story, philosophy, leadership, and factory behind Atharva Polymers.',
    url: '/about',
    type: 'profile',
  },
}

export default function AboutPage() {
  return (
    <main>
      <PageOpener />
      {/* <DirectorsNote /> */}
      {/* <CompanyJourney /> */}
      <EngineeringPhilosophy />
      <InsideTheFactory />
      <LeadershipSection />
      {/* <InternationalReach /> */}
      <CertificationsTrust compact />
      <AboutFinalCTA />
  </main>
  )
}
