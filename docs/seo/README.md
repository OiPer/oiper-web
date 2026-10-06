# OiPer SEO

Research date: 2026-10-06 · Sites: `oiper.com` (prod), `dev.oiper.com` (next release)

## Where things stand

- Google has indexed **1 page** (the homepage). The docs, download and changelog pages are invisible.
- AI search proxies cite OiPer for **0 of 5** buyer questions. Visibility proxy score **7/100**.
- **0** third-party mentions. Competitors (Wispr Flow, Superwhisper, Handy, OpenWhispr…) appear everywhere.

## The 4 things that matter most

1. **Every page points Google at `desktop.oiper.com`** (`src/app/layout.tsx`). oiper.com is treated as a duplicate.
2. **The next release ships an empty homepage** to crawlers. `useSearchParams` in the pricing section forces client rendering. AI crawlers would see nothing.
3. **dev.oiper.com can be indexed** as a duplicate of prod.
4. **No sitemap, robots.txt, llms.txt or structured data.** Competitors have all four.

1–3 are one-line-scale code fixes. Everything else is in the plan.

## Files

| File                                   | What's in it                                                                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [implementation.md](implementation.md) | **What the `seo` branch changed**, env vars for dev and prod, manual steps, post-deploy checks                                    |
| [plan.md](plan.md)                     | The original plan: 18 ranked fixes, unanswered buyer questions, the GA4/GSC setup split for dev and prod, release checklist       |
| [audit.md](audit.md)                   | Technical audit: P0/P1/P2 findings with evidence, per-page table for prod vs dev, Lighthouse                                      |
| [visibility.md](visibility.md)         | AI and brand visibility: who gets recommended instead and why                                                                     |
| [competitors.md](competitors.md)       | Product positioning, brand hygiene, 11-competitor SEO benchmark, keyword clusters                                                 |
| `data/`                                | Raw crawl JSON (3 hosts), autocomplete keywords, Lighthouse summary                                                               |
| `oiper-test-suite/seo`                 | Scripts to re-run the crawl, table, competitor benchmark and keyword mining ([repo](https://github.com/al-imam/oiper-test-suite)) |

## Limits of this research

Only free tools without accounts were used, so these weren't available: Search Console rankings, real ChatGPT/Gemini/Perplexity answers (web search was used as a proxy, marked as such), search volumes (autocomplete used as the demand signal), backlinks, and CrUX field data (the PageSpeed quota was exhausted, so local Lighthouse was used).
