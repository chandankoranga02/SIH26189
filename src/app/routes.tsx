import React, { useState } from 'react'
import { DashboardPage } from '@/features/dashboard'

export type AppRoute =
  | '/dashboard'
  | '/cases'
  | '/cases/:caseId'
  | '/entities'
  | '/entities/:entityId'
  | '/network'
  | '/patterns'
  | '/timeline'
  | '/evidence'
  | '/reports'

export interface AppRouterProps {
  onLogout: () => void
}

export const AppRouter: React.FC<AppRouterProps> = ({ onLogout }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('/dashboard')

  // The primary workstation interface is the comprehensive Dashboard
  // Other conceptual routes are cleanly pluggable here as the prototype expands
  return <DashboardPage onLogout={onLogout} />
}
