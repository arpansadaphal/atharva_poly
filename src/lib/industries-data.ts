// import type { Industry } from '@/types/industries'

// export const industries: Industry[] = [
//   {
//     slug: 'appliances',
//     name: 'Appliances',
//     tagline: 'Smart, durable parts for the world’s leading home appliance brands. 40% of our business.',
//     share: '40%',
//     iconName: 'Refrigerator',
//     image: '/assets/industries/appliances.jpg', 
//     overview:
//       'We supply injection‑moulded components to major appliance manufacturers including Haier, Godrej, Kenstar, and Atomberg. Our parts meet demanding aesthetic, dimensional, and durability standards for household appliances.',
//     challenges: [
//       {
//         title: 'Aesthetic Consistency',
//         description: 'Consumer‑facing parts require perfect colour and surface finish across every batch.',
//         iconName: 'Palette',
//       },
//       {
//         title: 'Dimensional Stability',
//         description: 'Components must maintain precise dimensions to fit into complex assemblies.',
//         iconName: 'Ruler',
//       },
//       {
//         title: 'Production Scalability',
//         description: 'High‑volume demand needs repeatable processes across thousands of parts.',
//         iconName: 'TrendingUp',
//       },
//     ],
//     applications: [
//       { title: 'Control Panels & Bezels', description: 'Front panels and trim for washing machines, refrigerators, and air conditioners.', iconName: 'Monitor' },
//       { title: 'Internal Structural Parts', description: 'Brackets, housings, and supports inside appliance chassis.', iconName: 'Layers' },
//       { title: 'Decorative Trims', description: 'Aesthetic covers and brand‑specific design elements.', iconName: 'Star' },
//     ],
//     clients: [
//       { name: 'Haier', logoPath: '/assets/logos/haier.png' },
//       { name: 'Godrej', logoPath: '/assets/logos/godrej.png' },
//       { name: 'Kenstar', logoPath: '/assets/logos/kenstar.png' },
//       { name: 'Atomberg', logoPath: '/assets/logos/atomberg.png' },
//     ],
//     products: [
//       { name: 'Washing Machine Panel', shortDesc: 'Front control panel housing for top‑load washers.', slug: '#' },
//       { name: 'Refrigerator Trim', shortDesc: 'Door handle inserts and decorative trims.', slug: '#' },
//       { name: 'AC Front Grill', shortDesc: 'Air‑conditioner outlet grills with consistent finish.', slug: '#' },
//     ],
//     certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
//     services: [
//       { title: 'In‑house Tool Design', description: 'CAD, reverse engineering, and rapid prototyping for appliance tooling.', iconName: 'PenTool' },
//       { title: 'Automated Inspection', description: 'FARO arm and camera systems ensure zero‑defect deliveries.', iconName: 'Camera' },
//       { title: 'Just‑in‑Time Supply', description: 'Flexible production scheduling aligned with your assembly lines.', iconName: 'Truck' },
//     ],
//     metaTitle: 'Appliance Polymer Components | Atharva Polymers, Pune',
//     metaDescription: 'Injection‑moulded parts for Haier, Godrej, Kenstar, Atomberg. 40% of business. 60+ machines. IATF 16949 certified. MIDC Ranjangaon, Pune.',
//   },
//   {
//     slug: 'automotive',
//     name: 'Automotive & Off‑Road Vehicles',
//     tagline: 'Critical structural & functional components for vehicles. IATF 16949 certified. 40% of revenue.',
//     share: '40%',
//     iconName: 'Car',
//     overview:
//       'Atharva Polymers supplies injection‑moulded plastic parts to global vehicle manufacturers, including Toro, Ditch Witch, Spark Minda, Uno Minda, Varroc, Pricol, and IAC. Our components are found in autonomous commercial lawnmowers, off‑road utility vehicles, and automotive systems. Every part is produced under IATF 16949 certified quality systems, with full traceability and zero‑defect supply expectations.',
//       image: '/assets/industries/automotive.jpg', 
//     challenges: [
//       { title: 'Dimensional Precision', description: 'Vehicle components must maintain exact tolerances across production batches.', iconName: 'Ruler' },
//       { title: 'Vibration & Impact Resistance', description: 'Parts endure constant vibration and mechanical shock in service.', iconName: 'Zap' },
//       { title: 'IATF 16949 Compliance', description: 'Full PPAP capability, material traceability, and documented quality systems.', iconName: 'ShieldCheck' },
//       { title: 'Export Readiness', description: 'US‑bound parts require international packaging, documentation, and logistics coordination.', iconName: 'Globe' },
//     ],
//     applications: [
//       { title: 'Seat Bottoms', description: 'Large structural seat bases for off‑road utility vehicles.', iconName: 'Armchair' },
//       { title: 'Control Mechanisms', description: 'Housings for throttle and drive controls.', iconName: 'SlidersHorizontal' },
//       { title: 'Chassis Covers & Shrouds', description: 'Top covers and rear valances for autonomous mowers.', iconName: 'Layers' },
//       { title: 'Bumpers & Exterior Parts', description: 'Curved outer bumpers for turf and utility equipment.', iconName: 'Shield' },
//       { title: 'Fluid Handling Parts', description: 'Tee fittings and vacuum handles for engine systems.', iconName: 'Droplets' },
//       { title: 'Charging Panels', description: 'Front/rear charger panels for electric vehicle platforms.', iconName: 'BatteryCharging' },
//     ],
//     clients: [
//       { name: 'Toro', logoPath: '/assets/logos/toro.png' },
//       { name: 'Ditch Witch', logoPath: '/assets/logos/ditch-witch.png' },
//       { name: 'Spark Minda', logoPath: '/assets/logos/spark-minda.png' },
//       { name: 'Uno Minda', logoPath: '/assets/logos/uno-minda.png' },
//       { name: 'Varroc', logoPath: '/assets/logos/varroc.png' },
//       { name: 'Pricol', logoPath: '/assets/logos/pricol.png' },
//       { name: 'IAC', logoPath: '/assets/logos/iac.png' },
//     ],
//     products: [
//       { name: 'Seat Bottom Assembly', shortDesc: 'Heavy‑duty structural seat for Toro utility vehicles.', slug: '#' },
//       { name: 'Toro Optimus Chassis Cover', shortDesc: 'Top shroud body lid for autonomous lawnmower.', slug: '#' },
//       { name: 'Outer Bumper', shortDesc: 'Impact‑resistant curved bumper for off‑road equipment.', slug: '#' },
//       { name: 'Button Stop', shortDesc: 'Emergency stop button housing for vehicle controls.', slug: '#' },
//       { name: 'Tee Fitting', shortDesc: 'High‑durability connector for fluid systems.', slug: '#' },
//       { name: 'Panel Rear Charger', shortDesc: 'Rear charger panel for electric vehicle base station.', slug: '#' },
//     ],
//     certifications: ['IATF 16949', 'ISO 9001', 'ISO 14001', 'OHSAS 18001'],
//     services: [
//       { title: 'Tool Design & Development', description: 'In‑house mold flow analysis, soft tooling, and prototyping for complex geometries.', iconName: 'PenTool' },
//       { title: 'Automated Inspection', description: 'FARO arm and SPM camera systems for 100% dimensional verification.', iconName: 'Camera' },
//       { title: 'Critical Assemblies', description: 'Finished vehicle‑ready parts with painting and decoration.', iconName: 'Wrench' },
//     ],
//     metaTitle: 'Automotive Polymer Components | Atharva Polymers, Pune',
//     metaDescription: 'IATF 16949 certified parts for Toro, Ditch Witch, Spark Minda. Seats, chassis covers, bumpers. Export to USA. MIDC Ranjangaon, Pune.',
//   },
//   {
//     slug: 'furniture',
//     name: 'Furniture',
//     tagline: 'Precision‑moulded components for premium office furniture and seating. 10% of business.',
//     share: '10%',
//     iconName: 'Armchair',
//     overview:
//       'We manufacture high‑quality plastic components for global furniture leaders including Steelcase, Herman Miller, HNI, and Spacewood Office Solutions. Our parts meet rigorous ergonomic, durability, and surface finish standards.',
//       image: '/assets/industries/furniture.jpg', 
//     challenges: [
//       { title: 'Surface Finish', description: 'Visible furniture parts demand flawless surface quality and texture consistency.', iconName: 'Palette' },
//       { title: 'Structural Integrity', description: 'Seating and structural components must support weight and repetitive stress.', iconName: 'Weight' },
//       { title: 'Colour Matching', description: 'Brand‑specific colours must match across different materials and batches.', iconName: 'Droplets' },
//     ],
//     applications: [
//       { title: 'Seat Shells', description: 'Contoured seat bases for ergonomic office chairs.', iconName: 'Armchair' },
//       { title: 'Backrest Frames', description: 'Structural frames supporting lumbar mechanisms.', iconName: 'Frame' },
//       { title: 'Armrest Components', description: 'Adjustable armrests with soft‑touch finishes.', iconName: 'Hand' },
//     ],
//     clients: [
//       { name: 'Steelcase', logoPath: '/assets/logos/steelcase.png' },
//       { name: 'Herman Miller', logoPath: '/assets/logos/herman-miller.png' },
//       { name: 'HNI', logoPath: '/assets/logos/hni.png' },
//       { name: 'Spacewood Office Solutions', logoPath: '/assets/logos/spacewood.png' },
//     ],
//     products: [
//       { name: 'Office Chair Seat Shell', shortDesc: 'Ergonomic seat base for premium task chairs.', slug: '#' },
//       { name: 'Backrest Frame', shortDesc: 'Structural back support with integrated lumbar mount.', slug: '#' },
//       { name: 'Armrest Housing', shortDesc: 'Height‑adjustable armrest mechanism covers.', slug: '#' },
//     ],
//     certifications: ['ISO 9001'],
//     services: [
//       { title: 'Texture & Colour Development', description: 'Custom surface finishes and colour matching to brand specifications.', iconName: 'Palette' },
//       { title: 'Assembly & Kitting', description: 'Pre‑assembled components ready for final furniture assembly.', iconName: 'Package' },
//     ],
//     metaTitle: 'Furniture Polymer Components | Atharva Polymers',
//     metaDescription: 'Seat shells, backrests, armrests for Steelcase, Herman Miller. Consistent surface finish and colour. MIDC Ranjangaon, Pune.',
//   },
//   {
//     slug: 'others',
//     name: 'Industrial & Medical',
//     tagline: 'High‑spec parts for industrial equipment, electronics, and pharma. 10% of business.',
//     share: '10%',
//     iconName: 'Factory',
//     image: '/assets/industries/industrial.png',
//     overview:
//       'We produce precision polymer components for industrial conglomerates L&T, JABIL, DRTS, and medical device leaders Fresenius Kabi and Nipro. Our parts meet stringent regulatory and performance requirements.',

