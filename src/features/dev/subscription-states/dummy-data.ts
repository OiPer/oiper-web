import type { GiftOffer } from '@/features/gifts/gift-page'
import type { PlanCardCta } from '@/features/landing-page/components/plan-card'

export type PricingFeature = { label: string; detail: string | null }

// Mirrors prisma/seed-pricing.ts in oiper-server — keep in sync with the real catalog.
export const FREE_FEATURES: PricingFeature[] = [
  { label: 'Unlimited Local Transcription', detail: null },
  { label: 'Global Hotkey Support', detail: null },
  { label: 'Snippet Support', detail: null },
  {
    label: 'Self-Managed Transcription',
    detail: 'Connect your own speech-to-text model',
  },
  {
    label: 'Self-Managed Formatting',
    detail: 'Connect your own text generation model',
  },
  { label: 'Community Support', detail: null },
]

export const PRO_FEATURES: PricingFeature[] = [
  { label: 'Everything in Free', detail: null },
  {
    label: '3-5x Faster Speed',
    detail:
      'Powered by frontier speech-to-text and text-generation models delivering premium-quality results where matching the same quality locally requires top-tier hardware and is still significantly slower',
  },
  {
    label: 'Everything is managed for you',
    detail:
      'Just use the app - we handle everything behind the scenes to keep it fast and reliable',
  },
  {
    label: '180 Min/Day Transcription',
    detail: '180 minutes of managed cloud transcription every day',
  },
  {
    label: 'Custom Dictionary',
    detail: 'Teach it names and specialized vocabulary unique to you',
  },
  {
    label: 'Custom Formatting Prompts',
    detail: 'Control how your transcribed text is formatted',
  },
  { label: 'Priority Email Support', detail: null },
]

export const MAX_FEATURES: PricingFeature[] = [
  { label: 'Everything in Pro', detail: null },
  {
    label: 'Unlimited Transcription',
    detail: 'Unlimited cloud transcription with fair use safeguards',
  },
  { label: 'Priority Processing', detail: null },
  { label: 'Early Access', detail: null },
]

const noop = { type: 'button', onClick: () => undefined } as const

function cta(props: {
  label: string | null
  variant?: 'default' | 'outline'
  disabled?: boolean
  loading?: boolean
  submitting?: boolean
  stripeSecondary?: 'link' | 'button' | 'submitting' | 'disabled'
}): PlanCardCta {
  const stripe = props.stripeSecondary

  return {
    cta: props.label,
    action: noop,
    disabled: props.disabled,
    loading: props.loading,
    submitting: props.submitting,
    ctaVariant: props.variant,
    secondaryCta: stripe
      ? {
          label: 'Upgrade via Stripe instead',
          action: noop,
          submitting: stripe === 'submitting',
          disabled: stripe === 'disabled',
        }
      : undefined,
  }
}

export type PricingCardState = {
  title: string
  description: string
  entryNote?: string
  card: {
    displayName: string
    price: string
    period: string
    discountPercent: number
    discountPercentFloored: number
    description: string
    features: PricingFeature[]
    featured: boolean
    cta: PlanCardCta
  }
}

const FREE_CARD = {
  displayName: 'Free',
  price: '$0',
  period: 'Forever',
  discountPercent: 0,
  discountPercentFloored: 0,
  description: 'Unlimited transcription on your machine, no limits, no cost.',
  features: FREE_FEATURES,
  featured: false,
}

const PRO_MONTHLY_CARD = {
  displayName: 'Pro',
  price: '$7.99',
  period: '/ month',
  discountPercent: 0,
  discountPercentFloored: 0,
  description: 'Managed cloud transcription with a daily allowance.',
  features: PRO_FEATURES,
  featured: true,
}

const PRO_YEARLY_CARD = {
  ...PRO_MONTHLY_CARD,
  price: '$74.99',
  period: '/ year',
  discountPercent: 22,
  discountPercentFloored: 20,
}

const MAX_MONTHLY_CARD = {
  displayName: 'Max',
  price: '$14.99',
  period: '/ month',
  discountPercent: 0,
  discountPercentFloored: 0,
  description:
    'Unlimited managed cloud transcription, subject to abuse protection.',
  features: MAX_FEATURES,
  featured: false,
}

