import { z } from 'zod'

const desktopStateSchema = z
  .string()
  .min(16)
  .max(512)
  .regex(/^[a-zA-Z0-9._~-]+$/)

export function parseDesktopState(state: string | null): string | null {
  if (!state) return null
  const parsed = desktopStateSchema.safeParse(state)
  return parsed.success ? parsed.data : null
}
