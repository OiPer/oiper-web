import { Loading } from '@/components/shared/loading'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import type { ChangePlanState, SummaryRowFixture } from './dummy-data'

// Markup copied 1:1 from ChangePlanDialog in features/billing/change-plan-dialog.tsx,
// rendered as a static frame instead of an overlay — desktop dialog or mobile
// bottom sheet, per the `frame` prop (ResponsiveDialog resolves the same two).
// Keep in sync when the real dialog changes.

function SummaryRow(props: SummaryRowFixture) {
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

function DialogBody(props: { state: ChangePlanState; isDesktop: boolean }) {
  const { state } = props
  const blocked = state.summary.kind === 'blocked' ? state.summary : null
  const selected = state.options.find((option) => option.isSelected)

  return (
    <>
      <div
        className={cn(
          'flex shrink-0 items-start gap-4',
          props.isDesktop ? 'px-6 pt-6 pb-5' : 'p-5'
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-lg leading-none font-medium">Change plan</p>
          <p className="text-muted-foreground text-sm leading-snug font-normal">
            Choose a new plan for your subscription.
          </p>
        </div>
        {props.isDesktop && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:bg-foreground/10 hover:text-foreground -mt-2 -mr-2 shrink-0"
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>

      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain',
          props.isDesktop ? 'px-6 last:pb-6' : 'px-5 last:pb-5'
        )}
      >
        <RadioGroup value={selected?.key}>
          {state.options.map((option) => (
            <label
              key={option.key}
              className="has-data-[state=checked]:bg-accent flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-4 py-2.5 transition-colors"
            >
              <span className="flex items-center gap-3">
                <RadioGroupItem
                  value={option.key}
                  className={cn(
                    option.isCurrent &&
                      'data-[state=unchecked]:border-emerald-500 data-[state=unchecked]:bg-emerald-500'
                  )}
                />
                <span className="text-sm font-medium">{option.label}</span>
              </span>
              <span className="flex shrink-0 items-baseline gap-2">
                <span className="text-sm font-semibold tabular-nums">
                  {option.pricePerMonth}
                </span>
                {option.pricePerYear && (
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {option.pricePerYear}
                  </span>
                )}
              </span>
            </label>
          ))}
        </RadioGroup>

        <div className="min-h-16">
          {state.summary.kind === 'current' && (
            <div className="divide-y rounded-lg border">
              <SummaryRow label="Status" value={state.summary.status} />
              <SummaryRow
                label={state.summary.renewLabel}
                value={state.summary.renewValue}
              />
              {state.summary.amountValue && (
                <SummaryRow label="Amount" value={state.summary.amountValue} />
              )}
            </div>
          )}

          {state.summary.kind === 'loading' && (
            <div className="divide-y rounded-lg border">
              <SummaryRowSkeleton labelWidth="w-20" />
              <SummaryRowSkeleton labelWidth="w-16" />
              <SummaryRowSkeleton labelWidth="w-28" detailWidth="w-40" />
              <SummaryRowSkeleton labelWidth="w-24" detailWidth="w-20" />
            </div>
          )}

          {state.summary.kind === 'error' && (
            <Alert
              variant="destructive"
              className="border-destructive/40 bg-destructive/5"
            >
              <AlertDescription>{state.summary.message}</AlertDescription>
            </Alert>
          )}

          {blocked && (
            <Alert className="border-warning/40 bg-warning/5">
              <AlertDescription className="space-y-3">
                <p>
                  {blocked.reason === 'PAUSED'
                    ? 'Your subscription is paused so resume it to switch plans'
                    : `Your subscription is scheduled to cancel${
                        blocked.periodEnd ? ` on ${blocked.periodEnd}` : ''
                      } so keep it active to switch plans`}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={blocked.resumeLoading}
                >
                  <Loading loading={!!blocked.resumeLoading}>
                    {blocked.reason === 'PAUSED'
                      ? 'Resume subscription'
                      : 'Keep subscription'}
                  </Loading>
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {state.summary.kind === 'preview' && (
            <div className="divide-y rounded-lg border">
              {state.summary.rows.map((row) => (
                <SummaryRow key={row.label} {...row} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          'flex shrink-0 gap-2',
          props.isDesktop ? 'flex-row justify-end p-6' : 'flex-col-reverse p-5'
        )}
      >
        <Button variant="outline" type="button" disabled={state.confirmLoading}>
          Cancel
        </Button>
        <Button type="button" disabled={state.confirmDisabled}>
          <Loading loading={!!state.confirmLoading}>
            {state.confirmLabel}
          </Loading>
        </Button>
      </div>
    </>
  )
}

export function ChangePlanPreview(props: {
  state: ChangePlanState
  frame?: 'desktop' | 'mobile'
}) {
  const isDesktop = (props.frame ?? 'desktop') === 'desktop'

  if (isDesktop) {
    return (
      <div className="bg-background flex w-full flex-col gap-0 overflow-hidden rounded-lg border p-0 shadow-lg sm:max-w-lg">
        <DialogBody state={props.state} isDesktop />
      </div>
    )
  }

  return (
    <div className="bg-background mx-auto flex h-auto w-full max-w-md flex-col rounded-t-lg border-t">
      <div className="bg-muted mx-auto mt-4 h-2 w-25 shrink-0 rounded-full" />
      <DialogBody state={props.state} isDesktop={false} />
    </div>
  )
}
