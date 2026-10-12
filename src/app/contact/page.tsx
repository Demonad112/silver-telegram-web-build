import { Section } from "@/components/pages/blocks"
import { PageHero } from "@/components/site/page-hero"
import { buttonVariants } from "@/components/ui/button"
import { contact } from "@/content/services"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({ title: contact.title, description: contact.seoDescription, path: "/contact" })

export default function ContactPage() {
  const subject = encodeURIComponent("Free audit request")
  return (
    <>
      <PageHero code="OI-060" eyebrow={contact.hero.eyebrow} title={contact.hero.title} body={contact.hero.body}>
        {/* TODO(content): replace with booking calendar + form once the provider is chosen (Checkpoint 2). */}
        <a href={`mailto:${site.email}?subject=${subject}`} className={buttonVariants({ size: "lg", className: "h-12 px-5 text-base" })}>
          Email us to book
        </a>
      </PageHero>

      <Section id="expect-title" code="OI-061" eyebrow="What to expect" title="Three things happen on the call.">
        <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
          {contact.expect.map((step) => (
            <li key={step.n} className="border-t border-ember-500/50 pt-6">
              <p className="font-heading text-5xl font-extrabold text-obsidian-700 [font-stretch:125%]">{step.n}</p>
              <h3 className="mt-4 font-heading text-xl font-bold [font-stretch:108%]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="bring-title" code="OI-062" eyebrow="Before the call" title="Worth having in mind.">
        <ul className="max-w-2xl space-y-3">
          {contact.bring.map((b) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ember-500" />
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted-foreground">
          Based in {site.location}. Serving Alberta trades and small businesses. Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="text-foreground underline decoration-ember-500 underline-offset-4 hover:text-ember-400">
            {site.email}
          </a>
        </p>
      </Section>
    </>
  )
}
