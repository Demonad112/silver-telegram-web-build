# Plan: Obsidian Intelligence marketing site

Status: **DRAFT, awaiting approval.** Nothing below is built. Batches start only after approval.

## Inferred inputs (correct these first)

The brief's brackets were empty and the uploaded `site-starter.tgz` contained only a scaffold (same files the scaffold commands produce, plus `setup.sh`). No brand assets, copy, photos, or reference sites were provided. I inferred:

| Input | Inferred value | Confidence | Cost if wrong |
|---|---|---|---|
| Project | Marketing site for **Obsidian Intelligence**, a Calgary AI-automation + managed IT (MSP) startup serving trades and small businesses | Medium. From account context, not from the repo. | Low now (copy and sitemap only); high after batch 2 |
| Goal | Book a free automation/IT audit call | Medium | Low |
| Audience | Owner-operators of trades and SMBs in Calgary and Alberta (plumbing, HVAC, electrical, landscaping, renovation), 5 to 50 staff | Medium | Medium |
| Brand | None supplied. Proposed below. | n/a | Low |
| References | None. I chose techniques, not sites. | n/a | Low |
| Hosting | Vercel (Vercel MCP is configured) | High | Low |

If the project is something else (portfolio, another business), sections 1 and 2 change; sections 3 to 8 mostly survive.

---

## 0. Orientation (Phase 0)

### What exists
- Fresh `create-next-app` scaffold: Next.js 16.4, React 19.3, Tailwind v4, TypeScript, ESLint 9. `cacheComponents` and `partialPrefetching` on.
- shadcn/ui initialized with the `base-nova` style (Base UI primitives, not Radix). Only `button` added. `cn` package is shadcn's own clsx + tailwind-merge replacement.
- Motion 14 installed, unused.
- `CLAUDE.md`, `AGENTS.md` (Next 16 warning), `.mcp.json` (playwright, vercel, context7), `docs/PLANNING_PROMPT.md`.
- `npm run build` and `npm run lint` pass on the scaffold (verified this session).

### What is missing
- Brand, copy, imagery, logo, testimonials, pricing, legal pages.
- A form backend and its secrets (`.env.example`).
- CI, Lighthouse tooling, OG images, sitemap/robots.

### What I would change
| Change | Why |
|---|---|
| Keep Next.js (do not switch to Astro) | Astro would ship less JS for a static marketing site, but the interactive hero, shadcn, Motion, and Vercel deploy all favor React/Next. Mitigate JS cost with server components and `LazyMotion`. |
| Move `shadcn` from `dependencies` to `devDependencies` | It is a CLI. All 7 high `npm audit` findings come through its tree (`fast-glob` via `ts-morph`). It must stay installed because `globals.css` imports `shadcn/tailwind.css`; devDependencies still install on Vercel. |
| Use `motion/react` with `LazyMotion` + `m` components | Cuts Motion's client cost to the `domAnimation` feature set. |
| Add GSAP only if Checkpoint 2 approves it | GSAP and its plugins are free to use now, but Motion's `useScroll` covers the core scroll story without a second animation runtime. |
| Dark-first, single theme for v1 | The brand idea is dark; a light theme doubles the visual QA. Logged as `[pending]` in IDEAS. |

### Risks spotted in Phase 0
- Next 16 APIs (`cacheComponents`, typed `LayoutProps`, new prefetching) postdate most training data. Read `node_modules/next/dist/docs/` before using them.
- The Vercel MCP needs interactive OAuth (`/mcp`), which may not work in cloud sessions. Fallback: Vercel's Git integration deploys on push without the MCP.
- Playwright MCP in cloud sessions must use the pre-installed Chromium (`/opt/pw-browsers`). Do not run `playwright install` (the uploaded `setup.sh` does; skip that line in the cloud).
- All content is placeholder until you supply real copy. The site cannot ship with invented testimonials, client logos, or stats; those slots stay empty or clearly marked.

### Site concept (one page)

