import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { CheckoutLine, CheckoutSummary } from '@/features/auth/checkout-intent'
import { loadCheckoutPlans } from '@/features/auth/checkout-plans'
import { SignUpForm } from '@/features/auth/signup-form'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/signup')

export default async function SignUpPage() {
  const plans = await loadCheckoutPlans()

  return (
    <AuthPageShell aside={plans ? <CheckoutSummary plans={plans} /> : null}>
      <SignUpForm
        checkout={plans ? <CheckoutLine plans={plans} page="signup" /> : null}
      />
    </AuthPageShell>
  )
}
