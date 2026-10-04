import { Loading } from '@/components/shared/loading'
import { SectionCard } from '@/components/shared/section-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
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

function RowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export function CurrentPlanCardPreview(props: {
  card: CurrentPlanCardState['card']
}) {
  const { card } = props
  const isAccessEnding = card.payment?.label === 'Access ends'

  return (
    <SectionCard className="gap-4">
      <div className="px-(--x-padding)">
        <p className="text-muted-foreground mb-1 text-sm font-medium">
          Subscription
        </p>

        {card.loading && (
          <div className="divide-y">
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </div>
        )}

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
            <Row label="Plan" value={card.planLabel} />
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
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t px-(--x-padding) py-4">
        {card.loading && (
          <>
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-24" />
          </>
        )}

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
