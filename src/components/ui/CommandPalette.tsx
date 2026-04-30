"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Home,
  FolderOpen,
  FileText,
  Mail,
  Sun,
  Moon,
  Search,
  Download,
} from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // Atalho de teclado Cmd+K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* Botão flutuante discreto para abrir o Command Palette */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-text text-bg shadow-lg hover:scale-105 transition-transform md:bottom-8 md:right-8"
        aria-label="Abrir comandos"
      >
        <Search size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh] backdrop-blur-sm px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-[640px] overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl"
            >
              <Command
                className="flex flex-col"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpen(false);
                }}
              >
                <div className="flex items-center border-b border-border px-4">
                  <Search className="mr-3 h-5 w-5 shrink-0 text-text-secondary" />
                  <Command.Input
                    placeholder="Digite um comando ou pesquise..."
                    className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-text-secondary text-text"
                  />
                </div>

                <Command.List className="max-h-[300px] overflow-y-auto p-2 select-none">
                  <Command.Empty className="py-6 text-center text-sm text-text-secondary">
                    Nenhum resultado encontrado.
                  </Command.Empty>

                  <Command.Group heading="Navegação" className="px-2 py-1.5 text-xs font-medium text-text-secondary uppercase tracking-wider">
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/"))}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text rounded-xl hover:bg-surface-1 cursor-pointer aria-selected:bg-surface-1"
                    >
                      <Home size={18} />
                      <span>Início</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/#sobre"))}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text rounded-xl hover:bg-surface-1 cursor-pointer aria-selected:bg-surface-1"
                    >
                      <Home size={18} />
                      <span>Sobre</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/projetos"))}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text rounded-xl hover:bg-surface-1 cursor-pointer aria-selected:bg-surface-1"
                    >
                      <FolderOpen size={18} />
                      <span>Projetos</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/curriculo"))}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text rounded-xl hover:bg-surface-1 cursor-pointer aria-selected:bg-surface-1"
                    >
                      <FileText size={18} />
                      <span>Currículo</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/contato"))}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text rounded-xl hover:bg-surface-1 cursor-pointer aria-selected:bg-surface-1"
                    >
                      <Mail size={18} />
                      <span>Contato</span>
                    </Command.Item>
                  </Command.Group>

                  <Command.Separator className="h-px bg-border my-2" />

                  <Command.Group heading="Ações" className="px-2 py-1.5 text-xs font-medium text-text-secondary uppercase tracking-wider">
                    <Command.Item
                      onSelect={() =>
                        runCommand(() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        )
                      }
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text rounded-xl hover:bg-surface-1 cursor-pointer aria-selected:bg-surface-1"
                    >
                      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                      <span>Alternar para Tema {theme === "dark" ? "Claro" : "Escuro"}</span>
                    </Command.Item>
                    <Command.Item
                      onSelect={() =>
                        runCommand(() => {
                          const link = document.createElement("a");
                          link.href = "/Profile.pdf";
                          link.download = "Renato_Bezerra_Curriculo.pdf";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        })
                      }
                      className="flex items-center gap-3 px-3 py-2 text-sm text-text rounded-xl hover:bg-surface-1 cursor-pointer aria-selected:bg-surface-1"
                    >
                      <Download size={18} />
                      <span>Baixar Currículo (PDF)</span>

                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
