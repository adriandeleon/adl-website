#!/usr/bin/env node
// Dependency-free production-output checks: broken internal links plus a
// small accessibility baseline. Run after `astro build`, or use `npm run
// validate` to build and check in one command.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const failures = [];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function attr(tag, name) {
  return tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"))?.slice(1).find(Boolean);
}

function report(file, message) {
  failures.push(`${file.slice(dist.length + 1)}: ${message}`);
}

function internalTarget(file, href) {
  const clean = href.split(/[?#]/, 1)[0];
  if (!clean || clean.startsWith("#") || /^[a-z][a-z+.-]*:/i.test(clean) || clean.startsWith("//")) return null;
  return clean.startsWith("/")
    ? join(dist, clean.slice(1))
    : resolve(dirname(file), clean);
}

function targetExists(target) {
  return existsSync(target) || existsSync(`${target}.html`) || existsSync(join(target, "index.html"));
}

if (!existsSync(dist)) {
  console.error("dist/ is missing; run the production build first.");
  process.exit(1);
}

const htmlFiles = walk(dist).filter((file) => extname(file) === ".html");
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  // Inline component scripts can contain strings that look like markup (the
  // search renderer builds result anchors this way). Validate the document,
  // not those implementation strings.
  const markup = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  if (!/<html\b[^>]*\blang=(?:"[^"]+"|'[^']+')/i.test(markup)) report(file, "<html> needs a lang attribute");
  if (!/<title>\s*[^<]+\s*<\/title>/i.test(markup)) report(file, "page needs a non-empty <title>");

  const headings = markup.match(/<h1\b/gi) ?? [];
  if (headings.length !== 1) report(file, `expected one <h1>, found ${headings.length}`);

  for (const image of markup.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\salt(?:=|\s|>)/i.test(image)) report(file, "image is missing alt text");
  }
  for (const button of markup.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) ?? []) {
    const visibleText = button.replace(/<[^>]+>/g, "").trim();
    if (!attr(button, "aria-label") && !attr(button, "aria-labelledby") && !visibleText) {
      report(file, "button has no accessible name");
    }
  }
  for (const dialog of markup.match(/<[^>]+\brole=(?:"dialog"|'dialog')[^>]*>/gi) ?? []) {
    if (attr(dialog, "aria-modal") !== "true") report(file, "dialog needs aria-modal=true");
    if (!attr(dialog, "aria-label") && !attr(dialog, "aria-labelledby")) report(file, "dialog has no accessible name");
  }

  for (const tag of markup.match(/<(?:a|link)\b[^>]*\shref=(?:"[^"]*"|'[^']*')[^>]*>/gi) ?? []) {
    const href = attr(tag, "href");
    const target = href && internalTarget(file, href);
    if (target && !targetExists(target)) report(file, `broken internal link: ${href}`);
  }
}

if (failures.length) {
  console.error(`Validation failed (${failures.length}):\n${failures.map((f) => `- ${f}`).join("\n")}`);
  process.exit(1);
}

console.log(`Validation passed: ${htmlFiles.length} HTML pages, internal links, and accessibility smoke checks.`);
