import { FinalCta } from "@/components/home/sections"
import { Section } from "@/components/pages/blocks"
import { PageHero } from "@/components/site/page-hero"
import { pricing } from "@/content/services"
import { pageMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"

export const metadata = pageMetadata({ title: pricing.title, description: pricing.seoDescription, path: "/pricing" })

export default function PricingPage() {
  return (
    <>
      <PageHero code="OI-040" eyebrow={pricing.hero.eyebrow} title={pricing.hero.title} body={pricing.hero.body} />

      <Section id="tiers-title" code="OI-041" eyebrow="Packages" title="Pick the problem. We scope the rest.">
        <ul className="grid gap-4 lg:grid-cols-3">
          {pricing.tiers.map((tier) => (
            <li
              key={tier.code}
              className={cn(
                "flex flex-col rounded-lg border bg-obsidian-900 p-6 md:p-8",
                "featured" in tier && tier.featured ? "border-ember-500/60" : "border-line"
              )}
            >
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">{tier.code}</p>
              <h3 className="mt-8 font-heading text-2xl font-extrabold [font-stretch:115%]">{tier.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tier.for}</p>
              <p className="mt-6 font-heading text-xl font-bold [font-stretch:110%]">{tier.price ?? "Quoted after your audit"}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="terms-title" code="OI-042" eyebrow="Terms" title="How we keep it simple.">
        <ul className="grid gap-4 md:grid-cols-3">
          {pricing.notes.map((n) => (
            <li key={n} className="rounded-lg border border-line p-5 text-sm leading-relaxed text-muted-foreground">
              {n}
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  )
}
