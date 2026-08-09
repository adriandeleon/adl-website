---
title: "Insula"
summary: "A keyboard-first desktop reader for ZIM offline archives — Wikipedia and hundreds more, downloaded once and read forever with no network."
order: 10
status: "Active"
tech: ["Java 25", "JavaFX 26", "Maven"]
repo: "https://github.com/adriandeleon/insula"
url: "https://github.com/adriandeleon/insula"
year: "2026"
---

ZIM is the archive format behind [Kiwix](https://kiwix.org): a whole Wikipedia,
Wiktionary, or StackExchange dump in a single file you can read entirely
offline. Insula exists because the reading and library experience around those
archives deserves better than it has — minimal chrome, instant search,
everything reachable from the keyboard.

## The ZIM reader is pure Java

No libzim, no JNI, no platform-specific native toolchain to install. There is
no maintained Java ZIM library to lean on — the one that existed is archived —
so the format core is written from the specification: the cluster compression
schemes (uncompressed, XZ, Zstandard) and both namespace generations, the
legacy `A/I/M` scheme and the current `C/M/W/X`.

Articles render with their images and stylesheets intact, because entries are
served at their real archive paths over a loopback HTTP server. Nothing inside
the archived HTML has to be rewritten to make links work.

## Reading

- **Cross-archive search** — one box spanning every archive on disk, so you
  can look something up without first deciding which book it lives in. Results
  are ranked, tolerate a typo, and say which archive they came from.
- **Reader mode** whose dark theme wins against the archive's own stylesheet,
  tables and inline colours included. Images are dimmed rather than inverted,
  so photographs and maps still look right.
- Reading position remembered per article, back/forward history, and a command
  palette listing every action with its shortcut.

## Downloads that tell you the truth

Archives are tens of gigabytes, so the download layer is the other half of the
project. It pulls **from several mirrors at once** over HTTP range requests and
resumes after an interruption instead of starting over.

Integrity is the part worth stealing: the publisher's Metalink file carries
piece-level SHA-1 hashes, so every chunk is verified as it arrives, and the
completed file against its published SHA-256. An archive is only offered for
reading once it verifies — and one that fails is **kept, not deleted**, so a
retry doesn't mean re-downloading 100 GB.
