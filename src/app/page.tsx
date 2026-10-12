import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"

// Batch 1 placeholder. Batch 2 replaces this with the full home page.
export default function Home() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
        <span className="text-ember-500">OI-001</span> / {site.location}
      </p>
      <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-extrabold tracking-tight [font-stretch:118%]">
        Every missed call is a job someone else books.
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
        {site.description}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={site.cta.href} className={buttonVariants({ size: "lg", className: "h-12 px-5 text-base" })}>
          {site.cta.label}
        </Link>
        <Link
          href="/automation"
          className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-5 text-base" })}
        >
          See how it works
        </Link>
      </div>
    </section>
  )
}
