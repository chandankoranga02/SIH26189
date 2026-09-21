import React from 'react'
import { LocationObservation, AnyEntity } from '@/types'

export interface RelationshipDiscoveriesProps {
  locationObservations: LocationObservation[]
  entities: AnyEntity[]
  onSelectEntityPair?: (entityAId: string, entityBId: string) => void
}

export const RelationshipDiscoveries: React.FC<RelationshipDiscoveriesProps> = ({
  locationObservations,
  entities,
  onSelectEntityPair
}) => {
  return (
    <div className="space-y-2 text-xs">
      <div className="text-[11px] text-amber-300/80 bg-amber-400/5 p-2 rounded border border-amber-400/15">
        Disclaimer: Shared location observations indicate spatial overlap only and do not independently establish association.
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {locationObservations.flatMap(loc =>
          loc.overlaps.map((ov, oIdx) => {
            const entA = entities.find(e => e.id === ov.entityA)
            const entB = entities.find(e => e.id === ov.entityB)
            return (
              <div
                key={`${loc.id}-${oIdx}`}
                onClick={() => onSelectEntityPair?.(ov.entityA, ov.entityB)}
                className="intel-card p-2.5 flex items-center justify-between cursor-pointer hover:border-cyan-400/30 transition"
              >
                <div>
                  <div className="font-semibold text-white">
                    {entA?.name || ov.entityA} ↔ {entB?.name || ov.entityB}
                  </div>
                  <div className="text-[10px] text-slate-400">{loc.locationName}</div>
                </div>
                <span className="badge-med text-[10px]">{ov.overlapCount} overlaps</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
