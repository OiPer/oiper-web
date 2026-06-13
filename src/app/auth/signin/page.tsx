import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { SignInForm } from '@/features/auth/signin-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your OiPer account.',
}

export default function SignInPage() {
  return (
    <AuthPageShell mode="page">
      <SignInForm mode="page" />
    </AuthPageShell>
  )
}
