---
title: "Hello"
description: "The first post — what this site is for."
date: 2026-08-09
tags: [meta]
---

This is a placeholder post. Delete it and write your own: every post is one
Markdown file in `src/content/blog/`, and the file name becomes the URL, so
this one lives at `/blog/hello/`.

## Frontmatter

Only `title` and `date` are required. The rest are optional:

```yaml
---
title: "Your title"
description: "Shown in the listing, the RSS feed, and link previews."
date: 2026-08-09
tags: [astro, notes]
draft: false
---
```

Set `draft: true` while you're writing. A draft still builds and is reachable
at its URL — so you can look at it — but it's kept out of the blog index, the
RSS feed and search engines. In `npm run dev` it stays visible in the listing
so you don't lose track of it.

## Writing

Regular Markdown, all of it: **bold**, `inline code`, [links](/projects),
lists, tables, block quotes, and fenced code blocks.

> Nothing here needs a component or a layout choice. Write the file, save it,
> and it shows up.
