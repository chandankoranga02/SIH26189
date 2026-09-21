import { AnyEntity, Relationship, CdrRecord, EvidenceRecord } from '@/types'
import { getDirectNeighbors } from '@/features/network/services/graphAnalytics'

export interface PriorityBreakdownItem {
  score: number
  max: number
  label: string
}

export interface PriorityResult {
  total: number
  breakdown: {
    centrality: PriorityBreakdownItem
    communication: PriorityBreakdownItem
    caseInvolvement: PriorityBreakdownItem
    locationOverlap: PriorityBreakdownItem
    evidenceStrength: PriorityBreakdownItem
  }
}

// Transparent Analytical Priority Calculation
export function calculatePriority(
  entity: AnyEntity | null | undefined,
  activeRels: Relationship[],
  activeCdrs: CdrRecord[],
  activeEvidences: EvidenceRecord[],
  allEntities: AnyEntity[] = []
): PriorityResult {
  if (!entity) {
    return {
      total: 0,
      breakdown: {
        centrality: { score: 0, max: 30, label: 'Network Centrality' },
        communication: { score: 0, max: 20, label: 'Communication Activity' },
        caseInvolvement: { score: 0, max: 20, label: 'Case Involvement' },
        locationOverlap: { score: 0, max: 15, label: 'Location Overlap' },
        evidenceStrength: { score: 0, max: 15, label: 'Evidence Strength' }
      }
    }
  }

  const neighbors = getDirectNeighbors(entity.id, activeRels)
  const degree = neighbors.length

  // 1. Centrality: max benchmark ~ 12 connections
  const centralityScore = Math.min(Math.round((degree / 10) * 30), 30)

  // 2. Communication Activity
  const commCalls = activeCdrs.filter(c => c.caller === entity.id || c.receiver === entity.id)
  const commScore = Math.min(Math.round((commCalls.length / 12) * 20), 20)

  // 3. Case Involvement
  const linkedCases = activeRels.filter(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    const other = s === entity.id ? t : s
    const otherEntity = allEntities.find(e => e.id === other)
    return (s === entity.id || t === entity.id) && otherEntity?.type === 'CASE'
  })
  const caseScore = Math.min(Math.round((linkedCases.length / 3) * 20), 20)

  // 4. Location Overlap
  const locRels = activeRels.filter(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    const other = s === entity.id ? t : s
    const otherEntity = allEntities.find(e => e.id === other)
    return (s === entity.id || t === entity.id) && otherEntity?.type === 'LOCATION'
  })
  const locScore = Math.min(Math.round((locRels.length / 3) * 15), 15)

  // 5. Evidence Strength
  const subjectEvidences = activeEvidences.filter(ev => ev.linkedEntities.includes(entity.id))
  const evidenceScore = Math.min(Math.round((subjectEvidences.length / 6) * 15), 15)

  const rawTotal = Math.min(centralityScore + commScore + caseScore + locScore + evidenceScore, 100)
  const total = Math.max(
    rawTotal,
    entity.basePriority ? Math.round((rawTotal + entity.basePriority) / 2) : 25
  )

  return {
    total,
    breakdown: {
      centrality: { score: centralityScore, max: 30, label: 'Network Centrality' },
      communication: { score: commScore, max: 20, label: 'Communication Activity' },
      caseInvolvement: { score: caseScore, max: 20, label: 'Case Involvement' },
      locationOverlap: { score: locScore, max: 15, label: 'Location Overlap' },
      evidenceStrength: { score: evidenceScore, max: 15, label: 'Evidence Strength' }
    }
  }
}

export function getEntityById(id: string, entitiesList: AnyEntity[]): AnyEntity | undefined {
  return entitiesList.find(e => e.id === id)
}

export function searchEntities(query: string, entitiesList: AnyEntity[]): AnyEntity[] {
  if (!query || !query.trim()) return []
  const q = query.trim().toLowerCase()
  return entitiesList
    .filter(
      e =>
        e.name.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q) ||
        e.aliases?.some(a => a.toLowerCase().includes(q)) ||
        e.role?.toLowerCase().includes(q)
    )
    .slice(0, 8)
}
