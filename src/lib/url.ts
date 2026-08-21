type QueryValue = string | number | boolean
type QueryParams = Record<string, QueryValue | QueryValue[] | null | undefined>

export function joinUrl(
  ...args: [...paths: string[], query: QueryParams]
): string
export function joinUrl(...args: string[]): string
export function joinUrl(...args: unknown[]): string {
  const query =
    typeof args.at(-1) === 'object' ? (args.pop() as QueryParams) : null
  const [base, ...paths] = args as string[]

  const url = new URL(
    paths.map((path) => path.replace(/^\/|\/$/g, '')).join('/'),
    base.endsWith('/') ? base : `${base}/`
  )

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value == null) continue
    for (const item of Array.isArray(value) ? value : [value]) {
      url.searchParams.append(key, String(item))
    }
  }

  return url.toString()
}
