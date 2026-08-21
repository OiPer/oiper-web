import type { components } from '@/lib/api/schema'
import { formatCurrencyFromCents } from '@/lib/format'

export type PlanChangePreview =
  components['schemas']['ChangeSubscriptionPlanPreview']
export type NonBlockedPlanChangePreview = Exclude<
  PlanChangePreview,
  { kind: 'BLOCKED' }
>

export function describeTodayCharge(preview: NonBlockedPlanChangePreview) {
  if (preview.kind === 'SCHEDULED') {
    return {
      label: 'Due today',
      detail: 'Nothing to charge right now',
      value: formatCurrencyFromCents(0, preview.currencyCode),
      emphasis: undefined,
    }
  }

  const change = preview.immediateChange

  if (change.action === 'CREDIT') {
    return {
      label: 'Credit today',
      detail: 'Applied toward your account balance',
      value: formatCurrencyFromCents(
        Number(change.amount),
        preview.currencyCode
      ),
      emphasis: 'credit' as const,
    }
  }

  if (change.action === 'CHARGE') {
    return {
      label: 'Charged today',
      detail: change.coveredByCredit
        ? `Prorated for the rest of this cycle — ${formatCurrencyFromCents(Number(change.coveredByCredit), preview.currencyCode)} covered by account credit`
        : 'Prorated for the rest of this cycle',
      value: formatCurrencyFromCents(
        Number(change.amount),
        preview.currencyCode
      ),
      emphasis: undefined,
    }
  }

  return {
    label: 'Due today',
    detail: 'Nothing to charge right now',
    value: formatCurrencyFromCents(0, preview.currencyCode),
    emphasis: undefined,
  }
}

export function getConfirmLabel(kind: NonBlockedPlanChangePreview['kind']) {
  return kind === 'SCHEDULED' ? 'Schedule change' : 'Confirm change'
}

export function getRegularPriceDetail(interval: 'MONTHLY' | 'YEARLY') {
  const intervalLabel = interval === 'MONTHLY' ? 'month' : 'year'
  return `Every ${intervalLabel}, once your account credit is used`
}
