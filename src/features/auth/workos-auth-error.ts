import { AuthApiError } from '@/lib/auth-api'

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
  if (error instanceof AuthApiError) {
    const details = error.details

    if (
      details &&
      typeof details === 'object' &&
      'code' in details &&
      details.code === 'password_reset_token_not_found'
    )
      return 'Invalid or expired reset link'
    if (error.message.toLowerCase().includes('signup verification code'))
      return 'Invalid or expired verification code'
    if (!error.code) return 'Something went wrong!'

    return mapAuthErrorCodeToMessage(error.code)
  }

  return 'Something went wrong!'
}
