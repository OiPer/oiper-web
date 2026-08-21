import { z } from 'zod'

const isProduction = process.env.NODE_ENV === 'production'

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

const envSchema = z.object({
  OIPER_SERVER_URL: productionSafeUrl,
  PADDLE_CLIENT_TOKEN: z.string().trim().min(1),
  PADDLE_ENVIRONMENT: z
    .enum(['sandbox', 'production'])
    .optional()
    .default('sandbox'),
  ENABLE_STRIPE_CHECKOUT: z
    .enum(['true', 'false'])
    .optional()
    .default('false')
    .transform((value) => value === 'true'),
})

export const env = envSchema.parse({
  OIPER_SERVER_URL: process.env.NEXT_PUBLIC_OIPER_SERVER_URL,
  PADDLE_CLIENT_TOKEN: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
  PADDLE_ENVIRONMENT: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT,
  ENABLE_STRIPE_CHECKOUT: process.env.NEXT_PUBLIC_ENABLE_STRIPE_CHECKOUT,
})
