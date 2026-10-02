/**
 * Single source of truth for identity/branding copy.
 * Replace these values to make the portfolio yours.
 */
export const siteConfig = {
  name: "Nova Kane",
  role: "Creative Engineer",
  tagline: "Building digital experiences at the intersection of technology, design, and imagination.",
  headline: ["Designing from", "the space between", "code & cosmos"],
  intro:
    "I'm Nova — a creative engineer crafting immersive interfaces, generative systems, and tools that feel alive. Formerly shipping design systems at scale; now exploring where neon meets the void.",
  location: "Lisbon, Portugal · UTC+1",
  email: "hello@novakane.dev",
  avatarInitials: "NK",
  nav: [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Articles", path: "/articles" },
    { label: "Social", path: "/social" },
    { label: "Contact", path: "/contact" },
    { label: "Links", path: "/links" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/novakane", icon: "github" },
    { label: "Twitter / X", href: "https://x.com/novakane", icon: "twitter" },
    { label: "LinkedIn", href: "https://linkedin.com/in/novakane", icon: "linkedin" },
    { label: "Email", href: "mailto:hello@novakane.dev", icon: "mail" },
  ],
  stats: [
    { value: "40+", label: "Projects shipped" },
    { value: "28", label: "Articles written" },
    { value: "9 yrs", label: "Crafting software" },
    { value: "12", label: "Open-source tools" },
  ],
  skills: [
    "TypeScript / React",
    "Design Engineering",
    "WebGL & Creative Coding",
    "Motion & Interaction",
    "Node.js & Edge Runtime",
    "Supabase / Postgres",
    "Design Systems",
    "Accessibility",
  ],
  values: [
    {
      title: "Clarity over cleverness",
      body: "The best interfaces disappear. I optimize for understanding, not impressions.",
    },
    {
      title: "Craft is a practice",
      body: "Pixel rhythm, easing curves, typing performance — details compound into trust.",
    },
    {
      title: "Build in the open",
      body: "Writing, sharing, and shipping publicly keeps the feedback loop honest.",
    },
  ],
  currentFocus:
    "Currently exploring generative typography, edge-rendered 3D, and calm technology — software that respects attention.",
} as const;

export type SiteConfig = typeof siteConfig;
