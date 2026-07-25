export type AuthMode = 'modal' | 'page'

export type AuthPage = 'signin' | 'signup' | 'forgot-password' | 'verify-email'

const NEXT_PUBLIC_OIPER_SERVER_URL =
  process.env.NEXT_PUBLIC_OIPER_SERVER_URL?.trim().replace(/\/+$/u, '')

if (!NEXT_PUBLIC_OIPER_SERVER_URL) {
  throw new Error('NEXT_PUBLIC_OIPER_SERVER_URL is not configured')
}

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
  next.delete('token')
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

export function buildWebAuthStartUrl(input: { callbackUrl: string }): string {
  const url = new URL('/v1/auth/web/start', `${NEXT_PUBLIC_OIPER_SERVER_URL}/`)
  url.searchParams.set('callbackUrl', input.callbackUrl)
  return url.toString()
}
