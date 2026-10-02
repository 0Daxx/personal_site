import type {
  Article,
  ImportantLink,
  Project,
  SocialPost,
} from "@/types";

/**
 * Seed data mirrors supabase/schema.sql seed inserts.
 * Replace freely — every field is typed.
 */

export const seedProjects: Project[] = [
  {
    id: "p1",
    title: "Aurora Engine",
    slug: "aurora-engine",
    description:
      "A real-time generative aurora renderer for the web — GPU-driven ribbons of light responding to audio and cursor energy.",
    long_description:
      "Aurora Engine is a WebGL2 + compute-shader pipeline that renders volumetric aurora curtains at 60fps on mid-range hardware. It exposes a declarative API for color fields, turbulence, and audio reactivity, and ships with a tiny editor for live-tuning scenes. Used in two installations and a music video.",
    category: "Creative Coding",
    technologies: ["TypeScript", "WebGL2", "GLSL", "React"],
    status: "completed",
    featured: true,
    live_url: "https://aurora.novakane.dev",
    source_url: "https://github.com/novakane/aurora-engine",
    cover_gradient: "from-cyan-400/70 via-void-800 to-fuchsia-500/60",
    accent: "cyan",
    year: 2025,
    created_at: "2025-03-11T10:00:00Z",
  },
  {
    id: "p2",
    title: "Nebula Dashboard",
    slug: "nebula-dashboard",
    description:
      "An observability console for edge functions with streaming logs, constellation-style latency maps, and neon-dark UI.",
    long_description:
      "Nebula Dashboard turns raw edge telemetry into a calm command center: streaming log tails, geo-latency rendered as an orbital map, and anomaly halos. Built on React Router, Supabase Realtime, and a virtualized log canvas that stays smooth at 10k lines/sec.",
    category: "Product",
    technologies: ["React", "Supabase", "Vite", "D3"],
    status: "completed",
    featured: true,
    live_url: "https://nebula.novakane.dev",
    source_url: "https://github.com/novakane/nebula-dashboard",
    cover_gradient: "from-fuchsia-500/70 via-void-800 to-cyan-400/50",
    accent: "magenta",
    year: 2024,
    created_at: "2024-09-02T10:00:00Z",
  },
  {
    id: "p3",
    title: "Stellar Components",
    slug: "stellar-components",
    description:
      "An open-source headless component kit for celestial interfaces — orbits, particles, glow borders, and magnetic targets.",
    long_description:
      "Stellar Components is a collection of accessible, unstyled primitives for spatial UI: <Orbit>, <ParticleField>, <GlowBorder>, <Magnetic>. Zero runtime deps beyond React, fully typed, dark-first. 2.3k stars and counting.",
    category: "Open Source",
    technologies: ["TypeScript", "React", "Radix", "Tailwind"],
    status: "in_progress",
    featured: true,
    live_url: "https://stellar.novakane.dev",
    source_url: "https://github.com/novakane/stellar-components",
    cover_gradient: "from-void-600 via-fuchsia-500/40 to-cyan-400/60",
    accent: "cyan",
    year: 2025,
    created_at: "2025-01-20T10:00:00Z",
  },
  {
    id: "p4",
    title: "Voidtype",
    slug: "voidtype",
    description:
      "Variable-font playground where type reacts to gravity wells — drag stars and watch letterforms bend through space.",
    long_description:
      "Voidtype maps font-variation-settings onto simulated gravitational fields. Each glyph carries mass; nearby 'stars' warp weight, width, and optical size in real time. A love letter to variable fonts and interaction design.",
    category: "Experiment",
    technologies: ["Canvas", "TypeScript", "Variable Fonts"],
    status: "completed",
    featured: false,
    live_url: "https://voidtype.app",
    source_url: "https://github.com/novakane/voidtype",
    cover_gradient: "from-cyan-400/50 via-void-700 to-fuchsia-500/70",
    accent: "magenta",
    year: 2023,
    created_at: "2023-06-15T10:00:00Z",
  },
  {
    id: "p5",
    title: "Pulse Sync Engine",
    slug: "pulse-sync-engine",
    description:
      "CRDT-backed collaborative editing layer with sub-50ms convergence, powering a multiplayer whiteboard prototype.",
    long_description:
      "Pulse is a sync engine built on Yjs-compatible CRDTs with presence compression and offline-first queues. Includes a broadcast relay and devtools that visualize divergence like planetary trails.",
    category: "Infrastructure",
    technologies: ["Node.js", "WebSocket", "CRDT", "Rust/WASM"],
    status: "archived",
    featured: false,
    live_url: null,
    source_url: "https://github.com/novakane/pulse-sync",
    cover_gradient: "from-void-700 via-cyan-400/30 to-fuchsia-500/40",
    accent: "cyan",
    year: 2022,
    created_at: "2022-11-01T10:00:00Z",
  },
  {
    id: "p6",
    title: "Comet Notes",
    slug: "comet-notes",
    description:
      "A keyboard-first markdown notebook with orbital tagging — notes orbit projects and decay gracefully when ignored.",
    long_description:
      "Comet Notes treats attention as physics: frequently opened notes stay near their project's center of mass; stale ones drift outward into an archive belt. Local-first storage with end-to-end encrypted sync.",
    category: "Product",
    technologies: ["React", "SQLite", "Supabase", "Editor.js"],
    status: "in_progress",
    featured: false,
    live_url: null,
    source_url: "https://github.com/novakane/comet-notes",
    cover_gradient: "from-fuchsia-500/50 via-void-800 to-cyan-400/40",
    accent: "magenta",
    year: 2025,
    created_at: "2025-07-19T10:00:00Z",
  },
];

