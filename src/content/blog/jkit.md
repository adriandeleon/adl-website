---
title: "jkit: one command for JDKs, Maven and Gradle"
description: "Why I built a native, cross-platform JDK manager instead of reaching for SDKMAN again, and what it can do as of 0.5.0."
date: 2026-11-27
tags: [jkit, java, graalvm, cli]
draft: false
---

Every Java developer ends up juggling JDKs. One project is still on 17,
another wants 21, the desktop apps are on 25, and native-image builds need
GraalVM on the side. I wanted one command that handles all of it, on every
OS I use, so I wrote **jkit**.

## What it does

```bash
jkit hook --install              # once: hook into your shell
jkit install jdk@21              # default vendor (Temurin)
jkit install jdk@lts zulu        # a vendor's newest LTS
jkit use jdk@21 --global         # every terminal and app
jkit use jdk@17 zulu             # this shell only
jkit install graalvm@25 && jkit use graalvm@25   # sets GRAALVM_HOME only
jkit pin jdk@21                  # record it in this project's jkit.toml
jkit exec jdk@17 -- mvn test     # one command, no shell change (scripts, CI, agents)
jkit status                      # what's active here, and why
jkit upgrade                     # newest build within each installed release
```

- JDKs from 20+ vendors through the foojay Disco API; Maven, Gradle and sbt
  from their own sources.
- A clear difference between *this shell*, *this project* and *the global
  default*. With auto-switch on, bash, zsh and fish switch versions when you
  `cd` into a project and back when you leave.
- It reads the project files you already have: `jkit.toml`, `.sdkmanrc`,
  `.tool-versions` and `.java-version`.
- A separate GraalVM slot, so `JAVA_HOME` stays put.
- Every download checked against its published checksum, and Temurin,
  Microsoft and Corretto JDKs, Maven and sbt also against their publisher's
  OpenPGP signature.
- Nothing changes out of sight: every link, variable, file and folder a command
  touches is printed.

## Why not SDKMAN?

SDKMAN is great, and I used it for years. But it is written in bash, so on
Windows it needs WSL or Git Bash. jkit is a native binary everywhere, and I
wanted a different command design: version ranges like `jdk@21`, an optional
vendor instead of IDs like `21.0.5-tem`, and no interactive prompts.

## Five releases in a week

- **0.2** (Nov 20–22): `jkit upgrade`, the `jkit search jdk` vendor grid,
  reading `.sdkmanrc` / `.tool-versions` / `.java-version`, `--json` output,
  and signed, notarized macOS binaries.
- **0.3** (Nov 24), the first public release: project files with `jkit pin`
  and `jkit sync`, switching on `cd`, `jkit hook --install`, sbt, `jkit exec`,
  `status` / `doctor` / `env`, and packages for Homebrew, apt (through
  [Vitrina](https://vitrina-project.dev)), winget, `.deb` and `.rpm`.
- **0.4** (Nov 24): `jkit config`, `jkit prune` to free disk space, and
  `jkit self-update`, which checks the new binary against signed checksums. It
  also added OpenPGP signature checks for the publishers that sign their
  builds.
- **0.5** (Nov 26): mostly Windows and robustness. `jkit env --install` gives
  cmd.exe, IDEs and Explorer the global versions, and the PowerShell hook was
  fixed. There's a static musl build for Alpine, and macOS 14 is now enough.
  Parallel installs download side by side, Ctrl-C cleans up partial downloads,
  `prune` keeps builds a running JVM or IDE is using, and `search` flags
  vendors whose builds have fallen behind.

## Where it stands

jkit runs on Linux, macOS and Windows. Windows support is still a preview.
It's deliberately narrow: JDKs, GraalVM, Maven, Gradle and sbt, nothing else.
SDKMAN, mise and asdf cover far more tools.

To try it:

```bash
brew install adriandeleon/tap/jkit
```

Other platforms are covered on the [install page](https://jkit-project.dev/install/).

The site is at [jkit-project.dev](https://jkit-project.dev) and the code is on
[GitHub](https://github.com/adriandeleon/jkit).
