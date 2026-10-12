import type { WorkflowNode } from "@/content/missed-call"

// TODO(content): trade workflows are first-draft illustrations, not client results.
// Owner to confirm priority trades, tools, and wording before launch.

export type Playbook = {
  slug: string
  code: string
  label: string
  line: string
  title: string
  summary: string
  problem: string
  workflowCode: string
  nodes: WorkflowNode[]
  tools: string[]
  measure: string[]
}

export const playbooks: Playbook[] = [
  {
    slug: "plumbing",
    code: "PB-01",
    label: "Plumbing",
    line: "Emergency calls answered at 2am, without you.",
    title: "Plumbing: win the emergency call, then the repeat customer.",
    summary: "After-hours leaks and backed-up drains go to whoever picks up first. This playbook makes that you.",
    problem:
      "Emergency work is the highest-margin work and the least patient. A homeowner with water coming through the ceiling calls three companies and books the first one that responds. If you are under a sink, that is not you.",
    workflowCode: "WF-PLUMB-EMERGENCY",
    nodes: [
      { id: "call", time: "02:10", title: "After-hours call", detail: "Rings out to voicemail while the on-call tech sleeps.", status: "trigger" },
      { id: "triage", time: "02:10", title: "Instant triage text", detail: "“Is water actively leaking? Can you reach the shut-off?” Asked in your voice, answers captured.", status: "auto" },
      { id: "flag", time: "02:12", title: "Emergency flagged", detail: "True emergencies page the on-call tech with address, photos, and the caller's answers.", status: "auto" },
      { id: "book", time: "02:15", title: "Arrival window confirmed", detail: "Customer gets a window and the tech's name. Non-urgent jobs queue for morning.", status: "auto" },
      { id: "followup", time: "+1 day", title: "Follow-up and review", detail: "Invoice out, then a short review request once the repair is confirmed.", status: "done" },
    ],
    tools: ["Business phone line", "SMS and voice automation", "On-call paging", "Calendar", "Invoicing"],
    measure: ["After-hours calls answered within 2 minutes", "Emergency calls converted to booked jobs", "Reviews requested per completed job"],
  },
  {
    slug: "hvac",
    code: "PB-02",
    label: "HVAC",
    line: "Seasonal rushes booked, maintenance plans renewed.",
    title: "HVAC: survive the rush and keep the maintenance plans.",
    summary: "First cold snap or first heat wave, the phones melt. This playbook keeps every lead and renews every plan.",
    problem:
      "Demand arrives in waves, so calls and quotes pile up exactly when the crew is stretched thinnest. Maintenance plans quietly lapse because nobody has time to chase the renewal.",
    workflowCode: "WF-HVAC-SEASON",
    nodes: [
      { id: "surge", time: "Peak day", title: "Call volume spikes", detail: "More calls than your office can answer, all with the same four questions.", status: "trigger" },
      { id: "intake", time: "Seconds", title: "Structured intake", detail: "Make, symptoms, address, and urgency collected by text before anyone calls back.", status: "auto" },
      { id: "schedule", time: "Same day", title: "Routed and scheduled", detail: "Jobs sorted by urgency and slotted into real tech availability.", status: "auto" },
      { id: "renewal", time: "60 days out", title: "Plan renewal reminder", detail: "Maintenance customers get a renewal prompt before the plan lapses.", status: "auto" },
      { id: "review", time: "After visit", title: "Review requested", detail: "Completed visits trigger a short review link.", status: "done" },
    ],
    tools: ["Business phone line", "SMS intake forms", "Scheduling and dispatch", "Customer list / CRM", "Invoicing"],
    measure: ["Leads captured per peak week", "Time from first call to booked visit", "Maintenance plans renewed on time"],
  },
  {
    slug: "electrical",
    code: "PB-03",
    label: "Electrical",
    line: "Quotes out same day, permits tracked.",
    title: "Electrical: quotes out the same day, paperwork never lost.",
    summary: "Fast, consistent quotes win the job. Tracked permits and inspections keep it moving once you have it.",
    problem:
      "Quotes get written after a full day on site, so the first contractor to reply wins. Permit and inspection steps live in someone's head or a text thread, which is where jobs stall.",
    workflowCode: "WF-ELEC-QUOTE",
    nodes: [
      { id: "inquiry", time: "Day 0", title: "Inquiry arrives", detail: "Web form, call, or text asking for a panel upgrade or a renovation circuit.", status: "trigger" },
      { id: "scope", time: "Minutes", title: "Scope captured", detail: "Photos, panel details, and job type requested up front.", status: "auto" },
      { id: "quote", time: "Same day", title: "Quote drafted", detail: "Priced from your rate sheet, reviewed by you in one tap, sent as a clean PDF.", status: "auto" },
      { id: "permit", time: "On accept", title: "Permit and inspection checklist", detail: "Steps, dates, and reminders created for the job automatically.", status: "auto" },
      { id: "invoice", time: "On sign-off", title: "Invoice and review", detail: "Passed inspection triggers the invoice and a review request.", status: "done" },
    ],
    tools: ["Web form", "Quote templates", "Document generation", "Task and reminder tracking", "Invoicing"],
    measure: ["Time from inquiry to quote sent", "Quote-to-accept rate", "Jobs delayed by missed permit steps"],
  },
  {
    slug: "landscaping",
    code: "PB-04",
    label: "Landscaping",
    line: "Spring sign-ups and recurring crews scheduled.",
    title: "Landscaping: fill the spring calendar and keep it full.",
    summary: "One short season decides the year. This playbook turns spring inquiries into scheduled, recurring crews.",
    problem:
      "Inquiries flood in over a few weeks, most of them for the same handful of services. Hand-quoting each one means the calendar fills unevenly and recurring customers fall through the cracks.",
    workflowCode: "WF-LAND-SEASON",
    nodes: [
      { id: "inquiry", time: "March", title: "Spring inquiries open", detail: "Dozens of requests for mowing, cleanup, and installs in the same fortnight.", status: "trigger" },
      { id: "package", time: "Instant", title: "Package-based quote", detail: "Standard services quoted from your price list by lot size and frequency.", status: "auto" },
      { id: "route", time: "On accept", title: "Crew route built", detail: "Accepted jobs grouped by neighbourhood so crews drive less.", status: "auto" },
      { id: "recurring", time: "Weekly", title: "Recurring visits and billing", detail: "Reminders out the day before, invoices on a set schedule.", status: "auto" },
      { id: "review", time: "Mid-season", title: "Review and referral ask", detail: "Happy customers get one polite request for a review or a neighbour's name.", status: "done" },
    ],
    tools: ["Web form", "Package pricing", "Route and crew scheduling", "Recurring invoicing", "SMS reminders"],
    measure: ["Inquiries converted to scheduled customers", "Crew drive time per day", "Recurring customers retained year over year"],
  },
]

export const getPlaybook = (slug: string) => playbooks.find((p) => p.slug === slug)