const articleBody = (topic: string) => `
## The signal

${topic}. This is where the piece begins — with a concrete observation from shipping real software, not theory.

The short version: **most tools fail at the boundary between beauty and performance.** Teams choose one, defend the choice, and quietly lose the other.

## What I tried first

My initial instinct was the obvious one — reach for the heaviest abstraction available. It worked in demos and collapsed under production traffic.

\`\`\`ts
// The naive approach: animate everything, hope the GPU forgives
elements.forEach((el) =>
  el.animate(keyframes, { duration: 300, iterations: Infinity })
);
\`\`\`

The problems compounded fast:

- Layout thrash from animating geometry instead of transforms
- No respect for \`prefers-reduced-motion\`, so accessibility audits failed
- Battery drain on mobile made the "wow" feel like a warning

## The breakthrough

The fix was subtractive. I moved every animation to compositor-only properties, batched state updates, and gave each effect a *budget* — a hard ceiling on cost per frame.

\`\`\`css
@layer motion {
  .reveal {
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal { transition: none; opacity: 1; transform: none; }
  }
}
\`\`\`

> Constraint is not the enemy of craft. It is the medium craft travels through.

## The pattern that emerged

Once the budget existed, decisions became mechanical instead of emotional: does this effect earn its frame cost? If yes, keep it. If no, cut it. Design reviews got shorter because the argument had a unit of measurement.

1. Define a per-frame motion budget (e.g., 4ms main thread).
2. Restrict effects to \`transform\` and \`opacity\`.
3. Gate every animation behind a reduced-motion fallback.
4. Measure on the weakest device your audience owns.

## Where this goes

I now teach this budget model in workshops, and it keeps holding up across product surfaces — from dashboards to immersive portfolios. The next frontier is applying the same discipline to 3D scenes, where budgets are measured in draw calls rather than milliseconds.

If you're wrestling with this in your own work, I'd genuinely love to compare notes — [reach out](/contact).
`;

