"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { cn } from "@/lib/utils";

function Header() {
  const pathname = usePathname();
  if (pathname === "/links") return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 bg-transparent">
      <nav className="flex items-center gap-8 rounded-full border border-border bg-s1/50 px-8 py-3 backdrop-blur-md">
        <Link
          href="/"
          className={cn(
            "text-sm font-medium transition-colors hover:text-tech",
            pathname === "/" ? "text-tech" : "text-text-secondary",
          )}
        >
          Início
        </Link>
        <Link
          href="/projetos"
          className={cn(
            "text-sm font-medium transition-colors hover:text-tech",
            pathname.startsWith("/projetos")
              ? "text-tech"
              : "text-text-secondary",
          )}
        >
          Projetos
        </Link>
        <Link
          href="/sobre"
          className={cn(
            "text-sm font-medium transition-colors hover:text-tech",
            pathname === "/sobre" ? "text-tech" : "text-text-secondary",
          )}
        >
          Sobre
        </Link>
        <Link
          href="/curriculo"
          className={cn(
            "text-sm font-medium transition-colors hover:text-tech",
            pathname === "/curriculo" ? "text-tech" : "text-text-secondary",
          )}
        >
          Currículo
        </Link>
        <Link
          href="/contato"
          className={cn(
            "text-sm font-medium transition-colors hover:text-tech",
            pathname === "/contato" ? "text-tech" : "text-text-secondary",
          )}
        >
          Contato
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  const pathname = usePathname();
  if (pathname === "/links") return null;

  return (
    <footer className="mt-20 border-t border-border p-10 text-center text-sm text-text-secondary">
      <p>© {new Date().getFullYear()} Renato Bezerra.</p>
    </footer>
  );
}

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
