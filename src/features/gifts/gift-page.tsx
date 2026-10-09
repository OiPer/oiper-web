'use client'

import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/auth-context'
import { buildAuthUrl } from '@/features/auth/auth-form-utils'
import { useAccountMutation } from '@/features/auth/web-session'
import { DOWNLOAD_URL, HOME } from '@/features/landing-page/constants/links'
import { logComplete, logError, logSubmit, logView } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import { getAppErrorCode, isAppErrorEnvelope } from '@/lib/api/error'
import type { components } from '@/lib/api/schema'
import { formatDate, planDisplayName } from '@/lib/format'
import { useQueryClient } from '@tanstack/react-query'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'

type GiftLookup = components['schemas']['GiftLookup']
type ClaimedGift = components['schemas']['ClaimedGift']

const GIFT_CODE_KEY = 'oiper:gift-code'
const GIFT_PATH = '/gift'

function readGiftCode(): string | null {
  const fromHash = decodeURIComponent(window.location.hash.slice(1)).trim()

  if (fromHash) {
    try {
      sessionStorage.setItem(GIFT_CODE_KEY, fromHash)
    } catch {}

    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search
    )
    return fromHash
  }

  try {
    return sessionStorage.getItem(GIFT_CODE_KEY)
  } catch {
    return null
  }
}

function describeLength(months: number) {
  if (months === 1) return 'A month'
  if (months === 12) return 'A year'
  if (months % 12 === 0) return `${months / 12} years`
  return `${months} months`
}

function authUrl(page: 'signup' | 'signin') {
  return buildAuthUrl({
    mode: 'modal',
    pathname: GIFT_PATH,
    searchParams: new URLSearchParams({ callbackUrl: GIFT_PATH }),
    page,
  })
}

function GiftLayout(props: {
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 py-16 text-center text-white">
      <NavigationLink href={HOME} location="gift" destination="home">
        <OiPerLogoText className="text-[2rem]" />
      </NavigationLink>

      {props.eyebrow && (
        <p className="mt-12 text-sm font-medium text-white/50">
          {props.eyebrow}
        </p>
      )}

      <h1
        className={`${props.eyebrow ? 'mt-3' : 'mt-12'} max-w-160 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl`}
      >
        {props.title}
      </h1>

      {props.children}
    </main>
  )
}

function Description(props: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-110 text-base leading-relaxed text-white/50">
      {props.children}
    </p>
  )
}

function BackHome() {
  return (
    <NavigationLink
      href={HOME}
      location="gift"
      destination="home"
      className="mt-10 text-sm underline underline-offset-4 hover:text-white/80"
    >
      Back to OiPer
    </NavigationLink>
  )
}

const primaryButtonClass =
  'h-12 rounded bg-white px-8 text-base font-medium text-[#0a0a0a] hover:bg-white/90'

function PlanHighlights(props: { plan: 'PRO' | 'MAX' }) {
  const pricingQuery = $api.useQuery('get', '/v1/pricing')
  const features = pricingQuery.data?.plans
    .find((entry) => entry.plan === props.plan && entry.interval === 'MONTHLY')
    ?.features.filter((feature) => !feature.label.startsWith('Everything'))
    .slice(0, 4)

  if (!features?.length) return null

  return (
    <ul className="mt-8 flex flex-col gap-2.5 text-left text-sm text-white/70">
      {features.map((feature) => (
        <li key={feature.label} className="flex items-start gap-2.5">
          <CheckIcon className="mt-0.5 size-4 shrink-0 text-white/40" />
          <span>{feature.label}</span>
        </li>
      ))}
    </ul>
  )
}

function ClaimedView(props: {
  gift: { plan: 'PRO' | 'MAX'; startsAt: string; endsAt: string }
}) {
  const subscriptionQuery = $api.useQuery(
    'get',
    '/v1/account/subscription',
    { cache: 'no-store' },
    { retry: false }
  )
  const isPaying =
    subscriptionQuery.data?.plan !== undefined &&
    subscriptionQuery.data.plan !== 'FREE' &&
    subscriptionQuery.data.status === 'ACTIVE'
  const startsLater = new Date(props.gift.startsAt).getTime() > Date.now()
  const plan = planDisplayName(props.gift.plan)

  return (
    <GiftLayout title="It's yours.">
      <Description>
        {startsLater
          ? `Your ${plan} gift starts on ${formatDate(props.gift.startsAt)}, right after the time you already have, and runs until ${formatDate(props.gift.endsAt)}.`
          : `OiPer ${plan} is on until ${formatDate(props.gift.endsAt)}. Open the desktop app, sign in, and start talking.`}
      </Description>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button asChild className={primaryButtonClass}>
          <Link href={DOWNLOAD_URL}>Download OiPer</Link>
        </Button>
        <Link
          href="/account/billing"
          className="text-sm underline underline-offset-4 hover:text-white/80"
        >
          See it in billing
        </Link>
      </div>

      {!isPaying && (
        <p className="mt-10 max-w-110 text-sm leading-relaxed text-white/40">
          Want to keep {plan} after that? You can set it up any time from
          billing, and your first payment comes when your gift ends on{' '}
          {formatDate(props.gift.endsAt)}.
        </p>
      )}
    </GiftLayout>
  )
}

