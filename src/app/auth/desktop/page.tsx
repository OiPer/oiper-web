'use client'

import {
  confirmDesktopAuthRequest,
  getWebSession,
  isAbortError,
} from '@/lib/auth-api'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type DesktopAuthPageState = {
  status:
    | 'loading'
    | 'requires_login'
    | 'ready_to_confirm'
    | 'confirming'
    | 'confirmed'
    | 'error'
  message?: string
  deepLinkUrl?: string
}

export default function DesktopAuthPage() {
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
    if (!requestId) {
      setState({
        status: 'error',
        message: 'Missing request_id in desktop auth URL',
      })
      return
    }

    const abortController = new AbortController()

    getWebSession({ signal: abortController.signal })
      .then((session) => {
        if (!session.authenticated) {
          return setState({ status: 'requires_login' })
        }

        setState({ status: 'ready_to_confirm' })
      })
      .catch((error) => {
        if (isAbortError(error)) return

        setState({
          status: 'error',
          message: error?.message ?? 'Failed to verify web session',
        })
      })

    return abortController.abort
  }, [requestId])

  async function handleConfirmClick() {
    if (!requestId) {
      setState({
        status: 'error',
        message: 'Missing request_id',
      })
      return
    }

    setState({
      status: 'confirming',
    })

    try {
      const result = await confirmDesktopAuthRequest(requestId)
      setState({
        status: 'confirmed',
        deepLinkUrl: result.deepLinkUrl,
      })
      window.location.assign(result.deepLinkUrl)
    } catch (error) {
      setState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to confirm desktop auth',
      })
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-8">
        <h1 className="text-2xl font-semibold">Desktop Sign In</h1>
        <p className="mt-2 text-sm text-white/60">
          Confirm this login to continue in your OiPer desktop app.
        </p>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80">
          <p>Request ID</p>
          <p className="mt-1 font-mono text-xs break-all text-white/70">
            {requestId ?? 'missing'}
          </p>
        </div>

        {state.status === 'requires_login' && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-white/70">
              You must sign in on web before this desktop request can be
              confirmed.
            </p>

            <a
              href={signInUrl}
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-black hover:bg-white/90"
            >
              Sign in to Continue
            </a>
          </div>
        )}

        {state.status === 'ready_to_confirm' && (
          <button
            type="button"
            onClick={handleConfirmClick}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-black hover:bg-white/90"
          >
            Continue in Desktop
          </button>
        )}

        {state.status === 'confirming' && (
          <p className="mt-6 text-sm text-white/70">
            Confirming desktop request...
          </p>
        )}

        {state.status === 'confirmed' && (
          <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            Deep-link dispatched to desktop.
            {state.deepLinkUrl ? (
              <p className="mt-2 font-mono text-xs break-all text-emerald-200/90">
                {state.deepLinkUrl}
              </p>
            ) : null}
          </div>
        )}

        {state.status === 'error' && (
          <div className="mt-6 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            {state.message}
          </div>
        )}
      </section>
    </main>
  )
}
