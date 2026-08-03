import { Metadata } from 'next'
import PageHero from '@/components/sections/services/PageHero'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import ManufacturingPhilosophy from '@/components/sections/manufacturing/ManufacturingPhilosophy'
import ProductionProcessFlow from '@/components/ui/manufacturing/ProductionProcessFlow'
import FactoryInfrastructure from '@/components/sections/manufacturing/FactoryInfrastructure'
import MachineryCapabilities from '@/components/sections/manufacturing/MachineryCapabilities'
import QualitySystems from '@/components/sections/manufacturing/QualitySystems'
import TestingValidation from '@/components/sections/manufacturing/TestingValidation'
import CapacityStrip from '@/components/sections/manufacturing/CapacityStrip'
import CertificationsTrust from '@/components/sections/CertificationsTrust'
import ManufacturingGalleryPreview from '@/components/ui/manufacturing/ManufacturingGalleryPreview'
import ContactCTA from '@/components/sections/ContactCTA'
import { productionProcess } from '@/lib/manufacturing-data'

// Gallery images – replace with real client images
const galleryImages = [
  { src: '/assets/manufacturing/factory-exterior.jpg', alt: 'Factory exterior — blue building', category: 'facility' as const },
  { src: '/assets/manufacturing/shop-floor.jpg', alt: 'Shop floor with Millkron machines', category: 'production' as const },
  { src: '/assets/manufacturing/faro-arm.jpg', alt: 'FARO arm inspection in lab', category: 'quality' as const },
  { src: '/assets/manufacturing/utility.jpg', alt: 'Utility equipment — chillers and controllers', category: 'machinery' as const },
  { src: '/assets/manufacturing/spm-camera.jpg', alt: 'Automated camera inspection station', category: 'quality' as const },
  { src: '/assets/manufacturing/caps-products.jpg', alt: 'Product samples — caps and enclosures', category: 'production' as const },
]

export const metadata: Metadata = {
  title: 'Manufacturing & Quality | Atharva Polymers, Ranjangaon',
  description:
    '60+ injection moulding machines. IATF 16949 certified. Precision manufacturing at 80,000 sq ft Ranjangaon facility since 2010.',
  openGraph: {
    title: 'Manufacturing & Quality | Atharva Polymers',
    description:
      '60+ injection moulding machines. IATF 16949 certified. Precision manufacturing at Ranjangaon, Pune.',
    url: 'https://www.atharvapolymers.com/manufacturing',
    images: [{ url: '/assets/og/manufacturing.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.atharvapolymers.com/manufacturing' },
}

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="MANUFACTURING & QUALITY"
        headline="60+ Machines. One Facility. Zero Compromise on Quality."
        description="Our 80,000 sq ft Ranjangaon plant operates under IATF 16949 and ISO 9001. We process 3,600 MT of polymers annually, supplying precision components to global OEMs."
      />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 -mt-6 relative z-20">
        {/* <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Manufacturing & Quality' },
          ]}
          className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 inline-block"
        /> */}
      </div>

      <ManufacturingPhilosophy />

      {/* Production Process */}
      <section className="bg-slate-50 section-padding" aria-label="Production Process">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
              <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
                PRODUCTION PROCESS
              </span>
            </div>
            <h2 className="font-normal text-4xl text-slate-900 mb-4">
              From Raw Material to Finished Product
            </h2>
            <p className="text-[16px] text-slate-600 mb-16">
              Eight defined stages govern every production run. Quality is embedded
              throughout — not inspected in at the end — under our IATF 16949 quality
              management system.
            </p>
          </div>
          <ProductionProcessFlow stages={productionProcess} />
        </div>
      </section>

      <FactoryInfrastructure />
      <MachineryCapabilities />
      <QualitySystems />
      <TestingValidation />

      {/* Certifications */}
      <section id="certifications">
        <CertificationsTrust compact />
      </section>

      <CapacityStrip />

      {/* Gallery Preview */}
      <section className="bg-white section-padding" aria-label="Factory and Product Gallery">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" aria-hidden="true" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
              FACTORY & PRODUCT GALLERY
            </span>
          </div>
          <h2 className="font-normal text-4xl text-slate-900 mb-12">
            Inside the Ranjangaon Facility
          </h2>
          <ManufacturingGalleryPreview images={galleryImages} />
        </div>
      </section>

      <ContactCTA />
    </>
  )
}