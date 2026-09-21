import React, { useState, useEffect } from 'react'
import { LucideIcon } from 'lucide-react'

export function useCountUp(target: number | string, duration = 850): number {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const end = typeof target === 'number' ? target : parseInt(target, 10) || 0
    const startTime = performance.now()
    let handle: number
    const frame = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const current = Math.floor(progress * end)
      setVal(current)
      if (progress < 1) {
        handle = requestAnimationFrame(frame)
      } else {
        setVal(end)
      }
    }
    handle = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(handle)
  }, [target, duration])
  return val
}

export interface KpiItemProps {
  label: string
  value: number | string
  hint?: string
  icon: LucideIcon
  color?: string
}

export const KpiItem: React.FC<KpiItemProps> = ({
  label,
  value,
  hint,
  icon: Icon,
  color = '#38bdf8'
}) => {
  const animatedValue = useCountUp(value, 800)

  return (
    <div className="rounded-xl border border-white/10 bg-[#071322] p-2.5 flex flex-col justify-between transition hover:border-white/20">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
          {label}
        </span>
        <div
          className="rounded p-1 text-slate-950"
          style={{ backgroundColor: color }}
        >
          <Icon size={12} />
        </div>
      </div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-xl font-black tracking-tight text-white">
          {animatedValue}
        </span>
        {hint && <span className="text-[10px] text-slate-500 truncate">{hint}</span>}
      </div>
    </div>
  )
}
