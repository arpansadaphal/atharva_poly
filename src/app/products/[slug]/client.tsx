'use client'

import PageHero from '@/components/sections/products/PageHero'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import { SectionHeader } from '@/components/ui/SectionHeader'
import KeyPropertiesPanel from '@/components/ui/KeyPropertiesPanel'
import SpecificationTable from '@/components/ui/SpecificationTable'
import DownloadItem from '@/components/ui/DownloadItem'
import FAQAccordion from '@/components/ui/FAQAccordion'
import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types/products'

export default function ProductDetailClient({ product }: { product: Product }) {
  return (
    <>
      {/* Hero – compact dark, same as all interior pages */}
      <PageHero
        eyebrow={`PRODUCTS / ${product.industries[0]?.replace('-', ' ')?.toUpperCase() || 'PRODUCT'}`}
        headline={product.name}
        description={product.tagline}
        theme="dark"
      />

      {/* Breadcrumb – layered below hero */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 -mt-6 relative z-20">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.name },
          ]}
          className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 inline-block"
        />
      </div>

      {/* Overview – standard rhythm: white → slate‑50 → white → … */}
      <section className="bg-white section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader
            eyebrow="PRODUCT OVERVIEW"
            headline={`About ${product.name}`}
            theme="light"
          />

          <div className="flex flex-col lg:flex-row gap-10 mt-8">
            {/* Description + applications */}
            <div className="lg:w-[55%]">
              <p className="text-[16px] text-slate-600 leading-7">
                {product.description}
              </p>

              {product.applications.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-[13px] font-semibold text-slate-400 uppercase tracking-[0.08em] mb-3">
                    Applications
                  </h4>
                  <ul className="space-y-2">
                    {product.applications.map((app) => (
                      <li key={app} className="flex items-start gap-3 text-[15px] text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key properties panel */}
            {product.keyProperties.length > 0 && (
              <div className="lg:w-[45%]">
                <KeyPropertiesPanel properties={product.keyProperties} showLink={false} />
              </div>
            )}
          </div>

          {/* CTA buttons below overview */}
          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Button variant="primary" size="lg" href={`/contact?product=${product.slug}`}>
              Request a Quotation
            </Button>
            {product.downloads.length > 0 && (
              <Button variant="outline" size="lg" href={product.downloads[0].href}>
                Download Datasheet
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Technical Specifications (alternate to slate‑50) */}
      {product.technicalSpecs.length > 0 && (
        <section className="bg-slate-50 section-padding">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
            <SectionHeader
              eyebrow="TECHNICAL SPECIFICATIONS"
              headline="Detailed Technical Data"
              theme="light"
            />
            <SpecificationTable sections={product.technicalSpecs} />
          </div>
        </section>
      )}

      {/* Downloads (back to white) */}
      {product.downloads.length > 0 && (
        <section className="bg-white section-padding">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
            <SectionHeader
              eyebrow="DOCUMENTATION"
              headline="Technical Resources"
              theme="light"
            />
            <div className="divide-y divide-slate-200">
              {product.downloads.map((dl) => (
                <DownloadItem key={dl.title} download={dl} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ (alternate to slate‑50) */}
      {product.faq.length > 0 && (
        <section className="bg-slate-50 section-padding">
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
            <SectionHeader
              eyebrow="FREQUENTLY ASKED"
              headline="Common Questions"
              theme="light"
            />
            <FAQAccordion items={product.faq} />
          </div>
        </section>
      )}

      {/* Final dark CTA – exactly as on Services, Industries, etc. */}
      <section className="bg-slate-900 section-padding relative">
        <NoiseOverlay />
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <h2 className="font-[300] text-[32px] lg:text-[40px] text-white">
            Ready to order {product.name}?
          </h2>
          <p className="text-slate-400 mt-4 max-w-[520px] mx-auto">
            Tell us your quantity and delivery timeline. We&apos;ll prepare a quotation within 2 business days.
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" href={`/contact?product=${product.slug}`}>
              Request a Quotation
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}