//     challenges: [
//       { title: 'Regulatory Compliance', description: 'Medical and pharma components require validated processes and clean manufacturing.', iconName: 'FileCheck' },
//       { title: 'Material Certification', description: 'Full material traceability and biocompatibility documentation.', iconName: 'Microscope' },
//       { title: 'Precision Tolerances', description: 'Industrial equipment demands extremely tight dimensional control.', iconName: 'Ruler' },
//     ],
//     applications: [
//       { title: 'Medical Device Housings', description: 'Enclosures for diagnostic and therapeutic equipment.', iconName: 'HeartPulse' },
//       { title: 'Pharma Packaging Components', description: 'Precision caps and closures for pharmaceutical containers.', iconName: 'Pill' },
//       { title: 'Industrial Equipment Parts', description: 'Structural and functional parts for heavy machinery.', iconName: 'Settings' },
//     ],
//     clients: [
//       { name: 'JABIL', logoPath: '/assets/logos/jabil.png' },
//       { name: 'Larsen & Toubro', logoPath: '/assets/logos/lnt.png' },
//       { name: 'DRTS', logoPath: '/assets/logos/drts.png' },
//       { name: 'Fresenius Kabi', logoPath: '/assets/logos/fresenius-kabi.png' },
//       { name: 'Nipro', logoPath: '/assets/logos/nipro.png' },
//     ],
//     products: [
//       { name: 'Medical Device Enclosure', shortDesc: 'Custom housing for diagnostic equipment.', slug: '#' },
//       { name: 'Pharma Cap', shortDesc: 'Tamper‑evident closure for injectable vials.', slug: '#' },
//       { name: 'Industrial Connector', shortDesc: 'High‑durability electrical connector housing.', slug: '#' },
//     ],
//     certifications: ['ISO 9001', 'ISO 14001'],
//     services: [
//       { title: 'Cleanroom Moulding', description: 'Controlled environment production for medical components.', iconName: 'ShieldCheck' },
//       { title: 'Validation Support', description: 'Process validation documentation for regulatory submissions.', iconName: 'FileText' },
//     ],
//     metaTitle: 'Industrial & Medical Polymer Parts | Atharva Polymers',
//     metaDescription: 'Precision components for L&T, JABIL, Fresenius Kabi. Cleanroom moulding available. MIDC Ranjangaon, Pune.',
//   },
// ]

