# SEO Plan

DIAGNOSIS: oiper.com + dev.oiper.com — 2026-10-06
Sources: [audit.md](audit.md), [visibility.md](visibility.md), [competitors.md](competitors.md)

Impact (1–5) is traced to evidence in those reports. Effort (1–5): 1 = under an hour of code, 3 = a page of content, 5 = ongoing work.

## Ranked fixes

| #   | Fix                                            | Impact | Effort | Why (evidence)                                                                                                                                        | How                                                                                                                                                                                                                                                                                                                     |
| --- | ---------------------------------------------- | ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Canonical domain = oiper.com**               | 5      | 1      | All 37 pages canonicalize to desktop.oiper.com, and only the homepage is indexed                                                                      | `metadataBase` from env (`https://oiper.com` / `https://dev.oiper.com`) in `src/app/layout.tsx`. Netlify: primary domain oiper.com, 301 `desktop.oiper.com/*` → `oiper.com/:splat`                                                                                                                                      |
| 2   | **Fix the empty dev homepage**                 | 5      | 1      | CSR bailout, 0 words in the HTML, mobile LCP 5.1 s. Ships to prod with this release                                                                   | `<Suspense>` around `<PricingSection>` (or around the child that reads `useSearchParams`)                                                                                                                                                                                                                               |
| 3   | **Dev = noindex**                              | 4      | 1      | dev is `index, follow` with no robots.txt                                                                                                             | `robots: { index: false, follow: false }` when `env.APP_ENV === 'development'`. `robots.ts` returns `Disallow: /` on dev                                                                                                                                                                                                |
| 4   | **sitemap.xml + robots.txt**                   | 4      | 1      | Both 404                                                                                                                                              | `src/app/sitemap.ts` (static routes + `docsSource.getPages()` + `resourcesSource.getPages()`). `src/app/robots.ts` disallows `/account`, `/auth`, `/api`, `/dev` and links the sitemap. Prod only                                                                                                                       |
| 5   | **Per-page canonical + noindex private pages** | 3      | 1      | `/download` canonical → home. 9 auth/account URLs indexable with 0 words                                                                              | Remove `alternates.canonical` from the root layout and set one per page (docs, resources, download, home). `robots: noindex` in `account/layout.tsx` and the auth pages                                                                                                                                                 |
| 6   | **Settle claims + testimonials**               | 3      | 1      | "Never leaves your device. Ever." vs hosted plans. Benchmarks say 1 s / 1.5 s / 3.5x. AI already quotes the placeholder testimonials as real          | One message: _Local by default, cloud optional._ One benchmark figure. Real testimonials or none. _(Your decision, see below)_                                                                                                                                                                                          |
| 7   | **Homepage title, description, headings**      | 4      | 2      | 413 words, no platform or "dictation" terms in H1/H2, description 204 chars                                                                           | Title `OiPer: Private Voice Dictation for Windows, Mac & Linux` (55). Description ≤155 chars. H2s naming Windows / Mac / Linux, offline, coding. Add a real FAQ block (questions below)                                                                                                                                 |
| 8   | **Structured data**                            | 4      | 2      | 0 JSON-LD. 9 of 11 competitors have it                                                                                                                | Home: `Organization` (name, url, logo, `sameAs` GitHub + socials), `WebSite`, `SoftwareApplication` (`operatingSystem: "Windows, macOS, Linux"`, `applicationCategory: "UtilitiesApplication"`, `offers` from `/v1/pricing`, `downloadUrl`). Docs: `TechArticle` + `BreadcrumbList`. `FAQPage` matching the visible FAQ |
| 9   | **llms.txt**                                   | 3      | 2      | 404. 8 of 11 competitors have one                                                                                                                     | `src/app/llms.txt/route.ts`: who OiPer is, platforms, local-first, pricing, key pages. `llms-full.txt` from the docs source                                                                                                                                                                                             |
| 10  | **Measurement: GA4, Search Console, Bing**     | 3      | 1      | Nothing is measured today. ChatGPT search uses Bing's index                                                                                           | See "GA4 & Search Console" below                                                                                                                                                                                                                                                                                        |
| 11  | **GitHub repo topics + org cleanup**           | 2      | 1      | The `wispr-flow-alternative` topic page ranks. The org is mixed with todo repos                                                                       | Add topics to `OiPer/desktop`, archive unrelated repos, put a short feature + platform list in the README with a link to oiper.com                                                                                                                                                                                      |
| 12  | **Comparison pages**                           | 5      | 3      | Every competitor ranks with them. "wispr flow alternative (windows/linux/local/free)" and "superwhisper alternative (windows/linux)" are real queries | `/alternatives/wispr-flow`, `/alternatives/superwhisper`. Honest table: platforms, local/offline, price, speed                                                                                                                                                                                                          |
| 13  | **Platform landing pages**                     | 4      | 3      | Linux and Windows dictation results are mostly GitHub repos or Mac-first apps                                                                         | `/linux`, `/windows` (later `/mac`): install steps, distro/OS notes, hotkey, local models, FAQ                                                                                                                                                                                                                          |
| 14  | **Coding use-case page**                       | 4      | 3      | "voice to text for coding / vibe coding / claude code" queries. Wispr Flow and Superwhisper own them                                                  | `/use-cases/coding`: dictate into Cursor / VS Code / Claude Code terminal, snippets, dictionary for jargon                                                                                                                                                                                                              |
| 15  | **Corroboration off-site**                     | 4      | 4      | 0 third-party mentions. AI skips brands that only exist on their own site                                                                             | Product Hunt launch, AlternativeTo listing (as an alternative to Wispr Flow, Superwhisper, Dragon), honest Reddit answers (r/linux, r/software, r/ChatGPTCoding), PRs to "awesome whisper/dictation" lists, a YouTube demo                                                                                              |
| 16  | **Docs titles + descriptions**                 | 2      | 2      | Titles 14–24 chars, descriptions 37–103 chars                                                                                                         | Title template `%s · OiPer Docs`. Rewrite frontmatter `description` to 120–155 chars                                                                                                                                                                                                                                    |
| 17  | **Mobile performance**                         | 2      | 2      | Mobile LCP 3.3 s, 137 KiB unused JS, /download 6,695 DOM nodes                                                                                        | `next/dynamic` the amCharts globe and performance canvas, size images, slim the download page                                                                                                                                                                                                                           |
| 18  | **Manifest + icons**                           | 1      | 1      | `/manifest.json` 404, `/favicon.ico` 404                                                                                                              | Remove `manifest: '/manifest.json'` from the layout and point the manifest icon at `/icon`                                                                                                                                                                                                                              |

