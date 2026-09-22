/**
 * The single source of truth for what Gamut does and who Gamut is.
 *
 * Authored once, served three ways:
 *   1. to people, as rendered pages
 *   2. to the on-site diagnostic, as the agent's grounding
 *   3. to external AI assistants, as JSON-LD and /llms.txt
 *
 * That is the whole architectural bet: one content model, three audiences.
 * Change a service here and the schema, the llms.txt and the agent all move.
 */

export const ORG = {
  name: "Gamut Purpose Partners",
  url: "https://gamutpurpose.com",
  email: "hello@gamutpurpose.com",
  tagline: "Strategy advisers to nonprofits and cause-minded companies.",
  description:
    "Gamut Purpose Partners helps nonprofits and mission-driven institutions find their " +
    "purpose, inspire their stakeholders, engage their employees, and do more good in a " +
    "changing world. The practice brings together subject matter experts, purpose-driven " +
    "companies and nonprofit organisations to build strategies for growth, relevance and impact.",
  /** Plain-language phrases real buyers type, and real assistants get asked. */
  servesQueries: [
    "purpose strategy consultant for nonprofits",
    "nonprofit strategic planning facilitator",
    "board retreat facilitator for nonprofits",
    "how to get a nonprofit board unstuck",
    "corporate purpose and social impact strategy",
  ],
} as const;

/** The five bands of the diagnostic — the brand mark made functional. */
export const BANDS = [
  { key: "purpose",   name: "Purpose",   token: "coral",
    question: "Can everyone say why you exist, the same way?" },
  { key: "alignment", name: "Alignment", token: "gold",
    question: "Does your board agree on what to stop doing?" },
  { key: "momentum",  name: "Momentum",  token: "electric",
    question: "Can a decision travel from the room to the work?" },
  { key: "relevance", name: "Relevance", token: "indigo",
    question: "Do the people you need next know you exist?" },
  { key: "capacity",  name: "Capacity",  token: "teal",
    question: "Can you sustain the version of you that's coming?" },
] as const;

export type BandKey = (typeof BANDS)[number]["key"];

/** Real engagements. `name` values must match how Gamut sells them. */
export const SERVICES = [
  {
    slug: "purpose-distillation",
    name: "Purpose distillation",
    summary:
      "We distil your purpose into its most potent form, then build the strategy that " +
      "drives growth, impact and stakeholder engagement from it.",
    forWhom: "Institutions whose mission statement no longer matches what they actually do.",
    signals: ["purpose", "relevance"] satisfies BandKey[],
  },
  {
    slug: "facilitation",
    name: "Facilitated board or executive session",
    summary:
      "Better board meetings, executive team retreats and staff offsites — designed and " +
      "run so the room actually decides something.",
    forWhom: "Leadership groups that keep discussing the same question without closing it.",
    signals: ["alignment", "capacity"] satisfies BandKey[],
  },
  {
    slug: "organizational-inertia",
    name: "Overcoming Organizational Inertia workshop",
    summary:
      "A working session on implementing change with expediency: understanding what holds " +
      "an institution still, and raising performance across teams to move it.",
    forWhom: "Organisations with a strategy they cannot seem to execute.",
    signals: ["momentum"] satisfies BandKey[],
  },
] as const;

export const PEOPLE = [
  {
    name: "Michael Brooks",
    role: "Co-founder and partner",
    bio:
      "Michael draws on leading legacy nonprofits and founding startups. He was Chief " +
      "Strategy & Digital Officer at ChildFund International and Senior Vice President of " +
      "Strategy & Innovation at United Way Worldwide, and has facilitated more than 200 " +
      "inclusive design sessions and workshops — from boards and executive teams to youth " +
      "social entrepreneurs.",
    expertise: [
      "Strategy", "Innovation", "Business model design", "Network partnership",
      "Constituent engagement", "Digital transformation", "Participatory design",
      "Social enterprise", "Corporate-nonprofit partnerships", "Facilitation",
    ],
    education: ["MPA, George Washington University", "MDiv, Yale University"],
  },
] as const;

/**
 * TODO(brian): these are pulled from engagement documents in the Gamut design
 * system. Confirm which may be named publicly before this ships — some client
 * agreements restrict attribution.
 */
export const ENGAGEMENTS = [
  { client: "CRS",                    work: "Strategic planning" },
  { client: "PHI",                    work: "Strategic plan; organisational and team development" },
  { client: "Bishop Sullivan Center", work: "Strategy" },
  { client: "Our Stomping Ground",    work: "Value proposition; strategy" },
  { client: "TPCA",                   work: "Strategic plan" },
  { client: "Readers 2 Leaders",      work: "Strategy" },
] as const;
