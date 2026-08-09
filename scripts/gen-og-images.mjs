#!/usr/bin/env node
// Builds a social card per page, so a shared link previews what it points at
// instead of the same generic image every time.
//
// Cards are drawn as SVG (background, monogram, kicker, title) and rasterised
// with sharp. Output lands in public/og/<slug>.png; a page opts in with
// <Layout ogImage="og/<slug>.png">. The blog and project pages do that
// automatically from their frontmatter — see ogFor() in src/lib/og.ts.
//
// Content cards are derived by reading the Markdown frontmatter directly
// rather than going through Astro's content API, because this runs *before*
// `astro build` (see the build script in package.json) and must not depend on
// the site having been built.
//
//   node scripts/gen-og-images.mjs           # only missing cards
//   node scripts/gen-og-images.mjs --force   # redraw everything
import { mkdirSync, existsSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/og");
const force = process.argv.includes("--force");
mkdirSync(outDir, { recursive: true });

// Kept in step with the dark palette in src/layouts/Layout.astro by hand —
// these are baked into PNGs, so they can't read the site's CSS variables.
const C = {
  bg: "#0d1117",
  panel: "#161b22",
  border: "#30363d",
  text: "#c9d1d9",
  accent: "#58a6ff",
  faint: "#6e7681",
};

// Read the site identity out of site.ts without importing TypeScript: this is
// a plain node script. A miss just falls back, so a reformat can't break it.
const siteTs = readFileSync(join(root, "src/lib/site.ts"), "utf8");
const field = (name, fallback) =>
  siteTs.match(new RegExp(`${name}:\\s*"([^"]*)"`))?.[1] ?? fallback;
const NAME = field("name", "Adrian De Leon");
const MONOGRAM = NAME.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
const DOMAIN = field("url", "https://example.com").replace(/^https?:\/\//, "").replace(/\/$/, "");

// Pulls `title:` out of a Markdown file's YAML frontmatter. Handles the quoted
// and unquoted forms; anything more exotic falls back to the file name, which
// is a fine card title and not worth a YAML dependency.
function frontmatterTitle(file) {
  const text = readFileSync(file, "utf8");
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const m = fm[1].match(/^title:\s*(.+)$/m);
  if (!m) return null;
  return m[1].trim().replace(/^["'](.*)["']$/, "$1");
}

function contentCards(dir, kicker, prefix) {
  const abs = join(root, "src/content", dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => extname(f) === ".md")
    .map((f) => ({
      slug: `${prefix}-${basename(f, ".md")}`,
      kicker,
      title: frontmatterTitle(join(abs, f)) ?? basename(f, ".md"),
    }));
}

const cards = [
  // Section landing pages.
  { slug: "blog", kicker: "Blog", title: "Writing" },
  { slug: "projects", kicker: "Projects", title: "Things I've built" },
  // One per post and per project.
  ...contentCards("blog", "Blog", "blog"),
  ...contentCards("projects", "Project", "project"),
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Rough character-count wrap: the card font is fixed, so this is good enough
// and avoids pulling in a text-measurement dependency.
function wrap(text, max = 26, maxLines = 3) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max && cur) { lines.push(cur); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines.slice(0, maxLines);
}

const svg = ({ kicker, title }) => {
  const lines = wrap(title);
  const startY = 330 - (lines.length - 1) * 34;
  const tspans = lines
    .map((l, i) => `<tspan x="80" y="${startY + i * 68}">${esc(l)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Helvetica, Arial, sans-serif">
  <rect width="1200" height="630" fill="${C.bg}"/>
  <circle cx="1010" cy="120" r="300" fill="${C.accent}" opacity="0.10"/>
  <rect x="80" y="70" width="72" height="52" rx="13" fill="${C.panel}" stroke="${C.border}"/>
  <text x="116" y="104" text-anchor="middle" fill="${C.accent}" font-size="21" font-weight="700" font-family="ui-monospace, Menlo, monospace">${esc(MONOGRAM)}</text>
  <text x="170" y="105" fill="${C.text}" font-size="30" font-weight="700">${esc(NAME)}</text>
  <text x="80" y="196" fill="${C.accent}" font-size="21" font-weight="700" letter-spacing="2.5">${esc(kicker.toUpperCase())}</text>
  <text fill="${C.text}" font-size="58" font-weight="700">${tspans}</text>
  <rect x="80" y="536" width="132" height="4" rx="2" fill="${C.accent}"/>
  <text x="80" y="590" fill="${C.faint}" font-size="23">${esc(DOMAIN)}</text>
</svg>`;
};

let built = 0, skipped = 0;
for (const card of cards) {
  const out = join(outDir, `${card.slug}.png`);
  if (!force && existsSync(out)) { skipped++; continue; }
  await sharp(Buffer.from(svg(card))).png().toFile(out);
  built++;
}

// The site-wide fallback card, used by any page that doesn't set ogImage.
const fallback = join(root, "public/og-image.png");
if (force || !existsSync(fallback)) {
  await sharp(Buffer.from(svg({ kicker: "", title: NAME }))).png().toFile(fallback);
  built++;
}

console.log(`OG images: built ${built}, skipped ${skipped} (in public/og/).`);
