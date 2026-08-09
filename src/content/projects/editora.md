---
title: "Editora"
summary: "A keyboard-driven, cross-platform programmer's text editor. Every action is a command, reachable by your choice of keymap or a fuzzy palette."
order: 0
status: "Active"
tech: ["Java 25", "JavaFX", "Maven"]
repo: "https://github.com/adriandeleon/Editora"
url: "https://editora-project.dev"
year: "2025–"
---

A placeholder entry, filled in with a real project so you can see the shape.
Everything above the `---` drives the card on `/projects/`; everything below it
is this page.

Editora is built around a single idea: every action is a registered command
first, and the UI is a view onto that registry. Keybindings, the palette, the
toolbar and plugins all dispatch through the same place, so a feature is
discoverable the day it lands.

## Frontmatter

`title` and `summary` are required — the summary is the card text, so keep it
to a sentence or two. The rest are optional:

- `order` — lower sorts first on the index page. Ties break by title.
- `status` — free text, shown as a pill. "Active", "Shipped", "Archived".
- `tech` — a list, shown under the summary.
- `repo` / `url` — either, both, or neither.
- `year` — free text, so "2025–" and "2019" both work.
- `draft` — same behaviour as a blog draft: unlisted, noindexed, still
  previewable at its URL.
