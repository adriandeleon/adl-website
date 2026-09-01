---
title: "Capsula"
summary: "A terminal UI for safely managing SSH configuration — browse, edit, connect, and check reachability without rewriting the parts you did not touch."
order: 40
status: "Active"
tech: ["Go 1.26", "Bubble Tea", "OpenSSH"]
repo: "https://github.com/adriandeleon/Capsula"
url: "https://github.com/adriandeleon/Capsula"
year: "2026"
---

Capsula is a terminal interface for `~/.ssh/config`, built around one rule: it
is **your file**. Untouched blocks are returned byte for byte, preserving
comments, indentation, `Key=Value` forms, line endings, and directives the UI
does not understand.

## Editing without data loss

The form manages the common connection fields, but an SSH block can contain
well over a hundred different keywords. Capsula changes only the values you
actually edited and splices those changes back into the original bytes. An
unedited round trip is exact by construction.

Edits stay in memory until you explicitly save. Writes are atomic, the previous
contents are backed up, unsafe newlines are rejected, and a structural mismatch
makes the file read-only rather than risking a bad rewrite.

## OpenSSH remains the authority

SSH configuration precedence involves wildcards, includes, `Match` blocks,
tokens, and first-value-wins rules. Instead of reimplementing that behavior,
Capsula asks `ssh -G` for the effective connection and shows where it differs
from the block on screen.

From the keyboard you can add, edit, delete, filter, save, connect, check host
reachability, and repair unsafe permissions. Hosts behind a proxy are reported
as unknown rather than incorrectly marked down.