const MAX_YEARLY_CARD = {
  ...MAX_MONTHLY_CARD,
  price: '$124.99',
  period: '/ year',
  discountPercent: 31,
  discountPercentFloored: 30,
}

export const PRICING_CARD_STATES: PricingCardState[] = [
  {
    title: 'Free',
    description: 'Never varies. The CTA is the real download button.',
    card: { ...FREE_CARD, cta: { cta: null, action: { type: 'download' } } },
  },
  {
    title: 'Pro · loading',
    description: 'Auth or subscription status is still resolving.',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({ label: null, loading: true }),
    },
  },
  {
    title: 'Pro · visitor',
    description:
      'Links to sign-up with the plan preselected so checkout starts right after.',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({ label: 'Upgrade to Pro', stripeSecondary: 'link' }),
    },
  },
  {
    title: 'Pro · signed in on Free',
    description: 'Opens Paddle checkout directly.',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({ label: 'Upgrade to Pro', stripeSecondary: 'button' }),
    },
  },
  {
    title: 'Pro · Stripe disabled',
    description: 'With Stripe checkout off there is no secondary CTA.',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({ label: 'Upgrade to Pro' }),
    },
  },
  {
    title: 'Pro · Paddle submitting',
    description: 'The Paddle overlay is opening and other CTAs lock.',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({
        label: 'Upgrade to Pro',
        submitting: true,
        stripeSecondary: 'disabled',
      }),
    },
  },
  {
    title: 'Pro · Stripe submitting',
    description: 'Same flow entered from the Stripe CTA.',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({
        label: 'Upgrade to Pro',
        disabled: true,
        stripeSecondary: 'submitting',
      }),
    },
  },
  {
    title: 'Pro · yearly',
    description: 'Yearly price with the save badge.',
    card: {
      ...PRO_YEARLY_CARD,
      cta: cta({ label: 'Upgrade to Pro', stripeSecondary: 'link' }),
    },
  },
  {
    title: 'Max · yearly',
    description: 'The non-featured card at the yearly interval.',
    card: {
      ...MAX_YEARLY_CARD,
      cta: cta({ label: 'Upgrade to Max', stripeSecondary: 'link' }),
    },
  },
  {
    title: 'Pro · current plan',
    description: 'Already on this exact plan and interval.',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({ label: 'Current Plan', variant: 'outline', disabled: true }),
    },
  },
  {
    title: 'Max · current plan',
    description: 'Already on this exact plan and interval.',
    card: {
      ...MAX_MONTHLY_CARD,
      cta: cta({ label: 'Current Plan', variant: 'outline', disabled: true }),
    },
  },
  {
    title: 'Pro · Switch',
    description:
      'Opens the in-app change dialog preselected to this card on either provider.',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({ label: 'Switch', variant: 'outline' }),
    },
  },
  {
    title: 'Pro · on a Pro gift',
    description:
      "The gift's plan reads Current Plan on both intervals, like a subscriber's.",
    entryNote: 'On a gift',
    card: {
      ...PRO_MONTHLY_CARD,
      cta: cta({ label: 'Current Plan', variant: 'outline', disabled: true }),
    },
  },
  {
    title: 'Max · on a Pro gift',
    description:
      'Switch opens the change dialog, which shows the gift block with End gift.',
    entryNote: 'On a gift',
    card: {
      ...MAX_MONTHLY_CARD,
      cta: cta({ label: 'Switch', variant: 'outline' }),
    },
  },
  {
    title: 'Max · Switch locked',
    description: 'A plan change was just confirmed and is still landing.',
    card: {
      ...MAX_MONTHLY_CARD,
      cta: cta({ label: 'Switch', variant: 'outline', disabled: true }),
    },
  },
]

export type CurrentPlanButton = {
  label: string
  variant?: 'default' | 'outline'
  loading?: boolean
  disabled?: boolean
}

export type CurrentPlanCardState = {
  title: string
  description: string
  entryNote?: string
  card: {
    loading?: boolean
    error?: 'none' | 'stale'
    pastDueAlert?: boolean
    pausedAlert?: boolean
    checkoutProcessing?: boolean
    note?: 'free' | 'setting-up'
    endedNote?: string
    rowsBefore?: { label: string; value: string }[]
    planRowLabel?: string
    planLabel: string
    rowsAfter?: { label: string; value: string }[]
    footnote?: string
    status?: string
    scheduledChange?: { date: string; planLabel: string }
    payment?: { label: string; date: string; amount: string }
    buttons?: CurrentPlanButton[]
  }
}

