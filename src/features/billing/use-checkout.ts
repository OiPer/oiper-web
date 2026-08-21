import { useAuth } from '@/features/auth/auth-context'
import { getAccountMutationHeaders } from '@/features/auth/web-session'
import { $api } from '@/lib/api/client'
import { getAppErrorCode } from '@/lib/api/error'
import type { components } from '@/lib/api/schema'
import { env } from '@/lib/env'
import { openPaddleCheckout } from '@/lib/paddle'
import { redirectToStripeCheckout } from '@/lib/stripe-checkout'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type PricingPlan = components['schemas']['PricingPlan']

export type PlanChangeTarget = {
  plan: 'PRO' | 'MAX'
  interval: 'MONTHLY' | 'YEARLY'
}

export type PaidSubscriptionView = Extract<
  components['schemas']['SubscriptionAccountView'],
  { plan: 'PRO' | 'MAX' }
>

export type ActiveSubscription = PlanChangeTarget &
  Pick<
    PaidSubscriptionView,
    'status' | 'currentPeriodEnd' | 'cancelAtPeriodEnd'
  >

export const STRIPE_CHECKOUT_ENABLED = env.ENABLE_STRIPE_CHECKOUT

export type PlanCatalogEntry = PricingPlan & {
  plan: 'PRO' | 'MAX'
  interval: 'MONTHLY' | 'YEARLY'
}

export function findCatalogEntry(
  plans: PricingPlan[] | undefined,
  plan: 'PRO' | 'MAX',
  interval: 'MONTHLY' | 'YEARLY'
): PlanCatalogEntry | undefined {
  return plans?.find(
    (entry): entry is PlanCatalogEntry =>
      entry.plan === plan && entry.interval === interval
  )
}

export type PendingCheckout = {
  plan: 'PRO' | 'MAX'
  provider: 'PADDLE' | 'STRIPE'
}

export function useStartCheckout() {
  const { currentUser } = useAuth()
  const checkoutMutation = $api.useMutation(
    'post',
    '/v1/account/subscription/checkout'
  )
  const [pendingCheckout, setPendingCheckout] =
    useState<PendingCheckout | null>(null)

  async function startCheckout(
    provider: 'PADDLE' | 'STRIPE',
    plan: 'PRO' | 'MAX',
    interval: 'MONTHLY' | 'YEARLY'
  ) {
    setPendingCheckout({ plan, provider })
    try {
      const headers = await getAccountMutationHeaders()
      const result = await checkoutMutation.mutateAsync({
        body: { provider, plan, interval },
        params: { header: headers },
      })

      switch (result.provider) {
        case 'PADDLE':
          return await openPaddleCheckout(
            result.transactionId,
            currentUser?.email
          )
        case 'STRIPE':
          return redirectToStripeCheckout(result.checkoutUrl)
      }
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/account/subscription/checkout'>(
        error
      )
      switch (code) {
        case 'BILLING_ALREADY_SUBSCRIBED':
          return toast.error(
            'You already have a subscription — manage it from billing instead'
          )
        default:
          return toast.error("Couldn't open checkout")
      }
    } finally {
      setPendingCheckout(null)
    }
  }

  return { startCheckout, pendingCheckout }
}

export function useAutoOpenCheckoutFromQueryParam(
  plans: PricingPlan[] | undefined,
  isSignedIn: boolean,
  redirectTo: string
) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { startCheckout } = useStartCheckout()
  const checkoutPlan = searchParams.get('checkout')
  const checkoutInterval =
    searchParams.get('interval') === 'yearly' ? 'YEARLY' : 'MONTHLY'
  const checkoutProvider =
    searchParams.get('provider') === 'stripe' ? 'STRIPE' : 'PADDLE'

  useEffect(() => {
    if (!isSignedIn || !plans) return
    if (checkoutPlan !== 'pro' && checkoutPlan !== 'max') return

    const plan = checkoutPlan === 'max' ? 'MAX' : 'PRO'
    const entry = findCatalogEntry(plans, plan, checkoutInterval)
    if (!entry) return

    void startCheckout(checkoutProvider, plan, checkoutInterval)
    router.replace(redirectTo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSignedIn,
    plans,
    checkoutPlan,
    checkoutInterval,
    checkoutProvider,
    router,
  ])
}

export function usePollUntilPlanChangeLands(
  refetch: () => Promise<{
    data?: { plan: string; billingInterval?: string | null } | undefined
  }>
) {
  const [pendingTarget, setPendingTarget] = useState<{
    plan: 'PRO' | 'MAX'
    interval: 'MONTHLY' | 'YEARLY'
  } | null>(null)

  useEffect(() => {
    if (!pendingTarget) return

    let attempts = 0
    const intervalId = setInterval(() => {
      attempts += 1

      void refetch().then((result) => {
        const landed =
          result.data?.plan === pendingTarget.plan &&
          result.data?.billingInterval === pendingTarget.interval

        if (landed || attempts >= 8) {
          setPendingTarget(null)
        }
      })
    }, 1500)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingTarget])

  return { pendingTarget, setPendingTarget }
}

export function useResumeSubscription() {
  const resumeMutation = $api.useMutation(
    'post',
    '/v1/account/subscription/resume'
  )

  async function resumeSubscription() {
    const headers = await getAccountMutationHeaders()
    await resumeMutation.mutateAsync({ params: { header: headers } })
  }

  return { resumeSubscription, isResuming: resumeMutation.isPending }
}

export function useOpenBillingPortal() {
  const portalMutation = $api.useMutation(
    'post',
    '/v1/account/subscription/portal'
  )

  async function openBillingPortal() {
    try {
      const headers = await getAccountMutationHeaders()

      const urls = await portalMutation.mutateAsync({
        body: {},
        params: { header: headers },
      })

      window.open(urls.portalUrl, '_blank', 'noopener,noreferrer')
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/account/subscription/portal'>(
        error
      )
      switch (code) {
        case 'BILLING_SUBSCRIPTION_NOT_FOUND':
          return toast.error(
            "Couldn't find an active subscription for this account"
          )
        default:
          return toast.error("Couldn't open the billing portal")
      }
    }
  }

  return { openBillingPortal, isOpeningPortal: portalMutation.isPending }
}
