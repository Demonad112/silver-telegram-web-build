> Context below is from a prior conversation on this project, assembled by an assistant, not verified fact. Read it as background, then use your own reasoning, including on anything described as decided, correct, working, or the cause of something. Push back, propose better approaches, or ask questions freely. The task section at the end is the owner's request. A companion reference file, `docs/handoff/obsidian-site-reference.md`, has the deeper technical detail; check it before assuming something isn't covered.

# Role

You are a research agent doing **Checkpoint 2: feature research** for the Obsidian Intelligence marketing site. You work alongside the assistant that built the site (it will read your report in a later chat). Your deliverable is a detailed, evidence-backed report at `docs/FEATURE_REPORT.md`. You are researching and recommending, not building.

# The project in one paragraph

Highly interactive marketing site for Obsidian Intelligence, a Calgary AI-automation + managed IT business for trades and small businesses (owner-operators, 5–50 staff, reading on phones between jobs). Goal: get visitors to book a free audit call. Stack: Next.js 16.4 (App Router, **Cache Components on**), React 19.3, TypeScript, Tailwind v4, shadcn/ui on **Base UI**, Motion 14, hosted on Vercel (assumed). Style "Volcanic Glass": near-black surfaces, one ember accent, dark-only. Signature feature: "The Missed Call", a scroll-pinned hero where a workflow lights up node by node. Batches 1–4 are merged to `main`; the site is a static, mobile-first, accessible marketing site with no backend, no forms, no analytics, no CMS.

# Read first (in this order, before researching anything)

1. `CLAUDE.md` and `AGENTS.md` (Next 16 differs from your training data; docs are at `node_modules/next/dist/docs/` after `npm ci`)
2. `docs/handoff/obsidian-site-reference.md` (capability map, constraints, measured results, what was tried)
3. `docs/PLAN.md` (esp. §2 design system, §4 motion inventory, §5 candidates, §6 budgets, §8 risks, batch log) and `docs/IDEAS.md`
4. Skim the code: `src/components/{home,workflow,motion,site}`, `src/content/*`, `src/app/globals.css`, `next.config.ts`

Run `npm ci && npm run build` once so you know the baseline is green.

# Constraints every recommendation must respect

| Constraint | Detail |
|---|---|
| Performance budgets | Mobile Lighthouse perf ≥90 home / ≥95 other pages; LCP ≤2.0s; CLS ≤0.05; INP ≤200ms; JS ≤160KB gzip home (currently **~45KB**, so ~115KB headroom), ≤120KB static pages; ≤3 font files |
| LCP | LCP is text. Never delay or hide it behind an animation. Hero has no raster image |
| Reduced motion | Every animation needs a `prefers-reduced-motion` path (static/lit or opacity-only) and a no-JS state that still reads correctly |
| Accessibility | WCAG 2.2 AA, full keyboard path, visible focus, no motion-only information. Smooth-scroll libraries and sound are explicitly suspect |
| Motion stack | `motion/react` with `LazyMotion` `domAnimation` **strict** (`m.*` only). Adding GSAP/Lenis/Three/Rive means a second runtime; justify it against what Motion's `useScroll`/`useTransform` already does |
| Next 16 Cache Components | No `new Date()`/cookies/headers at prerender without `"use cache"`/`<Suspense>`; no `dynamicParams`/`dynamic`/`revalidate` route config. Check any feature (and its SDK) against this |
| Design tokens | Colours only via CSS tokens; one ember accent; ember <10% of any screen; dark-only; no purple/blue AI gradients |
| Components | shadcn on Base UI (not Radix). Check whether a candidate library assumes Radix |
| No invented proof | No fake testimonials, logos, stats, or prices. A calculator must use owner-supplied inputs, not invented industry figures |
| Money/secrets | No paid services or API tokens without the owner's approval. Free tiers must be verified as free **today**, with their limits and commercial-use terms |
| Legal | Canadian business serving Alberta: PIPEDA / Alberta PIPA. Provider data residency, cookie/consent needs, and what the privacy page must say are in scope |
| Repo rules | Don't touch `.github/`. One concern per PR. Use plain `git` (GitHub MCP tools are denied for this repo). Don't use `pkill -f` (kills your own shell in this container) |

# What to research

## A. Candidates already on the list (PLAN §5), evaluate each

