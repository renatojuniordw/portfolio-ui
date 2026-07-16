import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Linkedin, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { SplitText } from "@/components/fx/SplitText";
import { Tag } from "@/components/ui/Tag";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { SOCIALS, PROFILE } from "@/lib/constants";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return buildMetadata({ title: "Post não encontrado", noIndex: true });
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

function ShareButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Linkedin;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Compartilhar no ${label} (abre em nova aba)`}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-2 border border-border text-text-secondary hover:text-text hover:border-[#111111] dark:hover:border-white transition-all text-sm"
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}

function ReadingProgress() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-border">
      <div
        className="h-full bg-tech origin-left scale-x-0 transition-transform duration-150"
        style={{
          animation: "reading-progress linear",
          animationTimeline: "scroll(root)",
        }}
      />
      <style>{`
        @keyframes reading-progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const relatedPosts = allPosts.filter((_, i) => i !== currentIndex).slice(0, 2);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${slug}` },
  ];

  const postUrl = `${SOCIALS.personal.site}/blog/${slug}`;
  const shareText = encodeURIComponent(`${post.title} — por ${PROFILE.name}`);

  return (
    <>
      <ReadingProgress />
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Voltar para o blog
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-6">
              <time className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {post.readingTime} de leitura
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-text leading-[1.1] mb-6">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </header>

          <div className="blog-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                table: ({ children }) => (
                  <div className="blog-table-wrapper">
                    <table>{children}</table>
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <hr className="border-border my-16" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-sm text-muted uppercase tracking-widest font-medium">
                Compartilhe
              </span>
              <div className="flex gap-3 mt-3">
                <ShareButton
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                  icon={Linkedin}
                  label="LinkedIn"
                />
                <ShareButton
                  href={`https://wa.me/${SOCIALS.personal.whatsapp.replace("https://wa.me/", "")}?text=${shareText}%0A${encodeURIComponent(postUrl)}`}
                  icon={MessageCircle}
                  label="WhatsApp"
                />
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text transition-colors group shrink-0"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Voltar para o blog
            </Link>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="max-w-5xl mx-auto mt-24">
            <hr className="border-border mb-12" />
            <span className="text-xs font-medium text-muted uppercase tracking-widest block mb-6">
              Artigos relacionados
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group p-8 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] dark:hover:border-white transition-all"
                >
                  <time className="text-xs text-muted uppercase tracking-widest block mb-3">
                    {new Date(related.date).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "short",
                    })}
                  </time>
                  <h3 className="text-lg font-medium text-text mb-2 group-hover:text-text-secondary transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
