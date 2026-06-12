/**
 * lib/data.ts — Single source of truth for all site content.
 *
 * Rules:
 * - Only VERIFIED information from CLIENT_REALITY.md and CLIENT_DISCOVERY_REPORT.md.
 * - Mark every unconfirmed field with  ⚠ AWAITING CLIENT DATA
 * - Nothing marked ⚠ reaches production — see IMPLEMENTATION_MASTER_PLAN.md §13.
 */

import type {
  NavItem,
  Metric,
  Product,
  Industry,
  Certification,
  Differentiator,
  ExportMarket,
  CaseStudy,
  GalleryImage,
  JobListing,
} from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY — Locked verified facts
// ─────────────────────────────────────────────────────────────────────────────

export const company = {
  name: 'Atharva Polymers',
  legalName: 'Atharva Polymers Pvt Ltd',
  tagline: 'Precision Polymer Manufacturing Built on Experience',
  founded: '2007',
  employees: 40,
  address: {
    street: 'MIDC Ranjangaon',
    city: 'Pune',
    state: 'Maharashtra',
    pin: '⚠ AWAITING CLIENT DATA',
    country: 'India',
    full: 'MIDC Ranjangaon, Pune, Maharashtra, India',
    googleMapsUrl: '⚠ AWAITING CLIENT DATA',
  },
  contact: {
    phone: '⚠ AWAITING CLIENT DATA',
    email: '⚠ AWAITING CLIENT DATA',
    whatsappDisplay: '⚠ AWAITING CLIENT DATA',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// METRICS — Locked. Do not inflate. See PROJECT_CONTEXT.md.
// ─────────────────────────────────────────────────────────────────────────────

export const metrics: Metric[] = [
  { value: 19, suffix: '+', label: 'Years of Manufacturing Experience' },
  { value: 1,  suffix: '',  label: 'Precision Manufacturing Facility' },
  { value: 4,  suffix: '+', label: 'Countries Served' },
  { value: 20, suffix: '+', label: 'Active Industrial Clients' },
]

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

export const navigation = {
  primary: [
    { label: 'Products',      href: '/products' },
    { label: 'Industries',    href: '/industries' },
    { label: 'Manufacturing', href: '/manufacturing' },
    { label: 'About',         href: '/about' },
    { label: 'Contact',       href: '/contact' },
  ] satisfies NavItem[],

  footer: {
    quickLinks: [
      { label: 'Home',                  href: '/' },
      { label: 'Products',              href: '/products' },
      { label: 'Industries',            href: '/industries' },
      { label: 'Manufacturing & Quality', href: '/manufacturing' },
      { label: 'About Us',              href: '/about' },
      { label: 'Contact',               href: '/contact' },
    ] satisfies NavItem[],

    industries: [
      { label: 'Automotive',              href: '/industries/automotive' },
      { label: 'Packaging',               href: '/industries/packaging' },
      { label: 'Consumer Goods',          href: '/industries/consumer-goods' },
      { label: 'Industrial Manufacturing', href: '/industries/industrial' },
    ] satisfies NavItem[],

    company: [
      { label: 'About Us',  href: '/about' },
      { label: 'Gallery',   href: '/gallery' },
      { label: 'Careers',   href: '/careers' },
      { label: 'Insights',  href: '/insights' },
    ] satisfies NavItem[],
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: 'Polymer Manufacturing',
  headline: {
    line1: 'Precision Polymer Manufacturing',
    line2: 'Built on 19 Years of',
    line3: 'Industry Experience',
  },
  description:
    'Serving industrial buyers across India and international markets. Quality products. Reliable supply. 19 years of delivery.',
  primaryCta:   { label: 'Request Quote',  href: '/contact' },
  secondaryCta: { label: 'View Products',  href: '/products' },
  image: {
    src: '/images/hero-factory-floor.jpg',   // ⚠ AWAITING CLIENT PHOTOGRAPHY
    alt: 'Atharva Polymers manufacturing facility production floor, MIDC Ranjangaon, Pune',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY INTRODUCTION
// ─────────────────────────────────────────────────────────────────────────────

export const companyIntro = {
  eyebrow: 'Our Story',
  headline: 'A Focused Manufacturing Partner Since 2007',
  paragraphs: [
    'Atharva Polymers was established in MIDC Ranjangaon, Pune with a focused mission: to deliver consistently reliable polymer products for industrial applications. Over nearly two decades, that focus has not wavered.',
    'Operating from a single, precision-controlled manufacturing facility, we have built long-term partnerships with industrial buyers across India and international markets by prioritising quality and dependability over corporate scale.',
    // ⚠ AWAITING CLIENT — replace paragraph 3 with client-approved company story before launch.
    '⚠ AWAITING CLIENT COMPANY STORY',
  ],
  pullQuote:
    '19 years in one discipline creates a depth of manufacturing knowledge that cannot be replicated by companies that do everything.',
  image: {
    src: '/images/company-facility.jpg',   // ⚠ AWAITING CLIENT PHOTOGRAPHY
    alt: 'Atharva Polymers manufacturing facility, MIDC Ranjangaon',
  },
  insetImage: {
    src: '/images/quality-control.jpg',    // ⚠ AWAITING CLIENT PHOTOGRAPHY
    alt: 'Quality control inspection at Atharva Polymers',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// DIFFERENTIATORS — Why Choose Atharva (specific, evidenced)
// ─────────────────────────────────────────────────────────────────────────────

export const differentiators: Differentiator[] = [
  {
    icon: 'Award',
    title: 'Consistent Manufacturing Quality',
    description:
      'Our single-facility model enables tight process control. Every batch produced to the same standard.',
  },
  {
    icon: 'Clock',
    title: '19 Years of Industry Expertise',
    description:
      'Nearly two decades of polymer application knowledge across automotive, packaging, and consumer goods.',
  },
  {
    icon: 'Globe',
    title: 'Export-Ready Supply',
    description:
      'Proven capacity to supply clients across India and 4 international markets. End-to-end export management.',
  },
  {
    icon: 'Users',
    title: 'Responsive Partnership',
    description:
      'Direct access to decision-makers. Fast responses, flexible requirements, no corporate delay.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRIES — Locked by client discovery
// ─────────────────────────────────────────────────────────────────────────────

export const industries: Industry[] = [
  {
    id: 'automotive',
    slug: 'automotive',
    name: 'Automotive',
    description:
      'Precision polymer components for vehicle manufacturing and assembly applications.',
    applications: [
      'Interior components',
      'Under-hood parts',
      'Sealing systems',
      'Structural elements',
    ],
    icon: 'Car',
    image: '/images/industry-automotive.jpg',  // ⚠ AWAITING CLIENT PHOTOGRAPHY
    imageAlt: 'Polymer components for automotive manufacturing',
    relatedProductIds: [],
  },
  {
    id: 'packaging',
    slug: 'packaging',
    name: 'Packaging',
    description:
      'High-performance polymer materials for flexible and rigid packaging solutions.',
    applications: [
      'Flexible packaging',
      'Rigid containers',
      'Protective packaging',
      'Food-grade applications',
    ],
    icon: 'Package',
    image: '/images/industry-packaging.jpg',   // ⚠ AWAITING CLIENT PHOTOGRAPHY
    imageAlt: 'Polymer materials for industrial packaging',
    relatedProductIds: [],
  },
  {
    id: 'consumer-goods',
    slug: 'consumer-goods',
    name: 'Consumer Goods',
    description:
      'Durable polymer solutions for everyday consumer product manufacturing.',
    applications: [
      'Household products',
      'Appliance components',
      'Personal care packaging',
      'Toys and leisure',
    ],
    icon: 'ShoppingBag',
    image: '/images/industry-consumer.jpg',    // ⚠ AWAITING CLIENT PHOTOGRAPHY
    imageAlt: 'Polymer solutions for consumer goods manufacturing',
    relatedProductIds: [],
  },
  {
    id: 'industrial',
    slug: 'industrial',
    name: 'Industrial Manufacturing',
    description:
      'Engineered polymer materials for heavy-duty industrial and manufacturing applications.',
    applications: [
      'Machine components',
      'Pipes and fittings',
      'Protective coatings',
      'Industrial containers',
    ],
    icon: 'Factory',
    image: '/images/industry-industrial.jpg',  // ⚠ AWAITING CLIENT PHOTOGRAPHY
    imageAlt: 'Polymer materials for industrial manufacturing',
    relatedProductIds: [],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS — ⚠ AWAITING CLIENT PRODUCT CATALOG
// Structure is ready; populate when client data is received.
// ─────────────────────────────────────────────────────────────────────────────

export const products: Product[] = [
  // ⚠ AWAITING CLIENT PRODUCT CATALOG
  // Do NOT use placeholder product names in production.
  // Populate this array when the client provides:
  //   - Product names and categories
  //   - Technical specifications
  //   - Application descriptions
  //   - Product photography
  //
  // Example structure (comment out until real data is received):
  // {
  //   id: 'pp-compounds',
  //   slug: 'pp-compounds',
  //   category: 'thermoplastics',
  //   categoryLabel: 'Thermoplastics',
  //   name: '⚠ AWAITING',
  //   description: '⚠ AWAITING',
  //   applications: [],
  //   tags: [],
  //   image: '/images/product-pp.jpg',
  // },
]

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS — ⚠ AWAITING VERIFIED DATA
// CRITICAL: Only display certifications that are real and currently held.
// Empty array is correct until client provides verified certification details.
// ─────────────────────────────────────────────────────────────────────────────

export const certifications: Certification[] = [
  // ⚠ AWAITING CLIENT CERTIFICATION DOCUMENTS
  // Do NOT add placeholder certifications.
  // Required from client: Certification name, number, expiry, certificate PDF.
  //
  // Example (do not uncomment until verified):
  // {
  //   id: 'iso-9001',
  //   name: 'ISO 9001:2015',
  //   abbreviation: 'ISO 9001',
  //   description: 'Quality Management System',
  //   certNumber: '⚠ AWAITING',
  // },
]

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT MARKETS — ⚠ Exact country names pending client confirmation
// ─────────────────────────────────────────────────────────────────────────────

export const exportMarkets: ExportMarket[] = [
  { name: 'India', countryCode: 'IN', isPrimary: true, svgX: 68, svgY: 45 },
  // ⚠ AWAITING CLIENT CONFIRMATION OF EXPORT COUNTRY NAMES
  // Replace placeholder entries below with real countries:
  // { name: '⚠ AWAITING', countryCode: '⚠', isPrimary: false, svgX: 0, svgY: 0 },
]

// ─────────────────────────────────────────────────────────────────────────────
// MANUFACTURING — ⚠ Detail pending client documentation
// ─────────────────────────────────────────────────────────────────────────────

export const manufacturing = {
  eyebrow: 'Manufacturing & Quality',
  headline: 'Precision Built Into Every Step',
  capabilities: [
    '⚠ AWAITING CLIENT MANUFACTURING PROCESS DATA',
    '⚠ AWAITING CLIENT QUALITY SYSTEMS DATA',
    '⚠ AWAITING CLIENT EQUIPMENT DATA',
  ],
  keyMetric: {
    value: 19,
    suffix: '+',
    label: 'Years of Manufacturing Precision',
  },
  image: {
    src: '/images/mfg-production-line.jpg',   // ⚠ AWAITING CLIENT PHOTOGRAPHY
    alt: 'Atharva Polymers production line, MIDC Ranjangaon, Pune',
  },
} as const

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDIES — ⚠ DO NOT BUILD WITHOUT CLIENT APPROVAL
// ─────────────────────────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  // ⚠ AWAITING CLIENT CASE STUDIES WITH VERIFIED OUTCOMES
  // Do not publish fabricated case studies.
  // Minimum 2 client-approved case studies before section goes live.
]

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY — ⚠ AWAITING CLIENT PHOTOGRAPHY
// ─────────────────────────────────────────────────────────────────────────────

export const galleryImages: GalleryImage[] = [
  // ⚠ AWAITING CLIENT PHOTOGRAPHY
  // Required categories: Manufacturing, Products, Facility, Team, Quality
  // Do not launch /gallery without real client photography.
]

// ─────────────────────────────────────────────────────────────────────────────
// CAREERS — ⚠ DO NOT FABRICATE JOB LISTINGS
// ─────────────────────────────────────────────────────────────────────────────

export const jobListings: JobListing[] = [
  // ⚠ AWAITING CONFIRMED OPEN POSITIONS FROM CLIENT
  // Only populate when real positions exist.
]

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT CTA (homepage)
// ─────────────────────────────────────────────────────────────────────────────

export const contactCta = {
  eyebrow: 'Start a Conversation',
  headline: 'Need a Reliable Polymer Manufacturing Partner?',
  description:
    'Our team responds within one business day. For urgent requirements, reach us directly on WhatsApp.',
  primaryCta:   { label: 'Request Quote',      href: '/contact' },
  secondaryCta: { label: 'Chat on WhatsApp',   href: '' }, // built by buildWhatsAppURL()
} as const