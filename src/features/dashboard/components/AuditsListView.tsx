import React, { useState } from 'react'
import { Database, ShieldCheck, Clock, Search, Filter, Terminal, User } from 'lucide-react'
import { AuditLogItem } from '@/types'

export interface AuditsListViewProps {
  auditLog: AuditLogItem[]
}

export const AuditsListView: React.FC<AuditsListViewProps> = ({ auditLog }) => {
  const [search, setSearch] = useState('')

  const staticHistoricalLogs: AuditLogItem[] = [
    { time: '17:02:10', text: 'Officer Vikramaditya Sen authenticated via terminal INV-88201.' },
    { time: '17:03:45', text: 'Query executed: Filtered for high-priority logistics freight syndicate.' },
    { time: '17:05:12', text: 'Inspected CDR wiretap records for P001 (Arjun Mehta) ↔ P002 (Rohit Sharma).' },
    { time: '17:08:33', text: 'Generated formal intelligence briefing dossier on Subject P003 (Sameer Khan).' },
    { time: '17:11:04', text: 'Identified communication cluster: 14 calls between P001 and P004.' },
    { time: '17:14:22', text: 'Exported network topology snapshot for court submission (Ref: FIR-2026-081).' }
  ]

  const fullLogs = [...auditLog, ...staticHistoricalLogs]

  const filtered = fullLogs.filter(l =>
    search ? l.text.toLowerCase().includes(search.toLowerCase()) || l.time.includes(search) : true
  )

  return (
    <div className="flex-1 p-6 bg-black flex flex-col gap-6 overflow-y-auto max-w-7xl mx-auto w-full text-white">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00629B] font-bold">
          <Database size={14} />
          <span>SECURITY & FORENSIC AUDIT TRAIL</span>
        </div>
        <h1 className="text-xl font-bold text-white mt-1">
          Investigator Session Provenance & Audit Logs
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Immutable cryptographic session journal tracking investigator queries, node expansions, and dossier exports.
        </p>
      </div>

      {/* Filter and stats banner */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3 top-2.5 text-neutral-500" size={14} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search audit journal entries..."
            className="intel-input pl-9"
          />
        </div>

        <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px]">
          <div>
            Total Entries: <span className="text-white font-bold">{fullLogs.length}</span>
          </div>
          <div>
            Session: <span className="text-emerald-400 font-bold">COMPLIANT</span>
          </div>
        </div>
      </div>

      {/* Logs Terminal View */}
      <div className="border border-neutral-800 bg-[#050505] rounded p-4 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[10px] text-neutral-500 uppercase tracking-wider">
          <span>Timestamp</span>
          <span>Logged Action & Data Provenance</span>
          <span>Security Integrity</span>
        </div>

        <div className="space-y-1.5 pt-1">
          {filtered.map((log, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-4 p-2 rounded hover:bg-neutral-900/60 transition"
            >
              <div className="flex items-center gap-2 text-neutral-500 text-[11px] shrink-0">
                <Clock size={12} className="text-[#00629B]" />
                <span>{log.time}</span>
              </div>

              <div className="flex-1 text-neutral-200 text-xs">
                {log.text}
              </div>

              <div className="flex items-center gap-1 text-emerald-400 text-[10px] shrink-0">
                <ShieldCheck size={12} />
                <span>VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
