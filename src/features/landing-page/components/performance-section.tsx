'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Wrapper } from '../../../components/wrapper'
import { PerformanceCanvas } from './performance-canvas'

const benchmarks = [
  { name: 'OiPer (Local)', value: '1x', score: 100, highlight: true },
  { name: 'Whisper.cpp (GPU)', value: '1.49x slower', score: 67 },
  { name: 'Whisper.cpp (CPU)', value: '1.87x slower', score: 53 },
  { name: 'Cloud API (Major API)', value: '3.46x slower', score: 29 },
]

const highlights = [
  'Very low latency. Sub-second response on modern hardware.',
  'GPU acceleration. CUDA support where available.',
  'Efficient resource usage. Optimized for minimal CPU impact.',
]

export function PerformanceSection() {
  return (
    <section
      id="performance"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#0a0a0a] py-32 sm:py-40"
    >
      <PerformanceCanvas />

      <Wrapper className="relative">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-[3.25rem]">
              Speed that feels instant.
            </h2>
            <p className="mt-5 max-w-110 text-base leading-relaxed text-white/40">
              Local processing means no network round-trips. OiPer transcribes
              up to 3.5x faster than cloud APIs, entirely on your device.
            </p>

            <div className="mt-10 grid gap-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-white/30"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm leading-relaxed text-white/50">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative self-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

            <p className="text-[10px] font-medium tracking-widest text-white/25 uppercase">
              Benchmark / 30s English Audio
            </p>

            <div className="mt-5">
              {benchmarks.map((b, i) => {
                const isWinner = b.highlight
                return (
                  <div
                    key={b.name}
                    className={`py-3 ${i !== benchmarks.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={
                          isWinner
                            ? 'text-sm font-medium text-white/70'
                            : 'text-sm text-white/40'
                        }
                      >
                        {b.name}
                      </span>
                      <span
                        className={
                          isWinner
                            ? 'text-xs text-white/50 tabular-nums'
                            : 'text-xs text-white/25 tabular-nums'
                        }
                      >
                        {isWinner ? (
                          <span className="flex items-center gap-2">
                            {b.value}
                            <span className="rounded border border-white/[0.1] bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-white/40 uppercase">
                              Baseline
                            </span>
                          </span>
                        ) : (
                          b.value
                        )}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                      <motion.div
                        className="h-full rounded-full bg-white/30"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${b.score}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          ease: 'easeOut',
                        }}
                        style={{ opacity: isWinner ? 1 : 0.4 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
