---
title: "Mirada"
summary: "A fast, folder-oriented image viewer built on JavaFX. Open one photo and the rest of the folder is one arrow key away, in every format from JPEG to HEIC and JPEG XL."
order: 7
status: "Active"
tech: ["Java 25", "JavaFX 27", "GraalVM Native Image"]
repo: "https://github.com/adriandeleon/Mirada"
url: "https://mirada-project.dev"
year: "2026–"
---

*Mirada* is Spanish for a look, or a glance. An image viewer is the app opened
a hundred times a day for three seconds each, and Mirada is built for exactly
that: double-click a photo, look, arrow through the folder, close. The folder
is the document — opening one photo brings the rest of the folder with it, in
the order you would number it, and the properties sidebar says which file this
is, where it sits in the folder, how large it is, and what took it. The first
window was modelled on GNOME's Loupe: a header bar, controls that float over
the image and fade, and a sidebar.

## Every format, turned upright

JPEG, PNG, GIF, BMP, WebP, TIFF, PSD, HEIC, AVIF and JPEG XL, each oriented by
its EXIF and animated where the file is. JavaFX decodes only a few of those, so
the rest come from libjpeg-turbo, libwebp, libheif and libjxl, built from
source and bundled with the app; the build downloads the codec bundle for its
platform from a release of the project itself.

Editing is deliberately small: crop, turn and flip, with undo, saved as a new
file that keeps the original's EXIF, XMP and colour profile. The original is
never written.

## An eighth of a second

The app that ships is a GraalVM native image, and it starts in about an eighth
of a second, with the first image decoding while the window is still being
built. The JVM build, on any JDK 25, takes about a quarter of a second from a
jlink runtime with an AOT cache trained by stepping through every format.

## The family resemblance

Mirada follows [Pauta](/projects/pauta/), so it has what its siblings have: a
command palette with every command by name (Ctrl+Shift+P, or M-x for the Emacs
hand), bookmarks and notes on images and folders kept by Mirada rather than in
the file, and installers for Linux (deb, rpm, AppImage), macOS and Windows on
both arm64 and x64, each registering it for the image types it opens.
