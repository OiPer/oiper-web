## Project

- DO NOT build the entire project by yourself.
- Track meaningful user actions with the helpers in `src/lib/analytics.ts` and follow `docs/analytics.md` (one action = one event, mandatory `location`, no personal data). Add every new event to the inventory there.

## Styling

- NEVER add pills or badges to the UI; eg: on top of a heading.
- Use only Tailwind utility classes inside JSX; never create or modify any CSS files (`*.css`) unless explicitly instructed.

## Layout

- Section alignment must strictly alternate between **left** and **center**; no two adjacent sections may share the same alignment, and no other alignments are allowed.

## Animation

- Primary content (headings, main text, key foreground elements) must remain completely static and instantly visible—no transitions, hover effects, scroll reveals, fades, or motion—while animations are allowed only on non-essential elements (backgrounds, decorative layers, abstractions, illustrations).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
