import Link from "next/link"
import { PageHero } from "@/components/site/page-hero"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"

export const metadata = { title: "Page not found" }

export default function NotFound() {
  return (
    <PageHero code="ERR-404" eyebrow="Page not found" title="That call went to voicemail." body="The page you're after doesn't exist or has moved. Head back to the start, or book the audit while you're here.">
      <Link href="/" className={buttonVariants({ size: "lg", className: "h-12 px-5 text-base" })}>
        Back to home
      </Link>
      <Link href={site.cta.href} className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-5 text-base" })}>
        {site.cta.label}
      </Link>
    </PageHero>
  )
}
