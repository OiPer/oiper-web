import { isAppErrorEnvelope } from '@/lib/api/error'
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

const CHARACTER_MESSAGES: Record<string, string> = {
  lowercase: 'Add a lowercase letter',
  uppercase: 'Add an uppercase letter',
  number: 'Add a number',
  symbol: 'Add a symbol',
}

export function getPasswordPolicyMessage(error: unknown): string {
  const details = isAppErrorEnvelope(error) ? error.error.details : null
  const violation = (details ?? {}) as {
    reason?: string
    minimumLength?: number
    maximumLength?: number
    characterType?: string
  }

  switch (violation.reason) {
    case 'too_short':
      return violation.minimumLength
        ? `Use at least ${violation.minimumLength} characters`
        : 'Password is too short'
    case 'too_long':
      return violation.maximumLength
        ? `Use ${violation.maximumLength} characters or fewer`
        : 'Password is too long'
    case 'missing_character':
      return (
        CHARACTER_MESSAGES[violation.characterType ?? ''] ??
        'Add letters, numbers, and symbols'
      )
    case 'breached':
      return 'Password found in a data breach'
    case 'too_weak':
      return 'Password is too easy to guess'
    default:
      return 'Choose a different password'
  }
}

export function buildWebAuthStartUrl(
  callbackUrl: string,
  provider: WebAuthProvider
): string {
  return joinUrl(env.SERVER_URL, '/v1/auth/web/start', {
    callbackUrl,
    provider,
  })
}
