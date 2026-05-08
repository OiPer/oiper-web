import { z } from 'zod'

const authEnvSchema = z.object({
  OIPER_SERVER_BASE_URL: z.string().url(),
})

let parsedEnv: z.infer<typeof authEnvSchema> | null = null

export function getAuthEnv() {
  if (parsedEnv) return parsedEnv

  const parsed = authEnvSchema.safeParse(process.env)

  if (!parsed.success) {
    throw new Error(
      `Invalid auth env: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
    )
  }

  parsedEnv = parsed.data
  return parsedEnv
}
