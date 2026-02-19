import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Renato Bezerra | Software Engineer",
  description:
    "Portfolio de Renato Bezerra - Engenheiro de Software focado em Frontend, Automação e IA.",
};

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 bg-transparent">
      <nav className="flex items-center gap-8 rounded-full border border-border bg-s1/50 px-8 py-3 backdrop-blur-md">
        <Link
          href="/"
          className="text-sm font-medium hover:text-tech transition-colors"
        >
          Início
        </Link>
        <Link
          href="/projetos"
          className="text-sm font-medium hover:text-tech transition-colors"
        >
          Projetos
        </Link>
        <Link
          href="/sobre"
          className="text-sm font-medium hover:text-tech transition-colors"
        >
          Sobre
        </Link>
        <Link
          href="/curriculo"
          className="text-sm font-medium hover:text-tech transition-colors"
        >
          Currículo
        </Link>
        <Link
          href="/contato"
          className="text-sm font-medium hover:text-tech transition-colors"
        >
          Contato
        </Link>
      </nav>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(inter.variable, spaceGrotesk.variable)}>
      <body className="antialiased selection:bg-tech/30">
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <footer className="mt-20 border-t border-border p-10 text-center text-sm text-text-secondary">
          <p>
            © {new Date().getFullYear()} Renato Bezerra. Built with Next.js &
            Three.js
          </p>
        </footer>
      </body>
    </html>
  );
}
