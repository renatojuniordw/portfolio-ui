"use client";

import { memo, useCallback } from "react";
import Image from "next/image";

export interface AccordionImageItem {
  id: string;
  title: string;
  imageUrl: string;
}

interface AccordionItemProps {
  item: AccordionImageItem;
  isActive: boolean;
  onActivate: () => void;
}

const AccordionItem = memo(function AccordionItem({
  item,
  isActive,
  onActivate,
}: AccordionItemProps) {
  return (
    <div
      role="tab"
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      aria-label={item.title}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onMouseDown={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className={`
        relative h-[320px] md:h-[420px] rounded-[var(--radius-lg)] overflow-hidden cursor-pointer
        shrink-0 transition-all duration-700 ease-in-out
        border border-border
        ${isActive ? "w-[200px] md:w-[360px]" : "w-[40px] md:w-[56px]"}
      `}
    >
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(min-width: 768px) 360px, 200px"
        loading="lazy"
        className="object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/400x450/1A1A1A/A3A3A3?text=Renato+Bezerra";
        }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div
        className={`
          absolute inset-0 flex
          ${isActive ? "items-end justify-center pb-6" : "items-center justify-center"}
        `}
      >
        <span
          className={`
            text-white text-sm md:text-base font-medium whitespace-nowrap
            transition-all duration-300 ease-in-out
            ${isActive ? "rotate-0" : "rotate-90"}
          `}
        >
          {item.title}
        </span>
      </div>
    </div>
  );
});

interface InteractiveImageAccordionProps {
  items: AccordionImageItem[];
  activeId: string;
  onActiveChange: (id: string) => void;
  className?: string;
}

export function InteractiveImageAccordion({
  items,
  activeId,
  onActiveChange,
  className,
}: InteractiveImageAccordionProps) {
  const handleActivate = useCallback(
    (id: string) => () => onActiveChange(id),
    [onActiveChange],
  );

  return (
    <div
      role="tablist"
      className={`flex flex-row items-center gap-3 md:gap-4 overflow-x-auto p-1 ${className ?? ""}`}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={item.id === activeId}
          onActivate={handleActivate(item.id)}
        />
      ))}
    </div>
  );
}
