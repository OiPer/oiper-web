import z from 'zod'

export const desktopStateSchema = z
  .string()
  .min(16)
  .max(512)
  .regex(/^[a-zA-Z0-9._~-]+$/)
