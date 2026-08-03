export type ServicePillar =
  | 'manufacturing'
  | 'technical'
  | 'quality'
  | 'supply'

export interface Service {
  id: string
  pillar: ServicePillar
  title: string
  description: string
  iconName: string
  features?: string[]
  requiresValidation?: boolean
}

export interface ServicePillarConfig {
  id: ServicePillar
  label: string
  shortLabel: string
  eyebrow: string
  headline: string
  description: string
  anchorId: string
  iconName: string
  serviceCount: number
}

export interface EngagementStep {
  step: number
  label: string
  description: string
  iconName: string
  duration?: string
}