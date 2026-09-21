export interface EvidenceRecord {
  id: string
  title: string
  type: string
  source?: string
  date?: string
  dateCollected?: string
  reliability?: number
  chainOfCustody?: string[]
  linkedEntities: string[]
  linkedRelationships: string[]
  hash?: string
  legalAdmissibility?: string
  summary?: string
  description?: string
  metadata?: Record<string, any>
  [key: string]: any
}
