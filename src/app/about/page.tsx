import { FinalCta } from "@/components/home/sections"
import { Section, SpecGrid } from "@/components/pages/blocks"
import { PageHero } from "@/components/site/page-hero"
import { about } from "@/content/services"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({ title: about.title, description: about.seoDescription, path: "/about" })

export default function AboutPage() {
  return (
    <>
      <PageHero code="OI-050" eyebrow={about.hero.eyebrow} title={about.hero.title} body={about.hero.body} />

      <Section id="story-title" code="OI-051" eyebrow="The story" title="Why we build it this way.">
        <div className="max-w-[64ch] space-y-5 text-lg leading-relaxed text-muted-foreground">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="values-title" code="OI-052" eyebrow="Values" title="What you can hold us to.">
        <SpecGrid items={about.values} cols="lg:grid-cols-4" />
      </Section>

      <FinalCta />
    </>
  )
}
