import type { Metadata, Viewport } from "next";

import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { getYearsOfExperience } from "@/lib/constants";

import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { EasterEgg } from "@/components/fx/EasterEgg";
import { CommandPaletteLoader } from "@/components/ui/CommandPaletteLoader";
import { MotionProvider } from "@/components/fx/MotionProvider";

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

const INTRO_SCRIPT = `try{if(location.pathname==="/"&&!sessionStorage.getItem("introPlayed")){document.documentElement.dataset.intro="1";sessionStorage.setItem("introPlayed","1")}}catch(e){}`;

export const metadata: Metadata = buildMetadata({
  description:
    `Portfólio de Renato Bezerra, Engenheiro de Software. Foco atual em IA aplicada à engenharia de software e automação, sobre uma base sólida de front-end (React, Angular, Next.js) e arquitetura de software. +${getYearsOfExperience()} anos de experiência.`,
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
      <head>
        <link rel="llms" href="/llms.txt" title="AI Discovery" type="text/plain" />
        {/* Marca a primeira visita à home na sessão para a animação decorativa
            do logo. Roda antes da pintura; falha de storage não quebra nada. */}
        <script
          dangerouslySetInnerHTML={{
            __html: INTRO_SCRIPT,
          }}
        />
      </head>
      <body
        className="antialiased selection:bg-tech/30"
        suppressHydrationWarning
      >
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
        {process.env.NODE_ENV === "production" && (
          <Script id="sw-register" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                const register = () =>
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                if (document.readyState === 'complete') register();
                else window.addEventListener('load', register, { once: true });
              }
            `}
          </Script>
        )}
        <ThemeProvider>
          <MotionProvider>
            <EasterEgg />
            <LayoutWrapper>{children}</LayoutWrapper>
            <CommandPaletteLoader />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
