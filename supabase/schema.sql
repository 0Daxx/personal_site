-- ============================================================
-- CELESTIAL Portfolio — Supabase schema
-- Run in the Supabase SQL editor. Safe to re-run (drop-if-exists).
-- ============================================================

-- ---------- PROJECTS ----------
drop table if exists public.projects;
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  long_description text not null default '',
  category text not null,
  technologies text[] not null default '{}',
  status text not null check (status in ('completed','in_progress','archived')) default 'completed',
  featured boolean not null default false,
  live_url text,
  source_url text,
  cover_gradient text not null default 'from-cyan-400/70 via-void-800 to-fuchsia-500/60',
  accent text not null default 'cyan' check (accent in ('magenta','cyan')),
  year int not null default extract(year from now())::int,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- ARTICLES ----------
drop table if exists public.articles;
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content_markdown text not null default '',
  category text not null,
  tags text[] not null default '{}',
  reading_time_minutes int not null default 1,
  published_at timestamptz not null default now(),
  featured boolean not null default false,
  is_public boolean not null default true,
  cover_gradient text not null default 'from-fuchsia-500/60 via-void-800 to-cyan-400/50'
);

-- ---------- SOCIAL POSTS ----------
drop table if exists public.social_posts;
create table public.social_posts (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('twitter','linkedin','github','mastodon')),
  content text not null,
  posted_at timestamptz not null default now(),
  external_url text not null,
  likes int not null default 0,
  reposts int not null default 0,
  comments int not null default 0,
  featured boolean not null default false,
  is_public boolean not null default true
);

-- ---------- IMPORTANT LINKS ----------
drop table if exists public.important_links;
create table public.important_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  description text,
  icon text not null default 'link', -- key into LINK_ICON_MAP (github, twitter, mail, ...)
  sort_order int not null default 0,
  featured boolean not null default false,
  is_public boolean not null default true
);

-- ---------- CONTACT MESSAGES (private!) ----------
drop table if exists public.contact_messages;
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject text not null check (char_length(subject) between 1 and 300),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

-- ---------- SITE SETTINGS ----------
drop table if exists public.site_settings;
create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public content: SELECT only for anon, and only is_public rows.
-- Writes require the service role / dashboard (bypasses RLS).
-- Contact messages: anon may INSERT but can NEVER read them back.
-- ============================================================

alter table public.projects        enable row level security;
alter table public.articles        enable row level security;
alter table public.social_posts    enable row level security;
alter table public.important_links enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings   enable row level security;

create policy "public read projects"        on public.projects        for select to anon, authenticated using (is_public = true);
create policy "public read articles"        on public.articles       for select to anon, authenticated using (is_public = true);
create policy "public read social posts"    on public.social_posts    for select to anon, authenticated using (is_public = true);
create policy "public read important links" on public.important_links for select to anon, authenticated using (is_public = true);
create policy "public read settings"        on public.site_settings   for select to anon, authenticated using (true);

-- Insert-only policy for contact form submissions (no SELECT policy exists →
-- messages are invisible to any anon/authenticated client. Read them via the
-- dashboard or a service-role function only.)
create policy "anon can submit contact" on public.contact_messages for insert to anon with check (true);

-- Optional rate limiting at the DB level (max 5 messages per hour per email):
create or replace function public.check_contact_rate_limit()
returns trigger language plpgsql as $$
begin
  if (select count(*) from public.contact_messages
      where email = new.email and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'Rate limit exceeded';
  end if;
  return new;
end; $$;

create trigger contact_rate_limit before insert on public.contact_messages
for each row execute function public.check_contact_rate_limit();

-- ============================================================
-- SEED DATA (matches src/lib/seed-data.ts — trim to taste)
-- ============================================================

insert into public.projects (title, slug, description, long_description, category, technologies, status, featured, live_url, source_url, cover_gradient, accent, year) values
('Aurora Engine', 'aurora-engine',
 'A real-time generative aurora renderer for the web — GPU-driven ribbons of light responding to audio and cursor energy.',
 'WebGL2 + compute-shader pipeline rendering volumetric aurora curtains at 60fps on mid-range hardware.',
 'Creative Coding', array['TypeScript','WebGL2','GLSL','React'], 'completed', true,
 'https://aurora.novakane.dev', 'https://github.com/novakane/aurora-engine',
 'from-cyan-400/70 via-void-800 to-fuchsia-500/60', 'cyan', 2025),
('Nebula Dashboard', 'nebula-dashboard',
 'An observability console for edge functions with streaming logs and constellation-style latency maps.',
 'Turns raw edge telemetry into a calm command center built on Supabase Realtime.',
 'Product', array['React','Supabase','Vite','D3'], 'completed', true,
 'https://nebula.novakane.dev', null,
 'from-fuchsia-500/60 via-void-800 to-cyan-400/50', 'magenta', 2024);

insert into public.articles (title, slug, excerpt, content_markdown, category, tags, reading_time_minutes, featured) values
('Designing interfaces that feel alive', 'designing-interfaces-that-feel-alive',
 'Motion is not decoration — it is feedback. How micro-interactions build trust.',
 E'## The illusion of life\n\nGreat interfaces respond like living systems.\n\n```ts\nconst spring = { stiffness: 210, damping: 26 };\n```\n\n> Motion should explain, never decorate.',
 'Design Engineering', array['motion','ui','craft'], 6, true);

insert into public.social_posts (platform, content, external_url, likes, reposts, comments, featured) values
('twitter', 'Shipped v0.4 of Aurora Engine today — audio-reactive ribbons now run at 60fps on integrated GPUs. Onwards. ✦',
 'https://x.com/novakane/status/0001', 342, 58, 27, true),
('linkedin', 'Reflecting on nine years of design engineering: the best metric I ever tracked was how quickly a prototype made someone say "oh, nice".',
 'https://linkedin.com/posts/novakane-0002', 128, 12, 9, false);

insert into public.important_links (label, url, description, icon, sort_order, featured) values
('Latest project — Aurora Engine', 'https://aurora.novakane.dev', 'Real-time generative aurora renderer', 'sparkles', 1, true),
('GitHub', 'https://github.com/novakane', 'Open-source experiments & tools', 'github', 2, false),
('The Journal', 'https://novakane.dev/articles', 'Essays on craft & creative code', 'pen', 3, false),
('Book a call', 'https://cal.com/novakane', '30 minutes, no strings', 'calendar', 4, false);

insert into public.site_settings (key, value) values
('site_name', 'Nova Kane'),
('site_role', 'Creative Engineer'),
('contact_email', 'hello@novakane.dev');
