import { TimelineObservation, CdrRecord } from '@/types'
import { timelineObservations, cdrRecords } from '@/data'

export const timelineService = {
  getObservationsForEntity(entityId: string): TimelineObservation[] {
    return timelineObservations.filter(
      t => t.entityId === entityId || t.relatedEntityId === entityId
    )
  },
  getCdrsForEntity(entityId: string): CdrRecord[] {
    return cdrRecords.filter(c => c.caller === entityId || c.receiver === entityId)
  },
  getAllTimeline(): TimelineObservation[] {
    return timelineObservations
  }
}
