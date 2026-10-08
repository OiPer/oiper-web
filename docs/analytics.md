# Analytics

How we track product usage with GA4. Read this before adding or changing an event.

## Why we track

To understand the journey people take through OiPer: land on the site → understand the product → download → sign up → upgrade. The questions we want answered:

- What do people click, where on the page and how often?
- Which download platform do they pick, and do Mac users finish the download after the signing warning?
- Where do sign-ups, checkouts and plan changes fail, and with which error?
- Which FAQ questions do visitors care about, and how many reach pricing?

Philosophy: **maximum useful insight with minimum analytics noise.** We track meaningful user actions. We don't track every DOM interaction, and we never send private data.

GA4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (see `docs/seo.md`). Without it every helper is a silent no-op.

## The helpers

All helpers live in `src/lib/analytics.ts`. Each one takes the same three arguments and builds the final GA4 event name for you:

```ts
logClick(name: string, location: string, details?: EventDetails)

type EventDetails = Record<string, string | number | boolean>
```

| Helper        | Event name         | Use it when                                                                                          |
| ------------- | ------------------ | ---------------------------------------------------------------------------------------------------- |
| `logClick`    | `{name}_clicked`   | The click itself is the signal: a download, an upgrade button, sign in, sign out, a navigation link  |
| `logView`     | `{name}_viewed`    | Something important became visible, e.g. the pricing section (once per page view)                    |
| `logSelect`   | `{name}_selected`  | The user picked an option: billing interval, Mac build                                               |
| `logOpen`     | `{name}_opened`    | The user opened something that isn't a deterministic result of a tracked click, e.g. an FAQ question |
| `logClose`    | `{name}_closed`    | The user closed or abandoned something meaningful, e.g. leaving checkout without paying              |
| `logStart`    | `{name}_started`   | The user began a process after a confirmation step, e.g. confirming the Mac download                 |
| `logSubmit`   | `{name}_submitted` | A form passed validation and was sent                                                                |
| `logComplete` | `{name}_completed` | The server accepted the action                                                                       |
| `logError`    | `{name}_failed`    | The action failed. Always include `error_type`                                                       |

```ts
logClick('download', 'hero', { platform: 'windows' })
// → download_clicked { location: 'hero', platform: 'windows' }

logSelect('billing_interval', 'pricing', { interval: 'yearly' })
// → billing_interval_selected { location: 'pricing', interval: 'yearly' }

logError('signin', 'auth', {
  mode: 'modal',
  error_type: 'auth_invalid_credentials',
})
// → signin_failed { location: 'auth', mode: 'modal', error_type: 'auth_invalid_credentials' }
```

Never build an event name by hand and never call `window.gtag` directly.

Forms follow one pattern: `logSubmit` after validation → `logComplete` when the server accepts → `logError` with `error_type` when it doesn't. One-click async actions (resend code, open billing portal, resume subscription) log only the outcome.

## Location is mandatory

`location` answers _where in the product_ the action happened. Use a short, stable, snake_case value:

| Location              | Where                                                                   |
| --------------------- | ----------------------------------------------------------------------- |
| `hero`                | Homepage hero                                                           |
| `header`              | Site header (nav bar)                                                   |
| `footer`              | Site footer                                                             |
| `landing`             | The homepage as a whole                                                 |
| `pricing`             | Pricing section on the homepage                                         |
| `faq`                 | FAQ section                                                             |
| `download_section`    | `/download` page                                                        |
| `mac_download_dialog` | Mac "not signed by Apple" dialog                                        |
| `auth`                | Sign in, sign up, reset password and verification forms (modal or page) |
| `billing`             | `/account/billing`                                                      |
| `settings`            | `/account/settings`                                                     |
| `security`            | `/account/security`                                                     |
| `notifications`       | `/account/notifications`                                                |
| `unsubscribe`         | `/unsubscribe` page linked from emails                                  |
| `gift`                | `/gift` page opened from a gift link                                    |
| `account`             | Account area header                                                     |
| `not_found`           | The 404 page                                                            |

Reserved for future use: `features`, `navigation`, `mobile_menu`.

Don't invent dynamic or DOM-derived locations such as `div_123` or `section_94823`. If the same component appears in several places, take `location` as a prop (`DownloadButton`, `OtherDownloads`, `ChangePlanDialog` do this).

## Details: when to add them

Add a detail only when it carries product context GA4 can't know and that changes how we read the event.

