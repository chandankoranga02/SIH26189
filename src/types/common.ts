export type PriorityLevel = 'ALL' | 'HIGH' | 'MED' | 'LOW'

export type EntityStatus = 'ALL' | 'ACTIVE' | 'UNDER_REVIEW' | 'INACTIVE' | 'CLOSED'

export type ConfidenceLevel = 'ALL' | '90+' | '70-90' | '<70'

export interface DateRange {
  from: string
  to: string
}

export interface AuditLogItem {
  time: string
  text: string
}

export type ViewMode = 'network' | 'hierarchy'

export type BottomTab = 'patterns' | 'clusters' | 'locations' | 'audit'

export interface KPIMetrics {
  totalEnt: number
  totalRel: number
  persons: number
  activeCases: number
  totalEvidence: number
  patternsCount: number
  highPriorityCount: number
  clustersCount: number
}
