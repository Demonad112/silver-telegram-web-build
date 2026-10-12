"use client"

import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { mainNav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function MobileNav({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon-lg" className="md:hidden" />}
      >
        <MenuIcon className="size-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-line bg-obsidian-950 p-6 sm:max-w-sm">
        <SheetTitle className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          Menu
        </SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav aria-label="Mobile" className="mt-6">
          <ul className="flex flex-col">
            {mainNav.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-4 font-heading text-2xl font-bold [font-stretch:112%]",
                        pathname === item.href && "text-ember-500"
                      )}
                    />
                  }
                >
                  {item.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <SheetClose
          nativeButton={false}
          render={
            <Link
              href={site.cta.href}
              className={buttonVariants({ size: "lg", className: "mt-auto h-12 text-base" })}
            />
          }
        >
          {site.cta.label}
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}
