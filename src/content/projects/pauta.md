---
title: "Pauta"
summary: "The adl desktop apps guidelines: UI, UX and platform rules for the family of JavaFX desktop apps, with Editora as the reference implementation and every rule naming the class or file to copy from."
order: -1
status: "Active"
tech: ["Astro Starlight", "Markdown", "Pandoc"]
repo: "https://github.com/adriandeleon/adl-desktop-apps-guidelines"
url: "https://pauta-project.dev"
year: "2026–"
---

*Pauta* is Spanish for a guideline, and for the ruled lines on writing paper.
It is the written-down agreement behind Editora, Torrenta, Termina, Modula,
Mirada and nux: what every one of those desktop apps must do before it ships,
what it should do unless it has a reason not to, and what it may grow into.
The rules come from what the apps already do; Editora is the reference, and
when the guide and Editora disagree, one of them gets fixed.

## Thirteen principles, then the detail

Everything follows from thirteen principles — ten for the people using the
apps, three for the people building them. Keyboard first, with every feature
registered as a command that menus, toolbar, palette and key bindings all run
by id. Settings that apply as they are changed, with no Save button. Nothing
failing silently, and nothing claimed that is not true: no dead link, no "up to
date" before the update check has answered. Local first, with no telemetry and
no automatic network call beyond a once-a-day release check the user can turn
off. The same app, with the same installer quality, on Windows, macOS and
Linux.

For the builders: one source of truth for each fact, with a test that fails
when two copies drift; decisions separated from the UI and unit-tested on their
own; and UI changes verified by driving the real window, since none of its
bugs throw.

The pages below the principles turn each one into concrete rules — platform
baseline, repository documents, coverage gates, the window shell, settings and
sync, diagnostics, the command line, internationalization, and release
packaging with signed installers for both arm64 and x64 on every OS. Each rule
carries a `MUST`, `SHOULD` or `MAY` and points at the class or file in Editora
to copy from.

## Written for use, not for reading once

The site is Astro Starlight, with every page a Markdown file and the sidebar
order kept in one JSON file. The same source also builds into a single PDF and
a single Markdown file on every push, so the guide can be handed to a person,
or to a coding agent, in whichever form fits. A feature matrix shows which of
the six apps has which piece today, and a gaps page lists what each app still
misses, so the guide doubles as the family's shared backlog.

A companion template repository meets every `MUST` out of the box: a runnable
app with its tests, CI and release workflows, and an example of every required
repository document. Starting a new app is one rename script away from
compliance.
