export type PricingFeature = { label: string; detail: string | null }

export const FREE_FEATURES: PricingFeature[] = [
  { label: 'Unlimited local transcription', detail: null },
  { label: 'Core local and offline features', detail: null },
  { label: 'No custom prompt for formatting', detail: null },
]

export const PRO_FEATURES: PricingFeature[] = [
  {
    label: '180 minutes of managed cloud transcription per day',
    detail: 'Resets daily',
  },
  { label: 'Custom dictionary', detail: null },
  { label: 'Priority processing', detail: null },
  { label: 'Snippets', detail: null },
  { label: 'Custom formatting', detail: null },
  { label: 'Cloud sync', detail: null },
  { label: 'Email support', detail: null },
]

export const MAX_FEATURES: PricingFeature[] = [
  {
    label: 'Unlimited managed cloud transcription',
    detail: 'Subject to abuse protection',
  },
  { label: 'Enhanced custom dictionary', detail: null },
  { label: 'Highest priority processing', detail: null },
  { label: 'Snippets', detail: null },
  { label: 'Custom formatting', detail: null },
  { label: 'Cloud sync', detail: null },
  { label: 'Highest priority support', detail: null },
  { label: 'Early access to features', detail: null },
]

export type PricingCardState = {
  title: string
  description: string
  card: {
    displayName: string
    price: string
    period: string
    discountPercent: number
    description: string
    features: PricingFeature[]
    ctaLabel: string | null
    ctaVariant: 'default' | 'outline'
    disabled?: boolean
    loading?: boolean
    featured: boolean
    secondaryCtaLabel?: string
  }
}

export const PRICING_CARD_STATES: PricingCardState[] = [
  {
    title: 'Free — always static',
    description:
      'No auth-dependent variation. CTA links straight to the desktop download page.',
    card: {
      displayName: 'Free',
      price: '$0',
      period: 'Free forever',
      discountPercent: 0,
      description: 'Unlimited local transcription, no limits, no cost.',
      features: FREE_FEATURES,
      ctaLabel: 'Download',
      ctaVariant: 'outline',
      featured: false,
    },
  },
  {
    title: 'Pro — loading',
    description:
      'Auth or subscription status is still resolving (page just loaded, or the query is pending). The CTA area pulses instead of showing a button.',
    card: {
      displayName: 'Pro',
      price: '$14.99',
      period: 'Per month',
      discountPercent: 0,
      description: 'Managed cloud transcription with a daily allowance.',
      features: PRO_FEATURES,
      ctaLabel: null,
      ctaVariant: 'default',
      loading: true,
      featured: true,
    },
  },
  {
    title: 'Pro — visitor not signed in',
    description:
      'CTA links to sign-up with the plan/interval pre-filled as query params; checkout auto-starts right after signup.',
    card: {
      displayName: 'Pro',
      price: '$14.99',
      period: 'Per month',
      discountPercent: 0,
      description: 'Managed cloud transcription with a daily allowance.',
      features: PRO_FEATURES,
      ctaLabel: 'Upgrade to Pro',
      ctaVariant: 'default',
      featured: true,
    },
  },
  {
    title: 'Pro — Yearly toggle (discount badge)',
    description:
      'Switching the Monthly/Yearly toggle changes every card\'s price and shows the "Save X%" badge when the plan has a yearly discount.',
    card: {
      displayName: 'Pro',
      price: '$139.99',
      period: 'Per year',
      discountPercent: 22,
      description: 'Managed cloud transcription with a daily allowance.',
      features: PRO_FEATURES,
      ctaLabel: 'Upgrade to Pro',
      ctaVariant: 'default',
      featured: true,
    },
  },
  {
    title: 'Pro — signed in, no active paid plan',
    description:
      'Signed-in user is on Free, or their subscription is Cancelled/Expired. CTA opens Paddle checkout directly (a button, not a link).',
    card: {
      displayName: 'Pro',
      price: '$14.99',
      period: 'Per month',
      discountPercent: 0,
      description: 'Managed cloud transcription with a daily allowance.',
      features: PRO_FEATURES,
      ctaLabel: 'Upgrade to Pro',
      ctaVariant: 'default',
      featured: true,
    },
  },
  {
    title: "Pro — this is the user's current plan",
    description:
      'Signed-in user is already on this exact plan + interval. CTA is disabled and reads "Current Plan".',
    card: {
      displayName: 'Pro',
      price: '$14.99',
      period: 'Per month',
      discountPercent: 0,
      description: 'Managed cloud transcription with a daily allowance.',
      features: PRO_FEATURES,
      ctaLabel: 'Current Plan',
      ctaVariant: 'outline',
      disabled: true,
      featured: true,
    },
  },
  {
    title: 'Pro — downgrading from Max',
    description:
      'Signed-in Paddle subscriber currently on Max clicks this Pro card. CTA opens the Change Plan dialog, pre-selected to this plan (see the Change Plan section below).',
    card: {
      displayName: 'Pro',
      price: '$14.99',
      period: 'Per month',
      discountPercent: 0,
      description: 'Managed cloud transcription with a daily allowance.',
      features: PRO_FEATURES,
      ctaLabel: 'Downgrade to Pro',
      ctaVariant: 'outline',
      featured: true,
    },
  },
  {
    title: 'Max — upgrading from Pro',
    description:
      'Signed-in Paddle subscriber currently on Pro clicks this Max card. Opens the Change Plan dialog pre-selected to Max.',
    card: {
      displayName: 'Max',
      price: '$29.99',
      period: 'Per month',
      discountPercent: 0,
      description:
        'Unlimited managed cloud transcription, subject to abuse protection.',
      features: MAX_FEATURES,
      ctaLabel: 'Upgrade to Max',
      ctaVariant: 'default',
      featured: false,
    },
  },
  {
    title: 'Max — current plan',
    description:
      'Signed-in user is already on Max at this interval. CTA is disabled.',
    card: {
      displayName: 'Max',
      price: '$29.99',
      period: 'Per month',
      discountPercent: 0,
      description:
        'Unlimited managed cloud transcription, subject to abuse protection.',
      features: MAX_FEATURES,
      ctaLabel: 'Current Plan',
      ctaVariant: 'outline',
      disabled: true,
      featured: false,
    },
  },
  {
    title: 'Max — Stripe subscriber switching plans',
    description:
      'Signed-in subscriber pays via Stripe instead of Paddle. Opens the exact same in-app Change Plan dialog as a Paddle subscriber would — Stripe and Paddle subscribers see identical UI here, the provider difference only shows up in the preview math.',
    card: {
      displayName: 'Max',
      price: '$29.99',
      period: 'Per month',
      discountPercent: 0,
      description:
        'Unlimited managed cloud transcription, subject to abuse protection.',
      features: MAX_FEATURES,
      ctaLabel: 'Upgrade to Max',
      ctaVariant: 'default',
      featured: false,
    },
  },
]

