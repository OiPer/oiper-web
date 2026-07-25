'use client'

import { $api, api } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'
import { useQueryClient } from '@tanstack/react-query'
import { createContext, useContext, type ReactNode } from 'react'

type Session = components['schemas']['WebSession']
type PasswordAuthResult = components['schemas']['PasswordAuthResponse']
type WebLogoutResponse = components['schemas']['WebLogoutResponse']
type ResendVerificationResponse =
  components['schemas']['ResendVerificationResponse']
type User = Extract<Session, { authenticated: true }>['user']

const webSessionRequest = { cache: 'no-store' } as const

const webSessionQueryKey = $api.queryOptions(
  'get',
  '/v1/auth/web/session',
  webSessionRequest
).queryKey

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

export interface AuthContextValue {
  currentUser: User | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean

  signIn(input: SignInInput): Promise<PasswordAuthResult>
  signUp(input: SignUpInput): Promise<PasswordAuthResult>
  verifyEmail(input: VerifyEmailInput): Promise<Session>
  resendVerification(
    input: ResendVerificationInput
  ): Promise<ResendVerificationResponse>
  signOut(): Promise<WebLogoutResponse>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()

  const sessionQuery = $api.useQuery(
    'get',
    '/v1/auth/web/session',
    webSessionRequest,
    { retry: false }
  )

  const session = sessionQuery.data ?? null
  const currentUser = session?.authenticated ? session.user : null
  const isAuthenticated = session?.authenticated ?? false

  async function signIn(input: SignInInput): Promise<PasswordAuthResult> {
    const { data, error } = await api.POST('/v1/auth/web/sign-in/password', {
      body: input,
    })

    if (error) throw error
    if (!data) throw new Error('Sign-in response body was empty')

    if ('authenticated' in data && data.authenticated) {
      queryClient.setQueryData(webSessionQueryKey, data)
    }

    return data
  }

  async function signUp(input: SignUpInput): Promise<PasswordAuthResult> {
    const { data, error } = await api.POST('/v1/auth/web/sign-up/password', {
      body: input,
    })

    if (error) throw error
    if (!data) throw new Error('Sign-up response body was empty')

    if ('authenticated' in data && data.authenticated) {
      queryClient.setQueryData(webSessionQueryKey, data)
    }

    return data
  }

  async function verifyEmail(input: VerifyEmailInput): Promise<Session> {
    const { data, error } = await api.POST('/v1/auth/web/verify-email', {
      body: input,
    })

    if (error) throw error
    if (!data) throw new Error('Email verification response body was empty')

    if (data.authenticated) {
      queryClient.setQueryData(webSessionQueryKey, data)
    }

    return data
  }

  async function resendVerification(
    input: ResendVerificationInput
  ): Promise<ResendVerificationResponse> {
    const { data, error } = await api.POST('/v1/auth/web/resend-verification', {
      body: input,
    })

    if (error) throw error
    if (!data) throw new Error('Resend verification response body was empty')

    return data
  }

  async function signOut(): Promise<WebLogoutResponse> {
    const csrf = await api.GET('/v1/auth/web/csrf-token', webSessionRequest)

    if (csrf.error) throw csrf.error
    if (!csrf.data) throw new Error('CSRF token response body was empty')

    const logout = await api.POST('/v1/auth/web/logout', {
      params: { header: { 'x-csrf-token': csrf.data.csrfToken } },
    })

    if (logout.error) throw logout.error
    if (!logout.data) throw new Error('Logout response body was empty')

    queryClient.setQueryData(webSessionQueryKey, {
      authenticated: false,
      reason: 'signed_out',
    })

    return logout.data
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        session,
        isAuthenticated,
        isLoading: sessionQuery.isLoading,
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
