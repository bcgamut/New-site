# gamutpurpose.com — the agentic rebuild

Strategy, architecture and code for moving Gamut Purpose Partners off Squarespace
and onto a site that does some of the work instead of describing it.

---

## The thesis

Every competitor's website *describes* consulting. Gamut's product is a senior
facilitator asking a room the right question — which is precisely what an agent is
good at. So the site should be **session zero of the actual engagement**: free, 24/7,
at scale.

A visitor arrives with a vague ache ("our board says yes to everything and nothing
changes") and leaves with a written read on where their institution is stuck, plus
three questions to put to their board. Useful whether or not they ever call. And a
far better qualified lead than a contact form, because they have just described
their problem in their own words.

**The device:** the Gamut mark is literally a colour gamut — offset spectrum bands
framing an ink block. So the diagnostic *is* the gamut. Five bands, five colours,
one per dimension of institutional inertia:

| Band | Token | The question it asks |
| --- | --- | --- |
| Purpose | `coral` | Can everyone say why you exist, the same way? |
| Alignment | `gold` | Does your board agree on what to stop doing? |
| Momentum | `electric` | Can a decision travel from the room to the work? |
| Relevance | `indigo` | Do the people you need next know you exist? |
| Capacity | `teal` | Can you sustain the version of you that's coming? |

The output renders as the visitor's own gamut. The brand mark becomes the deliverable.

## The second half: being the answer, not just having a page

"Agentic" splits in two, and the quiet half compounds harder. Nonprofit EDs and CSR
leads increasingly ask an assistant *"who helps organisations like ours with purpose
strategy?"* — and assistants answer from structured, machine-legible sources.

So everything in `src/content/practice.ts` is authored **once** and served **three ways**:

1. to people, as rendered pages
2. to the on-site diagnostic, as the agent's grounding (`netlify/functions/session.mts`)
3. to external assistants, as JSON-LD (`src/lib/schema.ts`) and `/llms.txt`

Change a service in one file and the pages, the schema, the llms.txt and the
facilitator's own prompt all move together. Nothing drifts.

---

## Why this is not on Squarespace

Not a preference — four hard structural limits:

| What the strategy needs | Squarespace |
| --- | --- |
| A server-side `ANTHROPIC_API_KEY` | No server-side runtime. Any key a Squarespace page can reach is a key in the browser, and therefore public. |
| `/llms.txt` at the domain root, as `text/plain` | Cannot serve arbitrary files at arbitrary paths with chosen content types. |
| `robots.txt` naming `ClaudeBot`, `GPTBot`, `PerplexityBot` | Not editable. |
| Custom JSON-LD describing a *practice* | Built-in markup describes a *website*. Injected script tags are fragile and template-dependent. |

Code Injection can carry the diagnostic's *UI*, with the brain hosted externally —
that hybrid is a real option if migrating content is the blocker. But it leaves the
discoverability half crippled, which is the half that compounds.

---

## What is here now

```
prototype/index.html        A complete, working prototype of the agentic homepage.
                            Published as a private Claude Artifact for review.
                            Runs the real diagnostic, and degrades to a scripted
                            one if the viewer declines or is offline.

src/content/practice.ts     The content model. Single source of truth.
src/lib/schema.ts           JSON-LD: ProfessionalService, Person, Service, FAQPage.
src/pages/llms.txt.ts       /llms.txt, generated from the content model.
public/robots.txt           Explicitly welcomes AI crawlers.

netlify/functions/session.mts   The facilitator. Claude Opus 5, structured output
                                via Zod, prompt-cached persona, CORS allowlist,
                                typed error handling, refusal handling.

netlify.toml                Routing, headers, /api/session.
astro.config.mjs            Static output — every marketing page is HTML on a CDN.
```

**Not yet built:** the Astro page layer (home, approach, work, about, the `/answers/`
content that feeds answer engines). That waits on sign-off for direction and copy —
the prototype is the thing to react to first.

## Running it

```bash
npm install
cp .env.example .env        # add ANTHROPIC_API_KEY
npm run dev                 # netlify dev — serves the site and the function
```

`ANTHROPIC_API_KEY` is server-side only. Never give it a `PUBLIC_` prefix; that
ships it to the browser.

## Design system

Everything comes from the **Gamut Purpose Partners Design System** — ink `#181A26`
on bone `#FBF8F2`, spectrum accents led by coral `#F43B6C`, Hanken Grotesk /
Newsreader / Spline Sans Mono, the gamut-stack motif, flat colour fields and no
gradients, sentence case throughout.

One deliberate extension: in the diagnostic, **the facilitator speaks in Newsreader
italic** — the "luminary voice" the brand book describes — and the visitor answers in
Hanken Grotesk. The conversation is typographically a dialogue between the
institution and the adviser.

## Sources

Bios, clients, proof figures and client quotes come from Gamut's own proposal
library in Drive (`American-Forests-Proposal-BC Improved.docx` and siblings).
Nothing on the site is invented — there are no placeholder statistics anywhere.

**Deliberately not carried across from those proposals:** reference contacts and
their personal email addresses, partner phone numbers, and rate-card and pro-bono
pricing. Those belong in a proposal, not on a public site.

## Do not name

Some organisations must never appear on the site or in generated content, even
though they appear in the Drive proposal library. Check this list before pulling
any new client material in.

- **Miriam's Kitchen** — do not name, in any copy, data file, schema or llms.txt.

## Open questions

- **Client-quote clearance.** `VOICES` in `practice.ts` comes from a document
  footed "Confidential". Confirm each quote is cleared for public attribution.
- **Michael's workshop count.** The Dec 2025 proposal says 150+; his LinkedIn says
  200+. The site uses 150+. Confirm which is current.
- **Fonts.** Hanken Grotesk / Newsreader / Spline Sans Mono are the design system's
  open-source substitutions, not confirmed brand faces.
- **The five bands** are my framing of Gamut's diagnostic, not an existing Gamut
  framework. If there's a real internal model, the bands should map to it.
