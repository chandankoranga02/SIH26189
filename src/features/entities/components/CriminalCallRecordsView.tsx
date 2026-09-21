import React, { useState, useEffect } from 'react'
import {
  PhoneCall,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  FileText
} from 'lucide-react'
import { AnyEntity, CdrRecord } from '@/types'
import { entities } from '@/data'
import { fmtDate, fmtDuration } from '@/lib'

export interface CriminalCallRecordsViewProps {
  entity: AnyEntity
  activeCdrs: CdrRecord[]
  onSelectEntity?: (id: string) => void
}

export const CriminalCallRecordsView: React.FC<CriminalCallRecordsViewProps> = ({
  entity,
  activeCdrs,
  onSelectEntity
}) => {
  // CDRs involving this subject
  const subjectCdrs = activeCdrs.filter(c => c.caller === entity.id || c.receiver === entity.id)

  // Audio Playback simulation state
  const [playingCdrId, setPlayingCdrId] = useState<string | null>(null)
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0)
  const [isMuted, setIsMuted] = useState(false)

  // Handle Play/Pause simulation
  const handleTogglePlay = (cdrId: string) => {
    if (playingCdrId === cdrId) {
      setPlayingCdrId(null)
    } else {
      setPlayingCdrId(cdrId)
      setPlaybackSeconds(0)
    }
  }

  // Simulated audio progress timer
  useEffect(() => {
    if (!playingCdrId) return
    const interval = setInterval(() => {
      setPlaybackSeconds(sec => {
        if (sec >= 45) {
          setPlayingCdrId(null)
          return 0
        }
        return sec + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [playingCdrId])

  const activeCdr = subjectCdrs.find(c => c.id === playingCdrId) || subjectCdrs[0]

  return (
    <div className="space-y-4 text-xs">
      {/* Interactive Wiretap Audio Player Simulation Box */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-[#00629B] animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
              LEGAL WIRETAP & TELEPHONY INTERCEPT PLAYER
            </span>
          </div>
          <span className="badge-high text-[9px]">COURT ORDERED</span>
        </div>

        {/* Audio Waveform & Player Controls */}
        <div className="bg-black border border-neutral-800 rounded p-3 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => activeCdr && handleTogglePlay(activeCdr.id)}
                className="h-8 w-8 rounded bg-[#00629B] hover:bg-[#0077bd] text-white flex items-center justify-center transition"
                title={playingCdrId ? 'Pause playback' : 'Play intercept audio'}
              >
                {playingCdrId ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
              <div>
                <div className="font-bold text-white font-mono">
                  {playingCdrId ? `INTERCEPT: ${playingCdrId}` : activeCdr ? `TARGET: ${activeCdr.id}` : 'NO CDR LOADED'}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  Tower: {activeCdr?.tower || 'North Industrial Cell A-12'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#00629B] font-bold">
                00:{String(playbackSeconds).padStart(2, '0')} / 00:45
              </span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-neutral-400 hover:text-white"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="h-10 flex items-center justify-between gap-1 px-1 bg-neutral-950/60 rounded border border-neutral-900 overflow-hidden">
            {Array.from({ length: 36 }).map((_, i) => {
              const isPast = (i / 36) * 45 <= playbackSeconds
              const heightPct = playingCdrId
                ? Math.sin(i * 0.8 + playbackSeconds * 2) * 40 + 50
                : (i % 5 + 2) * 12

              return (
                <div
                  key={i}
                  className="w-1 rounded-full transition-all duration-150"
                  style={{
                    height: `${Math.max(15, Math.min(100, heightPct))}%`,
                    backgroundColor: isPast ? '#00629B' : '#262626'
                  }}
                />
              )
            })}
          </div>

          {/* Transcript Snippet */}
          <div className="p-2 rounded bg-neutral-950 border border-neutral-900 text-[11px] text-neutral-300 font-mono">
            <span className="text-[#00629B] font-bold block text-[10px] uppercase mb-0.5">
              Live Intercept Transcription:
            </span>
            <p className="italic text-neutral-300">
              "{playingCdrId ? '...confirming logistics delivery at the north bypass depot. Verify clearance with transport contractor before 22:00 hours...' : 'Select a call record below and press Play to stream wiretap recording.'}"
            </p>
          </div>
        </div>
      </div>

      {/* CDR Records Table / Feed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400">
          <span>CALL DETAIL RECORDS ({subjectCdrs.length} logged interactions)</span>
          <span>Tower Provenance</span>
        </div>

        {subjectCdrs.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 border border-neutral-800 bg-[#0a0a0a] rounded">
            No CDR records logged for this entity in the active filter range.
          </div>
        ) : (
          subjectCdrs.map(c => {
            const isCaller = c.caller === entity.id
            const peerId = isCaller ? c.receiver : c.caller
            const peer = entities.find(e => e.id === peerId)
            const isCurrentPlaying = playingCdrId === c.id

            return (
              <div
                key={c.id}
                className={`intel-card p-3 space-y-2 transition ${
                  isCurrentPlaying ? 'border-[#00629B] bg-[#00629B]/10' : 'hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white font-bold">{c.id}</span>
                    <span className="badge-neutral text-[9px] font-mono">{c.callType}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {isCaller ? 'OUTGOING →' : '← INCOMING'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <Clock size={11} className="text-neutral-500" />
                    <span className="text-neutral-300">{fmtDuration(c.durationSeconds)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <div>
                    <span className="text-neutral-500 text-[10px] block">Contact Subject:</span>
                    <span className="font-bold text-neutral-200">{peer?.name || peerId}</span>
                    <span className="text-neutral-500 font-mono text-[10px] ml-1">({peerId})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 text-[10px] block">Cell Tower:</span>
                    <span className="text-neutral-300 font-mono text-[10px]">{c.tower}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {fmtDate(c.timestamp)} {c.timestamp.slice(11, 16)}
                  </span>

                  <button
                    onClick={() => handleTogglePlay(c.id)}
                    className={`btn-ghost text-[10px] py-1 px-2 flex items-center gap-1 ${
                      isCurrentPlaying ? 'bg-[#00629B] text-white border-[#00629B]' : ''
                    }`}
                  >
                    {isCurrentPlaying ? <Pause size={10} /> : <Play size={10} />}
                    <span>{isCurrentPlaying ? 'Stop Audio' : 'Play Wiretap'}</span>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