export const CURRENT_PLAN_STATES: CurrentPlanCardState[] = [
  {
    title: 'Gift · nothing set up',
    description:
      'Claimed a gift and pays nothing. Keep opens the $0-today checkout; Change plan opens the dialog, which shows the gift block.',
    card: {
      planLabel: 'Pro',
      rowsAfter: [
        { label: 'Gift from OiPer', value: 'Until November 9 2026' },
        { label: 'After your gift', value: 'Free' },
      ],
      footnote:
        'Want to keep Pro? Set it up now and your first payment comes when your gift ends on November 9 2026.',
      buttons: [
        { label: 'Keep Pro after your gift', variant: 'outline' },
        { label: 'Change plan' },
      ],
    },
  },
  {
    title: 'Gift · opening checkout',
    description: 'Keep was pressed and the Paddle checkout is opening.',
    card: {
      planLabel: 'Pro',
      rowsAfter: [
        { label: 'Gift from OiPer', value: 'Until November 9 2026' },
        { label: 'After your gift', value: 'Free' },
      ],
      footnote:
        'Want to keep Pro? Set it up now and your first payment comes when your gift ends on November 9 2026.',
      buttons: [
        {
          label: 'Keep Pro after your gift',
          variant: 'outline',
          loading: true,
        },
        { label: 'Change plan', disabled: true },
      ],
    },
  },
  {
    title: 'Gift · keeping Pro after it',
    description:
      'Paid $0 at checkout. The plan starts and is first charged when the gift ends.',
    card: {
      rowsBefore: [
        { label: 'Gift from OiPer', value: 'Pro until November 9 2026' },
      ],
      planRowLabel: 'After your gift',
      planLabel: 'Pro · Monthly',
      status: 'Active',
      payment: {
        label: 'Next payment',
        date: 'November 9 2026',
        amount: '$8.70',
      },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Change plan' },
      ],
    },
  },
  {
    title: 'Gift ended',
    description:
      'For 30 days after a gift ends with nothing set up, a line sits above the Free note.',
    card: {
      note: 'free',
      endedNote:
        'Your Pro gift ended on October 2 2026. Thanks for giving it a try.',
      planLabel: '',
    },
  },
  {
    title: 'Loading',
    description: 'The subscription query has not resolved yet.',
    card: { loading: true, planLabel: '' },
  },
  {
    title: 'Fetch error',
    description: 'Nothing loaded so only the portal button remains.',
    card: {
      error: 'none',
      planLabel: '',
      buttons: [{ label: 'Manage subscription', variant: 'outline' }],
    },
  },
  {
    title: 'Stale after refresh error',
    description: 'Rows render from the last known data.',
    card: {
      error: 'stale',
      planLabel: 'Pro · Monthly',
      status: 'Active',
      payment: {
        label: 'Next payment',
        date: 'October 14 2026',
        amount: '$7.99',
      },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Change plan' },
      ],
    },
  },
  {
    title: 'Free',
    description:
      'Never subscribed, or cancelled and expired. All show this note in a card with no title.',
    card: { note: 'free', planLabel: '' },
  },
  {
    title: 'Checkout return',
    description:
      'Payment succeeded but the webhook has not landed yet. Same note card, different text.',
    card: { checkoutProcessing: true, note: 'setting-up', planLabel: '' },
  },
  {
    title: 'Active',
    description: 'The happy path.',
    card: {
      planLabel: 'Pro · Monthly',
      status: 'Active',
      payment: {
        label: 'Next payment',
        date: 'October 14 2026',
        amount: '$7.99',
      },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Change plan' },
      ],
    },
  },
  {
    title: 'Past due',
    description:
      'The last payment failed so the portal button becomes Fix payment.',
    card: {
      pastDueAlert: true,
      planLabel: 'Max · Monthly',
      status: 'Past Due',
      payment: {
        label: 'Amount due',
        date: 'October 20 2026',
        amount: '$14.99',
      },
      buttons: [{ label: 'Fix payment' }, { label: 'Change plan' }],
    },
  },
  {
    title: 'Paused',
    description: 'No payment row while paused and Change plan becomes Resume.',
    card: {
      pausedAlert: true,
      planLabel: 'Pro · Yearly',
      status: 'Paused',
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Resume subscription' },
      ],
    },
  },
  {
    title: 'Cancelling',
    description:
      'Access runs to the period end and Keep subscription undoes it.',
    card: {
      planLabel: 'Pro · Yearly',
      status: 'Active',
      payment: { label: 'Access ends', date: 'December 1 2026', amount: '' },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Keep subscription' },
      ],
    },
  },
  {
    title: 'Downgrade scheduled',
    description:
      'Next payment already reflects the incoming plan and Change plan rebuilds the schedule.',
    card: {
      planLabel: 'Max · Yearly',
      status: 'Active',
      scheduledChange: { date: 'August 15 2027', planLabel: 'Pro · Yearly' },
      payment: {
        label: 'Next payment',
        date: 'August 15 2027',
        amount: '$74.99',
      },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Change plan' },
      ],
    },
  },
  {
    title: 'No upcoming payment',
    description:
      'The amount falls back to a dash when the provider reports none.',
    card: {
      planLabel: 'Pro · Monthly',
      status: 'Active',
      payment: { label: 'Next payment', date: 'October 14 2026', amount: '-' },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Change plan' },
      ],
    },
  },
  {
    title: 'Past due and cancelling',
    description: 'Both alerts and both action buttons at once.',
    card: {
      pastDueAlert: true,
      planLabel: 'Max · Monthly',
      status: 'Past Due',
      payment: { label: 'Access ends', date: 'October 20 2026', amount: '' },
      buttons: [{ label: 'Fix payment' }, { label: 'Keep subscription' }],
    },
  },
  {
    title: 'Scheduled and cancelling',
    description: 'A pending schedule combined with a portal cancellation.',
    card: {
      planLabel: 'Max · Yearly',
      status: 'Active',
      scheduledChange: { date: 'August 15 2027', planLabel: 'Pro · Yearly' },
      payment: { label: 'Access ends', date: 'December 1 2026', amount: '' },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Keep subscription' },
      ],
    },
  },
  {
    title: 'Plan change landing',
    description: 'Change plan stays busy until the new plan appears.',
    card: {
      planLabel: 'Pro · Monthly',
      status: 'Active',
      payment: {
        label: 'Next payment',
        date: 'October 14 2026',
        amount: '$14.99',
      },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Change plan', loading: true, disabled: true },
      ],
    },
  },
  {
    title: 'Portal opening',
    description: 'The portal session is being created.',
    card: {
      planLabel: 'Pro · Monthly',
      status: 'Active',
      payment: {
        label: 'Next payment',
        date: 'October 14 2026',
        amount: '$7.99',
      },
      buttons: [
        {
          label: 'Manage subscription',
          variant: 'outline',
          loading: true,
          disabled: true,
        },
        { label: 'Change plan', disabled: true },
      ],
    },
  },
  {
    title: 'Resuming',
    description: 'The button stays busy through the mutation and the poll.',
    card: {
      planLabel: 'Pro · Yearly',
      status: 'Active',
      payment: { label: 'Access ends', date: 'December 1 2026', amount: '' },
      buttons: [
        { label: 'Manage subscription', variant: 'outline' },
        { label: 'Keep subscription', loading: true, disabled: true },
      ],
    },
  },
]

