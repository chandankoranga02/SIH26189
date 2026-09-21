import { useState, useMemo } from 'react'
import { CaseEntity } from '@/types'
import { cases } from '@/data'
import { caseService } from '../services/caseService'

export function useCases() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)

  const allCases = useMemo(() => caseService.getAllCases(), [])

  const selectedCase = useMemo(() => {
    if (!selectedCaseId) return null
    return caseService.getCaseById(selectedCaseId) || null
  }, [selectedCaseId])

  return {
    cases: allCases,
    selectedCaseId,
    setSelectedCaseId,
    selectedCase
  }
}
