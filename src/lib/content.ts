import { getCollection } from "astro:content";

// One place decides what "published" means, so the index page, the RSS feed and
// the projects grid can't drift apart. A draft still builds and is reachable at
// its own URL (so you can preview it), it just isn't listed anywhere and is
// marked noindex — see the `noindex` prop in Layout.astro.
//
// `import.meta.env.DEV` is true under `astro dev` and false in `astro build`,
// so drafts show up in the local listing while you write and vanish in the
// deployed one. Nothing to remember, nothing to toggle before publishing.
const isVisible = (draft: boolean) => import.meta.env.DEV || !draft;

/** Blog posts, newest first, drafts hidden in production builds. */
export async function posts() {
  const all = await getCollection("blog", (e) => isVisible(e.data.draft));
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Projects ordered by `order`, then title. Drafts hidden in production. */
export async function projects() {
  const all = await getCollection("projects", (e) => isVisible(e.data.draft));
  return all.sort(
    (a, b) =>
      a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

/** "March 4, 2026" — UTC so a post's date never shifts by timezone. */
export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

/** "Mar 4, 2026" — the compact form used in listings. */
export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
