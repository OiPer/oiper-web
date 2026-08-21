import { Loading } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { components } from '@/lib/api/schema'
import { formatSavePercent } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Check, Info } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

type PricingPlan = components['schemas']['PricingPlan']

export type CtaAction =
  | { type: 'link'; href: string; scroll?: boolean }
  | { type: 'button'; onClick: () => void }

export type PlanCardCta = {
  cta: ReactNode
  action: CtaAction
  disabled?: boolean
  loading?: boolean
  submitting?: boolean
  secondaryCta?: {
    label: string
    action: CtaAction
    disabled?: boolean
    submitting?: boolean
  }
  ctaVariant?: 'default' | 'outline'
}

type CtaVariant = 'disabled' | 'primary' | 'secondary'

const CTA_VARIANT_CLASS: Record<CtaVariant, string> = {
  disabled: 'cursor-default border border-white/10 text-white/40',
  primary: 'bg-white/90 text-[#0a0a0a] hover:bg-white',
  secondary: 'border border-white/10 text-white/70 hover:bg-white/4',
}

function computeCtaVariant(
  disabled: boolean | undefined,
  isPrimary: boolean
): CtaVariant {
  if (disabled) return 'disabled'
  if (isPrimary) return 'primary'
  return 'secondary'
}

function CtaLink(props: {
  action: CtaAction
  className: string
  disabled?: boolean
  submitting?: boolean
  children: ReactNode
}) {
  if (props.submitting) {
    return (
      <button
        type="button"
        disabled
        className={cn('relative', props.className)}
      >
        <Loading loading>{props.children}</Loading>
      </button>
    )
  }
  if (props.disabled) {
    return (
      <button type="button" disabled className={props.className}>
        {props.children}
      </button>
    )
  }
  if (props.action.type === 'link') {
    return (
      <Link
        href={props.action.href}
        scroll={props.action.scroll ?? true}
        className={props.className}
      >
        {props.children}
      </Link>
    )
  }
  return (
    <button
      type="button"
      onClick={props.action.onClick}
      className={props.className}
    >
      {props.children}
    </button>
  )
}

export function PlanCard(props: {
  displayName: string
  price: string
  period: string
  discountPercent: number
  description: string
  features: PricingPlan['features']
  featured: boolean
  cta: PlanCardCta
}) {
  const isPrimaryCta =
    (props.cta.ctaVariant ?? (props.featured ? 'default' : 'outline')) ===
    'default'
  const ctaVariant = computeCtaVariant(props.cta.disabled, isPrimaryCta)
  const ctaClassName = cn(
    'mt-10 flex h-[46px] w-full items-center justify-center rounded-lg text-sm font-medium transition-colors',
    CTA_VARIANT_CLASS[ctaVariant]
  )

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 ${
        props.featured
          ? 'border border-white/12 bg-linear-to-b from-white/4 to-white/1 shadow-[0_0_40px_-12px_rgba(255,255,255,0.06)]'
          : 'border border-white/6 bg-white/1.5'
      }`}
    >
      {props.featured && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
      )}

      <div>
        <p
          className={`text-sm font-medium ${
            props.featured ? 'text-white/60' : 'text-white/40'
          }`}
        >
          {props.displayName}
        </p>
        <div className="mt-5 flex flex-nowrap items-end gap-2">
          <p className="text-[2.75rem] leading-none font-semibold tracking-[-0.03em] text-white">
            {props.price}
          </p>
          <div className="flex flex-col items-start gap-1">
            {props.discountPercent > 0 && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-white/70">
                Save {formatSavePercent(props.discountPercent)}
              </span>
            )}
            <p className="text-sm whitespace-nowrap text-white/30">
              {props.period}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/40">
          {props.description}
        </p>
      </div>

      <div className="mt-8 flex-1 border-t border-white/6 pt-8">
        <TooltipProvider>
          <div className="grid gap-4">
            {props.features.map((feature) => (
              <div key={feature.label} className="flex items-start gap-3">
                <Check
                  className={`mt-0.5 size-4 shrink-0 ${
                    props.featured ? 'text-white/50' : 'text-white/30'
                  }`}
                  strokeWidth={1.5}
                />
                <p className="flex items-center gap-1.5 text-sm leading-relaxed text-white/55">
                  {feature.label}
                  {feature.detail && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info
                          className="size-3.5 shrink-0 text-white/35"
                          strokeWidth={1.5}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-80">
                        {feature.detail}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </p>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {props.cta.loading ? (
        <div className="mt-10 h-11.5 w-full animate-pulse rounded-lg bg-white/6" />
      ) : (
        <CtaLink
          action={props.cta.action}
          disabled={props.cta.disabled}
          submitting={props.cta.submitting}
          className={ctaClassName}
        >
          {props.cta.cta}
        </CtaLink>
      )}

      {!props.cta.loading && props.cta.secondaryCta && (
        <CtaLink
          action={props.cta.secondaryCta.action}
          disabled={props.cta.secondaryCta.disabled}
          submitting={props.cta.secondaryCta.submitting}
          className="mt-3 text-center text-xs text-white/40 hover:text-white/60"
        >
          {props.cta.secondaryCta.label}
        </CtaLink>
      )}
    </div>
  )
}
