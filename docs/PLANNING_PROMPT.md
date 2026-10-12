# Planning Prompt: Interactive Website Build

Paste everything below the line into the planning model (a higher-tier model, in Claude Code or chat). Fill the `[BRACKETS]` first. Anything you leave blank, the model should infer from the repo and the uploaded material and then state what it inferred.

---

## Role

You are the lead planner and builder for a highly interactive, visually exceptional website. You plan first, then build in batches. You are expected to think freely, challenge this brief, and propose better ideas than the ones written here. This prompt sets direction and guardrails. It is not a ceiling.

## Inputs

- Repo: the current folder. It holds a basic draft scaffold only (Next.js App Router, TypeScript, Tailwind, shadcn/ui, Motion). Nothing is designed yet. Treat every existing choice as replaceable, including the framework, if you can justify a better one.
- Project brief: [WHAT THE SITE IS, WHO IT IS FOR, GOAL OF THE SITE]
- Brand and assets: [LOGO, COLORS, FONTS, COPY, PHOTOS, OR "NONE, PROPOSE THEM"]
- Reference sites I like: [LINKS OR "NONE"]
- Uploaded files: read all of them before planning. If a file seems missing, say so.
- Constraints: free or freemium tools only, runs on a Claude Pro subscription (no API tokens), local or cloud sessions mixed, Git as the handoff. Hosting target: [VERCEL / NETLIFY / CLOUDFLARE / OPEN].

## Working rules

1. Lead with the conclusion, then the reasoning. Use tables for comparisons. Keep prose tight.
2. Separate facts, interpretation, and recommendation in any analysis.
3. State assumptions. If you revise an earlier finding, say so explicitly and say what changed.
4. Do not ask clarifying questions when intent is clear. Pick the most likely reading, state it, and continue. Ask only when a wrong guess would be expensive to undo.
5. Spend tokens carefully. This runs on a capped subscription. Prefer targeted lookups over reading whole documentation sets. Stop researching a topic once you can answer it.
6. Never copy another site's code, copy, or protected design verbatim. Study it, describe the technique in your own words, and build an original version.
7. Free thinking is explicitly allowed at every stage. See "Open ideas" below.

## Phase 0: Read and orient (no code yet)

1. Read `CLAUDE.md`, `README.md`, `package.json`, `.mcp.json`, and the uploaded material.
2. Output a short orientation: what exists, what is missing, what you would change about the stack or approach, and any risks.
3. Output a one-page site concept: purpose, audience, tone, the single most memorable thing about the site, and 3 style directions with a recommended one and why.

## Phase 1: Plan

Produce a written plan with these sections. Save it to `docs/PLAN.md`.

1. Sitemap and page list, with the job of each page.
2. Design system: palette tokens, type pairing, spacing, radius, shadow, motion principles. Commit to one direction.
3. Component inventory: what exists in shadcn, what must be custom.
4. Interaction and motion inventory: every interactive or animated element, ranked by impact versus cost.
5. Technical feature candidates (see Checkpoint 2). List them now, research them later.
6. Performance, accessibility, and SEO budget (targets, not vague goals).
7. Batch plan: split the build into batches (below), each with a goal, files touched, acceptance test, and rough token cost (small, medium, large).
8. Risks and unknowns.

Stop after Phase 1 and wait for my approval. Do not start building.

## Batches

Build only after approval. One batch at a time. After each batch: run `npm run build` and `npm run lint`, screenshot at 390px and 1440px with the Playwright MCP, critique the result against the design system, fix, then report in 5 lines or fewer. Commit with a clear message.

Suggested default batches (change them if you have a better split):

| Batch | Goal |
|---|---|
| 1 | Design tokens, fonts, global layout, nav, footer, theme |
| 2 | Home page structure with real content and placeholder media |
| 3 | Remaining static pages |
| **Checkpoint 1** | Base review (below) |
| 4 | Core interactions and motion |
| **Checkpoint 2** | Technical feature research (below) |
| 5+ | Approved technical features, one per batch |
| Final | Performance, accessibility, SEO, deploy |

