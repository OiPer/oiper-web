'use client'

import { BookOpen, Github, LifeBuoy, ShieldCheck } from 'lucide-react'
import { Wrapper } from '../../../components/wrapper'
import {
  ANCHOR_FEATURES,
  ANCHOR_LANGUAGES,
  ANCHOR_PERFORMANCE,
  ANCHOR_PRICING,
  ANCHOR_PRIVACY,
  DOWNLOAD_URL,
  GITHUB_REPO,
} from '../constants/links'

const productLinks = [
  { label: 'Features', href: ANCHOR_FEATURES },
  { label: 'Performance', href: ANCHOR_PERFORMANCE },
  { label: 'Privacy', href: ANCHOR_PRIVACY },
  { label: 'Languages', href: ANCHOR_LANGUAGES },
  { label: 'Pricing', href: ANCHOR_PRICING },
]

const resourceLinks = [
  { icon: BookOpen, label: 'Documentation', href: GITHUB_REPO },
  { icon: Github, label: 'GitHub', href: GITHUB_REPO },
  { icon: LifeBuoy, label: 'Support', href: GITHUB_REPO },
  { icon: ShieldCheck, label: 'Privacy', href: GITHUB_REPO },
]

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
      </div>

      <Wrapper className="relative pt-24 pb-12 sm:pt-32">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-100">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Ready to talk faster?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/40">
              Download OiPer and start transcribing privately in under a minute.
              No account required.
            </p>
            <a
              href={DOWNLOAD_URL}
              className="mt-10 inline-flex h-13 items-center justify-center rounded bg-white px-8 text-base font-medium text-[#0a0a0a] hover:bg-white/90"
            >
              Download OiPer
            </a>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <div>
              <p className="text-sm font-medium text-white/60">Product</p>
              <ul className="mt-6 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white/80"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">Resources</p>
              <ul className="mt-6 space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/80"
                    >
                      <link.icon className="size-4" strokeWidth={1.5} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-white/6 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://github.com/oiper.png"
              alt="OiPer"
              className="h-7 w-auto rounded-md"
            />
            <span className="text-sm text-white/25">
              Private speech transcription.
            </span>
          </div>
          <p className="text-sm text-white/25">© OiPer</p>
        </div>
      </Wrapper>
    </footer>
  )
}
