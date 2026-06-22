'use client'

import { Shield, SlidersHorizontal } from 'lucide-react'
import { Wrapper } from '../../../components/wrapper'

const items = [
  {
    icon: Shield,
    index: '01',
    title: 'Your audio never leaves your device',
    description:
      'Transcription runs entirely on your machine. By default, nothing is uploaded, stored, or sent anywhere.',
  },
  {
    icon: SlidersHorizontal,
    index: '02',
    title: "You're in complete control",
    description:
      'Use your own API keys for optional AI cleanup. Enable it only when you want it. We never see or store your credentials.',
  },
]

export function PrivacySection() {
  return (
    <section
      id="privacy"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#0c0c0c] py-32 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
      </div>

      <Wrapper className="relative" maxWidth="60rem">
        <div className="mx-auto max-w-[560px] text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Privacy by design.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/40">
            No cloud required. No compromises made.
          </p>
        </div>

        <div className="mt-20">
          {items.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-t border-white/[0.06] py-10 sm:py-14 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,26rem)] lg:gap-x-12"
              >
                <span className="font-mono text-sm text-white/25 tabular-nums">
                  {item.index}
                </span>

                <h3 className="flex items-start gap-4 text-2xl leading-tight font-medium tracking-[-0.02em] text-white/90 sm:text-3xl">
                  <Icon
                    className="mt-1 size-6 shrink-0 text-white/40"
                    strokeWidth={1.5}
                  />
                  {item.title}
                </h3>

                <p className="col-start-2 mt-4 text-sm leading-relaxed text-white/40 sm:text-base lg:col-start-3 lg:mt-0">
                  {item.description}
                </p>
              </div>
            )
          })}
          <div className="border-t border-white/[0.06]" />
        </div>
      </Wrapper>
    </section>
  )
}
