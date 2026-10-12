import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { container, sectionClass } from "@/components/pages/blocks"
import { FinalCta } from "@/components/home/sections"
import { PageHero } from "@/components/site/page-hero"
import { playbooks } from "@/content/playbooks"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "Automation playbooks for plumbing, HVAC, electrical and landscaping",
  description:
    "Trade-specific automation playbooks for Calgary plumbers, HVAC, electricians, and landscapers: the problem, the workflow, the tools, and what to measure.",
  path: "/playbooks",
})

export default function PlaybooksPage() {
  return (
    <>
      <PageHero
        code="OI-030"
        eyebrow="Playbooks"
        title="Built for how your trade actually works."
        body="A playbook is a workflow we'd put in place for a specific trade: the problem it solves, the steps, the tools, and what to measure. These are illustrations, not client results."
      />
      <section aria-label="Playbooks" className={sectionClass}>
        <div className={container}>
          <ul className="grid gap-4 md:grid-cols-2">
            {playbooks.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/playbooks/${p.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-line bg-obsidian-900 p-6 transition-colors hover:border-ember-500/60 md:p-8"
                >
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                    <span>{p.code}</span>
                    <ArrowUpRightIcon
                      aria-hidden
                      className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-500"
                    />
                  </div>
                  <h2 className="mt-10 font-heading text-3xl font-extrabold tracking-tight [font-stretch:115%]">{p.label}</h2>
                  <p className="mt-3 text-muted-foreground">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  )
}
