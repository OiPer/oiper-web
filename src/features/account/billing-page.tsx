'use client'

import { SectionCard } from '@/components/shared/section-card'
import { Button, Loading } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AccountPageHeader } from '@/features/account/components/account-page-header'
import { ChangePlanDialog } from '@/features/billing/change-plan-dialog'
import {
  findCatalogEntry,
  useOpenBillingPortal,
  usePollUntilPlanChangeLands,
  type ActiveSubscription,
  type PlanChangeTarget,
} from '@/features/billing/use-checkout'
import { ANCHOR_PRICING, HOME } from '@/features/landing-page/constants/links'
import { $api } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'
import {
  formatCurrencyFromCents,
  formatDate,
  formatLabel,
  subscriptionPlanLabel,
} from '@/lib/format'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'

type PricingPlan = components['schemas']['PricingPlan']
type SubscriptionStatus =
  components['schemas']['SubscriptionAccountView']['status']
type NextPayment =
  components['schemas']['SubscriptionAccountView']['nextPayment']

const subscriptionRequest = { cache: 'no-store' } as const

function formatNextPaymentDue(
  nextPayment: NextPayment,
  currentPeriodEnd: string | null
) {
  if (nextPayment) return formatDate(nextPayment.dueAt)
  if (currentPeriodEnd) return formatDate(currentPeriodEnd)
  return '-'
}

function formatNextPaymentAmount(
  nextPayment: NextPayment,
  catalogEntry: PricingPlan | undefined,
  currencyCode: string | undefined
) {
  if (nextPayment) {
    return formatCurrencyFromCents(Number(nextPayment.amount), currencyCode)
  }
  if (catalogEntry) {
    return formatCurrencyFromCents(catalogEntry.priceAmountCents)
  }
  return '-'
}

function Row(props: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <p className="text-muted-foreground font-medium">{props.label}</p>
      <p className="shrink-0 font-medium">{props.value}</p>
    </div>
  )
}

// Above phone width there's room to read "value on date" as one line;
// below it, the two wrap onto separate lines (date first) instead of
// truncating. Falls back to a plain single value when there's no date to
// pair it with, instead of rendering "- on -".
function DateValueRow(props: {
  label: string
  value: ReactNode
  date: ReactNode
}) {
  if (props.date === '-') {
    return <Row label={props.label} value={props.value} />
  }

  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <p className="text-muted-foreground font-medium">{props.label}</p>
      <div className="min-w-0 text-right">
        <p className="font-medium sm:hidden">{props.date}</p>
        <p className="font-medium sm:hidden">{props.value}</p>
        <p className="hidden font-medium sm:block">
          {props.value} on {props.date}
        </p>
      </div>
    </div>
  )
}

function RowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

function StatusValue(props: { status: SubscriptionStatus }) {
  return props.status === 'NONE' ? <>-</> : <>{formatLabel(props.status)}</>
}

function ManageBillingButton() {
  const { openBillingPortal, isOpeningPortal } = useOpenBillingPortal()

  return (
    <Button variant="outline" onClick={() => void openBillingPortal()}>
      <Loading loading={isOpeningPortal}>Manage billing</Loading>
    </Button>
  )
}

function ChangePlanButton(props: {
  plans: PricingPlan[] | undefined
  subscription: ActiveSubscription
  isBusy: boolean
  onChangeSubmitted: (target: PlanChangeTarget) => void
  onResumed: () => Promise<{
    data?: { cancelAtPeriodEnd: boolean } | undefined
  }>
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button disabled={props.isBusy} onClick={() => setOpen(true)}>
        <Loading loading={props.isBusy}>Change plan</Loading>
      </Button>

      <ChangePlanDialog
        open={open}
        onOpenChange={setOpen}
        plans={props.plans}
        currentSubscription={props.subscription}
        onChangeSubmitted={(target) => {
          props.onChangeSubmitted(target)
          setOpen(false)
        }}
        onResumed={props.onResumed}
      />
    </>
  )
}

