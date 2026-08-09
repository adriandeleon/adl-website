import type { ImageMetadata } from "astro";

// Project icons, resolved by convention: src/assets/projects/<entry id>.png,
// where the entry id is the Markdown file's base name. Adding an icon is
// dropping a file in — no frontmatter field, nothing to keep in sync.
//
// The glob is eager so this is a plain lookup at build time, and it has to be
// a literal: Vite resolves import.meta.glob statically, so a path built from a
// variable silently matches nothing.
const files = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/projects/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

const byName = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, mod]) => [
    path.split("/").pop()!.replace(/\.[^.]+$/, ""),
    mod.default,
  ]),
);

/** The icon for a project, or undefined — a project without one just renders
    no icon rather than a broken image. */
export const projectIcon = (id: string): ImageMetadata | undefined =>
  byName.get(id.split("/").pop() ?? id);
