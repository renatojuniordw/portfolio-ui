"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const runAnimation = async () => {
      // Stage 0: Initial (Wait a bit)
      await new Promise((r) => setTimeout(r, 200));
      
      // Stage 1: Reveal "enato " and "ezerra"
      setStage(1);
      await new Promise((r) => setTimeout(r, 1200));
      
      // Stage 2: Hide "enato " and "ezerra"
      setStage(2);
      await new Promise((r) => setTimeout(r, 800));
      
      // Stage 3: Add dot
      setStage(3);
      await new Promise((r) => setTimeout(r, 600));
      
      // End: Trigger fade out and move
      onComplete();
    };
    runAnimation().catch(() => {});
  }, [onComplete, prefersReducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div 
        className="flex items-center text-4xl md:text-6xl font-bold tracking-tighter text-text"
      >
        <motion.span layoutId="navbar-logo-r">R</motion.span>
        
        <AnimatePresence mode="popLayout">
          {stage >= 1 && stage < 2 && (
            <motion.span
              key="enato"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap"
            >
              enato&nbsp;
            </motion.span>
          )}
        </AnimatePresence>

        <motion.span layoutId="navbar-logo-b">B</motion.span>

        <AnimatePresence mode="popLayout">
          {stage >= 1 && stage < 2 && (
            <motion.span
              key="ezerra"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap"
            >
              ezerra
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {stage >= 3 && (
            <motion.span
              key="dot"
              layoutId="navbar-logo-dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-tech"
            >
              .
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
