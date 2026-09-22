/**
 * JSON-LD, generated from the content model.
 *
 * This is the half of "agentic" that has nothing to do with chat: when a nonprofit
 * ED asks an assistant "who helps organisations like ours with purpose strategy?",
 * the assistant answers from structured, machine-legible sources. Most consultancies
 * publish none. Squarespace's built-in markup describes a *website*; this describes
 * a *practice* — what it does, for whom, and who stands behind it.
 */
import { ORG, PEOPLE, SERVICES } from "../content/practice.js";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${ORG.url}/#organization`,
    name: ORG.name,
    url: ORG.url,
    email: ORG.email,
    description: ORG.description,
    slogan: ORG.tagline,
    areaServed: "US",
    knowsAbout: [
      "Purpose strategy", "Nonprofit strategic planning", "Board facilitation",
      "Organizational change", "Corporate social impact", "Stakeholder engagement",
      "Participatory design", "Business model design",
    ],
    employee: PEOPLE.map((p) => ({ "@id": `${ORG.url}/#person-${slug(p.name)}` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Advisory engagements",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${ORG.url}/services/${s.slug}#service`,
          name: s.name,
          description: s.summary,
          provider: { "@id": `${ORG.url}/#organization` },
          audience: { "@type": "Audience", audienceType: s.forWhom },
        },
      })),
    },
  };
}

export function peopleSchema() {
  return PEOPLE.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${ORG.url}/#person-${slug(p.name)}`,
    name: p.name,
    jobTitle: p.role,
    description: p.bio,
    knowsAbout: [...p.expertise],
    alumniOf: p.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.split(", ").slice(1).join(", "),
    })),
    worksFor: { "@id": `${ORG.url}/#organization` },
  }));
}

/**
 * FAQ markup is the highest-leverage structured data for answer engines: it maps
 * a question someone actually asks to an answer in Gamut's own words.
 */
export function faqSchema(faqs: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
