"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalPane } from "./TerminalPane";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const downloadCv = React.useCallback(() => {
    const link = document.createElement("a");
    link.href = "/Profile.pdf";
    link.download = "Renato_Bezerra_Curriculo.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 flex items-center gap-3">
        <motion.span
          className="hidden md:block text-xs text-text-secondary bg-surface-2 border border-border px-2.5 py-1 rounded-lg"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          Cmd+K
        </motion.span>

        <motion.button
          onClick={() => setOpen(true)}
          className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-text text-bg shadow-lg hover:scale-105 transition-transform"
          aria-label="Abrir terminal interativo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <span className="text-xs font-mono font-bold">&gt;_</span>
          <motion.span
            className="absolute inset-0 rounded-xl border-2 border-transparent"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0,0,0,0)",
                "0 0 0 6px rgba(0,0,0,0.08)",
                "0 0 0 0 rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh] backdrop-blur-sm px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="terminal-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[640px] overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl"
            >
              <span id="terminal-title" className="sr-only">Terminal interativo</span>
              <TerminalPane
                onNavigate={(path) => runCommand(() => router.push(path))}
                toggleTheme={() => runCommand(toggleTheme)}
                setTheme={(t) => runCommand(() => setTheme(t))}
                onDownloadCv={() => runCommand(downloadCv)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
