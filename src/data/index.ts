import {
  mockPersons,
  mockPhones,
  mockLocations,
  mockCases,
  mockEvents,
  mockVehicles,
  mockOrganizations,
  mockRelationships,
  mockCdrRecords,
  mockEvidenceRecords,
  mockTimelineObservations,
  mockLocationObservations,
  mockPatternRuleDefinitions,
  DISCLAIMER_TEXT
} from './mock'
import { AnyEntity } from '@/types'

// Re-aggregate 100 normalized heterogeneous entities
export const entities: AnyEntity[] = [
  ...mockPersons,
  ...mockPhones,
  ...mockLocations,
  ...mockCases,
  ...mockEvents,
  ...mockVehicles,
  ...mockOrganizations
]

// Re-export standard collections preserving exact naming
export const relationships = mockRelationships
export const cdrRecords = mockCdrRecords
export const evidenceRecords = mockEvidenceRecords
export const timelineObservations = mockTimelineObservations
export const locationObservations = mockLocationObservations
export const patternRuleDefinitions = mockPatternRuleDefinitions
export { DISCLAIMER_TEXT }

// Export domain subsets
export {
  mockPersons as persons,
  mockPhones as phones,
  mockLocations as locations,
  mockCases as cases,
  mockEvents as events,
  mockVehicles as vehicles,
  mockOrganizations as organizations
}

export * from './mock'
