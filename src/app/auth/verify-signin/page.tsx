import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { EmailVerificationForm } from '@/features/auth/email-verification-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify your email',
  description: 'Verify your email to complete sign in.',
}

export default function VerifySignInPage() {
  return (
    <AuthPageShell mode="page">
      <EmailVerificationForm mode="page" type="signin" />
    </AuthPageShell>
  )
}
