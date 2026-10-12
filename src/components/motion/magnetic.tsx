"use client"

import { useRef } from "react"
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react"

/** Subtle pull toward the pointer for primary CTAs. Mouse only; inert on touch and reduced motion. */
export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span ref={ref} style={{ x, y }} className="inline-block" onPointerMove={move} onPointerLeave={reset}>
      {children}
    </m.span>
  )
}
