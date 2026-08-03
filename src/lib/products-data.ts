import type { ProductDetail } from '@/types/products'

// ⚠ AWAITING CLIENT DATA — Replace all placeholder values before launch
export const products: ProductDetail[] = [
  {
    id: '1',
    slug: 'pp-homopolymer-compound',
    name: 'PP Homopolymer Compound',
    category: 'thermoplastics',
    tagline: 'High-crystallinity homopolymer for rigid industrial packaging and automotive interior components.',
    shortDescription: 'High-flow homopolymer polypropylene for injection moulding applications requiring stiffness and processability.',
    description: 'A high-crystallinity polypropylene homopolymer compound engineered for rigid packaging and automotive interior applications. This grade offers excellent stiffness, good processability on standard injection moulding equipment, and consistent lot-to-lot quality under IATF 16949 quality systems.',
    industries: ['automotive', 'packaging', 'industrial'],
    applications: [
      'Automotive interior trims and door panels',
      'Rigid packaging containers and caps',
      'Industrial crates and pallets',
      'Appliance housings and structural components',
    ],
    keyProperties: [
      { label: 'Melt Flow Index', value: '12', unit: 'g/10 min' },
      { label: 'Density', value: '0.905', unit: 'g/cm³' },
      { label: 'Tensile Strength', value: '32', unit: 'MPa' },
      { label: 'Flexural Modulus', value: '1450', unit: 'MPa' },
    ],
    technicalSpecs: [
      {
        title: 'Physical Properties',
        specs: [
          { property: 'Density', value: '0.905', unit: 'g/cm³', standard: 'ISO 1183' },
          { property: 'Melt Flow Index (230°C/2.16kg)', value: '12', unit: 'g/10 min', standard: 'ISO 1133' },
          { property: 'Mould Shrinkage', value: '1.2–1.6', unit: '%', standard: 'ISO 294-4' },
        ],
      },
      {
        title: 'Mechanical Properties',
        specs: [
          { property: 'Tensile Strength at Yield', value: '32', unit: 'MPa', standard: 'ISO 527-2' },
          { property: 'Elongation at Yield', value: '8', unit: '%', standard: 'ISO 527-2' },
          { property: 'Flexural Modulus', value: '1450', unit: 'MPa', standard: 'ISO 178' },
          { property: 'Izod Impact Strength (23°C)', value: '3.5', unit: 'kJ/m²', standard: 'ISO 180' },
        ],
      },
      {
        title: 'Thermal Properties',
        specs: [
          { property: 'Heat Deflection Temperature (0.45 MPa)', value: '95', unit: '°C', standard: 'ISO 75-2' },
          { property: 'Vicat Softening Temperature', value: '152', unit: '°C', standard: 'ISO 306' },
        ],
      },
    ],
    certifications: ['IATF 16949', 'ISO 9001'],
    downloads: [
      { type: 'datasheet', title: 'Technical Data Sheet — PP Homopolymer Compound', filename: 'pp-homopolymer-tds.pdf', fileSizeLabel: 'PDF · 420 KB', href: '/assets/downloads/pp-homopolymer-tds.pdf' },
      { type: 'sds', title: 'Safety Data Sheet — PP Homopolymer Compound', filename: 'pp-homopolymer-sds.pdf', fileSizeLabel: 'PDF · 280 KB', href: '/assets/downloads/pp-homopolymer-sds.pdf' },
    ],
    faq: [
      { question: 'What is the minimum order quantity?', answer: 'Our standard minimum order quantity is 500 kg for this grade. For trial or sampling quantities, please contact our technical sales team — we accommodate smaller volumes for qualification purposes.' },
      { question: 'Is this product suitable for food contact applications?', answer: 'This homopolymer grade can be formulated for food contact compliance upon request. Please specify your regulatory requirements (FDA, EU 10/2011, etc.) when inquiring so we can confirm the appropriate formulation.' },
      { question: 'What is the typical lead time for bulk orders?', answer: 'Standard lead time is 2–3 weeks from order confirmation for quantities up to 5 MT. Larger orders may require 4–6 weeks depending on current production scheduling.' },
    ],
    relatedProductSlugs: ['abs-pc-blend', 'custom-masterbatch'],
    images: { card: '', hero: '', gallery: [] },
    featured: true,
    inStock: true,
    metaTitle: 'PP Homopolymer Compound — Thermoplastics | Atharva Polymers',
    metaDescription: 'High-crystallinity PP homopolymer compound for rigid packaging and automotive interiors. IATF 16949 certified. Manufactured at MIDC Ranjangaon, Pune.',
  },
  {
    id: '2',
    slug: 'abs-pc-blend',
    name: 'ABS-PC Engineering Blend',
    category: 'engineering-polymers',
    tagline: 'High-impact engineering blend for automotive exterior and electronic housing applications.',
    shortDescription: 'ABS-PC blend offering excellent impact resistance and heat stability for demanding engineering applications.',
    description: 'An engineered ABS-PC (Acrylonitrile Butadiene Styrene – Polycarbonate) blend designed for applications requiring high impact resistance combined with good heat deflection performance. This grade is suitable for automotive exterior components, electronic equipment housings, and consumer durable goods.',
    industries: ['automotive', 'consumer-goods', 'industrial'],
    applications: [
      'Automotive exterior trim and mirror housings',
      'Electronic equipment enclosures',
      'Consumer appliance structural parts',
      'Power tool housings',
    ],
    keyProperties: [
      { label: 'Melt Flow Index', value: '18', unit: 'g/10 min' },
      { label: 'Density', value: '1.12', unit: 'g/cm³' },
      { label: 'Izod Impact', value: '45', unit: 'kJ/m²' },
      { label: 'HDT (0.45 MPa)', value: '118', unit: '°C' },
    ],
    technicalSpecs: [
      {
        title: 'Physical Properties',
        specs: [
          { property: 'Density', value: '1.12', unit: 'g/cm³', standard: 'ISO 1183' },
          { property: 'Melt Flow Index (260°C/5kg)', value: '18', unit: 'g/10 min', standard: 'ISO 1133' },
        ],
      },
      {
        title: 'Mechanical Properties',
        specs: [
          { property: 'Tensile Strength at Yield', value: '52', unit: 'MPa', standard: 'ISO 527-2' },
          { property: 'Flexural Modulus', value: '2300', unit: 'MPa', standard: 'ISO 178' },
          { property: 'Izod Impact Strength (23°C)', value: '45', unit: 'kJ/m²', standard: 'ISO 180' },
        ],
      },
      {
        title: 'Thermal Properties',
        specs: [
          { property: 'Heat Deflection Temperature (0.45 MPa)', value: '118', unit: '°C', standard: 'ISO 75-2' },
        ],
      },
    ],
    certifications: ['IATF 16949', 'ISO 9001', 'ISO 14001'],
    downloads: [
      { type: 'datasheet', title: 'Technical Data Sheet — ABS-PC Blend', filename: 'abs-pc-blend-tds.pdf', fileSizeLabel: 'PDF · 380 KB', href: '/assets/downloads/abs-pc-blend-tds.pdf' },
    ],
    faq: [
      { question: 'Can this grade be UV-stabilised?', answer: 'Yes, UV stabilisation packages are available for this ABS-PC blend. Please specify your outdoor exposure requirements when requesting a quotation.' },
    ],
    relatedProductSlugs: ['pp-homopolymer-compound', 'custom-masterbatch'],
    images: { card: '', hero: '', gallery: [] },
    featured: true,
    inStock: true,
    metaTitle: 'ABS-PC Engineering Blend — Engineering Polymers | Atharva Polymers',
    metaDescription: 'High-impact ABS-PC blend for automotive exterior and electronics. IATF 16949 certified. Manufactured in Pune, India.',
  },
  {
    id: '3',
    slug: 'custom-masterbatch',
    name: 'Custom Colour Masterbatch',
    category: 'specialty-compounds',
    tagline: 'Tailored colour concentrates for brand-matched consumer packaging and durable goods.',
    shortDescription: 'Bespoke colour masterbatch formulations for polyolefins and engineering resins with precise colour matching.',
    description: 'Custom-formulated colour masterbatches designed for exact brand colour matching in consumer packaging, caps and closures, and durable goods. Our in-house colour laboratory provides spectrophotometric matching and small-batch sampling for approval before production quantities.',
    industries: ['packaging', 'consumer-goods'],
    applications: [
      'Brand-colour packaging containers',
      'Caps and closures with precise colour requirements',
      'Consumer durable goods with custom colour specifications',
      'Appliance components requiring colour consistency',
    ],
    keyProperties: [
      { label: 'Carrier Resin', value: 'Polyolefin-based', unit: '' },
      { label: 'Colour Match', value: 'ΔE < 1.0', unit: '' },
      { label: 'Let-Down Ratio', value: '2–4', unit: '%' },
    ],
    technicalSpecs: [
      {
        title: 'General Properties',
        specs: [
          { property: 'Carrier Resin Type', value: 'LDPE / LLDPE / PP (customisable)', unit: '', standard: '' },
          { property: 'Pigment Loading', value: '20–60', unit: '%', standard: 'Per formulation' },
          { property: 'Let-Down Ratio', value: '2–4', unit: '%', standard: '' },
        ],
      },
    ],
    certifications: ['ISO 9001'],
    downloads: [
      { type: 'guide', title: 'Masterbatch Selection Guide', filename: 'masterbatch-guide.pdf', fileSizeLabel: 'PDF · 1.2 MB', href: '/assets/downloads/masterbatch-guide.pdf' },
    ],
    faq: [],
    relatedProductSlugs: ['pp-homopolymer-compound'],
    images: { card: '', hero: '', gallery: [] },
    featured: false,
    inStock: true,
    metaTitle: 'Custom Colour Masterbatch — Specialty Compounds | Atharva Polymers',
    metaDescription: 'Bespoke colour masterbatch for brand-matched packaging. Spectrophotometric colour matching. Manufactured in Pune.',
  },
  {
    id: '4',
    slug: 'hdpe-blow-moulding',
    name: 'HDPE Blow Moulding Grade',
    category: 'thermoplastics',
    tagline: 'High-molecular-weight HDPE for extrusion blow moulding of containers and automotive ducts.',
    shortDescription: 'HDPE grade optimised for blow moulding with excellent melt strength and environmental stress crack resistance.',
    description: 'A high-molecular-weight high-density polyethylene specifically formulated for extrusion blow moulding applications. Offers superior melt strength for parison control, excellent environmental stress crack resistance (ESCR), and consistent processing on single and dual-head blow moulding machines.',
    industries: ['packaging', 'automotive', 'industrial'],
    applications: [
      'Industrial chemical containers and jerry cans',
      'Automotive fluid reservoirs and ducts',
      'Large-volume storage drums',
      'Consumer packaging bottles',
    ],
    keyProperties: [
      { label: 'Melt Flow Index', value: '0.3', unit: 'g/10 min' },
      { label: 'Density', value: '0.953', unit: 'g/cm³' },
      { label: 'ESCR (100% Igepal)', value: '>300', unit: 'hours' },
    ],
    technicalSpecs: [
      {
        title: 'Physical Properties',
        specs: [
          { property: 'Density', value: '0.953', unit: 'g/cm³', standard: 'ISO 1183' },
          { property: 'Melt Flow Index (190°C/5kg)', value: '0.3', unit: 'g/10 min', standard: 'ISO 1133' },
        ],
      },
      {
        title: 'Mechanical Properties',
        specs: [
          { property: 'Tensile Strength at Yield', value: '26', unit: 'MPa', standard: 'ISO 527-2' },
          { property: 'Flexural Modulus', value: '1100', unit: 'MPa', standard: 'ISO 178' },
          { property: 'ESCR (100% Igepal, F50)', value: '>300', unit: 'hours', standard: 'ASTM D1693' },
        ],
      },
    ],
    certifications: ['IATF 16949', 'ISO 9001'],
    downloads: [
      { type: 'datasheet', title: 'Technical Data Sheet — HDPE Blow Moulding Grade', filename: 'hdpe-blow-tds.pdf', fileSizeLabel: 'PDF · 350 KB', href: '/assets/downloads/hdpe-blow-tds.pdf' },
    ],
    faq: [
      { question: 'Is this grade suitable for food-grade containers?', answer: 'Yes, this HDPE grade is available in food-contact-compliant formulations. Please specify your regulatory requirements when ordering.' },
    ],
    relatedProductSlugs: ['pp-homopolymer-compound', 'abs-pc-blend'],
    images: { card: '', hero: '', gallery: [] },
    featured: true,
    inStock: true,
    metaTitle: 'HDPE Blow Moulding Grade — Thermoplastics | Atharva Polymers',
    metaDescription: 'High-molecular-weight HDPE for blow moulding. Excellent ESCR. IATF 16949 certified. Pune, India.',
  },
  {
    id: '5',
    slug: 'pa6-gf30',
    name: 'PA6 GF30 Compound',
    category: 'engineering-polymers',
    tagline: '30% glass-fibre-reinforced polyamide 6 for high-strength structural automotive components.',
    shortDescription: 'Glass-fibre-reinforced PA6 offering excellent mechanical strength and thermal performance for under-hood applications.',
    description: 'A 30% glass-fibre-reinforced polyamide 6 (Nylon 6) compound engineered for high-strength structural applications in automotive under-hood and exterior environments. This grade provides exceptional tensile strength, heat resistance, and dimensional stability.',
    industries: ['automotive', 'industrial'],
    applications: [
      'Engine cover components and air intake manifolds',
      'Structural brackets and mounting systems',
      'Cooling fan assemblies',
      'Industrial machinery components',
    ],
    keyProperties: [
      { label: 'Density', value: '1.36', unit: 'g/cm³' },
      { label: 'Tensile Strength', value: '175', unit: 'MPa' },
      { label: 'HDT (1.8 MPa)', value: '205', unit: '°C' },
      { label: 'Glass Content', value: '30', unit: '%' },
    ],
    technicalSpecs: [
      {
        title: 'Physical Properties',
        specs: [
          { property: 'Density', value: '1.36', unit: 'g/cm³', standard: 'ISO 1183' },
          { property: 'Glass Fibre Content', value: '30', unit: '%', standard: 'ISO 3451' },
        ],
      },
      {
        title: 'Mechanical Properties',
        specs: [
          { property: 'Tensile Strength', value: '175', unit: 'MPa', standard: 'ISO 527-2' },
          { property: 'Flexural Modulus', value: '8500', unit: 'MPa', standard: 'ISO 178' },
          { property: 'Izod Impact (23°C)', value: '12', unit: 'kJ/m²', standard: 'ISO 180' },
        ],
      },
      {
        title: 'Thermal Properties',
        specs: [
          { property: 'HDT (1.8 MPa)', value: '205', unit: '°C', standard: 'ISO 75-2' },
        ],
      },
    ],
    certifications: ['IATF 16949', 'ISO 9001', 'ISO 14001'],
    downloads: [
      { type: 'datasheet', title: 'Technical Data Sheet — PA6 GF30', filename: 'pa6-gf30-tds.pdf', fileSizeLabel: 'PDF · 450 KB', href: '/assets/downloads/pa6-gf30-tds.pdf' },
    ],
    faq: [],
    relatedProductSlugs: ['abs-pc-blend', 'pp-homopolymer-compound'],
    images: { card: '', hero: '', gallery: [] },
    featured: false,
    inStock: true,
    metaTitle: 'PA6 GF30 Compound — Engineering Polymers | Atharva Polymers',
    metaDescription: '30% glass-fibre PA6 for structural automotive parts. IATF 16949 certified. Pune, India.',
  },
  {
    id: '6',
    slug: 'antistatic-pe',
    name: 'Antistatic PE Compound',
    category: 'specialty-compounds',
    tagline: 'Anti-static polyethylene for electronics packaging and ESD-sensitive industrial environments.',
    shortDescription: 'Specialty PE compound with permanent antistatic properties for electronics and hazardous-area packaging.',
    description: 'A specialty polyethylene compound with permanent antistatic additives designed for packaging applications in electronics manufacturing and ESD-sensitive environments. Surface resistivity is controlled to meet IEC 61340-5-1 requirements for ESD protective packaging.',
    industries: ['packaging', 'industrial', 'consumer-goods'],
    applications: [
      'Electronics component trays and packaging',
      'ESD-safe industrial containers',
      'Hazardous-area material handling',
      'Cleanroom-compatible packaging solutions',
    ],
    keyProperties: [
      { label: 'Surface Resistivity', value: '10⁶–10⁹', unit: 'Ω/sq' },
      { label: 'Density', value: '0.92', unit: 'g/cm³' },
      { label: 'Melt Flow Index', value: '4', unit: 'g/10 min' },
    ],
    technicalSpecs: [
      {
        title: 'Physical Properties',
        specs: [
          { property: 'Density', value: '0.92', unit: 'g/cm³', standard: 'ISO 1183' },
          { property: 'Melt Flow Index', value: '4', unit: 'g/10 min', standard: 'ISO 1133' },
        ],
      },
      {
        title: 'Electrical Properties',
        specs: [
          { property: 'Surface Resistivity', value: '10⁶–10⁹', unit: 'Ω/sq', standard: 'IEC 61340-2-3' },
          { property: 'Static Decay Time', value: '<2', unit: 'seconds', standard: 'IEC 61340-2-1' },
        ],
      },
    ],
    certifications: ['ISO 9001'],
    downloads: [],
    faq: [
      { question: 'Is the antistatic effect permanent or migratory?', answer: 'This compound uses a permanent (non-migratory) antistatic additive system. The antistatic properties remain effective throughout the product lifecycle and are not dependent on humidity.' },
    ],
    relatedProductSlugs: ['pp-homopolymer-compound', 'custom-masterbatch'],
    images: { card: '', hero: '', gallery: [] },
    featured: false,
    inStock: false,
    metaTitle: 'Antistatic PE Compound — Specialty Compounds | Atharva Polymers',
    metaDescription: 'Permanent antistatic PE for ESD packaging. IEC 61340 compliant. Pune, India.',
  },
]

// Helper functions
export function getProductBySlug(slug: string): ProductDetail | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): ProductDetail[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(slugs: string[]): ProductDetail[] {
  return slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as ProductDetail[]
}