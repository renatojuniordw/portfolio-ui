"use client";

import * as React from "react";
import { PROFILE, SOCIALS } from "@/lib/constants";

interface TerminalPaneProps {
  onNavigate: (path: string) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  onDownloadCv: () => void;
}

interface TerminalLine {
  type: "input" | "output" | "error";
  text: string;
}

const ROUTE_ALIASES: Record<string, string> = {
  home: "/",
  inicio: "/",
  sobre: "/#sobre",
  projetos: "/projetos",
  curriculo: "/curriculo",
  contato: "/contato",
  blog: "/blog",
};

const HELP_TEXT = [
  "Comandos disponíveis:",
  "  help                mostra esta lista",
  "  cd <rota>           navega (home, sobre, projetos, curriculo, contato, blog)",
  "  theme [light|dark]  alterna ou define o tema",
  "  cv                  baixa o currículo em PDF",
  "  whoami              quem sou eu",
  "  cat sobre.md        resumo profissional",
  "  sudo hire-me        ;)",
  "  clear               limpa a tela",
].join("\n");

const WELCOME_LINE: TerminalLine = {
  type: "output",
  text: 'Digite "help" para ver os comandos.',
};

export function TerminalPane({
  onNavigate,
  toggleTheme,
  setTheme,
  onDownloadCv,
}: TerminalPaneProps) {
  const [lines, setLines] = React.useState<TerminalLine[]>([WELCOME_LINE]);
  const [value, setValue] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const logRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [lines]);

  function runCommand(raw: string): TerminalLine[] {
    const [cmd, ...args] = raw.trim().split(/\s+/).filter(Boolean);
    if (!cmd) return [];

    switch (cmd) {
      case "help":
        return [{ type: "output", text: HELP_TEXT }];

      case "cd": {
        const target = args[0]?.toLowerCase();
        const path = target ? ROUTE_ALIASES[target] : undefined;
        if (!path) {
          return [
            { type: "error", text: `cd: rota não encontrada: ${args[0] ?? ""}` },
          ];
        }
        onNavigate(path);
        return [{ type: "output", text: `navegando para ${path}...` }];
      }

      case "theme": {
        const option = args[0]?.toLowerCase();
        if (option === "light" || option === "dark") {
          setTheme(option);
          return [{ type: "output", text: `tema definido para ${option}` }];
        }
        if (option) {
          return [{ type: "error", text: `theme: opção inválida: ${option}` }];
        }
        toggleTheme();
        return [{ type: "output", text: "tema alternado" }];
      }

      case "cv":
        onDownloadCv();
        return [{ type: "output", text: "baixando currículo..." }];

      case "whoami":
        return [{ type: "output", text: `${PROFILE.name} — ${PROFILE.title}` }];

      case "cat":
        if (args.join(" ") === "sobre.md") {
          return [{ type: "output", text: PROFILE.summary }];
        }
        return [{ type: "error", text: `cat: arquivo não encontrado: ${args.join(" ")}` }];

      case "sudo":
        if (args.join(" ") === "hire-me") {
          const win = window.open(SOCIALS.personal.linkedin, "_blank", "noopener,noreferrer");
          if (!win) {
            return [{ type: "error", text: "Popup bloqueado. Permita popups para este site." }];
          }
          return [
            { type: "output", text: "🚀 Acesso concedido. Redirecionando para o LinkedIn..." },
          ];
        }
        return [{ type: "error", text: `sudo: comando não encontrado: ${args.join(" ")}` }];

      case "clear":
        setLines([WELCOME_LINE]);
        return [];

      default:
        return [{ type: "error", text: `comando não encontrado: ${cmd}. Digite "help".` }];
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = value;
    const trimmed = raw.trim();

    const inputLine: TerminalLine = { type: "input", text: raw };
    const outputLines = trimmed ? runCommand(trimmed) : [];

    if (trimmed !== "clear") {
      setLines((prev) => [...prev, inputLine, ...outputLines]);
    }

    if (trimmed) {
      setHistory((prev) => [...prev, trimmed]);
    }
    setHistoryIndex(null);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
    }
  }

  return (
    <div className="flex flex-col font-mono text-sm">
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        className="max-h-[300px] overflow-y-auto p-4 space-y-1"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "input"
                ? "text-text"
                : line.type === "error"
                  ? "text-danger"
                  : "text-text-secondary"
            }
          >
            {line.type === "input" ? (
              <span>
                <span className="text-ia">renato@portfolio</span>
                <span className="text-text-secondary">:~$ </span>
                {line.text}
              </span>
            ) : (
              <pre className="whitespace-pre-wrap font-mono">{line.text}</pre>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border px-4 py-3"
      >
        <span className="text-ia shrink-0">renato@portfolio</span>
        <span className="text-text-secondary shrink-0">:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal de comandos"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent outline-none text-text caret-ia"
        />
      </form>
    </div>
  );
}
