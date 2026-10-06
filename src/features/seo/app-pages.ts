import type { Metadata } from 'next'
import { OG_SIZE } from './og-card'

export const APP_PAGES = {
  '/auth/signin': {
    title: 'Sign in',
    description:
      'Sign in to your OiPer account to manage your plan, billing, usage, and the desktop app connected to it.',
  },
  '/auth/signup': {
    title: 'Create account',
    description:
      'Create your OiPer account to use hosted transcription and manage your plan. Local dictation stays free and needs no account.',
  },
  '/auth/forgot-password': {
    title: 'Reset password',
    description:
      'Reset the password for your OiPer account and get back to dictating.',
  },
  '/auth/verify-email': {
    title: 'Verify your email',
    description:
      'Confirm your email address to finish setting up your OiPer account.',
  },
  '/auth/desktop': {
    title: 'Connect OiPer Desktop',
    description:
      'Sign in on the web to connect the OiPer desktop app to your account.',
  },
  '/account/settings': {
    title: 'Account settings',
    description:
      'Manage your OiPer account name, profile picture, and preferences in one place.',
  },
  '/account/billing': {
    title: 'Billing',
    description:
      'See your OiPer plan and change, renew, or cancel your subscription.',
  },
  '/account/security': {
    title: 'Security',
    description: 'Manage the password and security of your OiPer account.',
  },
  '/account/usage': {
    title: 'Usage',
    description:
      'See how much cloud transcription you have used on your OiPer plan this period.',
  },
}

export type AppPagePath = keyof typeof APP_PAGES

export function appPageMetadata(path: AppPagePath): Metadata {
  const { title, description } = APP_PAGES[path]
  const image = { url: `/og${path}`, ...OG_SIZE, alt: title }

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: 'OiPer',
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
