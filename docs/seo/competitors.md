# Brand, Product & Competitors

## What OiPer is (from the site, docs and code)

- Desktop voice-to-text: **hold a hotkey, speak, release, and the text is typed into the active app.**
- **Windows, macOS (Apple Silicon + Intel), Linux** (AppImage, .deb, .rpm). Tauri/Rust.
- Local Whisper models by default (CPU / CUDA), optional cloud providers (your own key, ElevenLabs, OiPer hosted models).
- Features: AI text cleanup/formatting, dictionary (custom terms), snippets (with Rust/TS APIs), profiles, history, 15 languages listed.
- Pricing (dev/next release): Free with unlimited local transcription, plus paid PRO/MAX plans for hosted features. Prod still shows the old Starter/Pro/Business "Coming Soon" plans.
- Proof available today: GitHub `OiPer/desktop` (README + releases only, **no license, so it isn't open source**), v0.1.20, about 950 release downloads, 7 stars.

**Defensible position:** _the fastest private dictation app that works the same on Windows, Mac and Linux._ Most premium competitors are Mac-first (Superwhisper, VoiceInk, MacWhisper) or skip Linux (Wispr Flow). The free Linux tools are open-source projects with rougher UX (Handy reviews mention 2–5 s delays and no AI cleanup).

⚠️ OiPer isn't open source, so never claim "open source" in copy or schema. Compete with the open-source tools on speed, polish and cross-platform support.

## Brand hygiene

| Item                 | Status                                                                                                                  | Action                                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name spelling        | "OiPer" on site, "oiper" in URLs                                                                                        | Keep "OiPer" everywhere and use it as `Organization.name`                                                                                                                                            |
| Name collision       | "OiPer review" returns Zoiper (VoIP)                                                                                    | Use `Organization` schema + `sameAs` and the tagline "OiPer voice dictation" in titles                                                                                                               |
| Domains              | oiper.com, desktop.oiper.com (duplicate), dev.oiper.com (indexable)                                                     | One canonical domain: oiper.com ([audit](audit.md) P0 #1, #3)                                                                                                                                        |
| GitHub org           | Brand repos sit next to unrelated `todo`, `todo-client`, `media-library.next`. The website source `oiper-web` is public | Archive or move the unrelated repos so the org page reads as a product. Check that `oiper-web` is meant to be public                                                                                 |
| `OiPer/desktop` repo | README only, no topics                                                                                                  | Add topics: `speech-to-text`, `dictation`, `voice-typing`, `whisper`, `wispr-flow-alternative`, `tauri`. The `wispr-flow-alternative` GitHub topic page ranks for "wispr flow alternative for linux" |
| Testimonials         | Look like placeholders and are already echoed as real by AI                                                             | [audit](audit.md) #11                                                                                                                                                                                |
| Social profiles      | None linked from the site                                                                                               | Create X/LinkedIn/YouTube (demo video) and add them to `sameAs`                                                                                                                                      |

## Competitor SEO benchmark (homepages, crawled 2026-10-06)

| Site             | Home words | JSON-LD                                                       | Sitemap URLs | Biggest sections                                    | llms.txt               |
| ---------------- | ---------- | ------------------------------------------------------------- | ------------ | --------------------------------------------------- | ---------------------- |
| **oiper.com**    | **413**    | **none**                                                      | **404**      | —                                                   | **404**                |
| wisprflow.ai     | 2,283      | Organization                                                  | 443          | notetaker 120, post 119, dictation 50, use-cases 46 | ✅                     |
| superwhisper.com | 1,139      | Organization, SoftwareApplication, FAQPage                    | 77           | benchmarks 17, **vs 10**, blog 6                    | ✅                     |
| tryvoiceink.com  | 1,468      | Organization, WebSite, SoftwareApplication, ItemList, FAQPage | 67           | docs 42, best-dictation-apps(-windows)              | ✅ (131 KB, full docs) |
| aquavoice.com    | 1,857      | Organization, WebSite, SoftwareApplication                    | 113          | use-cases 34, blog 30, **vs 23**                    | ✅                     |
| willowvoice.com  | 1,886      | WebSite                                                       | 489          | blog 273, use-cases 187                             | ❌                     |
| getvoibe.com     | 4,301      | Organization, SoftwareApplication, FAQPage                    | —            | resources/blog                                      | ✅                     |
| usevoicy.com     | 2,314      | Organization, WebSite, WebPage, SoftwareApplication, FAQPage  | 1,177        | de/ja/fr i18n 832, blog 224, **comparisons 50**     | ✅                     |
| spokenly.app     | 646        | FAQPage, Organization, SoftwareApplication, VideoObject       | 197          | blog 76, **comparison 28**, docs 24                 | ✅                     |
| voicedash.ai     | 1,257      | Organization, WebSite, Article…                               | (index)      | WordPress posts                                     | ✅                     |
| macwhisper.com   | 1,333      | none                                                          | 7            | —                                                   | ❌                     |
| handy.computer   | 331        | none                                                          | —            | —                                                   | ❌                     |

**What every winner does:**

1. **Comparison pages** (`/vs/wispr-flow`, `/wispr-flow-alternative`, `/compare/…`). These rank for high-intent "X alternative" and "X vs Y" queries and are what AI answers cite.
2. **Use-case pages** (coding, writing, email, medical, legal, ADHD/accessibility).
3. **"Best dictation apps for {platform}" listicles** on their own blog, listing themselves first.
4. **`SoftwareApplication` + `FAQPage` schema** on the homepage.
5. **llms.txt.** VoiceInk ships the full docs in it.
6. **A benchmarks page** with methodology (Superwhisper).

The tiny sites that skip all of this (Handy, MacWhisper) only rank on brand or community links.

## Keyword opportunities (Google Autocomplete, US, 2026-10-06)

Autocomplete shows what people actually type. It doesn't give volumes (no free source), so priority below comes from **fit with OiPer × weakness of current results**. Full list: [`data/keywords.json`](data/keywords.json).

| Cluster               | Real queries seen                                                                                                                                                                                                      | Fit                                             | Target page                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------- |
| **Linux**             | speech to text linux (mint / ubuntu / local / app / reddit), voice typing for linux, best speech to text software for linux, wispr flow alternative linux/ubuntu, superwhisper alternative for linux                   | ★★★ Few polished apps, results are GitHub repos | `/linux` landing + `/docs/desktop/installation` Linux section |
| **Windows**           | speech to text windows 11 (free / app / reddit), offline speech to text windows, best speech to text windows, superwhisper alternative for windows, wispr flow alternative for windows free, whisper dictation windows | ★★★ Big demand, competitors are Mac-first       | `/windows` landing                                            |
| **Alternatives**      | wispr flow alternative(s) (local / free / for windows / linux / reddit), superwhisper alternative(s) (windows / free / linux)                                                                                          | ★★★ High intent                                 | `/alternatives/wispr-flow`, `/alternatives/superwhisper`      |
| **Coding**            | voice to text for coding / vibe coding / claude code / vs code / ai coding, how to dictate to claude code in vscode                                                                                                    | ★★★ Matches snippets + profiles + hotkey        | `/use-cases/coding`                                           |
| **Offline / private** | offline speech to text (app / windows / free), private speech to text app, local whisper app, whisper local transcription app                                                                                          | ★★★ Core promise                                | Homepage H2s + `/privacy` copy                                |
| **Mac**               | speech to text mac (free / app / reddit), best dictation app for mac                                                                                                                                                   | ★★ Crowded                                      | `/mac` landing (later)                                        |
| **How-to**            | how to dictate on windows / mac / in word / in outlook, how to enable speech to text windows 11                                                                                                                        | ★★ Informational, top-of-funnel                 | Blog/guides (later)                                           |
| **Free**              | dictation app free, voice to text app for pc free, free dictation software windows                                                                                                                                     | ★★ OiPer's local use is free and unlimited      | Pricing + homepage copy                                       |

Skip: Android, iPhone, Apple Watch, medical dictation, text-to-speech. OiPer has no product for these.
