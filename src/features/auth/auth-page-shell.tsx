'use client'

import { NavigationLink } from '@/components/navigation-link'
import {
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
} from '@/features/landing-page/constants/links'
import { cn } from '@/lib/utils'
import type { PropsWithChildren, ReactNode } from 'react'

const WAVE_BARS = [
  'h-3 [animation-delay:0ms]',
  'h-8 [animation-delay:140ms]',
  'h-12 [animation-delay:280ms]',
  'h-6 [animation-delay:420ms]',
  'h-16 [animation-delay:560ms]',
  'h-10 [animation-delay:700ms]',
  'h-4 [animation-delay:840ms]',
  'h-14 [animation-delay:980ms]',
  'h-8 [animation-delay:1120ms]',
  'h-11 [animation-delay:1260ms]',
  'h-5 [animation-delay:1400ms]',
  'h-9 [animation-delay:1540ms]',
]

function DictationPlaceholder() {
  return (
    <div
      aria-hidden
      className="flex w-full flex-col items-center gap-10 text-center"
    >
      <div className="flex h-16 items-center gap-1.5">
        {WAVE_BARS.map((bar) => (
          <span
            key={bar}
            className={cn('w-1.5 animate-pulse rounded-full bg-white/55', bar)}
          />
        ))}
      </div>

      <p className="text-2xl font-semibold tracking-tight text-white">
        Your voice turns into text.
        <span className="ml-1 inline-block h-5 w-[3px] animate-pulse bg-white/70 align-[-4px]" />
      </p>
    </div>
  )
}

type AuthPageShellProps = PropsWithChildren<{ aside?: ReactNode }>

export function AuthPageShell({ children, aside }: AuthPageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between gap-8 bg-[#0a0a0a] px-4 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.06),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.04),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[120px_120px]" />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 border-l border-white/10 bg-[#060606] bg-[radial-gradient(circle_at_60%_35%,rgba(255,255,255,0.05),transparent_55%)] lg:block" />
      </div>

      <div
        id="oiper-auth-content"
        className="relative mx-auto mt-16 grid w-full max-w-md grid-cols-1 sm:mt-24 lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:justify-items-center lg:gap-12"
      >
        {children}
        <div data-aside className="hidden min-w-0 lg:block">
          {aside ?? <DictationPlaceholder />}
        </div>
      </div>

      <div className="relative pb-5 text-center text-xs text-white/70 lg:w-1/2">
        <p id="oiper-auth-footer">
          By continuing, you agree to our{' '}
          <NavigationLink
            href={TERMS_OF_SERVICE_URL}
            location="auth"
            destination="terms_of_service"
            className="underline underline-offset-2"
          >
            Terms of Service
          </NavigationLink>{' '}
          and{' '}
          <NavigationLink
            href={PRIVACY_POLICY_URL}
            location="auth"
            destination="privacy_policy"
            className="underline underline-offset-2"
          >
            Privacy Policy
          </NavigationLink>
          .
        </p>
      </div>
    </div>
  )
}
