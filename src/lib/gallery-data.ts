import type { GalleryImage } from '@/types/manufacturing'

// ⚠ All entries are PLACEHOLDERS — replace with real photography before launch.
export const galleryImages: GalleryImage[] = [
  { src: '/assets/gallery/production-01.webp', alt: 'Production floor — MIDC Ranjangaon, active injection moulding operation', category: 'production' },
  { src: '/assets/gallery/production-02.webp', alt: 'Production floor — elevated wide-angle view, machinery in operation', category: 'production' },
  { src: '/assets/gallery/production-03.webp', alt: 'Production floor — machine operator at injection moulding press', category: 'production' },
  { src: '/assets/gallery/machinery-01.webp', alt: 'Injection moulding press — 100T–200T range, detail view', category: 'machinery' },
  { src: '/assets/gallery/machinery-02.webp', alt: 'Heavy tonnage press — 600T–1000T clamping force', category: 'machinery' },
  { src: '/assets/gallery/quality-01.webp', alt: 'Quality inspection station — dimensional measurement', category: 'quality' },
  { src: '/assets/gallery/quality-02.webp', alt: 'In-process quality check — first article inspection', category: 'quality' },
  { src: '/assets/gallery/packaging-01.webp', alt: 'Packaging area — finished goods preparation', category: 'packaging' },
  { src: '/assets/gallery/packaging-02.webp', alt: 'Labelled cartons ready for dispatch', category: 'packaging' },
  { src: '/assets/gallery/factory-exterior.jpg', alt: 'MIDC Ranjangaon facility — exterior view', category: 'facility' },
  { src: '/assets/gallery/facility-02.webp', alt: 'Raw material storage area', category: 'facility' },
  { src: '/assets/gallery/facility-03.webp', alt: 'Finished goods warehouse', category: 'facility' },
]

export function getImagesByCategory(category: string): GalleryImage[] {
  if (category === 'all') return galleryImages
  return galleryImages.filter(img => img.category === category)
}

export const categoryLabels: Record<string, string> = {
  all: 'All',
  production: 'Production Floor',
  quality: 'Quality & Inspection',
  machinery: 'Machinery',
  packaging: 'Packaging & Dispatch',
  facility: 'Facility & Infrastructure',
  team: 'Team',
}