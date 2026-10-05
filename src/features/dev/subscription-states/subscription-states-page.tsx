'use client'

import { IntervalToggle } from '@/components/shared/interval-toggle'
import { LayoutGroup } from 'framer-motion'
import { ChangePlanPreview } from './change-plan-preview'
import { CurrentPlanCardPreview } from './current-plan-card-preview'
import {
  CHANGE_PLAN_STATES,
  CURRENT_PLAN_STATES,
  PRICING_CARD_STATES,
  TOAST_STATES,
  USAGE_CARD_STATES,
  type ChangePlanState,
  type CurrentPlanCardState,
  type PricingCardState,
  type UsageCardState,
} from './dummy-data'
import { PricingCardPreview } from './pricing-card-preview'
import { StateSection, StateTile } from './state-tile'
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

function byGroup<T extends { title: string }>(
  states: T[],
  titles: string[]
): T[] {
  return states.filter((state) => titles.includes(state.title))
}

export function SubscriptionStatesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-14 md:px-6">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">
          Subscription views
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Every screen a user can see across the subscription flow with dummy
          data. Prices mirror the server seed. Not wired to the real API.
        </p>
      </div>

      <StateSection
        id="pricing-cards"
        title="1 · Home pricing"
        description="The landing page cards and the Monthly/Yearly toggle. Cards render the real PlanCard so they are pixel exact."
      >
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
            <div className="grid gap-6 rounded-2xl border bg-[#0a0a0a] p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {PRICING_CARD_STATES.filter(
                (state) => state.title === 'Free'
              ).map((state) => (
                <PricingTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Signed out or lapsed">
            <div className="grid gap-6 rounded-2xl border bg-[#0a0a0a] p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {byGroup(PRICING_CARD_STATES, [
                'Pro · loading',
                'Pro · visitor',
                'Pro · signed in on Free',
                'Pro · Stripe disabled',
              ]).map((state) => (
                <PricingTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Checkout in progress">
            <div className="grid gap-6 rounded-2xl border bg-[#0a0a0a] p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {byGroup(PRICING_CARD_STATES, [
                'Pro · Paddle submitting',
                'Pro · Stripe submitting',
              ]).map((state) => (
                <PricingTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Yearly">
            <div className="grid gap-6 rounded-2xl border bg-[#0a0a0a] p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {byGroup(PRICING_CARD_STATES, [
                'Pro · yearly',
                'Max · yearly',
              ]).map((state) => (
                <PricingTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Active subscribers">
            <div className="grid gap-6 rounded-2xl border bg-[#0a0a0a] p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
              {byGroup(PRICING_CARD_STATES, [
                'Pro · current plan',
                'Max · current plan',
                'Pro · Switch',
                'Max · Switch locked',
              ]).map((state) => (
                <PricingTile key={state.title} state={state} />
              ))}
            </div>
          </Group>
        </div>
      </StateSection>

      <StateSection
        id="current-plan"
        title="2 · Billing"
        description="The subscription card at the top of Account → Billing."
      >
        <div className="flex flex-col gap-8">
          <Group title="Loading and errors">
            <div className="grid gap-5 md:grid-cols-2">
              {byGroup(CURRENT_PLAN_STATES, [
                'Loading',
                'Fetch error',
                'Stale after refresh error',
              ]).map((state) => (
                <CurrentPlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Free">
            <div className="grid gap-5 md:grid-cols-2">
              {byGroup(CURRENT_PLAN_STATES, ['Free', 'Checkout return']).map(
                (state) => (
                  <CurrentPlanTile key={state.title} state={state} />
                )
              )}
            </div>
          </Group>

          <Group title="Healthy">
            <div className="grid gap-5 md:grid-cols-2">
              {byGroup(CURRENT_PLAN_STATES, [
                'Active',
                'No upcoming payment',
                'Downgrade scheduled',
              ]).map((state) => (
                <CurrentPlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Problem states">
            <div className="grid gap-5 md:grid-cols-2">
              {byGroup(CURRENT_PLAN_STATES, [
                'Past due',
                'Paused',
                'Cancelling',
                'Past due and cancelling',
                'Scheduled and cancelling',
              ]).map((state) => (
                <CurrentPlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Busy">
            <div className="grid gap-5 md:grid-cols-2">
              {byGroup(CURRENT_PLAN_STATES, [
                'Plan change landing',
                'Portal opening',
                'Resuming',
              ]).map((state) => (
                <CurrentPlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>
        </div>
      </StateSection>

      <StateSection
        id="usage"
        title="3 · Usage"
        description="Account → Usage. The card shape depends on the plan."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {USAGE_CARD_STATES.map((state) => (
            <UsageTile key={state.title} state={state} />
          ))}
        </div>
      </StateSection>

      <StateSection
        id="change-plan-dialog"
        title="4 · Change plan dialog"
        description="One dialog with two entry points. Static frames below; under md the same content renders as a bottom sheet."
      >
        <div className="flex flex-col gap-8">
          <Group title="Entry points">
            <div className="grid gap-5 lg:grid-cols-2">
              {byGroup(CHANGE_PLAN_STATES, [
                'From Billing',
                'From a pricing card',
              ]).map((state) => (
                <ChangePlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Current plan selected">
            <div className="grid gap-5 lg:grid-cols-2">
              {byGroup(CHANGE_PLAN_STATES, [
                'Current plan selected',
                'Current plan and cancelling',
              ]).map((state) => (
                <ChangePlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Loading and errors">
            <div className="grid gap-5 lg:grid-cols-2">
              {byGroup(CHANGE_PLAN_STATES, [
                'Fetching preview',
                'Error · not allowed',
                'Error · no subscription',
                'Error · payment failed',
                'Error · anything else',
                'No catalog',
              ]).map((state) => (
                <ChangePlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Blocked">
            <div className="grid gap-5 lg:grid-cols-2">
              {byGroup(CHANGE_PLAN_STATES, [
                'Blocked · cancelling',
                'Blocked · paused',
                'Blocked · resuming',
              ]).map((state) => (
                <ChangePlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Previews">
            <div className="grid gap-5 lg:grid-cols-2">
              {byGroup(CHANGE_PLAN_STATES, [
                'Upgrade · charged today',
                'Upgrade · credit covers part',
                'Immediate · nothing due',
                'Downgrade · Paddle',
                'Downgrade · Stripe',
              ]).map((state) => (
                <ChangePlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Busy">
            <div className="grid gap-5 lg:grid-cols-2">
              {byGroup(CHANGE_PLAN_STATES, ['Confirming']).map((state) => (
                <ChangePlanTile key={state.title} state={state} />
              ))}
            </div>
          </Group>

          <Group title="Mobile">
            <div className="grid gap-5 sm:grid-cols-2">
              {byGroup(CHANGE_PLAN_STATES, [
                'Upgrade · charged today',
                'Blocked · paused',
              ]).map((state) => (
                <ChangePlanMobileTile key={state.title} state={state} />
              ))}
            </div>
          </Group>
        </div>
      </StateSection>

      <StateSection
        id="toasts"
        title="5 · Toasts"
        description="Every toast the flow can surface, styled as the app renders them."
      >
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
      </StateSection>
    </div>
  )
}
