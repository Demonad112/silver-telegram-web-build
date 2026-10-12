"use client"

import { m } from "motion/react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

/**
 * Fade-and-rise on first view. Below-the-fold content only: never wrap the LCP element.
 * Reduced motion drops the transform and keeps a plain fade (MotionConfig). No-JS and
 * reduced-motion first paint are handled by the `[data-reveal]` rules in globals.css.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={cn(className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </m.div>
  )
}
