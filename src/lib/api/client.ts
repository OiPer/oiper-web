import type { paths } from '@/lib/api/schema'
import createClient from 'openapi-fetch'
import createQueryClient from 'openapi-react-query'

const NEXT_PUBLIC_OIPER_SERVER_URL =
  process.env.NEXT_PUBLIC_OIPER_SERVER_URL?.trim().replace(/\/$/, '')

if (!NEXT_PUBLIC_OIPER_SERVER_URL) {
  throw new Error('NEXT_PUBLIC_OIPER_SERVER_URL is not configured')
}

export const api = createClient<paths>({
  baseUrl: NEXT_PUBLIC_OIPER_SERVER_URL,
  credentials: 'include',
})

export const $api = createQueryClient(api)
