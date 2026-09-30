import type { paths } from '@/lib/api/schema'

type ResponseBody<T> = T extends { content: { 'application/json': infer B } }
  ? B
  : never

type AppErrorCodeOf<Responses> = {
  [K in keyof Responses]: ResponseBody<Responses[K]> extends {
    error: { code: infer Code }
  }
    ? Code
    : never
}[keyof Responses]

export type ErrorCodeOf<
  Path extends keyof paths,
  Method extends keyof paths[Path] & string,
> = paths[Path][Method] extends { responses: infer R }
  ? AppErrorCodeOf<R>
  : never

export type ErrorResponse = {
  error: {
    type: string
    code: string
    message: string
    details?: unknown
  }
  requestId: string
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function isAppErrorEnvelope(error: unknown): error is ErrorResponse {
  if (!error || typeof error !== 'object') return false
  const envelope = error as ErrorResponse

  return (
    typeof envelope.error?.type === 'string' &&
    typeof envelope.error?.code === 'string' &&
    typeof envelope.error?.message === 'string'
  )
}

export function getAppErrorCode<
  Method extends keyof paths[Path] & string,
  Path extends keyof paths,
>(error: unknown): ErrorCodeOf<Path, Method> | null {
  if (!isAppErrorEnvelope(error)) return null
  return error.error.code as ErrorCodeOf<Path, Method>
}
