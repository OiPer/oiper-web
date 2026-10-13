import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { CheckoutLine, CheckoutSummary } from '@/features/auth/checkout-intent'
import { loadCheckoutPlans } from '@/features/auth/checkout-plans'
import { SignUpForm } from '@/features/auth/signup-form'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/signup')

type SignUpPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams
  const plans = await loadCheckoutPlans(params.callbackUrl)
  const variant = Number(params.proto ?? 1)

  return (
    <AuthPageShell aside={plans ? <CheckoutSummary plans={plans} /> : null}>
      <SignUpForm
        checkout={
          plans ? <CheckoutLine plans={plans} variant={variant} /> : null
        }
      />
    </AuthPageShell>
  )
}
