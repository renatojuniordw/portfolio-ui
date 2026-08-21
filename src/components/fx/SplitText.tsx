"use client";

import { memo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn, EASE_OUT } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "div";
};

export const SplitText = memo(function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const chars = text.split("");

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={cn("overflow-hidden", className)}>
      <span aria-hidden="true" className="inline-block">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 15 }
            }
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 15 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : delay + i * 0.015,
              ease: EASE_OUT,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
});
