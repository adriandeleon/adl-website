import type { ImageMetadata } from "astro";
import capsulaNewHost from "../assets/projects/capsula-new-host.png";
import calculaFunctions from "../assets/projects/calcula-functions.png";
import editoraWelcome from "../assets/projects/editora-welcome.png";
import insulaCatalog from "../assets/projects/insula-catalog.png";
import modulaRadio from "../assets/projects/modula-radio.png";
import nuxDashboard from "../assets/projects/nux-dashboard.png";
import terminaTerminal from "../assets/projects/termina-terminal.png";

interface ProjectScreenshot {
  src: ImageMetadata;
  alt: string;
}

const screenshots: Record<string, ProjectScreenshot> = {
  capsula: {
    src: capsulaNewHost,
    alt: "Capsula's keyboard-driven new-host form showing fields for an SSH alias, hostname, user, port, identity file, and proxy jump.",
  },
  calcula: {
    src: calculaFunctions,
    alt: "The Calcula workspace showing typeset symbolic expressions, interactive plots, the calculation trail, and the function browser.",
  },
  editora: {
    src: editoraWelcome,
    alt: "The Editora welcome screen with project actions, command shortcuts, and a list of recently opened files.",
  },
  insula: {
    src: insulaCatalog,
    alt: "The Insula catalog showing downloadable offline archives with language and category filters.",
  },
  modula: {
    src: modulaRadio,
    alt: "The Modula FM radio interface tuned to 106.9 MHz, with a live spectrum, presets, and stereo controls.",
  },
  nux: {
    src: nuxDashboard,
    alt: "The Nux UPS dashboard showing battery charge, load, runtime, voltage history, and device variables.",
  },
  termina: {
    src: terminaTerminal,
    alt: "The Termina terminal emulator showing two tabs and a colorized directory listing in a shell session.",
  },
};

export const projectScreenshot = (id: string) => screenshots[id];
