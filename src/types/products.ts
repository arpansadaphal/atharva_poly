// // src/types/products.ts

// export interface KeyProperty {
//   label: string
//   value: string
//   unit?: string
// }

// export interface TechnicalSpec {
//   property: string
//   value: string
//   unit: string
//   standard?: string
// }

// export interface SpecSection {
//   title: string
//   specs: TechnicalSpec[]
// }

// export interface ProductDownload {
//   type: 'datasheet' | 'certificate' | 'sds' | 'guide'
//   title: string
//   filename: string
//   fileSizeLabel: string
//   href: string
// }

// export interface ProductFAQ {
//   question: string
//   answer: string
// }

// export interface ProductDetail {
//   id: string
//   slug: string
//   name: string
//   category: 'thermoplastics' | 'engineering-polymers' | 'specialty-compounds'
//   tagline: string
//   description: string
//   shortDescription: string
//   industries: ('automotive' | 'packaging' | 'consumer-goods' | 'industrial')[]
//   applications: string[]
//   keyProperties: KeyProperty[]
//   technicalSpecs: SpecSection[]
//   certifications: string[]
//   downloads: ProductDownload[]
//   faq: ProductFAQ[]
//   relatedProductSlugs: string[]
//   images: {
//     card: string
//     hero: string
//     gallery: string[]
//   }
//   featured: boolean
//   inStock: boolean
//   metaTitle: string
//   metaDescription: string
// }

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
  fileSizeLabel: string
  href: string
}

export interface ProductFAQ {
  question: string
  answer: string
}

export interface Product {
  id: string
  slug: string
  name: string
  featured?: boolean
  industries: string[] // e.g. ['appliances', 'automotive']
  tagline: string
  shortDescription: string
  description: string
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
  inStock: boolean
}