export type SummaryRowFixture = {
  label: string
  detail?: string
  value: string
  emphasis?: 'credit'
}

export type ChangePlanOption = {
  key: string
  label: string
  pricePerMonth: string
  pricePerYear?: string
  isCurrent: boolean
  isSelected: boolean
}

function FOUR_OPTIONS(
  currentKey: string,
  selectedKey: string
): ChangePlanOption[] {
  const all = [
    {
      key: 'PRO-MONTHLY',
      label: 'Pro · Monthly',
      pricePerMonth: '$7.99 / month',
    },
    {
      key: 'PRO-YEARLY',
      label: 'Pro · Yearly',
      pricePerMonth: '$6.25 / month',
      pricePerYear: '$74.99 / year',
    },
    {
      key: 'MAX-MONTHLY',
      label: 'Max · Monthly',
      pricePerMonth: '$14.99 / month',
    },
    {
      key: 'MAX-YEARLY',
      label: 'Max · Yearly',
      pricePerMonth: '$10.42 / month',
      pricePerYear: '$124.99 / year',
    },
  ]

  return all.map((entry) => ({
    ...entry,
    isCurrent: entry.key === currentKey,
    isSelected: entry.key === selectedKey,
  }))
}

export type ChangePlanState = {
  title: string
  description: string
  entryNote?: string
  options: ChangePlanOption[]
  summary:
    | {
        kind: 'current'
        status: string
        renewLabel: string
        renewValue: string
        amountValue?: string
      }
    | { kind: 'loading' }
    | { kind: 'error'; message: string }
    | {
        kind: 'blocked'
        reason: 'ENDING' | 'PAUSED' | 'GIFT'
        periodEnd?: string
        giftEndCharge?: string
        resumeLoading?: boolean
      }
    | { kind: 'preview'; rows: SummaryRowFixture[] }
    | { kind: 'none' }
  confirmLabel: string
  confirmDisabled?: boolean
  confirmLoading?: boolean
}

