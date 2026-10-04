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

function plural(count: number, unit: string) {
  return `${count} ${unit}${count === 1 ? '' : 's'}`
}

function formatResetsIn(resetsAt: string) {
  const totalMinutes = Math.max(
    0,
    Math.ceil((new Date(resetsAt).getTime() - Date.now()) / 60_000)
  )
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (totalMinutes === 0) return 'under a minute'
  if (hours === 0) return plural(minutes, 'minute')
  if (minutes === 0) return plural(hours, 'hour')

  return `${plural(hours, 'hour')} ${plural(minutes, 'minute')}`
}

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
    <div className="last:text-right">
      <dt className="text-muted-foreground text-sm">{props.label}</dt>
      <dd className="mt-0.5 font-medium">{props.value}</dd>
    </div>
  )
}

function UsageSkeleton() {
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

export function UsagePage() {
  const usageQuery = $api.useQuery('get', '/v1/account/usage', usageRequest, {
    retry: false,
  })

  const usage = usageQuery.data
  const isLimited =
    usage != null &&
    usage.dailyAllowanceSeconds != null &&
    usage.remainingSecondsToday != null

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
          {isLimited && (
            <UsageMeter
              used={usage.cloudSecondsUsedToday}
              allowance={usage.dailyAllowanceSeconds ?? 0}
            />
          )}

          {!isLimited && (
            <div>
              <p className="text-muted-foreground text-sm">Daily allowance</p>
              <p className="mt-0.5 text-lg font-semibold">Unlimited</p>
            </div>
          )}

          <dl className="mt-6 flex justify-between gap-4">
            <UsageStat
              label="Recordings"
              value={formatInteger(usage.requestsUsedToday)}
            />
            <UsageStat
              label="Resets in"
              value={formatResetsIn(usage.allowanceResetsAt)}
            />
          </dl>
        </section>
      )}
    </AccountPageHeader>
  )
}
