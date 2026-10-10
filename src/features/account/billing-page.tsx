'use client'

import { Loading } from '@/components/shared/loading'
import { SectionCard } from '@/components/shared/section-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AccountPageHeader } from '@/features/account/components/account-page-header'
import { PlanNote } from '@/features/account/components/plan-note'
import { ChangePlanDialog } from '@/features/billing/change-plan-dialog'
import {
  useCheckoutReturn,
  useOpenBillingPortal,
  usePollUntilPlanChangeLands,
  useResumeSubscription,
  useStartCheckout,
  type ActiveSubscription,
  type PaidSubscriptionView,
  type PlanChangeTarget,
} from '@/features/billing/use-checkout'
import { logClick, logComplete, logError } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import { isAppErrorEnvelope } from '@/lib/api/error'
import type { components } from '@/lib/api/schema'
import {
  formatCurrencyFromCents,
  formatDate,
  formatLabel,
  planDisplayName,
  subscriptionPlanLabel,
} from '@/lib/format'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'

type PricingPlan = components['schemas']['PricingPlan']
type SubscriptionStatus = PaidSubscriptionView['status']
type NextPayment = PaidSubscriptionView['nextPayment']
type AccountGifts = components['schemas']['AccountGiftsView']
type CurrentGift = NonNullable<AccountGifts['current']>

const GIFT_ENDED_NOTE_DAYS = 30

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
  refetchSubscription: () => Promise<{
    data?: components['schemas']['SubscriptionAccountView'] | undefined
  }>
}) {
  const { resumeSubscription, isResuming } = useResumeSubscription(
    props.refetchSubscription
  )

  async function handleResume() {
    try {
      const resumed = await resumeSubscription()
      logComplete('subscription_resume', 'billing', {
        outcome: resumed ? 'resumed' : 'processing',
      })

      if (!resumed) {
        return toast.info(
          "Still processing — check back in a moment if this doesn't update",
          { id: 'resume' }
        )
      }
      toast.success(
        props.isPaused
          ? 'Your subscription is active again'
          : 'Your subscription will keep renewing',
        { id: 'resume' }
      )
    } catch (error) {
      logError('subscription_resume', 'billing', {
        error_type: isAppErrorEnvelope(error) ? error.error.code : 'unknown',
      })
      toast.error(
        isAppErrorEnvelope(error)
          ? error.error.message
          : props.isPaused
            ? "Couldn't resume your subscription"
            : "Couldn't keep your subscription",
        { id: 'resume' }
      )
    }
  }

  return (
    <Button disabled={isResuming} onClick={() => void handleResume()}>
      <Loading loading={isResuming}>
        {props.isPaused ? 'Resume subscription' : 'Keep subscription'}
      </Loading>
    </Button>
  )
}

function ChangePlanButton(props: {
  plans: PricingPlan[] | undefined
  subscription: ActiveSubscription
  giftOnly: boolean
  isBusy: boolean
  onChangeSubmitted: (target: PlanChangeTarget) => void
  refetchSubscription: () => Promise<{
    data?: components['schemas']['SubscriptionAccountView'] | undefined
  }>
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        disabled={props.isBusy}
        onClick={() => {
          logClick('plan_change', 'billing')
          setOpen(true)
        }}
      >
        <Loading loading={props.isBusy}>Change plan</Loading>
      </Button>

      <ChangePlanDialog
        location="billing"
        open={open}
        onOpenChange={setOpen}
        plans={props.plans}
        currentSubscription={props.subscription}
        giftOnly={props.giftOnly}
        onChangeSubmitted={(target) => {
          props.onChangeSubmitted(target)
          setOpen(false)
        }}
        refetchSubscription={props.refetchSubscription}
      />
    </>
  )
}

