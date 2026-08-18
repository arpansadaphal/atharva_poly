// import { notFound } from 'next/navigation'
// import { Metadata } from 'next'
// import { industries, getIndustryBySlug } from '@/lib/industries-data'
// import PageHero from '@/components/sections/services/PageHero'
// import IndustrySection from '@/components/sections/industries/IndustrySection'
// import IndustryProducts from '@/components/sections/industries/IndustryProducts'
// import IndustryCompliance from '@/components/sections/industries/IndustryCompliance'
// import IndustryClients from '@/components/sections/industries/IndustryClients'
// import {NoiseOverlay} from '@/components/ui/NoiseOverlay'
// import { Button } from '@/components/ui/Button'
// import { buildWhatsAppURL } from '@/lib/whatsapp'
// import Link from 'next/link'
// import { getProductsByIndustry } from '@/lib/products-data'

// export async function generateStaticParams() {
//   return industries.map((i) => ({ slug: i.slug }))
// }

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const { slug } = await params
//   const industry = getIndustryBySlug(slug)
//   if (!industry) return {}
//   return {
//     title: industry.metaTitle,
//     description: industry.metaDescription,
//     openGraph: {
//       title: industry.metaTitle,
//       description: industry.metaDescription,
//       url: `https://www.atharvapolymers.com/industries/${industry.slug}`,
//     },
//     alternates: {
//       canonical: `https://www.atharvapolymers.com/industries/${industry.slug}`,
//     },
//   }
// }

// export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params
//   const industry = getIndustryBySlug(slug)
//   if (!industry) notFound()

//   return (
//     <>
//       {/* Hero – compact dark, consistent with Services/Products */}
//       <PageHero
//         eyebrow={`INDUSTRIES / ${industry.name.toUpperCase()}`}
//         headline={`Polymer Solutions for ${industry.name}`}
//         description={industry.tagline}
//         theme="dark"
//       />

//       {/* Breadcrumb – placed just below hero for navigation context */}
//       <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 -mt-6 relative z-20">
//         <nav aria-label="Breadcrumb" className="flex items-center text-[13px] text-slate-400 bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">
//           <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
//           <span className="mx-2 text-slate-300">/</span>
//           <Link href="/industries" className="text-slate-500 hover:text-slate-900 transition-colors">Industries</Link>
//           <span className="mx-2 text-slate-300">/</span>
//           <span className="text-slate-900" aria-current="page">{industry.name}</span>
//         </nav>
//       </div>

//       {/* Overview */}
//       <section className="bg-white section-padding">
//         <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
//           <h2 className="font-normal text-4xl text-slate-900 mb-8">
//             Precision Manufacturing for {industry.name}
//           </h2>
//           <p className="text-[16px] text-slate-600 max-w-[640px] leading-7">
//             {industry.overview}
//           </p>
//           {/* CTA buttons moved from header */}
//           <div className="flex flex-col sm:flex-row gap-3 mt-8">
//             <Button variant="primary" size="lg" href={`/contact?industry=${industry.slug}&inquiry=industry`}>
//               Discuss Your Requirement
//             </Button>
//             <Button variant="outline" size="lg" href={`/products?industry=${industry.slug}`}>
//               View {industry.name} Components
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Challenges */}
//       {/* <IndustrySection
//         eyebrow="INDUSTRY CHALLENGES"
//         headline={`What ${industry.name} Manufacturers Demand`}
//         description={`Key challenges faced by ${industry.name.toLowerCase()} manufacturers that we help solve.`}
//         items={industry.challenges}
//         background="slate-50"
//       >
//         <div className="border-t border-slate-200 pt-10 mt-4">
//           <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">HOW WE ADDRESS THESE</p>
//           <p className="text-[16px] text-slate-600 max-w-[640px] mt-3 leading-7">
//             Our quality systems, engineering support, and traceability ensure we meet the specific demands of {industry.name.toLowerCase()} manufacturers.
//           </p>
//           <Link href={`/contact?industry=${industry.slug}`} className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-4">
//             Discuss your specific requirements →
//           </Link>
//         </div>
//       </IndustrySection> */}

//       {/* Applications */}
//       <IndustrySection
//         eyebrow="KEY APPLICATIONS"
//         headline={`Where Our Materials Are Used in ${industry.name}`}
//         description={`Specific application areas where our polymer components deliver value for ${industry.name.toLowerCase()} clients.`}
//         items={industry.applications}
//         background="white"
//       />

//       {/* Featured Components */}
//       <IndustryProducts industry={industry} />

//       {/* Compliance */}
//       <IndustryCompliance industry={industry} />

//       {/* Clients */}
//       <IndustryClients industry={industry} />

//       {/* Related Services */}
//       <IndustrySection
//         eyebrow="SUPPORTING SERVICES"
//         headline={`End‑to‑End Support for ${industry.name} Clients`}
//         description="These services underpin every project we deliver in this sector."
//         items={industry.services}
//         background="white"
//       >
//         <Link href="/services" className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-4">
//           View all services →
//         </Link>
//       </IndustrySection>

