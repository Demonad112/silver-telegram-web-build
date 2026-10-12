import { cacheLife } from "next/cache"
import Link from "next/link"
import { LogoMark } from "@/components/site/logo"
import { footerNav, site } from "@/lib/site"

async function CopyrightYear() {
  "use cache"
  cacheLife("days")
  return new Date().getFullYear()
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-obsidian-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-heading font-extrabold uppercase tracking-[0.04em] [font-stretch:125%]">
              {site.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm text-foreground underline decoration-ember-500 underline-offset-4 hover:text-ember-400"
          >
            {site.email}
          </a>
        </div>
        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/90 transition-colors hover:text-ember-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground sm:flex-row sm:justify-between md:px-8">
          <p>
            © <CopyrightYear /> {site.name}
          </p>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  )
}
