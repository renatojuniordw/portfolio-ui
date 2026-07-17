import { memo } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { ArrowCta } from "@/components/ui/ArrowCta";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = memo(function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group p-8 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] dark:hover:border-white transition-colors duration-300 flex flex-col justify-between min-h-[240px]"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <time className="text-xs font-medium text-muted uppercase tracking-widest">
            {new Date(post.date).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "short",
            })}
          </time>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <BookOpen className="w-3 h-3" />
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
