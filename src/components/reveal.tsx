import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

/** Scroll-triggered reveal wrapper using IntersectionObserver + CSS transitions. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
