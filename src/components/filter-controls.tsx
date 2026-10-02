import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterGroupProps {
  label: string;
  options: readonly string[];
  active: string;
  onSelect: (option: string) => void;
  allLabel?: string;
}

/** Pill-style single-select filter row — accessible via buttons + aria-pressed. */
export function FilterControls({ label, options, active, onSelect, allLabel = "All" }: FilterGroupProps) {
  const items = [allLabel, ...options];
  return (
    <div role="group" aria-label={label}>
      <p className="mb-2 font-display text-[11px] uppercase tracking-[0.25em] text-zinc-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((option) => {
          const isActive = active === option;
          return (
            <Button
              key={option}
              type="button"
              size="sm"
              variant={isActive ? "cyan" : "outline"}
              aria-pressed={isActive}
              onClick={() => onSelect(option)}
              className={cn(
                "rounded-full px-4 transition-all duration-300 ease-celestial",
                isActive && "shadow-glow-cyan"
              )}
            >
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

interface ActiveFiltersProps {
  filters: string[];
  onClear: () => void;
}

export function ActiveFilters({ filters, onClear }: ActiveFiltersProps) {
  if (filters.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-zinc-500">Active:</span>
      {filters.map((f) => (
        <Badge key={f} variant="default">
          {f}
        </Badge>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-xs text-neon-cyan underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
