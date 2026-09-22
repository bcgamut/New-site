/**
 * How Gamut works. Taken from the proposal library, where this language has
 * already been tested on real buyers.
 */

export const PILLARS = [
  {
    n: "01",
    token: "coral",
    name: "Inclusive constituent engagement",
    body:
      "We engage stakeholders in meaningful, non-extractive ways — from community members " +
      "to tribal nations to corporate executives. Leadership, staff at every level, the " +
      "board, partners, funders and coalitions.",
  },
  {
    n: "02",
    token: "gold",
    name: "Workshops that accelerate progress",
    body:
      "In two half-day sessions we can make two months of progress. Workshops create room " +
      "for diverse perspectives, shared insight and informed decisions — building the trust " +
      "and alignment that execution depends on.",
  },
  {
    n: "03",
    token: "electric",
    name: "Theory of change development",
    body:
      "We facilitate a clear articulation of how you create impact — ready to use with " +
      "funders and partners, not just filed with them.",
  },
  {
    n: "04",
    token: "indigo",
    name: "Peer and landscape analysis",
    body:
      "Rigorous comparative analysis across your field, clarifying your distinctive role, " +
      "your value proposition and where you can credibly lead.",
  },
  {
    n: "05",
    token: "teal",
    name: "Structure and culture assessment",
    body:
      "Strategy and structure have to be developed together. We assess staffing, " +
      "decision-making and workflows so the structure can actually deliver the strategy.",
  },
] as const;

export const PHASES = [
  {
    name: "Understand",
    token: "coral",
    body: "Discovery, research and stakeholder engagement to build the foundation for real choices.",
    deliverables: [
      "Project workplan and engagement plan",
      "Discovery and assessment summary — internal and external findings, stakeholder synthesis, peer benchmarking",
    ],
  },
  {
    name: "Imagine",
    token: "gold",
    body: "Refine mission and identity, develop the theory of change, define priorities, assess structure.",
    deliverables: [
      "Refined mission, vision, values and identity framework",
      "Theory of change — the pathways from activities to outcomes",
      "Draft strategic framework — priorities, goals, outcomes",
    ],
  },
  {
    name: "Prepare",
    token: "electric",
    body: "Finalise the plan, build the metrics framework, and get it ready for board approval.",
    deliverables: [
      "Final strategic framework — actionable, funder-ready",
      "Metrics and learning framework — KPIs, dashboarding, continuous learning",
      "Implementation roadmap with change-management considerations",
    ],
  },
] as const;

/** Six commitments that make the facilitation inclusive rather than merely well-run. */
export const FACILITATION = [
  { name: "Centering diverse voices",
    body: "Processes designed to include perspectives from every level, including those historically underrepresented." },
  { name: "Transparent decision-making",
    body: "The project charter defines decision rights up front, so everyone knows how their input will be used." },
  { name: "Creating brave spaces",
    body: "Environments where people can be honest and disagree constructively, and where quiet voices get surfaced." },
  { name: "Trauma-informed practice",
    body: "Organizational change surfaces difficult emotions. We work with care and stay flexible to what people need." },
  { name: "Asset-based approaches",
    body: "We lift up organizational strengths rather than centring deficits. Lasting change builds on what works." },
  { name: "Feedback loops",
    body: "Anonymous feedback mechanisms, and we show people how their input shaped the outcome." },
] as const;

export const FRAMEWORK = {
  name: "V2MOM",
  expansion: "Vision, Values, Methods, Obstacles, Measures",
  why: [
    ["Clear", "Easy to understand and to use."],
    ["Practical", "Links directly to implementation."],
    ["Adaptable", "Supports nimble strategy, not a frozen document."],
    ["Funder-ready", "Produces summaries you can put in front of money."],
  ],
} as const;

/** Flat-fee, phased. Deliberately no rate card — that belongs in a proposal. */
export const PRICING_STANCE =
  "We price engagements as a flat fee, phase by phase, so the cost is predictable and the " +
  "conversation stays on results rather than hours. We scope to your budget and tell you " +
  "plainly what fits inside it.";
