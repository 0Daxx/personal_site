import { AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="col-span-full mx-auto flex max-w-md flex-col items-center rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/5 px-8 py-12 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-fuchsia-500/40 bg-void-800 shadow-glow-magenta">
        <AlertCircle className="h-6 w-6 text-fuchsia-400" aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-semibold text-white">Signal lost</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{message}</p>
      <Button variant="cyan" className="mt-6" onClick={onRetry}>
        <RotateCw aria-hidden="true" /> Retry transmission
      </Button>
    </div>
  );
}
