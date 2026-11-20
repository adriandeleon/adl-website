---
title: "Vitrina"
summary: "The signed apt repository for Editora, Termina, Torrenta, Mirada, Nux, Modula and jkit — rebuilt from each app's latest GitHub release, so apt upgrade keeps them current."
order: 9
status: "Active"
tech: ["Bash", "GitHub Actions", "GitHub Pages", "apt", "GnuPG"]
repo: "https://github.com/adriandeleon/vitrina"
url: "https://vitrina-project.dev"
year: "2026–"
---

*Vitrina* is Spanish for a shop window. It is the apt repository for the
apps on this site — Editora, Termina, Torrenta, Mirada, Nux, Modula and jkit —
so on Debian, Ubuntu and their derivatives they install with
`sudo apt install editora` and stay current with `sudo apt upgrade`, for amd64
and, where an app ships one, arm64.

## Nothing committed but the list

The repository holds no packages. It holds a list of app repositories and the
scripts that build from it: every build downloads the `.deb` files attached to
each app's latest GitHub release, lays out `pool/` and `dists/` from scratch,
signs the index with the release key, and deploys the result to GitHub Pages.
Drafts and pre-releases are skipped. Adding an app is a line in `apps.txt` and
a small workflow copied into the app's repository.

## Rebuilt when it matters

An app's release workflow notifies Vitrina when it finishes, so a new version
reaches `apt` within minutes. A daily build catches any notification that went
missing. If any app's latest release has no `.deb`, the build fails and the
previous deployment stays up — one bad release never makes an app vanish from
the repository.

## Room to move

The index and the packages are signed with the same key the apps' releases
use. Users' sources point at `vitrina-project.dev`, not at GitHub, so if
GitHub Pages' size or bandwidth limits are ever reached, the package pool can
move to other storage without anyone changing their configuration.
