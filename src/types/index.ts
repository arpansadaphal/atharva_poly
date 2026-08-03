// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY / METRICS
// ─────────────────────────────────────────────────────────────────────────────

export interface Metric {
  value: number
  suffix: string
  label: string
}

export interface Address {
  street: string
  city: string
  state: string
  pin: string
  country: string
  full: string
  googleMapsUrl: string
}

export interface ContactInfo {
  phone: string
  email: string
  whatsappDisplay: string
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  slug: string
  category: string
  categoryLabel: string
  name: string
  description: string
  applications: string[]
  tags: string[]
  image?: string
  imageAlt?: string
  specifications?: ProductSpecification[]
}

export interface ProductSpecification {
  label: string
  value: string
  unit?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIES
// ─────────────────────────────────────────────────────────────────────────────

export interface Industry {
  id: string
  slug: string
  name: string
  description: string
  applications: string[]
  icon: string
  image?: string
  imageAlt?: string
  relatedProductIds?: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface Certification {
  short: string
  full: string
  id?: string
  certNumber?: string
  validUntil?: string
  issuerUrl?: string
  localPdfPath: string            // now required
  optimizedWebPPath: string       // now required
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDIES
// ─────────────────────────────────────────────────────────────────────────────

export interface CaseStudy {
  id: string
  slug: string
  industry: string
  industryId: string
  title: string
  summary: string
  challenge: string
  solution: string
  result: string
  resultValue?: string
  resultUnit?: string
  image?: string
  imageAlt?: string
  relatedProductIds?: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// DIFFERENTIATORS
// ─────────────────────────────────────────────────────────────────────────────

export interface Differentiator {
  icon: string     // Lucide React icon name (e.g. 'Award', 'Clock')
  title: string
  description: string
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT MARKETS
// ─────────────────────────────────────────────────────────────────────────────

export interface ExportMarket {
  name: string
  countryCode: string
  isPrimary: boolean
  // SVG map dot coordinates (0-100 as % of map viewBox)
  svgX?: number
  svgY?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREERS
// ─────────────────────────────────────────────────────────────────────────────

export interface JobListing {
  id: string
  title: string
  department: string
  type: 'Full-time' | 'Part-time' | 'Contract'
  location: string
  description: string
  applyUrl: string
}

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS / ARTICLES
// ─────────────────────────────────────────────────────────────────────────────

export interface Insight {
  id: string
  slug: string
  title: string
  summary: string
  category: 'Industry News' | 'Technical' | 'Manufacturing' | 'Sustainability'
  publishedAt: string
  readingTime: number  // minutes
  image?: string
  imageAlt?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────────────────────────────────

export type GalleryCategory =
  | 'All'
  | 'Manufacturing'
  | 'Products'
  | 'Facility'
  | 'Team'
  | 'Quality'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: Exclude<GalleryCategory, 'All'>
  blurDataURL?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT PROPS
// ─────────────────────────────────────────────────────────────────────────────

export interface SectionHeaderProps {
  eyebrow: string
  headline: string
  description?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  headingLevel?: 'h1' | 'h2'
  className?: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
  'aria-label'?: string
}

export interface FooterColumn {
  title: string
  links: NavItem[]
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export interface JourneyBeat {
  year: string
  yearLabel: string
  headline: string
  body: string
  imageSrc: string
  imageAlt: string
  principle?: string
}

export interface Principle {
  number: string
  title: string
  body: string
}

export interface Leader {
  role: string
  name: string
  bio: string
  imageSrc: string
  imageAlt: string
  span?: 'founder' | 'standard'
}

export interface AboutStat {
  value: number
  suffix: string
  label: string
}

export interface FactoryCaption {
  src: string
  alt: string
  caption: string
}