import { AuthPageShell } from '@/features/auth/auth-page-shell'
import { CheckoutIntent } from '@/features/auth/checkout-intent'
import { loadCheckoutPlans } from '@/features/auth/checkout-plans'
import { SignInForm } from '@/features/auth/signin-form'
import { appPageMetadata } from '@/features/seo/app-pages'

export const metadata = appPageMetadata('/signin')

type SignInPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams
  const plans = await loadCheckoutPlans(params.callbackUrl)
  const variant = Number(params.proto ?? 1)

  return (
    <AuthPageShell
      split={variant === 3}
      aside={plans ? <CheckoutIntent plans={plans} variant={variant} /> : null}
    >
      <SignInForm />
    </AuthPageShell>
  )
}
