import { useMemo, useState } from 'react'
import {
  AnyEntity,
  Relationship,
  CdrRecord,
  EvidenceRecord,
  LocationObservation,
  DateRange,
  DetectedPattern
} from '@/types'
import { runPatternEngine } from '../services/patternService'

export interface UsePatternsParams {
  activeEntities: AnyEntity[]
  activeRels: Relationship[]
  activeCdrs: CdrRecord[]
  activeEvidences: EvidenceRecord[]
  dateRange: DateRange
  locationObservations: LocationObservation[]
  allEntities: AnyEntity[]
}

export function usePatterns({
  activeEntities,
  activeRels,
  activeCdrs,
  activeEvidences,
  dateRange,
  locationObservations,
  allEntities
}: UsePatternsParams) {
  const [selectedPattern, setSelectedPattern] = useState<DetectedPattern | null>(null)

  const patterns = useMemo(() => {
    return runPatternEngine(
      activeEntities,
      activeRels,
      activeCdrs,
      activeEvidences,
      dateRange,
      locationObservations,
      allEntities
    )
  }, [
    activeEntities,
    activeRels,
    activeCdrs,
    activeEvidences,
    dateRange,
    locationObservations,
    allEntities
  ])

  return {
    patterns,
    selectedPattern,
    selectPattern: setSelectedPattern
  }
}
