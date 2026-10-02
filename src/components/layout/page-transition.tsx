import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Smooth page transitions keyed on pathname: fade + micro-rise on enter.
 * Also restores scroll position between routes.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [display, setDisplay] = useState({ key: location.pathname, node: children });
  const [phase, setPhase] = useState<"in" | "out">("in");
  const pendingRef = useRef<{ key: string; node: ReactNode } | null>(null);

  useEffect(() => {
    if (location.pathname !== display.key) {
      pendingRef.current = { key: location.pathname, node: children };
      setPhase("out");
      const t = setTimeout(() => {
        if (pendingRef.current) {
          setDisplay(pendingRef.current);
          pendingRef.current = null;
          setPhase("in");
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }
      }, 180);
      return () => clearTimeout(t);
    }
    // Refresh node for same-route updates (e.g., lazy chunk arrival)
    setDisplay((d) => ({ ...d, node: children }));
  }, [location.pathname, children, display.key]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      key={display.key}
      className={cn(
        "outline-none transition-all duration-300 ease-celestial",
        phase === "in" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      {display.node}
    </main>
  );
}
