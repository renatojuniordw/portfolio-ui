import type { Metadata } from "next";

import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";

import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { cn } from "@/lib/utils";

import "./globals.css";

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

import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(inter.variable, spaceGrotesk.variable)}>
      <body className="antialiased selection:bg-tech/30">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