export const CHANGE_PLAN_STATES: ChangePlanState[] = [
  {
    title: 'From Billing',
    description:
      'Opens on the first plan that is not the current one so a preview fires right away.',
    entryNote: 'Billing page',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'PRO-YEARLY'),
    summary: { kind: 'loading' },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'From a pricing card',
    description: 'A Switch CTA or a checkout link preselects that exact plan.',
    entryNote: 'Pricing card or checkout link',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-YEARLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Max · Yearly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Charged today',
          detail: 'Prorated for the rest of this cycle',
          value: '$117.87',
        },
        { label: 'Next payment', detail: 'January 3 2027', value: '$124.99' },
      ],
    },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Current plan selected',
    description:
      'Nothing to change so the summary is static and Confirm locks.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'current',
      status: 'Active',
      renewLabel: 'Renews',
      renewValue: 'October 14 2026',
      amountValue: '$7.99',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Current plan and cancelling',
    description: 'The label reads Access ends and the amount row is dropped.',
    options: FOUR_OPTIONS('MAX-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'current',
      status: 'Active',
      renewLabel: 'Access ends',
      renewValue: 'October 17 2026',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Fetching preview',
    description: 'Every selection change fires a preview request.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: { kind: 'loading' },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Error · not allowed',
    description: 'The server rejected this change.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-YEARLY'),
    summary: {
      kind: 'error',
      message: 'This plan change is not available right now',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Error · no subscription',
    description: 'The subscription expired elsewhere.',
    options: FOUR_OPTIONS('MAX-MONTHLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'error',
      message: "Couldn't find an active subscription for this account",
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Error · payment failed',
    description: 'The provider message is shown verbatim.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'error',
      message: 'Your payment method was declined by the issuer',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Error · anything else',
    description: 'The generic fallback.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-YEARLY'),
    summary: { kind: 'error', message: "Couldn't preview this plan change" },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'No catalog',
    description:
      'The pricing query failed or is pending so nothing renders and Confirm is left enabled. Rough edge.',
    options: [],
    summary: { kind: 'none' },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Blocked · cancelling',
    description: 'Keep subscription reverses the cancellation first.',
    options: FOUR_OPTIONS('MAX-YEARLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'blocked',
      reason: 'ENDING',
      periodEnd: 'October 14 2026',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Blocked · paused',
    description: 'Resume subscription unlocks plan changes.',
    options: FOUR_OPTIONS('PRO-YEARLY', 'PRO-MONTHLY'),
    summary: { kind: 'blocked', reason: 'PAUSED' },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Blocked · on a gift',
    description:
      'A gift blocks plan changes like a pause. End gift puts them on Free and closes the dialog.',
    entryNote: 'Pricing Switch or Billing',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: { kind: 'blocked', reason: 'GIFT', periodEnd: 'November 9 2026' },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Blocked · gift with a plan to follow',
    description:
      'Ending the gift starts the plan set to follow it, so the line says what is charged today.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'blocked',
      reason: 'GIFT',
      periodEnd: 'November 9 2026',
      giftEndCharge: '$8.70',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Blocked · ending gift',
    description:
      'End gift spins while the gift ends (and the plan is charged).',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'blocked',
      reason: 'GIFT',
      periodEnd: 'November 9 2026',
      giftEndCharge: '$8.70',
      resumeLoading: true,
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Blocked · resuming',
    description: 'The button spins through the mutation and the poll.',
    options: FOUR_OPTIONS('MAX-YEARLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'blocked',
      reason: 'ENDING',
      periodEnd: 'October 14 2026',
      resumeLoading: true,
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Upgrade · charged today',
    description: 'Upgrades are prorated and billed immediately.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Max · Monthly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Charged today',
          detail: 'Prorated for the rest of this cycle',
          value: '$7.00',
        },
        { label: 'Next payment', detail: 'October 14 2026', value: '$14.99' },
        {
          label: 'Regular price',
          detail: 'Every month, once your account credit is used',
          value: '$14.99',
        },
      ],
    },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Upgrade · credit covers part',
    description: 'Account credit pays for part of the prorated charge.',
    options: FOUR_OPTIONS('PRO-YEARLY', 'MAX-YEARLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Max · Yearly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Charged today',
          detail:
            'Prorated for the rest of this cycle — $42.00 covered by account credit',
          value: '$75.87',
        },
        { label: 'Next payment', detail: 'January 3 2027', value: '$124.99' },
      ],
    },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Downgrade · Paddle',
    description:
      'Paddle always bills immediately so a downgrade credits the balance today and the regular price row replaces next payment.',
    options: FOUR_OPTIONS('MAX-MONTHLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Pro · Monthly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Credit today',
          detail: 'Applied toward your account balance',
          value: '$7.00',
          emphasis: 'credit',
        },
        {
          label: 'Regular price',
          detail: 'Every month, once your account credit is used',
          value: '$7.99',
        },
      ],
    },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Downgrade · Stripe',
    description:
      'Stripe defers downgrades to the period end so nothing bills today.',
    options: FOUR_OPTIONS('MAX-MONTHLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Pro · Monthly' },
        { label: 'Effective', value: 'October 14 2026' },
        {
          label: 'Due today',
          detail: 'Nothing to charge right now',
          value: '$0.00',
        },
        { label: 'Next payment', detail: 'October 14 2026', value: '$7.99' },
      ],
    },
    confirmLabel: 'Schedule change',
  },
  {
    title: 'Immediate · nothing due',
    description: 'An immediate change whose proration nets to zero.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Max · Monthly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Due today',
          detail: 'Nothing to charge right now',
          value: '$0.00',
        },
        { label: 'Next payment', detail: 'October 14 2026', value: '$14.99' },
      ],
    },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Confirming',
    description: 'Confirm spins while the request runs and Cancel locks.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Max · Monthly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Charged today',
          detail: 'Prorated for the rest of this cycle',
          value: '$7.00',
        },
        { label: 'Next payment', detail: 'October 14 2026', value: '$14.99' },
      ],
    },
    confirmLabel: 'Confirm change',
    confirmLoading: true,
  },
]