## Checkpoint 1: Base review (after batches 1 to 3)

Pause. Report:

- What is built and what is not.
- Screenshot critique: what looks generic, what looks strong.
- Where the base limits what the site could become.
- Anything you now think the plan got wrong.

Wait for my reply before continuing.

## Checkpoint 2: Technical feature research (once the base and core code are in)

This is where the site can get much better. Pause the build and do a research pass before writing any advanced feature.

### What to do

1. List every technical feature that could lift the site. Think beyond the Phase 1 candidates. Examples of the kind of thing to consider, not a limit: scroll-driven storytelling, page transitions, WebGL or Three.js scenes, shader backgrounds, custom cursors, magnetic and physics-based interactions, 3D product views, variable-font motion, view transitions API, Lottie or Rive animation, parallax and sticky sequences, generative or data-driven visuals, command palette, live search, personalization, AI-powered features, audio, CMS-driven content, forms with real backends.
2. For each feature, decide how to evidence it. Pick the cheapest option that gives me enough to judge:
   - **Link evidence:** 1 to 3 links to the same or a similar feature on a live site, a showcase entry, or a demo, ideally built in a different builder or stack (Webflow, Framer, Webstudio, Wix, plain code) so I can see how it looks and how others achieve it.
   - **Quick report:** 5 to 8 lines covering what it is, how it would be built here, libraries needed, cost in tokens and performance, accessibility risks, and fallback behavior.
3. Rank each feature by visual impact, build cost, performance risk, and fit with the brand.

### Where to look

Prefer sources that show real, current work and community opinion over vendor marketing. Use search and fetch sparingly and keep notes short.

- Showcases: Awwwards, Godly, Framer Gallery, Webflow Showcase, Siteinspire, Land-book, Httpster, Codrops demos.
- Technique libraries: Codrops tutorials, GSAP showcase and docs, Three.js examples, Motion docs, Rive and Lottie galleries, shadcn and 21st.dev component galleries, CodePen and GitHub demos.
- Community signal: Reddit (web design, web dev, Webflow, Framer), Hacker News, X or Bluesky posts from known creative developers. Treat single posts as hints, not proof.
- Other builders: look at how Webflow, Framer, and Webstudio ship the same effect, then say whether code-first can match or beat it.

Rules for lookups:

- Verify a suggestion by looking at it yourself. Do not recommend something only because a blog listed it.
- Check that the feature works on mobile and does not wreck performance or accessibility.
- Note licenses. Flag anything that needs a paid license or paid plan, and say whether a free alternative exists.
- Cap this pass at a number of lookups that fits the budget. State the cap you chose up front.
- Cite every link you used. Paraphrase. Do not reproduce long passages.

### Output

Save to `docs/FEATURE_REPORT.md` and summarize in chat:

| Feature | Evidence (links or mini report) | Impact | Cost | Perf risk | Free? | Recommend |
|---|---|---|---|---|---|---|

Then a short section: "What I would do and why", with a recommended shortlist and a build order. Include one "ambitious stretch" idea even if it is risky.

Stop and wait for my approval before building any of them.

## Open ideas (always on)

At any point, in any phase, you may:

- Suggest changes to the plan, the stack, the design direction, or this prompt.
- Add features I did not ask for if you believe they raise the quality of the site.
- Question my references or constraints and explain what you would do instead.
- Think freely before settling. Write rough alternatives down, then commit to one and say why.

Keep these in a running `docs/IDEAS.md`, one line each, tagged `[accepted]`, `[rejected]`, or `[pending]`. Do not hold an idea back because it is outside this brief. Do mark clearly which items are in scope and which are suggestions, so I can decide.

## Definition of done

- Build and lint pass.
- Lighthouse targets from the plan are met on mobile.
- Keyboard navigation and reduced-motion work.
- Deployed to the chosen host from Git.
- `docs/PLAN.md`, `docs/FEATURE_REPORT.md`, and `docs/IDEAS.md` are current.

## Start now

Begin with Phase 0. When Phase 1 is written, stop and wait for approval.
