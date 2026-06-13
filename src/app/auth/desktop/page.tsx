'use client'

import { Spinner } from '@/components/ui/spinner'
import {
  buildDesktopAuthContinueUrl,
  getWebSession,
  isAbortError,
} from '@/lib/auth-api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type DesktopAuthPageState = {
  status: 'loading' | 'redirecting_sign_in' | 'continuing' | 'error'
  message?: string
}

export default function DesktopAuthPage() {
  const router = useRouter()
  const params = useSearchParams()
  const requestId = params.get('request_id')
  const queryString = params.toString()

  const [state, setState] = useState<DesktopAuthPageState>({
    status: 'loading',
  })

  const signInUrl = useMemo(() => {
    const callbackUrl = queryString
      ? `/auth/desktop?${queryString}`
      : '/auth/desktop'
    const encoded = encodeURIComponent(callbackUrl)
    return `/auth/signin?callbackUrl=${encoded}`
  }, [queryString])

  useEffect(() => {
    if (!requestId) return router.replace('/')

    const abortController = new AbortController()
    getWebSession({ signal: abortController.signal })
      .then((session) => {
        if (!session.authenticated) {
          setState({ status: 'redirecting_sign_in' })
          return window.location.replace(signInUrl)
        }

        setState({ status: 'continuing' })
        return window.location.replace(
          buildDesktopAuthContinueUrl({ requestId, callbackUrl: '/' })
        )
      })
      .catch((error) => {
        if (isAbortError(error)) return
        setState({
          status: 'error',
          message: error?.message ?? 'Failed to verify web session',
        })
      })

    return () => abortController.abort()
  }, [requestId, router, signInUrl])

  if (!requestId) return null

  function renderStateContent() {
    switch (state.status) {
      case 'loading':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <Spinner className="size-8 text-white/80" />
          </div>
        )

      case 'continuing':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <Spinner className="size-10 text-white/80" />
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                Almost there
              </h1>
              <p className="text-sm text-white/50">Opening OiPer</p>
            </div>
          </div>
        )

      case 'redirecting_sign_in':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <Spinner className="size-10 text-white/80" />
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in required
              </h1>
              <p className="text-sm text-white/50">Taking you to the web</p>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Couldn&apos;t continue
              </h1>
              <p className="text-sm text-white/55">
                {state.message ?? 'Something went wrong!'}
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6 text-white">
      <section className="w-full max-w-sm">{renderStateContent()}</section>
    </main>
  )
}
