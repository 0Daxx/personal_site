import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="gradient-border col-span-full mx-auto flex max-w-md flex-col items-center rounded-2xl px-8 py-14 text-center">
      <span className="mb-5 flex h-14 w-14 animate-float items-center justify-center rounded-full border border-cyan-400/30 bg-void-800 shadow-glow-cyan">
        <Compass className="h-6 w-6 text-neon-cyan" aria-hidden="true" />
      </span>
      <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
      {actionLabel && onAction && (
        <Button variant="cyan" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
