"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { cn } from "@/lib/utils";
import {
  Home,
  FolderOpen,
  User,
  FileText,
  Mail,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Início", href: "/", icon: Home },
  { label: "Sobre", href: "/#sobre", icon: User },
  { label: "Projetos", href: "/projetos", icon: FolderOpen },
  { label: "Currículo", href: "/curriculo", icon: FileText },
];

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    // Define o hash inicial
    setActiveHash(window.location.hash);

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  if (pathname === "/links") return null;

  return (
    <>
      {/* Menu Superior (Desktop e Mobile) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-white/90 backdrop-blur-md border-b border-border">
        {/* Logo Minimalista */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-black"
        >
          RB.
        </Link>

        {/* Links Centralizados (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const [itemPath, itemHash] = item.href.split("#");
            const isActive = itemHash
              ? pathname === itemPath && activeHash === `#${itemHash}`
              : item.href === "/"
              ? pathname === "/" && (!activeHash || activeHash === "#")
              : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveHash(itemHash ? `#${itemHash}` : "");
                }}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black",
                  isActive ? "text-black font-semibold" : "text-text-secondary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>



        {/* Botão Hamburger (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex md:hidden items-center justify-center p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white z-50 shadow-2xl md:hidden flex flex-col"
            >
              {/* Header da Gaveta */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="text-xl font-bold tracking-tighter text-black">RB.</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Fechar menu"
                >
                  <X size={24} className="text-black" />
                </button>
              </div>

              {/* Links de Navegação */}
              <nav className="flex flex-col gap-6 p-6 flex-1">
                {NAV_ITEMS.map((item) => {
                  const [itemPath, itemHash] = item.href.split("#");
                  const isActive = itemHash
                    ? pathname === itemPath && activeHash === `#${itemHash}`
                    : item.href === "/"
                    ? pathname === "/" && (!activeHash || activeHash === "#")
                    : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setActiveHash(itemHash ? `#${itemHash}` : "");
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-4 text-lg font-medium transition-colors p-2 rounded-xl hover:bg-gray-50",
                        isActive ? "text-black font-semibold bg-gray-50" : "text-text-secondary"
                      )}
                    >
                      <item.icon
                        size={20}
                        className={isActive ? "text-black" : "text-text-secondary"}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>


            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  const pathname = usePathname();
  if (pathname === "/links") return null;

  return (
    <footer className="mt-20 border-t border-border bg-s1 p-10 text-center text-sm text-text-secondary">
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
      <main className="bg-bg text-text min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
