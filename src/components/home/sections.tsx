import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { Magnetic } from "@/components/motion/magnetic"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { finalCta, leaks, services, steps, trades, trust } from "@/content/home"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const container = "mx-auto max-w-7xl px-4 md:px-8"
const section = "border-t border-line py-24 md:py-32"

export function Leaks() {
  return (
    <section aria-labelledby="leaks-title" className={section}>
      <div className={container}>
        <SectionHeading id="leaks-title" code="OI-002" eyebrow={leaks.eyebrow} title={leaks.title} />
        <Reveal className="mt-14">
<ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {leaks.items.map((item, i) => (
            <li key={item.title} className="bg-obsidian-950 p-6">
              <p className="font-mono text-xs text-muted-foreground">
                LEAK-{String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 font-heading text-lg font-bold [font-stretch:108%]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section aria-labelledby="services-title" className={section}>
      <div className={container}>
        <SectionHeading
          id="services-title"
          code="OI-003"
          eyebrow="Services"
          title="Two jobs, one partner."
          body="Automation brings the work in. Managed IT keeps the business running safely underneath it."
        />
        <Reveal className="mt-14">
<div className="grid gap-4 md:grid-cols-2">
          {services.map((svc) => (
            <Link
              key={svc.href}
              href={svc.href}
              className="group relative flex flex-col rounded-lg border border-line bg-obsidian-900 p-6 transition-colors hover:border-ember-500/60 md:p-8"
            >
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                <span>{svc.code}</span>
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-500"
                />
              </div>
              <h3 className="mt-10 font-heading text-3xl font-extrabold tracking-tight [font-stretch:115%]">
                {svc.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{svc.summary}</p>
              <ul className="mt-8 space-y-3 border-t border-line pt-6">
                {svc.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className={cn(section, "scroll-mt-16")}>
      <div className={container}>
        <SectionHeading id="how-title" code="OI-004" eyebrow="How it works" title="Audit. Build. Run." />
        <Reveal className="mt-14">
<ol className="grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((step) => (
            <li key={step.n} className="border-t border-ember-500/50 pt-6">
              <p className="font-heading text-5xl font-extrabold text-obsidian-700 [font-stretch:125%]">{step.n}</p>
              <h3 className="mt-4 font-heading text-xl font-bold [font-stretch:108%]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
        </Reveal>
      </div>
    </section>
  )
}

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className={section}>
      <div className={cn(container, "grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20")}>
        <SectionHeading id="trust-title" code="OI-005" eyebrow={trust.eyebrow} title={trust.title} body={trust.body} />
        <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {trust.principles.map((p) => (
            <div key={p.title} className="bg-obsidian-900 p-6">
              <dt className="font-heading font-bold [font-stretch:108%]">{p.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Trades() {
  return (
    <section aria-labelledby="trades-title" className={section}>
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="trades-title"
            code="OI-006"
            eyebrow="Playbooks"
            title="Built for how your trade actually works."
          />
          <Link href="/playbooks" className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-4" })}>
            All playbooks
          </Link>
        </div>
        <Reveal className="mt-14">
<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trades.map((t, i) => (
            <li key={t.slug}>
              <Link
                href={`/playbooks/${t.slug}`}
                className="group flex h-full flex-col justify-between gap-10 rounded-lg border border-line p-6 transition-colors hover:border-ember-500/60 hover:bg-obsidian-900"
              >
                <span className="font-mono text-xs text-muted-foreground">PB-{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-heading text-2xl font-extrabold [font-stretch:115%] group-hover:text-ember-400">
                    {t.label}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{t.line}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line">
      <div className={cn(container, "py-24 md:py-32")}>
        <div className="relative overflow-hidden rounded-lg border border-ember-500/40 bg-obsidian-900 p-8 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 right-0 size-[28rem] rounded-full bg-ember-500/10 blur-3xl"
          />
          <h2
            id="cta-title"
            className="relative max-w-3xl text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.02] font-extrabold tracking-tight [font-stretch:115%]"
          >
            {finalCta.title}
          </h2>
          <p className="relative mt-5 max-w-[56ch] text-lg leading-relaxed text-muted-foreground">{finalCta.body}</p>
          <div className="relative mt-10">
            <Magnetic>
              <Link
                href={site.cta.href}
                className={buttonVariants({
                  size: "lg",
                  className: "h-12 px-6 text-base hover:shadow-[0_0_32px_-4px_var(--ember-500)]",
                })}
              >
                {site.cta.label}
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
