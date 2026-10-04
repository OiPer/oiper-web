import { PlanCard } from '@/features/landing-page/components/plan-card'
import type { PricingCardState } from './dummy-data'

// Renders the real PlanCard with fixture props — the component is purely
// presentational, so this is the exact production markup.
export function PricingCardPreview(props: { card: PricingCardState['card'] }) {
  return <PlanCard {...props.card} />
}
