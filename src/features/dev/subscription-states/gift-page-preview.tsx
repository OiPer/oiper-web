import {
  GiftClaimedView,
  GiftOfferView,
  GiftOpeningView,
  GiftUnavailableView,
} from '@/features/gifts/gift-page'
import type { GiftPageState } from './dummy-data'

export function GiftPagePreview(props: { view: GiftPageState['view'] }) {
  const { view } = props

  if (view.kind === 'opening') return <GiftOpeningView contained />

  if (view.kind === 'unavailable') {
    return <GiftUnavailableView reason={view.reason} contained />
  }

  if (view.kind === 'claimed') {
    return (
      <GiftClaimedView
        plan={view.plan}
        endsAt={view.endsAt}
        showKeepNote={view.showKeepNote}
        celebrate={false}
        contained
      />
    )
  }

  if (view.kind === 'offer') {
    return (
      <GiftOfferView
        offer={view.offer}
        viewerEmail={view.viewerEmail}
        blocked={view.blocked ?? null}
        claiming={view.claiming ?? false}
        error={view.error ?? null}
        onClaim={() => undefined}
        contained
      />
    )
  }

  throw new Error('Unknown gift page view')
}
