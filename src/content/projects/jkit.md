---
title: "jkit"
summary: "Installs and switches JDKs from 20+ vendors, plus Maven and Gradle — one small native command, no bash scripts and no JDK needed to run it."
order: 8
status: "Prototype"
tech: ["Java 25", "picocli", "GraalVM native-image", "foojay"]
repo: "https://github.com/adriandeleon/jkit"
url: "https://jkit-project.dev"
year: "2026–"
---

jkit installs and switches Java toolchains: JDKs from Temurin, Corretto, Zulu,
Liberica, Oracle, GraalVM, SapMachine, Semeru, Microsoft and more, plus Maven
and Gradle. Name a version, and optionally a vendor — `jkit install jdk@21`,
`jkit install jdk@17 zulu` — and it does the rest.

## One native binary

jkit is written in Java 25 with picocli and compiled with GraalVM
native-image, so the command itself needs no JDK and starts in milliseconds —
fast enough to run from a shell prompt without slowing it down. The same
binary is meant for Linux, macOS and Windows, without WSL or Git Bash.

## This shell or every shell

`jkit use jdk@17 zulu` changes the current shell only; `--global` changes the
default for every terminal and app, and `jkit reset` goes back. GraalVM gets a
slot of its own, so Temurin can stay `JAVA_HOME` while `GRAALVM_HOME` points
at GraalVM for native-image builds. `jkit upgrade` moves each installed major
to its newest build and carries the global default along.

## Checked, cached, and plain

JDK builds come from the foojay Disco API, Maven from Maven Central and Gradle
from services.gradle.org. Every archive is checked against the checksum its
source publishes before anything is unpacked, and a failed install leaves
nothing behind. `jkit search jdk` draws every vendor against every major
version, with LTS releases and what is already installed marked.

## Status

A working prototype, tested on Linux: search, install, upgrade, use, reset,
list, remove, the shell hook and tab completion. Native `.deb` and `.rpm`
packages build in pure Java. Project files (`jkit.toml`, `jkit.lock`),
`doctor`, self-update, and Windows and macOS testing are next.
