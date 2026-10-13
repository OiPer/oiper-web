'use client'

import { NavigationLink } from '@/components/navigation-link'
import {
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
} from '@/features/landing-page/constants/links'
import { cn } from '@/lib/utils'
import type { PropsWithChildren, ReactNode } from 'react'

type AuthPageShellProps = PropsWithChildren<{
  aside?: ReactNode
  split?: boolean
}>

export function AuthPageShell({ children, aside, split }: AuthPageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between gap-8 bg-[#0a0a0a] px-4 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.06),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.04),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[120px_120px]" />
      </div>

      <div
        id="oiper-auth-content"
        className={cn(
          'relative mx-auto mt-16 flex w-full max-w-md justify-center sm:mt-24',
          aside && 'flex-col gap-4',
          aside &&
            split &&
            'max-w-4xl lg:grid lg:grid-cols-[1fr_28rem] lg:items-start lg:gap-12'
        )}
      >
        {aside}
        {children}
      </div>

      <div className="relative pb-5 text-center text-xs text-white/70">
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
