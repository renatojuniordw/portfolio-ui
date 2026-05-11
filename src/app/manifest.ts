import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Renato Bezerra — Engenheiro de Software",
    short_name: "Renato Bezerra",
    description:
      "Portfólio de Renato Bezerra, Engenheiro de Software especialista em React, Angular e automações com IA.",
    start_url: "/",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
    icons: [
      {
        src: "/r_icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/r_icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