export const seedArticles: Article[] = [
  {
    id: "a1",
    title: "Designing Interfaces That Feel Weightless",
    slug: "designing-interfaces-that-feel-weightless",
    excerpt:
      "How motion budgets, compositor-only animation, and restraint combine to make neon-dark interfaces feel heavenly instead of heavy.",
    category: "Design Engineering",
    tags: ["motion", "performance", "css"],
    reading_time_minutes: 8,
    published_at: "2025-08-14T08:00:00Z",
    featured: true,
    cover_gradient: "from-cyan-400/60 via-void-800 to-fuchsia-500/60",
    content_markdown: articleBody(
      "Weightlessness is an illusion engineered from tiny honest constraints"
    ),
  },
  {
    id: "a2",
    title: "A Field Guide to Generative Typography",
    slug: "field-guide-to-generative-typography",
    excerpt:
      "Variable fonts plus simulation physics produce letterforms that feel alive. Here's the architecture behind Voidtype.",
    category: "Creative Coding",
    tags: ["typography", "canvas", "generative"],
    reading_time_minutes: 11,
    published_at: "2025-05-30T08:00:00Z",
    featured: true,
    cover_gradient: "from-fuchsia-500/60 via-void-700 to-cyan-400/50",
    content_markdown: articleBody(
      "Letterforms are already parameterized; we just forgot to drive them with the world"
    ),
  },
  {
    id: "a3",
    title: "Supabase as a Quiet Backend for Portfolio Sites",
    slug: "supabase-quiet-backend",
    excerpt:
      "Row-level security, seed-first development, and why a portfolio deserves real infrastructure without the ops burden.",
    category: "Engineering",
    tags: ["supabase", "postgres", "architecture"],
    reading_time_minutes: 7,
    published_at: "2025-03-12T08:00:00Z",
    featured: false,
    cover_gradient: "from-void-600 via-cyan-400/40 to-fuchsia-500/50",
    content_markdown: articleBody(
      "The best backend for a personal site is one you never think about"
    ),
  },
  {
    id: "a4",
    title: "Accessibility Is a Motion Setting, Not a Page",
    slug: "accessibility-is-a-motion-setting",
    excerpt:
      "Beyond checklists: building prefers-reduced-motion into the design language so both experiences feel intentional.",
    category: "Accessibility",
    tags: ["a11y", "motion", "wcag"],
    reading_time_minutes: 6,
    published_at: "2024-12-03T08:00:00Z",
    featured: false,
    cover_gradient: "from-cyan-400/40 via-void-800 to-fuchsia-500/40",
    content_markdown: articleBody(
      "Reduced motion is not broken motion — it is a first-class design variant"
    ),
  },
  {
    id: "a5",
    title: "Shipping a Design System Into Orbit",
    slug: "design-system-into-orbit",
    excerpt:
      "Lessons from migrating three products onto one token system — governance, codemods, and the social technology of adoption.",
    category: "Design Systems",
    tags: ["tokens", "react", "tooling"],
    reading_time_minutes: 10,
    published_at: "2024-08-21T08:00:00Z",
    featured: false,
    cover_gradient: "from-fuchsia-500/50 via-void-700 to-cyan-400/40",
    content_markdown: articleBody(
      "A design system succeeds or fails long before the first component ships"
    ),
  },
];

