import { Loading } from '@/components/shared/loading'
import { SectionCard } from '@/components/shared/section-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PlanNote } from '@/features/account/components/plan-note'
import type { ReactNode } from 'react'
import type { CurrentPlanCardState } from './dummy-data'

// Markup copied 1:1 from CurrentPlan in features/account/billing-page.tsx —
// keep both in sync when the real card changes.

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

export function CurrentPlanCardPreview(props: {
  card: CurrentPlanCardState['card']
}) {
  const { card } = props
  const isAccessEnding = card.payment?.label === 'Access ends'

  if (card.note) {
    return (
      <div>
        {card.endedNote && (
          <p className="text-muted-foreground mb-4 text-sm">{card.endedNote}</p>
        )}
        <PlanNote variant={card.note} />
      </div>
    )
  }

  if (card.loading) return <Skeleton className="h-40 w-full rounded-xl" />

  return (
    <SectionCard className="gap-4">
      <div className="px-(--x-padding)">
        <p className="text-muted-foreground mb-1 text-sm font-medium">
          Subscription
        </p>

        {card.error === 'none' && (
          <p className="text-destructive py-3 text-sm">
            Couldn&apos;t load your subscription. You can still manage billing
            below.
          </p>
        )}

        {card.error === 'stale' && (
          <p className="text-muted-foreground py-3 text-sm">
            Couldn&apos;t refresh — showing your last known status.
          </p>
        )}

        {card.pastDueAlert && (
          <Alert variant="destructive" className="my-2">
            <AlertTitle>Your last payment failed</AlertTitle>
            <AlertDescription>
              Update your payment method to restore access.
            </AlertDescription>
          </Alert>
        )}

        {card.pausedAlert && (
          <Alert className="my-2">
            <AlertTitle>Your subscription is paused</AlertTitle>
            <AlertDescription>
              Cloud features are off and you won&apos;t be charged until you
              resume it.
            </AlertDescription>
          </Alert>
        )}

        {!card.loading && card.error !== 'none' && (
          <div className="divide-y">
            {card.rowsBefore?.map((row) => (
              <Row key={row.label} label={row.label} value={row.value} />
            ))}
            <Row label={card.planRowLabel ?? 'Plan'} value={card.planLabel} />
            {card.rowsAfter?.map((row) => (
              <Row key={row.label} label={row.label} value={row.value} />
            ))}
            {card.status && <Row label="Status" value={card.status} />}
            {card.scheduledChange && (
              <DateValueRow
                label="Scheduled to change"
                value={card.scheduledChange.planLabel}
                date={card.scheduledChange.date}
              />
            )}
            {card.payment &&
              (isAccessEnding ? (
                <Row label="Access ends" value={card.payment.date} />
              ) : (
                <DateValueRow
                  label={card.payment.label}
                  value={card.payment.amount}
                  date={card.payment.date}
                />
              ))}
          </div>
        )}

        {card.footnote && (
          <p className="text-muted-foreground pt-1 text-sm">{card.footnote}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t px-(--x-padding) py-4">
        {card.buttons?.map((button) => (
          <Button
            key={button.label}
            variant={button.variant ?? 'default'}
            disabled={button.disabled}
          >
            <Loading loading={!!button.loading}>{button.label}</Loading>
          </Button>
        ))}
      </div>
    </SectionCard>
  )
}
