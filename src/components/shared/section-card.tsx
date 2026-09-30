import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export function SectionCard<T extends ElementType = 'section'>({
  as,
  className,
  children,
  ...rest
}: {
  as?: T
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>) {
  const Component = (as ?? 'section') as ElementType

  return (
    <Component
      className={cn(
        'bg-card text-card-foreground flex flex-col justify-between gap-6 rounded-xl border pt-4 shadow-sm [--x-padding:--spacing(4)] sm:pt-6 sm:[--x-padding:--spacing(6)]',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}

export function SectionHeading(props: {
  title: string
  description: ReactNode
}) {
  return (
    <div className="px-(--x-padding)">
      <Label className="text-base select-auto">{props.title}</Label>
      <p className="text-muted-foreground text-sm">{props.description}</p>
    </div>
  )
}
