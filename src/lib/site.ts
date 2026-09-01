// Everything about "who this site is" lives here, so no page hardcodes it.
// Changing your name, tagline, domain or social links is a one-file edit.

export const site = {
  name: "Adrián De León",
  // Shown directly under the name on the home page.
  expertise: "Software Engineer · Java · Linux · Open Source",
  // Shown in the home-page introduction and footer.
  tagline:
    "By day, I'm a Backend Java Developer, by night, I mostly build keyboard-first, desktop software and occasionally write about it.",
  // Used for <meta description> and the RSS feed description when a page
  // doesn't supply its own.
  description:
    "Personal site of Adrián De León — software, open source projects, and occasional writing.",
  // This feeds Astro's `site` (absolute URLs in the sitemap and RSS feed), so
  // a wrong value here silently ships wrong links in both.
  url: "https://adeleon.dev",
  author: "Adrián De León",
};

// Footer / home-page links. Drop or add freely — nothing iterates these by
// index, and an empty list just renders nothing.
export const socials = [
  { href: "https://github.com/adriandeleon", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/adriandeleonsaldivar/",
    label: "LinkedIn",
  },
  { href: "mailto:adrian.deleon@gmail.com", label: "Email" },
];

// Top navigation, in order.
export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "https://github.com/adriandeleon", label: "GitHub", external: true },
];
