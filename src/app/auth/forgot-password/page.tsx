import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { ForgotPasswordForm } from '@/features/auth/forgot-password-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Reset your OiPer account password.',
}

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell mode="page">
      <ForgotPasswordForm mode="page" />
    </AuthPageShell>
  )
}
