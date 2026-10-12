# Feature report: Checkpoint 2 (feature research)

Obsidian Intelligence marketing site. Researched 2026-10-12 against `main` after Batch 4 (`73c9e9c`). Nothing in `src/` was changed.

Evidence tags: **[V]** verified (primary source or my own measurement today), **[I]** inferred, **[U]** unverified. Sandbox measurements used scratch copies outside the repo (`npm ci` each, production builds, Playwright Chromium at a 390px viewport, gzip level default). Method and caveats are in §9.

---

## 0. Read this first: the baseline is not what the handoff says

The handoff states home JS is ~45 KB gzip with ~115 KB headroom. My measurements disagree, so every JS cost below is reported against measured numbers instead.

| Measurement (production build, 390px, all JS responses in a 4 s window) | Result |
|---|---|
| Next 16.4 "hello world" (one `<h1>`, no CSS framework) | **132.2 KB gz** [V] |
| This site, `/` (as on `main`) | **223.8 KB gz** (11 files) [V]. Same chunks sum to 229 KB brotli, which is what Vercel would serve [V] |
| Budget in PLAN §6 | 160 KB gz home, 120 KB other pages |

- The framework floor alone is 132 KB, so a 160 KB home budget leaves 28 KB for everything else. The site is ~64 KB over budget today, not 115 KB under. [V]
- The 45 KB figure was probably route-specific chunks without the shared framework chunks. [I]
- Source-map attribution of the 702 KB raw JS (all chunks, so unloaded ones are included): `next`+react-dom 441 KB, `motion-dom` 100 KB, `@base-ui/react` 59 KB + utils 13 KB, `cn` 25 KB, `framer-motion` 24 KB, all app code ~16 KB. [V]
- Motion costs on the bare scaffold: `LazyMotion`+`domAnimation`+`m.div` with `whileInView` **+34.4 KB gz**; adding `useScroll`+`useTransform` +3.3 KB more; `domMax`+`layout` +4.5 KB more than `domAnimation`; `motion/mini` `animate()` only **+3.1 KB**. Base UI accordion+dialog together **+23.8 KB**. [V]

Local Lighthouse 13.5.0 (mobile preset, simulated throttling, headless Chromium on this container; **not** a Vercel preview, treat as lab data):

