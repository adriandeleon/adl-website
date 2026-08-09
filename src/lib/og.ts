// Social-card path for a content entry, matching the file names
// scripts/gen-og-images.mjs writes.
//
// The generator keys cards off the Markdown file's base name, so an entry in a
// subdirectory (blog/2026/post.md -> id "2026/post") would name a card path
// that doesn't exist. Flattening to the last segment keeps the two in step;
// the trade is that two files with the same base name in different folders
// share a card, which is a fair price for not having a second naming rule.
export const ogFor = (prefix: "blog" | "project", id: string) =>
  `og/${prefix}-${id.split("/").pop()}.png`;
