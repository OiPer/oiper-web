'use client'

import { NavigationLink } from '@/components/navigation-link'
import {
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
} from '@/features/landing-page/constants/links'
import type { PropsWithChildren, ReactNode } from 'react'

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
          className="hidden w-1/2 flex-col items-center justify-center overflow-hidden border-l border-white/10 bg-[#060606] bg-[radial-gradient(circle_at_30%_25%,rgba(139,92,246,0.09),transparent_50%),radial-gradient(circle_at_70%_75%,rgba(34,211,238,0.07),transparent_50%)] lg:flex"
        >
          {aside}
        </div>
      </div>
    </div>
  )
}
