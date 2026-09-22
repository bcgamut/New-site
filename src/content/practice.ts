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
    name: "Brian Cox",
    role: "Partner and co-founder",
    bio:
      "Brian was a transformation executive at Salesforce and is a strategic adviser to UN " +
      "agencies including UNICEF, UNHCR and the World Food Programme. His experience spans " +
      "major gifts fundraising, digital marketing leadership at United Way Worldwide, and " +
      "organisational change.",
    expertise: [
      "Transformational change strategy", "Corporate partnerships",
      "Building organizational culture", "Major gifts fundraising",
      "Digital marketing leadership",
    ],
    education: [],
    /** The brand book asks for warm and human. This is true and it is his. */
    note: "A beekeeper, which is its own argument about healthy systems.",
  },
  {
    name: "Michael Brooks",
    role: "Partner and co-founder",
    bio:
      "Michael was Chief Strategy & Digital Officer at ChildFund International and Senior " +
      "Vice President of Strategy & Innovation at United Way Worldwide. He has facilitated " +
      "more than 150 inclusive design workshops — with the Forest Service, the EPA, boards " +
      "and executive teams.",
    expertise: [
      "Strategy", "Organizational design", "Constituent engagement",
      "Digital transformation", "Innovation", "Participatory design", "Facilitation",
    ],
    education: ["MPA, George Washington University", "MDiv, Yale University"],
    note: "",
  },
] as const;

/**
 * How Gamut describes itself in its own proposals. Worth more than anything
 * invented: this is the claim that actually wins work.
 */
export const DIFFERENTIATOR =
  "Uncommon among strategy consultants, Gamut has deep experience in operations and working " +
  "inside national and international nonprofits. Our team has worked in full-time leadership " +
  "roles in nearly every aspect of not-for-profit operations — from field delivery to policy " +
  "advocacy to philanthropy — giving us a practical understanding of what makes strategy work.";

export const BELIEF =
  "How we go about strategic planning shapes what strategy emerges, and who feels ownership " +
  "of it. Every strategy project is also a culture project.";

/** Clients Gamut already names in its own proposals. */
export const CLIENTS = [
  "Blood Cancer United (formerly Leukemia & Lymphoma Society)",
  "United Way Worldwide",
  "ChildFund International",
  "Mothers Against Drunk Driving",
  "North American Association for Environmental Education",
  "UNICEF", "UNHCR", "World Food Programme", "World Health Organization",
  "Congressional Research Service",
] as const;

/** Measured outcomes from delivered engagements. No invented numbers anywhere. */
export const PROOF = [
  { figure: "440+", label: "Professionals engaged in a single strategy process.", client: "Blood Cancer United" },
  { figure: "+17pts", label: "Rise in confidence in leadership direction after the engagement.", client: "Blood Cancer United" },
  { figure: "94%", label: "Staff who said they understand the vision and strategy.", client: "Blood Cancer United" },
  { figure: "150+", label: "Workshops facilitated with boards, executives and teams.", client: "" },
] as const;

/**
 * Real client voices, from Gamut's proposal library.
 * TODO(brian): these come from a document footed "Confidential". Confirm each
 * is cleared for public attribution before launch.
 */
export const VOICES = [
  { quote: "In the years I've been here, we've never had a conversation like this.",
    who: "Chief Scientific Officer", org: "Leukemia & Lymphoma Society" },
  { quote: "We are becoming human to each other.",
    who: "Senior Vice President, Public Policy", org: "Leukemia & Lymphoma Society" },
  { quote: "I had no idea how we'd get from the ocean to the lake to the pond to the puddle to the glass of water. You exceeded all expectations.",
    who: "Head of People and Culture", org: "Mothers Against Drunk Driving" },
] as const;
