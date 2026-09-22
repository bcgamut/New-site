// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gamutpurpose.com",
  // Static by default: every marketing page is HTML on a CDN, which is most of
  // why this will outrun Squarespace. The one dynamic thing — the diagnostic —
  // lives in a Netlify function, not in the page render path.
  output: "static",
  integrations: [sitemap()],
  build: { inlineStylesheets: "auto" },
});
