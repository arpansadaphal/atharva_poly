import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import PageHero from '@/components/sections/services/PageHero'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import { GalleryGrid } from '@/components/ui/GalleryGrid'
import { galleryImages } from '@/lib/gallery-data'

export const metadata: Metadata = {
  title: 'Factory & Product Gallery | Atharva Polymers, Pune',
  description:
    'Photography from the Atharva Polymers manufacturing facility — MIDC Ranjangaon, Pune. Production floor, quality systems, machinery, and infrastructure.',
  openGraph: {
    title: 'Factory & Product Gallery | Atharva Polymers',
    description:
      'Photography from the Atharva Polymers manufacturing facility — MIDC Ranjangaon, Pune.',
    url: 'https://www.atharvapolymers.com/gallery',
    images: [
      {
        url: galleryImages[0]?.src ?? '/assets/og/gallery.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: { canonical: 'https://www.atharvapolymers.com/gallery' },
}

export default function GalleryPage() {
  // Fallback redirect — remove when you have at least 6 real images
  const realImageCount = galleryImages.filter(img => !img.src.includes('⚠')).length
  if (realImageCount < 6) {
    redirect('/manufacturing')
  }

  return (
    <>
      {/* ===================== HERO ===================== */}
      <PageHero
        eyebrow="FACTORY & PRODUCT GALLERY"
        headline="Inside the Facility"
        description="Photography from our MIDC Ranjangaon manufacturing facility — production floor, quality systems, machinery, and infrastructure."
      />

      {/* ===================== BREADCRUMB ===================== */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 -mt-6 relative z-20 hidden sm:block">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Gallery' },
          ]}
          className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 inline-block"
        />
      </div>

      {/* ===================== GALLERY GRID (White) ===================== */}
      <section className="bg-white py-[60px] md:py-[120px]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      {/* ===================== CTA (Dark – identical to Capabilities page) ===================== */}
      <section className="bg-slate-900 py-[60px] md:py-[120px] relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-400">
              WORK WITH US
            </span>
          </div>
          <h2 className="font-[300] text-[32px] lg:text-[44px] text-white">
            Ready to discuss your next project?
          </h2>
          <p className="text-[17px] text-slate-400 max-w-[560px] mx-auto mt-4">
            Whether you need engineering support, a custom mold, high-volume production, or a
            long-term manufacturing partner — the conversation starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/contact?inquiry"
              className="inline-flex items-center justify-center h-14 px-8 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-[15px]"
            >
              Start a Project
            </a>
            <a
              href="https://wa.me/919XXXXXXXXX"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center h-14 px-8 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-[15px]"
              style={{ backgroundColor: '#25D366' }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}