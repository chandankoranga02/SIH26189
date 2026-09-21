import { useMemo } from 'react'
import { AnyEntity, Relationship, EvidenceRecord, DetectedPattern, NetworkCluster } from '@/types'

export interface UseDashboardStatsParams {
  entities: AnyEntity[]
  relationships: Relationship[]
  visibleEntities: AnyEntity[]
  visibleRels: Relationship[]
  evidences: EvidenceRecord[]
  patterns: DetectedPattern[]
  clusters: NetworkCluster[]
}

export function useDashboardStats({
  entities,
  relationships,
  visibleEntities,
  visibleRels,
  evidences,
  patterns,
  clusters
}: UseDashboardStatsParams) {
  const kpis = useMemo(() => {
    return {
      totalEnt: visibleEntities.length,
      totalRel: visibleRels.length,
      persons: visibleEntities.filter(e => e.type === 'PERSON').length,
      activeCases: entities.filter(e => e.type === 'CASE' && e.status === 'ACTIVE').length,
      totalEvidence: evidences.length,
      patternsCount: patterns.length,
      highPriorityCount: visibleEntities.filter(e => (e.basePriority || 0) >= 75).length,
      clustersCount: clusters.length
    }
  }, [visibleEntities, visibleRels, entities, evidences, patterns, clusters])

  return { kpis }
}
