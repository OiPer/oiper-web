# Technical SEO Audit

AUDIT: oiper.com (prod) + dev.oiper.com (next release) — 2026-10-06
SCORE SUMMARY: 4 P0 · 10 P1 · 7 P2

Method: crawled every reachable page on `oiper.com`, `dev.oiper.com` and `desktop.oiper.com` with a Googlebot user agent (37 URLs each), read the raw HTML that crawlers receive, cross-checked against the source in `oiper-web/src`, and ran Lighthouse 12 locally (mobile + desktop) on the 4 key pages. Raw data lives in [`data/`](data/), scripts in the `seo/` suite of [oiper-test-suite](https://github.com/al-imam/oiper-test-suite).

> Note: Lighthouse scores SEO 100/100 on every page. That score is misleading here because Lighthouse only checks that a canonical tag exists, not that it points to the right domain.

---

## P0: losing traffic or blocking indexing

### 1. Every page tells Google that `desktop.oiper.com` is the real site

- **Evidence:** `src/app/layout.tsx:28` sets `metadataBase: 'https://desktop.oiper.com'` and `:83` sets `canonical: 'https://desktop.oiper.com'`. `og:url`, `og:image` and `authors.url` (lines 47 and 61) follow suit. All 37 pages on `oiper.com` emit `<link rel="canonical" href="https://desktop.oiper.com/...">`. `desktop.oiper.com` serves a byte-identical copy of the site, and `/download/mac` 307-redirects to `desktop.oiper.com/download`, which means Netlify treats `desktop.oiper.com` as the primary domain.
- **Effect:** the brand domain (`oiper.com`, which is also the GitHub homepage) is declared a duplicate. Ranking signals consolidate on a subdomain nobody links to. `site:oiper.com` returns only the homepage.
- **Fix:** derive `metadataBase` from the environment: `https://oiper.com` for prod, `https://dev.oiper.com` for dev. Make `oiper.com` the primary domain in Netlify and 301 `desktop.oiper.com/*` → `https://oiper.com/:splat`.

### 2. The dev homepage ships empty HTML, which blocks the next release

- **Evidence:** the `dev.oiper.com/` HTML contains `<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">`, 0 words and no H1. Prod's older build has 413 words. Lighthouse mobile LCP is 5.1 s on dev vs 3.3 s on prod.
- **Cause:** `src/features/landing-page/components/pricing-section.tsx:33` calls `useSearchParams()`. The only Suspense boundary above it is the one around `{children}` in `src/app/layout.tsx`, so Next.js drops the entire page to client rendering. The same code is in `oiper-web` and `web-2`, so prod breaks the moment this release ships.
- **Effect:** GPTBot, ClaudeBot and PerplexityBot don't run JavaScript, so they would see a blank homepage. Google renders JS later, but with delay and lower priority.
- **Fix:** wrap `<PricingSection>` in its own `<Suspense>`, or move the search-param logic into a small child component inside one. Verify with `curl -s https://dev.oiper.com/ | grep "Everything you need"`.

### 3. dev.oiper.com is open to indexing

- **Evidence:** `<meta name="robots" content="index, follow">`, no `robots.txt` (404) and no `X-Robots-Tag`. Dev also serves `/dev/subscription-states` (200, 2,313 words of internal UI states).
- **Effect:** dev can be indexed as a duplicate of prod, and it leaks unreleased pricing and UI.
- **Fix:** when `NEXT_PUBLIC_APP_ENV=development`, set `robots: { index: false, follow: false }` in the root metadata and serve a `robots.txt` with `Disallow: /`.

### 4. No `sitemap.xml` and no `robots.txt` on any host

- **Evidence:** both return 404 on `oiper.com` and `dev.oiper.com`.
- **Fix:** add `src/app/sitemap.ts` (static routes + every page from `docs-source` and `resources-source`) and `src/app/robots.ts`. Prod gets allow all, disallow `/account`, `/auth`, `/api`, `/dev`, plus the sitemap URL. Dev gets disallow all. Both use the built-in Next metadata routes, so no package is needed.

---

## P1: meaningful gaps vs competitors

| #   | Finding                                           | Evidence                                                                                                                                                                                                                                                                                             | Fix                                                                                                                                                                                                                              |
| --- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5   | **No structured data** anywhere                   | 0 JSON-LD blocks on 37 pages. 9 of 11 competitor sites ship it (see [competitors.md](competitors.md))                                                                                                                                                                                                | Home: `Organization` + `WebSite` + `SoftwareApplication` (OS, category, price from the pricing API, download URL). Docs: `TechArticle` + `BreadcrumbList`. Add `FAQPage` only when a visible FAQ exists                          |
| 6   | **No `llms.txt`**                                 | 404. 8 of 11 competitors have one                                                                                                                                                                                                                                                                    | `src/app/llms.txt/route.ts` built from the docs source (fumadocs ships a helper). Optional `llms-full.txt` with the full docs text                                                                                               |
| 7   | **`/download` canonical points to the homepage**  | `canonical=https://desktop.oiper.com`                                                                                                                                                                                                                                                                | It inherits the root layout canonical. Remove the canonical from the root and set one per page                                                                                                                                   |
| 8   | **Auth and account pages indexable**              | 9 URLs under `/auth/*` and `/account/*` return 200, `index, follow`, 0 words and a canonical pointing home                                                                                                                                                                                           | `noindex` in `account/layout.tsx` and on the auth pages. Keep them out of the sitemap                                                                                                                                            |
| 9   | **Same social card on every page**                | `og:title`, `og:url` and `og:image` are inherited from root, so a shared docs page shows the homepage card                                                                                                                                                                                           | Per-page `openGraph` in the docs and resources `generateMetadata`                                                                                                                                                                |
| 10  | **Homepage copy is thin and misses search terms** | 413 words (competitors: about 1,100–2,300). H1 "Type at the speed of speech." No H1 or H2 contains _dictation_, _speech to text_, _Windows_, _Mac_ or _Linux_. Description is 204 chars (gets cut)                                                                                                   | Title like `OiPer: Private Voice Dictation for Windows, Mac & Linux`, a description ≤155 chars, one H2 per platform/use case, and an FAQ section with real Q&A                                                                   |
| 11  | **Testimonials look like placeholders**           | "Sarah Chen / Marcus Okafor / Elena Rossi" with initials only, hard-coded in `testimonials-section.tsx`. A search for "OiPer review" already returns them as **real user reviews** in AI answers                                                                                                     | If they aren't real people, remove them or replace them with real, attributable quotes (GitHub issues, Reddit, users who gave permission). Fake reviews violate the FTC rule (16 CFR Part 465) and can't go into `Review` schema |
| 12  | **Contradictory claims**                          | Home: "Speech never leaves your device. Ever." But the Terms cover hosted transcription, v0.1.x added ElevenLabs as a cloud provider, and dev pricing sells hosted plans. Benchmarks disagree too: `docs/sections.md` says 1 s, `docs/oiper-desktop.md` says 1.5 s, and the site says "3.5x"/"3.46x" | One line used everywhere: _"Local by default. Cloud is optional and opt-in."_ Plus one benchmark with a methodology page (Superwhisper has 17 `/benchmarks` pages)                                                               |
| 13  | **Broken web manifest**                           | The layout links `/manifest.json`, which returns 404 (Next serves `/manifest.webmanifest`). The manifest icon `/favicon.ico` also returns 404. No `apple-touch-icon`                                                                                                                                 | Delete `manifest: '/manifest.json'` from the layout (Next links `manifest.ts` automatically) and point the icon at `/icon`                                                                                                       |
| 14  | **The live prod site is stale vs the code**       | Prod lacks the security headers from `next.config.mjs`, still sends `X-Powered-By` and shows static "Coming Soon" pricing. The next release replaces all of this                                                                                                                                     | Ship fixes 1–4 in the same release that ships the new pricing, otherwise #2 goes live                                                                                                                                            |

---

## P2: hygiene

| #   | Finding                                | Evidence                                                                                                                                   | Fix                                                                                                                                       |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 15  | Docs titles and descriptions too short | Titles 14–24 chars ("Models \| OiPer"), descriptions 37–103 chars                                                                          | Template `%s · OiPer Docs`. Rewrite frontmatter descriptions to 120–155 chars with the task and keyword ("Choose a local Whisper model…") |
| 16  | Mobile performance (lab)               | Home mobile perf 83, LCP 3.3 s, TBT 280 ms, about 137 KiB unused JS (amCharts globe, GSAP, framer-motion). `/download` has 6,695 DOM nodes | Lazy-load the globe and performance canvas below the fold with `next/dynamic`, size the images, trim the download page DOM                |
| 17  | Accessibility                          | Home a11y 90: `button-name`, `color-contrast`                                                                                              | Add `aria-label` to icon buttons and raise the contrast of `text-white/40` copy                                                           |
| 18  | Slow server response                   | TTFB 610–1,090 ms (Netlify + ISR). `/download` is the slowest                                                                              | Cache `/download` and the GitHub releases fetch (`revalidate`)                                                                            |
| 19  | Duplicate download text in the HTML    | "Download for Linux" ×3 and nav "Download" ×6, because responsive variants render in the DOM                                               | Low priority. Make sure one variant is the main link                                                                                      |
| 20  | `http://www` takes 2 hops              | `http://www.oiper.com` → `https://www.oiper.com` → `https://oiper.com`                                                                     | One Netlify redirect rule to the apex domain                                                                                              |
| 21  | Generic title on auth pages            | `/auth/login`, `/auth/desktop` and `/account/*` use the home title                                                                         | Fixed by #8 (noindex). Titles are cosmetic after that                                                                                     |

---

## Per-page results (prod vs dev)

| Path                                                                     | Prod | Dev     | Title (len)                              | Desc len | H1  | Words prod/dev | Canonical             | Issues                                                       |
| ------------------------------------------------------------------------ | ---- | ------- | ---------------------------------------- | -------- | --- | -------------- | --------------------- | ------------------------------------------------------------ |
| /                                                                        | 200  | 200     | OiPer / Privacy-First Voice-to-Text (35) | 204      | 1   | 413/**0**      | desktop.oiper.com     | wrong canonical; desc too long; DEV empty HTML; no schema    |
| /download                                                                | 200  | 200     | Download / OiPer (16)                    | 44       | 1   | 1519/1496      | desktop.oiper.com     | **canonical→home**; short title/desc; no schema              |
| /docs                                                                    | 200  | 200     | Documentation / OiPer (21)               | 63       | 1   | 144/144        | desktop…/docs         | wrong canonical; short title/desc                            |
| /docs/desktop                                                            | 200  | 200     | OiPer Desktop / OiPer (21)               | 71       | 1   | 270/270        | desktop…/docs/desktop | wrong canonical; short title/desc                            |
| /docs/desktop/quickstart                                                 | 200  | 200     | Quickstart / OiPer (18)                  | 57       | 1   | 359/359        | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/installation                                               | 200  | 200     | Installation / OiPer (20)                | 76       | 1   | 260/260        | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/models                                                     | 200  | 200     | Models / OiPer (14)                      | 74       | 1   | 486/486        | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/settings                                                   | 200  | 200     | Settings / OiPer (16)                    | 68       | 1   | 399/399        | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/profiles                                                   | 200  | 200     | Profiles / OiPer (16)                    | 84       | 1   | 452/452        | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/dictionary                                                 | 200  | 200     | Dictionary / OiPer (18)                  | 60       | 1   | —              | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/snippets                                                   | 200  | 200     | Snippets / OiPer (16)                    | 47       | 1   | 234/234        | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/formatting                                                 | 200  | 200     | Formatting / OiPer (18)                  | 69       | 1   | 369/369        | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/history                                                    | 200  | 200     | History / OiPer (15)                     | 68       | 1   | 296/296        | desktop…              | wrong canonical; short title/desc                            |
| /docs/desktop/troubleshooting                                            | 200  | 200     | Troubleshooting / OiPer (23)             | 83       | 1   | 480/480        | desktop…              | wrong canonical; short title/desc                            |
| /docs/snippets                                                           | 200  | 200     | Snippets / OiPer (16)                    | 103      | 1   | 307/307        | desktop…              | wrong canonical; duplicate title with /docs/desktop/snippets |
| /docs/snippets/configuration                                             | 200  | 200     | Configuration / OiPer (21)               | 64       | 1   | 351/351        | desktop…              | wrong canonical; short title/desc                            |
| /docs/snippets/matching                                                  | 200  | 200     | Matching / OiPer (16)                    | 58       | 1   | 433/433        | desktop…              | wrong canonical; short title/desc                            |
| /docs/snippets/rust                                                      | 200  | 200     | Rust API / OiPer (16)                    | 79       | 1   | 363/363        | desktop…              | wrong canonical; short title/desc                            |
| /docs/snippets/typescript                                                | 200  | 200     | TypeScript API / OiPer (22)              | 77       | 1   | 309/309        | desktop…              | wrong canonical; short title/desc                            |
| /resources                                                               | 200  | 200     | Resources / OiPer (17)                   | 42       | 1   | 99/99          | desktop…              | wrong canonical; thin                                        |
| /resources/changelog                                                     | 200  | 200     | Changelog / OiPer (17)                   | 37       | 1   | 2232/2679      | desktop…              | wrong canonical; short desc                                  |
| /resources/privacy-policy                                                | 200  | 200     | Privacy Policy / OiPer (22)              | 77       | 1   | 798/798        | desktop…              | wrong canonical                                              |
| /resources/security                                                      | 200  | 200     | Security & Data Handling / OiPer (32)    | 84       | 1   | 560/560        | desktop…              | wrong canonical                                              |
| /resources/terms-of-service                                              | 200  | 200     | Terms of Service / OiPer (24)            | 82       | 1   | 834/834        | desktop…              | wrong canonical                                              |
| /auth/login, /signin, /signup, /forgot-password, /verify-email, /desktop | 200  | 200     | mixed                                    | —        | 0   | 0/0            | desktop.oiper.com     | **should be noindex**; canonical→home                        |
| /account, /account/billing (+ settings, security, usage)                 | 200  | 200     | home title                               | 204      | 0   | 0/0            | desktop.oiper.com     | **should be noindex**                                        |
| /dev/subscription-states                                                 | 404  | **200** | home title                               | —        | 1   | 6/2313         | —                     | dev-only route; covered by #3                                |

Every page: no JSON-LD, `og:url` = homepage.

## Site-level checks

| Check                                                                               | oiper.com  | dev.oiper.com |
| ----------------------------------------------------------------------------------- | ---------- | ------------- |
| robots.txt                                                                          | 404        | 404           |
| sitemap.xml                                                                         | 404        | 404           |
| llms.txt                                                                            | 404        | 404           |
| HTTPS + HSTS                                                                        | ✅         | ✅            |
| AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot, Bingbot) | ✅ all 200 | ✅ all 200    |
| Homepage server-rendered                                                            | ✅         | ❌            |
| Lighthouse mobile perf / LCP                                                        | 83 / 3.3 s | 67 / 5.1 s    |
| Lighthouse desktop perf / LCP                                                       | 91 / 1.5 s | 86 / 1.9 s    |
| `/docs/desktop/quickstart` mobile                                                   | 98 / 1.7 s | —             |
| `/download` mobile                                                                  | 85 / 3.8 s | —             |

## NOT CHECKED

- **Search Console data** (rankings, queries, quick wins, decay, cannibalisation). There's no property yet. Re-run the audit 4–6 weeks after Search Console is live.
- **CrUX field data (real users).** The free PageSpeed API quota was exhausted (HTTP 429), so local Lighthouse lab data is used instead. The site is probably too small for CrUX data to exist anyway.
- **Backlinks.** No free tool works without an account.