| Page | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` | **83** (budget ≥90) | **95** (budget 100) | 100 | 100 | **3.7 s** (≤2.0) | **270 ms** (≤150) | 0.001 |
| `/playbooks/hvac` | 92 | 100 | 100 | 100 | 3.2 s | 140 ms | 0.001 |

- LCP element is the hero `<h1>` (text, not animated). LCP breakdown: TTFB 67 ms, **element render delay 1,197 ms**. Script evaluation 859 ms (react-dom chunk alone 523 ms) under 4× CPU throttle. The cause of the render delay is **not determined** [U]; candidates are hydration contention and font swap. It needs a trace on a real preview before any fix is chosen.
- Two real a11y failures on `/` [V]: `color-contrast` on the dimmed (opacity 0.55) workflow node text and mono labels, and `heading-order` (the `<h3>` node titles follow the `<h1>` with no `<h2>`). The "lowest token pair 6.98:1" check in Batch 1 covered tokens, not the dimmed animated state.
- Everything else I tested (form, OG, MDX, view transitions) builds and keeps all routes static.

**Consequence:** the first batch should be a baseline repair, not a feature (see §5). The owner also needs to decide whether to keep the 160 KB budget (needs a JS diet) or re-set it (§4.6).

---

## 1. Executive summary

1. **Build now (in order):** Batch 5 baseline repair + measurement scripts; contact form (Server Action + Resend + Turnstile + honeypot); booking link-out + click-to-call; sticky mobile CTA bar; Vercel Analytics with conversion events; missed-call calculator; animate playbook diagrams on view; OG images; security headers.
2. **Reject:** WebGL hero (three +128.7 KB, R3F+three +234.7 KB, OGL +13.1 KB gz, all on an LCP-text hero for a phone audience), GSAP (+42.6 KB, second runtime), Lenis, Rive (+63 KB JS and an **811 KB gz WASM fetched from unpkg by default**), cmdk palette, MDX for playbooks, audio, Motion-based page transitions, pricing toggle, Google Places review embed, map embed, `wdth` animation on headings.
3. **Optional polish:** React `<ViewTransition>` (+0.0 KB measured, works with `next/link` in Chromium), service-split hover, pointer-responsive facets.
4. **Form backend:** Server Action → Resend (free: 3,000/mo, 100/day) with Turnstile + honeypot. Runner-up: Formspree. Prototype verified: `/contact` stays static, works with JS off, +1.4 KB JS.
5. **Booking:** link-out to a hosted Cal.com page (no embed, 0 KB). Runner-up: Google Calendar appointment page. Cal.com embed costs ~23 KB of third-party JS on load for little gain.
6. **Hosting:** Vercel **Hobby is non-commercial only** and this site advertises a business service, so **Pro ($20/mo) is required** [V]. Runner-up is unverified (other hosts).
7. **Analytics:** Vercel Web Analytics (+1.8 KB package code, cookieless). Runner-up: Plausible ($9/mo, EU-hosted).
8. **Legal:** none of the likely providers (Vercel, Resend, Cloudflare, Cal.com) offers a Canadian-resident option for this use, so the privacy page must disclose foreign service providers and name a contact person (Alberta PIPA s.13.1, secondary sources only, needs counsel).
9. **Owner decisions needed:** hosting plan, JS budget reset, domain and email (blocks Resend and canonical URLs), business phone number, booking provider, analytics, privacy contact person (§4).

---

## 2. Ranked recommendation table

JS = delta on the home page vs the 223.8 KB baseline unless stated (gzip, includes third-party scripts that load on page load). Effort S ≤1 day, M 1–3 days, L >3 days.

| # | Feature | Impact on booking audits | JS added (measured) | Effort | Risk | Verdict |
|---|---|---|---|---|---|---|
| 1 | Baseline repair (a11y fixes, LCP investigation, JS diet, scripts) | Prerequisite; protects every budget | negative target (est. −30 KB, not yet proven) | M | Low | **Build (Batch 5)** |
| 2 | Contact form (Server Action + Resend + Turnstile + honeypot) | Very high | +1.4 KB (form leaf); Turnstile adds ~29 KB incl. Cloudflare scripts, load only on `/contact` | M | Medium (domain/DNS, privacy copy) | **Build** |
| 3 | Booking link-out (Cal.com hosted) + `tel:` click-to-call | Very high | 0 | S | Low | **Build** |
| 4 | Sticky mobile "Book a free audit" bar | High | 0 (pure CSS server component) | S | Low (WCAG 2.4.11) | **Build** |
| 5 | Vercel Web Analytics + conversion events | High (decisions, not conversion) | +1.8 KB package; injected script unmeasured [U] | S | Low | **Build** |
| 6 | Missed-call cost calculator | Medium-high | +0.2 KB | S | Low (no invented figures) | **Build** |
| 7 | Playbook diagrams animate on view (reuse `ScrollWorkflow`) | Medium | ~0 (component already shipped) [I] | S | Low | **Build** |
| 8 | Dynamic OG images (`next/og`) | Medium-low | 0 (server only) | S | Low | **Build** |
| 9 | Security headers + `security.txt` | Medium (credibility for a security-led MSP) | 0 | S | Low | **Build** |
| 10 | View Transitions (React `<ViewTransition>`) | Low | +0.0 KB | S | Medium (pinned hero, scroll restore) | Defer (polish) |
| 11 | Service-split hover/expand | Low | 0 if CSS/`<details>` | S | Low | Defer |
| 12 | Pointer-responsive facet background | Low (phones have no pointer) | ~1 KB [I] | M | Low | Defer |
| 13 | MDX for playbooks | None now | 0 | M | Low | Reject for now |
| 14 | cmdk / command palette | None | +19.2 KB | M | Medium (pulls Radix) | Reject |
| 15 | Lenis smooth scroll | None on phones | +5.0 KB | S | Medium (a11y) | Reject |
| 16 | GSAP + ScrollTrigger | None | +42.6 KB | M | Medium | Reject |
| 17 | WebGL shard (OGL / three / R3F) | Negative | +13.1 / +128.7 / +234.7 KB | L | High | Reject |
| 18 | Rive workflow nodes | Negative | +63.4 KB JS **and 811 KB gz WASM from unpkg** | L | High | Reject |
| 19 | Pricing monthly/annual toggle | None (no prices exist) | `domMax` +4.5 KB | S | Low | Reject |
| 20 | Variable-font `wdth` heading animation | Negative on h1 | 0 | S | Medium (CLS, LCP) | Reject (h1); optional on small labels |
| 21 | Audio feedback | Negative | n/a | S | Medium | Reject |
| 22 | Google Places review embed / map embed | Low | API key + cost | M | High | Reject (link-out only) |
| 23 | AI demo | Medium | n/a | L | High | Defer, no free-tier path verified |

---

## 3. Per-feature sections

### 3.1 Baseline repair and measurement tooling (Batch 5)

- **What:** fix the two a11y failures, trace the LCP render delay on a real preview, reduce shared JS, and put the measurement scripts used here into the repo so every later batch has a number.
- **Why:** budgets are currently missed (§0). Features stacked on this baseline will make it worse.
- **Plan:**
  - A11y: raise the dimmed state of node text so it passes AA (or dim with a token that passes rather than opacity 0.55); change node titles in `scroll-workflow.tsx` / `workflow-diagram.tsx` from `<h3>` to a heading level that follows the section structure (the hero has only an `<h1>`).
  - JS diet candidates (not yet proven on real components, each must be measured): replace `Reveal` (`m.div` + `whileInView`) with an IntersectionObserver/CSS approach or `motion/mini` (+3.1 KB vs +34.4 KB for the lazy feature bundle); replace the FAQ Base UI accordion with native `<details name="faq">` (zero JS, works without JS) [I]; load the mobile-nav Sheet (Base UI dialog) on first tap; split `site-header.tsx` into a server nav plus a small client scroll wrapper (already in IDEAS). The `cn` package contributes 25 KB raw [V], worth checking against `clsx`+`tailwind-merge` [U].
  - Scripts: `npm run lh` (local Lighthouse CLI, worked here with `CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`), `npm run a11y` (`@axe-core/playwright` 4.13.0, MPL-2.0, Aug 2026), `npm run measure:js` (the gzip-sum Playwright script). `next experimental-analyze` already ships with Next 16.4 [V] (its output is a binary viewer format, so use `--output` plus the browser UI; I used source maps + `source-map-explorer --no-border-checks` for attribution).
  - `eslint-plugin-jsx-a11y` is already in `eslint-config-next` [V].
- **Cache Components:** no impact.
- **Cost:** free. `@lhci/cli` 0.15.1 (June 2025) needs CI under `.github/`, which is off-limits without approval, so use the local scripts.

### 3.2 Contact form (Server Action + Resend + Turnstile + honeypot)

See decision §4.1 for provider comparison. Prototype built in a scratch copy:

- Files: `src/app/contact/actions.ts` (`"use server"`, `zod` v4 validation, honeypot field, `headers()` for client IP), `src/app/contact/form.tsx` (`useActionState`), `contact/page.tsx` imports the form.
- **Verified:** `/contact` remains `○ Static` in the build output; with **JavaScript disabled** an invalid submit returns field errors and a valid submit returns the success message (React renders `<form action>` with a progressive-enhancement action ID); with JS enabled the same results. JS delta on every page +1.4 KB gz (zod stays server-side). Prefetch makes it show on `/` too.
- **Spam:** honeypot (hidden field, `tabIndex=-1`, off-screen not `display:none`) + Turnstile token verified server-side via `https://challenges.cloudflare.com/turnstile/v0/siteverify` + a minimum-time-to-submit check [I]. Turnstile: free, unlimited challenges, 20 widgets, 10 hostnames/widget, Cloudflare branding stays [V]. Vendor claims WCAG 2.2 AAA [vendor claim, **not tested** by me]. Loading `@marsidev/react-turnstile` 1.6.2 on the home page measured +29.2 KB, almost all of it Cloudflare's own scripts; load it only on `/contact`, ideally on first field focus, and consider skipping the wrapper package for a small `next/script` + `useEffect`.
- **Rate limiting:** Vercel WAF rate limiting is on all plans: Hobby 1 rule, Pro 40, fixed window 10 s to 10 min, keys IP/JA4 [V]. One rule (for example `POST /contact`, 5 per 10 min per IP) is enough; counters are per region [V]. Resend's 100/day free cap is also a natural ceiling [V]. No Redis needed.
- **Server Action vs route handler:** use the Server Action (shown working). Next checks `Origin` vs `Host` for CSRF [V, `server-actions.md`]. Under Cache Components a Server Action is runtime-only, so reading `headers()` inside it is fine and the page stays static [V].
- **Secrets:** `.env.example` with `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. None committed.
- **Deliverability:** Resend recommends sending from a subdomain and verifying the domain; DMARC/BIMI improve inbox placement [V]. Needs DNS access to the owner's domain, which is currently unknown. Sending from Resend's shared test address is limited to the account owner's own address [U, from memory, check before relying on it].
- **A11y plan:** labels + `autocomplete` tokens, `aria-invalid` + `aria-describedby` per field, `role="status"`/`aria-live=polite` for success, focus moved to an error summary after failed submit (the prototype does not do this yet), 44 px targets, no placeholder-as-label. Errors in text, never colour only.
- **Data:** email only, no database; submissions live in the owner's inbox and Resend logs (30-day retention on free) [V].
- **Reduced motion/no-JS:** no animation; verified no-JS path.

### 3.3 Booking link-out and click-to-call

See decision §4.2. Plan:

- `/contact`: primary button "Pick a time" linking to the hosted booking page (plain `<a href>`, opens in the same tab or `target=_blank rel=noopener` with a visible "opens in a new tab" hint), above the form; "Prefer to call?" with `tel:` link.
- `tel:` format E.164, for example `tel:+1403XXXXXXX` (needs the owner's number). Add `telephone` to the `ProfessionalService` JSON-LD in `layout.tsx`. Track `tel` and booking clicks as analytics events (§3.5).
- JS: 0. No-JS: fully works.
- Embed later only if data shows people leave at the link-out: click-to-load iframe, not a script on page load.

### 3.4 Sticky mobile "Book a free audit" bar

- Pure server component, `fixed inset-x-0 bottom-0 md:hidden`, safe-area padding, `z-30` below the sheet. 0 JS, works with no JS and reduced motion (no animation).
- **A11y risk (verified requirement):** WCAG 2.2 SC 2.4.11 Focus Not Obscured fails when a sticky footer fully covers the focused control; fixes are scroll padding or similar [V, W3C Understanding doc]. Add `scroll-pb-24` on `html`, bottom padding on the footer, and hide it on `/contact`. Test with keyboard Tab on the 390px viewport.
- Never cover the form's submit button; hide when the on-screen keyboard is open [I].
- Resolves the IDEAS item about the header CTA hidden below 640px.

### 3.5 Analytics: Vercel Web Analytics + Speed Insights

See decision §4.3.

- `@vercel/analytics` 2.0.1 and `@vercel/speed-insights` 2.0.0, both peer-compatible with Next ≥13 and React 19 [V]. Added both to the layout: **+1.8 KB** gz in my build [V]; the injected `/_vercel/insights/script.js` was not served locally so its size is unmeasured [U].
- Cookieless: visitors identified by a request hash discarded after 24 h; no cross-site identifiers; no IP stored per Vercel's docs [V, vendor claim].
- Custom events (`track("book_click")`, `tel_click`, `form_submit`, `calculator_used`) are Pro-only, 2 properties each [V].
- Pricing: Pro includes no events; **$0.03 per 1K events**, covered by the $20 monthly usage credit; Hobby 50K free but Hobby is not allowed here [V].
- Cache Components: client component in the layout, built fine.
- Do not add `aggregateRating` or any invented numbers to JSON-LD.

### 3.6 Missed-call cost calculator

- Three inputs: missed calls per week, share that would have booked, average job value. Output: monthly and annual revenue at risk. Formula only; **no pre-filled industry statistics**. Use empty inputs with example placeholders and an "example, edit" label, or defaults marked as illustrative like the existing $640.
- Prototype: `useState` client leaf, `<output aria-live="polite">`, `inputMode="numeric"`, `en-CA` currency formatting: **+0.2 KB** gz [V].
- Place on `/automation` and link from the home leaks section. Pass the result into `/contact` as a prefilled message line (query string or a form hidden field) for better lead quality.
- No-JS: render a static worked example plus the CTA; the calculator itself needs JS (acceptable, say so in a `<noscript>`).
- Reduced motion: no counting animation; the result simply updates.

### 3.7 Playbook diagrams animate on view

- Swap `WorkflowDiagram` for `ScrollWorkflow` in `/playbooks/[slug]` (and optionally `/automation`). The component already exists and takes `WorkflowNode[]`; the no-JS and reduced-motion lit states are already in `globals.css` [V from code].
- Impact on JS: the component is already in the home chunk; playbook routes load it too (small, ~4 KB source) [I, unmeasured].
- Keep the server `WorkflowDiagram` as the fallback (`<noscript>` or SSR output) so LCP and crawlers see the same text. The diagram is below the fold, so LCP is unaffected [I].
- Re-run the long-task check at 4× CPU (0 long tasks during scroll on the home hero per the handoff).

### 3.8 Dynamic OG images (`next/og`)

- **Verified under Cache Components:** `src/app/opengraph-image.tsx` is `○ Static`; `src/app/playbooks/[slug]/opengraph-image.tsx` with `generateStaticParams` prerenders four `●` images at build time (`.body` and `.meta` files present). Zero client JS.
- Limits: 500 KB bundle including fonts, `ttf`/`otf`/`woff` only [V, Next docs `image-response.md`]. Archivo is OFL and can be committed as `ttf` in `src/app/` (read once at module scope).
- Tension with the "no hardcoded colours" rule: `ImageResponse` cannot read CSS variables. Mirror the token values in one `src/lib/og-tokens.ts` with a comment and treat OG as an exception, or the owner may prefer hex literals there [decision for the build batch].
- Depends on a real domain (`NEXT_PUBLIC_SITE_URL`) for absolute URLs in social previews.
- Unknown playbook slugs get no OG image (already a soft-404 case).

### 3.9 Security headers and `security.txt`

- A security-led MSP will be judged on its own site's headers. Add `headers()` in `next.config.ts`: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geolocation off), `frame-ancestors` via CSP or `X-Frame-Options`. Add `/.well-known/security.txt`.
- A **nonce-based CSP forces dynamic rendering** [V, Next `content-security-policy.md`: "you must use dynamic rendering to add nonces"], which breaks the static/PPR setup. Use a static, hash-free policy only if every third-party origin (Turnstile, Vercel analytics) is enumerated; otherwise ship the non-CSP headers first.
- Never claim a grade the site has not actually achieved.

### 3.10 View Transitions API (React `<ViewTransition>`)

- Next 16.4 + React 19.3: `<ViewTransition>` works in the App Router with no config [V, Next `view-transitions.md`].
- **Measured:** wrapping `{children}` in `layout.tsx` adds **+0.0 KB**; a nav click on `/` → `/pricing` called `document.startViewTransition` exactly once (Chromium, `next start`) [V].
- Support: same-document view transitions are Baseline "newly available" since October 2025 [V, MDN]; React's transition types need newer engines, and the Next docs say some animations differ in older browsers [V]. Fallback is a normal instant navigation.
- Plan: wrap `children` only (header stays put), default cross-fade ≤200 ms, and add a reduced-motion CSS rule that disables `::view-transition-*` animation [I, standard media query]. Test: the 230svh pinned hero, scroll restoration, and hash links; I did not test visual behaviour with the pinned scene [U].
- Verdict: defer until the conversion items ship, then trial it behind a quick rollback. Motion `AnimatePresence` page transitions are a worse fit (need the old route kept mounted, fight App Router, add bytes): reject.

### 3.11 WebGL obsidian shard hero (rejected)

- Measured on the home page (minimal shard-like mesh, nothing else): `three` direct **+128.7 KB**, `@react-three/fiber` + three **+234.7 KB**, `ogl` 1.0.11 (Unlicense, last release Jan 2025) **+13.1 KB** gz [V]. R3F 9.8.1 peers `react >=19 <19.4`, so it is compatible with React 19.3 [V].
- Even OGL's small shader still means a canvas, GPU work and battery on a phone, a second reduced-motion/no-JS path, and a hero whose LCP is text that already misses its budget today (§0).
- Best defensible form if the owner insists: OGL, dynamic import, only on `(pointer: fine) and (min-width: 1024px)`, static SVG fallback. Still reject for v1; the CSS/SVG facet field is the planned approach.

### 3.12 GSAP ScrollTrigger vs Motion (rejected)

- GSAP 3.15.0 is under Webflow's "Standard 'no charge' license"; commercial use is free including ScrollTrigger and SplitText; restrictions: no building tools that compete with Webflow's animation builder, no removing notices; Webflow may update the licence [V, gsap.com/standard-license 2026-10-12].
- Measured **+42.6 KB** gz for core + ScrollTrigger [V]. Motion's `useScroll` already drives the hero (+3.3 KB beyond the feature bundle). A second animation runtime buys nothing. Reject.

### 3.13 Lenis (rejected)

- lenis 1.3.26 (MIT, Aug 2026), **+5.0 KB** [V]. Smooths wheel scrolling on desktop; by default it does nothing for touch [I], and this audience is on phones. It adds risk for keyboard scrolling, anchor links, `scroll-padding`, find-in-page and reduced motion, all of which would need re-verification [I]. Reject.

### 3.14 Rive (rejected)

- `@rive-app/react-canvas` 4.36.0 (MIT, Sept 2026). **Measured:** +63.4 KB gz of JS on page load, and the runtime requested **`https://unpkg.com/@rive-app/canvas@2.44.0/rive.wasm`, 811 KB gzip, from a third-party CDN by default** [V]. That adds a third-party dependency, an IP leak to unpkg for every visitor, and a CSP allowance. Self-hosting the WASM is documented on a separate page I did not read [U].
- Also needs a `.riv` asset authored in the Rive editor and a text alternative for a canvas. The SVG diagram already communicates the workflow. Reject.

