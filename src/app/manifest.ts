import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Renato Bezerra — Engenheiro de Software",
    short_name: "Renato Bezerra",
    description:
      "Portfólio de Renato Bezerra, Engenheiro de Software. IA aplicada, automação, arquitetura e front-end (React, Angular, Next.js).",
    start_url: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    theme_color: "#000000",
    background_color: "#ffffff",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
