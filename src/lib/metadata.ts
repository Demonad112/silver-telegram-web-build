import type { Metadata } from "next"
import { site } from "@/lib/site"

type PageMeta = { title: string; description: string; path: string }

/** Per-route metadata: unique title + description, canonical, and matching Open Graph/Twitter tags. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, siteName: site.name, type: "website", locale: "en_CA" },
    twitter: { card: "summary", title: `${title} | ${site.name}`, description },
  }
}
