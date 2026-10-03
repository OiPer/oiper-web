'use client'

import { Loading } from '@/components/shared/loading'
import { SectionCard } from '@/components/shared/section-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AccountPageHeader } from '@/features/account/components/account-page-header'
import { ChangePlanDialog } from '@/features/billing/change-plan-dialog'
import {
  pollUntil,
  useCheckoutReturn,
  useOpenBillingPortal,
  usePollUntilPlanChangeLands,
  useResumeSubscription,
  type ActiveSubscription,
  type PaidSubscriptionView,
  type PlanChangeTarget,
} from '@/features/billing/use-checkout'
import { ANCHOR_PRICING, HOME } from '@/features/landing-page/constants/links'
import { $api } from '@/lib/api/client'
import { isAppErrorEnvelope } from '@/lib/api/error'
import type { components } from '@/lib/api/schema'
import {
  formatCurrencyFromCents,
  formatDate,
  formatLabel,
  subscriptionPlanLabel,
} from '@/lib/format'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'

type PricingPlan = components['schemas']['PricingPlan']
type SubscriptionStatus = PaidSubscriptionView['status']
type NextPayment = PaidSubscriptionView['nextPayment']

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
  currencyCode: string | undefined
) {
  if (!nextPayment) return '-'
  return formatCurrencyFromCents(Number(nextPayment.amount), currencyCode)
}

function Row(props: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <p className="text-muted-foreground font-medium">{props.label}</p>
      <p className="shrink-0 font-medium">{props.value}</p>
    </div>
  )
}

function DateValueRow(props: {
  label: string
  value: ReactNode
  date: ReactNode
}) {
  if (props.date === '-') return <Row label={props.label} value={props.value} />

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
  return <>{formatLabel(props.status)}</>
}

function ManageBillingButton(props: { isPastDue?: boolean }) {
  const { openBillingPortal, isOpeningPortal } = useOpenBillingPortal()

  return (
    <Button
      variant={props.isPastDue ? 'default' : 'outline'}
      disabled={isOpeningPortal}
      onClick={() => void openBillingPortal()}
    >
      <Loading loading={isOpeningPortal}>
        {props.isPastDue ? 'Fix payment' : 'Manage subscription'}
      </Loading>
    </Button>
  )
}

function ResumeButton(props: {
  isPaused: boolean
  onResumed: () => Promise<{
    data?: components['schemas']['SubscriptionAccountView'] | undefined
  }>
}) {
  const { resumeSubscription, isResuming } = useResumeSubscription()
  const [isWaiting, setIsWaiting] = useState(false)

  async function handleResume() {
    try {
      await resumeSubscription()
      setIsWaiting(true)
      await pollUntil(
        props.onResumed,
        (result) =>
          result.data?.plan !== 'FREE' &&
          result.data?.status === 'ACTIVE' &&
          !result.data.cancelAtPeriodEnd
      )
      toast.success(
        props.isPaused
          ? 'Your subscription is active again'
          : 'Your subscription will keep renewing'
      )
    } catch (error) {
      toast.error(
        isAppErrorEnvelope(error)
          ? error.error.message
          : props.isPaused
            ? "Couldn't resume your subscription"
            : "Couldn't keep your subscription"
      )
    } finally {
      setIsWaiting(false)
    }
  }

  return (
    <Button
      disabled={isResuming || isWaiting}
      onClick={() => void handleResume()}
    >
      <Loading loading={isResuming || isWaiting}>
        {props.isPaused ? 'Resume subscription' : 'Keep subscription'}
      </Loading>
    </Button>
  )
}

