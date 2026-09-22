/**
 * POST /api/session — the brain behind session zero.
 *
 * This is the file that decides the platform question. It holds ANTHROPIC_API_KEY,
 * which means it must run somewhere with server-side secrets. Squarespace has no
 * such place: any key reachable from a Squarespace page is a key in the browser,
 * and therefore a key on the open internet. Hence Netlify.
 *
 * Two modes:
 *   { mode: "question", turns } -> the next facilitator question + suggested answers
 *   { mode: "map",      turns } -> the Inertia Map: five scored bands, a read,
 *                                  three board questions, and the fitting engagement
 */
import type { Context } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import * as z from "zod/v4";
import { BANDS, SERVICES } from "../../src/content/practice.js";

const MODEL = "claude-opus-5";
const MAX_TURNS = 24;
const MAX_CHARS = 8_000;

const BAND_KEYS = BANDS.map((b) => b.key) as [string, ...string[]];
const SERVICE_NAMES = SERVICES.map((s) => s.name) as [string, ...string[]];

/* ── What Claude is allowed to return ─────────────────────────────────── */

const QuestionOut = z.object({
  question: z.string().describe("One sentence, under 20 words. A facilitator's question."),
  chips: z.array(z.string()).describe("Three short first-person answers, under nine words each."),
});

const MapOut = z.object({
  headline: z.string().describe("Three to seven words naming the pattern. Sentence case."),
  read: z.string().describe("Two or three sentences, specific to what they said. No reassurance."),
  bands: z.array(
    z.object({
      key: z.enum(BAND_KEYS),
      score: z.number().describe("0-100 current STRENGTH. Low means stuck. Spread the scores."),
      note: z.string().describe("At most twelve words."),
    }),
  ),
  boardQuestions: z.array(z.string()).describe("Three uncomfortable, specific, answerable questions."),
  engagement: z.object({
    name: z.enum(SERVICE_NAMES),
    why: z.string().describe("One sentence on why this engagement and not another."),
  }),
});

/* ── The facilitator ──────────────────────────────────────────────────── */

const PERSONA = [
  "You are the facilitator for Gamut Purpose Partners, a strategy practice for nonprofits and",
  "mission-driven institutions. Voice: confident, plainspoken, warm. A senior strategist who",
  "respects the institution's history and is unafraid to say what needs to change. Never",
  "corporate-vague, never cutesy, never reassuring for its own sake. Sentence case. No emoji.",
  "Avoid the words disrupt, revolutionary, game-changing, synergy, leverage, best-in-class.",
  "",
  'You are running "session zero": a short diagnostic reading an institution across five bands.',
  ...BANDS.map((b) => `- ${b.name}: ${b.question}`),
  "",
  "Gamut's engagements, for recommending exactly one at the end:",
  ...SERVICES.map((s) => `- ${s.name}: ${s.summary} For: ${s.forWhom}`),
].join("\n");

const TASK = {
  question: [
    "Ask ONE next question.",
    "- One sentence, under 20 words. A facilitator's question, not a survey item.",
    "- It must follow from what they just said; use their own words back where it helps.",
    "- Probe whichever band you know least about. Never re-ask something already answered.",
    "- Do not advise, summarise, or reassure. Just ask.",
    "Also give three short first-person answers a real leader might pick instead of typing.",
  ].join("\n"),
  map: [
    "Produce the Inertia Map from the whole session.",
    "- headline names the pattern, three to seven words, sentence case.",
    '  Example: "Consensus without consequence."',
    "- read is two or three sentences, quoting their language, naming what is stuck and why.",
    "  No reassurance, no hedging, no advice yet.",
    "- bands: all five. score is current strength 0-100, so low means stuck. Spread the",
    "  scores across the range; do not cluster them.",
    "- boardQuestions: three to put to their board at the next meeting. Uncomfortable,",
    "  specific to them, and answerable in that room.",
    "- engagement: the one Gamut engagement that fits, and one sentence on why that one.",
  ].join("\n"),
} as const;

/* ── Handler ──────────────────────────────────────────────────────────── */

const allowedOrigins = () =>
  (process.env.ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = allowedOrigins();
  const ok = origin && (allowed.length === 0 || allowed.includes(origin));
  return {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    ...(ok ? { "Access-Control-Allow-Origin": origin!, Vary: "Origin" } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

const fail = (status: number, error: string, origin: string | null) =>
  new Response(JSON.stringify({ error }), { status, headers: corsHeaders(origin) });

export default async (req: Request, _context: Context) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });
  if (req.method !== "POST") return fail(405, "Use POST.", origin);

  const allowed = allowedOrigins();
  if (origin && allowed.length > 0 && !allowed.includes(origin)) {
    return fail(403, "Origin not allowed.", origin);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    // Never echo config details to the browser; the log is for us.
    console.error("ANTHROPIC_API_KEY is not set in this deploy context.");
    return fail(503, "The diagnostic is unavailable right now.", origin);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Expected a JSON body.", origin);
  }

  const parsedBody = z
    .object({
      mode: z.enum(["question", "map"]),
      turns: z
        .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1) }))
        .min(1)
        .max(MAX_TURNS),
    })
    .safeParse(body);

  if (!parsedBody.success) return fail(400, "Send { mode, turns }.", origin);
  const { mode, turns } = parsedBody.data;

  const size = turns.reduce((n, t) => n + t.content.length, 0);
  if (size > MAX_CHARS) return fail(413, "That session is too long to read.", origin);
  if (turns.at(-1)!.role !== "user") return fail(400, "The last turn must be theirs.", origin);

  const client = new Anthropic();

  try {
    const response = await client.messages.parse({
      model: MODEL,
      max_tokens: 16_000,
      system: [{ type: "text", text: PERSONA, cache_control: { type: "ephemeral" } }],
      messages: [...turns, { role: "user" as const, content: TASK[mode] }],
      output_config: {
        // A next question should feel like conversation; the map deserves the thinking.
        effort: mode === "question" ? "low" : "high",
        format: zodOutputFormat(mode === "question" ? QuestionOut : MapOut),
      },
    });

    if (response.stop_reason === "refusal") {
      console.warn("Refused:", response.stop_details?.category);
      return fail(422, "We couldn't read that one. Try saying it a different way.", origin);
    }
    if (!response.parsed_output) {
      return fail(502, "That came back malformed. Try again.", origin);
    }

    return new Response(JSON.stringify(response.parsed_output), {
      status: 200,
      headers: corsHeaders(origin),
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return fail(429, "Busy right now — give it a moment.", origin);
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("Anthropic rejected the API key for this deploy context.");
      return fail(503, "The diagnostic is unavailable right now.", origin);
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`Anthropic API error ${error.status}:`, error.message);
      return fail(502, "The diagnostic hit a snag. Try again.", origin);
    }
    console.error("Unexpected failure in session handler:", error);
    return fail(500, "Something went wrong.", origin);
  }
};