- **Purpose:** turn a trades owner's skepticism ("AI is hype") into a booked audit call by showing, not telling, what automation does for their business.
- **Audience:** busy owner-operators who read on a phone between jobs. Low patience for jargon, high sensitivity to "is this secure and will it break."
- **Tone:** plain-spoken, confident, specific. Numbers and before/after over adjectives. Security-literate without fear-mongering.
- **Differentiator to lean on:** built by someone from loss prevention and security investigation. "Automation that's audited like evidence." Few local MSPs can claim that.
- **The single most memorable thing:** **"The Missed Call."** A scroll-driven hero where one missed call from a homeowner travels through a live workflow: call missed → instant AI text-back → quote drafted → job booked → invoice sent → review requested. Each node lights up in ember as you scroll; a running counter shows time and dollars recovered. It is the product demo, the pitch, and the visual signature in one.

### Three style directions

| | A. Volcanic Glass (recommended) | B. Field Manual | C. Prairie Light |
|---|---|---|---|
| Feel | Dark, sharp, faceted. Near-black obsidian surfaces, one molten ember accent, glassy edge highlights | Utilitarian editorial. Off-white paper, black ink, safety orange, blueprint grid, spec-sheet labels | Light, open, friendly. Calgary-sky blue, warm neutrals, rounded shapes |
| Fit with name | Direct | Indirect | Weak |
| Fit with trades | Good (ember = heat, work, safety colour) | Excellent | Good |
| Differentiation vs other AI sites | High if the accent is warm, not purple | High | Low, looks like generic SaaS |
| Risk | Dark sites can read as "crypto" if over-glowed | Can look like a template if the grid is literal | Forgettable |

**Recommendation: A, Volcanic Glass, borrowing B's spec-sheet details** (mono labels, measured grid lines, part numbers on workflow nodes). The name gives a free visual metaphor, the warm accent avoids the purple-gradient AI look, and the spec-sheet details keep it grounded for a trades audience rather than tech-bro.

---

## 1. Sitemap

| Route | Job |
|---|---|
| `/` | Hook with The Missed Call, prove value, show the two services, earn the audit booking |
| `/automation` | AI automation service: what gets automated (calls, quotes, scheduling, invoicing, reviews), how it works, what it costs to not do it |
| `/managed-it` | Managed IT and security: devices, backups, email security, network, monitoring. Security-first credibility |
| `/playbooks` | Index of trade-specific workflow examples (plumbing, HVAC, electrical, landscaping). Proof by specificity, and SEO surface for "[trade] automation Calgary" |
| `/playbooks/[slug]` | One playbook: the problem, the workflow diagram, tools used, expected time saved. Static, generated from a typed data file |
| `/pricing` | Packages and what's included. Placeholder numbers marked until you supply real ones |
| `/about` | Founder story: investigator background to automation builder. Values: security, plain language, local |
| `/contact` | Book an audit: short form + calendar link, phone, service area |
| `/privacy` | Privacy policy (needed for the form; PIPEDA / Alberta PIPA context) |
| `not-found` | Branded 404 with a route back to the hero |

## 2. Design system (committed: Volcanic Glass)

### Palette tokens (OKLCH, defined in `globals.css`, mapped to shadcn variables)

| Token | Value | Use |
|---|---|---|
| `--obsidian-950` | `oklch(0.13 0.008 275)` | Page background |
| `--obsidian-900` | `oklch(0.17 0.010 275)` | Raised surfaces, cards |
| `--obsidian-800` | `oklch(0.22 0.012 275)` | Hover surfaces, inputs |
| `--obsidian-700` | `oklch(0.30 0.012 275)` | Strong borders, dividers |
| `--line` | `oklch(1 0 0 / 0.09)` | Hairlines, grid lines |
| `--fg` | `oklch(0.96 0.006 85)` | Primary text (warm off-white) |
| `--fg-muted` | `oklch(0.72 0.010 275)` | Secondary text (AA on 950 and 900) |
| `--ember-500` | `oklch(0.74 0.170 52)` | The one accent: CTAs, active nodes, focus ring |
| `--ember-400` | `oklch(0.82 0.140 62)` | Accent hover, glow core |
| `--ember-ink` | `oklch(0.18 0.030 50)` | Text on ember buttons |
| `--sheen` | `oklch(0.88 0.040 235)` | Decorative cool edge highlight only, never text |
| `--ok` / `--warn` / `--danger` | `oklch(0.78 0.14 150)` / ember / `oklch(0.68 0.19 25)` | Status in workflow diagrams and forms |

Rules: ember is under 10% of any screen. No gradients behind body text. Glow is reserved for the active workflow node and the primary CTA.

### Type

