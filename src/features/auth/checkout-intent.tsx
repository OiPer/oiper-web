'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

function SkipText(props: { onSkip: () => void; className?: string }) {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={props.onSkip}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return

        event.preventDefault()
        props.onSkip()
      }}
      className={cn(
        'cursor-pointer underline underline-offset-4 outline-none hover:text-white focus-visible:text-white',
        props.className
      )}
    >
      continue without upgrading
    </span>
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
        Once your account is ready, you&apos;ll go straight to checkout, or{' '}
        <SkipText onSkip={intent.skip} />.
      </p>
    </div>
  )
}

export function CheckoutSummary(props: { plans: CheckoutPlan[] }) {
  const intent = useCheckoutIntent(props.plans)

  if (!intent) return null

  return <Summary intent={intent} />
}

function InlineMenu<T extends string>(props: {
  label: string
  value: T
  options: { value: T; label: string; hint?: string }[]
  onChange: (value: T) => void
}) {
  const selected = props.options.find((option) => option.value === props.value)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={props.label}
        className="inline-flex items-center gap-0.5 border-b border-dotted border-current font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {selected?.label}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-48 border-white/12 bg-[#121212] text-white shadow-2xl"
      >
        {props.options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => props.onChange(option.value)}
            className={cn(
              'cursor-pointer gap-3 px-2.5 py-1',
              option.value === props.value && 'bg-accent text-accent-foreground'
            )}
          >
            <span className="flex-1">{option.label}</span>
            {option.hint ? (
              <span className="text-white/55">{option.hint}</span>
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function CheckoutLine(props: {
  plans: CheckoutPlan[]
  page: 'signin' | 'signup'
}) {
  const intent = useCheckoutIntent(props.plans)

  if (!intent) return null

  const save = intent.savePercent(intent.plan)

  return (
    <p className="text-sm leading-6 text-white/65">
      {props.page === 'signup'
        ? 'Once your account is ready'
        : 'After you sign in'}
      , you will be taken to{' '}
      <InlineMenu
        label="Plan"
        value={intent.plan}
        options={PLANS.map((plan) => ({
          value: plan,
          label: planDisplayName(plan),
          hint: `${intent.monthlyPrice(plan, intent.interval)}/month`,
        }))}
        onChange={(plan) => intent.choose(plan, intent.interval)}
      />{' '}
      checkout, billed{' '}
      <InlineMenu
        label="Billing"
        value={intent.interval}
        options={[
          { value: 'MONTHLY', label: 'monthly' },
          {
            value: 'YEARLY',
            label: 'yearly',
            hint: save > 0 ? `save ${save}%` : undefined,
          },
        ]}
        onChange={(interval) => intent.choose(intent.plan, interval)}
      />{' '}
      at{' '}
      <span className="whitespace-nowrap text-white">
        {intent.monthlyPrice(intent.plan, intent.interval)}/month
      </span>
      , or <SkipText onSkip={intent.skip} className="text-white/50" />.
    </p>
  )
}
