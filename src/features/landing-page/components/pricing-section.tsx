'use client'

import { IntervalToggle } from '@/components/shared/interval-toggle'
import { Wrapper } from '@/components/wrapper'
import { useAuth } from '@/features/auth/auth-context'
import { buildAuthUrl } from '@/features/auth/auth-form-utils'
import { ChangePlanDialog } from '@/features/billing/change-plan-dialog'
import {
  describePlanChangeCta,
  planChangeButtonVariant,
  STRIPE_CHECKOUT_ENABLED,
  useAutoOpenCheckoutFromQueryParam,
  usePollUntilPlanChangeLands,
  useStartCheckout,
  type PlanChangeTarget,
} from '@/features/billing/use-checkout'
import {
  PlanCard,
  type CtaAction,
  type PlanCardCta,
} from '@/features/landing-page/components/plan-card'
import { DOWNLOAD_URL } from '@/features/landing-page/constants/links'
import { $api } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'
import { formatCurrencyFromCents, planDisplayName } from '@/lib/format'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type PricingPlan = components['schemas']['PricingPlan']

const subscriptionRequest = { cache: 'no-store' } as const

export function PricingSection(props: { plans: PricingPlan[] }) {
  const { currentUser, isLoading: isAuthLoading } = useAuth()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [interval, setInterval] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY')
  const [changePlanTarget, setChangePlanTarget] =
    useState<PlanChangeTarget | null>(null)
  const { startCheckout, pendingCheckout } = useStartCheckout()

  const subscriptionQuery = $api.useQuery(
    'get',
    '/v1/account/subscription',
    subscriptionRequest,
    { enabled: !!currentUser, retry: false }
  )

  const { pendingTarget, setPendingTarget } = usePollUntilPlanChangeLands(
    subscriptionQuery.refetch
  )

  useAutoOpenCheckoutFromQueryParam(props.plans, !!currentUser, '/')

  const free = props.plans.find((plan) => plan.plan === 'FREE')
  const pro = props.plans.find(
    (plan) => plan.plan === 'PRO' && plan.interval === interval
  )
  const max = props.plans.find(
    (plan) => plan.plan === 'MAX' && plan.interval === interval
  )

  const periodLabel = interval === 'MONTHLY' ? '/ month' : '/ year'
  const intervalParam = interval === 'MONTHLY' ? 'monthly' : 'yearly'

  // Badge on the Yearly toggle always reflects the best yearly discount,
  // regardless of which interval is currently selected.
  const bestYearlyDiscount = Math.max(
    0,
    ...props.plans
      .filter((plan) => plan.interval === 'YEARLY')
      .map((plan) => plan.discountPercent)
  )

  const isStatusUnknown =
    isAuthLoading || (!!currentUser && subscriptionQuery.isPending)

  // Opens the sign-up modal in place (mode: 'modal' keeps the user on this
  // page, adding ?auth-page=signup instead of navigating to /auth/signup)
  // with the checkout intent carried as query params — once the modal
  // closes on success those params are still on the URL, so
  // useAutoOpenCheckoutFromQueryParam picks them up and starts checkout
  // automatically, no separate callback round-trip needed.
  function signupCta(
    checkout: 'pro' | 'max',
    checkoutInterval: 'monthly' | 'yearly',
    provider: 'paddle' | 'stripe'
  ) {
    return buildAuthUrl({
      mode: 'modal',
      pathname,
      searchParams: new URLSearchParams(searchParams.toString()),
      page: 'signup',
      additionalParams: {
        checkout,
        interval: checkoutInterval,
        ...(provider === 'stripe' ? { provider: 'stripe' } : {}),
      },
    })
  }

  function isCheckoutSubmitting(
    cardPlan: 'PRO' | 'MAX',
    provider: 'PADDLE' | 'STRIPE'
  ) {
    return (
      pendingCheckout?.plan === cardPlan &&
      pendingCheckout.provider === provider
    )
  }

  function isCheckoutDisabledByOther(
    cardPlan: 'PRO' | 'MAX',
    provider: 'PADDLE' | 'STRIPE'
  ) {
    return pendingCheckout !== null && !isCheckoutSubmitting(cardPlan, provider)
  }

  function buildStripeSecondaryCta(
    cardPlan: 'PRO' | 'MAX'
  ): PlanCardCta['secondaryCta'] {
    if (!STRIPE_CHECKOUT_ENABLED) return undefined

    const checkoutSlug = cardPlan === 'PRO' ? 'pro' : 'max'
    const action: CtaAction = currentUser
      ? {
          type: 'button',
          onClick: () => void startCheckout('STRIPE', cardPlan, interval),
        }
      : {
          type: 'link',
          href: signupCta(checkoutSlug, intervalParam, 'stripe'),
          scroll: false,
        }

    return {
      label: 'Upgrade via Stripe instead',
      action,
      submitting: isCheckoutSubmitting(cardPlan, 'STRIPE'),
      disabled: isCheckoutDisabledByOther(cardPlan, 'STRIPE'),
    }
  }

  function derivePlanCardCta(cardPlan: 'PRO' | 'MAX'): PlanCardCta {
    if (isStatusUnknown) {
      return {
        cta: null,
        action: { type: 'button', onClick: () => undefined },
        loading: true,
      }
    }

    const subscription = subscriptionQuery.data
    const isLapsed =
      !currentUser ||
      !subscription ||
      subscription.plan === 'FREE' ||
      subscription.status === 'CANCELLED' ||
      subscription.status === 'EXPIRED'

    if (isLapsed) {
      const checkoutSlug = cardPlan === 'PRO' ? 'pro' : 'max'
      const checkoutAction: CtaAction = currentUser
        ? {
            type: 'button',
            onClick: () => void startCheckout('PADDLE', cardPlan, interval),
          }
        : {
            type: 'link',
            href: signupCta(checkoutSlug, intervalParam, 'paddle'),
            scroll: false,
          }

      return {
        cta: `Upgrade to ${planDisplayName(cardPlan)}`,
        action: checkoutAction,
        submitting: isCheckoutSubmitting(cardPlan, 'PADDLE'),
        disabled: isCheckoutDisabledByOther(cardPlan, 'PADDLE'),
        secondaryCta: buildStripeSecondaryCta(cardPlan),
      }
    }

    const sub = subscription!

    if (sub.plan === cardPlan && sub.billingInterval === interval) {
      return {
        cta: 'Current Plan',
        action: { type: 'button', onClick: () => undefined },
        disabled: true,
      }
    }

    const currentTarget: PlanChangeTarget = {
      plan: sub.plan as 'PRO' | 'MAX',
      interval: sub.billingInterval ?? 'MONTHLY',
    }
    const targetPlan: PlanChangeTarget = { plan: cardPlan, interval }
    const cta = describePlanChangeCta(currentTarget, targetPlan)
    const ctaVariant = planChangeButtonVariant(currentTarget, targetPlan)

    return {
      cta,
      ctaVariant,
      disabled: !!pendingTarget,
      action: {
        type: 'button',
        onClick: () => setChangePlanTarget({ plan: cardPlan, interval }),
      },
    }
  }

  const proCta = pro && derivePlanCardCta('PRO')
  const maxCta = max && derivePlanCardCta('MAX')

  return (
    <section
      id="pricing"
      className="relative border-b border-white/6 bg-[#0a0a0a] py-32 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-175 w-225 -translate-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.018),transparent_70%)]" />
      </div>

      <Wrapper className="relative" maxWidth="68rem">
        <div className="mx-auto max-w-140 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Simple pricing.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/40">
            Choose the plan that works best for you. No hidden fees.
          </p>

          <div className="mt-8">
            <IntervalToggle
              value={interval}
              onChange={setInterval}
              variant="landing"
              yearlySavePercent={bestYearlyDiscount}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {free && (
            <PlanCard
              displayName={free.displayName}
              price={formatCurrencyFromCents(free.priceAmountCents)}
              period="Forever"
              discountPercent={0}
              description="Unlimited local transcription, no limits, no cost."
              features={free.features}
              featured={false}
              cta={{
                cta: 'Download',
                action: { type: 'link', href: DOWNLOAD_URL },
              }}
            />
          )}

          {pro && proCta && (
            <PlanCard
              displayName={pro.displayName}
              price={formatCurrencyFromCents(pro.priceAmountCents)}
              period={periodLabel}
              discountPercent={pro.discountPercent}
              description="Managed cloud transcription with a daily allowance."
              features={pro.features}
              featured={true}
              cta={proCta}
            />
          )}

          {max && maxCta && (
            <PlanCard
              displayName={max.displayName}
              price={formatCurrencyFromCents(max.priceAmountCents)}
              period={periodLabel}
              discountPercent={max.discountPercent}
              description="Unlimited managed cloud transcription, subject to abuse protection."
              features={max.features}
              featured={false}
              cta={maxCta}
            />
          )}
        </div>
      </Wrapper>

      {subscriptionQuery.data &&
        (subscriptionQuery.data.plan === 'PRO' ||
          subscriptionQuery.data.plan === 'MAX') && (
          <ChangePlanDialog
            open={!!changePlanTarget}
            onOpenChange={(open) => {
              if (!open) setChangePlanTarget(null)
            }}
            initialTarget={changePlanTarget}
            plans={props.plans}
            currentSubscription={{
              plan: subscriptionQuery.data.plan,
              interval: subscriptionQuery.data.billingInterval ?? 'MONTHLY',
              status: subscriptionQuery.data.status,
              currentPeriodEnd: subscriptionQuery.data.currentPeriodEnd,
              cancelAtPeriodEnd: subscriptionQuery.data.cancelAtPeriodEnd,
            }}
            onChangeSubmitted={(target) => {
              setPendingTarget(target)
              setChangePlanTarget(null)
            }}
            onResumed={() => subscriptionQuery.refetch()}
          />
        )}
    </section>
  )
}
