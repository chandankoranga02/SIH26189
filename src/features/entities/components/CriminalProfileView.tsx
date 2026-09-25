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
      {/* Criminal Mugshot & Header Box — Curvy & Sleek */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4 shadow-md">
        <div className="flex items-start gap-3.5">
          {/* Mugshot Frame with Reticle overlay */}
          <div className="relative h-20 w-20 rounded-2xl border border-neutral-700 bg-neutral-900/90 flex flex-col items-center justify-center shrink-0 overflow-hidden shadow-inner group">
            <User size={36} className="text-neutral-400" />
            <div className="absolute inset-0 border border-white/20 pointer-events-none rounded-2xl" />
            <div className="absolute bottom-0 inset-x-0 bg-neutral-950/85 py-0.5 text-center text-[9px] font-mono text-neutral-300">
              {entity.id}
            </div>
            {/* Crosshair accents */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-indigo-400" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-indigo-400" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-indigo-400" />
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-indigo-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] uppercase font-mono text-neutral-400 font-bold">
                SUBJECT DOSSIER
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                entity.status === 'ACTIVE'
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  : entity.status === 'UNDER_REVIEW'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              }`}>
                {entity.status}
              </span>
            </div>
            <h2 className="text-base font-bold text-white truncate mt-0.5">{entity.name}</h2>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
              Subject ID: <span className="text-indigo-300 font-semibold">{entity.id}</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              Role: <span className="text-neutral-200 font-medium">{entity.role || entity.type}</span>
            </div>
          </div>
        </div>

        {/* Priority Centrality Gauge */}
        <div className="mt-3.5 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
          <span className="text-[10px] text-neutral-400 uppercase font-mono">Priority Index:</span>
          <div className="flex items-center gap-2.5">
            <div className="w-28 bg-neutral-800/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${entity.basePriority || 60}%` }}
              />
            </div>
            <span className="font-mono font-bold text-white text-xs">{entity.basePriority || 60}/100</span>
          </div>
        </div>
      </div>

      {/* Basic Information Section — Curvy Container */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4 space-y-3 shadow-md">
        <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Shield size={13} className="text-indigo-400" />
          Basic Profile Information
        </div>

        <div className="grid grid-cols-2 gap-3 text-[11px]">
          <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
            <span className="text-neutral-500 block text-[10px]">Full Name</span>
            <span className="text-neutral-100 font-medium">{entity.name}</span>
          </div>
          <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
            <span className="text-neutral-500 block text-[10px]">Estimated Age</span>
            <span className="text-neutral-100 font-medium">{age} years</span>
          </div>
        </div>

        <div>
          <span className="text-neutral-400 block text-[10px] font-mono uppercase mb-1">Known Aliases</span>
          <div className="flex flex-wrap gap-1.5">
            {aliases.map((al, idx) => (
              <span key={idx} className="bg-neutral-950/80 border border-neutral-800/90 px-2.5 py-1 rounded-xl text-[10px] text-indigo-300 font-mono">
                "{al}"
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-neutral-400 block text-[10px] font-mono uppercase mb-1">Registered Phone Numbers</span>
          <div className="space-y-1.5">
            {phones.map((p: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-neutral-200 font-mono text-[11px] p-1.5 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
                <Phone size={12} className="text-sky-400 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-neutral-400 block text-[10px] font-mono uppercase mb-1">Known Locations & Coordinates</span>
          <div className="space-y-1.5">
            {addresses.map((addr: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-neutral-200 text-[11px] p-1.5 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
                <MapPin size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">{addr}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-neutral-400 block text-[10px] font-mono uppercase mb-1">Registered Fleet / Vehicles</span>
          <div className="space-y-1.5">
            {vehicles.map((v: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-neutral-200 font-mono text-[11px] p-1.5 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
                <Truck size={12} className="text-amber-400 shrink-0" />
                <span className="truncate">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Involvement Section — Curvy Cards */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <FileText size={13} className="text-pink-400" />
            Case Involvement
          </div>
          {onSwitchTab && (
            <button
              onClick={() => onSwitchTab('firs')}
              className="text-[11px] text-indigo-300 hover:text-indigo-200 hover:underline flex items-center gap-0.5"
            >
              <span>View FIR Dossiers</span>
              <ChevronRight size={12} />
            </button>
          )}
        </div>

        <div className="space-y-2">
          <div className="p-3 rounded-xl border border-neutral-800/80 bg-neutral-950/70 text-xs flex items-center justify-between hover:border-indigo-500/40 transition-all">
            <div>
              <div className="font-semibold text-neutral-100">FIR-2026-081: Freight Diversion</div>
              <div className="text-[10px] text-neutral-400 mt-0.5">Central Industrial Division • Charge: Sec 406/420 IPC</div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              ACTIVE
            </span>
          </div>

          <div className="p-3 rounded-xl border border-neutral-800/80 bg-neutral-950/70 text-xs flex items-center justify-between hover:border-indigo-500/40 transition-all">
            <div>
              <div className="font-semibold text-neutral-100">FIR-2026-104: Telecommunication Relay</div>
              <div className="text-[10px] text-neutral-400 mt-0.5">Special Cyber Cell • Charge: Telegraph Act Sec 25</div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              INQUIRY
            </span>
          </div>
        </div>
      </div>

      {/* Summary of Relationships — Curvy */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-4 space-y-2.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Layers size={13} className="text-indigo-400" />
            Relational Overview ({linkedRels.length} Connections)
          </div>
          {onSwitchTab && (
            <button
              onClick={() => onSwitchTab('relations')}
              className="text-[11px] text-indigo-300 hover:text-indigo-200 hover:underline flex items-center gap-0.5"
            >
              <span>Explore All</span>
              <ChevronRight size={12} />
            </button>
          )}
        </div>

        <p className="text-[11px] text-neutral-300 leading-relaxed bg-neutral-950/50 p-2.5 rounded-xl border border-neutral-800/60">
          {entity.description || 'Active subject within ongoing multi-jurisdictional intelligence operation.'}
        </p>
      </div>
    </div>
  )
}
