import { $api, api } from '@/lib/api/client'
import { useMutation } from '@tanstack/react-query'
import type { ClientPathsWithMethod } from 'openapi-fetch'

export const webSessionRequest = { cache: 'no-store' } as const

export const webSessionQueryKey = $api.queryOptions(
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

export function useAccountMutation<
  Method extends 'post' | 'patch' | 'delete',
  Path extends ClientPathsWithMethod<typeof api, Method>,
>(method: Method, path: Path) {
  const request = $api.useMutation(method, path)
  type Init = Parameters<typeof request.mutateAsync>[0]

  return useMutation({
    mutationFn: async (init: Omit<Init, 'params'>) =>
      request.mutateAsync({
        ...init,
        params: { header: await getAccountMutationHeaders() },
      } as Init),
  })
}
