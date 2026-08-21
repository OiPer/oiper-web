import { ChangePlanPreview } from './change-plan-preview'
import { CurrentPlanCardPreview } from './current-plan-card-preview'
import {
  CHANGE_PLAN_STATES,
  CURRENT_PLAN_STATES,
  PRICING_CARD_STATES,
} from './dummy-data'
import { PricingCardPreview } from './pricing-card-preview'
import { StateSection, StateTile } from './state-tile'

// Internal QA/review page: every subscription-card and change-plan-dialog
// state a user can encounter, laid out with dummy data so it can be
// reviewed and given feedback on without touching the real, API-connected
// components.
export function SubscriptionStatesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 md:px-6">
      <div>
        <h1 className="text-lg font-semibold">
          Subscription views — all states
        </h1>
        <p className="text-muted-foreground text-sm">
          Every subscription card and change-plan dialog state a user can see,
          with dummy data. Not linked from any nav, not wired to the real API —
          for review only.
        </p>
      </div>

      <StateSection
        id="pricing-cards"
        title="Pricing cards"
        description="Homepage #pricing section — Free / Pro / Max cards, shown for both anonymous and signed-in visitors."
      >
        <div className="grid gap-6 rounded-2xl bg-[#0a0a0a] p-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_CARD_STATES.map((state) => (
            <div key={state.title} className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  {state.title}
                </p>
                <p className="text-xs leading-relaxed text-white/40">
                  {state.description}
                </p>
              </div>
              <PricingCardPreview card={state.card} />
            </div>
          ))}
        </div>
      </StateSection>

      <StateSection
        id="current-plan"
        title="Current plan card"
        description="Account → Billing page, top section — the account's live subscription status."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CURRENT_PLAN_STATES.map((state) => (
            <StateTile
              key={state.title}
              title={state.title}
              description={state.description}
            >
              <CurrentPlanCardPreview card={state.card} />
            </StateTile>
          ))}
        </div>
      </StateSection>

      <StateSection
        id="change-plan-dialog"
        title="Change Plan dialog"
        description="Same dialog, two entry points: the 'Change plan' button on Account → Billing, and a pricing-card CTA on the homepage. Shown here as static frames (not real popups) so every state stays visible at once."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {CHANGE_PLAN_STATES.map((state) => (
            <StateTile
              key={state.title}
              title={state.title}
              description={state.description}
              note={state.entryNote}
            >
              <ChangePlanPreview state={state} />
            </StateTile>
          ))}
        </div>
      </StateSection>
    </div>
  )
}
