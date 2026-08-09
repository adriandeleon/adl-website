---
title: "Modula"
summary: "A broadcast radio receiver for RTL-SDR dongles. Commercial AM and FM, in stereo, with RDS — a radio, not an SDR panel."
order: 20
status: "Active"
tech: ["Java 25", "JavaFX 26", "RTL-SDR"]
repo: "https://github.com/adriandeleon/Modula"
url: "https://github.com/adriandeleon/Modula"
year: "2026"
---

Plug in a $30 RTL-SDR dongle and listen to the radio. That is the whole
product.

## A radio, not an SDR panel

The governing rule: the test for any feature is whether a car radio would have
it. So there is no demodulator picker, no filter-bandwidth slider, no gain or
AGC controls, no FFT settings — the things every other SDR application leads
with.

What's left is one amber number, the frequency, as the brightest thing on
screen, with everything else dimmed until it has something to say. Seek,
presets, a ±600 kHz spectrum strip, and direct hardware access.

## Measured, not assumed

The signal path is DSP written for this project, so the claims are measured
rather than inherited:

- **33 dB channel separation**, flat from 100 Hz to 10 kHz.
- **RDS verified against an off-air recording** — station name, programme
  type, radio text.

One finding worth writing down: with the dongle's AGC on, RF power reads about
the same on an empty channel as on a weak station. A signal-strength squelch
would be measuring the wrong quantity entirely, which is why seek is driven by
the noise floor instead.
