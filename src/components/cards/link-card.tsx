import { ArrowUpRight } from "lucide-react";
import { LinkIcon } from "@/components/link-icon";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ImportantLink } from "@/types";

interface LinkCardProps {
  link: ImportantLink;
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 ease-celestial",
        link.featured
          ? "gradient-border shadow-glow"
          : "border-purple-400/20 bg-void-900/70 hover:-translate-y-0.5 hover:border-neon-cyan/40 hover:shadow-glow-cyan"
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors",
          link.featured
            ? "border-transparent bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-void-950"
            : "border-cyan-400/25 bg-void-800 text-neon-cyan group-hover:border-fuchsia-500/40 group-hover:text-fuchsia-300"
        )}
      >
        <LinkIcon name={link.icon} className="h-5 w-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-display text-sm font-semibold text-white sm:text-base">
            {link.label}
          </span>
          {link.featured && <Badge variant="solid">★ Featured</Badge>}
        </span>
        {link.description && (
          <span className="mt-0.5 block truncate text-xs text-zinc-400 sm:text-sm">{link.description}</span>
        )}
      </span>

      <ArrowUpRight
        className="h-5 w-5 shrink-0 text-zinc-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan"
        aria-hidden="true"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
