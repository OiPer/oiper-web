'use client'

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
  hideHandler,
  ...props
}: Omit<React.ComponentProps<typeof DialogContent>, 'className'> & {
  hideHandler?: boolean
  className?: string | { DrawerContent?: string; DialogContent?: string }
}) {
  const { isDesktop } = useResponsiveDialog()
  const Content = isDesktop ? DialogContent : DrawerContent

  return (
    <Content
      className={cn(
        'flex w-full flex-col gap-4 p-4 md:p-6',
        {
          'max-h-[min(90vh,48rem)] overflow-auto': isDesktop,
          'pt-0': !isDesktop && hideHandler,
        },
        typeof className === 'string' || className === undefined
          ? className
          : className[isDesktop ? 'DialogContent' : 'DrawerContent']
      )}
      {...props}
    >
      {children}
    </Content>
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
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  const { isDesktop } = useResponsiveDialog()

  const Title = isDesktop ? DialogTitle : DrawerTitle

  return <Title {...props}>{children}</Title>
}

export function ResponsiveDialogDescription({
  children,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  const { isDesktop } = useResponsiveDialog()

  const Description = isDesktop ? DialogDescription : DrawerDescription

  return <Description {...props}>{children}</Description>
}

type ResponsiveDialogComponent = typeof ResponsiveDialogRoot & {
  useResponsiveDialog: typeof useResponsiveDialog
  Trigger: typeof ResponsiveDialogTrigger
  Content: typeof ResponsiveDialogContent
  Close: typeof ResponsiveDialogClose
  Title: typeof ResponsiveDialogTitle
  Description: typeof ResponsiveDialogDescription
}

export const ResponsiveDialog = Object.assign(ResponsiveDialogRoot, {
  useResponsiveDialog,
  Trigger: ResponsiveDialogTrigger,
  Content: ResponsiveDialogContent,
  Close: ResponsiveDialogClose,
  Title: ResponsiveDialogTitle,
  Description: ResponsiveDialogDescription,
}) as ResponsiveDialogComponent
