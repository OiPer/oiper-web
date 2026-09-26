import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { Slot } from 'radix-ui'
import * as React from 'react'

export function Loading({
  asChild = false,
  loading = true,
  className,
  ...props
}: React.ComponentProps<'span'> & { asChild?: boolean; loading?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span'

  return (
    <>
      <Comp
        data-slot="button-loading-label"
        className={cn(className, loading && 'opacity-0')}
        {...props}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  )
}
