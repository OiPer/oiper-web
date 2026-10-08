/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { Loading } from '@/components/shared/loading'
import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccountMutation } from '@/features/auth/web-session'
import {
  describeTodayCharge,
  getConfirmLabel,
  getRegularPriceDetail,
} from '@/features/billing/change-plan-pricing'
import {
  findCatalogEntry,
  useResumeSubscription,
  type ActiveSubscription,
  type PlanCatalogEntry,
  type PlanChangeTarget,
} from '@/features/billing/use-checkout'
import { logComplete, logError } from '@/lib/analytics'
import { isAppErrorEnvelope } from '@/lib/api/error'
import type { components } from '@/lib/api/schema'
import {
  formatCurrencyFromCents,
  formatDate,
  formatLabel,
  intervalDisplayName,
  planDisplayName,
  subscriptionPlanLabel,
} from '@/lib/format'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type PricingPlan = components['schemas']['PricingPlan']

const PLAN_OPTIONS_ORDER: PlanChangeTarget[] = [
  { plan: 'PRO', interval: 'MONTHLY' },
  { plan: 'PRO', interval: 'YEARLY' },
  { plan: 'MAX', interval: 'MONTHLY' },
  { plan: 'MAX', interval: 'YEARLY' },
]

function optionKey(target: PlanChangeTarget) {
  return `${target.plan}-${target.interval}`
}

function describePlanChangeError(error: unknown, fallback: string): string {
  const code = isAppErrorEnvelope(error) ? error.error.code : null
  switch (code) {
    case 'BILLING_PLAN_CHANGE_NOT_ALLOWED':
    case 'BILLING_PAYMENT_FAILED':
      return isAppErrorEnvelope(error) ? error.error.message : fallback
    case 'BILLING_SUBSCRIPTION_NOT_FOUND':
      return "Couldn't find an active subscription for this account"
    default:
      return fallback
  }
}

function describePreviewError(error: unknown) {
  return describePlanChangeError(error, "Couldn't preview this plan change")
}

function SummaryRow(props: {
  label: string
  detail?: string
  value: React.ReactNode
  emphasis?: 'credit'
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <div className="min-w-0">
        <p className="text-muted-foreground font-medium">{props.label}</p>
        {props.detail && (
          <p className="text-muted-foreground text-xs">{props.detail}</p>
        )}
      </div>
      <p
        className={cn(
          'shrink-0 font-semibold tabular-nums',
          props.emphasis === 'credit' &&
            'text-emerald-600 dark:text-emerald-400'
        )}
      >
        {props.emphasis === 'credit' ? '+' : ''}
        {props.value}
      </p>
    </div>
  )
}

function SummaryRowSkeleton(props: {
  labelWidth: string
  detailWidth?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
      <div className="min-w-0 space-y-1.5">
        <Skeleton className={`h-4 ${props.labelWidth}`} />
        {props.detailWidth && (
          <Skeleton className={`h-3 ${props.detailWidth}`} />
        )}
      </div>
      <Skeleton className="h-4 w-14 shrink-0" />
    </div>
  )
}

function PlanOption(props: { entry: PlanCatalogEntry; isCurrent: boolean }) {
  const key = optionKey(props.entry)
  const isYearly = props.entry.interval === 'YEARLY'

  return (
    <label
      htmlFor={key}
      className="has-data-[state=checked]:bg-accent flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-4 py-2.5 transition-colors"
    >
      <span className="flex items-center gap-3">
        <RadioGroupItem
          id={key}
          value={key}
          className={cn(
            props.isCurrent &&
              'data-[state=unchecked]:border-emerald-500 data-[state=unchecked]:bg-emerald-500'
          )}
        />
        <span className="text-sm font-medium">
          {planDisplayName(props.entry.plan)} ·{' '}
          {intervalDisplayName(props.entry.interval)}
        </span>
      </span>
      <span className="flex shrink-0 items-baseline gap-2">
        <span className="text-sm font-semibold tabular-nums">
          {formatCurrencyFromCents(props.entry.effectiveMonthlyCents)} / month
        </span>
        {isYearly && (
          <span className="text-muted-foreground text-xs tabular-nums">
            {formatCurrencyFromCents(props.entry.priceAmountCents)} / year
          </span>
        )}
      </span>
    </label>
  )
}

