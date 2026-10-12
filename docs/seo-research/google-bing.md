# OiPer: what Google and Bing officially say, and what to do about it (as of 2026-10-12)

Scope: primary documentation from Google Search Central, Bing Webmaster and Microsoft blogs, IndexNow.org and web.dev, plus a small amount of clearly labeled secondary reporting. I checked the oiper-web repo read-only to tie the findings to what the site does today.

Confidence labels:

- **[Official]** comes from a Google or Microsoft primary page.
- **[Secondary]** comes from industry reporting. Check it against the primary page before relying on it.

---

## 0. TL;DR: the 10 highest-impact actions

1. **Get indexed first. Nothing else matters until you are.** Verify the Domain property in Google Search Console (GSC). Submit `sitemap.xml`. Use URL Inspection → "Request indexing" on roughly 10–15 money pages (/, /download, /windows, /mac, /linux, /alternatives/\*, /use-cases/coding, pricing, the top docs). Make sure each of them is linked from the homepage nav or footer in plain `<a href>`. Expect days to weeks. [Official]
2. **Earn discovery links.** For a new, low-authority site, Google says it finds pages mostly through links from pages it already knows. Good sources: launch posts (Product Hunt, HN Show, Reddit communities where allowed), the GitHub README, AlternativeTo, Microsoft Store / winget / Homebrew / Flathub listings, and dev-tool directories. This is the real bottleneck, not on-page markup. [Official, starter guide]
3. **Bing and IndexNow.** The repo already serves a key file (`public/c445d9414aa2aca65edc783c23768f2a.txt`). Wire up an automatic POST to `https://api.indexnow.org/indexnow` after each production deploy. Verify the site in Bing Webmaster Tools (BWT) by importing it from GSC, then turn on the BWT **AI Performance** report (Copilot citations). [Official]
4. **Fix the SoftwareApplication markup expectation.** Google's Software App rich result **requires `aggregateRating` or `review`** plus `name` and `offers.price`. The homepage currently has neither rating nor review, so it is **not eligible** for the star/price rich result. Only add ratings once you have genuine first-party reviews. Do not aggregate from G2, Product Hunt or the stores, and never fake them. [Official]
5. **FAQPage markup no longer produces anything in Google.** The FAQ rich result was deprecated on 2026-05-07 and its docs were removed on 2026-06-15. It is harmless, but don't expect SERP features from it. Keep the visible FAQs because they are good content. [Official]
6. **Scaled content line.** Google judges _purpose and value_, not page count or how the page was made. "Creating pages for every query variation to manipulate rankings or AI responses" is named explicitly. Every programmatic page needs unique, verifiable substance (see §3). The March and May 2026 core updates and four spam updates in 2026 make this a live risk. [Official]
7. **AI Overviews / AI Mode / Copilot need no special tricks.** Google: "no special schema.org structured data," llms.txt is "not used by Google Search," no chunking is needed, and AEO/GEO is just SEO. Keep llms.txt for other tools, but it does nothing for Google. Non-commodity, first-hand content is the main lever. [Official]
8. **Lock down non-production hosts.** `dev.oiper.com` must not be indexable. Use HTTP auth or an `X-Robots-Tag: noindex` header, not only `robots.txt` Disallow (a disallowed URL can still be indexed from links). `desktop.oiper.com` should return a **301** to the canonical URL. [Official]
9. **E-E-A-T basics for a tiny company.** Add a real About page (who builds it, where, since when), a contact page with a working email, privacy policy and terms, named authors on guides and comparisons with a short bio, and Organization markup with `logo`, `sameAs`, `foundingDate`, `email` and `contactPoint`. Code-sign the binaries. [Official, helpful-content "Who/How/Why"]
10. **Localization is a real opportunity only if done properly.** Use one subdirectory per language (`/es/`, `/de/`) with bidirectional hreflang plus x-default. Translate fully and have a native speaker review. Start with 2–4 languages where demand is proven. Never auto-redirect by language. Translation without added value is named as scaled-content abuse. [Official]

---

## 1. Google Search Central

### 1.1 SEO starter guide

URL: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

