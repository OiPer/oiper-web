import { cn } from '@/lib/utils'
import { OiPerLogoText as BrandLogoText } from '@oiper/brand'
import { ComponentProps } from 'react'

export function OiPerLogoText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span className={cn('flex items-center', className)} {...props}>
      <BrandLogoText className="block h-[1em] w-auto" />
    </span>
  )
}
