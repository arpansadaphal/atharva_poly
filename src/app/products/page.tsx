import { products } from '@/lib/products-data'
import PageHero from '@/components/sections/products/PageHero'
import ProductGrid from '@/components/sections/products/ProductGrid'
import IndustryApplicationMap from '@/components/sections/products/IndustryApplicationMap'
import InquiryBanner from '@/components/ui/InquiryBanner'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata = {
  title: 'Polymer Products | Atharva Polymers, Pune',
  description:
    'Thermoplastics, engineering polymers, and specialty compounds manufactured at MIDC Ranjangaon, Pune. IATF 16949 certified. Industrial supply for automotive, packaging, and consumer goods sectors.',
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="PRODUCT PORTFOLIO"
        headline="Precision Polymer Solutions for Industrial Applications"
        description="Thermoplastics, engineering polymers,high quality polymers,  and specialty compounds manufactured to industrial specification at our MIDC Ranjangaon facility."
      />
      <ProductGrid products={products} />
      <IndustryApplicationMap products={products} />
      <InquiryBanner />
      <ContactCTA />
    </>
  )
}