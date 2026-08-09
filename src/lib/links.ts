// The outward links for a project, in display order.
//
// Convention: when a project has no site of its own, its `url` is the GitHub
// repo — so every project has a canonical destination and the field is never
// blank. That means `url` and `repo` are often the *same* URL, and rendering
// both would put two identical links side by side under different labels.
// Dedupe here, once, so the card and the detail page can't disagree about it.
export type ProjectLink = { href: string; label: string };

export function projectLinks(data: { repo?: string; url?: string }): ProjectLink[] {
  const links: ProjectLink[] = [];
  const seen = new Set<string>();
  const add = (href: string | undefined, label: string) => {
    if (!href) return;
    // Compare on a trailing-slash-normalised form: "…/nux" and "…/nux/" are
    // the same destination and must not both render.
    const key = href.replace(/\/+$/, "");
    if (seen.has(key)) return;
    seen.add(key);
    links.push({ href, label });
  };
  // Source first: when the two are the same URL it is the more precise label
  // for what you land on.
  add(data.repo, "Source");
  add(data.url, "Website");
  return links;
}
