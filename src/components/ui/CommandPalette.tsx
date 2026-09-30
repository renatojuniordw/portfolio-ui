"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { TerminalPane } from "./TerminalPane";
import { ModalDialog } from "./ModalDialog";
import { downloadPDF } from "@/lib/utils";

function isApplePlatform() {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = nav.userAgentData?.platform ?? nav.platform ?? "";
  return /mac|iphone|ipad|ipod/i.test(platform);
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);
  // Componente carregado só no cliente (ssr: false), então navigator existe.
  const shortcut = isApplePlatform() ? "⌘K" : "Ctrl+K";

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "k" || !(e.metaKey || e.ctrlKey)) return;
      // Não abre o terminal por cima de outro modal (ex.: menu mobile).
      if (document.querySelector("dialog[open]:not(#terminal-dialog)")) return;
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    try {
      command();
    } catch {
      // command errors are non-critical UX actions
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const downloadCv = React.useCallback(() => {
    downloadPDF("/Profile.pdf", "Renato_Bezerra_Curriculo.pdf");
  }, []);

  return (
    <>
      <div
        className="fixed z-40 flex items-center gap-3 print:hidden"
        style={{
          right: "max(1.5rem, env(safe-area-inset-right))",
          bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <span
          aria-hidden="true"
          className="hidden lg:block text-xs text-text-secondary bg-surface-2 border border-border px-2.5 py-1 rounded-lg"
        >
          {shortcut}
        </span>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-text text-bg shadow-lg transition-transform hover:scale-105 motion-reduce:hover:scale-100"
          aria-label={`Abrir terminal interativo (${shortcut})`}
          aria-haspopup="dialog"
          aria-controls="terminal-dialog"
          aria-expanded={open}
        >
          <span className="text-xs font-mono font-bold" aria-hidden="true">
            &gt;_
          </span>
        </button>
      </div>

      <ModalDialog
        id="terminal-dialog"
        open={open}
        onClose={() => setOpen(false)}
        title="Terminal interativo"
        closeLabel="Fechar terminal"
        initialFocusRef={inputRef}
        className="mx-auto mt-[max(1rem,12dvh)] mb-auto w-[calc(100%-2rem)] max-w-[640px] max-h-[min(36rem,calc(100dvh-2rem))] overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl open:flex flex-col"
      >
        <TerminalPane
          inputRef={inputRef}
          onNavigate={(path) => runCommand(() => router.push(path))}
          toggleTheme={() => runCommand(toggleTheme)}
          setTheme={(t) => runCommand(() => setTheme(t))}
          onDownloadCv={() => runCommand(downloadCv)}
        />
      </ModalDialog>
    </>
  );
}
