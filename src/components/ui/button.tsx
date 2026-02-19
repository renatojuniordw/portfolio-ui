"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-tech text-white shadow-soft-1 hover:brightness-110 hover:shadow-tech/20 hover:shadow-lg",
        secondary:
          "bg-s2 text-text-primary border border-border hover:bg-s2/80 hover:border-text-secondary/20",
        ghost: "hover:bg-s2 hover:text-text-primary",
        danger: "bg-danger text-white hover:bg-danger/90",
        outline:
          "border border-border bg-transparent hover:bg-s2 hover:text-text-primary",
      },
      size: {
        sm: "h-8 px-3 rounded-sm text-xs",
        md: "h-10 px-4 py-2 rounded-md",
        lg: "h-12 px-8 rounded-lg text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
