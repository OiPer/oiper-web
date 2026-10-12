import { webSessionQueryKey } from '@/features/auth/web-session'
import type { components } from '@/lib/api/schema'
import type { QueryClient } from '@tanstack/react-query'

type Session = components['schemas']['WebSession']

export type AccountProfile = components['schemas']['AccountProfile']

export function syncAccountProfileInSession(
  queryClient: QueryClient,
  profile: AccountProfile
) {
  queryClient.setQueryData<Session | null>(webSessionQueryKey, (session) => {
    if (!session?.authenticated) return session

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
