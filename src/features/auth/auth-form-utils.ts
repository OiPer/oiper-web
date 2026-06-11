export function resolveCallbackPath(searchParams: URLSearchParams): string {
  const callbackPath = searchParams.get('callbackPath')

  if (!callbackPath || !callbackPath.startsWith('/')) {
    return '/'
  }

  if (callbackPath.startsWith('//')) {
    return '/'
  }

  return callbackPath
}

export function buildVerificationUrl(config: {
  mode: 'modal' | 'page'
  pathname: string
  searchParams: URLSearchParams
  code: string
  email: string
}): string {
  const verificationParams = new URLSearchParams(config.searchParams.toString())

  if (config.mode === 'modal')
    verificationParams.set('auth-page', 'verify-signup')
  if (config.mode === 'page') verificationParams.delete('auth-page')
  verificationParams.set('code', config.code)
  verificationParams.set('email', config.email)
  verificationParams.delete('token')

  const query = verificationParams.toString()

  if (config.mode === 'modal') return `${config.pathname}?${query}`
  return `/auth/verify-signup?${query}`
}

export function buildAuthHref(config: {
  mode: 'modal' | 'page'
  pathname: string
  searchParams: URLSearchParams
  authPage: string
  additionalParams?: Record<string, string>
}): string {
  const next = new URLSearchParams(config.searchParams.toString())
  next.delete('code')
  next.delete('token')

  if (config.additionalParams) {
    Object.entries(config.additionalParams).forEach(([key, value]) => {
      next.set(key, value)
    })
  }

  if (config.mode === 'modal') {
    next.set('auth-page', config.authPage)
    const query = next.toString()
    return query ? `${config.pathname}?${query}` : config.pathname
  }

  next.delete('auth-page')
  const query = next.toString()
  return query
    ? `/auth/${config.authPage}?${query}`
    : `/auth/${config.authPage}`
}
