'use client'

import { useEffect, useRef } from 'react'

interface Note {
  x: number
  y: number
  vx: number
  baseVy: number
  symbol: string
  size: number
  alpha: number
  processed: boolean
  phase: number
}

interface Word {
  x: number
  y: number
  vx: number
  vy: number
  text: string
  alpha: number
  life: number
  maxLife: number
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  life: number
  maxLife: number
}

const WORDS = [
  'hello',
  'voice',
  'text',
  'fast',
  'now',
  'go',
  'run',
  'speed',
  'instant',
  'local',
  'private',
  'clear',
  'done',
  'yes',
  'quick',
  'smooth',
  'sharp',
  'clean',
  'pure',
  'sound',
  'note',
  'write',
  'type',
  'flow',
  'beam',
  'light',
  'pulse',
  'wave',
  'track',
  'record',
  'Free Palestine',
]

const NOTES = ['\u2669', '\u266A', '\u266B', '\u266C']

export function PerformanceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return

    const section = canvas.parentElement!
    if (!section) return

    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    let animId: number
    const notes: Note[] = []
    const words: Word[] = []
    const sparks: Spark[] = []

    let w = 0
    let h = 0
    let beamX = 0
    let targetBeamX = 0
    let mouseActive = false

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!mouseActive) {
        beamX = w / 2
        targetBeamX = w / 2
      }
    }

    resize()
    window.addEventListener('resize', resize)

    function handleMouseMove(e: MouseEvent) {
      const rect = section.getBoundingClientRect()
      targetBeamX = e.clientX - rect.left
      mouseActive = true
    }

    function handleMouseLeave() {
      mouseActive = false
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)

    function inTextBlock(x: number, y: number, margin = 0) {
      const blockW = Math.min(520, w * 0.48)
      return (
        x > 0 - margin &&
        x < blockW + margin &&
        y > 70 - margin &&
        y < h - 140 + margin
      )
    }

    function inCardBlock(x: number, y: number, margin = 0) {
      const cx = w * 0.48
      const cw = w * 0.44
      return (
        x > cx - margin &&
        x < cx + cw + margin &&
        y > 100 - margin &&
        y < h - 200 + margin
      )
    }

    function spawnNote() {
      const y = 20 + Math.random() * (h - 40)
      if (inTextBlock(60, y, 60)) {
        if (Math.random() > 0.02) return
      }

      notes.push({
        x: -20,
        y,
        vx: 0.8 + Math.random() * 1.2,
        baseVy: (Math.random() - 0.5) * 0.2,
        symbol: NOTES[Math.floor(Math.random() * NOTES.length)],
        size: 12 + Math.random() * 10,
        alpha: 0,
        processed: false,
        phase: Math.random() * Math.PI * 2,
      })
    }

    function spawnWord(x: number, y: number) {
      const text = WORDS[Math.floor(Math.random() * WORDS.length)]
      let spawnY = y + (Math.random() - 0.5) * 20
      if (inCardBlock(x + 20, spawnY, 30)) {
        const cardCenterY = h / 2
        spawnY =
          spawnY < cardCenterY
            ? 80 + Math.random() * 20
            : h - 80 + Math.random() * 20
      }

      words.push({
        x: x + 8,
        y: spawnY,
        vx: 14 + Math.random() * 10,
        vy: (Math.random() - 0.5) * 0.6,
        text,
        alpha: 1,
        life: 0,
        maxLife: 70 + Math.random() * 50,
      })
    }

    function spawnSparks(x: number, y: number, count: number) {
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.2) * 5,
          vy: (Math.random() - 0.5) * 5,
          alpha: 0.7 + Math.random() * 0.3,
          life: 0,
          maxLife: 15 + Math.random() * 10,
        })
      }
    }

    function drawBeam(time: number) {
      const glowGrad = ctx.createLinearGradient(beamX - 80, 0, beamX + 80, 0)
      glowGrad.addColorStop(0, 'rgba(255,255,255,0)')
      glowGrad.addColorStop(0.2, 'rgba(255,255,255,0.015)')
      glowGrad.addColorStop(0.5, 'rgba(255,255,255,0.05)')
      glowGrad.addColorStop(0.8, 'rgba(255,255,255,0.015)')
      glowGrad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = glowGrad
      ctx.fillRect(beamX - 80, 0, 160, h)

      const coreAlpha = 0.08 + Math.sin(time * 2.5) * 0.03
      ctx.shadowBlur = 12
      ctx.shadowColor = `rgba(255,255,255,${coreAlpha + 0.03})`
      ctx.fillStyle = `rgba(255,255,255,${coreAlpha + 0.04})`
      ctx.fillRect(beamX - 2, 20, 4, h - 40)
      ctx.shadowBlur = 0

      for (let i = 0; i < 4; i++) {
        const ringAlpha = 0.02 + Math.sin(time * 3 + i * 1.5) * 0.01
        const ringW = 28 + Math.sin(time * 0.8 + i) * 14
        const ringY = 45 + i * ((h - 90) / 3)
        ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, ringAlpha)})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(beamX - ringW, ringY)
        ctx.lineTo(beamX + ringW, ringY)
        ctx.stroke()
      }
    }

    function draw() {
      const time = Date.now() * 0.001
      ctx.clearRect(0, 0, w, h)

      const destX = mouseActive ? targetBeamX : w / 2
      beamX += (destX - beamX) * 0.08

      drawBeam(time)

      for (let i = 0; i < 4; i++) {
        const gy = h * 0.15 + i * h * 0.23
        ctx.strokeStyle = `rgba(255,255,255,${0.02 + Math.sin(time * 0.6 + i) * 0.01})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        for (let px = 0; px < beamX - 20; px += 5) {
          const py = gy + Math.sin(px * 0.02 + time * 4 + i * 1.5) * 6
          if (px === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.stroke()
      }

      for (let idx = notes.length - 1; idx >= 0; idx--) {
        const note = notes[idx]
        const waveY = Math.sin(note.x * 0.015 + note.phase + time * 3) * 6
        note.y += note.baseVy
        const drawY = note.y + waveY

        if (!note.processed && note.x > beamX) {
          note.processed = true
          spawnWord(beamX, drawY)
          spawnSparks(beamX, drawY, 6)
          notes.splice(idx, 1)
          continue
        }

        note.x += note.vx

        if (note.x < 60) note.alpha = Math.min(note.alpha + 0.06, 0.45)
        else note.alpha = Math.min(note.alpha + 0.02, 0.5)

        const overText = inTextBlock(note.x, drawY, 6)
        const renderAlpha = overText ? note.alpha * 0.08 : note.alpha

        ctx.font = `${note.size}px serif`
        ctx.fillStyle = `rgba(255,255,255,${renderAlpha * 0.8})`
        ctx.fillText(note.symbol, note.x, drawY)

        if (note.x > beamX + 10 || note.alpha < 0.005) notes.splice(idx, 1)
      }

      for (let idx = words.length - 1; idx >= 0; idx--) {
        const word = words[idx]
        word.x += word.vx
        word.y += word.vy

        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(255,255,255,${word.alpha})`
        ctx.fillText(word.text, word.x, word.y)

        if (word.x > w + 50) words.splice(idx, 1)
      }

      for (let idx = sparks.length - 1; idx >= 0; idx--) {
        const s = sparks[idx]
        s.life++
        const lifeRatio = s.life / s.maxLife

        s.x += s.vx
        s.y += s.vy
        s.alpha = (1 - lifeRatio) * 0.9

        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2)
        ctx.fill()

        if (s.life > s.maxLife) sparks.splice(idx, 1)
      }

      if (Math.random() < 0.18) spawnNote()

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full opacity-25"
    />
  )
}
