---
title: "Aguas"
summary: "Water levels for the three dams supplying Monterrey, with the history the official source never publishes — scraped daily and backfilled to 2007."
order: 6
status: "Active"
tech: ["Java 21", "Spring Boot", "SQLite", "Thymeleaf", "Tailwind CSS"]
url: "https://aguas-nl.mx"
year: "2026"
---

Monterrey's water utility, SADM, publishes the level of the three dams that
supply the city — La Boca, Cerro Prieto, and El Cuchillo — as a current
snapshot only: three numbers and a date, with no archive. Aguas scrapes that
snapshot every day and keeps the time series, so its charts show something the
source itself cannot. The public site, [aguas-nl.mx](https://aguas-nl.mx), is
in Spanish.

## History nobody else keeps

Every page is stored raw before it is parsed. SADM keeps no archive, so a page
not saved the day it is fetched is gone for good; when the parser breaks, the
fix is replayed over the stored history instead of needing a re-scrape that is
no longer possible.

Readings are keyed by the date printed on the page, not by fetch time, and
corrected figures under an already-stored date are kept as conflicts for
review rather than silently overwritten. Earlier years come from CONAGUA's
national dam report, back to 2007, which is how the chart can show Cerro Prieto
falling below one percent during the 2022 water crisis. Gaps are drawn as gaps,
split into days that can still be recovered and days that are lost.

## Proportion, not just percentages

Fill percentage alone misleads: El Cuchillo holds about 32 times what La Boca
does, so La Boca at 92% can look healthier than El Cuchillo at 57% while
storing a twentieth of the water. Aguas draws each dam with its width
proportional to capacity and its level to how full it is, and sizes map
markers by area for the same reason.

Amber is reserved for a dam in critical range and used nowhere else, so the
day it appears it means something.

## Small on purpose

One Spring Boot application and one SQLite file on a single small server — no
database server, no containers. The site installs to a phone's home screen,
works offline, and can send push notifications when new figures are published
or a dam turns critical, using standard Web Push with no third-party service.
The full history is a public CSV or JSON download.
