import React from 'react'
import { NetworkCluster } from '@/types'

export interface NetworkIntelligenceProps {
  clusters: NetworkCluster[]
  onSelectCluster: (cluster: NetworkCluster) => void
}

export const NetworkIntelligence: React.FC<NetworkIntelligenceProps> = ({
  clusters,
  onSelectCluster
}) => {
  return (
    <div className="grid sm:grid-cols-3 gap-3 text-xs">
      {clusters.map(cls => (
        <button
          key={cls.id}
          onClick={() => onSelectCluster(cls)}
          className="intel-card p-3 text-left hover:border-cyan-400/30 transition"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-300">{cls.id}</span>
            <span className="badge-neutral text-[10px]">{cls.entityCount} Entities</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            {cls.relationshipCount} Internal Relationships
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Types: {cls.primaryTypes.join(', ')}
          </div>
        </button>
      ))}
    </div>
  )
}
