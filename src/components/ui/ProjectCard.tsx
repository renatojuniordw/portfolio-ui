import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  category: string;
  link: string;
}

export function ProjectCard({
  index,
  title,
  description,
  category,
  link,
}: ProjectCardProps) {
  return (
    <Link
      href={link}
      className="group relative block bg-surface hover:bg-surface-2 p-8 md:p-10 rounded-xl transition-all duration-300 ease-out border border-border hover:border-text-secondary hover:-translate-y-1"
    >
      <div className="flex flex-col h-full justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-5xl md:text-6xl font-display font-light text-border group-hover:text-muted transition-colors duration-300">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="inline-block px-4 py-1.5 bg-surface-2 text-text text-xs font-medium rounded-full border border-border">
              {category}
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-text leading-tight">
            {title}
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end">
          <div className="w-12 h-12 rounded-full bg-text flex items-center justify-center text-bg group-hover:scale-110 transition-all duration-300">
            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
