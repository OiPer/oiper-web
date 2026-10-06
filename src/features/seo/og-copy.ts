type OgCopy = {
  title: string
  description: string
  screenshot: 1 | 2 | 3 | 4 | 5
}

const OG_COPY: Record<string, OgCopy> = {
  '/': {
    title: 'Dictate Anywhere',
    description:
      'Hold a hotkey and speak while OiPer types your words into any app on your computer',
    screenshot: 1,
  },
  '/download': {
    title: 'Download OiPer',
    description:
      'Get the free private dictation app for Windows, macOS and Linux and start talking in minutes',
    screenshot: 2,
  },
  '/resources/changelog': {
    title: "What's New",
    description:
      'Every OiPer release in one place with the new features and fixes that shipped in each version',
    screenshot: 3,
  },
  '/docs': {
    title: 'OiPer Docs',
    description:
      'Guides and reference for the OiPer desktop app and the snippets library in one place',
    screenshot: 2,
  },
  '/docs/desktop': {
    title: 'OiPer Desktop',
    description:
      'Voice to text that runs on your own machine and types your words straight into any app',
    screenshot: 2,
  },
  '/docs/desktop/quickstart': {
    title: 'Quickstart',
    description:
      'Set up OiPer and finish your first dictation in just a few minutes from a fresh install',
    screenshot: 2,
  },
  '/docs/desktop/installation': {
    title: 'Installation',
    description:
      'Install OiPer on your computer and grant the permissions it needs to type for you',
    screenshot: 2,
  },
  '/docs/desktop/models': {
    title: 'Models',
    description:
      'Choose between local Whisper models on your own hardware or a cloud provider you trust',
    screenshot: 4,
  },
  '/docs/desktop/profiles': {
    title: 'Profiles',
    description:
      'Give every kind of dictation its own hotkey, language and transcription mode',
    screenshot: 2,
  },
  '/docs/desktop/dictionary': {
    title: 'Dictionary',
    description:
      'Teach OiPer the names and terms it keeps getting wrong so it spells them right',
    screenshot: 1,
  },
  '/docs/desktop/formatting': {
    title: 'Formatting',
    description:
      'Clean up, rewrite or translate your words before OiPer types them into the app',
    screenshot: 3,
  },
  '/docs/desktop/snippets': {
    title: 'Snippets',
    description:
      'Turn short spoken phrases into longer text that OiPer expands for you as you dictate',
    screenshot: 5,
  },
  '/docs/desktop/history': {
    title: 'History',
    description:
      'Look back at your past dictations and replay the audio whenever you need it',
    screenshot: 1,
  },
  '/docs/desktop/settings': {
    title: 'Settings',
    description:
      'Tune how OiPer starts, which microphone it listens to and how your text gets inserted',
    screenshot: 2,
  },
  '/docs/desktop/troubleshooting': {
    title: 'Troubleshooting',
    description:
      'Quick fixes for silent hotkeys and slow transcription so you can get back to dictating',
    screenshot: 2,
  },
  '/docs/snippets': {
    title: 'Snippets Library',
    description:
      'Apply configured snippets to any string from TypeScript or Rust with the same rules in both',
    screenshot: 5,
  },
  '/docs/snippets/configuration': {
    title: 'Configuration',
    description:
      'The snippet config format with its literal and regex matchers and the rules it enforces',
    screenshot: 5,
  },
  '/docs/snippets/matching': {
    title: 'Matching',
    description:
      'How snippets are matched against your input and which one wins when several could apply',
    screenshot: 5,
  },
  '/docs/snippets/rust': {
    title: 'Rust API',
    description:
      'Parse a snippet config and apply it to any string straight from your Rust code',
    screenshot: 5,
  },
  '/docs/snippets/typescript': {
    title: 'TypeScript API',
    description:
      'Parse a snippet config and apply it to any string straight from your TypeScript code',
    screenshot: 5,
  },
  '/resources': {
    title: 'Resources',
    description:
      'Policies and reference material that explain how OiPer works and how it handles your data',
    screenshot: 1,
  },
  '/resources/privacy-policy': {
    title: 'Privacy Policy',
    description:
      'What data OiPer handles, what stays on your device and how you can delete it at any time',
    screenshot: 1,
  },
  '/resources/security': {
    title: 'Security',
    description:
      'Where OiPer stores its files, how credentials are kept and what ever leaves your device',
    screenshot: 1,
  },
  '/resources/terms-of-service': {
    title: 'Terms of Service',
    description:
      'The terms for using OiPer Desktop, the website and the hosted transcription services',
    screenshot: 1,
  },
  '/auth/signin': {
    title: 'Sign In',
    description:
      'Sign in to pick up where you left off and manage your plan, usage and connected desktop app',
    screenshot: 1,
  },
  '/auth/signup': {
    title: 'Create Account',
    description:
      'Create an account for hosted transcription while local dictation in the app stays free',
    screenshot: 4,
  },
  '/auth/forgot-password': {
    title: 'Reset Password',
    description:
      'Reset your password and get back into your OiPer account in less than a minute',
    screenshot: 1,
  },
  '/auth/verify-email': {
    title: 'Verify Email',
    description:
      'Confirm your email address to finish setting up your OiPer account and get started',
    screenshot: 1,
  },
  '/auth/desktop': {
    title: 'Connect Desktop',
    description:
      'Sign in on the web to connect the OiPer desktop app to your account in one step',
    screenshot: 2,
  },
  '/account/settings': {
    title: 'Account Settings',
    description:
      'Manage your account name and profile picture and keep your OiPer details up to date',
    screenshot: 1,
  },
  '/account/billing': {
    title: 'Billing',
    description:
      'See your current OiPer plan and change, renew or cancel your subscription whenever you like',
    screenshot: 4,
  },
  '/account/security': {
    title: 'Account Security',
    description:
      'Keep your OiPer account safe by managing your password and security settings',
    screenshot: 1,
  },
  '/account/usage': {
    title: 'Usage',
    description:
      'See how much cloud transcription you have used on your plan and when your usage resets',
    screenshot: 4,
  },
}

export function ogCopy(path: string) {
  const copy = OG_COPY[path]
  if (!copy) throw new Error(`Missing OG copy for ${path} in og-copy.ts`)
  return copy
}
