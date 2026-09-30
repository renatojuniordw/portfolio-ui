"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide-react";

type Status = "idle" | "copied" | "error";

const MESSAGES: Record<Status, string> = {
  idle: "",
  copied: "Código copiado.",
  error: "Não foi possível copiar. O código foi selecionado: use Ctrl+C ou ⌘C.",
};

/**
 * Bloco de código do artigo com botão de copiar. O conteúdo (já destacado
 * no servidor) é renderizado sem alteração; a cópia usa o texto do <code>,
 * sem botão, markup ou numeração. "Copiado" só aparece depois que a
 * Clipboard API confirma; em falha, o código é selecionado para cópia manual.
 */
export function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), status === "copied" ? 2500 : 6000);
    return () => clearTimeout(timer);
  }, [status]);

  async function copy() {
    const pre = preRef.current;
    if (!pre) return;
    const code = (pre.querySelector("code") ?? pre).textContent ?? "";
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API indisponível");
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      const range = document.createRange();
      range.selectNodeContents(pre.querySelector("code") ?? pre);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      setStatus("error");
    }
  }

  return (
    <div className="code-block relative mb-8">
      <pre ref={preRef} tabIndex={0} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-bg px-3 font-body text-xs font-medium text-text-secondary transition-colors hover:border-text hover:text-text"
      >
        {status === "copied" ? (
          <Check aria-hidden="true" className="h-3.5 w-3.5" />
        ) : (
          <Copy aria-hidden="true" className="h-3.5 w-3.5" />
        )}
        {status === "copied" ? "Copiado" : "Copiar"}
        <span className="sr-only"> código</span>
      </button>
      <p
        role="status"
        aria-live="polite"
        className={status === "error" ? "mt-2 text-sm text-danger" : "sr-only"}
      >
        {MESSAGES[status]}
      </p>
    </div>
  );
}
