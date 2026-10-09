import { OiPerLogoText } from '@/components/logo-text'
import { Loading } from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { UNAVAILABLE_COPY } from '@/features/gifts/gift-page'
import { CheckIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { GIFT_FEATURES, type GiftPageState } from './dummy-data'

// Static copy of the /gift page markup in features/gifts/gift-page.tsx, in a
// box instead of a full screen. Keep both in sync when the page changes.

const primaryButtonClass =
  'h-12 rounded bg-white px-8 text-base font-medium text-[#0a0a0a] hover:bg-white/90'

function Frame(props: {
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="flex min-h-120 flex-col items-center justify-center rounded-xl border bg-[#0a0a0a] px-6 py-12 text-center text-white">
      <OiPerLogoText className="text-[1.6rem]" />

      {props.eyebrow && (
        <p className="mt-10 text-sm font-medium text-white/50">
          {props.eyebrow}
        </p>
      )}

      <p
        className={`${props.eyebrow ? 'mt-3' : 'mt-10'} max-w-120 text-3xl font-semibold tracking-[-0.03em]`}
      >
        {props.title}
      </p>

      {props.children}
    </div>
  )
}

function Description(props: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-110 text-base leading-relaxed text-white/50">
      {props.children}
    </p>
  )
}

export function GiftPagePreview(props: { view: GiftPageState['view'] }) {
  const { view } = props

  if (view.kind === 'opening') return <Frame title="Opening your gift…" />

  if (view.kind === 'unavailable') {
    const copy = UNAVAILABLE_COPY[view.reason]

    return (
      <Frame title={copy.title}>
        <Description>{copy.description}</Description>
        <p className="mt-10 text-sm underline underline-offset-4">
          Back to OiPer
        </p>
      </Frame>
    )
  }

  if (view.kind === 'claimed') {
    return (
      <Frame title="It's yours.">
        <Description>{view.text}</Description>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button className={primaryButtonClass}>Download OiPer</Button>
          <p className="text-sm underline underline-offset-4">
            See it in billing
          </p>
        </div>
        {view.keepNote && (
          <p className="mt-10 max-w-110 text-sm leading-relaxed text-white/40">
            {view.keepNote}
          </p>
        )}
      </Frame>
    )
  }

  const plan = view.heading.includes('Max') ? 'Max' : 'Pro'

  return (
    <Frame eyebrow="A gift from the OiPer founders" title={view.heading}>
      {view.message && (
        <blockquote className="mt-8 max-w-110 border-l-2 border-white/15 pl-4 text-left text-base leading-relaxed text-white/80">
          {view.message}
        </blockquote>
      )}

      <ul className="mt-8 flex flex-col gap-2.5 text-left text-sm text-white/70">
        {GIFT_FEATURES.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-white/40" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-4">
        {view.blocked && (
          <p className="max-w-110 text-base leading-relaxed text-white/70">
            {view.blocked}.
          </p>
        )}

        {!view.blocked && view.viewer === 'signed-in' && (
          <>
            <Button disabled={view.claiming} className={primaryButtonClass}>
              <Loading loading={!!view.claiming}>Claim my gift</Loading>
            </Button>
            <p className="text-sm text-white/40">Claiming as sam@example.com</p>
          </>
        )}

        {!view.blocked && view.viewer === 'visitor' && (
          <>
            <Button className={primaryButtonClass}>
              Create a free account to claim
            </Button>
            <p className="text-sm underline underline-offset-4">
              I already have an account
            </p>
          </>
        )}

        {view.error && (
          <p role="alert" className="max-w-110 text-sm text-red-300">
            {view.error}
          </p>
        )}
      </div>

      {!view.blocked && (
        <p className="mt-10 max-w-110 text-sm leading-relaxed text-white/40">
          No card needed. When it ends you&apos;re back on the free plan, unless
          you choose to keep {plan}.
        </p>
      )}
    </Frame>
  )
}
