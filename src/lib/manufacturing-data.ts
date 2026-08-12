// import type {
//   ProcessStage,
//   MachineCategory,
//   QualitySystem,
//   ManufacturingMetric,
// } from '@/types/manufacturing'

// export const productionProcess: ProcessStage[] = [
//   {
//     step: 1,
//     title: 'Raw Material Procurement',
//     description:
//       'Polymer resins, additives, and masterbatches sourced from approved suppliers under our quality management system.',
//     iconName: 'Truck',
//     isQualityCheckpoint: false,
//   },
//   {
//     step: 2,
//     title: 'Incoming Material Inspection',
//     description:
//       'Every incoming batch inspected against specification. Non‑conforming materials quarantined immediately.',
//     iconName: 'ClipboardCheck',
//     isQualityCheckpoint: true,
//     checkpointNote: '100% incoming inspection',
//   },
//   {
//     step: 3,
//     title: 'Material Preparation',
//     description:
//       'Materials conditioned, dried, and prepared to validated parameters before processing.',
//     iconName: 'SlidersHorizontal',
//     isQualityCheckpoint: false,
//   },
//   {
//     step: 4,
//     title: 'Production',
//     description:
//       'Injection moulding on presses from 50T to 1,300T. Process parameters monitored continuously.',
//     iconName: 'Factory',
//     isQualityCheckpoint: true,
//     checkpointNote: 'In‑process SPC monitoring',
//   },
//   {
//     step: 5,
//     title: 'In‑Process Inspection',
//     description:
//       'Dimensional and visual checks at defined intervals. First‑off samples verified before full run.',
//     iconName: 'Eye',
//     isQualityCheckpoint: true,
//     checkpointNote: 'First‑article and periodic inspection',
//   },
//   {
//     step: 6,
//     title: 'Final Inspection & Testing',
//     description:
//       'Completed batches undergo final inspection against the control plan. Results recorded and traceable.',
//     iconName: 'ShieldCheck',
//     isQualityCheckpoint: true,
//     checkpointNote: 'Per‑batch final inspection',
//   },
//   {
//     step: 7,
//     title: 'Packaging & Labelling',
//     description:
//       'Products packaged with full batch identification, quantity, and traceability information.',
//     iconName: 'Package',
//     isQualityCheckpoint: false,
//   },
//   {
//     step: 8,
//     title: 'Documentation & Dispatch',
//     description:
//       'Quality records, test reports, and delivery documentation prepared and dispatched with each order.',
//     iconName: 'FileText',
//     isQualityCheckpoint: false,
//   },
// ]

// export const machineCategories: MachineCategory[] = [
//   {
//     id: 'light',
//     label: 'New‑Gen Milacron',
//     range: '100T – 250T',
//     count: 5,
//     applications: [
//       'High‑precision small‑ to medium‑sized parts',
//       'Caps and enclosures',
//       'Consumer goods',
//     ],
//     iconName: 'Layers',
//     details: '5 machines',
//   },
//   {
//     id: 'medium',
//     label: 'Milacron 450T Q‑Series',
//     range: '450T',
//     count: 5,
//     applications: [
//       'Medium‑sized structural parts',
//       'Automotive interior components',
//       'Industrial housings',
//     ],
//     iconName: 'Cpu',
//     details: '5 machines (1+4)',
//   },
//   {
//     id: 'heavy',
//     label: 'Servo Injection Molding',
//     range: '50T – 1,000T',
//     count: 19,
//     applications: [
//       'All‑electric / hybrid machines',
//       'Energy‑efficient, repeatable production',
//       'L&T Demag, Toshiba, Super Master',
//     ],
//     iconName: 'Settings2',
//     details: '19 machines across tonnages',
//   },
// ]

