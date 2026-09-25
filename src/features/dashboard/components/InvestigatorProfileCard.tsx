import React from 'react'
import { Clock, MapPin, BadgeCheck, Briefcase, TrendingUp, Star } from 'lucide-react'

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
    <div
      className={`rounded-2xl border border-indigo-500/25 bg-gradient-to-b from-indigo-950/40 via-[#0b0e1b]/95 to-[#070912]/98 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(99,102,241,0.08)] flex flex-col ${className}`}
    >
      {/* ── Photo Hero Section ── */}
      <div className="relative flex flex-col items-center pt-6 pb-4 px-5">
        {/* Online status badge – floating top-right */}
        <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] font-mono text-emerald-300/90">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
          ONLINE
        </div>

        {/* Avatar Photo */}
        <div className="relative">
          <div className="h-24 w-24 rounded-full p-[3px] bg-gradient-to-br from-indigo-400 via-purple-400 to-cyan-400 shadow-[0_0_25px_rgba(129,140,248,0.4)]">
            <img
              src="/investigator-avatar.jpg"
              alt={profile.name}
              className="h-full w-full rounded-full object-cover border-2 border-[#0b0e1b]"
            />
          </div>
          {/* Verified badge overlay */}
          <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#0b0e1b] border-2 border-indigo-400/60 flex items-center justify-center shadow-lg">
            <BadgeCheck size={16} className="text-indigo-400" />
          </div>
        </div>

        {/* Name & Rank */}
        <h2 className="mt-3 text-base font-bold text-white tracking-wide text-center">
          {profile.name}
        </h2>
        <div className="text-[11px] text-indigo-300 font-mono mt-0.5">
          {profile.officerId}
        </div>
        <div className="text-[10px] text-neutral-400 mt-1 text-center leading-relaxed max-w-[250px]">
          {profile.rank}
        </div>

        {/* Rating / Trust Score */}
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              size={12}
              className={i <= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}
            />
          ))}
          <span className="text-[10px] text-amber-300/80 font-mono ml-1">4.8</span>
        </div>
      </div>

      {/* ── Info Details ── */}
      <div className="px-5 pb-4 flex flex-col gap-3">
        {/* Department */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
          <Briefcase size={14} className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-indigo-300/60 uppercase tracking-wider text-[9px] font-semibold">Department</div>
            <div className="text-neutral-200 text-[11px] font-medium mt-0.5">{profile.department}</div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
          <MapPin size={14} className="text-pink-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-pink-300/60 uppercase tracking-wider text-[9px] font-semibold">Station</div>
            <div className="text-neutral-200 text-[11px] font-medium mt-0.5">Mumbai HQ, Colaba Division</div>
          </div>
        </div>

        {/* Clearance */}
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
          <BadgeCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-emerald-300/60 uppercase tracking-wider text-[9px] font-semibold">Clearance</div>
            <div className="text-neutral-200 text-[11px] font-medium mt-0.5">{profile.clearanceLevel}</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-1">
          <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-center">
            <div className="text-lg font-black text-cyan-400 font-mono leading-none">
              {String(profile.activeCasesCount).padStart(2, '0')}
            </div>
            <div className="text-[8px] uppercase font-bold text-cyan-300/70 tracking-wider mt-1">Active</div>
          </div>
          <div className="p-2.5 rounded-xl bg-pink-950/30 border border-pink-500/20 text-center">
            <div className="text-lg font-black text-pink-400 font-mono leading-none">
              {String(profile.pendingReviewsCount).padStart(2, '0')}
            </div>
            <div className="text-[8px] uppercase font-bold text-pink-300/70 tracking-wider mt-1">Pending</div>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-center">
            <div className="text-lg font-black text-amber-400 font-mono leading-none">
              97<span className="text-xs">%</span>
            </div>
            <div className="text-[8px] uppercase font-bold text-amber-300/70 tracking-wider mt-1">Resolve</div>
          </div>
        </div>
      </div>

      {/* ── Recent Activity Feed ── */}
      <div className="border-t border-indigo-500/15 px-5 pt-3 pb-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 mb-2.5 flex items-center gap-1.5">
          <Clock size={12} className="text-indigo-400" /> Recent Activity
        </div>
        <div className="space-y-1.5">
          {profile.recentActivities.map((act, idx) => (
            <div key={idx} className="flex items-start gap-2 p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px]">
              <span className="text-[9px] font-mono text-cyan-400 font-semibold shrink-0 mt-0.5 px-1.5 py-px rounded bg-cyan-950/50 border border-cyan-500/20">
                {act.time}
              </span>
              <span className="leading-snug text-neutral-400">
                {act.action} {act.id && <span className="text-indigo-300 font-mono font-medium">[{act.id}]</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Card Footer with Performance ── */}
      <div className="border-t border-white/5 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-300/70">
          <TrendingUp size={12} />
          <span className="font-mono font-medium">+12% efficiency this month</span>
        </div>
      </div>
    </div>
  )
}

