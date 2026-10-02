import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LinkCard } from "@/components/cards/link-card";
import { ErrorState } from "@/components/error-state";
import { Reveal } from "@/components/reveal";
import { StarField } from "@/components/star-field";
import { ListSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useResource } from "@/hooks/use-resource";
import { getImportantLinks } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export default function LinksPage() {
  const { data, loading, error, refetch } = useResource(getImportantLinks);
  const { toast } = useToast();
  const links = data ?? [];

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${siteConfig.name} — link hub`, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast({ title: "Coordinates copied", description: "Hub link is on your clipboard." });
      }
    } catch {
      // User dismissed the native sheet — no error toast needed.
    }
  };

  return (
    <div className="relative py-16 md:py-24">
      {/* Concentrated star field for the hub page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70">
        <StarField count={50} />
      </div>

      <div className="container relative mx-auto max-w-xl">
        {/* Profile header */}
        <Reveal className="mb-10 text-center">
          <div className="relative mx-auto h-24 w-24">
            <div aria-hidden="true" className="absolute inset-[-18%] animate-spin-slow rounded-full border border-dashed border-cyan-400/25">
              <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-neon-cyan shadow-glow-cyan" />
            </div>
            <div className="gradient-border absolute inset-0 flex items-center justify-center overflow-hidden rounded-full shadow-glow">
              <div className="absolute inset-0 bg-celestial-gradient" />
              <span className="relative font-display text-3xl font-bold text-white drop-shadow-[0_0_14px_rgba(0,229,255,0.7)]">
                {siteConfig.avatarInitials}
              </span>
            </div>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-white">{siteConfig.name}</h1>
          <p className="mt-1 font-display text-xs uppercase tracking-[0.3em] text-neon-cyan">{siteConfig.role}</p>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">{siteConfig.tagline}</p>
          <Button variant="cyan" size="sm" className="mt-6" onClick={share}>
            <Share2 aria-hidden="true" /> Share this hub
          </Button>
        </Reveal>

        {/* Link stack — mobile-first single column */}
        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <ListSkeleton count={5} />
        ) : (
          <ul className="space-y-4">
            {links.map((link, i) => (
              <Reveal as="li" key={link.id} delay={Math.min(i * 70, 350)}>
                <LinkCard link={link} />
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal className="mt-12 text-center" delay={100}>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
            ✦ {siteConfig.name} · celestial link hub · ordered by importance ✦
          </p>
        </Reveal>
      </div>
    </div>
  );
}
