"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AccordionImageItem {
  id: string;
  title: string;
  imageUrl: string;
}

interface InteractiveImageAccordionProps {
  items: AccordionImageItem[];
  activeId: string;
  onActiveChange: (id: string) => void;
  /** Rótulo da lista de abas. */
  label: string;
  /** id do tabpanel controlado pelas abas. */
  panelId: string;
  tabId: (id: string) => string;
  className?: string;
}

/**
 * Lista de abas visual (padrão W3C APG "Tabs" com ativação automática).
 * Setas esquerda/direita percorrem as abas, Home/End vão às extremidades;
 * hover é apenas visual e nunca troca a seleção de quem navega por teclado.
 * As imagens são decorativas: título e descrição estão no tabpanel.
 */
export function InteractiveImageAccordion({
  items,
  activeId,
  onActiveChange,
  label,
  panelId,
  tabId,
  className,
}: InteractiveImageAccordionProps) {
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const target = (index + items.length) % items.length;
    tabsRef.current[target]?.focus();
    onActiveChange(items[target].id);
  }

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    focusTab(keys[event.key]);
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      aria-orientation="horizontal"
      className={cn("flex flex-row items-center gap-4 p-1", className)}
    >
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            type="button"
            role="tab"
            id={tabId(item.id)}
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onActiveChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "group relative h-[420px] shrink-0 overflow-hidden rounded-lg border border-border text-left",
              "transition-[width] duration-700 ease-in-out motion-reduce:transition-none",
              isActive ? "w-[260px] xl:w-[360px]" : "w-14",
            )}
          >
            <Image
              src={item.imageUrl}
              alt=""
              fill
              sizes="360px"
              loading="lazy"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-black/55 transition-colors group-hover:bg-black/40"
            />
            <span
              className={cn(
                "absolute inset-0 flex",
                isActive ? "items-end justify-center pb-6" : "items-center justify-center",
              )}
            >
              <span
                className={cn(
                  "text-base font-medium whitespace-nowrap text-white transition-transform duration-300 motion-reduce:transition-none",
                  isActive ? "rotate-0" : "rotate-90",
                )}
              >
                {item.title}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
