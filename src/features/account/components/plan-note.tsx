import { SectionCard } from '@/components/shared/section-card'
import { ANCHOR_PRICING, HOME } from '@/features/landing-page/constants/links'
import Link from 'next/link'

function PricingLink(props: { children: string }) {
  return (
    <Link
      href={`${HOME}${ANCHOR_PRICING}`}
      className="text-foreground font-medium underline underline-offset-4"
    >
      {props.children}
    </Link>
  )
}

export function PlanNote(props: { variant: 'free' | 'setting-up' }) {
  if (props.variant === 'setting-up') {
    return (
      <SectionCard className="text-muted-foreground gap-3 px-(--x-padding) pb-4 leading-relaxed sm:pb-6">
        <p>Thanks for subscribing!</p>

        <p>
          We&apos;re setting up your plan and this page will update on its own
          in a few seconds
        </p>
      </SectionCard>
    )
  }

  if (props.variant === 'free') {
    return (
      <SectionCard className="text-muted-foreground gap-3 px-(--x-padding) pb-4 leading-relaxed sm:pb-6">
        <p>
          You&apos;re on the free plan with no time limit and can{' '}
          <PricingLink>upgrade</PricingLink> whenever you&apos;re ready
        </p>
      </SectionCard>
    )
  }

  throw new Error(`Unknown plan note variant: ${props.variant}`)
}
