'use client'

import { OiPerLogoText } from '@/components/logo-text'
import { NavigationLink } from '@/components/navigation-link'
import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/features/auth/auth-context'
import { buildAuthUrl } from '@/features/auth/auth-form-utils'
import { useAccountMutation } from '@/features/auth/web-session'
import { DownloadButton } from '@/features/download/download-button'
import { HOME } from '@/features/landing-page/constants/links'
import { logComplete, logError, logSubmit, logView } from '@/lib/analytics'
import { $api } from '@/lib/api/client'
import { getAppErrorCode, isAppErrorEnvelope } from '@/lib/api/error'
import type { components } from '@/lib/api/schema'
import { formatDate, planDisplayName } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'

type GiftLookup = components['schemas']['GiftLookup']
type ClaimedGift = components['schemas']['ClaimedGift']
type PaidPlan = 'PRO' | 'MAX'

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
  if (months === 1) return 'a month'
  if (months === 12) return 'a year'
  if (months % 12 === 0) return `${months / 12} years`
  return `${months} months`
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function authUrl(page: 'signup' | 'signin') {
  return buildAuthUrl({
    mode: 'modal',
    pathname: GIFT_PATH,
    searchParams: new URLSearchParams({ callbackUrl: GIFT_PATH }),
    page,
  })
}

const SPARKLES = [
  { left: '8%', top: '18%', size: 3, delay: 0 },
  { left: '16%', top: '64%', size: 2, delay: 1.2 },
  { left: '24%', top: '34%', size: 2, delay: 2.4 },
  { left: '31%', top: '82%', size: 3, delay: 0.6 },
  { left: '44%', top: '12%', size: 2, delay: 1.8 },
  { left: '58%', top: '88%', size: 2, delay: 3 },
  { left: '67%', top: '22%', size: 3, delay: 0.9 },
  { left: '74%', top: '58%', size: 2, delay: 2.1 },
  { left: '83%', top: '36%', size: 2, delay: 1.5 },
  { left: '91%', top: '72%', size: 3, delay: 2.7 },
]

