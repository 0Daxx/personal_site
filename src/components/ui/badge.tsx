import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-display text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300",
        cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
        outline: "border-purple-400/25 text-zinc-400",
        status: "border-transparent bg-void-700 text-zinc-300",
        solid: "border-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-void-950 font-semibold",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
