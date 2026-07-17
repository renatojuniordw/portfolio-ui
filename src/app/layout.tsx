import type { Metadata, Viewport } from "next";

import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { EasterEgg } from "@/components/fx/EasterEgg";
import { CommandPaletteLoader } from "@/components/ui/CommandPaletteLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  description:
    "Portfólio de Renato Bezerra, Engenheiro de Software especializado em React, Angular, Next.js e IA Generativa. +7 anos de experiência em desenvolvimento front-end, automação com IA e arquitetura de software.",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(inter.variable, spaceGrotesk.variable)}
      suppressHydrationWarning
    >
      <head />
      <body className="antialiased selection:bg-tech/30">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2WSFGQCP27"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2WSFGQCP27');
          `}
        </Script>
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              });
            }
          `}
        </Script>
        <ThemeProvider>
          <EasterEgg />
          <LayoutWrapper>{children}</LayoutWrapper>
          <CommandPaletteLoader />
        </ThemeProvider>
      </body>
    </html>
  );
}