function ChangePlanButton(props: {
  plans: PricingPlan[] | undefined
  subscription: ActiveSubscription
  isBusy: boolean
  onChangeSubmitted: (target: PlanChangeTarget) => void
  onResumed: () => Promise<{
    data?: components['schemas']['SubscriptionAccountView'] | undefined
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
    { retry: false, staleTime: 30_000 }
  )
  const pricingQuery = $api.useQuery('get', '/v1/pricing')
  const { pendingTarget, setPendingTarget } = usePollUntilPlanChangeLands(
    subscriptionQuery.refetch
  )
  useCheckoutReturn(subscriptionQuery.refetch)

  const subscription = subscriptionQuery.data
  const paidSubscription =
    subscription &&
    subscription.plan !== 'FREE' &&
    subscription.status !== 'CANCELLED' &&
    subscription.status !== 'EXPIRED'
      ? subscription
      : undefined
  const isPastDue = paidSubscription?.status === 'PAST_DUE'
  const isPaused = paidSubscription?.status === 'PAUSED'

  const scheduledChange = paidSubscription?.scheduledChange
    ? {
        date: formatDate(paidSubscription.scheduledChange.changeAt),
        planLabel: subscriptionPlanLabel(
          paidSubscription.scheduledChange.plan,
          paidSubscription.scheduledChange.billingInterval
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

        {subscriptionQuery.error && !subscription && (
          <p className="text-destructive py-3 text-sm">
            Couldn&apos;t load your subscription. You can still manage billing
            below.
          </p>
        )}

        {subscriptionQuery.error && subscription && (
          <p className="text-muted-foreground py-3 text-sm">
            Couldn&apos;t refresh — showing your last known status.
          </p>
        )}

        {isPastDue && (
          <Alert variant="destructive" className="my-2">
            <AlertTitle>Your last payment failed</AlertTitle>
            <AlertDescription>
              Update your payment method to restore access.
            </AlertDescription>
          </Alert>
        )}

        {isPaused && (
          <Alert className="my-2">
            <AlertTitle>Your subscription is paused</AlertTitle>
            <AlertDescription>
              Cloud features are off and you won&apos;t be charged until you
              resume it.
            </AlertDescription>
          </Alert>
        )}

        {subscription && (
          <div className="divide-y">
            <Row
              label="Plan"
              value={subscriptionPlanLabel(
                paidSubscription?.plan ?? 'FREE',
                paidSubscription?.billingInterval ?? null
              )}
            />
            {paidSubscription && (
              <>
                <Row
                  label="Status"
                  value={<StatusValue status={paidSubscription.status} />}
                />
                {scheduledChange && (
                  <DateValueRow
                    label="Scheduled to change"
                    value={scheduledChange.planLabel}
                    date={scheduledChange.date}
                  />
                )}
                {paidSubscription.cancelAtPeriodEnd ? (
                  <Row
                    label="Access ends"
                    value={formatNextPaymentDue(
                      paidSubscription.nextPayment,
                      paidSubscription.currentPeriodEnd
                    )}
                  />
                ) : isPaused ? null : (
                  <DateValueRow
                    label={isPastDue ? 'Amount due' : 'Next payment'}
                    value={formatNextPaymentAmount(
                      paidSubscription.nextPayment,
                      paidSubscription.currencyCode ?? undefined
                    )}
                    date={formatNextPaymentDue(
                      paidSubscription.nextPayment,
                      paidSubscription.currentPeriodEnd
                    )}
                  />
                )}
              </>
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

        {subscription && !paidSubscription && <SubscribeButton />}

        {paidSubscription && <ManageBillingButton isPastDue={isPastDue} />}

        {paidSubscription &&
          (isPaused || paidSubscription.cancelAtPeriodEnd) && (
            <ResumeButton
              isPaused={isPaused}
              onResumed={() => subscriptionQuery.refetch()}
            />
          )}

        {paidSubscription &&
          !isPaused &&
          !paidSubscription.cancelAtPeriodEnd && (
            <ChangePlanButton
              plans={pricingQuery.data?.plans}
              subscription={{
                plan: paidSubscription.plan,
                interval: paidSubscription.billingInterval,
                status: paidSubscription.status,
                currentPeriodEnd: paidSubscription.currentPeriodEnd,
                cancelAtPeriodEnd: paidSubscription.cancelAtPeriodEnd,
                nextPayment: paidSubscription.nextPayment,
                currencyCode: paidSubscription.currencyCode,
              }}
              isBusy={!!pendingTarget}
              onChangeSubmitted={setPendingTarget}
              onResumed={() => subscriptionQuery.refetch()}
            />
          )}

        {subscriptionQuery.error && !subscription && <ManageBillingButton />}
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
