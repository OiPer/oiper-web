import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { SignUpForm } from '@/features/auth/signup-form'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/signup')

export default function SignUpPage() {
  return (
    <AuthPageShell>
      <SignUpForm />
    </AuthPageShell>
  )
}
