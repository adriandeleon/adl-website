---
title: "Calcula"
summary: "A keyboard-driven, Symja-powered symbolic calculator in the spirit of Emacs Calc — a native JavaFX interface for algebra, calculus, typeset mathematics, and interactive plots."
order: 50
status: "Active"
tech: ["Java 25", "JavaFX 26", "Symja"]
repo: "https://github.com/adriandeleon/Calcula"
url: "https://github.com/adriandeleon/Calcula"
year: "2026"
---

Calcula is a keyboard-driven desktop interface around the
[Symja](https://github.com/axkr/symja_android_library) computer algebra system.
It treats the stack as a document rather than a numeric display and supports
both RPN and algebraic input over the same command system, with a trail, undo,
prefix key chords, and real two-dimensional mathematical layout.

## Symja does the mathematics

Calcula is not itself a computer algebra system: Symja does the mathematical
heavy lifting. Symbolic evaluation, simplification, differentiation,
integration, equation solving, factoring, expansion, and the broader catalogue
of mathematical functions come from Symja.

Calcula's work is primarily the application around that engine: keyboard-first
input, the stack and document model, commands and keymaps, typeset rendering,
subexpression selection, interactive plots, exports, files, themes, and native
desktop packaging. A small toolkit-free core provides expressions and basic
exact arithmetic so the application can still open without the CAS, but its
symbolic power comes from Symja.

Rendered formulas retain their expression structure. You can select a subterm,
navigate through its tree, and run the same registered rewrite commands used by
the keyboard, command palette, menus, and contextual actions.

## Mathematics as a native desktop document

Most of Calcula's own work is in presenting that engine as a native desktop
document. Stack values render as built-up fractions, radicals, scripts,
matrices, and plots rather than plain strings. Interactive curves are compiled
to numeric closures for responsive dragging, while Symja supplies exact poles
and turning-point labels when it can.

The document exports to TeX, MathML, Typst, PDF, and the system clipboard.
Native installers are produced with `jlink` and `jpackage` for Linux, macOS,
and Windows.
