export type WorkflowStatus = "trigger" | "auto" | "done"

export type WorkflowNode = {
  id: string
  time: string
  title: string
  detail: string
  status: WorkflowStatus
}

/**
 * The Missed Call: one illustrative evening, from missed call to review request.
 * Times and amounts are an example scenario, not client data.
 */
export const missedCall = {
  code: "WF-MISSED-CALL",
  outcome: {
    label: "Furnace repair booked",
    value: "$640",
    note: "Illustrative job value. Owner time spent: 0 min.",
  },
  nodes: [
    {
      id: "call",
      time: "18:42",
      title: "Call missed",
      detail: "You're on a roof. The homeowner's furnace just quit.",
      status: "trigger",
    },
    {
      id: "text",
      time: "18:42",
      title: "Instant text-back",
      detail: "“Sorry we missed you. What's going on?” Sent in seconds, in your voice.",
      status: "auto",
    },
    {
      id: "quote",
      time: "18:51",
      title: "Quote drafted",
      detail: "Details captured, priced from your rate sheet, sent for one-tap approval.",
      status: "auto",
    },
    {
      id: "book",
      time: "18:56",
      title: "Job booked",
      detail: "Customer picks a slot. It lands in your calendar and your tech's phone.",
      status: "auto",
    },
    {
      id: "invoice",
      time: "Next day",
      title: "Invoice sent",
      detail: "Job closed on site, invoice out before the truck leaves the driveway.",
      status: "auto",
    },
    {
      id: "review",
      time: "+2 days",
      title: "Review requested",
      detail: "Happy customer gets a short link. Your Google rating does the selling.",
      status: "done",
    },
  ] satisfies WorkflowNode[],
}
