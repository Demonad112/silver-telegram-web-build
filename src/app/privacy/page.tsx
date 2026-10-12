import { PageHero } from "@/components/site/page-hero"
import { container, sectionClass } from "@/components/pages/blocks"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How Obsidian Intelligence collects, uses, and protects personal information, under PIPEDA and Alberta's PIPA.",
  path: "/privacy",
})

// TODO(content): draft only. Have the policy reviewed against PIPEDA / Alberta PIPA, and update
// once the contact form backend, calendar, and analytics tools are chosen.
const sections = [
  {
    title: "What we collect",
    body: [
      "Information you give us directly: your name, email, phone number, business name, and anything you write when you contact us or book an audit.",
      "Basic technical data when you visit the site, such as pages viewed and device type, if and when we add privacy-friendly analytics. We will update this page before we do.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "To respond to your enquiry, schedule and run your audit, and provide the services you ask for.",
      "We do not sell personal information, and we do not use it for unrelated marketing without your consent.",
    ],
  },
  {
    title: "Who we share it with",
    body: [
      "Only the service providers needed to operate the site and respond to you (for example email and scheduling tools). They may only use your information to provide that service.",
    ],
  },
  {
    title: "How long we keep it",
    body: ["Only as long as needed for the purpose it was collected, or as the law requires."],
  },
  {
    title: "Your rights",
    body: [
      "You can ask to see the personal information we hold about you, correct it, or ask us to delete it, and you can withdraw consent at any time.",
      `To make a request or ask a privacy question, email ${site.email}.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        code="OI-070"
        eyebrow="Legal / Privacy"
        title="Privacy policy."
        body="Short and plain. This policy is written to align with Canada's PIPEDA and Alberta's Personal Information Protection Act."
      />
      <section aria-label="Policy" className={sectionClass}>
        <div className={container}>
          <div className="max-w-[68ch] space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-heading text-2xl font-bold [font-stretch:112%]">{s.title}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Draft policy. Last updated October 2026.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
