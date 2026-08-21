'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button, Loading } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'
import { getAccountMutationHeaders } from '@/features/auth/web-session'
import {
  describeTodayCharge,
  getConfirmLabel,
  getRegularPriceDetail,
} from '@/features/billing/plan-change-copy'
import {
  findCatalogEntry,
  useResumeSubscription,
  type ActiveSubscription,
  type PlanCatalogEntry,
  type PlanChangeTarget,
} from '@/features/billing/use-checkout'
import { $api } from '@/lib/api/client'
import { getAppErrorCode } from '@/lib/api/error'
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

function describePreviewError(error: unknown) {
  const code = getAppErrorCode<
    'post',
    '/v1/account/subscription/upgrade/preview'
  >(error)
  switch (code) {
    case 'BILLING_PLAN_CHANGE_NOT_ALLOWED':
      return 'This plan change is not available right now'
    case 'BILLING_SUBSCRIPTION_NOT_FOUND':
      return "Couldn't find an active subscription for this account"
    default:
      return "Couldn't preview this plan change"
  }
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
  const monthlyCents = isYearly
    ? Math.round(props.entry.priceAmountCents / 12)
    : props.entry.priceAmountCents

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
          {formatCurrencyFromCents(monthlyCents)} / month
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
  open: boolean
  onOpenChange: (open: boolean) => void
  plans: PricingPlan[] | undefined
  currentSubscription: ActiveSubscription
  initialTarget?: PlanChangeTarget | null
  onChangeSubmitted: (target: PlanChangeTarget) => void
  onResumed: () => Promise<{
    data?: components['schemas']['SubscriptionAccountView'] | undefined
  }>
}

