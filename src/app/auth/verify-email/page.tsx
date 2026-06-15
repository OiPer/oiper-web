import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { EmailVerificationForm } from '@/features/auth/email-verification-form'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Verify your email',
  description: 'Verify your email to continue.',
}

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const resolvedSearchParams = await searchParams

  if (!resolvedSearchParams?.token || !resolvedSearchParams.email) {
    redirect('/auth/signin')
  }

  return (
    <AuthPageShell mode="page">
      <EmailVerificationForm mode="page" />
    </AuthPageShell>
  )
}
