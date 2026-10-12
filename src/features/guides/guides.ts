import type { OS } from '@/features/download/platforms'

type Item = { title: string; text: string; docs?: string }

export type Guide = {
  label: string
  destination: string
  title: string
  description: string
  heading: string
  intro: string
  updated: string
  platform?: OS
  sections: { title: string; intro: string; items: Item[] }[]
  comparison?: {
    title: string
    intro: string
    competitor: string
    rows: { label: string; oiper: string; competitor: string }[]
  }
  faq: { question: string; answer: string }[]
}

export const GUIDES = {
  '/linux': {
    label: 'Linux',
    updated: '2026-10-11',
    destination: 'linux',
    title: 'Local Speech to Text for Linux: On-Device Voice Typing | OiPer',
    description:
      'OiPer brings local, on-device voice typing to Linux. Dictate into any app on X11 or Wayland with offline Whisper models. AppImage, .deb and .rpm.',
    heading: 'Local speech to text for Linux',
    intro:
      'Hold a hotkey, speak, and OiPer types your words into any Linux app: your terminal, editor, browser or chat. Transcription runs locally with on-device Whisper models, so it works offline and your audio never leaves your machine.',
    platform: 'linux',
    sections: [
      {
        title: 'Made for the Linux desktop',
        intro: 'A polished dictation app that installs like any other package.',
        items: [
          {
            title: 'A build for every distro',
            text: 'Install the AppImage on any distribution, the .deb on Debian and Ubuntu, or the .rpm on Fedora and RHEL.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'X11 and Wayland',
            text: 'OiPer types with a system tool you already know: wtype, kwtype, dotool or ydotool on Wayland, and xdotool or ydotool on X11.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Local, on-device Whisper models',
            text: 'Download a model once, from the 75 MB Tiny to Large v3 Turbo, and transcribe on your own CPU or GPU without a connection.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Works in any app',
            text: 'Text is typed where your cursor is, so dictation works in the terminal, VS Code, Firefox, Slack and everything else.',
          },
        ],
      },
      {
        title: 'Start dictating in minutes',
        intro: 'Three steps from download to your first sentence.',
        items: [
          {
            title: '1. Install a typing tool',
            text: 'Pick the one that matches your session, for example ydotool, which works on both X11 and Wayland.',
          },
          {
            title: '2. Install OiPer',
            text: 'Download the package for your distribution and launch the app.',
          },
          {
            title: '3. Pick a local model and a hotkey',
            text: 'The setup guides you through downloading an on-device speech model and choosing the shortcut you hold to dictate.',
            docs: '/docs/desktop/quickstart',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Does OiPer work on Wayland?',
        answer:
          'Yes. On Wayland OiPer types the transcript with wtype, kwtype, dotool or ydotool. On X11 it uses xdotool or ydotool. Install one of them before your first dictation.',
      },
      {
        question: 'Does it work offline on Linux?',
        answer:
          'Yes. In local mode OiPer transcribes on-device with a Whisper model stored on your computer, so dictation keeps working without an internet connection.',
      },
      {
        question: 'Is OiPer free on Linux?',
        answer:
          'Local, on-device transcription is free and unlimited on every platform, and no account is required. Paid plans add hosted transcription and formatting models.',
      },
      {
        question: 'Where does OiPer store its files on Linux?',
        answer:
          'Settings, history, downloaded models, audio and logs stay on your device in ~/.config/com.oiper.desktop. Deleting that folder resets the app completely.',
      },
    ],
  },
  '/windows': {
    label: 'Windows',
    updated: '2026-10-11',
    destination: 'windows',
    title: 'Local Speech to Text for Windows: On-Device Dictation | OiPer',
    description:
      'Dictate into any Windows app with OiPer. Hold a hotkey, speak, and your words are typed. Runs locally and offline with on-device Whisper models.',
    heading: 'Local speech to text for Windows',
    intro:
      'Hold a hotkey, speak, and OiPer types your words into any Windows app: Word, Outlook, Teams, your browser or your code editor. Transcription runs locally with on-device Whisper models, so it works offline and your audio stays on your PC.',
    platform: 'windows',
    sections: [
      {
        title: 'Dictation that fits how you work',
        intro: 'One shortcut, every app, no copy and paste.',
        items: [
          {
            title: 'Works in any app',
            text: 'Text is typed where your cursor is, so dictation works in documents, email, chat, browsers and editors.',
          },
          {
            title: 'Local, offline and private',
            text: 'On-device Whisper models run on your PC. Nothing is uploaded unless you choose a cloud provider for a profile.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Uses your GPU',
            text: 'Local transcription uses your graphics card automatically when one is available and falls back to the CPU when it is not.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Profiles for every task',
            text: 'Give each kind of dictation its own hotkey, language and transcription mode, and switch just by pressing a different shortcut.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
      {
        title: 'Clean text, not raw transcripts',
        intro: 'Shape what you say before it lands in the app.',
        items: [
          {
            title: 'AI formatting',
            text: 'Clean up filler words, rewrite into a clear message or translate before the text is typed.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Dictionary',
            text: 'Teach OiPer the names, products and jargon it should always spell your way.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Snippets',
            text: 'Say a short phrase and OiPer expands it into a longer block of text you use often.',
            docs: '/docs/desktop/snippets',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Does OiPer work offline on Windows?',
        answer:
          'Yes. In local mode OiPer transcribes on-device with a Whisper model stored on your PC, so dictation keeps working without an internet connection.',
      },
      {
        question: 'Is OiPer free on Windows?',
        answer:
          'Local, on-device transcription is free and unlimited, and no account is required. Paid plans add hosted transcription and formatting models.',
      },
      {
        question: 'Do I need a powerful PC?',
        answer:
          'No. Smaller local models like Base are fast on everyday hardware, and OiPer uses your GPU automatically when one is available. Larger models trade speed for accuracy.',
      },
      {
        question: 'Where does OiPer store its files on Windows?',
        answer:
          'Settings, history, downloaded models, audio and logs stay on your device in %APPDATA%\\com.oiper.desktop. Deleting that folder resets the app completely.',
      },
    ],
  },
  '/mac': {
    label: 'Mac',
    updated: '2026-10-11',
    destination: 'mac',
    title: 'Local Speech to Text for Mac: On-Device Dictation | OiPer',
    description:
      'Dictate into any Mac app with OiPer. Local, on-device Whisper transcription that works offline on Apple Silicon and Intel Macs. Free to use.',
    heading: 'Local speech to text for Mac',
    intro:
      'Hold a hotkey, speak, and OiPer types your words into any Mac app: Mail, Notes, Slack, your browser or your code editor. Transcription runs locally with on-device Whisper models, so it works offline and your audio stays on your Mac.',
    platform: 'macos',
    sections: [
      {
        title: 'Made for every Mac',
        intro: 'Apple Silicon or Intel, new or a few years old.',
        items: [
          {
            title: 'Apple Silicon and Intel',
            text: 'Native builds for M-series and Intel Macs, from macOS 10.15 Catalina onwards.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Local models on any Mac',
            text: 'On-device Whisper models run on the GPU when one is usable and on the CPU otherwise, so Intel Macs get local dictation too.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Works in any app',
            text: 'Text is typed where your cursor is, so dictation works in documents, email, chat, the terminal and every editor.',
          },
          {
            title: 'Offline and private',
            text: 'Nothing is uploaded in local mode. Cloud transcription is optional and you choose the provider.',
            docs: '/resources/security',
          },
        ],
      },
      {
        title: 'Clean text, not raw transcripts',
        intro: 'Shape what you say before it lands in the app.',
        items: [
          {
            title: 'AI formatting',
            text: 'Clean up filler words, turn speech into an email or a clear AI prompt, or translate before the text is typed.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Dictionary',
            text: 'Teach OiPer the names, products and jargon it should always spell your way.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Profiles',
            text: 'Give each kind of dictation its own hotkey, language, model and formatting.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
      {
        title: 'Set up in a few minutes',
        intro: 'Install, allow four permissions and start talking.',
        items: [
          {
            title: '1. Download for your Mac',
            text: 'Pick the Apple Silicon or Intel build and move OiPer to Applications.',
            docs: '/docs/desktop/installation',
          },
          {
            title: '2. Allow the permissions',
            text: 'Microphone to record, Input Monitoring for the hotkey, Accessibility to type the text and Screen Recording to place the overlay.',
            docs: '/docs/desktop/installation',
          },
          {
            title: '3. Pick a local model and a hotkey',
            text: 'The setup guides you through downloading an on-device speech model and choosing the shortcut you hold to dictate.',
            docs: '/docs/desktop/quickstart',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Does OiPer work offline on Mac?',
        answer:
          'Yes. In local mode OiPer transcribes on-device with a Whisper model stored on your Mac, so dictation keeps working without an internet connection.',
      },
      {
        question: 'Does OiPer run on Intel Macs?',
        answer:
          'Yes. There are separate builds for Apple Silicon and Intel, and local models run on both.',
      },
      {
        question: 'Is OiPer free on Mac?',
        answer:
          'Local, on-device transcription is free and unlimited, and no account is required. Paid plans add hosted transcription and formatting models.',
      },
      {
        question: 'Why does OiPer need Accessibility and Input Monitoring?',
        answer:
          'Input Monitoring lets OiPer notice the global hotkey you hold to dictate, and Accessibility lets it type the transcript into the app you are using.',
      },
      {
        question: 'Where does OiPer store its files on Mac?',
        answer:
          'Settings, history, downloaded models, audio and logs stay on your device in ~/Library/Application Support/com.oiper.desktop. Deleting that folder resets the app completely.',
      },
    ],
  },
  '/use-cases/coding': {
    label: 'Coding',
    updated: '2026-10-11',
    destination: 'coding',
    title: 'Voice to Text for Coding: Local AI Prompt Dictation | OiPer',
    description:
      'Dictate prompts into Claude Code, Cursor and VS Code with OiPer. Local, on-device transcription, a custom dictionary and hands-free prompt submit.',
    heading: 'Voice to text for coding',
    intro:
      'Talking is faster than typing, and AI coding tools run on words. OiPer types what you say into the terminal, Cursor, VS Code or any chat box, so you can explain a change out loud instead of typing it. Transcription runs locally on your device.',
    sections: [
      {
        title: 'Talk to your AI coding tools',
        intro: 'Describe the change, the bug or the plan in full sentences.',
        items: [
          {
            title: 'Any editor, any terminal',
            text: 'Text is typed where your cursor is: Claude Code in the terminal, Cursor and Copilot chat, VS Code, JetBrains IDEs and GitHub.',
          },
          {
            title: 'Send prompts hands-free',
            text: 'Auto submit presses Enter, Ctrl + Enter or another combination after the text is inserted, so a dictated prompt sends itself.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Turn rambling into a clear prompt',
            text: 'The Prompt formatting preset restructures what you said into a clear, well-organised prompt before it is typed.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Local and on-device',
            text: 'Speech is transcribed on your own machine with local Whisper models, so what you say about your codebase stays on your device.',
            docs: '/docs/desktop/models',
          },
        ],
      },
      {
        title: 'Spell your stack right',
        intro:
          'Dictation that knows the difference between postgres and PostgreSQL.',
        items: [
          {
            title: 'Dictionary for jargon',
            text: 'Add library names, internal services and technical terms so they come out with the right spelling and capitalisation.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Snippets for repeated prompts',
            text: 'Say a short shortcut and OiPer expands it into a prompt you use every day, like your review checklist.',
            docs: '/docs/desktop/snippets',
          },
          {
            title: 'A profile just for coding',
            text: 'Give coding its own hotkey, language, model and formatting, separate from how you dictate email.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Does OiPer work in the terminal?',
        answer:
          'Yes. OiPer types into whatever app has focus, including terminals running Claude Code or other command-line tools.',
      },
      {
        question: 'Can I dictate code syntax?',
        answer:
          'OiPer is best for natural language: prompts, comments, commit messages, reviews and docs. Let your AI tool write the syntax and use your voice to explain what you want.',
      },
      {
        question: 'Does it work offline?',
        answer:
          'Yes. In local mode OiPer transcribes on-device with a Whisper model on your computer, so dictation works without an internet connection.',
      },
      {
        question: 'Which platforms are supported?',
        answer:
          'Windows, macOS (Apple Silicon and Intel) and Linux, with AppImage, .deb and .rpm packages.',
      },
    ],
  },
  '/alternatives/wispr-flow': {
    label: 'vs Wispr Flow',
    updated: '2026-10-11',
    destination: 'wispr_flow_alternative',
    title: 'Free Local Wispr Flow Alternative: Windows, Mac, Linux | OiPer',
    description:
      'A free, local Wispr Flow alternative. OiPer transcribes on-device, works offline and runs on Windows, macOS and Linux with no weekly word limit.',
    heading: 'A local, on-device Wispr Flow alternative',
    intro:
      'Wispr Flow is a polished dictation app that sends your voice to the cloud to be transcribed. OiPer keeps the same workflow (hold a hotkey, speak, release) but transcribes locally with on-device Whisper models, works offline and also runs on Linux.',
    sections: [
      {
        title: 'Why people switch to OiPer',
        intro: 'The same hotkey workflow, with your voice kept on your device.',
        items: [
          {
            title: 'Local, on-device transcription',
            text: 'Wispr Flow processes dictation on its servers. OiPer runs Whisper locally on your CPU or GPU, so in local mode your audio is never uploaded anywhere.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Works offline',
            text: 'Because transcription is on-device, OiPer keeps working on a plane, on a train or behind a strict company firewall.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Runs on Linux',
            text: 'Wispr Flow has no Linux app. OiPer ships AppImage, .deb and .rpm builds with X11 and Wayland support, and works the same on Windows and macOS.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'No weekly word limit',
            text: 'Wispr Flow’s free plan caps how many words you can dictate each week. Local transcription in OiPer is free and unlimited, with no account required.',
          },
          {
            title: 'Choose your own cloud, if any',
            text: 'Want cloud accuracy for one profile? Bring your own API key for OpenAI, Groq or any OpenAI-compatible provider, or use OiPer’s hosted models on a paid plan.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Privacy you can check yourself',
            text: 'Turn off your Wi-Fi and keep dictating. Settings, history, audio and models live in one folder on your computer, and API keys are stored separately from your config.',
            docs: '/resources/security',
          },
        ],
      },
      {
        title: 'What carries over from Wispr Flow',
        intro: 'The features you rely on have a direct equivalent.',
        items: [
          {
            title: 'Dictionary',
            text: 'Add names, products and jargon once and OiPer spells them your way every time.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Snippets',
            text: 'Say a shortcut and OiPer expands it into an address, a link or a full reply.',
            docs: '/docs/desktop/snippets',
          },
          {
            title: 'Styles become formatting presets',
            text: 'Normal, Prompt, Email, Formal and Casual presets clean up or rewrite what you said, or write your own instructions. Formatting can also translate into just under a hundred languages.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Different setups per task',
            text: 'Profiles give each kind of dictation its own hotkey, language, model, formatting and auto submit.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
      {
        title: 'When Wispr Flow is the better fit',
        intro: 'An honest look at what OiPer does not do.',
        items: [
          {
            title: 'Meeting notes',
            text: 'Wispr Flow includes a notetaker for meetings on Mac and Windows. OiPer focuses on dictation into the app you are using.',
          },
          {
            title: 'Managed team rollouts',
            text: 'Wispr Flow offers team billing, an admin portal and enterprise controls such as SSO. OiPer is built for individuals today.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs Wispr Flow',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'Wispr Flow',
      rows: [
        {
          label: 'Windows',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'macOS',
          oiper: 'Yes, Apple Silicon and Intel',
          competitor: 'Yes',
        },
        {
          label: 'Linux',
          oiper: 'Yes (AppImage, .deb, .rpm)',
          competitor: 'No Linux app',
        },
        {
          label: 'Where speech is transcribed',
          oiper: 'Locally, on your device',
          competitor: 'In Wispr Flow’s cloud',
        },
        {
          label: 'Works offline',
          oiper: 'Yes',
          competitor: 'No, needs internet',
        },
        {
          label: 'Audio sent to a server',
          oiper: 'Never in local mode',
          competitor: 'Every dictation',
        },
        {
          label: 'Free plan',
          oiper: 'Unlimited local transcription',
          competitor: '2,000 words per week on desktop',
        },
        {
          label: 'Choose your cloud provider',
          oiper: 'Any OpenAI-compatible provider with your key',
          competitor: 'Wispr Flow only',
        },
        {
          label: 'Formatting on a local model',
          oiper: 'Yes, any OpenAI-compatible endpoint',
          competitor: 'No, cloud only',
        },
        {
          label: 'Choose your speech model',
          oiper: 'Tiny to Large v3 Turbo, plus English-only',
          competitor: 'No',
        },
        {
          label: 'Custom dictionary',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Snippets',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Meeting notes',
          oiper: 'No',
          competitor: 'Yes',
        },
        {
          label: 'Team admin and SSO',
          oiper: 'No',
          competitor: 'Teams and Enterprise plans',
        },
      ],
    },
    faq: [
      {
        question: 'Is OiPer a good Wispr Flow alternative?',
        answer:
          'If you want local, on-device transcription, offline dictation or Linux support, yes. If you need meeting notes or team admin controls, Wispr Flow covers those and OiPer does not.',
      },
      {
        question: 'Does Wispr Flow work offline?',
        answer:
          'No. Wispr Flow transcribes in the cloud, so it needs an internet connection. OiPer transcribes locally on your device, so it keeps working offline.',
      },
      {
        question: 'What is the best free Wispr Flow alternative?',
        answer:
          'OiPer is free for unlimited local transcription on Windows, macOS and Linux, with no weekly word limit and no account. You only pay if you want OiPer’s hosted models.',
      },
      {
        question: 'Is there a local Wispr Flow alternative?',
        answer:
          'Yes. OiPer transcribes on-device with Whisper models that run on your own CPU or GPU, so nothing is sent to a server in local mode.',
      },
      {
        question: 'Is there a Wispr Flow alternative for Linux?',
        answer:
          'Yes. OiPer runs on Linux, including Ubuntu, Debian and Fedora, with AppImage, .deb and .rpm builds and support for both X11 and Wayland.',
      },
      {
        question: 'Is there a free Wispr Flow alternative for Windows?',
        answer:
          'Yes. OiPer is free on Windows for unlimited local transcription and uses your GPU automatically when one is available.',
      },
      {
        question: 'Is OiPer open source?',
        answer:
          'No. OiPer Desktop is not open source. Local transcription is free and unlimited, runs entirely on your device and needs no account.',
      },
      {
        question: 'Can OiPer clean up my dictation like Wispr Flow?',
        answer:
          'Yes. Formatting can clean up, rewrite or translate the transcript before it is typed. Use a preset or your own instructions, and run it on OiPer’s models or any OpenAI-compatible endpoint, including one on your own machine.',
      },
    ],
  },
  '/alternatives/superwhisper': {
    label: 'vs Superwhisper',
    updated: '2026-10-11',
    destination: 'superwhisper_alternative',
    title: 'Free Superwhisper Alternative for Windows, Linux & Mac | OiPer',
    description:
      'A free Superwhisper alternative. OiPer brings local, on-device Whisper dictation to Windows, macOS and Linux with the same app on every desktop.',
    heading: 'A local Superwhisper alternative for every desktop',
    intro:
      'Superwhisper is a well-loved dictation app that started on the Mac and runs Whisper locally. OiPer offers the same private, on-device dictation and works the same way on Windows, macOS and Linux.',
    sections: [
      {
        title: 'Why people choose OiPer',
        intro: 'Local, on-device dictation without being tied to one platform.',
        items: [
          {
            title: 'Runs on Linux',
            text: 'Superwhisper has no Linux app. OiPer ships AppImage, .deb and .rpm builds with X11 and Wayland support.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Local models on any hardware',
            text: 'Superwhisper recommends cloud models on Intel Macs. OiPer runs local Whisper models on your GPU when one is available and on the CPU otherwise, on Intel and Apple Silicon Macs alike.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Your own API key without a paid plan',
            text: 'Superwhisper keeps your own API keys for Pro. In OiPer you can add OpenAI, Groq or any OpenAI-compatible provider and keep transcribing locally for free.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Translate into any language',
            text: 'Superwhisper translates into English on Pro. OiPer formatting translates what you said into just under a hundred languages.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'One app across every computer',
            text: 'Use the same app, profiles, dictionary and snippets on a Windows PC at work, a Mac at home and a Linux laptop.',
          },
        ],
      },
      {
        title: 'What carries over from Superwhisper',
        intro: 'The features you rely on have a direct equivalent.',
        items: [
          {
            title: 'Modes become profiles and presets',
            text: 'Each profile has its own hotkey, language, model and formatting. Presets like Email, Formal, Casual and Prompt rewrite your words, or write your own instructions.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Vocabulary becomes the dictionary',
            text: 'Add names, abbreviations and specialised terms once so they are spelled right every time.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Push to talk',
            text: 'Hold your hotkey, speak and release. The text is typed into the app you are using.',
            docs: '/docs/desktop/quickstart',
          },
          {
            title: 'Snippets',
            text: 'Say a shortcut and OiPer expands it into longer text you use often.',
            docs: '/docs/desktop/snippets',
          },
        ],
      },
      {
        title: 'When Superwhisper is the better fit',
        intro: 'An honest look at what OiPer does not do.',
        items: [
          {
            title: 'Meetings and audio files',
            text: 'Superwhisper records meetings and, on Pro, transcribes audio and video files. OiPer focuses on live dictation into the app you are using.',
          },
          {
            title: 'Context from your screen',
            text: 'Superwhisper’s Super Mode adapts to what is on your screen. OiPer formats based on your words and your instructions.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs Superwhisper',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'Superwhisper',
      rows: [
        {
          label: 'macOS',
          oiper: 'Yes, Apple Silicon and Intel',
          competitor: 'Yes',
        },
        {
          label: 'Windows',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Linux',
          oiper: 'Yes (AppImage, .deb, .rpm)',
          competitor: 'No Linux app',
        },
        {
          label: 'Works offline',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Local models on Intel Macs',
          oiper: 'Yes, on the CPU or GPU',
          competitor: 'Cloud models recommended',
        },
        {
          label: 'Your own API key',
          oiper: 'Free',
          competitor: 'Pro plan',
        },
        {
          label: 'Translation',
          oiper: 'Into just under a hundred languages, free',
          competitor: 'Into English only, Pro plan',
        },
        {
          label: 'Same app on Windows, macOS and Linux',
          oiper: 'Yes',
          competitor: 'No',
        },
        {
          label: 'Custom vocabulary',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Meeting recording',
          oiper: 'No',
          competitor: 'Yes',
        },
        {
          label: 'Audio and video files',
          oiper: 'No',
          competitor: 'Pro plan',
        },
      ],
    },
    faq: [
      {
        question: 'Is OiPer a good Superwhisper alternative?',
        answer:
          'If you work on Linux or switch between operating systems, yes: OiPer runs local, on-device Whisper the same way everywhere. If you need meeting or file transcription, Superwhisper covers those and OiPer does not.',
      },
      {
        question: 'Is there a Superwhisper alternative for Windows?',
        answer:
          'Yes. OiPer runs on Windows with local Whisper models on your CPU or GPU, and it types into any app.',
      },
      {
        question: 'Is there a Superwhisper alternative for Linux?',
        answer:
          'Yes. OiPer runs on Linux, including Ubuntu, Debian and Fedora, with AppImage, .deb and .rpm builds and support for both X11 and Wayland.',
      },
      {
        question: 'What is the best free Superwhisper alternative?',
        answer:
          'OiPer is free for unlimited local transcription on Windows, macOS and Linux, and features like your own API keys and translation do not need a paid plan.',
      },
      {
        question: 'Is OiPer open source?',
        answer:
          'No. OiPer Desktop is not open source. Local transcription is free and unlimited, runs entirely on your device and needs no account.',
      },
      {
        question: 'Does OiPer use Whisper like Superwhisper?',
        answer:
          'Yes. Local transcription uses Whisper models from Tiny to Large v3 Turbo, downloaded once and run on your device.',
      },
    ],
  },
} satisfies Record<string, Guide>

export type GuidePath = keyof typeof GUIDES
