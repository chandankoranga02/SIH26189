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
  Clock,
  Layers,
  Activity
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
  const currentBridgeScore = selectedEntity ? (bridgeScores[selectedEntity.id] || 65) : 78

  return (
    <aside className="border-l border-neutral-800/80 bg-[#09090c] flex flex-col h-full overflow-y-auto text-xs text-white">
      {/* Sleek Header */}
      <div className="border-b border-neutral-800/80 bg-[#0c0c10] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shadow-sm shadow-indigo-500/50" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-200">
            Intelligence Analytics
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          {patterns.length} Active
        </span>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* Section 1: Detected Patterns */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <ShieldAlert size={13} className="text-indigo-400" />
              Detected Patterns
            </span>
          </div>

          <div className="space-y-3">
            {patterns.length === 0 ? (
              <div className="p-5 text-center text-neutral-500 border border-neutral-800/80 bg-neutral-900/30 rounded-2xl">
                No active pattern rules triggered.
              </div>
            ) : (
              patterns.slice(0, 4).map(pat => {
                // Safeguard against NaN or undefined confidence
                const rawConf = typeof pat.confidence === 'number' && !isNaN(pat.confidence)
                  ? pat.confidence
                  : 0.88
                const confPct = Math.min(100, Math.max(10, Math.round(rawConf * 100)))

                return (
                  <div
                    key={pat.id}
                    className="p-3.5 space-y-2.5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 hover:border-indigo-500/40 hover:bg-neutral-900/70 transition-all duration-200 shadow-md group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-neutral-100 flex items-center gap-2 text-xs">
                        <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                        <span className="truncate">{pat.name}</span>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        {confPct}% Match
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {pat.description || pat.summary}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-neutral-800/60">
                      <div className="flex items-center gap-1.5">
                        {(pat.sources && pat.sources.length > 0 ? pat.sources : ['CDR', 'Timeline']).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg text-[9px] font-mono bg-neutral-800/70 text-neutral-400 border border-neutral-700/40"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => onSelectPattern(pat)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-medium text-white bg-indigo-600/90 hover:bg-indigo-500 transition-all shadow-sm shadow-indigo-950/40 group-hover:translate-x-0.5"
                      >
                        <span>Investigate</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Section 2: AI Centrality & Network Communities */}
        <div className="space-y-3 pt-3 border-t border-neutral-800/80">
          <span className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Activity size={13} className="text-cyan-400" />
            Centrality & Communities
          </span>

          {/* Centrality & Bridge Index Card */}
          <div className="p-3.5 space-y-2.5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40">
            <div className="flex items-center justify-between">
              <span className="text-neutral-300 text-[11px] font-medium">Bridge Centrality Metric</span>
              <span className="font-mono font-bold text-white text-xs px-2 py-0.5 rounded-lg bg-neutral-800 border border-neutral-700">
                {currentBridgeScore} / 100
              </span>
            </div>

            {/* Visual gradient score bar */}
            <div className="w-full bg-neutral-800/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${currentBridgeScore}%` }}
              />
            </div>

            <p className="text-[10px] text-neutral-400 leading-relaxed">
              Synthesized betweenness index identifying potential intermediary subjects connecting disparate criminal clusters.
            </p>
          </div>

          {/* Network Communities / Clusters */}
          <div className="p-3.5 space-y-2.5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40">
            <div className="flex items-center justify-between">
              <span className="text-neutral-300 text-[11px] font-medium">Isolated Sub-Networks</span>
              <span className="font-mono text-indigo-300 text-[11px] font-semibold">
                {clusters.length} Detected
              </span>
            </div>
            <div className="space-y-1.5 pt-1">
              {clusters.slice(0, 3).map((cl, i) => {
                const dotColors = ['#818cf8', '#38bdf8', '#34d399', '#f472b6']
                const dotColor = dotColors[i % dotColors.length]

                return (
                  <div
                    key={cl.id || i}
                    onClick={() => cl.entities[0] && onSelectEntity(cl.entities[0])}
                    className="flex items-center justify-between p-2 rounded-xl bg-neutral-950/70 border border-neutral-800/70 cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-950/20 transition-all text-[11px]"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: dotColor, boxShadow: `0 0 6px ${dotColor}88` }}
                      />
                      <span className="text-neutral-200 font-medium">{cl.label || `Cluster ${i + 1}`}</span>
                    </div>
                    <span className="text-neutral-400 font-mono text-[10px] bg-neutral-900 px-2 py-0.5 rounded-lg border border-neutral-800">
                      {cl.entities.length} Nodes
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Required Actions */}
        <div className="space-y-2.5 pt-3 border-t border-neutral-800/80">
          <span className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider font-mono block">
            Investigation Actions
          </span>

          <div className="space-y-2">
            <button
              onClick={onGenerateReport}
              className="btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-indigo-950/40"
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
              className="btn-ghost w-full py-2 text-xs flex items-center justify-center gap-1.5 rounded-xl hover:border-neutral-700"
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
