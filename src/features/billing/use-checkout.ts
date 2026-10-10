/* eslint-disable react-hooks/exhaustive-deps */

import { useAuth } from '@/features/auth/auth-context'
import { useAccountMutation } from '@/features/auth/web-session'
import { logClose, logComplete, logError } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import { getAppErrorCode, isAppErrorEnvelope } from '@/lib/api/error'
import type { components } from '@/lib/api/schema'
import { env } from '@/lib/env'
import { openPaddleCheckout } from '@/lib/paddle'
import { redirectToStripeCheckout } from '@/lib/stripe-checkout'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
    | 'status'
    | 'currentPeriodEnd'
    | 'cancelAtPeriodEnd'
    | 'nextPayment'
    | 'currencyCode'
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

const STILL_PROCESSING_MESSAGE =
  "Still processing — check back in a moment if your plan hasn't updated"

const subscriptionRefetchOptions = {
  ...$api.queryOptions('get', '/v1/account/subscription', {
    cache: 'no-store',
  }),
  staleTime: 0,
}

export type PendingCheckout = {
  plan: 'PRO' | 'MAX'
  provider: 'PADDLE' | 'STRIPE'
}

export function useStartCheckout() {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const checkoutMutation = useAccountMutation(
    'post',
    '/v1/account/subscription/checkout'
  )
  const [pendingCheckout, setPendingCheckout] =
    useState<PendingCheckout | null>(null)

  function refreshSubscriptionUntil(plan: 'PRO' | 'MAX') {
    function landed(subscription: { plan: string; status?: string }) {
      return subscription.plan === plan && subscription.status === 'ACTIVE'
    }

    setPendingCheckout({ plan, provider: 'PADDLE' })
    logComplete('checkout', 'pricing', {
      plan: plan.toLowerCase(),
      provider: 'paddle',
    })

    pollUntil(() => queryClient.fetchQuery(subscriptionRefetchOptions), landed)
      .then((subscription) => {
        if (!landed(subscription)) toast.info(STILL_PROCESSING_MESSAGE)
      })
      .catch(() => toast.info(STILL_PROCESSING_MESSAGE))
      .finally(() => {
        setPendingCheckout(null)
        void queryClient.invalidateQueries({
          queryKey: ['get', '/v1/account/gifts'],
        })
      })
  }

  async function startCheckout(
    provider: 'PADDLE' | 'STRIPE',
    plan: 'PRO' | 'MAX',
    interval: 'MONTHLY' | 'YEARLY'
  ) {
    setPendingCheckout({ plan, provider })

    try {
      const result = await checkoutMutation.mutateAsync({
        body: { provider, plan, interval },
      })

      switch (result.provider) {
        case 'PADDLE':
          return await openPaddleCheckout(
            result.transactionId,
            currentUser?.email,
            () => refreshSubscriptionUntil(plan),
            () =>
              logClose('checkout', 'pricing', {
                plan: plan.toLowerCase(),
                provider: 'paddle',
              })
          )
        case 'STRIPE':
          return redirectToStripeCheckout(result.checkoutUrl)
      }
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/account/subscription/checkout'>(
        error
      )
      logError('checkout', 'pricing', {
        plan: plan.toLowerCase(),
        interval: interval.toLowerCase(),
        provider: provider.toLowerCase(),
        error_type: code ?? 'unknown',
      })

      switch (code) {
        case 'BILLING_ALREADY_SUBSCRIBED':
          queryClient.invalidateQueries({
            queryKey: subscriptionRefetchOptions.queryKey,
          })
          return toast.error(
            isAppErrorEnvelope(error)
              ? error.error.message
              : 'You already have a subscription — manage it from billing'
          )
        case 'BILLING_PROVIDER_NOT_AVAILABLE':
          return toast.error(
            isAppErrorEnvelope(error)
              ? error.error.message
              : "This payment provider isn't available — use the other one"
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

export function useCheckoutQueryParam(
  plans: PricingPlan[] | undefined,
  isReady: boolean,
  redirectTo: string,
  onSelect: (target: PlanChangeTarget) => void
) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const checkoutPlan = searchParams.get('checkout')
  const checkoutInterval =
    searchParams.get('interval') === 'yearly' ? 'YEARLY' : 'MONTHLY'
  const loggedCancel = useRef(false)

  useEffect(() => {
    if (checkoutPlan !== 'cancelled') {
      loggedCancel.current = false
      return
    }

    if (!loggedCancel.current) {
      loggedCancel.current = true
      logClose('checkout', 'pricing', { provider: 'stripe' })
    }

    toast.info("Checkout cancelled — you weren't charged")
    router.replace(redirectTo)
  }, [checkoutPlan, redirectTo, router])

  useEffect(() => {
    if (!isReady || !plans) return
    if (checkoutPlan !== 'pro' && checkoutPlan !== 'max') return

    const plan = checkoutPlan === 'max' ? 'MAX' : 'PRO'
    if (!findCatalogEntry(plans, plan, checkoutInterval)) return

    onSelect({ plan, interval: checkoutInterval })
    router.replace(redirectTo, { scroll: false })
  }, [isReady, plans, checkoutPlan, checkoutInterval, router])
}

export async function pollUntil<T>(
  fetch: () => Promise<T>,
  isDone: (result: T) => boolean,
  options: { timeoutMs?: number; signal?: AbortSignal } = {}
): Promise<T> {
  const { timeoutMs = 120_000, signal } = options
  const deadline = Date.now() + timeoutMs
  let delayMs = 1000

  let result = await fetch()

  while (!isDone(result) && Date.now() + delayMs <= deadline) {
    if (signal?.aborted) break
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    if (signal?.aborted) break
    result = await fetch()
    delayMs = Math.min(delayMs * 1.5, 10_000)
  }

  return result
}

export function useCheckoutReturn(
  refetch: () => Promise<{
    data?: { plan: string; status?: string } | undefined
  }>
) {
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('checkout') !== 'success') return

    function landed(result: Awaited<ReturnType<typeof refetch>>) {
      return (
        result.data?.plan !== undefined &&
        result.data.plan !== 'FREE' &&
        result.data.status === 'ACTIVE'
      )
    }

    window.history.replaceState(null, '', window.location.pathname)
    logComplete('checkout', 'billing', { provider: 'stripe' })
    setIsProcessing(true)
    toast.success('Payment received — setting up your subscription')
    pollUntil(refetch, landed)
      .then((result) => {
        if (!landed(result)) toast.info(STILL_PROCESSING_MESSAGE)
      })
      .catch(() => toast.info(STILL_PROCESSING_MESSAGE))
      .finally(() => setIsProcessing(false))
  }, [])

  return { isProcessing }
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
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!pendingTarget) return

    const controller = new AbortController()
    const target = pendingTarget

    function landed(result: {
      data?: { plan: string; billingInterval?: string | null }
    }) {
      return (
        result.data?.plan === target.plan &&
        result.data?.billingInterval === target.interval
      )
    }

    pollUntil(refetch, landed, { signal: controller.signal }).then((result) => {
      if (controller.signal.aborted) return

      if (!landed(result)) toast.info(STILL_PROCESSING_MESSAGE)

      setPendingTarget(null)
      void queryClient.invalidateQueries({
        queryKey: ['get', '/v1/account/gifts'],
      })
    })

    return () => controller.abort()
  }, [pendingTarget])

  return { pendingTarget, setPendingTarget }
}

