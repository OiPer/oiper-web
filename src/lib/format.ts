const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const integerFormatter = new Intl.NumberFormat('en-US')

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

export function planDisplayName(plan: 'PRO' | 'MAX') {
  return plan === 'PRO' ? 'Pro' : 'Max'
}

export function intervalDisplayName(interval: 'MONTHLY' | 'YEARLY') {
  return interval === 'MONTHLY' ? 'Monthly' : 'Yearly'
}

export function subscriptionPlanLabel(
  plan: 'FREE' | 'PRO' | 'MAX',
  interval: 'MONTHLY' | 'YEARLY' | null
) {
  if (plan === 'FREE') return 'Free'
  return interval
    ? `${planDisplayName(plan)} · ${intervalDisplayName(interval)}`
    : planDisplayName(plan)
}

export function formatLabel(value: string) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

export function formatCompactNumber(value: number) {
  return compactNumberFormatter.format(value)
}

export function formatInteger(value: number) {
  return integerFormatter.format(value)
}

export function formatCurrency(value: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

export function formatCurrencyFromCents(cents: number, currency = 'USD') {
  return formatCurrency(cents / 100, currency.toUpperCase())
}

export function formatDate(value: string | number | Date) {
  return dateFormatter.format(new Date(value)).replace(/,/g, '')
}

export function formatDateTime(value: string | number | Date) {
  return dateTimeFormatter.format(new Date(value)).replace(/,/g, '')
}

export function formatMinutes(value: number, digits = 0) {
  return `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)} min`
}

export function formatDurationFromSeconds(seconds: number) {
  if (seconds < 60) {
    return `${Math.max(1, Math.round(seconds))} sec`
  }

  const minutes = seconds / 60
  return formatMinutes(minutes, minutes >= 10 ? 0 : 1)
}

export function formatPercentage(value: number, digits = 0) {
  return `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)}%`
}

// Rounds a savings percent down to the nearest 5 and marks it with a "+"
// whenever that rounding actually drops precision (22% -> "20%+"), so we
// never advertise a bigger discount than the plan really has.
export function formatSavePercent(percent: number) {
  const rounded = Math.floor(percent / 5) * 5
  return rounded === percent ? `${percent}%` : `${rounded}%+`
}
