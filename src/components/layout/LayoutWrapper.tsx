"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { cn } from "@/lib/utils";
import { Home, FolderOpen, User, FileText, Mail } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Início", href: "/", icon: Home },
  { label: "Projetos", href: "/projetos", icon: FolderOpen },
  { label: "Sobre", href: "/sobre", icon: User },
  { label: "Currículo", href: "/curriculo", icon: FileText },
  { label: "Contato", href: "/contato", icon: Mail },
];

function Header() {
  const pathname = usePathname();
  if (pathname === "/links") return null;

  return (
    <>
      {/* Menu Desktop: Superior */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-center p-6 bg-transparent">
        <nav className="flex items-center gap-6 rounded-full border border-border bg-white/90 px-8 py-3 backdrop-blur-md shadow-lg shadow-black/5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-bold transition-colors hover:text-tech",
                pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-tech"
                  : "text-text-secondary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Menu Mobile: Dock Inferior Flutuante */}
      <header className="fixed bottom-6 left-0 right-0 z-50 flex md:hidden items-center justify-center px-4">
        <nav className="flex items-center justify-around w-full max-w-sm rounded-[2rem] border-2 border-border bg-white/95 p-2 backdrop-blur-xl shadow-2xl shadow-black/20">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center py-2 px-3 transition-all"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-tech/10 rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon
                  size={24}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-tech" : "text-text-secondary",
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-bold mt-1 uppercase tracking-tighter",
                    isActive ? "text-tech" : "text-text-secondary",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </header>
    </>
  );
}

function Footer() {
  const pathname = usePathname();
  if (pathname === "/links") return null;

  return (
    <footer className="mt-20 border-t border-border bg-s1 p-10 pb-32 md:pb-10 text-center text-sm text-text-secondary">
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
