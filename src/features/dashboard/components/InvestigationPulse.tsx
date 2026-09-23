import React from 'react'
import { AlertTriangle, ArrowRight } from 'lucide-react'

export interface ThreatAlert {
  id: string
  level: string
  text: string
  targetId: string
}

export interface InvestigationPulseProps {
  onSelectAlert: (targetId: string) => void
}

const DEFAULT_ALERTS: ThreatAlert[] = [
  {
    id: 'ALT-01',
    level: 'CRITICAL',
    text: 'Midnight encrypted relay cluster flagged between P001 (Arjun Mehta) & P003 (Sameer Khan)',
    targetId: 'P003'
  },
  {
    id: 'ALT-02',
    level: 'FINANCIAL',
    text: 'Hawala Ledger extract DOC002 links 12 informal wire transfers to ORG004 & P016',
    targetId: 'P016'
  },
  {
    id: 'ALT-03',
    level: 'ANPR MATCH',
    text: 'Vehicle VEH001 detected at Border Checkpoint Alpha under counterfeit manifest DOC001',
    targetId: 'VEH001'
  },
  {
    id: 'ALT-04',
    level: 'TELECOM',
    text: 'Burst roaming telemetry on satellite unit PH015 near Highland Transit Point',
    targetId: 'PH015'
  },
  {
    id: 'ALT-05',
    level: 'CORPORATE',
    text: 'Shell incorporation dossier DOC005 ties Apex Trading to nominee escrow accounts',
    targetId: 'DOC005'
  },
  {
    id: 'ALT-06',
    level: 'INTERCEPTION',
    text: 'ANPR camera capture cross-verified with nocturnal convoy timeline at Mill Complex',
    targetId: 'LOC010'
  }
]

export const InvestigationPulse: React.FC<InvestigationPulseProps> = ({ onSelectAlert }) => {
  return (
    <div className="border-b border-neutral-800 bg-[#09090B] px-4 py-1.5 flex items-center gap-3 overflow-hidden text-xs select-none">
      <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-400 font-bold text-[10px] tracking-wider uppercase threat-pulse font-mono">
        <AlertTriangle size={12} className="text-neutral-400 animate-pulse" /> Live Threat Feed
      </div>
      <div className="overflow-hidden relative flex-1 flex items-center">
        <div className="ticker-scroll flex items-center gap-10 text-[11px] text-neutral-300">
          {DEFAULT_ALERTS.concat(DEFAULT_ALERTS).map((alt, i) => (
            <button
              key={`${alt.id}-${i}`}
              onClick={() => onSelectAlert(alt.targetId)}
              className="inline-flex items-center gap-2 hover:text-white transition group shrink-0 text-left"
            >
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:border-white font-mono">
                {alt.level}
              </span>
              <span className="text-neutral-300 group-hover:text-white">{alt.text}</span>
              <ArrowRight
                size={11}
                className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
