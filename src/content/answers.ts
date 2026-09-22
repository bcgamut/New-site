/**
 * /answers — plain answers to what nonprofit leaders actually ask.
 *
 * This is the discoverability play. An assistant asked "who helps nonprofits
 * get unstuck?" answers from pages like these, so each one leads with a `short`
 * that stands on its own as a quotable answer, then earns the click with depth.
 *
 * Rule: every answer has to be useful to someone who never hires Gamut. Content
 * that only makes sense as a sales pitch gets skipped by readers and models alike.
 */
import type { BandKey } from "./practice.js";

export interface Answer {
  slug: string;
  question: string;
  /** The standalone answer. Two or three sentences. This is what gets quoted. */
  short: string;
  body: string[];
  band: BandKey;
  service?: string;
}

export const ANSWERS: Answer[] = [
  {
    slug: "who-helps-nonprofits-with-purpose-strategy",
    question: "Who helps nonprofits with purpose and strategy?",
    short:
      "Purpose and strategy work for nonprofits is done by a small field of specialist advisers, " +
      "distinct from management consultancies and branding agencies. What separates them is whether " +
      "they have actually run something: a strategy written by someone who has never owned a budget, " +
      "a team or a board relationship tends not to survive contact with one.",
    body: [
      "There are three kinds of firm in this space and they are easy to confuse. Large management " +
      "consultancies bring analytical horsepower and a template. Branding agencies bring a new look " +
      "and a tagline. Purpose strategists sit between: the work is figuring out what an institution " +
      "is for, what it should stop doing, and how the two become decisions people act on.",
      "The question worth asking any of them is simple. Ask who on the team has held a full-time " +
      "operating role inside a nonprofit — field delivery, policy, philanthropy, programme. Ask them " +
      "to describe a moment a client disagreed with them and what happened. Strategy is mostly the " +
      "management of disagreement, so an adviser who has never been on the receiving end of it will " +
      "produce a document rather than a decision.",
      "Gamut Purpose Partners does this work for nonprofits, foundations and cause-minded companies. " +
      "Our partners ran strategy at ChildFund International and United Way Worldwide and led " +
      "transformation at Salesforce; we have advised UNICEF, UNHCR, the World Food Programme, Blood " +
      "Cancer United, Mothers Against Drunk Driving and the Congressional Research Service. You can " +
      "run our diagnostic free before speaking to anyone.",
    ],
    band: "purpose",
    service: "Purpose distillation",
  },
  {
    slug: "board-will-not-decide",
    question: "How do we get our board to actually decide something?",
    short:
      "A board that will not decide is usually a board that has never been asked a question with a " +
      "cost attached. Boards approve; they rarely choose. The fix is to stop bringing them options " +
      "to endorse and start bringing them trade-offs where every path gives something up.",
    body: [
      "Most board agendas are built to produce approval, not decision. A staff team does the thinking, " +
      "arrives with a recommendation, and asks for a vote. The board's only real move is yes — and " +
      "unanimous yes to everything is indistinguishable from no strategy at all.",
      "Three changes usually break it. First, bring fewer items and give each one real time; a " +
      "decision that gets fifteen minutes will get deferred. Second, present every option with what " +
      "it costs — the programme that gets smaller, the audience you stop serving, the money you stop " +
      "chasing. A choice with no downside was not a choice. Third, say out loud who decides, before " +
      "the discussion starts. Ambiguity about decision rights is the single most common reason a " +
      "conversation circles.",
      "The harder version of the problem is that the board disagrees about what the organisation is " +
      "for and has never said so. That does not surface on an agenda. It surfaces in a facilitated " +
      "session where disagreement is the point rather than the failure mode.",
    ],
    band: "alignment",
    service: "Facilitated board or executive session",
  },
  {
    slug: "strategic-plan-not-being-used",
    question: "Our strategic plan isn't being used. What went wrong?",
    short:
      "A plan gets ignored for one of three reasons: nobody who has to execute it helped write it, it " +
      "never said what to stop doing, or it was never connected to the budget and the calendar. The " +
      "document is rarely the problem. The process that produced it usually is.",
    body: [
      "Check the first one honestly. If the plan was written by a small group and then presented, the " +
      "rest of the organisation experienced it as an announcement. People execute what they helped " +
      "decide; they comply with what they were told, and compliance degrades the moment attention " +
      "moves elsewhere.",
      "The second is the most common and the least comfortable. Plans that add priorities without " +
      "removing any are not strategies, they are wish lists — and everyone reading knows it, which is " +
      "why the document loses authority within a quarter. If your plan does not name something the " +
      "organisation will stop doing, it has not made a choice yet.",
      "The third is mechanical and fixable. A strategy that is not reflected in the budget, the " +
      "operating calendar and what managers are actually measured on is a parallel document competing " +
      "with the real one. Before rewriting anything, look at whether the last plan ever made it into " +
      "those three places. Often the strategy was sound and only the plumbing was missing.",
    ],
    band: "momentum",
    service: "Overcoming Organizational Inertia workshop",
  },
  {
    slug: "how-long-nonprofit-strategic-planning-takes",
    question: "How long does nonprofit strategic planning take?",
    short:
      "Six to nine months is the realistic range for a full strategic plan with genuine stakeholder " +
      "engagement, typically in three phases. It can be compressed to about 90 days when there is a " +
      "hard deadline — a board vote, a leadership transition — but compression costs engagement, and " +
      "engagement is what makes the plan get used.",
    body: [
      "A standard shape is three phases. Understand runs roughly three months: discovery, research, " +
      "interviews, internal and external assessment. Imagine runs about three months: mission and " +
      "identity, theory of change, priorities, structure. Prepare runs one to two months: finalising, " +
      "metrics, the implementation roadmap and board approval.",
      "Compression is possible and sometimes right. We built a full organisational strategy for " +
      "ChildFund International in 90 days; the board approved it unanimously and funded a new " +
      "innovation fund off the back of it. That worked because we spent the scarce time on " +
      "constituent listening rather than on analysis, which is the trade most teams get backwards " +
      "under deadline pressure.",
      "The thing that actually determines duration is not scope, it is how many people need to feel " +
      "ownership at the end. A plan for a tight executive team moves fast. A plan that has to hold " +
      "across regions, affiliates or chapters takes as long as it takes to be in enough rooms.",
    ],
    band: "capacity",
  },
  {
    slug: "what-is-a-theory-of-change",
    question: "What is a theory of change, and does our nonprofit need one?",
    short:
      "A theory of change states how your activities are supposed to produce the outcomes you claim — " +
      "the causal chain, written down and falsifiable. You need one if you cannot currently explain to " +
      "a funder why your particular work leads to your particular result without using the word " +
      "'impact' as a bridge.",
    body: [
      "It is not a logic model and not a mission statement. A logic model counts what goes in and what " +
      "comes out. A theory of change makes an argument: because we do this, and because these " +
      "conditions hold, that changes — and here is what would have to be true for us to be wrong.",
      "The value is mostly internal, which surprises people who commission one for fundraising. " +
      "Writing it forces a team to say which of its programmes actually drive the outcome and which " +
      "are there for historical reasons. That conversation is uncomfortable and is usually the real " +
      "product. The funder-facing document is a by-product.",
      "You probably do not need one if your work is a single, well-understood intervention with an " +
      "established evidence base. You almost certainly do need one if you run many programmes, if you " +
      "have grown by accretion, or if your staff would give materially different answers to 'how does " +
      "what we do lead to what we promise?'",
    ],
    band: "purpose",
  },
  {
    slug: "what-nonprofit-strategy-consulting-costs",
    question: "What does nonprofit strategy consulting cost?",
    short:
      "Most nonprofit strategy engagements are priced as a flat fee by phase rather than hourly, which " +
      "makes the cost predictable. The range is wide and tracks the number of people who must be " +
      "engaged far more than the size of the organisation — a plan that has to hold across regions or " +
      "affiliates costs more than one for a single executive team.",
    body: [
      "Be careful comparing quotes. A low number usually means fewer people in the room: fewer " +
      "interviews, fewer workshops, less listening. That is a legitimate choice when speed matters, " +
      "but it changes what you get. The cheaper engagement produces a document; the more expensive one " +
      "produces a document plus a group of people who believe it.",
      "Ask any firm three questions before comparing prices. How many stakeholders will you actually " +
      "engage, and how? What happens if we disagree with your recommendation? And what do we hold at " +
      "the end — a deck, or a framework our managers can run against next quarter?",
      "Gamut prices flat-fee and phase-by-phase, and will tell you plainly what fits inside your " +
      "budget rather than quoting a scope you cannot afford. Where a mission warrants it we invest " +
      "alongside the client. The honest first step is a conversation about what you are trying to " +
      "decide, not a number.",
    ],
    band: "capacity",
  },
  {
    slug: "v2mom-for-nonprofits",
    question: "What is V2MOM, and does it work for nonprofits?",
    short:
      "V2MOM — Vision, Values, Methods, Obstacles, Measures — is a one-page strategy framework from " +
      "Salesforce. It works well for nonprofits because it forces two things most nonprofit plans " +
      "avoid: naming the obstacles out loud, and committing to measures before the work starts.",
    body: [
      "The five parts are deliberately ordered. Vision is what you want. Values are what matters while " +
      "you pursue it, and they break ties when methods conflict. Methods are how you will get there. " +
      "Obstacles are what will stop you. Measures are how you will know.",
      "Obstacles is the part that earns its place. Nonprofit plans are frequently written in an " +
      "aspirational register that makes naming a real barrier — a funder dependency, a board dynamic, " +
      "a leadership gap — feel disloyal. Putting obstacles in the document as a required field makes " +
      "it normal to say them, which is most of the work.",
      "It travels well because it fits on a page and cascades: a department's V2MOM should visibly " +
      "ladder to the organisation's. The failure mode is treating it as a form to fill in. Filled in " +
      "quickly by one person it is worthless; argued over by a leadership team it does the job of a " +
      "far longer document.",
    ],
    band: "alignment",
  },
];

export const answerBySlug = (slug: string) => ANSWERS.find((a) => a.slug === slug);