// export const qualitySystems: QualitySystem[] = [
//   {
//     id: 'microscope',
//     title: 'Microscope Analysis',
//     description:
//       'High‑magnification surface and dimensional inspection for defect detection.',
//     iconName: 'Microscope',
//   },
//   {
//     id: 'moisture',
//     title: 'Moisture Analysis',
//     description:
//       'Pre‑processing moisture verification to prevent hydrolysis and ensure part integrity.',
//     iconName: 'Droplets',
//   },
//   {
//     id: 'colorimeter',
//     title: 'Colorimeter Testing',
//     description:
//       'Precise colour measurement for brand‑critical applications.',
//     iconName: 'Palette',
//   },
//   {
//     id: 'gauges',
//     title: 'Gauges & MFI Testing',
//     description:
//       'Mechanical gauges and Melt Flow Index tester for material property verification.',
//     iconName: 'Ruler',
//   },
//   {
//     id: 'faro',
//     title: 'FARO Arm Inspection',
//     description:
//       'Portable 3D measurement arm for complex geometry validation and first‑article inspection.',
//     iconName: 'ScanLine',
//   },
//   {
//     id: 'spm',
//     title: 'SPM Camera Inspection',
//     description:
//       'Automated optical inspection with pass/fail overlay — zero‑defect assurance for high‑volume lines.',
//     iconName: 'Camera',
//   },
// ]

// export const capacityMetrics: ManufacturingMetric[] = [
//   {
//     value: '60+',
//     label: 'Injection Moulding Machines',
//     context: '50T to 1,300T clamping force',
//   },
//   {
//     value: '3,600',
//     unit: 'MT',
//     label: 'Annual Polymer Processing',
//     context: 'Capacity for large‑scale programs',
//   },
//   {
//     value: '106,000',
//     unit: 'sq ft',
//     label: 'Manufacturing Footprint',
//     context: '85,000 sq ft constructed',
//   },
//   {
//     value: 200,
//     label: 'Skilled Workforce',
//     context: 'Dedicated to polymer division',
//   },
// ]

// src/lib/manufacturing-data.ts
import type {
  ProcessStage,
  MachineCategory,
  QualitySystem,
  ManufacturingMetric,
} from '@/types/manufacturing'

export const productionProcess: ProcessStage[] = [
  // ─────────── Pre‑Production (New Tooling & Project Development) ───────────
  {
    step: 1,
    title: 'RFQ',
    description:
      'Request for quotation received and reviewed. Scope, volumes, and commercial terms clarified with the customer.',
    iconName: 'FileText',
    isQualityCheckpoint: false,
  },
  {
    step: 2,
    title: 'DFM',
    description:
      'Design for Manufacturability review. Part geometry, material selection, and mouldability analysed for production feasibility.',
    iconName: 'PenTool',
    isQualityCheckpoint: true,
    checkpointNote: 'DFM report issued',
  },
  {
    step: 3,
    title: 'Tool Design',
    description:
      'Detailed injection mould design including gate placement, cooling channels, and ejection strategy.',
    iconName: 'Compass',
    isQualityCheckpoint: false,
  },
  {
    step: 4,
    title: 'Tool Manufacturing',
    description:
      'Precision tool manufacturing using in‑house capabilities and trusted partners. Tool steel sourced and machined to specification.',
    iconName: 'Hammer',
    isQualityCheckpoint: false,
  },
  {
    step: 5,
    title: 'T0 (First Tool Trial)',
    description:
      'First trial shots taken from the new tool. Initial samples inspected for dimensional accuracy and surface finish.',
    iconName: 'Wrench',
    isQualityCheckpoint: true,
    checkpointNote: 'T0 samples reviewed',
  },
  {
    step: 6,
    title: 'TF (Final Tool Trial)',
    description:
      'Final tool trial after modifications. Production‑intent process parameters established.',
    iconName: 'BadgeCheck',
    isQualityCheckpoint: true,
    checkpointNote: 'TF sign‑off',
  },
  {
    step: 7,
    title: 'PPAP',
    description:
      'Production Part Approval Process. Full dimensional layout, material certification, and capability studies submitted.',
    iconName: 'FileCheck',
    isQualityCheckpoint: true,
    checkpointNote: 'Customer approval obtained',
  },

  // ─────────── Production (Existing Steps Renumbered) ───────────
  {
    step: 8,
    title: 'Raw Material Procurement',
    description:
      'Polymer resins, additives, and masterbatches sourced from approved suppliers under our quality management system.',
    iconName: 'Truck',
    isQualityCheckpoint: false,
  },
  {
    step: 9,
    title: 'Incoming Material Inspection',
    description:
      'Every incoming batch inspected against specification. Non‑conforming materials quarantined immediately.',
    iconName: 'ClipboardCheck',
    isQualityCheckpoint: true,
    checkpointNote: '100% incoming inspection',
  },
  {
    step: 10,
    title: 'Material Preparation',
    description:
      'Materials conditioned, dried, and prepared to validated parameters before processing.',
    iconName: 'SlidersHorizontal',
    isQualityCheckpoint: false,
  },
  {
    step: 11,
    title: 'Production',
    description:
      'Injection moulding on presses from 50T to 1,300T. Process parameters monitored continuously.',
    iconName: 'Factory',
    isQualityCheckpoint: true,
    checkpointNote: 'In‑process SPC monitoring',
  },
  {
    step: 12,
    title: 'In‑Process Inspection',
    description:
      'Dimensional and visual checks at defined intervals. First‑off samples verified before full run.',
    iconName: 'Eye',
    isQualityCheckpoint: true,
    checkpointNote: 'First‑article and periodic inspection',
  },
  {
    step: 13,
    title: 'Final Inspection & Testing',
    description:
      'Completed batches undergo final inspection against the control plan. Results recorded and traceable.',
    iconName: 'ShieldCheck',
    isQualityCheckpoint: true,
    checkpointNote: 'Per‑batch final inspection',
  },
  {
    step: 14,
    title: 'Packaging & Labelling',
    description:
      'Products packaged with full batch identification, quantity, and traceability information.',
    iconName: 'Package',
    isQualityCheckpoint: false,
  },
  {
    step: 15,
    title: 'Documentation & Dispatch',
    description:
      'Quality records, test reports, and delivery documentation prepared and dispatched with each order.',
    iconName: 'FileText',
    isQualityCheckpoint: false,
  },
]

