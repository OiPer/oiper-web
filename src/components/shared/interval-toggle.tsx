import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

type BillingInterval = 'MONTHLY' | 'YEARLY'

export function IntervalToggle(props: {
  value: BillingInterval
  onChange: (interval: BillingInterval) => void
  variant?: 'default' | 'landing'
  yearlySavePercent?: number
}) {
  const isLanding = props.variant === 'landing'

  function optionClassName(option: BillingInterval) {
    const isActive = props.value === option

    return cn(
      'relative rounded-full font-medium',
      isLanding
        ? 'px-4 py-1.5 text-sm transition-colors'
        : 'px-3 py-1 text-xs transition-colors',
      isActive
        ? isLanding
          ? 'text-[#0a0a0a]'
          : 'text-primary-foreground'
        : isLanding
          ? 'text-white/50'
          : ''
    )
  }

  function pill(option: BillingInterval) {
    if (props.value !== option) return null

    return (
      <motion.span
        layoutId="interval-toggle-pill"
        className={cn(
          'absolute inset-0 rounded-full',
          isLanding ? 'bg-white/90' : 'bg-primary'
        )}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />
    )
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border p-1',
        isLanding && 'border-white/10'
      )}
    >
      <button
        type="button"
        onClick={() => props.onChange('MONTHLY')}
        className={optionClassName('MONTHLY')}
      >
        {pill('MONTHLY')}
        <span className="relative z-10">Monthly</span>
      </button>
      <button
        type="button"
        onClick={() => props.onChange('YEARLY')}
        className={cn(
          optionClassName('YEARLY'),
          'inline-flex items-center gap-1'
        )}
      >
        {pill('YEARLY')}
        <span className="relative z-10">Yearly</span>
        {isLanding && !!props.yearlySavePercent && (
          <span className="relative z-10 rounded-md bg-white/10 py-0.5 pr-1 pl-1.5 text-[10px] font-semibold whitespace-nowrap text-sky-400">
            -{Math.floor(props.yearlySavePercent / 5) * 5}%
          </span>
        )}
      </button>
    </div>
  )
}
