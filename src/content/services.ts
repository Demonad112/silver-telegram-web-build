// TODO(content): first-draft copy for /automation, /managed-it, /pricing, /about, /contact. Owner to approve.

export const automation = {
  title: "AI automation",
  seoDescription:
    "AI automation for Calgary trades and small businesses: missed-call text-back, same-day quotes, booking, invoicing, and review requests on tools you own.",
  hero: {
    eyebrow: "SVC-01 / AI automation",
    title: "Your front office, running while you work.",
    body: "Most of what slows a small business down is repeatable admin: answering, quoting, booking, invoicing, chasing. We automate those steps so the work gets done at the speed a customer expects.",
  },
  capabilities: [
    { code: "AUTO-01", title: "Missed-call text-back", body: "Every missed call gets an instant, personal text. The conversation starts before the customer calls someone else." },
    { code: "AUTO-02", title: "Quotes from your rate sheet", body: "Job details in, priced draft out. You approve in one tap instead of rebuilding it at night." },
    { code: "AUTO-03", title: "Booking and scheduling", body: "Customers pick a real slot. It lands in your calendar and your tech's phone." },
    { code: "AUTO-04", title: "Invoicing and reminders", body: "Invoices go out when the job closes, and payment reminders send themselves." },
    { code: "AUTO-05", title: "Reviews and follow-up", body: "Happy customers get one short review request. Past customers hear from you before they forget you." },
    { code: "AUTO-06", title: "AI call answering", body: "After-hours and overflow calls answered, triaged, and handed to a person when it matters." },
  ],
  principles: {
    title: "Automation you can audit.",
    body: "Every workflow we build follows the same rules, because an automation you can't explain is a liability.",
    items: [
      "Built on accounts in your name, so you keep everything if you leave.",
      "Each integration gets only the access it needs.",
      "Every automated message and action is logged and reviewable.",
      "A person can step in at any point, and the system hands off cleanly.",
    ],
  },
}

export const managedIt = {
  title: "Managed IT & security",
  seoDescription:
    "Managed IT and security for Calgary small businesses: device management, email security, tested backups, network setup, and monitoring, handled by a security investigator.",
  hero: {
    eyebrow: "SVC-02 / Managed IT & security",
    title: "Computers, email, and data you never have to think about.",
    body: "One bad click or one dead laptop can stop a small business for days. We keep the basics patched, backed up, and monitored, and we explain everything in plain language.",
  },
  capabilities: [
    { code: "IT-01", title: "Devices", body: "Setup, updates, encryption, and monitoring for laptops, desktops, and phones, with remote support when something breaks." },
    { code: "IT-02", title: "Email and identity", body: "Phishing protection, multi-factor authentication, and a password manager, so one stolen password isn't a disaster." },
    { code: "IT-03", title: "Backups you've tested", body: "Automated backups of the data that matters, plus restore tests, because a backup nobody has restored is a guess." },
    { code: "IT-04", title: "Network and Wi-Fi", body: "Reliable, segmented networks for the shop, office, and guests, with a firewall someone is actually watching." },
    { code: "IT-05", title: "Monitoring and response", body: "We watch for failed backups, risky sign-ins, and unpatched machines, and fix them before they become your problem." },
    { code: "IT-06", title: "Plain-language reporting", body: "A short monthly report: what we fixed, what we found, what to decide. No dashboard to babysit." },
  ],
  investigator: {
    eyebrow: "Why security-first",
    title: "Built by someone who investigates incidents for a living.",
    body: "Obsidian's founder comes from loss prevention and security investigation. That means a habit of asking what evidence would exist if something went wrong, and building systems so the answer is always: a clear, complete log.",
  },
}

export const pricing = {
  title: "Pricing",
  seoDescription:
    "How Obsidian Intelligence prices AI automation and managed IT for Calgary small businesses: a free audit first, then a fixed scope with plain monthly support.",
  hero: {
    eyebrow: "Pricing",
    title: "Fixed scope. Plain monthly price. No surprise bills.",
    body: "Pricing depends on the size of the business and how many workflows you want live. The free audit gives you a firm number before you commit to anything.",
  },
  // TODO(content): owner to supply real tiers and numbers. Prices intentionally not invented.
  tiers: [
    {
      code: "TIER-01",
      name: "Automate",
      for: "Trades and service businesses that mainly want calls, quotes, and invoices handled.",
      price: null as string | null,
      includes: ["Missed-call text-back", "Quote and booking workflows", "Invoice and review automation", "Monthly report"],
    },
    {
      code: "TIER-02",
      name: "Secure",
      for: "Small offices that need devices, email, and backups managed properly.",
      price: null as string | null,
      includes: ["Device management and patching", "Email security and MFA", "Tested backups", "Monitoring and remote support"],
    },
    {
      code: "TIER-03",
      name: "Both",
      for: "Businesses that want one partner for the front office and the systems underneath it.",
      price: null as string | null,
      includes: ["Everything in Automate", "Everything in Secure", "Single point of contact", "Priority response"],
      featured: true,
    },
  ],
  notes: [
    "Everything runs on accounts in your name. Tool subscriptions are billed to you directly at cost.",
    "The audit is free and you keep the findings whether or not you hire us.",
    "No long lock-in contract. Plain terms you can read without a lawyer.",
  ],
}

export const about = {
  title: "About",
  seoDescription:
    "Obsidian Intelligence is a Calgary AI automation and managed IT company founded by a loss-prevention and security investigator.",
  hero: {
    eyebrow: "About",
    title: "From investigating incidents to preventing them.",
    // TODO(content): founder background wording unconfirmed; owner to rewrite in their own words.
    body: "Obsidian Intelligence started with a simple observation: small businesses lose money in the same quiet ways, and most of those losses are preventable with better systems.",
  },
  story: [
    "Our founder spent years in loss prevention and security investigation, working out how and why things go wrong. The work is evidence-driven: what happened, what the record shows, and what would have stopped it.",
    "Small businesses have the same problems at a smaller scale. Missed calls, slow quotes, unpaid invoices, weak passwords, backups nobody tested. None of it is glamorous, and all of it costs real money.",
    "So we build the fix the way an investigator would want to find it: logged, least-privilege, and explainable. If something goes wrong, you can see exactly what happened and why.",
  ],
  values: [
    { title: "Security first", body: "Access is limited, actions are logged, and your data stays in your accounts." },
    { title: "Plain language", body: "We explain what we're doing and why, without jargon or upselling." },
    { title: "Local", body: "Based in Calgary and built for Alberta businesses and how they actually work." },
    { title: "Honest scope", body: "We tell you when a fix isn't worth buying, and we don't promise results we can't measure." },
  ],
}

export const contact = {
  title: "Book a free audit",
  seoDescription:
    "Book a free automation and IT audit with Obsidian Intelligence in Calgary. Leave with a clear list of fixes, whether or not you hire us.",
  hero: {
    eyebrow: "Contact",
    title: "Book a free audit.",
    body: "A short call where we look at where calls, quotes, and invoices stall, and check your security basics. You leave with a list of fixes, whether or not you hire us.",
  },
  expect: [
    { n: "01", title: "We talk through your week", body: "How calls come in, how you quote, how you get paid, and what you use today." },
    { n: "02", title: "We check the basics", body: "Backups, email security, passwords, and who has access to what." },
    { n: "03", title: "You get a written list", body: "Ranked fixes with rough effort and cost, yours to keep." },
  ],
  bring: ["Your phone and quoting process in a sentence or two", "The software you use for scheduling and invoicing", "Your biggest headache right now"],
}
