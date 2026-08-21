import type { paths } from '@/lib/api/schema'
import { env } from '@/lib/env'
import createClient from 'openapi-fetch'
import createQueryClient from 'openapi-react-query'

export const api = createClient<paths>({
  baseUrl: env.OIPER_SERVER_URL,
  credentials: 'include',
})

export const $api = createQueryClient(api)