export type CurrentPlanCardState = {
  title: string
  description: string
  card: {
    loading?: boolean
    error?: boolean
    status?: string
    planLabel?: string
    scheduledChangeDate?: string
    scheduledChangePlanLabel?: string
    paymentLabel?: string
    paymentValue?: string
    amountValue?: string
    buttons?: ('subscribe' | 'manage' | 'change')[]
  }
}

export const CURRENT_PLAN_STATES: CurrentPlanCardState[] = [
  {
    title: 'Loading',
    description:
      "The subscription query hasn't resolved yet. Four skeleton rows, two skeleton buttons.",
    card: { loading: true },
  },
  {
    title: 'Fetch error',
    description:
      'The subscription request failed. No rows or action buttons render.',
    card: { error: true },
  },
  {
    title: 'Free plan',
    description:
      'No subscription on file. Only a "Subscribe" button shows, linking to the pricing section. With no date, Next payment collapses to a bare "-" instead of "- on -".',
    card: {
      status: '-',
      planLabel: 'Free',
      paymentLabel: 'Next payment',
      paymentValue: '-',
      amountValue: '-',
      buttons: ['subscribe'],
    },
  },
  {
    title: 'Active, Paddle, live payment data',
    description:
      "Status is Active and the account is on Paddle without a scheduled cancellation — Next payment pairs the date with Paddle's live-computed amount.",
    card: {
      status: 'Active',
      planLabel: 'Pro · Monthly',
      paymentLabel: 'Next payment',
      paymentValue: 'September 14 2026',
      amountValue: '$14.99',
      buttons: ['manage', 'change'],
    },
  },
  {
    title: 'Past Due',
    description:
      "A payment failed. Live payment data isn't fetched for non-Active subscriptions, so the amount paired with the date falls back to the static catalog price for the plan.",
    card: {
      status: 'Past Due',
      planLabel: 'Max · Monthly',
      paymentLabel: 'Next payment',
      paymentValue: 'August 20 2026',
      amountValue: '$29.99',
      buttons: ['manage', 'change'],
    },
  },
  {
    title: 'Cancelled, access ending',
    description:
      'User cancelled but keeps access until the period ends. Label switches to "Access ends" and only shows the date — no amount, since nothing gets charged.',
    card: {
      status: 'Cancelled',
      planLabel: 'Pro · Yearly',
      paymentLabel: 'Access ends',
      paymentValue: 'December 1 2026',
      buttons: ['manage', 'change'],
    },
  },
  {
    title: 'Expired, no period end on file',
    description:
      'Subscription has fully lapsed with no known period end — Next payment collapses to a single "-" rather than "- on -".',
    card: {
      status: 'Expired',
      planLabel: 'Max · Monthly',
      paymentLabel: 'Next payment',
      paymentValue: '-',
      amountValue: '-',
      buttons: ['manage', 'change'],
    },
  },
  {
    title: 'Active, Stripe',
    description:
      'Stripe subscribers get the same "Change plan" button Paddle subscribers do — plan changes run through our own API for both providers now, not the external Stripe portal.',
    card: {
      status: 'Active',
      planLabel: 'Max · Yearly',
      paymentLabel: 'Next payment',
      paymentValue: 'January 3 2027',
      amountValue: '$249.99',
      buttons: ['manage', 'change'],
    },
  },
  {
    title: 'Active, Stripe, downgrade scheduled (plan)',
    description:
      'The subscription has a Stripe Subscription Schedule attached that swaps it to a cheaper plan at the next renewal (fetched live from Stripe on every load, not cached). The "Scheduled to change" row appears right after Plan; Next payment and Amount already reflect the plan it\'s switching to, not the current one. "Change plan" still opens the dialog — picking a different target rebuilds the schedule instead of creating a second one.',
    card: {
      status: 'Active',
      planLabel: 'Max · Yearly',
      scheduledChangeDate: 'August 15 2027',
      scheduledChangePlanLabel: 'Pro · Yearly',
      paymentLabel: 'Next payment',
      paymentValue: 'August 15 2027',
      amountValue: '$139.99',
      buttons: ['manage', 'change'],
    },
  },
  {
    title: 'Active, Stripe, downgrade scheduled (interval)',
    description:
      'Same as above, but the scheduled change only swaps billing interval (Yearly → Monthly) — the plan tier stays Max. Stripe defers this the same way it defers a tier downgrade; Paddle could not (see the Change Plan dialog states below for the Paddle-vs-Stripe contrast on this exact kind of change).',
    card: {
      status: 'Active',
      planLabel: 'Max · Yearly',
      scheduledChangeDate: 'August 15 2027',
      scheduledChangePlanLabel: 'Max · Monthly',
      paymentLabel: 'Next payment',
      paymentValue: 'August 15 2027',
      amountValue: '$29.99',
      buttons: ['manage', 'change'],
    },
  },
]

