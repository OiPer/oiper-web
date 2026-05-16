import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { SignUpForm } from '@/features/auth/signup-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create your OiPer account.',
}

export default function SignUpPage() {
  return (
    <AuthPageShell mode="page">
      <SignUpForm mode="page" />
    </AuthPageShell>
  )
}
