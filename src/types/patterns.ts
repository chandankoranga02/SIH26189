export interface PatternRuleDefinition {
  id: string
  name: string
  category: string
  severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | string
  description: string
  ruleQuery?: string
  confidenceBase?: number
  [key: string]: any
}

export interface DetectedPattern {
  id: string
  name: string
  summary: string
  count: number | string
  basis: string
  entities: string[]
  category?: string
  severity?: string
  type?: string
  confidence?: number
  [key: string]: any
}

export interface NetworkCluster {
  id: string
  entities: string[]
  entityCount: number
  relationshipCount: number
  primaryTypes: string[]
  [key: string]: any
}
