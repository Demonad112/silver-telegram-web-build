"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/site/logo"
import { MobileNav } from "@/components/site/mobile-nav"
import { mainNav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      // Hide while scrolling down past the first screen; reveal on any upward scroll.
      if (y > 240 && y > lastY.current + 4) setHidden(true)
      else if (y < lastY.current - 4 || y <= 240) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      data-scrolled={scrolled || undefined}
      data-hidden={hidden || undefined}
      className="sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color,transform] duration-300 ease-out-glass data-hidden:-translate-y-full data-hidden:focus-within:translate-y-0 data-scrolled:border-line data-scrolled:bg-obsidian-950/80 data-scrolled:backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                      active && "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={site.cta.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden px-4 hover:shadow-[0_0_32px_-4px_var(--ember-500)] sm:inline-flex"
            )}
          >
            {site.cta.label}
          </Link>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  )
}
