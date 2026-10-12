> This file was compiled by an assistant from a prior conversation on this
> project. Treat it as background material, not verified fact — reason
> independently before relying on anything here, especially items presented
> as correct, decided, or working. It's meant to bring a new collaborator up
> to speed, not to define how they should proceed.

# Reference: Obsidian Intelligence marketing site (`silver-telegram-web-build`)

Snapshot taken 2026-10-12, after Batch 4 merged to `main`. Layers: Quick Recap → Working Context → Deep Reference (sub-headed by topic).

## Quick Recap

A highly interactive marketing site for **Obsidian Intelligence**, a Calgary AI-automation + managed IT (MSP) business serving trades and small businesses. Its goal is to get visitors to book a free audit call. Repo: `Demonad112/silver-telegram-web-build`. Stack: Next.js 16.4 (App Router, Cache Components on), React 19.3, TypeScript, Tailwind v4, shadcn/ui on Base UI (`base-nova`), Motion 14. Hosting target: Vercel (inferred, not confirmed by the owner).

The work follows a phased brief in `docs/PLANNING_PROMPT.md`: plan → batches → two review checkpoints. Done and merged to `main`: planning (PR #1), Batch 1 (tokens/fonts/shell), Batch 2 (home page), Batch 3 (all remaining static pages, metadata, sitemap, robots, JSON-LD; PR #2), Batch 4 (scroll-driven Missed Call hero scene, reveals, header hide-on-scroll, CTA magnet, reduced-motion paths; PR #4). **Checkpoint 2 (feature research → `docs/FEATURE_REPORT.md`) is next**, then the owner decides which features to build.

All copy is a first draft in `src/content/*` marked `TODO(content)`. No real pricing, testimonials, logos, photos, or confirmed business claims exist.

## Working Context

### Decisions (owner-approved unless noted; reasoning as given at the time)
| Decision | Reasoning |
|---|---|
| Style "Volcanic Glass": near-black obsidian surfaces, one warm ember accent, mono spec-sheet labels (`OI-001`, `WF-MISSED-CALL`) | Fits the name; warm accent avoids the purple-gradient "AI SaaS" look; spec labels keep it grounded for trades |
| Signature hero "The Missed Call": workflow from missed call → text-back → quote → booked → invoice → review, with a value counter | Product demo, pitch and visual signature in one |
| Next.js kept (not Astro) | React/shadcn/Motion/Vercel fit; JS cost managed with server components + `LazyMotion` |
| Dark-only theme for v1 | Halves visual QA |
| Fonts: Archivo (display, `wdth` axis), IBM Plex Sans (body), IBM Plex Mono (labels only) | Not Inter/Geist; width axis enables variable-font motion later |
| No invented testimonials, logos, stats, or prices | Misleading. Pricing page shows "Quoted after your audit"; playbooks list "what we measure" instead of time-saved numbers |
| Lead with the founder's loss-prevention/security-investigator background ("Automation audited like evidence") | Differentiator vs local MSPs. Assistant-logged `[accepted]`; owner never addressed it separately |

### Process conventions
- Build loop per batch: `npm run dev` → screenshots at 390px and 1440px → critique against `docs/PLAN.md` §2 → `npm run build` + `npm run lint` pass → report in ≤5 lines → commit.
- Ideas go in `docs/IDEAS.md` tagged `[accepted]` / `[rejected]` / `[pending]`. Plan + running batch log live in `docs/PLAN.md` (§7 batch table, "Batch log" at the bottom).
- Owner's global rules (in their `~/.claude/CLAUDE.md`, not in the repo, so unverifiable from here): lead with results, default to action, one concern per PR, no polling, don't touch `.github/` or CI unless asked, keep `HANDOFF.md` at repo root (none exists).
- `.claude/settings.json` on `main` denies `mcp__github` (commit message: commits/pushes use plain git, so the GitHub MCP definitions are overhead). In a session where that applies, PR creation via GitHub MCP tools won't be available; plain `git push` is.
- No CI exists (`.github/` absent).

### What was tried and what happened
- **Playwright MCP** failed in the cloud container because it looked for Google Chrome. `.mcp.json` now passes `--browser chromium`; its tools appeared connected in the latest session but were not actually used; screenshots came from a scratch Node script (below).
- **Cache Components** blocks `new Date()` during prerender. Footer year uses a `"use cache"` component with `cacheLife("days")`, so every route shows `Revalidate 1d`. The sitemap omits `lastModified` for the same reason.
- **`dynamicParams` is unavailable** under Cache Components. An unknown `/playbooks/<slug>` renders the branded 404 UI with `noindex` but returns HTTP **200** (verified with curl).
- **cva doesn't merge Tailwind classes**: pass `hidden` etc. via `cn(buttonVariants(...), "...")`, not `buttonVariants({ className })`.
- **Focus ring** `ring-ring/50` was invisible on the ember button (ring = ember). Button uses a 2px offset outline in `--ring`.
- **`pkill -f next-server` / `pkill -f "next start"` kills the calling shell** (exit 144) in this container; this happened twice. Killing by PID from `ps -eo pid,comm` worked.
- **Turbopack rejects a symlinked `node_modules`** in a git worktree; a real `npm ci` in the worktree worked.
- A fresh container has no `node_modules`: `npm ci` (~15–20s) first. `npm run build` ~10s.

### Measured results (local production build, Batch 4; real-device and Lighthouse NOT measured)
- Home JS: **45.4 KB gzip** (budget 160 KB on home, 120 KB static pages).
- 4× CPU throttle: **0 long tasks during scroll** at 390 and 1440. Load-time long tasks (~60–240 ms, React hydration) match a `main` baseline from before Batch 4, plus one extra ~100 ms task at ~1 s.
- All 18 routes prerender; one h1 per page; no horizontal overflow at 390/1440; unique titles.

### Content status (all unconfirmed claims, flagged `TODO(content)`)
"45-minute audit", "live within a few weeks", founder background wording, email `hello@obsidianintelligence.ca` (domain ownership unknown; site URL defaults to `https://obsidianintelligence.ca`, overridable via `NEXT_PUBLIC_SITE_URL`), trades chosen (plumbing, HVAC, electrical, landscaping), pricing tiers (Automate / Secure / Both, no prices), privacy policy (draft, needs legal review against PIPEDA / Alberta PIPA), contact page (mailto only, no form/calendar). The $640 hero outcome is labelled "illustrative".

### Open questions for the owner
Real domain? Real pricing tiers? Founder-bio wording? Photos/logos/proof? Priority trades? Is Vercel definitely the host (and is the Vercel MCP authenticated? it needed OAuth and was unauthenticated in every session so far)? Form backend + calendar provider? Analytics?

## Deep Reference

### Site capability map (what the research must align with)
| Area | What exists now | Notes for any new feature |
|---|---|---|
| Rendering | Server components by default; `"use client"` only on leaves. `cacheComponents: true`, `partialPrefetching: true`. All 18 routes statically prerendered; `/playbooks/[slug]` via `generateStaticParams` (4 slugs) | Runtime data (cookies/headers/params w/o static params/`new Date()`) must sit behind `<Suspense>` or `"use cache"`. No `dynamicParams`, `dynamic`, `revalidate`, `fetchCache` route config. Read `node_modules/next/dist/docs/` or Context7 before using unfamiliar Next 16 APIs |
| Styling | Tailwind v4, tokens in `src/app/globals.css` (OKLCH). Colors only via tokens, never hardcoded in components | Any new colour must be a token. Dark-only |
| UI kit | shadcn on **Base UI** (not Radix): `button`, `sheet`, `accordion` added. Non-button element needs `render={<Link/>}` + `nativeButton={false}` | New components via `npx shadcn@latest add <name>` |
| Motion | `motion/react` 14. `MotionProvider` = `LazyMotion` (`domAnimation`, **strict**: use `m.*`, not `motion.*`) + `MotionConfig reducedMotion="user"`. Hooks `useScroll`/`useTransform`/`useSpring` used directly. No GSAP, Lenis, or R3F installed | Every animation needs a `prefers-reduced-motion` path. Transform/opacity only for scroll-linked effects. Anything beyond `domAnimation` features (e.g. layout animations, drag) needs `domMax` or a different loader and costs bytes |
| Hero | `HeroScene` (client) pins the hero (230svh) on viewports ≥1024×720 and drives `ScrollWorkflow`; elsewhere progress follows the diagram's own viewport crossing. Reduced-motion/no-JS: fully lit via `globals.css` `[data-scene] [data-lit]` + `<noscript>` style | LCP is text; the hero has no raster image; never wrap LCP text in an entrance animation |
| Diagrams | `WorkflowDiagram` (server, static, fully lit; used on `/automation` and `/playbooks/[slug]`), `ScrollWorkflow` (client, animated). Both take `WorkflowNode[]` (`src/content/missed-call.ts`) | Natural reuse target for per-playbook scroll animation |
| Content model | Typed TS data in `src/content/{home,missed-call,playbooks,services}.ts`; `src/lib/site.ts` (name, url, email, nav, cta) | No CMS, no MDX. Playbooks are one typed array |
| SEO | `src/lib/metadata.ts` (`pageMetadata`), `sitemap.ts`, `robots.ts`, `JsonLd` (ProfessionalService site-wide; Service on 2 pages), `metadataBase` set. No OG images | `next/og` OG images are an open candidate |
| Forms/backend | **None.** Contact is a mailto CTA. No API routes, no env vars, no `.env.example` | Provider + secrets decision pending (CP2) |
| Analytics | None | Privacy policy currently says analytics may be added and it would be updated first |
| Hosting | Vercel assumed; Git-integration deploy on push; no deploy has been verified | Vercel MCP unauthenticated. Plan tier terms for a commercial site not checked |
| Budgets (PLAN §6) | Mobile Lighthouse perf ≥90 home / ≥95 others, LCP ≤2.0s, CLS ≤0.05, INP ≤200ms, TBT ≤150ms lab, JS ≤160KB gz home / ≤120KB static, ≤3 font files, a11y/SEO 100 | Home currently 45 KB gz, i.e. ~115 KB headroom (lab, local) |
| Accessibility | Skip link, semantic landmarks, visible 2px offset focus outline, AA contrast verified (lowest token pair 6.98:1) | Smooth-scroll libs and sound are the main accessibility trade-offs on the candidate list |

### Candidate features already listed (PLAN §5, to be researched at CP2)
View Transitions API page transitions; WebGL obsidian-shard hero (Three.js / R3F / OGL) vs CSS facets; GSAP ScrollTrigger vs Motion for the hero; Lenis smooth scroll; Rive for workflow nodes; live "missed-call cost" calculator; command palette (cmdk) for playbooks; form backend (Resend free tier vs Formspree vs Web3Forms) + Cal.com embed; MDX for playbooks; dynamic OG images (`next/og`); privacy-friendly analytics (Vercel Analytics free tier; Plausible is paid); AI demo (blocked by a "no API token" constraint unless client-side or free tier); audio click feedback (likely reject). Motion inventory items still unbuilt (PLAN §4): service-split hover/expand, pricing monthly/annual toggle, pointer-responsive facet background, page transitions, variable-font `wdth` animation on headings, playbook diagrams animating on view (cheap reuse of `ScrollWorkflow`).

### File map (on `main` after PR #4)
```
src/app/layout.tsx            fonts, metadata (+metadataBase), ProfessionalService JSON-LD, skip link, <noscript> lit-state style, MotionProvider > header/main/footer
src/app/page.tsx              composes home sections
src/app/{automation,managed-it,playbooks,playbooks/[slug],pricing,about,contact,privacy}/page.tsx
src/app/{not-found,sitemap,robots}.ts(x)
src/app/globals.css           tokens, @theme inline, base styles, reduced-motion CSS (+ [data-scene]/[data-reveal] lit rules)
src/lib/{site,metadata,utils}.ts
src/content/{home,missed-call,playbooks,services}.ts
src/components/site/          logo, site-header (client: scroll state + hide-on-scroll), mobile-nav (client), site-footer (cached year), section-heading, page-hero, json-ld
src/components/home/          hero (server) -> hero-scene (client), sections (Leaks, Services, HowItWorks, Trust, Trades, FinalCta), faq
src/components/pages/blocks.tsx   Section, SpecGrid, container/sectionClass
src/components/motion/        motion-provider, reveal, magnetic
src/components/workflow/      workflow-diagram (server, static), scroll-workflow (client, animated)
src/components/ui/            button, sheet, accordion
docs/                         PLANNING_PROMPT.md, PLAN.md, IDEAS.md, handoff/
```

### Stack and versions (`package.json`)
`next` 16.4.0, `react`/`react-dom` 19.3.0, `motion` ^14.1.0, `@base-ui/react` ^1.9.0, `cn` ^0.4.0, `lucide-react` ^1.55.0, `tw-animate-css`, `class-variance-authority`. Dev: `shadcn` ^4.21.4 (still needed at build: `globals.css` imports `shadcn/tailwind.css`), `@tailwindcss/turbopack`, `tailwindcss` ^4, `eslint` ^9, `eslint-config-next` 16.4.0. `npm audit` showed 7 high findings, all in the shadcn CLI's dev-dependency tree.

### Design tokens (`globals.css`)
```css
--obsidian-950: oklch(0.13 0.008 275);  /* page bg */   --obsidian-900: oklch(0.17 0.01 275);  /* cards */
--obsidian-800: oklch(0.22 0.012 275);  --obsidian-700: oklch(0.3 0.012 275);  --line: oklch(1 0 0 / 0.09);
--fg: oklch(0.96 0.006 85);  --fg-muted: oklch(0.72 0.01 275);
--ember-500: oklch(0.74 0.17 52);  /* the one accent; also --primary and --ring */
--ember-400: oklch(0.82 0.14 62);  --ember-ink: oklch(0.18 0.03 50);  --sheen: oklch(0.88 0.04 235);  /* decorative only */
--ok: oklch(0.78 0.14 150);  --danger: oklch(0.68 0.19 25);  --radius: 0.375rem;
```
Rules from PLAN §2: ember under 10% of any screen; no gradients behind body text; glow only for the active workflow node and the primary CTA; motion durations micro 120–180 ms, UI 240–320 ms, scene 600–900 ms; easing `cubic-bezier(0.2,0.8,0.2,1)`; springs stiffness 300 / damping 30; nothing animates on load for more than 1 s before content is readable.

### Verification scripts used (scratch, not in the repo)
Screenshot/overflow/title check (run with a production server on :3100 via `npx next start -p 3100`):
```js
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PWPATH)   // PWPATH=$(npm root -g)/playwright
const b = await chromium.launch()
for (const w of [390, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: w === 390 ? 844 : 900 } })
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" })
  console.log(w, "overflow-x:", await p.evaluate(() => document.documentElement.scrollWidth - innerWidth))
  await p.screenshot({ path: `/tmp/shot-${w}.png`, fullPage: true })
  await p.close()
}
await b.close()
```
Long-task check: open a CDP session, `Emulation.setCPUThrottlingRate {rate: 4}`, add an init script with `new PerformanceObserver(...).observe({type:"longtask", buffered:true})`, scroll in steps, read the collected entries. JS size: sum `zlib.gzipSync(await response.body()).length` over `.js` responses.

### Next 16 facts learned from the bundled docs
- Docs live at `node_modules/next/dist/docs/` (exists only after `npm ci`).
- With Cache Components, `generateStaticParams` samples are prerendered; runtime params need `<Suspense>`; `dynamicParams` is not available.
- `generateMetadata` follows the same runtime-data rules as components. Typed `PageProps<"/route">` / `LayoutProps<"/">` globals are used.
- `sitemap.ts` is a cached route handler; `new Date()` at prerender is blocked.

## Notes on gaps and judgment calls (assistant's own, unverified)
- Unknown playbook slugs return 200 + `noindex` (soft 404). Fine for v1; could matter for crawl reporting.
- Header is entirely a client component only for scroll state; a server nav + small client wrapper would cut hydration.
- Daily revalidation everywhere is a side effect of the cached footer year; a build-time constant or tiny client year would avoid it.
- Accordion trigger focus ring is still the shadcn default and was never visually checked.
- No CI. A build+lint workflow would catch regressions, but the owner's rules say not to touch `.github/` unprompted.
- A Vercel Hobby plan is commonly described as non-commercial; whether this business site needs a paid plan was not checked.
- Canadian data-residency / PIPEDA / Alberta PIPA implications of any form, email, calendar, or analytics provider were not researched.
