export type RelationshipCategory =
  | 'LOGISTICS'
  | 'FINANCIAL'
  | 'COMMUNICATION'
  | 'TEMPORAL'
  | 'CO_TRAVEL'
  | 'OWNERSHIP'
  | 'ASSOCIATION'
  | 'LOCATION'
  | 'CASE'
  | 'EVENT'
  | 'MEMBERSHIP'
  | 'VEHICLE'
  | (string & {})

export interface Relationship {
  id: string
  source: string | any
  target: string | any
  type: string
  category: RelationshipCategory
  confidence: number
  firstSeen?: string
  lastSeen?: string
  date?: string
  weight?: number
  description?: string
  evidenceCount?: number
  evidenceIds?: string[]
  evidenceSupport?: number
  commSupport?: number
  tempConsistency?: number
  sourceRel?: number
  metadata?: Record<string, any>
  [key: string]: any
}

export interface RelCategoryVisualConfig {
  label: string
  color: string
  width: number
  dash: string | null
  desc?: string
}
