'use client'

import { logClick, logSelect } from '@/lib/analytics'
import { formatCurrencyFromCents, planDisplayName } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import type { CheckoutPlan } from './checkout-plans'

type Plan = 'PRO' | 'MAX'
type Interval = 'MONTHLY' | 'YEARLY'

const BASE = 'http://internal.invalid'
const PLANS: Plan[] = ['PRO', 'MAX']
const INTERVALS: Interval[] = ['MONTHLY', 'YEARLY']

function useCheckoutIntent(plans: CheckoutPlan[]) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  if (!callbackUrl) return null

  const target = new URL(callbackUrl, BASE)
  if (target.origin !== BASE) return null

  const checkout = target.searchParams.get('checkout')
  if (checkout !== 'pro' && checkout !== 'max') return null

  const plan: Plan = checkout === 'max' ? 'MAX' : 'PRO'
  const interval: Interval =
    target.searchParams.get('interval') === 'yearly' ? 'YEARLY' : 'MONTHLY'

  function find(entryPlan: Plan, entryInterval: Interval) {
    return plans.find(
      (entry) => entry.plan === entryPlan && entry.interval === entryInterval
    )
  }

  const selected = find(plan, interval)
  if (!selected) return null

  function save(next: URL) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('callbackUrl', `${next.pathname}${next.search}`)
    window.history.replaceState(null, '', `${pathname}?${params}`)
  }

  function choose(nextPlan: Plan, nextInterval: Interval) {
    if (nextPlan === plan && nextInterval === interval) return

    const next = new URL(target)
    next.searchParams.set('checkout', nextPlan.toLowerCase())
    next.searchParams.set('interval', nextInterval.toLowerCase())

    logSelect('checkout_plan', 'auth', {
      plan: nextPlan.toLowerCase(),
      interval: nextInterval.toLowerCase(),
    })
    save(next)
  }

  function skip() {
    const next = new URL(target)
    next.searchParams.delete('checkout')
    next.searchParams.delete('interval')
    next.searchParams.delete('provider')

    logClick('skip_checkout', 'auth')
    save(next)
  }

  function monthlyPrice(entryPlan: Plan, entryInterval: Interval) {
    const entry = find(entryPlan, entryInterval)
    if (!entry) return null

    const cents =
      entryInterval === 'YEARLY'
        ? Math.round(entry.priceAmountCents / 12)
        : entry.priceAmountCents

    return formatCurrencyFromCents(cents)
  }

  function savePercent(entryPlan: Plan) {
    const monthly = find(entryPlan, 'MONTHLY')
    const yearly = find(entryPlan, 'YEARLY')
    if (!monthly || !yearly) return 0

    return Math.round(
      (1 - yearly.priceAmountCents / (monthly.priceAmountCents * 12)) * 100
    )
  }

  function billing(entryPlan: Plan, entryInterval: Interval) {
    const entry = find(entryPlan, entryInterval)
    if (!entry) return ''
    if (entryInterval === 'MONTHLY') return 'Billed monthly'

    return `${formatCurrencyFromCents(entry.priceAmountCents)} billed yearly`
  }

  return {
    plan,
    interval,
    selected,
    choose,
    skip,
    monthlyPrice,
    savePercent,
    billing,
  }
}

type Intent = NonNullable<ReturnType<typeof useCheckoutIntent>>

