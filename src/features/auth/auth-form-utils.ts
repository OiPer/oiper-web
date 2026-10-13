import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'

export type AuthPage = 'signin' | 'signup' | 'forgot-password' | 'verify-email'

export type WebAuthProvider = 'google' | 'github'

const CALLBACK_URL_BASE = 'http://internal.invalid'

function isSafeRelativePath(candidate: string): boolean {
  if (!candidate.startsWith('/') || candidate.startsWith('//')) return false
  if (/[\\\t\r\n]/.test(candidate)) return false

  try {
    return new URL(candidate, CALLBACK_URL_BASE).origin === CALLBACK_URL_BASE
  } catch {
    return false
  }
}

export function getCallbackUrl(searchParams: URLSearchParams): string {
  const callbackUrl = searchParams.get('callbackUrl')
  if (!callbackUrl || !isSafeRelativePath(callbackUrl)) return '/'
  return callbackUrl
}

export function buildAuthUrl(
  page: AuthPage,
  params: Record<string, string | null | undefined> = {}
): string {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value)
  }

  const search = query.toString()
  return search ? `/${page}?${search}` : `/${page}`
}

export function buildWebAuthStartUrl(
  callbackUrl: string,
  provider: WebAuthProvider
): string {
  return joinUrl(env.OIPER_SERVER_URL, '/v1/auth/web/start', {
    callbackUrl,
    provider,
  })
}