### 3.15 Command palette (rejected)

- `npx shadcn add command` installs cmdk 1.1.1 plus `dialog`, `input-group`, `input`, `textarea` [V]. The shadcn layer uses Base UI's dialog, but **cmdk 1.1.1 itself depends on `@radix-ui/react-dialog`** (+ react-id, react-primitive, compose-refs) [V from `package.json`], so the site would ship two dialog stacks. Last release March 2025 [V]. Measured eagerly mounted: **+19.2 KB** [V].
- 4 playbooks do not need search; phones have no ⌘K. If ever wanted, Base UI 1.9.0 ships `autocomplete` and `combobox` [V from package listing]. Reject for v1.

### 3.16 MDX for playbooks (rejected for now)

- `@next/mdx` 16.4.0 with `mdx-components.tsx` and `pageExtensions` builds a `.mdx` page as `○ Static` under Cache Components with ~0 client JS [V].
- Playbooks are structured data (nodes, tools, measures) feeding a diagram component; MDX adds a layer without benefit. Revisit when long-form content (case studies, articles) exists.

### 3.17 Unbuilt PLAN §4 motion items

| Item | Verdict | Reason |
|---|---|---|
| Playbook diagrams on view | Build | §3.7 |
| Service-split hover/expand | Defer | Hover does not exist on touch; do it with `<details>`/CSS if wanted (0 JS) |
| Pricing toggle | Reject | No prices exist; `domMax` +4.5 KB just for `layout`; inventing prices is barred |
| Pointer-responsive facets | Defer | Desktop only, rAF listener, off for touch and reduced motion |
| `wdth` heading animation | Reject on `h1`/LCP | Archivo `wdth` is already loaded (3 font files, 137 KB total on home [V]), so cost is 0 KB, but changing width reflows text; scroll-driven reflow counts toward CLS and the LCP element is the h1. Fine only as a CSS hover on short labels |
| Sticky mobile bar | Build | §3.4 |

