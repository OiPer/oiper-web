import { api } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'

export type CheckoutPlan = components['schemas']['PricingPlan'] & {
  plan: 'PRO' | 'MAX'
  interval: 'MONTHLY' | 'YEARLY'
}

export async function loadCheckoutPlans(
  callbackUrl: string | string[] | undefined
): Promise<CheckoutPlan[] | null> {
  if (typeof callbackUrl !== 'string') return null

  try {
    const checkout = new URL(
      callbackUrl,
      'http://internal.invalid'
    ).searchParams.get('checkout')

    if (checkout !== 'pro' && checkout !== 'max') return null

    const { data } = await api.GET('/v1/pricing')
    if (!data) return null

    return data.plans.filter(
      (plan): plan is CheckoutPlan =>
        plan.plan !== 'FREE' && plan.interval !== null
    )
  } catch {
    return null
  }
}
