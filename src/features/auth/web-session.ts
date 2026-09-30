import { $api, api } from '@/lib/api/client'

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
