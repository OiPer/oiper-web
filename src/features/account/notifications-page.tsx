'use client'

import { Loading } from '@/components/shared/loading'
import { SectionCard, SectionHeading } from '@/components/shared/section-card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { AccountPageHeader } from '@/features/account/components/account-page-header'
import { useAuth } from '@/features/auth/auth-context'
import { useAccountMutation } from '@/features/auth/web-session'
import {
  TOPIC_COPY,
  type NotificationTopic,
} from '@/features/notifications/topics'
import { logComplete, logError } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import { isAppErrorEnvelope } from '@/lib/api/error'
import type { components } from '@/lib/api/schema'
import { formatDate } from '@/lib/format'
import { useQueryClient } from '@tanstack/react-query'
import { TriangleAlert } from 'lucide-react'
import { toast } from 'sonner'

type AccountNotifications = components['schemas']['AccountNotifications']
type Activity = components['schemas']['AccountNotificationActivity'][number]

const notificationsRequest = { cache: 'no-store' } as const

const notificationsQueryKey = $api.queryOptions(
  'get',
  '/v1/account/notifications',
  notificationsRequest
).queryKey

const WORKFLOW_LABELS: Record<string, string> = {
  'account.welcome': 'Welcome to OiPer',
  'subscription.subscribed': 'Subscription confirmation',
  'product.release-published': 'Release notes',
}

const STATUS_LABELS: Record<Activity['status'], string> = {
  PENDING: 'Queued',
  QUEUED: 'Queued',
  PROCESSING: 'Sending',
  RETRYING: 'Retrying',
  SENT: 'Sent',
  DELIVERED: 'Delivered',
  SKIPPED: 'Not sent',
  FAILED: 'Failed',
  BOUNCED: 'Bounced',
  COMPLAINED: 'Marked as spam',
}

