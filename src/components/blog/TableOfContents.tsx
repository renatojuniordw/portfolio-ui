import type { PostHeading } from "@/types/blog";
import { cn } from "@/lib/utils";

function TocList({ headings }: { headings: PostHeading[] }) {
  return (
    <ol className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.id} className={cn(heading.depth === 3 && "pl-4")}>
          <a
            href={`#${heading.id}`}
            className="inline-block py-1 text-text-secondary underline-offset-4 hover:text-text hover:underline"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Sumário do artigo: lista no desktop, bloco expansível nativo no mobile. */
export function TableOfContents({ headings }: { headings: PostHeading[] }) {
  return (
    <>
      <nav aria-label="Sumário" className="mb-12 hidden rounded-2xl border border-border p-6 md:block">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
          Neste artigo
        </p>
        <TocList headings={headings} />
      </nav>
      <nav aria-label="Sumário" className="mb-10 md:hidden">
        <details className="rounded-2xl border border-border">
          <summary className="flex min-h-11 cursor-pointer items-center px-5 text-sm font-medium text-text">
            Neste artigo
          </summary>
          <div className="border-t border-border px-5 py-4">
            <TocList headings={headings} />
          </div>
        </details>
      </nav>
    </>
  );
}