- Use `site:oiper.com` to check what is indexed. Google discovers pages mostly through links from already-crawled pages, so **promote the site**.
- Do not block CSS or JS. Use URL Inspection to see the rendered page.
- Use descriptive URLs. For thousands of URLs, group them in directories so Google learns how often each section changes. Your `/alternatives/`, `/use-cases/` and `/docs/` folders are good.
- Duplicate content is "not a spam violation" but wastes crawl. Fix it with canonicals or redirects.
- Things Google says **not** to focus on: meta keywords (not used), keyword stuffing (spam), keywords in the domain, word count ("no magical word count target"), E-E-A-T as a direct ranking factor (it isn't one), and subdomains vs. subdirectories (choose by business need).
- Timing: "Some changes might take effect in a few hours, others could take several months." Wait a few weeks before judging.

### 1.2 Helpful, people-first content

URL: https://developers.google.com/search/docs/fundamentals/creating-helpful-content (updated 2026-10-05)

- **Who:** clear bylines where readers expect them, linked to author background. No fabricated authors or AI headshots.
- **How:** explain the testing method, especially for reviews and comparisons. Disclose AI or automation where a reader would wonder about it.
- **Why:** content exists to help people who arrive directly, not to attract search visits.
- Red flags tied to scale: lots of content across unrelated topics, "extensive automation to produce content on many topics," adding or removing content in bulk to seem "fresh," and changing dates without substantial updates.

### 1.3 Spam policies: scaled content, doorways, site reputation abuse

URL: https://developers.google.com/search/docs/essentials/spam-policies (updated 2026-08-28)

- **Scaled content abuse:** "when many pages are generated for the primary purpose of manipulating search rankings" and not helping users, however they were made. Examples:
  - generative AI pages that add no value;
  - scraping feeds or search results, including "automated transformations like synonymizing, **translating**, or other obfuscation";
  - stitching content together without adding value;
  - multiple sites hiding scale;
  - keyword pages that make little sense to a reader.
- **Doorway abuse:** "sites or pages created to rank for specific, similar search queries." Examples include near-identical pages funneling to one destination and city or region pages that all lead to one page.
- **Site reputation abuse:** third-party content hosted mainly to borrow the host's ranking signals. This matters only if you ever host partner or guest content. The EEA enforcement was adjusted on 2026-08-28.
- **New in 2026:** a "back button hijacking" policy (2026-04-13). Spam policies also explicitly apply to generative AI responses in Search (2026-05-15).
- Generative AI content guidance: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content (updated 2026-10-01). AI-assisted is fine if it is fact-checked and adds value. Titles, meta descriptions, structured data and alt text must also be reviewed.
- **Google publishes no page-count threshold.** Volume alone is not the violation. Low value at volume is. [Secondary, consistent with the official text]

### 1.4 AI features (AI Overviews, AI Mode)

- https://developers.google.com/search/docs/appearance/ai-features (updated 2025-12-10)
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide (published 2026-05-15). Announcement: https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing

What the docs say:

- **Eligibility:** the page must be indexed and snippet-eligible. "There are no additional technical requirements." There is also "no special schema.org structured data."
- **Mechanics:** retrieval from the Search index plus "query fan-out," which runs related searches. Ranking still comes from the core systems.
- **Main lever:** "non-commodity" content with a unique point of view and first-hand experience. Generic tip lists are commodity content.
- **Myths busted:**
  - llms.txt and AI text files: Google Search "doesn't use them" (confirmed in the 2026-06-15 changelog).
  - Chunking is unnecessary, and there is "no ideal page length."
  - No special phrasing or long-tail hunting is needed.
  - Inauthentic brand mentions don't help.
  - Structured data is not required for AI, though it still matters for rich results.
- **Warning:** "Creating pages for every query variation to manipulate rankings or AI responses may violate" scaled-content abuse.
- **Controls:** `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`. `Google-Extended` (robots.txt) controls Gemini training and grounding outside Search. It does **not** remove you from AI Overviews.
- **Reporting:**
  - AI Overviews and AI Mode traffic is counted in the GSC Performance report under "Web." AI Mode was added to totals on 2025-06-16.
  - A separate **Generative AI performance report** exists. Per [Secondary] sources, it shows impressions only, rolled out from June 2026, with wider availability around 2026-08-31.
- **Preferred sources:** these now show in AI Overviews and AI Mode (2026-05-27). A "preferred source" button is documented (2026-08-20). This is low priority for a software site.

### 1.5 Structured data for software

URL: https://developers.google.com/search/docs/appearance/structured-data/software-app (updated 2026-09-08)

- **Required:**
  - `name`;
  - `offers.price` (use `0` for free);
  - **one of `aggregateRating` or `review`**.
- **Recommended:**
  - `applicationCategory`, using a supported value such as `UtilitiesApplication` (already used) or `BusinessApplication`;
  - `operatingSystem`;
  - `priceCurrency` for paid apps.
- **Review rules:** https://developers.google.com/search/docs/appearance/structured-data/review-snippet
  - The _self-serving_ restriction applies only to `LocalBusiness` and `Organization` types, so **first-party reviews of a SoftwareApplication are allowed**.
  - "Don't aggregate reviews or ratings from other websites."
  - No fake or undisclosed incentivized reviews (added 2026-07-24).
  - Google recommends only accepting ratings that come with a comment and the author's name.
- **Repo finding:** `src/app/page.tsx` declares SoftwareApplication with `applicationCategory: 'UtilitiesApplication'` and `operatingSystem`, but **no `aggregateRating` or `review`**, so no rich result is possible yet.
  - Action: collect in-app or on-site reviews (name + comment + rating), show them on the page, and only then add `aggregateRating`.
  - Until then the markup is still useful for entity understanding. It just won't produce stars.
- For multiple offers (free local, BYOK, paid cloud), use an array of `Offer` items, each with `price` and `priceCurrency`. Each price must match what the page visibly shows.

### 1.6 FAQ, breadcrumbs, sitelinks, site name, logo, titles, snippets

- **FAQ rich results:** deprecated, no longer shown since 2026-05-07, docs removed 2026-06-15 (https://developers.google.com/search/updates). Since 2023 they had only been shown for government and health sites.
  - Keep visible FAQs. They help users and are fodder for AI answers.
  - FAQPage JSON-LD is now inert for Google. It is optional to keep, and some other engines may read it.
- **Breadcrumbs:** since 2025-01-22, breadcrumb display is **desktop-only**. On mobile, Google shows just the domain. Keep BreadcrumbList on deep pages. https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- **Sitelinks:** fully automatic. https://developers.google.com/search/docs/appearance/sitelinks
  - What helps: informative, compact titles; logical internal links; concise anchors; no repeated content. To suppress a sitelink, use `noindex` on that page.
  - The sitelinks search box was retired in late 2024, so no markup is needed.
- **Site name:** https://developers.google.com/search/docs/appearance/site-names
  - Put `WebSite` markup on the homepage with `name: "OiPer"`, `url` and `alternateName` (for example "OiPer Dictation" or "oiper.com").
  - Keep it consistent with `og:site_name`, `<title>` and Organization `name`.
  - Subdomains get their own site name or fall back to the domain's.
- **Organization logo:** https://developers.google.com/search/docs/appearance/structured-data/organization (updated 2026-09-08)
  - Place it on the homepage or About page.
  - `logo` must be at least 112×112 px, crawlable, and look right on white.
  - Recommended: `sameAs` (GitHub, X, LinkedIn, YouTube, Product Hunt), `email`, `contactPoint`, `foundingDate`, `legalName`, `address`.
  - Use the same name as the site-name markup.
- **Favicon:** formats are now listed explicitly (2026-08-28). Use a square icon of 48×48 px or larger. https://developers.google.com/search/docs/appearance/favicon-in-search
- **Title links:** https://developers.google.com/search/docs/appearance/title-link
  - Unique, descriptive titles; brand at the end with a delimiter; one dominant `<h1>`.
  - Rewrite triggers: boilerplate repeated across pages, stale dates in titles, title and content mismatch, repeated site name.
- **Snippets:** https://developers.google.com/search/docs/appearance/snippet
  - Write unique meta descriptions. Programmatic generation is OK if each is readable and varied.
  - "Read more" deep links appear when content is visible (not hidden in tabs), the scroll position isn't forced, and the hash is kept.

### 1.7 Images, video, Discover

- **Images:** https://developers.google.com/search/docs/appearance/google-images
  - Use real `<img>` tags with descriptive alt text, placed near relevant text, and descriptive file names.
  - Since 2026-03-02 you can specify a preferred image (via `og:image` or `primaryImageOfPage`) for Images and Discover.
  - Real app screenshots per OS are your best image assets.
- **Video:** https://developers.google.com/search/docs/appearance/video
  - A 30–90s demo per platform page, with a dedicated watch page or prominent placement.
  - `VideoObject` with `name`, `thumbnailUrl` and `uploadDate`, plus `contentUrl`/`embedUrl` and `duration`. `creator` was added 2026-09-24.
  - YouTube copies also build brand and earn links.
- **Discover:** https://developers.google.com/search/docs/appearance/google-discover
  - Discover needs large images (≥1200 px wide) and `max-image-preview:large`.
  - There was a Discover core update on 2026-02-05, and the Follow feature guidance was removed in November 2025.
  - Discover traffic is unlikely for a product site. It is low priority, and changelog or blog posts are the only realistic candidates.

### 1.8 Crawling and indexing a new site

- **Recrawl:** https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
  - URL Inspection works for a few URLs and has a quota. Repeated requests don't help.
  - A sitemap works for many URLs.
  - Crawling takes "a few days to a few weeks," and inclusion is not guaranteed.
- **Sitemaps:** https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  - `lastmod` is used only if "consistently and verifiably accurate." Don't set it to the build time on every deploy.
  - `priority` and `changefreq` are ignored.
  - Submit via GSC and the robots.txt `Sitemap:` line, which the repo already does. The sitemap ping endpoint is deprecated (2023).
- **Crawl budget:** only relevant for very large sites (moved to the crawling infrastructure site, 2025-11/12). It is **not** the issue at your size.
- **Why only the homepage is indexed (likely causes, in order):**
  1. It's new. Google crawls slowly until the site has links and demand.
  2. Few external links point anywhere but the homepage.
  3. Internal pages are seen as low priority or near-duplicate.
  4. "Discovered/Crawled – currently not indexed" in the GSC Pages report usually means quality or priority, not a technical block.
- **Check:** GSC → Pages report → reasons per URL. URL Inspection → "Test live URL" to confirm the rendered HTML has content, a canonical pointing to itself, and no stray `noindex`.

### 1.9 Core updates in 2025–2026

Source: https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history and https://developers.google.com/search/updates/core-updates

- **Core updates:** 2025-03-13, 2025-06-30, 2025-12-11, 2026-03-27, 2026-05-21.
- **Spam updates:** 2025-08-26, 2026-03-24, 2026-06-24, 2026-08-18, 2026-09-24.
- Since 2025-12, the docs say smaller, unannounced core updates also happen continuously. Improvements can be recognized between big updates, but "several months" is typical.
- Implication: if you launch a large programmatic set now, expect it to be evaluated by the spam systems within weeks.

---

## 2. Bing / Microsoft

### 2.1 Webmaster guidelines (rewritten early 2026)

- Official: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a. The page is JS-rendered and didn't load for me, so details below come from [Secondary] Search Engine Journal (2026-02-27): https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442
- The guidelines now cover Copilot and grounding results, and name **GEO** (eligibility for grounding and citation, no guaranteed outcome).
- **AI content wording softened.** It now targets "large-scale content generated without oversight, quality control, or editorial review," which may be excluded from the index. This is the same line Google draws.
- **New abuse sections:** "Keyword Stuffing and Artificially Engineered Language" (content engineered to trigger citations) and "Prompt Injection and AI Manipulation." Don't put hidden instructions aimed at LLMs in pages or llms.txt.
- **Robots directives for AI:**
  - `noarchive` keeps content out of Copilot answers and grounding.
  - `nocache` limits Copilot to URL, title and snippet, so avoid it if you want rich citations.
  - `nosnippet` and `data-nosnippet` reduce citation quality.
- **Social signals:** the old "social media schemes" abuse section was removed. Current official guidance does **not** list social signals as a ranking factor.
  - Older Bing statements called social activity a signal it tests, not a confirmed factor [Secondary].
  - Treat social as discovery and link generation, not a direct ranking lever.
  - The pre-2026 guidelines listed relevance, quality and credibility, user engagement, freshness, location and page load time as ranking themes [from memory of the older doc; not re-verified].

### 2.2 IndexNow

Spec: https://www.indexnow.org/documentation

- **Key:** 8–128 characters (a–z, A–Z, 0–9, `-`), hosted at `https://oiper.com/{key}.txt`, containing the key itself. **This is already done** (`public/c445d9414aa2aca65edc783c23768f2a.txt`). Confirm it is served at the root on production with `200 text/plain`.
- **Single URL:** `GET https://api.indexnow.org/indexnow?url=<encoded>&key=<key>`
- **Bulk (preferred):**
  ```
  POST https://api.indexnow.org/indexnow
  Content-Type: application/json; charset=utf-8
  {"host":"oiper.com","key":"c445d9414aa2aca65edc783c23768f2a",
   "keyLocation":"https://oiper.com/c445d9414aa2aca65edc783c23768f2a.txt",
   "urlList":["https://oiper.com/","https://oiper.com/windows", "..."]}
  ```
  Up to 10,000 URLs per POST. Submitting to one participating engine shares it with all of them (Bing, Yandex, Seznam, Naver, Yep).
- **Responses:** 200 OK; 202 (key validation pending); 400; 403 (key mismatch); 422 (URL not on host); 429 (too many requests).
- **When to submit:** on add, update or delete only. Don't resubmit unchanged URLs on every deploy, because Bing treats that as noise.
- **Next.js on Netlify (simplest working approach):**
  - Run a small post-deploy step, either a Netlify `onSuccess` build plugin or a CI step after deploy succeeds.
  - It reads the freshly built sitemap, diffs `lastmod` against the previous deploy (or simply submits URLs whose `lastmod` changed), and POSTs the list.
  - A Next.js route handler is unnecessary unless you want manual triggering.
- **Google does not support IndexNow.** Use GSC and sitemaps for Google.

### 2.3 Bing Webmaster Tools

- **Verify:** import from GSC (https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools). This needs no code.
  - The alternative is `<meta name="msvalidate.01" content="...">` in the head.
  - `src/app/layout.tsx` already has `verification: { google: ... }`. Next.js Metadata supports `verification.other: { 'msvalidate.01': '...' }` if you prefer the meta route.
  - `msvalidate.01` is only for ownership verification. It has no ranking effect.
- **AI Performance report** (public preview since 2026-02-10): https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
  - Shows total citations, average cited pages, sampled grounding queries and per-URL citations across Copilot, Bing AI summaries and partner integrations.
  - It does not show clicks.
- **Bing's own tips for being cited:**
  - depth and expertise;
  - clear structure (headings, tables, FAQ sections);
  - evidence (data, examples);
  - fresh content plus IndexNow;
  - text, images and video describing the same entities consistently.
- Also use BWT URL Submission and Site Scan (a free technical audit).
- Legacy SOAP and POX APIs retired 2026-08-31. Use REST if you automate anything.
- Fabrice Canel (IndexNow lead) retired mid-2026 [Secondary]. This has no practical impact.

---

## 3. Programmatic pages without scaled-content risk

What Google rewards: each page answers a distinct real need with **information the searcher can't get from the page next to it**. What it punishes: near-identical pages that swap a keyword.

**Comparison and alternatives pages** (/alternatives/wispr-flow, superwhisper, and later Dragon, Talon, Windows Voice Typing, macOS Dictation, MacWhisper, Aqua Voice, VoiceInk, Willow and others):

- Each page needs original, verifiable specifics:
  - a feature and pricing table dated "checked YYYY-MM";
  - platform support;
  - privacy model (local vs. cloud);
  - languages;
  - latency you actually measured;
  - a "where they're better" section;
  - migration steps;
  - screenshots or video of you actually using both.
- Honesty, especially conceding where the competitor wins, is an E-E-A-T signal ("How": explain the testing).
- Byline it with a named author and add a "last tested" date. Update it when the competitor's pricing changes.
- Build them only for competitors people actually search for. Check GSC queries and Bing keyword research, and use 10–20 real competitors, not 200.

**"X for Y" and use-case pages** (coding, writing, email, Slack, medical notes, legal, students, RSI/accessibility, ADHD, non-native speakers):

- Ship one only if you can add **unique substance per use case**:
  - specific workflows and settings (for coding: IDE behavior, symbols, camelCase, terminal);
  - a custom-prompt example;
  - a short demo clip;
  - a real user quote.
- If the only difference is the noun in the H1, don't ship it.

**Integration and app pages** (VS Code, Cursor, Slack, Gmail, Notion, Obsidian):

- These are valuable if behavior genuinely differs per app (paste method, formatting, known quirks).
- The Zapier-style model works because each page carries real, app-specific data [Secondary].

**Platform pages** (/windows, /mac, /linux):

- Already fine. Differentiate them with OS-specific install steps, permissions (macOS Accessibility and Microphone, Wayland vs. X11), system requirements, hotkeys and known issues.
- Distro pages (/linux/ubuntu, /linux/arch) are justified only if the install steps differ.

**Language pages** ("voice typing in Spanish"): see §4.2. Translating the full experience beats making English pages per language.

**Process guardrails:**

- Ship in batches of 5–10 pages and watch GSC indexing and impressions before scaling. If most pages sit in "Crawled – currently not indexed," Google is telling you they lack value.
- Keep thin or experimental pages `noindex` until they're good.
- Never create pages that only funnel to /download (doorway pattern).
- Link every programmatic page from a real hub (/alternatives, /use-cases) and from related pages. No orphans.

---

## 4. Technical

### 4.1 Core Web Vitals

Source: https://web.dev/articles/vitals

- LCP ≤ 2.5 s, **INP ≤ 200 ms**, CLS ≤ 0.1, measured at the 75th percentile, split by mobile and desktop.
- Poor thresholds: LCP > 4 s, INP > 500 ms, CLS > 0.25.
- Next.js specifics:
  - Use `next/image` with `priority` on the hero, and keep the hero PNGs small. The current `public/hero-*.png` files are about 500–600 KB each, so convert them to AVIF/WebP.
  - Minimize client JS on marketing pages.
  - Avoid layout shift from fonts and banners.
- CWV is a modest ranking factor. It matters more for conversion.
- The service worker at `public/sw.js` must not serve stale HTML to Googlebot. Googlebot doesn't run service workers, but check that real users get fresh canonicals.

### 4.2 International and localized landing pages

Sources: https://developers.google.com/search/docs/specialty/international/localized-versions (2026-09-21) and https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites (2025-12-10)

- **URLs:** use separate URLs per language. A subdirectory (`/es/`, `/de/`) is the easiest. Do not use cookies, Accept-Language content swapping or parameters.
- **hreflang:**
  - Use one method only. The Next.js `alternates.languages` metadata or the sitemap both work.
  - Each page lists itself and all alternates, the links must be bidirectional, and URLs must be fully qualified.
  - Add `x-default` pointing to English.
  - Each localized page's canonical points to **itself**, not to English.
- **Language detection:** Google detects language from **visible content**. It ignores the `lang` attribute.
  - Translating only the boilerplate is bad.
  - Pages count as duplicates only if the main content remains untranslated.
- **Do not auto-redirect by language.** Offer a visible language switcher.
- **AI translation:**
  - Google's June 2025 statement: AI-translated content is not spam per se. The policy targets "large amounts of unoriginal content that provides little to no value" [Secondary quoting Google].
  - The spam policy names "translating" as an automated transformation when it is used to mass-produce low-value pages [Official].
  - Google removed its old advice to block auto-translated pages via robots.txt (2025-06-11) [Official changelog].
- **Assessment for OiPer: a genuine opportunity, with limits.**
  - The app supports about 99 languages, and non-English dictation queries ("dictado por voz PC," "Spracherkennung Windows," "diktiersoftware," "ditado por voz") have far less competition from Wispr/Superwhisper-class sites, which are English-only.
  - Do it as a **full localized product experience** for a few languages: homepage, /download, platform pages, pricing and the key FAQs, with native review. The app UI should ideally be localized too.
  - Start with es, de, pt-BR, fr and ja, chosen by GSC/Bing impressions and by where competitor apps are weak.
  - **Avoid** 99 auto-translated copies, or 99 English "voice typing in {language}" pages that differ by one word. That is textbook doorway or scaled content.
  - One English hub page, "Supported languages," with real per-language accuracy notes (Whisper word error rate by language is public data you can cite) is fine and useful.

### 4.3 JavaScript SEO and canonicalization

Source: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics (2026-03-04)

- Next.js SSR/SSG is ideal. Make sure marketing content is in the server HTML, not client-fetched.
- Canonicals belong in the initial HTML, and a JS canonical must match it.
- `noindex` set via JS is unreliable (2025-12-15). Set it server-side.
- Non-200 pages may not be rendered (2025-12-18). The 404 page must return a real 404 status.
- Links must be `<a href>`, and routing must use the History API. Next `<Link>` is fine.
- Pick one host (apex or www), 301 the other, and use self-referencing absolute canonicals.
- Trailing-slash consistency: canonical, sitemap and internal links should all use the same form.
- Site-move docs now cover www/non-www variants (2026-06-17).

### 4.4 Subdomains

- `dev.oiper.com`:
  - Add HTTP basic auth (best) or an `X-Robots-Tag: noindex` header on every response.
  - `robots.txt` Disallow alone can leave URLs indexed without content, and it _prevents_ Google from seeing a noindex.
  - The repo's development branch of `robots.ts` returns `Disallow: /`. Pair it with the header, or allow crawl plus noindex.
  - If dev is already indexed, use GSC Removals for a quick hide and noindex for the permanent fix.
- `desktop.oiper.com`: return a **301** to the specific matching path on `oiper.com`, not a blanket redirect to the homepage. Don't put it in the sitemap.
- Subdomains are treated as somewhat separate sites (each gets its own site name and needs its own GSC property, though a Domain property covers them all). Keep all marketing content on `oiper.com`, which the repo already does.
- `/dev` is disallowed in robots, and `/api` too. That is fine.

---

## 5. Software download intent

- Google has **no dedicated "download" rich result or app-store carousel for desktop software**. The tools you have are:
  - SoftwareApplication stars and price, which need reviews (§1.5);
  - sitelinks;
  - a strong snippet and title.
- Store listings dominate many "download X" SERPs, so **be present in the stores and package managers**: Microsoft Store, winget, Homebrew cask, Flathub/Snap/AUR, and the Mac App Store if feasible.
  - These are high-authority pages that link to you and rank for "download" queries themselves.
  - Use the same name, description and logo everywhere for entity consistency.
- **/download page best practice:**
  - Make it crawlable HTML (not a JS-only button) and auto-detect the OS while showing all platforms.
  - Show the version, release date, file size, system requirements, checksum (SHA-256) and changelog link.
  - Link to a `SoftwareApplication` with `softwareVersion`, `downloadUrl`, `fileSize` and `operatingSystem`.
  - Title pattern: "Download OiPer for Windows, Mac & Linux – Free Voice Typing."
  - Each /windows, /mac and /linux page should target "{OS} dictation software / voice typing for {OS} / download."
- **Trust and safety:**
  - Google Safe Browsing and its unwanted-software policy can flag download sites and wipe out traffic. Code-sign the Windows builds (an EV or standard certificate builds SmartScreen reputation) and notarize the macOS builds. Never bundle anything.
  - Add the site to the GSC Security Issues report watch.
- **Changelog:** a dated, real changelog helps with freshness and with "OiPer update / version" queries. Submit new entries via IndexNow.

---

## 6. E-E-A-T for a small software company

Not a direct ranking factor (starter guide), but the quality systems and raters look for it, and so do AI answer engines.

- **About page:**
  - real founder or team names and photos;
  - the company legal name, country, founding year;
  - why you built OiPer and your speech/ML background;
  - links to GitHub and social profiles.
- **Author pages:** one per real author, with a bio, expertise and links. Byline guides, comparisons and docs ("Written by X, tested on Windows 11 / macOS 15, updated 2026-10").
- **Contact:** a working support email, a response-time expectation, and an issue tracker or Discord link.
- **Policies:** privacy policy (crucial for a microphone app: what's processed locally vs. cloud, BYOK key handling, retention), terms, refund policy for the paid cloud plan, a security page, and a data-processing explanation.
- **Organization markup** on the homepage or About page with `legalName`, `logo`, `sameAs`, `email`, `contactPoint`, `foundingDate`, `address` (country at minimum), and `founder` (Person, with `sameAs`).
- **Social proof:** real testimonials with name and role, GitHub stars, press mentions, and third-party reviews linked out. Don't mark up third-party reviews.
- **Transparency for AI-assisted content:** say how comparisons were researched and tested. Disclose AI assistance where readers would wonder.

---

## 7. Checklist

### Indexing (do this week)

- [ ] Add the GSC **Domain** property (covers all subdomains). Submit `https://oiper.com/sitemap.xml`.
- [ ] Use URL Inspection → Request indexing for the top 10–15 URLs, spread over a few days because of the quota.
- [ ] Check the GSC Pages report for "Discovered/Crawled – not indexed," duplicate or canonical issues, and noindex. Fix any technical blockers.
- [ ] Confirm every sitemap URL returns 200, has a self-referencing absolute canonical, is server-rendered, and is linked internally from nav, footer or a hub.
- [ ] Make sitemap `lastmod` accurate per page, not the build time.
- [ ] Bing Webmaster Tools: import from GSC, submit the sitemap, and enable AI Performance.
- [ ] Confirm `https://oiper.com/c445d9414aa2aca65edc783c23768f2a.txt` serves the key on production. Add a post-deploy IndexNow POST for changed URLs.
- [ ] Earn 5–10 genuine external links: GitHub README, store and package-manager listings, AlternativeTo, Product Hunt, relevant communities.

### Hosts and technical

- [ ] Put `dev.oiper.com` behind auth or send an `X-Robots-Tag: noindex` header. Check `site:dev.oiper.com`.
- [ ] Make `desktop.oiper.com` 301 path-to-path to `oiper.com`. Enforce a single canonical host (apex vs. www) and consistent trailing slashes.
- [ ] Make sure the 404 page returns status 404. Set no client-side noindex or canonical.
- [ ] CWV: compress the hero PNGs to AVIF/WebP, give the LCP image `priority`, and keep INP ≤ 200 ms. Check PageSpeed Insights or the CrUX data in GSC once traffic exists.

### Structured data

- [ ] WebSite: `name: "OiPer"`, `alternateName`, `url` (homepage only).
- [ ] Organization: logo ≥112 px, `sameAs`, `email`, `contactPoint`, `foundingDate`, `legalName`, `founder`.
- [ ] SoftwareApplication: an `offers` array matching the visible prices, `softwareVersion`, `downloadUrl`, `operatingSystem`. Add `aggregateRating` **only** when real on-site reviews exist and are shown on the page.
- [ ] BreadcrumbList on deep pages (desktop-only display). Keep FAQ content visible, knowing FAQ rich results are gone.
- [ ] VideoObject for demo videos. Validate with the Rich Results Test and the Schema Markup Validator.

### Content (ongoing)

- [ ] Bring the 2 existing alternatives pages up to standard: dated pricing, tested claims, honest "where they win," screenshots, byline. Then add 5–10 more for real competitors only.
- [ ] Give each use-case page a real workflow, settings, demo and quote. Add one at a time, and check indexing before adding more.
- [ ] Make platform pages OS-specific: permissions, requirements, hotkeys, troubleshooting.
- [ ] Write non-commodity articles: benchmarks (local Whisper model sizes vs. latency and accuracy on real hardware), privacy deep-dives, BYOK cost math. These attract citations and links.
- [ ] Changelog: keep it dated and real, and send new entries through IndexNow.

### Trust / E-E-A-T

- [ ] About page with real people and company details. Add author pages, and bylines on guides and comparisons.
- [ ] Contact page, privacy policy (local vs. cloud data, BYOK), terms, refund, security.
- [ ] Code-sign and notarize the binaries. Publish checksums.

### Localization (after English pages are indexing)

- [ ] Pick 2–4 languages based on demand.
- [ ] Use `/xx/` subdirectories, full human-reviewed translation, hreflang with self plus all alternates plus x-default, and self canonicals. No auto-redirect.
- [ ] Add an English "Supported languages" hub with real per-language accuracy notes. No per-language English doorway pages.

### Don'ts

- [ ] Don't mass-generate pages that only swap a keyword (competitor, use case, language, city).
- [ ] Don't fake, aggregate or incentivize reviews without disclosure. Don't change dates without real updates.
- [ ] Don't add hidden LLM-targeted text or prompt-injection-style instructions (Bing abuse policy).
- [ ] Don't use `nocache`, `noarchive` or `nosnippet` on pages you want cited by Copilot or AI Overviews.
- [ ] Don't rely on llms.txt for Google. It is harmless and fine to keep for other agents.

---

## Sources

**Google (official)**

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing
- https://developers.google.com/search/docs/appearance/structured-data/software-app
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/sitelinks
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- https://developers.google.com/search/updates (changelog: FAQ deprecation, breadcrumbs desktop-only, llms.txt note, etc.)
- https://developers.google.com/search/updates/core-updates
- https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history
- https://web.dev/articles/vitals

**Bing / Microsoft / IndexNow**

- https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a (JS-rendered; summarized via SEJ)
- https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools
- https://learn.microsoft.com/en-us/bingwebmaster/
- https://www.indexnow.org/documentation

**Secondary (verify before relying on them)**

- https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442
- https://www.searchenginejournal.com/google-removes-robots-txt-guidance-for-blocking-auto-translated-pages/548870
- https://searchengineland.com/google-comments-on-reddits-use-of-ai-to-translate-its-pages-456908
- https://searchengineland.com/bing-webmaster-tools-testing-new-ai-performance-report-468039
- https://previsible.io/seo-ai-news/google-launched-ai-performance-reports-in-search-console/
- https://alexcloudstar.com/blog/programmatic-seo-2026-indie-hackers/
