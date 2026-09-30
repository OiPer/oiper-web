import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const SIGN_IN_PATH = '/auth/signin'
const SESSION_COOKIE_NAME = 'wos-session'

const PROTECTED_PREFIXES = ['/account']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (!isProtected) return NextResponse.next()

  if (!request.cookies.has(SESSION_COOKIE_NAME)) {
    const url = request.nextUrl.clone()
    url.pathname = SIGN_IN_PATH
    url.searchParams.set('callbackUrl', `${pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*'],
}