### 3.18 Things the candidate list missed

| Item | Reason it helps a trades owner book | Verdict |
|---|---|---|
| Click-to-call `tel:` | Phone-first audience between jobs; one tap | Build (§3.3), needs number |
| Claim and verify the Google Business Profile (off-site, free) | Calgary local search is dominated by the map pack; no code | Owner action, recommend |
| Link-out to Google reviews once real reviews exist | Proof without invented numbers | Build later; no API |
| Places API review embed | Reviews need the "Place Details Enterprise + Atmosphere" SKU: 1,000 free events/mo then $25 per 1,000 [V]; needs an API key and owner approval | Reject |
| Review stars in JSON-LD | Self-serving `LocalBusiness`/`Organization` reviews are **ineligible** for star results [V, Google docs] | Do not add `aggregateRating` |
| Trade-specific local landing pages | Existing `/playbooks/[slug]` already serve this. Google's doorway policy names "multiple pages targeted at specific regions or cities" as spam [V]; each page needs unique substantive content | Do not clone per-city pages |
| Service-area section | Text list of real areas + `areaServed` (currently just "Alberta"); no Google Maps embed (heavy JS, cookies) | Build (S) when the owner confirms areas |
| Security headers + `security.txt` | Credibility for a security-led MSP | Build (§3.9) |
| Tooling (`lh`, `a11y`, `measure:js`) | Prevents the budget drift found in §0 | Build (§3.1) |
| Email authentication (SPF/DKIM/DMARC) on the owner's domain | Required for form email to land; also a security credibility item | Part of Final batch |

