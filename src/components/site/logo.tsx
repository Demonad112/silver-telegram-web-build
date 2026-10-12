import Link from "next/link"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

/** Faceted obsidian shard mark. Facets use tokens so the mark follows the theme. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-7 shrink-0", className)}
    >
      <path d="M16 2 28 10 24 28 8 28 4 10Z" fill="var(--obsidian-800)" />
      <path d="M16 2 28 10 17 16Z" fill="var(--obsidian-700)" />
      <path d="M16 2 17 16 4 10Z" fill="var(--obsidian-900)" />
      <path d="M17 16 24 28 8 28Z" fill="var(--ember-500)" />
      <path
        d="M16 2 28 10 24 28 8 28 4 10Z"
        fill="none"
        stroke="var(--sheen)"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5 rounded-sm", className)}
    >
      <LogoMark />
      <span className="font-heading text-[0.95rem] font-extrabold uppercase tracking-[0.04em] [font-stretch:125%]">
        Obsidian
        <span className="sr-only"> Intelligence, home</span>
      </span>
    </Link>
  )
}

export { site }
