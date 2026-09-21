import React from 'react'
import { Link2, ArrowRight, X, ChevronRight } from 'lucide-react'
import { Relationship, AnyEntity } from '@/types'
import { entities } from '@/data'
import { ENTITY_CONFIG, fmtDate } from '@/lib'

export interface RelationshipInspectorProps {
  relationship: Relationship
  onSelectEntity: (entityId: string) => void
  onOpenEvidence: (evidenceId: string) => void
  onClose: () => void
}

export const RelationshipInspector: React.FC<RelationshipInspectorProps> = ({
  relationship,
  onSelectEntity,
  onOpenEvidence,
  onClose
}) => {
  const sId =
    typeof relationship.source === 'object' ? relationship.source.id : relationship.source
  const tId =
    typeof relationship.target === 'object' ? relationship.target.id : relationship.target
  const entA = entities.find(e => e.id === sId)
  const entB = entities.find(e => e.id === tId)

  // Transparent Confidence Model
  const evidenceScore = relationship.evidenceSupport || 36
  const commScore = relationship.commSupport || 23
  const tempScore = relationship.tempConsistency || 18
  const sourceScore = relationship.sourceRel || 14

  return (
    <div className="flex flex-col h-full p-4 space-y-4 overflow-y-auto text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-cyan-300">
            Relationship Analysis
          </div>
          <h3 className="text-sm font-bold text-white mt-0.5">{relationship.id}</h3>
        </div>
        <button onClick={onClose} className="btn-icon" aria-label="Close relationship inspector">
          <X size={14} />
        </button>
      </div>

      {/* Connected Entities Link Card */}
      <div className="p-3 rounded-xl border border-white/10 bg-[#0a1626] space-y-3">
        <button
          onClick={() => onSelectEntity(sId)}
          className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-between transition"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: ENTITY_CONFIG[entA?.type || 'PERSON']?.color }}
            />
            <span className="font-semibold text-white">{entA?.name || sId}</span>
          </div>
          <span className="badge-neutral text-[10px]">{sId}</span>
        </button>

        <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-[11px]">
          <Link2 size={13} />
          <span>{relationship.type?.replace(/_/g, ' ')}</span>
          <ArrowRight size={13} />
        </div>

        <button
          onClick={() => onSelectEntity(tId)}
          className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-between transition"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: ENTITY_CONFIG[entB?.type || 'PERSON']?.color }}
            />
            <span className="font-semibold text-white">{entB?.name || tId}</span>
          </div>
          <span className="badge-neutral text-[10px]">{tId}</span>
        </button>
      </div>

      {/* Confidence Model Breakdown */}
      <div className="intel-card p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Relationship Confidence
          </span>
          <span className="text-xl font-black text-cyan-300">
            {Math.round(relationship.confidence * 100)}%
          </span>
        </div>

        <div className="space-y-2 text-[11px]">
          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Evidence Support (40%)</span>
              <span className="font-bold text-slate-200">{evidenceScore} / 40</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400" style={{ width: `${(evidenceScore / 40) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Communication Support (25%)</span>
              <span className="font-bold text-slate-200">{commScore} / 25</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-violet-400" style={{ width: `${(commScore / 25) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Temporal Consistency (20%)</span>
              <span className="font-bold text-slate-200">{tempScore} / 20</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: `${(tempScore / 20) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Source Reliability (15%)</span>
              <span className="font-bold text-slate-200">{sourceScore} / 15</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: `${(sourceScore / 15) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 uppercase tracking-wider pt-1">
          Demo Analytical Confidence Model
        </div>
      </div>

      {/* Description & Date */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Description
        </span>
        <p className="mt-1 text-slate-300 leading-relaxed bg-[#0a1626] p-3 rounded-lg border border-white/5">
          {relationship.description}
        </p>
        <div className="text-[10px] text-slate-500 mt-1">
          Recorded: {fmtDate(relationship.date || relationship.firstSeen)}
        </div>
      </div>

      {/* Linked Evidences */}
      {relationship.evidenceIds && relationship.evidenceIds.length > 0 && (
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Substantiating Evidence
          </span>
          <div className="mt-1.5 space-y-1">
            {relationship.evidenceIds.map(evId => (
              <button
                key={evId}
                onClick={() => onOpenEvidence(evId)}
                className="w-full text-left p-2 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] flex items-center justify-between text-xs transition"
              >
                <span className="font-bold text-cyan-300">{evId}</span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  Inspect <ChevronRight size={12} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
