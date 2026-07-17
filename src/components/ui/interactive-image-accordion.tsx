"use client";

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

function AccordionItem({ item, isActive, onActivate }: AccordionItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
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

      <span
        className={`
          absolute text-white text-sm md:text-lg font-medium whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0"
              : "bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 rotate-90"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
}

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
  return (
    <div
      className={`flex flex-row items-center gap-3 md:gap-4 overflow-x-auto p-1 ${className ?? ""}`}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={item.id === activeId}
          onActivate={() => onActiveChange(item.id)}
        />
      ))}
    </div>
  );
}
