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
  verificationType: 'verify-signin' | 'verify-signup'
  pendingToken: string
  email: string
}): string {
  const verificationParams = new URLSearchParams(config.searchParams.toString())

  verificationParams.set('auth-page', config.verificationType)
  verificationParams.set('pendingToken', config.pendingToken)
  verificationParams.set('email', config.email)

  const query = verificationParams.toString()

  if (config.mode === 'modal') return `${config.pathname}?${query}`
  return `/auth/${config.verificationType}?${query}`
}

export function buildAuthHref(config: {
  mode: 'modal' | 'page'
  pathname: string
  searchParams: URLSearchParams
  authPage: string
  additionalParams?: Record<string, string>
}): string {
  const next = new URLSearchParams(config.searchParams.toString())

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
