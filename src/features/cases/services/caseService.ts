import { CaseEntity } from '@/types'
import { cases } from '@/data'

export const caseService = {
  getAllCases(): CaseEntity[] {
    return cases
  },
  getCaseById(id: string): CaseEntity | undefined {
    return cases.find(c => c.id === id)
  }
}
