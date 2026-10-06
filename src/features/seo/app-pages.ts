import type { Metadata } from 'next'

export const OG_SIZE = { width: 1200, height: 630 }

type Og = {
  title: string
  description: string
  screenshot: 1 | 2 | 3 | 4 | 5
}

type Seo = { title: string; description: string }

export const APP_PAGES = {
  '/auth/signin': {
    seo: {
      title: 'Sign in',
      description:
        'Sign in to your OiPer account to manage your plan, billing, usage, and the desktop app connected to it.',
    },
    og: {
      title: 'Sign In',
      description:
        'Sign in to pick up where you left off and manage your plan, usage and connected desktop app',
      screenshot: 1,
    },
  },
  '/auth/signup': {
    seo: {
      title: 'Create account',
      description:
        'Create your OiPer account to use hosted transcription and manage your plan. Local dictation stays free and needs no account.',
    },
    og: {
      title: 'Create Account',
      description:
        'Create an account for hosted transcription while local dictation in the app stays free',
      screenshot: 4,
    },
  },
  '/auth/forgot-password': {
    seo: {
      title: 'Reset password',
      description:
        'Reset the password for your OiPer account and get back to dictating.',
    },
    og: {
      title: 'Reset Password',
      description:
        'Reset your password and get back into your OiPer account in less than a minute',
      screenshot: 1,
    },
  },
  '/auth/verify-email': {
    seo: {
      title: 'Verify your email',
      description:
        'Confirm your email address to finish setting up your OiPer account.',
    },
    og: {
      title: 'Verify Email',
      description:
        'Confirm your email address to finish setting up your OiPer account and get started',
      screenshot: 1,
    },
  },
  '/auth/desktop': {
    seo: {
      title: 'Connect OiPer Desktop',
      description:
        'Sign in on the web to connect the OiPer desktop app to your account.',
    },
    og: {
      title: 'Connect Desktop',
      description:
        'Sign in on the web to connect the OiPer desktop app to your account in one step',
      screenshot: 2,
    },
  },
  '/account/settings': {
    seo: {
      title: 'Account settings',
      description:
        'Manage your OiPer account name, profile picture, and preferences in one place.',
    },
    og: {
      title: 'Account Settings',
      description:
        'Manage your account name and profile picture and keep your OiPer details up to date',
      screenshot: 1,
    },
  },
  '/account/billing': {
    seo: {
      title: 'Billing',
      description:
        'See your OiPer plan and change, renew, or cancel your subscription.',
    },
    og: {
      title: 'Billing',
      description:
        'See your current OiPer plan and change, renew or cancel your subscription whenever you like',
      screenshot: 4,
    },
  },
  '/account/security': {
    seo: {
      title: 'Security',
      description: 'Manage the password and security of your OiPer account.',
    },
    og: {
      title: 'Account Security',
      description:
        'Keep your OiPer account safe by managing your password and security settings',
      screenshot: 1,
    },
  },
  '/account/usage': {
    seo: {
      title: 'Usage',
      description:
        'See how much cloud transcription you have used on your OiPer plan this period.',
    },
    og: {
      title: 'Usage',
      description:
        'See how much cloud transcription you have used on your plan and when your usage resets',
      screenshot: 4,
    },
  },
} satisfies Record<string, { seo: Seo; og: Og }>