export type SummaryRowFixture = {
  label: string
  detail?: string
  value: string
  emphasis?: 'credit'
}

export type ChangePlanOptionFixture = {
  label: string
  priceLine: string
  isCurrent: boolean
  isSelected: boolean
}

function FOUR_OPTIONS(
  currentKey: string,
  selectedKey: string
): ChangePlanOptionFixture[] {
  const all = [
    { key: 'PRO-MONTHLY', label: 'Pro · Monthly', priceLine: '$14.99 / month' },
    {
      key: 'PRO-YEARLY',
      label: 'Pro · Yearly',
      priceLine: '$11.67 / month · $139.99 / year',
    },
    { key: 'MAX-MONTHLY', label: 'Max · Monthly', priceLine: '$29.99 / month' },
    {
      key: 'MAX-YEARLY',
      label: 'Max · Yearly',
      priceLine: '$20.83 / month · $249.99 / year',
    },
  ]

  return all.map((entry) => ({
    label: entry.label,
    priceLine: entry.priceLine,
    isCurrent: entry.key === currentKey,
    isSelected: entry.key === selectedKey,
  }))
}

export type ChangePlanState = {
  title: string
  description: string
  entryNote?: string
  options: ChangePlanOptionFixture[]
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
    | { kind: 'cancel-blocked'; message: string }
    | { kind: 'preview'; rows: SummaryRowFixture[] }
  confirmLabel: string
  confirmDisabled?: boolean
}

