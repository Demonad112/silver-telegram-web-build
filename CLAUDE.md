@AGENTS.md

# Project: Interactive Marketing Site

Highly interactive marketing site. Planning is driven by `docs/PLANNING_PROMPT.md`; the approved plan lives in `docs/PLAN.md` and overrides anything in this file once approved.

Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + shadcn/ui (Base UI, `base-nova` style) + Motion. Hosting target: Vercel, deployed from GitHub.

> Next.js 16 differs from older training data (see `AGENTS.md`). Before using a Next API you are unsure of, read the guide in `node_modules/next/dist/docs/` or query Context7. `cacheComponents` and `partialPrefetching` are on in `next.config.ts`.

## Design brief

Source of truth: `docs/PLAN.md` section 2 (Design system). Read it before writing any UI. Until the plan is approved, do not build pages.

Fixed rules regardless of direction:
- Colors only through CSS variable tokens in `src/app/globals.css`. Never hardcode hex/oklch in components.
- One display font and one body font via `next/font`. No Inter, Roboto, Arial, or Geist as the final choice.
- 4px spacing base, Tailwind scale only.
- Motion through `motion` (`motion/react`). Every animation must have a `prefers-reduced-motion` path.

## Rules

- Use shadcn/ui components from `src/components/ui`. Add new ones with `npx shadcn@latest add <name>`.
- Pages are server components. Add `"use client"` only to the interactive leaf.
- Mobile first. Verify at 390px and 1440px.
- Accessible: semantic HTML, visible focus states, AA contrast, alt text, keyboard reachable.
- Never copy another site's code, copy, or protected design verbatim.
- Running notes: ideas go in `docs/IDEAS.md` tagged `[accepted]`, `[rejected]`, or `[pending]`.

## Build loop (every batch)

1. `npm run dev`.
2. Playwright MCP screenshots at 390px and 1440px.
3. Critique against `docs/PLAN.md` design system, fix.
4. `npm run build` and `npm run lint` must pass.
5. Report in 5 lines or fewer, commit with a clear message.

## Commands

- `npm run dev` dev server
- `npm run build` production build
- `npm run lint` lint

## MCP servers (`.mcp.json`)

| Server | Purpose |
|---|---|
| playwright | Screenshots for the build-critique loop |
| vercel | Inspect and trigger deploys, read logs (`/mcp` to authenticate) |
| context7 | Current library docs |
