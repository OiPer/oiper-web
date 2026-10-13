import { buildAuthUrl } from '@/features/auth/auth-form-utils'
import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { EmailVerificationForm } from '@/features/auth/email-verification-form'
import { appPageMetadata } from '@/features/seo/app-pages'
import { redirect } from 'next/navigation'

export const metadata = appPageMetadata('/verify-email')

type VerifyEmailPageProps = {
  searchParams: Promise<{
    pat?: string
    email?: string
    callbackUrl?: string
  }>
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const resolvedSearchParams = await searchParams

  if (!resolvedSearchParams?.pat || !resolvedSearchParams.email) {
    redirect(
      buildAuthUrl('signin', { callbackUrl: resolvedSearchParams.callbackUrl })
    )
  }

  return (
    <AuthPageShell>
      <EmailVerificationForm />
    </AuthPageShell>
  )
}