export const SITE_PAGES = {
  '/': {
    og: {
      title: 'Dictate Anywhere',
      description:
        'Hold a hotkey and speak while OiPer types your words into any app on your computer',
      screenshot: 1,
    },
  },
  '/download': {
    og: {
      title: 'Download OiPer',
      description:
        'Get the free private dictation app for Windows, macOS and Linux and start talking in minutes',
      screenshot: 2,
    },
  },
  '/resources/changelog': {
    og: {
      title: "What's New",
      description:
        'Every OiPer release in one place with the new features and fixes that shipped in each version',
      screenshot: 3,
    },
  },
  '/docs': {
    og: {
      title: 'OiPer Docs',
      description:
        'Guides and reference for the OiPer desktop app and the snippets library in one place',
      screenshot: 2,
    },
  },
  '/docs/desktop': {
    og: {
      title: 'OiPer Desktop',
      description:
        'Voice to text that runs on your own machine and types your words straight into any app',
      screenshot: 2,
    },
  },
  '/docs/desktop/quickstart': {
    og: {
      title: 'Quickstart',
      description:
        'Set up OiPer and finish your first dictation in just a few minutes from a fresh install',
      screenshot: 2,
    },
  },
  '/docs/desktop/installation': {
    og: {
      title: 'Installation',
      description:
        'Install OiPer on your computer and grant the permissions it needs to type for you',
      screenshot: 2,
    },
  },
  '/docs/desktop/models': {
    og: {
      title: 'Models',
      description:
        'Choose between local Whisper models on your own hardware or a cloud provider you trust',
      screenshot: 4,
    },
  },
  '/docs/desktop/profiles': {
    og: {
      title: 'Profiles',
      description:
        'Give every kind of dictation its own hotkey, language and transcription mode',
      screenshot: 2,
    },
  },
  '/docs/desktop/dictionary': {
    og: {
      title: 'Dictionary',
      description:
        'Teach OiPer the names and terms it keeps getting wrong so it spells them right',
      screenshot: 1,
    },
  },
  '/docs/desktop/formatting': {
    og: {
      title: 'Formatting',
      description:
        'Clean up, rewrite or translate your words before OiPer types them into the app',
      screenshot: 3,
    },
  },
  '/docs/desktop/snippets': {
    og: {
      title: 'Snippets',
      description:
        'Turn short spoken phrases into longer text that OiPer expands for you as you dictate',
      screenshot: 5,
    },
  },
  '/docs/desktop/history': {
    og: {
      title: 'History',
      description:
        'Look back at your past dictations and replay the audio whenever you need it',
      screenshot: 1,
    },
  },
  '/docs/desktop/settings': {
    og: {
      title: 'Settings',
      description:
        'Tune how OiPer starts, which microphone it listens to and how your text gets inserted',
      screenshot: 2,
    },
  },
  '/docs/desktop/troubleshooting': {
    og: {
      title: 'Troubleshooting',
      description:
        'Quick fixes for silent hotkeys and slow transcription so you can get back to dictating',
      screenshot: 2,
    },
  },
  '/docs/snippets': {
    og: {
      title: 'Snippets Library',
      description:
        'Apply configured snippets to any string from TypeScript or Rust with the same rules in both',
      screenshot: 5,
    },
  },
  '/docs/snippets/configuration': {
    og: {
      title: 'Configuration',
      description:
        'The snippet config format with its literal and regex matchers and the rules it enforces',
      screenshot: 5,
    },
  },
  '/docs/snippets/matching': {
    og: {
      title: 'Matching',
      description:
        'How snippets are matched against your input and which one wins when several could apply',
      screenshot: 5,
    },
  },
  '/docs/snippets/rust': {
    og: {
      title: 'Rust API',
      description:
        'Parse a snippet config and apply it to any string straight from your Rust code',
      screenshot: 5,
    },
  },
  '/docs/snippets/typescript': {
    og: {
      title: 'TypeScript API',
      description:
        'Parse a snippet config and apply it to any string straight from your TypeScript code',
      screenshot: 5,
    },
  },
  '/resources': {
    og: {
      title: 'Resources',
      description:
        'Policies and reference material that explain how OiPer works and how it handles your data',
      screenshot: 1,
    },
  },
  '/resources/privacy-policy': {
    og: {
      title: 'Privacy Policy',
      description:
        'What data OiPer handles, what stays on your device and how you can delete it at any time',
      screenshot: 1,
    },
  },
  '/resources/security': {
    og: {
      title: 'Security',
      description:
        'Where OiPer stores its files, how credentials are kept and what ever leaves your device',
      screenshot: 1,
    },
  },
  '/resources/terms-of-service': {
    og: {
      title: 'Terms of Service',
      description:
        'The terms for using OiPer Desktop, the website and the hosted transcription services',
      screenshot: 1,
    },
  },
} satisfies Record<string, { og: Og }>

export type AppPagePath = keyof typeof APP_PAGES

export function ogCopy(path: string): Og {
  if (Object.hasOwn(APP_PAGES, path)) return APP_PAGES[path as AppPagePath].og
  if (Object.hasOwn(SITE_PAGES, path)) {
    return SITE_PAGES[path as keyof typeof SITE_PAGES].og
  }

  throw new Error(`Missing OG copy for ${path} in app-pages.ts`)
}

export function appPageMetadata(path: AppPagePath): Metadata {
  const { seo, og } = APP_PAGES[path]
  const image = { url: `/og${path}`, ...OG_SIZE, alt: og.title }

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      type: 'website',
      siteName: 'OiPer',
      url: path,
      title: og.title,
      description: og.description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: og.title,
      description: og.description,
      images: [image],
    },
  }
}
