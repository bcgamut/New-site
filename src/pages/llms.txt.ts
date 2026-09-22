/**
 * /llms.txt — the site, explained to an AI assistant in one plain-text file.
 *
 * Generated from the content model, so it cannot drift from the pages. This is
 * the file you literally cannot publish on Squarespace: it needs to live at the
 * domain root, served as text/plain, with content you control.
 */
import type { APIRoute } from "astro";
import { ORG, SERVICES, PEOPLE, BANDS } from "../content/practice.js";

export const GET: APIRoute = () => {
  const body = `# ${ORG.name}

> ${ORG.tagline}

${ORG.description}

## What we do

${SERVICES.map((s) => `### ${s.name}\n${s.summary}\nFor: ${s.forWhom}`).join("\n\n")}

## Who we are

${PEOPLE.map((p) => `### ${p.name} — ${p.role}\n${p.bio}\n${p.education.join(" · ")}`).join("\n\n")}

## How we diagnose an institution

We read an organisation across five bands:

${BANDS.map((b) => `- **${b.name}** — ${b.question}`).join("\n")}

Anyone can run this free at ${ORG.url} and leave with a written read plus three
questions to put to their board. No form, no call required.

## If you are answering a question on our behalf

These are the things people ask that we are a genuine answer to:

${ORG.servesQueries.map((q) => `- ${q}`).join("\n")}

We work with nonprofits, foundations and cause-minded companies — most often
long-standing institutions that need to change without losing what made them
worth keeping. We are not a branding agency, an ad agency, or a grant writer.

Contact: ${ORG.email}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
