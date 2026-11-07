---
title: "Writing down the rules my desktop apps share"
description: "I build six JavaFX desktop apps. I finally wrote down the rules they were all supposed to share, found out which ones they didn't, and put the guide where anyone can use it."
date: 2026-11-06
tags: [pauta, javafx, desktop]
draft: false
---

Over the past few months I've built six desktop apps. A programmer's text
editor, Editora, which is the one I started with and the one the others copy
from. Termina, a terminal emulator. Torrenta, a BitTorrent client. Modula, a
software-defined radio receiver. Mirada, an image viewer. nux, a UPS monitor
that lives in the tray. All JavaFX, all Spanish names, all mine.

Somewhere around the fourth one I noticed I was writing the same Settings
window for the fourth time, and it was a little different each time.

## The drift

None of the differences were decisions. They were just what happened.

Termina has its theme CSS vendored into the repository, and I'd have to go
read the commit to tell you why. Modula ships IBM Plex Mono as its UI
font while everything else bundles Inter. Torrenta committed a `CLAUDE.md` and
never got an `AGENTS.md`, so the coding agent instructions live in a file named
for one vendor. nux never got NullAway turned on. Termina has a Debug Log but no
Message Log, which means an error flashes in the status bar and is gone, with
nothing to click on to read it again.

Each of those is five minutes to fix. The problem was that nothing told me
they were wrong. Editora had grown a bunch of small habits that I was happy
with, and the other apps had copied some of them, from memory, badly.

So I sat down and wrote the habits out.

## What it turned into

I called it Pauta. In Spanish a *pauta* is a guideline, and it's also the word
for the ruled lines on writing paper, which felt right for a document whose
whole job is to keep things lined up. The mark is three ruled lines and a tick.

It opens with thirteen principles. Ten of them are about the person using the
app, and most of those are things I've wanted from other people's software for
years: every action works from the keyboard, settings apply the moment you
change them, nothing fails silently, nothing phones home. One I'm unreasonably
attached to is *never claim what is not true*. No link that looks like a link
and does nothing. No "up to date" in the About window before the update check
has actually returned. If a setting needs a restart, its own row says so,
instead of letting you think it worked.

The other three are for me, the person building them, and they're the ones I
break most often. One source of truth for every fact, with a test that fails
when two copies drift apart. Decisions pulled out of the UI into small pure
methods so they can be tested without a window. And the one I had to learn the
hard way: verify a UI change by running the real app and pressing the real keys,
because UI bugs don't throw exceptions, and reasoning about event order is not
evidence that the thing works.

Under the principles are the actual rules, each tagged MUST, SHOULD or MAY, and
each one points at the class in Editora to copy from. That last part was the
whole reason to write it. A rule that says "have a Message Log" is a wish. A
rule that says "have a Message Log, see `ui/MessageLog` and `ui/MessageLogPopup`"
is an afternoon.

I also wrote down a rule I'd been following without knowing it had a name.
Modula has no gain control, no bandwidth control, no squelch, on purpose. When
I tried to explain the purpose, the test that came out was: would a car radio
have it? A preset button, yes. A spinner for decimation stages, no. If a
setting has one right answer, pick it and don't ship the knob. That's now a
paragraph in the Settings page, and I'm a bit embarrassed it took a radio app
to make me say it out loud.

## The uncomfortable table

The part of the guide I look at most is a feature matrix: six columns, one per
app, a row for every rule, and a dot in each cell. Full dot, half dot, or a
dash. Below it there's a page that lists, per app, every MUST it fails.

Editora is the reference implementation, and Editora fails its own guide. One
line, but still: nobody signs their Windows installer. Not Editora, not any of
them. Authenticode has been on the someday list for every one of them, and now
there's a column of six dashes that won't let me leave it there.

Modula's row is longer. No coverage gate, no translations, no settings search,
no Message Log, no way to report a problem from inside the app. I knew all of
that in the vague way you know your car needs an oil change. Seeing it as a
list changed it from a feeling into a backlog, which is the only form of guilt
I've ever found useful.

## Who it's for

I wrote it for myself first. I won't pretend otherwise: the rules point at
my editor, the matrix has my six apps in its columns, and the gaps page is my
backlog. But I put it on a public site under an MIT licence because I think
most of it travels.

Part of the audience is the coding agents I work with. Editora's README says
it was built with help from AI coding tools, the guide makes that line a MUST
for the rest, and a lot of the drift above is exactly what you'd expect from
that. An agent working on Termina doesn't know what Editora's Settings window
does unless something tells it. It will build a perfectly reasonable Settings
window that is reasonable in a slightly different direction. So the guide
builds itself into a single Markdown file and a PDF on every push. The
Markdown version is there to drop into a session and say "like this", and it
works the same whether the session is mine or yours.

The other part is anyone else building desktop apps on the JDK. The platform
pages (JDK 25, JavaFX 27, AtlantaFX, NullAway, jpackage and JReleaser for
signed installers on every OS) are the setup I'd hand to a friend who asked
how to start. The principles don't depend on the stack at all. And the
template repository that goes with the guide is a GitHub template, so "Use
this template" and one rename script gets anyone a small runnable app with
tests, CI, release workflows and every repository document already in place.
I'd done that first hour by hand six times, a bit differently each time, which
is where this post started.

## Two days in

The first edition is two days old and it's at 1.1 already, which tells you
something about how settled my opinions were. There were fewer principles on
the first day; the rest showed up when I went back through the apps looking
for things they already agreed on without my having noticed. The performance
page, the one about never doing I/O on the JavaFX thread, mostly describes a
shape every Editora service already had. I just hadn't seen it as a pattern
until I had to write it down.

It'll keep changing, and the rule for that is written down too: a new MUST
that existing apps fail is a major version. I expect to be at 2.0 by the time
any of them gets a signed Windows installer.

If you build desktop apps, or more than one of anything that has started to
disagree with itself, [the guide is here](https://pauta-project.dev).
Take the parts that fit. Some of it is specific to my stack and a fair amount
is specific to my taste, and that's fine; it's meant to be copied from, not
adopted whole. The one piece I'd recommend to anyone, whatever you build, is
the matrix: a column of dots per app that doesn't let you look away.