---

## 4. Decisions for the owner

### 4.1 Contact form backend and email delivery

| | Server Action + Resend (recommended) | Formspree (runner-up) | Web3Forms | Vercel-native only |
|---|---|---|---|---|
| Free tier | 3,000 emails/mo, 100/day, 3 domains, 30-day log retention [V] | 50 submissions/mo, 30-day archive, 1 user, "for testing and development" [V] | 250/mo reported on official pricing page; direct fetch blocked (403), figure from a search snippet of the page [U] | n/a: Vercel has no email service; needs an email API anyway |
| Spam | Turnstile (free) + honeypot + WAF rate limit, all ours | Formshield ML filtering + reCAPTCHA option; honeypots and custom rules paid [V] | hCaptcha free; Turnstile on paid plan (~$149/yr) [U] | n/a |
| Paid | Pro $20/mo, 50K emails [V] | $10–$90/mo depending on billing period (page is inconsistent) [V] | ~$149/yr [U] | n/a |
| Data residency | us-east-1, eu-west-1, sa-east-1, ap-northeast-1; **no Canada** [V] | US (not verified) [U] | Not verified [U] | Vercel Functions default `iad1`; `yul1` Montréal exists [V] |
| Control and a11y | Full control of markup, errors, no-JS flow (prototype verified) | Hosted POST + redirect; own markup possible but errors are theirs | Same as Formspree | Full |
| JS | +1.4 KB (+Turnstile on `/contact`) | ~0 | ~0 | n/a |

