import { $api, api } from '@/lib/api/client'
import { useMutation } from '@tanstack/react-query'
import type { ClientPathsWithMethod } from 'openapi-fetch'
import { useRef } from 'react'

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

  type AccountInit = Omit<Init, 'params'> & {
    params?: { path?: Record<string, string> }
  }

  const mutation = useMutation({
    mutationFn: async (init: AccountInit) =>
      request.mutateAsync({
        ...init,
        params: {
          ...init.params,
          header: await getAccountMutationHeaders(),
        },
      } as Init),
  })

  const inFlight = useRef<{
    key: string
    promise: ReturnType<typeof mutation.mutateAsync>
  } | null>(null)

  function mutateAsync(init: AccountInit) {
    const key = JSON.stringify(init)
    if (inFlight.current?.key === key) return inFlight.current.promise

    const entry = { key, promise: mutation.mutateAsync(init) }
    inFlight.current = entry

    function release() {
      if (inFlight.current === entry) inFlight.current = null
    }

    entry.promise.then(release, release)

    return entry.promise
  }

  return { ...mutation, mutateAsync }
}
