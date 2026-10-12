import { cn } from "@/lib/utils"

type PageHeroProps = {
  code: string
  eyebrow: string
  title: string
  body?: string
  id?: string
  className?: string
  children?: React.ReactNode
}

/** Interior-page header: the single h1, with spec code, lede, and optional actions. */
export function PageHero({ code, eyebrow, title, body, id = "page-title", className, children }: PageHeroProps) {
  return (
    <section aria-labelledby={id} className={cn("relative overflow-hidden", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_80%_0%,black,transparent_65%)] bg-size-[48px_48px] opacity-50"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-28">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          <span className="text-ember-500">{code}</span> / {eyebrow}
        </p>
        <h1
          id={id}
          className="mt-6 max-w-4xl text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-extrabold tracking-tight [font-stretch:118%]"
        >
          {title}
        </h1>
        {body && <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{body}</p>}
        {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}
