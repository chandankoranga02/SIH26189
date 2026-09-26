import React, { useState } from 'react'
import { FileText, Shield, Search, ChevronRight, Scale, Clock, Filter } from 'lucide-react'
import { mockCases } from '@/data/mock/cases'
import { fmtDate } from '@/lib'

export interface CasesListViewProps {
  onSelectCase: (caseId: string) => void
  onOpenWorkspace: () => void
}

export const CasesListView: React.FC<CasesListViewProps> = ({
  onSelectCase,
  onOpenWorkspace
}) => {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')

  const filteredCases = mockCases.filter(c => {
    if (search) {
      const q = search.toLowerCase()
      const matchName = c.name.toLowerCase().includes(q)
      const matchId = c.id.toLowerCase().includes(q)
      const matchDesc = c.description?.toLowerCase().includes(q)
      if (!matchName && !matchId && !matchDesc) return false
    }
    if (filterStatus !== 'ALL' && c.status !== filterStatus) return false
    return true
  })

  return (
    <div className="flex-1 p-6 bg-black flex flex-col gap-6 overflow-y-auto max-w-7xl mx-auto w-full text-white">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-white font-bold">
          <FileText size={14} />
          <span>ASSIGNED INVESTIGATIONS & ACTIVE FIR REGISTRY</span>
        </div>
        <h1 className="text-xl font-bold text-white mt-1">
          Assigned Criminal Inquiries & Formal Cases
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Active criminal investigations under Officer Vikramaditya Sen (INV-88201)
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="border border-neutral-800 bg-[#09090B] rounded p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3 top-2.5 text-neutral-500" size={14} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search FIR number, offence, or case title..."
            className="intel-input pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-neutral-400 font-mono text-[11px]">Status:</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="intel-select"
          >
            <option value="ALL">All Statuses ({mockCases.length})</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="UNDER_REVIEW">UNDER REVIEW</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map(cs => (
          <div
            key={cs.id}
            onClick={() => onSelectCase(cs.id)}
            className="rounded-2xl border border-indigo-500/20 hover:border-indigo-400/60 bg-gradient-to-br from-neutral-900/50 via-[#0a0f1d]/60 to-[#070b14]/70 hover:shadow-[0_8px_30px_-5px_rgba(99,102,241,0.25)] backdrop-blur-md p-5 cursor-pointer group flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
          >
            {/* Animated gradient top border highlight on hover */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/50 group-hover:via-indigo-400 group-hover:to-cyan-400 transition-all duration-500" />
            
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3.5">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)] group-hover:scale-110 transition-transform duration-300">
                    <FileText size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors duration-300">
                        {cs.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-neutral-950/80 border border-neutral-700 text-[10px] font-mono text-neutral-300">
                        {cs.id}
                      </span>
                      <span className={cs.status === 'ACTIVE' ? 'badge-high' : 'badge-med'}>
                        {cs.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 p-3.5 rounded-xl bg-black/40 border border-neutral-800/80 space-y-2.5 text-[11px] font-mono backdrop-blur-sm">
                <div className="flex items-center justify-between group-hover:text-neutral-200 transition-colors">
                  <span className="text-neutral-500">Station:</span>
                  <span className="text-neutral-300 flex items-center gap-1.5"><Shield size={12} className="text-indigo-400"/> {(cs as any).station || 'Northern Crime Division'}</span>
                </div>
                <div className="flex items-center justify-between group-hover:text-neutral-200 transition-colors">
                  <span className="text-neutral-500">Offence:</span>
                  <span className="text-neutral-300 font-semibold text-rose-300/80">{(cs as any).offence || 'Transit Manifest Breach'}</span>
                </div>
                <div className="flex items-center justify-between group-hover:text-neutral-200 transition-colors">
                  <span className="text-neutral-500">Filing:</span>
                  <span className="text-neutral-300 flex items-center gap-1.5"><Clock size={12} className="text-cyan-400"/> {cs.createdAt ? fmtDate(cs.createdAt) : '2026-07-22'}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 mt-4 leading-relaxed line-clamp-2 group-hover:text-neutral-300 transition-colors">
                {cs.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 group-hover:text-neutral-300">
              <div className="flex items-center gap-1.5 font-mono text-[10px] bg-neutral-900/80 px-2 py-1 rounded-lg border border-neutral-800">
                <Scale size={13} className="text-indigo-400" />
                <span>Metropolitan Court</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-[11px] bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors shadow-sm">
                <span>Launch Workspace</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
