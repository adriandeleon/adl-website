---
title: "Termina"
summary: "A cross-platform terminal emulator built on JavaFX, running a real shell on a real pseudo-terminal and rendering the emulated screen to a canvas."
order: 5
status: "Early"
tech: ["Java 25", "JavaFX", "JediTerm", "pty4j"]
repo: "https://github.com/adriandeleon/Termina"
url: "https://github.com/adriandeleon/Termina"
year: "2026–"
---

Termina is a native terminal emulator rather than a terminal-shaped text area.
It starts a real shell on a platform pseudo-terminal, feeds the byte stream
through a VT/xterm emulator, and paints the resulting screen buffer with a
JavaFX canvas.

## Terminal behavior first

Tabs and multiple windows each own an independent shell session. Termina
supports styled text, scrollback, selection and copy, clickable URLs and file
paths, and mouse-aware full-screen programs such as Vim, `less`, and `htop`.
Input follows terminal conventions: application shortcuts stay out of the
shell's way, composed characters arrive through the text-input path, and mouse
reporting can be bypassed with Shift when you need to select or open the local
context menu.

The command palette exposes every window action from the keyboard. Shell
profiles are discovered from the machine—including PowerShell, Git Bash, and
WSL distributions on Windows—rather than requiring each one to be entered by
hand.

## Three focused layers

The implementation separates the work into three parts:

- **PTY:** `pty4j` starts the shell and moves bytes across Unix PTYs or Windows
  ConPTY.
- **Emulation:** JediTerm parses terminal escape sequences into a screen
  buffer.
- **Rendering and input:** Termina owns the JavaFX canvas renderer, key
  encoder, colors, selection, and session lifecycle.

Repaints are decoupled from shell output and limited to one per animation
frame, so a command that floods the terminal does not flood the UI thread.
Text is painted in style runs, with special handling for wide glyphs such as
CJK characters and emoji.

## A desktop application

Termina includes four light and dark themes, bundled monospace fonts, immediate
appearance settings, configurable scrollback and shell behavior, six interface
languages, and a session diagnostics log. Window size, tabs, menus, and
keyboard commands are designed as application features rather than wrappers
around a console widget.

The project is still early. Its release pipeline produces self-contained
native packages for macOS, Windows, Debian-family Linux, and RPM-based Linux;
the bundled runtime means a JDK is not required to run the packaged app.
