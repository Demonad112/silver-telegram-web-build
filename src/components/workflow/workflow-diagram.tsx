import type { WorkflowNode, WorkflowStatus } from "@/content/missed-call"
import { cn } from "@/lib/utils"

const statusLabel: Record<WorkflowStatus, string> = {
  trigger: "Trigger",
  auto: "Automated",
  done: "Complete",
}

type WorkflowDiagramProps = {
  code: string
  nodes: WorkflowNode[]
  outcome?: { label: string; value: string; note: string }
  className?: string
}

/**
 * Static, fully-lit workflow diagram. This is also the reduced-motion and no-JS
 * rendering of the scroll-driven hero scene added in batch 4.
 */
export function WorkflowDiagram({ code, nodes, outcome, className }: WorkflowDiagramProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-lg border border-line bg-obsidian-900 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--sheen)_18%,transparent)]",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground sm:px-5">
        <span>{code}</span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-ember-500" />
          Example run
        </span>
      </div>

      <ol className="relative px-4 py-5 sm:px-5">
        {nodes.map((node, i) => {
          const last = i === nodes.length - 1
          return (
            <li key={node.id} data-node={i} className="relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-5 last:pb-0">
              {!last && (
                <span aria-hidden className="absolute top-6 bottom-0 left-[0.6875rem] w-px bg-ember-500/40" />
              )}
              <span
                aria-hidden
                className={cn(
                  "relative z-10 mt-0.5 flex size-6 items-center justify-center rounded-[0.3rem] border font-mono text-[0.625rem]",
                  node.status === "trigger"
                    ? "border-line bg-obsidian-800 text-muted-foreground"
                    : "border-ember-500 bg-ember-500 text-ember-ink",
                  last && "shadow-[0_0_24px_-2px_var(--ember-500)]"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="font-heading text-base font-bold [font-stretch:108%]">{node.title}</h3>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
                    <span className="sr-only">{statusLabel[node.status]}, </span>
                    {node.time}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{node.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>

      {outcome && (
        <figcaption className="flex flex-wrap items-end justify-between gap-3 border-t border-line bg-obsidian-950/60 px-4 py-4 sm:px-5">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">Outcome</p>
            <p className="mt-1 font-medium">{outcome.label}</p>
          </div>
          <p className="font-heading text-3xl font-extrabold tabular-nums text-ember-500 [font-stretch:118%]">
            {outcome.value}
          </p>
          <p className="w-full text-xs text-muted-foreground">{outcome.note}</p>
        </figcaption>
      )}
    </figure>
  )
}
