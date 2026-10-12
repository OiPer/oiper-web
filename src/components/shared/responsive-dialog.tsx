'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { XIcon } from 'lucide-react'
import * as React from 'react'

type ResponsiveDialogContextType = {
  isDesktop: boolean
}

const ResponsiveDialogContext = React.createContext<
  ResponsiveDialogContextType | undefined
>(undefined)

export function useResponsiveDialog() {
  const context = React.useContext(ResponsiveDialogContext)

  if (context) return context

  throw new Error('useResponsiveDialog must be used within ResponsiveDialog')
}

function ResponsiveDialogRoot({
  children,
  handleOnly = false,
  nested = false,
  ...props
}: React.ComponentProps<typeof Drawer>) {
  const isDesktop = !useIsMobile()

  const Component = isDesktop ? Dialog : Drawer
  const value = React.useMemo(() => ({ isDesktop }), [isDesktop])

  return (
    <ResponsiveDialogContext.Provider value={value}>
      <Component
        handleOnly={isDesktop ? undefined : handleOnly}
        nested={nested}
        {...props}
      >
        {children}
      </Component>
    </ResponsiveDialogContext.Provider>
  )
}

export function ResponsiveDialogTrigger({
  children,
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  const { isDesktop } = useResponsiveDialog()

  const Trigger = isDesktop ? DialogTrigger : DrawerTrigger

  return <Trigger {...props}>{children}</Trigger>
}

export function ResponsiveDialogContent({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof DialogContent>, 'className'> & {
  className?: string | { DrawerContent?: string; DialogContent?: string }
}) {
  const { isDesktop } = useResponsiveDialog()
  const Content = isDesktop ? DialogContent : DrawerContent

  return (
    <Content
      className={cn(
        'flex w-full flex-col gap-0 overflow-hidden p-0',
        isDesktop
          ? 'max-h-[min(90vh,48rem)]'
          : 'data-[vaul-drawer-direction=bottom]:max-h-[calc(100dvh-3rem)]',
        typeof className === 'string' || className === undefined
          ? className
          : className[isDesktop ? 'DialogContent' : 'DrawerContent']
      )}
      {...(isDesktop ? { showCloseButton: false } : {})}
      {...props}
    >
      {children}
    </Content>
  )
}

export function ResponsiveDialogHeader({
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<'div'> & { showCloseButton?: boolean }) {
  const { isDesktop } = useResponsiveDialog()

  return (
    <div
      className={cn(
        'flex shrink-0 items-start gap-4',
        isDesktop ? 'px-6 pt-6 pb-5' : 'p-5',
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">{children}</div>
      {isDesktop && showCloseButton && (
        <ResponsiveDialogClose asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:bg-foreground/10 hover:text-foreground -mt-2 -mr-2 shrink-0"
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        </ResponsiveDialogClose>
      )}
    </div>
  )
}

export function ResponsiveDialogBody({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { isDesktop } = useResponsiveDialog()

  return (
    <div
      className={cn(
        'min-h-0 flex-1 overflow-y-auto overscroll-contain',
        isDesktop ? 'px-6 last:pb-6' : 'px-5 last:pb-5',
        className
      )}
      {...props}
    />
  )
}

export function ResponsiveDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { isDesktop } = useResponsiveDialog()

  return (
    <div
      className={cn(
        'flex shrink-0 gap-2',
        isDesktop ? 'flex-row justify-end p-6' : 'flex-col-reverse p-5',
        className
      )}
      {...props}
    />
  )
}

export function ResponsiveDialogClose({
  children,
  ...props
}: React.ComponentProps<typeof DialogClose>) {
  const { isDesktop } = useResponsiveDialog()

  const Close = isDesktop ? DialogClose : DrawerClose

  return <Close {...props}>{children}</Close>
}

export function ResponsiveDialogTitle({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  const { isDesktop } = useResponsiveDialog()

  const Title = isDesktop ? DialogTitle : DrawerTitle

  return (
    <Title className={cn('leading-none', className)} {...props}>
      {children}
    </Title>
  )
}

export function ResponsiveDialogDescription({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  const { isDesktop } = useResponsiveDialog()

  const Description = isDesktop ? DialogDescription : DrawerDescription

  return (
    <Description
      className={cn(!isDesktop && 'leading-snug', className)}
      {...props}
    >
      {children}
    </Description>
  )
}

type ResponsiveDialogComponent = typeof ResponsiveDialogRoot & {
  useResponsiveDialog: typeof useResponsiveDialog
  Trigger: typeof ResponsiveDialogTrigger
  Content: typeof ResponsiveDialogContent
  Header: typeof ResponsiveDialogHeader
  Body: typeof ResponsiveDialogBody
  Footer: typeof ResponsiveDialogFooter
  Close: typeof ResponsiveDialogClose
  Title: typeof ResponsiveDialogTitle
  Description: typeof ResponsiveDialogDescription
}

export const ResponsiveDialog = Object.assign(ResponsiveDialogRoot, {
  useResponsiveDialog,
  Trigger: ResponsiveDialogTrigger,
  Content: ResponsiveDialogContent,
  Header: ResponsiveDialogHeader,
  Body: ResponsiveDialogBody,
  Footer: ResponsiveDialogFooter,
  Close: ResponsiveDialogClose,
  Title: ResponsiveDialogTitle,
  Description: ResponsiveDialogDescription,
}) as ResponsiveDialogComponent
