type OgCopy = {
  title: string
  description: string
  screenshot: 1 | 2 | 3 | 4 | 5
}

const OG_COPY: Record<string, OgCopy> = {
  '/': {
    title: 'Dictate Anywhere',
    description:
      'Hold a hotkey and speak while OiPer types your words into any app',
    screenshot: 1,
  },
  '/download': {
    title: 'Download OiPer',
    description: 'Free private dictation for Windows, macOS and Linux',
    screenshot: 2,
  },
  '/resources/changelog': {
    title: "What's New",
    description: 'Every OiPer release with its new features and fixes',
    screenshot: 3,
  },
  '/docs': {
    title: 'OiPer Docs',
    description:
      'Guides and reference for the desktop app and the snippets library',
    screenshot: 2,
  },
  '/docs/desktop': {
    title: 'OiPer Desktop',
    description:
      'Voice to text that runs on your machine and types into any app',
    screenshot: 2,
  },
  '/docs/desktop/quickstart': {
    title: 'Quickstart',
    description:
      'Set up OiPer and finish your first dictation in a few minutes',
    screenshot: 2,
  },
  '/docs/desktop/installation': {
    title: 'Installation',
    description:
      'Install OiPer and grant the permissions it needs to type for you',
    screenshot: 2,
  },
  '/docs/desktop/models': {
    title: 'Models',
    description: 'Run local Whisper models or bring your own cloud provider',
    screenshot: 4,
  },
  '/docs/desktop/profiles': {
    title: 'Profiles',
    description: 'Set a hotkey, language and mode for each kind of dictation',
    screenshot: 2,
  },
  '/docs/desktop/dictionary': {
    title: 'Dictionary',
    description: 'Teach OiPer the names and terms it keeps getting wrong',
    screenshot: 1,
  },
  '/docs/desktop/formatting': {
    title: 'Formatting',
    description: 'Clean up, rewrite or translate text before OiPer types it',
    screenshot: 3,
  },
  '/docs/desktop/snippets': {
    title: 'Snippets',
    description: 'Turn short spoken phrases into longer text as you dictate',
    screenshot: 5,
  },
  '/docs/desktop/history': {
    title: 'History',
    description: 'Look back at past dictations and replay the audio',
    screenshot: 1,
  },
  '/docs/desktop/settings': {
    title: 'Settings',
    description: 'Tune startup, audio input and how text gets inserted',
    screenshot: 2,
  },
  '/docs/desktop/troubleshooting': {
    title: 'Troubleshooting',
    description: 'Quick fixes for hotkeys, audio and slow transcription',
    screenshot: 2,
  },
  '/docs/snippets': {
    title: 'Snippets Library',
    description:
      'Apply configured snippets to any string from TypeScript or Rust',
    screenshot: 5,
  },
  '/docs/snippets/configuration': {
    title: 'Configuration',
    description: 'The snippet config format and the rules it enforces',
    screenshot: 5,
  },
  '/docs/snippets/matching': {
    title: 'Matching',
    description: 'How snippets are matched and which one wins',
    screenshot: 5,
  },
  '/docs/snippets/rust': {
    title: 'Rust API',
    description: 'Parse a snippet config and apply it from Rust',
    screenshot: 5,
  },
  '/docs/snippets/typescript': {
    title: 'TypeScript API',
    description: 'Parse a snippet config and apply it from TypeScript',
    screenshot: 5,
  },
  '/resources': {
    title: 'Resources',
    description: 'Policies and reference material for OiPer',
    screenshot: 1,
  },
  '/resources/privacy-policy': {
    title: 'Privacy Policy',
    description: 'What data OiPer handles and what stays on your device',
    screenshot: 1,
  },
  '/resources/security': {
    title: 'Security',
    description: 'Where OiPer stores files and what leaves your device',
    screenshot: 1,
  },
  '/resources/terms-of-service': {
    title: 'Terms of Service',
    description: 'The terms for using OiPer and its hosted services',
    screenshot: 1,
  },
  '/auth/signin': {
    title: 'Sign In',
    description: 'Pick up where you left off with your OiPer account',
    screenshot: 1,
  },
  '/auth/signup': {
    title: 'Create Account',
    description: 'Get hosted transcription while local dictation stays free',
    screenshot: 4,
  },
  '/auth/forgot-password': {
    title: 'Reset Password',
    description: 'Get back into your OiPer account in a minute',
    screenshot: 1,
  },
  '/auth/verify-email': {
    title: 'Verify Email',
    description: 'Confirm your email to finish setting up your account',
    screenshot: 1,
  },
  '/auth/desktop': {
    title: 'Connect Desktop',
    description: 'Link the OiPer desktop app to your account',
    screenshot: 2,
  },
  '/account/settings': {
    title: 'Account Settings',
    description: 'Manage your name and profile picture',
    screenshot: 1,
  },
  '/account/billing': {
    title: 'Billing',
    description: 'See your plan and change or cancel it anytime',
    screenshot: 4,
  },
  '/account/security': {
    title: 'Account Security',
    description: 'Keep your OiPer account safe with a strong password',
    screenshot: 1,
  },
  '/account/usage': {
    title: 'Usage',
    description: 'See how much cloud transcription you have used this period',
    screenshot: 4,
  },
}

export function ogCopy(path: string) {
  const copy = OG_COPY[path]
  if (!copy) throw new Error(`Missing OG copy for ${path} in og-copy.ts`)
  return copy
}
