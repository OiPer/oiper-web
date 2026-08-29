'use client'

import { ResponsiveDialog } from '@/components/shared/responsive-dialog'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Wrapper } from '@/components/wrapper'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Fragment } from 'react'
import { Header } from './header'
import { SidenavItems } from './sidenav'

function toTitleCase(value: string) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function buildPath(segments: string[]) {
  return `/${segments.filter(Boolean).join('/')}`
}

export function Sidenav({ children }: React.PropsWithChildren) {
  const layoutSegments = useSelectedLayoutSegments()
  const segments = ['account', ...layoutSegments]

  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <Header />

      <Wrapper className="pt-6 pb-8 max-md:pt-2">
        <main className="grid w-full items-start gap-x-6 gap-y-4 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
          <SidenavItems className="mt-2 hidden md:block" />

          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex items-center justify-between md:hidden">
              <Breadcrumb>
                <BreadcrumbList>
                  {segments.map((segment, index) => (
                    <Fragment key={`${segment}-${index}`}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href={buildPath(segments.slice(0, index + 1))}>
                            {toTitleCase(segment)}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      {index !== segments.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>

              <ResponsiveDialog>
                <ResponsiveDialog.Trigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </ResponsiveDialog.Trigger>

                <ResponsiveDialog.Content hideHandler>
                  <div className="flex flex-col gap-1">
                    <ResponsiveDialog.Title>
                      Account Menu
                    </ResponsiveDialog.Title>
                    <ResponsiveDialog.Description>
                      Navigate through your account settings
                    </ResponsiveDialog.Description>
                  </div>

                  <SidenavItems />
                </ResponsiveDialog.Content>
              </ResponsiveDialog>
            </div>

            {children}
          </div>
        </main>
      </Wrapper>
    </div>
  )
}
