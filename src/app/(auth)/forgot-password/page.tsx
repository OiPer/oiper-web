import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { ForgotPasswordForm } from '@/features/auth/forgot-password-form'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/forgot-password')

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell>
      <ForgotPasswordForm />
    </AuthPageShell>
  )
}
