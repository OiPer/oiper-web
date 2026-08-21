import { SectionCard } from '@/components/shared/section-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { CurrentPlanCardState } from './dummy-data'

function Row(props: { label: string; value: string }) {
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
// pair it with, instead of rendering "- on -". Mirrors DateValueRow in the
// real billing-page.tsx.
function DateValueRow(props: { label: string; value: string; date: string }) {
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

// Standalone lookalike of the real "Subscription" card on Account → Billing
// (features/account/billing-page.tsx). Not imported from there — buttons are
// decorative, no network calls, so the real page can't be affected.
export function CurrentPlanCardPreview(props: {
  card: CurrentPlanCardState['card']
}) {
  const { card } = props

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

        {card.error && (
          <p className="text-destructive py-3 text-sm">
            Couldn&apos;t load your subscription
          </p>
        )}

        {!card.loading && !card.error && (
          <div className="divide-y">
            <Row label="Status" value={card.status ?? '-'} />
            <Row label="Plan" value={card.planLabel ?? '-'} />
            {card.scheduledChangeDate && card.scheduledChangePlanLabel && (
              <DateValueRow
                label="Scheduled to change"
                value={card.scheduledChangePlanLabel}
                date={card.scheduledChangeDate}
              />
            )}
            {card.paymentLabel === 'Access ends' ? (
              <Row label="Access ends" value={card.paymentValue ?? '-'} />
            ) : (
              <DateValueRow
                label={card.paymentLabel ?? 'Next payment'}
                value={card.amountValue ?? '-'}
                date={card.paymentValue ?? '-'}
              />
            )}
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

        {card.buttons?.includes('subscribe') && (
          <Button type="button">Subscribe</Button>
        )}
        {card.buttons?.includes('manage') && (
          <Button type="button" variant="outline">
            Manage subscription
          </Button>
        )}
        {card.buttons?.includes('change') && (
          <Button type="button">Change plan</Button>
        )}
      </div>
    </SectionCard>
  )
}