| Role | Font | Notes |
|---|---|---|
| Display | **Archivo** (variable, `wght` 100 to 900, `wdth` 62 to 125) | Headlines set wide and heavy; the width axis enables variable-font motion later |
| Body | **IBM Plex Sans** | Readable, slightly technical, not Inter |
| Utility | **IBM Plex Mono** | Spec labels, node IDs, counters only. Max 13px uppercase tracking 0.08em |

Scale (fluid, `clamp`): display 2.75rem to 6rem, h1 2.25 to 4rem, h2 1.75 to 2.75rem, h3 1.25 to 1.5rem, body 1rem / 1.6, small 0.875rem. Measure max 68ch.

### Spacing, radius, shadow
- Spacing: 4px base, Tailwind scale. Section padding `py-24 md:py-36`. Container `max-w-7xl px-4 md:px-8`.
- Radius: sharp by default (`--radius: 0.375rem`). Cards 8px, buttons 6px, pills full. Obsidian fractures; it does not round.
- Shadow: none on dark surfaces. Elevation by surface step + 1px `--line` border + optional top-edge `--sheen` inner highlight. Ember glow (`0 0 40px` ember at 25%) for active state only.

### Motion principles
1. Motion explains, never decorates. Every animation shows flow, state, or hierarchy.
2. Durations: micro 120 to 180ms, UI 240 to 320ms, scene 600 to 900ms. Easing `cubic-bezier(0.2, 0.8, 0.2, 1)` for enters, springs (`stiffness 300, damping 30`) for interactive feedback.
3. Scroll-linked effects use transforms and opacity only.
4. `prefers-reduced-motion`: scroll scenes become static, fully-lit diagrams; entrances become opacity-only or none; no parallax.
5. Nothing animates on load for more than 1s before content is readable. LCP text is never hidden behind an entrance animation.

## 3. Component inventory

| Need | shadcn (base-nova) | Custom |
|---|---|---|
| Buttons, badges, cards, inputs, textarea, select, label, form | button, badge, card, input, textarea, select, label, field | Ember CTA variant |
| Nav: desktop + mobile drawer | navigation-menu, sheet | Header shell with scroll-state |
| Pricing toggle, FAQ | tabs / toggle-group, accordion | |
| Tooltips on workflow nodes | tooltip / popover | |
| Toasts for form submit | sonner | |
| **Missed Call hero scene** | | `WorkflowScene` (SVG paths + nodes + scroll progress) |
| Workflow diagram (reused on playbooks) | | `WorkflowDiagram` (static, data-driven, same node visuals) |
| Recovered-value counter | | `CountUp` (mono, tabular-nums) |
| Service split panel | | `ServiceSplit` |
| Section heading with spec label | | `SectionHeading` |
| Faceted background | | `FacetField` (CSS/SVG, no WebGL in v1) |
| Footer | | `SiteFooter` |
| Logo / wordmark | | SVG faceted mark + Archivo wide wordmark |

## 4. Interaction and motion inventory (ranked by impact / cost)

| # | Element | Impact | Cost | Notes |
|---|---|---|---|---|
| 1 | Missed Call scroll scene (home hero) | Very high | Large | Sticky section, `useScroll` progress drives path draw + node activation + counter. Static fallback for reduced motion and no-JS |
| 2 | Section reveal (stagger in on view) | Medium | Small | One `Reveal` wrapper, `whileInView`, once |
| 3 | Header: transparent → glass on scroll, hide on scroll down | Medium | Small | |
| 4 | Ember CTA hover: glow + subtle magnetic pull (desktop only) | Medium | Small | Pointer-fine media query only |
| 5 | Playbook diagrams animate node-by-node on view | High | Medium | Reuses #1 visuals |
| 6 | Service split hover/tap expand | Medium | Small | |
| 7 | Pricing monthly/annual toggle with layout animation | Low-medium | Small | |
| 8 | Facet background responding to pointer (light shift) | Medium | Medium | CSS vars + rAF; off on touch and reduced motion |
| 9 | Page transitions | Medium | Medium | Defer to Checkpoint 2 (View Transitions API vs Motion) |
| 10 | Variable-font width animation on display headings | Medium | Small | Archivo `wdth`; Checkpoint 2 |

## 5. Technical feature candidates (research at Checkpoint 2)

