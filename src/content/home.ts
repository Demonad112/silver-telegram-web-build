// TODO(content): all copy below is first-draft. Replace with owner-approved wording.

export const hero = {
  eyebrow: "AI automation + managed IT",
  title: "Every missed call is a job someone else books.",
  body: "We build the systems that answer, quote, book, and invoice while you're on the tools, and we keep your computers, email, and data locked down. Built for Calgary trades and small businesses.",
  secondary: { label: "See how it works", href: "#how-it-works" },
}

export const leaks = {
  eyebrow: "Where the money goes",
  title: "Most small businesses don't lose jobs to competitors. They lose them to the gaps.",
  items: [
    {
      title: "Calls that ring out",
      body: "You can't answer from a ladder. The homeowner calls the next number on Google.",
    },
    {
      title: "Quotes that sit for days",
      body: "Writing them at the kitchen table at 10pm means the fastest competitor already won.",
    },
    {
      title: "Invoices chased by hand",
      body: "Every reminder you send yourself is cash flow you're financing for your customer.",
    },
    {
      title: "IT held together with tape",
      body: "Shared passwords, no backups, one phishing email away from a very bad week.",
    },
  ],
}

export const services = [
  {
    code: "SVC-01",
    title: "AI automation",
    href: "/automation",
    summary: "Your front office, running on its own.",
    points: [
      "Missed-call text-back and AI call answering",
      "Quotes from your rate sheet in minutes",
      "Online booking synced to your calendar",
      "Invoicing, reminders, and review requests",
    ],
  },
  {
    code: "SVC-02",
    title: "Managed IT & security",
    href: "/managed-it",
    summary: "Computers, email, and data you never think about.",
    points: [
      "Device setup, updates, and monitoring",
      "Email security and phishing protection",
      "Backups you've actually tested",
      "Network and Wi-Fi for shop and office",
    ],
  },
]

export const steps = [
  {
    n: "01",
    title: "Free audit",
    body: "A 45-minute call. We map where calls, quotes, and invoices stall, and check your security basics.",
  },
  {
    n: "02",
    title: "Build",
    body: "We set up the workflows on tools you own, test them against real jobs, and train your team.",
  },
  {
    n: "03",
    title: "Run",
    body: "We monitor, fix, and improve. You get a plain-language report each month, not a dashboard to babysit.",
  },
]

export const trust = {
  eyebrow: "Why we're different",
  title: "Automation audited like evidence.",
  body: "Obsidian was founded by a loss-prevention and security investigator. We build every system the way an investigator would want to find it: logged, least-privilege, and explainable.",
  principles: [
    { title: "You own it", body: "Accounts, data, and workflows sit in your name. Leave any time and keep everything." },
    { title: "Least privilege", body: "Every integration gets only the access it needs, and nothing else." },
    { title: "Logged and reviewable", body: "Every automated message and action leaves a trail you can check." },
    { title: "Plain language", body: "No jargon, no lock-in contracts you need a lawyer to read." },
  ],
}

export const trades = [
  { slug: "plumbing", label: "Plumbing", line: "Emergency calls answered at 2am, without you." },
  { slug: "hvac", label: "HVAC", line: "Seasonal rushes booked, maintenance plans renewed." },
  { slug: "electrical", label: "Electrical", line: "Quotes out same day, permits tracked." },
  { slug: "landscaping", label: "Landscaping", line: "Spring sign-ups and recurring crews scheduled." },
]

export const faqs = [
  {
    q: "Do I need to change the software I already use?",
    a: "Usually not. We connect to what you have (your phone line, calendar, accounting, and job software) and only suggest a switch when it clearly pays for itself.",
  },
  {
    q: "Will customers know they're texting with AI?",
    a: "Yes, if you want them to. Messages are written in your voice and hand off to a person the moment a conversation needs one.",
  },
  {
    q: "Is my customer data safe?",
    a: "Security is where we started. Accounts stay in your name, access is limited per tool, and every automated action is logged.",
  },
  {
    q: "How long does setup take?",
    a: "Most first workflows go live within a few weeks of the audit. We'll give you a firm timeline before you commit.",
  },
]

export const finalCta = {
  title: "Find out what your missed calls are costing you.",
  body: "Book a free 45-minute audit. You'll leave with a clear list of fixes, whether or not you hire us.",
}
