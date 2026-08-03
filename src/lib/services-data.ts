import type { Service, ServicePillarConfig, EngagementStep } from '@/types/services'

export const services: Service[] = [
  // Manufacturing (pillar: 'manufacturing')
  { id: 'mfg-1', pillar: 'manufacturing', title: 'Custom Polymer Compounding', description: 'Tailored compound formulations developed to client specifications.', iconName: 'FlaskConical', requiresValidation: true },
  { id: 'mfg-2', pillar: 'manufacturing', title: 'Precision Injection Moulding', description: 'Injection moulding from 100T to 1,000T across 35 machines.', iconName: 'Layers' },
  { id: 'mfg-3', pillar: 'manufacturing', title: 'Batch Production', description: 'Flexible production runs sized to client demand.', iconName: 'LayoutGrid' },
  { id: 'mfg-4', pillar: 'manufacturing', title: 'Thermoplastic Processing', description: 'PP, ABS, PC, and engineering polymer processing.', iconName: 'Cylinder' },
  { id: 'mfg-5', pillar: 'manufacturing', title: 'Specialty Compound Development', description: 'Masterbatch and specialty compound development.', iconName: 'Microscope', requiresValidation: true },

  // Technical (pillar: 'technical')
  { id: 'tech-1', pillar: 'technical', title: 'Material Selection Guidance', description: 'Recommending the right polymer grade for your application.', iconName: 'Search' },
  { id: 'tech-2', pillar: 'technical', title: 'Application Engineering Support', description: 'Technical input on design and material compatibility.', iconName: 'Wrench' },
  { id: 'tech-3', pillar: 'technical', title: 'Sample & Trial Supply', description: 'Small-batch samples for evaluation before full production.', iconName: 'Package' },
  { id: 'tech-4', pillar: 'technical', title: 'Technical Consultation', description: 'Direct access to our engineering team for product discussions.', iconName: 'MessageSquare' },
  { id: 'tech-5', pillar: 'technical', title: 'Process Optimisation Support', description: 'Guidance on processing conditions for best results.', iconName: 'SlidersHorizontal', requiresValidation: true },

  // Quality (pillar: 'quality')
  { id: 'qual-1', pillar: 'quality', title: 'In-Process Quality Control', description: 'Monitoring and inspection at every production stage.', iconName: 'ShieldCheck' },
  { id: 'qual-2', pillar: 'quality', title: 'Final Product Inspection', description: 'Pre-shipment quality verification.', iconName: 'ClipboardCheck' },
  { id: 'qual-3', pillar: 'quality', title: 'Material Traceability', description: 'Full material batch traceability documentation.', iconName: 'GitBranch' },
  { id: 'qual-4', pillar: 'quality', title: 'Technical Data Sheet Provision', description: 'Product-specific TDS for all materials supplied.', iconName: 'FileText' },
  { id: 'qual-5', pillar: 'quality', title: 'Certification Compliance Documentation', description: 'IATF 16949, ISO 9001 quality documentation on request.', iconName: 'Award' },

  // Supply & Export (pillar: 'supply')
  { id: 'supp-1', pillar: 'supply', title: 'Flexible Supply Planning', description: 'Demand forecasting and production scheduling coordination.', iconName: 'Calendar' },
  { id: 'supp-2', pillar: 'supply', title: 'Export Documentation', description: 'Commercial invoicing, packing lists, certificates of origin.', iconName: 'Globe', requiresValidation: true },
  { id: 'supp-3', pillar: 'supply', title: 'Custom Packaging Options', description: 'Packaging formats tailored to client requirements.', iconName: 'Box', requiresValidation: true },
  { id: 'supp-4', pillar: 'supply', title: 'Long‑Term Supply Partnership', description: 'Preferred supplier agreements and regular scheduling.', iconName: 'Handshake' },
  { id: 'supp-5', pillar: 'supply', title: 'Dedicated Technical Contact', description: 'Named technical contact for ongoing client relationships.', iconName: 'User' },
]

export const servicePillars: ServicePillarConfig[] = [
  {
    id: 'manufacturing',
    label: 'Manufacturing Services',
    shortLabel: 'Manufacturing',
    eyebrow: 'MANUFACTURING SERVICES',
    headline: 'Precision Production at Every Scale',
    description: 'From custom compound formulation to large-scale batch production, our MIDC Ranjangaon facility operates 35 injection moulding machines around the clock.',
    anchorId: 'manufacturing',
    iconName: 'Factory',
    serviceCount: 5,
  },
  {
    id: 'technical',
    label: 'Technical Partnership',
    shortLabel: 'Technical',
    eyebrow: 'TECHNICAL PARTNERSHIP',
    headline: 'Engineering Support from Material Selection to Production',
    description: 'Our technical team works directly with clients to select the right materials, evaluate applications, and supply samples before committing to full production.',
    anchorId: 'technical',
    iconName: 'Wrench',
    serviceCount: 5,
  },
  {
    id: 'quality',
    label: 'Quality Assurance',
    shortLabel: 'Quality',
    eyebrow: 'QUALITY ASSURANCE',
    headline: 'Consistency Verified at Every Stage',
    description: 'Our quality systems operate under IATF 16949 and ISO 9001. Every batch is inspected, documented, and traceable from raw material to final shipment.',
    anchorId: 'quality',
    iconName: 'ShieldCheck',
    serviceCount: 5,
  },
  {
    id: 'supply',
    label: 'Supply & Export',
    shortLabel: 'Supply',
    eyebrow: 'SUPPLY & EXPORT',
    headline: 'Reliable Supply for Domestic and International Partners',
    description: 'We supply industrial clients across India and four export markets. Flexible scheduling, complete documentation, and a named contact for every account.',
    anchorId: 'supply',
    iconName: 'Globe',
    serviceCount: 5,
  },
]

export const engagementSteps: EngagementStep[] = [
  { step: 1, label: 'Initial Inquiry', description: 'Client contacts via form, WhatsApp, or email.', iconName: 'MessageSquare', duration: 'Same day response' },
  { step: 2, label: 'Requirement Discussion', description: 'Technical team reviews material and application needs.', iconName: 'Users', duration: '1–3 days' },
  { step: 3, label: 'Material Recommendation', description: 'Recommended grade or custom formulation proposed.', iconName: 'ClipboardList', duration: '3–7 days' },
  { step: 4, label: 'Sample Supply', description: 'Samples dispatched for client evaluation.', iconName: 'Package', duration: '⚠ Validate' },
  { step: 5, label: 'Technical Validation', description: 'Client tests samples; feedback exchanged.', iconName: 'CheckCircle', duration: 'Client-side' },
  { step: 6, label: 'Production Confirmation', description: 'Specification approved; production order raised.', iconName: 'Factory', duration: undefined },
  { step: 7, label: 'Manufacture & Inspection', description: 'Batch produced, quality inspected, documented.', iconName: 'ShieldCheck', duration: '⚠ Validate lead time' },
  { step: 8, label: 'Delivery & Ongoing Support', description: 'Material delivered; named technical contact continues.', iconName: 'Truck', duration: undefined },
]