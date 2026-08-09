import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { posts } from "../../lib/content";
import { site } from "../../lib/site";

export async function GET(context: APIContext) {
  // posts() already sorts newest-first and drops drafts, so the feed can never
  // disagree with the blog index about what's published.
  const all = await posts();
  return rss({
    title: `${site.name} — Blog`,
    description: site.description,
    site: context.site ?? site.url,
    items: all.map((p) => ({
      title: p.data.title,
      description: p.data.description ?? "",
      pubDate: p.data.date,
      categories: p.data.tags,
      link: `/blog/${p.id}/`,
    })),
  });
}
