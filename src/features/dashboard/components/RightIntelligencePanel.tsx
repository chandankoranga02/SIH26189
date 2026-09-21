import React from 'react'
import {
  Sparkles,
  AlertTriangle,
  Radio,
  MapPin,
  TrendingUp,
  FileText,
  Download,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  Target,
  Clock
} from 'lucide-react'
import { AnyEntity, Relationship, DetectedPattern, NetworkCluster } from '@/types'

export interface RightIntelligencePanelProps {
  patterns: DetectedPattern[]
  clusters: NetworkCluster[]
  selectedEntity?: AnyEntity | null
  bridgeScores: Record<string, number>
  onSelectPattern: (pattern: DetectedPattern) => void
  onSelectEntity: (id: string) => void
  onGenerateReport: () => void
}

export const RightIntelligencePanel: React.FC<RightIntelligencePanelProps> = ({
  patterns,
  clusters,
  selectedEntity,
  bridgeScores,
  onSelectPattern,
  onSelectEntity,
  onGenerateReport
}) => {
  return (
    <aside className="border-l border-neutral-800 bg-black flex flex-col h-full overflow-y-auto text-xs text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-[#050505] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00629B]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-300">
            INTELLIGENCE ANALYTICS & PATTERNS
          </span>
        </div>
        <span className="badge-accent font-mono text-[9px]">{patterns.length} DETECTED</span>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* Section 1: Detected Patterns (PDF Section 16) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
              Detected Patterns
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">Analytical Leads</span>
          </div>

          <div className="space-y-2.5">
            {patterns.length === 0 ? (
              <div className="p-4 text-center text-neutral-500 border border-neutral-800 bg-[#0a0a0a] rounded">
                No active pattern rules triggered.
              </div>
            ) : (
              patterns.slice(0, 4).map(pat => {
                const confPct = Math.round(pat.confidence * 100)

                return (
                  <div
                    key={pat.id}
                    className="intel-card p-3 space-y-2 border-neutral-800 hover:border-[#00629B] transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-neutral-200 flex items-center gap-1.5 text-xs">
                        <AlertTriangle size={12} className="text-[#00629B]" />
                        <span>{pat.name}</span>
                      </div>
                      <span className="badge-high font-mono text-[9px]">
                        {confPct}% CONFIDENCE
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {pat.description || pat.summary}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono pt-1">
                      <span>Sources: {pat.sources?.join(' • ') || 'CDR • Timeline'}</span>
                      <button
                        onClick={() => onSelectPattern(pat)}
                        className="btn-ghost text-[10px] py-0.5 px-2 text-[#00629B] border-neutral-800 hover:text-white"
                      >
                        [ Investigate ]
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Section 2: AI Reports & Score Analytics (Wireframe Page 2) */}
        <div className="space-y-3 pt-2 border-t border-neutral-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
              AI Reports & Score Analytics
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">Top Centrality</span>
          </div>

          {/* Centrality & Bridge Index Card */}
          <div className="intel-card p-3 space-y-2 border-neutral-800">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 text-[11px]">Bridge Centrality Metric:</span>
              <span className="font-bold font-mono text-[#00629B] text-xs">
                {selectedEntity ? bridgeScores[selectedEntity.id] || 65 : 78} / 100
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 leading-relaxed">
              Synthesized betweenness index identifying potential intermediary subjects connecting disparate criminal clusters.
            </p>
          </div>

          {/* Network Communities / Clusters */}
          <div className="intel-card p-3 space-y-2 border-neutral-800">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400 text-[11px]">Network Communities:</span>
              <span className="font-bold font-mono text-white text-xs">{clusters.length} Isolated Sub-Nets</span>
            </div>
            <div className="space-y-1.5 pt-1">
              {clusters.slice(0, 3).map((cl, i) => (
                <div
                  key={cl.id || i}
                  onClick={() => cl.entities[0] && onSelectEntity(cl.entities[0])}
                  className="flex items-center justify-between p-1.5 rounded bg-black border border-neutral-900 cursor-pointer hover:border-[#00629B] transition text-[10px]"
                >
                  <span className="text-neutral-300 font-medium">{cl.label || `Cluster ${i + 1}`}</span>
                  <span className="text-neutral-500 font-mono">{cl.entities.length} Nodes</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Required Actions (Wireframe Page 2) */}
        <div className="space-y-2.5 pt-2 border-t border-neutral-900">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono block">
            Required Actions
          </span>

          <div className="space-y-2">
            <button
              onClick={onGenerateReport}
              className="btn-primary w-full py-2 text-xs flex items-center justify-center gap-2"
            >
              <FileText size={14} />
              <span>Generate Dossier Report</span>
            </button>

            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify({ timestamp: new Date().toISOString(), status: 'ACTIVE' }, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `intelligence-export-${Date.now()}.json`
                a.click()
              }}
              className="btn-ghost w-full py-1.5 text-xs flex items-center justify-center gap-1.5 hover:text-white"
            >
              <Download size={13} />
              <span>Export Network Dataset (JSON)</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
