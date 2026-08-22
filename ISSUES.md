# Auth & Subscription Issues — oiper-web

Audit of the auth/billing/subscription system (2026-08-21), three review passes (2x code-reviewer, 1x silent-failure-hunter). Not a diff review — this is the state of the code as it stands.

Split into **Now** (web ↔ server auth, and general subscription UX — the current focus) and **Later** (the desktop-app auth handoff, deferred — not being worked on yet). Findings whose actual fix lives in `oiper-server` are cross-referenced rather than duplicated.

---

## Now

### Critical

- [ ] **Duplicate, independently-flawed relative-path validator, feeding a flow that leaks a live auth token into the URL.** `src/features/auth/auth-form-utils.ts:40-45` (`getCallbackUrl`) has the same `startsWith("/")` / `!startsWith("//")` check as the server's `relativePathSchema` — bypassable with `/\evil.com`, `/\t/evil.com`, `/\n/evil.com`, `/\r/evil.com` per WHATWG URL parsing. `signin-form.tsx:73-77` and `signup-form.tsx:78-82` then build a redirect that (via the server's modal-mode response) carries the WorkOS `pat` token as a query param. Trigger: victim clicks a crafted `callbackUrl`, authenticates normally, browser 302s off-domain with `pat=…&email=…` attached — a genuine bearer credential in an attacker's hands. **Fix belongs primarily in `oiper-server`** (see `oiper-server/ISSUES.md` — Critical #1: resolve against `WEB_APP_URL` and compare `.origin`); this repo's copy of the check needs the identical fix, ideally by sharing one validator instead of two.

_(The other three Critical server findings — webhook error-swallowing, missing event-ordering, and the concurrent-checkout double-billing race — are server-internal; see `oiper-server/ISSUES.md`. Their symptoms surface here as confusing/incorrect billing-page state, covered under Medium below.)_

### High

- [ ] **Settings page promises account deletion removes subscription/billing history — it doesn't.** `src/features/account/settings-page.tsx:62` states "Subscription access and billing history will be removed" on account deletion. The server never cancels the underlying subscription (`oiper-server/ISSUES.md` — High: account deletion doesn't cancel billing). A deleted user keeps being charged with no account left to manage it from. Fix the copy only after the server behavior is fixed, not instead of it.

### Medium

- [ ] **Billing page has no fallback when the live provider call fails, hiding exactly the controls a user needs during an incident.** `src/features/account/billing-page.tsx:206-212,272` — on error, renders only "Couldn't load your subscription"; Plan, status, "Manage subscription," and "Change plan" all disappear, so a user can't reach the Stripe/Paddle portal to fix a failed payment during the one moment that would cause this error. The last-known `Subscription` row in the DB is never consulted as a fallback. Also fires on the public landing page for every signed-in visitor (`src/features/landing-page/components/pricing-section.tsx:40-42`, same query) and 8 more times per plan change via polling (`src/features/billing/use-checkout.ts:150-170`) — roughly 10 live provider round-trips per plan change. _Paired server finding: `getSubscriptionAccountView` calls both provider APIs unwrapped._

- [ ] **Preview/confirm race in the plan-change dialog — a user can see one price and be charged for a different plan.** `src/features/billing/change-plan-dialog.tsx:214-237` (preview effect, keyed by `selectedKey`, no cancellation) and `:250-269` (`handleConfirm`, submits `selectedTarget`). Trigger: select MAX-Yearly, then within a second switch to PRO-Monthly before the first preview resolves — if the MAX-Yearly preview resolves last, the dialog displays its price while Confirm submits PRO-Monthly. Money-facing and entirely silent. Fix: tag each preview with its target plan and ignore/block confirm on a mismatch.

- [ ] **Silent timeout after a false "success" toast on plan changes — guaranteed on every Stripe downgrade.** `change-plan-dialog.tsx:265-268` toasts success immediately after the _request_ succeeds, before the webhook has applied anything. `use-checkout.ts:140-173` (`usePollUntilPlanChangeLands`) polls 8× at 1.5s then gives up silently with no distinction between "still processing" and "actually failed" — the UI just reverts to the old plan with no explanation. Since Stripe downgrades are deferred to period end (see server-side Medium finding on downgrade timing), the poll for a Stripe downgrade _always_ times out: success toast, 12-second spinner, nothing changes, no message telling the user the change is actually queued. Same pattern in `handleResume` (`:287-303`).

### Low

- [ ] **`pat` token in the URL.** `signin-form.tsx:73-77`, `signup-form.tsx:78-82` place it in the query string alongside the server response that puts it there (`oiper-server/ISSUES.md` — Low). Lands in browser history and third-party `Referer` headers on the destination page.
- [ ] **Empty `catch {}` blocks hiding failures.** `src/features/account/avatar-modal.tsx:94-102` — if `readFileAsDataUrl` throws (corrupted file, permission denial), the Save button just stops loading with no toast/message; the user has to guess to re-pick the file. `src/features/billing/change-plan-dialog.tsx:219-230` (`runPreview`) — currently benign (react-query tracks the error independently and the alert at `:412-423` still renders), but the empty catch leaves no signal for the next person touching this code that an error path exists here at all.
- [ ] **`AUTH_COOKIE_DOMAIN` example value breaks this repo's `/account` gate.** `src/proxy.ts:6,19` checks for the session cookie on the web origin; the server's `.env.example` currently ships a value (`api.oiper.com`) that's invisible there, bouncing authenticated users to sign-in on hard navigation to `/account/*`. Fix is server-side config (`oiper-server/ISSUES.md` — Low), noted here since this is where it manifests.

---

## Later (deferred — not the current focus)

The Tauri desktop app's own auth handoff (`app/auth/desktop/**`). Full detail already reported; listed here as backlog so it isn't lost.

- [ ] `app/auth/desktop/page.tsx:69-79` auto-navigates to the server's `/continue` endpoint the moment a session is confirmed — no approval UI (no device name/platform shown, no confirm button), even though the server stores that data for exactly this purpose. Combined with the server-side CSRF gap on `/continue` (see `oiper-server/ISSUES.md` — Later), this allows silent device-linking to an attacker's desktop-auth request if a logged-in victim is lured to a crafted `/auth/desktop?request_id=...` link. PKCE prevents full account takeover, but not the silent-consent bypass.
