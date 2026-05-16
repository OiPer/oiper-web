'use client'

import {
  getWebSession,
  signInWithPassword,
  signUpWithPassword,
  verifyEmailForWebAuth,
  webSessionSchema,
  type AuthApiError,
} from '@/lib/auth-api'
import { wrap, type ReturnWrap } from '@/utils/promise'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { type z } from 'zod'

type Session = z.infer<typeof webSessionSchema>

type User = Extract<Session, { authenticated: true }>['user']

export interface SignInInput {
  email: string
  password: string
}

export interface SignUpInput {
  name: string
  email: string
  password: string
}

export interface VerifyEmailInput {
  code: string
  pendingAuthenticationToken: string
}

type AuthSessionResult = Session

export type SignInFn = ReturnWrap<AuthSessionResult, SignInInput>
export type SignUpFn = ReturnWrap<AuthSessionResult, SignUpInput>
export type VerifyEmailFn = ReturnWrap<AuthSessionResult, VerifyEmailInput>
export type SignOutFn = ReturnWrap<void>
export type RefreshSessionFn = ReturnWrap<Session>

export interface AuthContextValue {
  currentUser: User | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean

  signIn: SignInFn
  signUp: SignUpFn
  verifyEmail: VerifyEmailFn
  signOut: SignOutFn
  refreshSession: RefreshSessionFn
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

function cb(..._: unknown[]) {
  return _
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const currentUser = session?.authenticated ? session.user : null
  const isAuthenticated = session?.authenticated ?? false

  useEffect(() => {
    const abortController = new AbortController()

    async function fetchSession() {
      const [currentSession, sessionError] = await wrap(
        getWebSession({
          signal: abortController.signal,
        })
      )

      if (sessionError) {
        console.error('Failed to fetch session:', sessionError)
        setSession(null)
      } else {
        setSession(currentSession)
      }

      setIsLoading(false)
    }

    void fetchSession()

    return () => abortController.abort()
  }, [])

  const signIn: SignInFn = useCallback(
    ({ onError = cb, onSuccess = cb, ...input }) => {
      return wrap(signInWithPassword(input), {
        onError,
        onSuccess: (newSession) => {
          if (newSession.authenticated) setSession(newSession)
          onSuccess(newSession)
        },
      })
    },
    []
  )

  const signUp: SignUpFn = useCallback(
    ({ onError = cb, onSuccess = cb, ...input }) => {
      return wrap(signUpWithPassword(input), {
        onError,
        onSuccess: (newSession) => {
          if (newSession.authenticated) setSession(newSession)
          onSuccess(newSession)
        },
      })
    },
    []
  )

  const verifyEmail: VerifyEmailFn = useCallback(
    ({ onError = cb, onSuccess = cb, ...input }) => {
      return wrap(verifyEmailForWebAuth(input), {
        onError,
        onSuccess: (newSession) => {
          if (newSession.authenticated) setSession(newSession)
          onSuccess(newSession)
        },
      })
    },
    []
  )

  const refreshSession: RefreshSessionFn = useCallback(
    ({ onError = cb, onSuccess = cb }) => {
      return wrap(getWebSession(), {
        onError,
        onSuccess: (newSession) => {
          setSession(newSession)
          onSuccess(newSession)
        },
      })
    },
    []
  )

  const signOut: SignOutFn = useCallback(({ onError = cb, onSuccess = cb }) => {
    return wrap(Promise.resolve(), {
      onError,
      onSuccess: () => {
        setSession(null)
        onSuccess()
      },
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        session,
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        verifyEmail,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function isAuthApiError(error: Error): error is AuthApiError {
  return 'status' in error && 'code' in error
}
