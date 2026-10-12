"use client"

import { useEffect, useRef } from "react"
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import type { WorkflowNode } from "@/content/missed-call"
import { cn } from "@/lib/utils"

type Props = {
  code: string
  nodes: WorkflowNode[]
  outcome?: { label: string; value: string; note: string }
  /** Scroll progress 0..1. When omitted, progress follows this diagram crossing the viewport. */
  progress?: MotionValue<number>
  className?: string
}

const statusLabel = { trigger: "Trigger", auto: "Automated", done: "Complete" } as const
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const START = 0.05
const SPAN = 0.8
const RAMP = 0.08

/** Progress value at which node i begins to light. */
const nodeStart = (i: number, n: number) => START + (i * SPAN) / Math.max(1, n - 1)

function Node({
  node,
  i,
  n,
  progress,
  last,
}: {
  node: WorkflowNode
  i: number
  n: number
  progress: MotionValue<number>
  last: boolean
}) {
  const s = nodeStart(i, n)
  const lit = useTransform(progress, (p) => clamp01((p - s) / RAMP))
  const dimmed = useTransform(lit, (v) => 1 - v)
  const text = useTransform(lit, (v) => 0.55 + 0.45 * v)
  const next = nodeStart(i + 1, n)
  const line = useTransform(progress, (p) => clamp01((p - s - RAMP / 2) / Math.max(0.001, next - s - RAMP / 2)))
  const trigger = node.status === "trigger"

  return (
    <li data-node={i} className="relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-5 last:pb-0">
      {!last && (
        <span aria-hidden className="absolute top-6 bottom-0 left-[0.6875rem] w-px bg-line">
          <m.span data-lit style={{ scaleY: line }} className="absolute inset-0 origin-top bg-ember-500/60" />
        </span>
      )}
      <span
        aria-hidden
        className="relative z-10 mt-0.5 flex size-6 items-center justify-center rounded-[0.3rem] border border-line bg-obsidian-800 font-mono text-[0.625rem]"
      >
        {!trigger && <m.span data-lit style={{ opacity: lit }} className="absolute -inset-px rounded-[0.3rem] border border-ember-500 bg-ember-500" />}
        {last && (
          <m.span data-lit style={{ opacity: lit }} className="absolute inset-0 rounded-[0.3rem] shadow-[0_0_24px_-2px_var(--ember-500)]" />
        )}
        <m.span data-lit style={{ opacity: trigger ? 1 : dimmed }} className="relative text-muted-foreground">
          {String(i + 1).padStart(2, "0")}
        </m.span>
        {!trigger && (
          <m.span data-lit style={{ opacity: lit }} className="absolute text-ember-ink">
            {String(i + 1).padStart(2, "0")}
          </m.span>
        )}
      </span>
      <m.div data-lit style={{ opacity: text }} className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-heading text-base font-bold [font-stretch:108%]">{node.title}</h3>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
            <span className="sr-only">{statusLabel[node.status]}, </span>
            {node.time}
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{node.detail}</p>
      </m.div>
    </li>
  )
}

/**
 * Scroll-driven Missed Call diagram: nodes light in sequence, connectors draw, and the
 * recovered-value counter runs. Server HTML is dim-by-default; reduced-motion and no-JS
 * users get the fully-lit state from globals.css (`[data-scene] [data-lit]`).
 */
export function ScrollWorkflow({ code, nodes, outcome, progress, className }: Props) {
  const ref = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: own } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] })
  const p = progress ?? own

  const target = outcome ? Number(outcome.value.replace(/[^0-9.]/g, "")) : 0
  const bookStart = nodeStart(Math.min(3, nodes.length - 1), nodes.length)
  const endStart = nodeStart(nodes.length - 1, nodes.length)
  const format = (v: number) => outcome?.value.replace(/[0-9][0-9,.]*/, Math.round(v).toLocaleString("en-CA")) ?? ""

  const paint = (v: number) => {
    if (!counterRef.current || !outcome) return
    counterRef.current.textContent = format(target * clamp01((v - bookStart) / Math.max(0.001, endStart - bookStart)))
  }
  useMotionValueEvent(p, "change", (v) => {
    if (!reduce) paint(v)
  })
  useEffect(() => {
    if (!reduce) paint(p.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  return (
    <figure
      ref={ref}
      data-scene
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
        {nodes.map((node, i) => (
          <Node key={node.id} node={node} i={i} n={nodes.length} progress={p} last={i === nodes.length - 1} />
        ))}
      </ol>
      {outcome && (
        <figcaption className="flex flex-wrap items-end justify-between gap-3 border-t border-line bg-obsidian-950/60 px-4 py-4 sm:px-5">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">Outcome</p>
            <p className="mt-1 font-medium">{outcome.label}</p>
          </div>
          <p className="font-heading text-3xl font-extrabold tabular-nums text-ember-500 [font-stretch:118%]">
            <span className="sr-only">{outcome.value}</span>
            <span aria-hidden ref={counterRef}>
              {outcome.value}
            </span>
          </p>
          <p className="w-full text-xs text-muted-foreground">{outcome.note}</p>
        </figcaption>
      )}
    </figure>
  )
}
