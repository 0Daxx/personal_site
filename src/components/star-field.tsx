import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Star {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
}

/**
 * Lightweight deterministic star field. Pure CSS twinkle animation,
 * disabled entirely under prefers-reduced-motion (static stars remain).
 */
export function StarField({ count = 70 }: { count?: number }) {
  const reduced = useReducedMotion();

  // Deterministic pseudo-random placement (mulberry32) to avoid hydration drift.
  const stars = useMemo<Star[]>(() => {
    let seed = 1337;
    const rand = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: count }, () => ({
      top: `${(rand() * 100).toFixed(2)}%`,
      left: `${(rand() * 100).toFixed(2)}%`,
      size: rand() < 0.85 ? 1 : 2,
      delay: `${(rand() * 6).toFixed(2)}s`,
      duration: `${(3 + rand() * 5).toFixed(2)}s`,
      color: rand() < 0.75 ? "#ffffff" : rand() < 0.5 ? "#00E5FF" : "#FF0099",
    }));
  }, [count]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            opacity: reduced ? 0.5 : undefined,
            animation: reduced
              ? undefined
              : `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