export const CHANGE_PLAN_STATES: ChangePlanState[] = [
  {
    title: 'Opened from the Billing page',
    description:
      "Default selection is always Pro Monthly, regardless of the account's current plan. Here the current plan is actually Max Yearly, so that mismatch triggers an immediate preview fetch the moment the dialog opens.",
    entryNote: 'Entry point: "Change plan" button on Account → Billing',
    options: FOUR_OPTIONS('MAX-YEARLY', 'PRO-MONTHLY'),
    summary: { kind: 'loading' },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Opened from a pricing card',
    description:
      'Clicking a pricing card\'s "Switch to…" CTA opens this same dialog pre-selected to the plan that was clicked (Max Yearly here), instead of always defaulting to Pro Monthly.',
    entryNote: 'Entry point: pricing-card CTA on the homepage',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-YEARLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Max · Yearly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Charged today',
          detail: 'Prorated for the rest of this cycle',
          value: '$228.41',
        },
        { label: 'Next payment', detail: 'January 3 2027', value: '$249.99' },
      ],
    },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Selected option is the current plan',
    description:
      "Selecting the radio option that matches the account's current plan+interval shows a static summary instead of a price preview — there's nothing to change.",
    options: FOUR_OPTIONS('PRO-MONTHLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'current',
      status: 'Active',
      renewLabel: 'Renews',
      renewValue: 'September 14 2026',
      amountValue: '$14.99',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Selected option is the current plan, cancellation scheduled',
    description:
      'Same as above, but the subscription is scheduled to cancel — label switches to "Access ends" and the "Amount" row is dropped entirely, since nothing will actually be charged again.',
    options: FOUR_OPTIONS('MAX-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'current',
      status: 'Active',
      renewLabel: 'Access ends',
      renewValue: 'September 17 2026',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Fetching a preview',
    description:
      "Any time a different plan/interval is selected, a preview request fires immediately; this skeleton shows while it's in flight.",
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: { kind: 'loading' },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Preview error — change not allowed',
    description:
      'Server rejected the requested change (e.g. a pricing/catalog mismatch). Confirm stays disabled.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-YEARLY'),
    summary: {
      kind: 'error',
      message: 'This plan change is not available right now',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Preview error — subscription not found',
    description:
      'The account has no active subscription to change (e.g. it just expired in another tab). Confirm stays disabled.',
    options: FOUR_OPTIONS('MAX-MONTHLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'error',
      message: "Couldn't find an active subscription for this account",
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
  {
    title: 'Upgrade — charged today',
    description:
      'Upgrading (a higher tier, or the same tier billed Yearly instead of Monthly) is prorated and billed immediately.',
    options: FOUR_OPTIONS('PRO-MONTHLY', 'MAX-MONTHLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Max · Monthly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Charged today',
          detail: 'Prorated for the rest of this cycle',
          value: '$15.00',
        },
        { label: 'Next payment', detail: 'September 14 2026', value: '$29.99' },
      ],
    },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Upgrade — charge partially covered by credit',
    description:
      "Same as above, but existing account credit (e.g. from an earlier downgrade) covers part of today's prorated charge.",
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
          value: '$68.00',
        },
        { label: 'Next payment', detail: 'January 3 2027', value: '$249.99' },
      ],
    },
    confirmLabel: 'Confirm change',
  },
  {
    title: 'Downgrade on Paddle — credit today, not deferred',
    description:
      'Paddle can\'t schedule a plan/price change at all (only cancel/pause/resume are schedulable) and separately rejects deferred billing outright whenever the interval also changes — so every Paddle change bills immediately regardless of direction. A downgrade credits the account balance today instead of waiting for the next renewal. No "Next payment" row: the credit doesn\'t exist on the account yet at preview time, so Paddle\'s own next-transaction figure can\'t account for it and would understate the real coverage — "Regular price" shows what it costs once the credit runs out instead.',
    options: FOUR_OPTIONS('MAX-MONTHLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Pro · Monthly' },
        { label: 'Effective', value: 'Today' },
        {
          label: 'Credit today',
          detail: 'Applied toward your account balance',
          value: '$15.00',
          emphasis: 'credit',
        },
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
    title: 'Downgrade on Stripe — scheduled for period end',
    description:
      'Stripe (unlike Paddle) genuinely defers a downgrade via a Subscription Schedule — the old plan stays active and nothing bills until the current period actually ends, then the new plan and its regular price take over. "Effective" shows that real future date, and the footer button reads "Schedule change" instead of "Confirm change".',
    options: FOUR_OPTIONS('MAX-MONTHLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'preview',
      rows: [
        { label: 'New plan', value: 'Pro · Monthly' },
        { label: 'Effective', value: 'September 14 2026' },
        {
          label: 'Due today',
          detail: 'Nothing to charge right now',
          value: '$0.00',
        },
        { label: 'Next payment', detail: 'September 14 2026', value: '$14.99' },
      ],
    },
    confirmLabel: 'Schedule change',
  },
  {
    title: 'Blocked — subscription already scheduled to cancel',
    description:
      'The account has already requested cancellation (on either provider). Picking a different plan shows this warning instead of a preview, with a "Keep subscription" button that reverses the cancellation — Confirm stays disabled until it does.',
    options: FOUR_OPTIONS('MAX-YEARLY', 'PRO-MONTHLY'),
    summary: {
      kind: 'cancel-blocked',
      message:
        'Your subscription is scheduled to cancel on September 14 2026 so keep it active to switch plans',
    },
    confirmLabel: 'Confirm change',
    confirmDisabled: true,
  },
]