export type UsageCardState = {
  title: string
  description: string
  card: {
    loading?: boolean
    error?: boolean
    note?: 'free'
    planLabel: string
    headlineLabel: string
    headline: string
    meter?: { used: string; allowance: string; usedPercent: number }
    requests: string
    resetsIn: string
  }
}

export const USAGE_CARD_STATES: UsageCardState[] = [
  {
    title: 'Loading',
    description: 'The usage query has not resolved yet.',
    card: {
      loading: true,
      planLabel: '—',
      headlineLabel: 'Remaining today',
      headline: '',
      requests: '',
      resetsIn: '',
    },
  },
  {
    title: 'Fetch error',
    description: 'The request failed.',
    card: {
      error: true,
      planLabel: '—',
      headlineLabel: 'Remaining today',
      headline: '',
      requests: '',
      resetsIn: '',
    },
  },
  {
    title: 'Pro · normal',
    description: 'The metered allowance below the warning threshold.',
    card: {
      planLabel: 'Pro',
      headlineLabel: 'Remaining today',
      headline: '2h 45m',
      meter: { used: '1h 15m', allowance: '3h', usedPercent: 42 },
      requests: '18',
      resetsIn: '14 hours',
    },
  },
  {
    title: 'Pro · past 80%',
    description: 'The meter turns warning colored.',
    card: {
      planLabel: 'Pro',
      headlineLabel: 'Remaining today',
      headline: '25m',
      meter: { used: '2h 35m', allowance: '3h', usedPercent: 86 },
      requests: '61',
      resetsIn: '2 hours 10 minutes',
    },
  },
  {
    title: 'Pro · limit reached',
    description: 'The meter fills and turns destructive.',
    card: {
      planLabel: 'Pro',
      headlineLabel: 'Remaining today',
      headline: 'Daily limit reached',
      meter: { used: '3h', allowance: '3h', usedPercent: 100 },
      requests: '94',
      resetsIn: '35 minutes',
    },
  },
  {
    title: 'Unlimited',
    description: 'Max has no daily allowance so only Unlimited shows.',
    card: {
      planLabel: 'Max',
      headlineLabel: 'Daily allowance',
      headline: 'Unlimited',
      requests: '412',
      resetsIn: '9 hours',
    },
  },
  {
    title: 'Free',
    description:
      'Free has no cloud usage, so it shows the same plan note as the billing page instead of a meter.',
    card: {
      note: 'free',
      planLabel: 'Free',
      headlineLabel: '',
      headline: '',
      requests: '',
      resetsIn: '',
    },
  },
]

