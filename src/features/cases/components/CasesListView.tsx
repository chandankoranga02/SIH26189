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
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00629B] font-bold">
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
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
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
            className="intel-card p-4 space-y-3 cursor-pointer hover:border-[#00629B] transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-white font-bold text-sm group-hover:text-[#00629B] transition">
                    {cs.name}
                  </span>
                  <span className="badge-neutral text-[10px] font-mono">{cs.id}</span>
                </div>
                <span className={cs.status === 'ACTIVE' ? 'badge-high' : 'badge-med'}>
                  {cs.status}
                </span>
              </div>

              <div className="mt-2.5 p-2 rounded bg-black border border-neutral-900 space-y-1 text-[11px] font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Station:</span>
                  <span className="text-neutral-300">{(cs as any).station || 'Northern Crime Division'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Offence:</span>
                  <span className="text-rose-400 font-bold">{(cs as any).offence || 'Transit Manifest Breach'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Filing:</span>
                  <span className="text-neutral-300">{cs.createdAt ? fmtDate(cs.createdAt) : '2026-07-22'}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">
                {cs.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500 group-hover:text-neutral-300">
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <Scale size={13} className="text-[#00629B]" />
                <span>Court: Metropolitan Session Court</span>
              </div>
              <div className="flex items-center gap-1 text-[#00629B] font-semibold text-[11px]">
                <span>Launch in Graph</span>
                <ChevronRight size={13} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
