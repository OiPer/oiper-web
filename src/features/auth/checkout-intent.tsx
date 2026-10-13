'use client'

import { logClick, logSelect } from '@/lib/analytics'
import { formatCurrencyFromCents, planDisplayName } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState, type ReactNode } from 'react'
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

const PANEL =
  'w-full rounded-xl border border-white/15 bg-black/45 text-white shadow-2xl shadow-black/30 backdrop-blur-xl'

function SummaryCard({ intent }: { intent: Intent }) {
  return (
    <div className={cn(PANEL, 'space-y-4 p-5')}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-white/55">
            After you sign up, you go straight to checkout
          </p>
          <p className="mt-1 text-base font-semibold">
            OiPer {planDisplayName(intent.plan)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold">
            {intent.monthlyPrice(intent.plan, intent.interval)}
            <span className="text-xs font-normal text-white/55"> / month</span>
          </p>
          <p className="text-xs text-white/55">
            {intent.billing(intent.plan, intent.interval)}
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-[2fr_3fr]">
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

      <SkipLink intent={intent} />
    </div>
  )
}

function AttachedStrip({ intent }: { intent: Intent }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div
      className={cn(PANEL, '-mb-4 rounded-b-none border-b-0 px-5 pt-4 pb-7')}
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="text-white/55">Checkout next: </span>
          <span className="font-medium">
            {planDisplayName(intent.plan)},{' '}
            {intent.interval === 'MONTHLY' ? 'monthly' : 'yearly'} ·{' '}
            {intent.monthlyPrice(intent.plan, intent.interval)}/mo
          </span>
        </p>
        <button
          type="button"
          onClick={() => setIsEditing((value) => !value)}
          className="shrink-0 text-xs text-white/65 underline underline-offset-4 hover:text-white"
        >
          {isEditing ? 'Done' : 'Change'}
        </button>
      </div>

      {isEditing ? (
        <div className="mt-3 space-y-3">
          <div className="grid gap-2 sm:grid-cols-[2fr_3fr]">
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
          <SkipLink intent={intent} />
        </div>
      ) : null}
    </div>
  )
}

function OrderSummary({ intent }: { intent: Intent }) {
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

function PlanTiles({ intent }: { intent: Intent }) {
  return (
    <div className="w-full space-y-3 text-white">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/65">Choose your plan</p>
        <Segmented
          value={intent.interval}
          options={intervalOptions(intent)}
          onChange={(interval) => intent.choose(intent.plan, interval)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PLANS.map((plan) => (
          <button
            key={plan}
            type="button"
            aria-pressed={intent.plan === plan}
            onClick={() => intent.choose(plan, intent.interval)}
            className={cn(
              PANEL,
              'p-4 text-left',
              intent.plan === plan
                ? 'border-white/70'
                : 'text-white/70 hover:border-white/30'
            )}
          >
            <span className="flex items-center justify-between">
              <span className="text-sm font-semibold">
                {planDisplayName(plan)}
              </span>
              {intent.plan === plan ? <Check className="size-4" /> : null}
            </span>
            <span className="mt-2 block text-lg font-semibold">
              {intent.monthlyPrice(plan, intent.interval)}
              <span className="text-xs font-normal text-white/55">
                {' '}
                / month
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/55">
          Checkout opens right after you sign up
        </p>
        <SkipLink intent={intent} />
      </div>
    </div>
  )
}

function InlineSentence({ intent }: { intent: Intent }) {
  const selectClassName =
    'cursor-pointer appearance-none rounded border border-white/20 bg-white/5 px-1.5 py-0.5 font-medium text-white hover:border-white/40'

  return (
    <div className="w-full text-center text-sm leading-7 text-white/70">
      <p>
        Checkout after sign-up:{' '}
        <select
          aria-label="Plan"
          value={intent.plan}
          onChange={(event) =>
            intent.choose(event.target.value as Plan, intent.interval)
          }
          className={selectClassName}
        >
          {PLANS.map((plan) => (
            <option key={plan} value={plan} className="bg-[#121212]">
              {planDisplayName(plan)}
            </option>
          ))}
        </select>{' '}
        <select
          aria-label="Billing"
          value={intent.interval}
          onChange={(event) =>
            intent.choose(intent.plan, event.target.value as Interval)
          }
          className={selectClassName}
        >
          <option value="MONTHLY" className="bg-[#121212]">
            Monthly
          </option>
          <option value="YEARLY" className="bg-[#121212]">
            Yearly
          </option>
        </select>{' '}
        ·{' '}
        <span className="font-medium whitespace-nowrap text-white">
          {intent.monthlyPrice(intent.plan, intent.interval)}/month
        </span>
      </p>
      <SkipLink intent={intent} />
    </div>
  )
}

export function CheckoutIntent(props: {
  plans: CheckoutPlan[]
  variant: number
}) {
  const intent = useCheckoutIntent(props.plans)

  if (!intent) return null

  switch (props.variant) {
    case 2:
      return <AttachedStrip intent={intent} />
    case 3:
      return <OrderSummary intent={intent} />
    case 4:
      return <PlanTiles intent={intent} />
    case 5:
      return <InlineSentence intent={intent} />
    default:
      return <SummaryCard intent={intent} />
  }
}
