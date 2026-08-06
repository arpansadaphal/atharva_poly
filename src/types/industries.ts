export type IndustrySlug =
  | 'appliances'
  | 'automotive'
  | 'furniture'
  | 'others'

export interface IndustryChallenge {
  title: string
  description: string
  iconName: string // Lucide icon name
}

export interface IndustryApplication {
  title: string
  description: string
  iconName: string
}

export interface IndustryClient {
  name: string
  logoPath: string // e.g. '/assets/logos/haier.png'
}

export interface IndustryProduct {
  name: string
  shortDesc: string
  image?: string // optional, may be empty
  slug: string // link to products page? can be #
}

export interface IndustryService {
  title: string
  description: string
  iconName: string
}

export interface Industry {
  slug: IndustrySlug
  name: string
  tagline: string
  overview: string
  share: string // e.g. "40%"
  challenges: IndustryChallenge[]
  applications: IndustryApplication[]
  clients: IndustryClient[] // real clients with logo
  products: IndustryProduct[] // featured parts
  certifications: string[] // e.g. "IATF 16949"
  image?: string // 
  complianceNote?: string
  services: IndustryService[]
  metaTitle: string
  metaDescription: string
  iconName: string // Lucide icon for the industry
  faq?: Array<{ question: string; answer: string }> 
}