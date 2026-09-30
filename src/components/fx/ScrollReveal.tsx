"use client";

import { memo, useLayoutEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay em ms antes de iniciar a animação */
  delay?: number;
  /** Direção da animação */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distância do slide em pixels */
  distance?: number;
  /** Duração em segundos */
  duration?: number;
  /** Quanto do elemento deve estar visível antes de disparar (0-1) */
  threshold?: number;
}

/**
 * Revela o conteúdo ao entrar na viewport, como melhoria progressiva:
 * o HTML do servidor é sempre visível. Só depois de montar, e apenas para
 * elementos ainda abaixo da dobra, o componente aplica `.reveal-pending`
 * (oculto) e o remove ao entrar na tela. Sem JS, com movimento reduzido ou
 * sem IntersectionObserver, nada fica oculto.
 */
export const ScrollReveal = memo(function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 0.7,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.remove("reveal-pending");
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      el.classList.remove("reveal-pending");
    };
  }, [threshold]);

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration * 1000}ms`,
    "--reveal-x":
      direction === "left" ? `${distance}px` : direction === "right" ? `${-distance}px` : "0px",
    "--reveal-y":
      direction === "up" ? `${distance}px` : direction === "down" ? `${-distance}px` : "0px",
  } as CSSProperties;

  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
});
