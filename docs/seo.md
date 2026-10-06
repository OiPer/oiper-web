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

### Must do

- [ ] Merge `seo` into `dev`, deploy, and run the checks in [Verify after each deploy](#verify-after-each-deploy)
- [ ] **Netlify:** make `oiper.com` the primary domain and 301 `desktop.oiper.com/*` → `https://oiper.com/:splat`. Today Netlify treats `desktop.oiper.com` as primary.
- [ ] Set the [environment variables](#environment-variables) in Netlify for prod and dev. `NEXT_PUBLIC_BASE_URL` is required: the build fails without it.
- [ ] **Search Console:** add a Domain property for `oiper.com` (DNS TXT covers all subdomains) and submit `https://oiper.com/sitemap.xml`.
- [ ] **Bing Webmaster Tools:** import from Search Console. ChatGPT search uses Bing's index.
- [ ] **Consent:** decide whether EU/UK visitors get a cookie banner before GA loads. The privacy policy already discloses GA.
- [ ] **Testimonials:** the three homepage quotes look like placeholders, and AI search already repeats them as real reviews. Replace them with real, attributable quotes or remove the section.
- [ ] **Speed claim:** pick one number and use it everywhere. The site and docs currently say 1 s, 1.5 s and "3.5x faster". A benchmarks page that shows the method would back it up.

### Later: content that wins search (biggest impact)

Competitors rank with these page types. OiPer has none yet.

- [ ] `/alternatives/wispr-flow` and `/alternatives/superwhisper`: an honest comparison of platforms, offline use, price and speed.
- [ ] `/linux` and `/windows`: few polished dictation apps exist for these, and most results are GitHub repos.
- [ ] `/use-cases/coding`: dictating into VS Code, Cursor and the Claude Code terminal, using snippets and the dictionary for jargon.
- [ ] `/benchmarks`: method, hardware and results.

### Later: off-site (AI assistants recommend brands that others mention)

- [ ] Add GitHub topics to `OiPer/desktop` (`speech-to-text`, `dictation`, `voice-typing`, `whisper`, `wispr-flow-alternative`, `tauri`) and a README with features, platforms and a link to oiper.com.
- [ ] Clean up the GitHub org: archive the unrelated `todo*` and `media-*` repos, and check that `oiper-web` is meant to be public.
- [ ] List OiPer on Product Hunt and AlternativeTo (as an alternative to Wispr Flow, Superwhisper and Dragon).
- [ ] Give honest answers in relevant Reddit threads (r/linux, r/software, r/ChatGPTCoding), open PRs to "awesome" dictation/Whisper lists, and post a short demo video.
- [ ] Create X, LinkedIn and YouTube profiles and add them to `sameAs` in `src/app/layout.tsx`.

### Later: smaller fixes

- [ ] Render the pricing cards on the server: move `useSearchParams` in `pricing-section.tsx` into a small child component.
- [ ] Trim the `/download` page DOM (about 6,700 nodes) and cache the GitHub releases fetch.
- [ ] `/resources/changelog?cursor=<unknown>` returns a `noindex` page with status 200 instead of 404.

## What the code does now

| Area            | Behaviour                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Domain          | `metadataBase`, canonicals and every absolute URL come from `NEXT_PUBLIC_BASE_URL`                                                                                                                                                                                                                                                                                                                                                   |
| Indexing        | `robots.txt` and `sitemap.xml` (home, download, changelog, every docs and resources page). Dev serves `Disallow: /` and `noindex` on every page. `/auth`, `/account` and `/dev` are `noindex`. Unknown docs URLs return 404                                                                                                                                                                                                          |
| Rendering       | The homepage is server-rendered. Only the pricing cards load in the browser                                                                                                                                                                                                                                                                                                                                                          |
| Metadata        | Every public page has its own title, a 120–160 char description, canonical, `og:url` and social card. Docs pages use `… \| OiPer Docs`                                                                                                                                                                                                                                                                                               |
| Images          | `favicon.ico`, `icon` (192 and 512), `apple-icon` and the manifest, all generated from `@oiper/logo`. Every page has a 1200×630 social card with an app screenshot                                                                                                                                                                                                                                                                   |
| Social copy     | OG titles and descriptions live in `src/features/seo/og-copy.ts`, separate from the SEO title and description. Titles are short Title Case that fits one line; descriptions are sentence case with few commas and no trailing period. Every page needs an entry: a page without one fails loudly instead of falling back                                                                                                             |
| Structured data | `Organization` + `WebSite` on every page. `SoftwareApplication` (live prices) + `FAQPage` on home. `TechArticle` + `BreadcrumbList` on docs                                                                                                                                                                                                                                                                                          |
| AI assistants   | `/llms.txt`, built from the docs                                                                                                                                                                                                                                                                                                                                                                                                     |
| PWA             | `public/sw.js`, registered in production only. Network only: `/api`, `/auth`, `/account`, `/dev`, download redirects (page loads show the offline screen when the network fails). Cache first: hashed JS/CSS, icons, images, social cards. Cached then refreshed in the background: home, docs, policy pages. Everything else: network first with cache fallback, then an offline page. Bump `VERSION` in `sw.js` to drop old caches |
| Analytics       | GA4 and the Search Console tag, each loaded only when its env var is set                                                                                                                                                                                                                                                                                                                                                             |

## Environment variables

One variable per concern. Each environment gets its own value.

| Variable                               | Production                                                | Development                        |
| -------------------------------------- | --------------------------------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_BASE_URL` (required)      | `https://oiper.com`                                       | `https://dev.oiper.com`            |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`        | `G-…` from the prod GA4 property                          | `G-…` from a separate dev property |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag token (skip if you verify by DNS) | not needed                         |

`NEXT_PUBLIC_BASE_URL` is the source of every absolute URL: canonicals, `og:url`, sitemap, `robots.txt`, structured data and `llms.txt`. Trailing slashes and surrounding spaces are stripped and the host is lowercased. A value with a path or query string fails at startup, and so does any value in production that isn't https or points at localhost. Locally, use `http://localhost:3000`.

For the other two, empty means the feature is off. A malformed GA ID stops the app at startup.

## Verify after each deploy

```bash
curl -s https://dev.oiper.com/ | grep -c "Everything you need"               # > 0: homepage is server-rendered
curl -s https://dev.oiper.com/ | grep -o '<meta name="robots"[^>]*>'           # noindex, nofollow
curl -s https://dev.oiper.com/robots.txt                                      # Disallow: /
curl -s -o /dev/null -w "%{http_code}\n" https://dev.oiper.com/docs/nope      # 404
curl -s https://oiper.com/ | grep -o 'rel="canonical" href="[^"]*"'           # https://oiper.com
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
