import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { SignInForm } from '@/features/auth/signin-form'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/auth/signin')

export default function SignInPage() {
  return (
    <AuthPageShell mode="page">
      <SignInForm mode="page" />
    </AuthPageShell>
  )
}
