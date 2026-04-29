"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SOCIALS, PROFILE } from "@/lib/constants";
import {
  Instagram,
  Linkedin,
  Github,
  Youtube,
  MessageCircle,
  Zap,
  Bot,
  Home,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";

const LINKS_DATA = [
  {
    title: "Websites Principais",
    items: [
      {
        href: "/",
        icon: Home,
        title: "Portfólio Oficial",
        subtitle: "Conheça minha trajetória e stack técnica",
        variant: "personal" as const,
      },
    ],
  },
  {
    title: "Meus Produtos",
    items: [
      {
        href: SOCIALS.unificando.site,
        icon: Bot,
        title: "Unificando",
        subtitle: "Automação & IA para Atendimento",
        variant: "unificando" as const,
      },
      {
        href: SOCIALS.oferticando.site,
        icon: Zap,
        title: "Oferticando",
        subtitle: "Ofertas & Cupons em tempo real",
        variant: "oferticando" as const,
      },
      {
        href: SOCIALS.barraco.insta,
        icon: Bot,
        title: "Seu Barraco Esperto",
        subtitle: "Smart Home & IoT sem frescura",
        variant: "barraco" as const,
      },
    ],
  },
  {
    title: "Onde me encontrar",
    items: [
      {
        href: SOCIALS.personal.linkedin,
        icon: Linkedin,
        title: "LinkedIn",
        subtitle: "Conexões profissionais e carreira",
        variant: "default" as const,
      },
      {
        href: SOCIALS.personal.github,
        icon: Github,
        title: "GitHub",
        subtitle: "Meus repositórios e projetos open source",
        variant: "default" as const,
      },
      {
        href: SOCIALS.personal.insta,
        icon: Instagram,
        title: "Instagram Pessoal",
        subtitle: "Bastidores e cotidiano",
        variant: "default" as const,
      },
      {
        href: SOCIALS.oferticando.insta,
        icon: Instagram,
        title: "Instagram Oferticando",
        subtitle: "As melhores promoções do dia",
        variant: "oferticando" as const,
      },
    ],
  },
  {
    title: "Canais do Barraco",
    items: [
      {
        href: SOCIALS.barraco.youtube,
        icon: Youtube,
        title: "YouTube",
        subtitle: "Tutoriais de Automação",
        variant: "barraco" as const,
      },
      {
        href: SOCIALS.barraco.tiktok,
        icon: MessageCircle,
        title: "TikTok",
        subtitle: "Dicas rápidas do @seubarracoesperto",
        variant: "barraco" as const,
      },
    ],
  },
];

const LinkItem = ({
  href,
  icon: Icon,
  title,
  subtitle,
  delay = 0,
  variant = "default",
}: {
  href: string;
  icon: any;
  title: string;
  subtitle?: string;
  delay?: number;
  variant?: "default" | "barraco" | "unificando" | "personal" | "oferticando";
}) => {
  const themes = {
    default: "hover:border-[#111111] hover:bg-[#F9F9F9]",
    personal: "hover:border-tech/30 hover:bg-tech/5",
    barraco: "hover:border-barraco/30 hover:bg-barraco/5",
    unificando: "hover:border-ia/30 hover:bg-ia/5",
    oferticando: "hover:border-tech/30 hover:bg-tech/5",
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith("/") ? undefined : "_blank"}
      rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex items-center p-4 rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] shadow-sm transition-all duration-300 ${themes[variant]}`}
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] group-hover:scale-110 transition-transform duration-300">
        <Icon
          size={24}
          className="text-[#111111] group-hover:text-[#111111] transition-colors"
          aria-hidden="true"
        />
      </div>
      <div className="ml-4 flex-grow text-left">
        <h3 className="font-medium text-sm tracking-tight text-[#111111]">{title}</h3>
        {subtitle && (
          <p className="text-xs text-[#666666] line-clamp-1 mt-0.5">{subtitle}</p>
        )}
      </div>
      <ArrowUpRight
        size={18}
        className="text-[#777777] group-hover:text-[#111111] transition-colors"
        aria-hidden="true"
      />
    </motion.a>
  );
};

export function LinksClient() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] relative overflow-hidden flex flex-col items-center py-16 px-6">
      {/* Background Decorative Elements (Subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg aspect-square bg-[#F9F9F9] blur-[120px] rounded-full -z-10" />

      {/* Back to Portfolio Button */}
      <div className="w-full max-w-[480px] mb-8 flex justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#111111]"
        >
          <ArrowLeft size={14} />
          Voltar para o Portfólio
        </Link>
      </div>

      <div className="w-full max-w-[480px] space-y-12 text-center relative z-10">
        {/* Header */}
        <header className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#E5E5E5] bg-[#F9F9F9]"
          >
            <Image
              src="/RenatoBezerra.png"
              alt={PROFILE.name}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              sizes="96px"
            />
          </motion.div>

          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-display font-light tracking-tight text-[#111111]"
            >
              {PROFILE.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs text-[#666666] uppercase tracking-wider"
            >
              {PROFILE.title}
            </motion.p>
          </div>
        </header>

        {/* Links Grid */}
        <main className="space-y-8 pb-10">
          {LINKS_DATA.map((section, sectionIndex) => (
            <section
              key={section.title}
              className="space-y-3"
              aria-labelledby={`section-${sectionIndex}`}
            >
              <h2
                id={`section-${sectionIndex}`}
                className="text-[10px] font-medium uppercase tracking-widest text-[#777777] text-left pl-2"
              >
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.items.map((item, itemIndex) => (
                  <LinkItem
                    key={item.title}
                    {...item}
                    delay={(sectionIndex * 0.1) + (itemIndex * 0.05)}
                  />
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* Footer info */}
        <footer className="pt-4 border-t border-[#E5E5E5]">
          <p className="text-[10px] text-[#777777] tracking-wider uppercase">
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
