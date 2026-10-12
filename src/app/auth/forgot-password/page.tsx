import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { ForgotPasswordForm } from '@/features/auth/forgot-password-form'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/auth/forgot-password')

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell mode="page">
      <ForgotPasswordForm mode="page" />
    </AuthPageShell>
  )
}
