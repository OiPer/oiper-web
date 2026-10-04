import { Skeleton } from '@/components/ui/skeleton'
import { PlanNote } from '@/features/account/components/plan-note'
import { cn } from '@/lib/utils'
import type { UsageCardState } from './dummy-data'

// Markup copied 1:1 from UsagePage in features/account/usage-page.tsx — keep
// both in sync when the real card changes.

function UsageMeter(props: {
  used: string
  allowance: string
  percent: number
}) {
  return (
    <div>
      <div
        role="meter"
        aria-label="Daily transcription allowance used"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={props.percent}
        aria-valuetext={`${props.used} of ${props.allowance} used`}
        className="bg-secondary h-2.5 w-full overflow-hidden rounded-full"
      >
        <div
          className={cn(
            'h-full rounded-full',
            props.percent >= 100
              ? 'bg-destructive'
              : props.percent >= 80
                ? 'bg-warning'
                : 'bg-primary'
          )}
          style={{ width: `${props.percent}%` }}
        />
      </div>
      <div className="mt-2.5 flex justify-between gap-4 text-sm">
        <span className="text-muted-foreground">{props.used} used</span>
        <span className="text-muted-foreground">
          {props.allowance} daily allowance
        </span>
      </div>
    </div>
  )
}

function UsageStat(props: { label: string; value: string }) {
  return (
    <div className="last:text-right">
      <dt className="text-muted-foreground text-sm">{props.label}</dt>
      <dd className="mt-0.5 font-medium">{props.value}</dd>
    </div>
  )
}

export function UsageCardPreview(props: { card: UsageCardState['card'] }) {
  const { card } = props

  if (card.note) return <PlanNote variant={card.note} />

  if (card.loading) {
    return (
      <div className="bg-card mx-auto w-full max-w-6xl rounded-xl border p-4 shadow-sm sm:p-6">
        <Skeleton className="h-2.5 w-full" />
        <div className="mt-6 flex justify-between gap-4">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    )
  }

  if (card.error) {
    return (
      <div className="bg-card text-card-foreground mx-auto w-full max-w-6xl rounded-xl border p-4 shadow-sm sm:p-6">
        <p className="text-destructive text-sm">
          Couldn&apos;t load your usage
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-muted-foreground mb-2 text-sm">
        Your cloud transcription usage on the {card.planLabel} plan
      </p>
      <section className="bg-card text-card-foreground mx-auto w-full max-w-6xl rounded-xl border p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
          {!card.meter && (
            <div className="shrink-0">
              <p className="text-muted-foreground text-sm">
                {card.headlineLabel}
              </p>
              <p className="mt-0.5 text-lg font-semibold">{card.headline}</p>
            </div>
          )}
          {card.meter && (
            <div className="w-full flex-1">
              <UsageMeter
                used={card.meter.used}
                allowance={card.meter.allowance}
                percent={card.meter.usedPercent}
              />
            </div>
          )}
        </div>

        <dl className="mt-6 flex justify-between gap-4">
          <UsageStat label="Recordings" value={card.requests} />
          <UsageStat label="Resets in" value={card.resetsIn} />
        </dl>
      </section>
    </div>
  )
}
