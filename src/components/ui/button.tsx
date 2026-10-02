import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-display font-medium transition-all duration-300 ease-celestial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-fuchsia-600 to-neon-magenta text-white shadow-glow-magenta hover:shadow-glow hover:brightness-110 active:scale-[0.98]",
        cyan:
          "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40 hover:bg-neon-cyan/20 hover:shadow-glow-cyan active:scale-[0.98]",
        ghost:
          "text-zinc-300 hover:text-white hover:bg-void-700/60",
        outline:
          "border border-purple-400/25 text-zinc-200 hover:border-neon-cyan/50 hover:text-white hover:shadow-glow-cyan",
        link: "text-neon-cyan underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base py-3.5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
