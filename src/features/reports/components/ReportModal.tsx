import React from 'react'
import { FileText, Printer, X, Check, Shield } from 'lucide-react'
import { AnyEntity, Relationship, CdrRecord, EvidenceRecord } from '@/types'
import { calculatePriority } from '@/features/entities/services/entityService'
import { getDirectNeighbors } from '@/features/network/services/graphAnalytics'
import { timelineObservations, DISCLAIMER_TEXT, entities } from '@/data'
import { fmtDuration, fmtDate } from '@/lib'

export interface ReportModalProps {
  entity: AnyEntity | null
  activeRels: Relationship[]
  activeCdrs: CdrRecord[]
  activeEvidences: EvidenceRecord[]
  onClose: () => void
}

export const ReportModal: React.FC<ReportModalProps> = ({
  entity,
  activeRels,
  activeCdrs,
  activeEvidences,
  onClose
}) => {
  if (!entity) return null

  const priority = calculatePriority(entity, activeRels, activeCdrs, activeEvidences)
  const neighbors = getDirectNeighbors(entity.id, activeRels)
  const subjectCdrs = activeCdrs.filter(c => c.caller === entity.id || c.receiver === entity.id)
  const totalDuration = subjectCdrs.reduce((acc, c) => acc + c.durationSeconds, 0)
  const subjectEvidences = activeEvidences.filter(ev => ev.linkedEntities.includes(entity.id))
  const subjectTimeline = timelineObservations.filter(
    t => t.entityId === entity.id || t.relatedEntityId === entity.id
  )

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="intel-panel w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0a0a0a] border-neutral-800 shadow-2xl printable-report text-white">
        {/* Modal Header */}
        <div className="intel-header no-print border-b border-neutral-800 bg-[#050505] p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-[#00629B]" />
            <span className="text-sm font-bold text-white font-mono">
              INVESTIGATION DOSSIER & REPORT PREVIEW
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="btn-primary text-xs py-1.5 px-3">
              <Printer size={14} /> Print / Export PDF
            </button>
            <button onClick={onClose} className="btn-icon" aria-label="Close modal">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Report Content Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-neutral-200">
          {/* Official Banner */}
          <div className="border-b border-neutral-800 pb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00629B] font-mono">
                LINKTRACER INTELLIGENCE • CASE DOSSIER REPORT
              </div>
              <h1 className="text-2xl font-black text-white mt-1">
                Investigation Intelligence Briefing
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Synthesized Cross-Domain Criminal-Network Assessment
              </p>
            </div>
            <div className="text-right">
              <div className="inline-block rounded border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300 font-mono">
                SYNTHETIC DEMO DATASET
              </div>
              <div className="text-[11px] text-neutral-500 mt-1 font-mono">
                Date Generated: {new Date().toLocaleDateString('en-GB')}
              </div>
            </div>
          </div>

          {/* Subject Overview Card */}
          <div className="grid md:grid-cols-[1fr_220px] gap-6 p-5 rounded border border-neutral-800 bg-black">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">{entity.name}</h2>
                <span className="badge-neutral text-xs font-mono">{entity.id}</span>
                <span className="badge-high text-xs font-mono">{entity.status}</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Aliases: <span className="text-neutral-200 font-semibold">{entity.aliases?.join(', ') || 'None'}</span> •
                Role: <span className="text-neutral-200 font-semibold">{entity.role || entity.type}</span>
              </p>
              <p className="text-xs text-neutral-300 mt-3 leading-relaxed">{entity.description}</p>
            </div>

            <div className="rounded border border-neutral-800 bg-neutral-950 p-4 text-center flex flex-col justify-center">
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-mono">
                Analytical Priority
              </div>
              <div className="text-4xl font-black text-[#00629B] mt-1 font-mono">{priority.total} / 100</div>
              <div className="text-[10px] text-neutral-500 mt-1">Weighted Centrality & Signal Index</div>
            </div>
          </div>

          {/* Priority Breakdown Matrix */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
              Priority Score Factor Decomposition
            </h3>
            <div className="grid sm:grid-cols-5 gap-3">
              {Object.entries(priority.breakdown).map(([key, item]) => (
                <div key={key} className="intel-card p-3 border-neutral-800">
                  <div className="text-[10px] text-neutral-400 truncate font-mono">{item.label}</div>
                  <div className="text-base font-black text-white mt-1 font-mono">
                    {item.score} <span className="text-xs font-normal text-neutral-500">/ {item.max}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-neutral-900 overflow-hidden">
                    <div
                      className="h-full bg-[#00629B] rounded-full"
                      style={{ width: `${(item.score / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="intel-card border-neutral-800">
              <div className="text-[10px] text-neutral-400 uppercase font-mono">Direct Network Peers</div>
              <div className="text-2xl font-bold text-white mt-1 font-mono">{neighbors.length}</div>
            </div>
            <div className="intel-card border-neutral-800">
              <div className="text-[10px] text-neutral-400 uppercase font-mono">Total Call Interactions</div>
              <div className="text-2xl font-bold text-[#00629B] mt-1 font-mono">{subjectCdrs.length}</div>
            </div>
            <div className="intel-card border-neutral-800">
              <div className="text-[10px] text-neutral-400 uppercase font-mono">Aggregate Talk Duration</div>
              <div className="text-2xl font-bold text-white mt-1 font-mono">{fmtDuration(totalDuration)}</div>
            </div>
            <div className="intel-card border-neutral-800">
              <div className="text-[10px] text-neutral-400 uppercase font-mono">Linked Evidence Records</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{subjectEvidences.length}</div>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
              Key Analytical Findings
            </h3>
            <div className="space-y-2 text-xs">
              <div className="intel-card flex items-start gap-3 border-neutral-800">
                <Check size={16} className="text-[#00629B] shrink-0 mt-0.5" />
                <span>
                  Subject maintains <strong className="text-white">{neighbors.length} heterogeneous links</strong> across operational entities, phones, and locations.
                </span>
              </div>
              <div className="intel-card flex items-start gap-3 border-neutral-800">
                <Check size={16} className="text-[#00629B] shrink-0 mt-0.5" />
                <span>
                  Observed in <strong className="text-white">{subjectCdrs.length} recorded telecommunication events</strong> totaling {fmtDuration(totalDuration)} of airtime.
                </span>
              </div>
              <div className="intel-card flex items-start gap-3 border-neutral-800">
                <Check size={16} className="text-[#00629B] shrink-0 mt-0.5" />
                <span>
                  Substantiated by <strong className="text-white">{subjectEvidences.length} independent synthetic evidence records</strong> across carrier CDRs, gate manifests, and FIR dossiers.
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Excerpt */}
          {subjectTimeline.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                Chronological Observation Timeline
              </h3>
              <div className="border border-neutral-800 rounded bg-black divide-y divide-neutral-900 text-xs">
                {subjectTimeline.slice(0, 6).map((tl: any) => (
                  <div key={tl.id} className="p-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[#00629B]">
                        {fmtDate(tl.date)} {tl.time}
                      </span>
                      <span className="font-semibold text-white">{tl.title || tl.description}</span>
                    </div>
                    <span className="badge-neutral text-[10px] font-mono">{tl.type || tl.eventType}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandatory Report Disclaimer */}
          <div className="rounded border border-neutral-800 bg-neutral-950 p-4 text-[11px] text-neutral-400 leading-relaxed">
            <p className="font-bold text-neutral-300 uppercase tracking-wider mb-1 font-mono">
              DEMONSTRATION REPORT DISCLAIMER
            </p>
            {DISCLAIMER_TEXT}
          </div>
        </div>
      </div>
    </div>
  )
}
