import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog posts. One Markdown file per post in src/content/blog/; the file name
// becomes the URL (my-post.md -> /blog/my-post/).
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Set to true to keep a post out of the index, the RSS feed and the
    // sitemap while you work on it. It still builds, so you can preview it at
    // its URL.
    draft: z.boolean().default(false),
  }),
});

// Projects. One Markdown file per project; the body is the long description
// shown on /projects/<slug>/, the frontmatter drives the card on /projects/.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    // One or two sentences, shown on the card. Keep it short.
    summary: z.string(),
    // Lower sorts first on the index page. Ties fall back to title.
    order: z.number().default(100),
    // Free text, shown as a pill: "Active", "Shipped", "Archived", whatever.
    status: z.string().optional(),
    tech: z.array(z.string()).default([]),
    // Both optional. Convention: when a project has no site of its own, set
    // `url` to the repo too, so the field is never blank. The templates dedupe
    // identical URLs (src/lib/links.ts), so that renders one link, not two.
    repo: z.string().optional(),
    url: z.string().optional(),
    year: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
