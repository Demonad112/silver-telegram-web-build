import Link from "next/link"
import { Section, SpecGrid } from "@/components/pages/blocks"
import { FinalCta } from "@/components/home/sections"
import { JsonLd } from "@/components/site/json-ld"
import { PageHero } from "@/components/site/page-hero"
import { buttonVariants } from "@/components/ui/button"
import { WorkflowDiagram } from "@/components/workflow/workflow-diagram"
import { missedCall } from "@/content/missed-call"
import { automation } from "@/content/services"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  title: "AI automation for trades and small businesses",
  description: automation.seoDescription,
  path: "/automation",
})

export default function AutomationPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: automation.title,
          description: automation.seoDescription,
          serviceType: "AI business automation",
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: { "@type": "AdministrativeArea", name: "Alberta, Canada" },
        }}
      />
      <PageHero code="OI-010" eyebrow={automation.hero.eyebrow} title={automation.hero.title} body={automation.hero.body}>
        <Link href={site.cta.href} className={buttonVariants({ size: "lg", className: "h-12 px-5 text-base" })}>
          {site.cta.label}
        </Link>
        <Link href="/playbooks" className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-5 text-base" })}>
          See trade playbooks
        </Link>
      </PageHero>

      <Section id="capabilities-title" code="OI-011" eyebrow="What gets automated" title="The repeatable parts of running a trade business.">
        <SpecGrid items={automation.capabilities} />
      </Section>

      <Section
        id="example-title"
        code="OI-012"
        eyebrow="One example"
        title="What it looks like when it runs."
        body="One evening, one missed call. Nothing here needs you to be at a desk."
      >
        <WorkflowDiagram code={missedCall.code} nodes={missedCall.nodes} outcome={missedCall.outcome} className="max-w-2xl" />
      </Section>

      <Section id="principles-title" code="OI-013" eyebrow="How we build" title={automation.principles.title} body={automation.principles.body}>
        <ul className="grid gap-4 md:grid-cols-2">
          {automation.principles.items.map((item) => (
            <li key={item} className="flex gap-3 rounded-lg border border-line bg-obsidian-900 p-5 text-sm leading-relaxed">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  )
}
