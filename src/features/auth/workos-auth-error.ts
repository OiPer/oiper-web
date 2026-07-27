import { getAppErrorCode, getAppErrorDetailsCode } from '@/lib/api/error'

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
  const detailsCode = getAppErrorDetailsCode(error)

  if (detailsCode === 'password_reset_token_not_found') {
    return 'Invalid or expired reset link'
  }

  if (detailsCode === 'invalid_one_time_code') {
    return 'Invalid verification code'
  }

  const code = getAppErrorCode(error)

  if (code) {
    return mapAuthErrorCodeToMessage(code)
  }

  return 'Something went wrong!'
}
