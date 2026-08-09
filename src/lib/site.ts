// Everything about "who this site is" lives here, so no page hardcodes it.
// Changing your name, tagline, domain or social links is a one-file edit.

export const site = {
  name: "Adrian De Leon",
  // Shown under the name on the home page and in the footer.
  tagline: "Software engineer. I build desktop tools and write about it.",
  // Used for <meta description> and the RSS feed description when a page
  // doesn't supply its own.
  description:
    "Personal site of Adrian De Leon — notes on building software, and the projects I work on.",
  // TODO: set your real domain, then update public/CNAME to match.
  // This feeds Astro's `site` (absolute URLs in the sitemap and RSS feed), so
  // a wrong value here silently ships wrong links in both.
  url: "https://adriandeleon.dev",
  author: "Adrian De Leon",
};

// Footer / home-page links. Drop or add freely — nothing iterates these by
// index, and an empty list just renders nothing.
export const socials = [
  { href: "https://github.com/adriandeleon", label: "GitHub" },
  { href: "mailto:adrian.deleon@gmail.com", label: "Email" },
];

// Top navigation, in order.
export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "https://github.com/adriandeleon", label: "GitHub", external: true },
];