interface ChangePlanDialogProps {
  location: string
  open: boolean
  onOpenChange: (open: boolean) => void
  plans: PricingPlan[] | undefined
  currentSubscription: ActiveSubscription
  initialTarget?: PlanChangeTarget | null
  onChangeSubmitted: (target: PlanChangeTarget) => void
  refetchSubscription: () => Promise<{
    data?: components['schemas']['SubscriptionAccountView'] | undefined
  }>
}

export function ChangePlanDialog({
  location,
  open,
  onOpenChange,
  plans,
  currentSubscription,
  initialTarget,
  onChangeSubmitted,
  refetchSubscription,
}: ChangePlanDialogProps) {
  const options = PLAN_OPTIONS_ORDER.map((target) =>
    findCatalogEntry(plans, target.plan, target.interval)
  ).filter((entry): entry is PlanCatalogEntry => !!entry)

  const optionKeys = new Set(options.map(optionKey))
  const initialKey =
    initialTarget && optionKeys.has(optionKey(initialTarget))
      ? optionKey(initialTarget)
      : null
  const defaultOption =
    options.find(
      (entry) =>
        entry.plan !== currentSubscription.plan ||
        entry.interval !== currentSubscription.interval
    ) ?? options[0]
  const defaultKey =
    initialKey ?? (defaultOption ? optionKey(defaultOption) : null)
  const [selectedKey, setSelectedKey] = useState(defaultKey)

  const previewMutation = useAccountMutation(
    'post',
    '/v1/account/subscription/upgrade/preview'
  )

  type PreviewData = NonNullable<typeof previewMutation.data>

  const [previewState, setPreviewState] = useState<
    | { key: string; status: 'pending' }
    | { key: string; status: 'error'; error: unknown }
    | { key: string; status: 'success'; data: PreviewData }
    | null
  >(null)

  const changeMutation = useAccountMutation(
    'post',
    '/v1/account/subscription/upgrade'
  )

  const { resumeSubscription, isResuming } =
    useResumeSubscription(refetchSubscription)

  const selected =
    options.find((entry) => optionKey(entry) === selectedKey) ?? null
  const isCurrentSelected =
    !!selected &&
    selected.plan === currentSubscription.plan &&
    selected.interval === currentSubscription.interval
  const previewTarget = isCurrentSelected ? null : selected

  useEffect(() => {
    if (open) setSelectedKey(defaultKey)
  }, [open])

  useEffect(() => {
    if (!open || !selected || isCurrentSelected) {
      setPreviewState(null)
      return
    }

    const target = selected
    const key = optionKey(target)
    let cancelled = false

    setPreviewState({ key, status: 'pending' })

    async function runPreview() {
      try {
        const data = await previewMutation.mutateAsync({
          body: {
            targetPlan: target.plan,
            targetInterval: target.interval,
          },
        })
        if (!cancelled) setPreviewState({ key, status: 'success', data })
      } catch (error) {
        if (!cancelled) setPreviewState({ key, status: 'error', error })
      }
    }

    runPreview()

    return () => {
      cancelled = true
    }
  }, [
    open,
    selectedKey,
    currentSubscription.cancelAtPeriodEnd,
    currentSubscription.status,
  ])

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      previewMutation.reset()
      changeMutation.reset()
    }

    onOpenChange(nextOpen)
  }

  const currentPreview = previewState?.key === selectedKey ? previewState : null
  const preview =
    currentPreview?.status === 'success' ? currentPreview.data : undefined
  const previewError =
    currentPreview?.status === 'error' ? currentPreview.error : null
  const isPreviewPending =
    !!previewTarget && (!currentPreview || currentPreview.status === 'pending')

  async function handleConfirm() {
    if (
      !selected ||
      isCurrentSelected ||
      isPreviewPending ||
      preview?.kind === 'BLOCKED'
    ) {
      return
    }

    try {
      await changeMutation.mutateAsync({
        body: {
          targetPlan: selected.plan,
          targetInterval: selected.interval,
        },
      })

      const isScheduled = preview?.kind === 'SCHEDULED'
      logComplete('plan_change', location, {
        plan: selected.plan.toLowerCase(),
        interval: selected.interval.toLowerCase(),
        outcome: isScheduled ? 'scheduled' : 'immediate',
      })
      toast.success(
        isScheduled
          ? 'Plan change scheduled — it takes effect at the end of your current billing period'
          : 'Plan change requested — this can take a few seconds to show up',
        { id: 'plan-change' }
      )
      if (isScheduled) void refetchSubscription()
      else onChangeSubmitted(selected)
      handleOpenChange(false)
    } catch (error) {
      logError('plan_change', location, {
        plan: selected.plan.toLowerCase(),
        interval: selected.interval.toLowerCase(),
        error_type: isAppErrorEnvelope(error) ? error.error.code : 'unknown',
      })
      toast.error(describePlanChangeError(error, "Couldn't change your plan"), {
        id: 'plan-change',
      })
    }
  }

  async function handleResume() {
    try {
      const resumed = await resumeSubscription()
      logComplete('subscription_resume', location, {
        outcome: resumed ? 'resumed' : 'processing',
      })

      if (!resumed) {
        toast.info(
          "Still processing — check back in a moment if this doesn't update",
          { id: 'resume' }
        )
      }
    } catch (error) {
      logError('subscription_resume', location, {
        error_type: isAppErrorEnvelope(error) ? error.error.code : 'unknown',
      })
      toast.error(
        describePlanChangeError(error, "Couldn't reverse the cancellation"),
        { id: 'resume' }
      )
    }
  }

  const previewRows = preview && preview.kind !== 'BLOCKED' ? preview : null
  const todayRow = previewRows ? describeTodayCharge(previewRows) : null

  const confirmLabel = previewRows
    ? getConfirmLabel(previewRows.kind)
    : 'Confirm change'

  return (
    <ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
      <ResponsiveDialog.Content>
        <ResponsiveDialog.Header>
          <ResponsiveDialog.Title className="font-medium">
            Change plan
          </ResponsiveDialog.Title>
          <ResponsiveDialog.Description className="font-normal">
            Choose a new plan for your subscription.
          </ResponsiveDialog.Description>
        </ResponsiveDialog.Header>

        <ResponsiveDialog.Body className="flex flex-col gap-4">
          <RadioGroup
            value={selectedKey ?? undefined}
            onValueChange={setSelectedKey}
          >
            {options.map((entry) => (
              <PlanOption
                key={optionKey(entry)}
                entry={entry}
                isCurrent={
                  entry.plan === currentSubscription.plan &&
                  entry.interval === currentSubscription.interval
                }
              />
            ))}
          </RadioGroup>

          <div className="min-h-16">
            {isCurrentSelected && (
              <div className="divide-y rounded-lg border">
                <SummaryRow
                  label="Status"
                  value={formatLabel(currentSubscription.status)}
                />
                <SummaryRow
                  label={
                    currentSubscription.cancelAtPeriodEnd
                      ? 'Access ends'
                      : 'Renews'
                  }
                  value={
                    currentSubscription.currentPeriodEnd
                      ? formatDate(currentSubscription.currentPeriodEnd)
                      : '-'
                  }
                />
                {!currentSubscription.cancelAtPeriodEnd && (
                  <SummaryRow
                    label="Amount"
                    value={
                      currentSubscription.nextPayment
                        ? formatCurrencyFromCents(
                            Number(currentSubscription.nextPayment.amount),
                            currentSubscription.currencyCode ?? undefined
                          )
                        : '-'
                    }
                  />
                )}
              </div>
            )}

            {previewTarget &&
              !isPreviewPending &&
              preview?.kind === 'BLOCKED' && (
                <Alert className="border-warning/40 bg-warning/5">
                  <AlertDescription className="space-y-3">
                    {preview.reason === 'GIFT' && (
                      <p>
                        Your gift runs until{' '}
                        {preview.currentPeriodEnd
                          ? formatDate(preview.currentPeriodEnd)
                          : 'it ends'}{' '}
                        so you can change your plan after that
                      </p>
                    )}
                    {preview.reason === 'PAUSED' && (
                      <p>
                        Your subscription is paused so resume it to switch plans
                      </p>
                    )}
                    {preview.reason === 'ENDING' && (
                      <p>
                        Your subscription is scheduled to cancel
                        {preview.currentPeriodEnd &&
                          ` on ${formatDate(preview.currentPeriodEnd)}`}{' '}
                        so keep it active to switch plans
                      </p>
                    )}
                    {preview.reason !== 'GIFT' && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => void handleResume()}
                        disabled={isResuming}
                      >
                        <Loading loading={isResuming}>
                          {preview.reason === 'PAUSED'
                            ? 'Resume subscription'
                            : 'Keep subscription'}
                        </Loading>
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

            {previewTarget && isPreviewPending && (
              <div className="divide-y rounded-lg border">
                <SummaryRowSkeleton labelWidth="w-20" />
                <SummaryRowSkeleton labelWidth="w-16" />
                <SummaryRowSkeleton labelWidth="w-28" detailWidth="w-40" />
                <SummaryRowSkeleton labelWidth="w-24" detailWidth="w-20" />
              </div>
            )}

            {previewTarget && !isPreviewPending && !!previewError && (
              <Alert
                variant="destructive"
                className="border-destructive/40 bg-destructive/5"
              >
                <AlertDescription>
                  {describePreviewError(previewError)}
                </AlertDescription>
              </Alert>
            )}

            {previewTarget && !isPreviewPending && previewRows && (
              <div className="divide-y rounded-lg border">
                <SummaryRow
                  label="New plan"
                  value={subscriptionPlanLabel(
                    previewTarget.plan,
                    previewTarget.interval
                  )}
                />
                <SummaryRow
                  label="Effective"
                  value={formatDate(previewRows.effectiveAt)}
                />

                {todayRow && (
                  <SummaryRow
                    label={todayRow.label}
                    detail={todayRow.detail}
                    value={todayRow.value}
                    emphasis={todayRow.emphasis}
                  />
                )}

                {previewRows.nextPayment && (
                  <SummaryRow
                    label="Next payment"
                    detail={formatDate(previewRows.nextPayment.dueAt)}
                    value={formatCurrencyFromCents(
                      Number(previewRows.nextPayment.amount),
                      previewRows.currencyCode
                    )}
                  />
                )}

                {previewRows.kind === 'IMMEDIATE' &&
                  previewRows.regularAmount && (
                    <SummaryRow
                      label="Regular price"
                      detail={getRegularPriceDetail(previewTarget.interval)}
                      value={formatCurrencyFromCents(
                        Number(previewRows.regularAmount),
                        previewRows.currencyCode
                      )}
                    />
                  )}
              </div>
            )}
          </div>
        </ResponsiveDialog.Body>

        <ResponsiveDialog.Footer>
          <ResponsiveDialog.Close asChild>
            <Button
              variant="outline"
              type="button"
              disabled={changeMutation.isPending}
            >
              Cancel
            </Button>
          </ResponsiveDialog.Close>

          <Button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={
              isCurrentSelected ||
              preview?.kind === 'BLOCKED' ||
              isPreviewPending ||
              !!previewError ||
              changeMutation.isPending
            }
          >
            <Loading loading={changeMutation.isPending}>{confirmLabel}</Loading>
          </Button>
        </ResponsiveDialog.Footer>
      </ResponsiveDialog.Content>
    </ResponsiveDialog>
  )
}
