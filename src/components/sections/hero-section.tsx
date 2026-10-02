import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { StarField } from "@/components/star-field";
import { siteConfig } from "@/lib/site-config";

const STAGGER = [0, 120, 240, 360, 480];

/** Creative orbital avatar placeholder — replace with <img> for a real photo. */
function CelestialAvatar() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
      {/* Orbit rings */}
      <div className="absolute inset-[-14%] animate-spin-slow rounded-full border border-cyan-400/20">
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neon-cyan shadow-glow-cyan" />
      </div>
      <div className="absolute inset-[-2%] animate-spin-slower rounded-full border border-fuchsia-500/20 [border-style:dashed]">
        <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-neon-magenta shadow-glow-magenta" />
      </div>

      {/* Core disc */}
      <div className="gradient-border absolute inset-[14%] animate-float overflow-hidden rounded-full shadow-glow">
        <div className="absolute inset-0 bg-celestial-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(0,229,255,0.45),transparent_55%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-6xl font-bold tracking-tight text-white drop-shadow-[0_0_18px_rgba(0,229,255,0.6)] sm:text-7xl">
            {siteConfig.avatarInitials}
          </span>
        </div>
        {/* Glass sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      aria-label={`Introduction — ${siteConfig.name}, ${siteConfig.role}`}
      className="relative isolate overflow-hidden pt-32 md:pt-44"
    >
      <StarField count={40} />

      {/* Hero spotlight lighting */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,0,153,0.16),transparent_65%)]"
      />

      <div className="container grid items-center gap-14 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-32">
        <div>
          <p
            className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 font-display text-xs uppercase tracking-[0.22em] text-neon-cyan"
            style={{ animationDelay: `${STAGGER[0]}ms` }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            Available for select collaborations
          </p>

          <h1 className="font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {siteConfig.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span
                  className={`animate-fade-up block ${
                    i === 2 ? "text-sheen" : ""
                  }`}
                  style={{ animationDelay: `${STAGGER[i + 1] ?? 360}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            style={{ animationDelay: `${STAGGER[4]}ms` }}
          >
            {siteConfig.intro}
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "600ms" }}
          >
            <MagneticButton className="rounded-lg" data-strength="10">
              <Button asChild size="lg" className="pointer-events-none">
                <Link to="/projects">
                  Explore My Work
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </MagneticButton>
            <Button asChild size="lg" variant="cyan">
              <Link to="/contact">Let’s Connect</Link>
            </Button>
          </div>

          <dl
            className="animate-fade-up mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-purple-400/15 pt-8 sm:grid-cols-4"
            style={{ animationDelay: "720ms" }}
          >
            {siteConfig.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold text-white">{stat.value}</dd>
                <dd className="mt-0.5 text-xs uppercase tracking-wider text-zinc-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-in hidden lg:block" style={{ animationDelay: "300ms" }}>
          <CelestialAvatar />
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-cyan-400/40 p-1.5">
          <ArrowDown className="h-3 w-3 animate-scroll-hint text-neon-cyan" strokeWidth={2.5} />
        </div>
      </div>
    </section>
  );
}