//       {/* Final CTA */}
//       <section className="bg-slate-900 section-padding relative" aria-label="Contact us">
//         <NoiseOverlay />
//         <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
//           <h2 className="font-[300] text-[36px] lg:text-[48px] text-white">
//             Discuss Your {industry.name} Project
//           </h2>
//           <p className="text-slate-400 text-[17px] mt-4 max-w-[520px] mx-auto">
//             Share your requirements — {"we'll"} respond with a material recommendation and feasibility assessment.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
//             <Button variant="primary" size="lg" href={`/contact?industry=${industry.slug}`}>
//               Request a Quotation
//             </Button>
//             <a
//               href={buildWhatsAppURL({ customMessage: `${industry.name} project` })}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center h-14 px-8 text-white font-medium rounded-lg bg-[#25D366] hover:bg-[#20bd5a] transition-colors text-[15px]"
//             >
//               Chat on WhatsApp
//             </a>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { industries, getIndustryBySlug } from '@/lib/industries-data'
import { getProductsByIndustry } from '@/lib/products-data'
import PageHero from '@/components/sections/services/PageHero'
import IndustrySection from '@/components/sections/industries/IndustrySection'
import IndustryProducts from '@/components/sections/industries/IndustryProducts'
import IndustryCompliance from '@/components/sections/industries/IndustryCompliance'
import IndustryClients from '@/components/sections/industries/IndustryClients'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { Button } from '@/components/ui/Button'
import { buildWhatsAppURL } from '@/lib/whatsapp'
import Link from 'next/link'

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) return {}
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: `https://www.atharvapolymers.com/industries/${industry.slug}`,
    },
    alternates: {
      canonical: `https://www.atharvapolymers.com/industries/${industry.slug}`,
    },
  }
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) notFound()

  // Get real products for this industry from the product catalog
  const industryProducts = getProductsByIndustry(slug)

  return (
    <>
      {/* Hero – compact dark, consistent with Services/Products */}
      <PageHero
        eyebrow={`INDUSTRIES / ${industry.name.toUpperCase()}`}
        headline={`Polymer Solutions for ${industry.name}`}
        description={industry.tagline}
        theme="dark"
      />

      {/* Breadcrumb – placed just below hero for navigation context */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 -mt-6 relative z-20">
        <nav aria-label="Breadcrumb" className="flex items-center text-[13px] text-slate-400 bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">
          <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link href="/industries" className="text-slate-500 hover:text-slate-900 transition-colors">Industries</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-900" aria-current="page">{industry.name}</span>
        </nav>
      </div>

      {/* Overview */}
      <section className="bg-white section-padding">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <h2 className="font-normal text-4xl text-slate-900 mb-8">
            Precision Manufacturing for {industry.name}
          </h2>
          <p className="text-[16px] text-slate-600 max-w-[640px] leading-7">
            {industry.overview}
          </p>
          {/* CTA buttons moved from header */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            {/* <Button variant="primary" size="lg" href={`/contact?industry=${industry.slug}&inquiry=industry`}> */}
            <Button variant="primary" size="lg" href={`/contact?industry`}>
              Discuss Your Requirement
            </Button>
            <Button variant="outline" size="lg" href={`/products?industry=${industry.slug}`}>
              View {industry.name} Components
            </Button>
          </div>
        </div>
      </section>

      {/* Applications */}
      <IndustrySection
        eyebrow="KEY APPLICATIONS"
        headline={`Where Our Materials Are Used in ${industry.name}`}
        description={`Specific application areas where our polymer components deliver value for ${industry.name.toLowerCase()} clients.`}
        items={industry.applications}
        background="white"
      />

      {/* Featured Components – now uses real products filtered by industry */}
      <IndustryProducts industry={industry} products={industryProducts} />

      {/* Compliance */}
      <IndustryCompliance industry={industry} />

      {/* Clients */}
      <IndustryClients industry={industry} />

      {/* Related Services */}
      <IndustrySection
        eyebrow="SUPPORTING SERVICES"
        headline={`End‑to‑End Support for ${industry.name} Clients`}
        description="These services underpin every project we deliver in this sector."
        items={industry.services}
        background="white"
      >
        <Link href="/services" className="inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-blue-700 mt-4">
          View all services →
        </Link>
      </IndustrySection>

      {/* Final CTA */}
      <section className="bg-slate-900 section-padding relative" aria-label="Contact us">
        <NoiseOverlay />
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <h2 className="font-[300] text-[36px] lg:text-[48px] text-white">
            Discuss Your {industry.name} Project
          </h2>
          <p className="text-slate-400 text-[17px] mt-4 max-w-[520px] mx-auto">
            Share your requirements — {"we'll"} respond with a material recommendation and feasibility assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="primary" size="lg" href={`/contact?industry=${industry.slug}`}>
              Request a Quotation
            </Button>
            <a
              href={buildWhatsAppURL({ customMessage: `${industry.name} project` })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-8 text-white font-medium rounded-lg bg-[#25D366] hover:bg-[#20bd5a] transition-colors text-[15px]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}