import type {
  ProcessStage,
  MachineCategory,
  QualitySystem,
  ManufacturingMetric,
} from '@/types/manufacturing'

export const productionProcess: ProcessStage[] = [
  {
    step: 1,
    title: 'Raw Material Procurement',
    description:
      'Polymer resins, additives, and masterbatches sourced from approved suppliers under our quality management system.',
    iconName: 'Truck',
    isQualityCheckpoint: false,
  },
  {
    step: 2,
    title: 'Incoming Material Inspection',
    description:
      'Every incoming batch inspected against specification. Non‑conforming materials quarantined immediately.',
    iconName: 'ClipboardCheck',
    isQualityCheckpoint: true,
    checkpointNote: '100% incoming inspection',
  },
  {
    step: 3,
    title: 'Material Preparation',
    description:
      'Materials conditioned, dried, and prepared to validated parameters before processing.',
    iconName: 'SlidersHorizontal',
    isQualityCheckpoint: false,
  },
  {
    step: 4,
    title: 'Production',
    description:
      'Injection moulding on presses from 50T to 1,300T. Process parameters monitored continuously.',
    iconName: 'Factory',
    isQualityCheckpoint: true,
    checkpointNote: 'In‑process SPC monitoring',
  },
  {
    step: 5,
    title: 'In‑Process Inspection',
    description:
      'Dimensional and visual checks at defined intervals. First‑off samples verified before full run.',
    iconName: 'Eye',
    isQualityCheckpoint: true,
    checkpointNote: 'First‑article and periodic inspection',
  },
  {
    step: 6,
    title: 'Final Inspection & Testing',
    description:
      'Completed batches undergo final inspection against the control plan. Results recorded and traceable.',
    iconName: 'ShieldCheck',
    isQualityCheckpoint: true,
    checkpointNote: 'Per‑batch final inspection',
  },
  {
    step: 7,
    title: 'Packaging & Labelling',
    description:
      'Products packaged with full batch identification, quantity, and traceability information.',
    iconName: 'Package',
    isQualityCheckpoint: false,
  },
  {
    step: 8,
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
    label: 'New‑Gen Millkron',
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
    label: 'Millkron 450T Q‑Series',
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
    label: 'Servo Injection Moulding',
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
    value: '80,000',
    unit: 'sq ft',
    label: 'Manufacturing Footprint',
    context: '70,000 sq ft constructed',
  },
  {
    value: 200,
    label: 'Skilled Workforce',
    context: 'Dedicated to polymer division',
  },
]