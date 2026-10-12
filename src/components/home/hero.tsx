import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { WorkflowDiagram } from "@/components/workflow/workflow-diagram"
import { hero } from "@/content/home"
import { missedCall } from "@/content/missed-call"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_70%_30%,black,transparent_70%)] bg-size-[48px_48px] opacity-60"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pt-16 pb-24 md:px-8 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pb-32">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
            <span className="text-ember-500">OI-001</span> / {hero.eyebrow}
            <span className="hidden sm:inline"> / {site.location}</span>
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.75rem,5.6vw,4.75rem)] leading-[0.95] font-extrabold tracking-tight [font-stretch:118%]"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">{hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={site.cta.href} className={buttonVariants({ size: "lg", className: "h-12 px-5 text-base" })}>
              {site.cta.label}
            </Link>
            <Link
              href={hero.secondary.href}
              className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-5 text-base" })}
            >
              {hero.secondary.label}
            </Link>
          </div>
        </div>
        <WorkflowDiagram code={missedCall.code} nodes={missedCall.nodes} outcome={missedCall.outcome} />
      </div>
    </section>
  )
}
