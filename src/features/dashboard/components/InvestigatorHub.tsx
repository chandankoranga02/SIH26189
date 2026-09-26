import React from 'react'
import {
  Users,
  FolderGit2,
  FileBarChart2,
  Fingerprint,
  Activity,
  ArrowRight,
  Target,
  Compass
} from 'lucide-react'
import { InvestigatorProfileCard } from './InvestigatorProfileCard'
import { MovingDotsBackground } from './MovingDotsBackground'
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
    <div className="relative flex-1 p-6 bg-black flex flex-col gap-6 overflow-y-auto max-w-7xl mx-auto w-full min-h-full">
      {/* Dynamic Animated Dots in White, Pink, Blue, Green randomly moving in black background */}
      <MovingDotsBackground />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Welcome Banner - Curvy & Attractive Cyber Styling */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-[#0c1020]/90 via-[#0d1326]/85 to-[#0b0f1d]/90 backdrop-blur-md p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
              LAW ENFORCEMENT INTELLIGENCE COMMAND
            </div>
            <h1 className="text-xl font-bold text-white mt-1.5 tracking-wide">
              Criminal Network Analysis & Investigation Workstation
            </h1>

          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('workspace')}
              className="rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-2.5 px-4 text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Compass size={16} />
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
              {/* 1. Criminals Assigned - Vibrant Sapphire / Electric Blue */}
              <div
                onClick={() => onNavigate('cases')}
                className="rounded-2xl border border-blue-500/30 hover:border-blue-400/80 bg-gradient-to-br from-blue-950/35 via-[#0a0f1d]/90 to-[#070b14]/95 hover:shadow-[0_10px_35px_-10px_rgba(59,130,246,0.35)] backdrop-blur-md p-6 cursor-pointer group flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)] group-hover:scale-105 transition-transform">
                      <FolderGit2 size={22} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-4 group-hover:text-blue-300 transition-colors">
                    Criminals Assigned
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Active FIR investigations, examined suspects, registered warrants, and judicial inquiries.
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-blue-500/20 flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                  <span>Open Assigned Cases</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-blue-400" />
                </div>
              </div>

              {/* 2. Criminals Reports - Vibrant Purple / Violet */}
              <div
                onClick={() => onNavigate('reports')}
                className="rounded-2xl border border-purple-500/30 hover:border-purple-400/80 bg-gradient-to-br from-purple-950/35 via-[#130b1e]/90 to-[#0a0712]/95 hover:shadow-[0_10px_35px_-10px_rgba(168,85,247,0.35)] backdrop-blur-md p-6 cursor-pointer group flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)] group-hover:scale-105 transition-transform">
                      <FileBarChart2 size={22} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-4 group-hover:text-purple-300 transition-colors">
                    Criminals Reports
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Formal investigation intelligence briefings, priority scoring factor decomposition, and PDF export.
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                  <span>View Intelligence Reports</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-purple-400" />
                </div>
              </div>

              {/* 3. Directory - Vibrant Emerald / Teal */}
              <div
                onClick={() => onNavigate('directory')}
                className="rounded-2xl border border-emerald-500/30 hover:border-emerald-400/80 bg-gradient-to-br from-emerald-950/35 via-[#091812]/90 to-[#06100c]/95 hover:shadow-[0_10px_35px_-10px_rgba(16,185,129,0.35)] backdrop-blur-md p-6 cursor-pointer group flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] group-hover:scale-105 transition-transform">
                      <Fingerprint size={22} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-4 group-hover:text-emerald-300 transition-colors">
                    Criminal Directory
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Search subjects by criminal ID, name, known alias, phone IMEI, vehicle plate, or syndicate role.
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors">
                  <span>Search Criminal Records</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-emerald-400" />
                </div>
              </div>

              {/* 4. Audits - Vibrant Amber / Coral */}
              <div
                onClick={() => onNavigate('audits')}
                className="rounded-2xl border border-amber-500/30 hover:border-amber-400/80 bg-gradient-to-br from-amber-950/30 via-[#1a120b]/90 to-[#100b07]/95 hover:shadow-[0_10px_35px_-10px_rgba(245,158,11,0.35)] backdrop-blur-md p-6 cursor-pointer group flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform">
                      <Activity size={22} />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mt-4 group-hover:text-amber-300 transition-colors">
                    Audits & Integrity Logs
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Chain-of-custody verification, telemetry audit stream, and analyst query accountability.
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:text-amber-300 transition-colors">
                  <span>Inspect Audit Trail</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-amber-400" />
                </div>
              </div>
            </div>

            {/* Quick Access to Key Syndicate Subjects - Curvy & Polished */}
            <div className="rounded-2xl border border-white/10 bg-[#090b14]/80 backdrop-blur-md p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3.5 border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
                  <Target size={15} className="text-cyan-400" /> PRIORITY TARGETS FOR INVESTIGATION
                </span>
                <span className="text-[11px] text-cyan-400/80 font-mono font-medium">
                  {highPriorityCount} HIGH PRIORITY
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-2.5">
                {recentCriminals.slice(0, 6).map(ent => (
                  <div
                    key={ent.id}
                    onClick={() => {
                      onSelectEntity(ent.id)
                      onNavigate('workspace')
                    }}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/20 cursor-pointer transition-all flex items-center justify-between group gap-3"
                  >
                    <img src={`https://i.pravatar.cc/150?u=${ent.id}`} alt={ent.name} className="w-8 h-8 rounded-full border border-neutral-600 object-cover shrink-0" />
                    <div className="truncate flex-1">
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {ent.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono truncate mt-0.5">
                        {ent.id} • {ent.role || ent.type}
                      </div>
                    </div>
                    <span className="rounded-lg font-mono text-[10px] px-2 py-0.5 font-bold shrink-0 ml-2 bg-rose-950/60 border border-rose-500/40 text-rose-300">
                      {ent.basePriority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