**Recommendation:** Server Action + Resend + Turnstile + honeypot + one WAF rate-limit rule. Reasons: free at this volume, no stored database, full control of accessible states, and the no-JS path is proven.
**If the owner prefers none of the US email path:** send through the owner's own mailbox over SMTP from a function pinned to `yul1` (`preferredRegion` exists in the Next 16.4 docs [V]; whether it is honoured with Cache Components is unverified [U]). Email still crosses a mail provider, so disclosure is still needed.
**If Formspree is picked:** lose full control of error states, the 50/mo free cap is easy to hit, and spam rules are paywalled. Fine for a quick launch; swap later by changing one action.

### 4.2 Booking calendar

| | Cal.com hosted, link-out (recommended) | Google Calendar appointment schedule | Calendly | TidyCal |
|---|---|---|---|---|
| Free tier | Free for one user, unlimited event types, no usage limits [V] | One booking page, unlimited appointments, no charge [V, search summary of Google help] | One event type, one calendar, Calendly branding stays [V] | Unlimited bookings, 1 calendar, TidyCal branding, 1% fee on paid bookings [V] |
| Embed | `@calcom/embed-react` 1.5.3 (Apr 2025, "SEE LICENSE"): wrapper ~0.6 KB but `embed.js` is **22.4 KB gz (93 KB raw)** from `app.cal.com`, loaded on page load [V]; total ~23 KB | Embeddable per third-party guides [U] | Not listed on Free [V] | Not documented [V] |
| Link-out | Plain URL, works with no JS | Plain URL | Plain URL | Plain URL |
| Canadian data | Hosted US; EU region (Cal.eu) only for orgs of 50+ and not generally available [V]; Canada not offered [U] | Google (US/global) | Not stated [V] | Not stated |
| Commercial terms | Pricing page does not state restrictions for free commercial use [U] | Google terms apply | Free is "for individuals" [U] | Lifetime deal via AppSumo ($29) [V] |
| Risk | Cal.com's open repo is now "Cal.diy", described as self-hosted, "non-production"; commercial users are told to use Cal.com [V]. Hosted Cal.com continues; do not self-host | Lowest vendor risk, fewest features | Branding, 1 event type | Small vendor |

**Recommendation:** Cal.com hosted free plan, plain link-out from `/contact`, the sticky bar and the home CTA. It costs 0 KB, works with no JS, and the third-party calendar page handles its own a11y (I could not test its a11y here [U]). The "45-minute audit" is one event type, so any of these four fits.
**Runner-up:** Google Calendar appointment schedule (single page, free), best if the owner already lives in Google.
**If the owner wants an embed:** make it a click-to-load iframe on `/contact` only, never a script on page load; a11y of the embedded iframe is unverified and must be keyboard-tested.

### 4.3 Analytics

| | Vercel Web Analytics (recommended) | Plausible Cloud | Cloudflare Web Analytics | Umami Cloud |
|---|---|---|---|---|
| Cost | Pro: $0.03/1K events, no included events, inside $20 credit; Hobby not allowed [V] | $9/mo Starter, 30-day trial, no free plan [V] | Free, works without proxying via a JS beacon [V] | Hobby free: 100K events/mo, 1 site, 6-month retention [V] |
| Cookies | None; hash-based visitor id, discarded 24 h [V, vendor] | None (vendor) [U] | No cookies/localStorage, no fingerprinting [V, vendor] | None (vendor) [U] |
| Residency | Vercel infrastructure (US/global) [U] | EU-hosted [V] | Global [U] | "US and EU" servers, no region choice stated [V] |
| Custom events | Pro only, 2 properties [V] | Yes | No | Yes |
| Retention | 12 months on Pro [V] | 3 years [V] | 7 days raw, then ~10% sampled aggregate; 6 months queryable [V] | 6 months free |
| Size | +1.8 KB package code [V] | ~1 KB script [U] | beacon [U] | ~2 KB script [U] |

**Recommendation:** Vercel Web Analytics, because Pro is already required and conversion events (`book_click`, `tel_click`, `form_submit`) are the point.
**Runner-up:** Plausible ($9/mo, EU-hosted, 3-year retention) if the owner wants the data off the hosting vendor.
**If Cloudflare/Umami free:** acceptable for pageviews, but Cloudflare has no conversion events and heavy sampling.
**Consent:** all four are cookieless/aggregate; whether a consent banner is needed under PIPEDA/PIPA depends on counsel's view of anonymous analytics. The OPC guidance page I tried to fetch returned 404, so I have **not verified** the regulator's position [U]. The existing privacy page promises to update before analytics ships.

### 4.4 Hosting plan

- **Vercel Hobby is "restricted to non-commercial personal use only."** Commercial usage is "any Deployment that is used for the purpose of financial gain of anyone involved in any part of the production ... including a paid employee or consultant writing the code"; "advertising the sale of a product or service" is listed [V, Vercel fair use guidelines, updated 2026-09-14]. This site qualifies, including its previews.
- **Pro $20/mo** (1 developer seat, $20/month per extra seat, $20 usage credit, 1 TB transfer, custom events in analytics) [V, vercel.com/pricing].
- Needed to deploy and measure on a preview: connect the GitHub repo in the Vercel dashboard (Git integration deploys on push; the Vercel MCP is unauthenticated here and not required [V from handoff]); previews are normally behind Deployment Protection, so run Lighthouse with the `x-vercel-protection-bypass` header (bypass for automation is available on all plans, header name and secret per Vercel docs [V]); set env vars (§3.2) for Preview and Production.
- **Runner-up:** another host (Cloudflare, Netlify). I did **not** verify Next 16.4 Cache Components, Server Actions or `next/og` there [U]; not recommended without a spike.
- **If Hobby anyway:** you risk the account being paused under the fair-use terms [V].

