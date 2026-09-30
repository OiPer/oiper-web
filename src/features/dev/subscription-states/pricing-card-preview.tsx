import { Check, Info } from 'lucide-react'
import type { PricingCardState } from './dummy-data'

export function PricingCardPreview(props: { card: PricingCardState['card'] }) {
  const { card } = props
  const isPrimaryCta = card.ctaVariant === 'default'
  const ctaClassName = `mt-8 flex h-11 w-full items-center justify-center rounded-lg text-sm font-medium ${
    card.disabled
      ? 'cursor-default border border-white/10 text-white/40'
      : isPrimaryCta
        ? 'bg-white/90 text-[#0a0a0a]'
        : 'border border-white/10 text-white/70'
  }`

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 ${
        card.featured
          ? 'border border-white/12 bg-linear-to-b from-white/4 to-white/1'
          : 'border border-white/6 bg-white/1.5'
      }`}
    >
      {card.featured && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
      )}

      <div>
        <p
          className={`text-sm font-medium ${card.featured ? 'text-white/60' : 'text-white/40'}`}
        >
          {card.displayName}
        </p>
        <div className="mt-4 flex items-baseline gap-1.5">
          <p className="text-3xl leading-none font-semibold tracking-[-0.03em] text-white">
            {card.price}
          </p>
          <p className="text-xs text-white/30">{card.period}</p>
          {card.discountPercent > 0 && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/70">
              Save {card.discountPercent}%
            </span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/40">
          {card.description}
        </p>
      </div>

      <div className="mt-6 flex-1 border-t border-white/6 pt-6">
        <div className="grid gap-3">
          {card.features.map((feature) => (
            <div key={feature.label} className="flex items-start gap-3">
              <Check
                className={`mt-0.5 size-4 shrink-0 ${card.featured ? 'text-white/50' : 'text-white/30'}`}
                strokeWidth={1.5}
              />
              <p className="flex items-center gap-1.5 text-sm leading-relaxed text-white/55">
                {feature.label}
                {feature.detail && (
                  <Info
                    className="size-3.5 shrink-0 text-white/35"
                    strokeWidth={1.5}
                    aria-label={feature.detail}
                  >
                    <title>{feature.detail}</title>
                  </Info>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {card.loading ? (
        <div className="mt-8 h-11 w-full animate-pulse rounded-lg bg-white/6" />
      ) : (
        <button type="button" disabled className={ctaClassName}>
          {card.ctaLabel}
        </button>
      )}

      {!card.loading && card.secondaryCtaLabel && (
        <p className="mt-3 text-center text-xs text-white/40">
          {card.secondaryCtaLabel}
        </p>
      )}
    </div>
  )
}
