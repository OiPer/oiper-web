// Enumerates every state the discriminated ChangeSubscriptionPlanPreview
// schema can produce and pins the expected copy for each. Run manually:
// npx tsx src/features/billing/plan-change-copy.selfcheck.ts
import assert from 'node:assert'
import {
  describeTodayCharge,
  getConfirmLabel,
  getRegularPriceDetail,
  type NonBlockedPlanChangePreview,
} from './plan-change-copy'

const scheduled: NonBlockedPlanChangePreview = {
  kind: 'SCHEDULED',
  currencyCode: 'USD',
  effectiveAt: '2026-09-17T00:00:00.000Z',
  nextPayment: { amount: '1499', dueAt: '2026-09-17T00:00:00.000Z' },
}

const immediateNone: NonBlockedPlanChangePreview = {
  kind: 'IMMEDIATE',
  currencyCode: 'USD',
  effectiveAt: '2026-08-17T00:00:00.000Z',
  immediateChange: { action: 'NONE' },
  nextPayment: null,
  regularAmount: null,
}

const immediateCredit: NonBlockedPlanChangePreview = {
  kind: 'IMMEDIATE',
  currencyCode: 'USD',
  effectiveAt: '2026-08-17T00:00:00.000Z',
  immediateChange: { action: 'CREDIT', amount: '1500' },
  nextPayment: null,
  regularAmount: '1499',
}

const immediateChargeNoCredit: NonBlockedPlanChangePreview = {
  kind: 'IMMEDIATE',
  currencyCode: 'USD',
  effectiveAt: '2026-08-17T00:00:00.000Z',
  immediateChange: { action: 'CHARGE', amount: '2999', coveredByCredit: null },
  nextPayment: { amount: '2999', dueAt: '2026-09-17T00:00:00.000Z' },
  regularAmount: null,
}

const immediateChargeWithCredit: NonBlockedPlanChangePreview = {
  kind: 'IMMEDIATE',
  currencyCode: 'USD',
  effectiveAt: '2026-08-17T00:00:00.000Z',
  immediateChange: {
    action: 'CHARGE',
    amount: '6800',
    coveredByCredit: '4200',
  },
  nextPayment: { amount: '24999', dueAt: '2027-01-03T00:00:00.000Z' },
  regularAmount: null,
}

assert.deepStrictEqual(describeTodayCharge(scheduled), {
  label: 'Due today',
  detail: 'Nothing to charge right now',
  value: '$0',
  emphasis: undefined,
})

assert.deepStrictEqual(describeTodayCharge(immediateNone), {
  label: 'Due today',
  detail: 'Nothing to charge right now',
  value: '$0',
  emphasis: undefined,
})

assert.deepStrictEqual(describeTodayCharge(immediateCredit), {
  label: 'Credit today',
  detail: 'Applied toward your account balance',
  value: '$15',
  emphasis: 'credit',
})

assert.deepStrictEqual(describeTodayCharge(immediateChargeNoCredit), {
  label: 'Charged today',
  detail: 'Prorated for the rest of this cycle',
  value: '$29.99',
  emphasis: undefined,
})

assert.deepStrictEqual(describeTodayCharge(immediateChargeWithCredit), {
  label: 'Charged today',
  detail: 'Prorated for the rest of this cycle — $42 covered by account credit',
  value: '$68',
  emphasis: undefined,
})

assert.strictEqual(getConfirmLabel('SCHEDULED'), 'Schedule change')
assert.strictEqual(getConfirmLabel('IMMEDIATE'), 'Confirm change')

assert.strictEqual(
  getRegularPriceDetail('MONTHLY'),
  'Every month, once your account credit is used'
)
assert.strictEqual(
  getRegularPriceDetail('YEARLY'),
  'Every year, once your account credit is used'
)

console.log('plan-change-copy.selfcheck: all assertions passed')