View Transitions API page transitions; WebGL obsidian shard hero (Three.js / R3F / OGL) vs CSS facets; GSAP ScrollTrigger vs Motion for the hero; Lenis smooth scroll (accessibility trade-off); Rive animation for workflow nodes; live "missed-call cost" calculator; command palette (cmdk) for playbooks; form backend (Resend free tier vs Formspree vs Web3Forms) plus Cal.com embed; MDX for playbooks; dynamic OG images (`next/og`); privacy-friendly analytics (Vercel Analytics free tier, Plausible is paid); AI demo (blocked by the no-API-token constraint unless client-side or free tier); audio click feedback (likely reject).

## 6. Budgets

| Area | Target (mobile, Lighthouse, Vercel preview) |
|---|---|
| Performance score | ≥ 90 (home), ≥ 95 (other pages) |
| LCP | ≤ 2.0s |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms; TBT ≤ 150ms in lab |
| JS first load | ≤ 160KB gzip on home, ≤ 120KB on static pages |
| Fonts | ≤ 3 files, `display: swap`, subset latin, display font preloaded |
| Images | AVIF/WebP via `next/image`, hero has no raster image |
| Accessibility | Lighthouse 100; axe 0 serious/critical; full keyboard path to submit the form; visible focus ring (ember, 2px offset); AA contrast on all text |
| SEO | Lighthouse 100; unique title + description per route; `sitemap.ts`, `robots.ts`; LocalBusiness + Service JSON-LD; OG image per route |

## 7. Batch plan

| Batch | Goal | Files touched | Acceptance test | Cost |
|---|---|---|---|---|
| 1 | Tokens, fonts, layout, header, mobile nav, footer, theme | `globals.css`, `layout.tsx`, `components/site/*`, `components/ui/*` (sheet, navigation-menu), `package.json` (move shadcn to dev) | Build + lint pass; header/footer correct at 390 and 1440; keyboard tab order; contrast check on tokens | Medium |
| 2 | Home structure with real-ish copy and static Missed Call diagram (no scroll motion yet) | `app/page.tsx`, `components/home/*`, `components/workflow/*`, `content/home.ts` | All sections render; static diagram readable at 390; LCP element is text | Medium |
| 3 | Remaining static pages + playbooks data + 404 + privacy + metadata/sitemap/robots | `app/*/page.tsx`, `content/*.ts`, `app/sitemap.ts`, `app/robots.ts` | Every route builds static; titles unique; no console errors | Large |
| CP1 | Base review | `docs/` | Report and wait | Small |
| 4 | Core motion: Missed Call scroll scene, reveals, header states, CTA hover, reduced-motion paths | `components/workflow/*`, `components/motion/*` | Scene runs smoothly on mid-range mobile (no long tasks > 50ms in trace); reduced-motion shows static diagram | Large |
| CP2 | Feature research | `docs/FEATURE_REPORT.md` | Report and wait | Medium |
| 5+ | Approved features, one per batch | per feature | per feature | varies |
| Final | Contact form backend, perf/a11y/SEO pass, Lighthouse, deploy | `app/contact/*`, `.env.example`, config | Section 6 budgets met on Vercel preview; deployed from Git | Medium |

## 8. Risks and unknowns

| Risk | Impact | Mitigation |
|---|---|---|
| Inferred project identity is wrong | Rework of copy and sitemap | Confirm before batch 1 |
| No real copy, pricing, proof | Site feels hollow; can't fake testimonials | Write honest placeholder copy, mark `TODO(content)`, leave proof slots out rather than invent |
| Hero scroll scene on low-end Android | Jank hurts INP and first impression | Transform/opacity only, SVG not canvas, test with 4x CPU throttle, static fallback |
| Dark theme reads as crypto/hacker | Wrong signal to trades owners | Warm accent, restrained glow, plain-language copy, real trade imagery later |
| Next 16 API drift | Build errors, wasted tokens | Read bundled docs / Context7 before unfamiliar APIs |
| Form backend needs a secret and an account | Blocks the Final batch | Choose provider at CP2; `.env.example` only, no committed secrets |
| Vercel MCP auth in cloud sessions | Can't inspect deploys from here | Vercel Git integration deploys on push; inspect in dashboard |
| Lighthouse in this container | Local lab numbers differ from real devices | Run on Vercel preview URL; treat as lab data |
