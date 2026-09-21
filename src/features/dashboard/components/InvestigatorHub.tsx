import React from 'react'
import {
  Users,
  FileText,
  Search,
  Activity,
  GitBranch,
  ArrowRight,
  Shield,
  Target,
  Sparkles,
  Lock,
  Compass
} from 'lucide-react'
import { InvestigatorProfileCard } from './InvestigatorProfileCard'
import { AnyEntity } from '@/types'

export interface InvestigatorHubProps {
  onNavigate: (view: 'hub' | 'directory' | 'workspace' | 'cases' | 'reports' | 'audits') => void
  onSelectEntity: (entityId: string) => void
  assignedCasesCount: number
  totalEntitiesCount: number
  totalRelsCount: number
  highPriorityCount: number
  patternsCount: number
  recentCriminals: AnyEntity[]
}

export const InvestigatorHub: React.FC<InvestigatorHubProps> = ({
  onNavigate,
  onSelectEntity,
  assignedCasesCount,
  totalEntitiesCount,
  totalRelsCount,
  highPriorityCount,
  patternsCount,
  recentCriminals
}) => {
  return (
    <div className="flex-1 p-6 bg-black flex flex-col gap-6 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Welcome Banner */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00629B] font-bold">
            <span className="h-2 w-2 rounded-full bg-[#00629B]" /> LAW ENFORCEMENT INTELLIGENCE COMMAND
          </div>
          <h1 className="text-xl font-bold text-white mt-1">
            Criminal Network Analysis & Investigation Workstation
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Heterogeneous fusion over 100 normalized synthetic entities • 162 relational links • Multimodal link analysis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('workspace')}
            className="btn-primary py-2 px-4 text-xs flex items-center gap-2"
          >
            <Compass size={15} />
            <span>Launch Network Workspace</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Profile Card | Right 4 Operational Action Cards & Threat Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Left: Investigator Profile Card */}
        <InvestigatorProfileCard />

        {/* Right: Operational Navigation Cards */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Criminals Assigned */}
            <div
              onClick={() => onNavigate('cases')}
              className="intel-card p-5 cursor-pointer hover:border-[#00629B] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#00629B] group-hover:border-[#00629B]">
                    <FileText size={20} />
                  </div>
                  <span className="badge-accent">{assignedCasesCount} CASES</span>
                </div>
                <h3 className="text-base font-bold text-white mt-4 group-hover:text-[#00629B] transition">
                  Criminals Assigned
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Active FIR investigations, examined suspects, registered warrants, and judicial inquiries.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white">
                <span>Open Assigned Cases</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition text-[#00629B]" />
              </div>
            </div>

            {/* 2. Criminals Reports */}
            <div
              onClick={() => onNavigate('reports')}
              className="intel-card p-5 cursor-pointer hover:border-[#00629B] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#00629B] group-hover:border-[#00629B]">
                    <Target size={20} />
                  </div>
                  <span className="badge-accent">DOSSIERS</span>
                </div>
                <h3 className="text-base font-bold text-white mt-4 group-hover:text-[#00629B] transition">
                  Criminals Reports
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Formal investigation intelligence briefings, priority scoring factor decomposition, and PDF export.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white">
                <span>View Intelligence Reports</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition text-[#00629B]" />
              </div>
            </div>

            {/* 3. Directory */}
            <div
              onClick={() => onNavigate('directory')}
              className="intel-card p-5 cursor-pointer hover:border-[#00629B] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#00629B] group-hover:border-[#00629B]">
                    <Search size={20} />
                  </div>
                  <span className="badge-accent">{totalEntitiesCount} ENTITIES</span>
                </div>
                <h3 className="text-base font-bold text-white mt-4 group-hover:text-[#00629B] transition">
                  Criminal Directory
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Search subjects by criminal ID, name, known alias, phone IMEI, vehicle plate, or syndicate role.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white">
                <span>Search Criminal Records</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition text-[#00629B]" />
              </div>
            </div>

            {/* 4. Audits */}
            <div
              onClick={() => onNavigate('audits')}
              className="intel-card p-5 cursor-pointer hover:border-[#00629B] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#00629B] group-hover:border-[#00629B]">
                    <Activity size={20} />
                  </div>
                  <span className="badge-accent">FORENSIC</span>
                </div>
                <h3 className="text-base font-bold text-white mt-4 group-hover:text-[#00629B] transition">
                  Audits & Integrity Logs
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Chain-of-custody verification, telemetry audit stream, and analyst query accountability.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-400 group-hover:text-white">
                <span>Inspect Audit Trail</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition text-[#00629B]" />
              </div>
            </div>
          </div>

          {/* Quick Access to Key Syndicate Subjects */}
          <div className="intel-panel p-4">
            <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Target size={14} className="text-[#00629B]" /> PRIORITY TARGETS FOR INVESTIGATION
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                {highPriorityCount} HIGH PRIORITY
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-2">
              {recentCriminals.slice(0, 6).map(ent => (
                <div
                  key={ent.id}
                  onClick={() => {
                    onSelectEntity(ent.id)
                    onNavigate('workspace')
                  }}
                  className="p-2.5 rounded bg-neutral-950 border border-neutral-800 hover:border-[#00629B] cursor-pointer transition flex items-center justify-between"
                >
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">{ent.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono truncate">
                      {ent.id} • {ent.role || ent.type}
                    </div>
                  </div>
                  <span className="badge-high text-[10px] shrink-0 ml-2">{ent.basePriority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
