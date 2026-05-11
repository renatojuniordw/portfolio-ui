import { ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinkCardProps {
  href: string;
  icon: LucideIcon;
  label: string;
  hoverAccentClass?: string;
}

export function SocialLinkCard({
  href,
  icon: Icon,
  label,
  hoverAccentClass = "group-hover:bg-text",
}: SocialLinkCardProps) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between py-2 text-sm text-text-secondary hover:text-text transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (abre em nova aba)`}
    >
      <span className="flex items-center gap-2">
        <Icon size={16} aria-hidden="true" /> {label}
      </span>
      <span
        className={cn(
          "w-8 h-8 rounded-full bg-text flex items-center justify-center transition-colors",
          hoverAccentClass,
        )}
      >
        <ArrowUpRight className="text-surface-1" size={16} aria-hidden="true" />
      </span>
    </a>
  );
}
