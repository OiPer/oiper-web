import { api } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'

export type CheckoutPlan = components['schemas']['PricingPlan'] & {
  plan: 'PRO' | 'MAX'
  interval: 'MONTHLY' | 'YEARLY'
}

export async function loadCheckoutPlans(): Promise<CheckoutPlan[] | null> {
  try {
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
