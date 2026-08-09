// Which content is a draft, readable from plain Node.
//
// src/lib/content.ts answers this for pages, but it goes through `astro:content`
// which only exists inside the Astro build. astro.config.mjs runs *before* that
// and needs the same answer to keep drafts out of the sitemap, so this reads the
// Markdown frontmatter directly. Same rule, two callers, one definition of
// "draft" — the alternative is a sitemap that advertises URLs the pages
// themselves mark noindex.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const contentRoot = join(dirname(fileURLToPath(import.meta.url)), "../content");

// Minimal frontmatter probe: `draft: true` on its own line. Not a YAML parser —
// it only has to recognise the one line the schema documents, and a miss fails
// safe (the page is treated as published, i.e. the behaviour before this file).
const isDraft = (file) => {
  const fm = readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return fm ? /^draft:\s*true\s*$/m.test(fm[1]) : false;
};

function draftSlugs(dir) {
  const abs = join(contentRoot, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => extname(f) === ".md")
    .filter((f) => isDraft(join(abs, f)))
    .map((f) => `/${dir}/${basename(f, ".md")}/`);
}

/** Route paths that should not appear in the sitemap, e.g. "/blog/wip/". */
export const draftPaths = () => [...draftSlugs("blog"), ...draftSlugs("projects")];