// export function getIndustryBySlug(slug: string): Industry | undefined {
//   return industries.find((i) => i.slug === slug)
// }

import type { Industry } from '@/types/industries'

export const industries: Industry[] = [
  {
    slug: 'appliances',
    name: 'Appliances',
    tagline: 'Smart, durable parts for the world’s leading home appliance brands. 40% of our business.',
    share: '40%',
    iconName: 'Refrigerator',
    image: '/assets/industries/appliances.jpg',
    overview:
      'We supply injection‑moulded components to major appliance manufacturers including Haier, Godrej and Atomberg. Our parts meet demanding aesthetic, dimensional, and durability standards for household appliances.',
    challenges: [
      {
        title: 'Aesthetic Consistency',
        description: 'Consumer‑facing parts require perfect colour and surface finish across every batch.',
        iconName: 'Palette',
      },
      {
        title: 'Dimensional Stability',
        description: 'Components must maintain precise dimensions to fit into complex assemblies.',
        iconName: 'Ruler',
      },
      {
        title: 'Production Scalability',
        description: 'High‑volume demand needs repeatable processes across thousands of parts.',
        iconName: 'TrendingUp',
      },
    ],
    applications: [
      { title: 'Control Panels & Bezels', description: 'Front panels and trim for washing machines, refrigerators, and air conditioners.', iconName: 'Monitor' },
      { title: 'Internal Structural Parts', description: 'Brackets, housings, and supports inside appliance chassis.', iconName: 'Layers' },
      { title: 'Decorative Trims', description: 'Aesthetic covers and brand‑specific design elements.', iconName: 'Star' },
    ],
    clients: [
      { name: 'Haier', logoPath: '/assets/logos/haier.png' },
      { name: 'Godrej', logoPath: '/assets/logos/godrej.png' },
      // { name: 'Kenstar', logoPath: '/assets/logos/kenstar.png' },
      { name: 'Atomberg', logoPath: '/assets/logos/atomberg.png' },
    ],
    products: [
      { name: 'Washing Machine Panel', shortDesc: 'Front control panel housing for top‑load washers.', slug: '#' },
      { name: 'Refrigerator Trim', shortDesc: 'Door handle inserts and decorative trims.', slug: '#' },
      { name: 'AC Front Grill', shortDesc: 'Air‑conditioner outlet grills with consistent finish.', slug: '#' },
    ],
    certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
    services: [
      { title: 'In‑house Tool Design', description: 'CAD, reverse engineering, and rapid prototyping for appliance tooling.', iconName: 'PenTool' },
      { title: 'Automated Inspection', description: 'FARO arm and camera systems ensure zero‑defect deliveries.', iconName: 'Camera' },
      { title: 'Just‑in‑Time Supply', description: 'Flexible production scheduling aligned with your assembly lines.', iconName: 'Truck' },
    ],
    metaTitle: 'Appliance Polymer Components | Atharva Polymers, Pune',
    metaDescription: 'Injection‑moulded parts for Haier, Godrej and Atomberg. 40% of business. 60+ machines. IATF 16949 certified. MIDC Ranjangaon, Pune.',
  },
  {
    slug: 'automotive',
    name: 'Automotive & Off‑Road Vehicles',
    tagline: 'Critical structural & functional components for vehicles. IATF 16949 certified. 40% of revenue.',
    share: '40%',
    iconName: 'Car',
    overview:
      'Atharva Polymers supplies injection‑moulded plastic parts to global vehicle manufacturers, including Toro, Ditch Witch, Spark Minda, Uno Minda and Varroc. Our components are found in autonomous commercial lawnmowers, off‑road utility vehicles, and automotive systems. Every part is produced under IATF 16949 certified quality systems, with full traceability and zero‑defect supply expectations.',
    image: '/assets/industries/automotive.jpg',
    challenges: [
      { title: 'Dimensional Precision', description: 'Vehicle components must maintain exact tolerances across production batches.', iconName: 'Ruler' },
      { title: 'Vibration & Impact Resistance', description: 'Parts endure constant vibration and mechanical shock in service.', iconName: 'Zap' },
      { title: 'IATF 16949 Compliance', description: 'Full PPAP capability, material traceability, and documented quality systems.', iconName: 'ShieldCheck' },
      { title: 'Export Readiness', description: 'US‑bound parts require international packaging, documentation, and logistics coordination.', iconName: 'Globe' },
    ],
    applications: [
      { title: 'Seat Bottoms', description: 'Large structural seat bases for off‑road utility vehicles.', iconName: 'Armchair' },
      { title: 'Control Mechanisms', description: 'Housings for throttle and drive controls.', iconName: 'SlidersHorizontal' },
      { title: 'Chassis Covers & Shrouds', description: 'Top covers and rear valances for autonomous mowers.', iconName: 'Layers' },
      { title: 'Bumpers & Exterior Parts', description: 'Curved outer bumpers for turf and utility equipment.', iconName: 'Shield' },
      { title: 'Fluid Handling Parts', description: 'Tee fittings and vacuum handles for engine systems.', iconName: 'Droplets' },
      { title: 'Charging Panels', description: 'Front/rear charger panels for electric vehicle platforms.', iconName: 'BatteryCharging' },
    ],
    clients: [
      { name: 'Toro', logoPath: '/assets/logos/toro.png' },
      { name: 'Bajaj', logoPath: '/assets/logos/bajaj.png' },
      { name: 'JABIL', logoPath: '/assets/logos/jabil.png' },
      { name: 'Ditch Witch', logoPath: '/assets/logos/ditch-witch.jpg' },
      { name: 'Spark Minda', logoPath: '/assets/logos/spark-minda.png' },
      { name: 'Uno Minda', logoPath: '/assets/logos/uno-minda.png' },
      { name: 'Varroc', logoPath: '/assets/logos/varroc.png' },
      // { name: 'Pricol', logoPath: '/assets/logos/pricol.png' },
      // { name: 'IAC', logoPath: '/assets/logos/iac.png' },
    ],
    products: [
      { name: 'Seat Bottom Assembly', shortDesc: 'Heavy‑duty structural seat for Toro utility vehicles.', slug: '#' },
      { name: 'Toro Optimus Chassis Cover', shortDesc: 'Top shroud body lid for autonomous lawnmower.', slug: '#' },
      { name: 'Outer Bumper', shortDesc: 'Impact‑resistant curved bumper for off‑road equipment.', slug: '#' },
      { name: 'Button Stop', shortDesc: 'Emergency stop button housing for vehicle controls.', slug: '#' },
      { name: 'Tee Fitting', shortDesc: 'High‑durability connector for fluid systems.', slug: '#' },
      { name: 'Panel Rear Charger', shortDesc: 'Rear charger panel for electric vehicle base station.', slug: '#' },
    ],
    certifications: ['IATF 16949', 'ISO 9001', 'ISO 14001', 'OHSAS 18001'],
    services: [
      { title: 'Tool Design & Development', description: 'In‑house mold flow analysis, soft tooling, and prototyping for complex geometries.', iconName: 'PenTool' },
      { title: 'Automated Inspection', description: 'FARO arm and SPM camera systems for 100% dimensional verification.', iconName: 'Camera' },
      { title: 'Critical Assemblies', description: 'Finished vehicle‑ready parts with painting and decoration.', iconName: 'Wrench' },
    ],
    metaTitle: 'Automotive Polymer Components | Atharva Polymers, Pune',
    metaDescription: 'IATF 16949 certified parts for Toro, Ditch Witch, Spark Minda. Seats, chassis covers, bumpers. Export to USA. MIDC Ranjangaon, Pune.',
  },
  {
    slug: 'furniture',
    name: 'Furniture',
    tagline: 'Precision‑moulded components for premium office furniture and seating. 10% of business.',
    share: '10%',
    iconName: 'Armchair',
    overview:
      'We manufacture high‑quality plastic components for global furniture leaders including Steelcase, Herman Miller, HNI, and Spacewood Office Solutions. Our parts meet rigorous ergonomic, durability, and surface finish standards.',
    image: '/assets/industries/furniture.jpg',
    challenges: [
      { title: 'Surface Finish', description: 'Visible furniture parts demand flawless surface quality and texture consistency.', iconName: 'Palette' },
      { title: 'Structural Integrity', description: 'Seating and structural components must support weight and repetitive stress.', iconName: 'Weight' },
      { title: 'Colour Matching', description: 'Brand‑specific colours must match across different materials and batches.', iconName: 'Droplets' },
    ],
    applications: [
      { title: 'Seat Shells', description: 'Contoured seat bases for ergonomic office chairs.', iconName: 'Armchair' },
      { title: 'Backrest Frames', description: 'Structural frames supporting lumbar mechanisms.', iconName: 'Frame' },
      { title: 'Armrest Components', description: 'Adjustable armrests with soft‑touch finishes.', iconName: 'Hand' },
    ],
    clients: [
      { name: 'Steelcase', logoPath: '/assets/logos/steelcase.png' },
      { name: 'Herman Miller', logoPath: '/assets/logos/herman-miller.png' },
      { name: 'HNI', logoPath: '/assets/logos/hni.png' },
      { name: 'Spacewood Office Solutions', logoPath: '/assets/logos/spacewood.png' },
    ],
    products: [
      { name: 'Office Chair Seat Shell', shortDesc: 'Ergonomic seat base for premium task chairs.', slug: '#' },
      { name: 'Backrest Frame', shortDesc: 'Structural back support with integrated lumbar mount.', slug: '#' },
      { name: 'Armrest Housing', shortDesc: 'Height‑adjustable armrest mechanism covers.', slug: '#' },
    ],
    certifications: ['ISO 9001'],
    services: [
      { title: 'Texture & Colour Development', description: 'Custom surface finishes and colour matching to brand specifications.', iconName: 'Palette' },
      { title: 'Assembly & Kitting', description: 'Pre‑assembled components ready for final furniture assembly.', iconName: 'Package' },
    ],
    metaTitle: 'Furniture Polymer Components | Atharva Polymers',
    metaDescription: 'Seat shells, backrests, armrests for Steelcase, Herman Miller. Consistent surface finish and colour. MIDC Ranjangaon, Pune.',
  },
  {
    slug: 'others', // slug retained for backward compatibility with existing product data
    name: 'Industrial & FMCG',
    tagline: 'Durable parts for industrial equipment and fast‑moving consumer goods. 10% of business.',
    share: '10%',
    iconName: 'Factory',
    image: '/assets/industries/industrial.png',
    overview:
      'We produce precision polymer components for industrial leaders like JABIL, Bajaj and Awesome, as well as FMCG packaging for leading consumer brands. Our caps, closures, and industrial parts are manufactured to exacting standards in high‑volume production environments.',
    challenges: [
      { title: 'High‑Volume Production', description: 'FMCG packaging demands consistent quality across millions of units.', iconName: 'TrendingUp' },
      { title: 'Precision Tolerances', description: 'Industrial equipment components require extremely tight dimensional control.', iconName: 'Ruler' },
      { title: 'Brand Consistency', description: 'Consumer‑facing caps and closures must match exact brand colours and finishes.', iconName: 'Palette' },
    ],
    applications: [
      { title: 'Caps & Closures', description: '28 mm, 38 mm, 67 mm, 89 mm caps for containers and industrial packaging.', iconName: 'Circle' },
      { title: 'Industrial Equipment Parts', description: 'Structural and functional parts for machinery and electronic assemblies.', iconName: 'Settings' },
      { title: 'Consumer Packaging', description: 'Custom moulded components for FMCG product packaging and dispensing.', iconName: 'Package' },
    ],
    clients: [
      
      // { name: 'Larsen & Toubro', logoPath: '/assets/logos/lnt.png' },
      { name: 'Awesome', logoPath: '/assets/logos/awesome.jpeg' },
      // { name: 'Britannia', logoPath: '/assets/logos/britannia.png' },
    ],
    products: [
      { name: '28 mm Cap', shortDesc: 'Standard white threaded cap for containers.', slug: '28mm-cap' },
      { name: '38 mm Cap', shortDesc: 'Durable PP cap for larger container openings.', slug: '38mm-cap' },
      { name: '89 mm Cap', shortDesc: 'Wide red cap for bulk industrial drums.', slug: '89mm-cap' },
      { name: 'Industrial Connector', shortDesc: 'High‑durability electrical connector housing.', slug: '#' },
    ],
    certifications: ['ISO 9001', 'ISO 14001'],
    services: [
      { title: 'In‑house Tool Design', description: 'Rapid prototyping and mould development for caps and industrial components.', iconName: 'PenTool' },
      { title: 'High‑Speed Automation', description: 'Automated production lines for consistent, high‑volume output.', iconName: 'Zap' },
    ],
    metaTitle: 'Industrial & FMCG Polymer Components | Atharva Polymers, Pune',
    metaDescription: 'Caps, closures, industrial parts for JABIL, Bajaj and Awesome. ISO 9001. High‑volume production. MIDC Ranjangaon, Pune.',
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}