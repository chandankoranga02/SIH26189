import React from 'react'
import {
  ActivityHeatmapTimeline,
  ActivityHeatmapTimelineProps
} from '@/features/timeline/components/ActivityHeatmapTimeline'

export const TemporalActivity: React.FC<ActivityHeatmapTimelineProps> = props => {
  return <ActivityHeatmapTimeline {...props} />
}
