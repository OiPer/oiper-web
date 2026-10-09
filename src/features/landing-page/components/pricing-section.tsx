'use client'

import { IntervalToggle } from '@/components/shared/interval-toggle'
import { Wrapper } from '@/components/wrapper'
import { useAuth } from '@/features/auth/auth-context'
import { buildAuthUrl } from '@/features/auth/auth-form-utils'
import { ChangePlanDialog } from '@/features/billing/change-plan-dialog'
import {
  STRIPE_CHECKOUT_ENABLED,
  useCheckoutQueryParam,
  usePollUntilPlanChangeLands,
  useStartCheckout,
  type PlanChangeTarget,
} from '@/features/billing/use-checkout'
import {
  PlanCard,
  type CtaAction,
  type PlanCardCta,
} from '@/features/landing-page/components/plan-card'
import { logClick, logSelect, logView } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'
import {
  formatCurrencyFromCents,
  formatDate,
  planDisplayName,
} from '@/lib/format'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type PricingPlan = components['schemas']['PricingPlan']

const subscriptionRequest = { cache: 'no-store' } as const

export function PricingSection(props: { plans: PricingPlan[] }) {
  const { currentUser, isLoading: isAuthLoading } = useAuth()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [interval, setInterval] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        logView('pricing', 'landing')
        observer.disconnect()
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const [changePlanTarget, setChangePlanTarget] =
    useState<PlanChangeTarget | null>(null)
  const { startCheckout, pendingCheckout } = useStartCheckout()

  const subscriptionQuery = $api.useQuery(
    'get',
    '/v1/account/subscription',
    subscriptionRequest,
    { enabled: !!currentUser, retry: false, staleTime: 30_000 }
  )

  const giftsQuery = $api.useQuery(
    'get',
    '/v1/account/gifts',
    subscriptionRequest,
    { enabled: !!currentUser, retry: false, staleTime: 30_000 }
  )
  const gift = currentUser ? (giftsQuery.data?.current ?? null) : null
  const { pendingTarget, setPendingTarget } = usePollUntilPlanChangeLands(
    subscriptionQuery.refetch
  )

  const free = props.plans.find((plan) => plan.plan === 'FREE')

  const pro = props.plans.find(
    (plan) => plan.plan === 'PRO' && plan.interval === interval
  )

  const max = props.plans.find(
    (plan) => plan.plan === 'MAX' && plan.interval === interval
  )

  const periodLabel = interval === 'MONTHLY' ? '/ month' : '/ year'
  const intervalParam = interval === 'MONTHLY' ? 'monthly' : 'yearly'

  const bestYearlyPlan = props.plans
    .filter((plan) => plan.interval === 'YEARLY')
    .sort((a, b) => b.discountPercentFloored - a.discountPercentFloored)[0]

  const subscription = subscriptionQuery.data
  const isLapsed =
    !currentUser ||
    !subscription ||
    subscription.plan === 'FREE' ||
    subscription.status === 'CANCELLED' ||
    subscription.status === 'EXPIRED'

  const isStatusUnknown =
    !isMounted ||
    isAuthLoading ||
    (!!currentUser && (subscriptionQuery.isPending || giftsQuery.isPending))

  useCheckoutQueryParam(
    props.plans,
    !!currentUser && !isStatusUnknown,
    '/',
    (target) => {
      setInterval(target.interval)
      document.getElementById('pricing')?.scrollIntoView()
      if (!isLapsed) setChangePlanTarget(target)
    }
  )

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

  function trackUpgrade(
    cardPlan: 'PRO' | 'MAX',
    provider: 'paddle' | 'stripe'
  ) {
    logClick('upgrade', 'pricing', {
      plan: cardPlan.toLowerCase(),
      interval: intervalParam,
      provider,
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
          onClick: () => {
            trackUpgrade(cardPlan, 'stripe')
            void startCheckout('STRIPE', cardPlan, interval)
          },
        }
      : {
          type: 'link',
          href: signupCta(checkoutSlug, intervalParam, 'stripe'),
          scroll: false,
          onClick: () => trackUpgrade(cardPlan, 'stripe'),
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

    if (isLapsed) {
      const checkoutSlug = cardPlan === 'PRO' ? 'pro' : 'max'
      const checkoutAction: CtaAction = currentUser
        ? {
            type: 'button',
            onClick: () => {
              trackUpgrade(cardPlan, 'paddle')
              void startCheckout('PADDLE', cardPlan, interval)
            },
          }
        : {
            type: 'link',
            href: signupCta(checkoutSlug, intervalParam, 'paddle'),
            scroll: false,
            onClick: () => trackUpgrade(cardPlan, 'paddle'),
          }

      const canStartNow = !!gift && cardPlan !== gift.plan

      return {
        cta: gift
          ? `${cardPlan === gift.plan ? 'Keep' : 'Switch to'} ${planDisplayName(cardPlan)} after your gift`
          : `Upgrade to ${planDisplayName(cardPlan)}`,
        action: checkoutAction,
        submitting: isCheckoutSubmitting(cardPlan, 'PADDLE'),
        disabled: isCheckoutDisabledByOther(cardPlan, 'PADDLE'),
        secondaryCta: canStartNow
          ? {
              label: `Start ${planDisplayName(cardPlan)} now (ends your gift)`,
              action: {
                type: 'button',
                onClick: () => {
                  logClick('upgrade', 'pricing', {
                    plan: cardPlan.toLowerCase(),
                    interval: intervalParam,
                    provider: 'paddle',
                    outcome: 'start_now',
                  })
                  void startCheckout('PADDLE', cardPlan, interval, true)
                },
              },
              disabled: pendingCheckout !== null,
            }
          : buildStripeSecondaryCta(cardPlan),
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

    return {
      cta: 'Switch',
      ctaVariant: 'outline',
      disabled: !!pendingTarget,
      action: {
        type: 'button',
        onClick: () => {
          logClick('plan_change', 'pricing', {
            plan: cardPlan.toLowerCase(),
            interval: intervalParam,
          })
          setChangePlanTarget({ plan: cardPlan, interval })
        },
      },
    }
  }

  const proCta = pro && derivePlanCardCta('PRO')
  const maxCta = max && derivePlanCardCta('MAX')

  return (
    <section
      ref={sectionRef}
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
          <p className="mt-5 text-base leading-relaxed text-white/50">
            {gift && isLapsed
              ? `Your ${planDisplayName(gift.plan)} gift runs until ${formatDate(gift.endsAt)}. Pick a plan now and you won't pay anything until then.`
              : 'Choose the plan that works best for you. No hidden fees.'}
          </p>

          <div className="mt-8">
            <IntervalToggle
              value={interval}
              onChange={(next) => {
                if (next === interval) return
                setInterval(next)
                logSelect('billing_interval', 'pricing', {
                  interval: next.toLowerCase(),
                })
              }}
              variant="landing"
              yearlySavePercent={bestYearlyPlan?.discountPercentFloored}
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
              discountPercentFloored={0}
              description="Unlimited transcription on your machine, no limits, no cost."
              features={free.features}
              featured={false}
              cta={{
                cta: null,
                action: { type: 'download' },
              }}
            />
          )}

          {pro && proCta && (
            <PlanCard
              displayName={pro.displayName}
              price={formatCurrencyFromCents(pro.priceAmountCents)}
              period={periodLabel}
              discountPercent={pro.discountPercent}
              discountPercentFloored={pro.discountPercentFloored}
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
              discountPercentFloored={max.discountPercentFloored}
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
            location="pricing"
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
              nextPayment: subscriptionQuery.data.nextPayment,
              currencyCode: subscriptionQuery.data.currencyCode,
            }}
            onChangeSubmitted={(target) => {
              setPendingTarget(target)
              setChangePlanTarget(null)
            }}
            refetchSubscription={() => subscriptionQuery.refetch()}
          />
        )}
    </section>
  )
}
