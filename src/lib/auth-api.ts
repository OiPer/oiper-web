import { z } from 'zod'

const webSessionSchema = z.union([
  z.object({
    authenticated: z.literal(false),
    reason: z.string().optional(),
  }),
  z.object({
    authenticated: z.literal(true),
    accessToken: z.string().min(1),
    sessionId: z.string().min(1),
    user: z.object({
      id: z.string().min(1),
      workosUserId: z.string().min(1),
      oiperUserId: z.string().min(1),
      email: z.string().min(1),
      emailVerified: z.boolean(),
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      profilePictureUrl: z.string().url().nullable(),
    }),
  }),
])

const csrfTokenSchema = z.object({
  csrfToken: z.string().min(20),
})

const desktopConfirmSchema = z.object({
  requestId: z.string().min(1),
  deepLinkUrl: z.string().url(),
  handoffExpiresAt: z.string().datetime(),
})

const webLogoutSchema = z.object({
  logoutUrl: z.string().url(),
})

const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_OIPER_SERVER_URL ?? 'http://localhost:1421'

function mergeRequestInit(
  baseInit: RequestInit,
  overrideInit?: RequestInit
): RequestInit {
  if (!overrideInit) return baseInit

  const mergedHeaders = new Headers(baseInit.headers)
  const overrideHeaders = new Headers(overrideInit.headers)
  overrideHeaders.forEach((value, key) => mergedHeaders.set(key, value))

  return { ...baseInit, ...overrideInit, headers: mergedHeaders }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function buildWebAuthStartUrl(input: {
  returnPath: string
  provider?: 'authkit' | 'GoogleOAuth'
  screenHint?: 'sign-in' | 'sign-up'
}): string {
  const url = new URL('/v1/auth/web/start', SERVER_BASE_URL)
  url.searchParams.set('returnPath', input.returnPath)

  if (input.provider) {
    url.searchParams.set('provider', input.provider)
  }

  if (input.screenHint) {
    url.searchParams.set('screenHint', input.screenHint)
  }

  return url.toString()
}

async function readJson<TSchema extends z.ZodTypeAny>(
  response: Response,
  schema: TSchema
): Promise<z.infer<TSchema>> {
  if (!response.ok) {
    throw new Error(`Auth request failed with status ${response.status}`)
  }

  const responseBody = await response.json()
  return schema.parse(responseBody)
}

export async function getWebSession(requestInit?: RequestInit) {
  const response = await fetch(
    `${SERVER_BASE_URL}/v1/auth/web/session`,
    mergeRequestInit({ credentials: 'include', cache: 'no-store' }, requestInit)
  )

  return readJson(response, webSessionSchema)
}

export async function getWebCsrfToken(requestInit?: RequestInit) {
  const response = await fetch(
    `${SERVER_BASE_URL}/v1/auth/web/csrf-token`,
    mergeRequestInit({ credentials: 'include', cache: 'no-store' }, requestInit)
  )

  return readJson(response, csrfTokenSchema)
}

export async function logoutWebSession(options?: {
  requestInit?: RequestInit
  csrfRequestInit?: RequestInit
}) {
  const csrf = await getWebCsrfToken(
    options?.csrfRequestInit ?? options?.requestInit
  )

  const response = await fetch(
    `${SERVER_BASE_URL}/v1/auth/web/logout`,
    mergeRequestInit(
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrf.csrfToken,
        },
      },
      options?.requestInit
    )
  )

  return readJson(response, webLogoutSchema)
}

export async function confirmDesktopAuthRequest(
  requestId: string,
  requestInit?: RequestInit
) {
  const response = await fetch(
    `${SERVER_BASE_URL}/v1/auth/desktop/confirm`,
    mergeRequestInit(
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      },
      requestInit
    )
  )

  return readJson(response, desktopConfirmSchema)
}
