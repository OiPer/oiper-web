import { AuthApiError } from '@/lib/auth-api'
import { z } from 'zod'

const verificationRequiredDetailsSchema = z
  .object({
    email: z.string().trim().email().optional(),
    pending_authentication_token: z.string().trim().min(1).optional(),
    pendingAuthenticationToken: z.string().trim().min(1).optional(),
  })
  .passthrough()

type VerificationRequiredDetails = z.infer<
  typeof verificationRequiredDetailsSchema
>

function extractVerificationDetails(
  details: unknown
): VerificationRequiredDetails | null {
  const parsed = verificationRequiredDetailsSchema.safeParse(details)
  if (!parsed.success) return null
  return parsed.data
}

export function getEmailVerificationState(error: unknown): {
  pendingAuthenticationToken: string
  email?: string
} | null {
  if (!(error instanceof AuthApiError)) return null
  if (error.code !== 'AUTH_EMAIL_VERIFICATION_REQUIRED') return null

  const parsed = extractVerificationDetails(error.details)
  if (!parsed) return null

  const pendingAuthenticationToken =
    parsed.pendingAuthenticationToken ?? parsed.pending_authentication_token
  if (!pendingAuthenticationToken) return null

  return {
    pendingAuthenticationToken,
    email: parsed.email,
  }
}

function mapAuthErrorCodeToMessage(code: string): string {
  const messages: Record<string, string> = {
    AUTH_INVALID_CREDENTIALS: 'Invalid credentials',
    AUTH_EMAIL_ALREADY_EXISTS: 'An account already exists with this email',
    AUTH_PASSWORD_POLICY_FAILED: 'Password does not meet requirements',
    AUTH_EMAIL_VERIFICATION_REQUIRED: 'Email verification is required',
    AUTH_AUTH_METHOD_NOT_ALLOWED:
      'This account must sign in with a different method',
    AUTH_INVALID_VERIFICATION_CODE: 'Invalid or expired verification code',
  }

  return messages[code] ?? 'Something went wrong!'
}

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthApiError && error.code) {
    return mapAuthErrorCodeToMessage(error.code)
  }

  return 'Something went wrong!'
}