function EmailStatusNotice(props: {
  status: AccountNotifications['emailStatus']
}) {
  if (props.status === 'ACTIVE') return null

  const message =
    props.status === 'SUPPRESSED'
      ? "We've paused emails to this address because a message bounced or was marked as spam. Contact support to resume them."
      : props.status === 'PENDING'
        ? 'Verify your email address to start receiving emails.'
        : 'Emails to this address are turned off.'

  return (
    <div className="mx-(--x-padding) flex items-start gap-2 rounded-lg border px-4 py-3 text-sm">
      <TriangleAlert className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}

function EmailPreferences() {
  const { currentUser } = useAuth({ required: true })
  const queryClient = useQueryClient()

  const notificationsQuery = $api.useQuery(
    'get',
    '/v1/account/notifications',
    notificationsRequest
  )

  const topicMutation = useAccountMutation(
    'patch',
    '/v1/account/notifications/topics/{topicKey}'
  )

  const unsubscribeAllMutation = useAccountMutation(
    'post',
    '/v1/account/notifications/unsubscribe-all'
  )

  const isSaving = topicMutation.isPending || unsubscribeAllMutation.isPending

  async function handleTopicChange(
    topicKey: NotificationTopic,
    subscribed: boolean,
    expectedUpdatedAt: string
  ) {
    try {
      const view = await topicMutation.mutateAsync({
        params: { path: { topicKey } },
        body: { subscribed, expectedUpdatedAt },
      })

      queryClient.setQueryData(notificationsQueryKey, view)
      logComplete('email_preferences_update', 'notifications', {
        topic: topicKey,
        subscribed,
      })

      toast.success(
        subscribed
          ? `${TOPIC_COPY[topicKey].label} turned on`
          : `${TOPIC_COPY[topicKey].label} turned off`
      )
    } catch (error) {
      const code = isAppErrorEnvelope(error) ? error.error.code : 'unknown'
      logError('email_preferences_update', 'notifications', {
        error_type: code,
      })

      if (code === 'NOTIFICATION_PREFERENCES_CONFLICT') {
        await notificationsQuery.refetch()
        return toast.error(
          'Your preferences changed somewhere else. We reloaded them, please try again.'
        )
      }

      toast.error("Couldn't update your email preferences")
    }
  }

  async function handleUnsubscribeAll() {
    try {
      const view = await unsubscribeAllMutation.mutateAsync({})

      queryClient.setQueryData(notificationsQueryKey, view)
      logComplete('email_unsubscribe_all', 'notifications')
      toast.success('You won’t get optional emails anymore')
    } catch (error) {
      logError('email_unsubscribe_all', 'notifications', {
        error_type: isAppErrorEnvelope(error) ? error.error.code : 'unknown',
      })
      toast.error("Couldn't update your email preferences")
    }
  }

  const data = notificationsQuery.data

  return (
    <SectionCard id="email-notifications">
      <SectionHeading
        title="Email"
        description={
          <>
            Emails are sent to{' '}
            <span className="text-foreground font-medium">
              {currentUser.email}
            </span>
          </>
        }
      />

      {data ? <EmailStatusNotice status={data.emailStatus} /> : null}

      <div className="divide-y border-t">
        {data ? (
          data.topics.map((topic) => (
            <div
              key={topic.key}
              className="flex items-center justify-between gap-6 px-(--x-padding) py-4"
            >
              <div className="space-y-0.5">
                <Label htmlFor={`topic-${topic.key}`}>
                  {TOPIC_COPY[topic.key].label}
                </Label>
                <p className="text-muted-foreground text-sm">
                  {TOPIC_COPY[topic.key].description}
                </p>
              </div>

              <Switch
                id={`topic-${topic.key}`}
                checked={topic.subscribed}
                disabled={isSaving}
                onCheckedChange={(checked) =>
                  void handleTopicChange(topic.key, checked, data.updatedAt)
                }
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-between gap-6 px-(--x-padding) py-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-[1.15rem] w-8 rounded-full" />
          </div>
        )}

        <div className="flex items-center justify-between gap-6 px-(--x-padding) py-4">
          <div className="space-y-0.5">
            <Label htmlFor="account-emails">Account emails</Label>
            <p className="text-muted-foreground text-sm">
              Emails about your account security and billing.
            </p>
          </div>

          <Switch id="account-emails" checked disabled />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t px-(--x-padding) py-4">
        <p className="text-muted-foreground text-sm text-balance">
          Stop every optional email in one click
        </p>

        <Button
          type="button"
          variant="outline"
          disabled={
            isSaving || !data || data.topics.every((topic) => !topic.subscribed)
          }
          onClick={() => void handleUnsubscribeAll()}
        >
          <Loading loading={unsubscribeAllMutation.isPending}>
            Unsubscribe from all
          </Loading>
        </Button>
      </div>
    </SectionCard>
  )
}

function RecentEmails() {
  const activityQuery = $api.useQuery(
    'get',
    '/v1/account/notifications/activity',
    notificationsRequest
  )

  return (
    <SectionCard id="recent-emails">
      <SectionHeading
        title="Recent emails"
        description="The latest emails OiPer sent to your account"
      />

      <div className="divide-y border-t">
        {activityQuery.data === undefined ? (
          <div className="px-(--x-padding) py-4">
            <Skeleton className="h-5 w-full" />
          </div>
        ) : activityQuery.data.length === 0 ? (
          <p className="text-muted-foreground px-(--x-padding) py-4 text-sm">
            No emails yet.
          </p>
        ) : (
          activityQuery.data.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-6 px-(--x-padding) py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {activity.renderedSubject ??
                    WORKFLOW_LABELS[activity.workflowKey] ??
                    activity.workflowKey}
                </p>
                <p className="text-muted-foreground">
                  {formatDate(activity.sentAt ?? activity.createdAt)}
                </p>
              </div>
              <p className="text-muted-foreground shrink-0">
                {STATUS_LABELS[activity.status]}
              </p>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  )
}

export function NotificationsPage() {
  return (
    <AccountPageHeader
      id="notifications"
      title="Notifications"
      description="Choose which emails OiPer sends you"
    >
      <EmailPreferences />
      <RecentEmails />
    </AccountPageHeader>
  )
}
