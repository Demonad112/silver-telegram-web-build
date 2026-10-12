export const site = {
  name: "Obsidian Intelligence",
  shortName: "Obsidian",
  description:
    "AI automation and managed IT for Calgary trades and small businesses. Security-first systems that answer every call, quote faster, and keep your business running.",
  location: "Calgary, Alberta",
  email: "hello@obsidianintelligence.ca", // TODO(content): confirm address and domain
  cta: { label: "Book a free audit", href: "/contact" },
} as const

export const mainNav = [
  { label: "Automation", href: "/automation" },
  { label: "Managed IT", href: "/managed-it" },
  { label: "Playbooks", href: "/playbooks" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const

export const footerNav = [
  {
    title: "Services",
    links: [
      { label: "AI automation", href: "/automation" },
      { label: "Managed IT & security", href: "/managed-it" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Playbooks", href: "/playbooks" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
] as const
