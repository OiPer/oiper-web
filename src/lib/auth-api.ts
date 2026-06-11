import { wrap } from '@/utils/promise'
import { z } from 'zod'

export const webSessionSchema = z.union([
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

const authErrorEnvelopeSchema = z.object({
  error: z.object({
    code: z.string().trim().min(1),
    message: z.string().trim().min(1),
    details: z.unknown().nullable().optional(),
  }),
  requestId: z.string().trim().min(1).optional(),
})

const passwordSignInBodySchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(256),
})

const passwordSignUpBodySchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(256),
  name: z.string().trim().min(1).max(160),
})

export const signUpVerificationRequiredSchema = z.object({
  verificationRequired: z.literal(true),
  email: z.string().trim().email(),
  code: z.string().trim().min(1),
  expiresAt: z.string().datetime(),
})

export type SignUpVerificationRequired = z.infer<
  typeof signUpVerificationRequiredSchema
>

const signUpEmailVerificationBodySchema = z.object({
  code: z.string().trim().min(1),
  otp: z.string().trim().min(4).max(12),
})

const signUpResendVerificationBodySchema = z.object({
  code: z.string().trim().min(1),
})

const passwordResetRequestBodySchema = z.object({
  email: z.string().trim().email(),
})

const passwordResetConfirmBodySchema = z.object({
  token: z.string().trim().min(1),
  newPassword: z.string().min(8).max(256),
})

const sentResponseSchema = z.object({
  sent: z.literal(true),
})

const resendSignUpVerificationResponseSchema = z.object({
  sent: z.literal(true),
  alreadyVerified: z.boolean(),
})

const resetResponseSchema = z.object({
  reset: z.literal(true),
})

const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_OIPER_SERVER_URL ?? 'http://localhost:1421'

type AuthApiErrorInput = {
  status: number
  code?: string
  message: string
  details?: unknown
  requestId?: string
}

export class AuthApiError extends Error {
  readonly status: number
  readonly code?: string
  readonly details?: unknown
  readonly requestId?: string

  constructor(input: AuthApiErrorInput) {
    super(input.message)
    this.name = 'AuthApiError'
    this.status = input.status
    this.code = input.code
    this.details = input.details
    this.requestId = input.requestId
  }
}

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

export function buildWebAuthStartUrl(input: { callbackUrl: string }): string {
  const url = new URL('/v1/auth/web/start', SERVER_BASE_URL)
  url.searchParams.set('callbackUrl', input.callbackUrl)

  return url.toString()
}

async function readJson<TSchema extends z.ZodTypeAny>(
  response: Response,
  schema: TSchema
): Promise<z.infer<TSchema>> {
  if (!response.ok) {
    const maybeErrorBody = await response
      .json()
      .catch(() => undefined as unknown)

    const parsedError = authErrorEnvelopeSchema.safeParse(maybeErrorBody)

    if (parsedError.success) {
      throw new AuthApiError({
        status: response.status,
        code: parsedError.data.error.code,
        message: parsedError.data.error.message,
        details: parsedError.data.error.details ?? undefined,
        requestId: parsedError.data.requestId,
      })
    }

    throw new AuthApiError({
      status: response.status,
      message: `Auth request failed with status ${response.status}`,
    })
  }

  const responseBody = await response.json()
  return schema.parse(responseBody)
}

async function fetchApi<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
  options?: {
    method?: 'GET' | 'POST'
    body?: unknown
    requestInit?: RequestInit
    headers?: Record<string, string>
  }
): Promise<z.infer<TSchema>> {
  const init = mergeRequestInit(
    {
      method: options?.method ?? 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    },
    options?.requestInit
  )

  const response = await fetch(`${SERVER_BASE_URL}${path}`, init)
  return readJson(response, schema)
}

export async function getWebSession(requestInit?: RequestInit) {
  return fetchApi('/v1/auth/web/session', webSessionSchema, {
    method: 'GET',
    requestInit: mergeRequestInit(
      { credentials: 'include', cache: 'no-store' },
      requestInit
    ),
  })
}

export async function getWebCsrfToken(requestInit?: RequestInit) {
  return fetchApi('/v1/auth/web/csrf-token', csrfTokenSchema, {
    method: 'GET',
    requestInit: mergeRequestInit(
      { credentials: 'include', cache: 'no-store' },
      requestInit
    ),
  })
}

export async function logoutWebSession(options?: {
  requestInit?: RequestInit
  csrfRequestInit?: RequestInit
}) {
  const [csrf, csrfError] = await wrap(
    getWebCsrfToken(options?.csrfRequestInit ?? options?.requestInit)
  )

  if (csrfError) {
    throw csrfError
  }

  return fetchApi('/v1/auth/web/logout', webLogoutSchema, {
    method: 'POST',
    requestInit: options?.requestInit,
    headers: {
      'X-CSRF-Token': csrf.csrfToken,
    },
  })
}

export async function confirmDesktopAuthRequest(
  requestId: string,
  requestInit?: RequestInit
) {
  return fetchApi('/v1/auth/desktop/confirm', desktopConfirmSchema, {
    method: 'POST',
    body: { requestId },
    requestInit,
  })
}

export async function signInWithPassword(
  input: z.infer<typeof passwordSignInBodySchema>,
  requestInit?: RequestInit
) {
  const body = passwordSignInBodySchema.parse(input)

  return fetchApi('/v1/auth/web/sign-in/password', webSessionSchema, {
    method: 'POST',
    body,
    requestInit,
  })
}

export async function signUpWithPassword(
  input: z.infer<typeof passwordSignUpBodySchema>,
  requestInit?: RequestInit
) {
  const body = passwordSignUpBodySchema.parse(input)

  return fetchApi(
    '/v1/auth/web/sign-up/password',
    signUpVerificationRequiredSchema,
    {
      method: 'POST',
      body,
      requestInit,
    }
  )
}

export async function verifySignUpEmailForWebAuth(
  input: z.infer<typeof signUpEmailVerificationBodySchema>,
  requestInit?: RequestInit
) {
  const body = signUpEmailVerificationBodySchema.parse(input)

  return fetchApi('/v1/auth/web/sign-up/verify-email', webSessionSchema, {
    method: 'POST',
    body,
    requestInit,
  })
}

export async function resendSignUpVerificationEmailForWebAuth(
  input: z.infer<typeof signUpResendVerificationBodySchema>,
  requestInit?: RequestInit
) {
  const body = signUpResendVerificationBodySchema.parse(input)

  return fetchApi(
    '/v1/auth/web/sign-up/resend-verification',
    resendSignUpVerificationResponseSchema,
    {
      method: 'POST',
      body,
      requestInit,
    }
  )
}

export async function requestWebPasswordReset(
  input: z.infer<typeof passwordResetRequestBodySchema>,
  requestInit?: RequestInit
) {
  const body = passwordResetRequestBodySchema.parse(input)

  return fetchApi('/v1/auth/web/password-reset/request', sentResponseSchema, {
    method: 'POST',
    body,
    requestInit,
  })
}

export async function confirmWebPasswordReset(
  input: z.infer<typeof passwordResetConfirmBodySchema>,
  requestInit?: RequestInit
) {
  const body = passwordResetConfirmBodySchema.parse(input)

  return fetchApi('/v1/auth/web/password-reset/confirm', resetResponseSchema, {
    method: 'POST',
    body,
    requestInit,
  })
}