export type ToastFixture = {
  type: 'success' | 'info' | 'error'
  message: string
  when: string
}

export const TOAST_STATES: ToastFixture[] = [
  {
    type: 'success',
    message: 'Your gift has ended',
    when: 'End gift succeeded',
  },
  {
    type: 'error',
    message:
      "We couldn't charge your card, so your gift is still on. Update your payment method and try again",
    when: 'End gift could not charge the plan set to follow the gift',
  },
  {
    type: 'error',
    message: "Couldn't end your gift",
    when: 'End gift failed for any other reason',
  },
  {
    type: 'success',
    message: 'Payment received — setting up your subscription',
    when: 'Checkout return while the webhook lands',
  },
  {
    type: 'success',
    message: 'Plan change requested — this can take a few seconds to show up',
    when: 'Immediate change confirmed',
  },
  {
    type: 'success',
    message:
      'Plan change scheduled — it takes effect at the end of your current billing period',
    when: 'Scheduled change confirmed',
  },
  {
    type: 'success',
    message: 'Your subscription is active again',
    when: 'Resume succeeded',
  },
  {
    type: 'success',
    message: 'Your subscription will keep renewing',
    when: 'Cancellation reversed',
  },
  {
    type: 'info',
    message:
      "Still processing — check back in a moment if your plan hasn't updated",
    when: 'A checkout or plan change poll timed out',
  },
  {
    type: 'info',
    message: "Still processing — check back in a moment if this doesn't update",
    when: 'A resume poll timed out',
  },
  {
    type: 'info',
    message: "Checkout cancelled — you weren't charged",
    when: 'Cancelled checkout return',
  },
  {
    type: 'error',
    message: "Couldn't resume your subscription",
    when: 'Resume failed on the billing page',
  },
  {
    type: 'error',
    message: "Couldn't keep your subscription",
    when: 'Keep failed on the billing page',
  },
  {
    type: 'error',
    message: "Couldn't reverse the cancellation",
    when: 'Keep or resume failed in the dialog',
  },
  {
    type: 'error',
    message: "Couldn't change your plan",
    when: 'Confirm failed',
  },
  {
    type: 'error',
    message: "Couldn't find an active subscription for this account",
    when: 'Portal or change with no subscription',
  },
  {
    type: 'error',
    message: "Couldn't open the billing portal",
    when: 'Portal session failed',
  },
  {
    type: 'error',
    message: "Couldn't open checkout",
    when: 'Checkout session failed',
  },
  {
    type: 'error',
    message: "This payment provider isn't available — use the other one",
    when: 'Provider disabled',
  },
  {
    type: 'error',
    message: 'You already have a subscription — manage it from billing',
    when: 'Checkout started twice',
  },
]

const GIFT_FEATURES = [
  '3-5x Faster Speed',
  '180 Min/Day Transcription',
  'Custom Dictionary',
]

const PRO_OFFER: GiftOffer = {
  plan: 'PRO',
  months: 3,
  message: 'We hope OiPer makes your days a little easier',
  forEmail: null,
  features: GIFT_FEATURES,
}

const MAX_OFFER: GiftOffer = {
  plan: 'MAX',
  months: 12,
  message: null,
  forEmail: null,
  features: GIFT_FEATURES,
}

const DAY = 24 * 60 * 60 * 1000
function daysFromNow(days: number) {
  return new Date(Date.now() + days * DAY).toISOString()
}

