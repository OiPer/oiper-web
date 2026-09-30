'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { AccountPageHeader } from '@/features/account/components/account-page-header'
import { $api } from '@/lib/api/client'
import {
  formatDurationFromSeconds,
  formatInteger,
  formatLabel,
} from '@/lib/format'
import { cn } from '@/lib/utils'

const usageRequest = { cache: 'no-store' } as const

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

function formatHoursMinutes(seconds: number) {
  const totalMinutes = Math.floor(seconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`

  return `${hours}h ${minutes}m`
}

function UsageMeter(props: { used: number; allowance: number }) {
  const usedPercent = Math.min(
    100,
    Math.max(0, (props.used / props.allowance) * 100)
  )

  return (
    <div>
      <div
        role="meter"
        aria-label="Daily transcription allowance used"
        aria-valuemin={0}
        aria-valuemax={props.allowance}
        aria-valuenow={props.used}
        aria-valuetext={`${formatDurationFromSeconds(props.used)} of ${formatDurationFromSeconds(props.allowance)} used`}
        className="bg-secondary h-2.5 w-full overflow-hidden rounded-full"
      >
        <div
          className={cn(
            'h-full rounded-full',
            usedPercent >= 100
              ? 'bg-destructive'
              : usedPercent >= 80
                ? 'bg-warning'
                : 'bg-primary'
          )}
          style={{ width: `${usedPercent}%` }}
        />
      </div>
      <div className="mt-2.5 flex justify-between gap-4 text-sm">
        <span className="text-muted-foreground">
          {formatHoursMinutes(props.used)} used
        </span>
        <span className="text-muted-foreground">
          {formatHoursMinutes(props.allowance)} daily allowance
        </span>
      </div>
    </div>
  )
}

function UsageStat(props: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground text-sm">{props.label}</dt>
      <dd className="mt-0.5 font-medium">{props.value}</dd>
    </div>
  )
}

function UsageSkeleton() {
  return (
    <div className="bg-card mx-auto w-full max-w-6xl rounded-xl border p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
        <div className="shrink-0">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-2.5 h-11 w-32" />
        </div>
        <div className="w-full flex-1">
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="mt-3 h-4 w-48" />
        </div>
      </div>
      <Skeleton className="mt-6 h-10 w-full" />
    </div>
  )
}

export function UsagePage() {
  const usageQuery = $api.useQuery('get', '/v1/account/usage', usageRequest, {
    retry: false,
  })

  const usage = usageQuery.data
  const remaining = usage?.remainingSecondsToday ?? null
  const isLimited =
    usage != null && usage.dailyAllowanceSeconds != null && remaining != null

  return (
    <AccountPageHeader
      id="usage"
      title="Usage"
      description={
        <>
          Your cloud transcription usage on the{' '}
          {usage ? formatLabel(usage.plan) : '—'} plan
        </>
      }
    >
      {usageQuery.isPending && <UsageSkeleton />}

      {usageQuery.error && (
        <div className="bg-card text-card-foreground mx-auto w-full max-w-6xl rounded-xl border p-4 shadow-sm sm:p-6">
          <p className="text-destructive text-sm">
            Couldn&apos;t load your usage
          </p>
        </div>
      )}

      {usage && (
        <section className="bg-card text-card-foreground mx-auto w-full max-w-6xl rounded-xl border p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
            <div className="shrink-0">
              <p className="text-muted-foreground text-sm">
                {isLimited ? 'Remaining today' : 'Daily allowance'}
              </p>
              <p className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">
                {isLimited
                  ? remaining === 0
                    ? 'Daily limit reached'
                    : formatHoursMinutes(remaining)
                  : 'Unlimited'}
              </p>
            </div>
            {isLimited && (
              <div className="w-full flex-1">
                <UsageMeter
                  used={usage.cloudSecondsUsedToday}
                  allowance={usage.dailyAllowanceSeconds ?? 0}
                />
              </div>
            )}
          </div>

          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t pt-6">
            <UsageStat
              label="Requests today"
              value={formatInteger(usage.requestsUsedToday)}
            />
            <UsageStat
              label="Resets at"
              value={timeFormatter.format(new Date(usage.allowanceResetsAt))}
            />
          </dl>
        </section>
      )}
    </AccountPageHeader>
  )
}