### 4.5 Domain, email, phone, privacy contact (blocking inputs)

Resend needs DNS control of a real domain; JSON-LD, OG URLs and canonical URLs need the real hostname; `tel:` needs a number; Alberta PIPA's foreign-provider notice names a person or position who can answer questions [secondary sources, §7]. None of these is known today.

### 4.6 JS budget

Current 223.8 KB gz on home against 160 KB (§0). Options:
1. **Re-set to a measured, honest budget** (for example ≤230 KB gz home / ≤200 KB static pages, enforced by `measure:js`) and spend the diet effort only where it pays. Recommended; the framework floor is 132 KB.
2. **Keep 160 KB** and do the diet in §3.1 first; it may not reach it without dropping `motion` on the hero.
Either way, recommend LCP, TBT and a11y budgets (which users feel) outrank the raw JS number.

---

## 5. Proposed batch sequence (Batch 5 onward)

| Batch | One concern | Acceptance test |
|---|---|---|
| 5 | Baseline repair + tooling | Lighthouse a11y 100 on `/` (contrast and heading-order fixed); `npm run measure:js` committed and home number recorded; LCP render-delay cause identified from a trace; JS diet items measured, kept only if each saves real bytes; build + lint green |
| 5b (owner, no code) | Vercel Pro, project connected, previews live, env vars set | A preview URL loads; Lighthouse CLI passes with bypass header |
| 6 | Contact form | Submits with JS on and off; invalid and valid states announced to a screen reader; honeypot and Turnstile reject a scripted POST; rate-limit rule returns 429; `/contact` still static; `.env.example` present; privacy page updated; real email lands in the inbox with SPF/DKIM pass |
| 7 | Booking link-out + `tel:` | Both links work with no JS; 44 px targets; JSON-LD `telephone` valid; booking click visible in analytics |
| 8 | Sticky mobile bar | At 390px keyboard Tab never lands under the bar (2.4.11); hidden on `/contact`; no CLS; 0 JS added |
| 9 | Vercel Analytics + conversion events | Events appear in the dashboard from a preview; no cookies set; privacy page lists the provider and country |
| 10 | Missed-call calculator | Pure formula, no invented figures, labelled illustrative; screen-reader announces results; no-JS fallback readable; +≤1 KB gz |
| 11 | Playbook diagrams animate on view | Reduced-motion and no-JS show the fully lit diagram; 0 long tasks at 4× CPU on `/playbooks/hvac` |
| 12 | OG images | `/opengraph-image` and four playbook images prerendered; share preview renders; fonts under 500 KB bundle |
| 13 | Security headers + `security.txt` | Headers present on every route (curl); site still static; no CSP nonce |
| 14 (optional) | React `<ViewTransition>` | Nav transition ≤200 ms; reduced-motion disables it; no scroll-restore or pinned-hero regressions; Lighthouse unchanged |
| Final | Production domain, DNS (SPF/DKIM/DMARC), real Lighthouse on the preview/production URL, privacy review by counsel, resolve `TODO(content)` | Section 6 budgets (as re-set in §4.6) met on the deployed URL |

One concern per PR, plain `git`, `.github/` untouched throughout.

---

## 6. Rejected list (log as `[rejected]` in `docs/IDEAS.md` once the owner confirms)

| Item | Reason |
|---|---|
| WebGL shard hero (three / R3F / OGL) | +13 to +235 KB gz on an LCP-text hero; phone battery; dual fallbacks; no booking benefit |
| GSAP + ScrollTrigger | +42.6 KB; second runtime; Motion already does the scroll scene |
| Lenis | +5.0 KB; no effect on touch; a11y regression risk |
| Rive | +63 KB JS plus 811 KB gz WASM from unpkg by default; third-party and privacy exposure |
| cmdk command palette | +19 KB; drags in Radix next to Base UI; 4 playbooks do not need search |
| MDX for playbooks | No benefit for structured data; revisit for long-form content |
| Audio feedback | Confirmed reject: no information value, autoplay and a11y issues, job-site context |
| Pricing toggle | No prices exist; `domMax` cost; invented prices barred |
| Motion `AnimatePresence` page transitions | Fights App Router; bytes; React `<ViewTransition>` is the only variant to consider |
| Google Places review embed | API key and cost (1,000 free/mo then $25 per 1,000) for a feature with no reviews yet |
| Google Maps embed | Heavy JS and cookies; text service area instead |
| Per-city doorway pages | Named in Google's spam policy |
| `aggregateRating` on own business JSON-LD | Ineligible for stars; risks a manual action |
| `wdth` animation on headings/h1 | Reflow and CLS; LCP element |
| Cal.com or Turnstile scripts on page load | Load only where needed (`/contact`), on interaction |

---

## 7. Open questions and unverified items

Owner:
- Production domain and mailbox; business phone; confirmed service areas; privacy contact person.
- Which booking provider the owner already has an account with.
- Whether to re-set the JS budget (§4.6).
- Whether Pro is approved at $20/mo.

