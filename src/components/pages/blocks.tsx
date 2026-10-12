import { SectionHeading } from "@/components/site/section-heading"
import { cn } from "@/lib/utils"

export const container = "mx-auto max-w-7xl px-4 md:px-8"
export const sectionClass = "border-t border-line py-20 md:py-28"

type Item = { code?: string; title: string; body: string }

/** Bordered spec-grid of capabilities/values. */
export function SpecGrid({ items, cols = "lg:grid-cols-3" }: { items: readonly Item[]; cols?: string }) {
  return (
    <ul className={cn("grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2", cols)}>
      {items.map((item) => (
        <li key={item.title} className="bg-obsidian-950 p-6">
          {item.code && <p className="font-mono text-xs text-muted-foreground">{item.code}</p>}
          <h3 className={cn("font-heading text-lg font-bold [font-stretch:108%]", item.code && "mt-6")}>{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
        </li>
      ))}
    </ul>
  )
}

export function Section({
  id,
  code,
  eyebrow,
  title,
  body,
  children,
}: {
  id: string
  code: string
  eyebrow: string
  title: string
  body?: string
  children: React.ReactNode
}) {
  return (
    <section aria-labelledby={id} className={sectionClass}>
      <div className={container}>
        <SectionHeading id={id} code={code} eyebrow={eyebrow} title={title} body={body} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
