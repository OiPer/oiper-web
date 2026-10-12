# Getting OiPer Recommended by AI Assistants: GEO / AI Search Research

Research date: 2026-10-12. Scope: how ChatGPT, Perplexity, Google AI Overviews/AI Mode, Copilot, Claude, Grok, Meta AI and DeepSeek find and cite products, and what a small, low-authority desktop app (OiPer, a voice-to-text app) can do about it.

**Confidence labels:** [Primary] = vendor/official docs or peer-reviewed paper. [Study] = published dataset by an SEO/GEO firm (methodology public, but commercially motivated). [Weak] = secondary blog, unverified.

---

## TL;DR

1. **AI answers for "best X app" queries are built from live web retrieval, and the retrieved pages are overwhelmingly third-party "best X 2026" listicles, Reddit, YouTube and review/comparison pages, not the vendor's own site.** In a ChatGPT SaaS study, only 11.6% of recommendations cited the vendor's own site, and 88.4% credited a third party ([DerivateX, May 2026](https://derivatex.agency/report/b2b-saas-ai-citation-study/)). "Best X" lists were 43.8% of cited page types in ChatGPT ([Ahrefs, Dec 2025](https://ahrefs.com/blog/best-lists-research/)).
2. **Brand mentions across the web correlate far more with AI visibility than backlinks** (0.664 vs 0.218 Spearman) ([Ahrefs 75k brands](https://ahrefs.com/blog/ai-overview-brand-correlation/)).
3. **Big change in Aug 2026: ChatGPT now runs `site:` queries in about 43% of fan-outs, and 84% of those target the brand's own domain** ([Peec AI via Buffy, Jul 2026](https://heybuffy.com/blog/chatgpt-site-operator-fan-out-data)). Once you are a candidate, ChatGPT checks your site directly, so your own pages must state specs, pricing, platforms and differentiators in plain server-rendered HTML.
4. **Self-promotional "best X" listicles on your own site are now risky for a small brand.** AI Overviews cited such pages but left the publisher's brand out of the recommendation 69% of the time. Google appears to have demoted sites using the tactic since Jan 2026 ([Lily Ray, Jun 2026](https://lilyraynyc.substack.com/p/why-calling-yourself-the-best-could)).
5. **llms.txt does nothing measurable today, and schema has little to no effect on citations.** Server-side rendering does matter (AI crawlers don't run JS). Freshness matters moderately.
6. The OiPer category ("best dictation app 2026") is **saturated with competitor-authored listicles** (Aqua Voice, Wispr Flow, HyperWhisper, Yaps, NovaVoice, MetaWhisp, Superwhisper and others). Getting into _independent_ lists (Zapier, TechRadar, niche blogs, YouTube reviews, Reddit threads, AlternativeTo) is the main lever.

---

## 1. How each assistant finds and cites products

### Retrieval backends

| Assistant                                     | Retrieval source (best evidence)                                                                                                                                                                                                                                                                                                       | Crawler(s) to allow for citation                                                                                  | Training-only token (can block without losing citations)                                                                     |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **ChatGPT search**                            | OpenAI's own index built by **OAI-SearchBot** [Primary], plus third-party results. Several studies show ChatGPT citations align with **Bing** (Seer: 87% match Bing top results; AirOps: 73%) [Weak/Study]. The Information reported (Aug 2025) that OpenAI also used **Google SERPs scraped via SerpApi** [Weak, disputed by Ahrefs]. | `OAI-SearchBot` (search index); `ChatGPT-User` (user-triggered fetch; robots.txt "may not apply")                 | `GPTBot`                                                                                                                     |
| **Perplexity**                                | Own index built by **PerplexityBot** [Primary]. Reverse-engineered "ranking factors" suggest heavy freshness weighting, trusted-domain lists (GitHub, LinkedIn, Amazon…), and YouTube/Perplexity cross-signals [Weak].                                                                                                                 | `PerplexityBot` (+ allow published IP ranges); `Perplexity-User` (user fetch)                                     | Perplexity says neither bot trains models                                                                                    |
| **Google AI Overviews / AI Mode**             | Google's normal Search index plus **query fan-out** (multiple sub-searches) [Primary]. "No additional technical requirements" beyond being indexed and snippet-eligible [Primary].                                                                                                                                                     | `Googlebot` (only). Control via `nosnippet`, `max-snippet`, `noindex`.                                            | `Google-Extended` (Gemini apps and training/grounding in _other_ Google systems; does **not** affect Search, AIO or AI Mode) |
| **Microsoft Copilot / Bing AI**               | Bing index. Bing Webmaster Tools now has an **AI Performance report** (Feb 2026) showing Copilot citations and the _grounding queries_ used [Primary].                                                                                                                                                                                 | `Bingbot`; use **IndexNow**                                                                                       | n/a                                                                                                                          |
| **Claude web search**                         | **Brave Search** (on Anthropic's subprocessor list since Mar 2025; 79–87% citation overlap with Brave top results). **turbopuffer** (vector/full-text DB) added to the subprocessor list May 2026, role unknown. Anthropic also runs **Claude-SearchBot** for search quality [Primary + Study].                                        | `Claude-SearchBot`, `Claude-User`; plus **Googlebot** (Brave's crawler follows Googlebot rules and has no own UA) | `ClaudeBot`                                                                                                                  |
| **Grok**                                      | Own index plus heavy use of X posts. About 6.8 fan-outs per chat. Uses `site:reddit.com` heavily [Study].                                                                                                                                                                                                                              | n/a (no documented crawler token)                                                                                 | n/a                                                                                                                          |
| **Meta AI**                                   | Google and Bing search results (partnerships from 2024). Meta has reportedly been building its own index [Weak].                                                                                                                                                                                                                       | Googlebot/Bingbot; `meta-externalagent`                                                                           | `meta-externalagent` / `FacebookBot`                                                                                         |
| **DeepSeek**                                  | Web search (when enabled) cites standard SERP sources. Backend undocumented [Weak].                                                                                                                                                                                                                                                    | unknown                                                                                                           | unknown                                                                                                                      |
| **Apple (Siri/Spotlight/Apple Intelligence)** | Applebot index [Primary]                                                                                                                                                                                                                                                                                                               | `Applebot`                                                                                                        | `Applebot-Extended`                                                                                                          |

Sources:

- OpenAI crawlers: https://developers.openai.com/api/docs/bots (OAI-SearchBot opt-out means "won't be shown in ChatGPT search answers, though can still appear as navigational links"; changes take about 24h. Also lists `OAI-AdsBot` for ChatGPT ads landing pages.)
- Anthropic crawlers: https://support.claude.com/en/articles/8896518
- Claude and Brave: https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/ ; https://xponent21.com/insights/claude-web-search-brave-turbopuffer/ (Jul 2026) ; https://www.tryprofound.com/blog/what-is-claude-web-search-explained
- Perplexity crawlers: https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md ; ranking-factor leak write-up: https://searchengineland.com/how-perplexity-ranks-content-research-460031
- Google AI features doc: https://developers.google.com/search/docs/appearance/ai-features ; robots meta covers AI Mode: https://www.searchenginejournal.com/google-updates-robots-meta-tag-document-to-include-ai-mode/541371/
- Bing AI Performance report: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- SerpApi report: https://searchengineland.com/openai-chatgpt-serpapi-google-search-results-461226 ; counterpoint: https://www.searchengineworld.com/we-have-a-new-chapter-in-the-saga-of-openai-using-google-serps
- ChatGPT/Bing overlap: https://www.elmohq.com/blog/rankings-and-ai-citations ; Ahrefs ChatGPT vs Google overlap (about 8–12% URL overlap with Google top 10): https://ahrefs.com/blog/chatgpt-google-citations
- Meta AI: https://searchengineland.com/meta-ai-google-search-results-439825
- Grok: https://www.tryprofound.com/blog/understanding-grok-a-comprehensive-guide-to-grok-websearch-grok-deepsearch ; https://ppc.land/what-chatgpt-actually-searches-for-5-million-fanout-queries-analyzed/
- Apple: https://support.apple.com/HT204683
- Brave indexing (no webmaster console; submit form https://search.brave.com/submit-url per Brave moderators): https://community.brave.com/t/how-can-i-index-my-website-on-brave-search-engine/557611

### Recommended robots.txt for oiper.com (maximize citation)

```
User-agent: *
Allow: /

# Explicitly allow AI search/answer crawlers (defensive; also check CDN/WAF bot rules, e.g. Cloudflare "Block AI bots")
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: GPTBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: https://oiper.com/sitemap.xml
```

**Recommendation: allow the training bots too** (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot). For a small brand, being in training data is upside. It lets models "know" OiPer without searching. DerivateX observed that incumbents get named from model memory with no citation, while new tools only appear through fresh third-party listicles. The common failure is a CDN default (Cloudflare's AI-bot blocking) silently blocking these crawlers, so check it.

### Product/shopping features

ChatGPT's shopping/merchant features target physical goods (Merchant feeds) and do not apply to desktop software. **ChatGPT Ads** (sponsored cards under answers, contextually targeted) launched Feb 2026 (US Free/Go tiers). Self-serve Ads Manager was rolling out mid-2026 with reported CPCs of about $3–5 [Weak: https://www.webfx.com/blog/ai/chatgpt-ads-manager/ , https://segwise.ai/blog/chatgpt-ads-2026-guide]. OpenAI says ads don't influence organic answers. This is a paid option to test later. It is not GEO.

---

## 2. Query fan-out: what sub-queries are issued

**Google (official):** "AI Overviews and AI Mode may use a 'query fan-out' technique, issuing multiple related searches across subtopics and data sources" ([Google](https://developers.google.com/search/docs/appearance/ai-features)).

**Measured fan-out volume (per prompt):**

- Gemini 3 / AI Mode: about 9–11 (Seer about 10.7 on 501 prompts; Nectiv: 59% of prompts trigger 5–11 searches). **About 95% of Gemini fan-out queries have zero search volume** in keyword tools [Study, secondhand: https://upgrowth.in/query-fan-out-google-ai-mode-chatgpt-explained/].
- ChatGPT: about 2.1 (Apr 2026), rising from about 1.08 to 1.83 per response on 8 Aug 2026. Perplexity: 1.4. Grok: 6.8 ([Peec AI, 5M fan-outs](https://ppc.land/what-chatgpt-actually-searches-for-5-million-fanout-queries-analyzed/)).

**Words ChatGPT injects that the user never typed** (Peec AI, Apr 2026): "best" 15.3% (24.3% for advice prompts), "review(s)" 6.8%, **"2026" 5.4%**, "top" 5.2%, "comparison" 4.5%, **"vs" 4.3%**, "software" 3.5%. A later July 2026 dataset shows year mentions up to 26.5% of fan-outs, with "best/top" and "vs" falling.

So the sub-queries for "best voice to text app for Windows" likely look like:
`best dictation software windows 2026`, `voice to text app windows reviews`, `wispr flow vs superwhisper`, `wispr flow alternative`, `offline dictation app windows reddit`, `site:reddit.com dictation app`, `site:oiper.com pricing`.

**ChatGPT `site:` shift (Aug 2026):**

- Promptwatch: `site:` fan-outs jumped from 0.37% to 16.8% of fan-outs on 8 Aug 2026 ([SEJ](https://www.searchenginejournal.com/why-reddits-chatgpt-citation-drop-isnt-fully-explained/586479/), [nadiamohamed.me](https://nadiamohamed.me/insights/chatgpt-query-fan-out/)).
- Peec AI (ChatGPT 5.6): 43.2% of fan-outs use `site:`. **83.6% target the brand's own root domain.** Of the non-brand targets: reddit.com 71.5%, trustpilot 5.9%, linkedin 2.3%, **g2 2.3%, capterra 1.8%** ([Buffy summary](https://heybuffy.com/blog/chatgpt-site-operator-fan-out-data)).
- Implication: ChatGPT now verifies candidate brands on their own site and on Reddit. OiPer's site must answer the obvious verification questions (price, platforms, offline/local, privacy, languages, BYO API key, how it compares) in crawlable text. **But you only get probed once you are already a candidate,** and candidacy comes from third-party mentions.
- Related: Reddit's share of ChatGPT citations fell from about 3.83% to about 0.52% in Aug 2026 (and a similar crash happened in Sept 2025). ChatGPT still _reads_ Reddit but cites it less ([trackerly](https://trackerly.ai/blog/chatgpt-5-6-reddit-citations)). Reddit remains a retrieval/consensus input.

**Practical fan-out tool:** Bing Webmaster Tools' AI Performance report shows the actual _grounding queries_ Copilot used to retrieve your pages. It is the only first-party fan-out data available to site owners.

---

## 3. Academic and industry research

### GEO paper (Aggarwal et al., KDD 2024), https://arxiv.org/abs/2311.09735

- Benchmark GEO-bench (about 10k queries). GEO methods boost visibility "by up to 40%".
- Relative improvement in Position-Adjusted Word Count (Table 1, computed from scores): **Quotation Addition +41–43%, Statistics Addition +33%, Fluency +29%, Cite Sources +28%**, Technical Terms +19%, Authoritative tone +12%, Easy-to-understand +14%, **Keyword Stuffing −9%**.
- **Lower-ranked sources gain most:** for rank-5 sources, Cite Sources +115%, Quotations +100%, Statistics +98%. Rank-1 sources _lost_ 20–30%. This is good news for a low-DA brand: content quality can beat authority at the generation step.
- Validated on live Perplexity: Quotation about +21% and Statistics about +9% visibility (+37% subjective). Keyword stuffing hurt.
- Effects are domain-dependent.

### "GEO: How to Dominate AI Search" (Chen, Wang, Chen, Koudas, U. Toronto, Sep 2025), https://arxiv.org/abs/2509.08919

- AI search shows a **"systematic and overwhelming bias towards Earned media"** (third-party) over brand-owned and social content. **Software (USA): GPT cited Earned 72.7%, Brand 26.7%, Social about 0%.** Google's mix was 45.4 / 43.7 / 10.9.
- **Big-brand bias:** in one category, major brands took 56–68% of mentions and niche brands 6–12%. Advice for niche players: dominate a narrow niche with expert content, earn specialty-press coverage, and use YouTube reviews and community discussion, which Perplexity picks up first and more conservative engines follow later.
- Recommends comparison tables, pros/cons, explicit value propositions and clean schema for price/specs.
- Freshness: Claude's cited consumer-electronics links had a median age of 62 days. Perplexity was fresher.

### Search Arena (LMArena / UC Berkeley, 2025), https://arxiv.org/abs/2506.05334

- 24k conversations with search-augmented LLMs. Users prefer answers with **more citations** and **community sources (Reddit, YouTube, Substack, tech blogs)**. Wikipedia citations can hurt preference on time-sensitive queries. This explains why engines lean on community content.

### Industry citation-source studies

- **Ahrefs, "best" lists (Dec 2025):** 750 ChatGPT prompts (software, products, agencies). **"Best X" lists = 43.8% of cited page types.** Brands ranked higher on third-party lists were recommended more. 79% of cited lists had been updated in 2025, and 26% within the previous 2 months. **35% of cited lists were on low-authority domains.** https://ahrefs.com/blog/best-lists-research/
- **DerivateX (May 2026), ChatGPT SaaS:** 40 categories × 10 runs. 11.6% own-site citations. Independent/niche blogs plus vendor content made up 81.9% of citations, major media 8.8%, Reddit 8.4%, review aggregators 0.9%. **Every cited page used list structure, about 74–78% had a year in the title, 68% had a comparison table, 56% had an FAQ, and DA was not a strong predictor.** New tools appeared through fresh third-party listicles. https://derivatex.agency/report/b2b-saas-ai-citation-study/
- **Ahrefs freshness (Jul 2025, 17M citations):** AI-cited URLs are 25.7% fresher than organic results (avg 1,064 vs 1,432 days). ChatGPT is the most freshness-biased and AIO the least. https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/
- **Domain leaderboards (2026):** Reddit, YouTube, Wikipedia and LinkedIn dominate across engines. ChatGPT: Wikipedia/Reddit about 9–17% each. **Perplexity: YouTube about 31%**. AIO: Reddit about 21% and YouTube about 19–30%. Numbers vary by study. https://contently.com/2026/04/29/top-sources-llms-cite/ ; https://brightedge.com/resources/weekly-ai-search-insights/youtube-presence-ai-search
- **Listicle share by format:** listicles are the #1 cited format across ChatGPT, AI Mode and Perplexity (Wix, HubSpot), https://www.wix.com/studio/ai-search-lab/research/content-types-most-cited-by-llms , https://blog.hubspot.com/marketing/content-format-types-that-earn-citations . Peec AI saw ChatGPT's listicle share drop from 15.8% to 7.8% after a 2026 model change, as fewer fan-outs contained "best".
- **Recommendation volatility (SparkToro/Gumshoe, early 2026):** the same prompt returns the same brand list less than 1% of the time. Measure **share of responses mentioning you** across many runs, not rank. https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242
- **Rank vs citation:** ChatGPT-cited URLs overlap Google's top-10 only about 8–12% (Ahrefs). Overlap with Bing is higher. AIO vs SERP source Jaccard is about 0.18 (SIGIR 2026, secondhand).

### Content features that increase citation (consolidated)

1. Concrete **statistics and numbers** (GEO: +33%).
2. **Quotations** from credible people (GEO: +41%).
3. **Citing sources** inline (GEO: +28%).
4. **List structure plus comparison table plus FAQ** (DerivateX; Bing's guidance names "clear headings, tables, and FAQ sections").
5. **Year in title and visibly updated dates** (DerivateX 74–78%; Ahrefs freshness; ChatGPT injects "2026").
6. Clear, fluent, unambiguous entity statements: the same product name, the same claims everywhere (Bing: "reduce ambiguity").
7. Avoid keyword stuffing (GEO: −9%).

---

## 4. llms.txt, schema, freshness, SSR

| Factor                  | Verdict                                                                                                                                                                                     | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **llms.txt**            | **No measurable effect.** Cheap to add, but don't expect anything from it.                                                                                                                  | Dries Buytaert (Mar 2026): 0 AI-bot requests for llms.txt, all 52 requests came from SEO tools; about 0.001% of 400M requests across Acquia ([dri.es](https://dri.es/markdown-llms-txt-and-ai-crawlers)). SE Ranking (~300k domains): no correlation with citations. Ahrefs (May 2026): 97% of llms.txt files get zero traffic. EZY.AI: OpenAI fetched it 7 times in 12 weeks across 83 sites ([ezy.ai](https://www.ezy.ai/research/do-ai-bots-read-llms-txt)). Google: "you don't need to create new machine-readable files, AI text files". Mueller on Lighthouse's llms.txt check: "not done for search". |
| **Schema / JSON-LD**    | **Little or no direct citation lift.** Keep `SoftwareApplication` (price, OS, rating) and `Organization` for correctness and Google rich results, and keep it consistent with visible text. | Ahrefs controlled test (May 2026; 1,885 pages vs 4,000 controls): no meaningful ChatGPT change and AIO −4.6% ([summary](https://www.stanventures.com/news/schema-markup-has-no-meaningful-impact-on-ai-citations-7231/)). AirOps observational: 38.5% vs 32% (confounded). Models _do_ read JSON-LD (an extraction test pulled an address that existed only in JSON-LD). Google: no special schema needed.                                                                                                                                                                                                   |
| **Freshness**           | **Matters, moderately.** It matters most on ChatGPT/Perplexity and for "best/2026" queries.                                                                                                 | Ahrefs 17M citations (25.7% fresher). Ahrefs best-lists: 26% of cited lists updated within 2 months. Perplexity freshness decay [Weak]. **Caveat:** fake "2026" date bumps are associated with Google's 2026 demotions. Make real updates.                                                                                                                                                                                                                                                                                                                                                                   |
| **SSR / no-JS content** | **Critical.**                                                                                                                                                                               | Vercel/MERJ: **none of the major AI crawlers execute JavaScript** (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Meta, ByteDance). Only Googlebot (Gemini) and Applebot render. ([Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler)) Peec AI: `site:` probes need specs and pricing in server-rendered text. **Check oiper.com with `curl` to confirm that pricing, features, platforms and FAQ are present in the raw HTML.**                                                                                                                                                    |
| **IndexNow / Bing**     | **Do it.** Cheap, and it feeds Copilot and probably ChatGPT, since its results align with Bing.                                                                                             | Bing explicitly recommends IndexNow for AI freshness.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

---

## 5. "Best of" listicles

**Evidence they drive AI recommendations:**

- 43.8% of ChatGPT's cited page types are "best X" lists, and higher list placement correlates with being recommended (Ahrefs, Dec 2025).
- In SaaS, new tools get recommended _with citations to fresh third-party listicles_. Incumbents get recommended from memory (DerivateX).
- The top 1,000 most-cited pages on every AI platform include comparison listicles (Ahrefs Brand Radar).

**The dictation category today (Oct 2026):** Search results for "best dictation app windows 2026" and "Wispr Flow alternatives" are dominated by **vendor-authored** lists: aquavoice.com, wisprflow.ai, superwhisper.com, hyperwhisper.com, yaps.ai, novavoice.app, pipevoice.app, metawhisp.com, voicetonotes.ai, weesperneonflow.ai, tryvoiceink.com, openwhispr.com/compare. Independent lists include **Zapier** (updated Dec 2025: Apple Dictation, Windows Voice Access, Wispr Flow, Gboard, Google Docs, Letterly, Monologue, Voicenotes), **TechRadar** "best dictation software", itechguides, softorbits, saner.ai, getroutines.ai, AlternativeTo. OiPer appears in none of the ones I found.

**Self-promotional listicles: the 2026 picture.**

- Ahrefs (Dec 2025) found no downside at the time.
- **Lily Ray (Jun 2026):** across 80 AIO queries, a self-promoter's own "best X" list was cited but **its brand was omitted from the recommendation 69% of the time**, and the _competitors it listed_ got recommended instead. Sites using the tactic lost organic visibility around 20 Jan 2026, and the losses accelerated in the May 2026 core update. Recommended brands had far more referring domains and third-party mentions. A later report (unverified) says 83% omission by ~Sep 2026. ([Lily Ray](https://lilyraynyc.substack.com/p/why-calling-yourself-the-best-could), [Kevin Indig](https://www.growth-memo.com/p/has-google-demoted-listicles))
- **For OiPer (low authority): do not lead with a self-ranked "Best dictation apps 2026 (#1 OiPer!)" page.** Honest, specific **"OiPer vs Wispr Flow" / "Wispr Flow alternative for Windows/Linux"** pages are fine. They match the "vs" and "alternative" fan-outs and the `site:` verification probes. Keep them factual and link to competitors.

**How brands get into third-party lists:**

1. **Find the lists AI actually cites.** Run the target prompts in ChatGPT/Perplexity/AIO many times, and log the cited URLs (the visibility tools Peec, Profound and Otterly automate this).
2. **Pitch the authors** with a short, verifiable angle that fills a gap in their list. For OiPer: "the only one that's free and unlimited offline on **Linux** + Windows + macOS, no account" and "bring your own Groq/OpenAI key". Offer a license or test build, and give them screenshots and accuracy numbers.
3. **Niche bloggers and small sites count** (35% of cited lists are low-DA). Indie dev blogs, Linux blogs (It's FOSS, OMG! Ubuntu), accessibility/RSI blogs, writing/productivity newsletters.
4. **Get onto the editorially updated lists** (Zapier, TechRadar, Tom's Guide, PCMag, MakeUseOf, How-To Geek, XDA). These get refreshed, and the editors take tips.
5. **Directory and alternative sites:** AlternativeTo (listed as an alternative to Wispr Flow, Superwhisper, Dragon, Windows Voice Typing, Handy and others), Product Hunt, Softpedia, Slant, SaaSHub, G2/Capterra (presence is reportedly near-universal among recommended SaaS. It works as an "eligibility" signal even though ChatGPT rarely cites them directly; ChatGPT does `site:g2.com`/`site:capterra.com`/`site:trustpilot.com` probes).
6. **Affiliate program:** many "best X" writers are affiliates. A commission gives them a reason to include you.

---

## 6. Brand mentions vs backlinks; Wikipedia; Reddit

- **Mentions beat links.** Ahrefs (75k brands, May 2025), correlation with AIO brand mentions: **branded web mentions 0.664**, branded anchors 0.527, branded search volume 0.392, DR 0.326, referring domains 0.295, **backlinks 0.218**. Top-quartile-mention brands average 169 AIO mentions vs 0–3 for the bottom half. https://ahrefs.com/blog/ai-overview-brand-correlation/
- **Earned media bias** (Chen et al.): AI favors third-party sources heavily for software (about 73% earned). Unlinked mentions in context ("OiPer, a local Whisper dictation app for Linux…") are the currency.
- **Wikipedia/Wikidata:** Wikipedia is a top-cited domain in ChatGPT (about 9–13%), and Google uses Wikidata for entity disambiguation. **But Wikipedia notability requires significant independent coverage, and a new small app will not qualify.** Self-created articles get deleted and can backfire. A Wikidata item is low-bar and low-risk, but its impact on AI answers is unproven [Weak]. **Low priority until there is real press coverage.**
- **Reddit:**
  - Deals: Google–Reddit (Feb 2024, about $60M/yr) and OpenAI–Reddit (May 2024, about $70M/yr). Both were up for renegotiation in 2025–26 toward usage-based pricing, with no confirmed outcome found ([Bloomberg, Sep 2025](https://www.bloomberg.com/news/articles/2025-09-17/reddit-seeks-to-strike-next-ai-content-pact-with-google-openai)).
  - Reddit is #1 or #2 cited domain on AIO/AI Mode/Perplexity, and the dominant non-brand `site:` target in ChatGPT fan-outs (71.5%) and in Grok (90% of its Reddit lookups are `site:reddit.com`). ChatGPT's _citation_ share of Reddit collapsed in Aug 2026, but it still retrieves Reddit for consensus.
  - **Reddit actively hunts astroturfing** (about 25k spam removals/day in Q1 2026, a firm exposed for seeding about 100 posts). Removed content never reaches AI. Only do genuine participation: the founder posting under their own name with disclosure, answering "what dictation app for Linux/Windows" threads, launch posts in subreddits that allow them (r/software, r/linux, r/LocalLLaMA, r/productivity, r/macapps, r/windows, r/SideProject). Real users recommending OiPer unprompted is the goal.
- **YouTube:** about 20–30% of AIO citations and about 31% of Perplexity's. 94% of cited videos are long-form, and over 40% of cited videos had under 1k views [Weak]. A small "OiPer vs Wispr Flow / offline dictation on Linux" video can get cited. Better still, get reviewed by productivity/Linux YouTubers.

---

## 7. Tactics ranked by impact for OiPer (small, new, low-DA)

**Tier 1: highest impact**

1. **Get into independent third-party "best dictation / voice-to-text / Wispr Flow alternative / offline dictation / Linux dictation" lists and articles.** Identify which ones AI cites, then pitch them (gap-filling angle, free license, affiliate). This is the single biggest driver per the Ahrefs and DerivateX data.
2. **Earn unlinked brand mentions at scale in community and earned media:** genuine Reddit/HN/Product Hunt launches, Linux and privacy communities ("free offline dictation on Linux" is an under-served niche where competitors are thin: Handy and OpenWhispr), YouTube reviews, newsletters, AlternativeTo listings and upvotes.
3. **Make oiper.com pass the ChatGPT `site:` probe:** server-rendered pages that state in plain text what OiPer is, platforms, price (free local tier, BYO key, cloud plan $X), offline/privacy model, languages, models, supported apps, and system requirements. Add an FAQ answering "Is OiPer free?", "Does it work offline?", "Does it work on Linux?", "Can I use my own OpenAI/Groq key?", "OiPer vs Wispr Flow?". Use consistent one-sentence positioning everywhere.
4. **Crawler access hygiene:** allow all AI bots in robots.txt _and_ at the CDN/WAF, submit to Google Search Console and Bing Webmaster Tools, enable IndexNow, submit to Brave (`search.brave.com/submit-url`), and keep the sitemap with lastmod. Without Bing/Brave indexing you are invisible to ChatGPT/Copilot/Claude.

**Tier 2: strong** 5. **Honest comparison and alternative pages** on oiper.com: "OiPer vs Wispr Flow", "vs Superwhisper", "vs Windows Voice Typing", "Wispr Flow alternative for Linux", "Dragon alternative". Include a comparison table, a dated "Updated Oct 2026", sourced stats, and fair treatment of competitors. These match the "vs"/"alternative" fan-outs. **Avoid a self-ranked "best dictation apps" listicle with OiPer #1.** 6. **Original data people will cite:** e.g., a word-error-rate/latency benchmark of local Whisper models vs cloud APIs on Windows/Linux hardware, published with methodology. Statistics and quotations are the top GEO levers, and other listicle authors will cite it, which creates earned mentions. 7. **Review platforms:** G2, Capterra, Trustpilot, Product Hunt, AlternativeTo. Collect real reviews. They serve as eligibility signals and `site:` probe targets. 8. **Genuine freshness:** quarterly real updates (changelog, new models, pricing) with visible dates. Do not fake date bumps.

**Tier 3: worthwhile and cheap** 9. Bing Webmaster AI Performance: read grounding queries monthly and fill the gaps. 10. Track visibility as % of runs mentioning OiPer across about 20 prompts × engines, run repeatedly (rankings are non-deterministic). 11. `SoftwareApplication` + `Organization` JSON-LD (consistency, Google rich results). Expect no direct AI lift. 12. Docs/help pages for each competitor-adjacent use case ("dictate into VS Code / Slack / Obsidian on Linux"). These match long-tail, zero-volume fan-outs.

**Tier 4: low or no measurable impact** 13. llms.txt (add it if trivial, expect nothing). 14. Wikipedia article (not eligible yet, so don't attempt it). Wikidata item optional. 15. ChatGPT Ads: paid, separate from organic answers. Revisit when budget exists.

**Avoid:** Reddit astroturfing/sockpuppets, self-ranked listicles, fake "2026" title bumps, keyword stuffing, and blocking AI crawlers (including accidentally via CDN defaults).
