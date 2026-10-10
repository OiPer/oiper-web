'use client'

import { IntervalToggle } from '@/components/shared/interval-toggle'
import { LayoutGroup } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ChangePlanPreview } from './change-plan-preview'
import { CurrentPlanCardPreview } from './current-plan-card-preview'
import {
  CHANGE_PLAN_STATES,
  CURRENT_PLAN_STATES,
  GIFT_PAGE_STATES,
  PRICING_CARD_STATES,
  TOAST_STATES,
  USAGE_CARD_STATES,
  type ChangePlanState,
  type CurrentPlanCardState,
  type GiftPageState,
  type PricingCardState,
  type UsageCardState,
} from './dummy-data'
import { GiftPagePreview } from './gift-page-preview'
import { PricingCardPreview } from './pricing-card-preview'
import { StateTile } from './state-tile'
import { ToastPreview } from './toast-preview'
import { UsageCardPreview } from './usage-card-preview'

function Group(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground/80 text-xs font-medium tracking-wide uppercase">
        {props.title}
      </p>
      {props.children}
    </div>
  )
}

function PricingTile(props: { state: PricingCardState }) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="min-h-16 space-y-1">
        {props.state.entryNote && (
          <p className="text-[11px] font-medium tracking-wide text-white/30 uppercase">
            {props.state.entryNote}
          </p>
        )}
        <p className="text-sm font-medium text-white">{props.state.title}</p>
        <p className="text-xs leading-relaxed text-white/40">
          {props.state.description}
        </p>
      </div>
      <div className="flex flex-1 flex-col [&>div]:flex-1">
        <PricingCardPreview card={props.state.card} />
      </div>
    </div>
  )
}

function CurrentPlanTile(props: { state: CurrentPlanCardState }) {
  return (
    <StateTile
      title={props.state.title}
      description={props.state.description}
      note={props.state.entryNote}
    >
      <CurrentPlanCardPreview card={props.state.card} />
    </StateTile>
  )
}

function UsageTile(props: { state: UsageCardState }) {
  return (
    <StateTile title={props.state.title} description={props.state.description}>
      <UsageCardPreview card={props.state.card} />
    </StateTile>
  )
}

function ChangePlanTile(props: { state: ChangePlanState }) {
  return (
    <StateTile
      title={props.state.title}
      description={props.state.description}
      note={props.state.entryNote}
    >
      <ChangePlanPreview state={props.state} />
    </StateTile>
  )
}

function ChangePlanMobileTile(props: { state: ChangePlanState }) {
  return (
    <StateTile
      title={props.state.title}
      description={props.state.description}
      note="Mobile — bottom sheet"
    >
      <ChangePlanPreview state={props.state} frame="mobile" />
    </StateTile>
  )
}

function GiftPageTile(props: { state: GiftPageState }) {
  return (
    <StateTile title={props.state.title} description={props.state.description}>
      <GiftPagePreview view={props.state.view} />
    </StateTile>
  )
}

function byGroup<T extends { title: string }>(
  states: T[],
  titles: string[]
): T[] {
  return states.filter((state) => titles.includes(state.title))
}

function PricingGrid(props: { titles: string[] }) {
  return (
    <div className="grid gap-6 rounded-2xl border bg-[#0a0a0a] p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
      {byGroup(PRICING_CARD_STATES, props.titles).map((state) => (
        <PricingTile key={state.title} state={state} />
      ))}
    </div>
  )
}

function PricingStates() {
  return (
    <div className="flex flex-col gap-8">
      <Group title="Interval toggle">
        <div className="grid gap-6 rounded-2xl border bg-[#0a0a0a] p-6 sm:grid-cols-2 sm:p-8">
          {(
            [
              ['Monthly', 'MONTHLY'],
              ['Yearly', 'YEARLY'],
            ] as const
          ).map(([label, value]) => (
            <div key={value} className="flex h-full flex-col gap-3">
              <p className="text-sm font-medium text-white">{label}</p>
              <p className="text-xs leading-relaxed text-white/40">
                {value === 'MONTHLY'
                  ? 'The default. The yearly pill always carries the save hint.'
                  : 'Every card re-prices and shows its save badge.'}
              </p>
              <div className="mt-1">
                <LayoutGroup id={value}>
                  <IntervalToggle
                    value={value}
                    onChange={() => undefined}
                    variant="landing"
                    yearlySavePercent={30}
                  />
                </LayoutGroup>
              </div>
            </div>
          ))}
        </div>
      </Group>

      <Group title="Free">
        <PricingGrid titles={['Free']} />
      </Group>

      <Group title="Signed out or lapsed">
        <PricingGrid
          titles={[
            'Pro · loading',
            'Pro · visitor',
            'Pro · signed in on Free',
            'Pro · Stripe disabled',
          ]}
        />
      </Group>

      <Group title="Checkout in progress">
        <PricingGrid
          titles={['Pro · Paddle submitting', 'Pro · Stripe submitting']}
        />
      </Group>

      <Group title="Yearly">
        <PricingGrid titles={['Pro · yearly', 'Max · yearly']} />
      </Group>

      <Group title="Active subscribers">
        <PricingGrid
          titles={[
            'Pro · current plan',
            'Max · current plan',
            'Pro · Switch',
            'Max · Switch locked',
          ]}
        />
      </Group>

      <Group title="On a gift">
        <PricingGrid titles={['Pro · on a Pro gift', 'Max · on a Pro gift']} />
      </Group>
    </div>
  )
}

