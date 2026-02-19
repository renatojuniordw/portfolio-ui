"use client";

import { motion } from "framer-motion";
import { SOCIALS, PROFILE } from "@/lib/constants";
import {
  Instagram,
  Linkedin,
  Github,
  Globe,
  Youtube,
  MessageCircle,
  Zap,
  Bot,
  Home,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

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
  variant?: "default" | "barraco" | "unificando" | "personal";
}) => {
  const themes = {
    default: "hover:border-white/20 hover:bg-white/5",
    personal: "hover:border-tech/30 hover:bg-tech/5",
    barraco: "hover:border-barraco/30 hover:bg-barraco/5",
    unificando: "hover:border-ia/30 hover:bg-ia/5",
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex items-center p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 ${themes[variant]}`}
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300">
        <Icon
          size={24}
          className="text-white/80 group-hover:text-white transition-colors"
        />
      </div>
      <div className="ml-4 flex-grow text-left">
        <h3 className="font-bold text-sm tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-xs text-text-secondary line-clamp-1">{subtitle}</p>
        )}
      </div>
      <ArrowUpRight
        size={18}
        className="text-white/20 group-hover:text-white/60 transition-colors"
      />
    </motion.a>
  );
};

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-bg relative overflow-hidden flex flex-col items-center py-20 px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg aspect-square bg-tech/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md aspect-square bg-barraco/10 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-[480px] space-y-12 text-center">
        {/* Header */}
        <header className="space-y-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full border-4 border-white/5 mx-auto overflow-hidden bg-surface-1 flex items-center justify-center relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-tech/20 to-ia/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-3xl font-bold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent italic">
              RB
            </span>
          </motion.div>
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-display font-bold"
            >
              {PROFILE.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-text-secondary"
            >
              Software Engineer & Criador de Produtos
            </motion.p>
          </div>
        </header>

        {/* Links Grid */}
        <div className="space-y-8 pb-10">
          {/* Main Destination */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Websites Principais
            </h2>
            <LinkItem
              href="/"
              icon={Home}
              title="Portfólio Oficial"
              subtitle="Conheça minha trajetória e stack técnica"
              variant="personal"
            />
          </section>

          {/* Projetos */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Meus Produtos
            </h2>
            <div className="flex flex-col gap-3">
              <LinkItem
                href={SOCIALS.unificando.site}
                icon={Bot}
                title="Unificando"
                subtitle="Automação & IA para Atendimento"
                variant="unificando"
                delay={0.1}
              />
              <LinkItem
                href={SOCIALS.barraco.insta}
                icon={Zap}
                title="Seu Barraco Esperto"
                subtitle="Smart Home & IoT sem frescura"
                variant="barraco"
                delay={0.2}
              />
            </div>
          </section>

          {/* Social Social */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Onde me encontrar
            </h2>
            <div className="flex flex-col gap-3">
              <LinkItem
                href={SOCIALS.personal.linkedin}
                icon={Linkedin}
                title="LinkedIn"
                subtitle="Conexões profissionais e carreira"
                delay={0.3}
              />
              <LinkItem
                href={SOCIALS.personal.github}
                icon={Github}
                title="GitHub"
                subtitle="Meus repositórios e projetos open source"
                delay={0.4}
              />
              <LinkItem
                href={SOCIALS.personal.insta}
                icon={Instagram}
                title="Instagram Pessoal"
                subtitle="Bastidores e cotidiano"
                delay={0.5}
              />
            </div>
          </section>

          {/* Outras Redes Barraco */}
          <section className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted">
              Canais do Barraco
            </h2>
            <div className="flex flex-col gap-3">
              <LinkItem
                href={SOCIALS.barraco.youtube}
                icon={Youtube}
                title="YouTube"
                subtitle="Tutoriais de Automação"
                variant="barraco"
                delay={0.6}
              />
              <LinkItem
                href={SOCIALS.barraco.tiktok}
                icon={MessageCircle} // TikTok icon placeholder
                title="TikTok"
                subtitle="Dicas rápidas do @seubarracoesperto"
                variant="barraco"
                delay={0.7}
              />
            </div>
          </section>
        </div>

        {/* Footer info */}
        <footer className="pt-8">
          <p className="text-[10px] text-muted italic">
            © {new Date().getFullYear()} Renato Bezerra
          </p>
        </footer>
      </div>
    </div>
  );
}
