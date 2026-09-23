import React from 'react'
import { AnyEntity, Relationship, CdrRecord, EvidenceRecord } from '@/types'

export interface AppShellProps {
  header: React.ReactNode
  ticker?: React.ReactNode
  kpiStrip?: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
  inspector?: React.ReactNode
  footer?: React.ReactNode
  overlays?: React.ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({
  header,
  ticker,
  kpiStrip,
  sidebar,
  children,
  inspector,
  footer,
  overlays
}) => {
  return (
    <div className="min-h-screen bg-[#060e1a] text-slate-100 flex flex-col selection:bg-neutral-800">
      {header}
      {ticker}
      {kpiStrip}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr_360px] overflow-hidden">
        {sidebar}
        <main className="relative flex flex-col bg-[#050b14] overflow-hidden min-h-[500px]">
          {children}
        </main>
        <aside className="border-l border-white/10 bg-[#071220]/95 flex flex-col overflow-y-auto max-h-[calc(100vh-140px)]">
          {inspector}
        </aside>
      </div>
      {footer}
      {overlays}
    </div>
  )
}
