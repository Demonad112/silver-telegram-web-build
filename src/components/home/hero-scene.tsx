"use client"

import { useRef, useSyncExternalStore } from "react"
import { useScroll } from "motion/react"
import { ScrollWorkflow } from "@/components/workflow/scroll-workflow"
import type { WorkflowNode } from "@/content/missed-call"

/** Tall viewports on large screens pin the hero while the scene plays; everything else scrolls normally. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 720px)"
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(PIN_QUERY)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}

type Props = {
  code: string
  nodes: WorkflowNode[]
  outcome: { label: string; value: string; note: string }
  children: React.ReactNode
}

export function HeroScene({ code, nodes, outcome, children }: Props) {
  const wrapper = useRef<HTMLDivElement>(null)
  const pinned = useSyncExternalStore(subscribe, () => window.matchMedia(PIN_QUERY).matches, () => false)
  const { scrollYProgress } = useScroll({ target: wrapper, offset: ["start start", "end end"] })

  return (
    <div ref={wrapper} className={pinned ? "h-[230svh]" : undefined}>
      <div className={pinned ? "sticky top-0 flex h-svh items-center pt-16" : undefined}>
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 pt-16 pb-24 md:px-8 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pb-0 [@media(min-width:1024px)_and_(min-height:720px)]:pt-0">
          <div>{children}</div>
          <ScrollWorkflow code={code} nodes={nodes} outcome={outcome} progress={pinned ? scrollYProgress : undefined} />
        </div>
      </div>
    </div>
  )
}
