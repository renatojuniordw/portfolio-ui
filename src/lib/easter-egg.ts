// Extensão da interface Window para o easter egg
declare global {
  interface Window {
    renato: {
      hire: () => void;
    };
  }
}

export function initEasterEgg() {
  if (typeof window === "undefined") return;

  const ascii = `
%c
██████╗ ███████╗███╗   ██╗ █████╗ ████████╗ ██████╗
██╔══██╗██╔════╝████╗  ██║██╔══██╗╚══██╔══╝██╔═══██╗
██████╔╝█████╗  ██╔██╗ ██║███████║   ██║   ██║   ██║
██╔══██╗██╔══╝  ██║╚██╗██║██╔══██║   ██║   ██║   ██║
██║  ██║███████╗██║ ╚████║██║  ██║   ██║   ╚██████╔╝
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝    ╚═════╝
`;

  const info = `%c
  👋 Oi, curioso(a)!

  Esse portfólio foi construído com:
  ─────────────────────────────────
  ⚛️  Next.js 15 + React 19
  🔷  TypeScript
  🎨  Tailwind CSS v4
  🎭  Framer Motion
  🌐  Vercel (deploy)
  ─────────────────────────────────

  Queres ver mais? Tente rodar:

  %c renato.hire() %c

  no console 👇
`;

  console.log(ascii, "color: #7C3AED; font-family: monospace;");
  console.log(
    info,
    "color: #666; font-family: monospace; font-size: 13px; line-height: 1.6;",
    "background: #111; color: #fff; padding: 2px 6px; border-radius: 4px; font-family: monospace;",
    "color: #666; font-family: monospace;",
  );

  // Injeta função no window — sem cast, pois Window já foi estendida acima
  window.renato = {
    hire: () => {
      console.log(
        "%c\n🚀 Boa escolha! Redirecionando para o LinkedIn...\n",
        "color: #16A34A; font-family: monospace; font-size: 14px;",
      );
      window.open("https://linkedin.com/in/renato-bezerra", "_blank");
    },
  };
}