function CurrentPlanGrid(props: { titles: string[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {byGroup(CURRENT_PLAN_STATES, props.titles).map((state) => (
        <CurrentPlanTile key={state.title} state={state} />
      ))}
    </div>
  )
}

function BillingStates() {
  return (
    <div className="flex flex-col gap-8">
      <Group title="Loading and errors">
        <CurrentPlanGrid
          titles={['Loading', 'Fetch error', 'Stale after refresh error']}
        />
      </Group>

      <Group title="Free">
        <CurrentPlanGrid titles={['Free', 'Checkout return']} />
      </Group>

      <Group title="Healthy">
        <CurrentPlanGrid
          titles={['Active', 'No upcoming payment', 'Downgrade scheduled']}
        />
      </Group>

      <Group title="Problem states">
        <CurrentPlanGrid
          titles={[
            'Past due',
            'Paused',
            'Cancelling',
            'Past due and cancelling',
            'Scheduled and cancelling',
          ]}
        />
      </Group>

      <Group title="Busy">
        <CurrentPlanGrid
          titles={['Plan change landing', 'Portal opening', 'Resuming']}
        />
      </Group>

      <Group title="Gifts">
        <CurrentPlanGrid
          titles={[
            'Gift · nothing set up',
            'Gift · opening checkout',
            'Gift · keeping Pro after it',
            'Gift ended',
          ]}
        />
      </Group>
    </div>
  )
}

function UsageStates() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-sm">
        A gift shows exactly like the paid plan it gives.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {USAGE_CARD_STATES.map((state) => (
          <UsageTile key={state.title} state={state} />
        ))}
      </div>
    </div>
  )
}

