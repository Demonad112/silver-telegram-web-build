import type { MetadataRoute } from "next"
import { playbooks } from "@/content/playbooks"
import { site } from "@/lib/site"

const routes = ["", "/automation", "/managed-it", "/playbooks", "/pricing", "/about", "/contact", "/privacy"]

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...playbooks.map((p) => `/playbooks/${p.slug}`)].map((path) => ({
    url: `${site.url}${path}`,
    priority: path === "" ? 1 : path.startsWith("/playbooks/") ? 0.6 : 0.8,
  }))
}