function Backdrop() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(255,255,255,0.07),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.015)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_50%_40%,black,transparent_70%)] bg-size-[120px_120px]" />
      <div className="absolute top-1/2 left-1/2 size-160 -translate-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_60%)] blur-3xl" />

      {SPARKLES.map((sparkle) => (
        <motion.span
          key={`${sparkle.left}-${sparkle.top}`}
          className="absolute rounded-full bg-white"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
          }}
          initial={{ opacity: 0.15 }}
          animate={
            reduceMotion
              ? { opacity: 0.25 }
              : { opacity: [0.1, 0.7, 0.1], y: [0, -14, 0] }
          }
          transition={{
            duration: 5,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

const CONFETTI = Array.from({ length: 28 }, (_, index) => {
  const angle = (index / 28) * Math.PI * 2
  const reach = 140 + (index % 4) * 45

  return {
    x: Math.cos(angle) * reach,
    y: Math.sin(angle) * reach * 0.7 + 80,
    rotate: (index % 2 === 0 ? 1 : -1) * (120 + index * 9),
    shape: index % 3,
    shade: ['bg-white', 'bg-white/70', 'bg-white/40'][index % 3],
  }
})

function Confetti() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-[38%] left-1/2 -z-10"
    >
      {CONFETTI.map((piece, index) => (
        <motion.span
          key={index}
          className={cn(
            'absolute block',
            piece.shade,
            piece.shape === 0 && 'h-1.5 w-1.5 rounded-full',
            piece.shape === 1 && 'h-2.5 w-1 rounded-[1px]',
            piece.shape === 2 && 'h-1 w-2 rounded-[1px]'
          )}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
          animate={{
            x: piece.x,
            y: piece.y,
            opacity: [0, 1, 1, 0],
            rotate: piece.rotate,
          }}
          transition={{ duration: 2.2, ease: 'easeOut', delay: 0.15 }}
        />
      ))}
    </div>
  )
}

const SHEEN_MOTION = {
  animate: { x: '22%' },
  transition: {
    duration: 2.6,
    delay: 1,
    repeat: Infinity,
    repeatType: 'mirror',
    repeatDelay: 4.5,
    ease: [0.45, 0, 0.2, 1],
  },
} as const

function GiftPass(props: {
  plan: PaidPlan
  months: number
  message: string | null
  features: string[]
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative mt-12 w-full max-w-96 overflow-hidden rounded-2xl p-px text-left">
      <div aria-hidden className="absolute inset-0 bg-white/12" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(255,255,255,0.55),transparent)]"
      />

      <div className="relative overflow-hidden rounded-[15px] bg-[linear-gradient(160deg,#1c1c1c,#101010_60%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_100%_0%,black,transparent_60%)] bg-size-[14px_14px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.1),transparent_50%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full border border-white/6"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full border border-white/8"
        />

        <div className="relative px-7 pt-7 pb-8.5">
          <div className="flex items-center justify-between gap-4">
            <OiPerLogoText className="text-[1.25rem]" />
            <p className="text-sm text-white/50">
              {capitalize(describeLength(props.months))}
            </p>
          </div>

          <p className="mt-10 text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
            Gift plan
          </p>
          <p className="mt-1.5 text-3xl font-semibold tracking-[-0.01em] uppercase">
            {planDisplayName(props.plan)}
          </p>

          {props.features.length > 0 && (
            <ul className="mt-8 flex flex-col gap-3 text-sm text-white/70">
              {props.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <CheckIcon className="size-4 shrink-0 text-white/40" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative border-t border-dashed border-white/15 bg-white/2 px-7 py-4">
          <p className="text-center text-sm text-pretty text-white/60">
            {props.message ?? "Speak freely, it's on us"}
          </p>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-1/2 -left-1/2 size-[200%] bg-[linear-gradient(115deg,transparent_43%,rgba(255,255,255,0.04)_47%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.24)_49.6%,rgba(255,255,255,0.24)_50.2%,rgba(255,255,255,0.1)_50.8%,rgba(255,255,255,0.04)_52.5%,rgba(255,255,255,0.11)_53.2%,rgba(255,255,255,0.04)_53.9%,transparent_57%)] mix-blend-screen"
          style={{ opacity: reduceMotion ? 0.45 : 1 }}
          initial={{ x: '-22%' }}
          {...(reduceMotion ? {} : SHEEN_MOTION)}
        />
      </div>
    </div>
  )
}

function GiftShell(props: {
  contained?: boolean
  byline?: string
  title: string
  children?: ReactNode
}) {
  return (
    <section
      className={cn(
        'relative isolate flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 py-20 text-center text-white',
        props.contained
          ? 'min-h-160 rounded-xl border'
          : '-mt-20 min-h-svh px-[4%] pt-32 pb-28'
      )}
    >
      <Backdrop />

      <h1
        className={cn(
          'max-w-120 text-2xl text-pretty sm:text-3xl',
          props.byline
            ? 'leading-none font-bold tracking-[-0.01em] uppercase'
            : 'font-semibold tracking-[-0.02em]'
        )}
      >
        {props.title}
      </h1>

      {props.byline && (
        <p className="mt-2 text-xs leading-none font-medium tracking-[0.2em] text-white/40 uppercase">
          {props.byline}
        </p>
      )}

      {props.children}
    </section>
  )
}

function Description(props: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-110 text-base leading-relaxed text-pretty text-white/50">
      {props.children}
    </p>
  )
}

function Footnote(props: { children: ReactNode }) {
  return (
    <p className="mt-10 max-w-110 text-sm leading-relaxed text-pretty text-white/40">
      {props.children}
    </p>
  )
}

const textLinkClass = 'text-sm underline underline-offset-4 hover:text-white/80'

const primaryButtonClass =
  'h-13 rounded-md bg-white px-8 text-base font-medium text-[#0a0a0a] hover:bg-white/90'

export function GiftOpeningView(props: { contained?: boolean }) {
  return (
    <section
      className={cn(
        'flex items-center justify-center bg-[#0a0a0a] text-white/60',
        props.contained
          ? 'min-h-160 rounded-xl border'
          : '-mt-20 min-h-svh pt-32 pb-28'
      )}
    >
      <Spinner className="size-6" />
    </section>
  )
}

