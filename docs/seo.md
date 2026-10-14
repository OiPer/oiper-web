# SEO

What's in place, what's left to do, and how to check it. Research baseline: 2026-10-06.

## Where we started

- Google had indexed **1 page** (the homepage). Every page declared `desktop.oiper.com` as its canonical URL.
- AI search answers never mentioned OiPer for buyer questions such as "Wispr Flow alternative for Linux" or "voice to text for coding". Competitors like Wispr Flow, Superwhisper, Handy and OpenWhispr showed up every time.
- There were no third-party mentions. OiPer only existed on oiper.com and GitHub.

## Tracker

### Done (2026-10-06, branch `seo`)

- [x] Researched oiper.com, dev.oiper.com and 11 competitors. Baseline crawl data is in [oiper-test-suite](https://github.com/al-imam/oiper-test-suite) `seo/results`
- [x] Fixed the homepage HTML: it would have been empty for crawlers in the next release
- [x] Canonical domain is now oiper.com (it was `desktop.oiper.com`), set by `NEXT_PUBLIC_BASE_URL`
- [x] Added `robots.txt` and `sitemap.xml`. Dev is `noindex`, as are the auth, account and dev pages
- [x] Unknown docs URLs return a real 404
- [x] Every public page has its own title, description, canonical and social card (home, download and changelog each have a custom card; docs and policies get a card per page). All 21 docs descriptions rewritten
- [x] Generated the favicon, app icons, manifest and social cards from the logo. Deleted the oversized `og.png`
- [x] Added structured data: Organization, WebSite, SoftwareApplication, FAQPage, TechArticle, BreadcrumbList
- [x] Added `/llms.txt` for AI assistants
- [x] GA4 and Search Console verification, switched on per environment
- [x] Homepage FAQ section. The hero now names the platforms
- [x] Lazy-loaded the 3D globe, gave the flag images sizes, labeled the menu button, improved text contrast
- [x] Docs cover Linux (downloads, text-typing tools, data folders). The privacy policy discloses GA
- [x] Moved the SEO scripts into `oiper-test-suite/seo` (`seo:audit` checks every page, `seo/previews.js` saves every social card and icon)
- [x] Sign-in, account and 404 pages have their own titles, descriptions and social cards
- [x] PWA per the official Next.js guide: manifest with 192/512 icons and screenshots, theme color, hand-written `public/sw.js`, offline page

### Done (2026-10-12, branch `seo-growth`)

Research behind these is in [`docs/seo-research/`](seo-research): how AI assistants pick tools ([ai-search](seo-research/ai-search.md)), Google and Bing guidance ([google-bing](seo-research/google-bing.md)), real searches and who ranks ([keywords](seo-research/keywords.md)), and where to get listed ([backlinks](seo-research/backlinks.md)).

- [x] IndexNow key at `/c445d9414aa2aca65edc783c23768f2a.txt`; `npm run seo:indexnow` in oiper-test-suite submits every sitemap URL to Bing, Yandex and others (ChatGPT search and Copilot lean on Bing)
- [x] Pricing cards render in the server HTML (AI crawlers don't run JavaScript, and ChatGPT checks a brand's own site for price and platforms). Not verifiable locally: confirm with the check in [Verify after each deploy](#verify-after-each-deploy)
- [x] `/pricing`: free local, your own API key, and Pro/Max explained, with live offers in `SoftwareApplication`
- [x] `/alternatives` hub plus comparisons with Dragon, Windows voice typing, Apple Dictation, MacWhisper, VoiceInk, Aqua Voice and Handy. Every competitor claim was checked on the competitor's own site on 2026-10-12. OpenWhispr was skipped: it matches OiPer on almost everything and is open source, so an honest page would be thin
- [x] Topic pages: `/whisper-desktop-app`, `/offline-speech-to-text`, `/free-dictation-software`, `/bring-your-own-api-key`
- [x] Use cases and Linux: `/use-cases/claude-code` (vs Claude Code's built-in `/voice`), `/use-cases/accessibility`, `/linux/wayland`, `/linux/ubuntu`
- [x] `/tools/speech-to-text`: free in-browser Whisper (record or upload, nothing uploaded) aimed at "speech to text" (33k/mo US) and "audio to text" (22k/mo). Tested with a real WAV: the transcript was word for word
- [x] Every guide shows a visible "Updated" date and `dateModified`; comparison titles carry the year
- [x] Fixed an overclaim: the dictionary applies only in cloud and OiPer modes, never local Whisper. Every page now says so
- [x] Footer groups guides into Guides, Compare and Use cases so every page is linked from every page
- [x] `sitemap.xml` carries `lastmod`: each guide's `updated` date, and each docs and policy page's last git commit (fumadocs `lastModified`). Pages without a real date get none
- [x] Docs and policy pages show "Last updated" and set `dateModified`
- [x] Guide pages describe themselves fully in structured data (description, image, language, site, publisher) and point at the app with `about`
- [x] One `SoftwareApplication` with `@id` `/#software` shared by home, pricing and the guides; home adds `softwareVersion` (latest release) and five screenshots
- [x] Changelog RSS feed at `/resources/changelog/feed.xml`, linked from the changelog page
- [x] `robots.txt` blocks `/download/` so crawlers don't fetch installers (the `/download` page stays crawlable)
- [x] Platform guides link straight to the installer (`/download/<platform>`, `.deb` on `/linux/ubuntu`) instead of `/download?platform=`

### Must do (you)

- [ ] Merge `seo-growth` into `dev`, deploy, run [Verify after each deploy](#verify-after-each-deploy), then ship to prod
- [ ] After each **prod** deploy: `npm run seo:indexnow` in oiper-test-suite
- [ ] **Search Console:** Domain property for `oiper.com`, submit `https://oiper.com/sitemap.xml`, then URL Inspection → Request indexing for `/`, `/pricing`, `/download`, `/windows`, `/mac`, `/linux`, `/alternatives`, `/alternatives/wispr-flow`, `/tools/speech-to-text`, `/whisper-desktop-app` (about 10 a day)
- [ ] **Bing Webmaster Tools:** import from Search Console and turn on the AI Performance report (shows Copilot citations and the searches it ran)
- [ ] **Cloudflare:** Security → Bots / AI Crawl Control: make sure AI crawlers are allowed (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot, Claude-User, GPTBot, ClaudeBot). Our robots.txt allows them, but Cloudflare can block them silently
- [ ] **Netlify:** `desktop.oiper.com` doesn't resolve at all. Either remove it or 301 `desktop.oiper.com/*` to `https://oiper.com/:splat`
- [ ] **Brave Search** (powers Claude's web search): submit `https://oiper.com` at search.brave.com/submit-url
- [ ] Confirm a fact the new pages state: using your own API key needs no account and no paid plan
- [ ] **Desktop app bug** found while writing `/linux/wayland`: on GNOME Wayland, if `wtype` is installed OiPer tries it first, it fails (GNOME doesn't support it), and there's no fallback to `dotool`/`ydotool`. Fix the fallback in `injection_linux.rs`
- [ ] Recheck `/linux/ubuntu` once Ubuntu 26.10 ships (expected Oct 15): it describes the Myna voice typing feature as "aimed at 26.10"

- [ ] Home page `<h1>` ("Type at the speed of speech.") has no search words. Pick wording that names dictation or voice to text

### Biggest levers left (ranked)

AI assistants mostly recommend apps that other sites mention. In one ChatGPT study only 11.6% of software recommendations cited the vendor's own site, and "best X" lists made up 43.8% of cited pages. Off-site work matters more than anything else below.

1. **Get into the "best dictation app" lists AI already cites:** TechCrunch (Ivan Mehta, May 2026), ZDNet's Linux dictation roundup, AssemblyAI's Wispr Flow alternatives, Zapier's dictation list, Online Tech Tips, CodePick (GitHub issue), iTechGuides ($99 listing). Lead with Linux + Wayland + offline + no account. Contacts are in [backlinks](seo-research/backlinks.md)
2. **Sign the Windows build and notarize the Mac build.** Unsigned and unnotarized installers block the Microsoft Store and official Homebrew, trigger SmartScreen on every download site, and put reviewers off
3. **Directories (you):** AlternativeTo as an alternative to Wispr Flow, Superwhisper, Dragon, Windows Voice Typing, VoiceInk and Handy; SaaSHub; Product Hunt launch; DevHunt, Uneed, Peerlist, Microlaunch, Fazier; There's An AI For That ($49); G2 and Capterra for real reviews
4. **Communities (you, as the founder, openly):** Show HN, a reply in the recent Ask HN about non-cloud Wispr Flow alternatives, and honest answers in r/macapps, r/software, r/windowsapps and r/linux threads. Pitch OMG! Ubuntu, Linuxiac and 9to5Linux on Wayland support and the Ubuntu 26.10 Myna news. Reddit removes astroturfing, so only real participation works
5. **GitHub PRs (Claude can open these with your OK once prod is live):** winget manifest, awesome-mac (Voice-to-Text), sindresorhus/awesome-whisper, awesome-tauri-apps, awesome-ai-coding-tools, Awesome-Linux-Software, danielrosehill/Awesome-Whisper-Apps; AUR `oiper-bin` and a Chocolatey package (drafted for you to publish). Flathub forbids AI-opened submissions, so that one is yours
6. **Open-sourcing the desktop client** would unlock the strongest lists in this space (awesome-privacy, Privacy Guides, OpenAlternative, awesome-voice-typing). A product decision, noted only
7. **A YouTube demo** (YouTube is 20–30% of AI Overview and Perplexity citations), and X, LinkedIn and YouTube profiles added to `sameAs` in `src/app/layout.tsx`
8. **`/benchmarks` with real numbers** (original data is the most-cited content type). Needs real measurements; don't publish estimates
9. **An About page with real people**, author bylines on guides, and checksums on `/download` (trust signals Google looks for on download sites)

### Content still worth adding (from [keywords](seo-research/keywords.md))

- [ ] `/windows/windows-11` (voice to text Windows 11) once `/windows` is indexed
- [ ] `/compare/superwhisper-vs-wispr-flow` (the strongest "X vs Y" search with no OiPer in it), written as a fair three-way table
- [ ] `/use-cases/cursor`, writing, students: only where settings or workflow differ, never a noun swap
- [ ] 2–4 translated sections (es, de, pt-BR) by a native speaker with hreflang. Don't auto-translate 99 languages: Google's spam policy names it
- [ ] ⚠️ Don't publish our own "best dictation apps" list ranking OiPer first: sites doing this lost Google visibility in 2026, and AI Overviews skipped the publisher 69% of the time

### Later: smaller fixes

- [x] Render the pricing cards on the server
- [x] `/download` shows one release: the newest of the last 10 with the most builds, or the release named by `?version=` (the latest when that version does not exist). The `/download/<platform>` links use the same release.
- [x] `/resources/changelog?cursor=<unknown>` returns 200 with `noindex`. Intended: the root layout streams before the page can call `notFound()`, and Next marks streamed 404s `noindex`, so they are never indexed. A real 404 would need a GitHub fetch in the proxy.
- [ ] `aggregateRating` in `SoftwareApplication` once real reviews are shown on the page (needed for star and price rich results; never copy ratings from other sites)

## What the code does now

| Area            | Behaviour                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain          | `metadataBase`, canonicals and every absolute URL come from `NEXT_PUBLIC_BASE_URL`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Indexing        | `robots.txt` and `sitemap.xml` (home, download, changelog, every docs and resources page). Dev serves `Disallow: /` and `noindex` on every page. `/auth`, `/account` and `/dev` are `noindex`. Unknown docs URLs return 404                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Rendering       | The homepage is server-rendered. Only the pricing cards load in the browser                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Metadata        | Every public page has its own title, a 120–160 char description, canonical, `og:url` and social card. Docs pages use `… \| OiPer Docs`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Images          | `favicon.ico`, `icon` (192 and 512), `apple-icon` and the manifest, all generated from `@oiper/brand`. Every page has a 1200×630 social card with an app screenshot                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Social copy     | OG titles and descriptions live in `src/features/seo/app-pages.ts`, separate from the SEO title and description. Titles are short Title Case that fits one line; descriptions are sentence case with few commas and no trailing period. Every page needs an entry: a page without one fails loudly instead of falling back                                                                                                                                                                                                                                                                                                                                                             |
| Structured data | `Organization` + `WebSite` on every page. `SoftwareApplication` (live prices) + `FAQPage` on home. `TechArticle` + `BreadcrumbList` on docs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| AI assistants   | `/llms.txt`, built from the docs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| PWA             | Installable app: manifest with any and maskable icons, Apple touch icon and iOS web-app tags, five wide install screenshots, shortcuts to Download and Docs. `public/sw.js`, registered in production only. Network only: `/api`, `/auth`, `/account`, `/dev`, download redirects (page loads show the offline screen when the network fails). Cache first: hashed JS/CSS, icons, images, social cards. Every page: network first, falling back to the cached copy and then the offline page when the network fails. Pages are never served from cache first, because after a deploy cached HTML points at JS files that no longer exist. Bump `VERSION` in `sw.js` to drop old caches |
| Analytics       | GA4, loaded only when its env var is set                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Environment variables

One variable per concern. Each environment gets its own value.

| Variable                          | Production                         | Development                        |
| --------------------------------- | ---------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_BASE_URL` (required) | `https://oiper.com`                | `https://dev.oiper.com`            |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`   | `G-…` from the prod GA4 property   | `G-…` from a separate dev property |
| `GITHUB_TOKEN`                    | Read-only token, public repos only | Same token                         |

`NEXT_PUBLIC_BASE_URL` is the source of every absolute URL: canonicals, `og:url`, sitemap, `robots.txt`, structured data and `llms.txt`. Trailing slashes and surrounding spaces are stripped and the host is lowercased. A value with a path or query string fails at startup, and so does any value in production that isn't https or points at localhost. Locally, use `http://localhost:3000`.

For `NEXT_PUBLIC_GA_MEASUREMENT_ID`, empty means GA is off. A malformed GA ID stops the app at startup.

## Verify after each deploy

```bash
curl -s https://dev.oiper.com/ | grep -c "Everything you need"               # > 0: homepage is server-rendered
curl -s https://dev.oiper.com/ | grep -o '<meta name="robots"[^>]*>'           # noindex, nofollow
curl -s https://dev.oiper.com/robots.txt                                      # Disallow: /
curl -s -o /dev/null -w "%{http_code}\n" https://dev.oiper.com/docs/nope      # 404
curl -s https://oiper.com/ | grep -o 'rel="canonical" href="[^"]*"'           # https://oiper.com
curl -s https://oiper.com/ | grep -c 'id="pricing"'                          # > 0: pricing cards are server-rendered
curl -s https://oiper.com/sitemap.xml | grep -c '<loc>'                       # 48 or more
curl -s https://oiper.com/sitemap.xml | grep -c '<lastmod>'                   # > 40: guides and docs have dates
curl -s https://oiper.com/resources/changelog/feed.xml | grep -c '<item>'     # > 0: RSS feed works
curl -s https://oiper.com/robots.txt | grep 'Disallow: /download/'            # installers blocked
curl -sI https://desktop.oiper.com/docs | grep -i location                    # 301 to oiper.com (after the Netlify change)
```

Then run the [Rich Results Test](https://search.google.com/test/rich-results) and an [opengraph.xyz](https://www.opengraph.xyz/) preview on `/` and one docs page.

## Keep checking

- **Monthly:** search these buyer questions and note who gets recommended:
  1. best free offline dictation app for Windows
  2. Wispr Flow alternative for Linux
  3. voice to text for coding
  4. private speech to text app that works offline
  5. Superwhisper alternative for Windows
- **4–6 weeks after Search Console goes live:** connect the GSC MCP (`claude mcp add gsc -- npx -y mcp-server-gsc`) and run the `audit` skill in `W:/tauri/.claude/skills/` to get real rankings and quick wins.
- **Audit every page:** `npm run seo:audit` in [oiper-test-suite](https://github.com/al-imam/oiper-test-suite) checks each sitemap page for a unique 1200×630 social image, matching canonical/`og:url`, and valid structured data (use `node seo/audit.js https://dev.oiper.com` for dev). `seo:crawl`, `seo:table`, `seo:competitors` and `seo:keywords` re-run the research against the 2026-10-06 baseline.

## Research notes

**Positioning:** the fastest private dictation app that works the same on Windows, macOS and Linux. Premium competitors are Mac-first (Superwhisper, VoiceInk, MacWhisper) or skip Linux (Wispr Flow). The free Linux tools (Handy, OpenWhispr, Voquill) are open source with rougher UX. OiPer isn't open source, so never claim it is.

**Real searches people type** (Google Autocomplete), in priority order:

| Cluster           | Examples                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| Linux             | speech to text linux (ubuntu / mint / local), voice typing for linux, wispr flow alternative linux           |
| Windows           | speech to text windows 11 (free / app), offline speech to text windows, superwhisper alternative for windows |
| Alternatives      | wispr flow alternative (local / free / open source), superwhisper alternative                                |
| Coding            | voice to text for coding / vibe coding / claude code / vs code                                               |
| Private / offline | offline speech to text app, private speech to text, local whisper app                                        |

**Brand:** "OiPer review" searches get mixed up with Zoiper (a VoIP softphone). Keep using "OiPer" consistently, along with the `Organization` schema.
