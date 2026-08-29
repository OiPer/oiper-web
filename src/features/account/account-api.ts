import { $api, api } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'
import type { QueryClient } from '@tanstack/react-query'

type Session = components['schemas']['WebSession']

export type AccountProfile = components['schemas']['AccountProfile']

const webSessionRequest = { cache: 'no-store' } as const

const webSessionQueryKey = $api.queryOptions(
  'get',
  '/v1/auth/web/session',
  webSessionRequest
).queryKey

export async function getAccountMutationHeaders() {
  const csrf = await api.GET('/v1/auth/web/csrf-token', webSessionRequest)

  if (csrf.error) throw csrf.error
  if (!csrf.data) throw new Error('CSRF token response body was empty')

  return { 'x-csrf-token': csrf.data.csrfToken } as const
}

export function syncAccountProfileInSession(
  queryClient: QueryClient,
  profile: AccountProfile
) {
  queryClient.setQueryData<Session | null>(webSessionQueryKey, (session) => {
    if (!session?.authenticated) {
      return session
    }

    return {
      ...session,
      user: {
        ...session.user,
        id: profile.workosUserId,
        workosUserId: profile.workosUserId,
        oiperUserId: profile.id,
        email: profile.email,
        emailVerified: profile.emailVerified,
        firstName: profile.firstName,
        lastName: profile.lastName,
        profilePictureUrl: profile.profilePictureUrl,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    }
  })
}

export function clearAccountSession(queryClient: QueryClient) {
  queryClient.removeQueries({
    queryKey: webSessionQueryKey,
  })
}
