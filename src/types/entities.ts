import { LucideIcon } from 'lucide-react'

export type EntityType =
  | 'PERSON'
  | 'PHONE'
  | 'LOCATION'
  | 'CASE'
  | 'EVENT'
  | 'VEHICLE'
  | 'ORGANIZATION'

export interface BaseEntity {
  id: string
  type: EntityType
  name: string
  aliases?: string[]
  status: string
  basePriority: number
  role?: string
  createdAt?: string
  description?: string
  department?: string
  [key: string]: any
}

export interface Person extends BaseEntity {
  type: 'PERSON'
  phoneIds?: string[]
  caseIds?: string[]
}

export interface Phone extends BaseEntity {
  type: 'PHONE'
  carrier?: string
  imei?: string
  subscriberName?: string
}

export interface LocationEntity extends BaseEntity {
  type: 'LOCATION'
  zone?: string
  coordinates?: string
  city?: string
}

export interface CaseEntity extends BaseEntity {
  type: 'CASE'
  courtJurisdiction?: string
  firNumber?: string
  status: string
}

export interface EventEntity extends BaseEntity {
  type: 'EVENT'
  date?: string
  venue?: string
}

export interface Vehicle extends BaseEntity {
  type: 'VEHICLE'
  model?: string
  plateNumber?: string
  color?: string
}

export interface Organization extends BaseEntity {
  type: 'ORGANIZATION'
  registrationNumber?: string
  industry?: string
}

export type AnyEntity = BaseEntity

export interface EntityVisualConfig {
  label: string
  color: string
  bg: string
  border: string
  icon: LucideIcon
  baseRadius: number
  shape: 'circle' | 'rounded-rect' | 'pin' | 'shield' | 'diamond' | 'hexagon' | 'octagon'
}