export const machineCategories: MachineCategory[] = [
  {
    id: 'light',
    label: 'New‑Gen Milacron',
    range: '100T – 250T',
    count: 5,
    applications: [
      'High‑precision small‑ to medium‑sized parts',
      'Caps and enclosures',
      'Consumer goods',
    ],
    iconName: 'Layers',
    details: '5 machines',
  },
  {
    id: 'medium',
    label: 'Milacron 450T Q‑Series',
    range: '450T',
    count: 5,
    applications: [
      'Medium‑sized structural parts',
      'Automotive interior components',
      'Industrial housings',
    ],
    iconName: 'Cpu',
    details: '5 machines (1+4)',
  },
  {
    id: 'heavy',
    label: 'Servo Injection Molding',
    range: '50T – 1,000T',
    count: 19,
    applications: [
      'All‑electric / hybrid machines',
      'Energy‑efficient, repeatable production',
      'L&T Demag, Toshiba, Super Master',
    ],
    iconName: 'Settings2',
    details: '19 machines across tonnages',
  },
]

export const qualitySystems: QualitySystem[] = [
  {
    id: 'microscope',
    title: 'Microscope Analysis',
    description:
      'High‑magnification surface and dimensional inspection for defect detection.',
    iconName: 'Microscope',
  },
  {
    id: 'moisture',
    title: 'Moisture Analysis',
    description:
      'Pre‑processing moisture verification to prevent hydrolysis and ensure part integrity.',
    iconName: 'Droplets',
  },
  {
    id: 'colorimeter',
    title: 'Colorimeter Testing',
    description:
      'Precise colour measurement for brand‑critical applications.',
    iconName: 'Palette',
  },
  {
    id: 'gauges',
    title: 'Gauges & MFI Testing',
    description:
      'Mechanical gauges and Melt Flow Index tester for material property verification.',
    iconName: 'Ruler',
  },
  {
    id: 'faro',
    title: 'FARO Arm Inspection',
    description:
      'Portable 3D measurement arm for complex geometry validation and first‑article inspection.',
    iconName: 'ScanLine',
  },
  {
    id: 'spm',
    title: 'SPM Camera Inspection',
    description:
      'Automated optical inspection with pass/fail overlay — zero‑defect assurance for high‑volume lines.',
    iconName: 'Camera',
  },
]

export const capacityMetrics: ManufacturingMetric[] = [
  {
    value: '60+',
    label: 'Injection Moulding Machines',
    context: '50T to 1,300T clamping force',
  },
  {
    value: '3,600',
    unit: 'MT',
    label: 'Annual Polymer Processing',
    context: 'Capacity for large‑scale programs',
  },
  {
    value: '106,000',
    unit: 'sq ft',
    label: 'Manufacturing Footprint',
    context: '85,000 sq ft constructed',
  },
  {
    value: 200,
    label: 'Skilled Workforce',
    context: 'Dedicated to polymer division',
  },
]