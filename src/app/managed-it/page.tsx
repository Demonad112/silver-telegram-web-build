import Link from "next/link"
import { Section, SpecGrid, container, sectionClass } from "@/components/pages/blocks"
import { FinalCta } from "@/components/home/sections"
import { JsonLd } from "@/components/site/json-ld"
import { PageHero } from "@/components/site/page-hero"
import { buttonVariants } from "@/components/ui/button"
import { managedIt } from "@/content/services"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Managed IT and security for small businesses",
  description: managedIt.seoDescription,
  path: "/managed-it",
})

export default function ManagedItPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: managedIt.title,
          description: managedIt.seoDescription,
          serviceType: "Managed IT services",
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: { "@type": "AdministrativeArea", name: "Alberta, Canada" },
        }}
      />
      <PageHero code="OI-020" eyebrow={managedIt.hero.eyebrow} title={managedIt.hero.title} body={managedIt.hero.body}>
        <Link href={site.cta.href} className={buttonVariants({ size: "lg", className: "h-12 px-5 text-base" })}>
          {site.cta.label}
        </Link>
      </PageHero>

      <Section id="capabilities-title" code="OI-021" eyebrow="What we manage" title="The basics, done properly and kept that way.">
        <SpecGrid items={managedIt.capabilities} />
      </Section>

      <section aria-labelledby="investigator-title" className={sectionClass}>
        <div className={container}>
          <div className="rounded-lg border border-line bg-obsidian-900 p-8 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--sheen)_18%,transparent)] md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              <span className="text-ember-500">OI-022</span> / {managedIt.investigator.eyebrow}
            </p>
            <h2
              id="investigator-title"
              className="mt-4 max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] font-extrabold tracking-tight [font-stretch:112%]"
            >
              {managedIt.investigator.title}
            </h2>
            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{managedIt.investigator.body}</p>
            <Link href="/about" className={buttonVariants({ variant: "outline", size: "lg", className: "mt-8 h-11 px-4" })}>
              About the founder
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
