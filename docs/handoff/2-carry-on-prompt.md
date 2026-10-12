> Context below is from a prior conversation on this project, assembled by an assistant, not verified fact. Read it as background, then use your own reasoning, including on anything described as decided, correct, working, or the cause of something. Push back, propose better approaches, or ask questions freely. A companion reference file, `docs/handoff/obsidian-site-reference.md`, has the deeper technical detail; check it before assuming something isn't covered.

# Continuing: Obsidian Intelligence marketing site, after the Checkpoint 2 research

## Where the project stands
Calgary AI-automation + managed IT marketing site (goal: book a free audit call). Next.js 16.4 + React 19.3 + Tailwind v4 + shadcn (Base UI) + Motion 14, targeting Vercel. Planning and Batches 1–4 are merged to `main` (static pages, metadata/sitemap/JSON-LD, scroll-driven "Missed Call" hero scene, reduced-motion paths). A separate research agent has produced `docs/FEATURE_REPORT.md` (Checkpoint 2). The owner decides what gets built from it. All copy is first draft (`TODO(content)`); there is no backend, form, analytics, or deploy yet.

## Step 1: get up to speed on the project (before opening the research report)
Do this first so the report is read against the real baseline, not in a vacuum.
1. Read `CLAUDE.md` and `AGENTS.md`. Next 16 differs from training data: docs are at `node_modules/next/dist/docs/` after `npm ci`.
2. Read `docs/handoff/obsidian-site-reference.md` fully (capability map, constraints, what was tried, measured results, open questions).
3. Read `docs/PLAN.md` (esp. §2 design system, §4 motion inventory, §6 budgets, §7 batch table, batch log) and `docs/IDEAS.md`.
4. Skim the code that features will plug into: `src/app/layout.tsx`, `src/app/globals.css`, `src/components/{home,workflow,motion,site}`, `src/content/*`, `src/lib/*`, `next.config.ts`.
5. `npm ci && npm run lint && npm run build` to confirm the baseline is green. Optionally run a production server and screenshot at 390px and 1440px to see what exists (the reference file has a Playwright script; the Playwright MCP may also work now).

Container notes: `pkill -f` kills your own shell here, so kill by PID. A symlinked `node_modules` breaks Turbopack. GitHub MCP tools are denied by `.claude/settings.json`; commit and push with plain `git`. The owner's rules: lead with results, default to action, one concern per PR, don't touch `.github/` unless asked, no polling, keep `HANDOFF.md` at the repo root (none exists yet).

## Step 2: read the research
Read `docs/FEATURE_REPORT.md` end to end. Then **audit it** rather than adopting it:
- Spot-check the top recommendations and every "free tier / licence / version" claim against primary sources and today's date. Re-measure at least one bundle-size claim yourself with a scratch install.
- Check each recommended feature against the baseline you just learned: JS budget (~45KB gzip used of 160KB), LCP-is-text, reduced-motion and no-JS paths, Cache Components limits, token/colour rules, shadcn-on-Base-UI, privacy (PIPEDA / Alberta PIPA).
- Note anything the report missed, overstated, or got wrong, and say so.

## Step 3: put the decisions to the owner
Summarise in ≤15 lines: the recommended build order, what you'd reject, and the decisions that need the owner (form backend, calendar, analytics, hosting plan/domain, any paid service). Ask the decisions with `AskUserQuestion`, recommendation first, and **wait for approval before building anything**. After the owner answers, update `docs/IDEAS.md` tags (`[accepted]`/`[rejected]`) and the `docs/PLAN.md` batch table, create `HANDOFF.md` at the repo root if still absent.

## Step 4: build what's approved
Batch 5 onward, one feature per batch, one concern per PR, using the repo's build loop: dev server → screenshots at 390px and 1440px → critique against `docs/PLAN.md` §2 → `npm run build` and `npm run lint` pass → report in ≤5 lines → commit with plain `git`. Re-measure JS size and long tasks for any feature that adds client code. The Final batch (contact form backend + `.env.example`, perf/a11y/SEO pass, Lighthouse on a Vercel preview, deploy) comes after the approved features.

## Open items that may need the owner at any point
Real domain (`obsidianintelligence.ca` is assumed), real pricing, founder-bio wording, photos/logos/proof, priority trades, whether Vercel is the host and on which plan, and legal review of the draft privacy policy.
