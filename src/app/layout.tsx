import type { Metadata, Viewport } from "next";

import { Inter, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
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
      <body className="antialiased selection:bg-tech/30">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
