declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export type EventDetails = Record<string, string | number | boolean>

const SUFFIXES = {
  click: 'clicked',
  view: 'viewed',
  select: 'selected',
  open: 'opened',
  close: 'closed',
  start: 'started',
  complete: 'completed',
  submit: 'submitted',
  error: 'failed',
} as const

function snakeCase(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function send(
  verb: keyof typeof SUFFIXES,
  name: string,
  location: string,
  details: EventDetails = {}
) {
  const params = Object.fromEntries(
    Object.entries({ location, ...details }).map(([key, value]) => [
      key,
      typeof value === 'string' ? snakeCase(value) : value,
    ])
  )

  window.gtag?.('event', `${snakeCase(name)}_${SUFFIXES[verb]}`, params)
}

export function logClick(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('click', name, location, details)
}

export function logView(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('view', name, location, details)
}

export function logSelect(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('select', name, location, details)
}

export function logOpen(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('open', name, location, details)
}

export function logClose(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('close', name, location, details)
}

export function logStart(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('start', name, location, details)
}

export function logComplete(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('complete', name, location, details)
}

export function logSubmit(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('submit', name, location, details)
}

export function logError(
  name: string,
  location: string,
  details?: EventDetails
) {
  send('error', name, location, details)
}
