export interface TimelineObservation {
  id: string
  date: string
  time: string
  entityId: string
  relatedEntityId?: string
  eventType?: string
  type?: string
  title?: string
  location?: string
  locationId?: string
  evidenceId?: string
  description: string
  flag?: string
  [key: string]: any
}

export interface LocationOverlap {
  entityA: string
  entityB: string
  overlapCount: number
  dates?: string[]
  sharedDays?: number
  [key: string]: any
}

export interface LocationObservation {
  id: string
  locationName: string
  locationId?: string
  coordinates?: [number, number]
  overlaps: LocationOverlap[]
  [key: string]: any
}

export interface CdrRecord {
  id: string
  caller: string
  receiver: string
  timestamp: string
  durationSeconds: number
  cellTower?: string
  tower?: string
  callerPhone?: string
  receiverPhone?: string
  location?: string
  source?: string
  callType: string
  isAnomaly?: boolean
  [key: string]: any
}
