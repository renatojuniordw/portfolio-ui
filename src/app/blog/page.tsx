import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Tag } from "@/components/ui/Tag";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageLayout } from "@/components/layout/PageLayout";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getAllPosts } from "@/lib/blog";

export const generateMetadata = () =>
  buildMetadata({
    title: "Blog | Renato Bezerra",
    description:
      "Artigos sobre engenharia de software, front-end (React, Angular, Next.js), IA Generativa, automação com n8n, RAG, segurança de LLMs e arquitetura de software por Renato Bezerra.",
    path: "/blog",
    keywords: [
      "Blog", "Engenharia de Software", "React", "Angular", "Next.js",
      "IA Generativa", "Prompt Engineering", "Automação", "n8n",
      "AWS Lambda", "SharePoint", "Tecnologia",
    ],
  });

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const remaining = posts.slice(1);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
  ];

  return (
    <PageLayout maxWidth="5xl">
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />

      <PageHeader
        title="Blog"
        description="Artigos sobre engenharia de software, IA e tecnologia."
        srTitle="Blog - Renato Bezerra"
      />

      {posts.length === 0 ? (
        <p className="text-text-secondary text-lg">
          Nenhum artigo publicado ainda. Volte em breve!
        </p>
      ) : (
        <>
          {featured && (
            <section className="mb-16">
              <span className="text-xs font-medium text-muted uppercase tracking-widest mb-4 block">
                Em destaque
              </span>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block p-8 md:p-12 rounded-2xl bg-surface-2 border border-border hover:border-[#111111] dark:hover:border-white transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-sm text-text-secondary mb-4">
                      <time className="text-muted">
                        {new Date(featured.date).toLocaleDateString("pt-BR", {
                          year: "numeric",
                          month: "long",
                        })}
                      </time>
                      <span className="text-border">·</span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {featured.readingTime} de leitura
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text mb-4 group-hover:text-text-secondary transition-colors">
                      {featured.title}
                    </h2>

                    <p className="text-text-secondary leading-relaxed line-clamp-3 max-w-2xl">
                      {featured.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {featured.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 self-end md:self-center">
                    <span className="flex items-center gap-2 text-sm font-medium text-text group-hover:gap-3 transition-all">
                      Ler artigo
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {remaining.length > 0 && (
            <section>
              <span className="text-xs font-medium text-muted uppercase tracking-widest mb-6 block">
                Mais artigos
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {remaining.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </PageLayout>
  );
}
