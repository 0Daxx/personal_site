/** Mirrors the Supabase schema in supabase/schema.sql. */

export type ProjectStatus = "completed" | "in_progress" | "archived";
export type SocialPlatform = "twitter" | "linkedin" | "github" | "mastodon";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  category: string;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  live_url: string | null;
  source_url: string | null;
  /** Tailwind gradient classes used for the generated cover art. */
  cover_gradient: string;
  accent: "magenta" | "cyan";
  year: number;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_markdown: string;
  category: string;
  tags: string[];
  reading_time_minutes: number;
  published_at: string;
  featured: boolean;
  cover_gradient: string;
}

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  posted_at: string;
  external_url: string;
  likes: number;
  reposts: number;
  comments: number;
  featured: boolean;
}

export interface ImportantLink {
  id: string;
  label: string;
  url: string;
  description: string | null;
  icon: string; // key into LINK_ICON_MAP
  sort_order: number;
  featured: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
}

/** Generic async resource with loading/error state handled by hooks. */
export interface Resource<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
