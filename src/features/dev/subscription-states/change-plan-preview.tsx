import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button, Loading } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { ChangePlanState, SummaryRowFixture } from './dummy-data'

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
    <div className="flex items-center justify-between gap-4 px-4 py-3">
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

export function ChangePlanPreview(props: { state: ChangePlanState }) {
  const { state } = props

  return (
    <div className="bg-popover flex w-full flex-col gap-4 rounded-xl border p-4 shadow-sm md:p-6">
      <div className="space-y-1">
        <p className="text-sm font-medium">Change plan</p>
        <p className="text-muted-foreground text-sm">
          Choose a new plan for your subscription.
        </p>
      </div>

      <RadioGroup value={state.options.find((o) => o.isSelected)?.label}>
        {state.options.map((option) => (
          <label
            key={option.label}
            className="has-data-[state=checked]:bg-accent flex items-center justify-between gap-4 rounded-lg border px-4 py-2.5"
          >
            <span className="flex items-center gap-3">
              <RadioGroupItem
                value={option.label}
                className={cn(
                  option.isCurrent &&
                    'data-[state=unchecked]:border-emerald-500 data-[state=unchecked]:bg-emerald-500'
                )}
              />
              <span className="text-sm font-medium">{option.label}</span>
            </span>
            <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
              {option.priceLine}
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

        {state.summary.kind === 'cancel-blocked' && (
          <Alert className="border-warning/40 bg-warning/5">
            <AlertDescription className="space-y-3">
              <p>{state.summary.message}</p>
              <Button type="button" variant="outline" size="sm" disabled>
                Keep subscription
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

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" type="button" disabled>
          Cancel
        </Button>
        <Button type="button" disabled={state.confirmDisabled}>
          <Loading loading={false}>{state.confirmLabel}</Loading>
        </Button>
      </div>
    </div>
  )
}
