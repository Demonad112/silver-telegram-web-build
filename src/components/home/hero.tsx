import Link from "next/link"
import { HeroScene } from "@/components/home/hero-scene"
import { Magnetic } from "@/components/motion/magnetic"
import { buttonVariants } from "@/components/ui/button"
import { hero } from "@/content/home"
import { missedCall } from "@/content/missed-call"
import { site } from "@/lib/site"

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_70%_30%,black,transparent_70%)] bg-size-[48px_48px] opacity-60"
      />
      <HeroScene code={missedCall.code} nodes={missedCall.nodes} outcome={missedCall.outcome}>
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
          <Magnetic>
            <Link href={site.cta.href} className={buttonVariants({ size: "lg", className: "h-12 px-5 text-base hover:shadow-[0_0_32px_-4px_var(--ember-500)]" })}>
              {site.cta.label}
            </Link>
          </Magnetic>
          <Link
            href={hero.secondary.href}
            className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-5 text-base" })}
          >
            {hero.secondary.label}
          </Link>
        </div>
      </HeroScene>
    </section>
  )
}
