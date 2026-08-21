'use client'

import { Database, Download, Keyboard, Type, Wand2, Zap } from 'lucide-react'
import { Wrapper } from '../../../components/wrapper'

const features = [
  {
    icon: Keyboard,
    title: 'Global Hotkey Recording',
    description: 'Start recording anywhere, in any application.',
  },
  {
    icon: Type,
    title: 'Instant Text Injection',
    description: "Text appears instantly in the app you're using.",
  },
  {
    icon: Download,
    title: 'Local Transcription',
    description: 'Speech never leaves your device. Ever.',
  },
  {
    icon: Wand2,
    title: 'Optional AI Text Cleanup',
    description:
      'Improve grammar, fix typos, or refine tone—entirely optional.',
  },
  {
    icon: Database,
    title: 'Flexible Models & Backends',
    description: 'Choose CPU, CUDA, or available cloud models.',
  },
  {
    icon: Zap,
    title: 'Native Performance',
    description: 'Optimized for low latency, efficient resource usage.',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative border-b border-white/6 bg-[#0c0c0c] py-32 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 h-150 w-225 -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)]" />
      </div>

      <Wrapper className="relative" maxWidth="68rem">
        <div className="mx-auto max-w-140 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Everything you need.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/40">
            OiPer is minimal, private, and built for speed. Every feature serves
            a purpose and gets out of your way.
          </p>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-7 sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
              <div className="flex size-11 items-center justify-center rounded-xl border border-white/8 bg-white/3">
                <feature.icon
                  className="size-5 text-white/50"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mt-6 text-base font-medium text-white/90">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/35">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