function GiftPlanCard(props: {
  gift: CurrentGift
  plans: PricingPlan[] | undefined
  refetchSubscription: () => Promise<{
    data?: components['schemas']['SubscriptionAccountView'] | undefined
  }>
}) {
  const plan = planDisplayName(props.gift.plan)
  const endsAt = formatDate(props.gift.endsAt)
  const { startCheckout, pendingCheckout } = useStartCheckout()

  return (
    <SectionCard id="current-plan" className="gap-4">
      <div className="px-(--x-padding)">
        <p className="text-muted-foreground mb-1 text-sm font-medium">
          Subscription
        </p>

        <div className="divide-y">
          <Row label="Plan" value={plan} />
          <Row label="Gift from OiPer" value={`Until ${endsAt}`} />
          <Row label="After your gift" value="Free" />
        </div>

        <p className="text-muted-foreground pt-1 text-sm">
          Continue with {plan} after your gift ends by setting up your
          subscription in advance.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t px-(--x-padding) py-4">
        <Button
          variant="outline"
          disabled={!!pendingCheckout}
          onClick={() => {
            logClick('gift_keep_plan', 'billing', {
              plan: props.gift.plan.toLowerCase(),
            })
            void startCheckout('PADDLE', props.gift.plan, 'MONTHLY')
          }}
        >
          <Loading loading={!!pendingCheckout}>Keep {plan} after Gift</Loading>
        </Button>

        <ChangePlanButton
          plans={props.plans}
          subscription={{
            plan: props.gift.plan,
            interval: 'MONTHLY',
            status: 'ACTIVE',
            currentPeriodEnd: props.gift.endsAt,
            cancelAtPeriodEnd: false,
            nextPayment: null,
            currencyCode: null,
          }}
          giftOnly
          isBusy={!!pendingCheckout}
          onChangeSubmitted={() => undefined}
          refetchSubscription={props.refetchSubscription}
        />
      </div>
    </SectionCard>
  )
}

function GiftEndedNote(props: { lastEnded: AccountGifts['lastEnded'] }) {
  if (!props.lastEnded) return null

  const daysSince =
    (Date.now() - new Date(props.lastEnded.endedAt).getTime()) / 86_400_000
  if (daysSince > GIFT_ENDED_NOTE_DAYS) return null

  return (
    <p className="text-muted-foreground mb-4 text-sm">
      Your {planDisplayName(props.lastEnded.plan)} gift ended on{' '}
      {formatDate(props.lastEnded.endedAt)}. Thanks for giving it a try.
    </p>
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
  const giftsQuery = $api.useQuery(
    'get',
    '/v1/account/gifts',
    subscriptionRequest,
    { retry: false, staleTime: 30_000 }
  )
  const gift = giftsQuery.data?.current ?? null
  const { pendingTarget, setPendingTarget } = usePollUntilPlanChangeLands(
    subscriptionQuery.refetch
  )
  const { isProcessing: isCheckoutProcessing } = useCheckoutReturn(
    subscriptionQuery.refetch
  )

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

  if (subscriptionQuery.isPending || giftsQuery.isPending) {
    return <Skeleton className="h-40 w-full rounded-xl" />
  }

  if (subscription && !paidSubscription && isCheckoutProcessing) {
    return <PlanNote variant="setting-up" />
  }

  if (subscription && !paidSubscription && gift) {
    return (
      <GiftPlanCard
        gift={gift}
        plans={pricingQuery.data?.plans}
        refetchSubscription={() => subscriptionQuery.refetch()}
      />
    )
  }

  if (subscription && !paidSubscription) {
    return (
      <>
        <GiftEndedNote lastEnded={giftsQuery.data?.lastEnded ?? null} />
        <PlanNote variant="free" />
      </>
    )
  }

  return (
    <SectionCard id="current-plan" className="gap-4">
      <div className="px-(--x-padding)">
        <p className="text-muted-foreground mb-1 text-sm font-medium">
          Subscription
        </p>

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

        {paidSubscription && (
          <div className="divide-y">
            {gift && (
              <Row
                label="Gift from OiPer"
                value={`${planDisplayName(gift.plan)} until ${formatDate(gift.endsAt)}`}
              />
            )}
            <Row
              label={
                gift && paidSubscription.inFreePeriod
                  ? 'After your gift'
                  : 'Plan'
              }
              value={subscriptionPlanLabel(
                paidSubscription.plan,
                paidSubscription.billingInterval
              )}
            />
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
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t px-(--x-padding) py-4">
        {paidSubscription && <ManageBillingButton isPastDue={isPastDue} />}

        {paidSubscription &&
          (isPaused || paidSubscription.cancelAtPeriodEnd) && (
            <ResumeButton
              isPaused={isPaused}
              refetchSubscription={() => subscriptionQuery.refetch()}
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
              giftOnly={false}
              isBusy={!!pendingTarget}
              onChangeSubmitted={setPendingTarget}
              refetchSubscription={() => subscriptionQuery.refetch()}
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
