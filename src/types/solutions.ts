// src/types/products.ts

export interface KeyProperty {
  label: string
  value: string
  unit?: string
}

export interface TechnicalSpec {
  property: string
  value: string
  unit: string
  standard?: string
}

export interface SpecSection {
  title: string
  specs: TechnicalSpec[]
}

export interface ProductDownload {
  type: 'datasheet' | 'certificate' | 'sds' | 'guide'
  title: string
  filename: string
  fileSizeLabel: string
  href: string
}

export interface ProductFAQ {
  question: string
  answer: string
}

export interface ProductDetail {
  id: string
  slug: string
  name: string
  category: 'thermoplastics' | 'engineering-polymers' | 'specialty-compounds'
  tagline: string
  description: string
  shortDescription: string
  industries: ('automotive' | 'appliances' | 'furniture' | 'others')[]
  applications: string[]
  keyProperties: KeyProperty[]
  technicalSpecs: SpecSection[]
  certifications: string[]
  downloads: ProductDownload[]
  faq: ProductFAQ[]
  relatedProductSlugs: string[]
  images: {
    card: string
    hero: string
    gallery: string[]
  }
  featured: boolean
  inStock: boolean
  metaTitle: string
  metaDescription: string
}