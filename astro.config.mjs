// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import { site } from "./src/lib/site.ts";
import { draftPaths } from "./src/lib/drafts.mjs";

// Drafts render a page (so you can preview one at its URL) but must not be
// advertised in the sitemap — the page itself says noindex, and a sitemap entry
// would contradict it. Computed once at config load.
const drafts = new Set(draftPaths());

// The site lives at the domain root, so there is no `base` — asset and link
// paths are plain "/...". If you ever serve it from a subpath (a project page
// at user.github.io/repo), set `base` here and the links keep working.
export default defineConfig({
  // Absolute-URL base for the sitemap and the RSS feed. Comes from site.ts so
  // there is exactly one place to change the domain.
  site: site.url,
  // pagefind() runs the Pagefind indexer inside `astro build` (so it works no
  // matter how CI invokes the build) and serves the index in `astro dev`.
  integrations: [
    sitemap({
      // `page` is an absolute URL; compare on the path so the domain in
      // site.ts can change without silently disabling the filter.
      filter: (page) => !drafts.has(new URL(page).pathname),
    }),
    pagefind(),
  ],
});