| Good                                                      | Why                                                      |
| --------------------------------------------------------- | -------------------------------------------------------- |
| `platform: 'macos_intel'`                                 | Which OiPer build was chosen                             |
| `plan: 'pro'`, `interval: 'yearly'`, `provider: 'paddle'` | Which offer drove the upgrade                            |
| `mode: 'modal'`                                           | Whether auth happened in the modal or on the full page   |
| `error_type: 'auth_email_already_exists'`                 | Why the journey broke                                    |
| `outcome: 'email_verification'`                           | Which branch a successful action took                    |
| `destination: 'docs'`                                     | Where a navigation link leads                            |
| `question: 'offline'`                                     | Which FAQ entry was opened (a stable id, never the text) |

| Bad                                                  | Why                                           |
| ---------------------------------------------------- | --------------------------------------------- |
| `os`, `browser`, `device`, `screen`                  | GA4 collects these automatically              |
| `page_url`, `referrer`, `country`, `language`        | GA4 collects these automatically              |
| `email`, `name`, user ids, tokens                    | Private, never sent                           |
| Raw error messages or anything the user typed        | May contain personal data; use a code instead |
| Timestamps, random ids, full URLs with query strings | Dynamic and noisy                             |

`platform` always means the **OiPer download target** (`windows`, `macos`, `macos_intel`, `linux`, `linux_deb`, `linux_rpm`), never the visitor's operating system.

`error_type` is the API error code when there is one (e.g. `billing_already_subscribed`), otherwise a short label (`missing_token`, `too_large`, `unknown`).

**Every event name, location and string detail is lowercase snake_case.** The helper enforces this: it converts every string value before sending, so API codes like `AUTH_INVALID_CREDENTIALS` become `auth_invalid_credentials`, `macos-intel` becomes `macos_intel`, and a link to `/resources/privacy-policy` becomes `resources_privacy_policy`. Pass values as they are and let the helper normalise them.

## What GA4 already provides

Don't send any of this yourself: page views and page titles, referrer and traffic source, session and engagement time, scroll depth, outbound link clicks, file downloads from external links, OS, browser, device, screen size, country, city and language.

GA4 also records the page URL of every page view, including its query string, so values such as `?email=` or reset tokens on auth URLs can appear there. We accept this (agreed decision); it is automatic GA4 behaviour, not something our events send. Our own event parameters never contain URLs, emails or tokens.

## One action, one event

- A click that always opens a dialog logs the click only. The dialog opening is not a second event (Mac dialog, auth modal, change-plan dialog, dropdown menus).
- Don't give the same action two names. "Switch" on pricing and "Change plan" on billing both log `plan_change_clicked`, and `location` tells them apart.
- Nested clickable elements log once, from the element that represents the action.
- The Mac funnel uses a separate confirm event (`download_started`) so `download_clicked` never counts one download twice.
- External links aren't tracked by us, because GA4's outbound click tracking already covers them.

## Click tracking policy

> Meaningful user-clickable actions should be tracked so we can measure how often they're used and understand their context.

But:

> Don't add analytics to every DOM element, and don't create duplicate events to increase coverage.

Track navigation, product discovery, conversions, feature use and important decisions. For internal links use `NavigationLink` from `src/components/navigation-link.tsx`: it is a `next/link` that logs `navigation_clicked` with a `location` and `destination`, and works inside server components. Skip decorative elements (carousel, animated headline, globe), hovers, tooltips and dismissals.

## Before adding a new event

1. Does an existing helper already describe this action?
2. Can it use a meaningful `name` and a `location` from the list above?
3. Is the extra context actually useful for a decision?
4. Is GA4 already collecting this automatically?
5. Would it duplicate another event or add noise?

Only add a new helper when the nine existing ones genuinely can't describe the behaviour. Add any new event to the inventory below in the same change.

## GA4 limits

Event names up to 40 characters, parameter names up to 40, string values up to 100. Our longest event name is `password_reset_request_submitted` (32).

## build_id

The spec asked for a `build_id` on error events if the Next.js build id is readable in the browser. It isn't: this is the App Router (Next 16), which has no `__NEXT_DATA__` and no client-exposed build id. So it's omitted, never faked. To add it later, expose a real value (for example a commit SHA through a `NEXT_PUBLIC_` variable) and attach it inside `logError` in `src/lib/analytics.ts`.

## Event inventory

Every event the site sends. All events also carry `location`.

### Downloads

