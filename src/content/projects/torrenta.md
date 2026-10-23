---
title: "Torrenta"
summary: "A keyboard-first, cross-platform BitTorrent client built on JavaFX and libtorrent — transfers, search, and RSS in one window."
order: 3
status: "Active"
tech: ["Java 25", "JavaFX 27", "libtorrent4j", "Maven"]
repo: "https://github.com/adriandeleon/torrenta"
url: "https://adriandeleon.github.io/torrenta-website/"
year: "2026"
---

Torrenta is a desktop BitTorrent client with a real engine underneath:
[libtorrent](https://www.libtorrent.org), through
[libtorrent4j](https://github.com/aldenml/libtorrent4j). Everything around it —
the window, the views, the keyboard, the search and feed layers — is Torrenta's
own.

## Three views, one keyboard

Transfers, Search, and RSS share the centre of the window, each one key away
(`Ctrl+1`, `Ctrl+2`, `Ctrl+3`). The transfer list has live columns, a sidebar
of status, category, tag, and tracker filters, and a detail pane with files,
peers, trackers, pieces, a log, and a speed graph. A command palette reaches
every action.

Torrents arrive from a file, a magnet link, a URL, a drop, the clipboard, or a
watched folder. The Add dialog chooses files and priorities, a save path with
the free space it leaves, a category, tags, and a stop condition; a magnet's
file list fills in while the dialog is open. New torrents — hybrid, v1, or v2 —
can be created from the File menu and seeded straight away.

## Search and feeds

Search asks your own Torznab servers (Prowlarr or Jackett) all at once, and
sites without an API are described by small JSON definition files rather than
site-specific code, so a site change is a file edit. Results from different
providers are merged, the better-seeded copy first.

RSS feeds refresh on their own and only re-read when they changed. Download
rules in qBittorrent's syntax — must and must-not words, episode filters, a
smart filter that never takes an episode twice — add matching torrents by
themselves.

## A desktop citizen

One Torrenta runs per settings folder, and a second launch hands its `.torrent`
or magnet link to the running one, which is how double-clicked files and
browser links arrive. It registers as the handler on each platform, lives in
the tray, shows download activity on the dock or launcher badge, sends desktop
notifications, and can run a program when a torrent is added or finishes.

Native packages for Linux, macOS, and Windows bundle their own runtime, so no
JDK is needed to run it.
