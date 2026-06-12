import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { CompanyIntroduction } from '@/components/sections/CompanyIntroduction'
import { WhyAtharva } from '@/components/sections/WhyAtharva'
import { ImpactMetrics } from '@/components/sections/ImpactMetrics'
import ManufacturingQuality from '@/components/sections/ManufacturingQuality'
import ProductCategories from '@/components/sections/ProductCategories'
import IndustriesServed from '@/components/sections/IndustriesServed'
import ContactCTA from '@/components/sections/ContactCTA'
import CertificationsTrust from '@/components/sections/CertificationsTrust'

export const metadata: Metadata = {
  title: 'Polymer Manufacturer in Pune | Atharva Polymers',
  description:
    'Atharva Polymers manufactures polymer products for industrial applications from our MIDC Ranjangaon, Pune facility. 19+ years experience, export-ready. Request a quote today.',
}

/**
 * Build order:
 *   ✅ 01  Hero
 *   ✅ 02  Company Introduction
 *   ⏳ 03  Impact Metrics
 *   ✅ 04  Why Atharva
 *   ⏳ 05  Product Categories
 *   ⏳ 06  Industries Served
 *   ⏳ 07  Manufacturing & Quality
 *   ⏳ 08  Certifications & Trust
 *   ⏳ 09  Export Markets
 *   ⏳ 10  Contact CTA
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <CompanyIntroduction />
      {/* 03 Impact Metrics — ⏳ pending */}
      <ImpactMetrics/>
      <WhyAtharva />
      {/* Remaining sections added as each is completed */}
      <ProductCategories/>
      <IndustriesServed/>
     
      
      <ManufacturingQuality/>
      <CertificationsTrust/>
       <ContactCTA/>
    </main>
  )
}