function Segmented<T extends string>(props: {
  value: T
  options: { value: T; label: ReactNode }[]
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid auto-cols-fr grid-flow-col rounded-md border border-white/15 bg-white/5 p-0.5',
        props.className
      )}
    >
      {props.options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={props.value === option.value}
          onClick={() => props.onChange(option.value)}
          className={cn(
            'rounded px-3 py-1.5 text-xs font-medium whitespace-nowrap',
            props.value === option.value
              ? 'bg-white text-[#0a0a0a]'
              : 'text-white/65 hover:text-white'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function planOptions() {
  return PLANS.map((plan) => ({ value: plan, label: planDisplayName(plan) }))
}

function intervalOptions(intent: Intent) {
  const save = intent.savePercent(intent.plan)

  return INTERVALS.map((interval) => ({
    value: interval,
    label:
      interval === 'MONTHLY'
        ? 'Monthly'
        : save > 0
          ? `Yearly, save ${save}%`
          : 'Yearly',
  }))
}

function SkipLink(props: { intent: Intent; className?: string }) {
  return (
    <button
      type="button"
      onClick={props.intent.skip}
      className={cn(
        'text-xs text-white/50 underline underline-offset-4 hover:text-white',
        props.className
      )}
    >
      Continue without upgrading
    </button>
  )
}

function Summary({ intent }: { intent: Intent }) {
  return (
    <div className="w-full text-white lg:pt-2">
      <p className="text-sm text-white/55">Your upgrade</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">
        OiPer {planDisplayName(intent.plan)}
      </h2>
      <p className="mt-3 text-2xl font-semibold">
        {intent.monthlyPrice(intent.plan, intent.interval)}
        <span className="text-sm font-normal text-white/55"> / month</span>
      </p>
      <p className="text-sm text-white/55">
        {intent.billing(intent.plan, intent.interval)}
      </p>

      <div className="mt-5 grid max-w-sm gap-2">
        <Segmented
          value={intent.plan}
          options={planOptions()}
          onChange={(plan) => intent.choose(plan, intent.interval)}
        />
        <Segmented
          value={intent.interval}
          options={intervalOptions(intent)}
          onChange={(interval) => intent.choose(intent.plan, interval)}
        />
      </div>

      <ul className="mt-6 hidden space-y-2 lg:block">
        {intent.selected.features.map((feature) => (
          <li key={feature.label} className="flex gap-2 text-sm text-white/75">
            <Check className="mt-0.5 size-4 shrink-0 text-white/55" />
            {feature.label}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-white/55">
        Create your account, then you go straight to secure checkout.
      </p>
      <SkipLink intent={intent} className="mt-2" />
    </div>
  )
}

export function CheckoutSummary(props: { plans: CheckoutPlan[] }) {
  const intent = useCheckoutIntent(props.plans)

  if (!intent) return null

  return <Summary intent={intent} />
}

function InlineSelect<T extends string>(props: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <span className="relative inline-block border-b border-dotted border-current font-medium text-white">
      <select
        aria-label={props.label}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value as T)}
        className="field-sizing-content cursor-pointer appearance-none bg-transparent pr-4 outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#121212] text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-0 size-3.5 -translate-y-1/2" />
    </span>
  )
}

function PlanSelect({ intent }: { intent: Intent }) {
  return (
    <InlineSelect
      label="Plan"
      value={intent.plan}
      options={planOptions()}
      onChange={(plan) => intent.choose(plan, intent.interval)}
    />
  )
}

function IntervalSelect({ intent }: { intent: Intent }) {
  return (
    <InlineSelect
      label="Billing"
      value={intent.interval}
      options={[
        { value: 'MONTHLY', label: 'monthly' },
        { value: 'YEARLY', label: 'yearly' },
      ]}
      onChange={(interval) => intent.choose(intent.plan, interval)}
    />
  )
}

const LINE = 'text-sm leading-6 text-white/65'

function LineSentence({ intent }: { intent: Intent }) {
  return (
    <p className={LINE}>
      After signing up you go to checkout for <PlanSelect intent={intent} />{' '}
      billed <IntervalSelect intent={intent} />.
    </p>
  )
}

function LinePrice({ intent }: { intent: Intent }) {
  return (
    <p className={LINE}>
      Then checkout: <PlanSelect intent={intent} />,{' '}
      <IntervalSelect intent={intent} /> ·{' '}
      <span className="whitespace-nowrap text-white">
        {intent.monthlyPrice(intent.plan, intent.interval)}/mo
      </span>
    </p>
  )
}

function LineSingle({ intent }: { intent: Intent }) {
  const options = PLANS.flatMap((plan) =>
    INTERVALS.map((interval) => ({
      value: `${plan}:${interval}`,
      label: `${planDisplayName(plan)}, ${interval === 'MONTHLY' ? 'monthly' : 'yearly'} at ${intent.monthlyPrice(plan, interval)}/mo`,
    }))
  )

  return (
    <p className={LINE}>
      You continue to{' '}
      <InlineSelect
        label="Plan"
        value={`${intent.plan}:${intent.interval}` as string}
        options={[...options, { value: 'skip', label: 'no plan for now' }]}
        onChange={(value) => {
          if (value === 'skip') return intent.skip()

          const [plan, interval] = value.split(':') as [Plan, Interval]
          intent.choose(plan, interval)
        }}
      />{' '}
      checkout after signing up.
    </p>
  )
}

function LineSkip({ intent }: { intent: Intent }) {
  return (
    <p className={LINE}>
      Upgrading to <PlanSelect intent={intent} />{' '}
      <IntervalSelect intent={intent} /> next.{' '}
      <button
        type="button"
        onClick={intent.skip}
        className="text-white/50 underline underline-offset-4 hover:text-white"
      >
        Not now
      </button>
    </p>
  )
}

function LineRow({ intent }: { intent: Intent }) {
  return (
    <div className="flex items-center justify-between gap-3 border-y border-white/10 py-2.5 text-sm text-white/65">
      <span>
        <PlanSelect intent={intent} /> <IntervalSelect intent={intent} />
      </span>
      <span className="whitespace-nowrap">
        <span className="text-white">
          {intent.monthlyPrice(intent.plan, intent.interval)}
        </span>{' '}
        / month
      </span>
    </div>
  )
}

export function CheckoutLine(props: {
  plans: CheckoutPlan[]
  variant: number
}) {
  const intent = useCheckoutIntent(props.plans)

  if (!intent) return null

  switch (props.variant) {
    case 2:
      return <LinePrice intent={intent} />
    case 3:
      return <LineSingle intent={intent} />
    case 4:
      return <LineSkip intent={intent} />
    case 5:
      return <LineRow intent={intent} />
    default:
      return <LineSentence intent={intent} />
  }
}
