const DEV_SECTION_SLUGS = [
  'pricing',
  'billing',
  'usage',
  'change-plan',
  'toasts',
  'gift',
] as const

export type DevSectionSlug = (typeof DEV_SECTION_SLUGS)[number]

export function isDevSectionSlug(value: string): value is DevSectionSlug {
  return (DEV_SECTION_SLUGS as readonly string[]).includes(value)
}
