'use client'

import { OiPerLogoText } from '@/components/logo/logo-text'
import { Mic, Settings } from 'lucide-react'
import { Wrapper } from '../../../components/wrapper'
import { ANCHOR_FEATURES, DOWNLOAD_URL, HOME } from '../constants/links'
import { AnimatedWaveform } from './animated-waveform'
import { AuthNavActions } from './auth-nav-actions'
import { LightningBase } from './lightning-base'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/6 bg-[#0a0a0a]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(255,255,255,0.03),transparent_40%),radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.02),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[120px_120px]" />
        <LightningBase />
      </div>

      <Wrapper className="relative z-10">
        <nav className="flex h-[80px] items-center justify-between">
          <a href={HOME} className="flex items-center gap-3">
            <OiPerLogoText className="text-[2rem]" />
          </a>

          <AuthNavActions />
        </nav>
      </Wrapper>

      <Wrapper className="relative z-10">
        <div className="grid min-h-[min(100vh,56rem)] items-center gap-16 pt-20 pb-36 lg:grid-cols-[0.5fr_0.5fr] lg:pt-16">
          <div>
            <h1 className="max-w-[520px] text-[3.5rem] leading-[1.05] font-semibold tracking-[-0.04em] text-white sm:text-[4.5rem]">
              Voice to Text.
              <span className="block">Instantly.</span>
              <span className="block text-white/50">Privately.</span>
            </h1>
            <p className="mt-8 max-w-[440px] text-lg leading-relaxed text-white/50">
              Hold a hotkey, speak, and release — your words appear instantly in
              any app, offline.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={DOWNLOAD_URL}
                className="inline-flex h-[52px] items-center justify-center rounded bg-white px-8 text-base font-medium text-[#0a0a0a] hover:bg-white/90"
              >
                Download OiPer
              </a>
              <a
                href={ANCHOR_FEATURES}
                className="inline-flex h-[52px] items-center justify-center rounded border border-white/15 px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/5"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#111111]">
              <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
                <div className="flex gap-2">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                </div>
                <Settings className="size-4 text-white/30" />
              </div>
              <div className="px-6 py-10 sm:px-8 sm:py-20">
                <div className="min-h-[180px] text-xl leading-relaxed tracking-[-0.02em] text-white/80 sm:text-2xl">
                  <p>Meeting notes from today.</p>
                  <p>We&apos;ll launch the new feature next week</p>
                  <p>and focus on performance</p>
                  <p>
                    improvements.
                    <span className="ml-1 inline-block h-6 w-px animate-pulse bg-white/50" />
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t border-white/6 bg-[#0c0c0c] px-5 py-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-white/6">
                  <Mic className="size-5 text-white/80" />
                </div>
                <AnimatedWaveform />
                <p className="w-16 text-right text-sm font-medium text-white/70">
                  00:18
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
