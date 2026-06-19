'use client'

import { OiPerLogoText } from '@/components/logo/logo-text'
import Image from 'next/image'
import { Wrapper } from '../../../components/wrapper'
import { ANCHOR_FEATURES, DOWNLOAD_URL, HOME } from '../constants/links'
import { AnimatedHeadline } from './animated-headline'
import { AuthNavActions } from './auth-nav-actions'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/6 bg-[#0a0a0a]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,255,255,0.05),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.015)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_70%)] bg-size-[120px_120px]" />

        <div className="absolute top-1/2 left-0 hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.045),transparent_60%)] blur-3xl lg:block" />
        <div className="absolute top-1/2 right-0 hidden h-[520px] w-[520px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.045),transparent_60%)] blur-3xl lg:block" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[min(64rem,calc(100%-(4%*2)))] -translate-x-1/2 md:block">
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />
        {[
          'left-0 top-[28%]',
          'right-0 top-[28%]',
          'left-0 top-[72%]',
          'right-0 top-[72%]',
        ].map((position) => (
          <div
            key={position}
            className={`absolute size-3 -translate-x-1/2 -translate-y-1/2 ${position}`}
          >
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/20" />
            <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/20" />
          </div>
        ))}
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
        <div className="mx-auto flex max-w-[760px] flex-col items-center justify-center pt-20 pb-16 text-center">
          <AnimatedHeadline />

          <p className="mt-7 max-w-[480px] text-lg leading-relaxed text-white/50">
            Hold a key, speak, and your words appear in any app. Instantly,
            privately, and fully offline.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
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
      </Wrapper>

      <Wrapper className="relative z-10 pb-24">
        <div className="relative mx-auto max-w-[1000px]">
          <Image
            src="/hero.png"
            alt="OiPer in action"
            width={2272}
            height={1504}
            priority
            className="-my-[5%] h-auto w-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>
      </Wrapper>
    </section>
  )
}
