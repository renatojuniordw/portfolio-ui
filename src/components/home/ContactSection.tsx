import Link from "next/link";
import { SOCIALS } from "@/lib/constants";

export function ContactSection() {
  return (
    <section
      id="contato"
      className="w-full px-8 py-24 lg:py-32 lg:px-24 2xl:px-40 bg-bg relative border-t border-border"
    >
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-sm font-medium text-muted uppercase tracking-widest mb-4 block">
          Vamos trabalhar juntos?
        </span>
        <h2 className="text-4xl lg:text-6xl font-display font-light tracking-tight text-text mb-8">
          Disponível para novos projetos
        </h2>
        <p className="text-xl text-text-secondary font-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Tem uma ideia ou projeto em mente? Entre em contato diretamente pelo WhatsApp para uma resposta rápida.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href={SOCIALS.personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-text text-bg rounded-full font-medium text-base hover:bg-black transition-colors group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-3"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.434 5.633 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>

          <Link
            href="/contato"
            className="inline-flex items-center justify-center px-8 py-4 border border-border text-text rounded-full font-medium text-base hover:border-[#111111] transition-colors group"
          >
            Outras formas de contato
            <span className="ml-3 w-6 h-6 rounded-full bg-text/10 flex items-center justify-center group-hover:bg-text/20 transition-colors">
              <span className="transform -rotate-45 block text-xs text-text">→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
