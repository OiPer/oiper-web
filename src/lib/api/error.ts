import type { components } from '@/lib/api/schema'

type AppErrorEnvelope = components['schemas']['AppErrorEnvelope']
type AppErrorCode = components['schemas']['AppErrorCode']

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function isAppErrorEnvelope(error: unknown): error is AppErrorEnvelope {
  if (!error || typeof error !== 'object') {
    return false
  }

  const envelope = error as {
    error?: { code?: unknown; message?: unknown; details?: unknown }
  }

  return (
    typeof envelope.error?.code === 'string' &&
    typeof envelope.error?.message === 'string'
  )
}

export function getAppErrorCode(error: unknown): AppErrorCode | null {
  if (!isAppErrorEnvelope(error)) {
    return null
  }

  return error.error.code
}

export function getAppErrorDetailsCode(error: unknown): string | null {
  if (!isAppErrorEnvelope(error)) {
    return null
  }

  const { details } = error.error

  if (!details || typeof details !== 'object' || !('code' in details)) {
    return null
  }

  const code = details.code

  return typeof code === 'string' && code.trim() ? code : null
}

export function getAppErrorMessage(
  error: unknown,
  fallback = 'Something went wrong!'
): string {
  if (isAppErrorEnvelope(error)) {
    return error.error.message
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  if (typeof error === 'string' && error.trim()) {
    return error
  }

  return fallback
}
