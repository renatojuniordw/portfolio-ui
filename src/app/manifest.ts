import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Renato Bezerra — Engenheiro de Software",
    short_name: "Renato Bezerra",
    description:
      "Portfólio de Renato Bezerra, Engenheiro de Software especializado em React, Angular, Next.js e IA Generativa. Front-end, automação e arquitetura.",
    start_url: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    theme_color: "#000000",
    background_color: "#ffffff",
    icons: [
      {
        src: "/r_icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/r_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