function ChangePlanGrid(props: { titles: string[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {byGroup(CHANGE_PLAN_STATES, props.titles).map((state) => (
        <ChangePlanTile key={state.title} state={state} />
      ))}
    </div>
  )
}

function ChangePlanStates() {
  return (
    <div className="flex flex-col gap-8">
      <Group title="Entry points">
        <ChangePlanGrid titles={['From Billing', 'From a pricing card']} />
      </Group>

      <Group title="Current plan selected">
        <ChangePlanGrid
          titles={['Current plan selected', 'Current plan and cancelling']}
        />
      </Group>

      <Group title="Loading and errors">
        <ChangePlanGrid
          titles={[
            'Fetching preview',
            'Error · not allowed',
            'Error · no subscription',
            'Error · payment failed',
            'Error · anything else',
            'No catalog',
          ]}
        />
      </Group>

      <Group title="Blocked">
        <ChangePlanGrid
          titles={[
            'Blocked · cancelling',
            'Blocked · paused',
            'Blocked · resuming',
          ]}
        />
      </Group>

      <Group title="During a gift · nothing set up after it">
        <ChangePlanGrid
          titles={[
            'Gift · same or smaller plan',
            'Gift · bigger plan',
            'Gift · smaller plan on a Max gift',
          ]}
        />
      </Group>

      <Group title="During a gift · plan set to follow">
        <ChangePlanGrid
          titles={[
            'Gift · plan set to follow · swap',
            'Gift · plan set to follow · bigger plan',
            'Gift · plan set to follow · confirming',
            'Gift · plan set to follow · card declined',
            'Gift · plan set to follow · cancelling',
          ]}
        />
      </Group>

      <Group title="Previews">
        <ChangePlanGrid
          titles={[
            'Upgrade · charged today',
            'Upgrade · credit covers part',
            'Immediate · nothing due',
            'Downgrade · Paddle',
            'Downgrade · Stripe',
          ]}
        />
      </Group>

      <Group title="Busy">
        <ChangePlanGrid titles={['Confirming']} />
      </Group>

      <Group title="Mobile">
        <div className="grid gap-5 sm:grid-cols-2">
          {byGroup(CHANGE_PLAN_STATES, [
            'Upgrade · charged today',
            'Blocked · paused',
            'Gift · bigger plan',
          ]).map((state) => (
            <ChangePlanMobileTile key={state.title} state={state} />
          ))}
        </div>
      </Group>
    </div>
  )
}

function ToastStates() {
  return (
    <div className="flex flex-col gap-8">
      {(
        [
          ['Success', 'success'],
          ['Info', 'info'],
          ['Error', 'error'],
        ] as const
      ).map(([label, type]) => (
        <Group key={type} title={label}>
          <div className="grid gap-5 sm:grid-cols-2">
            {TOAST_STATES.filter((toast) => toast.type === type).map(
              (toast) => (
                <div key={toast.message} className="flex flex-col gap-3">
                  <p className="text-muted-foreground text-[13px]">
                    {toast.when}
                  </p>
                  <ToastPreview toast={toast} />
                </div>
              )
            )}
          </div>
        </Group>
      ))}
    </div>
  )
}

function GiftPageGrid(props: { titles: string[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {byGroup(GIFT_PAGE_STATES, props.titles).map((state) => (
        <GiftPageTile key={state.title} state={state} />
      ))}
    </div>
  )
}

function GiftLinkStates() {
  return (
    <div className="flex flex-col gap-8">
      <Group title="Loading">
        <GiftPageGrid titles={['Opening']} />
      </Group>

      <Group title="Claim">
        <GiftPageGrid
          titles={[
            'Visitor',
            'Visitor · long message',
            'Visitor · one email',
            'Signed in',
            'Claiming',
            'Claim failed',
          ]}
        />
      </Group>

      <Group title="Can't claim">
        <GiftPageGrid
          titles={[
            'Has a subscription or gift',
            'Has a subscription · one email',
            'Different email',
          ]}
        />
      </Group>

      <Group title="Claimed">
        <GiftPageGrid titles={["It's yours"]} />
      </Group>

      <Group title="Link problems">
        <GiftPageGrid titles={['Already claimed', 'Expired', 'Broken link']} />
      </Group>
    </div>
  )
}

export const DEV_SECTIONS = [
  {
    slug: 'pricing',
    title: 'Home pricing',
    description:
      'The landing page cards and the Monthly/Yearly toggle, including gift users. Cards render the real PlanCard.',
    Component: PricingStates,
  },
  {
    slug: 'billing',
    title: 'Billing',
    description:
      'The subscription card at the top of Account → Billing, including gifts.',
    Component: BillingStates,
  },
  {
    slug: 'usage',
    title: 'Usage',
    description: 'Account → Usage. The card shape depends on the plan.',
    Component: UsageStates,
  },
  {
    slug: 'change-plan',
    title: 'Change plan dialog',
    description:
      'One dialog with two entry points, including plan changes during a gift. Under md it renders as a bottom sheet.',
    Component: ChangePlanStates,
  },
  {
    slug: 'toasts',
    title: 'Toasts',
    description:
      'Every toast the subscription and gift flows can surface, styled as the app renders them.',
    Component: ToastStates,
  },
  {
    slug: 'gift',
    title: 'Gift link page',
    description:
      'The /gift page opened from a gift link: claim, can’t claim, claimed and broken links.',
    Component: GiftLinkStates,
  },
] as const

export function DevIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 md:px-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">Dev views</h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Every screen a user can see across subscriptions and gifts, with dummy
          data. Prices mirror the server seed. Not wired to the real API.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEV_SECTIONS.map((section) => (
          <Link
            key={section.slug}
            href={`/dev/${section.slug}`}
            className="hover:bg-muted/40 flex flex-col gap-2 rounded-xl border p-5"
          >
            <p className="font-medium">{section.title}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function DevSectionPage(props: { slug: string }) {
  const section = DEV_SECTIONS.find((entry) => entry.slug === props.slug)

  if (!section) throw new Error(`Unknown dev section: ${props.slug}`)

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 md:px-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">
          <Link
            href="/dev"
            aria-label={`${section.title}, back to all dev views`}
            className="inline-flex items-center gap-2 hover:opacity-80"
          >
            <ArrowLeft className="size-5" />
            {section.title}
          </Link>
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          {section.description}
        </p>
      </div>

      <section.Component />
    </div>
  )
}
