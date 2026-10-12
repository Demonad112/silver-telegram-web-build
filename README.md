# silver-telegram-web-build

Interactive marketing site. **Status: planning.** No page is designed yet. See `docs/PLAN.md` (pending approval) and `docs/PLANNING_PROMPT.md`.

Stack: Next.js 16, React 19, TypeScript, Tailwind v4, shadcn/ui, Motion. Hosting: Vercel.

## Setup

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

Claude Code: approve the project MCP servers from `.mcp.json` on first launch, then `/mcp` to authenticate Vercel. Working rules for Claude are in `CLAUDE.md`.

## Docs

| File | Purpose |
|---|---|
| `docs/PLANNING_PROMPT.md` | The brief that drives planning and the build |
| `docs/PLAN.md` | Approved plan: sitemap, design system, batches |
| `docs/IDEAS.md` | Running idea log |
