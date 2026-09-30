import { memo } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { formatPostDate, isIsoDate } from "@/lib/dates";
import type { BlogPostSummary } from "@/types/blog";

interface BlogCardProps {
  post: BlogPostSummary;
}

export const BlogCard = memo(function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group p-8 project-card hover:border-text transition-colors duration-300 flex flex-col justify-between min-h-[240px]"
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <time
            dateTime={isIsoDate(post.date) ? post.date : undefined}
            className="text-xs font-medium text-muted uppercase tracking-widest"
          >
            {formatPostDate(post.date, { month: "short" })}
          </time>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <BookOpen aria-hidden="true" className="w-3 h-3" />
            {post.readingTime} de leitura
          </span>
        </div>

        <h3 className="text-xl font-medium text-text mb-3 group-hover:text-text-secondary transition-colors leading-snug">
          {post.title}
        </h3>

        <p className="text-text-secondary leading-relaxed text-sm line-clamp-3">
          {post.description}
        </p>
      </div>

      <div className="flex items-end justify-between mt-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <ArrowCta />
      </div>
    </Link>
  );
});
