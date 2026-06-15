'use client'

import {
  getWebSession,
  logoutWebSession,
  resendVerificationEmailForWebAuth,
  signInWithPassword,
  signUpWithPassword,
  verifyEmailForWebAuth,
  webSessionSchema,
  type PasswordAuthResult,
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
  token: string
  otp: string
}

export interface ResendVerificationInput {
  email: string
}

type AuthSessionResult = Session
type SignOutResult = Awaited<ReturnType<typeof logoutWebSession>>

export type SignInFn = ReturnWrap<PasswordAuthResult, SignInInput>
export type SignUpFn = ReturnWrap<PasswordAuthResult, SignUpInput>
export type VerifyEmailFn = ReturnWrap<AuthSessionResult, VerifyEmailInput>
export type ResendVerificationFn = ReturnWrap<
  { sent: true; alreadyVerified: boolean },
  ResendVerificationInput
>
export type SignOutFn = ReturnWrap<SignOutResult>

export interface AuthContextValue {
  currentUser: User | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean

  signIn: SignInFn
  signUp: SignUpFn
  verifyEmail: VerifyEmailFn
  resendVerification: ResendVerificationFn
  signOut: SignOutFn
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
        getWebSession({ signal: abortController.signal })
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
    ({ onError = cb, onSuccess = cb, finally: onFinally, ...input }) => {
      return wrap(signInWithPassword(input), {
        onError,
        finally: onFinally,
        onSuccess: (result) => {
          if ('authenticated' in result && result.authenticated)
            setSession(result)
          onSuccess(result)
        },
      })
    },
    []
  )

  const signUp: SignUpFn = useCallback(
    ({ onError = cb, onSuccess = cb, finally: onFinally, ...input }) => {
      return wrap(signUpWithPassword(input), {
        onError,
        finally: onFinally,
        onSuccess: (result) => {
          if ('authenticated' in result && result.authenticated)
            setSession(result)
          onSuccess(result)
        },
      })
    },
    []
  )

  const verifyEmail: VerifyEmailFn = useCallback(
    ({ onError = cb, onSuccess = cb, finally: onFinally, ...input }) => {
      return wrap(verifyEmailForWebAuth(input), {
        onError,
        finally: onFinally,
        onSuccess: (newSession) => {
          if (newSession.authenticated) setSession(newSession)
          onSuccess(newSession)
        },
      })
    },
    []
  )

  const resendVerification: ResendVerificationFn = useCallback(
    ({ onError = cb, onSuccess = cb, finally: onFinally, ...input }) => {
      return wrap(resendVerificationEmailForWebAuth(input), {
        onError,
        finally: onFinally,
        onSuccess,
      })
    },
    []
  )

  const signOut: SignOutFn = useCallback(
    ({ onError = cb, onSuccess = cb, finally: onFinally }) => {
      return wrap(logoutWebSession(), {
        onError,
        finally: onFinally,
        onSuccess: (result) => {
          setSession(null)
          onSuccess(result)
          window.location.assign(result.logoutUrl)
        },
      })
    },
    []
  )

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
        resendVerification,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