Unverified [U], to confirm before or during the relevant batch:
- Cause of the 1.2 s LCP render delay; all Lighthouse numbers are from this container, not a Vercel preview.
- Why the earlier 45 KB figure differed (my guess: framework chunks omitted).
- Alberta PIPA s.13.1 and s.6 wording: only 2010-era commentary and vendor summaries were reachable; the statute text and Service Alberta guidance were not fetched. OPC guidance page returned 404. **Not legal advice; privacy page needs counsel.**
- Provider residency for Formspree, Web3Forms, Cal.com (Canada), Vercel Analytics storage location.
- Web3Forms free/paid figures (official page returned 403; snippet only).
- Cal.com free-plan commercial terms and embed a11y; Google Calendar embed support; Turnstile's AAA claim.
- Whether `preferredRegion: 'yul1'` is honoured with Cache Components.
- Resend test-sender limitation; `cn` package vs `clsx`+`tailwind-merge` size.
- Scroll-driven animation support (`animation-timeline`): Chromium and Safari 26+ per secondary sources, Firefox still behind a flag as of mid-2026; MDN's compat table was not retrievable. Relevant only if the diet replaces JS scroll effects with CSS.
- Real-device performance (no phone testing done anywhere in this project).
- The missed-call text-back product itself (SMS/CASL/CRTC rules) is out of scope here.

Prototype caveats: the form prototype shows `DRY_RUN` only; it did not send email or call Turnstile. Per-route JS numbers are close to each other because Next prefetches linked routes' chunks within the 4 s window.

---

## 8. Sources (all accessed 2026-10-12)

Vercel
- https://vercel.com/docs/limits/fair-use-guidelines (Hobby non-commercial; updated 2026-09-14)
- https://vercel.com/pricing
- https://vercel.com/docs/analytics/limits-and-pricing
- https://vercel.com/docs/analytics/privacy-policy
- https://vercel.com/docs/regions (yul1 Montréal; default `iad1`)
- https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting
- https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation

Forms, anti-spam, email
- https://resend.com/pricing
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/docs/dashboard/domains/regions
- https://formspree.io/plans
- https://web3forms.com/pricing (fetch 403; figures via search snippet)
- https://developers.cloudflare.com/turnstile/plans/

Booking, analytics
- https://cal.com/pricing ; https://www.cal.eu/ ; https://github.com/calcom/cal.com (README: Cal.diy)
- https://calendly.com/pricing ; https://tidycal.com/pricing
- https://app.cal.com/embed/embed.js (size measured)
- https://plausible.io/#pricing ; https://umami.is/pricing
- https://www.cloudflare.com/web-analytics/ ; https://developers.cloudflare.com/web-analytics/faq/
- https://cal.com/docs/platform/embed/embed-snippet-generator (404; embed behaviour taken from my own measurement of `embed.js` and the npm package)

Libraries and licences
- https://gsap.com/standard-license
- npm registry (`https://registry.npmjs.org/<pkg>`): gsap 3.15.0, lenis 1.3.26, three 0.186.1, @react-three/fiber 9.8.1, ogl 1.0.11, @rive-app/react-canvas 4.36.0, cmdk 1.1.1, @next/mdx 16.4.0, @vercel/analytics 2.0.1, @vercel/speed-insights 2.0.0, resend 6.32.1, @marsidev/react-turnstile 1.6.2, @calcom/embed-react 1.5.3, motion 14.1.0, @base-ui/react 1.9.0, next 16.4.0, @lhci/cli 0.15.1, @axe-core/playwright 4.13.0, zod 4.6.6
- https://rive.app/docs/runtimes/web/web-js (does not state WASM source; observed unpkg request in my measurement)

Platform and standards
- Next 16.4 bundled docs: `node_modules/next/dist/docs/01-app/02-guides/{view-transitions,server-actions,forms,mdx,content-security-policy}.md`, `.../03-api-reference/04-functions/image-response.md`, `.../02-route-segment-config/`
- https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline (compat table not retrievable)
- https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
- https://developers.google.com/search/docs/essentials/spam-policies (doorway abuse)
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- https://developers.google.com/maps/billing-and-pricing/pricing

Secondary sources (treated as [U])
- https://www.slaw.ca/2010/06/22/alberta’s-new-personal-information-outsourcing-requirements -is-anybody-paying-attention/ and McCarthy Tétrault Bill 54 summary (PIPA s.13.1)
- Search-result summaries on Calendly, Google Calendar appointment schedules, Turnstile privacy, Cal.com self-hosting/Cal.diy, scroll-driven animation support

---

## 9. Measurement method

- Scratch copies under the session scratchpad, never the working tree: `base` (clean copy of `main`), `floor` (one-page Next 16.4 app), `attr` (source maps on), `cmd` (shadcn command added), `feat` (form, OG, MDX, view transitions, calculator prototypes). Each had its own real `npm ci`.
- JS size: Playwright Chromium, 390×844, `waitUntil: load` + 4 s, sum of `zlib.gzipSync` of every JS response body (including third-party hosts), `next start` production build. Library probes were client components imported into the root layout with `npm i --no-save`. Deltas are against the control build at 223.8 KB.
- Lighthouse 13.5.0 CLI, mobile preset, `--only-categories=performance,accessibility,seo,best-practices`, local `next start`.
- Reduced-motion and no-JS paths were verified only for the form (JS disabled run); animated features were not built.
- The report did not change `src/`, `.github/` or `package.json` in the repo.
