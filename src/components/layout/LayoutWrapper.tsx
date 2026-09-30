"use client";

import { memo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  FolderOpen,
  FileText,
  PenLine,
  Award,
  FlaskConical,
  Mail,
  Menu,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ModalDialog } from "@/components/ui/ModalDialog";
import { useActiveNavLink } from "@/hooks/useActiveNavLink";
import { cn } from "@/lib/utils";
import { DESKTOP_NAV_MIN_WIDTH, NAV_ROUTES, type NavHref } from "@/lib/navigation";

const ROTAS_SEM_CHROME = ["/links"];

const NAV_ICONS: Record<NavHref, LucideIcon> = {
  "/": Home,
  "/projetos": FolderOpen,
  "/unificando": FlaskConical,
  "/blog": PenLine,
  "/curriculo": FileText,
  "/certificacoes": Award,
  "/contato": Mail,
};

const NAV_ITEMS = NAV_ROUTES.map((item) => ({
  ...item,
  icon: NAV_ICONS[item.href],
}));

function Logo() {
  return (
    <span className="logo-intro flex items-center" aria-hidden="true">
      <span>R</span>
      <span>B</span>
      <span className="text-tech">.</span>
    </span>
  );
}

const Header = memo(function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const { isActive } = useActiveNavLink();

  // Fecha a gaveta quando a rota muda (inclusive voltar/avançar do navegador).
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
  }

  // Fecha a gaveta ao chegar à largura em que a navegação desktop aparece,
  // evitando um modal invisível bloqueando a página.
  useEffect(() => {
    if (!isMenuOpen) return;
    const query = window.matchMedia(`(min-width: ${DESKTOP_NAV_MIN_WIDTH}px)`);
    const close = () => {
      if (query.matches) setIsMenuOpen(false);
    };
    close();
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-6 px-6 md:px-10 py-2.5 bg-bg/90 backdrop-blur-md border-b border-border transition-colors duration-300">
        <Link
          href="/"
          aria-label="Renato Bezerra — página inicial"
          className="inline-flex min-h-11 items-center text-xl font-bold tracking-tighter text-text transition-opacity hover:opacity-80"
        >
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <nav aria-label="Principal">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex min-h-11 items-center border-b-2 text-sm font-medium transition-colors hover:text-text",
                        active
                          ? "border-text text-text font-semibold"
                          : "border-transparent text-text-secondary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle size={18} />
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle size={20} />
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text transition-colors hover:bg-surface-1"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-haspopup="dialog"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      <ModalDialog
        id="mobile-nav"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title={
          <>
            <span aria-hidden="true" className="text-xl font-bold tracking-tighter">
              RB<span className="text-tech">.</span>
            </span>
            <span className="sr-only">Menu de navegação</span>
          </>
        }
        closeLabel="Fechar menu"
        headerClassName="px-6 py-3"
        className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-xs border-0 border-l border-border bg-bg shadow-2xl open:flex flex-col"
        style={{ "--dialog-from": "translateX(100%)" } as React.CSSProperties}
      >
        <nav aria-label="Principal (menu)" className="flex-1 overflow-y-auto p-6">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-4 rounded-xl border-l-4 p-3 text-lg font-medium transition-colors hover:bg-surface-1",
                      active
                        ? "border-text bg-surface-1 font-semibold text-text"
                        : "border-transparent text-text-secondary",
                    )}
                  >
                    <item.icon size={20} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </ModalDialog>
    </>
  );
});

const Footer = memo(function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface-1 px-6 pt-10 pb-28 text-center text-sm text-text-secondary flex flex-col items-center gap-4 transition-colors duration-300">
      <p>© {new Date().getFullYear()} Renato Bezerra.</p>
    </footer>
  );
});

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const mostrarChrome = !ROTAS_SEM_CHROME.includes(pathname);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-bg focus:text-text focus:border focus:border-border focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-soft-2"
      >
        Pular para o conteúdo principal
      </a>
      {mostrarChrome && <Header />}
      <main id="main-content" tabIndex={-1} className="bg-bg text-text min-h-screen">
        {children}
      </main>
      {mostrarChrome && <Footer />}
    </>
  );
}