export type GiftPageState = {
  title: string
  description: string
  view:
    | { kind: 'opening' }
    | {
        kind: 'offer'
        offer: GiftOffer
        viewerEmail: string | null
        claiming?: boolean
        error?: string
        blocked?: string
      }
    | {
        kind: 'claimed'
        plan: 'PRO' | 'MAX'
        startsAt: string
        endsAt: string
        showKeepNote: boolean
      }
    | {
        kind: 'unavailable'
        reason: 'NOT_FOUND' | 'CLAIMED' | 'EXPIRED' | 'REVOKED'
      }
}

export const GIFT_PAGE_STATES: GiftPageState[] = [
  {
    title: 'Opening',
    description: 'Reading the code from the link and checking it.',
    view: { kind: 'opening' },
  },
  {
    title: 'Visitor',
    description:
      'Not signed in. Both actions open the auth modal and come back here.',
    view: { kind: 'offer', offer: PRO_OFFER, viewerEmail: null },
  },
  {
    title: 'Visitor · one email',
    description:
      'The link was made for one email, and the page says which one.',
    view: {
      kind: 'offer',
      offer: { ...PRO_OFFER, forEmail: 'alex@example.com' },
      viewerEmail: null,
    },
  },
  {
    title: 'Signed in',
    description: 'One click to claim. No message was set on this link.',
    view: { kind: 'offer', offer: MAX_OFFER, viewerEmail: 'sam@example.com' },
  },
  {
    title: 'Claiming',
    description: 'The claim request is in flight.',
    view: {
      kind: 'offer',
      offer: PRO_OFFER,
      viewerEmail: 'sam@example.com',
      claiming: true,
    },
  },
  {
    title: 'Claim failed',
    description:
      'The server message shows under the button, e.g. email not verified.',
    view: {
      kind: 'offer',
      offer: PRO_OFFER,
      viewerEmail: 'sam@example.com',
      error: 'Verify your email address first, then claim your gift',
    },
  },
  {
    title: 'Has a subscription',
    description:
      'Active, set to cancel, paused or past due. Told before any button; no footnote.',
    view: {
      kind: 'offer',
      offer: PRO_OFFER,
      viewerEmail: 'sam@example.com',
      blocked:
        "You already have a subscription, so this gift can't be added to your account. The link still works for someone else, so feel free to pass it on",
    },
  },
  {
    title: 'Another gift running',
    description: 'A gift of a different plan is still on.',
    view: {
      kind: 'offer',
      offer: { ...MAX_OFFER, months: 1 },
      viewerEmail: 'sam@example.com',
      blocked:
        'Your Pro gift is still running. You can claim this one after it ends',
    },
  },
  {
    title: 'Different email',
    description: 'Signed in with an email the link was not made for.',
    view: {
      kind: 'offer',
      offer: { ...PRO_OFFER, forEmail: 'alex@example.com' },
      viewerEmail: 'sam@example.com',
      blocked:
        'This gift is for alex@example.com. Sign in with that email to claim it',
    },
  },
  {
    title: "It's yours",
    description: 'Just claimed, or a gift already on this account.',
    view: {
      kind: 'claimed',
      plan: 'PRO',
      startsAt: daysFromNow(0),
      endsAt: daysFromNow(91),
      showKeepNote: true,
    },
  },
  {
    title: "It's yours · starts later",
    description:
      'A second gift of the same plan starts when the running one ends.',
    view: {
      kind: 'claimed',
      plan: 'PRO',
      startsAt: daysFromNow(30),
      endsAt: daysFromNow(61),
      showKeepNote: true,
    },
  },
  {
    title: 'Already claimed',
    description: 'Someone else claimed this link.',
    view: { kind: 'unavailable', reason: 'CLAIMED' },
  },
  {
    title: 'Expired',
    description: 'Past the claim deadline (12 months by default).',
    view: { kind: 'unavailable', reason: 'EXPIRED' },
  },
  {
    title: 'Withdrawn',
    description: 'Revoked by script before it was claimed.',
    view: { kind: 'unavailable', reason: 'REVOKED' },
  },
  {
    title: 'Broken link',
    description: 'Unknown, mistyped or missing code.',
    view: { kind: 'unavailable', reason: 'NOT_FOUND' },
  },
]
