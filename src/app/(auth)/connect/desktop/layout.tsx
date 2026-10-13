import { appPageMetadata } from '@/features/seo/app-pages'
import type { PropsWithChildren } from 'react'

export const metadata = appPageMetadata('/connect/desktop')

export default function Layout({ children }: PropsWithChildren) {
  return children
}
