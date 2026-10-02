import { Heart, MessageSquare, Repeat2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkIcon } from "@/components/link-icon";
import { cn, compactNumber, relativeDate } from "@/lib/utils";
import type { SocialPlatform, SocialPost } from "@/types";

const PLATFORM_META: Record<SocialPlatform, { label: string; icon: string; color: string }> = {
  twitter: { label: "Twitter / X", icon: "twitter", color: "text-cyan-300 border-cyan-400/40 bg-cyan-400/10" },
  linkedin: { label: "LinkedIn", icon: "linkedin", color: "text-sky-300 border-sky-400/40 bg-sky-400/10" },
  github: { label: "GitHub", icon: "github", color: "text-zinc-200 border-zinc-400/40 bg-zinc-400/10" },
  mastodon: { label: "Mastodon", icon: "users", color: "text-purple-300 border-purple-400/40 bg-purple-400/10" },
};

export function SocialPostCard({ post }: { post: SocialPost }) {
  const meta = PLATFORM_META[post.platform];

  return (
    <article className="card-hover luminous-border group flex h-full break-inside-avoid flex-col rounded-2xl bg-void-900/80 p-5 sm:p-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 font-display text-xs font-medium", meta.color)}>
          <LinkIcon name={meta.icon} className="h-3.5 w-3.5" />
          {meta.label}
        </span>
        {post.featured && <Badge variant="solid">Featured</Badge>}
      </header>

      <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-zinc-300">{post.content}</p>

      <footer className="mt-5 flex items-center justify-between border-t border-purple-400/10 pt-4">
        <div className="flex items-center gap-4 text-xs text-zinc-500" aria-label="Engagement metrics">
          <span className="inline-flex items-center gap-1" title="Likes (placeholder metric)">
            <Heart className="h-3.5 w-3.5" aria-hidden="true" /> {compactNumber(post.likes)}
          </span>
          <span className="inline-flex items-center gap-1" title="Reposts (placeholder metric)">
            <Repeat2 className="h-3.5 w-3.5" aria-hidden="true" /> {compactNumber(post.reposts)}
          </span>
          <span className="inline-flex items-center gap-1" title="Comments (placeholder metric)">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" /> {compactNumber(post.comments)}
          </span>
        </div>
        <a
          href={post.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-xs text-neon-cyan transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
        >
          <time dateTime={post.posted_at}>{relativeDate(post.posted_at)}</time>
          <span className="sr-only"> — open original post on {meta.label} in a new tab</span>
        </a>
      </footer>
    </article>
  );
}
