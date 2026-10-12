import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Dev views',
  robots: { index: false, follow: false },
}

export default function DevLayout(props: { children: ReactNode }) {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') notFound()

  return props.children
}
