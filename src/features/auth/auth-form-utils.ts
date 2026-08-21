import { env } from '@/lib/env'
import { joinUrl } from '@/lib/url'

export type AuthMode = 'modal' | 'page'

export type AuthPage = 'signin' | 'signup' | 'forgot-password' | 'verify-email'

export type WebAuthProvider = 'google' | 'github'

function buildUrl(pathname: string, searchParams: URLSearchParams): string {
  const query = searchParams.toString()
  return query ? `${pathname}?${query}` : pathname
}

function cloneSearchParams(searchParams: URLSearchParams): URLSearchParams {
  return new URLSearchParams(searchParams.toString())
}

function stripTransientAuthParams(
  searchParams: URLSearchParams
): URLSearchParams {
  const next = cloneSearchParams(searchParams)
  next.delete('code')
  next.delete('pat')
  next.delete('evid')
  return next
}

function applyAdditionalParams(
  searchParams: URLSearchParams,
  additionalParams?: Record<string, string>
): void {
  if (!additionalParams) return

  Object.entries(additionalParams).forEach(([key, value]) => {
    searchParams.set(key, value)
  })
}

export function getCallbackUrl(searchParams: URLSearchParams): string {
  const callbackUrl = searchParams.get('callbackUrl')
  if (!callbackUrl || !callbackUrl.startsWith('/')) return '/'
  if (callbackUrl.startsWith('//')) return '/'
  return callbackUrl
}

export function buildAuthUrl(input: {
  mode: AuthMode
  pathname: string
  searchParams: URLSearchParams
  page: AuthPage
  additionalParams?: Record<string, string>
}): string {
  const next = stripTransientAuthParams(input.searchParams)
  applyAdditionalParams(next, input.additionalParams)

  if (input.mode === 'modal') {
    next.set('auth-page', input.page)
    return buildUrl(input.pathname, next)
  }

  next.delete('auth-page')
  return buildUrl(`/auth/${input.page}`, next)
}

export function buildAuthReturnUrl(input: {
  mode: AuthMode
  pathname: string
  searchParams: URLSearchParams
}): string {
  if (input.mode === 'page') return getCallbackUrl(input.searchParams)

  const next = stripTransientAuthParams(input.searchParams)

  next.delete('auth-page')
  return buildUrl(input.pathname, next)
}

export function buildWebAuthStartUrl(input: {
  callbackUrl: string
  mode: AuthMode
  provider: WebAuthProvider
}): string {
  return joinUrl(env.OIPER_SERVER_URL, '/v1/auth/web/start', {
    callbackUrl: input.callbackUrl,
    mode: input.mode,
    provider: input.provider,
  })
}