type SubscriptionRefetch = () => Promise<{
  data?: components['schemas']['SubscriptionAccountView'] | undefined
}>

function isResumed(result: Awaited<ReturnType<SubscriptionRefetch>>) {
  const subscription = result.data?.plan !== 'FREE' ? result.data : undefined
  return (
    subscription?.status === 'ACTIVE' &&
    subscription.cancelAtPeriodEnd === false
  )
}

export function useResumeSubscription(refetch: SubscriptionRefetch) {
  const resumeMutation = useAccountMutation(
    'post',
    '/v1/account/subscription/resume'
  )
  const [isWaiting, setIsWaiting] = useState(false)

  async function resumeSubscription() {
    await resumeMutation.mutateAsync({})
    setIsWaiting(true)
    try {
      return isResumed(await pollUntil(refetch, isResumed))
    } finally {
      setIsWaiting(false)
    }
  }

  return {
    resumeSubscription,
    isResuming: resumeMutation.isPending || isWaiting,
  }
}

export function useOpenBillingPortal() {
  const portalMutation = useAccountMutation(
    'post',
    '/v1/account/subscription/portal'
  )

  async function openBillingPortal() {
    try {
      const urls = await portalMutation.mutateAsync({ body: {} })

      logComplete('billing_portal', 'billing')
      window.location.assign(urls.portalUrl)
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/account/subscription/portal'>(
        error
      )
      logError('billing_portal', 'billing', { error_type: code ?? 'unknown' })

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
