"use client";

import { MotionConfig } from "framer-motion";

/** Faz as animações do Framer Motion respeitarem prefers-reduced-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
