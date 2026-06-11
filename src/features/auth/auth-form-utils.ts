export function resolveCallbackUrl(searchParams: URLSearchParams): string {
  const callbackUrl = searchParams.get('callbackUrl')

  if (!callbackUrl || !callbackUrl.startsWith('/')) {
    return '/'
  }

  if (callbackUrl.startsWith('//')) {
    return '/'
  }

  return callbackUrl
}

export function buildVerificationUrl(config: {
  mode: 'modal' | 'page'
  pathname: string
  searchParams: URLSearchParams
  code: string
  email: string
}): string {
  const verificationParams = new URLSearchParams(config.searchParams.toString())

  if (config.mode === 'modal') {
    verificationParams.set('auth-page', 'verify-signup')
  }

  if (config.mode === 'page') {
    verificationParams.delete('auth-page')
  }

  verificationParams.set('code', config.code)
  verificationParams.set('email', config.email)
  verificationParams.delete('token')

  const query = verificationParams.toString()

  if (config.mode === 'modal') {
    return `${config.pathname}?${query}`
  }

  if (config.mode === 'page') {
    return `/auth/verify-signup?${query}`
  }

  throw new Error('Invalid auth mode')
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

  if (config.mode === 'page') {
    next.delete('auth-page')
    const query = next.toString()
    return query
      ? `/auth/${config.authPage}?${query}`
      : `/auth/${config.authPage}`
  }

  throw new Error('Invalid auth mode')
}
