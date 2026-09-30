export const NAV_ROUTES = [
  { label: "Início", href: "/" },
  { label: "Projetos", href: "/projetos" },
  { label: "Unificando", href: "/unificando" },
  { label: "Blog", href: "/blog" },
  { label: "Currículo", href: "/curriculo" },
  { label: "Certificações", href: "/certificacoes" },
  { label: "Contato", href: "/contato" },
] as const;

export type NavHref = (typeof NAV_ROUTES)[number]["href"];

/** Largura (px) a partir da qual todos os links cabem no cabeçalho. */
export const DESKTOP_NAV_MIN_WIDTH = 1024;
