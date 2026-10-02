import { useMemo, useState } from "react";
import { Radio } from "lucide-react";
import { SocialPostCard } from "@/components/cards/social-post-card";
import { ActiveFilters, FilterControls } from "@/components/filter-controls";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { ListSkeleton } from "@/components/skeletons";
import { useResource } from "@/hooks/use-resource";
import { getSocialPosts } from "@/lib/data";
import type { SocialPlatform } from "@/types";

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  github: "GitHub",
  mastodon: "Mastodon",
};

export default function SocialPage() {
  const { data, loading, error, refetch } = useResource(getSocialPosts);
  const [platform, setPlatform] = useState<string>("All");

  const posts = data ?? [];
  const platforms = useMemo(
    () => Array.from(new Set(posts.map((p) => p.platform))).map((p) => PLATFORM_LABELS[p]),
    [posts]
  );

  const filtered = useMemo(
    () => (platform === "All" ? posts : posts.filter((p) => PLATFORM_LABELS[p.platform] === platform)),
    [posts, platform]
  );

  const featured = filtered.filter((p) => p.featured);
  const stream = filtered.filter((p) => !p.featured);

  return (
    <div className="container py-16 md:py-24">
      <SectionHeading
        eyebrow="The relay"
        title="Social transmissions"
        description="Short signals mirrored from across the network — thoughts in orbit, work-in-progress flashes, and announcements. Stored in Supabase, no third-party embeds."
      />

      {!error && (
        <Reveal className="mb-10 space-y-4 rounded-2xl border border-purple-400/15 bg-void-900/50 p-5 backdrop-blur-sm">
          <FilterControls label="Platform" options={platforms} active={platform} onSelect={setPlatform} allLabel="All platforms" />
          <ActiveFilters filters={platform !== "All" ? [`Platform: ${platform}`] : []} onClear={() => setPlatform("All")} />
        </Reveal>
      )}

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <ListSkeleton count={5} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Quiet frequency"
          description={`No ${platform} signals archived yet. Check another channel.`}
          actionLabel="Show everything"
          onAction={() => setPlatform("All")}
        />
      ) : (
        <>
          {featured.length > 0 && (
            <div className="mb-10 grid gap-6 md:grid-cols-2">
              {featured.map((post, i) => (
                <Reveal key={post.id} delay={i * 80}>
                  <SocialPostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}

          {/* Masonry-style editorial stream via CSS columns */}
          <div key={platform} className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {stream.map((post, i) => (
              <Reveal key={post.id} delay={Math.min(i * 50, 250)} className="break-inside-avoid">
                <SocialPostCard post={post} />
              </Reveal>
            ))}
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs uppercase tracking-[0.25em] text-zinc-600" role="status">
            <Radio className="h-3.5 w-3.5 text-neon-cyan" aria-hidden="true" />
            {filtered.length} signal{filtered.length === 1 ? "" : "s"} on record
          </p>
        </>
      )}
    </div>
  );
}
