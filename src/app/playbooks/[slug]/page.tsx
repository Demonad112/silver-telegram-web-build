import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Section } from "@/components/pages/blocks"
import { FinalCta } from "@/components/home/sections"
import { PageHero } from "@/components/site/page-hero"
import { buttonVariants } from "@/components/ui/button"
import { WorkflowDiagram } from "@/components/workflow/workflow-diagram"
import { getPlaybook, playbooks } from "@/content/playbooks"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<"/playbooks/[slug]">): Promise<Metadata> {
  const playbook = getPlaybook((await params).slug)
  if (!playbook) return {}
  return pageMetadata({ title: `${playbook.label} automation playbook`, description: playbook.summary, path: `/playbooks/${playbook.slug}` })
}

export default async function PlaybookPage({ params }: PageProps<"/playbooks/[slug]">) {
  const playbook = getPlaybook((await params).slug)
  if (!playbook) notFound()

  return (
    <>
      <PageHero code={playbook.code} eyebrow={`Playbook / ${playbook.label}`} title={playbook.title} body={playbook.summary}>
        <Link href={site.cta.href} className={buttonVariants({ size: "lg", className: "h-12 px-5 text-base" })}>
          {site.cta.label}
        </Link>
        <Link href="/playbooks" className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-5 text-base" })}>
          All playbooks
        </Link>
      </PageHero>

      <Section id="problem-title" code="PB / 01" eyebrow="The problem" title="Where this trade leaks money.">
        <p className="max-w-[64ch] text-lg leading-relaxed text-muted-foreground">{playbook.problem}</p>
      </Section>

      <Section id="workflow-title" code="PB / 02" eyebrow="The workflow" title="What runs without you.">
        <WorkflowDiagram code={playbook.workflowCode} nodes={playbook.nodes} className="max-w-2xl" />
      </Section>

      <Section id="tools-title" code="PB / 03" eyebrow="Tools and measures" title="What it runs on, and how we know it works.">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">Tools</h3>
            <ul className="mt-4 space-y-3">
              {playbook.tools.map((t) => (
                <li key={t} className="flex gap-3 text-sm">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">What we measure</h3>
            <ul className="mt-4 space-y-3">
              {playbook.measure.map((m) => (
                <li key={m} className="flex gap-3 text-sm">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ember-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  )
}
