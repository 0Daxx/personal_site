import { supabase } from "./supabase";
import {
  seedArticles,
  seedLinks,
  seedProjects,
  seedSocialPosts,
} from "./seed-data";
import type { ContactMessage, ImportantLink, Project, Article, SocialPost } from "@/types";

/**
 * Data access layer. Every function tries Supabase first and falls back to
 * typed seed data when Supabase is not configured — so the site works offline
 * and during local development without a database.
 */

const simulateLatency = (ms = 350) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function fetchTable<T>(table: string, fallback: T[]): Promise<T[]> {
  if (!supabase) {
    await simulateLatency();
    return fallback;
  }
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw new Error(`${table}: ${error.message}`);
  return (data as T[]) ?? fallback;
}

export async function getProjects(): Promise<Project[]> {
  const rows = await fetchTable<Project>("projects", seedProjects);
  return rows.sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getArticles(): Promise<Article[]> {
  const rows = await fetchTable<Article>("articles", seedArticles);
  return rows.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export async function getSocialPosts(): Promise<SocialPost[]> {
  const rows = await fetchTable<SocialPost>("social_posts", seedSocialPosts);
  return rows.sort(
    (a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime()
  );
}

export async function getImportantLinks(): Promise<ImportantLink[]> {
  const rows = await fetchTable<ImportantLink>("important_links", seedLinks);
  return rows.sort((a, b) => a.sort_order - b.sort_order);
}

/**
 * Inserts into contact_messages. RLS allows anon INSERT but never SELECT,
 * so submissions are private. Falls back to console + success when Supabase
 * is unconfigured (clearly isolated: no fake persistence claims).
 */
export async function submitContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  const record: ContactMessage = { ...input, created_at: new Date().toISOString() };
  if (!supabase) {
    await simulateLatency(700);
    // Isolated fallback: nothing is persisted; logged for dev visibility only.
    console.info("[contact-fallback] Supabase not configured — message not stored:", record);
    return record;
  }
  const { error } = await supabase.from("contact_messages").insert(record);
  if (error) throw new Error(error.message);
  return record;
}
