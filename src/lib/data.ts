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
  JourneyBeat,
  Principle,
  Leader,
  AboutStat,
  FactoryCaption,
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
    { label: 'Services',      href: '/services' },
    { label: 'About',         href: '/about' },
    { label: 'Contact',       href: '/contact' },
  ] satisfies NavItem[],

  footer: {
    quickLinks: [
      { label: 'Home',                  href: '/' },
      { label: 'Products',              href: '/products' },
      { label: 'Industries',            href: '/industries' },
      { label: 'Manufacturing & Quality', href: '/manufacturing' },
      { label: 'Services & Capabilities', href: '/services' },
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

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// Single source of truth for the /about route.
// All facts traceable to atharva_poly_baseinfo.md.
// ─────────────────────────────────────────────────────────────────────────────

export const aboutPage = {
  meta: {
    eyebrow: 'About — Atharva Polymers',
    chapter: 'Chapter One',
    yearRange: '2007—2026',
    headline: 'Two decades of polymer. One discipline.',
    subhead:
      'How a single facility in MIDC Ranjangaon became a 95,000 sq. m. precision manufacturing operation — without ever leaving the discipline that started it.',
  },

  directorsNote: {
    eyebrow: "Director's Note",
    signature: 'Mr. Mansingh Pachundkar',
    signatureRole: 'Founder & Managing Director',
    headline: 'A 19-year discipline, not a 19-year story.',
    paragraphs: [
      'When we started Atharva Polymers in 2007, we made a deliberate choice: stay focused. Build one facility. Learn one discipline deeply. Resist the temptation to do everything.',
      'Nineteen years later, that decision still defines us. Every machine in our 35-unit injection moulding line, every quality protocol, every export shipment carries the same conviction: precision is not a department. It is the culture of the floor.',
      'This page is not a brochure. It is a record of how we think, how we build, and what we will not compromise.',
    ],
    imageSrc: '/assets/team/leadership.jpg',
    imageAlt:
      'Mr. Mansingh Pachundkar, Founder and Managing Director of Atharva Polymers',
  },

  journeyBeats: [
    {
      year: '2007',
      yearLabel: 'Founded',
      principle: 'Origin',
      headline: 'A single facility in MIDC Ranjangaon, Pune.',
      body:
        'Atharva Polymers begins with a focused mission: deliver consistently reliable polymer products for industrial applications. One facility. One discipline. No shortcuts.',
      imageSrc: '/assets/factory/images.jpeg',
      imageAlt: 'Atharva Polymers first manufacturing facility, MIDC Ranjangaon, 2007',
    },
    {
      year: '2010–2015',
      yearLabel: 'Capacity',
      principle: 'Discipline',
      headline: 'Building the line — 35 machines, 100T to 1000T.',
      body:
        'Capacity expansion with discipline. Machines acquired in matched sets. Process control established before volume. Operating 24/7 by the end of the period.',
      imageSrc: '/assets/machinery/Horizontal-INJ-presses--2_s.webp',
      imageAlt:
        'Horizontal injection moulding presses, Atharva Polymers production line',
    },
    {
      year: '2016',
      yearLabel: 'Expansion',
      principle: 'Adjacency',
      headline: 'Atharva Poly Plast opens at Shirwal MIDC.',
      body:
        'Productivity at Ranjangaon meets demand ahead of capacity. A second polymer facility is commissioned — same standards, second geography. The group’s diversification model begins.',
      imageSrc: '/assets/factory/images (1).jpeg',
      imageAlt: 'Atharva Poly Plast manufacturing facility, Shirwal MIDC',
    },
    {
      year: '2019',
      yearLabel: 'Certification',
      principle: 'Audit',
      headline: 'IATF 16949. ISO 9001, 14001, 45001.',
      body:
        'Independent audit of every system: quality, environment, occupational health, safety. Manufacturing becomes auditable, not just inspectable.',
      imageSrc: '/assets/factory/1772433684539.jpeg',
      imageAlt: 'Quality inspection at Atharva Polymers production line',
    },
    {
      year: '2020s',
      yearLabel: 'Diversification',
      principle: 'Ecosystem',
      headline: 'Corrugation. Metal. Biopharma. Logistics.',
      body:
        'Adjacent industries added under the Atharva Group — corrugation, sheet metal fabrication, EPS thermoforming, biopharma. Polymer remains the spine.',
      imageSrc: '/assets/machinery/polymer_production_plant.jpg',
      imageAlt:
        'Polymer production plant — Atharva Polymers diversified manufacturing operations',
    },
    {
      year: '2026',
      yearLabel: 'Today',
      principle: 'Outlook',
      headline: '20+ customers. 4+ countries. Chennai and Ahmedabad next.',
      body:
        '20+ active industrial customers. Exports to four international markets. Plans to expand the manufacturing footprint into Chennai and Ahmedabad. The discipline continues.',
      imageSrc: '/assets/machinery/polymer-g-factory-1024x568.jpg',
      imageAlt: 'Atharva Polymers factory floor — current production capacity',
    },
  ] satisfies JourneyBeat[],

  principles: [
    {
      number: '01',
      title: 'One facility. One discipline.',
      body:
        'We do not manufacture everything. We manufacture polymer components with one set of standards, in one place, audited continuously.',
    },
    {
      number: '02',
      title: 'Process before output.',
      body:
        'Capacity is not a number on a spreadsheet. It is the consequence of a process that has been stabilised, documented, and re-audited.',
    },
    {
      number: '03',
      title: 'No batch without a record.',
      body:
        'Every production run leaves a traceable record — material, machine, operator, parameters. Inspectability is the minimum, not the ceiling.',
    },
    {
      number: '04',
      title: 'Long-term over opportunistic.',
      body:
        'We build with customers who stay. The 19-year relationships in our customer base are the metric that matters.',
    },
  ] satisfies Principle[],

  factoryCaptions: [
    {
      src: '/assets/machinery/Horizontal-INJ-presses--2_s.webp',
      alt: 'Horizontal injection moulding presses',
      caption: 'Line 04 — Horizontal presses, 100T to 1000T',
    },
    {
      src: '/assets/factory/images.jpeg',
      alt: 'Production floor overview',
      caption: 'Production floor, MIDC Ranjangaon',
    },
    {
      src: '/assets/polymer/werkstoffpruefung-chemische-analyse-j2cvxj8cpv8rpj4.jpg',
      alt: 'Polymer chemical analysis',
      caption: 'Material analysis — incoming and in-process',
    },
    {
      src: '/assets/machinery/adbe991cb8.webp',
      alt: 'Machinery detail',
      caption: 'Press detail — moulded component inspection',
    },
    {
      src: '/assets/factory/images (1).jpeg',
      alt: 'Factory interior',
      caption: 'Material handling, between cells',
    },
    {
      src: '/assets/machinery/e062018579.webp',
      alt: 'Moulded components',
      caption: 'Finished components — pre-dispatch staging',
    },
  ] satisfies FactoryCaption[],

  leadership: [
    {
      role: 'Founder & Managing Director',
      name: 'Mr. Mansingh Pachundkar',
      bio:
        'Founded Atharva Polymers in 2007 with a single-discipline focus. Extended the Atharva Group into corrugation, sheet metal, EPS thermoforming, and biopharma while preserving the standards established at the polymer facility.',
      imageSrc: '/assets/team/leadership.jpg',
      imageAlt: 'Mr. Mansingh Pachundkar, Founder and Managing Director',
      span: 'founder',
    },
    {
      role: 'Head of Production',
      name: 'Production Lead',
      bio:
        'Leads the 24/7 injection moulding operation across 35 machines, 100T to 1000T.',
      imageSrc: '/assets/team/1658747856497.jpeg',
      imageAlt: 'Production Lead at Atharva Polymers',
    },
    {
      role: 'Head of Quality',
      name: 'Quality Lead',
      bio:
        'Owns the IATF 16949, ISO 9001, 14001, and 45001 quality systems and audit cycle.',
      imageSrc: '/assets/team/images.jpeg',
      imageAlt: 'Quality Lead at Atharva Polymers',
    },
    {
      role: 'Head of Design Engineering',
      name: 'Design Lead',
      bio:
        'Runs the in-house design and development function — concept to production, alongside the customer.',
      imageSrc: '/assets/team/1778938994361.jpeg',
      imageAlt: 'Design Engineering Lead at Atharva Polymers',
    },
    {
      role: 'Head of Operations',
      name: 'Operations Lead',
      bio:
        'Coordinates production scheduling, logistics, and supply chain across the 95,000 sq. m. Ranjangaon facility.',
      imageSrc: '/assets/team/00India-Women-Jobs-gmfz-articleLarge.webp',
      imageAlt: 'Operations Lead at Atharva Polymers',
    },
  ] satisfies Leader[],

  aboutStats: [
    { value: 19, suffix: '+', label: 'Years of polymer manufacturing' },
    { value: 35, suffix: '',  label: 'Injection moulding machines' },
    { value: 95, suffix: 'k', label: 'Sq. m. manufacturing footprint' },
    { value: 4,  suffix: '+', label: 'International markets served' },
  ] satisfies AboutStat[],
} as const