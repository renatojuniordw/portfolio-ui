"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
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
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-text text-bg shadow-lg hover:scale-105 transition-transform md:bottom-8 md:right-8"
        aria-label="Abrir terminal"
      >
        <Search size={18} />
      </button>

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
