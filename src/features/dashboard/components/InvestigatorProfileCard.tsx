import React from 'react'
import { Shield, Briefcase, FileCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export interface InvestigatorProfile {
  name: string
  officerId: string
  rank: string
  department: string
  clearanceLevel: string
  assignedCasesCount: number
  activeCasesCount: number
  pendingReviewsCount: number
  recentActivities: { time: string; action: string; id?: string }[]
}

export const DEFAULT_INVESTIGATOR: InvestigatorProfile = {
  name: 'Vikramaditya Sen',
  officerId: 'INV-88201',
  rank: 'Senior Inspector / Lead Investigator',
  department: 'Special Operations & Organised Crime Branch',
  clearanceLevel: 'LEVEL 4 / TOP SECRET',
  assignedCasesCount: 8,
  activeCasesCount: 8,
  pendingReviewsCount: 3,
  recentActivities: [
    { time: '17:45', action: 'Flagged midnight relay anomaly between P001 & P003', id: 'PAT-01' },
    { time: '16:20', action: 'Verified ANPR checkpoint match for vehicle VEH001', id: 'VEH001' },
    { time: '15:10', action: 'Added forensic Hawala statement to case dossier C004', id: 'C004' },
    { time: '14:02', action: 'Updated Betweenness Centrality index for 100 entities' }
  ]
}

export interface InvestigatorProfileCardProps {
  profile?: InvestigatorProfile
  className?: string
}

export const InvestigatorProfileCard: React.FC<InvestigatorProfileCardProps> = ({
  profile = DEFAULT_INVESTIGATOR,
  className = ''
}) => {
  return (
    <div className={`intel-panel p-4 flex flex-col justify-between space-y-4 ${className}`}>
      <div>
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-800 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              INVESTIGATOR PROFILE
            </span>
          </div>
          <span className="badge-accent text-[9px] font-mono">{profile.clearanceLevel}</span>
        </div>

        <div className="mt-3.5 flex items-start gap-3">
          <div className="h-12 w-12 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center text-white font-bold text-base shrink-0">
            <Shield size={22} className="text-white" />
          </div>
          <div className="truncate">
            <h2 className="text-sm font-bold text-white tracking-wide truncate">{profile.name}</h2>
            <div className="text-[11px] text-neutral-300 font-mono mt-0.5">{profile.officerId}</div>
            <div className="text-[10px] text-neutral-400 mt-0.5 truncate">{profile.rank}</div>
          </div>
        </div>

        <div className="mt-3 text-[10px] text-neutral-400 bg-neutral-950 p-2.5 rounded border border-neutral-800">
          <div className="text-neutral-500 uppercase tracking-wider text-[9px]">Assigned Department</div>
          <div className="text-neutral-200 font-medium mt-0.5">{profile.department}</div>
        </div>

        {/* Operational Stats */}
        <div className="grid grid-cols-2 gap-2 mt-3 text-center">
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
            <div className="text-[9px] uppercase font-bold text-neutral-400">ACTIVE CASES</div>
            <div className="text-xl font-black text-white mt-0.5">
              {String(profile.activeCasesCount).padStart(2, '0')}
            </div>
          </div>
          <div className="p-2 rounded bg-neutral-950 border border-neutral-800">
            <div className="text-[9px] uppercase font-bold text-neutral-400">PENDING REVIEWS</div>
            <div className="text-xl font-black text-neutral-400 mt-0.5">
              {String(profile.pendingReviewsCount).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border-t border-neutral-800 pt-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
          <Clock size={12} className="text-white" /> RECENT ACTIVITY
        </div>
        <div className="space-y-2">
          {profile.recentActivities.map((act, idx) => (
            <div key={idx} className="text-[11px] text-neutral-300 flex items-start gap-2">
              <span className="text-[9px] font-mono text-neutral-500 shrink-0 mt-0.5">{act.time}</span>
              <span className="leading-snug text-neutral-400">
                {act.action} {act.id && <span className="text-white font-mono">[{act.id}]</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
