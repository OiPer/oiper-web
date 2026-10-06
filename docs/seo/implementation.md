# What Changed (branch `seo`)

Each fix is its own commit on `seo`, branched from `dev`.

| Area                    | Change                                                                                                                                                                                                                        | Files                                                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage rendering      | `PricingSection` has its own Suspense boundary, so the rest of the homepage is server-rendered and readable by crawlers that don't run JavaScript                                                                             | `src/features/landing-page/landing-page.tsx`                                                                                                              |
| Canonical domain        | `metadataBase` and every canonical come from `env.SITE_URL`: `https://oiper.com` in production, `https://dev.oiper.com` in development. `desktop.oiper.com` is gone from the code                                             | `src/lib/env.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/download/page.tsx`                                                                   |
| Indexing                | `robots.txt` and `sitemap.xml` (home, download, changelog, every docs and resources page). Dev returns `Disallow: /` and `noindex, nofollow` on every page                                                                    | `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/layout.tsx`                                                                                           |
| Private pages           | `/auth/*`, `/account/*`, `/dev/*` are `noindex`                                                                                                                                                                               | `src/app/auth/layout.tsx`, `src/app/account/layout.tsx`, `src/app/dev/subscription-states/page.tsx`                                                       |
| Soft 404s               | Unknown docs and resources URLs return 404 (`dynamicParams = false`)                                                                                                                                                          | `src/app/docs/[[...slug]]/page.tsx`, `src/app/resources/[[...slug]]/page.tsx`, `src/app/og/[...slug]/route.tsx`                                           |
| Brand images            | `favicon.ico` (16/32/48), `icon` 512×512 and `apple-icon` 180×180 from `@oiper/logo`. A 1200×630 social card with the app screenshot. Fixed web manifest. Deleted the oversized `public/og.png` (a duplicate of `hero-1.png`) | `src/app/favicon.ico`, `src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/opengraph-image.tsx`, `src/app/manifest.ts`, `src/features/seo/og-card.tsx` |
| Per-page social cards   | Every docs and resources page gets its own card (`/og/docs/...`, `/og/resources/...`) plus its own `og:url`, `og:title`, `og:description`, `og:type=article`                                                                  | `src/app/og/[...slug]/route.tsx`, `src/features/docs/docs-page.tsx`                                                                                       |
| Titles and descriptions | Home: `OiPer: Private Voice Dictation for Windows, Mac & Linux`. Docs use the `… \| OiPer Docs` template. Download and changelog rewritten. All 21 docs descriptions rewritten to 135–155 chars                               | `src/app/layout.tsx`, `src/app/docs/layout.tsx`, `content/**/*.mdx`                                                                                       |
| Structured data         | Site-wide `Organization` + `WebSite`. Home: `SoftwareApplication` with live offers from `/v1/pricing`, plus `FAQPage`. Docs and resources: `TechArticle` + `BreadcrumbList`                                                   | `src/features/seo/json-ld.tsx`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/features/docs/docs-page.tsx`                                               |
| AI assistants           | `llms.txt` built from the docs sources                                                                                                                                                                                        | `src/app/llms.txt/route.ts`                                                                                                                               |
| Analytics               | GA4 and the Search Console verification tag, each loaded only when its env var is set                                                                                                                                         | `src/lib/env.ts`, `src/features/seo/google-analytics.tsx`, `src/app/layout.tsx`, `.env.example`                                                           |
| Content                 | FAQ section (6 real questions, answers checked against the docs), platforms named in the hero, "voice dictation" in the features intro, FAQ link in the footer                                                                | `src/features/landing-page/components/*`                                                                                                                  |
| Performance             | amCharts globe is lazy-loaded (it was in the main homepage bundle). Flags are sized. Footer logo is the local SVG instead of a GitHub avatar request                                                                          | `languages-section.tsx`, `footer-section.tsx`                                                                                                             |
| Accessibility           | Named the account-menu button. Muted intro text raised from `white/40` to `white/50` (about 5:1 contrast)                                                                                                                     | `auth-nav-actions.tsx`, landing sections                                                                                                                  |

## Environment variables

One variable per concern. Set the prod value on prod and the dev value on dev.

| Variable                               | Prod (oiper.com)              | Dev (dev.oiper.com)         | Empty               |
| -------------------------------------- | ----------------------------- | --------------------------- | ------------------- |
| `NEXT_PUBLIC_APP_ENV`                  | `production`                  | `development`               | required (existing) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`        | GA4 ID of the prod property   | GA4 ID of the dev property  | GA isn't loaded     |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag token | not needed (dev is noindex) | no tag              |

The site URL comes from `NEXT_PUBLIC_APP_ENV`, so there's no extra URL variable. A malformed GA ID (anything that isn't `G-…`) fails at startup instead of failing silently.

## Outside the code (manual)

1. **Netlify:** make `oiper.com` the primary domain and 301 `desktop.oiper.com` → `oiper.com`. Today Netlify treats `desktop.oiper.com` as primary (`/download/mac` redirects there).
2. **Search Console:** add a Domain property for `oiper.com` (DNS TXT), or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Submit `https://oiper.com/sitemap.xml`.
3. **Bing Webmaster Tools:** import from Search Console.
4. **Privacy policy:** mention Google Analytics on the website, and decide on a consent banner for EU/UK visitors.
5. **Decisions still open:** testimonials (they look like placeholders) and one benchmark number (1 s vs 1.5 s vs "3.5x").

## Verify after deploying to dev

```bash
curl -s https://dev.oiper.com/ | grep -c "Everything you need"              # > 0: homepage server-rendered
curl -s https://dev.oiper.com/ | grep -o '<meta name="robots"[^>]*>'          # noindex, nofollow
curl -s https://dev.oiper.com/robots.txt                                     # Disallow: /
curl -s -o /dev/null -w "%{http_code}\n" https://dev.oiper.com/docs/nope     # 404
curl -s https://dev.oiper.com/docs | grep -o 'rel="canonical" href="[^"]*"'  # dev.oiper.com/docs
```

After prod deploy: run the [Rich Results Test](https://search.google.com/test/rich-results) on `/` and one docs page, the [opengraph.xyz](https://www.opengraph.xyz/) preview for `/` and `/docs/desktop/models`, then submit the sitemap.