Fixes 1–5, 7–9, 16–18 are code changes I can make. 6 needs your decision. 10 needs your accounts. 11 and 15 are off-site actions. 12–14 are new content, which I can draft.

## Questions buyers ask that the site never answers

Taken from autocomplete ([`data/keywords.json`](data/keywords.json)) and checked against all 24 indexable pages. None of them answers these.

| Question                                                           | Where it should live                        |
| ------------------------------------------------------------------ | ------------------------------------------- |
| Does OiPer work offline?                                           | Home FAQ + `/docs/desktop/models`           |
| Is OiPer free? What's the difference between free and paid?        | Home FAQ (pricing)                          |
| Does it work on Linux (Ubuntu, Mint, Fedora, Wayland vs X11)?      | `/linux` + installation docs                |
| How do I get speech to text on Windows 11 that works in every app? | `/windows`                                  |
| Is OiPer a good Wispr Flow / Superwhisper alternative?             | `/alternatives/*`                           |
| Can I dictate into VS Code, Cursor or Claude Code?                 | `/use-cases/coding`                         |
| Which languages are supported?                                     | Home FAQ + models docs                      |
| Does my audio get uploaded? What happens with cloud models?        | Home FAQ + `/resources/security`            |
| What hardware do I need (GPU / CUDA, RAM, Apple Silicon)?          | Installation docs + FAQ                     |
| How fast is it compared with Whisper / cloud APIs?                 | A `/benchmarks` page with method + hardware |

## GA4 & Search Console

You set up the accounts. I'll do the code.

**What I need from you**

| Item                 | Prod (oiper.com)                                                                         | Dev (dev.oiper.com)                                |
| -------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------- |
| GA4 measurement ID   | `G-…` from a "OiPer" property                                                            | `G-…` from a separate "OiPer Dev" property         |
| Search Console       | Domain property `oiper.com`, verified by DNS TXT. Covers every subdomain, no code needed | Covered by the domain property (dev stays noindex) |
| Sitemap to submit    | `https://oiper.com/sitemap.xml` (exists after fix #4)                                    | none                                               |
| Bing Webmaster Tools | Import from Search Console (one click)                                                   | none                                               |

**How the code will behave**

|                | Prod                                        | Dev                                                    |
| -------------- | ------------------------------------------- | ------------------------------------------------------ |
| Analytics ID   | `NEXT_PUBLIC_GA_ID` (prod ID)               | `NEXT_PUBLIC_GA_ID` (dev ID). Unset means no analytics |
| robots meta    | index, follow                               | noindex, nofollow                                      |
| robots.txt     | allow, with private paths blocked + sitemap | `Disallow: /`                                          |
| sitemap.xml    | yes                                         | no                                                     |
| canonical base | https://oiper.com                           | https://dev.oiper.com                                  |

Loading is plain `next/script` with gtag, so no new package.

⚠️ **Privacy-first brand + Google Analytics:** the privacy policy has to name GA. EU/UK visitors need consent before analytics cookies (use Consent Mode default "denied" with a small banner, or skip the banner and accept EU data loss). Decide this before launch. The policy currently says nothing about website analytics.

## Release checklist (dev → prod)

Run against dev before promoting:

```bash
curl -s https://dev.oiper.com/ | grep -c "Everything you need"          # >0 means server-rendered
curl -s https://dev.oiper.com/ | grep -o '<meta name="robots"[^>]*>'      # noindex
curl -s https://dev.oiper.com/robots.txt                                 # Disallow: /
curl -s https://dev.oiper.com/docs | grep -o 'rel="canonical" href="[^"]*"'  # dev.oiper.com, not desktop.
```

After prod deploy:

```bash
curl -sI https://desktop.oiper.com/docs | grep -i location                # 301 to oiper.com/docs
curl -s https://oiper.com/sitemap.xml | grep -c "<loc>"                   # about 25
curl -s https://oiper.com/ | grep -c 'application/ld+json'                # >0
curl -s https://oiper.com/llms.txt | head
```

Then submit the sitemap in Search Console and Bing, and run [Rich Results Test](https://search.google.com/test/rich-results) on the homepage.

## Re-running this research

```bash
cd W:/tauri/seo-tools && npm install
npm run crawl        # every page on prod + dev → data/out-*.json
npm run table        # per-page markdown table
npm run competitors  # competitor schema / sitemap / llms.txt benchmark
npm run keywords     # autocomplete demand → data/keywords.json
```

Once Search Console has 4+ weeks of data, connect the GSC MCP (`claude mcp add gsc -- npx -y mcp-server-gsc`) and re-run the `audit` skill to get real rankings and quick wins. The skills are installed in `W:/tauri/.claude/skills/`.
