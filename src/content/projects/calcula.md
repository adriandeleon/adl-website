---
title: "Calcula"
summary: "A keyboard-driven symbolic calculator in the spirit of Emacs Calc — exact arithmetic, typeset mathematics, CAS-backed algebra, and interactive plots."
order: 50
status: "Active"
tech: ["Java 25", "JavaFX 26", "Symja"]
repo: "https://github.com/adriandeleon/Calcula"
url: "https://github.com/adriandeleon/Calcula"
year: "2026"
---

Calcula treats the stack as a document rather than a numeric display. It
supports both RPN and algebraic input over the same command system, with a
trail, undo, prefix key chords, and real two-dimensional mathematical layout.

## Symbolic, but useful without the engine

Exact integers, rationals, expressions, parsing, formatting, evaluation, and
export live in a toolkit-free core. Symja supplies symbolic capabilities such
as integration, differentiation, solving, and simplification through a
replaceable runtime module; if that engine is unavailable, the calculator
still opens and remains usable.

Rendered formulas retain their expression structure. You can select a subterm,
navigate through its tree, and run the same registered rewrite commands used by
the keyboard, command palette, menus, and contextual actions.

## Mathematics as a native desktop document

Stack values render as built-up fractions, radicals, scripts, matrices, and
plots rather than plain strings. Interactive curves are compiled to numeric
closures for responsive dragging, while the algebra engine supplies exact
poles and turning-point labels when it can.

The document exports to TeX, MathML, Typst, PDF, and the system clipboard.
Native installers are produced with `jlink` and `jpackage` for Linux, macOS,
and Windows.
