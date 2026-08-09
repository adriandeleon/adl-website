---
title: "Nux"
summary: "A desktop client for Network UPS Tools — live UPS dashboard, history, and power-event notifications, speaking the NUT protocol directly with no drivers."
order: 30
status: "Active"
tech: ["Java 25", "JavaFX 26", "Maven"]
repo: "https://github.com/adriandeleon/nux"
year: "2026"
---

[Network UPS Tools](https://networkupstools.org/) is the standard way to talk
to a UPS on Linux, and its own clients are a web page and a terminal. Nux is a
desktop one. *Nux* is Latin for "nut."

## A pure network client

It speaks the NUT network protocol to `upsd` over TCP directly, so it runs on
Linux, macOS and Windows with **no drivers and no local daemon** — the NUT
server stays wherever the UPS is actually plugged in, and Nux connects to it
from anywhere on the network.

## What it shows

A live dashboard: status pill, battery / load / runtime gauges with history
sparklines, an input-voltage strip, and the raw variables table underneath for
when you want the unvarnished thing. It polls every five seconds and
reconnects on its own.

Beyond the live view it keeps **persistent history** (an hour out to 30 days,
with kWh and cost estimates), a **persistent event log** you can export as
CSV, battery age and health tracking, and an editor for the UPS's settable
variables.

## The parts that matter at 3am

- **Desktop notifications** on power events — on battery, low battery, power
  restored, replace battery, forced shutdown — plus lost and restored contact
  with the server. Native on each platform: `notify-send` on Linux, `osascript`
  on macOS, the tray icon on Windows.
- **Instant commands** (beeper toggle, battery self-test, …) with confirmation
  and session-cached authentication, and **command tracking** on NUT 2.8, which
  reports what the UPS actually did rather than just that the request was
  accepted.
- Scheduled self-tests, a multi-UPS overview, LAN discovery of NUT servers, and
  STARTTLS per connection.
- Starts with your session, keeps a single instance, and lives in the tray with
  a metric of your choice on it.
