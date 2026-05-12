import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Box,
  Cpu,
  ExternalLink,
  FileDigit,
  Github,
  Globe,
  GraduationCap,
  History,
  Home,
  Instagram,
  Layout,
  LayoutDashboard,
  Lock,
  Play,
  Scale,
  Search,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Store,
  Target,
  ShoppingBag,
  Users,
  Zap,
  Combine,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SocialLinkCard } from "@/components/ui/SocialLinkCard";
import { SeuBarracoGallery } from "@/components/projects/SeuBarracoGallery";
import { organizationJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { SOCIALS } from "@/lib/constants";
import type { ProjectCase, ProjectCard } from "@/types/project";

function projectPath(...segments: string[]) {
  return `/projetos/${segments.join("/")}`;
}

function card(
  id: string,
  title: string,
  category: string,
  description: string,
  accent: ProjectCard["accent"],
  techs: string[],
): ProjectCard {
  return { id, title, category, description, accent, techs };
}

export const PROJECT_CASES: ProjectCase[] = [
  {
    id: "unificando-pdf",
    pathSegments: ["unificando", "pdf"],
    card: card(
      "unificando-pdf",
      "Unificando PDF",
      "SaaS & Utilitários",
      "Uma suíte robusta de ferramentas para documentos, com foco em privacidade absoluta e processamento de alto desempenho.",
      "tech",
      ["Next.js", "pdf-lib", "Docker", "Ghostscript"],
    ),
    jsonLd: {
      name: "Unificando PDF",
      description:
        "Plataforma web para processamento de documentos PDF com foco em privacidade e performance.",
      url: `${SOCIALS.personal.site}/projetos/unificando/pdf`,
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Unificando", item: "/projetos/unificando/pdf" },
      { name: "PDF", item: "/projetos/unificando/pdf" },
    ],
    categoryBadge: "SaaS & Utilitários",
    title: "Unificando PDF: Privacidade & Produtividade",
    shortDescription: (
      <>
        Uma suíte online completa para <strong>manipulação de PDFs</strong>{" "}
        focada em <strong>privacidade e performance</strong>. Processamento
        seguro diretamente no navegador e em servidores otimizados, sem
        necessidade de cadastro.
      </>
    ),
    themeColor: "tech",
    liveUrl: SOCIALS.unificando.pdf,
    githubUrl: "https://github.com/renatojuniordw/pdf-unificando",
    overviewTitle: "Intenção do Projeto",
    overviewContent: (
      <div className="space-y-4">
        <p>
          O <strong>Unificando PDF</strong> nasceu para resolver uma necessidade
          real de produtividade documental com uma experiência rápida, acessível
          e, acima de tudo, segura. A proposta é oferecer ferramentas
          profissionais de forma gratuita, onde os arquivos são processados de
          forma <strong>efêmera</strong> e descartados imediatamente após o uso.
        </p>
        <p>
          Além da utilidade prática, o projeto funciona como uma vitrine técnica
          de domínio em{" "}
          <strong>processamento de arquivos em larga escala</strong>,
          arquitetura full-stack moderna e cuidados rigorosos com segurança e
          infraestrutura em contêineres.
        </p>
      </div>
    ),
    featuresTitle: "Ferramentas Integradas",
    features: [
      {
        icon: <Zap className="text-tech" size={24} />,
        title: "Alta Performance",
        description:
          "Compressão e conversão otimizadas para arquivos pesados, mantendo a qualidade visual.",
      },
      {
        icon: <Lock className="text-tech" size={24} />,
        title: "Proteção Total",
        description:
          "Adicione senhas, restrinja permissões e oculte informações sensíveis com segurança.",
      },
      {
        icon: <Combine className="text-tech" size={24} />,
        title: "Edição Flexível",
        description:
          "Junte, divida, extraia, organize e rotacione páginas com uma interface drag-and-drop intuitiva.",
      },
      {
        icon: <FileDigit className="text-tech" size={24} />,
        title: "Conversão Inteligente",
        description:
          "Transforme PDFs em Word, texto, imagens (JPG/PNG) e Markdown, ou una JPGs em PDF com alta fidelidade.",
      },
    ],
    extraSections: [
      {
        id: "technical-excellence",
        icon: <ShieldCheck className="text-tech" />,
        title: "Excelência Técnica & Segurança",
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text">
                Processamento Efêmero
              </h3>
              <p className="text-sm">
                Implementação de uma camada de processamento temporário em{" "}
                <code>/tmp</code> com limpeza automatizada. Garantimos que
                nenhum dado sensível persista nos servidores após o download do
                usuário.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text">
                Infraestrutura Blindada
              </h3>
              <p className="text-sm">
                Container de produção configurado com usuário{" "}
                <code>non-root</code>, sistema de arquivos{" "}
                <code>read_only</code> e limites rígidos de recursos (CPU/RAM)
                via Docker para evitar abusos e garantir estabilidade.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text">Engine Híbrida</h3>
              <p className="text-sm">
                Orquestração entre bibliotecas TypeScript (<code>pdf-lib</code>)
                para manipulação rápida e binários nativos (
                <code>Ghostscript</code>, <code>qpdf</code>) para operações
                avançadas e complexas.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text">
                Controle de Concorrência
              </h3>
              <p className="text-sm">
                Uso de <code>p-limit</code> e filas de processamento no Node.js
                para gerenciar picos de tráfego sem comprometer a latência do
                sistema.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "stack-details",
        icon: <Box className="text-tech" />,
        title: "Operações Suportadas",
        content: (
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm list-disc list-inside">
            <li>Comprimir PDF</li>
            <li>Juntar PDF</li>
            <li>Dividir PDF</li>
            <li>Extrair Páginas</li>
            <li>PDF para Word</li>
            <li>PDF para TXT</li>
            <li>PDF para JPG</li>
            <li>JPG para PDF</li>
            <li>Rodar PDF</li>
            <li>Organizar PDF</li>
            <li>Proteger PDF</li>
            <li>Marca d&apos;Água</li>
            <li>Numerar Páginas</li>
            <li>PDF para PNG</li>
            <li>Censurar PDF</li>
            <li>PDF para Markdown</li>
          </ul>
        ),
      },
    ],
    sidebarTechStackTitle: "Tecnologias Utilizadas",
    sidebarTechStack: [
      { label: "Framework", name: "Next.js 16 (App Router)" },
      { label: "Frontend", name: "React 19 & Framer Motion" },
      { label: "Styling", name: "Tailwind CSS 4" },
      { label: "Core PDF", name: "pdf-lib & pdfjs-dist" },
      { label: "Image Processing", name: "Sharp & Canvas" },
      { label: "Infrastructure", name: "Docker & Docker Compose" },
      { label: "Native Tools", name: "Ghostscript, Poppler, qpdf" },
    ],
  },
  {
    id: "unificando-automacao",
    pathSegments: ["unificando", "automacao"],
    schemas: [organizationJsonLd()],
    card: card(
      "unificando-automacao",
      "Unificando: IA & Automação",
      "Inteligência Artificial",
      "Engine de atendimento distribuído, orquestração de LLMs e automação de fluxos via n8n.",
      "ia",
      ["n8n", "OpenAI", "Node.js", "AWS Lambda"],
    ),
    jsonLd: {
      name: "Unificando - Automação & IA",
      description:
        "Ecossistema de atendimento inteligente com orquestração de LLMs e automação de processos via n8n.",
      url: `${SOCIALS.personal.site}/projetos/unificando/automacao`,
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Unificando", item: "/projetos/unificando/automacao" },
      { name: "Automação", item: "/projetos/unificando/automacao" },
    ],
    categoryBadge: "IA & Automação",
    title: "Unificando: IA & Automação",
    shortDescription: (
      <>
        Ecossistema completo de <strong>atendimento inteligente</strong> para
        redes sociais, transformando <strong>caixa de entrada unificada</strong>{" "}
        em conversões reais com <strong>automação com IA</strong>.
      </>
    ),
    themeColor: "ia",
    liveUrl: SOCIALS.unificando.site,
    overviewTitle: "O Desafio Técnico: Atendimento WhatsApp",
    overviewContent: (
      <p>
        O desafio central do <strong>Unificando</strong> foi criar um{" "}
        <strong>painel de atendimento</strong> que não apenas respondesse
        usuários, mas que entendesse a intenção de compra, calculasse orçamentos
        em tempo real no <strong>atendimento WhatsApp</strong> e soubesse o
        momento exato de transferir para um humano.
      </p>
    ),
    extraSections: [
      {
        id: "tech-highlights-title",
        icon: <Cpu className="text-ia" aria-hidden="true" />,
        title: "Inteligência de Decisão",
        content: (
          <>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text">
                Roteamento Inteligente (Triage Agent)
              </h3>
              <p>
                Desenvolvi um agente de triagem baseado em LLM que classifica
                intenções (Lead, FAQ, Pricing, Human) em milissegundos, para um{" "}
                <strong>atendimento WhatsApp com IA</strong> mais fluido.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text">
                Arquitetura Dual-Agent
              </h3>
              <p>
                Implementação de sub-agentes especializados que consultam bases
                de conhecimento dinâmicas, reduzindo a carga do suporte humano
                através da <strong>automação com IA</strong>.
              </p>
            </div>
          </>
        ),
      },
    ],
    sidebarTechStackTitle: "Tech Stack",
    sidebarTechStack: [
      { label: "Orchestration", name: "n8n" },
      { label: "AI Engine", name: "OpenAI (GPT-4)" },
      { label: "Database", name: "Supabase" },
    ],
    sidebarExtraCards: [
      {
        icon: (
          <Layout size={20} className="text-tech mr-2" aria-hidden="true" />
        ),
        title: "Vitrine Digital",
        content: (
          <>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Interessado na experiência visual e na calculadora de serviços
              deste projeto?
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full"
              asChild
            >
              <a href={projectPath("unificando", "vitrine")}>
                Ver Vitrine Digital <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </>
        ),
      },
    ],
  },
  {
    id: "unificando-vitrine",
    pathSegments: ["unificando", "vitrine"],
    card: card(
      "unificando-vitrine",
      "Unificando: Vitrine Digital",
      "Branding & Conversão",
      "Site institucional interativo com foco em autoridade de marca e calculadora de planos em tempo real.",
      "tech",
      ["Next.js", "React", "TypeScript", "Tailwind"],
    ),
    jsonLd: {
      name: "Unificando - Vitrine Digital",
      description:
        "Desenvolvimento de site institucional interativo com calculadora de planos e foco em conversão e branding.",
      url: `${SOCIALS.personal.site}/projetos/unificando/vitrine`,
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Unificando", item: "/projetos/unificando/automacao" },
      { name: "Vitrine Digital", item: "/projetos/unificando/vitrine" },
    ],
    categoryBadge: "Branding & Conversion Case",
    title: "Unificando: Vitrine Digital",
    shortDescription: (
      <>
        Criação de uma <strong>experiência de marca</strong> focada em{" "}
        <strong>conversão</strong>, unindo design premium a uma{" "}
        <strong>calculadora de serviços interativa</strong>.
      </>
    ),
    themeColor: "tech",
    liveUrl: SOCIALS.unificando.site,
    overviewTitle: "O Desafio da Conversão",
    overviewContent: (
      <>
        <p>
          O site do <strong>Unificando</strong> foi projetado para ser a face
          digital de um ecossistema de atendimento. Ele funciona como uma{" "}
          <strong>vitrine interativa</strong> onde o usuário pode simular
          cenários e entender custos.
        </p>
        <p>
          A tecnologia (React 19 + Vite 6) garante autoridade através de{" "}
          <strong>performance absoluta</strong>.
        </p>
      </>
    ),
    featuresTitle: "Destaques da Experiência",
    features: [
      {
        icon: <Cpu className="text-tech" />,
        title: "Simulador de Planos",
        description:
          "Sistema dinâmico para configurar soluções e visualizar orçamentos na hora.",
      },
      {
        icon: <Store className="text-tech" />,
        title: "Brand Authority",
        description:
          "Design visual 'Tech-Clean' que posiciona a marca como referência tecnológica.",
      },
    ],
    extraSections: [
      {
        id: "technical-results",
        title: "Resultados Técnicos",
        content: (
          <>
            <p className="text-text-secondary">
              Utilizando <strong>React 19</strong>, o site atinge pontuações
              máximas em <strong>Core Web Vitals</strong>.
            </p>
            <div className="pt-4 mt-6 border-t border-tech/20">
              <p className="text-sm text-text-secondary italic mb-3">
                Quer saber sobre a Engenharia de IA por trás da marca?
              </p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                asChild
              >
                <a href={projectPath("unificando", "automacao")}>
                  Ver Case de Automação & IA{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </>
        ),
      },
    ],
    sidebarTechStackTitle: "Stack Tecnológica",
    sidebarTechStack: [
      { label: "Core", name: "React 19 / TS 5.8" },
      { label: "Styling", name: "Tailwind CSS 4" },
      { label: "Build Tool", name: "Vite 6" },
    ],
    sidebarExtraCards: [
      {
        icon: <Globe size={20} className="text-tech mr-2" />,
        title: "Links",
        content: (
          <nav className="flex flex-col gap-3">
            <SocialLinkCard
              href={SOCIALS.unificando.site}
              icon={Globe}
              label="Website Oficial"
              hoverAccentClass="group-hover:bg-tech"
            />
            <SocialLinkCard
              href="https://github.com/renatojuniordw/ui-unificando"
              icon={Github}
              label="Repositório GitHub"
              hoverAccentClass="group-hover:bg-tech"
            />
          </nav>
        ),
      },
    ],
  },
  {
    id: "mariaclarasantos",
    pathSegments: ["mariaclarasantos"],
    card: card(
      "mariaclarasantos",
      "Maria Clara Santos",
      "Web Performance / Jurídico",
      "Landing page de alta conversão para advocacia com sistema de anti-golpe integrado.",
      "tech",
      ["Next.js", "React", "SEO", "Performance"],
    ),
    jsonLd: {
      name: "Maria Clara Santos Advocacia",
      description:
        "Landing page de alta conversão para advocacia previdenciária com foco em segurança digital.",
      url: `${SOCIALS.personal.site}/projetos/mariaclarasantos`,
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Maria Clara Santos", item: "/projetos/mariaclarasantos" },
    ],
    categoryBadge: "Freelance / Institucional",
    title: "Maria Clara Santos",
    shortDescription: (
      <>
        <strong>Criação de site profissional</strong> de alta conversão para
        advocacia previdenciária, com foco em segurança digital e{" "}
        <strong>SEO jurídico em Recife</strong>.
      </>
    ),
    themeColor: "tech",
    liveUrl: "https://mariaclarasantos.adv.br/",
    overviewTitle: "O Desafio",
    overviewContent: (
      <>
        <p>
          O objetivo era criar uma presença digital robusta para a Dra. Maria
          Clara Santos, especialista em Direito Previdenciário. A página
          precisava transmitir{" "}
          <strong>autoridade, seriedade e acolhimento</strong>, pontos cruciais
          para quem busca benefícios do INSS em <strong>Recife</strong>.
        </p>
        <p>
          Além da apresentação institucional, implementamos uma funcionalidade
          técnica estratégica para o setor jurídico: um sistema de validação de
          canais oficiais para proteção contra golpes.
        </p>
      </>
    ),
    featuresTitle: "Foco Estratégico",
    features: [
      {
        icon: <Search className="text-tech" aria-hidden="true" />,
        title: "SEO Jurídico",
        description:
          "Estrutura otimizada para buscas locais em Recife e termos específicos do Direito Previdenciário.",
      },
      {
        icon: <Users className="text-tech" aria-hidden="true" />,
        title: "UX Humanizada",
        description:
          "Interface limpa e acessível, pensada para o público que busca auxílios e aposentadorias.",
      },
      {
        icon: <ShieldCheck className="text-tech" aria-hidden="true" />,
        title: "Segurança de Dados",
        description:
          "Implementação de práticas de proteção de dados e alertas de transparência.",
      },
      {
        icon: <Scale className="text-tech" aria-hidden="true" />,
        title: "Conversão Direta",
        description:
          "CTA estratégico integrado ao WhatsApp para agilizar o atendimento inicial.",
      },
    ],
    extraSections: [
      {
        id: "security",
        icon: <Lock className="text-tech" aria-hidden="true" />,
        title: "Inovação em Segurança",
        content: (
          <p>
            Desenvolvi um sistema de{" "}
            <strong>Verificação de Contato Oficial</strong>. O cliente pode
            digitar o número de telefone que o contatou e o site valida
            instantaneamente se aquele canal pertence ao escritório, reduzindo
            drasticamente o risco de fraudes.
          </p>
        ),
      },
    ],
    sidebarTechStackTitle: "Solução Técnica",
    sidebarTechStack: [
      { label: "Framework", name: "React 19 / Next.js 15+" },
      { label: "UI Components", name: "PrimeReact" },
      { label: "Styling", name: "SASS / SCSS" },
      { label: "Forms & Validation", name: "React Hook Form" },
    ],
    sidebarExtraCards: [
      {
        icon: <Globe size={20} className="text-tech" aria-hidden="true" />,
        title: "Links",
        content: (
          <nav className="flex flex-col gap-3">
            <SocialLinkCard
              href="https://mariaclarasantos.adv.br/"
              icon={Globe}
              label="Website Oficial"
              hoverAccentClass="group-hover:bg-tech"
            />
            <SocialLinkCard
              href="https://github.com/renatojuniordw/portfolio-maria-clara"
              icon={Github}
              label="Repositório GitHub"
              hoverAccentClass="group-hover:bg-tech"
            />
          </nav>
        ),
      },
    ],
  },
  {
    id: "seu-barraco-esperto",
    pathSegments: ["seu-barraco-esperto"],
    schemas: [serviceJsonLd()],
    card: card(
      "seu-barraco-esperto",
      "Seu Barraco Esperto",
      "IoT / Automação Residencial",
      "Automação residencial prática e sem frescura com Alexa e IoT.",
      "barraco",
      ["IoT", "Alexa Skills", "Node.js", "AWS"],
    ),
    jsonLd: {
      name: "Seu Barraco Esperto",
      description:
        "Projeto focado em automação residencial acessível e casa inteligente com Alexa em Recife.",
      url: `${SOCIALS.personal.site}/projetos/seu-barraco-esperto`,
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Seu Barraco Esperto", item: "/projetos/seu-barraco-esperto" },
    ],
    categoryBadge: "IoT & Automação Residencial",
    title: "Seu Barraco Esperto",
    shortDescription: (
      <>
        <strong>Automação residencial</strong> prática, acessível e sem frescura
        para transformar qualquer casa em uma <strong>casa inteligente</strong>{" "}
        em Recife.
      </>
    ),
    themeColor: "barraco",
    liveUrl: SOCIALS.barraco.insta,
    overviewTitle: "O Conceito: Automação com Alexa",
    overviewContent: (
      <>
        <p>
          O <strong>Seu Barraco Esperto</strong> nasceu para desmistificar a
          ideia de que <strong>automação residencial</strong> é algo caro ou
          extremamente complexo.
        </p>
        <p>
          O foco é utilizar dispositivos acessíveis (como <strong>Alexa</strong>
          , Tuya e Sonoff) para criar soluções de{" "}
          <strong>casa inteligente</strong> que realmente facilitam o dia a dia:
          desde controle de iluminação inteligente até monitoramento de
          segurança e economia de energia em <strong>Recife</strong>.
        </p>
      </>
    ),
    featuresTitle: "Pilares do Projeto",
    features: [
      {
        icon: <Home className="text-barraco" aria-hidden="true" />,
        title: "Acessibilidade",
        description:
          "Uso de hardware custo-benefício que qualquer pessoa pode configurar para sua casa inteligente.",
      },
      {
        icon: <Zap className="text-barraco" aria-hidden="true" />,
        title: "Integração Total",
        description:
          "Conectividade avançada entre Alexa e hubs de automação residencial.",
      },
      {
        icon: <Smartphone className="text-barraco" aria-hidden="true" />,
        title: "Controle Remoto",
        description:
          "Gerenciamento completo da casa inteligente de qualquer lugar do mundo via app.",
      },
      {
        icon: <ShieldCheck className="text-barraco" aria-hidden="true" />,
        title: "Segurança",
        description:
          "Monitoramento inteligente e automações de presença para seu barraco esperto.",
      },
    ],
    extraSections: [
      {
        id: "videos-title",
        icon: <Play className="text-barraco" aria-hidden="true" />,
        title: "Na Prática",
        content: <SeuBarracoGallery />,
      },
    ],
    sidebarTechStackTitle: "Tecnologias",
    sidebarTechStack: [
      { label: "Ecosystem", name: "Alexa" },
      { label: "Hardware", name: "Tuya / Sonoff" },
      { label: "Central Hub", name: "Home Assistant" },
    ],
    sidebarExtraCards: [
      {
        icon: (
          <Globe size={20} className="text-barraco mr-2" aria-hidden="true" />
        ),
        title: "Presença Online",
        content: (
          <nav className="flex flex-col gap-3">
            <SocialLinkCard
              href={SOCIALS.barraco.insta}
              icon={ExternalLink}
              label="Instagram"
              hoverAccentClass="group-hover:bg-barraco"
            />
            <SocialLinkCard
              href={SOCIALS.barraco.youtube}
              icon={ExternalLink}
              label="YouTube"
              hoverAccentClass="group-hover:bg-barraco"
            />
            <SocialLinkCard
              href={SOCIALS.barraco.tiktok}
              icon={ExternalLink}
              label="TikTok"
              hoverAccentClass="group-hover:bg-barraco"
            />
          </nav>
        ),
      },
    ],
  },
  {
    id: "oferticando",
    pathSegments: ["oferticando"],
    card: card(
      "oferticando",
      "Oferticando",
      "E-commerce / Afiliados",
      "Plataforma de ofertas e cupons com painéis administrativos e de afiliados, busca performática e extração automática de dados.",
      "tech",
      ["Angular", "Node.js", "PostgreSQL", "Docker"],
    ),
    jsonLd: {
      name: "Oferticando - Plataforma de Ofertas & Cupons",
      description:
        "Plataforma completa de centralização, publicação e gestão de promoções com painéis administrativos e de afiliados.",
      url: `${SOCIALS.personal.site}/projetos/oferticando`,
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Oferticando", item: "/projetos/oferticando" },
    ],
    categoryBadge: "E-commerce / Afiliados",
    title: "Oferticando: Ofertas & Cupons",
    shortDescription: (
      <>
        Frontend de alto desempenho para uma plataforma de{" "}
        <strong>ofertas e cupons</strong>, focada em escalabilidade,{" "}
        <strong>gestão de afiliados</strong> e experiência de usuário fluida.
      </>
    ),
    themeColor: "tech",
    liveUrl: SOCIALS.oferticando.site,
    overviewTitle: "O Projeto",
    overviewContent: (
      <>
        <p>
          O <strong>Oferticando</strong> nasceu da necessidade de centralizar a
          publicação e gestão de promoções. A plataforma foi estruturada em três
          pilares fundamentais:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Área Pública:</strong> Feed dinâmico com busca e scroll
            virtualizado para descoberta rápida de ofertas.
          </li>
          <li>
            <strong>Área de Afiliado:</strong> Painel dedicado para usuários
            criarem e gerenciarem suas próprias promoções.
          </li>
          <li>
            <strong>Área Administrativa:</strong> Controle total sobre ofertas,
            usuários, lojas e vitrines da plataforma.
          </li>
        </ul>
      </>
    ),
    featuresTitle: "Funcionalidades Principais",
    features: [
      {
        icon: <Search className="text-tech" size={24} />,
        title: "Feed Inteligente",
        description:
          "Busca em tempo real e scroll virtualizado para performance extrema em listas longas.",
      },
      {
        icon: <Zap className="text-tech" size={24} />,
        title: "Extração Automática",
        description:
          "Cadastro de ofertas simplificado com extração automática de dados via LinkPreview.",
      },
      {
        icon: <ShieldCheck className="text-tech" size={24} />,
        title: "Controle de Acesso",
        description:
          "Segurança robusta com JWT (jose) e middleware de rota para diferentes perfis (Admin/User).",
      },
      {
        icon: <LayoutDashboard className="text-tech" size={24} />,
        title: "Dashboard de Métricas",
        description:
          "Painel administrativo intuitivo para acompanhamento de KPIs e gestão de conteúdo.",
      },
    ],
    extraSections: [
      {
        id: "tech-highlights-title",
        icon: <Cpu className="text-tech" aria-hidden="true" />,
        title: "Diferenciais de Engenharia",
        content: (
          <>
            <div className="space-y-2 text-lg">
              <h3 className="text-lg font-bold text-text">
                Next.js 15 & React 19
              </h3>
              <p>
                Utilização das versões mais recentes do ecossistema React,
                aproveitando o App Router e os novos padrões de renderização
                para SEO e performance.
              </p>
            </div>
            <div className="space-y-2 text-lg">
              <h3 className="text-lg font-bold text-text">
                Design Moderno com Tailwind 4 & PrimeReact
              </h3>
              <p>
                Combinação da flexibilidade do Tailwind CSS 4 com a robustez dos
                componentes do PrimeReact, garantindo uma UI premium e
                acessível.
              </p>
            </div>
            <div className="space-y-2 text-lg">
              <h3 className="text-lg font-bold text-text">
                Infraestrutura com Docker
              </h3>
              <p>
                Ambiente conteinerizado com Docker multi-stage para builds
                otimizados e facilidade de deploy via docker-compose.
              </p>
            </div>
          </>
        ),
      },
    ],
    sidebarTechStackTitle: "Tech Stack",
    sidebarTechStack: [
      { label: "Framework", name: "Next.js 15 (App Router)" },
      { label: "Linguagem/Lib", name: "React 19 + TypeScript" },
      { label: "UI/Styling", name: "PrimeReact + Tailwind 4" },
      { label: "Forms", name: "React Hook Form" },
      { label: "HTTP Client", name: "Axios + Interceptors" },
      { label: "Auth & Security", name: "JWT (jose) + Middleware" },
      { label: "DevOps", name: "Docker + Docker Compose" },
    ],
    sidebarExtraCards: [
      {
        icon: (
          <ShoppingBag
            size={20}
            className="text-tech mr-2"
            aria-hidden="true"
          />
        ),
        title: "Monetização",
        content: (
          <p>
            Plataforma preparada para monetização via{" "}
            <strong>Google AdSense</strong>, incluindo configuração de ads.txt e
            componentes dedicados para banners.
          </p>
        ),
      },
    ],
  },
  {
    id: "ariano-suassuna",
    pathSegments: ["ariano-suassuna"],
    card: card(
      "ariano-suassuna",
      "Ariano Suassuna - Tributo",
      "Educacional / Cultura",
      "Site educacional sobre a vida e obra de Ariano Suassuna, originado em 2016 no CRC Recife como um esforço da comunidade para preservar sua memória.",
      "tech",
      ["HTML", "CSS", "JavaScript"],
    ),
    jsonLd: {
      name: "Ariano Suassuna - Tributo",
      description:
        "Site educacional sobre a vida e obra de Ariano Suassuna, originado de um projeto estudantil em 2016 e mantido como esforço da comunidade.",
      url: `${SOCIALS.personal.site}/projetos/ariano-suassuna`,
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Ariano Suassuna", item: "/projetos/ariano-suassuna" },
    ],
    categoryBadge: "Educacional / Cultura",
    title: "Ariano Suassuna: Tributo",
    shortDescription: (
      <>
        Site educacional e colaborativo dedicado à vida e obra de{" "}
        <strong>Ariano Suassuna</strong>, preservando a cultura e memória
        nordestina na web.
      </>
    ),
    themeColor: "tech",
    githubUrl: "https://github.com/renatojuniordw/ui-ariano-suassuna",
    liveUrl: "https://ariano-suassuna.unificando.com.br/",
    overviewTitle: "O Projeto & História",
    overviewContent: (
      <>
        <p>
          A aplicação nasceu de um esforço estudantil colaborativo em{" "}
          <strong>2016</strong>, durante um curso no <strong>CRC Recife</strong>
          . Desde então, a plataforma evoluiu para se tornar um acervo digital
          mantido pela comunidade.
        </p>
        <p>
          O principal objetivo deste site é garantir que as gerações futuras
          tenham acesso facilitado e estruturado às contribuições literárias,
          teatrais e filosóficas de Ariano, promovendo a rica cultura do
          Nordeste brasileiro.
        </p>
      </>
    ),
    featuresTitle: "Pilares do Tributo",
    features: [
      {
        icon: <History className="text-tech" size={24} />,
        title: "Preservação Histórica",
        description:
          "Acervo digital detalhado sobre a vida, obra e impacto cultural do autor na literatura e dramaturgia.",
      },
      {
        icon: <BookOpen className="text-tech" size={24} />,
        title: "Foco Educacional",
        description:
          "Conteúdo estruturado e acessível, ideal para estudantes, professores e pesquisadores da cultura nordestina.",
      },
      {
        icon: <GraduationCap className="text-tech" size={24} />,
        title: "Origem Acadêmica",
        description:
          "Nascido em sala de aula no CRC Recife em 2016, refletindo o trabalho e dedicação de alunos em tecnologia.",
      },
      {
        icon: <ShieldAlert className="text-tech" size={24} />,
        title: "Transparência",
        description:
          "Iniciativa sem fins lucrativos e 100% não oficial. Sem vínculos institucionais com a família ou editores.",
      },
    ],
    sidebarTechStackTitle: "Detalhes",
    sidebarTechStack: [
      { label: "Início", name: "2016 (CRC Recife)" },
      { label: "Natureza", name: "Tributo / Acervo" },
      { label: "Stack (Atual)", name: "React / Vite" },
    ],
    sidebarExtraCards: [
      {
        icon: (
          <ShieldAlert size={20} className="text-tech" aria-hidden="true" />
        ),
        title: "Aviso Legal",
        content: (
          <p>
            Este é um site de caráter puramente{" "}
            <strong>educacional e de fã</strong>. Não possui qualquer vínculo
            oficial com os herdeiros, representantes legais ou editoras das
            obras de Ariano Suassuna.
          </p>
        ),
      },
    ],
  },
  {
    id: "sheik",
    pathSegments: ["sheik"],
    card: card(
      "sheik",
      "Diego Sheik - Mídia Kit",
      "Mídia & Influência",
      "Mídia kit interativo com insights de audiência, formatos de parceria e métricas reais de Instagram para marcas.",
      "tech",
      ["React", "Next.js", "Framer Motion"],
    ),
    jsonLd: {
      name: "Diego Sheik - Mídia Kit",
      description:
        "Mídia kit dinâmico com insights de audiência e métricas em tempo real focado na atração de marcas e patrocínios.",
      url: "https://sheik.unificando.com.br/",
    },
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "Projetos", item: "/projetos" },
      { name: "Diego Sheik", item: "/projetos/sheik" },
    ],
    categoryBadge: "Mídia & Influência",
    title: "Diego Sheik: Mídia Kit",
    shortDescription: (
      <>
        Mídia kit interativo projetado para o criador de conteúdo{" "}
        <strong>Diego Sheik</strong>, destacando métricas de audiência, formatos
        de parceria e engajamento no Instagram.
      </>
    ),
    themeColor: "tech",
    githubUrl: "https://github.com/renatojuniordw/sheik-mediakit",
    liveUrl: "https://sheik.unificando.com.br/",
    overviewTitle: "O Projeto",
    overviewContent: (
      <>
        <p>
          Criadores de conteúdo precisam de materiais profissionais para
          apresentar seus números a marcas e agências. O objetivo deste projeto
          foi desenvolver um <strong>Mídia Kit digital e interativo</strong>,
          substituindo os tradicionais e estáticos PDFs por uma experiência
          imersiva e sempre atualizada.
        </p>
        <p>
          A aplicação foca em expor de maneira clara o perfil da audiência,
          insights de alcance e os principais pacotes de parceria comercial que
          o influenciador oferece.
        </p>
      </>
    ),
    featuresTitle: "Destaques da Plataforma",
    features: [
      {
        icon: <BarChart3 className="text-tech" size={24} />,
        title: "Métricas e Insights",
        description:
          "Exibição clara de métricas de alcance, impressões e taxas de engajamento do Instagram.",
      },
      {
        icon: <Users className="text-tech" size={24} />,
        title: "Perfil do Público",
        description:
          "Demonstração demográfica detalhada para que as marcas avaliem o alinhamento de público-alvo.",
      },
      {
        icon: <Instagram className="text-tech" size={24} />,
        title: "Formatos de Parceria",
        description:
          "Seção dedicada aos pacotes comerciais disponíveis, como Stories, Reels, provadores e presenças VIP.",
      },
      {
        icon: <Target className="text-tech" size={24} />,
        title: "Foco em Conversão",
        description:
          "Design responsivo e direto ao ponto, com CTAs otimizados para iniciar o contato com a assessoria.",
      },
    ],
    sidebarTechStackTitle: "Detalhes",
    sidebarTechStack: [
      { label: "Cliente", name: "Diego Sheik" },
      { label: "Categoria", name: "Mídia Kit / Landing Page" },
      { label: "Foco", name: "Parcerias e Patrocínios" },
    ],
  },
];

export function getProjectCaseByPath(segments: string[]) {
  const normalizedPath = segments.filter(Boolean).join("/");
  const projectCase = PROJECT_CASES.find(
    (item) => item.pathSegments?.join("/") === normalizedPath,
  );

  if (!projectCase) {
    throw new Error(`Project not found: ${normalizedPath}`);
  }

  return projectCase;
}
