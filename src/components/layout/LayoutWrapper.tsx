"use client";

import { memo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ROTAS_SEM_CHROME = ["/links"];
import Link from "next/link";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useActiveNavLink } from "@/hooks/useActiveNavLink";
import { cn } from "@/lib/utils";
import { Home, FolderOpen, User, FileText, PenLine, Award, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroLoader } from "@/components/fx/IntroLoader";

const NAV_ITEMS = [
  { label: "Início", href: "/", icon: Home },
  { label: "Sobre", href: "/#sobre", icon: User },
  { label: "Projetos", href: "/projetos", icon: FolderOpen },
  { label: "Blog", href: "/blog", icon: PenLine },
  { label: "Currículo", href: "/curriculo", icon: FileText },
  { label: "Certificações", href: "/certificacoes", icon: Award },
];

const Header = memo(function Header({ isIntroFinished }: { isIntroFinished: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isActive, onLinkClick } = useActiveNavLink();

  return (
    <>
      {/* Menu Superior (Desktop e Mobile) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-bg/90 backdrop-blur-md border-b border-border transition-colors duration-300">
        {/* Logo Minimalista */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-text flex items-center"
        >
          {isIntroFinished ? (
            <>
              <motion.span layoutId="navbar-logo-r">R</motion.span>
              <motion.span layoutId="navbar-logo-b">B</motion.span>
              <motion.span layoutId="navbar-logo-dot" className="text-tech">.</motion.span>
            </>
          ) : (
            <span className="opacity-0 flex">
              <span>R</span>
              <span>B</span>
              <span className="text-tech">.</span>
            </span>
          )}
        </Link>

        {/* Links e Toggle (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onLinkClick(item.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-text",
                  isActive(item.href)
                    ? "text-text font-semibold"
                    : "text-text-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle size={18} />
        </div>

        {/* Controles Mobile */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle size={20} />

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center p-2 text-text hover:bg-surface-1 rounded-full transition-colors"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Gaveta do Menu Mobile (Aside) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Gaveta Lateral */}
            <motion.aside
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-bg z-50 shadow-2xl md:hidden flex flex-col transition-colors duration-300"
            >
              {/* Header da Gaveta */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="text-xl font-bold tracking-tighter text-text flex items-center">
                  <span>R</span><span>B</span><span className="text-tech">.</span>
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-surface-1 rounded-full transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={24} className="text-text" />
                </button>
              </div>

              {/* Links de Navegação */}
              <nav className="flex flex-col gap-6 p-6 flex-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onLinkClick(item.href, () => setIsMenuOpen(false))}
                    className={cn(
                      "flex items-center gap-4 text-lg font-medium transition-colors p-2 rounded-xl hover:bg-surface-1",
                      isActive(item.href)
                        ? "text-text font-semibold bg-surface-1"
                        : "text-text-secondary",
                    )}
                  >
                    <item.icon
                      size={20}
                      className={
                        isActive(item.href) ? "text-text" : "text-text-secondary"
                      }
                    />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

const Footer = memo(function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface-1 p-10 text-center text-sm text-text-secondary flex flex-col items-center gap-4 transition-colors duration-300">
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
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  // Check se já tocou a intro nessa sessão (opcional, para não tocar em todo refresh)
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("introPlayed");
    if (hasPlayed) {
      setIsIntroFinished(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIsIntroFinished(true);
    sessionStorage.setItem("introPlayed", "true");
  };

  return (
    <>
      <AnimatePresence>
        {!isIntroFinished && (
          <IntroLoader key="intro-loader" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-bg focus:text-text focus:border focus:border-border focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-soft-2"
      >
        Pular para o conteúdo principal
      </a>
      <SmoothScroll />
      {mostrarChrome && <Header isIntroFinished={isIntroFinished} />}
      <main id="main-content" className="bg-bg text-text min-h-screen">{children}</main>
      {mostrarChrome && <Footer />}
    </>
  );
}
