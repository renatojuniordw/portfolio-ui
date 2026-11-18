import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Há um package-lock.json solto em ~/Developer; sem fixar a raiz, o Next a infere
  // lá e não encontra o tailwindcss.
  outputFileTracingRoot: path.join(__dirname),
  turbopack: { root: path.join(__dirname) },
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projetos/unificando",
        destination: "/projetos/unificando/automacao",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
