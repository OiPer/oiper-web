'use client'

import { Spinner } from '@/components/ui/spinner'
import { $api } from '@/lib/api/client'
import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

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
  const sessionQuery = $api.useQuery(
    'get',
    '/v1/auth/web/session',
    { cache: 'no-store' },
    {
      enabled: Boolean(requestId),
      retry: false,
    }
  )

  const hasNavigatedRef = useRef(false)

  useEffect(() => {
    if (!requestId) return router.replace('/')
    if (sessionQuery.isPending) return setState({ status: 'loading' })

    if (sessionQuery.error) {
      return setState({
        status: 'error',
        message: "Couldn't verify your session",
      })
    }

    if (!sessionQuery.data) {
      return setState({
        status: 'error',
        message: "Couldn't verify your session",
      })
    }

    if (hasNavigatedRef.current) return
    if (!sessionQuery.data.authenticated) {
      hasNavigatedRef.current = true
      setState({ status: 'redirecting_sign_in' })
      return window.location.replace(signInUrl)
    }

    hasNavigatedRef.current = true
    setState({ status: 'continuing' })
    const continueUrl = joinUrl(
      env.OIPER_SERVER_URL,
      '/v1/auth/desktop/continue',
      {
        requestId,
        callbackUrl: '/',
      }
    )
    window.location.replace(continueUrl)
  }, [
    requestId,
    router,
    sessionQuery.data,
    sessionQuery.error,
    sessionQuery.isPending,
    signInUrl,
  ])

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
                {state.message ?? 'Something went wrong'}
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
