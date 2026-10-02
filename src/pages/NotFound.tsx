import { Link } from "react-router-dom";
import { Compass, Home, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarField } from "@/components/star-field";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60">
        <StarField count={40} />
      </div>

      {/* Orbital 404 emblem */}
      <div aria-hidden="true" className="relative mb-10 h-36 w-36">
        <div className="absolute inset-[-20%] animate-spin-slow rounded-full border border-cyan-400/20">
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neon-cyan shadow-glow-cyan" />
        </div>
        <div className="absolute inset-[-4%] animate-spin-slower rounded-full border border-dashed border-fuchsia-500/25">
          <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-neon-magenta shadow-glow-magenta" />
        </div>
        <div className="gradient-border absolute inset-[18%] flex items-center justify-center rounded-full shadow-glow">
          <span className="font-display text-5xl font-bold text-gradient-neon animate-gradient-x">404</span>
        </div>
      </div>

      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Lost in the void</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
        This coordinate doesn&apos;t exist in the celestial archive. The page may have drifted
        beyond the event horizon — or the link was mistyped in the dark.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link to="/">
            <Home aria-hidden="true" /> Return to base
          </Link>
        </Button>
        <Button variant="cyan" size="lg" asChild>
          <Link to="/projects">
            <Compass aria-hidden="true" /> Explore the archive
          </Link>
        </Button>
      </div>
      <p className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-600">
        <Radio className="h-3.5 w-3.5 text-neon-cyan" aria-hidden="true" />
        Signal status: searching…
      </p>
    </div>
  );
}
