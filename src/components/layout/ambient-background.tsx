import { StarField } from "@/components/star-field";

/**
 * Fixed, site-wide cosmic atmosphere: drifting nebula glows, orbital rings,
 * and a star field. Purely decorative (aria-hidden), pointer-events disabled,
 * GPU-cheap (transform/opacity only), and frozen under reduced motion by the
 * global CSS override.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-800/60 via-void-950 to-void-950" />

      {/* Aurora-like drifting glows */}
      <div className="absolute -top-40 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 animate-drift rounded-full bg-neon-magenta/12 blur-[140px]" />
      <div
        className="absolute right-[-10%] top-1/3 h-[26rem] w-[26rem] animate-drift rounded-full bg-neon-cyan/10 blur-[120px]"
        style={{ animationDelay: "-9s", animationDuration: "34s" }}
      />
      <div
        className="absolute bottom-[-15%] left-[-8%] h-[30rem] w-[30rem] animate-drift rounded-full bg-purple-600/12 blur-[130px]"
        style={{ animationDelay: "-17s", animationDuration: "40s" }}
      />

      {/* Orbital rings — slow celestial rotation */}
      <svg
        className="absolute left-1/2 top-[-30vh] h-[80vh] w-[80vh] -translate-x-1/2 animate-spin-slower opacity-[0.14]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="198" stroke="url(#ringA)" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="150" stroke="#00E5FF" strokeWidth="0.4" strokeDasharray="2 10" />
        <circle cx="200" cy="200" r="104" stroke="#FF0099" strokeWidth="0.4" strokeDasharray="1 14" />
        <defs>
          <linearGradient id="ringA" x1="0" y1="0" x2="400" y2="400">
            <stop offset="0" stopColor="#00E5FF" />
            <stop offset="1" stopColor="#FF0099" />
          </linearGradient>
        </defs>
        <circle cx="398" cy="200" r="2.5" fill="#00E5FF" />
        <circle cx="200" cy="50" r="2" fill="#FF0099" />
      </svg>

      <StarField count={80} />

      {/* Fine grid for command-center texture, faded at edges */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
    </div>
  );
}