| Event                     | Location                                              | Details                                                                  | When                                                        |
| ------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `download_clicked`        | `hero` `header` `footer` `pricing` `download_section` | `platform` (absent on the fallback link shown before the OS is detected) | Any download button or build link                           |
| `other_platforms_clicked` | `hero`                                                | —                                                                        | "Other platforms" links under the hero download button      |
| `mac_build_selected`      | `mac_download_dialog`                                 | `platform`                                                               | Switching between Apple Silicon and Intel in the Mac dialog |
| `download_started`        | `mac_download_dialog`                                 | `platform`                                                               | "Yes, download" in the Mac dialog                           |

### Navigation and content

| Event                | Location                                                                     | Details                                                                                                                                                                                                   | When                                                                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navigation_clicked` | `footer` `header` `auth` `download_section` `not_found` `unsubscribe` `gift` | `destination` as a stable id, never a path: `features` `performance` `privacy` `languages` `pricing` `faq` `docs` `resources` `changelog` `privacy_policy` `terms_of_service` `home` `account` `download` | Internal links: footer, logos, the header "Account" item, "What's new" on the download page, Terms and Privacy on the auth pages, links on the 404 page |
| `pricing_viewed`     | `landing`                                                                    | —                                                                                                                                                                                                         | Pricing section scrolls into view, once per page view                                                                                                   |
| `faq_opened`         | `faq`                                                                        | `question`: `offline` `free` `platforms` `audio_privacy` `apps` `hardware`                                                                                                                                | Opening an FAQ question                                                                                                                                 |

### Sign in and sign up

| Event                                                         | Location           | Details                                                                                                                                          | When                                                      |
| ------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `signup_clicked`                                              | `header` `auth`    | —                                                                                                                                                | "Sign up" in the header or the auth card switch link      |
| `signin_clicked`                                              | `header` `auth`    | —                                                                                                                                                | "Sign in" in the header menu or the auth card switch link |
| `oauth_clicked`                                               | `auth`             | `provider`: `google` `github`, `mode`                                                                                                            | "Continue with" Google or GitHub                          |
| `forgot_password_clicked`                                     | `auth`             | —                                                                                                                                                | "Forgot password?"                                        |
| `signin_submitted` / `signin_completed` / `signin_failed`     | `auth`             | `mode`, `outcome` (`email_verification`), `error_type` (`auth_invalid_credentials` `auth_auth_method_not_allowed` `not_authenticated` `unknown`) | Sign-in form                                              |
| `signup_submitted` / `signup_completed` / `signup_failed`     | `auth`             | `mode`, `outcome` (`email_verification`), `error_type` (`auth_email_already_exists` `auth_password_policy_failed` `not_authenticated` `unknown`) | Sign-up form                                              |
| `password_reset_request_submitted` / `_completed` / `_failed` | `auth`             | `mode`, `error_type`                                                                                                                             | "Send reset email" form                                   |
| `password_reset_request_completed` / `_failed`                | `security`         | `error_type`                                                                                                                                     | "Send reset email" on the account security page           |
| `password_reset_confirm_submitted` / `_completed` / `_failed` | `auth`             | `mode`, `error_type` (`missing_token` `auth_request_rejected` `unknown`)                                                                         | Set-new-password form                                     |
| `email_verification_submitted` / `_completed` / `_failed`     | `auth`             | `mode`, `error_type` (`auth_invalid_verification_code` `not_authenticated` `unknown`)                                                            | Verification code form                                    |
| `verification_resend_completed` / `_failed`                   | `auth`             | `mode`, `outcome` (`sent` `already_verified`), `error_type` (`no_verification_id` `unknown`)                                                     | "Resend code"                                             |
| `signout_clicked` / `signout_failed`                          | `header` `account` | `error_type`                                                                                                                                     | "Sign out"                                                |

### Pricing, checkout and plans

| Event                                          | Location                                     | Details                                                                                                                                                                       | When                                                                       |
| ---------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `billing_interval_selected`                    | `pricing`                                    | `interval`: `monthly` `yearly`                                                                                                                                                | Monthly/yearly toggle                                                      |
| `upgrade_clicked`                              | `pricing`                                    | `plan`: `pro` `max`, `interval`, `provider`: `paddle` `stripe`; `outcome: start_now` on "Start Max now and pay today" during a gift                                           | Any upgrade button, signed in or out                                       |
| `checkout_failed`                              | `pricing`                                    | `plan`, `interval`, `provider`, `error_type` (`billing_already_subscribed` `billing_provider_not_available` `unknown`)                                                        | Checkout couldn't open                                                     |
| `checkout_completed`                           | `pricing` (Paddle) `billing` (Stripe return) | `plan` (Paddle only), `provider`                                                                                                                                              | Payment went through                                                       |
| `checkout_closed`                              | `pricing`                                    | `plan` (Paddle only), `provider`                                                                                                                                              | Left checkout without paying (Paddle overlay closed, Stripe cancel return) |
| `plan_change_clicked`                          | `pricing` `billing`                          | `plan`, `interval` (pricing only)                                                                                                                                             | "Switch" on pricing or "Change plan" on billing                            |
| `plan_change_completed` / `plan_change_failed` | `pricing` `billing`                          | `plan`, `interval`, `outcome` (`scheduled` `immediate`), `error_type` (`billing_plan_change_not_allowed` `billing_payment_failed` `billing_subscription_not_found` `unknown`) | Confirm in the change-plan dialog                                          |

### Account

| Event                                                 | Location            | Details                                                                     | When                            |
| ----------------------------------------------------- | ------------------- | --------------------------------------------------------------------------- | ------------------------------- |
| `subscription_resume_completed` / `_failed`           | `billing` `pricing` | `outcome` (`resumed` `processing`), `error_type`                            | "Resume" or "Keep subscription" |
| `billing_portal_completed` / `_failed`                | `billing`           | `error_type` (`billing_subscription_not_found` `unknown`)                   | "Manage billing"                |
| `profile_update_submitted` / `_completed` / `_failed` | `settings`          | `error_type`                                                                | Account name form               |
| `avatar_update_completed` / `_failed`                 | `settings`          | `error_type` (`unsupported_format` `too_large` `read_failed` `save_failed`) | Avatar upload                   |
| `account_deletion_completed` / `_failed`              | `settings`          | `error_type`                                                                | Delete account                  |

### Email notifications

| Event                                                  | Location        | Details                                                                                                  | When                                                                                           |
| ------------------------------------------------------ | --------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `email_subscribe_submitted` / `_completed` / `_failed` | `footer`        | `error_type`                                                                                             | Release updates form in the footer; the server answers the same for new and existing addresses |
| `email_preferences_update_completed` / `_failed`       | `notifications` | `topic` (`product_releases`), `subscribed`, `error_type` (`notification_preferences_conflict` `unknown`) | A topic toggle on the notifications page                                                       |
| `email_unsubscribe_all_completed` / `_failed`          | `notifications` | `error_type`                                                                                             | "Unsubscribe from all" on the notifications page                                               |
| `email_unsubscribe_completed` / `_failed`              | `unsubscribe`   | `error_type` (`notification_unsubscribe_token_invalid` `unknown`)                                        | "Unsubscribe" on the page linked from emails                                                   |

### Gifts

| Event                                             | Location  | Details                                                                          | When                                                            |
| ------------------------------------------------- | --------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `gift_viewed`                                     | `gift`    | `state` (`claimable` `claimed_by_you` `claimed` `expired` `revoked` `not_found`) | The gift page finished checking the link, once per state shown  |
| `gift_claim_submitted` / `_completed` / `_failed` | `gift`    | `plan`, `months`; `error_type` on failure (a `GIFT_*` code or `unknown`)         | "Claim my gift"                                                 |
| `gift_keep_plan_clicked`                          | `billing` | `plan`                                                                           | "Keep {plan} after your gift" on the billing page during a gift |

## Intentionally not tracked

- **Dialog, modal and menu opens** that always follow a tracked click. They'd count one action twice.
- **Dismissals** (closing the auth modal, cancelling the Mac dialog). Drop-off is visible from the funnel.
- **External links** (GitHub, Support, the Apple guide). GA4's outbound click tracking covers them.
- **Docs UI** (sidebar, search, table of contents). It's fumadocs internals, and page views already show which docs pages people read and in what order.
- **Navigation inside the account area** (sidenav, account header menu) **and changelog pagination.** Page views cover the destination.
- **Exploratory UI state:** radio changes in the change-plan dialog (the final choice is captured on confirm), expanding versions and "Show older versions" on the download page.
- **Decorative interactions:** carousel, animated headline, globe and canvases, hovers, tooltips.
- **Payment failures inside Paddle or Stripe.** They happen on the provider's side and reach us only through server webhooks.
- **OAuth provider failures.** Not observable in the browser; `oauth_clicked` without a later `signin_completed` shows abandonment.
- **`/dev` pages.** Internal tools. They return 404 in production; previews there reuse real components, so a click on dev can still reach the dev GA property.
- **Anything personal:** emails, names, ids, tokens, typed content.
