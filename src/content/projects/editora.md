---
title: "Editora"
summary: "A keyboard-driven, cross-platform programmer's editor with IDE capabilities that stay out of the way until you need them."
order: 0
status: "Active"
tech: ["Java 25", "JavaFX 26", "RichTextFX", "Maven"]
repo: "https://github.com/adriandeleon/Editora"
url: "https://editora-project.dev"
year: "2025–"
---

Editora is a keyboard-driven programmer's editor built around a simple goal:
IDE power at text-editor speed. It starts as a focused native editor, then
brings in code intelligence, debugging, Git, previews, and other heavier tools
only when the work calls for them.

## One command system

Every action in Editora is a registered command. The menu bar, toolbar,
keybindings, command palette, and plugins all dispatch through that same
system, which keeps features consistent and discoverable.

Search Everywhere provides a single fuzzy interface for commands, project
files, and symbols. Keymaps can follow Emacs, CUA, Sublime Text, VS Code, or
IntelliJ conventions, and shortcuts—including multi-key chords—can be
reassigned.

## An editor that scales with the task

Four interface modes—Zen, Expert, Simple, and Full—let the workspace range
from a distraction-free buffer to a complete development environment. The
editor includes syntax highlighting across common languages and formats,
multiple cursors, split editor groups, snippets, EditorConfig support, project
navigation, and a dedicated log viewer.

## IDE capabilities without bundling the world

Editora integrates with language servers for completion, diagnostics,
navigation, refactoring, formatting, and code actions. When no language server
is available, a built-in symbol scanner keeps navigation useful across many
popular languages.

Run configurations, build-tool tasks, and debugger support sit alongside a
native Git workflow with diffs, history, blame, stashes, and GitHub pull-request
reviews. Remote projects can be opened over SSH and SFTP. External language
servers, debuggers, and command-line tools are detected rather than bundled,
keeping the core application lean.

## More than source code

Editora previews Markdown—including LaTeX and Mermaid—along with HTML,
Graphviz, PlantUML, structured data, and configuration files. Its plugin system
can add commands, views, themes, languages, and integrations, while optional AI
and agent-protocol support remains opt-in.
