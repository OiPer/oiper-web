'use client'

import { Button } from '@/components/ui/button'

import { logClick } from '@/lib/analytics'
import { Github, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import type { PropsWithChildren, ReactNode } from 'react'
import {
  buildAuthUrl,
  buildWebAuthStartUrl,
  getCallbackUrl,
} from './auth-form-utils'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
      <path
        d="M21.805 10.023H12.24v3.955h5.484c-.236 1.273-.957 2.353-2.034 3.077v2.557h3.295c1.928-1.776 3.04-4.393 3.04-7.497 0-.689-.062-1.35-.22-2.092h0z"
        fill="currentColor"
      />
      <path
        d="M12.24 22c2.748 0 5.056-.904 6.741-2.448l-3.295-2.557c-.916.61-2.087.974-3.446.974-2.647 0-4.89-1.786-5.693-4.188H3.15v2.638A10.192 10.192 0 0 0 12.24 22z"
        fill="currentColor"
      />
      <path
        d="M6.547 13.78a6.123 6.123 0 0 1 0-3.561V7.58H3.15a10.185 10.185 0 0 0 0 9.84l3.397-2.639z"
        fill="currentColor"
      />
      <path
        d="M12.24 6.03c1.495 0 2.834.513 3.89 1.524l2.909-2.909C17.292 2.964 14.984 2 12.24 2A10.192 10.192 0 0 0 3.15 7.58l3.397 2.639c.804-2.407 3.047-4.189 5.693-4.189z"
        fill="currentColor"
      />
    </svg>
  )
}

const PAGE_SWITCH = {
  signin: 'signup',
  signup: 'signin',
  'forgot-password': 'signin',
} as const

const PAGE_FOOTER = {
  signin: { text: "Don't have an account?", linkLabel: 'Sign up' },
  signup: { text: 'Already have an account?', linkLabel: 'Sign in' },
  'forgot-password': { text: 'Remember your password?', linkLabel: 'Sign in' },
} as const

type AuthPageName = keyof typeof PAGE_SWITCH

type AuthCardProps = PropsWithChildren<{
  page: AuthPageName
  title: string
  description: string
  showOAuth?: boolean
  checkout?: ReactNode
}>

export function AuthCard({
  page,
  title,
  description,
  children,
  showOAuth = true,
  checkout,
}: AuthCardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const footer = PAGE_FOOTER[page]
  const nextPage = PAGE_SWITCH[page]
  const callbackUrl = getCallbackUrl(searchParams)

  const switchHref = buildAuthUrl(nextPage, {
    callbackUrl: searchParams.get('callbackUrl'),
    email: searchParams.get('email'),
  })

  const googleAuthHref = buildWebAuthStartUrl(callbackUrl, 'google')
  const githubAuthHref = buildWebAuthStartUrl(callbackUrl, 'github')

  return (
    <div className="relative w-full max-w-md text-white">
      <div className="space-y-1.5">
        <h1 className="text-lg leading-none font-bold text-white">{title}</h1>
        <p className="text-sm text-white/65">{description}</p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 text-white/60 hover:bg-white/10 hover:text-white"
        onClick={() => router.push(callbackUrl)}
      >
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </Button>

      <div className="mt-6 space-y-5">
        {checkout ? <div>{checkout}</div> : null}
        {children}

        {showOAuth ? (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/15" />
              </div>
              <div className="relative flex justify-center text-sm text-white/45">
                <span className="bg-[#0a0a0a] px-3">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={googleAuthHref}
                onClick={() =>
                  logClick('oauth', 'auth', { provider: 'google' })
                }
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
              >
                <GoogleIcon />
                Google
              </a>

              <a
                href={githubAuthHref}
                onClick={() =>
                  logClick('oauth', 'auth', { provider: 'github' })
                }
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
              >
                <Github className="size-4" />
                GitHub
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <p className="mt-6 w-full text-center text-sm text-white/65">
        {footer.text}{' '}
        <Link
          href={switchHref}
          className="font-medium text-white underline underline-offset-4"
          onClick={() => logClick(nextPage, 'auth')}
        >
          {footer.linkLabel}
        </Link>
      </p>
    </div>
  )
}
