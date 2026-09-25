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

// Entity Visual Types — Vibrant Colored Palette for premium 3D graph
export const ENTITY_CONFIG: Record<string, EntityTypeStyle> = {
  PERSON: {
    label: 'Person',
    color: '#818cf8',
    bg: 'rgba(99, 102, 241, 0.15)',
    border: '#818cf8',
    icon: Users,
    baseRadius: 24,
    shape: 'circle'
  },
  PHONE: {
    label: 'Phone',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: '#38bdf8',
    icon: Phone,
    baseRadius: 18,
    shape: 'rounded-rect'
  },
  LOCATION: {
    label: 'Location',
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.12)',
    border: '#34d399',
    icon: MapPin,
    baseRadius: 22,
    shape: 'pin'
  },
  CASE: {
    label: 'FIR / Case',
    color: '#f472b6',
    bg: 'rgba(244, 114, 182, 0.12)',
    border: '#f472b6',
    icon: FileText,
    baseRadius: 22,
    shape: 'square'
  },
  EVENT: {
    label: 'Event',
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.12)',
    border: '#fbbf24',
    icon: Clock,
    baseRadius: 20,
    shape: 'diamond'
  },
  VEHICLE: {
    label: 'Vehicle',
    color: '#fb923c',
    bg: 'rgba(251, 146, 60, 0.12)',
    border: '#fb923c',
    icon: Truck,
    baseRadius: 20,
    shape: 'hexagon'
  },
  ORGANIZATION: {
    label: 'Organization',
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.12)',
    border: '#c084fc',
    icon: Building2,
    baseRadius: 26,
    shape: 'rect'
  },
  DOCUMENT: {
    label: 'Document / Intel',
    color: '#67e8f9',
    bg: 'rgba(103, 232, 249, 0.12)',
    border: '#67e8f9',
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

// Relationship categories — Colored line styling
export const REL_CATEGORY_CONFIG: Record<string, RelCategoryStyle> = {
  COMMUNICATION: { color: '#818cf8', dash: null, width: 1.8 },
  ASSOCIATION: { color: '#a78bfa', dash: null, width: 1.4 },
  LOCATION: { color: '#34d399', dash: '4,4', width: 1.4 },
  CASE: { color: '#f472b6', dash: null, width: 2.2 },
  EVENT: { color: '#fbbf24', dash: '2,3', width: 1.4 },
  MEMBERSHIP: { color: '#c084fc', dash: '6,3', width: 1.4 },
  VEHICLE: { color: '#fb923c', dash: '5,3', width: 1.4 }
}

