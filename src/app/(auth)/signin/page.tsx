import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { CheckoutLine, CheckoutSummary } from '@/features/auth/checkout-intent'
import { loadCheckoutPlans } from '@/features/auth/checkout-plans'
import { SignInForm } from '@/features/auth/signin-form'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/signin')

export default async function SignInPage() {
  const plans = await loadCheckoutPlans()

  return (
    <AuthPageShell aside={plans ? <CheckoutSummary plans={plans} /> : null}>
      <SignInForm
        checkout={plans ? <CheckoutLine plans={plans} page="signin" /> : null}
      />
    </AuthPageShell>
  )
}
