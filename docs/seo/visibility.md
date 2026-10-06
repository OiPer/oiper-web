# AI & Brand Visibility

AI VISIBILITY: OiPer — 2026-10-06
SCORE: **7/100 (proxy)**

> ⚠️ **Proxy method.** The stack's visibility skill expects DataForSEO's paid LLM and SERP endpoints. Without them, each buyer question was run through web search, which returns the pages AI assistants also retrieve and cite. Each line below is marked as a proxy. No AI answer was simulated.

## Per question

| Buyer question                                                      | OiPer cited?       | Who shows up instead                                                                                                |
| ------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| "best free offline dictation app for Windows and Linux"             | ❌ skipped (proxy) | Voquill, OpenWhispr, Handy, Spokenly blog, Weesper                                                                  |
| "wispr flow alternative for linux local"                            | ❌ skipped (proxy) | Handy, Vibe Typer, OpenWhispr, SpeakoFlow, Voicy, Spokenly, the GitHub topic `wispr-flow-alternative`               |
| "voice to text for vibe coding / Claude Code / Cursor"              | ❌ skipped (proxy) | Wispr Flow (`/vibe-coding/cursor`), Superwhisper (`/voice-coding`), Willow, Voibe, Vibe Typer                       |
| "private local speech to text, hold hotkey, type anywhere, Windows" | ❌ skipped (proxy) | HoldToType, holdkey, PrivateTranscribe, Local Whisper (Microsoft Store), PrivateType, local-speak, all GitHub repos |
| Wispr Flow alternatives (general)                                   | ❌ skipped (proxy) | Superwhisper, VoiceInk, Aqua Voice, Willow, MacWhisper, Voibe, OpenWhisper                                          |

## Brand query

- **"OiPer voice to text"**: oiper.com plus 8 GitHub release pages. Google knows the brand exists.
- **`site:oiper.com`**: 1 result (homepage only). The docs, download and changelog pages aren't indexed. This matches audit P0 #1 (wrong canonical) and #4 (no sitemap).
- **"OiPer review"**: no third-party review exists. Results mix in **Zoiper** (a VoIP softphone), Oapor and Oriper. The AI summary quoted the homepage testimonials as real user reviews.
- **Knowledge panel:** none. **Third-party mentions found:** none outside GitHub.

## Why you're skipped

1. **No corroboration.** OiPer exists only on its own site and GitHub (7 stars, about 950 lifetime release downloads). Every recommended competitor appears on comparison posts, Product Hunt, AlternativeTo, Reddit threads or GitHub topic pages.
2. **No answer-shaped content.** Competitors rank with `/vs/…`, `/…-alternative`, `/use-cases/…` and `/blog/best-…` pages (Wispr Flow has 443 URLs, Willow 489, Voicy 1,177). OiPer has 24 indexable pages, none of which answer a buyer question.
3. **Machine readability gaps.** No llms.txt, no schema, wrong canonical. On the next release the homepage HTML is also empty to AI crawlers (audit P0 #2).
4. **Brand-name collision.** "OiPer" looks close to Zoiper. Consistent `Organization` schema with `sameAs` links helps engines tell them apart.

## Score breakdown

| Part                                     | Score | Basis                                                                             |
| ---------------------------------------- | ----- | --------------------------------------------------------------------------------- |
| Citations in AI answers (8 per question) | 0/40  | 0 of 5 questions (proxy)                                                          |
| Competitor citation gap                  | 0/25  | Competitors appear on 5 of 5, OiPer on 0                                          |
| Corroboration                            | 2/20  | GitHub repo links the homepage. Nothing else found                                |
| Machine readability                      | 5/15  | Server-rendered on prod, AI bots allowed. No llms.txt, no schema, wrong canonical |

## Money questions (re-run these each month)

1. best free offline dictation app for Windows
2. wispr flow alternative for linux
3. voice to text for coding / vibe coding
4. private speech to text app that works offline
5. superwhisper alternative for windows
