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
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.06),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.04),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[120px_120px]" />
      </div>

      <div
        id="oiper-auth-content"
        className="relative flex flex-1 [--auth-top:2.5rem] sm:[--auth-top:6rem]"
      >
        <div className="flex w-full flex-col items-center px-4 pt-[var(--auth-top)] pb-5 lg:w-1/2 lg:px-10">
          {children}

          <div className="mt-auto w-full pt-8 text-center text-xs text-white/70">
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

        <div
          data-aside
          className="hidden w-1/2 flex-col items-center border-l border-white/10 bg-[#060606] bg-[radial-gradient(circle_at_60%_35%,rgba(255,255,255,0.05),transparent_55%)] pt-[var(--auth-top)] lg:flex"
        >
          {aside ?? <DictationPlaceholder />}
        </div>
      </div>
    </div>
  )
}
