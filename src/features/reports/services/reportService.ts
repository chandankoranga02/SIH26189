import { AnyEntity, Relationship, CdrRecord, EvidenceRecord } from '@/types'
import { calculatePriority } from '@/features/entities/services/entityService'
import { getDirectNeighbors } from '@/features/network/services/graphAnalytics'
import { timelineObservations } from '@/data'

export const reportService = {
  compileEntityDossier(
    entity: AnyEntity,
    activeRels: Relationship[],
    activeCdrs: CdrRecord[],
    activeEvidences: EvidenceRecord[],
    allEntities: AnyEntity[]
  ) {
    const priority = calculatePriority(entity, activeRels, activeCdrs, activeEvidences, allEntities)
    const neighbors = getDirectNeighbors(entity.id, activeRels)
    const subjectCdrs = activeCdrs.filter(c => c.caller === entity.id || c.receiver === entity.id)
    const totalDuration = subjectCdrs.reduce((acc, c) => acc + c.durationSeconds, 0)
    const subjectEvidences = activeEvidences.filter(ev => ev.linkedEntities.includes(entity.id))
    const subjectTimeline = timelineObservations.filter(
      t => t.entityId === entity.id || t.relatedEntityId === entity.id
    )

    return {
      entity,
      priority,
      neighbors,
      subjectCdrs,
      totalDuration,
      subjectEvidences,
      subjectTimeline
    }
  }
}
