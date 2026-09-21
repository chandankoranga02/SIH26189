import { useMemo } from 'react'
import {
  AnyEntity,
  Relationship,
  DateRange,
  PriorityLevel,
  ConfidenceLevel,
  EntityStatus
} from '@/types'
import { calculateBridgeScores, detectClusters } from '../services/graphAnalytics'

export interface UseNetworkGraphParams {
  entities: AnyEntity[]
  relationships: Relationship[]
  selectedEntityTypes: Set<string>
  selectedRelCategories: Set<string>
  priorityFilter: PriorityLevel
  confidenceFilter: ConfidenceLevel
  statusFilter: EntityStatus
  dateRange: DateRange
  spotlightEntityId: string | null
}

export function useNetworkGraph({
  entities,
  relationships,
  selectedEntityTypes,
  selectedRelCategories,
  priorityFilter,
  confidenceFilter,
  statusFilter,
  dateRange,
  spotlightEntityId
}: UseNetworkGraphParams) {
  // Filtered Entities Calculation
  const visibleEntities = useMemo(() => {
    return entities.filter(e => {
      // 1. Entity type filter
      if (!selectedEntityTypes.has(e.type)) return false

      // 2. Status filter
      if (statusFilter !== 'ALL' && e.status !== statusFilter) return false

      // 3. Priority filter
      if (priorityFilter === 'HIGH' && (e.basePriority || 0) < 75) return false
      if (
        priorityFilter === 'MED' &&
        ((e.basePriority || 0) < 60 || (e.basePriority || 0) >= 75)
      )
        return false
      if (priorityFilter === 'LOW' && (e.basePriority || 0) >= 60) return false

      return true
    })
  }, [entities, selectedEntityTypes, statusFilter, priorityFilter])

  const visibleEntityIdSet = useMemo(() => {
    return new Set(visibleEntities.map(e => e.id))
  }, [visibleEntities])

  // Filtered Relationships Calculation
  const visibleRels = useMemo(() => {
    return relationships.filter(r => {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target

      // Both endpoints must be visible
      if (!visibleEntityIdSet.has(s) || !visibleEntityIdSet.has(t)) return false

      // Category filter
      if (!selectedRelCategories.has(r.category)) return false

      // Confidence filter
      if (confidenceFilter === '90+' && r.confidence < 0.9) return false
      if (confidenceFilter === '70-90' && (r.confidence < 0.7 || r.confidence >= 0.9))
        return false
      if (confidenceFilter === '<70' && r.confidence >= 0.7) return false

      // Date range filter
      if (r.date) {
        if (dateRange.from && r.date < dateRange.from) return false
        if (dateRange.to && r.date > dateRange.to) return false
      }

      return true
    })
  }, [relationships, visibleEntityIdSet, selectedRelCategories, confidenceFilter, dateRange])

  // Dynamic Bridge Scores (Betweenness Centrality)
  const bridgeScores = useMemo(() => {
    return calculateBridgeScores(visibleEntities, visibleRels)
  }, [visibleEntities, visibleRels])

  // Dynamic Community Detection
  const clusters = useMemo(() => {
    return detectClusters(visibleEntities, visibleRels, entities)
  }, [visibleEntities, visibleRels, entities])

  return {
    visibleEntities,
    visibleRels,
    bridgeScores,
    clusters
  }
}
