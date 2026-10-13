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
import { ChevronDown } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { CheckoutPlan } from './checkout-plans'

type Plan = 'PRO' | 'MAX'
type Interval = 'MONTHLY' | 'YEARLY'

const BASE = 'http://internal.invalid'
const PLANS: Plan[] = ['PRO', 'MAX']

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

  return {
    plan,
    interval,
    choose,
    skip,
    monthlyPrice,
    savePercent,
  }
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
        className="group min-w-36 border-white/12 bg-[#121212] text-white shadow-2xl"
      >
        {props.options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => props.onChange(option.value)}
            className={cn(
              'cursor-pointer gap-3 px-2.5 py-1',
              option.value === props.value &&
                'bg-accent text-accent-foreground group-has-data-highlighted:not-data-highlighted:bg-transparent group-has-data-highlighted:not-data-highlighted:text-white'
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
