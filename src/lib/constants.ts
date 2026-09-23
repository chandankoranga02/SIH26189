import {
  Users,
  Phone,
  MapPin,
  FileText,
  Clock,
  Truck,
  Building2,
  LucideIcon
} from 'lucide-react'
import { DISCLAIMER_TEXT } from '@/data'

export { DISCLAIMER_TEXT }

// Demo Authentication Credentials
export const DEMO_CREDENTIALS = [
  { user: 'investigator', pass: 'demo123' },
  { user: 'admin@example.com', pass: 'admin123' }
]

export interface EntityTypeStyle {
  label: string
  color: string
  bg: string
  border: string
  icon: LucideIcon
  baseRadius: number
  shape: 'circle' | 'rounded-rect' | 'pin' | 'square' | 'diamond' | 'hexagon' | 'rect'
}

// Entity Visual Types — Monochrome Palette (black fill, white outlines)
export const ENTITY_CONFIG: Record<string, EntityTypeStyle> = {
  PERSON: {
    label: 'Person',
    color: '#ffffff',
    bg: 'rgba(10, 10, 10, 0.92)',
    border: '#ffffff',
    icon: Users,
    baseRadius: 24,
    shape: 'circle'
  },
  PHONE: {
    label: 'Phone',
    color: '#d4d4d8',
    bg: 'rgba(10, 10, 10, 0.92)',
    border: '#d4d4d8',
    icon: Phone,
    baseRadius: 18,
    shape: 'rounded-rect'
  },
  LOCATION: {
    label: 'Location',
    color: '#e4e4e7',
    bg: 'rgba(10, 10, 10, 0.92)',
    border: '#e4e4e7',
    icon: MapPin,
    baseRadius: 22,
    shape: 'pin'
  },
  CASE: {
    label: 'FIR / Case',
    color: '#fafafa',
    bg: 'rgba(10, 10, 10, 0.92)',
    border: '#fafafa',
    icon: FileText,
    baseRadius: 22,
    shape: 'square'
  },
  EVENT: {
    label: 'Event',
    color: '#d4d4d8',
    bg: 'rgba(10, 10, 10, 0.92)',
    border: '#d4d4d8',
    icon: Clock,
    baseRadius: 20,
    shape: 'diamond'
  },
  VEHICLE: {
    label: 'Vehicle',
    color: '#e4e4e7',
    bg: 'rgba(10, 10, 10, 0.92)',
    border: '#e4e4e7',
    icon: Truck,
    baseRadius: 20,
    shape: 'hexagon'
  },
  ORGANIZATION: {
    label: 'Organization',
    color: '#fafafa',
    bg: 'rgba(10, 10, 10, 0.92)',
    border: '#fafafa',
    icon: Building2,
    baseRadius: 26,
    shape: 'rect'
  },
  DOCUMENT: {
    label: 'Document / Intel',
    color: '#d4d4d8',
    bg: 'rgba(10, 10, 10, 0.92)',
    border: '#d4d4d8',
    icon: FileText,
    baseRadius: 21,
    shape: 'square'
  }
}

export interface RelCategoryStyle {
  color: string
  dash: string | null
  width: number
}

// Relationship categories — Monochrome line styling
export const REL_CATEGORY_CONFIG: Record<string, RelCategoryStyle> = {
  COMMUNICATION: { color: '#ffffff', dash: null, width: 1.8 },
  ASSOCIATION: { color: '#a1a1aa', dash: null, width: 1.4 },
  LOCATION: { color: '#a1a1aa', dash: '4,4', width: 1.4 },
  CASE: { color: '#ffffff', dash: null, width: 2.2 },
  EVENT: { color: '#a1a1aa', dash: '2,3', width: 1.4 },
  MEMBERSHIP: { color: '#a1a1aa', dash: '6,3', width: 1.4 },
  VEHICLE: { color: '#a1a1aa', dash: '5,3', width: 1.4 }
}
