import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  maxWidth?: "4xl" | "5xl" | "6xl";
  children: ReactNode;
}

export function PageLayout({ maxWidth = "5xl", children }: PageLayoutProps) {
  return (
    <div
      className={cn(
        "pt-32 pb-24 px-6 mx-auto",
        {
          "max-w-4xl": maxWidth === "4xl",
          "max-w-5xl": maxWidth === "5xl",
          "max-w-6xl": maxWidth === "6xl",
        },
      )}
    >
      {children}
    </div>
  );
}
