'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { AccountPageHeader } from '@/features/account/components/account-page-header'
import { $api } from '@/lib/api/client'
import {
  formatDateTime,
  formatDurationFromSeconds,
  formatInteger,
  formatLabel,
} from '@/lib/format'

const usageRequest = { cache: 'no-store' } as const

function StatCard(props: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-card text-card-foreground rounded-xl border p-4 shadow-sm sm:p-6">
      <p className="text-muted-foreground text-sm">{props.label}</p>
      <p className="mt-1 text-2xl font-semibold">{props.value}</p>
    </div>
  )
}

function UsageStatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-xl border p-4 shadow-sm sm:p-6"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-2 h-8 w-16" />
        </div>
      ))}
    </div>
  )
}

export function UsagePage() {
  const usageQuery = $api.useQuery('get', '/v1/account/usage', usageRequest, {
    retry: false,
  })

  return (
    <AccountPageHeader
      id="usage"
      title="Usage"
      description={
        <>
          Your cloud transcription usage on the{' '}
          {usageQuery.data ? formatLabel(usageQuery.data.plan) : '—'} plan
        </>
      }
    >
      {usageQuery.isPending && <UsageStatsSkeleton />}

      {usageQuery.error && (
        <div className="bg-card text-card-foreground rounded-xl border p-4 shadow-sm sm:p-6">
          <p className="text-destructive text-sm">
            Couldn&apos;t load your usage
          </p>
        </div>
      )}

      {usageQuery.data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Requests today"
            value={formatInteger(usageQuery.data.requestsUsedToday)}
          />
          <StatCard
            label="Used today"
            value={formatDurationFromSeconds(
              usageQuery.data.cloudSecondsUsedToday
            )}
          />
          <StatCard
            label="Remaining today"
            value={
              usageQuery.data.remainingSecondsToday === null
                ? 'Unlimited'
                : formatDurationFromSeconds(
                    usageQuery.data.remainingSecondsToday
                  )
            }
          />
          <StatCard
            label="Resets at"
            value={formatDateTime(usageQuery.data.allowanceResetsAt)}
          />
        </div>
      )}
    </AccountPageHeader>
  )
}
