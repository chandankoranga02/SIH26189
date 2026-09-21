import React from 'react'
import { Database, X, Calendar, FolderGit2, Link2 } from 'lucide-react'
import { AnyEntity, Relationship } from '@/types'
import { evidenceRecords, entities, relationships } from '@/data'
import { ENTITY_CONFIG, fmtDate } from '@/lib'

export interface EvidenceDrawerProps {
  evidenceId: string
  onClose: () => void
  onSelectEntity: (entityId: string) => void
  onSelectRel: (relationship: Relationship) => void
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  evidenceId,
  onClose,
  onSelectEntity,
  onSelectRel
}) => {
  const evidence = evidenceRecords.find(e => e.id === evidenceId)
  if (!evidence) return null

  const linkedEnts = entities.filter(e => evidence.linkedEntities.includes(e.id))
  const linkedRels = relationships.filter(r => evidence.linkedRelationships.includes(r.id))

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l border-neutral-800 bg-[#0a0a0a] shadow-2xl p-6 flex flex-col overflow-y-auto text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded bg-[#00629B]/20 p-2 text-[#00629B] border border-[#00629B]/40">
            <Database size={20} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#00629B] font-mono">
              EVIDENCE RECORD & PROVENANCE
            </div>
            <h3 className="text-lg font-bold text-white font-mono">{evidence.id}</h3>
          </div>
        </div>
        <button onClick={onClose} className="btn-icon" aria-label="Close evidence drawer">
          <X size={16} />
        </button>
      </div>

      <div className="mt-6 space-y-5 flex-1 text-xs">
        <div>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider font-mono">Title</span>
          <p className="text-sm font-semibold text-neutral-100 mt-1">{evidence.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="intel-card">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Evidence Type</div>
            <div className="text-xs font-bold text-[#00629B] mt-1 font-mono">{evidence.type}</div>
          </div>
          <div className="intel-card">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
              Verification Reliability
            </div>
            <div className="text-xs font-bold text-emerald-400 mt-1 font-mono">
              {Math.round((evidence.reliability || 0.85) * 100)}% Verified
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="intel-card">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Observation Date</div>
            <div className="text-xs font-semibold text-neutral-300 mt-1 flex items-center gap-1.5 font-mono">
              <Calendar size={13} className="text-[#00629B]" /> {fmtDate(evidence.dateCollected || evidence.date)}
            </div>
          </div>
          <div className="intel-card">
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Data Source</div>
            <div className="text-xs font-semibold text-neutral-300 mt-1 truncate font-mono">{evidence.source}</div>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider font-mono">
            Description & Context
          </span>
          <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed bg-black p-3 rounded border border-neutral-800">
            {evidence.description}
          </p>
        </div>

        {/* Evidence Lineage Chain */}
        <div>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <FolderGit2 size={13} className="text-[#00629B]" /> Provenance Lineage
          </span>
          <div className="mt-2 rounded border border-neutral-800 bg-black p-4 text-xs space-y-3 font-mono">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00629B]" />
              <span className="text-neutral-400">{evidence.id}</span>
              <span className="text-neutral-600">→</span>
              <span className="text-neutral-200">{evidence.source}</span>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-neutral-800">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              <span className="text-neutral-400">Captured Telemetry</span>
              <span className="text-neutral-600">→</span>
              <span className="text-neutral-200">{evidence.linkedEntities.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2 pl-8 border-l border-neutral-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-neutral-400">Substantiated Link</span>
              <span className="text-neutral-600">→</span>
              <span className="text-emerald-400">
                {evidence.linkedRelationships.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Linked Entities */}
        <div>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider font-mono">Linked Entities</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {linkedEnts.map(ent => (
              <button
                key={ent.id}
                onClick={() => onSelectEntity(ent.id)}
                className="filter-chip hover:border-[#00629B] text-[11px]"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ENTITY_CONFIG[ent.type]?.color }}
                />
                {ent.name} ({ent.id})
              </button>
            ))}
          </div>
        </div>

        {/* Linked Relationships */}
        <div>
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider font-mono">
            Linked Relationships
          </span>
          <div className="mt-2 space-y-1.5">
            {linkedRels.map(rel => (
              <button
                key={rel.id}
                onClick={() => onSelectRel(rel)}
                className="w-full text-left p-2.5 rounded border border-neutral-800 bg-neutral-950 hover:border-[#00629B] flex items-center justify-between text-xs transition"
              >
                <div className="flex items-center gap-2 truncate">
                  <Link2 size={13} className="text-[#00629B] shrink-0" />
                  <span className="text-neutral-200 font-medium font-mono">{rel.id}</span>
                  <span className="text-neutral-500">({rel.type})</span>
                </div>
                <span className="text-[#00629B] font-bold font-mono">{Math.round(rel.confidence * 100)}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-800 mt-6">
        <button onClick={onClose} className="btn-ghost w-full py-2 hover:text-white">
          Close Evidence Dossier
        </button>
      </div>
    </div>
  )
}