export const seedSocialPosts: SocialPost[] = [
  {
    id: "s1",
    platform: "twitter",
    content:
      "Shipped something strange today: auroras that respond to your cursor's velocity. Turns out the GPU is more forgiving than my sleep schedule. Demo thread 🧵👇",
    posted_at: "2026-09-18T15:20:00Z",
    external_url: "https://x.com/novakane/status/000001",
    likes: 2841,
    reposts: 612,
    comments: 143,
    featured: true,
  },
  {
    id: "s2",
    platform: "linkedin",
    content:
      "After 9 years in product engineering I'm working full-time on creative tooling. The through-line of my career has been one question: how do we make software feel like it respects the person using it? Next chapter starts now.",
    posted_at: "2026-08-30T09:05:00Z",
    external_url: "https://linkedin.com/posts/novakane-000002",
    likes: 1204,
    reposts: 89,
    comments: 212,
    featured: true,
  },
  {
    id: "s3",
    platform: "github",
    content:
      "stellar-components v0.4: <Orbit/> finally supports eccentricity animation, and GlowBorder lost 60% of its bundle size. Headless, typed, dark-first. PRs welcome ✨",
    posted_at: "2026-09-11T18:44:00Z",
    external_url: "https://github.com/novakane/stellar-components/releases",
    likes: 431,
    reposts: 0,
    comments: 17,
    featured: false,
  },
  {
    id: "s4",
    platform: "twitter",
    content:
      "Hot take: most 'immersive' websites are just slow. Immersion is 60fps + intent. Add motion budgets to your design reviews and watch the junk effects evaporate.",
    posted_at: "2026-09-02T11:12:00Z",
    external_url: "https://x.com/novakane/status/000004",
    likes: 5120,
    reposts: 980,
    comments: 301,
    featured: true,
  },
  {
    id: "s5",
    platform: "mastodon",
    content:
      "Weekend experiment: variable font weight driven by microphone amplitude. The word 'whisper' actually whispers. Recording a clip soon — the feedback loop between sound and letterform is hypnotic.",
    posted_at: "2026-08-16T20:30:00Z",
    external_url: "https://mas.to/@novakane/000005",
    likes: 187,
    reposts: 42,
    comments: 9,
    featured: false,
  },
  {
    id: "s6",
    platform: "linkedin",
    content:
      "Wrote about why prefers-reduced-motion deserves to be a design variant, not an afterthought. If your calm-mode experience isn't intentionally art-directed, you have a bug wearing an accessibility costume.",
    posted_at: "2026-07-28T07:50:00Z",
    external_url: "https://linkedin.com/posts/novakane-000006",
    likes: 743,
    reposts: 51,
    comments: 66,
    featured: false,
  },
  {
    id: "s7",
    platform: "twitter",
    content:
      "Unpopular: dark mode isn't a theme, it's a lighting design problem. Contrast ratios, glow bleed, star-field density — treat the void like a stage and your UI will thank you.",
    posted_at: "2026-07-09T13:37:00Z",
    external_url: "https://x.com/novakane/status/000007",
    likes: 1980,
    reposts: 344,
    comments: 120,
    featured: false,
  },
];

export const seedLinks: ImportantLink[] = [
  {
    id: "l1",
    label: "Latest Project — Aurora Engine",
    url: "https://aurora.novakane.dev",
    description: "Live demo of the generative aurora renderer",
    icon: "sparkles",
    sort_order: 1,
    featured: true,
  },
  {
    id: "l2",
    label: "GitHub",
    url: "https://github.com/novakane",
    description: "Open source experiments & tools",
    icon: "github",
    sort_order: 2,
    featured: false,
  },
  {
    id: "l3",
    label: "Twitter / X",
    url: "https://x.com/novakane",
    description: "Daily build-in-public notes",
    icon: "twitter",
    sort_order: 3,
    featured: false,
  },
  {
    id: "l4",
    label: "LinkedIn",
    url: "https://linkedin.com/in/novakane",
    description: "Professional history & long-form posts",
    icon: "linkedin",
    sort_order: 4,
    featured: false,
  },
  {
    id: "l5",
    label: "The Celestial Newsletter",
    url: "https://novakane.dev/newsletter",
    description: "One essay a month on design engineering",
    icon: "mail",
    sort_order: 5,
    featured: false,
  },
  {
    id: "l6",
    label: "Book a Call",
    url: "https://cal.com/novakane/intro",
    description: "30 minutes to talk collaborations",
    icon: "calendar",
    sort_order: 6,
    featured: false,
  },
  {
    id: "l7",
    label: "Speaking & Podcasts",
    url: "https://novakane.dev/talks",
    description: "Conference talks and episodes",
    icon: "mic",
    sort_order: 7,
    featured: false,
  },
];
