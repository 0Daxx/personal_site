import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-10 md:mb-14", align === "center" && "text-center", className)}>
      <p className="mb-3 flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.3em] text-neon-cyan">
        {align === "center" && (
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-neon-cyan/70" />
        )}
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 rotate-45 bg-neon-magenta shadow-glow-magenta", align === "center" && "hidden")}
        />
        {eyebrow}
        {align === "center" && (
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-neon-magenta/70" />
        )}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-zinc-400",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
