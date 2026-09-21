import React from 'react'
import {
  FileText,
  ShieldAlert,
  Calendar,
  Building,
  Scale,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { AnyEntity, CaseEntity } from '@/types'
import { mockCases } from '@/data/mock/cases'
import { fmtDate } from '@/lib'

export interface CriminalFirsViewProps {
  entity: AnyEntity
  onSelectEntity?: (id: string) => void
  onOpenReport?: () => void
}

export const CriminalFirsView: React.FC<CriminalFirsViewProps> = ({
  entity,
  onSelectEntity,
  onOpenReport
}) => {
  // Related cases from mockCases based on entity ID or generic demonstration records
  const linkedCases: CaseEntity[] = mockCases.slice(0, 4)

  return (
    <div className="space-y-4 text-xs">
      {/* FIR Header Banner */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-[#00629B]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
              REGISTERED FIRST INFORMATION REPORTS (FIR) & CHARGES
            </span>
          </div>
          <span className="badge-accent">{linkedCases.length} ACTIVE CASES</span>
        </div>
        <p className="text-[11px] text-neutral-400 leading-relaxed">
          Statutory crime registrations, cognizable offences, and charge sheets associated with {entity.name} ({entity.id}).
        </p>
      </div>

      {/* Case Involvements List */}
      <div className="space-y-2.5">
        {linkedCases.map(cs => (
          <div
            key={cs.id}
            className="intel-card p-3.5 space-y-2.5 border-neutral-800 hover:border-[#00629B] transition"
          >
            {/* Top row: Case Number & Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-white font-bold text-xs">{cs.name}</span>
                <span className="badge-neutral text-[9px] font-mono">{cs.id}</span>
              </div>
              <span className={cs.status === 'ACTIVE' ? 'badge-high' : 'badge-med'}>
                {cs.status}
              </span>
            </div>

            {/* Charges and Station */}
            <div className="space-y-1 bg-black/60 rounded border border-neutral-900 p-2 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Police Jurisdiction:</span>
                <span className="text-neutral-300 font-medium">{(cs as any).station || 'Central Crime Branch'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Offence / Section:</span>
                <span className="text-rose-400 font-mono font-bold text-[10px]">{(cs as any).offence || 'Sec 420 / 120B IPC'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Filing Date:</span>
                <span className="text-neutral-300 font-mono text-[10px]">{cs.createdAt ? fmtDate(cs.createdAt) : '2026-07-22'}</span>
              </div>
            </div>

            {/* Summary description */}
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              {cs.description}
            </p>

            {/* Action Bar */}
            <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-[10px]">
                <Scale size={12} className="text-[#00629B]" />
                <span>Court Jurisdiction: Northern Metropolitan Court</span>
              </div>

              {onSelectEntity && (
                <button
                  onClick={() => onSelectEntity(cs.id)}
                  className="btn-ghost text-[10px] py-1 px-2 flex items-center gap-1 hover:text-white"
                >
                  <span>Inspect Case Node</span>
                  <ChevronRight size={11} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
