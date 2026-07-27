import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-cyan-500/40 bg-cyan-500/15 text-cyan-300",
        secondary: "border-purple-500/40 bg-purple-500/15 text-purple-300",
        success: "border-green-500/40 bg-green-500/15 text-green-300",
        warning: "border-yellow-500/40 bg-yellow-500/15 text-yellow-300",
        destructive: "border-red-500/40 bg-red-500/15 text-red-300",
        outline: "border-zinc-600 text-zinc-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
