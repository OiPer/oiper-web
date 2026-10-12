import { cn } from '@/lib/utils'
import { CircleCheckIcon, InfoIcon, OctagonXIcon } from 'lucide-react'
import type { ToastFixture } from './dummy-data'

// Static copy of a sonner toast as the app renders it: <Toaster richColors />
// in the forced dark theme, with the icons from components/ui/sonner.tsx.
// Colors are sonner's dark rich-color tokens.

const TYPE_CLASS: Record<ToastFixture['type'], string> = {
  success:
    'border-[hsl(147,100%,12%)] bg-[hsl(150,100%,6%)] text-[hsl(150,86%,65%)]',
  info: 'border-[hsl(223,43%,17%)] bg-[hsl(215,100%,6%)] text-[hsl(216,87%,65%)]',
  error:
    'border-[hsl(357,89%,16%)] bg-[hsl(358,76%,10%)] text-[hsl(358,100%,81%)]',
}

const TYPE_ICON: Record<ToastFixture['type'], typeof InfoIcon> = {
  success: CircleCheckIcon,
  info: InfoIcon,
  error: OctagonXIcon,
}

export function ToastPreview(props: { toast: ToastFixture }) {
  const Icon = TYPE_ICON[props.toast.type]

  return (
    <div
      className={cn(
        'flex w-full max-w-89 items-center gap-1.5 rounded-(--radius) border p-4 text-[13px] shadow-[0_4px_12px_#0000001a]',
        TYPE_CLASS[props.toast.type]
      )}
    >
      <div className="relative mr-1 -ml-0.75 flex size-4 shrink-0 items-center justify-start">
        <Icon className="size-4" />
      </div>
      <p className="leading-normal font-medium">{props.toast.message}</p>
    </div>
  )
}
