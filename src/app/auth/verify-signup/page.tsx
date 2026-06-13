import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { EmailVerificationForm } from '@/features/auth/email-verification-form'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Verify your email',
  description: 'Verify your email to complete account creation.',
}

type VerifySignUpPageProps = {
  searchParams: Promise<{ code?: string }>
}

export default async function VerifySignUpPage({
  searchParams,
}: VerifySignUpPageProps) {
  const resolvedSearchParams = await searchParams

  if (!resolvedSearchParams?.code) {
    redirect('/auth/signup')
  }

  return (
    <AuthPageShell mode="page">
      <EmailVerificationForm mode="page" />
    </AuthPageShell>
  )
}
