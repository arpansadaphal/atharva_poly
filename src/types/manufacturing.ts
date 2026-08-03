export interface ProcessStage {
  step: number
  title: string
  description: string
  iconName: string
  isQualityCheckpoint: boolean
  checkpointNote?: string
}

export interface MachineCategory {
  id: string
  label: string
  range: string
  count?: number
  applications: string[]
  iconName: string
  details?: string // extra info to be shown in card
}

export interface QualitySystem {
  id: string
  title: string
  description: string
  iconName: string
  standard?: string
}

export interface ManufacturingMetric {
  value: number | string
  unit?: string
  label: string
  context: string
}

export interface GalleryImage {
  src: string
  alt: string
  category: 'production' | 'quality' | 'machinery' | 'packaging' | 'facility' | 'team'
  caption?: string
}