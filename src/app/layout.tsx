import type { Metadata, Viewport } from "next";

import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Script from "next/script";

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

export const metadata: Metadata = buildMetadata();

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
    <html lang="pt-BR" className={cn(inter.variable, spaceGrotesk.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
