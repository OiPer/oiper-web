'use client'

import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { HOME } from '@/features/landing-page/constants/links'
import { TOPIC_COPY } from '@/features/notifications/topics'
import { logComplete, logError } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import { isAppErrorEnvelope } from '@/lib/api/error'

const unsubscribeRequest = { cache: 'no-store' } as const

function useUnsubscribeContent(props: { token: string }) {
  const params = {
    params: { path: { token: props.token } },
    ...unsubscribeRequest,
  }

  const stateQuery = $api.useQuery(
    'get',
    '/v1/notifications/unsubscribe/{token}',
    params,
    { retry: false }
  )

  const unsubscribeMutation = $api.useMutation(
    'post',
    '/v1/notifications/unsubscribe/{token}'
  )

  async function handleUnsubscribe() {
    try {
      await unsubscribeMutation.mutateAsync({
        params: { path: { token: props.token } },
      })
      logComplete('email_unsubscribe', 'unsubscribe')
    } catch (error) {
      logError('email_unsubscribe', 'unsubscribe', {
        error_type: isAppErrorEnvelope(error) ? error.error.code : 'unknown',
      })
    }
  }

  if (stateQuery.isPending) {
    return { title: 'Checking your link…', description: '', action: null }
  }

  if (stateQuery.isError || unsubscribeMutation.isError) {
    return {
      title: 'This link is invalid.',
      description:
        'The unsubscribe link is broken or has expired. Use the link from your most recent OiPer email, or manage emails from your account.',
      action: null,
    }
  }

  const topic = TOPIC_COPY[stateQuery.data.topic].label

  if (unsubscribeMutation.isSuccess || !stateQuery.data.subscribed) {
    return {
      title: "You're unsubscribed.",
      description: `You won’t get “${topic}” emails from OiPer anymore. Changed your mind? Subscribe again from the footer of our site any time.`,
      action: null,
    }
  }

  return {
    title: `Unsubscribe from “${topic}”?`,
    description:
      "You'll stop getting these emails. Account emails like receipts aren't affected.",
    action: (
      <Button
        type="button"
        disabled={unsubscribeMutation.isPending}
        onClick={() => void handleUnsubscribe()}
        className="mt-10 h-12 rounded bg-white px-8 text-base font-medium text-[#0a0a0a] hover:bg-white/90"
      >
        <Loading loading={unsubscribeMutation.isPending}>Unsubscribe</Loading>
      </Button>
    ),
  }
}

function UnsubscribeLayout(props: {
  title: string
  description: string
  action: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center text-white">
      <NavigationLink href={HOME} location="unsubscribe" destination="home">
        <OiPerLogoText className="text-[2rem]" />
      </NavigationLink>

      <h1 className="mt-12 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
        {props.title}
      </h1>
      <p className="mt-5 max-w-110 text-base leading-relaxed text-white/50">
        {props.description}
      </p>

      {props.action ?? (
        <NavigationLink
          href={HOME}
          location="unsubscribe"
          destination="home"
          className="mt-10 text-sm underline underline-offset-4 hover:text-white/80"
        >
          Back to OiPer
        </NavigationLink>
      )}
    </main>
  )
}

function UnsubscribeWithToken(props: { token: string }) {
  return <UnsubscribeLayout {...useUnsubscribeContent(props)} />
}

export function UnsubscribePage(props: { token: string | null }) {
  if (!props.token) {
    return (
      <UnsubscribeLayout
        title="This link is invalid."
        description="The unsubscribe link is missing its token. Use the link from your most recent OiPer email."
        action={null}
      />
    )
  }

  return <UnsubscribeWithToken token={props.token} />
}
