import React, { useMemo } from 'react'
import { Play, Pause } from 'lucide-react'
import { DateRange } from '@/types'
import { cdrRecords, evidenceRecords, timelineObservations } from '@/data'

export interface ActivityHeatmapTimelineProps {
  dateRange: DateRange
  onSelectDate: (dateStr: string) => void
  onPlayToggle: () => void
  isPlaying: boolean
  currentPlayDate: string | null
}

export const ActivityHeatmapTimeline: React.FC<ActivityHeatmapTimelineProps> = ({
  dateRange,
  onSelectDate,
  onPlayToggle,
  isPlaying,
  currentPlayDate
}) => {
  const dayStats = useMemo(() => {
    const map: Record<string, { date: string; cdr: number; ev: number; tl: number; total: number }> = {}
    const dates: string[] = []
    let d = new Date('2026-08-01')
    const end = new Date('2026-09-15')
    while (d <= end) {
      const ds = d.toISOString().slice(0, 10)
      dates.push(ds)
      map[ds] = { date: ds, cdr: 0, ev: 0, tl: 0, total: 0 }
      d.setDate(d.getDate() + 1)
    }
    cdrRecords.forEach(c => {
      const dt = c.timestamp.slice(0, 10)
      if (map[dt]) {
        map[dt].cdr += 1
        map[dt].total += 1
      }
    })
    evidenceRecords.forEach((ev: any) => {
      const dt = ev.dateCollected || ev.date
      if (dt && map[dt]) {
        map[dt].ev += 1
        map[dt].total += 2
      }
    })
    timelineObservations.forEach(tl => {
      if (map[tl.date]) {
        map[tl.date].tl += 1
        map[tl.date].total += 2
      }
    })
    const maxVal = Math.max(...Object.values(map).map(x => x.total), 1)
    return dates.map(ds => ({ ...map[ds], intensity: map[ds].total / maxVal }))
  }, [])

  return (
    <div className="border-t border-neutral-800 bg-[#09090B] px-3 py-1.5 flex items-center gap-3 text-xs select-none">
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onPlayToggle}
          title={isPlaying ? 'Pause Timeline Investigation' : 'Play Day-by-Day Timeline Simulation'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold transition shadow-sm ${
            isPlaying
              ? 'bg-neutral-800 text-black animate-pulse font-black'
              : 'bg-white/5 text-white hover:bg-[#0077bd] border border-[#0077bd]/50'
          }`}
        >
          {isPlaying ? <Pause size={11} /> : <Play size={11} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY SIM'}</span>
        </button>
        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 hidden xl:inline">
          Activity Heatmap:
        </span>
      </div>

      <div className="flex-1 flex items-end gap-1 h-7 overflow-x-auto pb-0.5">
        {dayStats.map(ds => {
          const isCurrent = currentPlayDate === ds.date
          const isSelected =
            (!dateRange?.from || dateRange.from <= ds.date) &&
            (!dateRange?.to || ds.date <= dateRange.to)
          const bg =
            ds.total === 0
              ? 'rgba(255,255,255,0.06)'
              : ds.intensity > 0.6
              ? '#f43f5e'
              : ds.intensity > 0.3
              ? '#a855f7'
              : '#38bdf8'
          const h = Math.max(5, Math.round(ds.intensity * 24))
          return (
            <div
              key={ds.date}
              onClick={() => onSelectDate(ds.date)}
              title={`${ds.date}: ${ds.total} signals (${ds.cdr} CDRs, ${ds.ev} Evidence)`}
              className={`flex-1 min-w-[7px] max-w-[14px] rounded-t cursor-pointer transition-all hover:scale-y-125 ${
                isCurrent ? 'ring-2 ring-amber-300 scale-y-125 z-10 brightness-150' : ''
              } ${isSelected ? 'opacity-100' : 'opacity-25'}`}
              style={{ height: `${h}px`, backgroundColor: bg }}
            />
          )
        })}
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {currentPlayDate ? (
          <div className="text-[10px] font-mono text-neutral-400 font-bold bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700 animate-pulse">
            {currentPlayDate}
          </div>
        ) : (
          <div className="text-[10px] text-slate-400 hidden sm:inline">Aug 01 – Sep 15</div>
        )}
      </div>
    </div>
  )
}
