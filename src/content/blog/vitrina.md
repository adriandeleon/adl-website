---
title: "Vitrina: one apt repository for all my apps"
description: "Why my Linux apps now install with apt, and how a repository that commits no packages rebuilds itself from each app's GitHub releases."
date: 2026-11-27
tags: [vitrina, linux, apt, github-actions]
draft: false
---

Every app I build ships a `.deb` with each release. For a long time,
installing one on Linux meant going to its GitHub releases page, downloading
the right file and running `sudo apt install ./something.deb`. Then the next
release came out and you did it all again, because nothing told you there was
an update.

I wanted my apps to install and update like everything else on a Debian or
Ubuntu machine, so I built **Vitrina**. *Vitrina* is Spanish for a shop
window: one place to find all of them.

## What it looks like

You add the repository once:

```bash
sudo install -d -m 0755 /etc/apt/keyrings
curl -fsSL https://vitrina-project.dev/vitrina.asc | sudo tee /etc/apt/keyrings/vitrina.asc > /dev/null
sudo tee /etc/apt/sources.list.d/vitrina.sources > /dev/null <<'EOF'
Types: deb
URIs: https://vitrina-project.dev/apt
Suites: stable
Components: main
Architectures: amd64 arm64
Signed-By: /etc/apt/keyrings/vitrina.asc
EOF
sudo apt update
```

After that, every app is one command away:

```bash
sudo apt install editora
```

and `sudo apt upgrade` keeps it current. Today that covers **Editora**,
**Termina**, **Torrenta**, **Mirada**, **Nux**, **Modula** and **jkit**, for
amd64 and, where an app ships one, arm64.

## A repository that commits no packages

The trick I like most is that the Vitrina repository on GitHub contains no
`.deb` files at all. It holds a list of app repositories (`apps.txt`) and a
couple of scripts. Every build:

1. downloads the `.deb` files attached to each app's latest GitHub release,
   skipping drafts and pre-releases;
2. lays out `pool/` and `dists/` from scratch;
3. signs the index with the same key the apps' releases are signed with;
4. deploys the result to GitHub Pages.

Because the repository is rebuilt from nothing each time, there's no state to
drift and nothing to clean up. The releases are the source of truth, and
Vitrina is just a view of them.

Adding an app is a line in `apps.txt` and a small workflow copied into the
app's repository.

## Rebuilt when it matters

That small workflow is what makes updates fast. When an app's release
finishes, it notifies Vitrina, which rebuilds right away, so a new version
reaches `apt` within minutes. A daily build catches any notification that
went missing.

One rule keeps it safe: if any app's latest release has no `.deb`, the build
fails and the previous deployment stays up. One broken release never makes an
app disappear from the repository.

## Room to move

GitHub Pages has limits: a site can be at most 1 GB, and bandwidth has a soft
cap of 100 GB a month. The packages come to about 450 MB today, and the build
warns well before the limit.

If that ever becomes a problem, the package pool can move to other storage
while the signed index stays where it is. Everyone's sources point at
`vitrina-project.dev`, not at GitHub, so nobody would have to change their
configuration.

## Try it

The setup steps and the full list of apps are at
[vitrina-project.dev](https://vitrina-project.dev), and the code is on
[GitHub](https://github.com/adriandeleon/vitrina).