export type GiftOffer = {
  plan: PaidPlan
  months: number
  message: string | null
  forEmail: string | null
  features: string[]
}

export function GiftOfferView(props: {
  offer: GiftOffer
  viewerEmail: string | null
  blocked: string | null
  claiming: boolean
  error: string | null
  onClaim: () => void
  contained?: boolean
}) {
  const { offer } = props

  return (
    <GiftShell
      contained={props.contained}
      byline="From the OiPer team"
      title="A Gift for You"
    >
      <GiftPass
        plan={offer.plan}
        months={offer.months}
        message={offer.message}
        features={offer.features}
      />

      <div className="mt-10 flex flex-col items-center gap-4">
        {props.blocked && (
          <p className="max-w-110 text-base leading-relaxed text-pretty text-white/70">
            {props.blocked}.
          </p>
        )}

        {!props.blocked && props.viewerEmail && (
          <Button
            type="button"
            disabled={props.claiming}
            onClick={props.onClaim}
            className={primaryButtonClass}
          >
            <Loading loading={props.claiming}>
              Claim OiPer {planDisplayName(offer.plan)}
            </Loading>
          </Button>
        )}

        {!props.blocked && !props.viewerEmail && (
          <>
            {offer.forEmail && (
              <p className="max-w-110 text-base leading-relaxed text-pretty text-white/70">
                To claim this gift please sign up or sign in as {offer.forEmail}
              </p>
            )}
            <Button asChild className={primaryButtonClass}>
              <Link href={authUrl('signup')} scroll={false}>
                Create a free account to claim
              </Link>
            </Button>
            <Link
              href={authUrl('signin')}
              scroll={false}
              className={textLinkClass}
            >
              I already have an account
            </Link>
          </>
        )}

        {props.error && (
          <p
            role="alert"
            className="max-w-110 text-sm text-pretty text-red-300"
          >
            {props.error}
          </p>
        )}
      </div>

      {!props.blocked && (
        <Footnote>
          No card needed and when the gift ends you simply go back to the free
          plan unless you choose to keep it
        </Footnote>
      )}
    </GiftShell>
  )
}

export function GiftClaimedView(props: {
  plan: PaidPlan
  endsAt: string
  showKeepNote: boolean
  celebrate: boolean
  contained?: boolean
}) {
  const plan = planDisplayName(props.plan)

  return (
    <GiftShell contained={props.contained} title="It's Yours">
      {props.celebrate && <Confetti />}

      <Description>
        You have OiPer {plan} until {formatDate(props.endsAt)} and can start
        using it in the desktop app right away
      </Description>

      <div className="mt-10 flex flex-col items-center gap-4">
        <DownloadButton location="gift" className={primaryButtonClass} />
        <Link href="/account/billing" className={textLinkClass}>
          See it in billing
        </Link>
      </div>

      {props.showKeepNote && (
        <Footnote>
          If you want to keep {plan} afterwards you can set it up in billing and
          your first payment will be on {formatDate(props.endsAt)}
        </Footnote>
      )}
    </GiftShell>
  )
}

const EXPIRED_COPY = {
  title: 'Gift Expired',
  description:
    "The time to claim this gift has passed but if you think that's a mistake just reply to the message it came in",
}

export const UNAVAILABLE_COPY = {
  NOT_FOUND: {
    title: 'Gift not Found',
    description:
      "Make sure you opened the full link but if it still doesn't work just reply to the message it came in",
  },
  CLAIMED: {
    title: 'Gift already Claimed',
    description:
      'This gift was already claimed but if you think it was meant for you just reply to the message it came in',
  },
  EXPIRED: EXPIRED_COPY,
  REVOKED: EXPIRED_COPY,
} as const

export function GiftUnavailableView(props: {
  reason: keyof typeof UNAVAILABLE_COPY
  contained?: boolean
}) {
  const copy = UNAVAILABLE_COPY[props.reason]

  return (
    <GiftShell contained={props.contained} title={copy.title}>
      <Description>{copy.description}</Description>
      <NavigationLink
        href={HOME}
        location="gift"
        destination="home"
        className={cn('mt-10', textLinkClass)}
      >
        Back to OiPer
      </NavigationLink>
    </GiftShell>
  )
}

