const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const integerFormatter = new Intl.NumberFormat('en-US')

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

function normalizeLabel(value: string) {
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
  return dateFormatter.format(new Date(value))
}

export function formatDateTime(value: string | number | Date) {
  return dateTimeFormatter.format(new Date(value))
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

export function formatStatusLabel(value: string) {
  return normalizeLabel(value)
}

export function formatPlanLabel(value: string) {
  return normalizeLabel(value)
}
