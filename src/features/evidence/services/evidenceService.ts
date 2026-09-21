import { EvidenceRecord } from '@/types'
import { evidenceRecords } from '@/data'

export const evidenceService = {
  getEvidenceById(id: string): EvidenceRecord | undefined {
    return evidenceRecords.find(e => e.id === id)
  },
  getEvidenceForEntity(entityId: string): EvidenceRecord[] {
    return evidenceRecords.filter(ev => ev.linkedEntities.includes(entityId))
  },
  getEvidenceForRelationship(relId: string): EvidenceRecord[] {
    return evidenceRecords.filter(ev => ev.linkedRelationships.includes(relId))
  },
  getAllEvidence(): EvidenceRecord[] {
    return evidenceRecords
  }
}
