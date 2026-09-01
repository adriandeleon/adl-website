# adl-website

Personal site — blog and projects. [Astro](https://astro.build), static output,
deployed to GitHub Pages.

Day to day you only touch Markdown files in `src/content/`.

## Deployment

The canonical URL is `https://adeleon.dev`. It is configured in
`src/lib/site.ts`, `public/CNAME`, and `public/robots.txt`; keep those values in
sync if the domain changes.

On GitHub, set **Settings → Pages → Source** to **GitHub Actions**. Pushing to
`master` deploys the site through `.github/workflows/pages.yml`.

## Commands

| Command           | Does                                              |
| ----------------- | ------------------------------------------------- |
| `npm install`     | Install dependencies                              |
| `npm run dev`     | Dev server at `localhost:4321`, live reload       |
| `npm run build`   | Social cards, then a static build into `dist/`    |
| `npm run check`   | Type, internal-link, and accessibility checks     |
| `npm run validate` | Production build followed by all checks          |
| `npm run preview` | Serve `dist/` locally, as it will be deployed     |

## Writing a post

Create `src/content/blog/my-post.md`. The file name is the URL
(`/blog/my-post/`).

```markdown
---
title: "My post"
description: "One line. Shown in the listing, the RSS feed, and link previews."
date: 2026-08-09
tags: [notes]
draft: false
---

Regular Markdown from here down.
```

`title` and `date` are required; the rest are optional.

## Adding a project

Create `src/content/projects/my-thing.md`. Frontmatter drives the card on
`/projects/`; the body is the detail page.

```markdown
---
title: "My thing"
summary: "A sentence or two. This is the card text."
order: 10
status: "Active"
tech: ["Rust", "SQLite"]
repo: "https://github.com/you/my-thing"
url: "https://my-thing.example"
year: "2026"
---

The long version.
```

`title` and `summary` are required. Lower `order` sorts first.

When a project has no site of its own, set `url` to the repo as well, so the
field is never blank. Identical URLs are deduplicated, so the card and the
fact table show a single link labelled **Source** rather than the same address
twice under two labels — see `src/lib/links.ts` if you'd rather it read
differently.

## Drafts

`draft: true` on a post or project means: kept out of the listing, the RSS feed
and the sitemap, and marked `noindex` — but the page still builds, so you can
preview it at its real URL. Under `npm run dev` it *does* show in listings, so
you don't forget about it. Nothing to toggle before publishing but the flag.

## How it fits together

- `src/content/` — everything you write. Schemas in `src/content.config.ts`.
- `src/lib/site.ts` — name, tagline, domain, nav, social links. One-file edit.
- `src/lib/content.ts` — the single definition of "published" and the date
  formats, shared by every listing and the feed.
- `src/layouts/Layout.astro` — the whole design: header, footer, and all the
  CSS, including both themes. Every colour resolves through the variables in
  its `:root` block.
- `src/pages/` — routes. `[...slug].astro` files render one entry each.
- `scripts/gen-og-images.mjs` — draws a social card per page, post and project
  into `public/og/`. Runs as part of `npm run build`. `--force` redraws.

Search is [Pagefind](https://pagefind.app), indexed during the build from the
elements marked `data-pagefind-body`; press `/` or ⌘K.
