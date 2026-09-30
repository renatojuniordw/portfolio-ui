import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Linkedin, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Tag } from "@/components/ui/Tag";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { SOCIALS, PROFILE } from "@/lib/constants";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { formatPostDate, isIsoDate } from "@/lib/dates";
import { TOC_MIN_HEADINGS, extractHeadings, remarkHeadingIds } from "@/lib/markdown-headings";
import { articleJsonLd } from "@/lib/structured-data";
import { linkedinShareUrl, whatsappShareUrl } from "@/lib/share";

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
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
    keywords: post.tags,
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
      className="flex min-h-11 items-center gap-2 px-4 rounded-xl bg-surface-2 border border-border text-text-secondary hover:text-text hover:border-text transition-colors text-sm"
    >
      <Icon aria-hidden="true" className="w-4 h-4" />
      {label}
    </a>
  );
}

function ReadingProgress() {
  return (
    <div aria-hidden="true" className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-border motion-reduce:hidden">
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

  const related = getRelatedPosts(slug);
  const headings = extractHeadings(post.content);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${slug}` },
  ];

  const postUrl = `${SOCIALS.personal.site}/blog/${slug}`;
  const shareText = `${post.title} — por ${PROFILE.name}`;

  return (
    <>
      <ReadingProgress />
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
          <JsonLd
            data={articleJsonLd({
              title: post.title,
              description: post.description,
              url: `${SOCIALS.personal.site}/blog/${slug}`,
              publishedTime: post.date,
              tags: post.tags,
            })}
          />

          <nav aria-label="Breadcrumb" className="mb-12 text-sm font-medium">
            <ol className="flex flex-wrap items-center gap-2 text-text-secondary">
              <li>
                <Link href="/" className="hover:text-text transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                ›
              </li>
              <li>
                <Link href="/blog" className="hover:text-text transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-muted">
                ›
              </li>
              <li aria-current="page" className="text-text line-clamp-1">
                {post.title}
              </li>
            </ol>
          </nav>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-6">
              <time
                dateTime={isIsoDate(post.date) ? post.date : undefined}
                className="flex items-center gap-1.5"
              >
                <Calendar aria-hidden="true" className="w-4 h-4" />
                {formatPostDate(post.date, { day: true })}
              </time>
              <span aria-hidden="true" className="text-muted">·</span>
              <span className="flex items-center gap-1.5">
                <BookOpen aria-hidden="true" className="w-4 h-4" />
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

          {headings.length >= TOC_MIN_HEADINGS && <TableOfContents headings={headings} />}

          <div className="blog-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkHeadingIds]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                pre: ({ node, ...props }) => <CodeBlock {...props} />,
                table: ({ children }) => (
                  <div className="blog-table-wrapper" tabIndex={0} role="region" aria-label="Tabela">
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
                  href={linkedinShareUrl(postUrl)}
                  icon={Linkedin}
                  label="LinkedIn"
                />
                <ShareButton
                  href={whatsappShareUrl(shareText, postUrl)}
                  icon={MessageCircle}
                  label="WhatsApp"
                />
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text transition-colors group shrink-0"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Voltar para o blog
            </Link>
          </div>
        </div>

        {related.posts.length > 0 && (
          <section aria-labelledby="artigos-relacionados" className="max-w-5xl mx-auto mt-24">
            <hr className="border-border mb-12" />
            <h2
              id="artigos-relacionados"
              className="text-xs font-medium text-muted uppercase tracking-widest mb-6"
            >
              {related.kind === "related" ? "Artigos relacionados" : "Outros artigos"}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.posts.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group block h-full p-8 project-card hover:border-text transition-colors"
                  >
                    <time
                      dateTime={isIsoDate(item.date) ? item.date : undefined}
                      className="text-xs text-muted uppercase tracking-widest block mb-3"
                    >
                      {formatPostDate(item.date, { month: "short" })}
                    </time>
                    <h3 className="text-lg font-medium text-text mb-2 group-hover:text-text-secondary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