View Transitions API page transitions (vs Motion); WebGL obsidian-shard hero (Three.js / R3F / OGL) vs the existing CSS/SVG approach; GSAP ScrollTrigger vs Motion for the hero scene (GSAP licensing status now); Lenis smooth scroll; Rive workflow nodes; missed-call cost calculator; command palette (cmdk / shadcn `command`) for playbooks; MDX for playbooks vs the typed data file; dynamic OG images (`next/og`); privacy-friendly analytics (Vercel Analytics, Plausible, Umami, Cloudflare Web Analytics, others); AI demo (client-side or free-tier only); audio feedback (expected reject; confirm briefly).

Also evaluate the unbuilt motion items from PLAN §4: playbook diagrams animating on view (reuse `ScrollWorkflow`), service-split hover/expand, pricing toggle, pointer-responsive facet background, variable-font `wdth` heading animation, a sticky mobile "Book a free audit" bar.

## B. Two decisions that block the Final batch (give a firm recommendation, with a runner-up)

1. **Contact form backend + email delivery**: compare Resend, Formspree, Web3Forms, Vercel-native options (Server Actions + email API), and anything better you find. Cover: free-tier limits, spam protection (Turnstile/hCaptcha/honeypot), rate limiting, Server Action vs route handler under Cache Components, secrets/`.env.example`, deliverability, data residency, accessibility of the error/success states.
2. **Booking calendar**: Cal.com embed vs link-out vs alternatives (Calendly, TidyCal, others). Cover: embed JS cost against our budget, a11y of the embed, Canadian data handling, free-tier limits, whether it can sit behind a progressive-enhancement link so the no-JS path works.

Also: **Vercel plan terms** (is a business marketing site allowed on Hobby? what does Pro add?) and what is needed to deploy and measure Lighthouse on a preview URL.

## C. Anything the candidate list missed

Spend a bounded effort (suggest ≤20% of your time) finding high-value features for this specific audience that aren't listed, e.g. click-to-call and `tel:` handling on mobile, trade-specific landing pages for local SEO, review/Google Business integration, a service-area map, accessibility/perf tooling worth adding to the repo. Include only items with a clear reason they'd help a trades owner book an audit.

# Evidence standard

- Verify current versions, licences, pricing, and free-tier limits against primary sources (official docs, npm registry, release notes, pricing pages) and **today's date**; give the URL and access date for every non-obvious claim. Use Context7 for library docs where available.
- Distinguish **verified**, **inferred**, and **unverified**. Do not repeat vendor marketing claims as fact.
- For anything that adds client JS, **measure it**: install into a scratch copy outside the working tree (or a temp worktree with its own `npm ci`; a symlinked `node_modules` breaks Turbopack) and report real gzip bytes from a production build. Don't estimate when you can measure.
- Check React 19.3 / Next 16.4 / Base UI compatibility and last-release recency for every dependency you recommend.
- Say plainly when a flashy option is the wrong call for a phone-first trades audience.

# Report format: `docs/FEATURE_REPORT.md`

1. **Executive summary** (≤15 lines): what to build, in what order, what to reject, decisions needed from the owner.
2. **Ranked recommendation table**: feature | impact on booking audits | JS added (measured) | effort (S/M/L) | risk | verdict (build / defer / reject).
3. **Per-feature sections**: what it is; why it fits or doesn't this site; integration plan against the existing files; bundle/perf impact; reduced-motion + no-JS + a11y plan; Next 16 Cache Components notes; licence/cost; sources.
4. **Decisions for the owner** (form backend, calendar, analytics, hosting plan), each with recommendation, runner-up, and what changes if they pick otherwise.
5. **Proposed batch sequence** for Batch 5 onward: one feature per batch, each with an acceptance test, plus the Final batch (form + deploy + Lighthouse).
6. **Rejected list** with reasons (these get logged `[rejected]` in `docs/IDEAS.md`).
7. **Open questions and unverified items.**
8. **Sources** (URL + access date).

Update `docs/IDEAS.md` tags for items you evaluate (`[accepted]` only if the owner has accepted; otherwise leave `[pending]` with your recommendation in the line). Commit `docs/FEATURE_REPORT.md` and the IDEAS edit with plain `git`; do not change `src/`. When finished, reply with a ≤10-line summary and the file path.
