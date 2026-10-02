import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, label, placeholder, className }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor="search-field" className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
      />
      <Input
        id="search-field"
        type="search"
        role="searchbox"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? `Search…`}
        className="pl-10 pr-10"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-500 transition-colors hover:bg-void-700 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