export function ChangePlanDialog({
  open,
  onOpenChange,
  plans,
  currentSubscription,
  initialTarget,
  onChangeSubmitted,
  onResumed,
}: ChangePlanDialogProps) {
  const options = PLAN_OPTIONS_ORDER.map((target) =>
    findCatalogEntry(plans, target.plan, target.interval)
  ).filter((entry): entry is PlanCatalogEntry => !!entry)

  const optionKeys = new Set(options.map(optionKey))
  const initialKey =
    initialTarget && optionKeys.has(optionKey(initialTarget))
      ? optionKey(initialTarget)
      : null
  const defaultKey =
    initialKey ?? (options[0] ? optionKey(PLAN_OPTIONS_ORDER[0]) : null)
  const [selectedKey, setSelectedKey] = useState(defaultKey)

  const previewMutation = $api.useMutation(
    'post',
    '/v1/account/subscription/upgrade/preview'
  )

  const changeMutation = $api.useMutation(
    'post',
    '/v1/account/subscription/upgrade'
  )

  const { resumeSubscription, isResuming: isSubmittingResume } =
    useResumeSubscription()
  const [isWaitingForResume, setIsWaitingForResume] = useState(false)
  const isResuming = isSubmittingResume || isWaitingForResume

  const selectedOption = options.find(
    (entry) => optionKey(entry) === selectedKey
  )
  const selectedTarget: PlanChangeTarget | null = selectedOption ?? null
  const isCurrentSelected =
    !!selectedTarget &&
    selectedTarget.plan === currentSubscription.plan &&
    selectedTarget.interval === currentSubscription.interval
  const targetForPreview = isCurrentSelected ? null : selectedTarget

  useEffect(() => {
    if (open) setSelectedKey(defaultKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open || !selectedTarget || isCurrentSelected) return

    const target = selectedTarget

    async function runPreview() {
      try {
        const headers = await getAccountMutationHeaders()
        await previewMutation.mutateAsync({
          body: {
            targetPlan: target.plan,
            targetInterval: target.interval,
          },
          params: { header: headers },
        })
      } catch {}
    }

    void runPreview()
    // currentSubscription.cancelAtPeriodEnd isn't read above, but it's kept
    // as a dep so resuming a scheduled cancellation re-runs this preview —
    // otherwise a stale BLOCKED result would linger until selectedKey changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, selectedKey, currentSubscription.cancelAtPeriodEnd])

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      previewMutation.reset()
      changeMutation.reset()
    }

    onOpenChange(nextOpen)
  }

  const preview = previewMutation.data

  async function handleConfirm() {
    if (!selectedTarget || isCurrentSelected || preview?.kind === 'BLOCKED') {
      return
    }

    try {
      const headers = await getAccountMutationHeaders()
      await changeMutation.mutateAsync({
        body: {
          targetPlan: selectedTarget.plan,
          targetInterval: selectedTarget.interval,
        },
        params: { header: headers },
      })

      toast.success(
        'Plan change requested — this can take a few seconds to show up'
      )
      onChangeSubmitted(selectedTarget)
      handleOpenChange(false)
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/account/subscription/upgrade'>(
        error
      )
      switch (code) {
        case 'BILLING_PLAN_CHANGE_NOT_ALLOWED':
          return toast.error('This plan change is not available right now')
        case 'BILLING_SUBSCRIPTION_NOT_FOUND':
          return toast.error(
            "Couldn't find an active subscription for this account"
          )
        default:
          return toast.error("Couldn't change your plan")
      }
    }
  }

  async function handleResume() {
    try {
      await resumeSubscription()

      setIsWaitingForResume(true)
      for (let attempt = 0; attempt < 8; attempt++) {
        const result = await onResumed()
        const stillPaid = result.data?.plan !== 'FREE' ? result.data : undefined
        if (stillPaid?.cancelAtPeriodEnd === false) break
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }
    } catch {
      toast.error("Couldn't reverse the cancellation")
    } finally {
      setIsWaitingForResume(false)
    }
  }

  const previewRows = preview && preview.kind !== 'BLOCKED' ? preview : null
  const todayRow = previewRows ? describeTodayCharge(previewRows) : null

  const confirmLabel = previewRows
    ? getConfirmLabel(previewRows.kind)
    : 'Confirm change'
  const currentCatalogEntry = findCatalogEntry(
    plans,
    currentSubscription.plan,
    currentSubscription.interval
  )

  return (
    <ResponsiveDialog open={open} onOpenChange={handleOpenChange}>
      <ResponsiveDialog.Content>
        <div className="space-y-1">
          <ResponsiveDialog.Title className="font-medium">
            Change plan
          </ResponsiveDialog.Title>
          <ResponsiveDialog.Description className="font-normal">
            Choose a new plan for your subscription.
          </ResponsiveDialog.Description>
        </div>

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
                    currentCatalogEntry
                      ? formatCurrencyFromCents(
                          currentCatalogEntry.priceAmountCents
                        )
                      : '-'
                  }
                />
              )}
            </div>
          )}

          {targetForPreview &&
            !previewMutation.isPending &&
            preview?.kind === 'BLOCKED' && (
              <Alert className="border-warning/40 bg-warning/5">
                <AlertDescription className="space-y-3">
                  <p>
                    Your subscription is scheduled to cancel
                    {preview.currentPeriodEnd &&
                      ` on ${formatDate(preview.currentPeriodEnd)}`}{' '}
                    so keep it active to switch plans
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void handleResume()}
                    disabled={isResuming}
                  >
                    <Loading loading={isResuming}>Keep subscription</Loading>
                  </Button>
                </AlertDescription>
              </Alert>
            )}

          {targetForPreview && previewMutation.isPending && (
            <div className="divide-y rounded-lg border">
              <SummaryRowSkeleton labelWidth="w-20" />
              <SummaryRowSkeleton labelWidth="w-16" />
              <SummaryRowSkeleton labelWidth="w-28" detailWidth="w-40" />
              <SummaryRowSkeleton labelWidth="w-24" detailWidth="w-20" />
            </div>
          )}

          {targetForPreview &&
            !previewMutation.isPending &&
            !!previewMutation.error && (
              <Alert
                variant="destructive"
                className="border-destructive/40 bg-destructive/5"
              >
                <AlertDescription>
                  {describePreviewError(previewMutation.error)}
                </AlertDescription>
              </Alert>
            )}

          {targetForPreview && !previewMutation.isPending && previewRows && (
            <div className="divide-y rounded-lg border">
              <SummaryRow
                label="New plan"
                value={subscriptionPlanLabel(
                  targetForPreview.plan,
                  targetForPreview.interval
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
                    detail={getRegularPriceDetail(targetForPreview.interval)}
                    value={formatCurrencyFromCents(
                      Number(previewRows.regularAmount),
                      previewRows.currencyCode
                    )}
                  />
                )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
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
              previewMutation.isPending ||
              !!previewMutation.error ||
              changeMutation.isPending
            }
          >
            <Loading loading={changeMutation.isPending}>{confirmLabel}</Loading>
          </Button>
        </DialogFooter>
      </ResponsiveDialog.Content>
    </ResponsiveDialog>
  )
}