function ClaimableGift(props: {
  code: string
  gift: GiftLookup
  features: string[]
  isPaying: boolean
}) {
  const { currentUser } = useAuth()
  const queryClient = useQueryClient()
  const claimMutation = useAccountMutation('post', '/v1/account/gifts/claim')
  const [claimed, setClaimed] = useState<ClaimedGift | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
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

  if (claimed) {
    return (
      <GiftClaimedView
        plan={claimed.plan}
        endsAt={claimed.endsAt}
        showKeepNote={!props.isPaying}
        celebrate
      />
    )
  }

  return (
    <GiftOfferView
      offer={{
        plan: props.gift.plan,
        months: props.gift.months,
        message: props.gift.message,
        forEmail: props.gift.forEmail,
        features: props.features,
      }}
      viewerEmail={currentUser?.email ?? null}
      blocked={currentUser ? props.gift.blocked : null}
      claiming={claimMutation.isPending}
      error={errorMessage}
      onClaim={() => void handleClaim()}
    />
  )
}

function GiftWithCode(props: { code: string }) {
  const { currentUser, isLoading: isAuthLoading } = useAuth()
  const viewerId = currentUser?.id ?? null
  const [checkedFor, setCheckedFor] = useState<string | null | undefined>(
    undefined
  )
  const lookupQuery = $api.useQuery(
    'post',
    '/v1/gifts/lookup',
    { body: { code: props.code } },
    { retry: false, enabled: false }
  )
  const pricingQuery = $api.useQuery('get', '/v1/pricing')
  const subscriptionQuery = $api.useQuery(
    'get',
    '/v1/account/subscription',
    { cache: 'no-store' },
    { retry: false, enabled: currentUser !== null }
  )
  const { refetch } = lookupQuery
  const ready =
    !isAuthLoading &&
    checkedFor === viewerId &&
    !pricingQuery.isPending &&
    (currentUser === null || !subscriptionQuery.isPending)
  const state = !ready
    ? null
    : lookupQuery.isError
      ? 'NOT_FOUND'
      : (lookupQuery.data?.state ?? null)

  useEffect(() => {
    if (isAuthLoading) return

    void refetch().then(() => setCheckedFor(viewerId))
  }, [viewerId, isAuthLoading, refetch])

  useEffect(() => {
    if (state) logView('gift', 'gift', { state: state.toLowerCase() })
  }, [state])

  if (!ready) return <GiftOpeningView />

  if (lookupQuery.isError || !lookupQuery.data) {
    return <GiftUnavailableView reason="NOT_FOUND" />
  }

  const gift = lookupQuery.data
  const isPaying =
    subscriptionQuery.data?.plan !== undefined &&
    subscriptionQuery.data.plan !== 'FREE' &&
    subscriptionQuery.data.status === 'ACTIVE'

  if (gift.state === 'CLAIMED_BY_YOU') {
    if (!gift.endsAt) {
      throw new Error('A gift claimed by this account came without an end date')
    }

    return (
      <GiftClaimedView
        plan={gift.plan}
        endsAt={gift.endsAt}
        showKeepNote={!isPaying}
        celebrate={false}
      />
    )
  }

  if (gift.state === 'CLAIMABLE') {
    const features =
      pricingQuery.data?.plans
        .find(
          (entry) => entry.plan === gift.plan && entry.interval === 'MONTHLY'
        )
        ?.features.filter((feature) => !feature.label.startsWith('Everything'))
        .slice(0, 3)
        .map((feature) => feature.label) ?? []

    return (
      <ClaimableGift
        code={props.code}
        gift={gift}
        features={features}
        isPaying={isPaying}
      />
    )
  }

  return <GiftUnavailableView reason={gift.state} />
}

export function GiftPage() {
  const [code, setCode] = useState<string | null | undefined>(undefined)

  useEffect(() => setCode(readGiftCode()), [])

  if (code === undefined) return <GiftOpeningView />
  if (code === null) return <GiftUnavailableView reason="NOT_FOUND" />

  return <GiftWithCode code={code} />
}