function ClaimableView(props: { code: string; gift: GiftLookup }) {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const claimMutation = useAccountMutation('post', '/v1/account/gifts/claim')
  const [claimed, setClaimed] = useState<ClaimedGift | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const plan = planDisplayName(props.gift.plan)
  const details = {
    plan: props.gift.plan.toLowerCase(),
    months: props.gift.months,
  }

  async function handleClaim() {
    setErrorMessage(null)
    logSubmit('gift_claim', 'gift', details)

    try {
      const result = await claimMutation.mutateAsync({
        body: { code: props.code },
      })

      logComplete('gift_claim', 'gift', details)
      setClaimed(result)
      void queryClient.invalidateQueries()
    } catch (error) {
      const code = getAppErrorCode<'post', '/v1/account/gifts/claim'>(error)
      logError('gift_claim', 'gift', {
        ...details,
        error_type: code ?? 'unknown',
      })
      setErrorMessage(
        isAppErrorEnvelope(error)
          ? error.error.message
          : "Couldn't claim your gift. Please try again"
      )
    }
  }

  if (claimed) return <ClaimedView gift={claimed} />

  return (
    <GiftLayout
      eyebrow="A gift from the OiPer founders"
      title={`${describeLength(props.gift.months)} of OiPer ${plan}, on us.`}
    >
      {props.gift.message && (
        <blockquote className="mt-8 max-w-110 border-l-2 border-white/15 pl-4 text-left text-base leading-relaxed text-white/80">
          {props.gift.message}
        </blockquote>
      )}

      <PlanHighlights plan={props.gift.plan} />

      <div className="mt-10 flex flex-col items-center gap-4">
        {currentUser && props.gift.blocked ? (
          <p className="max-w-110 text-base leading-relaxed text-white/70">
            {props.gift.blocked}.
          </p>
        ) : currentUser ? (
          <>
            <Button
              type="button"
              disabled={claimMutation.isPending}
              onClick={() => void handleClaim()}
              className={primaryButtonClass}
            >
              <Loading loading={claimMutation.isPending}>Claim my gift</Loading>
            </Button>
            <p className="text-sm text-white/40">
              Claiming as {currentUser.email}
            </p>
          </>
        ) : (
          <>
            <Button asChild className={primaryButtonClass}>
              <Link href={authUrl('signup')} scroll={false}>
                Create a free account to claim
              </Link>
            </Button>
            <Link
              href={authUrl('signin')}
              scroll={false}
              className="text-sm underline underline-offset-4 hover:text-white/80"
            >
              I already have an account
            </Link>
          </>
        )}

        {errorMessage && (
          <p role="alert" className="max-w-110 text-sm text-red-300">
            {errorMessage}
          </p>
        )}
      </div>

      {!(currentUser && props.gift.blocked) && (
        <p className="mt-10 max-w-110 text-sm leading-relaxed text-white/40">
          No card needed. When it ends you&apos;re back on the free plan, unless
          you choose to keep {plan}.
        </p>
      )}
    </GiftLayout>
  )
}

function UnavailableView(props: { title: string; description: string }) {
  return (
    <GiftLayout title={props.title}>
      <Description>{props.description}</Description>
      <BackHome />
    </GiftLayout>
  )
}

export const UNAVAILABLE_COPY = {
  NOT_FOUND: {
    title: "This gift link doesn't work.",
    description:
      "Check that you opened the whole link. If it still doesn't work, reply to the message it came in and we'll help.",
  },
  CLAIMED: {
    title: 'This gift has already been claimed.',
    description:
      "Each gift link works for one account. If it was meant for you, reply to the message it came in and we'll sort it out.",
  },
  EXPIRED: {
    title: 'This gift has expired.',
    description:
      "The time to claim it has passed. If you think that's a mistake, reply to the message it came in.",
  },
  REVOKED: {
    title: 'This gift is no longer available.',
    description:
      "It was withdrawn. If you think that's a mistake, reply to the message it came in.",
  },
} as const

function GiftWithCode(props: { code: string }) {
  const { currentUser, isLoading: isAuthLoading } = useAuth()
  const lookupQuery = $api.useQuery(
    'post',
    '/v1/gifts/lookup',
    { body: { code: props.code } },
    { retry: false, enabled: !isAuthLoading }
  )
  const { refetch } = lookupQuery
  const state = lookupQuery.isError
    ? 'NOT_FOUND'
    : (lookupQuery.data?.state ?? null)

  useEffect(() => {
    if (!isAuthLoading) void refetch()
  }, [currentUser?.id, isAuthLoading, refetch])

  useEffect(() => {
    if (state) logView('gift', 'gift', { state: state.toLowerCase() })
  }, [state])

  if (isAuthLoading || lookupQuery.isPending) {
    return <GiftLayout title="Opening your gift…" />
  }

  if (lookupQuery.isError || !lookupQuery.data) {
    return <UnavailableView {...UNAVAILABLE_COPY.NOT_FOUND} />
  }

  const gift = lookupQuery.data

  if (gift.state === 'CLAIMED_BY_YOU') {
    if (!gift.startsAt || !gift.endsAt) {
      throw new Error('A gift claimed by this account came without dates')
    }

    return (
      <ClaimedView
        gift={{ plan: gift.plan, startsAt: gift.startsAt, endsAt: gift.endsAt }}
      />
    )
  }

  if (gift.state === 'CLAIMABLE') {
    return <ClaimableView code={props.code} gift={gift} />
  }

  return <UnavailableView {...UNAVAILABLE_COPY[gift.state]} />
}

export function GiftPage() {
  const [code, setCode] = useState<string | null | undefined>(undefined)

  useEffect(() => setCode(readGiftCode()), [])

  if (code === undefined) return <GiftLayout title="Opening your gift…" />
  if (code === null) return <UnavailableView {...UNAVAILABLE_COPY.NOT_FOUND} />

  return <GiftWithCode code={code} />
}
