import type { AuthContextValue } from '@/features/auth/auth-context'

type AccountUser = NonNullable<AuthContextValue['currentUser']>

function getEmailName(email: string) {
  return email.split('@')[0] ?? 'oiper-user'
}

export function getUserLabel(user: AccountUser) {
  const fullName = [user.firstName, user.lastName]
    .filter((name): name is string => Boolean(name))
    .join(' ')

  return fullName || getEmailName(user.email)
}

export function getUserInitials(user: AccountUser) {
  const initials = [user.firstName, user.lastName]
    .filter((name): name is string => Boolean(name))
    .map((name) => name[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)

  if (initials) {
    return initials
  }

  return user.email.slice(0, 2).toUpperCase()
}

export function getOptionalUserLabel(
  user: AuthContextValue['currentUser'],
  fallback = 'Oiper User'
) {
  if (!user) {
    return fallback
  }

  return getUserLabel(user)
}

export function getOptionalUserInitials(
  user: AuthContextValue['currentUser'],
  fallback = 'OU'
) {
  if (!user) {
    return fallback
  }

  return getUserInitials(user)
}

export function formatMemberSince(
  value: string | null | undefined,
  fallback = 'July 2026'
) {
  if (!value) {
    return fallback
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}
