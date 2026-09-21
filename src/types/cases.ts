import { BaseEntity } from './entities'

export type CaseStatus = 'ACTIVE' | 'UNDER_REVIEW' | 'INACTIVE' | 'CLOSED'

export interface CaseDossier extends BaseEntity {
  type: 'CASE'
  firNumber?: string
  courtJurisdiction?: string
  status: string
  incidentDate?: string
  assignedOfficer?: string
  linkedSubjectsCount?: number
}
