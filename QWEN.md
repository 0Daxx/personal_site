# QWEN.md — Project Context & Session Memory

Persistent details for the **CELESTIAL // Portfolio** build. Read this first in any new session.

---

## 1. Task Summary

Design and build a visually exceptional, production-ready personal portfolio website for a creative developer. The feel must be: **heavenly, futuristic, immersive, cinematic, neon-lit** — a "celestial archive" + "creative command center." NOT a generic template.

Stack (required): **React + TypeScript (strict) + Vite + Tailwind CSS + ShadCN-style UI components + Supabase + React Router v6 + Lucide React icons.**

## 2. Brand / Design System

- Colors: Neon Magenta `#FF0099` (energy), Electric Cyan `#00E5FF` (background lights), Deep Void Purple `#1A0B2E` (atmosphere).
- Gradient: start `#1A0B2E` → end `#FF0099`, accent `#00E5FF`. Use strategically (hero lighting, borders, glows, buttons, cards, section transitions) — never everywhere.
- Tailwind mappings used in code: magenta ≈ `fuchsia-500`/custom `neon`, cyan ≈ `cyan-400`, void ≈ custom `void` palette (`void-950 #05020D`, `void-900 #0B0618`, `void-800 #1A0B2E`).
- Typography: **Space Grotesk** (display/headings) + **Inter** (body) via Google Fonts. Two families max.
- Visuals: deep void backgrounds, aurora glows, star field (CSS box-shadow stars + drifting nebulae), orbital rings, thin luminous borders, layered depth.
- Animations: staggered hero reveal, scroll reveals (IntersectionObserver hook), hover glow, magnetic buttons, animated gradient borders, page transitions (keyed on route), floating particles. All respect `prefers-reduced-motion` (global CSS override + JS hook). No framer-motion dependency — pure CSS + small hooks (keep deps minimal).

## 3. Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Hero, Featured Work, About, Content Preview, Contact CTA |
| `/projects` | Projects | Archive: search, category/tech filters, featured, status, modal detail, empty state |
| `/articles` | Articles | Archive: featured, search, tag filter, reading time, detail at `/articles/:slug` |
| `/articles/:slug` | Article detail | Markdown-ish renderer, syntax-highlighted code blocks, related articles |
| `/social` | Social posts | Platform badges/filter, cards, engagement placeholders, external links |
| `/contact` | Contact | Validated form → Supabase `contact_messages` (or local fallback), states |
| `/links` | Linktree hub | Mobile-first link cards, featured link, avatar/bio header |
| `*` | NotFound | On-brand 404 |

## 4. Data Architecture

- `src/lib/supabase.ts` — client factory; returns `null` when env vars absent.
- `src/lib/data.ts` — single fetch layer: tries Supabase tables, falls back to typed seed data in `src/lib/seed-data.ts`. Never scatters hardcoded data in components.
- Placeholder persona: **Nova Kane** — Creative Engineer, replaceable everywhere (`src/lib/site-config.ts`).

## 5. Supabase Schema (see `supabase/schema.sql`)

Tables: `projects`, `articles`, `social_posts`, `important_links`, `contact_messages`, `site_settings`.
RLS: public read on content tables (published only); `contact_messages` insert-only via anon key, **never publicly readable**.

## 6. Component Inventory

UI primitives (`src/components/ui/`): button, badge, input, textarea, card, dialog, skeleton, toast (+toast-provider/use-toast), select.
Layout: Navbar (animated indicator + mobile drawer), Footer, AmbientBackground, PageTransition.
Sections/cards: HeroSection, SectionHeading, ProjectCard, ArticleCard, SocialPostCard, LinkCard, FilterControls, SearchInput, EmptyState, ContactCTA, ContactForm, MagneticButton, Reveal (scroll reveal wrapper), StarField.

## 7. Engineering Rules (always follow)

- Strict TS, no `any` leaks; types in `src/types/index.ts` mirroring DB schema.
- Semantic HTML, aria labels, visible focus rings, keyboard nav, contrast-safe text.
- Loading skeletons, error states with retry, empty states everywhere lists exist.
- No secrets client-side; only `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
- Lazy-load routes (`React.lazy`) except home; images decorative SVG/CSS gradients (no heavy assets).
- Verify before claiming done: `npm run typecheck` && `npm run build` must pass.

## 8. Current Status

- [x] QWEN.md created
- [ ] Scaffold Vite + React + TS app
- [ ] Tailwind + design tokens + fonts
- [ ] Types, seed data, supabase lib, data layer
- [ ] UI primitives
- [ ] Layout + ambient effects
- [ ] Home sections
- [ ] Projects / Articles / Social / Contact / Links / 404 pages
- [ ] supabase/schema.sql + README setup docs
- [ ] Build/typecheck verification

## 9. Commands

```bash
bun install        # deps
bun run dev        # local dev
bun run typecheck  # tsc --noEmit (must pass)
bun run build      # production build (must pass)
bun run preview    # serve build
```

Env: copy `.env.example` → `.env.local`, set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (optional — app runs on seed data without them).