function SubscribeButton() {
  return (
    <Button asChild>
      <Link href={`${HOME}${ANCHOR_PRICING}`}>Subscribe</Link>
    </Button>
  )
}

function CurrentPlan() {
  const subscriptionQuery = $api.useQuery(
    'get',
    '/v1/account/subscription',
    subscriptionRequest,
    { retry: false }
  )
  const pricingQuery = $api.useQuery('get', '/v1/pricing')
  const { pendingTarget, setPendingTarget } = usePollUntilPlanChangeLands(
    subscriptionQuery.refetch
  )

  const subscription = subscriptionQuery.data
  const paidPlan =
    subscription && (subscription.plan === 'PRO' || subscription.plan === 'MAX')
      ? subscription.plan
      : null

  const catalogEntry =
    paidPlan && subscription?.billingInterval
      ? findCatalogEntry(
          pricingQuery.data?.plans,
          paidPlan,
          subscription.billingInterval
        )
      : undefined

  const nextPayment = subscription?.nextPayment ?? null
  const currencyCode = subscription?.currencyCode ?? undefined

  const scheduledChange =
    subscription?.scheduledPlan &&
    subscription.scheduledBillingInterval &&
    subscription.scheduledChangeAt
      ? {
          date: formatDate(subscription.scheduledChangeAt),
          planLabel: subscriptionPlanLabel(
            subscription.scheduledPlan,
            subscription.scheduledBillingInterval
          ),
        }
      : null

  return (
    <SectionCard id="current-plan" className="gap-4">
      <div className="px-(--x-padding)">
        <p className="text-muted-foreground mb-1 text-sm font-medium">
          Subscription
        </p>

        {subscriptionQuery.isPending && (
          <div className="divide-y">
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </div>
        )}

        {subscriptionQuery.error && (
          <p className="text-destructive py-3 text-sm">
            Couldn&apos;t load your subscription
          </p>
        )}

        {subscription && (
          <div className="divide-y">
            <Row
              label="Status"
              value={<StatusValue status={subscription.status} />}
            />
            <Row
              label="Plan"
              value={subscriptionPlanLabel(
                subscription.plan,
                subscription.billingInterval
              )}
            />
            {scheduledChange && (
              <DateValueRow
                label="Scheduled to change"
                value={scheduledChange.planLabel}
                date={scheduledChange.date}
              />
            )}
            {subscription.cancelAtPeriodEnd ? (
              <Row
                label="Access ends"
                value={formatNextPaymentDue(
                  nextPayment,
                  subscription.currentPeriodEnd
                )}
              />
            ) : (
              <DateValueRow
                label="Next payment"
                value={formatNextPaymentAmount(
                  nextPayment,
                  catalogEntry,
                  currencyCode
                )}
                date={formatNextPaymentDue(
                  nextPayment,
                  subscription.currentPeriodEnd
                )}
              />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t px-(--x-padding) py-4">
        {subscriptionQuery.isPending && (
          <>
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-24" />
          </>
        )}

        {subscription?.plan === 'FREE' && <SubscribeButton />}

        {subscription && paidPlan && (
          <>
            <ManageBillingButton />
            {subscription.billingInterval && (
              <ChangePlanButton
                plans={pricingQuery.data?.plans}
                subscription={{
                  plan: paidPlan,
                  interval: subscription.billingInterval,
                  status: subscription.status,
                  currentPeriodEnd: subscription.currentPeriodEnd,
                  cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
                }}
                isBusy={!!pendingTarget}
                onChangeSubmitted={setPendingTarget}
                onResumed={() => subscriptionQuery.refetch()}
              />
            )}
          </>
        )}
      </div>
    </SectionCard>
  )
}

export function BillingPage() {
  return (
    <AccountPageHeader
      id="billing"
      title="Billing & Payments"
      description="Manage your Oiper subscription"
    >
      <CurrentPlan />
    </AccountPageHeader>
  )
}
