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

// Entity Visual Types & Colors
export const ENTITY_CONFIG: Record<string, EntityTypeStyle> = {
  PERSON: {
    label: 'Person',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.15)',
    border: '#0284c7',
    icon: Users,
    baseRadius: 24,
    shape: 'circle'
  },
  PHONE: {
    label: 'Phone',
    color: '#a78bfa',
    bg: 'rgba(167, 139, 250, 0.15)',
    border: '#7c3aed',
    icon: Phone,
    baseRadius: 18,
    shape: 'rounded-rect'
  },
  LOCATION: {
    label: 'Location',
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.15)',
    border: '#059669',
    icon: MapPin,
    baseRadius: 22,
    shape: 'pin'
  },
  CASE: {
    label: 'FIR / Case',
    color: '#f87171',
    bg: 'rgba(248, 113, 113, 0.15)',
    border: '#dc2626',
    icon: FileText,
    baseRadius: 22,
    shape: 'square'
  },
  EVENT: {
    label: 'Event',
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.15)',
    border: '#d97706',
    icon: Clock,
    baseRadius: 20,
    shape: 'diamond'
  },
  VEHICLE: {
    label: 'Vehicle',
    color: '#fb923c',
    bg: 'rgba(251, 146, 60, 0.15)',
    border: '#ea580c',
    icon: Truck,
    baseRadius: 20,
    shape: 'hexagon'
  },
  ORGANIZATION: {
    label: 'Organization',
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.15)',
    border: '#2563eb',
    icon: Building2,
    baseRadius: 26,
    shape: 'rect'
  },
  DOCUMENT: {
    label: 'Document / Intel',
    color: '#e879f9',
    bg: 'rgba(232, 121, 249, 0.15)',
    border: '#c026d3',
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

// Relationship categories and styling
export const REL_CATEGORY_CONFIG: Record<string, RelCategoryStyle> = {
  COMMUNICATION: { color: '#38bdf8', dash: null, width: 2 },
  ASSOCIATION: { color: '#94a3b8', dash: null, width: 1.5 },
  LOCATION: { color: '#34d399', dash: '4,4', width: 1.5 },
  CASE: { color: '#f87171', dash: null, width: 2.5 },
  EVENT: { color: '#fbbf24', dash: '2,3', width: 1.8 },
  MEMBERSHIP: { color: '#60a5fa', dash: '6,3', width: 1.8 },
  VEHICLE: { color: '#fb923c', dash: '5,3', width: 1.8 }
}
