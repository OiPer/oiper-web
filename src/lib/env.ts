import { z } from 'zod'

const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production'

const productionSafeUrl = z
  .url()
  .trim()
  .refine((value) => !isProduction || new URL(value).protocol === 'https:', {
    message: 'must be an https URL in production',
  })
  .refine(
    (value) =>
      !isProduction ||
      !['localhost', '127.0.0.1'].includes(new URL(value).hostname),
    { message: 'must not point at localhost in production' }
  )
  .transform((value) => value.replace(/\/+$/, ''))

const baseUrl = productionSafeUrl
  .refine(
    (value) => {
      const url = new URL(value)
      return url.pathname === '/' && !url.search && !url.hash
    },
    { message: 'must be an origin without a path, like https://oiper.com' }
  )
  .transform((value) => new URL(value).origin)

const optionalValue = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined)

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production']),
    APP_ENV: z.enum(['development', 'production']),
    OIPER_SERVER_URL: productionSafeUrl,
    BASE_URL: baseUrl,
    PADDLE_CLIENT_TOKEN: z.string().trim().min(1),
    GA_MEASUREMENT_ID: optionalValue.pipe(
      z
        .string()
        .regex(/^G-[A-Z0-9]+$/)
        .optional()
    ),
    GOOGLE_SITE_VERIFICATION: optionalValue,
  })
  .transform((value) => ({
    ...value,
    PADDLE_ENVIRONMENT:
      value.APP_ENV === 'production'
        ? ('production' as const)
        : ('sandbox' as const),
    ENABLE_STRIPE_CHECKOUT: value.APP_ENV !== 'production',
  }))

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  OIPER_SERVER_URL: process.env.NEXT_PUBLIC_OIPER_SERVER_URL,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  PADDLE_CLIENT_TOKEN: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
})
