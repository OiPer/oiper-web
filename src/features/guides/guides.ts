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
            text: 'Teach OiPer the names, products and jargon it should always spell your way when you use cloud or hosted transcription.',
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
            text: 'Teach OiPer the names, products and jargon it should always spell your way when you use cloud or hosted transcription.',
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
      'Dictate prompts into Claude Code, Cursor and VS Code with OiPer. Local, on-device transcription, snippets, a custom dictionary and hands-free prompt submit.',
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
            text: 'Add library names, internal services and technical terms so cloud and hosted transcription spell and capitalise them right. In local mode, a snippet can fix a term that keeps coming out wrong.',
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
            text: 'Add names, products and jargon once and cloud or hosted transcription spells them your way. In local mode, a snippet can fix a word that keeps coming out wrong.',
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
          oiper: 'Cloud and hosted modes',
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
            text: 'Add names, abbreviations and specialised terms once so cloud and hosted transcription spells them right. In local mode, a snippet can fix a word that keeps coming out wrong.',
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
  '/whisper-desktop-app': {
    label: 'Whisper Desktop',
    updated: '2026-10-12',
    destination: 'whisper_desktop_app',
    title: 'Whisper Desktop App for Windows, Mac and Linux | OiPer',
    description:
      'Run OpenAI Whisper locally without Python. OiPer is a Whisper desktop app for Windows, macOS and Linux that types what you say into any app.',
    heading: 'A Whisper desktop app for Windows, Mac and Linux',
    intro:
      'Whisper is OpenAI’s speech recognition model, and running it usually means Python, a command line and a pile of dependencies. OiPer packages local Whisper into a desktop app: pick a model, download it once, then hold a hotkey and speak. The text is typed into whatever app you are using, and it works offline.',
    sections: [
      {
        title: 'Whisper without the setup',
        intro:
          'An installer, a model picker and a hotkey. No Python and no terminal.',
        items: [
          {
            title: 'Install like any other app',
            text: 'Download the Windows installer, the Apple Silicon or Intel build for macOS 10.15 and later, or the AppImage, .deb or .rpm for Linux.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Models download inside the app',
            text: 'Choose a Whisper model during setup or on the Models page. It is downloaded once from Hugging Face and then runs entirely on your machine.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Uses your GPU automatically',
            text: 'The Whisper Hardware setting defaults to Auto, which uses the GPU when one is usable and the CPU otherwise. Force CPU if GPU transcription misbehaves.',
            docs: '/docs/desktop/settings',
          },
          {
            title: 'Types into any app',
            text: 'Hold your hotkey, speak and release. The transcript is inserted at your cursor in your editor, browser, email, chat or terminal.',
            docs: '/docs/desktop/quickstart',
          },
        ],
      },
      {
        title: 'How to choose a Whisper model',
        intro:
          'Larger models are more accurate but slower and need more disk space and memory.',
        items: [
          {
            title: 'Start with Base (142 MB)',
            text: 'A good balance for everyday dictation and the recommended starting point on most computers.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Step up to Large v3 Turbo (1.5 GB)',
            text: 'Close to large-model accuracy at roughly half the size of Large v1, v2 and v3 (2.9 GB each). The best choice when your machine can keep up.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Tiny, Small or Medium in between',
            text: 'Tiny (75 MB) is the fastest and least accurate, Small (466 MB) is noticeably better than Base, and Medium (1.5 GB) is highly accurate but slower.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'English-only variants',
            text: 'Tiny, Base, Small and Medium also come in English-only versions, which are more accurate than the multilingual model of the same size if you only dictate in English.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'A different model per hotkey',
            text: 'Profiles let you keep a fast model on one shortcut and an accurate one on another, each with its own language setting.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
      {
        title: 'What to know first',
        intro:
          'An honest look at what local Whisper in OiPer does and does not do.',
        items: [
          {
            title: 'Live dictation, not file transcription',
            text: 'OiPer transcribes what you say while you hold the hotkey. It does not import audio or video files.',
          },
          {
            title: 'The dictionary does not apply to local Whisper',
            text: 'Custom words are used in cloud and hosted modes only. For a name that local Whisper keeps getting wrong, add a snippet that rewrites the misspelling, or use a larger model.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Speed depends on your hardware',
            text: 'If dictation feels slow, try a smaller model or set Whisper Hardware to GPU when your machine has a usable one.',
            docs: '/docs/desktop/troubleshooting',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Is there a Whisper desktop app for Windows?',
        answer:
          'Yes. OiPer runs Whisper locally on Windows, as well as on macOS and Linux, and types the transcript into any app. There is no Python or command line involved.',
      },
      {
        question: 'Can I run Whisper locally without Python?',
        answer:
          'Yes. OiPer installs like a normal desktop app and downloads Whisper models from inside the app, so you never set up Python, pip or a terminal.',
      },
      {
        question: 'Which Whisper model is best for dictation?',
        answer:
          'Start with Base, which balances speed and accuracy. If your computer can keep up, Large v3 Turbo gives close to large-model accuracy at 1.5 GB, about half the size of Large v3.',
      },
      {
        question: 'Does Whisper use my GPU in OiPer?',
        answer:
          'Yes, by default. The Whisper Hardware setting is Auto, which uses the GPU when one is usable and falls back to the CPU. You can also force CPU or GPU.',
      },
      {
        question: 'Should I use an English-only Whisper model?',
        answer:
          'If you only ever dictate in English, yes. The English-only versions of Tiny, Base, Small and Medium are more accurate than the multilingual model of the same size.',
      },
      {
        question: 'Does local Whisper work offline?',
        answer:
          'Yes. After a model is downloaded, transcription runs entirely on your computer and keeps working without an internet connection.',
      },
      {
        question: 'Can OiPer transcribe audio files?',
        answer:
          'No. OiPer is built for live dictation: you hold a hotkey, speak, and the text is typed into the app you are using.',
      },
      {
        question: 'Is the OiPer Whisper app free?',
        answer:
          'Local Whisper transcription is free and unlimited, and no account is required. Paid plans add hosted transcription and formatting models.',
      },
    ],
  },
  '/offline-speech-to-text': {
    label: 'Offline',
    updated: '2026-10-12',
    destination: 'offline_speech_to_text',
    title: 'Offline Speech to Text for Windows, Mac and Linux | OiPer',
    description:
      'Private, offline speech to text for your desktop. OiPer transcribes on your own computer with local Whisper models and keeps working without internet.',
    heading: 'Offline speech to text on your desktop',
    intro:
      'In local mode OiPer does everything on your computer: it records your voice, transcribes it with a Whisper model you downloaded, and types the text into the app you are using. Nothing is sent anywhere, so it works on a plane, behind a firewall or with Wi-Fi switched off. Here is exactly what works offline, what does not, and how to check.',
    sections: [
      {
        title: 'What works without internet',
        intro:
          'Everything you need for everyday dictation runs on your machine.',
        items: [
          {
            title: 'Transcription',
            text: 'A local Whisper model runs on your CPU or GPU. Once it is downloaded, no connection is needed and no audio leaves the device.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Typing into any app',
            text: 'Hotkeys, profiles, auto submit and inserting text at your cursor all happen locally.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Snippets and history',
            text: 'Snippets expand on your machine, and every dictation is saved to a local history with audio you can play back.',
            docs: '/docs/desktop/history',
          },
          {
            title: 'Formatting, with a model on your machine',
            text: 'Formatting in local mode runs through a language model you register. Point it at an OpenAI-compatible server on your own computer and the transcript stays local too.',
            docs: '/docs/desktop/formatting',
          },
        ],
      },
      {
        title: 'What needs a connection',
        intro:
          'These are optional, and each one only connects when you use it.',
        items: [
          {
            title: 'Downloading a model',
            text: 'Each Whisper model is downloaded once from Hugging Face. Download it before you go offline.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Your own cloud provider',
            text: 'In cloud mode the recording, and the transcript when formatting is on, go to the provider you configured with your API key. A cloud formatting model in local mode receives the transcript.',
            docs: '/resources/security',
          },
          {
            title: 'OiPer hosted models',
            text: 'On paid plans, oiper mode sends the recording to OiPer’s service along with the focused app’s name, window title and text read from that window.',
            docs: '/resources/security',
          },
          {
            title: 'Updates',
            text: 'The app contacts GitHub when you check for or download an update from Settings.',
            docs: '/docs/desktop/settings',
          },
        ],
      },
      {
        title: 'Check it yourself',
        intro: 'You do not have to take privacy on trust.',
        items: [
          {
            title: 'Turn off Wi-Fi and dictate',
            text: 'Set a profile to local mode, disconnect from the internet and dictate. If text appears, nothing needed a server.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'One folder per computer',
            text: 'Settings, history, audio, models and logs live in %APPDATA%\\com.oiper.desktop on Windows, ~/Library/Application Support/com.oiper.desktop on macOS and ~/.config/com.oiper.desktop on Linux.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Nothing in the background',
            text: 'A transcription request only happens in response to a dictation you started with your hotkey.',
            docs: '/resources/security',
          },
          {
            title: 'Delete it whenever you like',
            text: 'Clear history from the History page, remove models from the Models page, or delete the data folder to reset the app completely.',
            docs: '/resources/security',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Is there speech to text that works without internet?',
        answer:
          'Yes. OiPer transcribes speech on your own computer with local Whisper models, on Windows, macOS and Linux. After a model is downloaded, dictation keeps working with no internet connection.',
      },
      {
        question: 'Does OiPer send my audio anywhere?',
        answer:
          'Not in local mode. Audio is only sent if you choose a cloud provider with your own API key or OiPer’s hosted models for a profile.',
      },
      {
        question: 'Do I need an account for offline dictation?',
        answer:
          'No. Local transcription is free, unlimited and needs no account. An account is only needed for OiPer’s paid hosted models.',
      },
      {
        question: 'Can I clean up the text offline?',
        answer:
          'Yes, if the formatting model runs on your own machine. Formatting in local mode uses a language model you register, and any OpenAI-compatible endpoint works. A cloud model would receive the transcript.',
      },
      {
        question: 'Where are my recordings stored?',
        answer:
          'Recordings are kept in the audio folder of OiPer’s data directory on your computer, and transcripts in a local database. Neither is uploaded.',
      },
      {
        question: 'Is Windows voice typing offline?',
        answer:
          'No. Microsoft describes Windows voice typing (Win + H) as online speech recognition that needs an internet connection. OiPer’s local mode transcribes on your PC instead.',
      },
      {
        question: 'Does offline dictation need a powerful computer?',
        answer:
          'No. Smaller Whisper models like Base run well on everyday hardware, and OiPer uses your GPU automatically when one is available. Larger models trade speed for accuracy.',
      },
    ],
  },
  '/free-dictation-software': {
    label: 'Free Dictation',
    updated: '2026-10-12',
    destination: 'free_dictation_software',
    title: 'Free Dictation Software for Windows, Mac and Linux | OiPer',
    description:
      'Free dictation software with no word limit and no account. OiPer types what you say into any app on Windows, macOS and Linux using local Whisper.',
    heading: 'Free dictation software for Windows, Mac and Linux',
    intro:
      'OiPer is free for unlimited local dictation. Hold a hotkey, speak, and your words are typed into any app on Windows, macOS or Linux. There is no word cap, no trial and no account. Here is what is free, what costs money, and when the dictation already built into your computer is enough.',
    sections: [
      {
        title: 'What is free',
        intro: 'The full desktop app, with transcription on your own computer.',
        items: [
          {
            title: 'Unlimited local transcription',
            text: 'Whisper models from Tiny to Large v3 Turbo run on your CPU or GPU. Dictate as much as you want, offline.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'No account',
            text: 'Local features do not need an account. Install the app, pick a model and start talking.',
            docs: '/docs/desktop/quickstart',
          },
          {
            title: 'Profiles, snippets and history',
            text: 'Give each task its own hotkey and language, expand short phrases into longer text, and replay past dictations.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Your own API key',
            text: 'Prefer a cloud model? Add a key for OpenAI, Groq or any OpenAI-compatible provider. The provider bills you directly, OiPer charges nothing.',
            docs: '/docs/desktop/models',
          },
        ],
      },
      {
        title: 'What costs money',
        intro: 'Only hosted services, and only if you want them.',
        items: [
          {
            title: 'OiPer hosted models',
            text: 'Paid plans add OiPer’s hosted speech and formatting models, with nothing to configure and no API key to manage.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Your cloud provider’s usage',
            text: 'If you use your own API key, you pay that provider at its own rates.',
            docs: '/resources/security',
          },
        ],
      },
      {
        title: 'When built-in dictation is enough',
        intro:
          'Windows and macOS already include free dictation. For occasional use it may be all you need.',
        items: [
          {
            title: 'Windows voice typing',
            text: 'Press Win + H in a text box to start. Microsoft describes it as online speech recognition that needs an internet connection, and lists around fifty languages on Windows 11.',
          },
          {
            title: 'macOS Dictation',
            text: 'Built into every Mac and works anywhere you can type, with no time limit on long dictation. It stops after 30 seconds of silence, and some languages are processed on the device.',
          },
          {
            title: 'When OiPer is the better fit',
            text: 'You want dictation on Linux, offline dictation on Windows, a choice of speech model, formatting that turns speech into an email or prompt, or a separate hotkey for each kind of task.',
            docs: '/docs/desktop/formatting',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'What is the best free dictation software for Windows 11?',
        answer:
          'Windows voice typing (Win + H) is built in and fine for occasional use, but it needs an internet connection. OiPer is free for unlimited local dictation on Windows 10 and 11, works offline and uses your GPU when available.',
      },
      {
        question: 'Is there a free dictation app for Mac?',
        answer:
          'Yes. macOS Dictation is built in, and OiPer is free for unlimited local dictation on Apple Silicon and Intel Macs running macOS 10.15 or later.',
      },
      {
        question: 'Is there free dictation software for Linux?',
        answer:
          'Yes. OiPer runs on Linux with AppImage, .deb and .rpm builds, supports X11 and Wayland, and local dictation is free and unlimited.',
      },
      {
        question: 'Is OiPer really free?',
        answer:
          'Yes. Local transcription is free and unlimited, with no word limit and no account. You only pay if you choose OiPer’s hosted models, or your own cloud provider for its usage.',
      },
      {
        question: 'Do I need to create an account?',
        answer:
          'No. Local features work without an account. An account is only needed for OiPer’s paid hosted models.',
      },
      {
        question: 'Can I use free dictation offline?',
        answer:
          'Yes. OiPer’s local mode transcribes on your computer, so it keeps working without internet once a Whisper model is downloaded.',
      },
      {
        question: 'Is OiPer open source?',
        answer:
          'No. OiPer Desktop is not open source. Local transcription is free and unlimited, runs entirely on your device and needs no account.',
      },
    ],
  },
  '/bring-your-own-api-key': {
    label: 'Your Own API Key',
    updated: '2026-10-12',
    destination: 'bring_your_own_api_key',
    title: 'Dictation With Your Own API Key: OpenAI, Groq and More | OiPer',
    description:
      'Bring your own OpenAI, Groq, OpenRouter or OpenAI-compatible API key to OiPer for dictation and formatting. Keys stay on your machine, never sent to OiPer.',
    heading: 'Dictation with your own API key',
    intro:
      'Already pay for OpenAI, Groq or another AI provider? Add your API key to OiPer and use their models for transcription, for formatting, or both. Your audio goes straight to the provider you chose, they bill you directly, and the key never reaches OiPer.',
    sections: [
      {
        title: 'Use the providers you already have',
        intro: 'Register a speech model, a language model, or one of each.',
        items: [
          {
            title: 'Pre-filled providers',
            text: 'OpenAI, Anthropic, OpenRouter, Hugging Face, Groq, Cerebras, Fireworks, Kilo and OpenCode come with their base URL and usual environment variable filled in.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Any OpenAI-compatible endpoint',
            text: 'Enter the base URL yourself to use any other OpenAI-compatible service, including a server running on your own machine.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Transcription and formatting',
            text: 'Speech models (ASR) transcribe your voice. Language models (LLM) clean up, rewrite or translate the transcript before it is typed.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Your dictionary applies',
            text: 'Custom words are passed to the speech model in cloud mode, so names and jargon are more likely to come out right.',
            docs: '/docs/desktop/dictionary',
          },
        ],
      },
      {
        title: 'Mix local and cloud',
        intro: 'Each profile has its own hotkey and its own mode.',
        items: [
          {
            title: 'Local speech, cloud formatting',
            text: 'Transcribe on your computer with local Whisper and send only the transcript to your language model for formatting.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'A cloud hotkey next to a local one',
            text: 'Keep an offline local profile on one shortcut and a cloud profile with your key on another, and pick per dictation.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Fully local formatting',
            text: 'Point the formatting model at an OpenAI-compatible server on your own machine so neither audio nor text leaves it.',
            docs: '/docs/desktop/formatting',
          },
        ],
      },
      {
        title: 'How your keys are stored',
        intro:
          'Kept apart from your settings, and sent only where they belong.',
        items: [
          {
            title: 'Separate from your config',
            text: 'Keys are stripped from config.json and written to auth.json in the same folder, so you can share or sync your settings without leaking them.',
            docs: '/resources/security',
          },
          {
            title: 'Or use an environment variable',
            text: 'auth.json is protected by your user account’s file permissions, not the system keychain. Point an entry at an environment variable and OiPer never stores the key at all.',
            docs: '/resources/security',
          },
          {
            title: 'Sent only to your provider',
            text: 'A key is sent to the provider it belongs to, as part of a request you triggered. It is never transmitted to OiPer.',
            docs: '/resources/security',
          },
        ],
      },
      {
        title: 'Set it up',
        intro: 'Three steps on the Models and Profiles pages.',
        items: [
          {
            title: '1. Add a model',
            text: 'On the Models page, add a speech or language model with its provider, base URL, model name and API key. For Groq, for example, the base URL is https://api.groq.com/openai/v1 and a model is whisper-large-v3-turbo.',
            docs: '/docs/desktop/models',
          },
          {
            title: '2. Switch a profile to cloud',
            text: 'Set the profile’s mode to cloud and choose your speech model, or keep it local and pick your language model for formatting.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: '3. Dictate',
            text: 'Hold the profile’s hotkey and speak. If a request fails, check that the base URL and model name match what your provider expects.',
            docs: '/docs/desktop/troubleshooting',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Can I use my own OpenAI API key for dictation?',
        answer:
          'Yes. Add an OpenAI speech model with your key on the Models page and set a profile to cloud mode. OpenAI bills you directly for the usage.',
      },
      {
        question: 'Can I use Groq Whisper for dictation?',
        answer:
          'Yes. Groq is a pre-filled provider in OiPer. Add your Groq key and a Whisper model such as whisper-large-v3-turbo, and dictation runs on Groq.',
      },
      {
        question: 'Do I need a paid OiPer plan to use my own key?',
        answer:
          'No. Paid plans are for OiPer’s hosted models. With your own key you pay only your provider.',
      },
      {
        question: 'Does OiPer see my API key?',
        answer:
          'No. Keys are stored on your computer in auth.json, or read from an environment variable, and are sent only to the provider they belong to.',
      },
      {
        question: 'Can I use a local LLM for formatting?',
        answer:
          'Yes, if it exposes an OpenAI-compatible endpoint. Enter its base URL and model name on the Models page and choose it for formatting.',
      },
      {
        question: 'What is sent to my provider?',
        answer:
          'In cloud mode, the recording goes to your speech provider, and the transcript goes to your language model when formatting is on. Nothing is sent in the background.',
      },
      {
        question: 'Can I use OpenRouter or Anthropic?',
        answer:
          'Yes, for formatting. Both are pre-filled providers you can register as the language model that cleans up, rewrites or translates your transcript.',
      },
    ],
  },
  '/alternatives/macwhisper': {
    label: 'vs MacWhisper',
    updated: '2026-10-12',
    destination: 'macwhisper_alternative',
    title: 'MacWhisper Alternative for Windows and Linux (2026) | OiPer',
    description:
      'Looking for MacWhisper on Windows or Linux? OiPer brings local, on-device Whisper dictation to Windows, macOS and Linux. Free, offline, no account.',
    heading: 'A MacWhisper alternative for Windows, Linux and Mac',
    intro:
      'MacWhisper is a Mac app best known for transcribing audio and video files with Whisper. There is no MacWhisper for Windows or Linux. OiPer is a dictation app for all three: hold a hotkey, speak, and your words are typed into the app you are using, transcribed locally on your own computer.',
    sections: [
      {
        title: 'MacWhisper for Windows and Linux',
        intro: 'Local Whisper on every desktop, not just the Mac.',
        items: [
          {
            title: 'Windows',
            text: 'OiPer runs Whisper locally on your PC and uses your graphics card automatically when one is available, falling back to the CPU when it is not.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Linux',
            text: 'AppImage, .deb and .rpm builds, with X11 and Wayland support through wtype, kwtype, dotool, ydotool or xdotool.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Mac too',
            text: 'Native builds for Apple Silicon and Intel Macs from macOS 10.15 Catalina onwards, with local models on both.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'One setup on every computer',
            text: 'Hotkeys and auto submit can be set per operating system, so the same configuration works on a Windows PC, a Mac and a Linux laptop.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
      {
        title: 'Built for live dictation',
        intro: 'Speak into any app instead of transcribing a file afterwards.',
        items: [
          {
            title: 'Types where your cursor is',
            text: 'Hold your hotkey, speak and release. The transcript is inserted into email, chat, documents, the terminal or your editor.',
            docs: '/docs/desktop/quickstart',
          },
          {
            title: 'Choose your Whisper model',
            text: 'Download any model from the 75 MB Tiny to Large v3 Turbo, plus English-only variants, and run it offline on your own hardware.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'AI formatting',
            text: 'Normal, Prompt, Email, Formal and Casual presets clean up or rewrite what you said, or write your own instructions. Formatting can also translate into just under a hundred languages.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Profiles',
            text: 'Give each kind of dictation its own hotkey, language, model, formatting and auto submit.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'History with audio',
            text: 'Every dictation is saved on your device with its transcript, timings and the original recording, which you can play back.',
            docs: '/docs/desktop/history',
          },
        ],
      },
      {
        title: 'When MacWhisper is the better fit',
        intro: 'An honest look at what OiPer does not do.',
        items: [
          {
            title: 'Transcribing files',
            text: 'MacWhisper transcribes audio and video files by drag and drop, in batches and from watched folders, and exports to formats like .docx, .pdf, .srt and .vtt. OiPer only transcribes live dictation.',
          },
          {
            title: 'Meetings and speakers',
            text: 'MacWhisper records Zoom, Teams and other calls without a bot and recognises speakers. OiPer does not record meetings.',
          },
          {
            title: 'A one-time license',
            text: 'MacWhisper has a free version and a Pro license you pay for once. If you only use a Mac and mainly work with recordings, it is a strong choice.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs MacWhisper',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'MacWhisper',
      rows: [
        {
          label: 'macOS',
          oiper: 'Yes, Apple Silicon and Intel',
          competitor: 'Yes',
        },
        {
          label: 'Windows',
          oiper: 'Yes',
          competitor: 'No',
        },
        {
          label: 'Linux',
          oiper: 'Yes (AppImage, .deb, .rpm)',
          competitor: 'No',
        },
        {
          label: 'Main focus',
          oiper: 'Live dictation into any app',
          competitor: 'Transcribing files and meetings',
        },
        {
          label: 'System-wide dictation',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Local transcription',
          oiper: 'Yes, Whisper models',
          competitor: 'Yes, Whisper and Parakeet models',
        },
        {
          label: 'Your own API keys',
          oiper: 'Yes, any OpenAI-compatible provider',
          competitor: 'Yes, many providers',
        },
        {
          label: 'Different setups per task',
          oiper: 'Profiles, each on its own hotkey',
          competitor: 'Per-app prompts',
        },
        {
          label: 'Audio and video files',
          oiper: 'No',
          competitor: 'Yes, including batch',
        },
        {
          label: 'Subtitles (.srt, .vtt)',
          oiper: 'No',
          competitor: 'Yes',
        },
        {
          label: 'Meeting recording',
          oiper: 'No',
          competitor: 'Yes',
        },
        {
          label: 'Price',
          oiper: 'Local transcription free and unlimited',
          competitor: 'Free version, Pro is a one-time license',
        },
      ],
    },
    faq: [
      {
        question: 'Is there a MacWhisper for Windows?',
        answer:
          'No. MacWhisper is a Mac-only app. OiPer runs on Windows with local Whisper models on your CPU or GPU, and types what you say into any app.',
      },
      {
        question: 'Is there a MacWhisper for Linux?',
        answer:
          'No. OiPer runs on Linux, including Ubuntu, Debian and Fedora, with AppImage, .deb and .rpm builds and support for both X11 and Wayland.',
      },
      {
        question: 'What is the best MacWhisper alternative for Windows?',
        answer:
          'For live dictation, OiPer is a free option that runs Whisper locally on Windows and works offline. If you need to transcribe recorded files, choose a file transcription tool instead, since OiPer does not do that.',
      },
      {
        question: 'Can OiPer transcribe audio files like MacWhisper?',
        answer:
          'No. OiPer transcribes live dictation from your microphone and types it into the app you are using. It does not import audio or video files.',
      },
      {
        question: 'Does OiPer use Whisper like MacWhisper?',
        answer:
          'Yes. Local transcription uses Whisper models from Tiny to Large v3 Turbo, downloaded once and run on your device without an internet connection.',
      },
      {
        question: 'Is OiPer free?',
        answer:
          'Local, on-device transcription is free and unlimited on Windows, macOS and Linux, and no account is required. Paid plans add hosted transcription and formatting models.',
      },
      {
        question: 'Is OiPer open source?',
        answer:
          'No. OiPer Desktop is not open source. Local transcription is free and unlimited, runs entirely on your device and needs no account.',
      },
    ],
  },
  '/alternatives/voiceink': {
    label: 'vs VoiceInk',
    updated: '2026-10-12',
    destination: 'voiceink_alternative',
    title: 'VoiceInk Alternative for Windows and Linux (2026) | OiPer',
    description:
      'Want VoiceInk on Windows or Linux? OiPer brings the same local, on-device dictation to Windows, macOS and Linux, including Intel Macs. Free to use.',
    heading: 'A VoiceInk alternative for Windows and Linux',
    intro:
      'VoiceInk is an open source dictation app for the Mac that transcribes locally. There is no VoiceInk for Windows or Linux. OiPer keeps the same workflow (hold a hotkey, speak, release) with on-device Whisper models, and runs on Windows, macOS and Linux.',
    sections: [
      {
        title: 'Why people choose OiPer',
        intro: 'Local, on-device dictation on whatever computer you use.',
        items: [
          {
            title: 'Runs on Windows',
            text: 'VoiceInk is Mac only. OiPer runs Whisper locally on your PC and uses your graphics card automatically when one is available.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Runs on Linux',
            text: 'OiPer ships AppImage, .deb and .rpm builds and types on X11 and Wayland through wtype, kwtype, dotool, ydotool or xdotool.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Local models on Intel Macs and older macOS',
            text: 'VoiceInk recommends cloud transcription on Intel Macs and needs a recent macOS. OiPer runs local models on Apple Silicon and Intel Macs from macOS 10.15 Catalina onwards.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Free without a license',
            text: 'The ready-made VoiceInk app is sold as a one-time license with a 7-day trial, or you build it yourself. Local transcription in OiPer is free and unlimited, with no account and no trial.',
          },
          {
            title: 'Your own cloud, if any',
            text: 'Add an API key for OpenAI, Groq, Anthropic, OpenRouter or any OpenAI-compatible endpoint, including a local LLM server, for transcription or formatting.',
            docs: '/docs/desktop/models',
          },
        ],
      },
      {
        title: 'What carries over from VoiceInk',
        intro: 'The features you rely on have a direct equivalent.',
        items: [
          {
            title: 'Modes become profiles',
            text: 'VoiceInk switches settings by app. In OiPer each profile has its own hotkey, language, model, formatting and auto submit, and you pick one by the shortcut you press.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'AI enhancement becomes formatting',
            text: 'Normal, Prompt, Email, Formal and Casual presets clean up or rewrite your words, or write your own instructions. Formatting can also translate into just under a hundred languages.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Dictionary and word replacements',
            text: 'Add names and jargon to the dictionary for cloud and hosted transcription, and use snippets to expand shortcuts or fix a word local models keep getting wrong.',
            docs: '/docs/desktop/snippets',
          },
          {
            title: 'History',
            text: 'Every dictation is kept on your device with the transcript, the formatted text, timings and the original audio to play back.',
            docs: '/docs/desktop/history',
          },
        ],
      },
      {
        title: 'When VoiceInk is the better fit',
        intro: 'An honest look at what OiPer does not do.',
        items: [
          {
            title: 'Open source',
            text: 'VoiceInk is open source under the GPL v3 license. OiPer is not open source.',
          },
          {
            title: 'Deep Mac integration',
            text: 'VoiceInk switches modes automatically by app or website, reads context from your screen and stores API keys in the macOS Keychain. It also has an iPhone app.',
          },
          {
            title: 'Audio files',
            text: 'VoiceInk can transcribe audio files. OiPer only transcribes live dictation.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs VoiceInk',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'VoiceInk',
      rows: [
        {
          label: 'macOS',
          oiper: 'macOS 10.15 or later',
          competitor: 'Recent macOS only',
        },
        {
          label: 'Local models on Intel Macs',
          oiper: 'Yes',
          competitor: 'Not reliable, cloud recommended',
        },
        {
          label: 'Windows',
          oiper: 'Yes',
          competitor: 'No',
        },
        {
          label: 'Linux',
          oiper: 'Yes (AppImage, .deb, .rpm)',
          competitor: 'No',
        },
        {
          label: 'iPhone',
          oiper: 'No',
          competitor: 'Yes',
        },
        {
          label: 'Open source',
          oiper: 'No',
          competitor: 'Yes, GPL v3',
        },
        {
          label: 'Price',
          oiper: 'Local transcription free and unlimited',
          competitor: 'One-time license, 7-day trial',
        },
        {
          label: 'Your own API keys',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'AI formatting',
          oiper: 'Presets and custom instructions',
          competitor: 'Yes, with custom prompts',
        },
        {
          label: 'Different setups per task',
          oiper: 'Profiles, each on its own hotkey',
          competitor: 'Modes that switch by app or website',
        },
        {
          label: 'Custom dictionary',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'History',
          oiper: 'Yes, with audio playback',
          competitor: 'Yes',
        },
        {
          label: 'Audio files',
          oiper: 'No',
          competitor: 'Yes',
        },
      ],
    },
    faq: [
      {
        question: 'Is there a VoiceInk for Windows?',
        answer:
          'No. VoiceInk is a Mac app with an iPhone companion. OiPer offers local, on-device dictation on Windows and types what you say into any app.',
      },
      {
        question: 'Is there a VoiceInk for Linux?',
        answer:
          'No. OiPer runs on Linux, including Ubuntu, Debian and Fedora, with AppImage, .deb and .rpm builds and support for both X11 and Wayland.',
      },
      {
        question: 'What is the best VoiceInk alternative?',
        answer:
          'If you need Windows, Linux or an Intel Mac, OiPer gives you the same local hotkey dictation for free. If you want an open source Mac app, VoiceInk itself is a good choice.',
      },
      {
        question: 'Is VoiceInk free?',
        answer:
          'VoiceInk is open source, so you can build it yourself. The ready-made app is sold as a one-time license and starts with a 7-day trial. OiPer is free for unlimited local transcription.',
      },
      {
        question: 'Does OiPer work offline like VoiceInk?',
        answer:
          'Yes. In local mode OiPer transcribes on-device with a Whisper model stored on your computer, so dictation keeps working without an internet connection.',
      },
      {
        question: 'Is OiPer open source?',
        answer:
          'No. OiPer Desktop is not open source. Local transcription is free and unlimited, runs entirely on your device and needs no account.',
      },
    ],
  },
  '/alternatives/aqua-voice': {
    label: 'vs Aqua Voice',
    updated: '2026-10-12',
    destination: 'aqua_voice_alternative',
    title: 'Aqua Voice Alternative: Local and Offline (2026) | OiPer',
    description:
      'A local Aqua Voice alternative. OiPer transcribes on-device, works offline and runs on Windows, macOS and Linux, with no word limit on the free plan.',
    heading: 'A local, offline Aqua Voice alternative',
    intro:
      'Aqua Voice is a fast dictation app that transcribes in the cloud with its own Avalon model, so it needs an internet connection. OiPer keeps the hotkey workflow but transcribes locally with on-device Whisper models, works offline and also runs on Linux.',
    sections: [
      {
        title: 'Why people switch to OiPer',
        intro: 'Dictation that does not depend on someone else’s server.',
        items: [
          {
            title: 'Local, on-device transcription',
            text: 'Aqua Voice processes audio in its cloud. OiPer runs Whisper on your own CPU or GPU, so in local mode your audio is never uploaded.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Works offline',
            text: 'Aqua Voice needs an internet connection. OiPer keeps working on a plane, on a train or behind a strict company firewall.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'No word limit',
            text: 'Aqua Voice’s free plan includes 1,000 words. Local transcription in OiPer is free and unlimited, with no account required.',
          },
          {
            title: 'Runs on Linux',
            text: 'Aqua Voice has no Linux app. OiPer ships AppImage, .deb and .rpm builds with X11 and Wayland support.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Nothing stored on a server',
            text: 'Aqua Voice may keep transcripts on its servers unless you turn on Privacy Mode. In OiPer’s local mode, transcripts, audio and history stay in one folder on your computer.',
            docs: '/resources/security',
          },
        ],
      },
      {
        title: 'What carries over from Aqua Voice',
        intro: 'The features you rely on have a direct equivalent.',
        items: [
          {
            title: 'Custom instructions become formatting',
            text: 'Normal, Prompt, Email, Formal and Casual presets rewrite what you said, or write your own instructions. Formatting can also translate into just under a hundred languages.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Custom dictionary',
            text: 'Add names, products and jargon so cloud and hosted transcription spell them your way. For local models, a snippet can fix a word that keeps coming out wrong.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Send it, hands-free',
            text: 'Auto submit presses Enter, Ctrl + Enter or another combination after the text is inserted, set per profile.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Cloud accuracy when you want it',
            text: 'Bring your own API key for OpenAI, Groq or any OpenAI-compatible provider, or use OiPer’s hosted models on a paid plan, for one profile or all of them.',
            docs: '/docs/desktop/models',
          },
        ],
      },
      {
        title: 'When Aqua Voice is the better fit',
        intro: 'An honest look at what OiPer does not do.',
        items: [
          {
            title: 'Phones too',
            text: 'Aqua Voice has iPhone and Android apps. OiPer is a desktop app for Windows, macOS and Linux.',
          },
          {
            title: 'Screen-aware formatting and live text',
            text: 'Aqua Voice reads what is on your screen to format for the app you are in, and its Max plan shows words as you speak. OiPer inserts the text after you release the hotkey.',
          },
          {
            title: 'Team rollouts',
            text: 'Aqua Voice’s Business plan adds SSO, SCIM, team dictionaries and zero data retention. OiPer is built for individuals today.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs Aqua Voice',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'Aqua Voice',
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
          competitor: 'No',
        },
        {
          label: 'iPhone and Android',
          oiper: 'No',
          competitor: 'Yes',
        },
        {
          label: 'Where speech is transcribed',
          oiper: 'Locally, on your device',
          competitor: 'In Aqua Voice’s cloud',
        },
        {
          label: 'Works offline',
          oiper: 'Yes',
          competitor: 'No, needs internet',
        },
        {
          label: 'Free plan',
          oiper: 'Unlimited local transcription',
          competitor: '1,000 words',
        },
        {
          label: 'Transcripts kept on a server',
          oiper: 'Never in local mode',
          competitor: 'Possible unless Privacy Mode is on',
        },
        {
          label: 'Choose your speech model',
          oiper: 'Tiny to Large v3 Turbo, your own provider or OiPer’s',
          competitor: 'Avalon',
        },
        {
          label: 'Custom dictionary',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Custom formatting instructions',
          oiper: 'Yes',
          competitor: 'Pro plan',
        },
        {
          label: 'Words appear as you speak',
          oiper: 'No',
          competitor: 'Max plan',
        },
        {
          label: 'Team admin and SSO',
          oiper: 'No',
          competitor: 'Business plan',
        },
      ],
    },
    faq: [
      {
        question: 'Is OiPer a good Aqua Voice alternative?',
        answer:
          'If you want local, on-device transcription, offline dictation or Linux support, yes. If you need phone apps, live text as you speak or team admin controls, Aqua Voice covers those and OiPer does not.',
      },
      {
        question: 'Does Aqua Voice work offline?',
        answer:
          'No. Aqua Voice processes audio in the cloud to run its Avalon model, so it needs an internet connection. OiPer transcribes locally on your device and keeps working offline.',
      },
      {
        question: 'Is Aqua Voice free?',
        answer:
          'Aqua Voice has a free plan with 1,000 words, and paid plans for unlimited words. OiPer is free for unlimited local transcription with no account.',
      },
      {
        question: 'Is there an Aqua Voice alternative for Linux?',
        answer:
          'Yes. OiPer runs on Linux, including Ubuntu, Debian and Fedora, with AppImage, .deb and .rpm builds and support for both X11 and Wayland.',
      },
      {
        question: 'Is there a private Aqua Voice alternative?',
        answer:
          'Yes. In local mode OiPer transcribes with a Whisper model on your own computer, so your audio never leaves your device, and history stays on your computer.',
      },
      {
        question: 'Is OiPer open source?',
        answer:
          'No. OiPer Desktop is not open source. Local transcription is free and unlimited, runs entirely on your device and needs no account.',
      },
    ],
  },
  '/alternatives/handy': {
    label: 'vs Handy',
    updated: '2026-10-12',
    destination: 'handy_alternative',
    title: 'Handy Dictation Alternative With AI Formatting (2026) | OiPer',
    description:
      'Handy is a free, open source dictation app. OiPer adds profiles, built-in AI formatting and cloud models with your own key on Windows, macOS and Linux.',
    heading: 'A Handy alternative with profiles and AI formatting',
    intro:
      'Handy is a free, open source dictation app that transcribes entirely on your device, on Windows, macOS and Linux. If plain local speech to text is all you need, it is an excellent choice. OiPer offers the same free, local dictation and adds profiles, built-in formatting and optional cloud transcription.',
    sections: [
      {
        title: 'What OiPer adds',
        intro:
          'The same hold, speak and release workflow, with more control over the result.',
        items: [
          {
            title: 'Profiles for every task',
            text: 'Handy has one transcription shortcut and one for post-processing. In OiPer each profile has its own hotkeys, language, model, formatting and auto submit, so a fast local profile and an email profile can sit side by side.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Built-in formatting presets',
            text: 'Handy’s post-processing is an experimental feature where you write the prompt. OiPer ships Normal, Prompt, Email, Formal and Casual presets, and custom instructions when you want them.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Translate into any language',
            text: 'Speak in one language and have the text arrive in another. Formatting can translate into just under a hundred languages.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Cloud transcription when you want it',
            text: 'Handy transcribes locally only. OiPer can also send a profile to OpenAI, Groq, Fireworks or any OpenAI-compatible provider with your own key, or to OiPer’s hosted models on a paid plan.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Snippets',
            text: 'Say a short shortcut and OiPer expands it into an address, a link or a full reply.',
            docs: '/docs/desktop/snippets',
          },
          {
            title: 'History you can debug',
            text: 'Each dictation shows the raw and formatted text, a timeline of every stage, the app you dictated into and the original audio, so a slow or wrong result is easy to trace.',
            docs: '/docs/desktop/history',
          },
        ],
      },
      {
        title: 'What stays the same',
        intro: 'The parts of Handy people like are in OiPer too.',
        items: [
          {
            title: 'Free, local and offline',
            text: 'Local transcription is free and unlimited, needs no account and works without an internet connection.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Windows, macOS and Linux',
            text: 'OiPer ships AppImage, .deb and .rpm builds and types on X11 and Wayland through wtype, kwtype, dotool, ydotool or xdotool.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Push to talk or toggle',
            text: 'Hold the hotkey while you speak, or press once to start and again to stop for long dictation.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Auto submit',
            text: 'Press Enter or another combination automatically after the text is inserted, so a dictated message sends itself.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
      {
        title: 'When Handy is the better fit',
        intro: 'An honest look at where Handy is ahead.',
        items: [
          {
            title: 'Open source',
            text: 'Handy is open source under the MIT license, so you can read, change and build it yourself. OiPer is not open source.',
          },
          {
            title: 'More local model families',
            text: 'Handy offers Parakeet, Moonshine, Canary, Cohere Transcribe and others alongside Whisper. OiPer’s local models are Whisper only.',
          },
          {
            title: 'Custom words in local mode',
            text: 'Handy’s custom words work with its local models. OiPer’s dictionary applies to cloud and hosted transcription, and local mode relies on snippets to fix a misheard word.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs Handy',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'Handy',
      rows: [
        {
          label: 'Windows, macOS and Linux',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Price',
          oiper: 'Local transcription free and unlimited',
          competitor: 'Free',
        },
        {
          label: 'Open source',
          oiper: 'No',
          competitor: 'Yes, MIT',
        },
        {
          label: 'Works offline',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Local models',
          oiper: 'Whisper, Tiny to Large v3 Turbo',
          competitor: 'Whisper, Parakeet, Moonshine, Canary and more',
        },
        {
          label: 'Cloud transcription',
          oiper: 'Your own key or OiPer’s hosted models',
          competitor: 'No, local only',
        },
        {
          label: 'AI formatting',
          oiper: 'Built in, with presets',
          competitor: 'Experimental, custom prompts',
        },
        {
          label: 'Translation',
          oiper: 'Into just under a hundred languages',
          competitor: 'Some models translate',
        },
        {
          label: 'Multiple setups',
          oiper: 'Profiles, each with its own hotkeys',
          competitor: 'One transcription shortcut',
        },
        {
          label: 'Custom words',
          oiper: 'Cloud and hosted modes',
          competitor: 'Yes, local',
        },
        {
          label: 'Snippets',
          oiper: 'Yes',
          competitor: 'Not documented',
        },
        {
          label: 'History with audio playback',
          oiper: 'Yes',
          competitor: 'Yes',
        },
        {
          label: 'Wayland',
          oiper: 'wtype, kwtype, dotool or ydotool',
          competitor: 'Limited support',
        },
      ],
    },
    faq: [
      {
        question: 'Is Handy free?',
        answer:
          'Yes. Handy is free and open source under the MIT license. OiPer is also free for unlimited local transcription, but it is not open source.',
      },
      {
        question: 'What is the difference between OiPer and Handy?',
        answer:
          'Both transcribe locally and run on Windows, macOS and Linux. OiPer adds profiles with their own hotkeys, built-in formatting presets, translation, snippets and optional cloud transcription. Handy is open source and offers more local model families.',
      },
      {
        question: 'Does Handy support cloud transcription?',
        answer:
          'No. Handy transcribes on your device only, and only its optional post-processing can call a cloud language model. OiPer can transcribe locally or with your own API key for providers like OpenAI and Groq.',
      },
      {
        question: 'Does OiPer work offline like Handy?',
        answer:
          'Yes. In local mode OiPer transcribes on-device with a Whisper model stored on your computer, so dictation keeps working without an internet connection.',
      },
      {
        question: 'Does Handy work on Wayland?',
        answer:
          'Handy describes its Wayland support as limited and recommends wtype or dotool. OiPer types on Wayland with wtype, kwtype, dotool or ydotool, and on X11 with xdotool or ydotool.',
      },
      {
        question: 'Is OiPer open source?',
        answer:
          'No. OiPer Desktop is not open source. If open source is a requirement, Handy is a good choice. OiPer’s local transcription is free and unlimited and needs no account.',
      },
    ],
  },
  '/alternatives/dragon': {
    label: 'vs Dragon',
    updated: '2026-10-12',
    destination: 'dragon_alternative',
    title: 'Dragon NaturallySpeaking Alternative (2026): Free & Local | OiPer',
    description:
      'A free Dragon NaturallySpeaking alternative for Windows, Mac and Linux. OiPer dictates into any app with local Whisper models, offline and with no license.',
    heading: 'A free Dragon NaturallySpeaking alternative',
    intro:
      'Dragon has been the name in dictation for decades, but today it is a Windows-only product sold mainly to professionals and organisations. The Mac version and the consumer Home edition are gone. OiPer is a free dictation app for Windows, macOS and Linux: hold a hotkey, speak, and your words are typed into any app, transcribed locally with on-device Whisper models.',
    sections: [
      {
        title: 'Where Dragon stands in 2026',
        intro: 'What is still sold, and what is not.',
        items: [
          {
            title: 'Windows only',
            text: 'Dragon Professional v16 is a Windows product, optimised for Windows 11 and compatible with Windows 10. Nuance discontinued Dragon for Mac in October 2018.',
          },
          {
            title: 'No consumer edition',
            text: 'Dragon Home 15 is no longer sold and there is no Home v16. The current desktop product is Dragon Professional, and Nuance’s page asks you to contact them for licensing.',
          },
          {
            title: 'A one-time license of about $700',
            text: 'US resellers list a single-user Dragon Professional v16 license at around $699. Upgrades from v15 cost less.',
          },
          {
            title: 'Now part of Microsoft',
            text: 'Microsoft completed its acquisition of Nuance in March 2022. Dragon continues as a Nuance product.',
          },
        ],
      },
      {
        title: 'Why people choose OiPer instead',
        intro:
          'Dictation that types into your apps, without the license or the platform lock-in.',
        items: [
          {
            title: 'Free local dictation',
            text: 'Local, on-device transcription in OiPer is free and unlimited, and no account is required. There is no license key to activate.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Runs on Mac and Linux too',
            text: 'OiPer has native builds for Apple Silicon and Intel Macs from macOS 10.15, plus Windows and Linux (AppImage, .deb and .rpm). One app for every computer you use.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Offline and private',
            text: 'In local mode a Whisper model runs on your own CPU or GPU. Nothing is uploaded, and dictation keeps working without an internet connection.',
            docs: '/resources/security',
          },
          {
            title: 'No voice training needed',
            text: 'Download a model once, from the 75 MB Tiny to Large v3 Turbo, and start dictating. Larger models are more accurate, smaller ones are faster.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Clean text, not raw transcripts',
            text: 'Formatting presets fix grammar and punctuation, turn speech into an email or a formal note, or translate before the text is typed.',
            docs: '/docs/desktop/formatting',
          },
        ],
      },
      {
        title: 'Moving from Dragon to OiPer',
        intro: 'Most of your Dragon habits have an equivalent.',
        items: [
          {
            title: 'Custom words become the dictionary',
            text: 'Add the names and terms Dragon learned for you. The dictionary is small (896 characters) and applies in cloud and OiPer modes, so add only the words that come out wrong.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Auto-texts become snippets',
            text: 'Say a short shortcut and OiPer expands it into your signature, an address or a standard paragraph.',
            docs: '/docs/desktop/snippets',
          },
          {
            title: 'Push to talk instead of an always-on microphone',
            text: 'Hold your hotkey while you speak, or use a press to start and stop shortcut for long dictation.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Profiles for different work',
            text: 'Give each kind of dictation its own hotkey, language, model and formatting, for example one for reports and one for email.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
      {
        title: 'When Dragon is the better fit',
        intro: 'An honest look at what OiPer does not do.',
        items: [
          {
            title: 'Controlling your PC by voice',
            text: 'Dragon has voice commands to edit text, format documents and run custom commands. OiPer types what you say and does not control your computer by voice.',
          },
          {
            title: 'Transcribing recordings',
            text: 'Dragon Professional transcribes audio files and can batch-process a folder of recordings. OiPer focuses on live dictation into the app you are using.',
          },
          {
            title: 'Managed deployments',
            text: 'Dragon offers volume licensing and the Nuance Management Center to share custom words and commands across an organisation, plus the Dragon Anywhere mobile app.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs Dragon Professional',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'Dragon Professional',
      rows: [
        {
          label: 'Windows',
          oiper: 'Yes',
          competitor: 'Yes, Windows 10 and 11',
        },
        {
          label: 'macOS',
          oiper: 'Yes, Apple Silicon and Intel',
          competitor: 'No, discontinued in 2018',
        },
        {
          label: 'Linux',
          oiper: 'Yes (AppImage, .deb, .rpm)',
          competitor: 'No',
        },
        {
          label: 'Price',
          oiper: 'Free for local transcription',
          competitor: 'About $699 one-time at US resellers',
        },
        {
          label: 'Consumer edition',
          oiper: 'Same free app for everyone',
          competitor: 'Dragon Home no longer sold',
        },
        {
          label: 'Account or activation',
          oiper: 'Not needed for local mode',
          competitor: 'Product activation required',
        },
        {
          label: 'Works offline',
          oiper: 'Yes',
          competitor: 'Desktop software, activation online',
        },
        {
          label: 'Custom words',
          oiper: 'Dictionary (cloud and OiPer modes)',
          competitor: 'Yes',
        },
        {
          label: 'Text shortcuts',
          oiper: 'Snippets',
          competitor: 'Auto-texts',
        },
        {
          label: 'AI rewriting and translation',
          oiper: 'Yes, presets or your own instructions',
          competitor: 'No',
        },
        {
          label: 'Voice commands and PC control',
          oiper: 'No',
          competitor: 'Yes',
        },
        {
          label: 'Audio file transcription',
          oiper: 'No',
          competitor: 'Yes',
        },
        {
          label: 'Central admin for teams',
          oiper: 'No',
          competitor: 'Nuance Management Center',
        },
      ],
    },
    faq: [
      {
        question: 'Is there a free alternative to Dragon NaturallySpeaking?',
        answer:
          'Yes. OiPer is free for unlimited local dictation on Windows, macOS and Linux. It transcribes on your device with Whisper models and types the text into any app.',
      },
      {
        question: 'Does Dragon NaturallySpeaking still exist?',
        answer:
          'Dragon is still sold as Dragon Professional v16 for Windows by Nuance, which Microsoft acquired in 2022. The consumer Dragon Home edition is no longer sold and there is no current Mac version.',
      },
      {
        question: 'Is there a Dragon alternative for Mac?',
        answer:
          'Yes. Nuance discontinued Dragon for Mac in 2018. OiPer runs natively on Apple Silicon and Intel Macs from macOS 10.15 and dictates into any app with local, on-device models.',
      },
      {
        question: 'How much does Dragon cost?',
        answer:
          'Nuance does not publish a price on its Dragon Professional page. US resellers list a single-user Dragon Professional v16 license at around $699.',
      },
      {
        question: 'Can OiPer replace Dragon voice commands?',
        answer:
          'No. OiPer is for dictation: it types what you say into the focused app. If you need to edit, select and navigate by voice, Dragon or a dedicated voice control tool fits better.',
      },
      {
        question: 'Do I need to train OiPer to my voice?',
        answer:
          'No. OiPer uses pretrained Whisper models, so there is no voice training step. Pick a model, set a hotkey and start dictating.',
      },
      {
        question: 'Is OiPer open source?',
        answer:
          'No. OiPer Desktop is not open source. Local transcription is free and unlimited, runs entirely on your device and needs no account.',
      },
    ],
  },
  '/alternatives/windows-voice-typing': {
    label: 'vs Windows Voice Typing',
    updated: '2026-10-12',
    destination: 'windows_voice_typing_alternative',
    title: 'Windows Voice Typing Alternative (2026): Offline Win+H | OiPer',
    description:
      'An offline alternative to Windows voice typing (Win+H). OiPer transcribes on your PC with local Whisper models and types into any app. Free to use.',
    heading: 'An offline alternative to Windows voice typing',
    intro:
      'Windows has two built-in ways to dictate: voice typing, opened with Win+H, and Voice Access, which replaced the old Windows Speech Recognition. Both are free and good for many people. OiPer is for when you need dictation that works offline in more languages, a hold-to-talk hotkey, or text that is cleaned up before it is typed.',
    platform: 'windows',
    sections: [
      {
        title: 'What Windows already gives you',
        intro: 'Know the built-in tools before you install anything.',
        items: [
          {
            title: 'Voice typing (Win+H)',
            text: 'Press Windows key + H in any text box. Voice typing uses Microsoft’s online speech recognition, powered by Azure Speech services, so it needs an internet connection. It adds punctuation automatically and supports 46 languages and regional variants.',
          },
          {
            title: 'Voice Access',
            text: 'Voice Access controls your whole PC by voice and dictates text. It works without an internet connection once a language is downloaded, and it has a custom vocabulary. It needs Windows 11 version 22H2 or later and supports English, Spanish, French and German.',
          },
          {
            title: 'Windows Speech Recognition is deprecated',
            text: 'Microsoft deprecated Windows Speech Recognition in December 2023 and no longer develops it. Voice Access is its replacement.',
          },
          {
            title: 'Fluid dictation on Copilot+ PCs',
            text: 'On Copilot+ PCs, voice typing can also clean up grammar and filler words with on-device models, in English only.',
          },
        ],
      },
      {
        title: 'Why people add OiPer',
        intro: 'Where the built-in tools fall short for daily dictation.',
        items: [
          {
            title: 'Offline in every language you speak',
            text: 'Win+H needs the internet, and Voice Access works offline in four languages. OiPer runs multilingual Whisper models on your PC, so dictation stays offline whatever language you set.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Languages Windows does not cover',
            text: 'Voice typing has no Arabic, Bengali or Urdu, for example. Set the language you speak per profile in OiPer, or let the model detect it.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Hold to talk',
            text: 'Hold your hotkey while you speak and release to type, so recording never starts or stops by surprise. A press to start and stop shortcut is there for long dictation.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Rewrite and translate before typing',
            text: 'Formatting presets fix punctuation and grammar, turn speech into an email or a prompt, or translate into just under a hundred languages.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Uses your GPU',
            text: 'Local transcription runs on your graphics card when one is usable and on the CPU otherwise.',
            docs: '/docs/desktop/settings',
          },
          {
            title: 'History with audio replay',
            text: 'Every dictation is saved on your PC with its transcript and recording, so you can recover text that went into the wrong window.',
            docs: '/docs/desktop/history',
          },
        ],
      },
      {
        title: 'When the built-in tools are enough',
        intro: 'Free, already installed and good at what they do.',
        items: [
          {
            title: 'Short dictation with a connection',
            text: 'If you dictate now and then, are online and speak one of the 46 supported languages, Win+H is quick and needs no setup.',
          },
          {
            title: 'Hands-free control of Windows',
            text: 'Voice Access lets you control your PC using only your voice, without an internet connection. OiPer types what you say and does not control your computer.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs Windows voice typing',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'Windows voice typing (Win+H)',
      rows: [
        {
          label: 'Price',
          oiper: 'Free for local transcription',
          competitor: 'Free, built into Windows',
        },
        {
          label: 'Where speech is transcribed',
          oiper: 'Locally, on your PC',
          competitor: 'Microsoft’s online speech recognition',
        },
        {
          label: 'Works offline',
          oiper: 'Yes',
          competitor: 'No, needs internet',
        },
        {
          label: 'Languages',
          oiper: 'Multilingual Whisper models',
          competitor: '46 languages and variants',
        },
        {
          label: 'How you start it',
          oiper: 'Hold a hotkey, or press to start and stop',
          competitor: 'Win+H, stop by voice or button',
        },
        {
          label: 'Automatic punctuation',
          oiper: 'With a formatting preset',
          competitor: 'Yes',
        },
        {
          label: 'Custom words',
          oiper: 'Dictionary (cloud and OiPer modes)',
          competitor: 'No (Voice Access has one)',
        },
        {
          label: 'AI rewriting and translation',
          oiper: 'Yes, presets or your own instructions',
          competitor: 'Fluid dictation cleanup, English, Copilot+ PCs',
        },
        {
          label: 'Choose your speech model',
          oiper: 'Tiny to Large v3 Turbo, or your own API key',
          competitor: 'No',
        },
        {
          label: 'Dictation history',
          oiper: 'Yes, with audio replay',
          competitor: 'No',
        },
        {
          label: 'Voice commands and PC control',
          oiper: 'No',
          competitor: 'Punctuation commands; full control in Voice Access',
        },
        {
          label: 'macOS and Linux',
          oiper: 'Yes',
          competitor: 'No',
        },
      ],
    },
    faq: [
      {
        question: 'Does Windows voice typing work offline?',
        answer:
          'No. Microsoft says voice typing (Win+H) needs an internet connection because it uses online speech recognition powered by Azure. Voice Access and OiPer both work offline.',
      },
      {
        question: 'Why is Win+H not working?',
        answer:
          'Voice typing needs an internet connection, a working microphone and a cursor in a text box, and it only works in Microsoft’s supported languages. If you are offline or speak another language, it cannot transcribe.',
      },
      {
        question: 'What is better than Windows voice typing?',
        answer:
          'It depends on what you need. Voice Access is better for controlling Windows by voice. OiPer is better for offline dictation in many languages, hold-to-talk and text that is cleaned up or translated before it is typed.',
      },
      {
        question: 'How do I voice type offline on Windows?',
        answer:
          'Use Voice Access in English, Spanish, French or German after downloading the language, or install OiPer and download a local Whisper model. OiPer then transcribes on your PC with no connection.',
      },
      {
        question: 'Is Windows Speech Recognition still available?',
        answer:
          'Windows Speech Recognition was deprecated in December 2023 and is no longer developed. Microsoft replaced it with Voice Access on Windows 11 version 22H2 and later.',
      },
      {
        question: 'Is OiPer free on Windows?',
        answer:
          'Local, on-device transcription is free and unlimited, and no account is required. Paid plans add hosted transcription and formatting models.',
      },
    ],
  },
  '/alternatives/apple-dictation': {
    label: 'vs Apple Dictation',
    updated: '2026-10-12',
    destination: 'apple_dictation_alternative',
    title: 'Mac Dictation Alternative (2026): Local on Any Mac | OiPer',
    description:
      'A Mac dictation alternative that runs locally on Apple Silicon and Intel. OiPer adds hold-to-talk, AI formatting, translation and history. Free to use.',
    heading: 'A Mac dictation alternative for every Mac',
    intro:
      'macOS Dictation is free, built in and, on Apple Silicon, processed on your Mac for many languages. For a lot of people it is enough. OiPer is for when you want local dictation on an Intel Mac or in more languages, a hold-to-talk hotkey, text that is cleaned up or translated before it is typed, and a history of everything you said.',
    platform: 'macos',
    sections: [
      {
        title: 'What macOS Dictation does well',
        intro: 'Know the built-in tool before you install anything.',
        items: [
          {
            title: 'On-device on Apple Silicon',
            text: 'On a Mac with Apple silicon, Dictation is processed on your Mac for supported languages, with no internet connection required. Apple lists 48 languages and regional variants for on-device dictation.',
          },
          {
            title: 'No time limit',
            text: 'You can dictate text of any length without a timeout. Dictation stops by itself after 30 seconds without speech.',
          },
          {
            title: 'Punctuation as you speak',
            text: 'In supported languages, Dictation inserts commas, periods and question marks automatically, and you can say punctuation, emoji names or “new line”.',
          },
          {
            title: 'Type while you dictate',
            text: 'On Apple silicon you can keep typing with the keyboard without stopping Dictation.',
          },
        ],
      },
      {
        title: 'Why people add OiPer',
        intro: 'Where the built-in tool falls short for daily dictation.',
        items: [
          {
            title: 'Local on Intel Macs too',
            text: 'Apple sends dictation to its servers on Intel Macs and in languages without on-device support. OiPer runs Whisper models on any Mac from macOS 10.15, on the GPU when usable and the CPU otherwise.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Pick the model and the language',
            text: 'Choose a local model from the 75 MB Tiny to Large v3 Turbo, set the language you speak per profile, or bring your own API key for OpenAI, Groq or another provider.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'Hold to talk',
            text: 'Hold your hotkey while you speak and release to type, or use a press to start and stop shortcut for long dictation. Each profile has its own shortcuts.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Rewrite and translate before typing',
            text: 'Formatting presets fix grammar and misheard words, turn speech into an email or a clear AI prompt, or translate into just under a hundred languages.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'History with audio replay',
            text: 'Every dictation is saved on your Mac with its transcript and recording, so nothing you said is lost if it lands in the wrong window.',
            docs: '/docs/desktop/history',
          },
          {
            title: 'The same app on Windows and Linux',
            text: 'Use the same profiles, snippets and hotkey habits on a Windows PC or a Linux laptop.',
            docs: '/docs/desktop/installation',
          },
        ],
      },
      {
        title: 'When macOS Dictation is enough',
        intro: 'Free, already installed and private on Apple Silicon.',
        items: [
          {
            title: 'Everyday dictation on Apple Silicon',
            text: 'If you have an Apple Silicon Mac, speak a language with on-device support and want text as you said it, built-in Dictation needs no install and no extra permissions.',
          },
          {
            title: 'Controlling your Mac by voice',
            text: 'Apple’s Voice Control lets you control your Mac by voice and has a custom vocabulary of up to 1,000 terms. OiPer types what you say and does not control your Mac.',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs macOS Dictation',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'macOS Dictation',
      rows: [
        {
          label: 'Price',
          oiper: 'Free for local transcription',
          competitor: 'Free, built into macOS',
        },
        {
          label: 'On-device on Apple Silicon',
          oiper: 'Yes',
          competitor: 'Yes, in supported languages',
        },
        {
          label: 'On-device on Intel Macs',
          oiper: 'Yes, on the CPU or GPU',
          competitor: 'No, sent to Apple',
        },
        {
          label: 'How you start it',
          oiper: 'Hold a hotkey, or press to start and stop',
          competitor: 'Microphone key or Dictation shortcut',
        },
        {
          label: 'Automatic punctuation',
          oiper: 'With a formatting preset',
          competitor: 'Yes, in supported languages',
        },
        {
          label: 'Choose your speech model',
          oiper: 'Tiny to Large v3 Turbo, or your own API key',
          competitor: 'No',
        },
        {
          label: 'AI rewriting and translation',
          oiper: 'Yes, presets or your own instructions',
          competitor: 'Not part of Dictation',
        },
        {
          label: 'Custom words',
          oiper: 'Dictionary (cloud and OiPer modes)',
          competitor: 'In Voice Control, up to 1,000 terms',
        },
        {
          label: 'Different setups per task',
          oiper: 'Profiles with their own hotkey and language',
          competitor: 'No',
        },
        {
          label: 'Dictation history',
          oiper: 'Yes, with audio replay',
          competitor: 'No',
        },
        {
          label: 'Windows and Linux',
          oiper: 'Yes',
          competitor: 'No',
        },
      ],
    },
    faq: [
      {
        question: 'Is Mac dictation done on-device?',
        answer:
          'On Apple Silicon Macs, yes, for supported languages, and no internet connection is needed. On Intel Macs, or in languages without on-device support, Apple sends your dictation to its servers.',
      },
      {
        question: 'Does Mac dictation have a time limit?',
        answer:
          'No. Apple says you can dictate text of any length without a timeout. Dictation stops automatically after 30 seconds without speech.',
      },
      {
        question: 'What is a better dictation app for Mac?',
        answer:
          'For quick dictation on Apple Silicon, built-in Dictation is often enough. OiPer is better if you want local transcription on an Intel Mac, hold-to-talk, AI formatting, translation or a history of your dictations.',
      },
      {
        question: 'Why is my Mac dictation not working offline?',
        answer:
          'Offline dictation needs an Apple Silicon Mac, a language with on-device support and its downloaded speech model. Otherwise macOS sends dictation to Apple and needs a connection.',
      },
      {
        question: 'Does OiPer work offline on an Intel Mac?',
        answer:
          'Yes. There is a separate Intel build, and local Whisper models run on the CPU or GPU, so dictation works without an internet connection.',
      },
      {
        question: 'Why does OiPer need more permissions than Apple Dictation?',
        answer:
          'OiPer is a separate app, so macOS asks you to allow Microphone, Input Monitoring for the hotkey, Accessibility to type the text and Screen Recording to place the overlay.',
      },
      {
        question: 'Is OiPer free on Mac?',
        answer:
          'Local, on-device transcription is free and unlimited, and no account is required. Paid plans add hosted transcription and formatting models.',
      },
    ],
  },
  '/use-cases/claude-code': {
    label: 'Claude Code',
    updated: '2026-10-12',
    destination: 'claude_code',
    title: 'Voice to Text for Claude Code: Local Dictation | OiPer',
    description:
      'Dictate prompts to Claude Code in any terminal with OiPer. Local, offline transcription, a Prompt preset and auto submit. Works over SSH and with API keys.',
    heading: 'Voice to text for Claude Code',
    intro:
      'Claude Code works best when you explain things in full. OiPer lets you say the prompt instead of typing it: hold a hotkey in your terminal, speak, release, and the text lands in the Claude Code input. Transcription can run locally on your machine, and it works the same on Windows, macOS and Linux.',
    sections: [
      {
        title: 'Claude Code’s /voice or OiPer',
        intro:
          'Claude Code has its own dictation. Both are good; they suit different setups.',
        items: [
          {
            title: 'What /voice does',
            text: 'Run /voice in Claude Code, then hold Space to talk or tap it to start and send. It streams your audio to Anthropic for transcription, is tuned for coding words, and adds your project and git branch names as hints.',
          },
          {
            title: 'When /voice is the better fit',
            text: 'You sign in with a Claude.ai account, you only dictate into Claude Code, and you are happy with cloud transcription. It needs no extra app and does not use your Claude messages or tokens.',
          },
          {
            title: 'When OiPer is the better fit',
            text: 'You want transcription on your own device, you run Claude Code with an API key, Bedrock or another provider, you work over SSH, or you want the same dictation in your editor, browser and chat apps too.',
          },
          {
            title: 'Local and offline',
            text: 'In local mode OiPer runs a Whisper model on your CPU or GPU. Your audio never leaves your machine, and dictation keeps working without a connection.',
            docs: '/docs/desktop/models',
          },
        ],
      },
      {
        title: 'Set up a Claude Code profile',
        intro: 'One hotkey that turns speech into a sent prompt.',
        items: [
          {
            title: '1. Pick the Prompt preset',
            text: 'Formatting with the Prompt preset restructures what you said into a clear, organised prompt before it is typed. Leave formatting off if you want your exact words.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: '2. Auto submit with Enter',
            text: 'Claude Code sends a prompt on Enter. Set the profile’s auto submit to Enter and the prompt sends itself as soon as the text is inserted.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: '3. Match your terminal’s paste key',
            text: 'Most Linux terminals paste with Ctrl + Shift + V, not Ctrl + V. If text does not appear, change the Insert method in Settings to Ctrl+Shift+V.',
            docs: '/docs/desktop/settings',
          },
          {
            title: '4. Give it its own hotkey',
            text: 'Profiles are chosen by hotkey, so a Claude Code profile can sit next to a plain dictation profile for email and chat.',
            docs: '/docs/desktop/profiles',
          },
        ],
      },
      {
        title: 'Spell your repo right',
        intro:
          'Library names and internal services are where speech models slip.',
        items: [
          {
            title: 'Dictionary for project names',
            text: 'Add repo, package and service names with the exact spelling, such as PostgreSQL or tRPC. The dictionary is used in cloud and OiPer modes.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Snippets for local mode',
            text: 'Local Whisper does not use the dictionary. Add a snippet that rewrites a common misspelling, or switch the profile to a larger model.',
            docs: '/docs/desktop/snippets',
          },
          {
            title: 'Snippets for repeated prompts',
            text: 'Say a short shortcut and OiPer expands it into a prompt you use every day, like your review or test checklist.',
            docs: '/docs/desktop/snippets',
          },
        ],
      },
    ],
    comparison: {
      title: 'OiPer vs Claude Code /voice',
      intro:
        'Feature by feature. Based on public information, checked October 2026.',
      competitor: 'Claude Code /voice',
      rows: [
        {
          label: 'Where speech is transcribed',
          oiper: 'On your device in local mode, or a cloud you choose',
          competitor: 'Anthropic’s servers',
        },
        {
          label: 'Works offline',
          oiper: 'Yes, in local mode',
          competitor: 'No',
        },
        {
          label: 'Sign-in needed',
          oiper: 'None for local mode',
          competitor: 'Claude.ai account',
        },
        {
          label: 'Claude Code with an API key or Bedrock',
          oiper: 'Yes',
          competitor: 'Not available',
        },
        {
          label: 'Claude Code over SSH',
          oiper: 'Yes, OiPer types into your local terminal',
          competitor: 'Not available',
        },
        {
          label: 'Works outside Claude Code',
          oiper: 'Any app with a text field',
          competitor: 'Claude Code CLI and VS Code extension',
        },
        {
          label: 'Push to talk',
          oiper: 'Yes, any hotkey',
          competitor: 'Yes, Space by default',
        },
        {
          label: 'Press to start and stop',
          oiper: 'Yes',
          competitor: 'Yes, tap mode',
        },
        {
          label: 'Send the prompt automatically',
          oiper: 'Yes, auto submit',
          competitor: 'Yes',
        },
        {
          label: 'Rewrite speech into a clean prompt',
          oiper: 'Yes, Prompt preset',
          competitor: 'No',
        },
        {
          label: 'Custom vocabulary',
          oiper: 'Dictionary in cloud and OiPer modes',
          competitor: 'Project and branch names added automatically',
        },
        {
          label: 'Languages',
          oiper: 'Any language your Whisper model supports',
          competitor: '20 languages',
        },
        {
          label: 'Price',
          oiper: 'Local mode is free',
          competitor: 'Included, uses no Claude tokens',
        },
      ],
    },
    faq: [
      {
        question: 'Does Claude Code have voice input?',
        answer:
          'Yes. Run /voice in the Claude Code CLI and hold Space to dictate. It needs a Claude.ai sign-in and sends your audio to Anthropic for transcription.',
      },
      {
        question: 'Why use OiPer instead of /voice?',
        answer:
          'OiPer can transcribe on your own device, works offline, and does not depend on how Claude Code is signed in. It also types into every other app, not only Claude Code.',
      },
      {
        question: 'Can OiPer send the prompt for me?',
        answer:
          'Yes. Set auto submit to Enter on your Claude Code profile and OiPer presses Enter right after the text is inserted.',
      },
      {
        question: 'Does OiPer work with Claude Code over SSH?',
        answer:
          'Yes. OiPer runs on your computer and types into your local terminal window, so the text reaches Claude Code on the remote machine like normal typing.',
      },
      {
        question: 'Does OiPer work with Claude Code on Linux?',
        answer:
          'Yes. OiPer runs on Linux with X11 and Wayland and types into whichever terminal has focus. In most Linux terminals set the Insert method to Ctrl+Shift+V.',
      },
      {
        question: 'Is my code sent anywhere when I dictate?',
        answer:
          'Not in local mode. The Whisper model runs on your machine, and nothing is uploaded unless you pick a cloud provider for that profile.',
      },
    ],
  },
  '/use-cases/accessibility': {
    label: 'Accessibility',
    updated: '2026-10-12',
    destination: 'accessibility',
    title: 'Dictation Software for RSI and Carpal Tunnel | OiPer',
    description:
      'Type less and speak more. OiPer is desktop dictation for people with RSI, carpal tunnel or limited typing ability. Local, free and works in any app.',
    heading: 'Dictation software for RSI and limited typing',
    intro:
      'If typing is painful, tiring or slow for you, OiPer lets you write by speaking. Press a hotkey, talk, and your words are typed into the app you are using. It runs on Windows, macOS and Linux, and local transcription is free with no account.',
    sections: [
      {
        title: 'Fewer keystrokes for everything you write',
        intro: 'Settings that cut down on typing and holding keys.',
        items: [
          {
            title: 'No need to hold keys down',
            text: 'Besides push to talk, each profile can use press to start and stop: one press begins recording and another ends it, so you never hold a key while you speak.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Pick a hotkey that suits your hands',
            text: 'Choose any key combination you find comfortable, and set a different one per profile.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Send messages without pressing Enter',
            text: 'Auto submit presses Enter, Ctrl + Enter or another combination after the text is inserted, so a chat message or a prompt sends itself.',
            docs: '/docs/desktop/profiles',
          },
          {
            title: 'Long text from a short phrase',
            text: 'Snippets expand something short you say into a full address, a signature or a reply you write often.',
            docs: '/docs/desktop/snippets',
          },
        ],
      },
      {
        title: 'Less correcting afterwards',
        intro: 'Fixing mistakes by hand is typing too.',
        items: [
          {
            title: 'Clean-up before it is typed',
            text: 'The Normal formatting preset fixes misheard words, grammar and punctuation without changing your meaning, so there is less to edit by keyboard.',
            docs: '/docs/desktop/formatting',
          },
          {
            title: 'Names spelled your way',
            text: 'Add people, places and terms you use often to the dictionary so they come out right the first time. It applies in cloud and OiPer modes.',
            docs: '/docs/desktop/dictionary',
          },
          {
            title: 'Nothing is lost',
            text: 'Every dictation is saved in History with its audio, so you can copy a transcript again instead of repeating yourself.',
            docs: '/docs/desktop/history',
          },
          {
            title: 'Audio cues',
            text: 'Turn on sounds for when recording starts and stops, so you know OiPer is listening without looking.',
            docs: '/docs/desktop/settings',
          },
        ],
      },
      {
        title: 'What OiPer does not do',
        intro: 'An honest look at its limits, so you can pick the right tool.',
        items: [
          {
            title: 'It is dictation, not voice control',
            text: 'OiPer types text into the field you are in. It cannot open apps, click buttons, scroll or move the cursor by voice. You still use a key press to start dictating and a keyboard or mouse to choose where the text goes.',
          },
          {
            title: 'When a voice control tool fits better',
            text: 'For hands-free use of the whole computer, look at Voice Access in Windows 11, Voice Control on the Mac, Dragon Professional or Talon. They take spoken commands to navigate and edit.',
          },
          {
            title: 'Not a medical product',
            text: 'OiPer is a writing tool. It does not treat or prevent any condition. If typing hurts, talk to a health professional about what is right for you.',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Is dictation software good for RSI or carpal tunnel?',
        answer:
          'Dictation lets you write text by speaking instead of typing it. OiPer is a writing tool, not a treatment, so follow the advice of your health professional about your condition.',
      },
      {
        question: 'Do I have to hold a key while I talk?',
        answer:
          'No. Set a press to start and stop hotkey on your profile: press once to begin recording and once to finish.',
      },
      {
        question: 'Can I control my whole computer by voice with OiPer?',
        answer:
          'No. OiPer is dictation into text fields. For voice commands that open apps, click and scroll, use Voice Access on Windows 11, Voice Control on the Mac, Dragon Professional or Talon.',
      },
      {
        question:
          'Is there free speech to text software for people who cannot type well?',
        answer:
          'Yes. OiPer’s local transcription is free and unlimited on Windows, macOS and Linux, needs no account and works offline.',
      },
      {
        question: 'Does OiPer work in any app?',
        answer:
          'Yes. OiPer types where your cursor is, so it works in email, documents, chat, browsers and code editors.',
      },
      {
        question: 'Does OiPer need training to my voice?',
        answer:
          'No. OiPer uses Whisper speech models that work without voice training. A larger model gives better accuracy if words keep coming out wrong.',
      },
    ],
  },
  '/linux/wayland': {
    label: 'Wayland',
    updated: '2026-10-12',
    destination: 'linux_wayland',
    title: 'Speech to Text on Wayland: GNOME, KDE, Hyprland | OiPer',
    description:
      'Voice typing on Wayland that types into any app. Which typing tool works on GNOME, KDE, Sway and Hyprland, and how to set up ydotool or dotool.',
    heading: 'Speech to text on Wayland',
    intro:
      'Wayland keeps apps from typing into each other, which is good for security and hard for dictation. OiPer types the transcript with a small system tool, and the right tool depends on your compositor. This page shows which one to install on GNOME, KDE Plasma, Sway, Hyprland and others, and how to set it up.',
    platform: 'linux',
    sections: [
      {
        title: 'Why typing into other apps is hard on Wayland',
        intro: 'On X11 any program can send keystrokes. On Wayland it cannot.',
        items: [
          {
            title: 'No shared input by design',
            text: 'Wayland compositors do not let one app send keys to another. A dictation app needs either a protocol the compositor offers for this, or a virtual keyboard at the kernel level.',
          },
          {
            title: 'Compositors differ',
            text: 'Sway and Hyprland offer a virtual keyboard protocol, KDE Plasma has its own, and GNOME offers neither. That is why one tool does not fit every desktop.',
          },
          {
            title: 'OiPer uses a tool you install',
            text: 'On Wayland OiPer types with wtype, kwtype, dotool or ydotool. On X11 it uses xdotool or ydotool. Install one before your first dictation.',
            docs: '/docs/desktop/installation',
          },
        ],
      },
      {
        title: 'Which tool for which compositor',
        intro: 'Install the one that matches your desktop.',
        items: [
          {
            title: 'GNOME (Mutter): ydotool or dotool',
            text: 'GNOME does not support the virtual keyboard protocol that wtype needs, and kwtype is for KDE only. Use ydotool or dotool, which create a virtual keyboard through the kernel’s uinput module.',
          },
          {
            title: 'KDE Plasma (KWin): kwtype',
            text: 'kwtype uses KDE’s fake input protocol, which only KWin implements. Build it from github.com/Sporif/KWtype or install kwtype-git from the AUR. ydotool and dotool also work.',
          },
          {
            title: 'Sway, Hyprland, niri, COSMIC: wtype',
            text: 'These compositors support the virtual keyboard protocol, so wtype works with no extra permissions. Install it from your distribution, for example sudo apt install wtype or sudo pacman -S wtype.',
          },
          {
            title: 'Any compositor and X11: ydotool or dotool',
            text: 'Because they work at the kernel level, ydotool and dotool type into any Wayland session and into X11 too. They need write access to /dev/uinput.',
          },
        ],
      },
      {
        title: 'Set up ydotool or dotool',
        intro:
          'Both need permission to use /dev/uinput. Log out or reboot after changing groups.',
        items: [
          {
            title: 'ydotool on Debian and Ubuntu',
            text: 'Run sudo apt install ydotool, then sudo usermod -aG input $USER, and reboot. Start the daemon with systemctl --user enable --now ydotool. Since version 1.0 the ydotoold daemon must be running for ydotool to type.',
          },
          {
            title: 'dotool',
            text: 'Install it from the AUR, Alpine, Nix or Void, or build it with ./build.sh && sudo ./build.sh install. Then run sudo groupadd -f input and sudo usermod -a -G input $USER, and reboot so the udev rule and group apply.',
          },
          {
            title: 'Test before you dictate',
            text: 'With a text field focused, run echo type hello | dotool, or ydotool type hello. If the word appears, OiPer can type too.',
          },
          {
            title: 'Keyboard layouts',
            text: 'Both tools send keycodes. With a non-US layout, dotool reads DOTOOL_XKB_LAYOUT, for example DOTOOL_XKB_LAYOUT=fr. ydotool does not detect custom layouts; Sway and Hyprland can set a layout for its virtual device.',
          },
          {
            title: 'About the input group',
            text: 'Adding your user to the input group gives your programs access to input devices. Only do it on a computer you trust, or prefer wtype or kwtype where your compositor supports them.',
          },
        ],
      },
      {
        title: 'If the text does not appear',
        intro: 'Narrow it down in a minute.',
        items: [
          {
            title: 'Check History first',
            text: 'If the dictation has a transcript in History but nothing was typed, the problem is the typing tool, not the microphone or the model.',
            docs: '/docs/desktop/troubleshooting',
          },
          {
            title: 'Try another Insert method',
            text: 'Ctrl+V is the default. In terminals try Ctrl+Shift+V, and where pasting is blocked try direct, which types the text key by key.',
            docs: '/docs/desktop/settings',
          },
          {
            title: 'Keep a copy on the clipboard',
            text: 'Turn on Write to clipboard so you can paste the result yourself while you sort out the typing tool.',
            docs: '/docs/desktop/settings',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Does speech to text work on Wayland?',
        answer:
          'Yes. OiPer types into any Wayland app with wtype, kwtype, dotool or ydotool. Which one you need depends on your compositor.',
      },
      {
        question: 'Which typing tool should I use on GNOME Wayland?',
        answer:
          'Use ydotool or dotool. GNOME does not support the virtual keyboard protocol that wtype relies on, and kwtype only works on KDE Plasma.',
      },
      {
        question: 'Does voice typing work on Hyprland?',
        answer:
          'Yes. Hyprland supports the virtual keyboard protocol, so install wtype and OiPer can type into any app without extra permissions.',
      },
      {
        question: 'Does voice typing work on KDE Plasma Wayland?',
        answer:
          'Yes. Install kwtype, which uses KWin’s fake input protocol, or use ydotool or dotool.',
      },
      {
        question: 'Why does ydotool need the input group?',
        answer:
          'ydotool and dotool create a virtual keyboard through /dev/uinput, which normally needs root. Adding your user to the input group lets them run without root.',
      },
      {
        question: 'Does OiPer still work on X11?',
        answer: 'Yes. On X11 OiPer types with xdotool or ydotool.',
      },
    ],
  },
  '/linux/ubuntu': {
    label: 'Ubuntu',
    updated: '2026-10-12',
    destination: 'linux_ubuntu',
    title: 'Speech to Text for Ubuntu: Local Voice Typing | OiPer',
    description:
      'Voice typing for Ubuntu 24.04 and 26.04 LTS. Install the OiPer .deb, set up typing on GNOME Wayland and dictate offline with local Whisper models.',
    heading: 'Speech to text for Ubuntu',
    intro:
      'Ubuntu LTS releases do not include voice typing. OiPer adds it: hold a hotkey, speak, and your words are typed into any Ubuntu app. Transcription runs locally with Whisper models, so it works offline and needs no account.',
    platform: 'linux',
    sections: [
      {
        title: 'Install on Ubuntu',
        intro: 'A .deb package and one typing tool.',
        items: [
          {
            title: '1. Install the .deb',
            text: 'Download the .deb for amd64 and install it with sudo apt install ./OiPer_<version>_amd64.deb, so apt pulls in any dependencies.',
            docs: '/docs/desktop/installation',
          },
          {
            title: '2. Install ydotool for GNOME on Wayland',
            text: 'Ubuntu’s default desktop is GNOME on Wayland, where wtype and kwtype do not work. Run sudo apt install ydotool and sudo usermod -aG input $USER, reboot, then systemctl --user enable --now ydotool.',
            docs: '/docs/desktop/installation',
          },
          {
            title: '3. Pick a local model and a hotkey',
            text: 'First-run setup downloads a Whisper model and records the shortcut you hold to dictate. The default is Left Shift + Left Control.',
            docs: '/docs/desktop/quickstart',
          },
          {
            title: 'Test the typing tool',
            text: 'Click into a text field and run ydotool type hello in a terminal. If the word appears, OiPer can type too.',
            docs: '/docs/desktop/troubleshooting',
          },
        ],
      },
      {
        title: 'Ubuntu 26.04 or 24.04',
        intro: 'The typing setup depends on your release.',
        items: [
          {
            title: 'Ubuntu 26.04 LTS',
            text: 'GNOME runs only on Wayland since Ubuntu 25.10. The ydotool package is version 1.0.4 and ships a user service for its daemon, so the steps above work as written.',
          },
          {
            title: 'Ubuntu 24.04 LTS',
            text: 'The ydotool package is the older 0.1.8. If it does not type for you, choose Ubuntu on Xorg on the login screen and install xdotool with sudo apt install xdotool.',
          },
          {
            title: 'Kubuntu and other flavours',
            text: 'On KDE Plasma Wayland use kwtype or ydotool. On an X11 session use xdotool.',
            docs: '/docs/desktop/installation',
          },
          {
            title: 'Where files live',
            text: 'Settings, history, models, audio and logs are kept in ~/.config/com.oiper.desktop. Deleting that folder resets OiPer completely.',
            docs: '/docs/desktop/installation',
          },
        ],
      },
      {
        title: 'Local models on Ubuntu',
        intro: 'Pick for your hardware, not for a subscription.',
        items: [
          {
            title: 'Start with Base or Large v3 Turbo',
            text: 'Base (142 MB) is quick on everyday laptops. Large v3 Turbo (1.5 GB) gives large-model accuracy at lower cost if your machine can take it.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'English-only variants',
            text: 'If you only dictate in English, the English-only Tiny, Base, Small and Medium models are more accurate than the multilingual model of the same size.',
            docs: '/docs/desktop/models',
          },
          {
            title: 'CPU or GPU',
            text: 'Whisper Hardware set to Auto uses your GPU when one is usable and the CPU otherwise. Set it to CPU if GPU drivers cause trouble.',
            docs: '/docs/desktop/settings',
          },
        ],
      },
      {
        title: 'What about Ubuntu’s own dictation, Myna?',
        intro: 'Canonical is building voice typing into Ubuntu Desktop.',
        items: [
          {
            title: 'What Myna is',
            text: 'Myna is Canonical’s local speech to text for Ubuntu Desktop, announced in June 2026 and aimed at Ubuntu 26.10. You press a shortcut, speak, and text appears in the active app. Reviews of early builds say it is expected to be opt-in.',
          },
          {
            title: 'When Myna is the better fit',
            text: 'It is built into the desktop by Canonical, runs speech models locally, and inserts text through the input method framework, so it needs no extra typing tool or input group.',
          },
          {
            title: 'When OiPer is the better fit',
            text: 'You are on Ubuntu 24.04 or 26.04 LTS, use KDE or an X11 session, or want formatting, translation, profiles per hotkey or an optional cloud model. Myna’s first release leaves out translation, voice commands and other desktops.',
            docs: '/docs/desktop/formatting',
          },
        ],
      },
    ],
    faq: [
      {
        question: 'Does Ubuntu have speech to text?',
        answer:
          'Ubuntu 24.04 and 26.04 LTS have no built-in voice typing. Canonical is building a local dictation feature called Myna for Ubuntu 26.10. OiPer adds local voice typing to current releases today.',
      },
      {
        question: 'How do I install OiPer on Ubuntu?',
        answer:
          'Download the .deb and run sudo apt install ./OiPer_<version>_amd64.deb. Then install ydotool so OiPer can type on the default GNOME Wayland session.',
      },
      {
        question: 'Why does OiPer need ydotool on Ubuntu?',
        answer:
          'GNOME on Wayland does not let apps send keystrokes to each other. ydotool types through a virtual keyboard at the kernel level, which works on any session.',
      },
      {
        question: 'Does voice typing work offline on Ubuntu?',
        answer:
          'Yes. In local mode OiPer transcribes on your machine with a Whisper model, so it works without an internet connection.',
      },
      {
        question: 'Does OiPer work on Ubuntu 24.04?',
        answer:
          'Yes. Install the .deb and a typing tool. On 24.04 you can also log in to Ubuntu on Xorg and use xdotool.',
      },
      {
        question: 'Is OiPer free on Ubuntu?',
        answer:
          'Local, on-device transcription is free and unlimited, and no account is required. Paid plans add hosted transcription and formatting models.',
      },
    ],
  },
} satisfies Record<string, Guide>

export type GuidePath = keyof typeof GUIDES
