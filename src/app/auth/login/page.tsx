'use client'

import {
  buildWebAuthStartUrl,
  getWebSession,
  isAbortError,
  logoutWebSession,
} from '@/lib/auth-api'
import { useEffect, useMemo, useState } from 'react'

type SessionState = {
  status: 'loading' | 'authenticated' | 'unauthenticated' | 'error'
  email?: string | null
  message?: string
}

export default function AuthLoginPage() {
  const [sessionState, setSessionState] = useState<SessionState>({
    status: 'loading',
  })

  const hostedAuthUrl = useMemo(
    () =>
      buildWebAuthStartUrl({
        provider: 'authkit',
        returnPath: '/auth/login',
        screenHint: 'sign-in',
      }),
    []
  )

  const googleAuthUrl = useMemo(
    () =>
      buildWebAuthStartUrl({
        provider: 'GoogleOAuth',
        returnPath: '/auth/login',
      }),
    []
  )

  useEffect(() => {
    const abortController = new AbortController()

    getWebSession({ signal: abortController.signal })
      .then((session) => {
        if (session.authenticated) {
          return setSessionState({
            status: 'authenticated',
            email: session.user.email,
          })
        }

        setSessionState({ status: 'unauthenticated' })
      })
      .catch((error) => {
        if (isAbortError(error)) return

        setSessionState({
          status: 'error',
          message:
            error instanceof Error ? error.message : 'Failed to fetch session',
        })
      })

    return () => {
      abortController.abort()
    }
  }, [])

  async function handleLogoutClick() {
    try {
      const result = await logoutWebSession()
      window.location.assign(result.logoutUrl)
    } catch (error) {
      setSessionState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Logout failed',
      })
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-8">
        <h1 className="text-2xl font-semibold">Sign in to OiPer</h1>

        <p className="mt-2 text-sm text-white/60">
          Web auth is powered by WorkOS AuthKit.
        </p>

        {sessionState.status === 'authenticated' && (
          <div className="mt-6 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4">
            <p className="text-sm text-emerald-200">Signed in</p>
            <p className="mt-1 text-sm text-white/80">
              {sessionState.email ?? 'User session active'}
            </p>
          </div>
        )}

        {sessionState.status === 'error' && (
          <div className="mt-6 rounded-lg border border-red-400/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-200">{sessionState.message}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={hostedAuthUrl}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-black hover:bg-white/90"
          >
            Continue with Email or Password
          </a>

          <a
            href={googleAuthUrl}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-4 text-sm font-medium text-white hover:border-white/60 hover:bg-white/5"
          >
            Continue with Google
          </a>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 px-4 text-sm font-medium text-white/80 hover:border-white/40"
          >
            Sign out
          </button>
        </div>
      </section>
    </main>
  )
}
