import React, { useRef, useEffect } from 'react'

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  glowColor: string
  pulse: number
  pulseSpeed: number
}

const COLOR_PALETTE = [
  // White
  { color: 'rgba(255, 255, 255, ', glow: 'rgba(255, 255, 255, 0.8)' },
  // Pink
  { color: 'rgba(244, 114, 182, ', glow: 'rgba(244, 114, 182, 0.8)' },
  // Blue
  { color: 'rgba(56, 189, 248, ', glow: 'rgba(56, 189, 248, 0.8)' },
  // Green
  { color: 'rgba(52, 211, 153, ', glow: 'rgba(52, 211, 153, 0.8)' }
]

export const MovingDotsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', handleResize)

    // Generate random moving dots with white, pink, blue, green colors
    const dotCount = Math.min(85, Math.max(45, Math.floor((width * height) / 14000)))
    const dots: Dot[] = Array.from({ length: dotCount }, () => {
      const paletteItem = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1.2,
        color: paletteItem.color,
        glowColor: paletteItem.glow,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02
      }
    })

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw connecting lines between nearby dots of same or complementary hue
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90) {
            const alpha = 0.14 * (1 - dist / 90)
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(160, 180, 220, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // 2. Render each glowing dot
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        // Update position
        dot.x += dot.vx
        dot.y += dot.vy
        dot.pulse += dot.pulseSpeed

        // Soft bounce at canvas boundaries
        if (dot.x < 0) {
          dot.x = 0
          dot.vx *= -1
        } else if (dot.x > width) {
          dot.x = width
          dot.vx *= -1
        }

        if (dot.y < 0) {
          dot.y = 0
          dot.vy *= -1
        } else if (dot.y > height) {
          dot.y = height
          dot.vy *= -1
        }

        const currentAlpha = 0.5 + 0.35 * Math.sin(dot.pulse)
        const currentRadius = dot.radius * (0.9 + 0.2 * Math.sin(dot.pulse))

        ctx.save()
        ctx.shadowColor = dot.glowColor
        ctx.shadowBlur = 9

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = `${dot.color}${currentAlpha})`
        ctx.fill()
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  )
}
