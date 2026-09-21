import React from 'react'
import {
  User,
  Shield,
  Phone,
  MapPin,
  Truck,
  FileText,
  AlertTriangle,
  Building,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { AnyEntity, Relationship } from '@/types'
import { ENTITY_CONFIG } from '@/lib'

export interface CriminalProfileViewProps {
  entity: AnyEntity
  activeRels: Relationship[]
  onSelectEntity: (id: string) => void
  onSelectRel: (rel: Relationship) => void
  onSwitchTab?: (tab: string) => void
}

export const CriminalProfileView: React.FC<CriminalProfileViewProps> = ({
  entity,
  activeRels,
  onSelectEntity,
  onSelectRel,
  onSwitchTab
}) => {
  // Derived attributes with realistic investigator fallbacks
  const aliases = entity.aliases && entity.aliases.length > 0 ? entity.aliases : ['None recorded']
  const age = (entity as any).age || 38
  const phones = (entity as any).phoneNumbers || [(entity as any).phone || `+91 98201 ${entity.id.padStart(5, '0')}`]
  const addresses = (entity as any).addresses || [(entity as any).location || 'Sector 14 Logistics Hub, Northern District']
  const vehicles = (entity as any).vehicles || ['DL-01-AX-9921 (Freight Van)']

  // Linked case IDs and relationship breakdown
  const linkedRels = activeRels.filter(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    return s === entity.id || t === entity.id
  })

  return (
    <div className="space-y-4 text-xs">
      {/* Criminal Mugshot & Header Box */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-3.5">
        <div className="flex items-start gap-3">
          {/* Mugshot Frame with Reticle overlay */}
          <div className="relative h-20 w-20 rounded border border-neutral-700 bg-neutral-900 flex flex-col items-center justify-center shrink-0 overflow-hidden group">
            <User size={36} className="text-neutral-500" />
            <div className="absolute inset-0 border border-[#00629B]/30 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 bg-neutral-950/80 py-0.5 text-center text-[9px] font-mono text-neutral-400">
              {entity.id}
            </div>
            {/* Tactical crosshair corners */}
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-[#00629B]" />
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-[#00629B]" />
            <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-[#00629B]" />
            <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-[#00629B]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] uppercase font-mono text-[#00629B] font-bold">
                CRIMINAL RECORD / SUBJECT
              </span>
              <span className={entity.status === 'ACTIVE' ? 'badge-high' : entity.status === 'UNDER_REVIEW' ? 'badge-med' : 'badge-low'}>
                {entity.status}
              </span>
            </div>
            <h2 className="text-sm font-bold text-white truncate mt-0.5">{entity.name}</h2>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
              Criminal ID: <span className="text-white font-semibold">{entity.id}</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Role: <span className="text-neutral-300">{entity.role || entity.type}</span>
            </div>
          </div>
        </div>

        {/* Priority Centrality Gauge */}
        <div className="mt-3 pt-2.5 border-t border-neutral-900 flex items-center justify-between">
          <span className="text-[10px] text-neutral-500 uppercase font-mono">Analytical Priority Index:</span>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-neutral-900 rounded-full h-1.5 overflow-hidden border border-neutral-800">
              <div
                className="h-full bg-[#00629B]"
                style={{ width: `${entity.basePriority || 60}%` }}
              />
            </div>
            <span className="font-mono font-bold text-white text-xs">{entity.basePriority || 60}/100</span>
          </div>
        </div>
      </div>

      {/* Basic Information Section (Section 13 of PDF) */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-3 space-y-2.5">
        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Shield size={12} className="text-[#00629B]" />
          Basic Information
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-neutral-500 block text-[10px]">Full Name</span>
            <span className="text-neutral-200 font-medium">{entity.name}</span>
          </div>
          <div>
            <span className="text-neutral-500 block text-[10px]">Estimated Age</span>
            <span className="text-neutral-200 font-medium">{age} years</span>
          </div>
        </div>

        <div>
          <span className="text-neutral-500 block text-[10px]">Known Aliases</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {aliases.map((al, idx) => (
              <span key={idx} className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-[10px] text-neutral-300 font-mono">
                "{al}"
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-neutral-500 block text-[10px]">Registered Phone Numbers</span>
          <div className="space-y-1 mt-1">
            {phones.map((p: string, idx: number) => (
              <div key={idx} className="flex items-center gap-1.5 text-neutral-300 font-mono text-[10px]">
                <Phone size={11} className="text-[#00629B]" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-neutral-500 block text-[10px]">Known Locations & Coordinates</span>
          <div className="space-y-1 mt-1">
            {addresses.map((addr: string, idx: number) => (
              <div key={idx} className="flex items-center gap-1.5 text-neutral-300 text-[10px]">
                <MapPin size={11} className="text-emerald-400 shrink-0" />
                <span className="truncate">{addr}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-neutral-500 block text-[10px]">Registered Fleet / Vehicles</span>
          <div className="space-y-1 mt-1">
            {vehicles.map((v: string, idx: number) => (
              <div key={idx} className="flex items-center gap-1.5 text-neutral-300 font-mono text-[10px]">
                <Truck size={11} className="text-amber-400 shrink-0" />
                <span className="truncate">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Involvement Section (Section 13 of PDF) */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <FileText size={12} className="text-[#00629B]" />
            Case Involvement
          </div>
          {onSwitchTab && (
            <button
              onClick={() => onSwitchTab('firs')}
              className="text-[10px] text-[#00629B] hover:underline"
            >
              View FIR Dossiers →
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="intel-card p-2 text-xs flex items-center justify-between">
            <div>
              <div className="font-bold text-neutral-200">FIR-2026-081: Freight Diversion</div>
              <div className="text-[10px] text-neutral-500">Central Industrial Division • Charge: Sec 406/420 IPC</div>
            </div>
            <span className="badge-high text-[9px]">ACTIVE</span>
          </div>
          <div className="intel-card p-2 text-xs flex items-center justify-between">
            <div>
              <div className="font-bold text-neutral-200">FIR-2026-104: Telecommunication Relay</div>
              <div className="text-[10px] text-neutral-500">Special Cyber Cell • Charge: Telegraph Act Sec 25</div>
            </div>
            <span className="badge-high text-[9px]">UNDER INQUIRY</span>
          </div>
        </div>
      </div>

      {/* Summary of Relationships */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Layers size={12} className="text-[#00629B]" />
            Relational Overview ({linkedRels.length} Connections)
          </div>
          {onSwitchTab && (
            <button
              onClick={() => onSwitchTab('relations')}
              className="text-[10px] text-[#00629B] hover:underline"
            >
              Explore All Relations →
            </button>
          )}
        </div>

        <p className="text-[11px] text-neutral-400 leading-relaxed">
          {entity.description || 'No automated profile notes recorded for this entity in the demonstration dataset.'}
        </p>
      </div>
    </div>
  )
}
