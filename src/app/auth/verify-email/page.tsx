import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { EmailVerificationForm } from '@/features/auth/email-verification-form'
import { appPageMetadata } from '@/features/seo/app-pages'
import { redirect } from 'next/navigation'

export const metadata = appPageMetadata('/auth/verify-email')

type VerifyEmailPageProps = {
  searchParams: Promise<{
    pat?: string
    email?: string
  }>
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const resolvedSearchParams = await searchParams

  if (!resolvedSearchParams?.pat || !resolvedSearchParams.email) {
    redirect('/auth/signin')
  }

  return (
    <AuthPageShell mode="page">
      <EmailVerificationForm mode="page" />
    </AuthPageShell>
  )
}
