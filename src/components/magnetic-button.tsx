import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Max px the button travels toward the cursor. */
  strength?: number;
}

/** Button that leans toward the cursor — subtle, spring-free, transform-only. */
export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, children, strength = 8, ...props }, ref) => {
    const innerRef = React.useRef<HTMLButtonElement | null>(null);
    const reduced = useReducedMotion();

    const setRefs = (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reduced) return;
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(x / rect.width) * strength}px, ${
        (y / rect.height) * strength
      }px)`;
    };

    const handleLeave = () => {
      const el = innerRef.current;
      if (el) el.style.transform = "translate(0, 0)";
    };

    return (
      <button
        ref={setRefs}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn("transition-transform duration-300 ease-celestial will-change-transform", className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";
